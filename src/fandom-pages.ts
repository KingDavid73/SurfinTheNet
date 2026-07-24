import type { PageComment, PageDefinition } from "./types";

const FANVERSE_URL = "web://orbitnet.local/zones/fanverse";
const MOSS_URL = "web://fanverse.zone/users/mossmunchmel/home";
const BLIPZO_URL = "web://fanverse.zone/users/blipzobeliever88/home";

const FANDOM_ASSETS = {
  "moss-ensemble": new URL("../assets/images/fandom-members/mossmunch/official/ensemble.png", import.meta.url).href,
  "moss-lily-crossing": new URL("../assets/images/fandom-members/mossmunch/official/lily-crossing.png", import.meta.url).href,
  "moss-brindle-map": new URL("../assets/images/fandom-members/mossmunch/official/brindle-map.png", import.meta.url).href,
  "moss-dry-mayor": new URL("../assets/images/fandom-members/mossmunch/official/dry-mayor.png", import.meta.url).href,
  "moss-root-tunnel": new URL("../assets/images/fandom-members/mossmunch/official/root-tunnel.png", import.meta.url).href,
  "moss-mushroom-chase": new URL("../assets/images/fandom-members/mossmunch/official/mushroom-chase.png", import.meta.url).href,
  "moss-treehouse": new URL("../assets/images/fandom-members/mossmunch/official/treehouse-sunset.png", import.meta.url).href,
  "moss-model-sheet": new URL("../assets/images/fandom-members/mossmunch/official/model-sheet.png", import.meta.url).href,
  "moss-vhs-cover": new URL("../assets/images/fandom-members/mossmunch/official/vhs-cover.png", import.meta.url).href,
  "moss-pencil": new URL("../assets/images/fandom-members/mossmunch/fan/pencil-friends.png", import.meta.url).href,
  "moss-mayor-art": new URL("../assets/images/fandom-members/mossmunch/fan/mayor-confrontation.png", import.meta.url).href,
  "moss-watercolor": new URL("../assets/images/fandom-members/mossmunch/fan/bog-watercolor.png", import.meta.url).href,
  "moss-fiction-cover": new URL("../assets/images/fandom-members/mossmunch/fan/lantern-fiction-cover.png", import.meta.url).href,
  "moss-fiction-pages": new URL("../assets/images/fandom-members/mossmunch/fan/fiction-pages.png", import.meta.url).href,
  "moss-plush": new URL("../assets/images/fandom-members/mossmunch/fan/plush-photo.png", import.meta.url).href,
  "moss-mel": new URL("../assets/images/fandom-members/mossmunch/fan/mel-portrait.png", import.meta.url).href,
  "moss-chart": new URL("../assets/images/fandom-members/mossmunch/fan/continuity-chart.png", import.meta.url).href,
  "moss-vhs": new URL("../assets/images/fandom-members/mossmunch/fan/vhs-collection.png", import.meta.url).href,
  "blipzo-hero": new URL("../assets/images/fandom-members/blipzo/official/hero-render.png", import.meta.url).href,
  "blipzo-foodcourt": new URL("../assets/images/fandom-members/blipzo/official/foodcourt-game.png", import.meta.url).href,
  "blipzo-escalator": new URL("../assets/images/fandom-members/blipzo/official/escalator-game.png", import.meta.url).href,
  "blipzo-boss": new URL("../assets/images/fandom-members/blipzo/official/leaselord-boss.png", import.meta.url).href,
  "blipzo-kiosk": new URL("../assets/images/fandom-members/blipzo/official/kiosk-select.png", import.meta.url).href,
  "blipzo-zero": new URL("../assets/images/fandom-members/blipzo/official/store-zero.png", import.meta.url).href,
  "blipzo-ad": new URL("../assets/images/fandom-members/blipzo/official/magazine-ad.png", import.meta.url).href,
  "blipzo-model": new URL("../assets/images/fandom-members/blipzo/official/model-sheet.png", import.meta.url).href,
  "blipzo-map": new URL("../assets/images/fandom-members/blipzo/official/atrium-map.png", import.meta.url).href,
  "blipzo-rail-art": new URL("../assets/images/fandom-members/blipzo/fan/escalator-art.png", import.meta.url).href,
  "blipzo-fries-art": new URL("../assets/images/fandom-members/blipzo/fan/foodcourt-art.png", import.meta.url).href,
  "blipzo-zero-art": new URL("../assets/images/fandom-members/blipzo/fan/store-zero-art.png", import.meta.url).href,
  "blipzo-fiction-cover": new URL("../assets/images/fandom-members/blipzo/fan/after-closing-cover.png", import.meta.url).href,
  "blipzo-fiction-pages": new URL("../assets/images/fandom-members/blipzo/fan/fiction-pages.png", import.meta.url).href,
  "blipzo-zero-map": new URL("../assets/images/fandom-members/blipzo/fan/store-zero-map.png", import.meta.url).href,
  "blipzo-trent": new URL("../assets/images/fandom-members/blipzo/fan/trent-portrait.png", import.meta.url).href,
  "blipzo-clay": new URL("../assets/images/fandom-members/blipzo/fan/clay-models.png", import.meta.url).href,
  "blipzo-comparison": new URL("../assets/images/fandom-members/blipzo/fan/level-comparison.png", import.meta.url).href
} as const;

