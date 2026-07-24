import type { PageComment, PageDefinition } from "./types";

const ASSETS = {
  rewindLogo: new URL("../assets/images/filler-business/rewind-logo.png", import.meta.url).href,
  rewindLighthouse: new URL("../assets/images/filler-business/rewind-lighthouse.png", import.meta.url).href,
  rewindCard: new URL("../assets/images/filler-business/rewind-card.png", import.meta.url).href,
  rewindStore: new URL("../assets/images/filler-business/rewind-store.png", import.meta.url).href,
  rewindShelves: new URL("../assets/images/filler-business/rewind-shelves.png", import.meta.url).href,
  rewindCounter: new URL("../assets/images/filler-business/rewind-counter.png", import.meta.url).href,
  bubbleLogo: new URL("../assets/images/filler-business/bubble-logo.png", import.meta.url).href,
  bubbleSock: new URL("../assets/images/filler-business/bubble-sock.png", import.meta.url).href,
  bubbleScoop: new URL("../assets/images/filler-business/bubble-scoop.png", import.meta.url).href,
  bubbleStore: new URL("../assets/images/filler-business/bubble-store.png", import.meta.url).href,
  bubbleWashers: new URL("../assets/images/filler-business/bubble-washers.png", import.meta.url).href,
  bubbleFolded: new URL("../assets/images/filler-business/bubble-folded.png", import.meta.url).href,
  snapdragonLogo: new URL("../assets/images/filler-business/snapdragon-logo.png", import.meta.url).href,
  snapdragonBouquet: new URL("../assets/images/filler-business/snapdragon-bouquet.png", import.meta.url).href,
  snapdragonStore: new URL("../assets/images/filler-business/snapdragon-store.png", import.meta.url).href,
  snapdragonBouquetPhoto: new URL("../assets/images/filler-business/snapdragon-bouquet-photo.png", import.meta.url).href,
  snapdragonDelivery: new URL("../assets/images/filler-business/snapdragon-delivery.png", import.meta.url).href,
  farawayLogo: new URL("../assets/images/filler-business/faraway-logo.png", import.meta.url).href,
  farawayPostcards: new URL("../assets/images/filler-business/faraway-postcards.png", import.meta.url).href,
  farawayOffice: new URL("../assets/images/filler-business/faraway-office.png", import.meta.url).href,
  farawayBrochures: new URL("../assets/images/filler-business/faraway-brochures.png", import.meta.url).href,
  inkmothLogo: new URL("../assets/images/filler-business/inkmoth-logo.png", import.meta.url).href,
  inkmothMascot: new URL("../assets/images/filler-business/inkmoth-mascot.png", import.meta.url).href,
  inkmothStore: new URL("../assets/images/filler-business/inkmoth-store.png", import.meta.url).href,
  inkmothMachines: new URL("../assets/images/filler-business/inkmoth-machines.png", import.meta.url).href,
  inkmothFlyers: new URL("../assets/images/filler-business/inkmoth-flyers.png", import.meta.url).href,
  sofaLogo: new URL("../assets/images/filler-business/sofa-logo.png", import.meta.url).href,
  sofaRecliner: new URL("../assets/images/filler-business/sofa-recliner.png", import.meta.url).href,
  sofaSale: new URL("../assets/images/filler-business/sofa-sale.png", import.meta.url).href,
  sofaShowroom: new URL("../assets/images/filler-business/sofa-showroom.png", import.meta.url).href,
  sofaReclinerPhoto: new URL("../assets/images/filler-business/sofa-recliner-photo.png", import.meta.url).href,
  sofaDelivery: new URL("../assets/images/filler-business/sofa-delivery.png", import.meta.url).href,
  molarLogo: new URL("../assets/images/filler-business/molar-logo.png", import.meta.url).href,
  molarMascot: new URL("../assets/images/filler-business/molar-mascot.png", import.meta.url).href,
  molarWaiting: new URL("../assets/images/filler-business/molar-waiting.png", import.meta.url).href,
  molarChair: new URL("../assets/images/filler-business/molar-chair.png", import.meta.url).href,
  gurgleLogo: new URL("../assets/images/filler-business/gurgle-logo.png", import.meta.url).href,
  gurgleMascot: new URL("../assets/images/filler-business/gurgle-mascot.png", import.meta.url).href,
  gurgleVan: new URL("../assets/images/filler-business/gurgle-van.png", import.meta.url).href,
  gurgleRepair: new URL("../assets/images/filler-business/gurgle-repair.png", import.meta.url).href,
  neighbornestLogo: new URL("../assets/images/filler-business/neighbornest-logo.png", import.meta.url).href,
  neighbornestSeal: new URL("../assets/images/filler-business/neighbornest-seal.png", import.meta.url).href,
  neighbornestCheckbook: new URL("../assets/images/filler-business/neighbornest-checkbook.png", import.meta.url).href,
  neighbornestBranch: new URL("../assets/images/filler-business/neighbornest-branch.png", import.meta.url).href,
  neighbornestTeller: new URL("../assets/images/filler-business/neighbornest-teller.png", import.meta.url).href,
  haloLogo: new URL("../assets/images/filler-business/halo-logo.png", import.meta.url).href,
  haloHair: new URL("../assets/images/filler-business/halo-hair.png", import.meta.url).href,
  haloPriceArt: new URL("../assets/images/filler-business/halo-price-art.png", import.meta.url).href,
  haloStore: new URL("../assets/images/filler-business/halo-store.png", import.meta.url).href,
  haloInterior: new URL("../assets/images/filler-business/halo-interior.png", import.meta.url).href
} as const;

