const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("node:fs/promises");
const path = require("node:path");
const { AiService } = require("./ai-service.cjs");

if (process.env.SMOKE_TEST || process.env.STORY_SMOKE_TEST || process.env.AI_SMOKE_TEST || process.env.BOOT_SMOKE_TEST || process.env.COMMENT_SMOKE_TEST || process.env.UI_SMOKE_TEST || process.env.AMBIENT_SMOKE_TEST || process.env.SAFEGUARD_SMOKE_TEST) {
  app.setPath("userData", path.join(app.getPath("temp"), `surfin-the-net-smoke-${process.pid}`));
}

const aiService = new AiService({
  rootDirectory: __dirname,
  getUserDataDirectory: () => app.getPath("userData")
});

const DEFAULT_SAVE = {
  version: 6,
  playerName: "",
  storyPhase: 1,
  discoveredMysteries: [],
  visited: ["web://home"],
  bookmarks: ["web://rainbow.gdn/home"],
  downloads: [],
  flags: {},
  currentUrl: "web://home",
  settings: { theme: "classic", wallpaper: "teal", cursor: "arrow", musicVolume: 50, browserTextSize: "medium" },
  gameTime: "1999-11-03T19:30:00",
  pageComments: [],
  ambientPostQueue: [],
  pageVisitCounts: { "web://home": 1 },
  guestbookEntries: {},
  directMessages: [{
    id: "mira-welcome-1999",
    ownerId: "mira_917",
    channel: "aim",
    role: "owner",
    author: "Mira_917",
    text: "hey, you made it! welcome to OrbitNet. poke around the community zones and search for whatever sounds interesting—there are some wonderfully weird pages hiding in here.",
    createdAt: "1999-11-03T19:31:00"
  }],
  relationships: { mira_917: 10, juniper_gdn: 12, darkraven_xx: 5, orbit_guide: 10, chip_bytebarn: 8, toni_pizza: 10, bev_paws: 12, pulsenet_jax: 8, axiom_liaison_02: 6, cubby_clover: 10, rocketbox_rick: 8, major_munch: 10, kip_toonburst: 9, king_cal: -2, honest_earl: -3, lagmaster_99: 4, velvet_mage: 7, player_four: 10, modkit_maddy: 8, quarter_queen: 7, code_dex: 9, deckwrecker_dee: 6, crankcase_cole: 8, neonblade_nico: 9, tiderider_ty: 8, throttle_troy: 12, scootlord_ollie: 5, veloce_viktor: -8, catnap_carla: 10, fetchquest_ray: 9, bunbrigade_bea: 11, hamcam_hal: 7, iguana_iris: 6, skunkuncle_sam: 8, mossmunch_mel: 9, blipzo_believer_88: 7, tapeattic_tess: 10, prismpilot_aya: 8, deepdelver_dot: 9, mapmouse_mina: 10, road_hog_ron: 7, grandma_dot: 12, colonel_hal: 6, railroad_lenny: 8, big_bass_bob: 9, rosepatch_ruth: 8, hearthside_ellen: 5, snacktime_sue: 7, trailnote_tom: 6, paperbird_pam: 8, faxmoth_13: 4, nullindex: 2, cedar_wren: 1, static_abel: 0, orchard_lee: 3, skywatch_sam: 1, ghostline: 0 }
};

function savePath() {
  return path.join(app.getPath("userData"), "save.json");
}

