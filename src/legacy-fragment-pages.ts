import type { PageDefinition } from "./types";

type LegacyLayout = "plain" | "personal" | "newsletter" | "company" | "farewell";

interface DormantLegacyAccount {
  id: string;
  screenName: string;
  displayName: string;
  url: string;
  title: string;
  year: string;
  layout: LegacyLayout;
  background: string;
  ink: string;
  accent: string;
  logo: string;
  summary: string;
  heading: string;
  paragraphs: string[];
  missingMedia?: string;
  recoveryStrip?: { position: number; word: string };
  methodRouteFragment?: { position: number; text: string };
  footer: string;
  rumor: string;
}

const logo = (name: string) =>
  new URL(`../assets/images/legacy-fragments/${name}.png`, import.meta.url).href;

export const DORMANT_LEGACY_ACCOUNTS: readonly DormantLegacyAccount[] = [
  {
    id: "orbit_mechanic", screenName: "OrbitalMechanic", displayName: "Mack",
    url: "web://oldnet.orbit/users/orbitalmechanic", title: "Orbit Systems User Group", year: "1993", layout: "plain",
    background: "#ece7cd", ink: "#111133", accent: "#782a78", logo: logo("orbit-wrench"),
    summary: "A 1993 user-group note celebrates OrbitOS repair nights, upgrade rumors, and the belief that one integrated network could outlast the big computer companies.",
    heading: "ORBIT SYSTEMS USER GROUP — NODE 004",
    paragraphs: [
      "We meet every second Thursday behind Belltower TV Repair. Bring your Orbit terminal, keyboard, manuals, and every screw you removed. Version 2.0 is supposed to add color mail, two-way page links, and a common address book.",
      "The big guys sell a machine and leave you alone. Orbit feels like somebody left the clubhouse lights on. If they keep the network tied to the system, no newcomer will ever have to learn six different programs just to say hello."
    ],
    missingMedia: "GROUP_PHOTO.IMG — host not responding",
    recoveryStrip: { position: 1, word: "STAY" },
    footer: "Last repaired 10/14/93 by Mack",
    rumor: "Old Orbit boxes have a maintenance map behind the wrench logo. Mine points to a room the building plans do not show."
  },
  {
    id: "starport_sally", screenName: "StarportSally", displayName: "Sally",
    url: "web://starport.page/sally", title: "Sally's Starport", year: "1993", layout: "personal",
    background: "#000044", ink: "#ffff66", accent: "#ff55cc", logo: logo("starport-rocket"),
    summary: "A teenager's 1993 homepage imagines OrbitOS turning every bedroom into a launch pad for games, astronomy clubs, and faraway friendships.",
    heading: "SALLY'S STARPORT!!!",
    paragraphs: [
      "Dad says fourteen-four is already too much modem, but when the new Orbit Explorer ships I am joining the Skywatch circle and trading telescope logs with kids in three states. Someday pages will have moving pictures and maybe even sound.",
      "Current favorites: Comet Ranger shareware, Lunar Lunchbox, drawing spaceships in OrbitPaint, and leaving messages for people who are asleep."
    ],
    missingMedia: "MY_BIG_ROCKET.ANI — animation translator missing",
    footer: "You are visitor 000031 • Come back after the Explorer upgrade!",
    rumor: "The Starport launch game used real coordinates. One of them matches a fenced lot outside Dynamo City."
  },
  {
    id: "bytestreet_ed", screenName: "ByteStreetEd", displayName: "Ed Mercer",
    url: "web://bytestreet.press/94/orbit", title: "Byte Street Weekly: One Network, One Desktop", year: "1994", layout: "newsletter",
    background: "#f4f0df", ink: "#181818", accent: "#8d1d1d", logo: logo("bytestreet-news"),
    summary: "A 1994 technology newsletter reviews Orbit's attempt to fuse an operating system, browser, private network, and user community.",
    heading: "BYTE STREET WEEKLY",
    paragraphs: [
      "Orbit Systems is betting that consumers do not want to assemble an online life from unrelated software. OrbitOS includes its own browser, mail, address book, page builder, billing account, and curated private network.",
      "The approach is wonderfully coherent and dangerously isolated. Regular web users can enter through Orbit Bridge, but installation is awkward and translated pages frequently lose tables, forms, and media. Orbit says integration is the advantage; the market may decide it is a wall."
    ],
    missingMedia: "Figure 2: Orbit Bridge setup screen unavailable",
    methodRouteFragment: { position: 1, text: "web://archive.orbitnet.local" },
    footer: "Vol. 3 No. 18 • Reprinted by permission • May 1994",
    rumor: "Byte Street received Orbit traffic totals a week before each report period ended. Ed thought it was a clerical mistake."
  },
  {
    id: "disc_harold", screenName: "DiscHarold", displayName: "Harold Venn",
    url: "web://horizondisc.co/catalog", title: "Horizon Disc Company", year: "1994", layout: "company",
    background: "#c8d7e8", ink: "#10224d", accent: "#713d87", logo: logo("horizon-disc"),
    summary: "A tiny 1994 catalog sells multimedia reference discs and promises automatic Orbit page updates from each quarterly CD-ROM edition.",
    heading: "HORIZON DISC COMPANY — MULTIMEDIA FOR THE WHOLE DESK",
    paragraphs: [
      "Our quarterly discs combine articles, maps, diagrams, recorded narration, and a companion Orbit page. Install Horizon Link and your online index updates whenever a new disc is inserted.",
      "Available now: World Window '94, Household Repair Library, Great Machines, and the six-disc Junior Discovery Shelf. Please allow four to six weeks for delivery."
    ],
    missingMedia: "CATALOG_COVERS.JPG / 64K — object expired",
    footer: "Orders: 1-555-DISC • This server accepts no payment information",
    rumor: "World Window has an unlisted thirteenth audio track. It sounds like a modem reading coordinates."
  },
  {
    id: "garden_gale", screenName: "GardenGale", displayName: "Gale",
    url: "web://telegarden.home/demo", title: "TeleGarden Home Control", year: "1995", layout: "company",
    background: "#d9efc9", ink: "#18421d", accent: "#a02770", logo: logo("telegarden-plug"),
    summary: "A 1995 home-automation seller demonstrates telephone-controlled lamps, sprinklers, thermostats, and an experimental Orbit status page.",
    heading: "TeleGarden makes your house answer the phone.",
    paragraphs: [
      "Call home, enter your four-digit garden code, and control up to eight low-voltage devices. The deluxe Orbit module shows lamp, sprinkler, thermostat, and soil-sensor status from any connected terminal.",
      "Orbit control remains a demonstration feature. Do not connect aquarium pumps, medical equipment, garage doors, or anything that becomes dangerous when our server guesses wrong."
    ],
    missingMedia: "LIVE HOUSE DIAGRAM — OrbitTag CONTROL_PANEL unsupported",
    footer: "TeleGarden Consumer Automation • Patent pending • 1995",
    rumor: "The TeleGarden demo changed a lamp before Gale sent the command. Support blamed line delay, which is the opposite of an explanation."
  },
  {
    id: "silverdial_support", screenName: "SilverDialHelp", displayName: "SilverDial Support",
    url: "web://silverdial.net/start", title: "SilverDial Network Starter Page", year: "1994", layout: "company",
    background: "#dedede", ink: "#000066", accent: "#008b8b", logo: logo("silverdial-modem"),
    summary: "A regional access provider offers dial-up plans and a cumbersome gateway for reaching Orbit pages from ordinary personal computers.",
    heading: "SILVERDIAL REGIONAL NETWORK ACCESS",
    paragraphs: [
      "SilverDial members can now request experimental Orbit Bridge access. Installation requires Bridge Runtime 1.6, a registered network identity, three megabytes of free disk space, and manual entry of the Orbit routing table.",
      "Some Orbit pages will appear misaligned or incomplete. Native Orbit forms, live rooms, sound objects, and private circles are not supported. For the intended experience, SilverDial recommends an OrbitOS terminal."
    ],
    missingMedia: "DOWNLOAD BRIDGE 1.6 — file removed from public mirror",
    footer: "Support bulletin SD-114 • Revised 08/22/94",
    rumor: "SilverDial modems sometimes whispered account names after the handshake. Support said users were hearing compression noise."
  },
  {
    id: "pixelpost_penny", screenName: "PixelPostPenny", displayName: "Penny",
    url: "web://pixelpost.news/bridge", title: "Pixel Post: Orbit Opens a Bridge", year: "1995", layout: "newsletter",
    background: "#fff8d1", ink: "#28200d", accent: "#d1441e", logo: logo("pixelpost-news"),
    summary: "A short 1995 online-news item reports Orbit's effort to open its private community through a regular-web gateway.",
    heading: "PIXEL POST NETWORK NEWS",
    paragraphs: [
      "Orbit Systems has opened a public gateway to its once-private page network. The company hopes millions of ordinary web users will visit Orbit clubs without purchasing OrbitOS hardware.",
      "Our test was uneven. Text and basic images survived, but navigation widgets vanished, tables collapsed, and two community pages became a single purple column. Orbit promises a rewritten gateway before winter."
    ],
    missingMedia: "Before/after gateway comparison did not survive conversion",
    footer: "Filed 03/07/95 at 09:12 • Penny V.",
    rumor: "Pixel Post's copied outage notices were timestamped hours before the outages began."
  },
  {
    id: "northlake_ned", screenName: "NorthLakeNed", displayName: "Ned",
    url: "web://northlake.club/orbit", title: "North Lake Computer Club Orbit Notes", year: "1994", layout: "plain",
    background: "#e4f4fa", ink: "#123348", accent: "#347ab7", logo: logo("northlake-club"),
    summary: "A local computer club records its move from a bulletin board to Orbit pages and the problems encountered by members using other machines.",
    heading: "NORTH LAKE COMPUTER CLUB",
    paragraphs: [
      "The club message board has moved to Orbit for a six-month trial. Native users can join the meeting room from the CLUB menu. Everyone else must dial our BBS, download the weekly bridge packet, and copy the address list by hand.",
      "This is not ideal, but the shared page editor is the first system simple enough for three committee chairs to update without calling Ned."
    ],
    missingMedia: "Map to Tuesday meeting — BROKEN IMAGE",
    footer: "Secretary's note, 11/1994 • 47 paid members",
    rumor: "Our disconnected club terminal kept recording logins. Ned boxed it up, and the login count still rose."
  },
  {
    id: "nora_lamp", screenName: "NoraSaysBye", displayName: "Nora Bell",
    url: "web://goodnight.nora/home", title: "Nora's Last Orbit Page", year: "1996", layout: "farewell",
    background: "#10153d", ink: "#d7d9ff", accent: "#ffd36b", logo: logo("goodnight-lamp"),
    summary: "A quiet 1996 goodbye page explains that its owner is moving to the regular web because her friends no longer check Orbit.",
    heading: "good night, orbit",
    paragraphs: [
      "I liked having a little place where everybody knew which buttons worked. Now half my address book has moved and the other half only signs on to say they are moving.",
      "My new page is somewhere on the regular web. The forwarding button broke, so if you know me, ask. I am leaving this lamp on until they switch the old pages off."
    ],
    missingMedia: "FRIENDS96.JPG is no longer stored on this node",
    recoveryStrip: { position: 2, word: "ON" },
    footer: "Nora • 06/18/96 • no more updates",
    rumor: "Nora's goodbye sentence changes after midnight. She has not had an Orbit account since 1996."
  },
  {
    id: "crate_carl", screenName: "CrateSoftCarl", displayName: "Carl",
    url: "web://cratesoft.biz/shareware", title: "CrateSoft Shareware Depot", year: "1994", layout: "company",
    background: "#d8c7a4", ink: "#2e1c0c", accent: "#8b4513", logo: logo("cratesoft-floppy"),
    summary: "A mail-order shareware shop sells floppy collections and briefly experiments with downloadable Orbit software crates.",
    heading: "CRATESOFT — A WHOLE CRATE OF PROGRAMS",
    paragraphs: [
      "Each themed crate contains ten tested shareware programs on labeled disks with a printed index. Game Crate, Office Crate, Kids Crate, Modem Crate, and our new Orbit Builder Crate are $12.95 each.",
      "Orbit users may download individual files from Warehouse Node 7. The download room is temporarily closed because the counter reports more copies leaving than files requested."
    ],
    missingMedia: "WAREHOUSE NODE 7 — access object missing",
    footer: "Catalog 4B • Prices good through December 1994",
    rumor: "CrateSoft's download counter made extra copies by itself. Carl found disks addressed to users who never ordered."
  },
  {
    id: "nestmom_94", screenName: "NestMom94", displayName: "Linda",
    url: "web://netnest.family/welcome", title: "The NetNest Family Page Kit", year: "1994", layout: "company",
    background: "#fff0dc", ink: "#4c2e25", accent: "#b85a3f", logo: logo("netnest-monitor"),
    summary: "A family-page kit promises safe templates, a shared calendar, recipe cards, and simple Orbit publishing for first-time computer owners.",
    heading: "Put your family on the information highway!",
    paragraphs: [
      "NetNest includes six friendly page designs, a birthday calendar, recipe cards, a family-tree form, and private notes for relatives. No programming is required. Choose a color, type your news, and press PUBLISH.",
      "The public gallery is unavailable through Orbit Bridge. Native users may still reach it from HOME PLANET / FAMILY SHOWCASE."
    ],
    missingMedia: "Sample family portrait hidden by privacy filter",
    footer: "NetNest Home Software • Version 1.2 • 1994",
    rumor: "NetNest added a child to Linda's family tree before anyone entered the name. The birthday was three years away."
  },
  {
    id: "library_lou", screenName: "FuturaLou", displayName: "Lou",
    url: "web://futura.library/kiosk", title: "Futura Library Information Kiosk", year: "1995", layout: "plain",
    background: "#eee9d8", ink: "#162a54", accent: "#556b2f", logo: logo("futura-library"),
    summary: "A library pilot page introduces public Orbit kiosks for catalogs, community notices, and guided access to online reference material.",
    heading: "FUTURA PUBLIC LIBRARY — ELECTRONIC REFERENCE DESK",
    paragraphs: [
      "Two Orbit kiosks are now available beside the reference desk. Visitors may search our catalog, read local notices, explore selected information pages, and send questions to participating libraries.",
      "Sessions are limited to twenty minutes. The system does not save personal documents. Please do not unplug the trackball because you dislike the cursor."
    ],
    missingMedia: "KIOSK_FLOORPLAN.BMP could not be decoded",
    methodRouteFragment: { position: 2, text: "/labs/method" },
    footer: "Pilot funded through 12/1995 • Ask Lou for a demonstration",
    rumor: "The kiosk recommended books that had not been purchased yet. One recommendation described tomorrow's front page."
  },
  {
    id: "dynamo_digest", screenName: "DynamoDigest", displayName: "Dynamo Business Digest",
    url: "web://dynamo.bizwire/orbit-falls", title: "Orbit Usage Falls Below Carrier Target", year: "1996", layout: "newsletter",
    background: "#f1f1f1", ink: "#101010", accent: "#7c2222", logo: logo("decline-chart"),
    summary: "A 1996 business brief reports shrinking Orbit utilization, carrier-delisting pressure, and a late plan to simulate broader network reach.",
    heading: "DYNAMO BUSINESS DIGEST",
    paragraphs: [
      "Orbit Community Services has fallen near the utilization floor required by its national carrier agreement. Formerly busy clubs now average fewer than two updates per month, and gateway traffic has not replaced departing native users.",
      "Orbit says distributed proxy checks will make the network appear reliably available from outside regions. Executives would not say whether machine-generated health sessions count toward the carrier's active-use requirement."
    ],
    missingMedia: "Quarterly utilization chart removed at publisher request",
    footer: "Market Brief 96-41 • 09/30/96",
    rumor: "The published Orbit totals never crossed the shutdown line. The office phone logs show the network dialing itself all night."
  },
  {
    id: "linkwarden_ian", screenName: "LinkWarden", displayName: "Ian Ward",
    url: "web://linkwarden.help/gateway", title: "LinkWarden's Orbit Bridge Survival Guide", year: "1995", layout: "plain",
    background: "#d6e0c8", ink: "#152214", accent: "#6b4a16", logo: logo("linkwarden-key"),
    summary: "An unofficial setup guide helps regular-web users survive Orbit Bridge installation and interpret pages damaged by gateway emulation.",
    heading: "LINKWARDEN'S BRIDGE SURVIVAL GUIDE 2.3",
    paragraphs: [
      "If an Orbit page becomes a vertical wall of words, disable table recovery and reload. If every button reads OBJECT, switch the control pack to COMPATIBLE. If the address loops, delete BRIDGE.ROUTE and type it again.",
      "Do not install three gateway versions at once. Yes, people keep doing this. No, the newest one is not always the correct one."
    ],
    missingMedia: "Step-by-step screenshots omitted to save 188K",
    footer: "Unofficial help • Not affiliated with Orbit • Updated 01/1995",
    rumor: "Holding the LinkWarden key during reload opens addresses absent from every directory. Ian called them maintenance shadows."
  },
  {
    id: "teacher_peach", screenName: "MsPeachClass", displayName: "Ms. Peach",
    url: "web://peachtree.school/room4", title: "Room Four's Orbit Exchange", year: "1995", layout: "personal",
    background: "#fff3b8", ink: "#3d2a13", accent: "#d35e35", logo: logo("peachtree-school"),
    summary: "An elementary classroom shares weather observations and questions with other schools through the old Home Planet community.",
    heading: "WELCOME TO ROOM FOUR!",
    paragraphs: [
      "We are learning how children in other places live. Every Friday we post our temperature, one drawing, one local fact, and a question for our partner classrooms.",
      "This week we measured 51 degrees and light rain. Our question: what is the oldest tree near your school? Please write your town and teacher's name."
    ],
    missingMedia: "TWENTY-THREE STUDENT DRAWINGS — classroom image disk offline",
    footer: "Peachtree Elementary • Ms. Peach • School year 1995-96",
    rumor: "Room Four received weather logs from a school nobody can locate. The replies used the students' nicknames."
  },
  {
    id: "signal_spring", screenName: "SignalSpringWx", displayName: "SignalSpring Weather",
    url: "web://signalspring.weather/home", title: "SignalSpring Neighborhood Weather", year: "1995", layout: "company",
    background: "#c7eef0", ink: "#083641", accent: "#397480", logo: logo("signalspring-vane"),
    summary: "A small weather service publishes dial-in neighborhood observations and sells an Orbit-connected home sensor kit.",
    heading: "SIGNALSPRING LOCAL WEATHER NODE",
    paragraphs: [
      "Our rooftop instruments update temperature, wind, rain, and pressure every fifteen minutes. Home observers can add readings with the SignalSpring sensor coil and Orbit WeatherLink.",
      "Forecasts cover Dynamo City only. Do not call about weather in another state, aviation conditions, or whether a picnic feels like a good idea."
    ],
    missingMedia: "LIVE WEATHER MAP — last frame 02/04/96",
    footer: "Current reading unavailable • Sensor line retired",
    rumor: "SignalSpring's final forecast described callers as angry, lonely, or afraid instead of predicting weather."
  },
  {
    id: "mall_marla", screenName: "MallMarla", displayName: "Marla",
    url: "web://homeplanet.mall/directory", title: "Home Planet Electronic Mall", year: "1995", layout: "company",
    background: "#e9d8f1", ink: "#40204b", accent: "#b83f98", logo: logo("homeplanet-mall"),
    summary: "An early electronic-mall directory collects local catalogs but still requires shoppers to order by telephone or postal mail.",
    heading: "HOME PLANET ELECTRONIC MALL",
    paragraphs: [
      "Browse thirty-two local stores from your Orbit terminal! View product lists, print order forms, and call the merchant directly. Secure online purchasing is planned for a future release.",
      "Featured departments: gifts, home electronics, books, hobbies, children's goods, travel, flowers, and computer supplies. Many catalogs were last verified in spring."
    ],
    missingMedia: "STORE BUTTON WALL — 29 of 32 objects unavailable",
    footer: "Mall directory revision 7 • Managed by Marla K.",
    rumor: "The old mall directory sometimes lists a basement shop called TOMORROW'S RETURNS. No merchant remembers leasing it."
  },
  {
    id: "orbit_games_gary", screenName: "OrbitGamesGary", displayName: "Gary",
    url: "web://launchring.games/preview", title: "Gary's Orbit Game Preview List", year: "1994", layout: "personal",
    background: "#161616", ink: "#55ff66", accent: "#ffae42", logo: logo("orbit-games"),
    summary: "A game fan previews fictional OrbitOS releases that promise modem play, community scoreboards, and downloadable episodes.",
    heading: "GARY'S 1994 ORBIT GAME PREVIEWS",
    paragraphs: [
      "COMING SOON: Hex Harbor lets four captains trade maps by modem. Comet Courier adds one delivery every month. Civic Defender puts your neighborhood bulletin headlines into the mission briefing.",
      "Most big publishers ignore Orbit, but these games know the network is part of the machine. That is worth more than another shiny box with no place to meet anybody."
    ],
    missingMedia: "18 SCREEN SHOTS lost when GARYGAME disk failed",
    footer: "Last score update 12/29/94 • Gary was here",
    rumor: "Civic Defender's computer opponents used handles belonging to inactive Orbit members."
  },
  {
    id: "finch_consult", screenName: "FinchConsult", displayName: "Morrow & Finch",
    url: "web://morrowfinch.co/orbit", title: "Morrow & Finch Network Consulting", year: "1995", layout: "company",
    background: "#e8e2d2", ink: "#24323b", accent: "#526b72", logo: logo("morrow-finch"),
    summary: "A two-person consultancy offers Orbit storefront automation, gateway repair, and scripts that mirror ordinary websites into Orbit.",
    heading: "MORROW & FINCH INFORMATION SERVICES",
    paragraphs: [
      "Keep your Orbit customers without maintaining two websites. Our MirrorFinch script converts basic text, prices, hours, and announcements from your public web server into a scheduled Orbit page update.",
      "Complex forms, frames, audio, animated navigation, and secure transactions require manual service. Broken conversions are retained for seven days before automatic rollback."
    ],
    missingMedia: "CLIENT DEMONSTRATION temporarily unavailable",
    footer: "Small-business network consulting • Since 1992",
    rumor: "Old Finch invoices list weekly trips to Continuity Room C9, years after Orbit stopped admitting the room existed."
  },
  {
    id: "copperline_clive", screenName: "CopperLineClive", displayName: "Clive",
    url: "web://copperline.tel/modem", title: "CopperLine 28.8 Home Modem", year: "1995", layout: "company",
    background: "#d9c7a4", ink: "#33220f", accent: "#a14c22", logo: logo("copperline-modem"),
    summary: "A telephone-company product page promotes a 28.8 modem bundle configured for both the regular web and native Orbit access.",
    heading: "COPPERLINE 28.8 — HEAR TOMORROW CONNECT",
    paragraphs: [
      "The CopperLine Home Modem includes automatic line testing, voice/data switching, fax software, a standard web starter kit, and one-touch Orbit network setup.",
      "Actual connection speed depends on line conditions. One-touch Orbit access requires an active Orbit identity and may not function after regional carrier changes."
    ],
    missingMedia: "MODEM_ROTATE.ANI requires CopperView plug-in",
    footer: "Equipment remains property of subscriber after 24 payments",
    rumor: "Clive's test modem connected after the wall line was physically cut. The session appeared on an Orbit proxy in another state."
  },
  {
    id: "edna_recipes", screenName: "EdnaCooks", displayName: "Edna",
    url: "web://edna.kitchen/recipes", title: "Edna's Recipe Cards", year: "1994", layout: "personal",
    background: "#fff7e4", ink: "#503018", accent: "#9b3131", logo: logo("edna-recipes"),
    summary: "A sparse personal page transcribes family recipes and marvels that strangers can read the same card without borrowing it.",
    heading: "EDNA'S RECIPES FOR FAMILY & FRIENDS",
    paragraphs: [
      "Hello. Daniel put these cards in the computer so nobody has to telephone while I am measuring flour. Start with the brown-bread recipe because the soup page is not finished.",
      "If the words are too small, print the page. Do not put the computer on the kitchen counter. Steam is still water even when it looks like a cloud."
    ],
    missingMedia: "Photograph of brown bread did not upload",
    footer: "Edna R. • Recipes typed 11/06/94",
    rumor: "Edna's serving sizes change depending on who reads the page. Her original card only serves six."
  },
  {
    id: "tad_stars", screenName: "TadLooksUp", displayName: "Tad",
    url: "web://tad.space/comet", title: "Tad's Backyard Space Page", year: "1995", layout: "personal",
    background: "#02021b", ink: "#c9d5ff", accent: "#75b5ff", logo: logo("tad-telescope"),
    summary: "An amateur astronomy page follows a fictional comet and invites Orbit users to compare drawings from their backyards.",
    heading: "TAD LOOKS UP",
    paragraphs: [
      "The blue smudge near Westhook is Comet Brindle, not a defect in your binoculars. I draw its position at 10 PM whenever the clouds cooperate.",
      "Send your town, time, and a sketch through the Skywatch circle. Do not send giant scanned photographs; the whole point is comparing what ordinary people can actually see."
    ],
    missingMedia: "COMET TRACKING CHART — source volume missing",
    footer: "Clear skies • Tad • Observation 19",
    rumor: "Tad's missing comet chart forms a network diagram when the stars are connected in upload order."
  },
  {
    id: "greyson_audio", screenName: "GreysonAudio", displayName: "Martin Greyson",
    url: "web://greyson.audio/netcast", title: "Greyson Audio NetCast Test", year: "1996", layout: "plain",
    background: "#d8d8dd", ink: "#252535", accent: "#303080", logo: logo("greyson-audio"),
    summary: "A hobbyist tests extremely compressed speech and music delivery through an Orbit audio object that no modern gateway can play.",
    heading: "GREYSON AUDIO LAB — NETCAST EXPERIMENT 6",
    paragraphs: [
      "This page once played twenty-two seconds of mono audio while the rest of the page loaded. At 14.4 the result sounded like a song performed through a drainpipe, which still counts as transmission.",
      "Experiment 7 will buffer an entire minute before playback. Please report modem speed, audio card, and whether the voice sounds too fast."
    ],
    missingMedia: "AUDIO OBJECT GREY06.ORB — unsupported by gateway",
    footer: "Test closed 04/1996 • 63 reports received",
    rumor: "Under the speech test is a five-number modem sequence. Martin never recorded that part."
  },
  {
    id: "commons_clerk", screenName: "CommonGroundClerk", displayName: "Common Ground Clerk",
    url: "web://commonground.civic/board", title: "Common Ground Civic Board", year: "1995", layout: "plain",
    background: "#e8e3d0", ink: "#27312a", accent: "#3f674e", logo: logo("common-ground"),
    summary: "A municipal pilot publishes meeting dates, road work, recycling notices, and plain-language summaries through Orbit's Home Planet network.",
    heading: "COMMON GROUND COMMUNITY INFORMATION BOARD",
    paragraphs: [
      "This experimental page duplicates notices posted inside Town Hall. It does not replace legal publication. For official records, request the signed paper copy from the clerk.",
      "Current notices: Willow Street resurfacing; park-board vacancy; winter parking reminder; public hearing on the old switching building."
    ],
    missingMedia: "Ward boundary map unavailable outside native Orbit viewer",
    footer: "Clerk's office electronic pilot • Revised 12/01/95",
    rumor: "Common Ground posted meeting minutes nine minutes before the meeting started. The paper copy had not been typed."
  },
  {
    id: "archive_watch", screenName: "ArchiveWatch95", displayName: "Archive Watch",
    url: "web://archivewatch.press/goodbye", title: "Archive Watch: Who Saves a Private Network?", year: "1996", layout: "farewell",
    background: "#b9b4c9", ink: "#201d2b", accent: "#4c396b", logo: logo("archive-watch"),
    summary: "A late 1996 essay mourns disappearing private-network pages and questions who owns community history when a platform fades.",
    heading: "WHO SAVES A PRIVATE NETWORK?",
    paragraphs: [
      "Orbit pages are vanishing in the least dramatic way possible: a forwarding address fails, a picture volume is unplugged, a club stops paying, a gateway forgets one more native object. Nobody declares an ending.",
      "The company says inactive pages remain archived while capacity permits. That is not preservation. An archive needs provenance, dates, and a promise that a machine will not quietly rewrite the empty spaces."
    ],
    missingMedia: "Sidebar: 41 recently vanished communities — index removed",
    recoveryStrip: { position: 3, word: "LINE" },
    footer: "Archive Watch editorial • 12/20/96 • Final Orbit edition",
    rumor: "Archive Watch recorded deleted pages receiving fresh timestamps. The revisions appeared under accounts whose owners had left."
  }
] as const;

