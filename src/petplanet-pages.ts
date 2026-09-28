import type { PageComment, PageDefinition } from "./types";

const PET_PLANET_URL = "web://orbitnet.local/zones/petplanet";
const CARLA_URL = "web://petplanet.zone/users/catnapcarla/home";
const RAY_URL = "web://petplanet.zone/users/fetchquestray/home";
const BEA_URL = "web://petplanet.zone/users/bunbrigadebea/home";
const HAL_URL = "web://petplanet.zone/users/hamcamhal/home";
const IRIS_URL = "web://petplanet.zone/users/iguanairis/home";
const SAM_URL = "web://petplanet.zone/users/skunkunclesam/home";

const PET_ASSETS = {
  "carla-portrait": new URL("../assets/images/pet-members/carla/portrait.png", import.meta.url).href,
  "carla-activity": new URL("../assets/images/pet-members/carla/activity.png", import.meta.url).href,
  "carla-pet": new URL("../assets/images/pet-members/carla/pet.png", import.meta.url).href,
  "ray-portrait": new URL("../assets/images/pet-members/ray/portrait.png", import.meta.url).href,
  "ray-activity": new URL("../assets/images/pet-members/ray/activity.png", import.meta.url).href,
  "ray-pet": new URL("../assets/images/pet-members/ray/pet.png", import.meta.url).href,
  "bea-portrait": new URL("../assets/images/pet-members/bea/portrait.png", import.meta.url).href,
  "bea-activity": new URL("../assets/images/pet-members/bea/activity.png", import.meta.url).href,
  "bea-pet": new URL("../assets/images/pet-members/bea/pet.png", import.meta.url).href,
  "hal-portrait": new URL("../assets/images/pet-members/hal/portrait.png", import.meta.url).href,
  "hal-activity": new URL("../assets/images/pet-members/hal/activity.png", import.meta.url).href,
  "hal-pet": new URL("../assets/images/pet-members/hal/pet.png", import.meta.url).href,
  "iris-portrait": new URL("../assets/images/pet-members/iris/portrait.png", import.meta.url).href,
  "iris-activity": new URL("../assets/images/pet-members/iris/activity.png", import.meta.url).href,
  "iris-pet": new URL("../assets/images/pet-members/iris/pet.png", import.meta.url).href,
  "sam-portrait": new URL("../assets/images/pet-members/sam/portrait.png", import.meta.url).href,
  "sam-activity": new URL("../assets/images/pet-members/sam/activity.png", import.meta.url).href,
  "sam-pet": new URL("../assets/images/pet-members/sam/pet.png", import.meta.url).href
} as const;

const PET_ARCHIVE_GIFS = {
  cat: new URL("../assets/images/archive-gifs/cat-face.gif", import.meta.url).href,
  dog: new URL("../assets/images/archive-gifs/cartoon-dog.gif", import.meta.url).href,
  "cat-sparkle": new URL("../assets/images/archive-gifs/petplanet/cat-sparkle.gif", import.meta.url).href,
  disc: new URL("../assets/images/archive-gifs/petplanet/disc-action.gif", import.meta.url).href,
  rabbit: new URL("../assets/images/archive-gifs/petplanet/rabbit-hop.gif", import.meta.url).href,
  hamster: new URL("../assets/images/archive-gifs/petplanet/hamster-loop.gif", import.meta.url).href,
  iguana: new URL("../assets/images/archive-gifs/petplanet/iguana.gif", import.meta.url).href,
  skunk: new URL("../assets/images/archive-gifs/petplanet/skunk.gif", import.meta.url).href
} as const;

const PET_WEB_GIFS = {
  cat: new URL("../gifs/cat02.gif", import.meta.url).href,
  lizard: new URL("../gifs/lizard01.gif", import.meta.url).href
} as const;

const petImage = (name: keyof typeof PET_ASSETS, alt: string, className = "") =>
  `<img class="pet-member-art ${className}" src="${PET_ASSETS[name]}" alt="${alt}">`;

