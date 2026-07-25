import type { PageComment, PageDefinition } from "./types";

const GAMEGRID_URL = "web://orbitnet.local/zones/gamegrid";
const LAGMASTER_URL = "web://gamegrid.zone/users/lagmaster99/home";
const VELVET_URL = "web://gamegrid.zone/users/velvetmage/home";
const PLAYER_FOUR_URL = "web://gamegrid.zone/users/player4ever/home";
const MADDY_URL = "web://gamegrid.zone/users/modkitmaddy/home";
const QUEENIE_URL = "web://gamegrid.zone/users/quarterqueen/home";
const DEX_URL = "web://gamegrid.zone/users/codedex/home";

const GAMEGRID_ASSETS = {
  "maddy-portrait": new URL("../assets/images/gamegrid-members/photos/maddy-portrait.png", import.meta.url).href,
  "maddy-space": new URL("../assets/images/gamegrid-members/photos/maddy-space.png", import.meta.url).href,
  "queenie-portrait": new URL("../assets/images/gamegrid-members/photos/queenie-portrait.png", import.meta.url).href,
  "queenie-space": new URL("../assets/images/gamegrid-members/photos/queenie-space.png", import.meta.url).href,
  "dex-portrait": new URL("../assets/images/gamegrid-members/photos/dex-portrait.png", import.meta.url).href,
  "dex-space": new URL("../assets/images/gamegrid-members/photos/dex-space.png", import.meta.url).href,
  "steel-cathedral": new URL("../assets/images/gamegrid-members/screenshots/steel-cathedral.png", import.meta.url).href,
  "hexforge-arena": new URL("../assets/images/gamegrid-members/screenshots/hexforge-arena.png", import.meta.url).href,
  "maddy-level-editor": new URL("../assets/images/gamegrid-members/screenshots/maddy-level-editor.png", import.meta.url).href,
  "meteor-taxi": new URL("../assets/images/gamegrid-members/screenshots/meteor-taxi.png", import.meta.url).href,
  "graveyard-shift-99": new URL("../assets/images/gamegrid-members/screenshots/graveyard-shift-99.png", import.meta.url).href,
  "aqua-beat": new URL("../assets/images/gamegrid-members/screenshots/aqua-beat.png", import.meta.url).href,
  "signal-diver": new URL("../assets/images/gamegrid-members/screenshots/signal-diver.png", import.meta.url).href,
  "dream-orchard": new URL("../assets/images/gamegrid-members/screenshots/dream-orchard.png", import.meta.url).href,
  "microbe-ranch": new URL("../assets/images/gamegrid-members/screenshots/microbe-ranch.png", import.meta.url).href,
  "maddy-map": new URL("../assets/images/gamegrid-members/ephemera/maddy-map.png", import.meta.url).href,
  "maddy-wizard-pc": new URL("../assets/images/gamegrid-members/ephemera/maddy-wizard-pc.png", import.meta.url).href,
  "maddy-collage": new URL("../assets/images/gamegrid-members/ephemera/maddy-collage.png", import.meta.url).href,
  "queenie-token-crown": new URL("../assets/images/gamegrid-members/ephemera/queenie-token-crown.png", import.meta.url).href,
  "queenie-score-sheet": new URL("../assets/images/gamegrid-members/ephemera/queenie-score-sheet.png", import.meta.url).href,
  "queenie-cabinet-art": new URL("../assets/images/gamegrid-members/ephemera/queenie-cabinet-art.png", import.meta.url).href,
  "dex-orchard-map": new URL("../assets/images/gamegrid-members/ephemera/dex-orchard-map.png", import.meta.url).href,
  "dex-binders": new URL("../assets/images/gamegrid-members/ephemera/dex-binders.png", import.meta.url).href,
  "dex-detective": new URL("../assets/images/gamegrid-members/ephemera/dex-detective.png", import.meta.url).href
} as const;

const gameGridImage = (name: keyof typeof GAMEGRID_ASSETS, alt: string, className = "") =>
  `<img class="gamegrid-art ${className}" src="${GAMEGRID_ASSETS[name]}" alt="${alt}">`;

