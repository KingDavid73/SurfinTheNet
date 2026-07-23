import "./styles.css";
import { notFoundPage, pages } from "./pages";
import type { AiConversation, AiStatus, AppId, GameState, PageComment, PageDefinition } from "./types";

const titleArtworkUrl = new URL("../assets/images/power-off-desk.png", import.meta.url).href;
const startupJingleUrl = new URL("../assets/audio/orbitos-startup.wav", import.meta.url).href;
const startupJingle = new Audio(startupJingleUrl);
startupJingle.preload = "auto";
startupJingle.volume = 0.58;

type StartupStage = "title" | "powering" | "bios" | "splash" | "login" | "dialup" | "desktop";

const DEFAULT_STATE: GameState = {
  version: 2,
  visited: ["web://home"],
  bookmarks: ["web://rainbow.gdn/home"],
  downloads: [],
  flags: {},
  currentUrl: "web://home",
  settings: { theme: "classic", wallpaper: "teal", cursor: "arrow" },
  gameTime: "1999-11-03T19:30:00",
  pageComments: [],
  pageVisitCounts: { "web://home": 1 }
};

const PAGE_OWNERS: Record<string, { screenName: string; displayName: string }> = {
  orbit_guide: { screenName: "OrbitGuide", displayName: "OrbitGuide" },
  juniper_gdn: { screenName: "Juniper_Gdn", displayName: "Juniper" },
  mira_917: { screenName: "Mira_917", displayName: "Mira" },
  darkraven_xx: { screenName: "xX_DarkRaven_Xx", displayName: "DarkRaven" }
};

const GAME_TIME_SCALE = 2;

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
  chat: { open: false, minimized: false, z: 4, x: 190, y: 72, width: 620, height: 520 },
  settings: { open: false, minimized: false, z: 1, x: 260, y: 70, width: 590, height: 540 }
};

const APP_META: Record<AppId, { icon: string; title: string }> = {
  browser: { icon: "O", title: "Orbit Explorer" },
  mail: { icon: "@", title: "Orbit Mail" },
  files: { icon: "▣", title: "My Files" },
  chat: { icon: "◎", title: "Orbit Messenger" },
  settings: { icon: "⚙", title: "Desktop Settings" }
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
  warmupMs: null,
  warmed: false,
  error: null
};

let state = structuredClone(DEFAULT_STATE);
let history: string[] = [state.currentUrl];
let historyIndex = 0;
let topZ = 3;
let startOpen = false;
let notification = "";
let aiConversation = structuredClone(EMPTY_AI_CONVERSATION);
let aiStatus = structuredClone(EMPTY_AI_STATUS);
let chatBusy = false;
let chatPendingMessage = "";
let chatError = "";
let chatStartedAt = 0;
let startupStage: StartupStage = new URLSearchParams(window.location.search).has("skipBoot") ? "desktop" : "title";
let startupTimer: number | null = null;
let startupStatusTimer: number | null = null;
let computerHasBooted = startupStage === "desktop";
let sleepDialogOpen = false;
let lastGameClockTick = performance.now();
let lastClockSave = performance.now();
const pendingPageComments = new Set<string>();
const pageCommentErrors = new Map<string, string>();

const root = document.querySelector<HTMLDivElement>("#app")!;

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function formatDuration(milliseconds: number | null) {
  if (milliseconds === null) return "—";
  return milliseconds < 1000 ? `${milliseconds}ms` : `${(milliseconds / 1000).toFixed(1)}s`;
}

async function loadState() {
  if (window.gameAPI) return normalizeState(await window.gameAPI.load());
  const stored = localStorage.getItem("surfin-save");
  return stored ? normalizeState(JSON.parse(stored)) : structuredClone(DEFAULT_STATE);
}