const petArchiveDecoration = (className: string) => className === "carla-page"
  ? `<img class="archive-gif archive-gif-pet" src="${PET_ARCHIVE_GIFS.cat}" alt="Animated cat face">`
  : className === "ray-page"
    ? `<img class="archive-gif archive-gif-pet" src="${PET_ARCHIVE_GIFS.dog}" alt="Animated cartoon dog">`
    : "";

const petFlourish = (className: string) => {
  if (className === "carla-page") return `
    <section class="pet-page-flourish carla-scrapbook">
      <img src="${PET_ARCHIVE_GIFS["cat-sparkle"]}" alt="" aria-hidden="true">
      <p><b>MR. BOOTS APPROVED!</b><br>Best viewed while somebody else needs the chair.</p>
      <details><summary>open the confidential employee file</summary><p>NAME: Mr. Boots<br>DEPARTMENT: Warm Laundry<br>YEARS OF SERVICE: 7<br>KEYBOARD SKILLS: disruptive</p></details>
    </section>`;
  if (className === "ray-page") return `
    <section class="pet-page-flourish ray-scoreboard">
      <img src="${PET_ARCHIVE_GIFS.disc}" alt="Animated flying disc">
      <div><small>BACKYARD SPORTS NETWORK</small><b>COMET 11</b><span>HEDGE 1</span></div>
      <details><summary>INSTANT REPLAY: THROW 12</summary><p>Good launch. Strong pursuit. Disc disappeared behind the hedge. Camera operator blamed.</p></details>
    </section>`;
  if (className === "bea-page") return `
    <details class="pet-page-flourish bea-burrow-map">
      <summary><img src="${PET_ARCHIVE_GIFS.rabbit}" alt=""> unroll the Bun Brigade floor plan</summary>
      <div><span>ENTRANCE BOX</span><i>➜</i><span>PARSLEY COURT</span><i>➜</i><span>SECRET SIDE DOOR</span></div>
      <p>Maple planned the main route. Mochi added the side door during construction.</p>
    </details>`;
  if (className === "hal-page") return `
    <section class="pet-page-flourish hal-telemetry">
      <div class="hal-status-lights"><i></i><i></i><i></i><i></i></div>
      <img src="${PET_ARCHIVE_GIFS.hamster}" alt="Animated hamster in a teacup">
      <details><summary>ACCESS LIVE TUBENET TELEMETRY</summary><pre>NODE 01  ONLINE
WHEEL RPM  42
CHEEK LOAD  87%
ROUTE      UNPREDICTABLE</pre></details>
    </section>`;
  if (className === "iris-page") return `
    <details class="pet-page-flourish iris-green-room">
      <summary><img src="${PET_ARCHIVE_GIFS.iguana}" alt="Animated iguana"> GOMEZ'S GREEN-ROOM RIDER</summary>
      <p>One warm branch. One quiet room. Collard greens without mystery dressing. No surprise shoulder appearances. Photographer may admire from over there.</p>
    </details>`;
  return `
    <details class="pet-page-flourish sam-incident-file">
      <summary><img src="${PET_ARCHIVE_GIFS.skunk}" alt="Animated cartoon skunk"> UNSEAL INCIDENT REPORT 031</summary>
      <p><b>LOCATION:</b> cereal cabinet<br><b>MISSING:</b> one wooden spoon<br><b>SUSPECT:</b> asleep in floral bed<br><b>CASE STATUS:</b> extremely open</p>
    </details>`;
};

const petWebDecoration = (className: string) => {
  if (className === "carla-page") return `<img class="personal-web-gif carla-web-cat" src="${PET_WEB_GIFS.cat}" alt="Animated cat">`;
  if (className === "iris-page") return `<img class="personal-web-gif iris-web-lizard" src="${PET_WEB_GIFS.lizard}" alt="Animated lizard">`;
  return "";
};

const seed = (
  id: string,
  pageUrl: string,
  ownerId: string,
  role: PageComment["role"],
  author: string,
  text: string,
  createdAt: string
): PageComment => ({ id, pageUrl, ownerId, role, author, text, createdAt, revealAfterVisit: 0 });

