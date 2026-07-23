const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("node:fs/promises");
const path = require("node:path");
const { AiService } = require("./ai-service.cjs");

if (process.env.SMOKE_TEST || process.env.AI_SMOKE_TEST) {
  app.setPath("userData", path.join(app.getPath("temp"), `surfin-the-net-smoke-${process.pid}`));
}

const aiService = new AiService({
  rootDirectory: __dirname,
  getUserDataDirectory: () => app.getPath("userData")
});

const DEFAULT_SAVE = {
  version: 1,
  visited: ["web://home"],
  bookmarks: ["web://rainbow.gdn/home"],
  downloads: [],
  flags: {},
  currentUrl: "web://home"
};

function savePath() {
  return path.join(app.getPath("userData"), "save.json");
}

async function readSave() {
  try {
    return { ...DEFAULT_SAVE, ...JSON.parse(await fs.readFile(savePath(), "utf8")) };
  } catch {
    return structuredClone(DEFAULT_SAVE);
  }
}

async function writeSave(state) {
  const target = savePath();
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, JSON.stringify(state, null, 2), "utf8");
  return true;
}

ipcMain.handle("save:load", readSave);
ipcMain.handle("save:write", (_event, state) => writeSave(state));
ipcMain.handle("save:reset", async () => {
  await fs.rm(savePath(), { force: true });
  return structuredClone(DEFAULT_SAVE);
});
ipcMain.handle("ai:status", () => aiService.getStatus());
ipcMain.handle("ai:conversation", () => aiService.getConversation());
ipcMain.handle("ai:send", (_event, message) => aiService.sendMessage(message));
ipcMain.handle("ai:reset", () => aiService.resetConversation());

function createWindow() {
  const win = new BrowserWindow({
    width: 1180,
    height: 760,
    minWidth: 860,
    minHeight: 600,
    backgroundColor: "#087b7b",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  win.removeMenu();
  win.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  win.webContents.on("will-navigate", (event, url) => {
    const allowed = process.env.VITE_DEV_SERVER_URL || `file://${path.join(__dirname, "dist", "index.html")}`;
    if (!url.startsWith(allowed)) event.preventDefault();
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, "dist", "index.html"));
  }

  win.once("ready-to-show", () => {
    win.show();
  });

  if (process.env.SCREENSHOT_PATH) {
    win.webContents.once("did-finish-load", () => {
      setTimeout(async () => {
        const image = await win.webContents.capturePage();
        const target = path.resolve(__dirname, process.env.SCREENSHOT_PATH);
        await fs.mkdir(path.dirname(target), { recursive: true });
        await fs.writeFile(target, image.toPNG());
        app.quit();
      }, 1200);
    });
  }

  if (process.env.SMOKE_TEST) {
    win.webContents.once("did-finish-load", () => {
      setTimeout(async () => {
        try {
          const click = async (selector) => {
            const found = await win.webContents.executeJavaScript(`(() => { const element = document.querySelector(${JSON.stringify(selector)}); if (!element) return false; element.click(); return true; })()`);
            if (!found) throw new Error(`Missing element: ${selector}`);
            await new Promise((resolve) => setTimeout(resolve, 120));
          };

          await click('[data-nav="web://nightsignal.net/home"]');
          await click('[data-nav="web://nightsignal.net/archive"]');
          await click('[data-download="signal-note"]');
          await click('[data-open="files"]');
          const foundFile = await win.webContents.executeJavaScript(`(() => { const file = document.querySelector('[data-file="signal-note"]'); if (!file) return false; file.dispatchEvent(new MouseEvent('dblclick', { bubbles: true })); return true; })()`);
          if (!foundFile) throw new Error("Downloaded clue did not appear in My Files");
          await new Promise((resolve) => setTimeout(resolve, 150));
          const clueText = await win.webContents.executeJavaScript(`document.querySelector('.file-viewer pre')?.textContent || ''`);
          if (!clueText.includes("LOOK BEHIND ORBIT")) throw new Error("Downloaded clue contents were incorrect");
          const saved = await readSave();
          if (!saved.flags.signal_note_downloaded || saved.downloads.length !== 1) throw new Error("Discovery state was not persisted");
          const image = await win.webContents.capturePage();
          const target = path.resolve(__dirname, "artifacts", "clue-flow.png");
          await fs.mkdir(path.dirname(target), { recursive: true });
          await fs.writeFile(target, image.toPNG());
          console.log("SMOKE_OK: browsed to the archive, downloaded the clue, opened it, and verified the persisted save.");
        } catch (error) {
          console.error("SMOKE_FAILED:", error);
          process.exitCode = 1;
        } finally {
          app.quit();
        }
      }, 500);
    });
  }

  if (process.env.AI_SMOKE_TEST) {
    win.webContents.once("did-finish-load", () => {
      setTimeout(async () => {
        try {
          const submitAndWait = async (message, expectedReplyCount) => {
            const submitted = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('.chat-form'); const input = form?.querySelector('textarea'); if (!form || !input) return false; input.value = ${JSON.stringify(message)}; form.requestSubmit(); return true; })()`);
            if (!submitted) throw new Error("Messenger form was not available");

            const deadline = Date.now() + 180_000;
            let result = null;
            while (Date.now() < deadline) {
              await new Promise((resolve) => setTimeout(resolve, 500));
              result = await win.webContents.executeJavaScript(`(() => ({ count: document.querySelectorAll('.chat-message.character').length, reply: document.querySelector('.chat-message.character:last-of-type p')?.textContent || '', metrics: document.querySelector('.chat-message.character:last-of-type .chat-metrics')?.textContent || '', error: document.querySelector('.chat-error')?.textContent || '', status: document.querySelector('[data-ai-phase]')?.textContent || '' }))()`);
              if (result.error) throw new Error(result.error);
              if (result.count >= expectedReplyCount && result.reply) break;
            }
            if (!result?.reply || result.count < expectedReplyCount) throw new Error(`Timed out waiting for local model response; last status: ${result?.status ?? "unknown"}`);
            if (result.reply.length > 400) throw new Error(`Model ignored brevity controls (${result.reply.length} characters)`);
            return result;
          };

          const coldResult = await submitAndWait("hey mira, what kind of stuff do you listen to when you are up this late?", 1);
          const warmResult = await submitAndWait("the strange transmissions sound interesting. what makes them strange?", 2);

          const image = await win.webContents.capturePage();
          const target = path.resolve(__dirname, "artifacts", "local-ai-chat.png");
          await fs.mkdir(path.dirname(target), { recursive: true });
          await fs.writeFile(target, image.toPNG());
          console.log(`AI_COLD_REPLY: ${coldResult.reply}`);
          console.log(`AI_COLD_METRICS: ${coldResult.metrics}`);
          console.log(`AI_WARM_REPLY: ${warmResult.reply}`);
          console.log(`AI_WARM_METRICS: ${warmResult.metrics}`);
        } catch (error) {
          console.error("AI_SMOKE_FAILED:", error);
          process.exitCode = 1;
        } finally {
          app.quit();
        }
      }, 700);
    });
  }
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
