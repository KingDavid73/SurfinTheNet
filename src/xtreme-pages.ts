import type { PageComment, PageDefinition } from "./types";

const XTREME_URL = "web://orbitnet.local/zones/xtreme";
const DEE_URL = "web://xtreme.zone/users/deckwreckerdee/home";
const COLE_URL = "web://xtreme.zone/users/crankcasecole/home";
const NICO_URL = "web://xtreme.zone/users/neonbladenico/home";

const XTREME_ASSETS = {
  "dee-portrait": new URL("../assets/images/xtreme-members/photos/dee-portrait.png", import.meta.url).href,
  "dee-action": new URL("../assets/images/xtreme-members/photos/dee-action.png", import.meta.url).href,
  "dee-gear": new URL("../assets/images/xtreme-members/photos/dee-gear.png", import.meta.url).href,
  "cole-portrait": new URL("../assets/images/xtreme-members/photos/cole-portrait.png", import.meta.url).href,
  "cole-action": new URL("../assets/images/xtreme-members/photos/cole-action.png", import.meta.url).href,
  "cole-gear": new URL("../assets/images/xtreme-members/photos/cole-gear.png", import.meta.url).href,
  "nico-portrait": new URL("../assets/images/xtreme-members/photos/nico-portrait.png", import.meta.url).href,
  "nico-action": new URL("../assets/images/xtreme-members/photos/nico-action.png", import.meta.url).href,
  "nico-gear": new URL("../assets/images/xtreme-members/photos/nico-gear.png", import.meta.url).href,
  "dee-grind-zine": new URL("../assets/images/xtreme-members/skater/grind-zine.png", import.meta.url).href,
  "dee-cat-deck": new URL("../assets/images/xtreme-members/skater/cat-deck.png", import.meta.url).href,
  "dee-spot-map": new URL("../assets/images/xtreme-members/skater/spot-map.png", import.meta.url).href,
  "dee-sticker-collage": new URL("../assets/images/xtreme-members/skater/sticker-collage.png", import.meta.url).href,
  "dee-ledge-line": new URL("../assets/images/xtreme-members/skater/ledge-line.png", import.meta.url).href,
  "dee-roast-comic": new URL("../assets/images/xtreme-members/skater/roast-comic.png", import.meta.url).href,
  "cole-flame-bike": new URL("../assets/images/xtreme-members/bmx/flame-bike.png", import.meta.url).href,
  "cole-jump-diagram": new URL("../assets/images/xtreme-members/bmx/jump-diagram.png", import.meta.url).href,
  "cole-sprocket": new URL("../assets/images/xtreme-members/bmx/sprocket.png", import.meta.url).href,
  "cole-helmet": new URL("../assets/images/xtreme-members/bmx/helmet.png", import.meta.url).href,
  "cole-trail-map": new URL("../assets/images/xtreme-members/bmx/trail-map.png", import.meta.url).href,
  "cole-roast-comic": new URL("../assets/images/xtreme-members/bmx/roast-comic.png", import.meta.url).href,
  "nico-neon-skates": new URL("../assets/images/xtreme-members/blader/neon-skates.png", import.meta.url).href,
  "nico-grind-sequence": new URL("../assets/images/xtreme-members/blader/grind-sequence.png", import.meta.url).href,
  "nico-rave-collage": new URL("../assets/images/xtreme-members/blader/rave-collage.png", import.meta.url).href,
  "nico-winged-wheel": new URL("../assets/images/xtreme-members/blader/winged-wheel.png", import.meta.url).href,
  "nico-park-map": new URL("../assets/images/xtreme-members/blader/park-map.png", import.meta.url).href,
  "nico-roast-comic": new URL("../assets/images/xtreme-members/blader/roast-comic.png", import.meta.url).href
} as const;

const xtremeImage = (name: keyof typeof XTREME_ASSETS, alt: string, className = "") =>
  `<img class="xtreme-art ${className}" src="${XTREME_ASSETS[name]}" alt="${alt}">`;

const seed = (
  id: string,
  pageUrl: string,
  ownerId: string,
  role: PageComment["role"],
  author: string,
  text: string,
  createdAt: string
): PageComment => ({ id, pageUrl, ownerId, role, author, text, createdAt, revealAfterVisit: 0 });