export const petPlanetMembers = [
  {
    url: CARLA_URL,
    handle: "CatNap_Carla",
    title: "Mr. Boots Owns This Page",
    description: "Orange-tabby glamour shots, keyboard naps, laundry-basket reports, and one human assistant.",
    pets: "MR. BOOTS / CAT",
    className: "carla"
  },
  {
    url: RAY_URL,
    handle: "FetchQuest_Ray",
    title: "Comet's Backyard Adventure",
    description: "Flying-disc records, muddy-pool photos, trick logs, and golden-retriever enthusiasm.",
    pets: "COMET / DOG",
    className: "ray"
  },
  {
    url: BEA_URL,
    handle: "BunBrigade_Bea",
    title: "The Bun Brigade Burrow",
    description: "Two lop rabbits, cardboard architecture, parsley reviews, and aggressively gentle housekeeping.",
    pets: "MAPLE + MOCHI / RABBITS",
    className: "bea"
  },
  {
    url: HAL_URL,
    handle: "HamCam_Hal",
    title: "Widget's TubeNet",
    description: "One hamster, seventeen habitat modules, maze telemetry, and several unnecessary charts.",
    pets: "WIDGET / HAMSTER",
    className: "hal"
  },
  {
    url: IRIS_URL,
    handle: "Iguana_Iris",
    title: "Gomez in the Green Room",
    description: "A giant iguana, a giant terrarium, basking reports, leafy meals, and reptile reality checks.",
    pets: "GOMEZ / GREEN IGUANA",
    className: "iris"
  },
  {
    url: SAM_URL,
    handle: "SkunkUncle_Sam",
    title: "Pepper's Cabinet Patrol",
    description: "Life with a domestic skunk: naps, cupboard inspections, supervised yard time, and no dignity.",
    pets: "PEPPER / DOMESTIC SKUNK",
    className: "sam"
  }
] as const;

const carlaComments: PageComment[] = [
  seed("carla-ray-1", CARLA_URL, "catnap_carla", "visitor", "FetchQuest_Ray", "Comet wants to know whether Mr. Boots ever leaves the laundry basket voluntarily.", "1999-11-01T18:12:00"),
  seed("carla-owner-1", CARLA_URL, "catnap_carla", "owner", "CatNap_Carla", "Mr. Boots leaves when the warm laundry becomes regular laundry. Standards must be maintained.", "1999-11-01T18:19:00"),
  seed("carla-bea-1", CARLA_URL, "catnap_carla", "visitor", "BunBrigade_Bea", "That keyboard nap is magnificent. Maple sleeps on my tax folder with the same authority.", "1999-11-02T10:42:00"),
  seed("carla-hal-1", CARLA_URL, "catnap_carla", "visitor", "HamCam_Hal", "Has Mr. Boots ever activated a function key? I am collecting accidental-computing data.", "1999-11-02T20:14:00"),
  seed("carla-iris-1", CARLA_URL, "catnap_carla", "visitor", "Iguana_Iris", "He looks judgmental. Gomez approves of this management style.", "1999-11-03T16:07:00"),
  seed("carla-sam-1", CARLA_URL, "catnap_carla", "visitor", "SkunkUncle_Sam", "Pepper also believes laundry baskets are reserved seating. We may need a summit.", "1999-11-03T18:31:00")
];

const rayComments: PageComment[] = [
  seed("ray-carla-1", RAY_URL, "fetchquest_ray", "visitor", "CatNap_Carla", "A very handsome muddy gentleman. Please tell him I admire the commitment and fear the carpet.", "1999-11-01T19:04:00"),
  seed("ray-owner-1", RAY_URL, "fetchquest_ray", "owner", "FetchQuest_Ray", "The carpet survived. Mom says that is not the same as being clean.", "1999-11-01T19:13:00"),
  seed("ray-bea-1", RAY_URL, "fetchquest_ray", "visitor", "BunBrigade_Bea", "Comet's disc catch is excellent. The Bun Brigade requests a demonstration from behind a secure gate.", "1999-11-02T11:23:00"),
  seed("ray-hal-1", RAY_URL, "fetchquest_ray", "visitor", "HamCam_Hal", "Estimated disc altitude: four feet. Estimated Widget courage at four feet: unavailable.", "1999-11-02T20:41:00"),
  seed("ray-sam-1", RAY_URL, "fetchquest_ray", "visitor", "SkunkUncle_Sam", "Pepper can retrieve socks but refuses to return them. Does that count as half a fetch?", "1999-11-03T17:22:00"),
  seed("ray-iris-1", RAY_URL, "fetchquest_ray", "visitor", "Iguana_Iris", "Gomez watched the action photo for nearly a minute. That is basically a standing ovation.", "1999-11-03T19:03:00")
];