type BusinessSite =
  | "rewindbusiness" | "laundrybusiness" | "floristbusiness" | "travelbusiness" | "copybusiness"
  | "furniturebusiness" | "dentalbusiness" | "plumbingbusiness" | "creditbusiness" | "salonbusiness";

interface BusinessSpec {
  id: string;
  url: string;
  site: BusinessSite;
  ownerId: string;
  ownerName: string;
  name: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  searchTerms: string[];
  description: string;
  offerings: string[];
  hours: string;
  address: string;
  phone: string;
  logo: string;
  accent: string;
  hero: { src: string; alt: string };
  gallery: Array<{ src: string; alt: string }>;
  visitor: { author: string; text: string };
  reply: string;
}

const seed = (spec: BusinessSpec): PageComment[] => [
  {
    id: `${spec.id}-seed-question`,
    pageUrl: spec.url,
    ownerId: spec.ownerId,
    role: "visitor",
    author: spec.visitor.author,
    text: spec.visitor.text,
    createdAt: "1999-11-02T16:20:00",
    revealAfterVisit: 0
  },
  {
    id: `${spec.id}-seed-reply`,
    pageUrl: spec.url,
    ownerId: spec.ownerId,
    role: "owner",
    author: spec.ownerName,
    text: spec.reply,
    createdAt: "1999-11-02T17:04:00",
    revealAfterVisit: 0
  }
];

