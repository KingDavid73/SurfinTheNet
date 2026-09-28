import type { PageComment, PageDefinition } from "./types";

const ADDITIONAL_BUSINESS_ART = {
  velunaBottle: new URL("../assets/images/additional-business/veluna-bottle.png", import.meta.url).href,
  velunaMark: new URL("../assets/images/additional-business/veluna-mark.png", import.meta.url).href,
  velunaLamp: new URL("../assets/images/additional-business/veluna-lamp.png", import.meta.url).href,
  aurelineCar: new URL("../assets/images/additional-business/aureline-car.png", import.meta.url).href,
  aurelineVector: new URL("../assets/images/additional-business/aureline-vector-v2.png", import.meta.url).href,
  aurelineArc: new URL("../assets/images/additional-business/aureline-arc-v2.png", import.meta.url).href,
  aurelineMeridian: new URL("../assets/images/additional-business/aureline-meridian-v2.png", import.meta.url).href,
  aurelineRange: new URL("../assets/images/additional-business/aureline-range-v2.png", import.meta.url).href,
  aurelineDashboard: new URL("../assets/images/additional-business/aureline-dashboard.png", import.meta.url).href,
  aurelineTailLight: new URL("../assets/images/additional-business/aureline-tail-light.png", import.meta.url).href,
  aurelineWheel: new URL("../assets/images/additional-business/aureline-wheel-v2.png", import.meta.url).href,
  aurelineBrochure: new URL("../assets/images/additional-business/aureline-brochure.png", import.meta.url).href,
  kestrelTv: new URL("../assets/images/additional-business/kestrel-tv-v2.png", import.meta.url).href,
  kestrelComputer: new URL("../assets/images/additional-business/kestrel-computer-v2.png", import.meta.url).href,
  kestrelCdPlayer: new URL("../assets/images/additional-business/kestrel-cd-player-v2.png", import.meta.url).href,
  kestrelStereo: new URL("../assets/images/additional-business/kestrel-stereo.png", import.meta.url).href,
  kestrelCamera: new URL("../assets/images/additional-business/kestrel-camera-v2.png", import.meta.url).href,
  kestrelOrb: new URL("../assets/images/additional-business/kestrel-orb.png", import.meta.url).href,
  kestrelRemote: new URL("../assets/images/additional-business/kestrel-remote.png", import.meta.url).href,
  kestrelMouse: new URL("../assets/images/additional-business/kestrel-mouse.png", import.meta.url).href,
  kestrelPlayer: new URL("../assets/images/additional-business/kestrel-player.png", import.meta.url).href,
  kestrelSpeakers: new URL("../assets/images/additional-business/kestrel-speakers.png", import.meta.url).href,
  bigbangMascot: new URL("../assets/images/additional-business/bigbang-mascot.png", import.meta.url).href,
  bigbangBurger: new URL("../assets/images/additional-business/bigbang-burger-v2.png", import.meta.url).href,
  bigbangCup: new URL("../assets/images/additional-business/bigbang-cup.png", import.meta.url).href,
  bigbangMeteor: new URL("../assets/images/additional-business/bigbang-meteor.png", import.meta.url).href,
  bigbangCoupon: new URL("../assets/images/additional-business/bigbang-coupon.png", import.meta.url).href,
  nullstateJacket: new URL("../assets/images/additional-business/nullstate-jacket.png", import.meta.url).href,
  nullstateDenim: new URL("../assets/images/additional-business/nullstate-denim.png", import.meta.url).href,
  nullstateBag: new URL("../assets/images/additional-business/nullstate-bag.png", import.meta.url).href,
  nullstateSneaker: new URL("../assets/images/additional-business/nullstate-sneaker.png", import.meta.url).href,
  nullstateMark: new URL("../assets/images/additional-business/nullstate-mark.png", import.meta.url).href,
  nullstateHangtag: new URL("../assets/images/additional-business/nullstate-hangtag.png", import.meta.url).href,
  westbellSeal: new URL("../assets/images/additional-business/westbell-seal.png", import.meta.url).href,
  westbellPool: new URL("../assets/images/additional-business/westbell-pool-v2.png", import.meta.url).href,
  westbellHoop: new URL("../assets/images/additional-business/westbell-hoop-v2.png", import.meta.url).href,
  westbellClipboard: new URL("../assets/images/additional-business/westbell-clipboard.png", import.meta.url).href,
  dogearedMark: new URL("../assets/images/additional-business/dogeared-mark.png", import.meta.url).href,
  dogearedStorefront: new URL("../assets/images/additional-business/dogeared-storefront-v2.png", import.meta.url).href,
  dogearedBooks: new URL("../assets/images/additional-business/dogeared-books-v2.png", import.meta.url).href,
  dogearedCat: new URL("../assets/images/additional-business/dogeared-cat-v2.png", import.meta.url).href,
  dogearedOpenBook: new URL("../assets/images/additional-business/dogeared-open-book.png", import.meta.url).href,
  secondsunriseMark: new URL("../assets/images/additional-business/secondsunrise-mark.png", import.meta.url).href,
  secondsunriseWindow: new URL("../assets/images/additional-business/secondsunrise-window.png", import.meta.url).href,
  secondsunriseTelephone: new URL("../assets/images/additional-business/secondsunrise-telephone-v2.png", import.meta.url).href,
  secondsunriseCables: new URL("../assets/images/additional-business/secondsunrise-cables-v2.png", import.meta.url).href,
  secondsunriseLamp: new URL("../assets/images/additional-business/secondsunrise-lamp.png", import.meta.url).href,
  criticalhitMark: new URL("../assets/images/additional-business/criticalhit-mark.png", import.meta.url).href,
  criticalhitDice: new URL("../assets/images/additional-business/criticalhit-dice-v2.png", import.meta.url).href,
  criticalhitMiniatures: new URL("../assets/images/additional-business/criticalhit-miniatures-v2.png", import.meta.url).href,
  criticalhitCards: new URL("../assets/images/additional-business/criticalhit-cards-v2.png", import.meta.url).href,
  criticalhitDragon: new URL("../assets/images/additional-business/criticalhit-dragon-v2.png", import.meta.url).href,
  marcyflashMark: new URL("../assets/images/additional-business/marcyflash-mark.png", import.meta.url).href,
  marcyflashStudio: new URL("../assets/images/additional-business/marcyflash-studio.png", import.meta.url).href,
  marcyflashContactSheet: new URL("../assets/images/additional-business/marcyflash-contact-sheet.png", import.meta.url).href,
  marcyflashPet: new URL("../assets/images/additional-business/marcyflash-pet.png", import.meta.url).href,
  wondervaleMark: new URL("../assets/images/additional-business/wondervale-mark.png", import.meta.url).href,
  wondervaleCoaster: new URL("../assets/images/additional-business/wondervale-coaster-v2.png", import.meta.url).href,
  wondervaleWheel: new URL("../assets/images/additional-business/wondervale-wheel-v3.png", import.meta.url).href,
  wondervaleTicketBooth: new URL("../assets/images/additional-business/wondervale-ticket-booth.png", import.meta.url).href,
  wondervaleMap: new URL("../assets/images/additional-business/wondervale-map.png", import.meta.url).href,
  greenstripeMark: new URL("../assets/images/additional-business/greenstripe-mark.png", import.meta.url).href,
  greenstripeLawn: new URL("../assets/images/additional-business/greenstripe-before-after-v3.png", import.meta.url).href,
  greenstripeMower: new URL("../assets/images/additional-business/greenstripe-mower-v3.png", import.meta.url).href,
  greenstripeLeaf: new URL("../assets/images/additional-business/greenstripe-leaf.png", import.meta.url).href,
  hankstankTruck: new URL("../assets/images/additional-business/hank-truck-v2.png", import.meta.url).href,
  hankstankDiagram: new URL("../assets/images/additional-business/hank-diagram-v2.png", import.meta.url).href,
  pixelpetalMark: new URL("../assets/images/additional-business/pixelpetal-flower-v2.png", import.meta.url).href,
  pixelpetalMonitor: new URL("../assets/images/additional-business/pixelpetal-monitor-v2.png", import.meta.url).href,
  pixelpetalButtons: new URL("../assets/images/additional-business/pixelpetal-buttons.png", import.meta.url).href,
  pixelpetalDesk: new URL("../assets/images/additional-business/pixelpetal-desk-v2.png", import.meta.url).href,
  pixelpetalCursor: new URL("../assets/images/additional-business/pixelpetal-cursor-v2.png", import.meta.url).href,
  pixelpetalCoffee: new URL("../assets/images/additional-business/pixelpetal-coffee-menu.png", import.meta.url).href,
  pixelpetalLandscaper: new URL("../assets/images/additional-business/pixelpetal-landscaper-board.png", import.meta.url).href,
  pixelpetalFundraiser: new URL("../assets/images/additional-business/pixelpetal-fundraiser-flyer.png", import.meta.url).href,
  pixelpetalFlorist: new URL("../assets/images/additional-business/pixelpetal-florist-homepage.png", import.meta.url).href,
  maximartMark: new URL("../assets/images/additional-business/maximart-mark.png", import.meta.url).href,
  maximartStorefront: new URL("../assets/images/additional-business/maximart-storefront.png", import.meta.url).href,
  maximartCart: new URL("../assets/images/additional-business/maximart-cart.png", import.meta.url).href,
  maximartAisle: new URL("../assets/images/additional-business/maximart-aisle.png", import.meta.url).href,
  maximartTag: new URL("../assets/images/additional-business/maximart-tag.png", import.meta.url).href,
  maximartBag: new URL("../assets/images/additional-business/maximart-bag.png", import.meta.url).href,
  maximartToaster: new URL("../assets/images/additional-business/maximart-toaster.png", import.meta.url).href,
  maximartPhone: new URL("../assets/images/additional-business/maximart-cordless-phone.png", import.meta.url).href,
  maximartDiskettes: new URL("../assets/images/additional-business/maximart-diskettes.png", import.meta.url).href,
  maximartShirt: new URL("../assets/images/additional-business/maximart-denim-shirt.png", import.meta.url).href,
  heroVeluna: new URL("../assets/images/additional-business/hero-veluna-v1.gif", import.meta.url).href,
  heroAureline: new URL("../assets/images/additional-business/hero-aureline-v1.gif", import.meta.url).href,
  heroKestrel: new URL("../assets/images/additional-business/hero-kestrel-v1.gif", import.meta.url).href,
  heroWestbell: new URL("../assets/images/additional-business/hero-westbell-v1.gif", import.meta.url).href,
  heroBigbang: new URL("../assets/images/additional-business/hero-bigbang-v1.gif", import.meta.url).href,
  heroNullstate: new URL("../assets/images/additional-business/hero-nullstate-v1.gif", import.meta.url).href,
  heroDogeared: new URL("../assets/images/additional-business/hero-dogeared-v1.gif", import.meta.url).href,
  heroSecondsunrise: new URL("../assets/images/additional-business/hero-secondsunrise-v1.gif", import.meta.url).href,
  heroCriticalhit: new URL("../assets/images/additional-business/hero-criticalhit-v1.gif", import.meta.url).href,
  heroMarcyflash: new URL("../assets/images/additional-business/hero-marcyflash-v1.gif", import.meta.url).href,
  heroWondervale: new URL("../assets/images/additional-business/hero-wondervale-v1.gif", import.meta.url).href,
  heroGreenstripe: new URL("../assets/images/additional-business/hero-greenstripe-v1.gif", import.meta.url).href,
  heroHankstank: new URL("../assets/images/additional-business/hero-hankstank-v1.gif", import.meta.url).href,
  heroPixelpetal: new URL("../assets/images/additional-business/hero-pixelpetal-v1.gif", import.meta.url).href,
  heroMaximart: new URL("../assets/images/additional-business/hero-maximart-v1.gif", import.meta.url).href
};