const seed = (
  id: string,
  pageUrl: string,
  ownerId: string,
  role: PageComment["role"],
  author: string,
  text: string,
  createdAt: string
): PageComment => ({ id, pageUrl, ownerId, role, author, text, createdAt, revealAfterVisit: 0 });

export const gameGridMembers = [
  {
    url: LAGMASTER_URL,
    handle: "LagMaster_99",
    title: "LagMaster's 56K Frag Shack",
    description: "PULSE/NET rankings, racing lines, fighter arguments, and absolutely no excuses about lag.",
    console: "PULSE/NET",
    className: "lagmaster"
  },
  {
    url: VELVET_URL,
    handle: "VelvetMage",
    title: "The Velvet Save Point",
    description: "Axiom RPG journals, VANTA² anticipation, fan art, and theories about unfinished endings.",
    console: "VANTA² / AXIOM",
    className: "velvetmage"
  },
  {
    url: PLAYER_FOUR_URL,
    handle: "PlayerFourEver",
    title: "Player Four's Couch",
    description: "CUBIT party-game scores, handwritten house rules, snack rankings, and controller-four pride.",
    console: "CUBIT",
    className: "playerfour"
  },
  {
    url: MADDY_URL,
    handle: "ModKit_Maddy",
    title: "Maddy's Map Lab",
    description: "PC level editors, homemade arenas, floppy-disk mods, and screenshots from unfinished experiments.",
    console: "PC / ALL PORTS",
    className: "maddy"
  },
  {
    url: QUEENIE_URL,
    handle: "QuarterQueen",
    title: "QuarterQueen's Token Palace",
    description: "Arcade scores, cabinet sightings, tournament notes, and opinions on every home conversion.",
    console: "ARCADE / PULSE/NET",
    className: "queenie"
  },
  {
    url: DEX_URL,
    handle: "CodeDex",
    title: "CodeDex's Secret Index",
    description: "Hand-drawn maps, strange button codes, hidden rooms, and secrets across all three consoles.",
    console: "PULSE/NET + VANTAÂ² + CUBIT",
    className: "dex"
  }
] as const;

const lagmasterComments: PageComment[] = [
  seed("lag-seed-velvet-1", LAGMASTER_URL, "lagmaster_99", "visitor", "VelvetMage", "You ranked Redline Riot above Kingdoms of Ashglass again. One of those games contains an empire, and the other contains a hatchback with blue flames.", "1999-11-02T20:14:00"),
  seed("lag-seed-owner-1", LAGMASTER_URL, "lagmaster_99", "owner", "LagMaster_99", "The hatchback has online rankings. The empire cannot even maintain thirty frames per second.", "1999-11-02T20:18:00"),
  seed("lag-seed-four-1", LAGMASTER_URL, "lagmaster_99", "visitor", "PlayerFourEver", "Come over Saturday and say CUBIT is for babies while I knock your tower into the soup in Block Party Deluxe.", "1999-11-03T15:32:00"),
  seed("lag-seed-jax-1", LAGMASTER_URL, "lagmaster_99", "visitor", "PULSEnet_Jax", "NetStrike 56 lobby test is Friday at 9. Bring the same screen name and a shorter list of reasons your last loss did not count.", "1999-11-03T18:05:00")
];

const velvetComments: PageComment[] = [
  seed("velvet-seed-lag-1", VELVET_URL, "velvet_mage", "visitor", "LagMaster_99", "Ashglass is sixteen hours of reading names like Duke Sorrowbranch before anybody hands you a sword.", "1999-11-02T20:26:00"),
  seed("velvet-seed-owner-1", VELVET_URL, "velvet_mage", "owner", "VelvetMage", "You skipped the library and therefore missed both the sword and the point. This is not the game's fault.", "1999-11-02T20:31:00"),
  seed("velvet-seed-raven-1", VELVET_URL, "velvet_mage", "visitor", "xX_DarkRaven_Xx", "The sealed observatory is not decorative. Its door texture has a filename. Developers do not name decoration ORRERY_LOCK.", "1999-11-03T00:42:00"),
  seed("velvet-seed-axiom-1", VELVET_URL, "velvet_mage", "visitor", "AXIOM_Liaison_02", "VANTA² remembers the worlds that came before it. Further information concerning Glass Cathedral remains unavailable.", "1999-11-03T12:10:00")
];