const beaComments: PageComment[] = [
  seed("bea-carla-1", BEA_URL, "bunbrigade_bea", "visitor", "CatNap_Carla", "Please inform Maple and Mochi that their parsley presentation is five-star dining.", "1999-11-01T17:31:00"),
  seed("bea-owner-1", BEA_URL, "bunbrigade_bea", "owner", "BunBrigade_Bea", "They accepted the review and immediately ate the garnish.", "1999-11-01T17:39:00"),
  seed("bea-ray-1", BEA_URL, "bunbrigade_bea", "visitor", "FetchQuest_Ray", "That tunnel course rules. Comet would fit his head into the first box and declare victory.", "1999-11-02T15:11:00"),
  seed("bea-hal-1", BEA_URL, "bunbrigade_bea", "visitor", "HamCam_Hal", "Your cardboard architecture is elegant. Widget requests the blueprints at one-twelfth scale.", "1999-11-02T21:06:00"),
  seed("bea-iris-1", BEA_URL, "bunbrigade_bea", "visitor", "Iguana_Iris", "Excellent greens. Gomez would like to subscribe to the catering list.", "1999-11-03T16:44:00"),
  seed("bea-sam-1", BEA_URL, "bunbrigade_bea", "visitor", "SkunkUncle_Sam", "Pepper is banned from cardboard engineering after the Great Cereal Box Incident.", "1999-11-03T18:52:00")
];

const halComments: PageComment[] = [
  seed("hal-ray-1", HAL_URL, "hamcam_hal", "visitor", "FetchQuest_Ray", "Hal, that habitat has more loading zones than OrbitNet.", "1999-11-01T20:08:00"),
  seed("hal-owner-1", HAL_URL, "hamcam_hal", "owner", "HamCam_Hal", "Correct. Widget's commute is now six seconds shorter in the east tube.", "1999-11-01T20:17:00"),
  seed("hal-carla-1", HAL_URL, "hamcam_hal", "visitor", "CatNap_Carla", "Mr. Boots has stared at the tube photograph for ten minutes. Please increase security.", "1999-11-02T09:21:00"),
  seed("hal-bea-1", HAL_URL, "hamcam_hal", "visitor", "BunBrigade_Bea", "The maze is lovely, but does Widget receive a snack for participating in your research program?", "1999-11-02T11:52:00"),
  seed("hal-iris-1", HAL_URL, "hamcam_hal", "visitor", "Iguana_Iris", "A timer, three charts, and one hamster ignoring all variables. Science is alive.", "1999-11-03T15:48:00"),
  seed("hal-sam-1", HAL_URL, "hamcam_hal", "visitor", "SkunkUncle_Sam", "Can you build a Pepper-proof cabinet latch? Asking after a difficult breakfast.", "1999-11-03T17:58:00")
];

const irisComments: PageComment[] = [
  seed("iris-carla-1", IRIS_URL, "iguana_iris", "visitor", "CatNap_Carla", "Gomez is a magnificent gentleman. Mr. Boots requests the warmest available chair near his lamp.", "1999-11-01T16:18:00"),
  seed("iris-owner-1", IRIS_URL, "iguana_iris", "owner", "Iguana_Iris", "Application denied. Cats are mostly teeth wearing pajamas.", "1999-11-01T16:27:00"),
  seed("iris-bea-1", IRIS_URL, "iguana_iris", "visitor", "BunBrigade_Bea", "The terrarium looks wonderful. I appreciate the climbing room and the salad portions.", "1999-11-02T12:33:00"),
  seed("iris-hal-1", IRIS_URL, "iguana_iris", "visitor", "HamCam_Hal", "Basking duration appears optimal. Widget would need a much smaller spreadsheet.", "1999-11-02T20:22:00"),
  seed("iris-ray-1", IRIS_URL, "iguana_iris", "visitor", "FetchQuest_Ray", "Comet wants to play. I have explained that Gomez's preferred game is remaining exactly there.", "1999-11-03T17:01:00"),
  seed("iris-sam-1", IRIS_URL, "iguana_iris", "visitor", "SkunkUncle_Sam", "Pepper respects any animal whose main hobby is staring from high ground.", "1999-11-03T19:17:00")
];