const fanImage = (name: keyof typeof FANDOM_ASSETS, alt: string, className = "") =>
  `<img class="fandom-art ${className}" src="${FANDOM_ASSETS[name]}" alt="${alt}">`;

const seed = (
  id: string,
  pageUrl: string,
  ownerId: string,
  role: PageComment["role"],
  author: string,
  text: string,
  createdAt: string
): PageComment => ({ id, pageUrl, ownerId, role, author, text, createdAt, revealAfterVisit: 0 });

export const fandomMembers = [
  {
    url: MOSS_URL,
    handle: "MossMunch_Mel",
    title: "Mel's Moonlit MossMunch Archive",
    description: "Twenty-six boggy episodes, disputed VHS order, character lore, handmade fan art, and one very serious root-tunnel novella.",
    fandom: "MOSSMUNCH & THE MOONLINGS",
    className: "moss"
  },
  {
    url: BLIPZO_URL,
    handle: "BlipzoBeliever_88",
    title: "BLIPZO // Mall Dimension Zero",
    description: "Cult platformer screenshots, Store 00 maps, low-poly mascot science, fan fiction, and evidence that the food court hides a second game.",
    fandom: "BLIPZO! MALL DIMENSION",
    className: "blipzo"
  }
] as const;

const mossComments: PageComment[] = [
  seed("moss-kip-1", MOSS_URL, "mossmunch_mel", "visitor", "Kip_ToonBurst", "We aired The Crooked Rain Barrel once at 6:10 AM. Three calls, all from the same very awake person.", "1999-11-01T11:04:00"),
  seed("moss-owner-1", MOSS_URL, "mossmunch_mel", "owner", "MossMunch_Mel", "THAT WAS ME. Your broadcast also had the missing blue title card. Please check the tape vault!", "1999-11-01T11:12:00"),
  seed("moss-velvet-1", MOSS_URL, "mossmunch_mel", "visitor", "VelvetMage", "The lantern beneath Bog Seven feels like an Ashglass side quest written by somebody much kinder than me.", "1999-11-02T20:21:00"),
  seed("moss-dex-1", MOSS_URL, "mossmunch_mel", "visitor", "CodeDex", "Episode 19 may have two edits. In one capture, Brindlebug's map has a seventh moon symbol for exactly four frames.", "1999-11-02T21:07:00"),
  seed("moss-blipzo-1", MOSS_URL, "mossmunch_mel", "visitor", "BlipzoBeliever_88", "Store 00 has a leaf emblem on the back wall. Not saying crossover. Just saying LOOK.", "1999-11-03T17:46:00"),
  seed("moss-bea-1", MOSS_URL, "mossmunch_mel", "visitor", "BunBrigade_Bea", "The homemade plush is wonderful. Maple attempted to groom the screen.", "1999-11-03T18:32:00"),
  seed("moss-owner-2", MOSS_URL, "mossmunch_mel", "owner", "MossMunch_Mel", "Please thank Maple. The plush took six weeks and one emotionally difficult satchel.", "1999-11-03T18:41:00")
];