export const xtremeMembers = [
  {
    url: DEE_URL,
    handle: "DeckWrecker_Dee",
    title: "Dee's Curb Damage",
    description: "Street spots, scratched decks, Xerox trick reports, and absolutely no handrails built for bicycles.",
    discipline: "SKATEBOARD",
    className: "dee"
  },
  {
    url: COLE_URL,
    handle: "CrankCase_Cole",
    title: "Cole's Dirt Transmission",
    description: "BMX trail lines, chrome parts, repair notes, big sends, and one ongoing argument about training wheels.",
    discipline: "BMX",
    className: "cole"
  },
  {
    url: NICO_URL,
    handle: "NeonBlade_Nico",
    title: "Nico's Eight-Wheel Uplink",
    description: "Night sessions, rail grinds, rave flyers, wheel science, and evidence that blades are the future.",
    discipline: "AGGRESSIVE INLINE",
    className: "nico"
  }
] as const;

const deeComments: PageComment[] = [
  seed("dee-cole-1", DEE_URL, "deckwrecker_dee", "visitor", "CrankCase_Cole", "Sick ledge, Dee. Let me know when you graduate from carrying the vehicle under one arm.", "1999-11-02T17:11:00"),
  seed("dee-owner-1", DEE_URL, "deckwrecker_dee", "owner", "DeckWrecker_Dee", "Let me know when your vehicle can enter a building without apologizing to every doorway.", "1999-11-02T17:16:00"),
  seed("dee-nico-1", DEE_URL, "deckwrecker_dee", "visitor", "NeonBlade_Nico", "That kickflip was clean. Weird choice to remove six useful wheels before attempting it, though.", "1999-11-02T21:04:00"),
  seed("dee-owner-2", DEE_URL, "deckwrecker_dee", "owner", "DeckWrecker_Dee", "Four wheels is plenty when they are attached to something that does not look like moon boots.", "1999-11-02T21:09:00"),
  seed("dee-cole-2", DEE_URL, "deckwrecker_dee", "visitor", "CrankCase_Cole", "Westgate ledge is crusty. Respect for sending it anyway, board gremlin.", "1999-11-03T16:34:00"),
  seed("dee-nico-2", DEE_URL, "deckwrecker_dee", "visitor", "NeonBlade_Nico", "Plaza session Friday? I promise to keep my terrifying futuristic footwear away from your precious curb wax.", "1999-11-03T18:02:00")
];

const coleComments: PageComment[] = [
  seed("cole-dee-1", COLE_URL, "crankcase_cole", "visitor", "DeckWrecker_Dee", "Nice dirt pile. Did your bike need handlebars because balance was sold separately?", "1999-11-02T17:25:00"),
  seed("cole-owner-1", COLE_URL, "crankcase_cole", "owner", "CrankCase_Cole", "Handlebars let me steer toward larger jumps. Your board just waits for gravity to make decisions.", "1999-11-02T17:29:00"),
  seed("cole-nico-1", COLE_URL, "crankcase_cole", "visitor", "NeonBlade_Nico", "Twenty-inch wheels and still somehow slower to lace up than my skates. Impressive engineering, dirt wizard.", "1999-11-02T21:18:00"),
  seed("cole-owner-2", COLE_URL, "crankcase_cole", "owner", "CrankCase_Cole", "My wheels cross gaps. Yours arrive at the rail in a synchronized dance recital.", "1999-11-02T21:23:00"),
  seed("cole-dee-2", COLE_URL, "crankcase_cole", "visitor", "DeckWrecker_Dee", "Tabletop photo is legit. I will deny saying this if anybody asks.", "1999-11-03T15:40:00"),
  seed("cole-nico-2", COLE_URL, "crankcase_cole", "visitor", "NeonBlade_Nico", "Rust Creek Saturday. I want to see whether the tiny wheels survive actual dirt.", "1999-11-03T18:16:00")
];