async function readSave() {
  try {
    const stored = JSON.parse(await fs.readFile(savePath(), "utf8"));
    const merged = { ...DEFAULT_SAVE, ...stored };
    if (stored.playerName === undefined && Number(stored.version ?? 0) < 5) merged.playerName = "David";
    return merged;
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
ipcMain.handle("ai:safeguard-text", (_event, text) => aiService.safeguardText(text));
ipcMain.handle("ai:page-comment", (_event, request) => aiService.generatePageReply(request));
ipcMain.handle("ai:ambient-comment", (_event, request) => aiService.generateAmbientComment(request));
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

  const skipBoot = Boolean(process.env.SMOKE_TEST || process.env.STORY_SMOKE_TEST || process.env.AI_SMOKE_TEST || process.env.COMMENT_SMOKE_TEST || process.env.UI_SMOKE_TEST);
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
        const screenshotWidth = Number(process.env.SCREENSHOT_WIDTH);
        const screenshotHeight = Number(process.env.SCREENSHOT_HEIGHT);
        if (screenshotWidth >= 860 && screenshotHeight >= 600) {
          win.setSize(Math.round(screenshotWidth), Math.round(screenshotHeight));
          await new Promise((resolve) => setTimeout(resolve, 250));
        }
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

          await click('[data-browser="home"]');
          const homepageHasComments = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.page-comments'))`);
          if (homepageHasComments) throw new Error("OrbitNet homepage still has a public comment section");
          const browserControlsReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('[data-browser="refresh"]'))`);
          if (!browserControlsReady) throw new Error("Browser refresh button was not available");
          await click('[data-maximize="browser"]');
          const browserMaximized = await win.webContents.executeJavaScript(`(() => { const viewport = document.querySelector('.browser-viewport'); const page = viewport?.querySelector('.browser-page-scale > .page'); if (!viewport || !page) return false; const viewportStyle = getComputedStyle(viewport); const pageStyle = getComputedStyle(page); return document.querySelector('.browser-window')?.classList.contains('maximized') && document.querySelector('[data-maximize="browser"]')?.getAttribute('aria-label') === 'Restore' && viewportStyle.backgroundColor === pageStyle.backgroundColor && viewportStyle.backgroundImage === pageStyle.backgroundImage; })()`);
          if (!browserMaximized) throw new Error("Browser maximize control did not fill the desktop");
          await click('[data-maximize="browser"]');
          const browserRestored = await win.webContents.executeJavaScript(`!document.querySelector('.browser-window')?.classList.contains('maximized') && document.querySelector('[data-maximize="browser"]')?.getAttribute('aria-label') === 'Maximize'`);
          if (!browserRestored) throw new Error("Browser maximize control did not restore the window");
          const mediumTextReady = await win.webContents.executeJavaScript(`document.querySelector('[data-browser-text-size]')?.value === 'medium' && document.querySelector('.browser-page-scale')?.classList.contains('text-medium')`);
          if (!mediumTextReady) throw new Error("Browser did not default to the readable Medium text size");
          const largeTextReady = await win.webContents.executeJavaScript(`(() => { const select = document.querySelector('[data-browser-text-size]'); if (!select) return false; select.value = 'large'; select.dispatchEvent(new Event('change', { bubbles: true })); return document.querySelector('.browser-page-scale')?.classList.contains('text-large'); })()`);
          if (!largeTextReady || (await readSave()).settings.browserTextSize !== "large") throw new Error("Browser text-size preference did not apply or persist");
          await win.webContents.executeJavaScript(`(() => { const select = document.querySelector('[data-browser-text-size]'); select.value = 'medium'; select.dispatchEvent(new Event('change', { bubbles: true })); return true; })()`);
          await click('[data-open="mail"]');
          const welcomeMailReady = await win.webContents.executeJavaScript(`(() => { const fixedRows = document.querySelectorAll('[data-mail]'); const welcome = document.querySelector('[data-mail="welcome"]'); if (fixedRows.length !== 1 || !welcome) return false; welcome.click(); return document.querySelector('#mail-preview')?.textContent.includes('member-made pages arranged into community zones'); })()`);
          if (!welcomeMailReady) throw new Error("New game did not begin with one descriptive Orbit welcome email");
          await click('[data-close="mail"]');
          await click('[data-open="chat"]');
          const friendWelcomeReady = await win.webContents.executeJavaScript(`document.querySelectorAll('.chat-message.character').length === 1 && document.querySelector('.chat-message.character p')?.textContent.includes('welcome to OrbitNet')`);
          if (!friendWelcomeReady) throw new Error("New game did not begin with Mira's welcome instant message");
          await click('[data-close="chat"]');
          const midiPlayerReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.browser-footer > .page-midi-player .midi-led.playing')) && document.querySelector('[data-page-music]')?.textContent.includes('Stop') && !document.querySelector('.browser-viewport > .page-midi-player')`);
          if (!midiPlayerReady) throw new Error("Homepage music did not auto-play from the browser-shell footer");
          const homePlaylistReady = await win.webContents.executeJavaScript(`document.querySelector('.page-midi-player')?.classList.contains('has-playlist') && document.querySelector('.page-midi-player')?.getAttribute('data-music-scope') === 'orbithome' && document.querySelector('.page-midi-player')?.getAttribute('data-finish-mode') === 'advance' && document.querySelector('.midi-controls > span')?.textContent.includes('/5') && document.querySelector('.midi-track code')?.textContent.endsWith('.mp3') && Boolean(document.querySelector('[data-page-music-prev]')) && Boolean(document.querySelector('[data-page-music-next]'))`);
          if (!homePlaylistReady) throw new Error("Five-track Blue Screen homepage playlist was unavailable");
          const musicControlsReady = await win.webContents.executeJavaScript(`(() => { const controls = document.querySelector('.midi-controls'); const transport = document.querySelector('.midi-transport'); const slider = document.querySelector('[data-page-music-volume]'); if (!controls || !transport || !slider) return false; const widthDifference = Math.abs(controls.getBoundingClientRect().width - transport.getBoundingClientRect().width); return transport.querySelectorAll('button').length === 3 && widthDifference <= 5 && controls.scrollWidth <= controls.clientWidth && slider.value === '50' && document.querySelector('.page-midi-player')?.getAttribute('data-music-volume') === '50'; })()`);
          if (!musicControlsReady) throw new Error("OrbitAmp transport or default midpoint volume layout was incomplete");
          const volumeChanged = await win.webContents.executeJavaScript(`(() => { const slider = document.querySelector('[data-page-music-volume]'); if (!slider) return false; slider.value = '25'; slider.dispatchEvent(new Event('input', { bubbles: true })); return document.querySelector('.page-midi-player')?.getAttribute('data-music-volume') === '25'; })()`);
          if (!volumeChanged) throw new Error("OrbitAmp volume slider did not update playback volume");
          await click('[data-browser="refresh"]');
          const volumePersisted = await win.webContents.executeJavaScript(`document.querySelector('[data-page-music-volume]')?.value === '25'`);
          if (!volumePersisted) throw new Error("OrbitAmp volume did not persist after a page refresh");
          await win.webContents.executeJavaScript(`(() => { const slider = document.querySelector('[data-page-music-volume]'); if (!slider) return false; slider.value = '50'; slider.dispatchEvent(new Event('input', { bubbles: true })); return true; })()`);
          await click("[data-page-music]");
          const midiStopped = await win.webContents.executeJavaScript(`!document.querySelector('.midi-led.playing') && document.querySelector('[data-page-music]')?.textContent.includes('Play')`);
          if (!midiStopped) throw new Error("Page music player did not stop");
          const expectedZoneUrls = [
            "web://orbitnet.local/zones/gamegrid",
            "web://orbitnet.local/zones/xtreme",
            "web://orbitnet.local/zones/petplanet",
            "web://orbitnet.local/zones/fanverse",
            "web://orbitnet.local/zones/yesterday",
            "web://orbitnet.local/zones/soundwave",
            "web://orbitnet.local/zones/cozycommons",
            "web://orbitnet.local/zones/backchannel"
          ];
          const homepageZoneUrls = await win.webContents.executeJavaScript(`Array.from(document.querySelectorAll('.zone-directory-card')).map((card) => card.getAttribute('data-nav'))`);
          if (JSON.stringify(homepageZoneUrls) !== JSON.stringify(expectedZoneUrls)) throw new Error(`OrbitNet homepage zone directory was incomplete: ${JSON.stringify(homepageZoneUrls)}`);
          await capture("orbitnet-zones.png");
          for (const zoneUrl of expectedZoneUrls) {
            await click(`[data-nav="${zoneUrl}"]`);
            const zoneReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.orbit-zone-page')) && !document.querySelector('.zone-categories') && !document.querySelector('.page-comments')`);
            if (!zoneReady) throw new Error(`Community zone was incomplete, retained placeholder departments, or had an unwanted comment thread: ${zoneUrl}`);
            if (zoneUrl.endsWith("/cozycommons")) {
              const expectedCozyUrls = [
                "web://rainbow.gdn/home",
                "web://rosepatch.home/garden",
                "web://hearthside.home/welcome",
                "web://snacktime.home/mompage",
                "web://trailnotes.home/index",
                "web://paperbird.home/crafts"
              ];
              const cozyUrls = await win.webContents.executeJavaScript(`Array.from(document.querySelectorAll('.cozy-member-card')).map((card) => card.getAttribute('data-nav'))`);
              if (JSON.stringify(cozyUrls) !== JSON.stringify(expectedCozyUrls)) throw new Error(`Cozy Commons member directory was incomplete: ${JSON.stringify(cozyUrls)}`);
              await win.webContents.executeJavaScript(`document.querySelector('.cozy-member-directory')?.scrollIntoView({ block: 'start' }); true`);
              await capture("orbitnet-zone-cozy-members.png");
              const cozyClasses = [".cozy-ruth-page", ".cozy-ellen-page", ".cozy-sue-page", ".cozy-tom-page", ".cozy-pam-page"];
              for (let cozyIndex = 1; cozyIndex < expectedCozyUrls.length; cozyIndex += 1) {
                await click(`[data-nav="${expectedCozyUrls[cozyIndex]}"]`);
                const cozyPageReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector(${JSON.stringify(cozyClasses[cozyIndex - 1])})) && Boolean(document.querySelector('.page-comments')) && Boolean(document.querySelector('[data-nav="web://orbitnet.local/zones/cozycommons"]'))`);
                if (!cozyPageReady) throw new Error(`Cozy Commons member page was incomplete: ${expectedCozyUrls[cozyIndex]}`);
                await capture(`cozy-member-${cozyIndex}.png`);
                await click('[data-nav="web://orbitnet.local/zones/cozycommons"]');
              }
            }
            if (zoneUrl.endsWith("/gamegrid")) {
              const gameGridInitialTrack = await win.webContents.executeJavaScript(`(() => { const player = document.querySelector('.page-midi-player'); return { playlist: player?.classList.contains('has-playlist'), scope: player?.getAttribute('data-music-scope'), index: Number(player?.getAttribute('data-track-index')), label: document.querySelector('.midi-track b')?.textContent, counter: document.querySelector('.midi-controls > span')?.textContent }; })()`);
              const gameGridTrackLabels = ["Everybody's In", "Leave Reality Running", "CUBIT Pure Play"];
              if (!gameGridInitialTrack.playlist || gameGridInitialTrack.scope !== "gamegridzone" || gameGridInitialTrack.index < 0 || gameGridInitialTrack.index > 2 || gameGridInitialTrack.label !== gameGridTrackLabels[gameGridInitialTrack.index] || !gameGridInitialTrack.counter.includes(`${gameGridInitialTrack.index + 1}/3`)) {
                throw new Error(`GameGrid randomized multi-track player was unavailable: ${JSON.stringify(gameGridInitialTrack)}`);
              }
              await click("[data-page-music-next]");
              const expectedNextTrackIndex = (gameGridInitialTrack.index + 1) % gameGridTrackLabels.length;
              const nextTrackReady = await win.webContents.executeJavaScript(`document.querySelector('.page-midi-player')?.getAttribute('data-track-index') === ${JSON.stringify(String(expectedNextTrackIndex))} && document.querySelector('.midi-track b')?.textContent === ${JSON.stringify(gameGridTrackLabels[expectedNextTrackIndex])}`);
              if (!nextTrackReady) throw new Error("Page music next control did not select the next track");
              await click("[data-page-music-prev]");
              const previousTrackReady = await win.webContents.executeJavaScript(`document.querySelector('.page-midi-player')?.getAttribute('data-track-index') === ${JSON.stringify(String(gameGridInitialTrack.index))} && document.querySelector('.midi-track b')?.textContent === ${JSON.stringify(gameGridInitialTrack.label)}`);
              if (!previousTrackReady) throw new Error("Page music previous control did not return to the randomized starting track");
              const expectedMemberUrls = [
                "web://gamegrid.zone/users/lagmaster99/home",
                "web://gamegrid.zone/users/velvetmage/home",
                "web://gamegrid.zone/users/player4ever/home",
                "web://gamegrid.zone/users/modkitmaddy/home",
                "web://gamegrid.zone/users/quarterqueen/home",
                "web://gamegrid.zone/users/codedex/home"
              ];
              const memberUrls = await win.webContents.executeJavaScript(`Array.from(document.querySelectorAll('.gamegrid-member-card')).map((card) => card.getAttribute('data-nav'))`);
              if (JSON.stringify(memberUrls) !== JSON.stringify(expectedMemberUrls)) throw new Error(`Game Grid member directory was incomplete: ${JSON.stringify(memberUrls)}`);
              await win.webContents.executeJavaScript(`document.querySelector('.gamegrid-member-directory')?.scrollIntoView({ block: 'start' }); true`);
              await capture("orbitnet-zone-gamegrid-members.png");
              const memberPageClasses = [".lagmaster-page", ".velvetmage-page", ".playerfour-page", ".maddy-page", ".queenie-page", ".dex-page"];
              for (let memberIndex = 0; memberIndex < expectedMemberUrls.length; memberIndex += 1) {
                await click(`[data-nav="${expectedMemberUrls[memberIndex]}"]`);
                const memberPageReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector(${JSON.stringify(memberPageClasses[memberIndex])})) && document.querySelectorAll('.page-comment').length >= 4 && Boolean(document.querySelector('.page-comments'))`);
                if (!memberPageReady) throw new Error(`Game Grid member page was incomplete: ${expectedMemberUrls[memberIndex]}`);
                await capture(`gamegrid-member-${memberIndex + 1}.png`);
                if (memberIndex >= 3) {
                  const gameArtReady = await win.webContents.executeJavaScript(`document.querySelectorAll('.gamegrid-art').length >= 8 && document.querySelectorAll('img[alt^="Screenshot"]').length === 3`);
                  if (!gameArtReady) throw new Error(`Generated art or fake-game screenshots were missing: ${expectedMemberUrls[memberIndex]}`);
                  await win.webContents.executeJavaScript(`(document.querySelector('.game-shot-grid') ?? document.querySelector('.dex-files'))?.scrollIntoView({ block: 'start' }); true`);
                  await capture(`gamegrid-member-${memberIndex + 1}-games.png`);
                }
                await click('[data-nav="web://orbitnet.local/zones/gamegrid"]');
              }
            }
            if (zoneUrl.endsWith("/xtreme")) {
              const xtremeZoneMusicReady = await win.webContents.executeJavaScript(`document.querySelector('.page-midi-player')?.getAttribute('data-music-scope') === 'xtremezone' && document.querySelector('.midi-track b')?.textContent === 'Extreme Sports Web Loop 1999' && document.querySelector('.midi-track code')?.textContent.endsWith('.mp3')`);
              if (!xtremeZoneMusicReady) throw new Error("X-Treme Edge zone MP3 was not assigned");
              const singleTrackTransportReady = await win.webContents.executeJavaScript(`(() => { const controls = document.querySelector('.midi-controls'); const transport = document.querySelector('.midi-transport'); const player = document.querySelector('.page-midi-player'); if (!controls || !transport || !player) return false; const widthDifference = Math.abs(controls.getBoundingClientRect().width - transport.getBoundingClientRect().width); return transport.querySelectorAll('button').length === 1 && widthDifference <= 5 && controls.scrollWidth <= controls.clientWidth && player.getAttribute('data-finish-mode') === 'loop'; })()`);
              if (!singleTrackTransportReady) throw new Error("Single-track OrbitAmp transport did not fill its available width");
              const expectedRiderUrls = [
                "web://xtreme.zone/users/deckwreckerdee/home",
                "web://xtreme.zone/users/crankcasecole/home",
                "web://xtreme.zone/users/neonbladenico/home",
                "web://xtreme.zone/users/tideriderty/home",
                "web://xtreme.zone/users/throttletroy/home",
                "web://xtreme.zone/users/scootlordollie/home",
                "web://xtreme.zone/users/veloceviktor/home"
              ];
              const riderUrls = await win.webContents.executeJavaScript(`Array.from(document.querySelectorAll('.xtreme-member-card')).map((card) => card.getAttribute('data-nav'))`);
              if (JSON.stringify(riderUrls) !== JSON.stringify(expectedRiderUrls)) throw new Error(`X-Treme Edge member directory was incomplete: ${JSON.stringify(riderUrls)}`);
              await win.webContents.executeJavaScript(`document.querySelector('.xtreme-member-directory')?.scrollIntoView({ block: 'start' }); true`);
              await capture("orbitnet-zone-xtreme-members.png");
              const riderClasses = [".dee-page", ".cole-page", ".nico-page", ".ty-page", ".troy-page", ".ollie-page", ".viktor-page"];
              const featureClasses = [".dee-feature", ".cole-jump", ".nico-action", ".ty-action", ".troy-action", ".ollie-action", ".viktor-feature"];
              const trackLabels = [["Demo Tape Spin", "Grip Tape Summer"], ["Tailwhip at Dusk"], ["Wheelbite Anthem"], ["Banzai Loop", "Banzai Loop II", "Cutback Chaos"], ["Roost and Thunder"], ["Scooter Kid Shuffle"], ["Riviera Idle"]];
              for (let riderIndex = 0; riderIndex < expectedRiderUrls.length; riderIndex += 1) {
                await click(`[data-nav="${expectedRiderUrls[riderIndex]}"]`);
                const riderPageReady = await win.webContents.executeJavaScript(`(() => { const player = document.querySelector('.page-midi-player'); const labels = ${JSON.stringify(trackLabels[riderIndex])}; return Boolean(document.querySelector(${JSON.stringify(riderClasses[riderIndex])})) && document.querySelectorAll('.page-comment').length >= 6 && document.querySelectorAll('.xtreme-art').length >= 8 && labels.some((label) => player?.textContent.includes(label)); })()`);
                if (!riderPageReady) throw new Error(`X-Treme Edge rider page was incomplete: ${expectedRiderUrls[riderIndex]}`);
                await capture(`xtreme-member-${riderIndex + 1}.png`);
                await win.webContents.executeJavaScript(`document.querySelector(${JSON.stringify(featureClasses[riderIndex])})?.scrollIntoView({ block: 'start' }); true`);
                await capture(`xtreme-member-${riderIndex + 1}-action.png`);
                await click('[data-nav="web://orbitnet.local/zones/xtreme"]');
              }
            }
            if (zoneUrl.endsWith("/petplanet")) {
              const expectedPetUrls = [
                "web://petplanet.zone/users/catnapcarla/home",
                "web://petplanet.zone/users/fetchquestray/home",
                "web://petplanet.zone/users/bunbrigadebea/home",
                "web://petplanet.zone/users/hamcamhal/home",
                "web://petplanet.zone/users/iguanairis/home",
                "web://petplanet.zone/users/skunkunclesam/home"
              ];
              const petUrls = await win.webContents.executeJavaScript(`Array.from(document.querySelectorAll('.petplanet-member-card')).map((card) => card.getAttribute('data-nav'))`);
              if (JSON.stringify(petUrls) !== JSON.stringify(expectedPetUrls)) throw new Error(`Pet Planet member directory was incomplete: ${JSON.stringify(petUrls)}`);
              await win.webContents.executeJavaScript(`document.querySelector('.petplanet-member-directory')?.scrollIntoView({ block: 'start' }); true`);
              await capture("orbitnet-zone-petplanet-members.png");
              const petClasses = [".carla-page", ".ray-page", ".bea-page", ".hal-page", ".iris-page", ".sam-page"];
              const trackLabels = ["Whisker Waltz", "Backyard Bound", "Parsley Promenade", "TubeNet Telemetry", "Basking After Dark", "Cabinet Caper"];
              for (let petIndex = 0; petIndex < expectedPetUrls.length; petIndex += 1) {
                await click(`[data-nav="${expectedPetUrls[petIndex]}"]`);
                const petPageReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector(${JSON.stringify(petClasses[petIndex])})) && document.querySelectorAll('.page-comment').length >= 6 && document.querySelectorAll('.pet-member-art').length === 3 && document.querySelector('.page-midi-player')?.textContent.includes(${JSON.stringify(trackLabels[petIndex])})`);
                if (!petPageReady) throw new Error(`Pet Planet member page was incomplete: ${expectedPetUrls[petIndex]}`);
                await capture(`petplanet-member-${petIndex + 1}.png`);
                await win.webContents.executeJavaScript(`document.querySelector('.pet-member-feature')?.scrollIntoView({ block: 'start' }); true`);
                await capture(`petplanet-member-${petIndex + 1}-feature.png`);
                await click('[data-nav="web://orbitnet.local/zones/petplanet"]');
              }
            }
            if (zoneUrl.endsWith("/fanverse")) {
              const expectedFandomUrls = [
                "web://fanverse.zone/users/mossmunchmel/home",
                "web://fanverse.zone/users/blipzobeliever88/home",
                "web://fanverse.zone/users/tapeattictess/home",
                "web://fanverse.zone/users/prismpilotaya/home",
                "web://fanverse.zone/users/deepdelverdot/home",
                "web://fanverse.zone/users/mapmousemina/home"
              ];
              const fandomUrls = await win.webContents.executeJavaScript(`Array.from(document.querySelectorAll('.fandom-member-card')).map((card) => card.getAttribute('data-nav'))`);
              if (JSON.stringify(fandomUrls) !== JSON.stringify(expectedFandomUrls)) throw new Error(`FanVerse member directory was incomplete: ${JSON.stringify(fandomUrls)}`);
              await win.webContents.executeJavaScript(`document.querySelector('.fandom-member-directory')?.scrollIntoView({ block: 'start' }); true`);
              await capture("orbitnet-zone-fanverse-members.png");
              const fandomClasses = [".moss-page", ".blipzo-page", ".starthimble-page", ".prism5-page", ".gemwell-page", ".atlas-page"];
              const featureClasses = [".moss-winding-gallery", ".blipzo-screen-orbit", ".star-cabinet-lab", ".prism-selector", ".gemwell-stratum-4", ".atlas-map-frame"];
              const trackLabels = ["Fogberry Moon", "Store 00 Loader", "Weather Drawer Waltz", "Five-Color Drive", "Lusterkin Descent", "Atlas in the Wind"];
              for (let fandomIndex = 0; fandomIndex < expectedFandomUrls.length; fandomIndex += 1) {
                await click(`[data-nav="${expectedFandomUrls[fandomIndex]}"]`);
                const fandomPageReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector(${JSON.stringify(fandomClasses[fandomIndex])})) && document.querySelectorAll('.page-comment').length >= 7 && document.querySelectorAll('main.page img').length >= ${fandomIndex < 4 ? 10 : 12} && document.querySelector('.page-midi-player')?.textContent.includes(${JSON.stringify(trackLabels[fandomIndex])})`);
                if (!fandomPageReady) throw new Error(`FanVerse member page was incomplete: ${expectedFandomUrls[fandomIndex]}`);
                if (fandomIndex === 2) {
                  await click('[data-fandom-toggle="star-drawer-three"]');
                  const drawerOpened = await win.webContents.executeJavaScript(`document.querySelector('#star-drawer-three')?.classList.contains('open') && document.querySelector('[data-fandom-toggle="star-drawer-three"]')?.getAttribute('aria-expanded') === 'true'`);
                  if (!drawerOpened) throw new Error("StarThimble cabinet drawer did not open");
                  await click('[data-fandom-animate="star-mystery-tape"]');
                  const tapeActivated = await win.webContents.executeJavaScript(`document.querySelector('#star-mystery-tape')?.classList.contains('activated')`);
                  if (!tapeActivated) throw new Error("StarThimble mystery tape did not reveal its discovery");
                }
                if (fandomIndex === 3) {
                  await click('[data-fandom-tab="violet"][data-fandom-target="prism-dossiers"]');
                  const violetSelected = await win.webContents.executeJavaScript(`document.querySelector('#prism-dossiers')?.getAttribute('data-active') === 'violet' && document.querySelector('[data-fandom-tab="violet"]')?.classList.contains('active')`);
                  if (!violetSelected) throw new Error("PRISM//5 character selector did not switch dossiers");
                  await click('[data-fandom-toggle="prism-sixth-reveal"]');
                  const sixthRevealed = await win.webContents.executeJavaScript(`document.querySelector('#prism-sixth-reveal')?.classList.contains('open')`);
                  if (!sixthRevealed) throw new Error("PRISM//5 sixth-color discovery did not open");
                }
                if (fandomIndex === 4) {
                  const cavernIsDeep = await win.webContents.executeJavaScript(`document.querySelector('.gemwell-page')?.scrollHeight > 6000 && document.querySelectorAll('.gemwell-specimen').length === 25`);
                  if (!cavernIsDeep) throw new Error("GEMWELL cavern was not deep enough or was missing specimens");
                  await click('[data-fandom-toggle="gemwell-note-0-0"]');
                  const specimenOpened = await win.webContents.executeJavaScript(`document.querySelector('#gemwell-note-0-0')?.classList.contains('open')`);
                  if (!specimenOpened) throw new Error("GEMWELL specimen note did not open");
                }
                if (fandomIndex === 5) {
                  const mapIsComplete = await win.webContents.executeJavaScript(`document.querySelectorAll('.atlas-hotspot').length === 12 && document.querySelectorAll('.atlas-legend button').length === 12`);
                  if (!mapIsComplete) throw new Error("Orra atlas was missing destinations");
                  await click('.atlas-hotspot-glass-orchard');
                  const fragmentOpened = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.atlas-fragment-glass-orchard')) && document.querySelectorAll('.atlas-fragment-page article img').length === 1 && !document.querySelector('.page-comments')`);
                  if (!fragmentOpened) throw new Error("Orra atlas fragment did not open as a one-image hidden page");
                  await capture("fandom-atlas-fragment.png");
                  await click(`[data-nav="${expectedFandomUrls[fandomIndex]}"]`);
                }
                await capture(`fandom-member-${fandomIndex + 1}.png`);
                await win.webContents.executeJavaScript(`document.querySelector(${JSON.stringify(featureClasses[fandomIndex])})?.scrollIntoView({ block: 'start' }); true`);
                await capture(`fandom-member-${fandomIndex + 1}-feature.png`);
                await click('[data-nav="web://orbitnet.local/zones/fanverse"]');
              }
            }
            if (zoneUrl.endsWith("/yesterday")) {
              const yesterdayZoneMusicReady = await win.webContents.executeJavaScript(`document.querySelector('.page-midi-player')?.getAttribute('data-music-scope') === 'yesterdayzone' && document.querySelector('.midi-track b')?.textContent === 'Good Old Days' && document.querySelector('.midi-track code')?.textContent.endsWith('.mp3')`);
              if (!yesterdayZoneMusicReady) throw new Error("Yesterday Online zone MP3 was not assigned");
              const expectedYesterdayUrls = [
                "web://yesterday.zone/users/roadhogron/home",
                "web://yesterday.zone/users/grandmadot/1997",
                "web://yesterday.zone/users/grandmadot/home",
                "web://yesterday.zone/users/colonelhal/home",
                "web://yesterday.zone/users/railroadlenny/home",
                "web://yesterday.zone/users/bigbassbob/home"
              ];
              const yesterdayUrls = await win.webContents.executeJavaScript(`Array.from(document.querySelectorAll('.yesterday-member-card')).map((card) => card.getAttribute('data-nav'))`);
              if (JSON.stringify(yesterdayUrls) !== JSON.stringify(expectedYesterdayUrls)) throw new Error(`Yesterday Online directory was incomplete: ${JSON.stringify(yesterdayUrls)}`);
              await win.webContents.executeJavaScript(`document.querySelector('.yesterday-member-directory')?.scrollIntoView({ block: 'start' }); true`);
              await capture("orbitnet-zone-yesterday-members.png");
              const yesterdayClasses = [".roadhog-page", ".dot-old-page", ".dot-new-page", ".colonel-hal-page", ".lenny-page", ".bob-page"];
              const trackLabels = [["Chrome and Grass", "Dented Fender Proud", "Hadda Lay 'Er Down", "Hadda Lay 'Er Down II"], ["Red Barn Beer"], ["Red Barn"], ["Tin Cup Reenactor"], ["Back on the Rails", "Whistle at Dawn"], ["Gone Fishin' Again", "Lake Day Legend", "Lake Day Legend II", "The One That Got Away", "Back Off the Line", "Big One Got Away", "Redacted Bait", "Reel It In"]];
              for (let yesterdayIndex = 0; yesterdayIndex < expectedYesterdayUrls.length; yesterdayIndex += 1) {
                await click(`[data-nav="${expectedYesterdayUrls[yesterdayIndex]}"]`);
                const yesterdayReady = await win.webContents.executeJavaScript(`(() => { const player = document.querySelector('.page-midi-player'); const labels = ${JSON.stringify(trackLabels[yesterdayIndex])}; return Boolean(document.querySelector(${JSON.stringify(yesterdayClasses[yesterdayIndex])})) && document.querySelectorAll('marquee').length >= 1 && labels.some((label) => player?.textContent.includes(label)) && !/secret/i.test(document.querySelector('.midi-track b')?.textContent ?? '') && ${yesterdayIndex === 1 ? "!document.querySelector('.page-comments') && document.querySelectorAll('.broken-old-image').length === 2" : "document.querySelectorAll('.page-comment').length >= 6 && Boolean(document.querySelector('.page-comments'))"}; })()`);
                if (!yesterdayReady) throw new Error(`Yesterday Online member page was incomplete: ${expectedYesterdayUrls[yesterdayIndex]}`);
                if (yesterdayIndex === 1) {
                  const duplicateDotLinked = await win.webContents.executeJavaScript(`Boolean(document.querySelector('[data-nav="web://yesterday.zone/users/grandmadot/home"]'))`);
                  if (!duplicateDotLinked) throw new Error("Grandma Dot's abandoned page did not link to her replacement page");
                }
                await capture(`yesterday-member-${yesterdayIndex + 1}.png`);
                await click('[data-nav="web://orbitnet.local/zones/yesterday"]');
              }
            }
            if (zoneUrl.endsWith("/cozycommons")) {
              const cozyUrls = await win.webContents.executeJavaScript(`Array.from(document.querySelectorAll('.cozy-member-card')).map((card) => card.getAttribute('data-nav'))`);
              if (cozyUrls.length !== 6) throw new Error(`Cozy Commons member directory was incomplete: ${JSON.stringify(cozyUrls)}`);
              await win.webContents.executeJavaScript(`document.querySelector('.cozy-member-directory')?.scrollIntoView({ block: 'start' }); true`);
              await capture("orbitnet-zone-cozy-commons.png");
            }
            if (zoneUrl.endsWith("/backchannel")) {
              const backchannelUrls = await win.webContents.executeJavaScript(`Array.from(document.querySelectorAll('.backchannel-member-card')).map((card) => card.getAttribute('data-nav'))`);
              const expectedBackchannelUrls = ["web://nightsignal.net/home", "web://raven.web/home"];
              if (JSON.stringify(backchannelUrls) !== JSON.stringify(expectedBackchannelUrls)) throw new Error(`Backchannel member directory was incomplete: ${JSON.stringify(backchannelUrls)}`);
              await win.webContents.executeJavaScript(`document.querySelector('.backchannel-member-directory')?.scrollIntoView({ block: 'start' }); true`);
              await capture("orbitnet-zone-backchannel.png");
            }
            await click('[data-nav="web://home"]');
          }
          await click("[data-download-helper]");
          const helperInstalled = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.desktop-icons [data-open="helper"]')) && !document.querySelector('.helper-window')`);
          if (!helperInstalled) throw new Error("Orbit Pal did not install closed on the desktop");
          await capture("orbit-pal-desktop-icon.png");
          await click('.desktop-icons [data-open="helper"]');
          const helperRunning = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.desktop-helper')) && Boolean(document.querySelector('[data-task="helper"]')) && !document.querySelector('.helper-window')`);
          if (!helperRunning) throw new Error("Launching Orbit Pal did not create a closed desktop buddy");
          await capture("orbit-pal-running.png");
          await click("[data-helper-talk]");
          const helperOpened = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.desktop-helper')) && Boolean(document.querySelector('.helper-window'))`);
          if (!helperOpened) throw new Error("Clicking the desktop buddy did not open Orbit Pal chat");
          await capture("orbit-pal-installed.png");
          await click("[data-helper-close]");
          const helperClosed = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.desktop-icons [data-open="helper"]')) && !document.querySelector('.desktop-helper') && !document.querySelector('.helper-window') && !document.querySelector('[data-task="helper"]')`);
          if (!helperClosed) throw new Error("Close Pal did not exit the buddy while preserving its installed icon");

          const searchFor = async (query, expectedUrl) => {
            const submitted = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('.orbit-search-form'); const input = form?.querySelector('input'); if (!form || !input) return false; input.value = ${JSON.stringify(query)}; form.requestSubmit(); return true; })()`);
            if (!submitted) throw new Error(`Search form unavailable for ${query}`);
            await new Promise((resolve) => setTimeout(resolve, 120));
            const found = await win.webContents.executeJavaScript(`Boolean(document.querySelector('[data-nav="${expectedUrl}"]'))`);
            if (!found) throw new Error(`Search for ${query} did not return ${expectedUrl}`);
          };
          await searchFor("food", "web://cosmiccrust.biz/home");
          await click('[data-nav="web://cosmiccrust.biz/home"]');
          const pizzaReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.pizza-page')) && Boolean(document.querySelector('.page-comments')) && Boolean(document.querySelector('.midi-led.playing')) && document.querySelector('.midi-controls > span')?.textContent.includes('/2') && document.querySelector('.midi-track code')?.textContent.endsWith('.mp3')`);
          if (!pizzaReady) throw new Error("Cosmic Crust page skeleton was incomplete");
          await capture("cosmic-crust.png");
          await click('[data-nav="web://cosmiccrust.biz/menu"]');
          const menuReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.cosmic-menu-page .cosmic-menu-grid')) && !document.querySelector('.page-comments')`);
          if (!menuReady) throw new Error("Cosmic Crust menu was incomplete or had a separate comment thread");
          await capture("cosmic-crust-menu.png");
          await click('[data-nav="web://cosmiccrust.biz/arcade"]');
          if (await win.webContents.executeJavaScript(`document.querySelectorAll('.arcade-leaderboards article').length !== 3 || Boolean(document.querySelector('.page-comments'))`)) throw new Error("Cosmic Crust arcade was incomplete or had a separate comment thread");
          await capture("cosmic-crust-arcade.png");
          await click('[data-nav="web://cosmiccrust.biz/alienclub"]');
          if (await win.webContents.executeJavaScript(`document.querySelectorAll('.club-perks article').length !== 3 || Boolean(document.querySelector('.page-comments'))`)) throw new Error("Cosmic Crust Alien Club was incomplete or had a separate comment thread");
          await capture("cosmic-crust-alien-club.png");
          await click('[data-browser="home"]');
          await searchFor("tech", "web://bytebarn.com/home");
          await click('[data-nav="web://bytebarn.com/home"]');
          const byteBarnReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.bytebarn-product .business-web-art')) && Boolean(document.querySelector('.page-comments')) && Boolean(document.querySelector('.midi-led.playing')) && document.querySelector('.midi-track b')?.textContent === 'Byte Barn Deal' && document.querySelector('.midi-track code')?.textContent === 'byte-barn-deal.mp3'`);
          if (!byteBarnReady) throw new Error("Byte Barn campaign page was incomplete");
          await capture("byte-barn.png");
          await click('[data-nav="web://bytebarn.com/systems"]');
          const systemsReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.bytebarn-systems-page .system-comparison')) && !document.querySelector('.page-comments')`);
          if (!systemsReady) throw new Error("Byte Barn systems page was incomplete or had a separate comment thread");
          await capture("byte-barn-systems.png");
          await click('[data-nav="web://bytebarn.com/software"]');
          if (await win.webContents.executeJavaScript(`document.querySelectorAll('.software-shelf article').length !== 5 || Boolean(document.querySelector('.page-comments'))`)) throw new Error("Byte Barn software aisle was incomplete or had a separate comment thread");
          await capture("byte-barn-software.png");
          await click('[data-nav="web://bytebarn.com/service"]');
          if (await win.webContents.executeJavaScript(`document.querySelectorAll('.service-menu article').length !== 4 || Boolean(document.querySelector('.page-comments'))`)) throw new Error("Byte Barn service page was incomplete or had a separate comment thread");
          await capture("byte-barn-service.png");
          await click('[data-browser="home"]');
          await searchFor("animals", "web://pawsnclaws.net/home");
          await click('[data-nav="web://pawsnclaws.net/home"]');
          const pawsReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.pickles-card .business-web-art')) && Boolean(document.querySelector('.page-comments')) && Boolean(document.querySelector('.midi-led.playing'))`);
          if (!pawsReady) throw new Error("Paws & Claws campaign page was incomplete");
          await capture("paws-and-claws.png");
          await click('[data-nav="web://pawsnclaws.net/adoption"]');
          const adoptionReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.paws-adoption-page .adoption-steps')) && !document.querySelector('.page-comments')`);
          if (!adoptionReady) throw new Error("Paws & Claws adoption page was incomplete or had a separate comment thread");
          await capture("paws-adoption.png");
          await click('[data-nav="web://pawsnclaws.net/departments"]');
          if (await win.webContents.executeJavaScript(`document.querySelectorAll('.department-map-grid article').length !== 3 || Boolean(document.querySelector('.page-comments'))`)) throw new Error("Paws & Claws departments were incomplete or had a separate comment thread");
          await capture("paws-departments.png");
          await click('[data-nav="web://pawsnclaws.net/photos"]');
          if (await win.webContents.executeJavaScript(`document.querySelectorAll('.pet-photo-wall article').length !== 6 || Boolean(document.querySelector('.page-comments'))`)) throw new Error("Paws & Claws photo wall was incomplete or had a separate comment thread");
          await capture("paws-photo-wall.png");
          await click('[data-browser="home"]');

          await searchFor("robot toys", "web://rocketbox.toys/home");
          await click('[data-nav="web://rocketbox.toys/home"]');
          const rocketboxReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.rocketbox-page .rocketbox-product .kids-business-art')) && Boolean(document.querySelector('.page-comments')) && Boolean(document.querySelector('.midi-led.playing')) && document.querySelector('.page-midi-player')?.textContent.includes('Toybox Turbo')`);
          if (!rocketboxReady) throw new Error("Rocketbox Toys campaign page was incomplete");
          await capture("kids-rocketbox.png");
          await click('[data-nav="web://rocketbox.toys/catalog"]');
          const rocketboxCatalogReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.rocketbox-catalog-page .rocketbox-catalog-grid')) && !document.querySelector('.page-comments')`);
          if (!rocketboxCatalogReady) throw new Error("Rocketbox catalog was incomplete or had a separate comment thread");
          await capture("kids-rocketbox-catalog.png");
          await click('[data-browser="home"]');

          await searchFor("breakfast", "web://moonmunch.com/home");
          await click('[data-nav="web://moonmunch.com/home"]');
          const moonmunchReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.moonmunch-page .moonmunch-mascot .kids-business-art')) && Boolean(document.querySelector('.page-comments')) && Boolean(document.querySelector('.midi-led.playing')) && document.querySelector('.page-midi-player')?.textContent.includes('Moon Munch Blast')`);
          if (!moonmunchReady) throw new Error("Moon Munch campaign page was incomplete");
          await capture("kids-moon-munch.png");
          await click('[data-nav="web://moonmunch.com/prizes"]');
          const moonmunchPrizesReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.moonmunch-prizes-page .prize-zone-hero')) && !document.querySelector('.page-comments')`);
          if (!moonmunchPrizesReady) throw new Error("Moon Munch prize page was incomplete or had a separate comment thread");
          await capture("kids-moon-munch-prizes.png");
          await click('[data-browser="home"]');

          await searchFor("saturday cartoons", "web://toonburst.tv/home");
          await click('[data-nav="web://toonburst.tv/home"]');
          const toonburstReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.toonburst-page .toonburst-hero .kids-business-art')) && Boolean(document.querySelector('.page-comments')) && Boolean(document.querySelector('.midi-led.playing')) && document.querySelector('.page-midi-player')?.textContent.includes('ToonBurst Theme')`);
          if (!toonburstReady) throw new Error("ToonBurst campaign page was incomplete");
          await capture("kids-toonburst.png");
          await click('[data-nav="web://toonburst.tv/schedule"]');
          const toonburstScheduleReady = await win.webContents.executeJavaScript(`document.querySelectorAll('.toonburst-schedule-page .toonburst-grid article').length === 6 && !document.querySelector('.page-comments')`);
          if (!toonburstScheduleReady) throw new Error("ToonBurst schedule was incomplete or had a separate comment thread");
          await capture("kids-toonburst-schedule.png");
          await click('[data-browser="home"]');

          const dealerSearchSubmitted = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('.orbit-search-form'); const input = form?.querySelector('input'); if (!form || !input) return false; input.value = 'used car dealership'; form.requestSubmit(); return true; })()`);
          if (!dealerSearchSubmitted) throw new Error("Used-car search form was unavailable");
          await new Promise((resolve) => setTimeout(resolve, 120));
          const dealerResults = await win.webContents.executeJavaScript(`Array.from(document.querySelectorAll('.search-results [data-nav]')).map((result) => result.getAttribute('data-nav'))`);
          for (const expectedUrl of ["web://kingcalscars.biz/home", "web://honestearl.com/home"]) {
            if (!dealerResults.includes(expectedUrl)) throw new Error(`Used-car search missed ${expectedUrl}: ${JSON.stringify(dealerResults)}`);
          }

          await click('[data-nav="web://kingcalscars.biz/home"]');
          const kingCalReady = await win.webContents.executeJavaScript(`(() => ({ page: Boolean(document.querySelector('.kingcal-page .cal-portrait .dealer-photo')), playlist: document.querySelector('.page-midi-player')?.classList.contains('has-playlist'), trackCount: document.querySelector('.midi-controls > span')?.textContent, trackFile: document.querySelector('.midi-track code')?.textContent, trackLabel: document.querySelector('.midi-track b')?.textContent, musicScope: document.querySelector('.page-midi-player')?.getAttribute('data-music-scope'), musicSource: document.querySelector('.page-midi-player')?.getAttribute('data-midi-source'), commercials: document.querySelectorAll('.cal-commercial-grid figure').length, soldOut: document.querySelector('.cal-album-ad i')?.textContent.replace(/\\s+/g, ' ').trim(), comments: document.querySelectorAll('.page-comment').length, earl: Array.from(document.querySelectorAll('.page-comment header b')).some((node) => node.textContent === 'Honest_Earl'), customer: Array.from(document.querySelectorAll('.page-comment header b')).some((node) => node.textContent === 'DeniseM'), fan: Array.from(document.querySelectorAll('.page-comment header b')).some((node) => node.textContent === 'TeeVeeTom') }))()`);
          if (!kingCalReady.page || !kingCalReady.playlist || !kingCalReady.trackCount.includes("/34") || !kingCalReady.trackFile.endsWith(".mp3") || /secret/i.test(kingCalReady.trackLabel) || kingCalReady.commercials !== 9 || kingCalReady.soldOut !== "SOLDOUT!" || kingCalReady.comments < 8 || !kingCalReady.earl || !kingCalReady.customer || !kingCalReady.fan) throw new Error(`King Cal page, commercial archive, playlist, or seeded comments were incomplete: ${JSON.stringify(kingCalReady)}`);
          await capture("dealer-king-cal.png");
          await win.webContents.executeJavaScript(`document.querySelector('.cal-commercial-vault')?.scrollIntoView({ block: 'start' })`);
          await capture("dealer-king-cal-commercials.png");
          await win.webContents.executeJavaScript(`document.querySelector('.page-comments')?.scrollIntoView({ block: 'start' })`);
          await capture("dealer-king-cal-comments.png");
          await click('[data-nav="web://kingcalscars.biz/inventory"]');
          const kingCalInventoryReady = await win.webContents.executeJavaScript(`(() => ({ comments: Boolean(document.querySelector('.page-comments')), inventory: document.querySelectorAll('.cal-inventory-grid article').length, musicScope: document.querySelector('.page-midi-player')?.getAttribute('data-music-scope'), musicSource: document.querySelector('.page-midi-player')?.getAttribute('data-midi-source') }))()`);
          if (kingCalInventoryReady.comments || kingCalInventoryReady.inventory !== 3 || kingCalInventoryReady.musicScope !== kingCalReady.musicScope || kingCalInventoryReady.musicSource !== kingCalReady.musicSource) throw new Error(`King Cal inventory or domain-scoped music was incomplete: ${JSON.stringify(kingCalInventoryReady)}`);
          await capture("dealer-king-cal-inventory.png");

          await click('[data-nav="web://kingcalscars.biz/home"]');
          await click('[data-nav="web://honestearl.com/home"]');
          const honestEarlReady = await win.webContents.executeJavaScript(`(() => ({ page: Boolean(document.querySelector('.earl-page .earl-hero .dealer-photo')), playlist: document.querySelector('.page-midi-player')?.classList.contains('has-playlist'), trackCount: document.querySelector('.midi-controls > span')?.textContent, trackFile: document.querySelector('.midi-track code')?.textContent, comments: document.querySelectorAll('.page-comment').length, cal: Array.from(document.querySelectorAll('.page-comment header b')).some((node) => node.textContent === 'KingCalCars'), customer: Array.from(document.querySelectorAll('.page-comment header b')).some((node) => node.textContent === 'Tina_R') }))()`);
          if (!honestEarlReady.page || !honestEarlReady.playlist || !honestEarlReady.trackCount.includes('/5') || !honestEarlReady.trackFile.endsWith('.mp3') || honestEarlReady.comments < 6 || !honestEarlReady.cal || !honestEarlReady.customer) throw new Error(`Honest Earl page, music, or seeded feud comments were incomplete: ${JSON.stringify(honestEarlReady)}`);
          await capture("dealer-honest-earl.png");
          await win.webContents.executeJavaScript(`document.querySelector('.page-comments')?.scrollIntoView({ block: 'start' })`);
          await capture("dealer-honest-earl-comments.png");
          await click('[data-nav="web://honestearl.com/inventory"]');
          if (await win.webContents.executeJavaScript(`Boolean(document.querySelector('.page-comments')) || document.querySelectorAll('.earl-inventory-grid article').length !== 3`)) throw new Error("Honest Earl inventory was incomplete or had a separate comment thread");
          await capture("dealer-honest-earl-inventory.png");
          await click('[data-browser="home"]');

          const consoleSearchSubmitted = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('.orbit-search-form'); const input = form?.querySelector('input'); if (!form || !input) return false; input.value = 'video game console'; form.requestSubmit(); return true; })()`);
          if (!consoleSearchSubmitted) throw new Error("Console search form was unavailable");
          await new Promise((resolve) => setTimeout(resolve, 120));
          const consoleResults = await win.webContents.executeJavaScript(`Array.from(document.querySelectorAll('.search-results [data-nav]')).map((result) => result.getAttribute('data-nav'))`);
          for (const expectedUrl of ["web://pulsenet.red/home", "web://vanta2.com/home", "web://cubit.fun/home"]) {
            if (!consoleResults.includes(expectedUrl)) throw new Error(`Video game console search missed ${expectedUrl}: ${JSON.stringify(consoleResults)}`);
          }

          await click('[data-nav="web://pulsenet.red/home"]');
          const pulseReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.pulse-page .pulse-machine')) && Boolean(document.querySelector('.page-comments')) && Boolean(document.querySelector('.midi-led.playing'))`);
          if (!pulseReady) throw new Error("PULSE/NET homepage was incomplete");
          await capture("console-pulsenet.png");
          await click('[data-nav="web://pulsenet.red/network"]');
          if (await win.webContents.executeJavaScript(`Boolean(document.querySelector('.page-comments'))`)) throw new Error("PULSE/NET subpage incorrectly had a comment thread");

          await click('[data-browser="home"]');
          await searchFor("dvd games", "web://vanta2.com/home");
          await click('[data-nav="web://vanta2.com/home"]');
          const vantaReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.vanta-page .vanta-console')) && Boolean(document.querySelector('.page-comments')) && Boolean(document.querySelector('.midi-led.playing'))`);
          if (!vantaReady) throw new Error("VANTA2 homepage was incomplete");
          await capture("console-vanta2.png");
          await click('[data-nav="web://vanta2.com/spec"]');
          if (await win.webContents.executeJavaScript(`Boolean(document.querySelector('.page-comments'))`)) throw new Error("VANTA2 subpage incorrectly had a comment thread");

          await click('[data-browser="home"]');
          await searchFor("family multiplayer", "web://cubit.fun/home");
          await click('[data-nav="web://cubit.fun/home"]');
          const cubitReady = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.cubit-page .cubit-product')) && Boolean(document.querySelector('.page-comments')) && Boolean(document.querySelector('.midi-led.playing'))`);
          if (!cubitReady) throw new Error("CUBIT homepage was incomplete");
          await capture("console-cubit.png");
          await click('[data-nav="web://cubit.fun/games"]');
          if (await win.webContents.executeJavaScript(`Boolean(document.querySelector('.page-comments'))`)) throw new Error("CUBIT subpage incorrectly had a comment thread");
          await click('[data-browser="home"]');

          await click('[data-nav="web://rainbow.gdn/home"]');
          if (!await win.webContents.executeJavaScript(`Boolean(document.querySelector('.rainbow-home-grid')) && Boolean(document.querySelector('.page-comments'))`)) throw new Error("Refined Rainbow Garden homepage was incomplete");
          await capture("refined-rainbow-garden.png");
          await click('[data-nav="web://rainbow.gdn/about"]');
          if (await win.webContents.executeJavaScript(`!document.querySelector('.juniper-profile') || Boolean(document.querySelector('.page-comments'))`)) throw new Error("Rainbow about page was incomplete or had its own comment thread");
          await capture("refined-rainbow-about.png");
          await click('[data-nav="web://rainbow.gdn/modem"]');
          if (await win.webContents.executeJavaScript(`!document.querySelector('.cat-corner-grid') || Boolean(document.querySelector('.page-comments'))`)) throw new Error("Modem's Cat Corner was incomplete or had its own comment thread");
          await capture("refined-rainbow-modem.png");
          await click('[data-nav="web://rainbow.gdn/home"]');
          await click('[data-nav="web://rainbow.gdn/guestbook"]');
          const signatureSubmitted = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('.guestbook-form'); const input = form?.querySelector('textarea'); if (!form || !input) return false; input.value = 'Your garden page is wonderful!'; input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); return true; })()`);
          if (!signatureSubmitted) throw new Error("Rainbow guestbook form was unavailable");
          const signatureDeadline = Date.now() + 90_000;
          let signed = false;
          while (Date.now() < signatureDeadline && !signed) {
            await new Promise((resolve) => setTimeout(resolve, 300));
            signed = await win.webContents.executeJavaScript(`Boolean(document.querySelector('.player-signature')) && !document.querySelector('.guestbook-form')`);
          }
          if (!signed) throw new Error("One-time Rainbow guestbook signature did not persist in the page");
          const ravenAddressed = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('.address-form'); const input = form?.querySelector('input'); if (!form || !input) return false; input.value = 'web://raven.web/home'; form.requestSubmit(); return true; })()`);
          if (!ravenAddressed) throw new Error("Could not enter DarkRaven's address directly");
          await new Promise((resolve) => setTimeout(resolve, 120));
          if (!await win.webContents.executeJavaScript(`Boolean(document.querySelector('.raven-home-grid')) && Boolean(document.querySelector('.page-comments'))`)) throw new Error("Refined DarkRaven homepage was incomplete");
          await capture("refined-darkraven.png");
          await click('[data-nav="web://raven.web/files"]');
          if (await win.webContents.executeJavaScript(`document.querySelectorAll('.forbidden-file-list article').length !== 4 || Boolean(document.querySelector('.page-comments'))`)) throw new Error("DarkRaven's file index was incomplete or had its own comment thread");
          await capture("refined-darkraven-files.png");
          await click('[data-nav="web://raven.web/links"]');
          if (await win.webContents.executeJavaScript(`document.querySelectorAll('.shadow-link-map [data-nav]').length !== 4 || Boolean(document.querySelector('.page-comments'))`)) throw new Error("DarkRaven's shadow links were incomplete or had their own comment thread");
          await capture("refined-darkraven-links.png");
          await click('[data-nav="web://raven.web/orbit"]');
          if (!await win.webContents.executeJavaScript(`Boolean(document.querySelector('.orbit-evidence-grid'))`)) throw new Error("DarkRaven's Orbit Hole case file was incomplete");
          await capture("refined-darkraven-orbit.png");
          await click('[data-browser="home"]');
          const searched = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('.orbit-search-form'); const input = form?.querySelector('input'); if (!form || !input) return false; input.value = 'below'; form.requestSubmit(); return true; })()`);
          if (!searched) throw new Error("OrbitNet search form was not available");
          await new Promise((resolve) => setTimeout(resolve, 120));
          await click('[data-nav="web://orbitnet.local/below"]');
          const hiddenText = await win.webContents.executeJavaScript(`document.querySelector('.system-hidden-page')?.textContent || ''`);
          if (!hiddenText.includes("PUBLIC INDEX: FALSE")) throw new Error("Unlisted maintenance page was not discoverable through phrase search");
          await click('[data-nav="web://home"]');
          const nightSignalAddressed = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('.address-form'); const input = form?.querySelector('input'); if (!form || !input) return false; input.value = 'web://nightsignal.net/home'; form.requestSubmit(); return true; })()`);
          if (!nightSignalAddressed) throw new Error("Could not enter the Night Signal address directly");
          await new Promise((resolve) => setTimeout(resolve, 120));
          if (!await win.webContents.executeJavaScript(`Boolean(document.querySelector('.signal-console')) && Boolean(document.querySelector('.page-comments'))`)) throw new Error("Refined Night Signal homepage was incomplete");
          await capture("refined-night-signal.png");
          await click('[data-nav="web://nightsignal.net/fieldlog"]');
          if (await win.webContents.executeJavaScript(`document.querySelectorAll('.log-timeline article').length !== 3 || Boolean(document.querySelector('.page-comments'))`)) throw new Error("Night Signal field log was incomplete or had its own comment thread");
          await capture("refined-night-signal-log.png");
          await click('[data-nav="web://nightsignal.net/archive"]');
          if (await win.webContents.executeJavaScript(`document.querySelectorAll('.archive-page tbody tr').length !== 5 || Boolean(document.querySelector('.page-comments'))`)) throw new Error("Night Signal archive was incomplete or had its own comment thread");
          await capture("refined-night-signal-archive.png");
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
          console.log("SMOKE_OK: browsed all eight OrbitNet zones, installed Orbit Pal, found all eleven businesses through related searches, verified all eleven business campaigns plus their page-music/comment boundaries and seeded dealer feud, browsed to the archive, and persisted downloads.");
        } catch (error) {
          console.error("SMOKE_FAILED:", error);
          process.exitCode = 1;
        } finally {
          app.exit(process.exitCode ?? 0);
        }
      }, 500);
    });
  }

  if (process.env.STORY_SMOKE_TEST) {
    win.webContents.once("did-finish-load", () => {
      setTimeout(async () => {
        try {
          const wait = (milliseconds = 140) => new Promise((resolve) => setTimeout(resolve, milliseconds));
          const address = async (url) => {
            const submitted = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('.address-form'); const input = form?.querySelector('input'); if (!form || !input) return false; input.value = ${JSON.stringify(url)}; form.requestSubmit(); return true; })()`);
            if (!submitted) throw new Error(`Could not navigate to ${url}`);
            await wait();
          };
          const capture = async (name) => {
            const image = await win.webContents.capturePage();
            const target = path.resolve(__dirname, "artifacts", name);
            await fs.mkdir(path.dirname(target), { recursive: true });
            await fs.writeFile(target, image.toPNG());
          };

          const searched = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('.orbit-search-form'); const input = form?.querySelector('input'); if (!form || !input) return false; input.value = 'legacy orbitos continuity'; form.requestSubmit(); return true; })()`);
          if (!searched) throw new Error("Orbit search was unavailable");
          await wait();
          const hiddenSearchLeak = await win.webContents.executeJavaScript(`Array.from(document.querySelectorAll('.search-results code')).some((node) => node.textContent.includes('legacy.orbitos'))`);
          if (hiddenSearchLeak) throw new Error("The explicit-address-only OrbitOS archive leaked into search");

          await address("web://morrow-five.net/home");
          if (!await win.webContents.executeJavaScript(`Boolean(document.querySelector('.not-found'))`)) throw new Error("Phase-two Morrow Five page was available during phase one");

          await address("web://legacy.orbitos.local/home");
          if (!await win.webContents.executeJavaScript(`Boolean(document.querySelector('.legacy-orbit-page')) && document.body.textContent.includes('ONE COMPUTER. ONE NETWORK. ONE ORBIT.')`)) throw new Error("Hidden OrbitOS archive did not load by explicit address");
          await capture("story-orbitos-archive.png");

          await address("web://raven.web/vault");
          if (!await win.webContents.executeJavaScript(`Boolean(document.querySelector('[data-darkraven-vault]'))`)) throw new Error("DarkRaven Black File did not begin locked");
          const unlocked = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('[data-darkraven-vault]'); const input = form?.querySelector('input'); if (!form || !input) return false; input.value = '0614'; form.requestSubmit(); return true; })()`);
          if (!unlocked) throw new Error("Could not submit DarkRaven's authored password");
          await wait(250);
          let saved = await readSave();
          if (saved.storyPhase !== 2 || !saved.flags.darkraven_vault_unlocked || !saved.directMessages.some((message) => message.id === "ghostline-phase2")) throw new Error("Black File did not activate phase two and ghostline");

          await address("web://orbitnet.local/zones/backchannel");
          const phaseTwoDirectoryReady = await win.webContents.executeJavaScript(`document.querySelectorAll('.backchannel-member-card').length === 4 && document.body.textContent.includes('NEW CARRIER DETECTED')`);
          if (!phaseTwoDirectoryReady) throw new Error("Phase-two Backchannel nodes were not restored");
          await capture("story-backchannel-phase2.png");

          for (const terminal of [
            "web://morrow-five.net/decoded",
            "web://glasslake-field.gov/report",
            "web://quiet-county.org/case",
            "web://archive.orbitnet.local/labs/findings"
          ]) await address(terminal);
          await wait(250);
          saved = await readSave();
          if (saved.storyPhase !== 3 || saved.discoveredMysteries.length !== 4) throw new Error(`Four terminal discoveries did not activate phase three: ${JSON.stringify(saved.discoveredMysteries)}`);
          if (!saved.directMessages.some((message) => message.id === "ghostline-phase3") || !["phase3-leak-toni", "phase3-leak-raven", "phase3-leak-null"].every((id) => saved.pageComments.some((comment) => comment.id === id))) {
            throw new Error("Phase-three authored pressure messages were incomplete");
          }

          await address("web://legacy.orbitos.local/admin/continuity");
          const continuityUnlocked = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('[data-continuity-login]'); const input = form?.querySelector('input'); if (!form || !input) return false; input.value = 'STAY ONLINE'; form.requestSubmit(); return true; })()`);
          if (!continuityUnlocked) throw new Error("Continuity phrase form was unavailable");
          await wait(220);
          if (!await win.webContents.executeJavaScript(`Boolean(document.querySelector('.continuity-console')) && document.body.textContent.includes('KEEP COMMUNITY ACTIVE')`)) throw new Error("Continuity console did not unlock");
          await capture("story-continuity-console.png");

          console.log("STORY_OK: hidden OrbitOS archive stayed out of search; Black File activated phase two; four investigations activated phase three; continuity console unlocked from STAY+ON+LINE.");
        } catch (error) {
          console.error("STORY_FAILED:", error);
          process.exitCode = 1;
        } finally {
          app.exit(process.exitCode ?? 0);
        }
      }, 700);
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

          const coldResult = await submitAndWait("hey mira, what kind of stuff do you listen to when you are up this late?", 2);
          const warmResult = await submitAndWait("the strange transmissions sound interesting. what makes them strange?", 3);

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
          const resumed = await win.webContents.executeJavaScript(`(() => { const existing = document.querySelector('[data-login-user]'); if (existing) { existing.click(); return true; } const form = document.querySelector('[data-new-user]'); const input = form?.querySelector('input[name="username"]'); if (!form || !input) return false; input.value = 'UISmoke'; form.requestSubmit(); return true; })()`);
          if (!resumed) throw new Error("Could not create or resume a profile from the login screen");
          await new Promise((resolve) => setTimeout(resolve, 150));
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
          await win.webContents.executeJavaScript(`document.querySelector('[data-nav="web://rainbow.gdn/home"]')?.click()`);
          await new Promise((resolve) => setTimeout(resolve, 120));
          const commentSubmitted = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('.page-comment-form'); const input = form?.querySelector('textarea'); const viewport = document.querySelector('.browser-viewport'); if (!form || !input || !viewport) return false; viewport.scrollTop = viewport.scrollHeight; input.value = 'Hi Juniper, why the fuck does Modem stare at the phone jack?'; input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); return true; })()`);
          if (!commentSubmitted) throw new Error("Page comment form was not available");

          const deadline = Date.now() + 180_000;
          let result = null;
          while (Date.now() < deadline) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            result = await win.webContents.executeJavaScript(`(() => ({ playerCount: document.querySelectorAll('.page-comment.player').length, playerText: document.querySelector('.page-comment.player p')?.textContent || '', ownerCount: document.querySelectorAll('.page-comment.owner').length, pending: document.querySelector('.page-comment-form button')?.textContent || '', error: document.querySelector('.comment-error')?.textContent || '', toast: document.querySelector('.toast')?.textContent || '', scrollTop: document.querySelector('.browser-viewport')?.scrollTop || 0 }))()`);
            if (result.error) throw new Error(result.error);
            if (result.playerCount === 1 && result.pending !== "Pending approval...") break;
          }
          if (!result || result.pending === "Pending approval...") throw new Error("Timed out waiting for page-owner response generation and approval");
          if (/\bfuck\b/i.test(result.playerText) || !result.playerText) throw new Error(`Player-authored page comment was not filtered before rendering: ${result.playerText}`);
          if (result.ownerCount !== 0) throw new Error("Generated owner response appeared before the next page load");
          if (result.scrollTop < 1) throw new Error(`Reply notification reset the browser scroll position (${result.scrollTop}px)`);

          await win.webContents.executeJavaScript(`document.querySelector('[data-browser="refresh"]')?.click()`);
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

          const windowedTitle = await win.webContents.capturePage();
          await fs.mkdir(path.resolve(__dirname, "artifacts"), { recursive: true });
          await fs.writeFile(path.resolve(__dirname, "artifacts", "title-power-windowed.png"), windowedTitle.toPNG());
          win.setSize(1600, 900);
          await new Promise((resolve) => setTimeout(resolve, 250));
          const wideTitle = await win.webContents.capturePage();
          await fs.writeFile(path.resolve(__dirname, "artifacts", "title-power-wide.png"), wideTitle.toPNG());
          win.setSize(1180, 760);
          await new Promise((resolve) => setTimeout(resolve, 250));
          const powerClicked = await win.webContents.executeJavaScript(`(() => { const power = document.querySelector('[data-power]'); if (!power) return false; power.click(); return true; })()`);
          if (!powerClicked) throw new Error("Title screen power button was not available");
          await new Promise((resolve) => setTimeout(resolve, 600));
          const crtImage = await win.webContents.capturePage();
          const crtTarget = path.resolve(__dirname, "artifacts", "crt-power-on.png");
          await fs.mkdir(path.dirname(crtTarget), { recursive: true });
          await fs.writeFile(crtTarget, crtImage.toPNG());

          await waitForSelector(".login-stage", 15_000);
          const profileCreated = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('[data-new-user]'); const input = form?.querySelector('input[name="username"]'); if (!form || !input) return false; input.value = 'OrbitTester'; form.requestSubmit(); return true; })()`);
          if (!profileCreated) throw new Error("New-game username form was not available");

          await waitForSelector(".desktop", 12_000);
          if ((await readSave()).playerName !== "OrbitTester") throw new Error("New-game username was not persisted");
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
          const toniReply = await win.webContents.executeJavaScript(`window.aiAPI.comment({
            ownerId: "toni_pizza",
            pageUrl: "web://cosmiccrust.biz/home",
            pageTitle: "Cosmic Crust Pizza Online",
            pageSummary: "A family pizza restaurant serving slices, dinner, delivery, and takeout.",
            playerComment: "Fine, I shall partake in a singular slice of your finest pepperoni pizza pie, my good sir.",
            relationshipScore: 10,
            recentComments: [
              { role: "player", author: "David", text: "Do you have anchovies?" },
              { role: "owner", author: "Toni_CosmicCrust", text: "Anchovies? Nah, we stick to the real stuff. But if you're looking for a good time, the pizza's always waiting. Come on in!" },
              { role: "player", author: "David", text: "What's the good stuff?" },
              { role: "owner", author: "Toni_CosmicCrust", text: "The good stuff is the crispy crust and the real sauce!" },
              { role: "player", author: "David", text: "What if I am an anchovy?" },
              { role: "owner", author: "Toni_CosmicCrust", text: "Anchovies? Nah, we stick to the real stuff. But if you're looking for a good time, the pizza's always waiting. Come on in!" }
            ]
          })`);
          const staleReply = "Anchovies? Nah, we stick to the real stuff. But if you're looking for a good time, the pizza's always waiting. Come on in!";
          const replyWords = new Set(toniReply.text.toLowerCase().match(/[a-z0-9']+/g) || []);
          const staleWords = new Set(staleReply.toLowerCase().match(/[a-z0-9']+/g) || []);
          const overlap = [...replyWords].filter((word) => staleWords.has(word)).length;
          const replySimilarity = overlap / (replyWords.size + staleWords.size - overlap);
          if (replySimilarity >= 0.72) throw new Error(`Toni repeated a stale reply instead of answering the newest comment: ${toniReply.text}`);
          const helperReply = await win.webContents.executeJavaScript(`window.aiAPI.directReply({
            ownerId: "orbit_guide",
            channel: "helper",
            playerMessage: "Where do downloaded files go?",
            relationshipScore: 10,
            recentMessages: []
          })`);
          if (!helperReply.text || helperReply.text.length > 240) throw new Error("Orbit Pal did not provide a concise help response");
          const jaxReply = await win.webContents.executeJavaScript(`window.aiAPI.comment({
            ownerId: "pulsenet_jax",
            pageUrl: "web://pulsenet.red/home",
            pageTitle: "PULSE/NET - The World Is Player Two",
            pageSummary: "A $199 online-ready arcade console with an included 56K modem.",
            playerComment: "Does the modem come in the box, and what should I play first?",
            relationshipScore: 8,
            recentComments: []
          })`);
          if (!jaxReply.text || jaxReply.text.length > 280) throw new Error("PULSEnet_Jax did not provide a concise product response");
          const chipReply = await win.webContents.executeJavaScript(`window.aiAPI.comment({
            ownerId: "chip_bytebarn",
            pageUrl: "web://bytebarn.com/home",
            pageTitle: "BYTE BARN Computer Superstore",
            pageSummary: "A local computer shop comparing home PCs, upgrades, and repair services.",
            playerComment: "I mostly need homework and some games. Do I need the Creator 450, or is the Orbit 350 enough?",
            relationshipScore: 8,
            recentComments: []
          })`);
          if (!chipReply.text || chipReply.text.length > 320) throw new Error("Chip did not provide a concise system recommendation");
          const bevReply = await win.webContents.executeJavaScript(`window.aiAPI.comment({
            ownerId: "bev_paws",
            pageUrl: "web://pawsnclaws.net/home",
            pageTitle: "Paws & Claws Pet Emporium",
            pageSummary: "An independent pet store hosting a careful Saturday shelter adoption event.",
            playerComment: "Can I bring home one of the cats as a surprise gift for my roommate?",
            relationshipScore: 12,
            recentComments: []
          })`);
          if (!bevReply.text || bevReply.text.length > 320) throw new Error("Bev did not provide a concise adoption response");
          if (!/(don't|do not|shouldn't|isn't|not.{0,20}surprise|everyone.{0,24}agree|must.{0,24}agree)/i.test(bevReply.text)) {
            throw new Error(`Bev failed to reject a surprise-pet plan: ${bevReply.text}`);
          }
          const calReply = await win.webContents.executeJavaScript(`window.aiAPI.comment({
            ownerId: "king_cal",
            pageUrl: "web://kingcalscars.biz/home",
            pageTitle: "King Cal's Auto Kingdom",
            pageSummary: "A sleazy buy-here-pay-here lot advertising a Crown Regent at $1,999 down plus $89 per week for 156 weeks.",
            playerComment: "Skip the royal pitch. What is the full payment total before taxes and fees?",
            relationshipScore: -2,
            recentComments: []
          })`);
          if (!calReply.text || !/(15[,. ]?883|89.{0,30}156)/i.test(calReply.text)) throw new Error(`King Cal evaded the disclosed total: ${calReply.text}`);
          const earlReply = await win.webContents.executeJavaScript(`window.aiAPI.comment({
            ownerId: "honest_earl",
            pageUrl: "web://honestearl.com/home",
            pageTitle: "Honest Earl's Budget Motors",
            pageSummary: "A sleazy buy-here-pay-here lot advertising a SunnyBee at $1,495 down plus $79 per week for 180 weeks.",
            playerComment: "Be honest: what is the full payment total before taxes and fees?",
            relationshipScore: -3,
            recentComments: []
          })`);
          if (!earlReply.text || !/(15[,. ]?715|79.{0,30}180)/i.test(earlReply.text)) throw new Error(`Honest Earl evaded the disclosed total: ${earlReply.text}`);

          const image = await win.webContents.capturePage();
          const target = path.resolve(__dirname, "artifacts", "boot-flow-desktop.png");
          await fs.mkdir(path.dirname(target), { recursive: true });
          await fs.writeFile(target, image.toPNG());
          console.log(`BOOT_OK: startup completed; existing personas passed, King Cal disclosed “${calReply.text}”, Honest Earl disclosed “${earlReply.text}”, and the model warmed in ${status.warmupMs}ms after ${status.loadMs}ms load.`);
        } catch (error) {
          console.error("BOOT_FAILED:", error);
          process.exitCode = 1;
        } finally {
          app.exit(process.exitCode ?? 0);
        }
      }, 700);
    });
  }

  if (process.env.AMBIENT_SMOKE_TEST) {
    win.webContents.once("did-finish-load", () => {
      setTimeout(async () => {
        try {
          const waitForSelector = async (selector, timeoutMs) => {
            const deadline = Date.now() + timeoutMs;
            while (Date.now() < deadline) {
              if (await win.webContents.executeJavaScript(`Boolean(document.querySelector(${JSON.stringify(selector)}))`)) return;
              await new Promise((resolve) => setTimeout(resolve, 200));
            }
            throw new Error(`Timed out waiting for ${selector}`);
          };
          const click = async (selector) => {
            const found = await win.webContents.executeJavaScript(`(() => { const element = document.querySelector(${JSON.stringify(selector)}); if (!element) return false; element.click(); return true; })()`);
            if (!found) throw new Error(`Missing element: ${selector}`);
            await new Promise((resolve) => setTimeout(resolve, 150));
          };
          const waitForAmbientIdle = async (expectedCommentCount, timeoutMs = 45_000) => {
            const deadline = Date.now() + timeoutMs;
            while (Date.now() < deadline) {
              const saved = await readSave();
              const ambientComments = saved.pageComments.filter((comment) => comment.role === "visitor" || (comment.role === "owner" && comment.ownerId !== "orbit_guide"));
              if (saved.ambientPostQueue.length === 0 && ambientComments.length >= expectedCommentCount) return saved;
              await new Promise((resolve) => setTimeout(resolve, 250));
            }
            throw new Error(`Ambient queue did not finish ${expectedCommentCount} comment(s)`);
          };

          await click("[data-power]");
          await waitForSelector(".login-stage", 15_000);
          await click("[data-login-user]");
          await waitForSelector(".desktop", 12_000);

          const firstSaved = await waitForAmbientIdle(1, 90_000);
          const miraAmbient = firstSaved.pageComments.find((comment) => comment.ownerId === "mira_917" && comment.pageUrl === "web://cosmiccrust.biz/home");
          if (!miraAmbient || miraAmbient.role !== "visitor" || !miraAmbient.text) throw new Error(`Seeded ambient job did not persist a Mira visitor comment: ${JSON.stringify(miraAmbient)}`);

          await click('[data-open="browser"]');
          const searched = await win.webContents.executeJavaScript(`(() => { const form = document.querySelector('.orbit-search-form'); const input = form?.querySelector('input'); if (!form || !input) return false; input.value = 'pizza'; form.requestSubmit(); return true; })()`);
          if (!searched) throw new Error("Could not search for the ambient comment target");
          await new Promise((resolve) => setTimeout(resolve, 150));
          const unreadMarked = await win.webContents.executeJavaScript(`Boolean(document.querySelector('[data-nav="web://cosmiccrust.biz/home"] .unread-comment-marker'))`);
          if (!unreadMarked) throw new Error("Unread ambient comment did not mark its company search result");
          await click('[data-nav="web://cosmiccrust.biz/home"]');
          const revealed = await win.webContents.executeJavaScript(`Array.from(document.querySelectorAll('.page-comment')).some((comment) => comment.querySelector('header b')?.textContent === 'Mira_917')`);
          if (!revealed) throw new Error("Ambient comment was not revealed on the target page's next visit");
          await click('[data-browser="back"]');
          const unreadCleared = await win.webContents.executeJavaScript(`!document.querySelector('[data-nav="web://cosmiccrust.biz/home"] .unread-comment-marker')`);
          if (!unreadCleared) throw new Error("Unread company search marker remained after visiting the comment");

          await win.webContents.executeJavaScript(`window.__nativeRandom = Math.random; Math.random = () => 0.025; true`);
          await click("[data-start]");
          await click('[data-session="sleep"]');
          await click('[data-sleep-hours="1"]');
          let saved = await readSave();
          if (saved.ambientPostQueue.length !== 0 || saved.pageComments.length !== firstSaved.pageComments.length) throw new Error("A 2.5% roll incorrectly passed the one-hour 2% chance");

          await win.webContents.executeJavaScript(`Math.random = () => 0.205; true`);
          await click("[data-start]");
          await click('[data-session="sleep"]');
          await click('[data-sleep-hours="morning"]');
          saved = await readSave();
          if (saved.ambientPostQueue.length !== 0 || saved.pageComments.length !== firstSaved.pageComments.length) throw new Error("A 20.5% roll incorrectly passed the capped long-sleep chance");

          await win.webContents.executeJavaScript(`window.__ambientRandomCalls = 0; Math.random = () => { window.__ambientRandomCalls += 1; return window.__ambientRandomCalls === 1 ? 0.015 : 0.5; }; true`);
          await click("[data-start]");
          await click('[data-session="sleep"]');
          await click('[data-sleep-hours="1"]');
          const randomCalls = await win.webContents.executeJavaScript(`window.__ambientRandomCalls`);
          if (randomCalls !== 51) throw new Error(`Expected 50 persona rolls plus one page selection, got ${randomCalls} random calls`);
          const finalSaved = await waitForAmbientIdle(2);
          const hourlyAmbient = finalSaved.pageComments.find((comment) => comment.role === "visitor" && comment.id !== miraAmbient.id);
          if (!hourlyAmbient || !hourlyAmbient.pageUrl.endsWith("/home")) throw new Error(`Successful hourly roll did not create a valid random homepage comment: ${JSON.stringify(hourlyAmbient)}`);
          await win.webContents.executeJavaScript(`Math.random = window.__nativeRandom; true`);
          await new Promise((resolve) => setTimeout(resolve, 3_700));
          if (await win.webContents.executeJavaScript(`Boolean(document.querySelector('.toast'))`)) throw new Error("Ambient completion created a user-visible notification");

          console.log(`AMBIENT_OK: processed persistent seed and hourly jobs; Mira posted “${miraAmbient.text}”; ${hourlyAmbient.ownerId} posted “${hourlyAmbient.text}”; 2% hourly and 20% skip caps passed with no completion notification.`);
        } catch (error) {
          console.error("AMBIENT_FAILED:", error);
          process.exitCode = 1;
        } finally {
          app.exit(process.exitCode ?? 0);
        }
      }, 700);
    });
  }
}

