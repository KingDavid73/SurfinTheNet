import type { PageComment, PageDefinition } from "./types";

const FANVERSE_URL = "web://orbitnet.local/zones/fanverse";
const MOSS_URL = "web://fanverse.zone/users/mossmunchmel/home";
const BLIPZO_URL = "web://fanverse.zone/users/blipzobeliever88/home";
const STAR_URL = "web://fanverse.zone/users/tapeattictess/home";
const PRISM_URL = "web://fanverse.zone/users/prismpilotaya/home";

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
  "blipzo-comparison": new URL("../assets/images/fandom-members/blipzo/fan/level-comparison.png", import.meta.url).href,
  "star-ensemble": new URL("../assets/images/fandom-members/starthimble/official/ensemble.png", import.meta.url).href,
  "star-cabinet": new URL("../assets/images/fandom-members/starthimble/official/cabinet-glow.png", import.meta.url).href,
  "star-luma-rain": new URL("../assets/images/fandom-members/starthimble/official/luma-rain.png", import.meta.url).href,
  "star-mayor": new URL("../assets/images/fandom-members/starthimble/official/mayor-town.png", import.meta.url).href,
  "star-upward-snow": new URL("../assets/images/fandom-members/starthimble/official/upward-snow.png", import.meta.url).href,
  "star-bottle-storm": new URL("../assets/images/fandom-members/starthimble/official/bottle-storm.png", import.meta.url).href,
  "star-observatory": new URL("../assets/images/fandom-members/starthimble/official/observatory.png", import.meta.url).href,
  "star-workshop": new URL("../assets/images/fandom-members/starthimble/official/workshop.png", import.meta.url).href,
  "star-vhs-art": new URL("../assets/images/fandom-members/starthimble/official/vhs-art.png", import.meta.url).href,
  "star-tess": new URL("../assets/images/fandom-members/starthimble/fan/tess-portrait.png", import.meta.url).href,
  "star-vhs-shelf": new URL("../assets/images/fandom-members/starthimble/fan/vhs-shelf.png", import.meta.url).href,
  "star-corkboard": new URL("../assets/images/fandom-members/starthimble/fan/corkboard.png", import.meta.url).href,
  "star-luma-plush": new URL("../assets/images/fandom-members/starthimble/fan/luma-plush.png", import.meta.url).href,
  "star-zine": new URL("../assets/images/fandom-members/starthimble/fan/zine.png", import.meta.url).href,
  "star-fiction-cover": new URL("../assets/images/fandom-members/starthimble/fan/fiction-cover.png", import.meta.url).href,
  "star-fiction-pages": new URL("../assets/images/fandom-members/starthimble/fan/fiction-pages.png", import.meta.url).href,
  "star-diagram": new URL("../assets/images/fandom-members/starthimble/fan/cabinet-diagram.png", import.meta.url).href,
  "star-key-tape": new URL("../assets/images/fandom-members/starthimble/fan/key-tape.png", import.meta.url).href,
  "prism-group": new URL("../assets/images/fandom-members/prism5/official/group.png", import.meta.url).href,
  "prism-civilians": new URL("../assets/images/fandom-members/prism5/official/civilians.png", import.meta.url).href,
  "prism-rose": new URL("../assets/images/fandom-members/prism5/official/rose-transform.png", import.meta.url).href,
  "prism-azure": new URL("../assets/images/fandom-members/prism5/official/azure-transform.png", import.meta.url).href,
  "prism-viridian": new URL("../assets/images/fandom-members/prism5/official/viridian-flight.png", import.meta.url).href,
  "prism-citrine-violet": new URL("../assets/images/fandom-members/prism5/official/citrine-violet.png", import.meta.url).href,
  "prism-null": new URL("../assets/images/fandom-members/prism5/official/null-regent.png", import.meta.url).href,
  "prism-badges": new URL("../assets/images/fandom-members/prism5/official/badges.png", import.meta.url).href,
  "prism-finale": new URL("../assets/images/fandom-members/prism5/official/finale.png", import.meta.url).href,
  "prism-aya": new URL("../assets/images/fandom-members/prism5/fan/aya-portrait.png", import.meta.url).href,
  "prism-pencil": new URL("../assets/images/fandom-members/prism5/fan/pencil-group.png", import.meta.url).href,
  "prism-violet-art": new URL("../assets/images/fandom-members/prism5/fan/violet-watercolor.png", import.meta.url).href,
  "prism-bootlegs": new URL("../assets/images/fandom-members/prism5/fan/bootleg-figures.png", import.meta.url).href,
  "prism-chart": new URL("../assets/images/fandom-members/prism5/fan/transform-chart.png", import.meta.url).href,
  "prism-sixth": new URL("../assets/images/fandom-members/prism5/fan/sixth-crystal-art.png", import.meta.url).href,
  "prism-fiction-pages": new URL("../assets/images/fandom-members/prism5/fan/fiction-pages.png", import.meta.url).href,
  "prism-tapes": new URL("../assets/images/fandom-members/prism5/fan/tape-collection.png", import.meta.url).href,
  "prism-handmade-badges": new URL("../assets/images/fandom-members/prism5/fan/handmade-badges.png", import.meta.url).href
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
  },
  {
    url: STAR_URL,
    handle: "TapeAttic_Tess",
    title: "Tess's StarThimble Tape Attic",
    description: "A drawer-by-drawer archive of impossible weather, regional broadcasts, handmade puppets, lost episodes, fan fiction, and one unlabeled cassette.",
    fandom: "PROFESSOR STARTHIMBLE'S WEATHER CABINET",
    className: "starthimble"
  },
  {
    url: PRISM_URL,
    handle: "PrismPilot_Aya",
    title: "PRISM//5 Chroma Knights: Refraction",
    description: "Character prisms, transformation frames, imported tapes, bootleg toys, fan art, finale analysis, and the forbidden sixth color.",
    fandom: "PRISM//5: CHROMA KNIGHTS",
    className: "prism5"
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

const starComments: PageComment[] = [
  seed("star-kip-1", STAR_URL, "tapeattic_tess", "visitor", "Kip_ToonBurst", "We had three StarThimble tapes in the station cabinet. One was labeled WEATHER SPECIAL - DO NOT AIR. Naturally I watched it.", "1999-11-01T09:14:00"),
  seed("star-owner-1", STAR_URL, "tapeattic_tess", "owner", "TapeAttic_Tess", "KIP. Was the leader blue or yellow? Did the opening clock run backward? This is an emergency.", "1999-11-01T09:28:00"),
  seed("star-mel-1", STAR_URL, "tapeattic_tess", "visitor", "MossMunch_Mel", "Upward snow also appears in MossMunch episode 11, but ours is clearly soap flakes on fishing line. Yours looks like cotton through reverse film.", "1999-11-02T18:06:00"),
  seed("star-dex-1", STAR_URL, "tapeattic_tess", "visitor", "CodeDex", "The unlabeled cassette shell is a 1988 mold. PARTIAL evidence only, but it cannot be an original 1986 recording.", "1999-11-02T20:36:00"),
  seed("star-hal-1", STAR_URL, "tapeattic_tess", "visitor", "HamCam_Hal", "Drawer 14's linkage would jam immediately. I mean that with affection. Wonderful cabinet.", "1999-11-03T14:41:00"),
  seed("star-trent-1", STAR_URL, "tapeattic_tess", "visitor", "BlipzoBeliever_88", "Does the cabinet have a Drawer 00? Please check before saying no.", "1999-11-03T17:52:00"),
  seed("star-aya-1", STAR_URL, "tapeattic_tess", "visitor", "PrismPilot_Aya", "Luma's tiny rain boots are perfect. I would defend that cloud with my life and several imported magazines.", "1999-11-03T19:11:00"),
  seed("star-owner-2", STAR_URL, "tapeattic_tess", "owner", "TapeAttic_Tess", "Drawer 00 is not in the model sheets. There is, however, a gap between 9 and 10. Trent, do not make me draw more string.", "1999-11-03T19:19:00")
];

const prismComments: PageComment[] = [
  seed("prism-mel-1", PRISM_URL, "prismpilot_aya", "visitor", "MossMunch_Mel", "The clear badge in episode 12 reflects six colors, not five. I checked on two televisions and one very confused spoon.", "1999-11-01T19:42:00"),
  seed("prism-owner-1", PRISM_URL, "prismpilot_aya", "owner", "PrismPilot_Aya", "YES. Pause after Gleam says 'a rainbow remembers what light forgets.' The clear outline is deliberate.", "1999-11-01T19:51:00"),
  seed("prism-velvet-1", PRISM_URL, "prismpilot_aya", "visitor", "VelvetMage", "Violet Knight refusing the final attack is more interesting than the attack itself. Your watercolor understands this.", "1999-11-02T21:18:00"),
  seed("prism-maddy-1", PRISM_URL, "prismpilot_aya", "visitor", "ModKit_Maddy", "Transformation charts confirm Rose gets eight frames while Azure gets seven. Either budget or symbolism. Probably both.", "1999-11-02T22:04:00"),
  seed("prism-queenie-1", PRISM_URL, "prismpilot_aya", "visitor", "QuarterQueen", "Bootleg Citrine has two left hands. This may improve the baton combo.", "1999-11-03T15:33:00"),
  seed("prism-tess-1", PRISM_URL, "prismpilot_aya", "visitor", "TapeAttic_Tess", "My imported episode 6 starts eleven seconds earlier and includes a black frame with a tiny cabinet shape. Copy available if you bring a blank tape.", "1999-11-03T18:47:00"),
  seed("prism-trent-1", PRISM_URL, "prismpilot_aya", "visitor", "BlipzoBeliever_88", "Null Regent's palace and Store 00 use the SAME FLOOR PATTERN. Different dimensions. Same mall contractor.", "1999-11-03T19:24:00"),
  seed("prism-owner-2", PRISM_URL, "prismpilot_aya", "owner", "PrismPilot_Aya", "I cannot endorse the mall-contractor theory. I have added it to the theory page.", "1999-11-03T19:31:00")
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
  },
  [STAR_URL]: {
    url: STAR_URL,
    title: "TapeAttic_Tess - StarThimble Weather Cabinet",
    site: "fanstar",
    ownerId: "tapeattic_tess",
    summary: "Tess's attic-built archive for the obscure puppet show Professor StarThimble's Weather Cabinet includes episode capsules, broadcast variants, practical-effects notes, fan crafts, fiction, a lost upward-snow special, and interactive cabinet drawers.",
    commentsEnabled: true,
    seedComments: starComments,
    listed: true,
    hubId: "zone-fanverse",
    searchTerms: ["TapeAttic Tess", "Professor StarThimble", "Weather Cabinet", "Luma cloud", "Mayor Barometer", "puppet show", "stop motion", "upward snow", "lost episode", "VHS", "fan fiction", "public television"],
    render: () => `
      <main class="page fandom-page starthimble-page">
        <nav class="star-attic-nav"><button data-nav="${FANVERSE_URL}">&larr; DOWNSTAIRS</button><span>TAPEATTIC_TESS PRESENTS</span><b>last dusted 11/03/99</b></nav>
        <header>
          ${fanImage("star-ensemble", "Professor StarThimble, Luma and Mayor Barometer posed as handmade television puppets")}
          <div><small>A DRAWER-BY-DRAWER FAN ARCHIVE</small><h1>Professor StarThimble's</h1><h2>Weather Cabinet</h2><p>Thirty-two drawers. Twenty-four broadcasts. At least one forecast that never happened.</p></div>
        </header>
        <section class="star-welcome">
          <div class="star-tape-stack">${fanImage("star-vhs-shelf", "Tess's shelf of carefully illustrated StarThimble VHS recordings")}<i>24 TAPES<br>19 COMPLETE</i></div>
          <div><h2>Come up to the attic.</h2><p>I'm Tess. My local station ran this little puppet program whenever baseball got rained out, which is funny because Professor StarThimble kept most of the rain in Drawer 8. I collect regional edits, reconstruct missing scenes, build questionable props, and write stories about the parts the show forgot to explain.</p><p><strong>Start with the cabinet below.</strong> Its drawers actually open. Web magic!</p></div>
          ${fanImage("star-tess", "A 1999 flash photograph of Tess beside an attic CRT and VCR showing StarThimble")}
        </section>
        <section class="star-cabinet-lab">
          <div class="star-cabinet-title"><span>CLICK A BRASS LABEL</span><h2>THE WEATHER CABINET</h2><p>Reconstructed from 183 screenshots, one publicity photo, and Hal telling me the hinges make no sense.</p></div>
          <div class="star-cabinet-object">
            ${fanImage("star-cabinet", "Professor StarThimble opening the glowing miniature Weather Cabinet")}
            <button class="drawer-button drawer-three" data-fandom-toggle="star-drawer-three" aria-expanded="false"><b>03</b><span>UPWARD SNOW</span></button>
            <button class="drawer-button drawer-eight" data-fandom-toggle="star-drawer-eight" aria-expanded="false"><b>08</b><span>INDOOR RAIN</span></button>
            <button class="drawer-button drawer-fourteen" data-fandom-toggle="star-drawer-fourteen" aria-expanded="false"><b>14</b><span>BOTTLED THUNDER</span></button>
          </div>
          <div class="star-drawers">
            <article id="star-drawer-three">
              ${fanImage("star-upward-snow", "Professor StarThimble watching snow fall upward in the lost weather special")}
              <div><small>DRAWER 03 // TAPE VARIANT B</small><h3>The Snow That Fell Upward</h3><p>Most broadcasts end when the snow reaches the observatory roof. Tess's WPLM tape continues for eleven seconds: StarThimble looks directly at the camera and says, “Weather remembers which way home is.”</p></div>
            </article>
            <article id="star-drawer-eight">
              ${fanImage("star-luma-rain", "Luma the wool cloud puppet making rain inside StarThimble's observatory")}
              <div><small>DRAWER 08 // LUMA FILE</small><h3>Rain With No Outside</h3><p>Luma winds her own key for the only time in the series. The rain falls beneath every object except the empty chair by the telescope.</p></div>
            </article>
            <article id="star-drawer-fourteen">
              ${fanImage("star-bottle-storm", "A practical-effects thunderstorm sealed inside a glass bottle")}
              <div><small>DRAWER 14 // PROP NOTES</small><h3>Thunder, bottled locally</h3><p>The lightning is scratched onto three rotating acetate cylinders. The cloud appears to be dyed cotton, although Tess's replica keeps turning purple.</p></div>
            </article>
          </div>
        </section>
        <section class="star-episode-reel">
          <header><small>SELECTED EPISODE CAPSULES</small><h2>Weather Log, 1986–1988</h2><p>Broadcast order is not story order. The moon-clock proves it.</p></header>
          <article class="reel-left">${fanImage("star-mayor", "Mayor Barometer towering over the show's miniature town")}<div><b>04</b><h3>The Mayor Measures a Breeze</h3><p>Mayor Barometer taxes the west wind. It relocates to the east side of town out of spite.</p><small>KNOWN TAPES: 5</small></div></article>
          <article class="reel-right">${fanImage("star-observatory", "The miniature hilltop observatory used in Professor StarThimble")}<div><b>11</b><h3>A Forecast for Yesterday</h3><p>The observatory receives a weather report one day late and must return the unused sunshine.</p><small>KNOWN TAPES: 2</small></div></article>
          <article class="reel-left">${fanImage("star-vhs-art", "Hand-painted period artwork of the StarThimble puppets and cabinet")}<div><b>??</b><h3>The Clock Behind the Cabinet</h3><p>Listed in one station ledger. No confirmed recording. Possibly an alternate title for episode 17—or the missing special.</p><small>STATUS: WEATHER WATCH</small></div></article>
        </section>
        <section class="star-prop-table">
          <div class="star-pinned">${fanImage("star-corkboard", "Tess's corkboard of episode notes connected by colored string")}<span>THE BROADCAST ORDER PROBLEM</span></div>
          <div class="star-prop-copy"><h2>Tess's Practical Weather Lab</h2><p>No computer effects were used in the original show, unless you count the station manager pressing the wrong button. I am rebuilding the cabinet from cereal boxes, brass paper fasteners, and optimism.</p>${fanImage("star-diagram", "A detailed hand-drawn fan diagram of the Weather Cabinet's drawers and mechanisms")}</div>
          <div class="star-windup" id="star-windup">
            ${fanImage("star-luma-plush", "Tess's handmade wind-up Luma cloud plush")}
            <button data-fandom-animate="star-windup">WIND LUMA'S KEY</button>
            <span class="star-puff">pffft!</span>
          </div>
        </section>
        <section class="star-fiction">
          ${fanImage("star-fiction-cover", "Tess's colored-pencil StarThimble fanfiction cover")}
          <div><small>FAN NOVEL // 17,804 WORDS // COMPLETE</small><h2>The Forecast at the End of the Hall</h2><p>After the Cabinet predicts a perfectly ordinary Tuesday, StarThimble becomes suspicious. Luma finds a tiny door behind Drawer 9. Mayor Barometer brings an umbrella but refuses to explain why.</p><blockquote>“There is no bad weather,” said the Professor. “Only weather that has forgotten its manners.”</blockquote></div>
          ${fanImage("star-fiction-pages", "Typed StarThimble fanfiction pages covered in small puppet doodles")}
        </section>
        <section class="star-mystery-tape" id="star-mystery-tape">
          <div>${fanImage("star-key-tape", "A brass wind-up key and mysterious unlabeled cassette on plaid fabric")}<button data-fandom-animate="star-mystery-tape">TURN THE KEY &amp; PLAY SIDE B</button></div>
          <div><small>FOUND IN A CHURCH SALE BOX // OCTOBER 1999</small><h2>The unlabeled tape</h2><p>Thirty-eight seconds of room tone, a cabinet latch, and someone quietly counting backward from ten. The tape shell is newer than the show. The voice may be Tess's VCR motor.</p><p class="star-tape-secret">After the key turns, a second voice whispers: “Not every drawer belongs to the cabinet.”</p></div>
        </section>
        <aside class="star-zine-strip">${fanImage("star-zine", "A photocopied Professor StarThimble fan-club zine")}<p><b>THE WEATHER DRAWER #3</b><br>Six photocopied pages! Prop patterns! Tape-trading rules! Do not send original recordings through the mail!</p>${fanImage("star-workshop", "The practical puppet workshop with StarThimble, Luma and Mayor Barometer models")}</aside>
        <p class="fandom-owner-note">Leave a forecast, tape lead, or puppet question in the attic ledger below.</p>
      </main>`
  },
  [PRISM_URL]: {
    url: PRISM_URL,
    title: "PrismPilot_Aya - PRISM//5 Refraction",
    site: "fanprism",
    ownerId: "prismpilot_aya",
    summary: "Aya's kinetic shrine for the obscure 1994 transformation cartoon PRISM//5: Chroma Knights includes a five-character selector, frame-by-frame transformation analysis, episode shards, fan art, bootleg toys, imported tapes, fiction, and an interactive sixth-crystal theory.",
    commentsEnabled: true,
    seedComments: prismComments,
    listed: true,
    hubId: "zone-fanverse",
    searchTerms: ["PrismPilot Aya", "PRISM 5", "Chroma Knights", "Rose Knight", "Azure Knight", "Citrine Knight", "Viridian Knight", "Violet Knight", "Gleam", "Null Regent", "transformation cartoon", "anime", "sixth crystal", "fan fiction"],
    render: () => `
      <main class="page fandom-page prism5-page">
        <div class="prism-scanline"></div>
        <nav class="prism-top-nav"><button data-nav="${FANVERSE_URL}">FANVERSE // ESC</button><span>REFRACTION NODE 05</span><b>56K COLOR MODE</b></nav>
        <header>
          <div class="prism-title"><small>PRISMPILOT_AYA'S CHARACTER SHRINE + TAPE INDEX</small><h1>PRISM<span>//5</span></h1><h2>CHROMA KNIGHTS</h2><p>Five colors entered the mirror. Six came back.</p></div>
          ${fanImage("prism-group", "The five color-coded Chroma Knights posed beneath beams of colored light")}
        </header>
        <section class="prism-welcome">
          ${fanImage("prism-aya", "A 1999 flash photograph of Aya beside a CRT decorated with Chroma Knights prism stickers")}
          <div><h2>Initialize refraction!</h2><p>I'm Aya. PRISM//5 ran for twelve episodes, arrived here on four badly subtitled tapes, and somehow has more transformation lore than shows with ten times the budget. I archive every cel wobble, badge reflection, imported magazine scan, and deeply suspicious clear crystal.</p><p><strong>Click the five shards below.</strong> This character selector took me all weekend.</p></div>
          ${fanImage("prism-civilians", "The five civilian Chroma Knights teenagers posing with Gleam the prism-tailed ferret")}
        </section>
        <section class="prism-selector">
          <div class="prism-shard-buttons">
            <button class="rose active" data-fandom-tab="rose" data-fandom-target="prism-dossiers"><i></i>ROSE</button>
            <button class="azure" data-fandom-tab="azure" data-fandom-target="prism-dossiers"><i></i>AZURE</button>
            <button class="citrine" data-fandom-tab="citrine" data-fandom-target="prism-dossiers"><i></i>CITRINE</button>
            <button class="viridian" data-fandom-tab="viridian" data-fandom-target="prism-dossiers"><i></i>VIRIDIAN</button>
            <button class="violet" data-fandom-tab="violet" data-fandom-target="prism-dossiers"><i></i>VIOLET</button>
          </div>
          <div class="prism-dossiers" id="prism-dossiers" data-active="rose">
            <article data-fandom-panel="rose">${fanImage("prism-rose", "Rose Knight transforming through a storm of magenta crystal ribbons")}<div><small>REFRACTION 01 // HEART VECTOR</small><h2>Rose Knight</h2><p>Rin turns emotion into momentum. Her ribbon blade becomes longer when she admits what she is actually feeling, which happens approximately twice.</p><b>TRANSFORMATION: 8 FRAMES</b></div></article>
            <article data-fandom-panel="azure">${fanImage("prism-azure", "Azure Knight transforming through cyan crystal arcs")}<div><small>REFRACTION 02 // STILL WATER</small><h2>Azure Knight</h2><p>Sora's shield stores one attack and returns it as light. The dub calls this “mirror bounce,” which nobody has forgiven.</p><b>TRANSFORMATION: 7 FRAMES</b></div></article>
            <article data-fandom-panel="citrine">${fanImage("prism-citrine-violet", "Citrine and Violet Knights combining yellow batons and a crescent staff")}<div><small>REFRACTION 03 // TWIN SPARK</small><h2>Citrine Knight</h2><p>Jun is the only Knight who reads the mission brief. His light batons make a tuning-fork tone hidden under the soundtrack.</p><b>FAVORITE EPISODE: 07</b></div></article>
            <article data-fandom-panel="viridian">${fanImage("prism-viridian", "Viridian Knight flying through a formation of mirror drones")}<div><small>REFRACTION 04 // OPEN SKY</small><h2>Viridian Knight</h2><p>Midori's mechanical crystal wings appear one episode before she learns to fly. Either foreshadowing or the cels were aired out of order.</p><b>WING PANELS: 12</b></div></article>
            <article data-fandom-panel="violet">${fanImage("prism-violet-art", "Aya's watercolor fan portrait of Violet Knight and Gleam")}<div><small>REFRACTION 05 // QUIET ORBIT</small><h2>Violet Knight</h2><p>Rei can hear cracks forming in mirrors. She refuses the final team attack and saves everyone by lowering her staff instead.</p><b>AYA'S FAVORITE. OBJECTIVITY SUSPENDED.</b></div></article>
          </div>
        </section>
        <section class="prism-frame-lab">
          <div>${fanImage("prism-chart", "Aya's obsessive frame-by-frame chart of all five Chroma Knight transformations")}</div>
          <div>
            <small>FRAME-BY-FRAME LAB // CLICK TO SCRUB</small><h2>Transformation Sequence 05</h2>
            <div class="prism-frame-buttons">
              <button class="active" data-fandom-tab="one" data-fandom-target="prism-frame-notes">01</button>
              <button data-fandom-tab="two" data-fandom-target="prism-frame-notes">02</button>
              <button data-fandom-tab="three" data-fandom-target="prism-frame-notes">03</button>
              <button data-fandom-tab="four" data-fandom-target="prism-frame-notes">04</button>
              <button data-fandom-tab="five" data-fandom-target="prism-frame-notes">05</button>
            </div>
            <div class="prism-frame-notes" id="prism-frame-notes" data-active="one">
              <p data-fandom-panel="one"><b>01:</b> Civilian outline. Badge is already reflecting six points.</p>
              <p data-fandom-panel="two"><b>02:</b> Armor silhouette enters one frame early on the left shoulder.</p>
              <p data-fandom-panel="three"><b>03:</b> Gleam's tail becomes transparent before the background changes.</p>
              <p data-fandom-panel="four"><b>04:</b> Hidden clear outline appears between Violet and Rose.</p>
              <p data-fandom-panel="five"><b>05:</b> Final pose. The soundtrack contains six bell strikes.</p>
            </div>
          </div>
        </section>
        <section class="prism-episode-shards">
          <header><h2>TWELVE EPISODES // TWELVE FRACTURES</h2><p>Aya's compact guide to the frames that matter.</p></header>
          <article><b>01</b><h3>Five Lights at Dusk</h3><p>Gleam chooses five heroes and looks past the camera before naming the last one.</p></article>
          <article><b>03</b><h3>Blue Refuses Blue</h3><p>Azure's shield reflects an attack that has not happened yet.</p></article>
          <article><b>06</b><h3>The Palace Has No Back</h3><p>Null Regent removes a mirror and reveals another copy of the same room.</p></article>
          <article><b>07</b><h3>Two Batons, One Note</h3><p>Citrine finds a sixth tone beneath the team's transformation chord.</p></article>
          <article><b>09</b><h3>Wings Before Flight</h3><p>Viridian remembers a battle nobody else experienced.</p></article>
          <article><b>12</b><h3>Colorless Morning</h3><p>The rainbow shatters. A clear badge lands outside the frame.</p></article>
        </section>
        <section class="prism-null-file">
          ${fanImage("prism-null", "Null Regent standing in a palace of fractured black mirrors")}
          <div><small>VILLAIN FILE // TRANSLATION DISPUTE</small><h2>Null Regent</h2><p>Not “King Nothing.” Not “Lord Blank.” The title card uses a word closer to <i>the person temporarily keeping a place empty.</i> That makes the finale considerably stranger.</p></div>
          ${fanImage("prism-finale", "The five Chroma Knights facing a shattered rainbow void in the final episode")}
        </section>
        <section class="prism-fan-gallery">
          <article>${fanImage("prism-pencil", "Colored-pencil fan art of the five Chroma Knights and Gleam")}<h3>AYA'S TEAM PORTRAIT</h3><p>Colored pencil, gel pen, three evenings.</p></article>
          <article>${fanImage("prism-bootlegs", "A flea-market package of inaccurate Chroma Knights action figures")}<h3>BOOTLEG HALL OF LIGHT</h3><p>Citrine has two left hands. Violet is labeled Blue Wizard.</p></article>
          <article>${fanImage("prism-tapes", "Aya's Chroma Knights imported VHS tapes, magazine clippings and fan collection")}<h3>TAPE MATRIX</h3><p>Four imports, two fan copies, one convention dub.</p></article>
          <article id="prism-badge-spin">${fanImage("prism-handmade-badges", "Handmade translucent Chroma Knight crystal badges on holographic fabric")}<h3>HOMEMADE REFRACTORS</h3><button data-fandom-animate="prism-badge-spin">CHARGE BADGES</button></article>
        </section>
        <section class="prism-sixth-file">
          <button class="prism-sixth-door" data-fandom-toggle="prism-sixth-reveal" aria-expanded="false"><i></i><b>UNLISTED COLOR</b><span>click the clear shard</span></button>
          <div id="prism-sixth-reveal">
            ${fanImage("prism-sixth", "Aya's fan illustration of a mysterious clear sixth crystal surrounded by the Chroma Knights")}
            <div><small>THEORY FILE 6/5 // SPOILERS</small><h2>The color between colors</h2><p>The final clear badge does not belong to a sixth Knight. Aya thinks it belongs to the viewer—the only person who remembers every timeline reflected by Null Regent's mirrors.</p><p>Tess's early episode 6 tape contains a cabinet-shaped silhouette during the clear frame. Coincidence rating: 72%.</p></div>
          </div>
        </section>
        <section class="prism-fiction">
          ${fanImage("prism-badges", "The five official translucent Chroma Knight crystal badges")}
          <div><small>FAN FICTION // 9 CHAPTERS // CONTINUING</small><h2>Clear Is Not a Color</h2><p>One year after the mirror palace closes, Gleam brings Rei a badge that reflects everybody except her. The team reunites at an abandoned planetarium to decide whether some doors should remain colorless.</p><blockquote>“A mirror is only honest about what stands in front of it.”</blockquote></div>
          ${fanImage("prism-fiction-pages", "Typed PRISM//5 fanfiction pages with pencil drawings of Gleam and Null Regent")}
        </section>
        <p class="fandom-owner-note">Submit transformation timing, tape variants, fan works, or sixth-color theories below.</p>
      </main>`
  }
};