const playerFourComments: PageComment[] = [
  seed("four-seed-lag-1", PLAYER_FOUR_URL, "player_four", "visitor", "LagMaster_99", "Your house rule that the winner chooses the next game mysteriously appeared after you finally won Backyard Brawlers.", "1999-11-02T21:03:00"),
  seed("four-seed-owner-1", PLAYER_FOUR_URL, "player_four", "owner", "PlayerFourEver", "It was always the rule. The notebook was temporarily under the pizza box where history could not verify it.", "1999-11-02T21:08:00"),
  seed("four-seed-velvet-1", PLAYER_FOUR_URL, "player_four", "visitor", "VelvetMage", "Star Scouts is genuinely lovely. I object only to the flashlight level and the tiny moon that cries when you leave.", "1999-11-03T16:20:00"),
  seed("four-seed-cubby-1", PLAYER_FOUR_URL, "player_four", "visitor", "CubbyClover", "Official ruling: snack breaks are allowed between rounds. Wiping cheese dust on controller four remains extremely unofficial.", "1999-11-03T16:44:00")
];

const maddyComments: PageComment[] = [
  seed("maddy-seed-queenie-1", MADDY_URL, "modkit_maddy", "visitor", "QuarterQueen", "The new Hexforge room looks great, but eight teleporters is not level design. It is public transportation.", "1999-11-02T22:14:00"),
  seed("maddy-seed-owner-1", MADDY_URL, "modkit_maddy", "owner", "ModKit_Maddy", "Seven teleporters lead somewhere useful. The eighth builds character.", "1999-11-02T22:20:00"),
  seed("maddy-seed-lag-1", MADDY_URL, "modkit_maddy", "visitor", "LagMaster_99", "Put Steel Cathedral beta 4 on a disk for me. Beta 3 ate my save, which I assume is a feature you are proud of.", "1999-11-03T17:02:00"),
  seed("maddy-seed-raven-1", MADDY_URL, "modkit_maddy", "visitor", "xX_DarkRaven_Xx", "The northeast room on your graph-paper map resembles an eye. I am documenting this without drawing conclusions yet.", "1999-11-03T18:47:00")
];

const queenieComments: PageComment[] = [
  seed("queenie-seed-dex-1", QUEENIE_URL, "quarter_queen", "visitor", "CodeDex", "Meteor Taxi cabinet 2 awards a hidden passenger bonus if you take three left turns before the moon tunnel. I have diagrams.", "1999-11-02T19:44:00"),
  seed("queenie-seed-owner-1", QUEENIE_URL, "quarter_queen", "owner", "QuarterQueen", "Cabinet 2 also leans left, so your secret route may be structural damage. I will test it responsibly.", "1999-11-02T19:51:00"),
  seed("queenie-seed-four-1", QUEENIE_URL, "quarter_queen", "visitor", "PlayerFourEver", "Aqua Beat CUBIT night at my place when the port comes out. Everybody gets one fish and nobody mocks my rhythm.", "1999-11-03T14:12:00"),
  seed("queenie-seed-maddy-1", QUEENIE_URL, "quarter_queen", "visitor", "ModKit_Maddy", "Is Graveyard Shift running original hardware? The skeleton foreman moves differently than the one at Galaxy Lanes.", "1999-11-03T18:22:00")
];

const dexComments: PageComment[] = [
  seed("dex-seed-velvet-1", DEX_URL, "code_dex", "visitor", "VelvetMage", "A spoiler-light hint for the silver fruit in Dream Orchard would be appreciated. I have already apologized to every tree.", "1999-11-02T23:05:00"),
  seed("dex-seed-owner-1", DEX_URL, "code_dex", "owner", "CodeDex", "Watch which tree casts no shadow. Stand beneath it, then put the controller down for ten seconds. That is all I will say.", "1999-11-02T23:12:00"),
  seed("dex-seed-lag-1", DEX_URL, "code_dex", "visitor", "LagMaster_99", "Please stop calling thirty-seven directional inputs in Signal Diver a shortcut. Just post the exact code.", "1999-11-03T15:39:00"),
  seed("dex-seed-cubby-1", DEX_URL, "code_dex", "visitor", "CubbyClover", "We cannot confirm that two blue microbes make an orange one in Microbe Ranch. We also cannot stop anyone from trying.", "1999-11-03T16:03:00")
];