function normalizeState(loaded: Partial<GameState>): GameState {
  return {
    ...structuredClone(DEFAULT_STATE),
    ...loaded,
    version: DEFAULT_STATE.version,
    settings: { ...DEFAULT_STATE.settings, ...(loaded.settings ?? {}) },
    pageComments: Array.isArray(loaded.pageComments) ? loaded.pageComments : [],
    pageVisitCounts: { ...DEFAULT_STATE.pageVisitCounts, ...(loaded.pageVisitCounts ?? {}) }
  };
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
  state.pageVisitCounts[state.currentUrl] = (state.pageVisitCounts[state.currentUrl] ?? 0) + 1;
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

function formatGameTimestamp(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

function pageCommentSection(page: PageDefinition) {
  const owner = PAGE_OWNERS[page.ownerId] ?? PAGE_OWNERS.orbit_guide;
  const visits = state.pageVisitCounts[page.url] ?? 0;
  const comments = state.pageComments.filter((comment) =>
    comment.pageUrl === page.url && (comment.role === "player" || comment.revealAfterVisit <= visits)
  );
  const pending = pendingPageComments.has(page.url);
  const unavailable = !aiStatus.modelAvailable || aiStatus.phase === "loading" || aiStatus.phase === "warming";
  const commentHtml = comments.length
    ? comments.map((comment) => `<article class="page-comment ${comment.role}">
        <header><b>${escapeHtml(comment.author)}</b><time>${escapeHtml(formatGameTimestamp(comment.createdAt))}</time></header>
        <p>${escapeHtml(comment.text)}</p>
      </article>`).join("")
    : `<p class="no-comments">Nobody has commented on this page yet.</p>`;

  return `<section class="page-comments">
    <header class="comments-heading"><div><small>PUBLIC COMMENTS</small><h2>Talk to ${escapeHtml(owner.displayName)}</h2></div><span>${comments.length} message${comments.length === 1 ? "" : "s"}</span></header>
    <div class="comment-list">${commentHtml}</div>
    ${pageCommentErrors.has(page.url) ? `<p class="comment-error">${escapeHtml(pageCommentErrors.get(page.url)!)}</p>` : ""}
    <form class="page-comment-form" data-comment-page="${escapeHtml(page.url)}">
      <label><b>David:</b><textarea name="comment" maxlength="500" rows="3" placeholder="Leave a comment for ${escapeHtml(owner.screenName)}..." ${pending || unavailable ? "disabled" : ""}></textarea></label>
      <button ${pending || unavailable ? "disabled" : ""}>${pending ? "Posting..." : unavailable ? "Offline" : "Post"}</button>
    </form>
    <p class="comment-note">${pending ? `${escapeHtml(owner.screenName)} will answer in the background.` : "Replies are delivered asynchronously and appear the next time this page loads."}</p>
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
    <div class="browser-viewport site-${page.site}">${page.render(state)}${pageCommentSection(page)}</div>
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

function settingsWindow() {
  const settingOption = (group: "theme" | "wallpaper" | "cursor", value: string, title: string, description: string) => `
    <label class="setting-option ${state.settings[group] === value ? "selected" : ""}">
      <input type="radio" name="${group}" value="${value}" data-setting="${group}" ${state.settings[group] === value ? "checked" : ""}>
      <span class="setting-preview preview-${group}-${value}"><i></i></span>
      <span><b>${title}</b><small>${description}</small></span>
    </label>`;

  return windowShell("settings", "Desktop Settings", "⚙", `
    <div class="settings-layout">
      <aside><h2>Appearance</h2><p>Personalize this OrbitOS profile.</p><span>Some styles may become unlockable as you explore.</span></aside>
      <main>
        <fieldset><legend>Color theme</legend>
          ${settingOption("theme", "classic", "Orbit Classic", "Gray windows and blue title bars")}
          ${settingOption("theme", "plum", "After Hours", "Plum windows with amber highlights")}
        </fieldset>
        <fieldset><legend>Wallpaper</legend>
          ${settingOption("wallpaper", "teal", "Orbit Teal", "The familiar OrbitOS desktop")}
          ${settingOption("wallpaper", "clouds", "Evening Clouds", "A dreamy violet sky at dusk")}
        </fieldset>
        <fieldset><legend>Mouse pointer</legend>
          ${settingOption("cursor", "arrow", "System Arrow", "Standard precise pointer")}
          ${settingOption("cursor", "star", "Star Pointer", "A playful unlockable-style cursor")}
        </fieldset>
      </main>
    </div>
    <footer class="settings-footer"><span>Changes are saved to this profile.</span><button data-close="settings">OK</button></footer>`);
}

function chatWindow() {
  const persona = aiConversation.persona;
  const modelStarting = aiStatus.phase === "loading" || aiStatus.phase === "warming";
  const statusLabel = aiStatus.phase === "ready"
    ? "model on disk · loads with first message"
    : aiStatus.phase === "loading"
      ? "loading 2.5 GB model into memory…"
      : aiStatus.phase === "warming"
        ? "warming up local model…"
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
    ? `<div class="chat-empty"><b>${escapeHtml(persona.screenName)} is online.</b><span>Send something to begin the local conversation test.</span><span>${aiStatus.warmed ? "Qwen3-4B was preloaded during startup." : aiStatus.phase === "idle" ? "Qwen3-4B is loaded and ready." : "Qwen3-4B is still getting ready in the background."}</span></div>`
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
      <textarea name="message" maxlength="500" rows="2" placeholder="${modelStarting ? "Local model is starting up…" : "Type an instant message…"}" ${chatBusy || modelStarting || !aiStatus.modelAvailable ? "disabled" : ""}></textarea>
      <button ${chatBusy || modelStarting || !aiStatus.modelAvailable ? "disabled" : ""}>${chatBusy || modelStarting ? "Waiting…" : "Send"}</button>
    </form>
    <footer class="ai-statusbar"><span data-ai-phase>${escapeHtml(statusLabel)}</span><span data-ai-elapsed>${chatBusy ? "0.0s elapsed" : aiStatus.loadMs ? `load ${formatDuration(aiStatus.loadMs)}` : "not loaded"}</span></footer>`);
}

function bootAiStatus() {
  if (!aiStatus.modelAvailable) return aiStatus.error ? "Communications module unavailable" : "Checking communications hardware...";
  if (aiStatus.phase === "loading") return "Loading local communications module...";
  if (aiStatus.phase === "warming") return "Tuning local communications module...";
  if (aiStatus.phase === "idle" && aiStatus.warmed) return "Communications module ready";
  if (aiStatus.phase === "error") return "Communications module offline";
  return "Communications module queued";
}

function startupScreen() {
  const scanlines = `<div class="crt-scanlines" aria-hidden="true"></div>`;

  if (startupStage === "title" || startupStage === "powering") {
    return `<main class="startup-screen desk-stage ${startupStage}">
      <img class="startup-desk-art" src="${titleArtworkUrl}" alt="A powered-off beige computer on a desk at night">
      <div class="desk-vignette"></div>
      <div class="game-title"><small>AN ORBIT NETWORK EXPERIENCE</small><h1>SURFIN' THE NET</h1><p>Some pages were never meant to be found.</p></div>
      <button class="computer-power" data-power aria-label="Turn on the computer"><i></i><span>POWER ON</span></button>
      <div class="screen-flicker" aria-hidden="true"></div>
      ${scanlines}
    </main>`;
  }

  if (startupStage === "bios") {
    return `<main class="startup-screen bios-stage">
      <section class="bios-copy">
        <header>ORBIT SYSTEMS POST BIOS v2.04 &nbsp; Copyright (C) 1999</header>
        <p style="--line:0">Orbit Pentium II Compatible CPU at 350 MHz</p>
        <p style="--line:1">Memory Test: 65536K OK</p>
        <p style="--line:2">Primary Master: QUANTUM FIREBALL 4.3GB</p>
        <p style="--line:3">Primary Slave: ORBIT CD-ROM 24X</p>
        <p style="--line:4">Keyboard... Detected &nbsp;&nbsp; Mouse... Detected</p>
        <p style="--line:5">Initializing Plug and Play Cards...</p>
        <p style="--line:6">OrbitLink 56K Voice/Data/Fax Modem........ OK</p>
        <p style="--line:7">Booting from C:\\</p>
        <footer>Press DEL to enter SETUP</footer>
      </section>
      ${scanlines}
    </main>`;
  }

  if (startupStage === "splash") {
    return `<main class="startup-screen splash-stage">
      <section class="orbitos-splash">
        <div class="orbit-mark"><span>O</span></div>
        <div><small>Orbit Systems presents</small><h1><b>ORBIT</b>OS <em>98</em></h1><p>Where do you want to go tonight?</p></div>
      </section>
      <div class="os-load-track"><i></i><i></i><i></i><i></i><i></i></div>
      ${scanlines}
    </main>`;
  }

  if (startupStage === "login") {
    return `<main class="startup-screen login-stage">
      <div class="login-clouds"></div>
      <header class="login-logo"><b>ORBIT</b><span>OS</span><em>98</em></header>
      <section class="login-panel">
        <h1>Welcome to OrbitOS</h1>
        <p>Select a user to begin.</p>
        <button class="user-profile" data-login-user>
          <span class="user-avatar">D</span>
          <span><b>David</b><small>Local User &middot; November 3, 1999</small></span>
          <i>&rsaquo;</i>
        </button>
        <button class="user-profile empty-profile" disabled>
          <span class="user-avatar">+</span>
          <span><b>New User</b><small>Create another profile</small></span>
        </button>
        <footer><i class="activity-light"></i><span data-boot-ai>${escapeHtml(bootAiStatus())}</span></footer>
      </section>
      ${scanlines}
    </main>`;
  }

  return `<main class="startup-screen dialup-stage">
    <div class="dialup-wallpaper">
      <div class="wallpaper-logo"><span>ORBIT</span><b>OS</b><small>98</small></div>
    </div>
    <section class="dialup-dialog">
      <header>Connect to OrbitNet <button disabled>&times;</button></header>
      <div class="dialup-body">
        <div class="modem-art"><span>PC</span><i></i><b>O</b></div>
        <div><h2>Connecting to OrbitNet...</h2><p>Dialing 555-0179</p><div class="dialup-progress"><i></i></div></div>
      </div>
      <div class="dialup-log"><span>Dialing...</span><span>Negotiating connection...</span><span>Verifying user name and password...</span></div>
      <footer><span data-boot-ai>${escapeHtml(bootAiStatus())}</span><button disabled>Cancel</button></footer>
    </section>
    ${scanlines}
  </main>`;
}

function clearStartupTimer() {
  if (startupTimer !== null) {
    window.clearTimeout(startupTimer);
    startupTimer = null;
  }
}

function waitForStartup(milliseconds: number) {
  return new Promise<void>((resolve) => {
    clearStartupTimer();
    startupTimer = window.setTimeout(() => {
      startupTimer = null;
      resolve();
    }, milliseconds);
  });
}

function updateBootAiLabel() {
  const label = document.querySelector<HTMLElement>("[data-boot-ai]");
  if (label) label.textContent = bootAiStatus();
}

async function pollBootAiStatus() {
  if (!window.aiAPI) return;
  try {
    aiStatus = await window.aiAPI.status();
    updateBootAiLabel();
  } catch {
    // The desktop remains usable without the optional local model.
  }
}

function beginAiPreload() {
  if (!window.aiAPI) return;
  void window.aiAPI.preload().then((status) => {
    aiStatus = status;
    updateBootAiLabel();
    if (startupStage === "desktop") render();
  }).catch((error) => {
    aiStatus = {
      ...aiStatus,
      phase: "error",
      error: error instanceof Error ? error.message : String(error)
    };
    updateBootAiLabel();
    if (startupStage === "desktop") render();
  });
  if (startupStatusTimer === null) {
    startupStatusTimer = window.setInterval(() => void pollBootAiStatus(), 500);
  }
}

async function startComputer() {
  if (startupStage !== "title") return;
  startupStage = "powering";
  beginAiPreload();
  render();

  await waitForStartup(2300);
  startupStage = "bios";
  render();

  await waitForStartup(3600);
  startupStage = "splash";
  render();
  startupJingle.currentTime = 0;
  void startupJingle.play().catch(() => undefined);

  await waitForStartup(3900);
  startupStage = "login";
  render();
}

async function loginUser() {
  if (startupStage !== "login") return;
  if (computerHasBooted) {
    startupStage = "desktop";
    lastGameClockTick = performance.now();
    render();
    return;
  }
  startupStage = "dialup";
  render();
  playDialupSounds();
  await waitForStartup(7800);
  startupStage = "desktop";
  computerHasBooted = true;
  lastGameClockTick = performance.now();
  if (startupStatusTimer !== null) {
    window.clearInterval(startupStatusTimer);
    startupStatusTimer = null;
  }
  await pollBootAiStatus();
  render();
}

function playDialupSounds() {
  const AudioContextClass = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const master = context.createGain();
  master.gain.setValueAtTime(0.025, context.currentTime);
  master.connect(context.destination);
  const tones = [
    [0.00, 440, 0.32], [0.34, 620, 0.28], [0.70, 520, 0.20],
    [1.05, 1200, 0.12], [1.22, 980, 0.14], [1.45, 1500, 0.10],
    [2.10, 700, 0.18], [2.34, 1050, 0.16], [2.58, 1350, 0.12]
  ];
  for (const [offset, frequency, duration] of tones) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = offset < 1 ? "sine" : "square";
    oscillator.frequency.setValueAtTime(frequency, context.currentTime + offset);
    gain.gain.setValueAtTime(0.0001, context.currentTime + offset);
    gain.gain.exponentialRampToValueAtTime(0.35, context.currentTime + offset + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + offset + duration);
    oscillator.connect(gain).connect(master);
    oscillator.start(context.currentTime + offset);
    oscillator.stop(context.currentTime + offset + duration + 0.02);
  }
  window.setTimeout(() => void context.close(), 3400);
}

