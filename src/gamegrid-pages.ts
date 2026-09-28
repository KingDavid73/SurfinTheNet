import type { PageComment, PageDefinition } from "./types";

const GAMEGRID_URL = "web://orbitnet.local/zones/gamegrid";
const LAGMASTER_URL = "web://gamegrid.zone/users/lagmaster99/home";
const VELVET_URL = "web://gamegrid.zone/users/velvetmage/home";
const PLAYER_FOUR_URL = "web://gamegrid.zone/users/player4ever/home";
const MADDY_URL = "web://gamegrid.zone/users/modkitmaddy/home";
const QUEENIE_URL = "web://gamegrid.zone/users/quarterqueen/home";
const DEX_URL = "web://gamegrid.zone/users/codedex/home";
const CARD_FORGE_URL = "web://gamegrid.zone/users/riftscribethane/home";
const MINI_MARSHAL_URL = "web://gamegrid.zone/users/minimarshalrae/home";
const BIT_BUNKER_URL = "web://gamegrid.zone/users/bitbunkerburt/home";

const ARCHIVE_COMPUTER_GIF = new URL("../assets/images/archive-gifs/beige-computer.gif", import.meta.url).href;
const LAGMASTER_GIF = new URL("../assets/images/yesterday/gifs/flaming-skull.gif", import.meta.url).href;
const VELVET_GIF = new URL("../assets/images/yesterday/gifs/angel-cloud.gif", import.meta.url).href;
const PLAYER_FOUR_GIF = new URL("../assets/images/yesterday/gifs/drop-a-line.gif", import.meta.url).href;

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
  "dex-detective": new URL("../assets/images/gamegrid-members/ephemera/dex-detective.png", import.meta.url).href,
  "storm-gryphon": new URL("../assets/images/gamegrid-members/cardforge/storm-gryphon.png", import.meta.url).href,
  "thorn-oracle": new URL("../assets/images/gamegrid-members/cardforge/thorn-oracle.png", import.meta.url).href,
  "banner-dead": new URL("../assets/images/gamegrid-members/cardforge/banner-dead.png", import.meta.url).href,
  "ember-phoenix": new URL("../assets/images/gamegrid-members/cardforge/ember-phoenix.png", import.meta.url).href,
  "marsh-witch": new URL("../assets/images/gamegrid-members/cardforge/marsh-witch.png", import.meta.url).href,
  "prism-golem": new URL("../assets/images/gamegrid-members/cardforge/prism-golem.png", import.meta.url).href,
  "archive-sage": new URL("../assets/images/gamegrid-members/cardforge/archive-sage.png", import.meta.url).href,
  "blackwake-serpent": new URL("../assets/images/gamegrid-members/cardforge/blackwake-serpent.png", import.meta.url).href,
  "cog-goblin": new URL("../assets/images/gamegrid-members/cardforge/cog-goblin.png", import.meta.url).href,
  "rae-session-photo": new URL("../assets/images/gamegrid-members/minimarshal/session-photo.png", import.meta.url).href,
  "rae-battleline": new URL("../assets/images/gamegrid-members/minimarshal/battleline.png", import.meta.url).href,
  "rae-sir-arden-sheet": new URL("../assets/images/gamegrid-members/minimarshal/sir-arden-sheet.png", import.meta.url).href,
  "rae-mire-dragon": new URL("../assets/images/gamegrid-members/minimarshal/mire-dragon.png", import.meta.url).href,
  "rae-bannerfall-army": new URL("../assets/images/gamegrid-members/minimarshal/bannerfall-army.png", import.meta.url).href,
  "rae-seer-sketch": new URL("../assets/images/gamegrid-members/minimarshal/seer-sketch.png", import.meta.url).href,
  "rae-painting-mini": new URL("../assets/images/gamegrid-members/minimarshal/painting-mini.png", import.meta.url).href,
  "rae-catacomb-terrain": new URL("../assets/images/gamegrid-members/minimarshal/catacomb-terrain.png", import.meta.url).href,
  "rae-party-drawing": new URL("../assets/images/gamegrid-members/minimarshal/party-drawing.png", import.meta.url).href,
  "lag-reticle": new URL("../assets/images/gamegrid-upgrades/lagmaster/art-1.png", import.meta.url).href,
  "lag-terminal": new URL("../assets/images/gamegrid-upgrades/lagmaster/art-2.png", import.meta.url).href,
  "lag-car": new URL("../assets/images/gamegrid-upgrades/lagmaster/art-3.png", import.meta.url).href,
  "lag-vs": new URL("../assets/images/gamegrid-upgrades/lagmaster/art-5.png", import.meta.url).href,
  "velvet-moon": new URL("../assets/images/gamegrid-upgrades/velvetmage/art-1.png", import.meta.url).href,
  "velvet-map": new URL("../assets/images/gamegrid-upgrades/velvetmage/art-2.png", import.meta.url).href,
  "velvet-orb-art": new URL("../assets/images/gamegrid-upgrades/velvetmage/art-3.png", import.meta.url).href,
  "velvet-cathedral": new URL("../assets/images/gamegrid-upgrades/velvetmage/art-4.png", import.meta.url).href,
  "four-couch": new URL("../assets/images/gamegrid-upgrades/playerfour/art-1.png", import.meta.url).href,
  "four-cubit": new URL("../assets/images/gamegrid-upgrades/playerfour/art-2.png", import.meta.url).href,
  "four-pizza": new URL("../assets/images/gamegrid-upgrades/playerfour/art-3.png", import.meta.url).href,
  "four-bracket": new URL("../assets/images/gamegrid-upgrades/playerfour/art-4.png", import.meta.url).href
  ,"burt-setup": new URL("../assets/images/gamegrid-members/bitbunker/burt-setup.png", import.meta.url).href
  ,"burt-nova-siege": new URL("../assets/images/gamegrid-members/bitbunker/nova-siege.png", import.meta.url).href
  ,"burt-magazine-scan": new URL("../assets/images/gamegrid-members/bitbunker/magazine-scan.png", import.meta.url).href
  ,"burt-woodgrain-console": new URL("../assets/images/gamegrid-members/bitbunker/woodgrain-console.png", import.meta.url).href
  ,"burt-green-maze": new URL("../assets/images/gamegrid-members/bitbunker/green-maze.png", import.meta.url).href
  ,"burt-computer-club": new URL("../assets/images/gamegrid-members/bitbunker/computer-club.png", import.meta.url).href
  ,"burt-striped-cartridge": new URL("../assets/images/gamegrid-members/bitbunker/striped-cartridge.png", import.meta.url).href
  ,"burt-printer-joystick": new URL("../assets/images/gamegrid-members/bitbunker/printer-joystick.png", import.meta.url).href
  ,"burt-dungeon-map": new URL("../assets/images/gamegrid-members/bitbunker/dungeon-map.png", import.meta.url).href
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
  },
  {
    url: CARD_FORGE_URL,
    handle: "RiftScribeThane",
    title: "RiftScribe Thane's Riftborne Archive",
    description: "Riftborne deck math, forbidden synergies, creature lore, and entirely too many notes about one mana curve.",
    console: "RIFTBORNE TCG",
    className: "cardforge",
    minimumPhase: 4
  },
  {
    url: MINI_MARSHAL_URL,
    handle: "MiniMarshalRae",
    title: "Rae's Red Banner Campaign Log",
    description: "Crown & Catacombs session notes, painted Bannerfall armies, character sketches, and practical dragon advice.",
    console: "TABLETOP / MINIATURES",
    className: "minimarshal",
    minimumPhase: 4
  },
  {
    url: BIT_BUNKER_URL,
    handle: "BitBunkerBurt",
    title: "Burt's Byte Bunker",
    description: "Pre-Orbit games, old home computers, dog-eared magazines, and one man refusing to call 1984 retro.",
    console: "CLASSIC MACHINES",
    className: "bitbunker",
    minimumPhase: 3
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
        <header><small>GAME GRID MEMBER PAGE // USER 00481</small><h1>_LAGMASTER_99_</h1><p>WELCOME TO THE 56K FRAG SHACK</p>${gameGridImage("lag-reticle", "LagMaster's red target monitor", "lag-header-art")}<img class="lag-gif" src="${LAGMASTER_GIF}" alt="Animated flaming skull"></header>
        <nav><button data-nav="${GAMEGRID_URL}">&lt;&lt; GAME GRID</button><button data-nav="web://pulsenet.red/home">PULSE/NET</button><button data-nav="web://gamegrid.zone/users/lagmaster99/rankings">SKILL INDEX</button><button data-nav="web://gamegrid.zone/users/lagmaster99/lagwave">LAGWAVE_99</button></nav>
        <div class="lag-marquee">*** LAG IS A CONDITION — LOSING IS A DECISION ***</div>
        <section class="lag-hero">
          <div class="lag-rig">${gameGridImage("lag-terminal", "LagMaster's beige terminal computer", "lag-terminal-art")}<span>56K</span><b>PULSE/NET</b><i>ONLINE</i></div>
          <div><h2>MY CURRENT WEAPON OF CHOICE</h2><p>PULSE/NET has the modem in the box, four ports in the front, and people online who cannot unplug the controller when they lose.</p><dl><div><dt>SCREEN NAME</dt><dd>LagMaster_99</dd></div><div><dt>CONNECTION</dt><dd>Usually 44.0K</dd></div><div><dt>EXCUSES ACCEPTED</dt><dd>ZERO</dd></div></dl></div>
        </section>
        <section class="lag-game-list">
          <article><b>01</b>${gameGridImage("lag-car", "Redline Riot flame car", "lag-list-art")}<div><h2>REDLINE RIOT</h2><p>Network street racing. Favorite car: Hex Comet. Current rank: 38 and climbing.</p></div><strong>9.5/10</strong></article>
          <article><b>02</b>${gameGridImage("lag-vs", "Zero Hour Fighters versus screen", "lag-list-art")}<div><h2>ZERO HOUR FIGHTERS</h2><p>Quarter-circle inputs, destructible arenas, and no cheap characters except the one Velvet uses.</p></div><strong>9/10</strong></article>
          <article><b>03</b>${gameGridImage("lag-reticle", "NetStrike 56 target badge", "lag-list-art")}<div><h2>NETSTRIKE 56</h2><p>Four-on-four arena combat. Friday lobby tests are open if your parents do not need the phone.</p></div><strong>HYPE!</strong></article>
        </section>
        <aside class="lag-opinions"><b>CONSOLE WAR STATUS:</b> VANTA² looks expensive. CUBIT looks like a lunchbox. I will still play both if somebody else buys them.</aside>
        <div class="contact-strip"><span>LagMaster is usually online after school.</span><button data-aim-owner="lagmaster_99">IM LagMaster</button></div>
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
        <header><small>an RPG journal by</small><h1>VelvetMage</h1><p>~ rest here before the next world ~</p>${gameGridImage("velvet-moon", "VelvetMage's crystal moon collage", "velvet-header-art")}<img class="velvet-gif" src="${VELVET_GIF}" alt="Animated cloud angel"></header>
        <nav><button data-nav="${GAMEGRID_URL}">Game Grid</button><button data-nav="web://vanta2.com/home">VANTA² Transmission</button></nav>
        <section class="velvet-intro">
          <div class="velvet-orb">${gameGridImage("velvet-orb-art", "VelvetMage's hand-drawn crystal orb", "velvet-orb-art")}<span>VM</span></div>
          <div><h2>Welcome, traveler.</h2><p>I keep journals for games that deserve more thought than a score out of ten. At present I am replaying <b>Kingdoms of Ashglass</b> on my original Axiom and saving for a VANTA².</p><p>Please do not email me to say the library chapter is boring. The library chapter explains everything.</p></div>
        </section>
        <section class="velvet-journals">
          <article><span>NOW PLAYING</span><h2>Kingdoms of Ashglass</h2>${gameGridImage("velvet-map", "VelvetMage's drawn map of Ashglass", "velvet-section-art")}<p>The sealed observatory still has no documented key. DarkRaven believes the answer is hidden in a texture filename. He believes this about most doors.</p><b>Journal entry 17 · 42 hours</b></article>
          <article><span>MOST WANTED</span><h2>Glass Cathedral</h2>${gameGridImage("velvet-cathedral", "VelvetMage's Glass Cathedral artwork", "velvet-section-art")}<p>Axiom has shown one silver hallway, an upside-down bell tower, and no actual release date. I have naturally drawn a complete map.</p><b>VANTA² preview file</b></article>
          <article><span>OLD FAVORITE</span><h2>Rain City 2091</h2>${gameGridImage("velvet-orb-art", "VelvetMage's rainy crystal orb sketch", "velvet-section-art")}<p>A detective story where every witness remembers a different version of the city. The ending is either brilliant or unfinished.</p><b>Axiom CD · 1997</b></article>
        </section>
        <aside class="velvet-note">“A walkthrough tells you where to go. A journal remembers why you went.”</aside>
        <div class="contact-strip"><span>Velvet accepts thoughtful instant messages.</span><button data-aim-owner="velvet_mage">IM VelvetMage</button></div>
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
        <header><div class="four-logo">P<span>4</span>E</div><div><small>PLAYER FOUR'S COUCH</small><h1>EVERY CONTROLLER COUNTS!</h1><p>A CUBIT fan page by PlayerFourEver</p></div>${gameGridImage("four-couch", "Four controllers on PlayerFourEver's couch", "four-header-art")}<img class="four-gif" src="${PLAYER_FOUR_GIF}" alt="Animated drop a line mailbox"></header>
        <nav><button data-nav="${GAMEGRID_URL}">&lt;&lt; GAME GRID</button><button data-nav="web://cubit.fun/home">CUBIT HOME</button><button data-nav="web://cubit.fun/games">GAME LIST</button></nav>
        <section class="four-welcome"><div class="four-controller">${gameGridImage("four-cubit", "PlayerFourEver's homemade CUBIT board", "four-controller-art")}<i></i><b>4</b><em></em></div><div><h2>Controller Four Is Not the Bad Controller.</h2><p>Everybody acts like player four gets the loose controller and the corner of the couch. Not here. Pick a color, grab a snack, and settle it in the game.</p></div></section>
        <section class="four-scoreboard">
          <h2>LAST SATURDAY'S SCOREBOARD</h2>
          <table><thead><tr><th>GAME</th><th>WINNER</th><th>IMPORTANT CONTEXT</th></tr></thead><tbody>
            <tr><td>Block Party Deluxe</td><td>PlayerFourEver</td><td>The soup incident was legal.</td></tr>
            <tr><td>Turbo Lunchbox</td><td>LagMaster_99</td><td>He practiced alone first.</td></tr>
            <tr><td>Backyard Brawlers</td><td>VelvetMage</td><td>She found the rake combo.</td></tr>
            <tr><td>Star Scouts</td><td>EVERYBODY</td><td>Co-op means nobody has to admit losing.</td></tr>
          </tbody></table>
        </section>
        <section class="four-rules">${gameGridImage("four-pizza", "Pizza and a game controller", "four-rule-art")}<h2>HOUSE RULES v2.3</h2><ol><li>Winner chooses the next game.</li><li>No pausing during somebody else's special move.</li><li>Cheese dust stays off the controllers.</li><li>If the phone rings, finish the lap before answering.</li></ol></section>
        <aside class="four-poll">${gameGridImage("four-bracket", "Hand-drawn tournament bracket", "four-poll-art")}<b>THIS WEEK'S POLL:</b> Is the crying moon in Star Scouts cute, emotionally manipulative, or both? <strong>BOTH IS WINNING</strong></aside>
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
        <aside class="dex-archive">${gameGridImage("dex-space", "A shelf of fictional consoles, games and handwritten strategy binders")}<img class="archive-gif archive-gif-computer" src="${ARCHIVE_COMPUTER_GIF}" alt="Animated beige computer"><p><b>THE PHYSICAL ARCHIVE:</b> Three consoles, twenty-seven binders, sixty-one game boxes, and one cartridge labeled only with a question mark.</p></aside>
        <p class="gamegrid-owner-note">Submit a secret below. Please label rumors before they become everybody's afternoon.</p>
      </main>`
  },
  [CARD_FORGE_URL]: {
    url: CARD_FORGE_URL,
    title: "RiftScribe Thane's Riftborne Archive",
    site: "pulse",
    ownerId: "riftscribe_thane",
    summary: "RiftScribeThane is a newly arrived phase-four Riftborne TCG strategist who posts high-fantasy card art, deck lists, combos, set speculation, creature lore, and long arguments about mana curves.",
    commentsEnabled: true,
    seedComments: [
      seed("thane-seed-dex", CARD_FORGE_URL, "riftscribe_thane", "visitor", "CodeDex", "I only came to verify that your ten-step opener is legal. It is. I regret discovering this.", "1999-11-12T22:41:00"),
      seed("thane-seed-velvet", CARD_FORGE_URL, "riftscribe_thane", "visitor", "VelvetMage", "The Thorn Oracle's flavor text is better than most fantasy games. I am not taking questions.", "1999-11-12T22:56:00"),
      seed("thane-seed-owner", CARD_FORGE_URL, "riftscribe_thane", "owner", "RiftScribeThane", "THANK YOU. The Oracle knew the old roots before the kingdoms had names. That is what a two-drop is supposed to feel like.", "1999-11-12T23:04:00")
    ],
    listed: true,
    minimumPhase: 4,
    hubId: "zone-gamegrid",
    searchTerms: ["RiftScribe Thane", "RiftScribeThane", "Riftborne", "TCG", "trading cards", "deck", "mana curve", "combos", "fantasy cards", "Stormwing", "Thorn Oracle"],
    render: () => `
      <main class="page gamegrid-user-page cardforge-page">
        <header><div><small>RIFTBORNE STRATEGY ARCHIVE // UPDATED TOO OFTEN</small><h1>RIFT<span>SCRIBE</span> THANE</h1><p>THE RIFTBORNE ARCHIVE // COMBOS ARE A FORM OF POETRY</p></div>${gameGridImage("archive-sage", "A floating-library wizard from the Riftborne card game", "cardforge-header-art")}</header>
        <nav><button data-nav="${GAMEGRID_URL}">&lt; GAME GRID</button><button data-nav="${CARD_FORGE_URL}">HOME DECK</button><button data-nav="${CARD_FORGE_URL}">DECK VAULT</button><button data-nav="${CARD_FORGE_URL}">LORE NOTES</button></nav>
        <div class="cardforge-ticker">*** NEW TO ORBIT // RIFTBORNE PLAYERS PLEASE IDENTIFY YOURSELVES *** STORM CROWN IS NOT “JUST BIRDS” ***</div>
        <section class="cardforge-intro"><div>${gameGridImage("storm-gryphon", "Stormbound gryphon card art", "cardforge-feature")}</div><div><h2>WELCOME, SPELLSLINGERS.</h2><p>I heard Orbit had people who actually read card text, so I made a page before the next set drops. I play <b>Riftborne</b>: five realms, thirty-card decks, one hero, and enough old wars to fill a library shelf.</p><p>My current deck is <b>Storm Crown Rebirth</b>. It looks like a gryphon deck until you realize every “bird” is really a discard outlet with wings. That is not a trick. That is civilization.</p></div><aside><b>CAL'S LAW:</b><span>if a card costs seven, it should either win the game or tell you something upsetting about the ancient world.</span></aside></section>
        <section class="cardforge-deck"><header><b>DECK OF THE WEEK</b><span>STORM CROWN REBIRTH // 30 CARDS</span></header><div class="cardforge-deck-grid"><article>${gameGridImage("storm-gryphon", "Stormwing Reclaimer card art")}<h2>Stormwing Reclaimer</h2><p>Returns one discarded relic when it enters. The entire deck is built around pretending that was an accident.</p><small>SKY // CREATURE</small></article><article>${gameGridImage("ember-phoenix", "Cinder Phoenix card art")}<h2>Cinder Phoenix</h2><p>Burns itself into the ash pile, then comes back when a relic leaves play. It has the manners of a campfire.</p><small>EMBER // CREATURE</small></article><article>${gameGridImage("prism-golem", "Prism Golem card art")}<h2>Prism Golem</h2><p>The payoff. Every returned relic turns one color of the golem on. Four colors is rude. Five is a letter to your opponent.</p><small>RUIN // ARTIFACT</small></article></div></section>
        <section class="cardforge-combo"><div><h2>THE “NOT A BIRD DECK” COMBO</h2><ol><li>Discard <b>Sunken Standard</b> to Stormwing.</li><li>Bring it back with Cinder Phoenix.</li><li>Spend the returned banner on Prism Golem.</li><li>Smile politely while the golem becomes all five realms at once.</li></ol><p><b>IMPORTANT:</b> Do not play the golem on turn four unless you enjoy explaining basic arithmetic to a table of angry people.</p></div>${gameGridImage("banner-dead", "A skeletal knight holding a crimson banner", "cardforge-combo-art")}</section>
        <section class="cardforge-lore"><header><b>RIFTBORNE LORE CORNER</b><span>THE OLD KINGDOMS WERE WEIRD ON PURPOSE</span></header><article>${gameGridImage("thorn-oracle", "Thorn Oracle card art")}<div><h2>The Thorn Oracle &amp; the Unnamed Grove</h2><p>Everyone thinks the Oracle is a generic green card because they do not read the old set guide. The antlers mark her as a witness of the Root War. Her text says “look at the top three cards.” Her story says the forest remembers every kingdom that tried to map it.</p></div></article><article>${gameGridImage("marsh-witch", "Moonlit marsh witch card art")}<div><h2>Why the Marsh Witch Knows the Crown</h2><p>The witch appears three sets before the Crown relic. Her lantern flame is the same five-point symbol on the banner. Coincidence? Maybe. But Riftborne's best lore is always hiding in a common card somebody threw in a shoebox.</p></div></article></section>
        <section class="cardforge-trade-row">${gameGridImage("blackwake-serpent", "Blackwake Serpent card art")}<div><h2>TRADE / RUMOR / PLEASE READ</h2><p>Seeking: one Blackwake Serpent, preferably not bent. Offering: foil Cog Goblin, two Root War commons, and an extremely convincing explanation of why the new Sky realm is underpowered.</p></div>${gameGridImage("cog-goblin", "Cog Goblin card art")}</section>
        <p class="gamegrid-owner-note">Post deck lists below. If you call something broken, include the mana cost or I will assume you lost to it once.</p>
      </main>`
  },
  [MINI_MARSHAL_URL]: {
    url: MINI_MARSHAL_URL,
    title: "Rae's Red Banner Campaign Log",
    site: "pulse",
    ownerId: "minimarshal_rae",
    summary: "MiniMarshalRae is a phase-four tabletop obsessive who writes Crown & Catacombs session reports, paints Bannerfall miniatures, sketches player characters, and treats every campaign like a historical record.",
    commentsEnabled: true,
    seedComments: [
      seed("rae-seed-thane", MINI_MARSHAL_URL, "minimarshal_rae", "visitor", "RiftScribeThane", "Rae painted an entire army while I was building one deck. That is either focus or a different kind of mana curve.", "1999-11-13T22:12:00"),
      seed("rae-seed-owner", MINI_MARSHAL_URL, "minimarshal_rae", "owner", "MiniMarshalRae", "The army has nineteen spears, six shields, one banner, and a tragic amount of mud. Please respect the process.", "1999-11-13T22:17:00"),
      seed("rae-seed-dex", MINI_MARSHAL_URL, "minimarshal_rae", "visitor", "CodeDex", "The catacomb map is extremely good. I have no idea what any of the symbols mean, which I assume is the point.", "1999-11-13T22:31:00")
    ],
    listed: true,
    minimumPhase: 4,
    hubId: "zone-gamegrid",
    searchTerms: ["MiniMarshal Rae", "MiniMarshalRae", "Crown and Catacombs", "Bannerfall", "tabletop", "roleplaying", "miniatures", "painted armies", "character sheets", "fantasy"],
    render: () => `
      <main class="page gamegrid-user-page minimarshal-page">
        <header><div><small>TACTICAL FANTASY // PAINT STATION // CAMPAIGN FILES</small><h1>RED BANNER<br><span>CAMPAIGN LOG</span></h1><p>Rae's little wars, long sessions, and very important goblin decisions.</p></div>${gameGridImage("rae-battleline", "Two painted fantasy miniature armies facing off", "minimarshal-header-art")}</header>
        <nav><button data-nav="${GAMEGRID_URL}">&lt; GAME GRID</button><button data-nav="${MINI_MARSHAL_URL}">SESSION LOGS</button><button data-nav="${MINI_MARSHAL_URL}">PAINT TABLE</button><button data-nav="${MINI_MARSHAL_URL}">CHARACTER WALL</button></nav>
        <section class="minimarshal-intro">${gameGridImage("rae-session-photo", "Friends playing a fantasy tabletop game around a dining room table", "minimarshal-session-photo")}<div><h2>WELCOME TO THE BASEMENT KINGDOM.</h2><p>Thane and I found Orbit on the same night. He brought card binders. I brought three campaign notebooks, two tackle boxes of dice, and a painted goblin captain who is not an action figure.</p><p>My main game is <b>Crown &amp; Catacombs</b>, where our party has spent six real months attempting to return one cursed bell to a city that definitely does not want it back. On battle nights, I play <b>Bannerfall</b>, a miniature war game about bright banners, terrible terrain, and measuring exactly.</p></div><aside><b>CAMPAIGN STATUS:</b><span>THE BELL IS BACK. THE MAYOR IS MISSING. SIR ARDEN HAS A NEW HAT.</span></aside></section>
        <section class="minimarshal-log"><header><b>CROWN &amp; CATACOMBS // SESSION 18</b><span>THE MUD GATE INCIDENT</span></header><div>${gameGridImage("rae-catacomb-terrain", "A tabletop dungeon terrain set with adventurer miniatures")}<article><h2>We Opened The Wrong Door Correctly.</h2><p>Sir Arden rolled a perfect lockpick check on the black gate beneath Kestrel Ford. Everybody cheered. Then the gate opened into a flooded chapel full of polite skeletons who asked whether we had an appointment.</p><p>Our seer offered them a candle. The bard tried to book them for a festival. The dwarf fell in the water, discovered the bell was under the altar, and then woke up the Mire Dragon. This is why I write everything down.</p><b>NEXT SESSION: run from the thing we were supposed to find.</b></article></div></section>
        <section class="minimarshal-cards"><article>${gameGridImage("rae-sir-arden-sheet", "A hand-drawn horned knight character sheet")}<h2>Sir Arden of the Wet March</h2><p>Paladin, hallway negotiator, owner of the new hat. His player says the horns are symbolic. Nobody has asked symbolic of what.</p></article><article>${gameGridImage("rae-seer-sketch", "Pencil sketch of a wizard player character")}<h2>Vela, Lantern Seer</h2><p>Can read smoke, dreams, and poorly folded maps. Cannot read her own handwriting after midnight.</p></article><article>${gameGridImage("rae-party-drawing", "Colored-pencil graph-paper drawing of an adventuring party")}<h2>THE PARTY, SORT OF</h2><p>I drew this after session four. The bard says his cape is too small. The bard is lucky he is included.</p></article></section>
        <section class="minimarshal-army"><div>${gameGridImage("rae-bannerfall-army", "Overhead view of a painted fantasy miniature army on desert terrain")}<h2>BANNERFALL // ASHEN MARCHES</h2><p>My Red Banner infantry finally has matching shield rims. The swamp lancers do not match because their commander fell into paint water and now looks haunted. That is called lore.</p></div><div>${gameGridImage("rae-painting-mini", "A hobbyist painting a tiny fantasy knight miniature")}<h2>PAINT DESK RULES</h2><ol><li>Thin your paints.</li><li>Do not use the good brush for mud.</li><li>Never begin a new unit at 1:00 AM unless you have accepted consequences.</li></ol></div></section>
        <aside class="minimarshal-monster">${gameGridImage("rae-mire-dragon", "A painted green dragon miniature")}<div><h2>MONSTER OF THE MONTH: MIRE DRAGON</h2><p>Not actually evil. Mostly territorial, damp, and offended by bells. Our game master gave it a tragic backstory, so of course the party has now adopted its egg.</p></div></aside>
        <p class="gamegrid-owner-note">Leave campaign tales, paint recipes, and heroic last words below. Please keep all rules arguments somewhere the snacks cannot hear.</p>
      </main>`
  },
  [BIT_BUNKER_URL]: {
    url: BIT_BUNKER_URL,
    title: "Burt's Byte Bunker",
    site: "pulse",
    ownerId: "bitbunker_burt",
    summary: "BitBunkerBurt is an older game nerd who joined in phase three to catalog the pre-Orbit computers, consoles, magazines, and games he refuses to call retro.",
    commentsEnabled: true,
    seedComments: [
      seed("burt-seed-owner", BIT_BUNKER_URL, "bitbunker_burt", "owner", "BitBunkerBurt", "Yes, I know the screen is tiny. It was tiny in 1981 too. That is not the point.", "1999-11-09T20:11:00"),
      seed("burt-seed-thane", BIT_BUNKER_URL, "bitbunker_burt", "visitor", "RiftScribeThane", "The green maze game is kind of incredible. Also, did people really wait for programs to load from tape?", "1999-11-13T22:48:00"),
      seed("burt-seed-owner-2", BIT_BUNKER_URL, "bitbunker_burt", "owner", "BitBunkerBurt", "We listened to the tape load because we had imagination, Thane. Also because there was no alternative.", "1999-11-13T22:53:00")
    ],
    listed: true,
    minimumPhase: 3,
    hubId: "zone-gamegrid",
    searchTerms: ["BitBunker Burt", "BitBunkerBurt", "classic games", "old computers", "home computer", "woodgrain console", "Nova Siege", "Green Maze", "computer club", "magazines"],
    render: () => `
      <main class="page gamegrid-user-page bitbunker-page">
        <header><div><small>OLD MACHINES // OLD GAMES // NO, NOT A MUSEUM</small><h1>BURT'S<br><span>BYTE BUNKER</span></h1><p>games were weird before they had enough memory to explain themselves.</p></div>${gameGridImage("burt-setup", "Burt at a desk with a beige home computer and CRT", "bitbunker-hero")}</header>
        <nav><button data-nav="${GAMEGRID_URL}">&lt; GAME GRID</button><button data-nav="${BIT_BUNKER_URL}">MACHINES</button><button data-nav="${BIT_BUNKER_URL}">GAME SHELF</button><button data-nav="${BIT_BUNKER_URL}">MAGAZINE BOX</button></nav>
        <section class="bitbunker-intro"><div>${gameGridImage("burt-setup", "Burt's home computer and game shelf")}</div><div><h2>THE NEWCOMERS ZONE IS FOR NEWCOMERS.</h2><p>I am not a newcomer. I was playing games when a joystick was one stick, one button, and a very firm suggestion. So I put this page in Game Grid where the people who understand save files can find it.</p><p>My main machines are the <b>Comet-64</b>, the <b>Monarch-8</b>, and a woodgrain <b>Starlark 260</b> that still works if you warm the cartridge in your hands first. The current generation calls this "retro." I call it Tuesday.</p></div><aside><b>RULE 1:</b> If it runs from a tape, it deserves your patience.<br><b>RULE 2:</b> Do not blow into a cartridge. You are adding spit.</aside></section>
        <section class="bitbunker-game-shelf"><header><b>GAME SHELF // BEFORE THE BIG GUYS FIGURED IT OUT</b><span>ALL SCREENSHOTS FROM MY OWN MACHINES</span></header><div><article>${gameGridImage("burt-nova-siege", "Screenshot of fictional 1980s space shooter Nova Siege")}<h2>Nova Siege</h2><p>Comet-64 space shooter. Eight enemy shapes, one perfect sound effect, and a last wave that gets mean simply because the programmer knew you had nowhere else to be.</p><b>1984 // TAPE LOAD</b></article><article>${gameGridImage("burt-green-maze", "Green terminal maze game screenshot")}<h2>The Green Maze</h2><p>Monarch-8 dungeon crawler. It draws the dungeon one room at a time and still has more atmosphere than half the new games with orchestras.</p><b>1981 // DISKETTE</b></article><article>${gameGridImage("burt-woodgrain-console", "Woodgrain home game console with paddle controllers")}<h2>Starlark 260</h2><p>Paddle games, blocky racers, and a baseball cartridge that lets the pitcher throw a ball directly through the scoreboard. Honest programming.</p><b>1979 // CARTRIDGE</b></article></div></section>
        <section class="bitbunker-club"><div>${gameGridImage("burt-computer-club", "Vintage computer club meeting in a library")}<p><b>THE BELLWATER BYTE CLUB, 1983:</b> Saturday mornings in the library basement. We traded programs, copied magazine listings by hand, and argued about whether the Comet-64 had better colors than the Monarch. It did. Debate closed.</p></div><div>${gameGridImage("burt-magazine-scan", "A dog-eared old computer magazine scan")}<p><b>MAGAZINE BOX:</b> I saved everything. Reviews, ads, cassette inserts, terrible predictions about the future. Somebody in 1982 thought every family would have a home robot by now. We got email instead.</p></div></section>
        <section class="bitbunker-artifacts">${gameGridImage("burt-striped-cartridge", "A striped old game cartridge")}<div><h2>THE MYSTERY CARTRIDGE</h2><p>No label, just stripes. It boots to a purple hallway and a noise like a radio falling asleep. I have owned it since 1986. If anyone recognizes it, do not tell me the ending.</p></div>${gameGridImage("burt-printer-joystick", "A beige joystick and dot matrix printer")}</section>
        <section class="bitbunker-map">${gameGridImage("burt-dungeon-map", "A hand-drawn map of a fictional old dungeon game")}<div><h2>MAPS WERE NOT WALKTHROUGHS.</h2><p>You made one on paper because the game would not remember anything for you. This is the third floor of <i>Citadel Below</i>, where I learned that the north wall is not always a wall.</p></div></section>
        <p class="gamegrid-owner-note">Tell me what you played before the current machines. If you say "nothing," you are either young or lying.</p>
      </main>`
  }
};
