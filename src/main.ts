import "./styles.css";
import { notFoundPage, pages } from "./pages";
import type { AiConversation, AiStatus, AppId, GameState } from "./types";

const DEFAULT_STATE: GameState = {
  version: 1,
  visited: ["web://home"],
  bookmarks: ["web://rainbow.gdn/home"],
  downloads: [],
  flags: {},
  currentUrl: "web://home"
};

interface WindowModel {
  open: boolean;
  minimized: boolean;
  z: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const windows: Record<AppId, WindowModel> = {
  browser: { open: true, minimized: false, z: 3, x: 116, y: 44, width: 820, height: 600 },
  mail: { open: false, minimized: false, z: 2, x: 205, y: 94, width: 660, height: 470 },
  files: { open: false, minimized: false, z: 1, x: 255, y: 126, width: 590, height: 410 },
  chat: { open: true, minimized: false, z: 4, x: 190, y: 72, width: 620, height: 520 }
};

const APP_META: Record<AppId, { icon: string; title: string }> = {
  browser: { icon: "O", title: "Orbit Explorer" },
  mail: { icon: "@", title: "Orbit Mail" },
  files: { icon: "▣", title: "My Files" },
  chat: { icon: "◎", title: "Orbit Messenger" }
};

const EMPTY_AI_CONVERSATION: AiConversation = {
  persona: { id: "mira_917", screenName: "Mira_917", displayName: "Mira", statusMessage: "offline" },
  messages: []
};

const EMPTY_AI_STATUS: AiStatus = {
  phase: "offline",
  modelAvailable: false,
  modelName: "Qwen3-4B Q4_K_M",
  modelFile: "",
  persona: EMPTY_AI_CONVERSATION.persona,
  backend: null,
  loadMs: null,
  error: null
};

let state = structuredClone(DEFAULT_STATE);
let history: string[] = [state.currentUrl];
let historyIndex = 0;
let topZ = 4;
let startOpen = false;
let notification = "";
let aiConversation = structuredClone(EMPTY_AI_CONVERSATION);
let aiStatus = structuredClone(EMPTY_AI_STATUS);
let chatBusy = false;
let chatPendingMessage = "";
let chatError = "";
let chatStartedAt = 0;

const root = document.querySelector<HTMLDivElement>("#app")!;

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function formatDuration(milliseconds: number | null) {
  if (milliseconds === null) return "—";
  return milliseconds < 1000 ? `${milliseconds}ms` : `${(milliseconds / 1000).toFixed(1)}s`;
}

async function loadState() {
  if (window.gameAPI) return window.gameAPI.load();
  const stored = localStorage.getItem("surfin-save");
  return stored ? { ...DEFAULT_STATE, ...JSON.parse(stored) } : structuredClone(DEFAULT_STATE);
}

async function saveState() {
  if (window.gameAPI) await window.gameAPI.save(state);
  else localStorage.setItem("surfin-save", JSON.stringify(state));
}

function currentPage() {
  return pages[state.currentUrl] ?? notFoundPage(state.currentUrl);
}

function navigate(url: string, push = true) {
  const normalized = url.trim().toLowerCase().replace(/^https?:\/\//, "web://");
  state.currentUrl = normalized || "web://home";
  if (!state.visited.includes(state.currentUrl)) state.visited.push(state.currentUrl);
  if (push) {
    history = [...history.slice(0, historyIndex + 1), state.currentUrl];
    historyIndex = history.length - 1;
  }
  void saveState();
  render();
}

function openApp(app: AppId) {
  windows[app].open = true;
  windows[app].minimized = false;
  focusApp(app);
  startOpen = false;
  render();
}

function focusApp(app: AppId) {
  topZ += 1;
  windows[app].z = topZ;
}

function windowShell(app: AppId, title: string, icon: string, content: string) {
  const win = windows[app];
  if (!win.open || win.minimized) return "";
  return `<section class="app-window ${app}-window" data-window="${app}" style="left:${win.x}px;top:${win.y}px;width:${win.width}px;height:${win.height}px;z-index:${win.z}">
    <header class="titlebar" data-drag-handle="${app}"><span><b class="mini-icon">${icon}</b>${title}</span><div class="window-buttons"><button data-minimize="${app}" aria-label="Minimize">_</button><button data-close="${app}" aria-label="Close">×</button></div></header>
    ${content}
  </section>`;
}

function browserWindow() {
  const page = currentPage();
  const bookmarked = state.bookmarks.includes(state.currentUrl);
  return windowShell("browser", `${page.title} - Orbit Explorer`, "O", `
    <div class="browser-toolbar">
      <button data-browser="back" ${historyIndex === 0 ? "disabled" : ""} title="Back">◀</button>
      <button data-browser="forward" ${historyIndex >= history.length - 1 ? "disabled" : ""} title="Forward">▶</button>
      <button data-browser="home" title="Home">⌂</button>
      <form class="address-form"><label>Address</label><input value="${state.currentUrl}" spellcheck="false"><button>Go</button></form>
      <button data-browser="bookmark" class="bookmark ${bookmarked ? "active" : ""}" title="Bookmark">★</button>
    </div>
    <div class="bookmark-row"><span>Links:</span>${state.bookmarks.map((url) => `<button data-nav="${url}">${pages[url]?.title ?? url}</button>`).join("")}</div>
    <div class="browser-viewport site-${page.site}">${page.render(state)}</div>
    <footer class="browser-status"><span>Internet zone</span><span>${state.visited.length} pages visited</span></footer>`);
}

function mailWindow() {
  const receipt = state.flags.signal_note_downloaded
    ? `<button class="mail-row unread" data-mail="receipt"><b>● OrbitNet Downloads</b><span>Your file is ready</span><time>Now</time></button>`
    : "";
  return windowShell("mail", "Orbit Mail", "@", `
    <div class="mail-toolbar"><button disabled>New Message</button><button disabled>Reply</button><button disabled>Delete</button></div>
    <div class="mail-layout"><aside><b>Folders</b><button class="selected">📥 Inbox (2${state.flags.signal_note_downloaded ? "+1" : ""})</button><button>📤 Sent</button><button>🗑 Trash</button></aside>
    <main class="inbox"><div class="mail-columns"><b>From</b><b>Subject</b><b>Received</b></div>
      ${receipt}
      <button class="mail-row" data-mail="mira"><b>Mira</b><span>Found something weird</span><time>11/03</time></button>
      <button class="mail-row" data-mail="welcome"><b>OrbitNet Team</b><span>Welcome to OrbitNet!</span><time>11/01</time></button>
      <article class="mail-preview" id="mail-preview"><p>Select a message to read it.</p></article>
    </main></div>`);
}

function filesWindow() {
  const downloads = state.downloads.length
    ? state.downloads.map((file) => `<button class="file-icon" data-file="${file.id}"><span>📄</span><b>${file.name}</b></button>`).join("")
    : `<p class="empty-folder">This folder is empty.<br>Files downloaded from Orbit Explorer will appear here.</p>`;
  return windowShell("files", "C:\\My Files", "▣", `
    <div class="files-toolbar"><button disabled>Back</button><span>Address: C:\\My Files</span></div>
    <div class="files-layout"><aside><h3>My Files</h3><p>Personal files and internet downloads.</p><hr><b>${state.downloads.length} object${state.downloads.length === 1 ? "" : "s"}</b></aside><main class="file-grid">${downloads}</main></div>`);
}

function chatWindow() {
  const persona = aiConversation.persona;
  const statusLabel = aiStatus.phase === "ready"
    ? "model on disk · loads with first message"
    : aiStatus.phase === "loading"
      ? "loading 2.5 GB model into memory…"
      : aiStatus.phase === "generating"
        ? "Mira is typing…"
        : aiStatus.phase === "idle"
          ? `model loaded · ${aiStatus.backend ?? "CPU"}`
          : aiStatus.phase === "error"
            ? `error · ${aiStatus.error ?? "generation failed"}`
            : "local model unavailable";

  const messageHtml = aiConversation.messages.map((message) => {
    const metrics = message.metrics
      ? `<small class="chat-metrics">generation ${formatDuration(message.metrics.generationMs)} · ${message.metrics.outputTokens} tokens · ${message.metrics.tokensPerSecond ?? "—"} tok/s · ${message.metrics.backend ?? "CPU"}${message.metrics.modelLoadMs ? ` · initial load ${formatDuration(message.metrics.modelLoadMs)}` : ""}</small>`
      : "";
    return `<article class="chat-message ${message.role}">
      <header><b>${message.role === "player" ? "You" : escapeHtml(persona.screenName)}</b><time>${new Date(message.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</time></header>
      <p>${escapeHtml(message.text)}</p>${metrics}
    </article>`;
  }).join("");

  const pending = chatPendingMessage
    ? `<article class="chat-message player pending"><header><b>You</b><time>now</time></header><p>${escapeHtml(chatPendingMessage)}</p></article><div class="typing-indicator"><i></i><i></i><i></i><span>${aiStatus.phase === "loading" ? "Loading Qwen3-4B" : `${escapeHtml(persona.screenName)} is typing`}</span></div>`
    : "";
  const empty = !messageHtml && !pending
    ? `<div class="chat-empty"><b>${escapeHtml(persona.screenName)} is online.</b><span>Send something to load Qwen3-4B and begin the local conversation test.</span><span>The first response includes model-loading time; later replies should be faster.</span></div>`
    : "";

  return windowShell("chat", `${persona.screenName} - Orbit Messenger`, "◎", `
    <div class="aim-menu"><button disabled>File</button><button disabled>Edit</button><button disabled>People</button><button data-ai-reset>Clear Chat</button></div>
    <div class="aim-contact">
      <div class="aim-avatar">M</div><div><b>${escapeHtml(persona.screenName)}</b><span><i></i> Online</span><small>“${escapeHtml(persona.statusMessage)}”</small></div>
      <aside><b>LOCAL AI TEST</b><span>${escapeHtml(aiStatus.modelName)}</span></aside>
    </div>
    <div class="chat-transcript" id="chat-transcript">${empty}${messageHtml}${pending}</div>
    ${chatError ? `<div class="chat-error">${escapeHtml(chatError)}</div>` : ""}
    <form class="chat-form">
      <textarea name="message" maxlength="500" rows="2" placeholder="Type an instant message…" ${chatBusy || !aiStatus.modelAvailable ? "disabled" : ""}></textarea>
      <button ${chatBusy || !aiStatus.modelAvailable ? "disabled" : ""}>${chatBusy ? "Waiting…" : "Send"}</button>
    </form>
    <footer class="ai-statusbar"><span data-ai-phase>${escapeHtml(statusLabel)}</span><span data-ai-elapsed>${chatBusy ? "0.0s elapsed" : aiStatus.loadMs ? `load ${formatDuration(aiStatus.loadMs)}` : "not loaded"}</span></footer>`);
}

function render() {
  root.innerHTML = `<main class="desktop">
    <div class="wallpaper-logo"><span>ORBIT</span><b>OS</b><small>98</small></div>
    <div class="desktop-icons">
      <button data-open="browser"><span class="desktop-icon globe">O</span><b>Orbit Explorer</b></button>
      <button data-open="mail"><span class="desktop-icon mail">@</span><b>Orbit Mail</b></button>
      <button data-open="files"><span class="desktop-icon folder">▰</span><b>My Files</b></button>
      <button data-open="chat"><span class="desktop-icon chat">◎</span><b>Orbit Messenger</b></button>
    </div>
    <aside class="sticky-note"><b>THINGS TO TRY</b><span>• Chat with Mira_917</span><span>• Compare first and later response times</span><span>• Test her personality</span></aside>
    ${browserWindow()}${mailWindow()}${filesWindow()}${chatWindow()}
    ${notification ? `<div class="toast">${notification}</div>` : ""}
    ${startOpen ? `<div class="start-menu"><header><b>OrbitOS</b><span>98</span></header><button data-open="browser">🌐 Orbit Explorer</button><button data-open="chat">💬 Orbit Messenger</button><button data-open="mail">✉ Orbit Mail</button><button data-open="files">📁 My Files</button><hr><button data-reset>↻ Reset Demo</button></div>` : ""}
    <footer class="taskbar"><button class="start-button ${startOpen ? "pressed" : ""}" data-start><span>◈</span> Start</button><div class="task-buttons">${(Object.keys(windows) as AppId[]).filter((app) => windows[app].open).map((app) => `<button data-task="${app}" class="${!windows[app].minimized && windows[app].z === topZ ? "active" : ""}">${APP_META[app].icon} ${APP_META[app].title}</button>`).join("")}</div><time id="clock"></time></footer>
  </main>`;
  bindEvents();
  updateClock();
}

function showNotification(message: string) {
  notification = message;
  render();
  window.setTimeout(() => {
    notification = "";
    render();
  }, 2600);
}

function downloadSignalNote() {
  if (state.downloads.some((file) => file.id === "signal-note")) return;
  state.downloads.push({
    id: "signal-note",
    name: "SIGNAL_NOTE.TXT",
    contents: "OPERATOR'S NOTE — 11/03/1999\n\nThe extra voice appears at exactly 23:17.\nIt repeats three words: LOOK BEHIND ORBIT.\n\nThis is the end of the vertical slice... for now.",
    downloadedAt: new Date().toISOString()
  });
  state.flags.signal_note_downloaded = true;
  void saveState();
  showNotification("Download complete: SIGNAL_NOTE.TXT");
}

function scrollChatToBottom() {
  requestAnimationFrame(() => {
    const transcript = document.querySelector<HTMLElement>("#chat-transcript");
    if (transcript) transcript.scrollTop = transcript.scrollHeight;
  });
}

async function refreshAiProgress() {
  if (!window.aiAPI) return;
  try {
    aiStatus = await window.aiAPI.status();
    const phase = document.querySelector<HTMLElement>("[data-ai-phase]");
    const elapsed = document.querySelector<HTMLElement>("[data-ai-elapsed]");
    if (phase) {
      phase.textContent = aiStatus.phase === "loading"
        ? "loading 2.5 GB model into memory…"
        : aiStatus.phase === "generating"
          ? "Mira_917 is typing…"
          : aiStatus.phase === "error"
            ? `error · ${aiStatus.error ?? "generation failed"}`
            : `model loaded · ${aiStatus.backend ?? "CPU"}`;
    }
    if (elapsed && chatBusy) elapsed.textContent = `${((performance.now() - chatStartedAt) / 1000).toFixed(1)}s elapsed`;
  } catch {
    // A failed status poll should not replace the actual generation error.
  }
}

async function sendChatMessage(message: string) {
  if (!window.aiAPI || chatBusy) return;
  chatBusy = true;
  chatPendingMessage = message;
  chatError = "";
  chatStartedAt = performance.now();
  render();
  scrollChatToBottom();
  const progressTimer = window.setInterval(() => void refreshAiProgress(), 400);

  try {
    const result = await window.aiAPI.send(message);
    aiConversation = result.conversation;
    aiStatus = result.status;
  } catch (error) {
    chatError = error instanceof Error ? error.message.replace(/^Error invoking remote method '[^']+':\s*/i, "") : String(error);
    try {
      aiConversation = await window.aiAPI.conversation();
      aiStatus = await window.aiAPI.status();
    } catch {
      // Preserve the original inference error.
    }
  } finally {
    window.clearInterval(progressTimer);
    chatBusy = false;
    chatPendingMessage = "";
    render();
    scrollChatToBottom();
    document.querySelector<HTMLTextAreaElement>(".chat-form textarea")?.focus();
  }
}

function bindEvents() {
  document.querySelectorAll<HTMLElement>("[data-open]").forEach((el) => el.addEventListener("click", () => openApp(el.dataset.open as AppId)));
  document.querySelectorAll<HTMLElement>("[data-nav]").forEach((el) => el.addEventListener("click", () => navigate(el.dataset.nav!)));
  document.querySelectorAll<HTMLElement>("[data-download]").forEach((el) => el.addEventListener("click", downloadSignalNote));
  document.querySelectorAll<HTMLElement>("[data-window]").forEach((el) => el.addEventListener("pointerdown", () => { focusApp(el.dataset.window as AppId); el.style.zIndex = String(topZ); }));
  document.querySelectorAll<HTMLElement>("[data-close]").forEach((el) => el.addEventListener("click", () => { windows[el.dataset.close as AppId].open = false; render(); }));
  document.querySelectorAll<HTMLElement>("[data-minimize]").forEach((el) => el.addEventListener("click", () => { windows[el.dataset.minimize as AppId].minimized = true; render(); }));
  document.querySelectorAll<HTMLElement>("[data-task]").forEach((el) => el.addEventListener("click", () => {
    const app = el.dataset.task as AppId;
    if (!windows[app].minimized && windows[app].z === topZ) windows[app].minimized = true;
    else { windows[app].minimized = false; focusApp(app); }
    render();
  }));
  document.querySelector<HTMLElement>("[data-start]")?.addEventListener("click", () => { startOpen = !startOpen; render(); });
  document.querySelector<HTMLElement>("[data-reset]")?.addEventListener("click", async () => {
    state = window.gameAPI ? await window.gameAPI.reset() : structuredClone(DEFAULT_STATE);
    if (!window.gameAPI) localStorage.removeItem("surfin-save");
    history = [state.currentUrl]; historyIndex = 0; startOpen = false;
    render();
  });
  document.querySelector<HTMLFormElement>(".chat-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const message = new FormData(form).get("message")?.toString().trim() ?? "";
    if (message) void sendChatMessage(message);
  });
  document.querySelector<HTMLElement>("[data-ai-reset]")?.addEventListener("click", async () => {
    if (!window.aiAPI || chatBusy || !window.confirm("Clear this test conversation and its model context?")) return;
    aiConversation = await window.aiAPI.reset();
    aiStatus = await window.aiAPI.status();
    chatError = "";
    render();
  });

  document.querySelector<HTMLFormElement>(".address-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    navigate(new FormData(form).get("address")?.toString() ?? form.querySelector("input")!.value);
  });
  const address = document.querySelector<HTMLInputElement>(".address-form input");
  if (address) address.name = "address";