const blipzoComments: PageComment[] = [
  seed("blipzo-maddy-1", BLIPZO_URL, "blipzo_believer_88", "visitor", "ModKit_Maddy", "The black doorway has collision on three sides and a loaded texture behind it. That is either a room or extremely committed garbage data.", "1999-11-01T22:11:00"),
  seed("blipzo-owner-1", BLIPZO_URL, "blipzo_believer_88", "owner", "BlipzoBeliever_88", "THANK YOU. Store 00 exists. Nobody spends 18 polygons on garbage data by accident.", "1999-11-01T22:18:00"),
  seed("blipzo-queenie-1", BLIPZO_URL, "blipzo_believer_88", "visitor", "QuarterQueen", "LeaseLord fight is good. Receipt swing is floaty. I cleared it on one credit anyway.", "1999-11-02T16:02:00"),
  seed("blipzo-dex-1", BLIPZO_URL, "blipzo_believer_88", "visitor", "CodeDex", "Magazine demo has a seventh escalator not present in retail. Your graph-paper route may actually connect.", "1999-11-02T20:53:00"),
  seed("blipzo-moss-1", BLIPZO_URL, "blipzo_believer_88", "visitor", "MossMunch_Mel", "Kiosk Kid would be friends with Brindlebug. Both know too much and carry the entire plot.", "1999-11-03T17:27:00"),
  seed("blipzo-four-1", BLIPZO_URL, "blipzo_believer_88", "visitor", "PlayerFourEver", "Food Court Eclipse four-player rumor: false. We tried every controller-port order. Great sleepover though.", "1999-11-03T19:02:00"),
  seed("blipzo-owner-2", BLIPZO_URL, "blipzo_believer_88", "owner", "BlipzoBeliever_88", "Not false. UNCONFIRMED. The manual says 'bring friends after closing.' That punctuation matters.", "1999-11-03T19:09:00")
];