function bindStartupEvents() {
  document.querySelector<HTMLElement>("[data-power]")?.addEventListener("click", () => void startComputer());
  document.querySelector<HTMLElement>("[data-login-user]")?.addEventListener("click", () => void loginUser());
}

function sleepDialog() {
  if (!sleepDialogOpen) return "";
  const gameDate = new Date(state.gameTime);
  const timeLabel = new Intl.DateTimeFormat([], { weekday: "long", hour: "numeric", minute: "2-digit" }).format(gameDate);
  return `<div class="system-dialog-backdrop">
    <section class="sleep-dialog">
      <header>Sleep Mode <button data-sleep-cancel aria-label="Close">&times;</button></header>
      <main><div class="sleep-moon">☾</div><div><h2>How long should David sleep?</h2><p>Current time: <b>${escapeHtml(timeLabel)}</b></p></div></main>
      <div class="sleep-options">
        <button data-sleep-hours="1"><b>Take a nap</b><span>Advance 1 hour</span></button>
        <button data-sleep-hours="3"><b>Sleep a while</b><span>Advance 3 hours</span></button>
        <button data-sleep-hours="morning"><b>Until morning</b><span>Wake at 7:00 AM</span></button>
      </div>
      <footer>Sleeping advances the story clock. Nothing progresses while the computer is off.</footer>
    </section>
  </div>`;
}