const specs: BusinessSpec[] = [
  {
    id: "rewind", url: "web://rewindharbor.video/home", site: "rewindbusiness", ownerId: "rewind_riley", ownerName: "RewindRiley",
    name: "Rewind Harbor Video", eyebrow: "YOUR NEIGHBORHOOD MOVIE PORT", tagline: "Take something home for the night.",
    summary: "Rewind Harbor is a neighborhood VHS rental shop with new releases, five-night favorites, staff picks, and a forgiving rewind policy.",
    searchTerms: ["video", "video rental", "movie", "movies", "VHS", "tape", "rental", "new release", "horror", "comedy"],
    description: "Our shelves hold new releases, old favorites, odd imports, cartoons, exercise tapes, and three movies Riley insists are documentaries. Membership takes one card and a local phone number.",
    offerings: ["New releases: $3.49 for two nights", "Harbor Favorites: $1.49 for five nights", "Kids tapes: two for $2 every Tuesday"],
    hours: "Mon–Thu 11–9 · Fri–Sat 11–11 · Sun noon–8", address: "18 Beacon Plaza, Dynamo City", phone: "555-0148",
    logo: ASSETS.rewindLogo, accent: ASSETS.rewindLighthouse,
    hero: { src: ASSETS.rewindStore, alt: "Rewind Harbor's small video storefront at dusk" },
    gallery: [
      { src: ASSETS.rewindShelves, alt: "Rows of fictional VHS rentals" },
      { src: ASSETS.rewindCounter, alt: "Riley at the rental counter" },
      { src: ASSETS.rewindCard, alt: "Rewind Harbor membership-card art" }
    ],
    visitor: { author: "TapeDeck_Ted", text: "Do you still have Chrome Harbor Part II or did somebody keep it again?" },
    reply: "It came back without the case, Ted. I put it behind the counter with a handwritten one."
  },
  {
    id: "bubble", url: "web://bubbleborough.com/home", site: "laundrybusiness", ownerId: "bubble_babs", ownerName: "BubbleBabs",
    name: "Bubble Borough Laundromat", eyebrow: "WASH · DRY · FOLD · FIND THAT OTHER SOCK", tagline: "The cleanest hour you can spend with a magazine.",
    summary: "Bubble Borough is a coin laundromat with big washers, long dryers, drop-off folding, detergent cups, and an optimistic lost-sock basket.",
    searchTerms: ["laundry", "laundromat", "wash", "washer", "dryer", "clothes", "drop off", "folding", "detergent"],
    description: "Twenty-two washers, eighteen dryers, three folding tables, one change machine, and Babs behind the counter until close. Last wash starts forty-five minutes before closing.",
    offerings: ["Standard wash: $1.25", "Big blanket washer: $2.75", "Wash-dry-fold service: 75¢ per pound"],
    hours: "Daily 7 AM–10 PM", address: "440 Belltower Avenue", phone: "555-0220",
    logo: ASSETS.bubbleLogo, accent: ASSETS.bubbleSock,
    hero: { src: ASSETS.bubbleWashers, alt: "Rows of Bubble Borough coin-operated washers" },
    gallery: [
      { src: ASSETS.bubbleStore, alt: "Bubble Borough's blue-awning storefront" },
      { src: ASSETS.bubbleFolded, alt: "Folded towels and the lost-sock basket" },
      { src: ASSETS.bubbleScoop, alt: "Bubble Borough detergent-scoop clip art" }
    ],
    visitor: { author: "SoccerDad77", text: "Did anyone turn in one tiny red sock with a soccer ball on it?" },
    reply: "It is on the corkboard beside the vending machine. At this point that sock has more regular customers than I do."
  },
  {
    id: "snapdragon", url: "web://snapdragonstring.floral/home", site: "floristbusiness", ownerId: "petal_pat", ownerName: "PetalPat",
    name: "Snapdragon & String Floral Co.", eyebrow: "FLOWERS FOR BIG DAYS AND REGULAR TUESDAYS", tagline: "Tied by hand. Delivered without drama.",
    summary: "Snapdragon & String makes affordable bouquets, corsages, sympathy arrangements, desk plants, and local flower deliveries.",
    searchTerms: ["flower", "flowers", "florist", "bouquet", "roses", "wedding", "corsage", "delivery", "plant", "gift"],
    description: "Pat arranges flowers at the shop each morning and makes local deliveries after lunch. Call early for school dances, weddings, holidays, and anything involving twelve identical centerpieces.",
    offerings: ["Everyday bouquet from $18", "Desk plants from $9", "Local delivery: $4 inside Dynamo City"],
    hours: "Mon–Sat 8–6 · Closed Sunday", address: "9 Willow Market", phone: "555-0173",
    logo: ASSETS.snapdragonLogo, accent: ASSETS.snapdragonBouquet,
    hero: { src: ASSETS.snapdragonBouquetPhoto, alt: "A colorful Snapdragon & String birthday bouquet" },
    gallery: [
      { src: ASSETS.snapdragonStore, alt: "The florist storefront with sidewalk flower buckets" },
      { src: ASSETS.snapdragonDelivery, alt: "Bouquets ready in the delivery wagon" }
    ],
    visitor: { author: "Office_Amy", text: "Can you make something cheerful that does not look romantic for our receptionist?" },
    reply: "Absolutely. Yellow snapdragons, purple asters, no red roses, and a card that says exactly what you tell me."
  },
  {
    id: "faraway", url: "web://farawaydesk.travel/home", site: "travelbusiness", ownerId: "faraway_frankie", ownerName: "FarawayFrankie",
    name: "Faraway Desk Travel Service", eyebrow: "REAL PEOPLE · PAPER TICKETS · ONE PHONE CALL", tagline: "Your vacation starts at our beige desk.",
    summary: "Faraway Desk is a small travel agency booking fictional regional trips, package holidays, paper airline tickets, hotels, cruises, and family itineraries.",
    searchTerms: ["travel", "vacation", "trip", "holiday", "flight", "airline", "hotel", "cruise", "tour", "travel agent"],
    description: "Frankie compares fares by phone, prints the itinerary, staples every important paper together, and writes the confirmation number twice. Internet prices change; the desk lamp remains.",
    offerings: ["Sunspoke Coast weekends", "Glasswater Lake family packages", "Pine Needle Caverns motorcoach tours"],
    hours: "Mon–Fri 9–6 · Sat by appointment", address: "Suite 3, 81 Meridian Road", phone: "555-0381",
    logo: ASSETS.farawayLogo, accent: ASSETS.farawayPostcards,
    hero: { src: ASSETS.farawayOffice, alt: "Faraway Desk's map-lined travel office" },
    gallery: [{ src: ASSETS.farawayBrochures, alt: "A rack of fictional vacation brochures" }],
    visitor: { author: "BeachPlease99", text: "Is Sunspoke actually sunny in March or is that just the name?" },
    reply: "The name is doing some work. April is safer unless you enjoy windbreakers and aggressively empty beaches."
  },
  {
    id: "inkmoth", url: "web://inkmoth.copy/home", site: "copybusiness", ownerId: "inkmoth_ian", ownerName: "InkMoth_Ian",
    name: "InkMoth Copy & Fax", eyebrow: "COPIES WHILE YOU WAIT · FAXES WHILE THEY SCREECH", tagline: "Bring us paper. Leave with more paper.",
    summary: "InkMoth is a neighborhood copy and fax center offering black-and-white copies, color flyers, binding, laminating, résumé paper, and outgoing fax service.",
    searchTerms: ["copy", "copies", "photocopy", "printing", "printer", "fax", "flyer", "laminating", "binding", "resume", "office"],
    description: "Menus, club flyers, homework packets, family newsletters, résumés, maps, zines, and faxes to offices that still insist. Ian can fix most crooked originals with tape and patience.",
    offerings: ["Black-and-white copies: 6¢", "Outgoing fax: $1 first page, 50¢ after", "Stapling is free if you ask before we finish"],
    hours: "Mon–Fri 8–8 · Sat 10–5", address: "206 Paper Mill Lane", phone: "555-0266",
    logo: ASSETS.inkmothLogo, accent: ASSETS.inkmothMascot,
    hero: { src: ASSETS.inkmothMachines, alt: "InkMoth's copier and fax machines" },
    gallery: [
      { src: ASSETS.inkmothStore, alt: "InkMoth's strip-mall storefront" },
      { src: ASSETS.inkmothFlyers, alt: "Stacks of colorful local print jobs" }
    ],
    visitor: { author: "ZineScene", text: "Can you copy a booklet if the pages are already in a weird order?" },
    reply: "Yes, but mark the front page and stay for the first test copy. Weird order means different things to different staplers."
  },
  {
    id: "sofa", url: "web://sofasafari.furn/home", site: "furniturebusiness", ownerId: "sofa_sylvia", ownerName: "SofaSafariSylvia",
    name: "Sofa Safari Furniture Outlet", eyebrow: "TRACK DOWN A WILD DEAL", tagline: "The showroom is crowded. The prices are domesticated.",
    summary: "Sofa Safari sells discount sofas, recliners, dinettes, lamps, end tables, floor models, and local delivery from an overstuffed showroom.",
    searchTerms: ["furniture", "sofa", "couch", "recliner", "chair", "table", "dining", "lamp", "mattress", "delivery"],
    description: "Our outlet has matching sets, nearly matching sets, and one leopard recliner that refuses to match anything. Floor models are priced as marked. Sylvia carries the tape measure.",
    offerings: ["Sofas from $299", "Recliners from $149", "Local curb delivery from $29"],
    hours: "Mon–Sat 10–8 · Sun noon–5", address: "900 Warehouse Loop", phone: "555-0733",
    logo: ASSETS.sofaLogo, accent: ASSETS.sofaSale,
    hero: { src: ASSETS.sofaShowroom, alt: "The crowded Sofa Safari showroom" },
    gallery: [
      { src: ASSETS.sofaReclinerPhoto, alt: "Sofa Safari's famous leopard recliner" },
      { src: ASSETS.sofaDelivery, alt: "A plaid sofa being loaded for delivery" },
      { src: ASSETS.sofaRecliner, alt: "Leopard recliner company clip art" }
    ],
    visitor: { author: "AuntDarlene", text: "Is the leopard recliner still there and does the footrest work?" },
    reply: "Yes and yes. The pattern is louder than the mechanism. I will hold it until five if you call."
  },
  {
    id: "molar", url: "web://molarmeadow.dent/home", site: "dentalbusiness", ownerId: "dr_marlow", ownerName: "DrMarlow_DDS",
    name: "Molar Meadow Family Dentistry", eyebrow: "GENTLE FAMILY DENTAL CARE", tagline: "A calmer chair and a very patient fish tank.",
    summary: "Molar Meadow is a fictional family dental office offering checkups, cleanings, fillings, sealants, X-rays, and appointment scheduling.",
    searchTerms: ["dentist", "dental", "teeth", "tooth", "cleaning", "cavity", "checkup", "family dentist", "appointment"],
    description: "Dr. Marlow and Jo see children and adults in a small two-chair practice. The waiting-room fish are named Brush, Floss, and Kevin. Call the office for appointments or urgent concerns.",
    offerings: ["Routine exams and cleanings", "Fillings, sealants, and X-rays", "New-patient appointments available"],
    hours: "Mon–Thu 8–5 · Fri 8–noon", address: "14 Clover Medical Court", phone: "555-0602",
    logo: ASSETS.molarLogo, accent: ASSETS.molarMascot,
    hero: { src: ASSETS.molarWaiting, alt: "Molar Meadow's floral waiting room and fish tank" },
    gallery: [{ src: ASSETS.molarChair, alt: "The office's late-1990s dental treatment chair" }],
    visitor: { author: "NervousNed", text: "Is Kevin the fish the one that stares at people by the magazine rack?" },
    reply: "That is Kevin. He has no dental training and should not be consulted about your appointment."
  },
  {
    id: "gurgle", url: "web://gurglebros.plumb/home", site: "plumbingbusiness", ownerId: "gurgle_gus", ownerName: "GurgleGus",
    name: "Gurgle Brothers Plumbing & Drain", eyebrow: "IF IT DRIPS, BACKS UP, OR MAKES THAT NOISE", tagline: "We bring the wrench and wipe our boots.",
    summary: "Gurgle Brothers is a local plumbing service handling leaky faucets, clogged drains, toilets, disposals, water heaters, and small pipe repairs.",
    searchTerms: ["plumber", "plumbing", "pipe", "drain", "clog", "leak", "faucet", "toilet", "water heater", "repair"],
    description: "Gus and Len handle ordinary household plumbing across Dynamo City. Describe the noise when you call. If water is actively flooding, shut off the nearest valve first and call immediately.",
    offerings: ["Drain clearing", "Faucet and toilet repairs", "Water-heater service and small repipes"],
    hours: "Weekdays 7–7 · Saturday 8–4", address: "Service vans dispatched from Bell Street", phone: "555-0437",
    logo: ASSETS.gurgleLogo, accent: ASSETS.gurgleMascot,
    hero: { src: ASSETS.gurgleRepair, alt: "Gurgle Brothers repairing pipes under a sink" },
    gallery: [{ src: ASSETS.gurgleVan, alt: "The Gurgle Brothers service van" }],
    visitor: { author: "UpstairsNeighbor", text: "My sink only gurgles when the washing machine drains. Is that useful information?" },
    reply: "Very useful. Tell me which floor and whether the trap smells afterward. Len will bring the long cable."
  },
  {
    id: "neighbornest", url: "web://neighbornest.cu/home", site: "creditbusiness", ownerId: "nest_nora", ownerName: "NestNora",
    name: "NeighborNest Community Credit Union", eyebrow: "LOCAL SAVINGS · LOCAL LOANS · LOCAL PEOPLE", tagline: "A smaller branch for the place you actually live.",
    summary: "NeighborNest is a fictional member-owned credit union offering savings, checking, certificates, small loans, and a staffed neighborhood branch.",
    searchTerms: ["bank", "credit union", "savings", "checking", "loan", "money", "account", "deposit", "teller", "finance"],
    description: "Membership is open to people who live or work in three fictional local counties. Nora and the branch team handle accounts in person; this page provides general information but never accepts account numbers.",
    offerings: ["Share savings and checking", "Certificates and small personal loans", "Free coin counting for members"],
    hours: "Mon–Thu 9–5 · Fri 9–6 · Sat 9–noon", address: "300 Hearthstone Street", phone: "555-0112",
    logo: ASSETS.neighbornestLogo, accent: ASSETS.neighbornestSeal,
    hero: { src: ASSETS.neighbornestBranch, alt: "NeighborNest's small brick credit-union branch" },
    gallery: [
      { src: ASSETS.neighbornestTeller, alt: "The staffed NeighborNest teller window" },
      { src: ASSETS.neighbornestCheckbook, alt: "NeighborNest checkbook company art" }
    ],
    visitor: { author: "JarOfPennies", text: "Do I really get free coin counting or is there a limit?" },
    reply: "Members get it free. If you bring more than one coffee can, please come before Friday afternoon."
  },
  {
    id: "halo", url: "web://halocomb.salon/home", site: "salonbusiness", ownerId: "halo_holly", ownerName: "HaloComb_Holly",
    name: "Halo Comb Hair Studio", eyebrow: "CUTS · COLOR · CURLS · BIG EVENT HAIR", tagline: "Good hair under extremely flattering mirrors.",
    summary: "Halo Comb is a neighborhood salon offering cuts, blowouts, perms, color, updos, bang trims, and Saturday appointments.",
    searchTerms: ["hair", "salon", "haircut", "stylist", "beauty", "perm", "color", "blowout", "updo", "bang trim"],
    description: "Holly, Dee, and Marisol cut and style the whole family. Bring a magazine picture if you have one. We will discuss what the picture is asking from your hair before anybody picks up scissors.",
    offerings: ["Haircuts from $16", "Bang trims: $5", "Color, perms, and event styles by consultation"],
    hours: "Tue–Fri 9–7 · Sat 8–4", address: "62 Plum Arcade", phone: "555-0909",
    logo: ASSETS.haloLogo, accent: ASSETS.haloHair,
    hero: { src: ASSETS.haloInterior, alt: "Halo Comb's plum-and-pink salon interior" },
    gallery: [
      { src: ASSETS.haloStore, alt: "Halo Comb's purple-awning storefront" },
      { src: ASSETS.haloPriceArt, alt: "Scissors and comb price-list artwork" }
    ],
    visitor: { author: "PromPlan_B", text: "Can three people get updos Saturday morning if we bring snacks?" },
    reply: "Call today and ask for Holly. Three is possible at eight sharp. Snacks are welcome if they do not shed powdered sugar."
  }
];