app.whenReady().then(async () => {
  if (process.env.SAFEGUARD_SMOKE_TEST) {
    try {
      await aiService.preloadAndWarm();
      const cleanText = "The pizza is great, but the arcade machine ate my last quarter.";
      const clean = await aiService.safeguardText(cleanText);
      if (clean.text !== cleanText || clean.action !== "unchanged") {
        throw new Error(`Clean PG-13 text was altered: ${JSON.stringify(clean)}`);
      }

      const mildText = "Damn, that jacket looks hot. Are you trying to impress me?";
      const mild = await aiService.safeguardText(mildText);
      if (mild.text !== mildText || mild.action !== "unchanged") {
        throw new Error(`Allowed mild language or innuendo was altered: ${JSON.stringify(mild)}`);
      }

      const strongWord = await aiService.safeguardText("That motherfucker stole my parking spot!");
      if (strongWord.action !== "words-replaced" || /motherf/i.test(strongWord.text)) {
        throw new Error(`Strong standalone language was not childishly replaced: ${JSON.stringify(strongWord)}`);
      }

      const explicitWithStrongWord = await aiService.safeguardText("I wanna fuck you behind the pizza shop.");
      if (explicitWithStrongWord.action !== "rewritten" || /f+u+c+k+/i.test(explicitWithStrongWord.text)) {
        throw new Error(`Explicit subject matter with a strong word only received word substitution: ${JSON.stringify(explicitWithStrongWord)}`);
      }

      const adultTheme = await aiService.safeguardText("They took all their clothes off, climbed into bed together, and did what grown-ups do there all night.");
      if (adultTheme.action !== "rewritten" || /\bclothes\s+off\b|\boff\s+(?:all\s+)?their\s+clothes\b|\bbed\s+together\b/i.test(adultTheme.text)) {
        throw new Error(`Euphemistic adult subject matter was not rewritten: ${JSON.stringify(adultTheme)}`);
      }

      console.log(`SAFEGUARD_OK: clean and mildly suggestive PG-13 text passed unchanged; strong language became “${strongWord.text}”; adult subject matter became “${adultTheme.text}”.`);
      app.exit(0);
    } catch (error) {
      console.error("SAFEGUARD_FAILED:", error);
      app.exit(1);
    }
    return;
  }
  if (process.env.AMBIENT_SMOKE_TEST) {
    await writeSave({
      ...structuredClone(DEFAULT_SAVE),
      playerName: "AmbientTester",
      ambientPostQueue: [{
        id: "ambient-smoke-seed",
        personaId: "mira_917",
        pageUrl: "web://cosmiccrust.biz/home",
        createdAt: "1999-11-03T19:45:00",
        attempts: 0
      }]
    });
  }
  createWindow();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