  document.querySelector<HTMLElement>("[data-browser='back']")?.addEventListener("click", () => { if (historyIndex > 0) { historyIndex -= 1; navigate(history[historyIndex], false); } });
  document.querySelector<HTMLElement>("[data-browser='forward']")?.addEventListener("click", () => { if (historyIndex < history.length - 1) { historyIndex += 1; navigate(history[historyIndex], false); } });
  document.querySelector<HTMLElement>("[data-browser='home']")?.addEventListener("click", () => navigate("web://home"));
  document.querySelector<HTMLElement>("[data-browser='bookmark']")?.addEventListener("click", () => {
    state.bookmarks = state.bookmarks.includes(state.currentUrl) ? state.bookmarks.filter((url) => url !== state.currentUrl) : [...state.bookmarks, state.currentUrl];
    void saveState(); render();
  });

  document.querySelectorAll<HTMLElement>("[data-mail]").forEach((el) => el.addEventListener("click", () => {
    const preview = document.querySelector<HTMLElement>("#mail-preview");
    if (!preview) return;
    const messages: Record<string, string> = {
      welcome: `<h3>Welcome to OrbitNet!</h3><p>Thanks for choosing OrbitNet. Your desktop is now connected to dozens of hand-curated pages.</p><p>Remember: be kind, explore widely, and never share your password.</p>`,
      mira: `<h3>Found something weird</h3><p>Hey—Juniper said you were poking around.</p><p>Check the Night Signal recording archive. One of the text files wasn't there yesterday. If you download it, it should show up in <b>My Files</b>.</p><p>—Mira</p>`,
      receipt: `<h3>Your file is ready</h3><p><b>SIGNAL_NOTE.TXT</b> was saved successfully.</p><p>Open <b>My Files</b> from the desktop or Start menu to read it.</p>`
    };
    preview.innerHTML = messages[el.dataset.mail!] ?? "";
    document.querySelectorAll(".mail-row").forEach((row) => row.classList.remove("selected")); el.classList.add("selected");
  }));
  document.querySelectorAll<HTMLElement>("[data-file]").forEach((el) => el.addEventListener("dblclick", () => {
    const file = state.downloads.find((item) => item.id === el.dataset.file);
    if (!file) return;
    const viewer = document.createElement("div");
    viewer.className = "file-viewer";
    viewer.innerHTML = `<section><header>${file.name}<button aria-label="Close">×</button></header><pre></pre></section>`;
    viewer.querySelector("pre")!.textContent = file.contents;
    viewer.querySelector("button")!.addEventListener("click", () => viewer.remove());
    document.querySelector(".desktop")!.append(viewer);
  }));