export const DORMANT_LEGACY_PERSONA_IDS = new Set(
  DORMANT_LEGACY_ACCOUNTS.map((account) => account.id)
);

export const DORMANT_LEGACY_OWNERS: Record<string, { screenName: string; displayName: string }> =
  Object.fromEntries(DORMANT_LEGACY_ACCOUNTS.map((account) => [
    account.id,
    { screenName: account.screenName, displayName: account.displayName }
  ]));

export const DORMANT_LEGACY_HOME_URLS: Record<string, string> =
  Object.fromEntries(DORMANT_LEGACY_ACCOUNTS.map((account) => [account.id, account.url]));

function renderLegacyFragment(account: DormantLegacyAccount) {
  const missingMedia = account.missingMedia
    ? `<p class="legacy-fragment-missing">[ ${account.missingMedia} ]</p>`
    : "";
  const recoveryStrip = account.recoveryStrip
    ? `<aside class="legacy-recovery-strip"><small>C9 AUDIT RECOVERY STRIP ${account.recoveryStrip.position}/3</small><code>${account.recoveryStrip.word}</code><span>JOIN IN STRIP ORDER // NO SPACES</span></aside>`
    : "";
  const methodRouteFragment = account.methodRouteFragment
    ? `<aside class="legacy-method-route-fragment"><small>ORBIT BRIDGE CACHE // ADDRESS PIECE ${account.methodRouteFragment.position}/2</small><strong>${account.methodRouteFragment.text}</strong><span>Recovered from an obsolete gateway note.</span></aside>`
    : "";
  return `<main class="page legacy-fragment-page legacy-fragment-${account.layout}" style="--legacy-fragment-bg:${account.background};--legacy-fragment-ink:${account.ink};--legacy-fragment-accent:${account.accent}">
    <div class="legacy-fragment-gateway">ORBIT BRIDGE ARCHIVE // ${account.year} OBJECT CONVERSION INCOMPLETE</div>
    <header>
      <img class="legacy-fragment-logo" src="${account.logo}" alt="${account.title} page mark">
      <div><small>ARCHIVED ${account.year}</small><h1>${account.heading}</h1></div>
    </header>
    <article>${account.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}${missingMedia}</article>
    ${recoveryStrip}
    ${methodRouteFragment}
    <footer>${account.footer}<br><span>Forms, counters, mail objects, and outbound links are no longer available.</span></footer>
  </main>`;
}

export const legacyFragmentPages: Record<string, PageDefinition> = Object.fromEntries(
  DORMANT_LEGACY_ACCOUNTS.map((account) => [
    account.url,
    {
      url: account.url,
      title: account.title,
      site: "orbitlegacy",
      ownerId: account.id,
      summary: account.summary,
      searchable: false,
      listed: false,
      minimumPhase: 3,
      render: () => renderLegacyFragment(account)
    }
  ])
);