const BUSINESS_WEB_GIFS = {
  swimmingOne: new URL("../gifs/swimming01.gif", import.meta.url).href,
  swimmingTwo: new URL("../gifs/swimming02.gif", import.meta.url).href,
  weightlift: new URL("../gifs/weightlift01.gif", import.meta.url).href,
  booksOne: new URL("../gifs/books01.gif", import.meta.url).href,
  booksTwo: new URL("../gifs/books02.gif", import.meta.url).href,
  cat: new URL("../gifs/cat01.gif", import.meta.url).href,
  antiqueOne: new URL("../gifs/antique01.gif", import.meta.url).href,
  antiqueTwo: new URL("../gifs/antique02.gif", import.meta.url).href,
  couch: new URL("../gifs/couch01.gif", import.meta.url).href,
  d20: new URL("../gifs/d20_01.gif", import.meta.url).href,
  dragon: new URL("../gifs/dragon01.gif", import.meta.url).href,
  wizard: new URL("../gifs/wizard01.gif", import.meta.url).href,
  cameraOne: new URL("../gifs/camera01.gif", import.meta.url).href,
  cameraTwo: new URL("../gifs/camera02.gif", import.meta.url).href,
  flowers: new URL("../gifs/flowers01.gif", import.meta.url).href,
  mowerOne: new URL("../gifs/lawnmower01.gif", import.meta.url).href,
  mowerTwo: new URL("../gifs/lawnmower02.gif", import.meta.url).href,
  tractor: new URL("../gifs/tractor01.gif", import.meta.url).href,
  truck: new URL("../gifs/truck01.gif", import.meta.url).href,
  faucet: new URL("../gifs/leakingfaucet01.gif", import.meta.url).href,
  paint: new URL("../gifs/paint01.gif", import.meta.url).href,
  crayons: new URL("../gifs/crayons01.gif", import.meta.url).href,
  floppy: new URL("../gifs/floppydisk01.gif", import.meta.url).href
} as const;

/** Primary page-specific artwork used for Ben's Weird Orbit Finds index cards. */
export const ADDITIONAL_BUSINESS_ICONS: Record<string, string> = {
  veluna: ADDITIONAL_BUSINESS_ART.heroVeluna,
  aureline: ADDITIONAL_BUSINESS_ART.heroAureline,
  kestrel: ADDITIONAL_BUSINESS_ART.heroKestrel,
  westbell: ADDITIONAL_BUSINESS_ART.heroWestbell,
  bigbang: ADDITIONAL_BUSINESS_ART.heroBigbang,
  nullstate: ADDITIONAL_BUSINESS_ART.heroNullstate,
  dogeared: ADDITIONAL_BUSINESS_ART.heroDogeared,
  secondsunrise: ADDITIONAL_BUSINESS_ART.heroSecondsunrise,
  criticalhit: ADDITIONAL_BUSINESS_ART.heroCriticalhit,
  marcyflash: ADDITIONAL_BUSINESS_ART.heroMarcyflash,
  wondervale: ADDITIONAL_BUSINESS_ART.heroWondervale,
  greenstripe: ADDITIONAL_BUSINESS_ART.heroGreenstripe,
  hankstank: ADDITIONAL_BUSINESS_ART.heroHankstank,
  pixelpetal: ADDITIONAL_BUSINESS_ART.heroPixelpetal,
  maximart: ADDITIONAL_BUSINESS_ART.heroMaximart
};

export interface AdditionalBusinessLink {
  slug: string;
  mark: string;
  name: string;
  note: string;
  url: string;
}

interface AdditionalBusinessPage extends AdditionalBusinessLink {
  title: string;
  site: PageDefinition["site"];
  summary: string;
  searchTerms: string[];
  render: () => string;
}

export const ADDITIONAL_BUSINESS_OWNERS: Record<string, { id: string; screenName: string; displayName: string }> = {
  veluna: { id: "veluna_kaye", screenName: "VelunaNurse_Kaye", displayName: "Kaye at Veluna" },
  aureline: { id: "aureline_julian", screenName: "Aureline_Julian", displayName: "Julian at Aureline" },
  kestrel: { id: "kestrel_vera", screenName: "KestrelFutureDesk", displayName: "Vera at Kestrel" },
  westbell: { id: "westbell_dale", screenName: "WBRC_Dale", displayName: "Dale at West Bellwater" },
  bigbang: { id: "bigbang_meg", screenName: "CraterCaptain_Meg", displayName: "Meg at Big Bang Burger" },
  nullstate: { id: "nullstate_curator", screenName: "NULL_Curator", displayName: "NULL/STATE Curator" },
  dogeared: { id: "dogeared_ruth", screenName: "MoonBooks_Ruth", displayName: "Ruth at Dog-Eared Moon" },
  secondsunrise: { id: "secondsunrise_mavis", screenName: "SecondSunrise_Mavis", displayName: "Mavis at Second Sunrise" },
  criticalhit: { id: "criticalhit_gabe", screenName: "RuleClerk_Gabe", displayName: "Gabe at Critical Hit" },
  marcyflash: { id: "marcy_flash", screenName: "MarcyFlash", displayName: "Marcy Flash" },
  wondervale: { id: "wondervale_guest", screenName: "WonderVale_GuestSvcs", displayName: "WonderVale Guest Services" },
  greenstripe: { id: "greenstripe_ron", screenName: "StripeForeman_Ron", displayName: "Ron at GreenStripe" },
  hankstank: { id: "hank_tank", screenName: "HankTankField", displayName: "Hank at Tank & Field" },
  pixelpetal: { id: "pixelpetal_dana", screenName: "PixelPetal_Dana", displayName: "Dana at Pixel Petal" },
  maximart: { id: "maximart_1844", screenName: "MaxiMart_Assoc1844", displayName: "Maxi-Mart Associate #1844" }
};

export const ADDITIONAL_BUSINESS_HOME_URLS: Record<string, string> = Object.fromEntries(
  Object.values(ADDITIONAL_BUSINESS_OWNERS).map((owner) => [
    owner.id,
    ({
      veluna_kaye: "web://veluna.rx/home",
      aureline_julian: "web://aureline-motors.com/home",
      kestrel_vera: "web://kestrel-electronics.com/home",
      westbell_dale: "web://westbellwater.rec/home",
      bigbang_meg: "web://bigbangburger.com/home",
      nullstate_curator: "web://nullstate-wear.com/home",
      dogeared_ruth: "web://dogearedmoon.books/home",
      secondsunrise_mavis: "web://secondsunrise.thrift/home",
      criticalhit_gabe: "web://criticalhit.games/home",
      marcy_flash: "web://marcyflash.photo/home",
      wondervale_guest: "web://wondervale.park/home",
      greenstripe_ron: "web://greenstripe.lawn/home",
      hank_tank: "web://hankstank.field/home",
      pixelpetal_dana: "web://pixelpetal.design/home",
      maximart_1844: "web://maximart.com/home"
    } as Record<string, string>)[owner.id]
  ])
);

const SEEDED_VISITORS: Record<string, Array<[string, string]>> = {
  veluna: [
    ["Iguana_Iris", "The safety paragraph says not to promise anything to a celestial body. Finally, medical advice that respects the moon's boundaries."],
    ["Grandma_Dot", "A sleep diary is sensible. I would also write down whether you had coffee after supper, even if the moon is more interesting."]
  ],
  aureline: [
    ["RoadHog_Ron", "The wagon has honest roof rails and enough glass to see the trouble coming. I would still check underneath before believing the brochure."],
    ["KingCalCars", "Beautiful lighting! A king knows that every sedan deserves a showroom large enough to have its own weather."]
  ],
  kestrel: [
    ["ModKit_Maddy", "The support archive lists three incompatible modem drivers and calls all of them universal. This is historically accurate."],
    ["Chip_At_ByteBarn", "That blue showroom lighting sold a lot of perfectly normal CD players as equipment from the future."]
  ],
  westbell: [
    ["FetchQuest_Ray", "Do they still allow the foam dumbbells during family swim? Asking for a dog who is not allowed in the building."],
    ["TrailNote_Tom", "The lap schedule is useful. Print it before driving over; municipal pages and pool hours both change when nobody is looking."]
  ],
  bigbang: [
    ["Major_Munch", "Mission control confirms the double burger has achieved stable orbit. The moon shake remains scientifically suspicious."],
    ["TapeDeck_Keesha", "The Crater Critter commercial has a key change nobody warned me about. I need the coupon sheet and the jingle on one tape."]
  ],
  nullstate: [
    ["NeonBlade_Nico", "The reflective jacket looks like it was designed for skating through a parking garage after the future already closed."],
    ["VelvetMage", "HALOMESH is either footwear or a minor artifact with excellent evasion stats. The page refuses to clarify."]
  ],
  dogeared: [
    ["RosePatch_Ruth", "Mr. Bronte appears to be doing a very good job supervising the used-book counter."],
    ["PaperBird_Pam", "The events flyer printed beautifully in grayscale. The cat hair across the moon may be part of the design now."]
  ],
  secondsunrise: [
    ["Grandma_Dot", "That lamp is from 1978, not 1968. I had the same one and the switch gets hot."],
    ["SofaSafariSylvia", "Please measure the doorway before buying the chair. This is not pessimism. This is furniture experience."]
  ],
  criticalhit: [
    ["QuarterQueen", "The house ruling gives dragons two reactions and the party zero dignity. Approved for one session only."],
    ["RiftScribeThane", "Your used RPG shelf is organized by actual system instead of cover color. I noticed and appreciate this."]
  ],
  marcyflash: [
    ["CatNap_Carla", "The pet package says squeaky toys are welcome. Mr. Boots will not squeak on command but will sit on the backdrop."],
    ["TapeAttic_Tess", "These sample portraits look exactly like the photo wall in every local station lobby, which is a compliment."]
  ],
  wondervale: [
    ["Throttle_Troy", "Night Comet has a good first drop. The official height figure is 142 feet and the unofficial sound is AAAAAA."],
    ["MapMouse_Mina", "The fold-out map puts the log flume north of the midway even though the midway insists it is everywhere."]
  ],
  greenstripe: [
    ["RosePatch_Ruth", "Those stripes are neat, but please leave the clover patch by the fence for the bees."],
    ["RoadHog_Ron", "A mower deck should be level before the first pass. This crew's lines say somebody checked."]
  ],
  hankstank: [
    ["GurgleGus", "Hank tells people to stop running water before he tells them anything else. That is how you know he has seen things."],
    ["OrchardLee", "The field-locating diagram is unusually clear for a page whose subject is deliberately buried."]
  ],
  pixelpetal: [
    ["CodeDex", "The award badge has twelve colors, three bevels, and no measurable authority. Perfect implementation."],
    ["PaperBird_Pam", "The florist case study uses a scanner shadow as a border. I am stealing that idea for paper reasons."]
  ],
  maximart: [
    ["Snacktime_Sue", "The aisle map is worth saving. Every Maxi-Mart has the same departments and somehow a different location for socks."],
    ["Honest_Earl", "MAXI-SAVER is a fine phrase, although shoppers should continue comparing the final price and not merely the size of the burst graphic."]
  ]
};