  bindDragging();
  scrollChatToBottom();
}

function bindDragging() {
  document.querySelectorAll<HTMLElement>("[data-drag-handle]").forEach((handle) => {
    handle.addEventListener("pointerdown", (event) => {
      if ((event.target as HTMLElement).closest("button")) return;
      const app = handle.dataset.dragHandle as AppId;
      const winEl = handle.closest<HTMLElement>(".app-window")!;
      focusApp(app); winEl.style.zIndex = String(topZ);
      const startX = event.clientX; const startY = event.clientY;
      const originX = windows[app].x; const originY = windows[app].y;
      handle.setPointerCapture(event.pointerId);
      const move = (moveEvent: PointerEvent) => {
        windows[app].x = Math.max(0, Math.min(window.innerWidth - 180, originX + moveEvent.clientX - startX));
        windows[app].y = Math.max(0, Math.min(window.innerHeight - 70, originY + moveEvent.clientY - startY));
        winEl.style.left = `${windows[app].x}px`; winEl.style.top = `${windows[app].y}px`;
      };
      const up = () => { handle.removeEventListener("pointermove", move); handle.removeEventListener("pointerup", up); };
      handle.addEventListener("pointermove", move); handle.addEventListener("pointerup", up);
    });
  });
}

function updateClock() {
  const clock = document.querySelector<HTMLTimeElement>("#clock");
  if (clock) clock.textContent = new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit" }).format(new Date());
}

void Promise.all([
  loadState(),
  window.aiAPI?.conversation() ?? Promise.resolve(structuredClone(EMPTY_AI_CONVERSATION)),
  window.aiAPI?.status() ?? Promise.resolve(structuredClone(EMPTY_AI_STATUS))
]).then(([loadedState, loadedConversation, loadedStatus]) => {
  state = loadedState;
  aiConversation = loadedConversation;
  aiStatus = loadedStatus;
  history = [state.currentUrl];
  render();
  window.setInterval(updateClock, 30000);
});