const nicoComments: PageComment[] = [
  seed("nico-dee-1", NICO_URL, "neonblade_nico", "visitor", "DeckWrecker_Dee", "Your page has enough neon to make my skateboard file a noise complaint.", "1999-11-02T19:48:00"),
  seed("nico-owner-1", NICO_URL, "neonblade_nico", "owner", "NeonBlade_Nico", "Your page is black and white because skateboards have not unlocked the color expansion yet.", "1999-11-02T19:53:00"),
  seed("nico-cole-1", NICO_URL, "neonblade_nico", "visitor", "CrankCase_Cole", "Eight wheels is not a sport, Nico. It is a very nervous shopping cart.", "1999-11-02T22:01:00"),
  seed("nico-owner-2", NICO_URL, "neonblade_nico", "owner", "NeonBlade_Nico", "A shopping cart can carry groceries. Your bike cannot even carry a second person without pegs.", "1999-11-02T22:07:00"),
  seed("nico-dee-2", NICO_URL, "neonblade_nico", "visitor", "DeckWrecker_Dee", "Rail photo goes hard. Those moon boots earned half a compliment.", "1999-11-03T17:14:00"),
  seed("nico-cole-2", NICO_URL, "neonblade_nico", "visitor", "CrankCase_Cole", "Night session after Rust Creek. Bring headphones and leave the flame jersey in a safe location.", "1999-11-03T18:31:00")
];

