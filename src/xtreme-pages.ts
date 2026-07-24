import type { PageComment, PageDefinition } from "./types";

const XTREME_URL = "web://orbitnet.local/zones/xtreme";
const DEE_URL = "web://xtreme.zone/users/deckwreckerdee/home";
const COLE_URL = "web://xtreme.zone/users/crankcasecole/home";
const NICO_URL = "web://xtreme.zone/users/neonbladenico/home";
const TY_URL = "web://xtreme.zone/users/tideriderty/home";
const TROY_URL = "web://xtreme.zone/users/throttletroy/home";
const OLLIE_URL = "web://xtreme.zone/users/scootlordollie/home";
const VIKTOR_URL = "web://xtreme.zone/users/veloceviktor/home";

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
  "nico-roast-comic": new URL("../assets/images/xtreme-members/blader/roast-comic.png", import.meta.url).href,
  "ty-portrait": new URL("../assets/images/xtreme-members/photos/ty-portrait.png", import.meta.url).href,
  "ty-action": new URL("../assets/images/xtreme-members/photos/ty-action.png", import.meta.url).href,
  "ty-gear": new URL("../assets/images/xtreme-members/photos/ty-gear.png", import.meta.url).href,
  "troy-portrait": new URL("../assets/images/xtreme-members/photos/troy-portrait.png", import.meta.url).href,
  "troy-action": new URL("../assets/images/xtreme-members/photos/troy-action.png", import.meta.url).href,
  "troy-gear": new URL("../assets/images/xtreme-members/photos/troy-gear.png", import.meta.url).href,
  "ollie-portrait": new URL("../assets/images/xtreme-members/photos/ollie-portrait.png", import.meta.url).href,
  "ollie-action": new URL("../assets/images/xtreme-members/photos/ollie-action.png", import.meta.url).href,
  "ollie-gear": new URL("../assets/images/xtreme-members/photos/ollie-gear.png", import.meta.url).href,
  "viktor-portrait": new URL("../assets/images/xtreme-members/photos/viktor-portrait.png", import.meta.url).href,
  "viktor-action": new URL("../assets/images/xtreme-members/photos/viktor-action.png", import.meta.url).href,
  "viktor-gear": new URL("../assets/images/xtreme-members/photos/viktor-gear.png", import.meta.url).href,
  "ty-sunset-wave": new URL("../assets/images/xtreme-members/surfer/sunset-wave.png", import.meta.url).href,
  "ty-break-map": new URL("../assets/images/xtreme-members/surfer/break-map.png", import.meta.url).href,
  "ty-board-graphics": new URL("../assets/images/xtreme-members/surfer/board-graphics.png", import.meta.url).href,
  "ty-wave-woodcut": new URL("../assets/images/xtreme-members/surfer/wave-woodcut.png", import.meta.url).href,
  "ty-beach-doodles": new URL("../assets/images/xtreme-members/surfer/beach-doodles.png", import.meta.url).href,
  "ty-surf-zine": new URL("../assets/images/xtreme-members/surfer/surf-zine.png", import.meta.url).href,
  "ty-beach-van": new URL("../assets/images/xtreme-members/surfer/beach-van.png", import.meta.url).href,
  "ty-memory-collage": new URL("../assets/images/xtreme-members/surfer/memory-collage.png", import.meta.url).href,
  "troy-race-burst": new URL("../assets/images/xtreme-members/motocross/race-burst.png", import.meta.url).href,
  "troy-number": new URL("../assets/images/xtreme-members/motocross/number-317.png", import.meta.url).href,
  "troy-track-map": new URL("../assets/images/xtreme-members/motocross/track-map.png", import.meta.url).href,
  "troy-helmet": new URL("../assets/images/xtreme-members/motocross/helmet.png", import.meta.url).href,
  "troy-dirt-roost": new URL("../assets/images/xtreme-members/motocross/dirt-roost.png", import.meta.url).href,
  "troy-trophy": new URL("../assets/images/xtreme-members/motocross/trophy-bench.png", import.meta.url).href,
  "troy-bike-cutaway": new URL("../assets/images/xtreme-members/motocross/bike-cutaway.png", import.meta.url).href,
  "troy-airborne-xerox": new URL("../assets/images/xtreme-members/motocross/airborne-xerox.png", import.meta.url).href,
  "ollie-scooter-burst": new URL("../assets/images/xtreme-members/scooter/scooter-burst.png", import.meta.url).href,
  "ollie-sticker-helmet": new URL("../assets/images/xtreme-members/scooter/sticker-helmet.png", import.meta.url).href,
  "ollie-trick-diagram": new URL("../assets/images/xtreme-members/scooter/trick-diagram.png", import.meta.url).href,
  "ollie-curb-collage": new URL("../assets/images/xtreme-members/scooter/curb-collage.png", import.meta.url).href,
  "ollie-bowlcut": new URL("../assets/images/xtreme-members/scooter/bowlcut-doodle.png", import.meta.url).href,
  "ollie-scorecard": new URL("../assets/images/xtreme-members/scooter/scorecard.png", import.meta.url).href,
  "ollie-sticker-deck": new URL("../assets/images/xtreme-members/scooter/sticker-deck.png", import.meta.url).href,
  "ollie-rail-xerox": new URL("../assets/images/xtreme-members/scooter/rail-xerox.png", import.meta.url).href,
  "viktor-supercar": new URL("../assets/images/xtreme-members/euro/coast-supercar.png", import.meta.url).href,
  "viktor-yacht": new URL("../assets/images/xtreme-members/euro/anchored-yacht.png", import.meta.url).href,
  "viktor-jetskis": new URL("../assets/images/xtreme-members/euro/marina-jetskis.png", import.meta.url).href,
  "viktor-watch": new URL("../assets/images/xtreme-members/euro/watch-keys.png", import.meta.url).href,
  "viktor-luggage": new URL("../assets/images/xtreme-members/euro/hotel-luggage.png", import.meta.url).href,
  "viktor-convertible": new URL("../assets/images/xtreme-members/euro/coast-convertible.png", import.meta.url).href,
  "viktor-yacht-wheel": new URL("../assets/images/xtreme-members/euro/yacht-wheel.png", import.meta.url).href,
  "viktor-balcony": new URL("../assets/images/xtreme-members/euro/villa-balcony.png", import.meta.url).href
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
  },
  {
    url: TY_URL,
    handle: "TideRider_Ty",
    title: "Ty's Pacific Drift",
    description: "SoCal swell reports, sun-faded photos, questionable tide advice, and the crew's designated voice of chill.",
    discipline: "SURF",
    className: "ty"
  },
  {
    url: TROY_URL,
    handle: "Throttle_Troy",
    title: "Troy 317 Racing",
    description: "Cole's older brother: motocross race logs, two-stroke wrenching, huge air, and the coolest guy anybody here knows.",
    discipline: "MOTOCROSS",
    className: "troy"
  },
  {
    url: OLLIE_URL,
    handle: "ScootLord_Ollie",
    title: "Ollie's Scooter Maximum",
    description: "Tiny wheels, maximum volume, impossible trick diagrams, and a guestbook full of affectionate public humiliation.",
    discipline: "KICK SCOOTER",
    className: "ollie"
  },
  {
    url: VIKTOR_URL,
    handle: "Veloce_Viktor",
    title: "Viktor's Riviera Velocity",
    description: "Rare updates from somebody else's yacht, somebody else's supercar, and whichever private beach currently tolerates him.",
    discipline: "JET SKI / LIFESTYLE",
    className: "viktor"
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

const tyComments: PageComment[] = [
  seed("ty-dee-1", TY_URL, "tiderider_ty", "visitor", "DeckWrecker_Dee", "Ocean looks good. Shame about the giant plank blocking half the photo.", "1999-11-01T16:03:00"),
  seed("ty-owner-1", TY_URL, "tiderider_ty", "owner", "TideRider_Ty", "The plank floats, Dee. Yours escapes downhill and attacks ankles.", "1999-11-01T16:12:00"),
  seed("ty-cole-1", TY_URL, "tiderider_ty", "visitor", "CrankCase_Cole", "Can your wave do a tabletop? Troy says the coast road has a dirt turnout.", "1999-11-02T14:22:00"),
  seed("ty-troy-1", TY_URL, "tiderider_ty", "visitor", "Throttle_Troy", "Dawn swell Saturday. I can haul the boards if Cole promises not to put bike pegs through the van upholstery.", "1999-11-02T14:40:00"),
  seed("ty-nico-1", TY_URL, "tiderider_ty", "visitor", "NeonBlade_Nico", "Troy driving the coast road? Coolest field trip possible. I call the seat farthest from Cole's muddy helmet.", "1999-11-02T18:06:00"),
  seed("ty-ollie-1", TY_URL, "tiderider_ty", "visitor", "ScootLord_Ollie", "I could totally scooter down a wave if you bolted fins to the deck. I have diagrams.", "1999-11-03T20:02:00"),
  seed("ty-owner-2", TY_URL, "tiderider_ty", "owner", "TideRider_Ty", "Absolutely bring the diagrams. Absolutely leave the scooter on dry land.", "1999-11-03T20:10:00")
];

const troyComments: PageComment[] = [
  seed("troy-cole-1", TROY_URL, "throttle_troy", "visitor", "CrankCase_Cole", "That second-double photo is unreal. Tell everybody again that you taught me tabletops.", "1999-11-01T19:11:00"),
  seed("troy-owner-1", TROY_URL, "throttle_troy", "owner", "Throttle_Troy", "I taught you to wear a helmet. Gravity handled the rest. Proud of you, little brother.", "1999-11-01T19:18:00"),
  seed("troy-dee-1", TROY_URL, "throttle_troy", "visitor", "DeckWrecker_Dee", "Okay, 317, that whip is disgusting. This compliment self-destructs when Cole reads it.", "1999-11-02T16:32:00"),
  seed("troy-nico-1", TROY_URL, "throttle_troy", "visitor", "NeonBlade_Nico", "Troy is the only person here allowed to wear that much red without looking like a vending machine.", "1999-11-02T17:01:00"),
  seed("troy-ty-1", TROY_URL, "throttle_troy", "visitor", "TideRider_Ty", "Race Sunday, dawn patrol Saturday. Somehow you made a motor schedule sound relaxing.", "1999-11-02T17:29:00"),
  seed("troy-ollie-1", TROY_URL, "throttle_troy", "visitor", "ScootLord_Ollie", "Could I put a two-stroke motor on my scooter? Asking for engineering reasons.", "1999-11-03T20:21:00"),
  seed("troy-owner-2", TROY_URL, "throttle_troy", "owner", "Throttle_Troy", "No. Come to the pit Sunday and I will show you why using all ten fingers is good.", "1999-11-03T20:29:00")
];

const ollieComments: PageComment[] = [
  seed("ollie-dee-1", OLLIE_URL, "scootlord_ollie", "visitor", "DeckWrecker_Dee", "Remember when you had that dumb bowl cut? Somehow the scooter still was not the loudest part of the outfit.", "1999-11-01T15:13:00"),
  seed("ollie-owner-1", OLLIE_URL, "scootlord_ollie", "owner", "ScootLord_Ollie", "That haircut was aerodynamic and history will apologize to me.", "1999-11-01T15:17:00"),
  seed("ollie-cole-1", OLLIE_URL, "scootlord_ollie", "visitor", "CrankCase_Cole", "Sick trick diagram. Which arrow shows the scooter folding in half?", "1999-11-02T17:44:00"),
  seed("ollie-nico-1", OLLIE_URL, "scootlord_ollie", "visitor", "NeonBlade_Nico", "Tiny wheels respect tiny wheels. I still refuse to call whatever that was a grind.", "1999-11-02T18:02:00"),
  seed("ollie-ty-1", OLLIE_URL, "scootlord_ollie", "visitor", "TideRider_Ty", "Meet us at the beach Saturday, dude. Scooter stays in the van unless it learns to swim.", "1999-11-02T18:20:00"),
  seed("ollie-troy-1", OLLIE_URL, "scootlord_ollie", "visitor", "Throttle_Troy", "You kept trying after the curb won six times. That counts for something. Bring your helmet Sunday.", "1999-11-03T19:48:00"),
  seed("ollie-owner-2", OLLIE_URL, "scootlord_ollie", "owner", "ScootLord_Ollie", "THANK YOU. Troy gets it. Sunday I unveil the Thunder Scoot 2.0.", "1999-11-03T19:54:00")
];

const viktorComments: PageComment[] = [
  seed("viktor-dee-1", VIKTOR_URL, "veloce_viktor", "visitor", "DeckWrecker_Dee", "Third photo of a car you do not drive near a beach you do not surf. Riveting update, Your Highness.", "1999-10-22T13:09:00"),
  seed("viktor-cole-1", VIKTOR_URL, "veloce_viktor", "visitor", "CrankCase_Cole", "Does the yacht have a dirt jump or did you just post this to make dial-up users suffer?", "1999-10-22T14:02:00"),
  seed("viktor-owner-1", VIKTOR_URL, "veloce_viktor", "owner", "Veloce_Viktor", "The yacht has discretion, Cole. It is not something I can photograph for you.", "1999-10-24T09:15:00"),
  seed("viktor-nico-1", VIKTOR_URL, "veloce_viktor", "visitor", "NeonBlade_Nico", "Your entire personality has a valet parking ticket.", "1999-10-24T10:01:00"),
  seed("viktor-ty-1", VIKTOR_URL, "veloce_viktor", "visitor", "TideRider_Ty", "Ocean seems nice. Maybe put the camera down and actually go in it sometime.", "1999-10-25T17:42:00"),
  seed("viktor-ollie-1", VIKTOR_URL, "veloce_viktor", "visitor", "ScootLord_Ollie", "Trade you my scooter for the blue car. Mine has custom stickers and only one scary wheel.", "1999-10-28T21:31:00"),
  seed("viktor-dee-2", VIKTOR_URL, "veloce_viktor", "visitor", "DeckWrecker_Dee", "Do not encourage him, Ollie. The scooter has more personality.", "1999-10-28T21:36:00")
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
  },
  [TY_URL]: {
    url: TY_URL,
    title: "TideRider_Ty's Pacific Drift",
    site: "surfer",
    ownerId: "tiderider_ty",
    summary: "TideRider Ty's sun-faded Southern California surf homepage covers local breaks, dawn patrol, board art, swell reports, beach vans, and laid-back teasing with the X-Treme Edge crew.",
    commentsEnabled: true,
    seedComments: tyComments,
    listed: true,
    hubId: "zone-xtreme",
    searchTerms: ["TideRider Ty", "Ty", "surfer", "surfing", "SoCal", "Southern California", "waves", "dawn patrol", "surfboard", "beach", "Pacific Drift"],
    render: () => `
      <main class="page xtreme-user-page ty-page">
        <header>${xtremeImage("ty-sunset-wave", "A sun-faded airbrushed wave at sunset")}<div><small>TIDERIDER_TY // SOMEWHERE SOUTH OF THE PIER</small><h1>PACIFIC<br>DRIFT</h1><p>good swell / bad directions / no hurry</p></div></header>
        <nav><button data-nav="${XTREME_URL}">&lt; X-TREME EDGE</button><button disabled>SWELL LOG</button><button disabled>BOARD SHED</button><button disabled>BEACH CAM</button></nav>
        <section class="ty-intro">${xtremeImage("ty-portrait", "A grainy 1999 photograph of Ty holding a surfboard beside his beach van")}<div><h2>HEY. TY HERE.</h2><p>I surf before the wind wakes up, fix boards badly, and give directions using taco stands that closed three years ago.</p><p>Dee, Cole, Nico and Ollie are good people even when they bring wheels to the beach. Troy is bringing the van Saturday, so everybody suddenly remembered how to wake up before noon.</p></div>${xtremeImage("ty-board-graphics", "Three hand-painted late-90s surfboard deck graphics")}</section>
        <section class="ty-action">${xtremeImage("ty-action", "A 35mm action photograph of Ty surfing a clean blue wave")}<div><b>DAWN PATROL // NOV 2</b><h2>GLASSY AND EMPTY</h2><p>Shoulder-high sets, light wind, one curious seal. Took the left and nearly made the section. The photo says I did, so we are using the photo.</p></div></section>
        <section class="ty-cards"><article>${xtremeImage("ty-break-map", "Ty's hand-drawn map of a fictional Southern California surf break")}<h2>BREAK NOTES</h2><p>Rock shelf on the north end. Easy paddle by the stairs. Do not park beside the yellow hydrant.</p></article><article>${xtremeImage("ty-wave-woodcut", "A distressed surf-zine illustration of a rider inside a wave")}<h2>BOARD SHED</h2><p>Six-eight single fin for soft days. Short board for when I feel ambitious or somebody is watching.</p></article><article>${xtremeImage("ty-surf-zine", "A photocopied late-90s surf-zine layout")}<h2>LOW-TIDE ZINE</h2><p>Issue two is mostly crooked photos, wax reviews, and Cole asking whether a wave can do a tabletop.</p></article></section>
        <aside class="ty-bottom">${xtremeImage("ty-beach-van", "An illustrated old beach van with surfboards on its roof")}<div><h2>SATURDAY CREW RUN</h2><p>Troy drives. Ty navigates. Everybody else buys breakfast. Ollie's scooter remains dry.</p></div>${xtremeImage("ty-gear", "Ty's surfboard, wetsuit, sandals and wax on a hazy beach")}</aside>
        <p class="xtreme-owner-note">Drop swell reports, ride plans, or mellow insults below.</p>
      </main>`
  },
  [TROY_URL]: {
    url: TROY_URL,
    title: "Throttle_Troy 317 Racing",
    site: "motocross",
    ownerId: "throttle_troy",
    summary: "Throttle Troy's late-90s motocross race page documents number 317, two-stroke maintenance, track maps, trophies, huge jumps, and his younger brother Cole's hero worship.",
    commentsEnabled: true,
    seedComments: troyComments,
    listed: true,
    hubId: "zone-xtreme",
    searchTerms: ["Throttle Troy", "Troy", "motocross", "motorcycle", "dirt bike", "race", "number 317", "two stroke", "Cole brother", "MX", "roost"],
    render: () => `
      <main class="page xtreme-user-page troy-page">
        <header>${xtremeImage("troy-race-burst", "An airbrushed motocross rider bursting through red and yellow stripes")}<div><small>THROTTLE_TROY // PRIVATEER 317</small><h1>317<br>RACING</h1><p>brake late // stay loose // look ahead</p></div>${xtremeImage("troy-number", "A mud-spattered race number plate reading 317")}</header>
        <nav><button data-nav="${XTREME_URL}">X-TREME EDGE</button><button disabled>RACE LOG</button><button disabled>PIT BOARD</button><button disabled>TRACK MAPS</button></nav>
        <section class="troy-intro">${xtremeImage("troy-portrait", "A late-90s motocross magazine photograph of Troy beside his dirt bike")}<div><h2>WELCOME TO THE 317 PIT.</h2><p>I race regional motocross, rebuild two-strokes, and try to keep my little brother Cole from testing BMX lines before the dirt has settled.</p><p>The crew talks me up too much. They also show up with shovels, cameras, spare gloves and terrible advice, so I keep them around.</p></div>${xtremeImage("troy-helmet", "Troy's red, black and yellow motocross helmet and goggles")}</section>
        <section class="troy-action">${xtremeImage("troy-action", "A grainy 35mm photograph of Troy airborne on a late-90s motocross bike")}<div><b>HEAT TWO // COPPER RIDGE</b><h2>SECOND PLACE, FIRST GOOD PHOTO</h2><p>Got buried at the start, passed three riders outside the big sweeper, then spent a lap eating my own roost. Bike ran clean. Rider needs work.</p></div></section>
        <section class="troy-cards"><article>${xtremeImage("troy-track-map", "A hand-drawn overhead map of a motocross track")}<h2>COPPER RIDGE</h2><p>Triple is rolled for practice. Outside line builds speed. Cole is forbidden from measuring it with his BMX bike.</p></article><article>${xtremeImage("troy-bike-cutaway", "A technical drawing of a late-90s two-stroke dirt bike")}<h2>BIKE NOTES</h2><p>Fresh top end, softer rear rebound, one mystery rattle that disappears when anybody competent listens.</p></article><article>${xtremeImage("troy-trophy", "A trophy, gloves and checkered pennant on a motocross workbench")}<h2>SEASON BOARD</h2><p>Two podiums, one bent lever, zero missed Sundays. Next round: Dry Lake Raceway.</p></article></section>
        <aside class="troy-bottom">${xtremeImage("troy-airborne-xerox", "A photocopied motocross jump photograph marked with red arrows")}<div><h2>COLE'S CORNER</h2><p>Yes, my brother learned tabletops in our driveway. No, he did not teach me. He did teach me that plywood ramps can become firewood without warning.</p></div>${xtremeImage("troy-gear", "Troy's muddy dirt bike, helmet and gloves in the pit")}</aside>
        <p class="xtreme-owner-note">Leave race dates, wrenching questions, or crew plans below. Keep both wheels pointed generally forward.</p>
      </main>`
  },
  [OLLIE_URL]: {
    url: OLLIE_URL,
    title: "ScootLord_Ollie's Scooter Maximum",
    site: "scooter",
    ownerId: "scootlord_ollie",
    summary: "ScootLord Ollie's loud 1999 kick-scooter homepage contains tiny wheels, hand-drawn stunt diagrams, helmet stickers, a notorious old bowl cut, relentless bragging, and friendly roasting from the whole crew.",
    commentsEnabled: true,
    seedComments: ollieComments,
    listed: true,
    hubId: "zone-xtreme",
    searchTerms: ["ScootLord Ollie", "Ollie", "scooter", "kick scooter", "tiny wheels", "stunts", "bowl cut", "Thunder Scoot", "helmet", "rail slide"],
    render: () => `
      <main class="page xtreme-user-page ollie-page">
        <header><div><small>SCOOTLORD_OLLIE'S OFFICIAL WORLD HEADQUARTERS</small><h1>SCOOTER<br>MAXIMUM!!!</h1><p>NO BRAKES* // NO FEAR** // TINY WHEELS</p></div>${xtremeImage("ollie-scooter-burst", "A hand-drawn folding kick scooter exploding from a yellow starburst")}</header>
        <nav><button data-nav="${XTREME_URL}">BACK 2 EDGE</button><button disabled>TRICK SCIENCE</button><button disabled>WIPEOUT HALL</button><button disabled>STICKER ZONE</button></nav>
        <section class="ollie-intro">${xtremeImage("ollie-portrait", "A direct-flash 1999 photo of Ollie posing in a purple and lime windbreaker")}<div><h2>THE FUTURE HAS TWO VERY SMALL WHEELS.</h2><p>I am Ollie: scooter innovator, curb scientist, and the only rider brave enough to make a folding hinge part of an extreme sport.</p><p>Dee says my deck is a bookmark. Cole says my wheels are bearings with opinions. Nico respects the wheel count. Ty lets me ride in the van. Troy says I have commitment, which means I win.</p></div>${xtremeImage("ollie-sticker-helmet", "A cartoon lime-green helmet covered in silly stickers")}</section>
        <section class="ollie-action">${xtremeImage("ollie-action", "A 35mm action photo of Ollie attempting a curb trick on a small-wheeled scooter")}<div><b>CURB ASSAULT 99</b><h2>THE MAXIMUM SCRAPE</h2><p>Jump, turn, scrape, yell, land eventually. Dee claims this is not a named trick. Dee does not control the naming committee.</p></div></section>
        <section class="ollie-cards"><article>${xtremeImage("ollie-trick-diagram", "A notebook diagram of an impossible scooter stunt")}<h2>TRICK SCIENCE</h2><p>Follow the red arrows. Ignore the arrow pointing directly into the curb. That is only one possible timeline.</p></article><article>${xtremeImage("ollie-bowlcut", "A friendly marker doodle crossing out Ollie's old bowl haircut")}<h2>HAIR ARCHIVE: SEALED</h2><p>The bowl cut reduced wind resistance. Any photographs claiming otherwise are crew propaganda.</p></article><article>${xtremeImage("ollie-rail-xerox", "A photocopied scooter rail-slide attempt with a blank speech bubble")}<h2>RAIL TEST</h2><p>The rail was too slippery, the deck was too short, and the photographer was laughing. Rematch pending.</p></article></section>
        <aside class="ollie-bottom">${xtremeImage("ollie-sticker-deck", "A scratched scooter deck covered in bright invented stickers")}<div><h2>THUNDER SCOOT 2.0</h2><p>New grips. Three extra stickers. Rear wheel only screams while turning left. Troy has declined the motor conversion.</p></div>${xtremeImage("ollie-gear", "Ollie's battered scooter, sticker helmet and backpack")}</aside>
        <p class="xtreme-owner-note">Post trick ideas and compliments below. Roasts are also compliments under Scooter Law.</p>
      </main>`
  },
  [VIKTOR_URL]: {
    url: VIKTOR_URL,
    title: "Veloce_Viktor's Riviera Velocity",
    site: "euro",
    ownerId: "veloce_viktor",
    summary: "Veloce Viktor's rarely updated late-90s European luxury homepage displays supercars, yachts, jet skis, hotel luggage, Riviera views, and an entire guestbook of people who cannot stand him.",
    commentsEnabled: true,
    seedComments: viktorComments,
    listed: true,
    hubId: "zone-xtreme",
    searchTerms: ["Veloce Viktor", "Viktor", "Riviera", "supercar", "yacht", "jet ski", "Europe", "luxury", "Mediterranean", "marina", "sports car"],
    render: () => `
      <main class="page xtreme-user-page viktor-page">
        <header><div><small>VELOCE_VIKTOR // LAST UPDATED 28 OCTOBER 1999</small><h1>RIVIERA<br>VELOCITY</h1><p>A PRIVATE INDEX OF EXCEPTIONAL MACHINES AND PLACES</p></div>${xtremeImage("viktor-watch", "A late-90s flash photograph of a gold-toned watch, sunglasses and hotel key")}</header>
        <nav><button data-nav="${XTREME_URL}">RETURN TO EDGE</button><button disabled>MOTORING</button><button disabled>AT SEA</button><button disabled>THE CALENDAR</button></nav>
        <section class="viktor-intro">${xtremeImage("viktor-portrait", "A 1999 Riviera photograph of Viktor posed beside a dark wedge-shaped sports car")}<div><h2>GOOD TASTE REQUIRES NO INTRODUCTION.</h2><p>Viktor, currently between the coast and whichever airport offers a civilized lounge. I collect moments, machines, and photographs that apparently upset people with slow modems.</p><p>I post rarely because a life worth documenting leaves little time for document maintenance. The Edge crew mistakes envy for criticism. This is natural.</p></div>${xtremeImage("viktor-luggage", "Late-90s leather luggage posed beside a grand hotel pool")}</section>
        <section class="viktor-feature">${xtremeImage("viktor-supercar", "A dark 1990s wedge-shaped supercar above a Mediterranean harbor")}<div><small>COAST ROAD // UNDISCLOSED</small><h2>THE BLUE CAR</h2><p>Borrowed for the afternoon from a family acquaintance. The road was clear. The sea behaved. The photograph required no further explanation.</p></div></section>
        <section class="viktor-cards"><article>${xtremeImage("viktor-yacht", "A white yacht anchored beside rocky Mediterranean cliffs")}<h2>AT ANCHOR</h2><p>Three days offshore. Excellent water, adequate crew, unfortunate radio reception.</p></article><article>${xtremeImage("viktor-jetskis", "Two period jet skis waiting at a late-90s marina")}<h2>HARBOR MACHINES</h2><p>For short distances and loud arrivals. Ollie has asked to trade one for a scooter.</p></article><article>${xtremeImage("viktor-convertible", "A cream late-90s convertible on a Mediterranean cliff road")}<h2>THE WHITE ROADSTER</h2><p>Beautiful steering, poor luggage space, no tolerance for Cole's muddy boots.</p></article></section>
        <aside class="viktor-bottom">${xtremeImage("viktor-yacht-wheel", "A polished yacht wheel on a teak deck at sunset")}<div><h2>NEXT UPDATE</h2><p>After the winter crossing, perhaps. Please make your complaints concise; the guestbook loads slowly from the marina.</p></div>${xtremeImage("viktor-balcony", "A white linen shirt draped over a villa balcony chair above the sea")}</aside>
        <p class="xtreme-owner-note">A guestbook is provided below. Resentment is not a substitute for punctuation.</p>
      </main>`
  }
};