function businessArt(src: string, alt: string, className = "") {
  return `<img class="filler-business-art ${className}" src="${src}" alt="${alt}">`;
}

function renderBusiness(spec: BusinessSpec) {
  return `<main class="page filler-business-page filler-${spec.id}">
    <header>
      ${businessArt(spec.logo, `${spec.name} logo`, "business-logo")}
      <div><small>${spec.eyebrow}</small><h1>${spec.name}</h1><p>${spec.tagline}</p></div>
      ${businessArt(spec.accent, `${spec.name} company artwork`, "business-accent")}
    </header>
    <section class="filler-business-hero">
      <div><h2>Welcome to our homepage!</h2><p>${spec.description}</p>
        <ul>${spec.offerings.map((offering) => `<li>${offering}</li>`).join("")}</ul>
      </div>
      <figure>${businessArt(spec.hero.src, spec.hero.alt)}<figcaption>${spec.hero.alt}</figcaption></figure>
    </section>
    <section class="filler-business-gallery">
      ${spec.gallery.map((image) => `<figure>${businessArt(image.src, image.alt)}<figcaption>${image.alt}</figcaption></figure>`).join("")}
    </section>
    <aside class="filler-business-info">
      <div><b>HOURS</b><span>${spec.hours}</span></div>
      <div><b>FIND US</b><span>${spec.address}</span></div>
      <div><b>CALL</b><span>${spec.phone}</span></div>
    </aside>
    <p class="business-owner">Questions posted below are answered by ${spec.ownerName} when somebody remembers to check the website.</p>
    <footer>Locally owned · Serving the Orbit area · This page last checked November 1999</footer>
  </main>`;
}

export const fillerBusinessPages: Record<string, PageDefinition> = Object.fromEntries(specs.map((spec) => [
  spec.url,
  {
    url: spec.url,
    title: spec.name,
    site: spec.site,
    ownerId: spec.ownerId,
    summary: spec.summary,
    commentsEnabled: true,
    seedComments: seed(spec),
    listed: true,
    hubId: "business",
    searchTerms: spec.searchTerms,
    render: () => renderBusiness(spec)
  }
]));