function render() {
  if (startupStage !== "desktop") {
    root.innerHTML = startupScreen();
    bindStartupEvents();
    return;
  }

  root.innerHTML = `<main class="desktop theme-${state.settings.theme} wallpaper-${state.settings.wallpaper} cursor-${state.settings.cursor}">
    <div class="wallpaper-logo"><span>ORBIT</span><b>OS</b><small>98</small></div>
    <div class="desktop-icons">
      <button data-open="browser"><span class="desktop-icon globe">O</span><b>Orbit Explorer</b></button>
      <button data-open="mail"><span class="desktop-icon mail">@</span><b>Orbit Mail</b></button>
      <button data-open="files"><span class="desktop-icon folder">▰</span><b>My Files</b></button>
      <button data-open="chat"><span class="desktop-icon chat">◎</span><b>Orbit Messenger</b></button>
      <button data-open="settings"><span class="desktop-icon settings">⚙</span><b>Settings</b></button>
    </div>
    <aside class="sticky-note"><b>THINGS TO TRY</b><span>• Leave a page comment</span><span>• Reload it for a reply</span><span>• Try Settings + Sleep</span></aside>
    ${browserWindow()}${mailWindow()}${filesWindow()}${chatWindow()}${settingsWindow()}
    ${notification ? `<div class="toast">${notification}</div>` : ""}
    ${startOpen ? `<div class="start-menu"><header><b>OrbitOS</b><span>98</span></header><button data-open="browser">🌐 Orbit Explorer</button><button data-open="chat">💬 Orbit Messenger</button><button data-open="mail">✉ Orbit Mail</button><button data-open="files">📁 My Files</button><button data-open="settings">⚙ Desktop Settings</button><hr><button data-session="sleep">☾ Sleep...</button><button data-session="logoff">⇥ Log Off David</button><button data-session="shutdown">◉ Shut Down</button><hr><button data-reset>↻ Reset Demo</button></div>` : ""}
    <footer class="taskbar"><button class="start-button ${startOpen ? "pressed" : ""}" data-start><span>◈</span> Start</button><div class="task-buttons">${(Object.keys(windows) as AppId[]).filter((app) => windows[app].open).map((app) => `<button data-task="${app}" class="${!windows[app].minimized && windows[app].z === topZ ? "active" : ""}">${APP_META[app].icon} ${APP_META[app].title}</button>`).join("")}</div><time id="clock"></time></footer>
    ${sleepDialog()}
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
        : aiStatus.phase === "warming"
          ? "warming up local model…"
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

async function submitPageComment(pageUrl: string, message: string) {
  const page = pages[pageUrl] ?? notFoundPage(pageUrl);
  const owner = PAGE_OWNERS[page.ownerId] ?? PAGE_OWNERS.orbit_guide;
  const playerComment: PageComment = {
    id: crypto.randomUUID(),
    pageUrl,
    ownerId: page.ownerId,
    role: "player",
    author: "David",
    text: message,
    createdAt: state.gameTime,
    revealAfterVisit: state.pageVisitCounts[pageUrl] ?? 1
  };
  state.pageComments.push(playerComment);
  pendingPageComments.add(pageUrl);
  pageCommentErrors.delete(pageUrl);
  await saveState();
  render();

  if (!window.aiAPI) {
    pendingPageComments.delete(pageUrl);
    pageCommentErrors.set(pageUrl, "The local character service is unavailable.");
    render();
    return;
  }
  try {
    const recentComments = state.pageComments
      .filter((comment) => comment.pageUrl === pageUrl && comment.id !== playerComment.id)
      .slice(-6)
      .map((comment) => ({ author: comment.author, text: comment.text }));
    const result = await window.aiAPI.comment({
      ownerId: page.ownerId,
      pageUrl,
      pageTitle: page.title,
      pageSummary: page.summary,
      playerComment: message,
      recentComments
    });
    state.pageComments.push({
      id: crypto.randomUUID(),
      pageUrl,
      ownerId: page.ownerId,
      role: "owner",
      author: result.owner.screenName || owner.screenName,
      text: result.text,
      createdAt: state.gameTime,
      revealAfterVisit: (state.pageVisitCounts[pageUrl] ?? 0) + 1
    });
    aiStatus = await window.aiAPI.status();
    await saveState();
    pendingPageComments.delete(pageUrl);
    if (startupStage === "desktop") showNotification(`${owner.screenName} replied. Reload the page to see it.`);
  } catch (error) {
    pendingPageComments.delete(pageUrl);
    pageCommentErrors.set(pageUrl, error instanceof Error ? error.message.replace(/^Error invoking remote method '[^']+':\s*/i, "") : String(error));
    if (startupStage === "desktop") render();
  }
}

function localGameTimeString(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function advanceGameTime(option: string) {
  const date = new Date(state.gameTime);
  if (option === "morning") {
    if (date.getHours() >= 7) date.setDate(date.getDate() + 1);
    date.setHours(7, 0, 0, 0);
  } else {
    date.setHours(date.getHours() + Number(option));
  }
  state.gameTime = localGameTimeString(date);
  lastGameClockTick = performance.now();
  sleepDialogOpen = false;
  void saveState();
  showNotification(`Clock advanced to ${new Intl.DateTimeFormat([], { weekday: "short", hour: "numeric", minute: "2-digit" }).format(date)}.`);
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
  document.querySelectorAll<HTMLInputElement>("[data-setting]").forEach((input) => input.addEventListener("change", () => {
    const group = input.dataset.setting as keyof GameState["settings"];
    state.settings = { ...state.settings, [group]: input.value };
    void saveState();
    render();
  }));
  document.querySelector<HTMLFormElement>(".page-comment-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const message = new FormData(form).get("comment")?.toString().trim() ?? "";
    const pageUrl = form.dataset.commentPage ?? state.currentUrl;
    if (message) void submitPageComment(pageUrl, message);
  });
  document.querySelectorAll<HTMLElement>("[data-session]").forEach((button) => button.addEventListener("click", () => {
    const action = button.dataset.session;
    startOpen = false;
    if (action === "sleep") {
      sleepDialogOpen = true;
      render();
    } else if (action === "logoff") {
      void saveState();
      startupStage = "login";
      render();
    } else if (action === "shutdown") {
      void saveState();
      computerHasBooted = false;
      startupStage = "title";
      render();
    }
  }));
  document.querySelector<HTMLElement>("[data-sleep-cancel]")?.addEventListener("click", () => {
    sleepDialogOpen = false;
    render();
  });
  document.querySelectorAll<HTMLElement>("[data-sleep-hours]").forEach((button) => button.addEventListener("click", () => {
    advanceGameTime(button.dataset.sleepHours ?? "1");
  }));
  document.querySelector<HTMLElement>("[data-reset]")?.addEventListener("click", async () => {
    state = normalizeState(window.gameAPI ? await window.gameAPI.reset() : structuredClone(DEFAULT_STATE));
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
  const now = performance.now();
  if (startupStage === "desktop") {
    const elapsed = now - lastGameClockTick;
    if (elapsed > 0) {
      const gameDate = new Date(state.gameTime);
      gameDate.setMilliseconds(gameDate.getMilliseconds() + elapsed * GAME_TIME_SCALE);
      state.gameTime = localGameTimeString(gameDate);
    }
    if (now - lastClockSave >= 30_000) {
      lastClockSave = now;
      void saveState();
    }
  }
  lastGameClockTick = now;
  const clock = document.querySelector<HTMLTimeElement>("#clock");
  if (clock) {
    const gameDate = new Date(state.gameTime);
    clock.dateTime = state.gameTime;
    clock.title = `Game time · ${new Intl.DateTimeFormat([], { dateStyle: "full", timeStyle: "short" }).format(gameDate)}`;
    clock.innerHTML = `<b>${new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit" }).format(gameDate)}</b><span>${new Intl.DateTimeFormat([], { weekday: "short", month: "numeric", day: "numeric" }).format(gameDate)}</span>`;
  }
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
  lastGameClockTick = performance.now();
  render();
  window.setInterval(updateClock, 1000);
});