const samComments: PageComment[] = [
  seed("sam-carla-1", SAM_URL, "skunkuncle_sam", "visitor", "CatNap_Carla", "Pepper is adorable. Mr. Boots says the cupboard behavior is amateur, but he is jealous.", "1999-11-01T18:44:00"),
  seed("sam-owner-1", SAM_URL, "skunkuncle_sam", "owner", "SkunkUncle_Sam", "Pepper accepts the compliment and has stolen a wooden spoon in celebration.", "1999-11-01T18:53:00"),
  seed("sam-ray-1", SAM_URL, "skunkuncle_sam", "visitor", "FetchQuest_Ray", "Does Pepper fetch? I have a tennis ball and several extremely cautious questions.", "1999-11-02T16:02:00"),
  seed("sam-bea-1", SAM_URL, "skunkuncle_sam", "visitor", "BunBrigade_Bea", "The floral bed is perfect. Please tell Pepper the Bun Brigade recognizes superior napping technique.", "1999-11-02T18:15:00"),
  seed("sam-hal-1", SAM_URL, "skunkuncle_sam", "visitor", "HamCam_Hal", "I have drafted Cabinet Latch Revision Four. Revision Three underestimated lateral persistence.", "1999-11-03T14:39:00"),
  seed("sam-iris-1", SAM_URL, "skunkuncle_sam", "visitor", "Iguana_Iris", "Weird pet owners' meeting Friday? No demonstrations, no shoulder swaps.", "1999-11-03T19:34:00")
];

const pageTemplate = ({
  className,
  eyebrow,
  title,
  subtitle,
  introTitle,
  intro,
  featureTitle,
  feature,
  facts,
  ownerNote,
  portrait,
  activity,
  pet,
  portraitAlt,
  activityAlt,
  petAlt
}: {
  className: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  introTitle: string;
  intro: string;
  featureTitle: string;
  feature: string;
  facts: [string, string, string];
  ownerNote: string;
  portrait: keyof typeof PET_ASSETS;
  activity: keyof typeof PET_ASSETS;
  pet: keyof typeof PET_ASSETS;
  portraitAlt: string;
  activityAlt: string;
  petAlt: string;
}) => `
  <main class="page pet-member-page ${className}">
    <header><small>${eyebrow}</small><h1>${title}</h1><p>${subtitle}</p></header>
    <nav><button data-nav="${PET_PLANET_URL}">&lt; PET PLANET</button></nav>
    ${petArchiveDecoration(className)}
    ${petFlourish(className)}
    ${petWebDecoration(className)}
    <section class="pet-member-intro">${petImage(portrait, portraitAlt)}<div><h2>${introTitle}</h2><p>${intro}</p></div></section>
    <section class="pet-member-feature">${petImage(activity, activityAlt)}<div><small>NEW PHOTO // NOVEMBER 1999</small><h2>${featureTitle}</h2><p>${feature}</p></div></section>
    <section class="pet-member-facts"><article><b>01</b><h2>FAVORITE THING</h2><p>${facts[0]}</p></article><article><b>02</b><h2>STRANGEST HABIT</h2><p>${facts[1]}</p></article><article><b>03</b><h2>HOUSE RULE</h2><p>${facts[2]}</p></article></section>
    <aside class="pet-member-closeup">${petImage(pet, petAlt)}<div><h2>OFFICIAL PET PORTRAIT</h2><p>${ownerNote}</p></div></aside>
    <p class="pet-member-owner-note">Leave pet stories, questions, and respectful admiration below.</p>
  </main>`;

