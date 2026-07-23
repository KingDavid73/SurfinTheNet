const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("node:fs/promises");
const path = require("node:path");
const { AiService } = require("./ai-service.cjs");

if (process.env.SMOKE_TEST || process.env.AI_SMOKE_TEST || process.env.BOOT_SMOKE_TEST || process.env.COMMENT_SMOKE_TEST || process.env.UI_SMOKE_TEST) {
  app.setPath("userData", path.join(app.getPath("temp"), `surfin-the-net-smoke-${process.pid}`));
}

const aiService = new AiService({
  rootDirectory: __dirname,
  getUserDataDirectory: () => app.getPath("userData")
});

const DEFAULT_SAVE = {
  version: 3,
  visited: ["web://home"],
  bookmarks: ["web://rainbow.gdn/home"],
  downloads: [],
  flags: {},
  currentUrl: "web://home",
  settings: { theme: "classic", wallpaper: "teal", cursor: "arrow" },
  gameTime: "1999-11-03T19:30:00",
  pageComments: [],
  pageVisitCounts: { "web://home": 1 },
  guestbookEntries: {},
  directMessages: [],
  relationships: { mira_917: 10, juniper_gdn: 12, darkraven_xx: 5, orbit_guide: 10, chip_bytebarn: 8, toni_pizza: 10, bev_paws: 12 }
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
ipcMain.handle("ai:preload", () => aiService.preloadAndWarm());
ipcMain.handle("ai:conversation", () => aiService.getConversation());
ipcMain.handle("ai:send", (_event, message) => aiService.sendMessage(message));
ipcMain.handle("ai:page-comment", (_event, request) => aiService.generatePageReply(request));
ipcMain.handle("ai:direct-reply", (_event, request) => aiService.generateDirectReply(request));
ipcMain.handle("ai:semantic-search", (_event, request) => aiService.semanticSearch(request));
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

  const skipBoot = Boolean(process.env.SMOKE_TEST || process.env.AI_SMOKE_TEST || process.env.COMMENT_SMOKE_TEST || process.env.UI_SMOKE_TEST);
  if (process.env.VITE_DEV_SERVER_URL) {
    const devUrl = new URL(process.env.VITE_DEV_SERVER_URL);
    if (skipBoot) devUrl.searchParams.set("skipBoot", "1");
    win.loadURL(devUrl.toString());
  } else {
    win.loadFile(path.join(__dirname, "dist", "index.html"), skipBoot ? { query: { skipBoot: "1" } } : undefined);
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
          const capture = async (name) => {
            await new Promise((resolve) => setTimeout(resolve, 250));
            const image = await win.webContents.capturePage();
            const target = path.resolve(__dirname, "artifacts", name);
            await fs.mkdir(path.dirname(target), { recursive: true });
            await fs.writeFile(target, image.toPNG());
          };

          const homepageHasComments = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.page-comments'))`);
          if (homepageHasComments) throw new Error("OrbitNet homepage still has a public comment section");
          const midiPlayerReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('[data-page-music]'))`);
          if (!midiPlayerReady) throw new Error("Homepage MIDI player was not available");
          await click("[data-page-music]");
          const midiPlaying = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.midi-led.playing')) && document.querySelector('[data-page-music]')?.textContent.includes('Stop')`);
          if (!midiPlaying) throw new Error("Page MIDI player did not enter its playing state");
          await click("[data-page-music]");
          await click("[data-download-helper]");
          const helperInstalled = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.desktop-helper')) && Boolean(document.querySelector('.helper-window'))`);
          if (!helperInstalled) throw new Error("Orbit Pal did not install as a desktop helper");
          await capture("orbit-pal-installed.png");
          await click('[data-close="helper"]');

          const searchFor = async (query, expectedUrl) => {
            const submitted = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('.orbit-search-form'); const input = form?.querySelector('input'); if (!form || !input) return false; input.value = ${JSON.stringify(query)}; form.requestSubmit(); return true; })()`);
            if (!submitted) throw new Error(`Search form unavailable for ${query}`);
            await new Promise((resolve) => setTimeout(resolve, 120));
            const found = await win.webContents.executeJavaScript(`Boolean(document.querySelector('[data-nav="${expectedUrl}"]'))`);
            if (!found) throw new Error(`Search for ${query} did not return ${expectedUrl}`);
          };
          await searchFor("food", "web://cosmiccrust.biz/home");
          await click('[data-nav="web://cosmiccrust.biz/home"]');
          const pizzaReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.pizza-page')) && Boolean(document.querySelector('.page-comments')) && Boolean(document.querySelector('[data-page-music]'))`);
          if (!pizzaReady) throw new Error("Cosmic Crust page skeleton was incomplete");
          await capture("cosmic-crust.png");
          await click('[data-browser="home"]');
          await searchFor("tech", "web://bytebarn.com/home");
          await click('[data-browser="home"]');
          await searchFor("animals", "web://pawsnclaws.net/home");
          await click('[data-browser="home"]');

          await click('[data-nav="web://rainbow.gdn/home"]');
          await click('[data-nav="web://rainbow.gdn/about"]');
          const subpageHasComments = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.page-comments'))`);
          if (subpageHasComments) throw new Error("Character subpage incorrectly had its own comment thread");
          await click('[data-nav="web://rainbow.gdn/home"]');
          await click('[data-nav="web://rainbow.gdn/guestbook"]');
          const signed = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('.guestbook-form'); const input = form?.querySelector('textarea'); if (!form || !input) return false; input.value = 'Your garden page is wonderful!'; form.requestSubmit(); return Boolean(document.querySelector('.player-signature')) && !document.querySelector('.guestbook-form'); })()`);
          if (!signed) throw new Error("One-time Rainbow guestbook signature did not persist in the page");
          await click('[data-browser="home"]');
          const searched = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('.orbit-search-form'); const input = form?.querySelector('input'); if (!form || !input) return false; input.value = 'below'; form.requestSubmit(); return true; })()`);
          if (!searched) throw new Error("OrbitNet search form was not available");
          await new Promise((resolve) => setTimeout(resolve, 120));
          await click('[data-nav="web://orbitnet.local/below"]');
          const hiddenText = await win.webContents.executeJavaScript(`document.querySelector('.system-hidden-page')?.textContent || ''`);
          if (!hiddenText.includes("PUBLIC INDEX: FALSE")) throw new Error("Unlisted maintenance page was not discoverable through phrase search");
          await click('[data-nav="web://home"]');
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
          if (!saved.flags.signal_note_downloaded || !saved.flags.orbit_pal_installed || saved.downloads.length !== 2) throw new Error("Discovery and helper state were not persisted");
          const image = await win.webContents.capturePage();
          const target = path.resolve(__dirname, "artifacts", "clue-flow.png");
          await fs.mkdir(path.dirname(target), { recursive: true });
          await fs.writeFile(target, image.toPNG());
          console.log("SMOKE_OK: installed Orbit Pal, found all business pages through related searches, verified page MIDI/comments, browsed to the archive, and persisted downloads.");
        } catch (error) {
          console.error("SMOKE_FAILED:", error);
          process.exitCode = 1;
        } finally {
          app.exit(process.exitCode ?? 0);
        }
      }, 500);
    });
  }

  if (process.env.AI_SMOKE_TEST) {
    win.webContents.once("did-finish-load", () => {
      setTimeout(async () => {
        try {
          const opened = await win.webContents.executeJavaScript(`(() => { const icon = document.querySelector('[data-open="chat"]'); if (!icon) return false; icon.click(); return true; })()`);
          if (!opened) throw new Error("Messenger desktop icon was not available");
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

          const emailOpened = await win.webContents.executeJavaScript(`(() => { document.querySelector('[data-nav="web://rainbow.gdn/home"]')?.click(); const contact = document.querySelector('[data-email-owner="juniper_gdn"]'); if (!contact) return false; contact.click(); return true; })()`);
          if (!emailOpened) throw new Error("Juniper email contact was not available");
          await new Promise((resolve) => setTimeout(resolve, 200));
          const emailSubmitted = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('.email-compose-form'); const subject = form?.querySelector('[name="subject"]'); const body = form?.querySelector('[name="message"]'); if (!form || !subject || !body) return false; subject.value = 'Your garden page'; body.value = 'Hi Juniper, thanks for sharing your page. Modem seems great!'; form.requestSubmit(); return true; })()`);
          if (!emailSubmitted) throw new Error("Juniper email compose form was not available");
          const emailDeadline = Date.now() + 90_000;
          let emailPreview = "";
          while (Date.now() < emailDeadline) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            emailPreview = await win.webContents.executeJavaScript(`document.querySelector('#mail-preview')?.textContent || ''`);
            if (emailPreview.includes("From:")) break;
          }
          if (!emailPreview.includes("Juniper_Gdn")) throw new Error(`Juniper email reply did not arrive: ${emailPreview}`);
          const savedAfterContacts = await readSave();
          if ((savedAfterContacts.relationships?.juniper_gdn ?? 0) <= 12) throw new Error("Hidden Juniper relationship score did not increase");
          const emailImage = await win.webContents.capturePage();
          await fs.writeFile(path.resolve(__dirname, "artifacts", "email-reply.png"), emailImage.toPNG());

          console.log(`AI_COLD_REPLY: ${coldResult.reply}`);
          console.log(`AI_COLD_METRICS: ${coldResult.metrics}`);
          console.log(`AI_WARM_REPLY: ${warmResult.reply}`);
          console.log(`AI_WARM_METRICS: ${warmResult.metrics}`);
          console.log(`AI_EMAIL_REPLY: ${emailPreview.replace(/\s+/g, " ").trim()}`);
        } catch (error) {
          console.error("AI_SMOKE_FAILED:", error);
          process.exitCode = 1;
        } finally {
          app.exit(process.exitCode ?? 0);
        }
      }, 700);
    });
  }

  if (process.env.UI_SMOKE_TEST) {
    win.webContents.once("did-finish-load", () => {
      setTimeout(async () => {
        try {
          const click = async (selector) => {
            const found = await win.webContents.executeJavaScript(`(() => { const element = document.querySelector(${JSON.stringify(selector)}); if (!element) return false; element.click(); return true; })()`);
            if (!found) throw new Error(`Missing element: ${selector}`);
            await new Promise((resolve) => setTimeout(resolve, 120));
          };

          await click('[data-open="settings"]');
          await click('[data-setting="theme"][value="plum"]');
          await click('[data-setting="wallpaper"][value="clouds"]');
          await click('[data-setting="cursor"][value="star"]');
          const styled = await win.webContents.executeJavaScript(`document.querySelector('.desktop')?.className || ''`);
          if (!styled.includes("theme-plum") || !styled.includes("wallpaper-clouds") || !styled.includes("cursor-star")) throw new Error(`Settings were not applied: ${styled}`);

          const before = new Date((await readSave()).gameTime).getTime();
          await click("[data-start]");
          await click('[data-session="sleep"]');
          await click('[data-sleep-hours="1"]');
          const afterState = await readSave();
          const advancedBy = new Date(afterState.gameTime).getTime() - before;
          if (advancedBy < 3_590_000 || advancedBy > 3_620_000) throw new Error(`Sleep advanced the clock by ${advancedBy}ms instead of one hour`);

          const image = await win.webContents.capturePage();
          const target = path.resolve(__dirname, "artifacts", "settings-and-clock.png");
          await fs.mkdir(path.dirname(target), { recursive: true });
          await fs.writeFile(target, image.toPNG());

          await click("[data-start]");
          await click('[data-session="logoff"]');
          const atLogin = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.login-stage'))`);
          if (!atLogin) throw new Error("Log Off did not return to profile selection");
          await click("[data-login-user]");
          const backAtDesktop = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.desktop'))`);
          if (!backAtDesktop) throw new Error("Profile selection did not return to the desktop");
          await click("[data-start]");
          await click('[data-session="shutdown"]');
          const atTitle = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.desk-stage.title [data-power]'))`);
          if (!atTitle) throw new Error("Shut Down did not return to the powered-off title screen");

          console.log(`UI_OK: applied appearance settings, advanced the clock to ${afterState.gameTime}, logged off, signed back in, and shut down to the title screen.`);
        } catch (error) {
          console.error("UI_FAILED:", error);
          process.exitCode = 1;
        } finally {
          app.exit(process.exitCode ?? 0);
        }
      }, 700);
    });
  }

  if (process.env.COMMENT_SMOKE_TEST) {
    win.webContents.once("did-finish-load", () => {
      setTimeout(async () => {
        try {
          const submitted = await win.webContents.executeJavaScript(`(() => { document.querySelector('[data-nav="web://rainbow.gdn/home"]')?.click(); const form = document.querySelector('.page-comment-form'); const input = form?.querySelector('textarea'); if (!form || !input) return false; input.value = 'Hi Juniper, thanks for sharing the page. Why does Modem stare at the phone jack?'; form.requestSubmit(); return true; })()`);
          if (!submitted) throw new Error("Page comment form was not available");

          const deadline = Date.now() + 180_000;
          let result = null;
          while (Date.now() < deadline) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            result = await win.webContents.executeJavaScript(`(() => ({ playerCount: document.querySelectorAll('.page-comment.player').length, ownerCount: document.querySelectorAll('.page-comment.owner').length, pending: document.querySelector('.page-comment-form button')?.textContent || '', error: document.querySelector('.comment-error')?.textContent || '', toast: document.querySelector('.toast')?.textContent || '' }))()`);
            if (result.error) throw new Error(result.error);
            if (result.playerCount === 1 && result.pending !== "Posting...") break;
          }
          if (!result || result.pending === "Posting...") throw new Error("Timed out waiting for page-owner response generation");
          if (result.ownerCount !== 0) throw new Error("Generated owner response appeared before the next page load");

          await win.webContents.executeJavaScript(`document.querySelector('.address-form')?.requestSubmit()`);
          await new Promise((resolve) => setTimeout(resolve, 300));
          const revealed = await win.webContents.executeJavaScript(`(() => ({ count: document.querySelectorAll('.page-comment.owner').length, author: document.querySelector('.page-comment.owner header b')?.textContent || '', reply: document.querySelector('.page-comment.owner p')?.textContent || '' }))()`);
          if (revealed.count !== 1 || revealed.author !== "Juniper_Gdn" || !revealed.reply) throw new Error("Owner response did not appear after reloading the page");
          await win.webContents.executeJavaScript(`document.querySelector('.page-comments')?.scrollIntoView({ block: 'start' })`);
          await new Promise((resolve) => setTimeout(resolve, 200));

          const image = await win.webContents.capturePage();
          const target = path.resolve(__dirname, "artifacts", "page-comment-reply.png");
          await fs.mkdir(path.dirname(target), { recursive: true });
          await fs.writeFile(target, image.toPNG());
          console.log(`COMMENT_OK: response stayed hidden until reload, then Juniper_Gdn replied: ${revealed.reply}`);
        } catch (error) {
          console.error("COMMENT_FAILED:", error);
          process.exitCode = 1;
        } finally {
          app.exit(process.exitCode ?? 0);
        }
      }, 700);
    });
  }

  if (process.env.BOOT_SMOKE_TEST) {
    win.webContents.once("did-finish-load", () => {
      setTimeout(async () => {
        try {
          const waitForSelector = async (selector, timeoutMs) => {
            const deadline = Date.now() + timeoutMs;
            while (Date.now() < deadline) {
              const found = await win.webContents.executeJavaScript(`Boolean(document.querySelector(${JSON.stringify(selector)}))`);
              if (found) return;
              await new Promise((resolve) => setTimeout(resolve, 200));
            }
            throw new Error(`Timed out waiting for ${selector}`);
          };

          const powerClicked = await win.webContents.executeJavaScript(`(() => { const power = document.querySelector('[data-power]'); if (!power) return false; power.click(); return true; })()`);
          if (!powerClicked) throw new Error("Title screen power button was not available");
          await new Promise((resolve) => setTimeout(resolve, 600));
          const crtImage = await win.webContents.capturePage();
          const crtTarget = path.resolve(__dirname, "artifacts", "crt-power-on.png");
          await fs.mkdir(path.dirname(crtTarget), { recursive: true });
          await fs.writeFile(crtTarget, crtImage.toPNG());

          await waitForSelector(".login-stage", 15_000);
          const loginClicked = await win.webContents.executeJavaScript(`(() => { const user = document.querySelector('[data-login-user]'); if (!user) return false; user.click(); return true; })()`);
          if (!loginClicked) throw new Error("Login profile was not available");

          await waitForSelector(".desktop", 12_000);
          const restoredWindowCount = await win.webContents.executeJavaScript(`document.querySelectorAll('.app-window').length`);
          if (restoredWindowCount !== 0) throw new Error(`Login restored ${restoredWindowCount} app window(s) instead of showing a clean desktop`);
          const browserOpened = await win.webContents.executeJavaScript(`(() => { const browser = document.querySelector('[data-open="browser"]'); if (!browser) return false; browser.click(); return true; })()`);
          if (!browserOpened) throw new Error("Browser desktop icon was not available");
          const browserUrl = await win.webContents.executeJavaScript(`document.querySelector('.address-form input')?.value || ''`);
          if (browserUrl !== "web://home") throw new Error(`Browser opened at ${browserUrl || "an empty address"} instead of web://home`);
          await win.webContents.executeJavaScript(`document.querySelector('[data-close="browser"]')?.click()`);

          const deadline = Date.now() + 90_000;
          let status = null;
          while (Date.now() < deadline) {
            status = await win.webContents.executeJavaScript(`window.aiAPI.status()`);
            if (status.phase === "idle" && status.warmed) break;
            if (status.phase === "error") throw new Error(status.error || "AI preload failed");
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
          if (!status?.warmed) throw new Error(`Model did not finish warming; last phase: ${status?.phase ?? "unknown"}`);
          const semanticResult = await win.webContents.executeJavaScript(`window.aiAPI.search({
            query: "somewhere to get dinner",
            pages: [
              { url: "web://bytebarn.com/home", title: "BYTE BARN Computer Superstore", summary: "A neighborhood computer and repair shop." },
              { url: "web://cosmiccrust.biz/home", title: "Cosmic Crust Pizza Online", summary: "A family pizza restaurant serving food, lunch, dinner, delivery, and takeout." },
              { url: "web://pawsnclaws.net/home", title: "Paws & Claws Pet Emporium", summary: "A pet store with animal supplies." }
            ]
          })`);
          if (!semanticResult.urls.includes("web://cosmiccrust.biz/home")) throw new Error(`Semantic search missed Cosmic Crust: ${JSON.stringify(semanticResult.urls)}`);
          const helperReply = await win.webContents.executeJavaScript(`window.aiAPI.directReply({
            ownerId: "orbit_guide",
            channel: "helper",
            playerMessage: "Where do downloaded files go?",
            relationshipScore: 10,
            recentMessages: []
          })`);
          if (!helperReply.text || helperReply.text.length > 240) throw new Error("Orbit Pal did not provide a concise help response");

          const image = await win.webContents.capturePage();
          const target = path.resolve(__dirname, "artifacts", "boot-flow-desktop.png");
          await fs.mkdir(path.dirname(target), { recursive: true });
          await fs.writeFile(target, image.toPNG());
          console.log(`BOOT_OK: startup and clean desktop completed; Browser opened at web://home, semantic search found Cosmic Crust, Orbit Pal answered “${helperReply.text}”, and the model warmed in ${status.warmupMs}ms after ${status.loadMs}ms load.`);
        } catch (error) {
          console.error("BOOT_FAILED:", error);
          process.exitCode = 1;
        } finally {
          app.exit(process.exitCode ?? 0);
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