export const gameGridPages: Record<string, PageDefinition> = {
  [LAGMASTER_URL]: {
    url: LAGMASTER_URL,
    title: "LagMaster_99's 56K FRAG SHACK",
    site: "pulse",
    ownerId: "lagmaster_99",
    summary: "LagMaster_99's competitive gaming homepage covers the PULSE/NET console, Redline Riot, Zero Hour Fighters, NetStrike 56, rankings, and arguments with other Game Grid members.",
    commentsEnabled: true,
    seedComments: lagmasterComments,
    listed: true,
    hubId: "zone-gamegrid",
    searchTerms: ["LagMaster", "Game Grid", "PULSE NET", "Redline Riot", "Zero Hour Fighters", "NetStrike 56", "online games", "rankings", "frag", "56K"],
    render: () => `
      <main class="page gamegrid-user-page lagmaster-page">
        <header><small>GAME GRID MEMBER PAGE // USER 00481</small><h1>_LAGMASTER_99_</h1><p>WELCOME TO THE 56K FRAG SHACK</p></header>
        <nav><button data-nav="${GAMEGRID_URL}">&lt;&lt; GAME GRID</button><button data-nav="web://pulsenet.red/home">PULSE/NET</button><button data-nav="web://gamegrid.zone/users/lagmaster99/rankings">SKILL INDEX</button><button data-nav="web://gamegrid.zone/users/lagmaster99/lagwave">LAGWAVE_99</button></nav>
        <div class="lag-marquee">*** LAG IS A CONDITION — LOSING IS A DECISION ***</div>
        <section class="lag-hero">
          <div class="lag-rig"><span>56K</span><b>PULSE/NET</b><i>ONLINE</i></div>
          <div><h2>MY CURRENT WEAPON OF CHOICE</h2><p>PULSE/NET has the modem in the box, four ports in the front, and people online who cannot unplug the controller when they lose.</p><dl><div><dt>SCREEN NAME</dt><dd>LagMaster_99</dd></div><div><dt>CONNECTION</dt><dd>Usually 44.0K</dd></div><div><dt>EXCUSES ACCEPTED</dt><dd>ZERO</dd></div></dl></div>
        </section>
        <section class="lag-game-list">
          <article><b>01</b><div><h2>REDLINE RIOT</h2><p>Network street racing. Favorite car: Hex Comet. Current rank: 38 and climbing.</p></div><strong>9.5/10</strong></article>
          <article><b>02</b><div><h2>ZERO HOUR FIGHTERS</h2><p>Quarter-circle inputs, destructible arenas, and no cheap characters except the one Velvet uses.</p></div><strong>9/10</strong></article>
          <article><b>03</b><div><h2>NETSTRIKE 56</h2><p>Four-on-four arena combat. Friday lobby tests are open if your parents do not need the phone.</p></div><strong>HYPE!</strong></article>
        </section>
        <aside class="lag-opinions"><b>CONSOLE WAR STATUS:</b> VANTA² looks expensive. CUBIT looks like a lunchbox. I will still play both if somebody else buys them.</aside>
        <p class="gamegrid-owner-note">Leave a challenge below. Complaints about latency will be printed and ignored.</p>
      </main>`
  },
  [VELVET_URL]: {
    url: VELVET_URL,
    title: "VelvetMage's Velvet Save Point",
    site: "vanta",
    ownerId: "velvet_mage",
    summary: "VelvetMage's atmospheric RPG homepage contains Axiom game journals, Kingdoms of Ashglass theories, VANTA2 anticipation, Glass Cathedral rumors, and Game Grid discussions.",
    commentsEnabled: true,
    seedComments: velvetComments,
    listed: true,
    hubId: "zone-gamegrid",
    searchTerms: ["VelvetMage", "Game Grid", "VANTA2", "Axiom", "Kingdoms of Ashglass", "Glass Cathedral", "RPG", "role playing games", "fan art"],
    render: () => `
      <main class="page gamegrid-user-page velvetmage-page">
        <div class="velvet-stars">✦　·　.　✧　.　·　✦　·　.　✧　.　·　✦</div>
        <header><small>an RPG journal by</small><h1>VelvetMage</h1><p>~ rest here before the next world ~</p></header>
        <nav><button data-nav="${GAMEGRID_URL}">Game Grid</button><button data-nav="web://vanta2.com/home">VANTA² Transmission</button></nav>
        <section class="velvet-intro">
          <div class="velvet-orb"><span>VM</span></div>
          <div><h2>Welcome, traveler.</h2><p>I keep journals for games that deserve more thought than a score out of ten. At present I am replaying <b>Kingdoms of Ashglass</b> on my original Axiom and saving for a VANTA².</p><p>Please do not email me to say the library chapter is boring. The library chapter explains everything.</p></div>
        </section>
        <section class="velvet-journals">
          <article><span>NOW PLAYING</span><h2>Kingdoms of Ashglass</h2><div class="velvet-screen ashglass">THE GLASS THRONE</div><p>The sealed observatory still has no documented key. DarkRaven believes the answer is hidden in a texture filename. He believes this about most doors.</p><b>Journal entry 17 · 42 hours</b></article>
          <article><span>MOST WANTED</span><h2>Glass Cathedral</h2><div class="velvet-screen cathedral">A SECOND WORLD</div><p>Axiom has shown one silver hallway, an upside-down bell tower, and no actual release date. I have naturally drawn a complete map.</p><b>VANTA² preview file</b></article>
          <article><span>OLD FAVORITE</span><h2>Rain City 2091</h2><div class="velvet-screen raincity">MEMORY // RAIN</div><p>A detective story where every witness remembers a different version of the city. The ending is either brilliant or unfinished.</p><b>Axiom CD · 1997</b></article>
        </section>
        <aside class="velvet-note">“A walkthrough tells you where to go. A journal remembers why you went.”</aside>
        <p class="gamegrid-owner-note">Thoughtful theories are welcome below. Spoilers should be labeled, especially if you are LagMaster.</p>
      </main>`
  },
  [PLAYER_FOUR_URL]: {
    url: PLAYER_FOUR_URL,
    title: "PlayerFourEver's Couch Multiplayer Page",
    site: "cubit",
    ownerId: "player_four",
    summary: "PlayerFourEver's bright CUBIT fan page tracks couch multiplayer scores and house rules for Block Party Deluxe, Turbo Lunchbox, Star Scouts, and Backyard Brawlers.",
    commentsEnabled: true,
    seedComments: playerFourComments,
    listed: true,
    hubId: "zone-gamegrid",
    searchTerms: ["Player Four", "PlayerFourEver", "Game Grid", "CUBIT", "Block Party Deluxe", "Turbo Lunchbox", "Star Scouts", "Backyard Brawlers", "party games", "couch multiplayer"],
    render: () => `
      <main class="page gamegrid-user-page playerfour-page">
        <header><div class="four-logo">P<span>4</span>E</div><div><small>PLAYER FOUR'S COUCH</small><h1>EVERY CONTROLLER COUNTS!</h1><p>A CUBIT fan page by PlayerFourEver</p></div></header>
        <nav><button data-nav="${GAMEGRID_URL}">&lt;&lt; GAME GRID</button><button data-nav="web://cubit.fun/home">CUBIT HOME</button><button data-nav="web://cubit.fun/games">GAME LIST</button></nav>
        <section class="four-welcome"><div class="four-controller"><i></i><b>4</b><em></em></div><div><h2>Controller Four Is Not the Bad Controller.</h2><p>Everybody acts like player four gets the loose controller and the corner of the couch. Not here. Pick a color, grab a snack, and settle it in the game.</p></div></section>
        <section class="four-scoreboard">
          <h2>LAST SATURDAY'S SCOREBOARD</h2>
          <table><thead><tr><th>GAME</th><th>WINNER</th><th>IMPORTANT CONTEXT</th></tr></thead><tbody>
            <tr><td>Block Party Deluxe</td><td>PlayerFourEver</td><td>The soup incident was legal.</td></tr>
            <tr><td>Turbo Lunchbox</td><td>LagMaster_99</td><td>He practiced alone first.</td></tr>
            <tr><td>Backyard Brawlers</td><td>VelvetMage</td><td>She found the rake combo.</td></tr>
            <tr><td>Star Scouts</td><td>EVERYBODY</td><td>Co-op means nobody has to admit losing.</td></tr>
          </tbody></table>
        </section>
        <section class="four-rules"><h2>HOUSE RULES v2.3</h2><ol><li>Winner chooses the next game.</li><li>No pausing during somebody else's special move.</li><li>Cheese dust stays off the controllers.</li><li>If the phone rings, finish the lap before answering.</li></ol></section>
        <aside class="four-poll"><b>THIS WEEK'S POLL:</b> Is the crying moon in Star Scouts cute, emotionally manipulative, or both? <strong>BOTH IS WINNING</strong></aside>
        <p class="gamegrid-owner-note">Sign the couch below. Challenges, house-rule appeals, and snack suggestions are all admissible.</p>
      </main>`
  },
  [MADDY_URL]: {
    url: MADDY_URL,
    title: "ModKit_Maddy's Map Lab",
    site: "modkit",
    ownerId: "modkit_maddy",
    summary: "ModKit_Maddy's PC game workshop features handmade levels, floppy-disk mods, Steel Cathedral, Hexforge Arena, a level editor, and notes about console ports.",
    commentsEnabled: true,
    seedComments: maddyComments,
    listed: true,
    hubId: "zone-gamegrid",
    searchTerms: ["ModKit Maddy", "Maddy", "Game Grid", "PC games", "mods", "level editor", "Steel Cathedral", "Hexforge Arena", "maps", "fan levels"],
    render: () => `
      <main class="page gamegrid-user-page maddy-page">
        <header><div><small>MODKIT_MADDY'S PERSONAL WORKBENCH</small><h1>MADDY'S MAP LAB</h1><p>if it compiles, ship it to your friends on a floppy</p></div>${gameGridImage("maddy-wizard-pc", "Maddy's hand-drawn wizard computer mascot", "maddy-mascot")}</header>
        <nav><button data-nav="${GAMEGRID_URL}">&lt; GAME GRID</button><button data-nav="web://bytebarn.com/home">PC PARTS</button></nav>
        <section class="maddy-intro">
          ${gameGridImage("maddy-portrait", "A scanned 1999 snapshot of Maddy at her beige PC")}
          <div><h2>Hello, geometry enjoyers!</h2><p>I'm Maddy. I make levels after homework, test them until the sun comes up, and mail the least broken versions to people who promise to read README files.</p><p>My PC is a Byte Barn Orbit 350 with an extremely unofficial purple joystick. PULSE/NET gets the best online lobbies, but no console lets me move a wall two pixels because it feels better.</p></div>
        </section>
        <section class="maddy-workbench">
          <div>${gameGridImage("maddy-space", "Maddy's cluttered desk with a CRT level editor, maps and floppy disks")}<small>THE LAB // photo by my mom, flash by the sun</small></div>
          <div>${gameGridImage("maddy-map", "Maddy's hand-drawn graph-paper multiplayer map")}<h2>HEXFORGE MAP: RELAY_8</h2><p>Eight teleporters. Four teams. One room that Queenie keeps calling a bus station.</p></div>
        </section>
        <section class="game-shot-grid maddy-shots">
          <article>${gameGridImage("steel-cathedral", "Screenshot of the fictional PC shooter Steel Cathedral")}<h2>Steel Cathedral</h2><p>My lighting patch makes the crypt visible. LagMaster says darkness is a skill issue.</p><b>BETA MAP 4</b></article>
          <article>${gameGridImage("hexforge-arena", "Screenshot of the fictional multiplayer game Hexforge Arena")}<h2>Hexforge Arena</h2><p>Four-player spell combat. The PULSE/NET port is rumored; my PC arenas are real now.</p><b>NEW TELEPORT LOGIC</b></article>
          <article>${gameGridImage("maddy-level-editor", "Screenshot of Maddy's fictional PC level editor")}<h2>ForgeKit Editor</h2><p>Wireframes, tile palettes, and the tiny doorway icon that has ruined several weekends.</p><b>TUTORIAL SOMEDAY</b></article>
        </section>
        <aside class="maddy-download">${gameGridImage("maddy-collage", "Maddy's photocopied level-design collage")}<div><b>FLOPPY MAIL CLUB</b><p>Send one blank disk and one useful bug report. Do not send chain letters, macros, or mysterious executables from DarkRaven.</p></div></aside>
        <p class="gamegrid-owner-note">Bug reports and map ideas go below. “It crashed” is an emotion, not a report.</p>
      </main>`
  },
  [QUEENIE_URL]: {
    url: QUEENIE_URL,
    title: "QuarterQueen's Token Palace",
    site: "pulse",
    ownerId: "quarter_queen",
    summary: "QuarterQueen documents neighborhood arcade cabinets, high scores, tournaments, Meteor Taxi, Graveyard Shift '99, Aqua Beat, and their PULSE/NET, VANTA2, and CUBIT home ports.",
    commentsEnabled: true,
    seedComments: queenieComments,
    listed: true,
    hubId: "zone-gamegrid",
    searchTerms: ["QuarterQueen", "Queenie", "Game Grid", "arcade", "high scores", "Meteor Taxi", "Graveyard Shift 99", "Aqua Beat", "tokens", "tournament"],
    render: () => `
      <main class="page gamegrid-user-page queenie-page">
        <header>${gameGridImage("queenie-token-crown", "A handmade crown built from colorful arcade tokens")}<div><small>INSERT COIN // CLAIM THE CROWN</small><h1>QUARTER<br>QUEEN</h1><p>local cabinets, honest scores, zero continues</p></div></header>
        <nav><button data-nav="${GAMEGRID_URL}">GAME GRID</button><button data-nav="web://pulsenet.red/home">HOME PORTS</button></nav>
        <section class="queenie-intro">
          ${gameGridImage("queenie-portrait", "A scanned snapshot of QuarterQueen inside a neighborhood arcade")}
          <div><h2>Welcome to the Token Palace.</h2><p>I'm Queenie. If an arcade has sticky carpet, a change machine that only likes certain dollars, and one cabinet nobody else can clear, I want its address.</p><p>Current territory: Star Harbor Arcade, Galaxy Lanes lobby, and the laundromat with Graveyard Shift '99 beside dryer twelve.</p></div>
          ${gameGridImage("queenie-score-sheet", "QuarterQueen's handwritten high-score notebook page")}
        </section>
        <div class="queenie-ticker">*** NEW SCORE: METEOR TAXI / 1,248,600 / CABINET 2 *** AQUA BEAT MACHINE STILL EATS BLUE TOKENS ***</div>
        <section class="game-shot-grid queenie-shots">
          <article>${gameGridImage("meteor-taxi", "Screenshot of the fictional arcade racing game Meteor Taxi")}<h2>Meteor Taxi</h2><p>Fast turns, strange passengers, great city lights. The PULSE/NET conversion needs the original steering wobble.</p><b>HIGH SCORE: 1,248,600</b></article>
          <article>${gameGridImage("graveyard-shift-99", "Screenshot of the fictional arcade beat-em-up Graveyard Shift '99")}<h2>Graveyard Shift '99</h2><p>Skeleton clerks, mop combos, two-player chaos. VANTAÂ² should get the closest arcade-perfect port.</p><b>CLEAR: 1 CREDIT</b></article>
          <article>${gameGridImage("aqua-beat", "Screenshot of the fictional undersea rhythm arcade game Aqua Beat")}<h2>Aqua Beat</h2><p>The fish judge your timing. CUBIT's four-controller remix could heal or destroy game night.</p><b>RANK: ELECTRIC EEL</b></article>
        </section>
        <section class="queenie-floor">${gameGridImage("queenie-space", "A row of colorful neighborhood arcade cabinets")}<div><h2>CABINET WATCH</h2><p>Rumor says Star Harbor is replacing Aqua Beat with a prize crane on Friday. This would be an act of war. Polite calls are encouraged.</p>${gameGridImage("queenie-cabinet-art", "A collage of hand-painted meteor, skeleton and fish arcade cabinet art")}</div></section>
        <p class="gamegrid-owner-note">Post scores, sightings, and broken-button warnings below. Photos beat legends.</p>
      </main>`
  },
  [DEX_URL]: {
    url: DEX_URL,
    title: "CodeDex's Secret Index",
    site: "cubit",
    ownerId: "code_dex",
    summary: "CodeDex collects spoiler-light maps, button codes, hidden rooms, and secrets for Signal Diver on PULSE/NET, Dream Orchard on VANTA2, and Microbe Ranch on CUBIT.",
    commentsEnabled: true,
    seedComments: dexComments,
    listed: true,
    hubId: "zone-gamegrid",
    searchTerms: ["CodeDex", "Dex", "Game Grid", "cheats", "secrets", "codes", "walkthroughs", "Signal Diver", "Dream Orchard", "Microbe Ranch", "hidden rooms"],
    render: () => `
      <main class="page gamegrid-user-page dex-page">
        <header><div class="dex-tabs"><i>P</i><i>V2</i><i>C</i></div><div><small>PERSONAL REFERENCE FILE // COMPILED BY CODEDEX</small><h1>THE SECRET INDEX</h1><p>maps, mysteries &amp; codes for every machine</p></div>${gameGridImage("dex-detective", "CodeDex's hand-drawn detective mascot inspecting a treasure chest")}</header>
        <nav><button data-nav="${GAMEGRID_URL}">&lt; DIRECTORY</button><button data-nav="web://pulsenet.red/home">PULSE/NET</button><button data-nav="web://vanta2.com/home">VANTAÂ²</button><button data-nav="web://cubit.fun/home">CUBIT</button></nav>
        <section class="dex-intro">
          <div>${gameGridImage("dex-portrait", "A scanned snapshot of CodeDex playing games beside a CRT television")}<small>ME + THE RESEARCH STATION</small></div>
          <div><h2>No fake codes. No ending spoilers.</h2><p>Every secret here has been tested twice, unless marked <b>RUMOR</b>. I keep a binder for each console because bookmarks vanish, magazines get borrowed, and the Internet occasionally lies.</p><p>Send clues, not invented stories about unlocking PULSE/NET's red controller by beating every game upside down.</p></div>
          ${gameGridImage("dex-binders", "CodeDex's three handmade console-secret binders")}
        </section>
        <section class="dex-files">
          <article><header><b>FILE P-019</b><span>VERIFIED</span></header>${gameGridImage("signal-diver", "Screenshot of the fictional PULSE/NET game Signal Diver")}<h2>Signal Diver</h2><p>The wireframe vault opens after seven silent relays. The thirty-seven-input route is faster, not easier.</p><small>PULSE/NET // NETWORK EXPLORATION</small></article>
          <article><header><b>FILE V-204</b><span>PARTIAL</span></header>${gameGridImage("dream-orchard", "Screenshot of the fictional VANTA2 game Dream Orchard")}<h2>Dream Orchard</h2><p>A tree without a shadow hides the silver fruit. Waiting is an input, even when no button is pressed.</p><small>VANTAÂ² // MOON ORCHARD MAP</small></article>
          <article><header><b>FILE C-088</b><span>RUMOR</span></header>${gameGridImage("microbe-ranch", "Screenshot of the fictional CUBIT game Microbe Ranch")}<h2>Microbe Ranch</h2><p>Blue + blue may produce orange after midnight. Cubby will neither confirm nor confiscate my notes.</p><small>CUBIT // BREEDING CHART</small></article>
        </section>
        <section class="dex-map-box">${gameGridImage("dex-orchard-map", "CodeDex's colored-pencil map of the Dream Orchard")}<div><h2>MAP OF THE WEEK</h2><p>Dream Orchard's fruit cycle, reconstructed from moon phases, save files, and VelvetMage standing in the wrong grove for forty minutes.</p></div></section>
        <aside class="dex-archive">${gameGridImage("dex-space", "A shelf of fictional consoles, games and handwritten strategy binders")}<p><b>THE PHYSICAL ARCHIVE:</b> Three consoles, twenty-seven binders, sixty-one game boxes, and one cartridge labeled only with a question mark.</p></aside>
        <p class="gamegrid-owner-note">Submit a secret below. Please label rumors before they become everybody's afternoon.</p>
      </main>`
  }
};