export const petPlanetPages: Record<string, PageDefinition> = {
  [CARLA_URL]: {
    url: CARLA_URL,
    title: "CatNap_Carla - Mr. Boots Owns This Page",
    site: "petcat",
    ownerId: "catnap_carla",
    summary: "Carla's late-90s cat shrine documents Mr. Boots, a large orange tabby who sleeps on keyboards, occupies laundry baskets, and supervises the household.",
    commentsEnabled: true,
    seedComments: carlaComments,
    listed: true,
    hubId: "zone-petplanet",
    searchTerms: ["CatNap Carla", "Mr Boots", "orange tabby", "cat", "cats", "keyboard cat", "laundry basket", "cat photos"],
    render: () => pageTemplate({
      className: "carla-page",
      eyebrow: "CATNAP_CARLA'S HOME ON THE WEB",
      title: "MR. BOOTS OWNS THIS PAGE",
      subtitle: "I only type here when the management permits it.",
      introTitle: "MEET THE BOSS",
      intro: "Mr. Boots is seven years old, eighteen pounds, and certain that every soft object was purchased for him. I am Carla, his typist, cook, and door attendant.",
      featureTitle: "THE GREAT KEYBOARD NAP",
      feature: "He discovered the warm computer keyboard and sent half an email to my sister. She says it was his most concise correspondence.",
      facts: ["Warm laundry, tuna water, and the exact chair somebody else intended to use.", "Sits outside closed doors, then loses interest the instant they open.", "Never move a sleeping cat unless you are prepared for a formal complaint."],
      ownerNote: "Portrait taken after the towels came out of the dryer. The basket was unavailable for human laundry for two hours.",
      portrait: "carla-portrait",
      activity: "carla-activity",
      pet: "carla-pet",
      portraitAlt: "A 1999 flash photograph of Carla holding her large orange tabby Mr. Boots",
      activityAlt: "Mr. Boots asleep across a beige computer keyboard",
      petAlt: "Mr. Boots sitting proudly inside a laundry basket"
    })
  },
  [RAY_URL]: {
    url: RAY_URL,
    title: "FetchQuest_Ray - Comet's Backyard Adventure",
    site: "petdog",
    ownerId: "fetchquest_ray",
    summary: "Ray's golden-retriever homepage tracks Comet's flying-disc catches, backyard tricks, muddy pool adventures, snacks, and neighborhood friendships.",
    commentsEnabled: true,
    seedComments: rayComments,
    listed: true,
    hubId: "zone-petplanet",
    searchTerms: ["FetchQuest Ray", "Comet", "golden retriever", "dog", "puppy", "flying disc", "fetch", "muddy dog", "backyard"],
    render: () => pageTemplate({
      className: "ray-page",
      eyebrow: "FETCHQUEST_RAY'S BACKYARD BASE",
      title: "COMET'S BACKYARD ADVENTURE",
      subtitle: "One dog. One disc. Approximately nine thousand throws.",
      introTitle: "PLAYER TWO HAS FOUR PAWS",
      intro: "I'm Ray and this is Comet, the fastest retriever on our street according to an extremely fair survey of me and Comet. He knows sit, stay, spin, and find whichever shoe Dad needs.",
      featureTitle: "THE RED DISC RECORD",
      feature: "Comet caught eleven throws in a row. Throw twelve landed in the hedge and has been removed from the official statistics.",
      facts: ["The red flying disc, tennis balls, garden hoses, and anybody carrying toast.", "Enters the kiddie pool clean and exits somehow covered in mud.", "Dry dog before living-room victory lap. This rule is aspirational."],
      ownerNote: "This was after the pool incident. Comet regretted nothing and the hose made everything worse.",
      portrait: "ray-portrait",
      activity: "ray-activity",
      pet: "ray-pet",
      portraitAlt: "A 1999 backyard photograph of Ray kneeling beside his golden retriever Comet",
      activityAlt: "Comet catching a red flying disc over suburban grass",
      petAlt: "A delighted muddy Comet standing beside a blue kiddie pool"
    })
  },
  [BEA_URL]: {
    url: BEA_URL,
    title: "BunBrigade_Bea - The Bun Brigade Burrow",
    site: "petrabbit",
    ownerId: "bunbrigade_bea",
    summary: "Bea's rabbit homepage features Maple and Mochi, two lop rabbits who explore cardboard tunnels, eat parsley, rearrange blankets, and judge household architecture.",
    commentsEnabled: true,
    seedComments: beaComments,
    listed: true,
    hubId: "zone-petplanet",
    searchTerms: ["BunBrigade Bea", "Maple", "Mochi", "rabbit", "rabbits", "bunny", "lop rabbit", "parsley", "cardboard tunnel"],
    render: () => pageTemplate({
      className: "bea-page",
      eyebrow: "BUNBRIGADE_BEA'S SOFT LITTLE CORNER",
      title: "THE BUN BRIGADE BURROW",
      subtitle: "Maple + Mochi // architects, gardeners, professional loafs",
      introTitle: "TWO RABBITS, MANY OPINIONS",
      intro: "Maple is brown, bold, and first to inspect everything. Mochi is white and gray, cautious, and usually correct. I'm Bea, provider of greens and rebuilder of cardboard property.",
      featureTitle: "TUNNEL DISTRICT OPENS",
      feature: "Three boxes, four doors, one paper-towel bridge. Maple approved the doorway size. Mochi began an unlicensed side entrance.",
      facts: ["Parsley stems, willow toys, clean blankets, and boxes with at least two exits.", "Rearrange every folded towel into a less folded towel.", "Cords stay covered, greens stay fresh, and nobody gets picked up without warning."],
      ownerNote: "Official parsley portrait. They ate the entire arrangement before I could take a second picture.",
      portrait: "bea-portrait",
      activity: "bea-activity",
      pet: "bea-pet",
      portraitAlt: "A 1999 bedroom portrait of Bea holding two lop-eared rabbits",
      activityAlt: "Maple and Mochi exploring a homemade cardboard tunnel course",
      petAlt: "Two lop rabbits sharing parsley from a ceramic plate"
    })
  },
  [HAL_URL]: {
    url: HAL_URL,
    title: "HamCam_Hal - Widget's TubeNet",
    site: "pethamster",
    ownerId: "hamcam_hal",
    summary: "Hal's overengineered hamster homepage records Widget's tube habitat, seed preferences, cardboard-maze times, cheek capacity, and unnecessary performance statistics.",
    commentsEnabled: true,
    seedComments: halComments,
    listed: true,
    hubId: "zone-petplanet",
    searchTerms: ["HamCam Hal", "Widget", "hamster", "Syrian hamster", "hamster tubes", "maze", "habitat", "small pet", "cheeks"],
    render: () => pageTemplate({
      className: "hal-page",
      eyebrow: "HAMCAM_HAL LABORATORY NODE 01",
      title: "WIDGET'S TUBENET",
      subtitle: "Habitat telemetry for one very small systems administrator.",
      introTitle: "WELCOME TO THE NETWORK",
      intro: "Widget is a golden Syrian hamster. I am Hal, habitat technician and data enthusiast. TubeNet currently contains seventeen modules, four junctions, and one resident who ignores the route map.",
      featureTitle: "MAZE TRIAL 14-B",
      feature: "Widget reached the sunflower-seed chamber in forty-three seconds, paused to wash his face, then exited through a wall not intended as an exit.",
      facts: ["Sunflower seeds in moderation, cardboard tubes, quiet evenings, and defeating my predictions.", "Stores food in one module, bedding in another, and one mystery paper scrap in both.", "Widget sleeps during daylight. HamCam research hours respect the principal investigator."],
      ownerNote: "Cheek-capacity trial ended when Widget achieved his personal objective and left the experiment.",
      portrait: "hal-portrait",
      activity: "hal-pet",
      pet: "hal-activity",
      portraitAlt: "A 1999 flash photograph of Hal beside Widget's elaborate hamster habitat",
      activityAlt: "Hal timing Widget inside a large handmade cardboard maze",
      petAlt: "A golden hamster holding a sunflower seed with full cheeks"
    })
  },
  [IRIS_URL]: {
    url: IRIS_URL,
    title: "Iguana_Iris - Gomez in the Green Room",
    site: "petiguana",
    ownerId: "iguana_iris",
    summary: "Iris's reptile homepage documents Gomez the green iguana, his roomy terrarium, basking schedule, leafy diet, climbing habits, and the realities of exotic-pet care.",
    commentsEnabled: true,
    seedComments: irisComments,
    listed: true,
    hubId: "zone-petplanet",
    searchTerms: ["Iguana Iris", "Gomez", "green iguana", "iguana", "reptile", "lizard", "terrarium", "basking", "exotic pet"],
    render: () => pageTemplate({
      className: "iris-page",
      eyebrow: "IGUANA_IRIS PRESENTS // THE GREEN ROOM",
      title: "GOMEZ",
      subtitle: "Ancient expression. Modern heat lamp. Surprisingly fussy salad.",
      introTitle: "NOT A BEGINNER'S DINOSAUR",
      intro: "Gomez is a large green iguana with a calm disposition and a dramatic profile. I'm Iris. I built his climbing room, prepare his greens, and explain weekly that he is not interested in becoming somebody's shoulder accessory.",
      featureTitle: "BASKING STATUS: ABSOLUTE",
      feature: "Gomez spent the afternoon under his lamp, moved two inches, and stared through me. A productive reptile day.",
      facts: ["Warm branches, collard greens, quiet observation, and being taller than the furniture.", "Rejects one leaf from every bowl for reasons known only to him.", "Respect the tail, support the body, and never confuse stillness with permission."],
      ownerNote: "Lunch was accepted after a six-minute inspection. The rejected leaf remains under review.",
      portrait: "iris-portrait",
      activity: "iris-activity",
      pet: "iris-pet",
      portraitAlt: "A 1999 flash portrait of Iris with a large green iguana resting across her shoulders",
      activityAlt: "Gomez basking on a branch in a roomy wood-and-glass terrarium",
      petAlt: "Iris offering leafy greens to Gomez at a kitchen table"
    })
  },
  [SAM_URL]: {
    url: SAM_URL,
    title: "SkunkUncle_Sam - Pepper's Cabinet Patrol",
    site: "petskunk",
    ownerId: "skunkuncle_sam",
    summary: "Sam's strange domestic-skunk homepage follows Pepper's supervised yard time, kitchen-cabinet inspections, floral-bed naps, spoon theft, and household negotiations.",
    commentsEnabled: true,
    seedComments: samComments,
    listed: true,
    hubId: "zone-petplanet",
    searchTerms: ["SkunkUncle Sam", "Pepper", "skunk", "domestic skunk", "exotic pet", "unusual pet", "cabinet", "striped animal", "pet skunk"],
    render: () => pageTemplate({
      className: "sam-page",
      eyebrow: "SKUNKUNCLE_SAM'S HOUSEHOLD FIELD NOTES",
      title: "PEPPER'S CABINET PATROL",
      subtitle: "Domestic skunk. Amateur locksmith. Floral-bed enthusiast.",
      introTitle: "YES, PEPPER LIVES HERE",
      intro: "Pepper is a legally kept domestic skunk, not a wild visitor and not a prank. I'm Sam. I provide supervised yard time, puzzle toys, secure cabinets, and explanations to every delivery person.",
      featureTitle: "CUPBOARD INSPECTION 31",
      feature: "Pepper opened the cereal cabinet, rejected the cereal, removed one wooden spoon, and went to sleep. Motive remains unclear.",
      facts: ["Dig boxes, puzzle feeders, clean towels, and any latch I have not improved yet.", "Carries wooden spoons into rooms where no spoon business is occurring.", "Never approach wild skunks. Pepper's life is unusual, supervised, and very specifically domestic."],
      ownerNote: "Pepper selected this floral bed over three expensive alternatives. Pattern confidence recognizes pattern confidence.",
      portrait: "sam-portrait",
      activity: "sam-activity",
      pet: "sam-pet",
      portraitAlt: "A 1999 backyard portrait of Sam carefully holding his domestic skunk Pepper",
      activityAlt: "Pepper investigating open kitchen cupboards while Sam watches",
      petAlt: "Pepper curled asleep in a floral pet bed beside a wood-paneled wall"
    })
  }
};
