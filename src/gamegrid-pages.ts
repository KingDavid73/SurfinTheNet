import type { PageComment, PageDefinition } from "./types";

const GAMEGRID_URL = "web://orbitnet.local/zones/gamegrid";
const LAGMASTER_URL = "web://gamegrid.zone/users/lagmaster99/home";
const VELVET_URL = "web://gamegrid.zone/users/velvetmage/home";
const PLAYER_FOUR_URL = "web://gamegrid.zone/users/player4ever/home";

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
        <nav><button data-nav="${GAMEGRID_URL}">&lt;&lt; GAME GRID</button><button data-nav="web://pulsenet.red/home">PULSE/NET</button><button disabled>RANKINGS</button><button disabled>DEMOS</button></nav>
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
        <nav><button data-nav="${GAMEGRID_URL}">Game Grid</button><button data-nav="web://vanta2.com/home">VANTA² Transmission</button><button disabled>Fan Art</button><button disabled>Save Files</button></nav>
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
        <nav><button data-nav="${GAMEGRID_URL}">&lt;&lt; GAME GRID</button><button data-nav="web://cubit.fun/home">CUBIT HOME</button><button data-nav="web://cubit.fun/games">GAME LIST</button><button disabled>PRINTABLE SCORECARD</button></nav>
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
  }
};