function seedCommentsFor(page: AdditionalBusinessPage, ownerId: string): PageComment[] {
  return (SEEDED_VISITORS[page.slug] ?? []).map(([author, text], index) => ({
    id: `business-${page.slug}-seed-${index + 1}`,
    pageUrl: page.url,
    ownerId,
    role: "visitor",
    author,
    text,
    createdAt: `1999-11-${String(6 + index).padStart(2, "0")}T${index ? "16:24" : "10:12"}:00`,
    revealAfterVisit: 0
  }));
}

const pages: AdditionalBusinessPage[] = [
  {
    slug: "veluna",
    mark: "V+",
    name: "VELUNA",
    note: "This sleep-drug page is extremely calm about prophetic hallways and losing Tuesday. Ask your doctor. Ask the moon nothing.",
    url: "web://veluna.rx/home",
    title: "Veluna Prescription Sleep Support",
    site: "medbusiness",
    summary: "Veluna is a prescription sleep-support medicine promoted through a calm late-1990s patient-information website with prominent safety information.",
    searchTerms: ["medicine", "medication", "prescription", "pharmacy", "doctor", "sleep", "insomnia", "health", "veluna"],
    render: () => `<main class="page expansion-business-page rx-veluna">
      <nav><b>VELUNA</b><a href="#veluna-story">About Veluna</a><a href="#veluna-safety">Safety Information</a><a href="#veluna-doctor">Talk to Your Doctor</a><span>FOR U.S. RESIDENTS</span></nav>
      <header>
        <div class="veluna-orbit"><img src="${ADDITIONAL_BUSINESS_ART.velunaMark}" alt="Veluna moon-and-star emblem"></div>
        <div><small>REST IS PART OF TOMORROW</small><h1>Meet <em>Veluna<sup>TM</sup></em></h1><p>A prescription option for adults whose difficulty falling asleep has been evaluated by a healthcare professional.</p><a href="#veluna-doctor">Could Veluna be right for you?</a></div>
      </header>
      <figure class="business-scene-hero"><img src="${ADDITIONAL_BUSINESS_ART.heroVeluna}" alt="A moonlit bedroom with a crescent lamp and Veluna medicine"></figure>
      <section id="veluna-story" class="veluna-story">
        <article><img src="${ADDITIONAL_BUSINESS_ART.velunaBottle}" alt="Veluna prescription bottle"><div><span>1</span><h2>Notice the pattern</h2><p>Keep a simple sleep diary. Write down when you go to bed, when you wake, and anything that interrupts the night. There is even a column for mysterious modem noise.</p></div></article>
        <article><img src="${ADDITIONAL_BUSINESS_ART.velunaLamp}" alt="Bedside lamp beneath a crescent moon"><div><span>2</span><h2>Start a conversation</h2><p>Bring your notes and a list of every medicine you take to a licensed healthcare professional.</p></div></article>
        <article><img src="${ADDITIONAL_BUSINESS_ART.velunaBottle}" alt="Veluna prescription bottle"><div><span>3</span><h2>Make a complete plan</h2><p>Medication, if prescribed, is only one part of care. Follow the instructions given by your prescriber.</p></div></article>
      </section>
      <section id="veluna-doctor" class="veluna-question-card"><h2>Questions for your next appointment</h2><ul><li>Could another condition be affecting my sleep?</li><li>Could my current medicines interact with a sleep medicine?</li><li>What should I avoid while taking a prescription sleep aid?</li></ul><p>This website does not diagnose or prescribe. Bring these questions to a qualified healthcare professional.</p></section>
      <section class="business-passive-action"><div><b>DREAM LOG '99</b><span>A printable seven-night sleep diary with a special box for suspicious modem noise.</span></div><button type="button" data-business-download="veluna">DOWNLOAD ILLUSTRATED SLEEP DIARY</button></section>
      <aside id="veluna-safety"><b>IMPORTANT SAFETY INFORMATION</b><p>Tell your doctor about medicines, alcohol, breathing problems, sleepwalking, prophetic dreaming, unexplained sand in the bed, or waking in a room that takes several minutes to become yours. Veluna may cause next-day impairment, moon-related certainty, temporary loss of Tuesdays, or hearing clocks in other houses. Do not drive, enter a corn maze, or promise anything to a celestial body until you know how Veluna affects you.</p></aside>
      <footer>Meridian Vale Therapeutics &middot; Patient Information Center &middot; Page reviewed 10/99 &middot; VEL-1042</footer>
    </main>`
  },
  {
    slug: "aureline",
    mark: "A>",
    name: "AURELINE MOTORS",
    note: "A car company that treats cupholders like hereditary titles. The brochure says the road is beneath you and charges extra for restraint.",
    url: "web://aureline-motors.com/home",
    title: "Aureline Motors 2000",
    site: "carmakerbusiness",
    summary: "Aureline Motors presents its model-year 2000 sedans, coupe, wagon, and sport utility vehicle in a glossy turn-of-the-century showroom.",
    searchTerms: ["car", "cars", "automobile", "automaker", "new car", "sedan", "coupe", "wagon", "suv", "dealer", "aureline"],
    render: () => `<main class="page expansion-business-page auto-aureline">
      <header><div class="aureline-mark">AURELINE<i>///</i></div><small>THE ROAD IS ABOUT TO CHANGE.</small></header>
      <figure class="business-scene-hero"><img src="${ADDITIONAL_BUSINESS_ART.heroAureline}" alt="A silver Aureline sedan outside a luxury glass showroom"></figure>
      <section class="aureline-hero" data-selected-model="vector"><div class="aureline-car"><img data-aureline-hero-primary src="${ADDITIONAL_BUSINESS_ART.aurelineVector}" alt="A silver Aureline Vector sedan"></div><div class="aureline-hero-copy"><span data-aureline-eyebrow>MODEL YEAR 2000 // VECTOR 2.4</span><h1>THE NEW<br><b data-aureline-title>AURELINE VECTOR</b></h1><p data-aureline-description>Clean lines. Confident handling. A cockpit designed around the person who actually drives it.</p></div></section>
      <section class="aureline-models"><h2>CHOOSE YOUR AURELINE</h2><div>
        <article class="active" data-aureline-model="vector" data-aureline-title="AURELINE VECTOR" data-aureline-eyebrow="MODEL YEAR 2000 // VECTOR 2.4" data-aureline-description="Clean lines. Confident handling. A cockpit designed around the person who actually drives it." data-aureline-primary="${ADDITIONAL_BUSINESS_ART.aurelineVector}" data-aureline-trim="VECTOR 2.4" data-aureline-power="164" data-aureline-transmission="5 SPEED MANUAL" data-aureline-drive="FRONT-WHEEL DRIVE" tabindex="0" aria-label="Select Aureline Vector"><img src="${ADDITIONAL_BUSINESS_ART.aurelineVector}" alt="Aureline Vector sport sedan"><button type="button" class="aureline-model-title" data-aureline-select aria-pressed="true">VECTOR</button><span>sport sedan</span><em>from $19,940</em></article>
        <article data-aureline-model="arc" data-aureline-title="AURELINE ARC" data-aureline-eyebrow="MODEL YEAR 2000 // ARC 2.0" data-aureline-description="A low, quick coupe with a short-throw shifter, a driver-focused cabin, and just enough rear seat to keep the argument going." data-aureline-primary="${ADDITIONAL_BUSINESS_ART.aurelineArc}" data-aureline-trim="ARC 2.0" data-aureline-power="151" data-aureline-transmission="5 SPEED MANUAL" data-aureline-drive="REAR-WHEEL DRIVE" tabindex="0" aria-label="Select Aureline Arc"><img src="${ADDITIONAL_BUSINESS_ART.aurelineArc}" alt="Aureline Arc two-door coupe"><button type="button" class="aureline-model-title" data-aureline-select aria-pressed="false">ARC</button><span>two-door coupe</span><em>from $17,680</em></article>
        <article data-aureline-model="meridian" data-aureline-title="AURELINE MERIDIAN" data-aureline-eyebrow="MODEL YEAR 2000 // MERIDIAN 2.5" data-aureline-description="The Meridian brings quiet highway miles, flexible cargo space, and a blue-metallic view of the long way home." data-aureline-primary="${ADDITIONAL_BUSINESS_ART.aurelineMeridian}" data-aureline-trim="MERIDIAN 2.5" data-aureline-power="170" data-aureline-transmission="4 SPEED AUTOMATIC" data-aureline-drive="ALL-WHEEL DRIVE" tabindex="0" aria-label="Select Aureline Meridian"><img src="${ADDITIONAL_BUSINESS_ART.aurelineMeridian}" alt="Aureline Meridian touring wagon"><button type="button" class="aureline-model-title" data-aureline-select aria-pressed="false">MERIDIAN</button><span>touring wagon</span><em>from $21,115</em></article>
        <article data-aureline-model="range" data-aureline-title="AURELINE RANGE" data-aureline-eyebrow="MODEL YEAR 2000 // RANGE 2.7" data-aureline-description="Range is ready for gravel roads, crowded gear, and the kind of weather that makes a high seating position feel like a feature." data-aureline-primary="${ADDITIONAL_BUSINESS_ART.aurelineRange}" data-aureline-trim="RANGE 2.7" data-aureline-power="182" data-aureline-transmission="4 SPEED AUTOMATIC" data-aureline-drive="FULL-TIME 4WD" tabindex="0" aria-label="Select Aureline Range"><img src="${ADDITIONAL_BUSINESS_ART.aurelineRange}" alt="Aureline Range all-road utility vehicle"><button type="button" class="aureline-model-title" data-aureline-select aria-pressed="false">RANGE</button><span>all-road utility</span><em>from $25,700</em></article>
      </div></section>
      <section class="aureline-specs"><div><small data-aureline-spec="trim">VECTOR 2.4</small><b data-aureline-spec="power">164</b><span>DISCREET HORSEPOWER</span></div><div><small>CURATED</small><b data-aureline-spec="transmission">5 SPEED MANUAL</b><span>GEAR EXPERIENCE</span></div><div><small>ARCHITECTURAL</small><b data-aureline-spec="drive">FRONT-WHEEL DRIVE</b><span>ROAD RELATIONSHIP</span></div><p>Prices exclude destination, title, the valet-grade cupholder package, hand-selected cabin silence, and the retailer's laminated explanation of why visible restraint costs $4,200.</p></section>
      <section class="business-passive-action"><div><b>MODEL-YEAR 2000 BROCHURE</b><span>Saves the selected lineup brochure and its heroic empty-road photography to My Files.</span></div><button type="button" data-business-download="aureline">DOWNLOAD SHOWROOM BROCHURE</button></section>
      <footer><b>AURELINE MOTOR COMPANY</b><span>brochures &middot; retailer locations &middot; test-drive information &middot; privacy</span><small>&copy; 1999 Aureline Motor Company</small></footer>
    </main>`
  },
  {
    slug: "kestrel",
    mark: "K*",
    name: "KESTREL ELECTRONICS",
    note: "Kestrel sells the future exactly as 1987 imagined it: chrome, blue lasers, forty-seven buttons, and one cable per appliance.",
    url: "web://kestrel-electronics.com/home",
    title: "Kestrel Electronics",
    site: "electronicsbusiness",
    summary: "Kestrel Electronics is a global consumer-electronics company selling televisions, computers, cameras, portable audio, and home stereo equipment.",
    searchTerms: ["electronics", "television", "tv", "computer", "laptop", "stereo", "audio", "headphones", "camera", "cd player", "minidisc", "kestrel"],
    render: () => `<main class="page expansion-business-page tech-kestrel">
      <header><h1>KESTREL<sup>&reg;</sup></h1><form><label>Choose a product <select><option>Television &amp; Video</option><option>Computers</option><option>Portable Audio</option><option>Home Audio</option><option>Digital Imaging</option></select></label><button type="button">GO</button></form></header>
      <nav>PRODUCTS <i>|</i> SUPPORT <i>|</i> SOFTWARE DOWNLOADS <i>|</i> WHERE TO BUY <i>|</i> KESTREL WORLDWIDE</nav>
      <figure class="business-scene-hero"><img src="${ADDITIONAL_BUSINESS_ART.heroKestrel}" alt="A blue-lit Kestrel electronics showroom filled with turn-of-the-millennium equipment"></figure>
      <section class="kestrel-lead" data-selected-line="tv"><div class="kestrel-product-shape"><img data-kestrel-hero src="${ADDITIONAL_BUSINESS_ART.kestrelTv}" alt="Kestrel TruVista television"></div><div><small data-kestrel-eyebrow>THE SIGNAL, REFINED.</small><h2 data-kestrel-title>TruVista™ WEGA-32</h2><p data-kestrel-description>A flat picture tube, three-line digital comb filter, component video input, and a cabinet that quietly informs the rest of the room who is in charge.</p></div></section>
      <section class="kestrel-catalog">
        <article class="active" data-kestrel-line="tv" data-kestrel-eyebrow="THE SIGNAL, REFINED." data-kestrel-title="TruVista™ WEGA-32" data-kestrel-description="A flat picture tube, three-line digital comb filter, component video input, and a cabinet that quietly informs the rest of the room who is in charge." data-kestrel-primary="${ADDITIONAL_BUSINESS_ART.kestrelTv}" tabindex="0" aria-label="Select Television and Video"><img src="${ADDITIONAL_BUSINESS_ART.kestrelTv}" alt="Kestrel television"><b>TELEVISION + VIDEO</b><p>TruVista televisions, VCRs, DVD players, and home theater receivers.</p></article>
        <article data-kestrel-line="computers" data-kestrel-eyebrow="THE DESKTOP, RECONSIDERED." data-kestrel-title="Kestrel Vale 700" data-kestrel-description="A fast, beige-and-blue desktop system with a 17-inch display, bundled word processing, and enough expansion slots to outlive the warranty." data-kestrel-primary="${ADDITIONAL_BUSINESS_ART.kestrelComputer}" tabindex="0" aria-label="Select Kestrel Vale Computers"><img src="${ADDITIONAL_BUSINESS_ART.kestrelComputer}" alt="Kestrel desktop computer"><b>KESTREL VALE COMPUTERS</b><p>Notebook and desktop systems for work, school, and the information superhighway.</p></article>
        <article data-kestrel-line="audio" data-kestrel-eyebrow="TAKE THE SIGNAL WITH YOU." data-kestrel-title="Kestrel SoundSprint" data-kestrel-description="Portable disc playback, skip protection, a pocket radio, and headphones that make the walk to the bus feel like a product launch." data-kestrel-primary="${ADDITIONAL_BUSINESS_ART.kestrelCdPlayer}" tabindex="0" aria-label="Select Personal Audio"><img src="${ADDITIONAL_BUSINESS_ART.kestrelCdPlayer}" alt="Kestrel portable CD player"><b>PERSONAL AUDIO</b><p>Disc players, digital recorders, headphones, radios, and pocket-sized future.</p></article>
        <article data-kestrel-line="imaging" data-kestrel-eyebrow="PICTURES WITHOUT THE WAIT." data-kestrel-title="CyberLark DC-2.1" data-kestrel-description="A 2.1-megapixel digital camera with a color preview screen, removable media, and a printer-ready way to make the weekend permanent." data-kestrel-primary="${ADDITIONAL_BUSINESS_ART.kestrelCamera}" tabindex="0" aria-label="Select Digital Imaging"><img src="${ADDITIONAL_BUSINESS_ART.kestrelCamera}" alt="Kestrel digital camera"><b>DIGITAL IMAGING</b><p>CyberLark cameras and printers for photographs that arrive without film.</p></article>
      </section>
      <aside><b>OWNER SUPPORT</b><span>Find manuals, driver-disc labels, warranty information, and the cable you definitely put somewhere safe.</span><button type="button" data-business-tab-target="support">VIEW SUPPORT</button><button type="button" data-business-download="kestrel">DOWNLOAD DRIVER / MANUAL SAMPLER</button></aside>
      <footer>Kestrel Electronics North America &middot; Site Map &middot; Legal &middot; Last updated October 22, 1999</footer>
    </main>`
  },
  {
    slug: "westbell",
    mark: "WB",
    name: "WEST BELLWATER REC CENTER",
    note: "The city pool has three shoe lines, a scoreboard stuck at 88:88, and Lane 4, which is open but apparently philosophical.",
    url: "web://westbellwater.rec/home",
    title: "West Bellwater Recreation Center",
    site: "recreationbusiness",
    summary: "West Bellwater Recreation Center posts its pool lanes, open-gym hours, fitness classes, youth programs, membership rates, and municipal notices.",
    searchTerms: ["recreation", "rec center", "community center", "pool", "swimming", "gym", "basketball", "aerobics", "fitness", "classes", "west bellwater"],
    render: () => `<main class="page expansion-business-page rec-westbell">
      <header><img class="westbell-seal-art" src="${ADDITIONAL_BUSINESS_ART.westbellSeal}" alt="West Bellwater recreation center seal"><div><small>CITY OF WEST BELLWATER &middot; PARKS AND COMMUNITY LIFE</small><h1>West Bellwater<br><b>Recreation Center</b></h1></div><aside>FRONT DESK<br><b>555-0180</b></aside></header>
      <nav><button type="button">HOME</button><button type="button">POOL</button><button type="button">GYM</button><button type="button">CLASSES</button><button type="button">YOUTH</button><button type="button">MEMBERSHIP</button></nav>
      <figure class="business-scene-hero"><img src="${ADDITIONAL_BUSINESS_ART.heroWestbell}" alt="The empty West Bellwater municipal indoor pool"></figure>
      <section class="westbell-alert"><img class="page-sprinkle westbell-swimmer-gif" src="${BUSINESS_WEB_GIFS.swimmingOne}" alt="Animated swimmer"><b>FACILITY NOTICE:</b> Family swim begins at 6:30 tonight. Lap lanes 1 and 2 remain open. Please stop wearing outdoor shoes past the blue lobby line.</section>
      <section class="westbell-grid"><article><img class="business-art westbell-pool-art" src="${ADDITIONAL_BUSINESS_ART.westbellPool}" alt="West Bellwater indoor pool"><img class="page-sprinkle westbell-lap-gif" src="${BUSINESS_WEB_GIFS.swimmingTwo}" alt="Animated lap swimmer"><h2>TODAY AT THE CENTER</h2><table><tbody><tr><th>6:00 AM</th><td>Lap swim / 4 lanes</td></tr><tr><th>9:00 AM</th><td>Silver Stretch</td></tr><tr><th>3:30 PM</th><td>After-school gym</td></tr><tr><th>5:15 PM</th><td>Step aerobics</td></tr><tr><th>6:30 PM</th><td>Family swim</td></tr><tr><th>8:00 PM</th><td>Adult open basketball</td></tr></tbody></table></article><article><img class="business-art westbell-hoop-art" src="${ADDITIONAL_BUSINESS_ART.westbellHoop}" alt="West Bellwater gym basketball hoop"><img class="page-sprinkle westbell-weight-gif" src="${BUSINESS_WEB_GIFS.weightlift}" alt="Animated weightlifter"><h2>THIS SEASON</h2><ul><li>Red Cross swim lessons</li><li>Indoor soccer grades 3-6</li><li>Teen weight-room orientation</li><li>Saturday craft club</li><li>Community volleyball</li></ul><p><b>Registration opens November 8.</b> Forms are available at the front desk. Online registration is coming when the city computer stops rejecting hyphenated last names.</p></article></section>
      <section class="westbell-rates"><h2>DROP-IN RATES</h2><div><b>YOUTH</b><em>$1.50</em><span>ages 6-17</span></div><div><b>ADULT</b><em>$3.00</em><span>ages 18-59</span></div><div><b>SENIOR</b><em>$1.00</em><span>ages 60+</span></div><p>Children under 10 must be accompanied by an adult. Bring a lock; the desk does not hold wallets. The lost-and-found currently contains one snorkel, two left shoes, and a very confident pigeon.</p></section>
      <section class="business-passive-action"><div><b>PRINTABLE CENTER INFORMATION</b><span>Open the pool schedule, class list, or current drop-in rates. No membership is created.</span></div><button type="button" data-business-tab-target="pool">VIEW POOL SCHEDULE</button><button type="button" data-business-tab-target="membership">VIEW / PRINT RATES</button></section>
      <footer>100 Civic Pool Drive &middot; West Bellwater &middot; Mon-Fri 6 AM-10 PM &middot; Sat-Sun 8 AM-8 PM</footer>
    </main>`
  },
  {
    slug: "bigbang",
    mark: "BB!",
    name: "BIG BANG BURGER",
    note: "A burger chain running lunch like a military space launch. I want the meteor toy but not whatever rank comes with it.",
    url: "web://bigbangburger.com/home",
    title: "Big Bang Burger",
    site: "burgerbusiness",
    summary: "Big Bang Burger is a national fast-food chain with flame-grilled burgers, value meals, kids' Meteor Club toys, and loud limited-time promotions.",
    searchTerms: ["burger", "hamburger", "fast food", "restaurant", "fries", "shake", "kids meal", "drive thru", "lunch", "big bang burger"],
    render: () => `<main class="page expansion-business-page food-bigbang">
      <header><img class="bigbang-mascot-art" src="${ADDITIONAL_BUSINESS_ART.bigbangMascot}" alt="Big Bang Burger mascot"><div><small>FLAME-GRILLED ACROSS THE U.S.A.</small><h1>MAKE LUNCH<br>AN EVENT.</h1><p>The new DOUBLE IMPACT has two beef patties, two slices of American cheese, grilled onions, pickles, and Comet Sauce on a toasted sesame bun.</p></div></header>
      <marquee scrollamount="5">*** DOUBLE IMPACT VALUE MEAL $3.99 *** METEOR CLUB TOY #4 NOW LANDING *** BREAKFAST UNTIL 10:30 ***</marquee>
      <nav>MENU | LOCATIONS | METEOR CLUB | COMPANY | JOBS | NUTRITION</nav>
      <figure class="business-scene-hero"><img src="${ADDITIONAL_BUSINESS_ART.heroBigbang}" alt="A cosmic Big Bang Burger restaurant counter"></figure>
      <section class="bigbang-menu"><article><img src="${ADDITIONAL_BUSINESS_ART.bigbangBurger}" alt="Big Bang Burger Double Impact"><span>NEW</span><h2>DOUBLE<br>IMPACT</h2><p>Two patties. Zero subtlety.</p><b>$2.49</b></article><article><img src="${ADDITIONAL_BUSINESS_ART.bigbangCup}" alt="Big Bang Burger drink cup"><h2>ORBIT RINGS</h2><p>Crispy onion rings with pepper dust.</p><b>99&cent;</b></article><article><img src="${ADDITIONAL_BUSINESS_ART.bigbangMeteor}" alt="Big Bang Burger Meteor Club toy"><h2>MOON SHAKE</h2><p>Chocolate, vanilla, or strawberry.</p><b>$1.29</b></article></section>
      <section class="bigbang-kids"><img class="meteor-toy" src="${ADDITIONAL_BUSINESS_ART.bigbangMeteor}" alt="Big Bang Burger Meteor Club toy"><div><small>THE METEOR CLUB PRESENTS</small><h2>CRATER CRITTERS!</h2><p>Six snap-together space creatures. One in every Meteor Meal while supplies last. Ask your grown-up before trading the glow-in-the-dark one for somebody's entire lunch. The franchise handbook calls this collectible enthusiasm.</p></div><button type="button" data-business-mail="bigbang">EMAIL ME THE COUPON SHEET</button></section>
      <aside><img class="business-art bigbang-coupon-art" src="${ADDITIONAL_BUSINESS_ART.bigbangCoupon}" alt="Big Bang Burger coupon"><b>PRINT THIS COUPON</b><span>FREE REGULAR FRIES with any sandwich purchase</span><small>Valid at participating Big Bang Burger restaurants through 11/30/99. One coupon per customer. Photocopies accepted if the manager is in a good mood.</small></aside>
      <footer>&copy; 1999 Big Bang Foods, Inc. &middot; Franchising &middot; Contact Us &middot; Availability varies by location.</footer>
    </main>`
  },
  {
    slug: "nullstate",
    mark: "N/S",
    name: "NULL/STATE",
    note: "Anti-commerce streetwear for people with valets. The $1,200 jacket has eleven pockets: nine fake and two for receipts.",
    url: "web://nullstate-wear.com/home",
    title: "NULL/STATE Clothing",
    site: "fashionbusiness",
    summary: "NULL/STATE is a youth clothing label selling wide-leg denim, technical jackets, logo tops, bags, and limited seasonal drops.",
    searchTerms: ["clothing", "fashion", "clothes", "streetwear", "jeans", "jacket", "shirt", "teen", "trendy", "style", "null state"],
    render: () => `<main class="page expansion-business-page fashion-nullstate">
      <header><h1>NULL<span>/</span>STATE</h1><small>DROP 04 // WINTER 1999</small><nav>WOMEN / MEN / OBJECTS / LOOKBOOK / STOCKISTS</nav></header>
      <figure class="business-scene-hero"><img src="${ADDITIONAL_BUSINESS_ART.heroNullstate}" alt="A reflective NULL STATE jacket photographed in a wet parking garage"></figure>
      <section class="nullstate-hero"><img class="nullstate-code" src="${ADDITIONAL_BUSINESS_ART.nullstateJacket}" alt="NULL/STATE reflective utility jacket"><div><span>THE CITY AFTER LAST CALL</span><h2>STATIC<br><i>UTILITY</i></h2><p>Reflective seams, brushed nylon, wide proportions, and enough pockets to lose the same lip balm in six different places. Every pocket is a tiny argument with normal clothing.</p><button type="button" data-business-download="nullstate">DOWNLOAD LOOKBOOK_04 POSTCARD</button></div></section>
      <section class="nullstate-strip"><b>NEW:</b> VECTOR SHELL / HALO MESH / PLATFORM 3 / SIGNAL BAG / MONO DENIM</section>
      <section class="nullstate-products"><article><img src="${ADDITIONAL_BUSINESS_ART.nullstateJacket}" alt="NULL/STATE Vector Shell jacket"><small>NS-041</small><div>VECTOR<br>SHELL</div><b>$1,200</b></article><article><img src="${ADDITIONAL_BUSINESS_ART.nullstateDenim}" alt="NULL/STATE Mono Denim jeans"><small>NS-019</small><div>MONO<br>DENIM</div><b>$510</b></article><article><img src="${ADDITIONAL_BUSINESS_ART.nullstateBag}" alt="NULL/STATE Signal Bag"><small>NS-055</small><div>SIGNAL<br>BAG</div><b>$680</b></article><article><img src="${ADDITIONAL_BUSINESS_ART.nullstateSneaker}" alt="NULL/STATE Halo Mesh sneaker"><small>NS-006</small><div>HALO<br>MESH</div><b>$440</b></article></section>
      <aside><b>NULL/STATE TRANSMISSION ARCHIVE</b><p>View archived drop dates, party-address flyers, and store-opening cards. This page does not subscribe you to anything.</p><button type="button" data-business-download="nullstate">OPEN LOOKBOOK_04 POSTCARD</button></aside>
      <footer>NULL/STATE DESIGN UNIT &middot; NEW YORK / LOS ANGELES / TOKYO / ONLINE &middot; optimized for browsers with style</footer>
    </main>`
  },
  {
    slug: "dogeared",
    mark: "DM",
    name: "DOG-EARED MOON BOOKS",
    note: "Cozy bookstore run by Mr. Bronte the cat. All his picks involve cats inheriting property, which gets less cute over time.",
    url: "web://dogearedmoon.books/home",
    title: "Dog-Eared Moon Books",
    site: "bookstorebusiness",
    summary: "Dog-Eared Moon Books is an independent local bookstore with new and used books, staff recommendations, readings, special orders, and a resident shop cat.",
    searchTerms: ["book", "books", "bookstore", "used books", "reading", "author", "novel", "paperback", "special order", "dog eared moon"],
    render: () => `<main class="page expansion-business-page books-dogeared">
      <header><img class="dogeared-mark-art" src="${ADDITIONAL_BUSINESS_ART.dogearedMark}" alt="Dog-Eared Moon Books emblem"><div><small>NEW BOOKS &middot; OLD BOOKS &middot; GOOD CHAIRS</small><h1>Dog-Eared Moon</h1><p>Independent booksellers on Lantern Street since 1987</p></div><img class="page-sprinkle dogeared-books-gif" src="${BUSINESS_WEB_GIFS.booksOne}" alt="Animated stack of books"></header>
      <nav><a href="#dogeared-picks">STAFF PICKS</a><a href="#dogeared-events">EVENTS</a><a href="#dogeared-used">USED BOOKS</a><a href="#dogeared-orders">SPECIAL ORDERS</a></nav>
      <figure class="business-scene-hero"><img src="${ADDITIONAL_BUSINESS_ART.heroDogeared}" alt="Mr. Bronte the cat presiding over a moonlit used bookstore"></figure>
      <section class="dogeared-welcome"><div><img class="business-art dogeared-books-art" src="${ADDITIONAL_BUSINESS_ART.dogearedBooks}" alt="Stack of used books"><h2>Come in. Stay awhile.</h2><p>We carry fiction, mysteries, history, poetry, children's books, field guides, cookbooks, small-press titles, and the paperback somebody swears was on the front table last week.</p><p>Can't find it? Ask Ruth or Malcolm. We place special orders every Tuesday and Friday. The cat has opinions but no checkout privileges.</p></div><aside><img class="business-art dogeared-cat-art" src="${ADDITIONAL_BUSINESS_ART.dogearedCat}" alt="Mr. Bronte the bookstore cat"><img class="page-sprinkle dogeared-cat-gif" src="${BUSINESS_WEB_GIFS.cat}" alt="Animated cat"><b>STORE CAT STATUS</b><span>MR. BRONTE IS:</span><em>ASLEEP IN LOCAL HISTORY</em></aside></section>
      <section id="dogeared-picks" class="dogeared-shelves"><h2>STAFF PICKS // NOVEMBER</h2><article><b>The Orchard at Low Water</b><span>picked by Ruth</span><p>Quiet, strange, and best read while it rains.</p></article><article><b>Maps for Imaginary Towns</b><span>picked by Malcolm</span><p>A travel book for places that refuse to stay put.</p></article><article><b>The Clockwork Minnow</b><span>picked by Jo</span><p>A fast adventure for readers 9 and up.</p></article></section>
      <section id="dogeared-events" class="dogeared-events"><img class="page-sprinkle dogeared-reading-gif" src="${BUSINESS_WEB_GIFS.booksTwo}" alt="Animated open book"><h2>ON THE CALENDAR</h2><dl><dt>NOV 6 / 11 AM</dt><dd>Saturday story hour: monsters who apologize</dd><dt>NOV 10 / 7 PM</dt><dd>Local author Mara Bell reads from <i>Reservoir Birds</i></dd><dt>NOV 14 / 2 PM</dt><dd>Used-book trade-in afternoon</dd></dl><button type="button" data-business-mail="dogeared">EMAIL ME THE EVENTS FLYER</button></section>
      <aside id="dogeared-orders" class="dogeared-note">Special-order information is updated Tuesday and Friday. Please do not e-mail credit-card numbers; Malcolm prints every message.</aside>
      <footer>27 Lantern Street, Dynamo City &middot; Mon-Sat 10-8 &middot; Sun noon-5 &middot; Page typed by Ruth</footer>
    </main>`
  },
  {
    slug: "secondsunrise",
    mark: "2ND",
    name: "SECOND SUNRISE",
    note: "Every thrift item has an extremely specific former-owner story. The wet-stuff rule dates to something called Easter 1997.",
    url: "web://secondsunrise.shop/home",
    title: "Second Sunrise Antiques & Thrift",
    site: "thriftbusiness",
    summary: "Second Sunrise is a local antiques and thrift store buying and selling furniture, housewares, records, clothing, collectibles, and useful oddments.",
    searchTerms: ["antique", "antiques", "thrift", "thrift store", "used", "vintage", "furniture", "records", "collectibles", "secondhand", "second sunrise"],
    render: () => `<main class="page expansion-business-page thrift-secondsunrise">
      <header><img class="sunrise-mark-art" src="${ADDITIONAL_BUSINESS_ART.secondsunriseMark}" alt="Second Sunrise antiques and thrift emblem"><div><h1>SECOND SUNRISE</h1><p>ANTIQUES &middot; THRIFT &middot; ESTATE FINDS &middot; USEFUL OLD THINGS</p></div><img class="page-sprinkle sunrise-antique-gif" src="${BUSINESS_WEB_GIFS.antiqueOne}" alt="Animated antique"><b>OPEN<br>10-6</b></header>
      <figure class="business-scene-hero"><img src="${ADDITIONAL_BUSINESS_ART.heroSecondsunrise}" alt="The crowded and warmly lit Second Sunrise thrift and antique store"></figure>
      <section class="sunrise-intro"><img class="page-sprinkle sunrise-couch-gif" src="${BUSINESS_WEB_GIFS.couch}" alt="Animated vintage couch"><h2>Everything gets another morning.</h2><p>Two rooms of old furniture, kitchen things, lamps, records, coats, frames, costume jewelry, tools, toys, and objects whose original purpose has become a group discussion. Everything is pre-owned, including the mystery cord in the electronics bin.</p><span>NEW ARRIVALS PUT OUT THURSDAY MORNING</span></section>
      <section class="sunrise-tags"><article><img src="${ADDITIONAL_BUSINESS_ART.secondsunriseWindow}" alt="Second Sunrise antique shop window"><b>$18</b><h3>Harvest-gold canister set</h3><p>From the Dobbins kitchen. Flour tin taps twice after midnight; sugar remains professional.</p></article><article><img src="${ADDITIONAL_BUSINESS_ART.secondsunriseTelephone}" alt="Vintage telephone table"><b>$45</b><h3>Maple telephone table</h3><p>Seat, directory shelf, and a number penciled underneath that has been disconnected since 1981 but still rings.</p></article><article><img src="${ADDITIONAL_BUSINESS_ART.secondsunriseLamp}" alt="Vintage lamp from Second Sunrise"><b>$2 ea.</b><h3>Basement record crate</h3><p>Easy listening, one garage single, and a blank record labeled APOLOGY in immaculate handwriting.</p></article><article><img src="${ADDITIONAL_BUSINESS_ART.secondsunriseCables}" alt="Box of mystery cables"><b>$12</b><h3>Box of mystery cables</h3><p>Sold together. The blue one is warm. We have stopped testing it.</p></article></section>
      <section class="sunrise-columns"><article><h2>WE BUY</h2><ul><li>Clean furniture in usable condition</li><li>Old advertising and local paper</li><li>Records, lamps, tools, and small collections</li><li>Vintage clothing without attic smells</li></ul></article><article><h2>WE DO NOT BUY</h2><ul><li>Mattresses</li><li>Encyclopedias newer than 1960</li><li>Upright pianos, even free ones</li><li>Anything still wet from the yard</li></ul></article></section>
      <aside><img class="page-sprinkle sunrise-measure-gif" src="${BUSINESS_WEB_GIFS.antiqueTwo}" alt="Animated old-fashioned furniture"><b>MEASURING ADVICE</b><span>Item cards list condition, size, and marked price. Measure doorways, stair turns, and the part of the station wagon everyone insists is larger than it is.</span></aside>
      <footer>Old Highway 6 beside the feed store &middot; 555-0288 &middot; Closed Sunday and during severe ice</footer>
    </main>`
  },
  {
    slug: "criticalhit",
    mark: "D20",
    name: "CRITICAL HIT GAMES",
    note: "A game shop operating like a tiny nation. Foil disputes require witnesses and Friday cards are a regional conflict.",
    url: "web://criticalhit.games/home",
    title: "Critical Hit Games & Hobby",
    site: "hobbybusiness",
    summary: "Critical Hit Games & Hobby is a local game store carrying video games, tabletop role-playing games, miniatures, trading cards, models, and event nights.",
    searchTerms: ["game store", "video games", "tabletop", "rpg", "role playing", "trading cards", "tcg", "miniatures", "models", "hobby", "critical hit"],
    render: () => `<main class="page expansion-business-page games-criticalhit">
      <header><img class="critical-mark-art" src="${ADDITIONAL_BUSINESS_ART.criticalhitMark}" alt="Critical Hit Games emblem"><div><small>GAMES &middot; HOBBY &middot; CAMPAIGN SUPPLY</small><h1>CRITICAL <i>HIT</i></h1><p>Roll dice. Trade cards. Save worlds. Paint very small shoulder pads.</p></div><img class="page-sprinkle critical-d20-gif" src="${BUSINESS_WEB_GIFS.d20}" alt="Animated twenty-sided die"></header>
      <nav><button type="button">NEW RELEASES</button><button type="button">EVENTS</button><button type="button">VIDEO GAMES</button><button type="button">RPGs</button><button type="button">CARDS</button><button type="button">MINIATURES</button></nav>
      <figure class="business-scene-hero"><img src="${ADDITIONAL_BUSINESS_ART.heroCriticalhit}" alt="A crowded role-playing game table inside Critical Hit Games"></figure>
      <section class="critical-grid"><article class="critical-feature"><img class="business-art critical-dragon-art" src="${ADDITIONAL_BUSINESS_ART.criticalhitDragon}" alt="Painted fantasy dragon miniature"><img class="page-sprinkle critical-dragon-gif" src="${BUSINESS_WEB_GIFS.dragon}" alt="Animated dragon"><small>JUST ARRIVED</small><h2>DRAGON KEEP III</h2><p>The new fantasy role-playing core book is in stock. First printing includes the fold-out map and the typo on page 184 that makes rope more expensive than a horse. Errata is available by photocopy and heartfelt argument.</p><button type="button" data-business-download="criticalhit">DOWNLOAD OUR HOUSE RULING</button></article><article><img class="business-art critical-dice-art" src="${ADDITIONAL_BUSINESS_ART.criticalhitDice}" alt="Colorful role-playing dice"><img class="page-sprinkle critical-wizard-gif" src="${BUSINESS_WEB_GIFS.wizard}" alt="Animated wizard"><h2>THIS WEEK</h2><dl><dt>WED 6:00</dt><dd>Open miniatures painting</dd><dt>FRI 6:30</dt><dd>Friday Night SpellCards</dd><dt>SAT NOON</dt><dd>Mecha model-build table</dd><dt>SUN 1:00</dt><dd>Learn-to-play RPG session</dd></dl></article></section>
      <section class="critical-departments"><div><img src="${ADDITIONAL_BUSINESS_ART.criticalhitCards}" alt="Trading-card binder"><b>VIDEO GAME CAVE</b><span>New, used, imports, memory cards, and controller testing.</span></div><div><img src="${ADDITIONAL_BUSINESS_ART.criticalhitDice}" alt="Tabletop dice"><b>TABLETOP WALL</b><span>Core books, adventures, dice, screens, maps, and graph paper.</span></div><div><img src="${ADDITIONAL_BUSINESS_ART.criticalhitCards}" alt="Trading cards"><b>CARD COUNTER</b><span>Singles, boosters, binders, sleeves, and polite trading.</span></div><div><img src="${ADDITIONAL_BUSINESS_ART.criticalhitMiniatures}" alt="Miniature painting table"><b>MODEL BENCH</b><span>Kits, paints, brushes, glue, terrain, and tiny trees.</span></div></section>
      <aside><b>STORE RULE #1:</b> Ask before opening anything. <b>RULE #2:</b> Do not trade with children without a parent present. <b>RULE #3:</b> The back table is not reserved just because your wizard is important.</aside>
      <footer>Critical Hit Games &amp; Hobby &middot; 118 Arcade Row &middot; 555-D20S &middot; Tue-Sun &middot; No alignment arguments after closing</footer>
    </main>`
  },
  {
    slug: "marcyflash",
    mark: "MF",
    name: "MARCY FLASH PHOTOGRAPHY",
    note: "Marcy seems normal until she mentions which bedroom window faces west and what time you usually get home.",
    url: "web://marcyflash.photo/home",
    title: "Marcy Flash Photography",
    site: "photographerbusiness",
    summary: "Marcy Flash is a local portrait photographer offering senior pictures, families, weddings, children, pets, events, and film reprints.",
    searchTerms: ["photographer", "photography", "portrait", "senior pictures", "wedding", "family photo", "pet photo", "headshot", "film", "marcy flash"],
    render: () => `<main class="page expansion-business-page photo-marcy">
      <header><img class="marcy-mark-art" src="${ADDITIONAL_BUSINESS_ART.marcyflashMark}" alt="Marcy Flash Photography emblem"><div><h1>Marcy Flash</h1><p>PORTRAIT &middot; WEDDING &middot; FAMILY &middot; EVENT PHOTOGRAPHY</p></div><img class="page-sprinkle marcy-camera-gif" src="${BUSINESS_WEB_GIFS.cameraOne}" alt="Animated camera"><span>capturing your real smile<br>since 1989</span></header>
      <figure class="business-scene-hero"><img src="${ADDITIONAL_BUSINESS_ART.heroMarcyflash}" alt="A family portrait session surrounded by Marcy Flash sample photographs"></figure>
      <section class="marcy-lead"><div class="marcy-frame"><img src="${ADDITIONAL_BUSINESS_ART.marcyflashContactSheet}" alt="Marcy Flash portrait contact sheet"><img class="page-sprinkle marcy-flash-gif" src="${BUSINESS_WEB_GIFS.cameraTwo}" alt="Animated flash camera"></div><div><small>A NOTE FROM MARCY</small><h2>Pictures should feel like you.</h2><p>Bring the denim jacket you keep on the second hook by the kitchen. The west living-room window gets perfect light at 4:12, just before Uncle Ray parks across the street.</p><p>Proofs are ready in two weeks, including the candid frames families never remember booking. I remember for you.</p></div></section>
      <section class="marcy-contactsheet"><article><img src="${ADDITIONAL_BUSINESS_ART.marcyflashStudio}" alt="Marcy Flash portrait studio"><div>01</div><b>SENIORS</b><span>studio + one outdoor location</span></article><article><img src="${ADDITIONAL_BUSINESS_ART.marcyflashContactSheet}" alt="Marcy Flash family proof sheet"><div>02</div><b>FAMILIES</b><span>up to eight people before we negotiate</span></article><article><img src="${ADDITIONAL_BUSINESS_ART.marcyflashStudio}" alt="Marcy Flash wedding lighting setup"><div>03</div><b>WEDDINGS</b><span>ceremony, portraits, and reception coverage</span></article><article><img src="${ADDITIONAL_BUSINESS_ART.marcyflashPet}" alt="Marcy Flash pet portrait"><div>04</div><b>PETS</b><span>treats provided; dignity optional</span></article></section>
      <section class="marcy-packages"><h2>POPULAR SESSIONS</h2><p><b>THE CLASSIC / $65</b><br>45-minute studio session and twelve proofs</p><p><b>THE WHOLE STORY / $110</b><br>Studio plus outdoor location and twenty-four proofs</p><p><b>BUSINESS PORTRAIT / $35</b><br>One look, four proofs, one finished 5x7</p></section>
      <aside><img class="page-sprinkle marcy-flowers-gif" src="${BUSINESS_WEB_GIFS.flowers}" alt="Animated flowers">Appointments: 555-0236 &middot; 41 Garden Level, Dynamo City &middot; Please call at least 24 hours ahead to reschedule.</aside>
      <footer>All photographs &copy; Marcy Flash unless your mother brought them in for copying. Best viewed with colors set to millions.</footer>
    </main>`
  },
  {
    slug: "wondervale",
    mark: "WV",
    name: "WONDERVALE PARK",
    note: "The park calls a 142-foot drop family fun and measures emotional preparedness separately. The mascot knows where you parked.",
    url: "web://wondervale.park/home",
    title: "WonderVale Amusement Park",
    site: "themeparkbusiness",
    summary: "WonderVale is a local amusement park with roller coasters, family rides, a water ride, midway games, live shows, food stands, and season passes.",
    searchTerms: ["theme park", "amusement park", "roller coaster", "rides", "water ride", "midway", "family fun", "season pass", "wondervale"],
    render: () => `<main class="page expansion-business-page park-wondervale">
      <header><img class="wondervale-mark-art" src="${ADDITIONAL_BUSINESS_ART.wondervaleMark}" alt="WonderVale amusement park emblem"><div><small>WHERE THE VALLEY LOOKS UP</small><h1>WONDER<span>VALE</span></h1><p>RIDES &middot; SHOWS &middot; GAMES &middot; SUMMER NIGHTS</p></div><b>OPEN<br>SAT &amp; SUN</b></header>
      <figure class="business-scene-hero"><img src="${ADDITIONAL_BUSINESS_ART.heroWondervale}" alt="WonderVale roller coasters and midway at dusk"></figure>
      <marquee behavior="alternate" scrollamount="4">THE 2000 SEASON IS COMING: SOMETHING BIG IS RISING BEHIND THUNDER HILL!</marquee>
      <section class="wondervale-coaster" data-wondervale-mode="facts"><div class="coaster-track"><img src="${ADDITIONAL_BUSINESS_ART.wondervaleCoaster}" alt="WonderVale Night Comet roller coaster train"></div><div><small data-wondervale-eyebrow>THE VALLEY'S STEEPEST FIRST DROP</small><h2 data-wondervale-title>THE NIGHT COMET</h2><p data-wondervale-copy>Climb 142 feet, reconsider every decision, and cross three inversions at 61 miles per hour. Riders must be 54 inches tall and emotionally prepared to learn the mascot already knows where they parked.</p><button type="button" data-wondervale-detail="facts">RIDE FACTS</button><button type="button" data-wondervale-detail="height">HEIGHT RULES</button></div></section>
      <section class="wondervale-rides"><article><img src="${ADDITIONAL_BUSINESS_ART.wondervaleCoaster}" alt="Night Comet coaster train"><b>NIGHT COMET</b><span>steel looping coaster</span><em>54 in.</em></article><article><img src="${ADDITIONAL_BUSINESS_ART.wondervaleWheel}" alt="WonderVale ferris wheel"><b>TIMBER HOWL</b><span>wooden out-and-back coaster</span><em>48 in.</em></article><article><img src="${ADDITIONAL_BUSINESS_ART.wondervaleTicketBooth}" alt="WonderVale ticket booth"><b>RIVER RIDDLE</b><span>log flume / you will get wet</span><em>42 in.</em></article><article><img src="${ADDITIONAL_BUSINESS_ART.wondervaleMap}" alt="WonderVale park map and ticket"><b>STARLARK</b><span>family suspended ride</span><em>36 in.</em></article></section>
      <section class="wondervale-plan"><div><h2>PLAN YOUR DAY</h2><ul><li>Gates open at 10:00 AM</li><li>Parking is $4 per vehicle</li><li>Outside food stays in the picnic grove</li><li>Ride closures are posted at Guest Services</li></ul></div><aside><img class="business-art wondervale-map-art" src="${ADDITIONAL_BUSINESS_ART.wondervaleMap}" alt="WonderVale park map"><b>FOLD-OUT PARK MAP</b><span>Includes ride facts, height grid, and the shortest route to emergency lemonade.</span><button type="button" data-business-download="wondervale">DOWNLOAD PARK MAP &amp; HEIGHT GUIDE</button></aside></section>
      <footer>WonderVale Amusement Park &middot; Route 17 at Thunder Hill &middot; Weather line 555-RIDE &middot; Rides subject to weather and mechanical mood</footer>
    </main>`
  },
  {
    slug: "greenstripe",
    mark: "GS",
    name: "GREENSTRIPE LAWN CARE",
    note: "A lawn service that talks about straight stripes like civic morality. They know the dead patch your neighbors call Gerald.",
    url: "web://greenstripe.lawn/home",
    title: "GreenStripe Lawn Care",
    site: "lawnbusiness",
    summary: "GreenStripe Lawn Care is a local service offering scheduled mowing, trimming, edging, spring cleanup, leaf removal, shrub trimming, and vacation cuts.",
    searchTerms: ["lawn", "lawn service", "lawn care", "mowing", "grass", "yard", "leaves", "landscaping", "hedge", "greenstripe"],
    render: () => `<main class="page expansion-business-page lawn-greenstripe">
      <header><img class="greenstripe-mark-art" src="${ADDITIONAL_BUSINESS_ART.greenstripeMark}" alt="GreenStripe Lawn Care emblem"><div class="greenstripe-logo"><b>GREEN</b><span>STRIPE</span><i>LAWN CARE</i></div><img class="page-sprinkle greenstripe-header-gif" src="${BUSINESS_WEB_GIFS.mowerOne}" alt="Animated lawn mower"><aside>FREE ESTIMATES<br><b>555-MOW1</b></aside></header>
      <nav><span>MOWING</span><span>CLEANUPS</span><span>SHRUBS</span><span>SERVICE AREA</span><span>LAWN TIPS</span></nav>
      <figure class="business-scene-hero"><img src="${ADDITIONAL_BUSINESS_ART.heroGreenstripe}" alt="A GreenStripe worker mowing precise stripes beside a conspicuously neglected lawn"></figure>
      <section class="greenstripe-hero"><div><small>LOCAL CREWS. STRAIGHT LINES.</small><h1>Your Saturday<br>belongs to you.</h1><p>Weekly and every-other-week mowing for homes and small businesses in Dynamo City, West Bellwater, and nearby neighborhoods.</p><button type="button" data-business-tab-target="service-area">VIEW SERVICE AREA</button></div><div class="greenstripe-proof web-era-graphic" aria-label="GreenStripe before-and-after lawn-care example"><img src="${ADDITIONAL_BUSINESS_ART.greenstripeLawn}" alt="The same suburban lawn before and after GreenStripe service"><span class="greenstripe-proof-time greenstripe-proof-time-before">BEFORE // 8:05 AM</span><span class="greenstripe-proof-time greenstripe-proof-time-after">AFTER // 8:42 AM</span><b class="greenstripe-proof-result greenstripe-proof-result-before">OVERGROWN</b><b class="greenstripe-proof-result greenstripe-proof-result-after">CUT · EDGED · CLEARED</b></div></section>
      <section class="greenstripe-services"><article><span class="greenstripe-service-art web-era-graphic"><img src="${ADDITIONAL_BUSINESS_ART.greenstripeMower}" alt="GreenStripe walk-behind mower"></span><b>WEEKLY MOW</b><p>Mow, trim around obstacles, edge walks, and blow clippings from pavement.</p><em>from $22</em></article><article><span class="greenstripe-service-art web-era-graphic"><img src="${ADDITIONAL_BUSINESS_ART.greenstripeLeaf}" alt="GreenStripe lawn-care leaf sticker"></span><b>SPRING CLEANUP</b><p>Leaves, sticks, first cut, bed edges, and one conversation about the dead patch.</p><em>from $75</em></article><article><img class="page-sprinkle greenstripe-mower-gif" src="${BUSINESS_WEB_GIFS.mowerTwo}" alt="Animated riding mower"><span class="greenstripe-service-art web-era-graphic"><img src="${ADDITIONAL_BUSINESS_ART.greenstripeLeaf}" alt="Autumn leaf-removal service sticker"></span><b>FALL LEAVES</b><p>Curb-ready leaf removal or haul-away service through first snow.</p><em>estimate</em></article></section>
      <section class="greenstripe-checklist"><img class="page-sprinkle greenstripe-flowers-gif" src="${BUSINESS_WEB_GIFS.flowers}" alt="Animated flowers"><h2>WHAT WE PROMISE</h2><ul><li>Same service day whenever weather allows</li><li>Gate latched when we leave</li><li>Clippings kept out of flower beds</li><li>No surprise fertilizer applications</li><li>A call if rain pushes us more than one day</li><li>Stripes aligned with the sidewalk, not the neighbor's envy</li></ul></section>
      <aside><b>VACATION CUTS:</b> Going away for two or three weeks? Call by Thursday and we can usually fit your yard into the route.</aside>
      <footer>GreenStripe Lawn Care &middot; Owner-operated since 1994 &middot; Insured &middot; Residential and light commercial</footer>
    </main>`
  },
  {
    slug: "hankstank",
    mark: "HT",
    name: "HANK'S TANK & FIELD",
    note: "Hank explains septic tanks like a country philosopher. Every tank confesses eventually, and he has a theory about your yard.",
    url: "web://hankstank.septic/home",
    title: "Hank's Tank & Field Septic Service",
    site: "septicbusiness",
    summary: "Hank's Tank & Field is a rural septic service providing tank pumping, inspections, baffle checks, filter cleaning, field-line locating, and practical maintenance advice.",
    searchTerms: ["septic", "septic tank", "septic cleaning", "tank pumping", "rural", "waste", "drain field", "inspection", "hank tank"],
    render: () => `<main class="page expansion-business-page septic-hank">
      <header><div class="hank-brand"><div class="hank-badge">HANK'S<br><b>TANK</b><br>&amp; FIELD</div><img class="hank-truck-art" src="${ADDITIONAL_BUSINESS_ART.hankstankTruck}" alt="Hank's Tank septic service truck"></div><div><small>RURAL SEPTIC SERVICE &middot; PUMPING &middot; INSPECTION &middot; LOCATING</small><h1>We know what's<br>under the grass.</h1></div><img class="page-sprinkle hank-truck-gif" src="${BUSINESS_WEB_GIFS.truck}" alt="Animated service truck"></header>
      <nav><button type="button">PUMPING</button><button type="button">INSPECTION</button><button type="button">FIELD LOCATING</button><button type="button">EMERGENCY INFORMATION</button></nav>
      <figure class="business-scene-hero"><img src="${ADDITIONAL_BUSINESS_ART.heroHankstank}" alt="Hank inspecting a rural yard beside his septic pumping truck"></figure>
      <section class="hank-emergency"><img class="page-sprinkle hank-faucet-gif" src="${BUSINESS_WEB_GIFS.faucet}" alt="Animated leaking faucet"><b>BACKING UP RIGHT NOW?</b><span>Stop running water. Keep people away from the affected area. Call the emergency line: <strong>555-0767</strong></span></section>
      <section class="hank-layout"><article><h2>REGULAR PUMPING</h2><p>Most households should have the tank inspected and pumped on a schedule based on tank size, household size, and actual use. We measure both layers, inspect accessible baffles, and tell you what we found.</p><ul><li>Residential tank pumping</li><li>Access-lid locating</li><li>Effluent-filter cleaning</li><li>Real-estate inspections</li><li>Field-line locating</li></ul></article><div class="hank-diagram"><img src="${ADDITIONAL_BUSINESS_ART.hankstankDiagram}" alt="Septic tank and drain-field diagram"></div></section>
      <section class="hank-signs"><h2>CALL BEFORE IT BECOMES A STORY</h2><div><b>SLOW DRAINS</b><span>throughout the house, not just one sink</span></div><div><b>ODORS</b><span>near the tank or field area</span></div><div><b>WET GROUND</b><span>especially during dry weather</span></div><div><b>TOO MUCH TIME</b><span>since anybody remembers pumping</span></div><p>Hank's rule: if the yard is bubbling, nobody needs a second opinion from the internet.</p></section>
      <aside><img class="page-sprinkle hank-tractor-gif" src="${BUSINESS_WEB_GIFS.tractor}" alt="Animated farm tractor"><b>SERVICE AREA:</b> Quiet County, North Reservoir Township, Pine Cut, rural Bellwater, and most addresses that require directions involving a grain silo.</aside>
      <footer>Hank's Tank &amp; Field &middot; Licensed county waste hauler &middot; Weekday routes + emergency calls &middot; Please mark the gate the dog uses</footer>
    </main>`
  },
  {
    slug: "pixelpetal",
    mark: "PP",
    name: "PIXEL PETAL DESIGN",
    note: "Design Is My Passion as a business: splash screens, fourteen fonts, frames, cursor trails, and awards she gave herself.",
    url: "web://pixelpetal.design/home",
    title: "Pixel Petal Graphic & Web Design",
    site: "webdesignbusiness",
    summary: "Pixel Petal is a local freelance graphic and web design studio creating logos, flyers, menus, advertisements, banners, buttons, and small-business websites.",
    searchTerms: ["graphic design", "web design", "web designer", "website", "homepage", "logo", "flyer", "banner", "button", "business card", "pixel petal"],
    render: () => `<main class="page expansion-business-page design-pixelpetal">
      <header><img class="pixelpetal-mark-art" src="${ADDITIONAL_BUSINESS_ART.pixelpetalMark}" alt="Pixel Petal Design flower emblem"><div><h1>PIXEL<span>PETAL</span></h1><p>graphic design + websites for growing businesses</p></div><img class="page-sprinkle pixelpetal-paint-gif" src="${BUSINESS_WEB_GIFS.paint}" alt="Animated paint palette"><blink>NOW ACCEPTING<br>WINTER PROJECTS!</blink></header>
      <nav><button type="button">HOME</button><button type="button">WEB</button><button type="button">PRINT</button><button type="button">LOGOS</button><button type="button">PORTFOLIO</button><button type="button">CONTACT</button></nav>
      <figure class="business-scene-hero"><img src="${ADDITIONAL_BUSINESS_ART.heroPixelpetal}" alt="Pixel Petal's crowded late-1990s graphic design workstation"></figure>
      <marquee scrollamount="3">WELCOME TO PIXEL PETAL DESIGN *** YOUR BUSINESS DESERVES MORE THAN BLACK TEXT ON A GRAY PAGE *** ASK ABOUT MATCHING E-MAIL SIGNATURES!</marquee>
      <section class="pixelpetal-intro"><div><small>HELLO! I'M DANA.</small><h2>I make small businesses look like themselves.</h2><p>Whether you need one sharp flyer or your first complete website, I can build a visual identity that feels friendly, memorable, and easy to use on the computers your customers actually own. I promise not to put your phone number inside a spinning GIF.</p><button type="button" data-business-download="pixelpetal">DOWNLOAD SITE AWARD BADGE PACK</button></div><aside><img class="page-sprinkle pixelpetal-floppy-gif" src="${BUSINESS_WEB_GIFS.floppy}" alt="Animated floppy disk"><b>THIS SITE FEATURES</b><ul><li>custom logo</li><li>optimized graphics</li><li>tables that behave</li><li>no required plug-ins</li><li>only one tasteful animation*</li></ul><small>*the flower counts as one</small></aside></section>
      <section class="pixelpetal-windows"><article><header>WEB STARTER EXTREME</header><p>Five pages, two splash screens, guestbook, hit counter, cursor trail, frames, and optional MIDI sunrise.</p><b>from $425</b></article><article><img class="page-sprinkle pixelpetal-crayons-gif" src="${BUSINESS_WEB_GIFS.crayons}" alt="Animated crayons"><header>IDENTITY SPROUT DELUXE</header><p>Primary, metallic, flaming, spinning, and one-color logos on ZIP disk. Readable version costs extra.</p><b>from $300</b></article><article><header>PRINT PATCH</header><p>Menus and flyers with gradients, bevels, starbursts, lens flares, and no unused white space.</p><b>estimate</b></article></section>
      <section class="pixelpetal-portfolio"><h2>RECENTLY PLANTED</h2><article><img src="${ADDITIONAL_BUSINESS_ART.pixelpetalCoffee}" alt="Colorful late-1990s coffee shop menu"><b>MOONBEAN MENU</b><span>Two-sided cafe menu with a coffee ring that is part of the design.</span></article><article><img src="${ADDITIONAL_BUSINESS_ART.pixelpetalLandscaper}" alt="Hand-painted landscaper sign"><b>GREEN THUMB IDENTITY</b><span>Truck-door logo, yard sign, and one extremely legible phone number.</span></article><article><img src="${ADDITIONAL_BUSINESS_ART.pixelpetalFundraiser}" alt="Bright school fundraiser flyer"><b>READ-A-THON FLYER</b><span>Photocopy-safe event sheet with stars that remain stars in grayscale.</span></article><article><img src="${ADDITIONAL_BUSINESS_ART.pixelpetalFlorist}" alt="Florist website shown on a CRT monitor"><b>SNAPDRAGON HOMEPAGE</b><span>Four-page florist site with bouquet thumbnails and no plug-ins.</span></article></section>
      <footer><b>COOL SMALL BUSINESS SITE AWARD '99</b> &middot; Pixel Petal Design, Dynamo City &middot; Best viewed at 800 x 600 &middot; Built by hand</footer>
    </main>`
  },
  {
    slug: "maximart",
    mark: "MAX",
    name: "MAXI-MART SUPERSTORES",
    note: "A 47-department store replacing the grocery, garage, photographer, town square, weather shelter, and maybe your family.",
    url: "web://maximart.com/home",
    title: "Maxi-Mart Superstores",
    site: "superstorebusiness",
    summary: "Maxi-Mart is a national superstore chain selling groceries, clothing, electronics, housewares, toys, automotive goods, pharmacy items, and nearly everything else.",
    searchTerms: ["superstore", "department store", "discount store", "shopping", "groceries", "electronics", "clothing", "pharmacy", "automotive", "toys", "maxi mart"],
    render: () => `<main class="page expansion-business-page store-maximart">
      <header><img class="maximart-mark-art" src="${ADDITIONAL_BUSINESS_ART.maximartMark}" alt="Maxi-Mart Superstores emblem"><div class="maximart-logo">MAXI<span>-MART</span><i>SUPERSTORES</i></div><form><label>Find it at Maxi-Mart <input aria-label="Search products" placeholder="What are you looking for?"></label><button type="button">SEARCH</button></form><b>EVERYDAY<br>LOWER PRICES</b></header>
      <nav>WEEKLY AD | STORE FINDER | DEPARTMENTS | PHARMACY | PHOTO | AUTO CENTER | COMPANY INFO</nav>
      <figure class="business-scene-hero"><img src="${ADDITIONAL_BUSINESS_ART.heroMaximart}" alt="An enormous Maxi-Mart superstore and parking lot at blue hour"></figure>
      <section class="maximart-banner"><div><img class="business-art maximart-storefront-art" src="${ADDITIONAL_BUSINESS_ART.maximartStorefront}" alt="Maxi-Mart superstore facade"><small>THIS WEEK'S BIG VALUE</small><h1>FILL THE CART.<br><b>KEEP THE CHANGE.</b></h1><p>School supplies, pantry basics, fall clothing, electronics, and thousands of everyday items under one very large roof. If you cannot find an aisle, follow the sound of a price scanner.</p></div><aside><img class="business-art maximart-tag-art" src="${ADDITIONAL_BUSINESS_ART.maximartTag}" alt="Maxi-Mart rollback price tag"><span>SAVE</span><b>$20</b><p>19-inch color television</p><em>now $179</em></aside></section>
      <section class="maximart-departments"><h2>SHOP DEPARTMENTS</h2><p class="maximart-department-hint">Pick a department for aisle notes, current specials, and the sort of helpful detail that fits on a 1999 modem connection.</p><div><button type="button" data-maximart-department="grocery">GROCERY</button><button type="button" data-maximart-department="clothing">CLOTHING</button><button type="button" data-maximart-department="electronics">ELECTRONICS</button><button type="button" data-maximart-department="home">HOME</button><button type="button" data-maximart-department="toys">TOYS</button><button type="button" data-maximart-department="sporting-goods">SPORTING GOODS</button><button type="button" data-maximart-department="automotive">AUTOMOTIVE</button><button type="button" data-maximart-department="lawn-and-garden">LAWN &amp; GARDEN</button><button type="button" data-maximart-department="pharmacy">PHARMACY</button><button type="button" data-maximart-department="photo-center">PHOTO CENTER</button><button type="button" data-maximart-department="crafts">CRAFTS</button><button type="button" data-maximart-department="see-all-47">SEE ALL 47</button></div></section>
      <section class="maximart-department-detail" data-maximart-detail aria-live="polite"><h2 data-maximart-detail-title>GROCERY</h2><p data-maximart-detail-description>Fresh produce, freezer dinners, and a suspiciously large wall of cereal.</p><ul data-maximart-detail-list><li>Aisle 1: breakfast systems</li><li>Aisle 12: pantry staples</li><li>Rollback watch: family-size snacks</li></ul></section>
      <section class="maximart-specials"><article><img src="${ADDITIONAL_BUSINESS_ART.maximartToaster}" alt="Maxi-Mart four-slice toaster"><small>MAXI-SAVER</small><b>$9.88</b><span>four-slice toaster</span></article><article><img src="${ADDITIONAL_BUSINESS_ART.maximartPhone}" alt="Maxi-Mart cordless telephone"><small>MAXI-SAVER</small><b>$14.96</b><span>basic cordless phone</span></article><article><img src="${ADDITIONAL_BUSINESS_ART.maximartDiskettes}" alt="Maxi-Mart blank diskettes"><small>MAXI-SAVER</small><b>$6.44</b><span>24-pack blank diskettes</span></article><article><img src="${ADDITIONAL_BUSINESS_ART.maximartShirt}" alt="Maxi-Mart denim shirt"><small>MAXI-SAVER</small><b>$3.00</b><span>adult denim shirt</span></article></section>
      <aside><b>YOUR LOCAL MAXI-MART:</b><span>Dynamo City Supercenter #1844 &middot; Open 24 hours &middot; Pharmacy 9-9 &middot; Tire &amp; Lube 7-7</span><button type="button" data-business-tab-target="store-finder">VIEW STORE DETAILS</button><button type="button" data-business-mail="maximart">EMAIL WEEKLY CIRCULAR</button><button type="button" data-business-download="maximart">DOWNLOAD AISLE MAP</button></aside>
      <footer>&copy; 1999 Maxi-Mart Stores, Inc. &middot; Careers &middot; Vendor Information &middot; Privacy &middot; Product availability varies by store and by whether aisle 47 has been reorganized again.</footer>
    </main>`
  }
];

export const ADDITIONAL_BUSINESS_LINKS: AdditionalBusinessLink[] = pages.map(({ slug, mark, name, note, url }) => ({
  slug,
  mark,
  name,
  note,
  url
}));

export const additionalBusinessPages: Record<string, PageDefinition> = Object.fromEntries(pages.map((page) => [
  page.url,
  {
    url: page.url,
    title: page.title,
    site: page.site,
    ownerId: ADDITIONAL_BUSINESS_OWNERS[page.slug].id,
    summary: page.summary,
    commentsEnabled: true,
    seedComments: seedCommentsFor(page, ADDITIONAL_BUSINESS_OWNERS[page.slug].id),
    listed: true,
    hubId: "business",
    searchTerms: page.searchTerms,
    render: page.render
  }
]));