export const fandomPages: Record<string, PageDefinition> = {
  [MOSS_URL]: {
    url: MOSS_URL,
    title: "MossMunch_Mel's Moonlit Archive",
    site: "fanmoss",
    ownerId: "mossmunch_mel",
    summary: "Mel's obsessive fan archive for the obscure 1989 cartoon MossMunch & the Moonlings contains animation cels, episode-order research, VHS scans, handmade fan art, a plush, continuity theories, and original fan fiction.",
    commentsEnabled: true,
    seedComments: mossComments,
    listed: true,
    hubId: "zone-fanverse",
    searchTerms: ["MossMunch Mel", "MossMunch", "Moonlings", "Pipglow", "Brindlebug", "Dry Mayor", "Fogberry Bog", "cartoon", "animation", "VHS", "fan art", "fan fiction", "Lantern Under Bog Seven"],
    render: () => `
      <main class="page fandom-page moss-page">
        <div class="moss-canopy"><button data-nav="${FANVERSE_URL}">← FANVERSE</button><span>best viewed by moonlight</span></div>
        <header>
          ${fanImage("moss-ensemble", "Official animation cel of MossMunch, Pipglow, Brindlebug and the Dry Mayor in Fogberry Bog")}
          <div><small>MOSSMUNCH_MEL'S UNOFFICIAL ARCHIVE</small><h1>MossMunch<br><i>&amp; the Moonlings</i></h1><p>Every episode. Every moon. Every map Brindlebug folded wrong.</p></div>
        </header>
        <nav class="moss-lily-nav"><button disabled>EPISODE POND</button><button disabled>CHARACTER ROOTS</button><button disabled>MEL'S FANSTUFF</button><button disabled>VHS SWAP</button></nav>
        <section class="moss-welcome moss-leaf">
          ${fanImage("moss-mel", "A 1999 flash photograph of Mel wearing a homemade Pipglow antenna cap beside her CRT")}
          <div><h2>WELCOME TO FOGBERRY BOG!</h2><p>I'm Mel. I have loved this strange little 1989 cartoon since a rain-delay broadcast ate the first six minutes of episode four. There are twenty-six episodes, unless the rumored moon festival special is real, in which case there are twenty-seven and I owe CodeDex five dollars.</p><p><b>LAST UPDATE:</b> new Store 00 leaf-emblem theory added against my better judgment.</p></div>
          ${fanImage("moss-plush", "Mel's handmade MossMunch plush photographed on a floral bedspread")}
        </section>
        <section class="moss-episode moss-root">
          <div><small>EPISODE 19 // RESTORED ORDER</small><h2>THE LANTERN BELOW</h2><p>MossMunch and Pipglow enter the root tunnels after every moon-lamp in the bog goes dark. The station guide calls this episode 17. The satchel buckle and Brindlebug's seventh moon prove it comes after <i>Map of No Roads</i>.</p></div>
          ${fanImage("moss-root-tunnel", "MossMunch lighting a dark root tunnel with Pipglow")}
        </section>
        <div class="moss-winding-gallery">
          <article class="moss-polaroid one">${fanImage("moss-lily-crossing", "MossMunch and Pipglow crossing moonlit lily pads")}<b>THE LILY ROAD</b><small>official cel scan</small></article>
          <article class="moss-polaroid two">${fanImage("moss-brindle-map", "Brindlebug unfolding an impossibly long map")}<b>BRINDLEBUG SHRINE</b><small>the real hero</small></article>
          <article class="moss-polaroid three">${fanImage("moss-dry-mayor", "The Dry Mayor standing over a drained pond")}<b>DRY MAYOR FILE</b><small>mean? yes. misunderstood? page pending.</small></article>
          <article class="moss-polaroid four">${fanImage("moss-watercolor", "Mel's watercolor fan art of Fogberry Bog under a giant moon")}<b>MOON OVER FOGBERRY</b><small>watercolor by Mel, 1999</small></article>
        </div>
        <section class="moss-fiction">
          ${fanImage("moss-fiction-cover", "Handmade cover for Mel's fan fiction about a lantern under twisted roots")}
          <div><small>ORIGINAL FAN FICTION // 14 CHAPTERS</small><h2>The Lantern Under Bog Seven</h2><p>Pipglow hears a second moon humming beneath the oldest tree. Brindlebug says it is only groundwater. MossMunch packs sandwiches anyway.</p><p><i>Chapter 14 uploaded! Please read the author's note before asking whether MossMunch and the Dry Mayor are brothers.</i></p></div>
          ${fanImage("moss-fiction-pages", "Stapled typewritten MossMunch fan-fiction pages with doodled margins")}
        </section>
        <aside class="moss-theory">
          ${fanImage("moss-chart", "Mel's obsessive hand-drawn MossMunch episode continuity chart")}
          <div><h2>THE SEVENTH MOON PROBLEM</h2><p>Six moon emblems appear throughout the normal series. A seventh appears for four frames in one Episode 19 transfer and on the back wall of Blipzo's Store 00. This is probably a scanner coincidence. I have drawn fourteen arrows explaining why it is not.</p></div>
          ${fanImage("moss-vhs", "Mel's decorated VHS tape and handwritten episode-label collection")}
        </aside>
        <p class="fandom-owner-note">Sign the bog book below. No Pipglow flame-color arguments after midnight.</p>
      </main>`
  },
  [BLIPZO_URL]: {
    url: BLIPZO_URL,
    title: "BlipzoBeliever_88 - Mall Dimension Zero",
    site: "fanblipzo",
    ownerId: "blipzo_believer_88",
    summary: "Trent's Flash-like shrine to the obscure low-poly mascot platformer BLIPZO! Mall Dimension contains game screenshots, Store 00 maps, character models, hidden-level theories, fan art, clay figures, magazine comparisons, and fan fiction.",
    commentsEnabled: true,
    seedComments: blipzoComments,
    listed: true,
    hubId: "zone-fanverse",
    searchTerms: ["BlipzoBeliever", "Blipzo", "Mall Dimension", "Food Court Eclipse", "Store 00", "Kiosk Kid", "LeaseLord", "mascot platformer", "3D game", "low poly", "fan art", "fan fiction", "hidden level"],
    render: () => `
      <main class="page fandom-page blipzo-page">
        <div class="blipzo-loader"><i></i><b>BLIPZO-FAN NODE LOADED</b><span>99%</span></div>
        <div class="blipzo-stage">
          <header>
            <div><small>BLIPZOBELIEVER_88 // CULT MASCOT ARCHIVE</small><h1>BLIPZO!</h1><p>MALL DIMENSION <b>ZERO</b></p></div>
            ${fanImage("blipzo-hero", "Glossy low-poly promotional render of Blipzo leaping with his receipt-ribbon yo-yo")}
          </header>
          <nav class="blipzo-orbit-nav"><button data-nav="${FANVERSE_URL}">EXIT</button><button disabled>GAMES</button><button disabled>STORE 00</button><button disabled>FAN LAB</button><button disabled>FICTION</button></nav>
          <section class="blipzo-intro">
            ${fanImage("blipzo-trent", "A 1999 flash photograph of Trent holding a homemade Blipzo shopping-basket helmet beside his CRT")}
            <div><h2>WELCOME, AFTER-HOURS SHOPPERS.</h2><p>I'm Trent. BLIPZO! Mall Dimension sold badly, reviewed weirdly, and contains more personality in one escalator than most games have in an entire castle. This archive covers the 1996 original, 1998's <i>Food Court Eclipse</i>, and the hidden Store 00 that absolutely exists.</p></div>
          </section>
          <section class="blipzo-screen-orbit">
            <article class="screen-a">${fanImage("blipzo-foodcourt", "Low-resolution BLIPZO gameplay in a checker-tile food court")}<span>FOOD COURT // LEVEL 1</span></article>
            <article class="screen-b">${fanImage("blipzo-escalator", "Low-resolution BLIPZO gameplay in a huge escalator canyon")}<span>ESCALATOR CANYON</span></article>
            <article class="screen-c">${fanImage("blipzo-boss", "BLIPZO boss battle against LeaseLord at a neon fountain")}<span>LEASELORD BOSS</span></article>
            <div class="blipzo-center-disc"><b>3</b><small>THREE EYES<br>ZERO FEAR</small></div>
          </section>
          <section class="blipzo-zero-file">
            <div class="zero-image">${fanImage("blipzo-zero", "The hidden black doorway to Store 00 in a purple checker-tile mall corridor")}<b>00</b></div>
            <div><small>UNUSED ROOM OR HIDDEN GAME?</small><h2>THE STORE 00 FILE</h2><p>The door appears behind the Atrium C fountain only after a zero-item run. Retail collision blocks the entrance, but the magazine demo contains an extra escalator and Maddy found a loaded texture behind the wall.</p><p><strong>CURRENT STATUS:</strong> real until the developers personally tell me otherwise, and then suspiciously real.</p></div>
            ${fanImage("blipzo-zero-map", "Trent's graph-paper speculative map connecting Store 00 to the mall escalators")}
          </section>
          <section class="blipzo-fanstuff">
            <article class="fan-tilt-left">${fanImage("blipzo-rail-art", "Marker fan art of Blipzo sliding down an escalator rail")}<h2>FAN ART</h2><p>Receipt Rail Disaster, marker on notebook paper.</p></article>
            <article class="fan-tilt-right">${fanImage("blipzo-clay", "Homemade clay Blipzo and cardboard Kiosk Kid figures")}<h2>DESK CREW</h2><p>Clay Blipzo stands up if the desk is perfectly level.</p></article>
            <article class="fan-tilt-left">${fanImage("blipzo-comparison", "Fan-made magazine page comparing two BLIPZO levels")}<h2>VERSION WATCH</h2><p>Demo fountain geometry versus retail. Seven escalators. Seven!</p></article>
          </section>
          <section class="blipzo-fiction">
            ${fanImage("blipzo-fiction-cover", "Handmade fan-fiction cover depicting the abandoned mall after midnight")}
            <div><small>ORIGINAL FICTION // REVISION 3</small><h2>AFTER CLOSING</h2><p>Kiosk Kid wakes at 12:01 AM with no map, no customers, and one receipt printing from Store 00. Blipzo follows it downstairs.</p><p>Includes 22 pages, three illustrations, and a LeaseLord redemption scene that QuarterQueen says is “not mechanically supported.”</p></div>
            ${fanImage("blipzo-fiction-pages", "Typed BLIPZO fan-fiction pages with purple highlights and mascot doodles")}
          </section>
          <footer><span>FLASHPLUG 4 REQUIRED*</span><b>*not actually required because Trent rebuilt this page four times</b></footer>
        </div>
        <p class="fandom-owner-note">Post Store 00 evidence, route times, or respectful Kiosk Kid opinions below.</p>
      </main>`
  }
};