export const xtremePages: Record<string, PageDefinition> = {
  [DEE_URL]: {
    url: DEE_URL,
    title: "DeckWrecker_Dee's Curb Damage",
    site: "skater",
    ownerId: "deckwrecker_dee",
    summary: "DeckWrecker_Dee's photocopied street-skate zine covers Westgate Plaza, kickflips, curb wax, scratched decks, street spots, BMX arguments, and aggressive inline rivalry.",
    commentsEnabled: true,
    seedComments: deeComments,
    listed: true,
    hubId: "zone-xtreme",
    searchTerms: ["DeckWrecker Dee", "Dee", "skateboard", "skater", "street skating", "kickflip", "curb", "ledge", "Westgate Plaza", "skate zine"],
    render: () => `
      <main class="page xtreme-user-page dee-page">
        <header><div><small>DECKWRECKER_DEE // ISSUE 006</small><h1>CURB<br>DAMAGE</h1><p>street spots / bad pavement / good excuses</p></div>${xtremeImage("dee-cat-deck", "Dee's scratched skateboard deck with a one-eyed cat graphic")}</header>
        <nav><button data-nav="${XTREME_URL}">&lt; X-TREME EDGE</button><button disabled>SPOT REPORTS</button><button disabled>TRICK LIST</button><button disabled>VERY BAD ADVICE</button></nav>
        <section class="dee-intro">${xtremeImage("dee-portrait", "A scanned 1999 photograph of Dee holding her scratched skateboard")}<div><h2>YO. I'M DEE.</h2><p>Street skating, ugly concrete, no judges. If a curb has chipped paint, somebody should probably grind it. If it has fresh paint, wait until dark.</p><p>Cole needs two twenty-inch wheels and a repair kit to reach the same ledge. Nico straps a complete toy store to each foot. They are both all right, technically.</p></div>${xtremeImage("dee-sticker-collage", "Dee's photocopied skate sticker collage")}</section>
        <section class="dee-feature">${xtremeImage("dee-action", "A fisheye film photograph of Dee kickflipping over a concrete ledge")}<div><b>PHOTO OF THE WEEK</b><h2>WESTGATE FIVE</h2><p>Kickflip over the chipped planter. Landed third try. First two attempts have been classified as landscaping.</p><span>photo: Nico // heckling: Cole</span></div></section>
        <section class="dee-grid"><article>${xtremeImage("dee-spot-map", "A hand-drawn street skate spot map")}<h2>SPOT MAP</h2><p>Plaza ledges, six-stair, waxed red curb, security route. Keep it low-key, ya animals.</p></article><article>${xtremeImage("dee-ledge-line", "A photocopied concrete ledge with a hand-drawn trick line")}<h2>LINE NOTES</h2><p>Push twice, ollie early, ignore Cole yelling “send it” from somewhere behind a bush.</p></article><article>${xtremeImage("dee-roast-comic", "A punk-zine cartoon of a skateboard mocking a BMX bike and inline skates")}<h2>VEHICLE GUIDE</h2><p>Board: correct. Bike: too much plumbing. Blades: suspicious number of buckles.</p></article></section>
        <aside class="dee-gear">${xtremeImage("dee-gear", "Dee's scratched skateboard, worn shoes, waxed curb and disposable camera")}<p><b>CURRENT SETUP:</b> 31-inch alley-cat deck, medium trucks, 54mm wheels, one bearing that screams louder than Cole.</p></aside>
        <p class="xtreme-owner-note">Drop spot tips and trash talk below. Posers will be identified by committee.</p>
      </main>`
  },
  [COLE_URL]: {
    url: COLE_URL,
    title: "CrankCase_Cole's Dirt Transmission",
    site: "bmx",
    ownerId: "crankcase_cole",
    summary: "CrankCase_Cole's flame-covered BMX homepage documents Rust Creek dirt jumps, tabletop tricks, chrome bike parts, repairs, skateboarding rivalry, and rollerblade arguments.",
    commentsEnabled: true,
    seedComments: coleComments,
    listed: true,
    hubId: "zone-xtreme",
    searchTerms: ["CrankCase Cole", "Cole", "BMX", "bike", "dirt jumps", "tabletop", "Rust Creek", "trails", "chainring", "bicycle repair"],
    render: () => `
      <main class="page xtreme-user-page cole-page">
        <header>${xtremeImage("cole-flame-bike", "An airbrushed chrome BMX bicycle surrounded by flames")}<div><small>CRANKCASE_COLE BROADCASTING FROM RUST CREEK</small><h1>DIRT<br>TRANSMISSION</h1><p>build it // hit it // fix it // hit it bigger</p></div></header>
        <nav><button data-nav="${XTREME_URL}">X-TREME EDGE</button><button disabled>TRAIL CAM</button><button disabled>BIKE CHECK</button><button disabled>WIPEOUTS</button></nav>
        <section class="cole-intro">${xtremeImage("cole-portrait", "A scanned 1999 photograph of Cole with his chrome BMX bike at dirt trails")}<div><h2>WHAT'S UP, DIRT MERCHANTS?</h2><p>Cole here. I dig jumps, torch my jeans on sprockets, and send stuff before somebody can explain why it is a bad idea.</p><p>Dee rides a shelf with wheels. Nico wears two complicated shoes. I ride a machine—although the machine currently needs a new chain.</p></div>${xtremeImage("cole-helmet", "Cole's muddy helmet covered in lightning stickers")}</section>
        <section class="cole-jump">${xtremeImage("cole-action", "A fisheye action photograph of Cole performing a BMX tabletop over dirt jumps")}<div><strong>TRAIL SHOT // RUST CREEK</strong><h2>TABLETOP OVER THE SECOND DOUBLE</h2><p>Boosted clean, dipped it flat, almost landed in Dee's backpack. She says that last part was my fault. Bogus.</p></div></section>
        <section class="cole-panels"><article>${xtremeImage("cole-jump-diagram", "Cole's ballpoint diagram of a BMX dirt-jump line")}<h2>NEW LINE</h2><p>Two doubles, a roller, then the left berm. Pump it smooth or enjoy an educational meeting with the dirt.</p></article><article>${xtremeImage("cole-sprocket", "A greasy illustrated BMX sprocket and chain assembly")}<h2>BIKE CHECK</h2><p>20-inch chrome frame, four pegs, 44-tooth sprocket, handlebars because steering rules.</p></article><article>${xtremeImage("cole-roast-comic", "A marker cartoon of a BMX bike jumping over skateboard and inline skates")}<h2>OBSTACLE SIZE CHART</h2><p>Board: speed bump. Blades: decorative gravel. BMX: airborne, dude.</p></article></section>
        <aside class="cole-trails">${xtremeImage("cole-trail-map", "A hand-painted aerial map of Cole's BMX dirt trails")}<div><h2>RUST CREEK TRAIL STATUS</h2><p>Dry enough to ride Saturday. Bring a shovel. Nico may bring the tiny wheels for scientific testing.</p></div>${xtremeImage("cole-gear", "Cole's chrome BMX bike, muddy helmet, gloves and trail tools")}</aside>
        <p class="xtreme-owner-note">Post trail reports or talk smack below. “Your chain is loose” counts as both.</p>
      </main>`
  },
  [NICO_URL]: {
    url: NICO_URL,
    title: "NeonBlade_Nico's Eight-Wheel Uplink",
    site: "blader",
    ownerId: "neonblade_nico",
    summary: "NeonBlade_Nico's candy-colored aggressive inline skating homepage features night sessions, rail grinds, skatepark maps, bright wheel setups, rave graphics, and rivalry with skateboarders and BMX riders.",
    commentsEnabled: true,
    seedComments: nicoComments,
    listed: true,
    hubId: "zone-xtreme",
    searchTerms: ["NeonBlade Nico", "Nico", "rollerblade", "rollerblader", "inline skating", "aggressive inline", "rail grind", "skatepark", "eight wheels", "night session"],
    render: () => `
      <main class="page xtreme-user-page nico-page">
        <header><div class="nico-orbit">${xtremeImage("nico-winged-wheel", "A chrome CGI winged inline-skate wheel")}</div><div><small>NEONBLADE_NICO PRESENTS</small><h1>EIGHT-WHEEL<br>UPLINK</h1><p>/// NIGHT SESSION ONLINE ///</p></div></header>
        <nav><button data-nav="${XTREME_URL}">&lt;&lt; EDGE</button><button disabled>TRICK DATABASE</button><button disabled>WHEEL LAB</button><button disabled>SESSION MIX</button></nav>
        <section class="nico-intro">${xtremeImage("nico-portrait", "A scanned 1999 photograph of Nico wearing aggressive inline skates at a night skatepark")}<div><h2>WELCOME, FUTURE PEOPLE.</h2><p>Nico here—rails, gaps, night sessions, loud headphones. Eight wheels means eight opportunities to go faster than the dude calling your skates moon boots.</p><p>Dee's board keeps escaping from her. Cole's bike has a chair but he never sits down. Somehow I am the weird one.</p></div>${xtremeImage("nico-neon-skates", "A glossy airbrushed pair of neon aggressive inline skates")}</section>
        <section class="nico-action">${xtremeImage("nico-action", "A low-angle flash photograph of Nico grinding a handrail on aggressive inline skates")}<div><b>SESSION CAPTURE 11.02.99</b><h2>MAKIO // BLUE RAIL</h2><p>Locked it, slid the whole thing, rolled away while Dee pretended not to cheer. Cole was still finding somewhere to park his bicycle.</p></div></section>
        <section class="nico-cards"><article>${xtremeImage("nico-grind-sequence", "A colorful hand-drawn aggressive inline rail-grind sequence")}<h2>TRICK SEQUENCE</h2><p>Bend low, lock the soul plate, look past the rail. Style before speed, but speed helps.</p></article><article>${xtremeImage("nico-rave-collage", "A fluorescent rave-flyer collage of aggressive inline skating silhouettes")}<h2>NIGHT ENERGY</h2><p>Blue lights, concrete echoes, fresh wheels, one MiniDisc on repeat until security arrives.</p></article><article>${xtremeImage("nico-roast-comic", "A bright marker cartoon of inline skates dancing around skateboard and BMX bike")}<h2>EVOLUTION CHART</h2><p>Board lost its rider. Bike brought plumbing. Blades arrived ready to dance.</p></article></section>
        <section class="nico-park">${xtremeImage("nico-park-map", "Nico's gel-pen map of a city skatepark at night")}<div><h2>NEON HARBOR MAP</h2><p>Best rails after 9 PM. Bad seam beside the quarter pipe. Excellent acoustics for Cole complaining about wheel diameter.</p></div>${xtremeImage("nico-gear", "Nico's aggressive inline skates, pads, headphones and colorful wheels")}</section>
        <p class="xtreme-owner-note">Leave session plans, wheel questions, or outdated moon-boot jokes below.</p>
      </main>`
  }
};
