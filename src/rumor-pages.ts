import type { PageDefinition } from "./types";

const evidence = {
  payphoneMoon: new URL("../assets/images/mystery-rumors/payphone-moon.png", import.meta.url).href,
  receiverMoon: new URL("../assets/images/mystery-rumors/receiver-moon.png", import.meta.url).href,
  frequencyNotes: new URL("../assets/images/mystery-rumors/frequency-notes.png", import.meta.url).href,
  bandedPigeons: new URL("../assets/images/mystery-rumors/banded-pigeons.png", import.meta.url).href,
  pigeonAntenna: new URL("../assets/images/mystery-rumors/pigeon-antenna.png", import.meta.url).href,
  ghostTracks: new URL("../assets/images/mystery-rumors/ghost-tracks.png", import.meta.url).href,
  trainStreak: new URL("../assets/images/mystery-rumors/train-streak.png", import.meta.url).href,
  stationClock: new URL("../assets/images/mystery-rumors/station-clock.png", import.meta.url).href,
  cerealCrystal: new URL("../assets/images/mystery-rumors/cereal-crystal.png", import.meta.url).href,
  crystalRadio: new URL("../assets/images/mystery-rumors/crystal-radio.png", import.meta.url).href,
  basementWeather: new URL("../assets/images/mystery-rumors/basement-weather.png", import.meta.url).href,
  garageVane: new URL("../assets/images/mystery-rumors/garage-vane.png", import.meta.url).href,
  houseCloud: new URL("../assets/images/mystery-rumors/house-cloud.png", import.meta.url).href,
  reservoirShore: new URL("../assets/images/mystery-rumors/reservoir-shore.png", import.meta.url).href,
  reservoirTowers: new URL("../assets/images/mystery-rumors/reservoir-towers.png", import.meta.url).href,
  reservoirModel: new URL("../assets/images/mystery-rumors/reservoir-model.png", import.meta.url).href,
  libraryAisle: new URL("../assets/images/mystery-rumors/library-aisle.png", import.meta.url).href,
  bookSpiral: new URL("../assets/images/mystery-rumors/book-spiral.png", import.meta.url).href,
  prophecyArcade: new URL("../assets/images/mystery-rumors/prophecy-arcade.png", import.meta.url).href,
  highScore: new URL("../assets/images/mystery-rumors/high-score.png", import.meta.url).href,
  fountainNight: new URL("../assets/images/mystery-rumors/fountain-night.png", import.meta.url).href,
  coinPattern: new URL("../assets/images/mystery-rumors/coin-pattern.png", import.meta.url).href,
  fountainRecorder: new URL("../assets/images/mystery-rumors/fountain-recorder.png", import.meta.url).href,
  exitZero: new URL("../assets/images/mystery-rumors/exit-zero.png", import.meta.url).href,
  fogRoad: new URL("../assets/images/mystery-rumors/fog-road.png", import.meta.url).href
};

export interface SystemRumor {
  id: string;
  url: string;
  title: string;
  hint: string;
  desperateHint: string;
}

export const SYSTEM_RUMORS: SystemRumor[] = [
  {
    id: "midnight_dial",
    url: "web://midnight-dial.net/log",
    title: "The Midnight Dial",
    hint: "A payphone outside Bellwether rings only when the moon is reflected in the receiver. Somebody logged the frequencies at web://midnight-dial.net/log",
    desperateHint: "THE MOON CALLED COLLECT. midnight-dial.net/log still has the receiver photographs."
  },
  {
    id: "pigeon_relay",
    url: "web://birdband.watch/relay",
    title: "Municipal Pigeon Relay",
    hint: "Those shiny pigeon bands might be a city data relay. The close-ups are at web://birdband.watch/relay",
    desperateHint: "Pigeons are routing municipal packets. Check birdband.watch/relay before they migrate the evidence."
  },
  {
    id: "ghost_freight",
    url: "web://railghost.org/schedule",
    title: "The 2:17 Freight",
    hint: "An abandoned station clock stops at 2:17 whenever a train passes without appearing. web://railghost.org/schedule has the exposure.",
    desperateHint: "Train 0 has no locomotive and no destination. railghost.org/schedule knows when it crosses."
  },
  {
    id: "prize_frequency",
    url: "web://prizefrequency.net/crystal",
    title: "Breakfast Crystal Receiver",
    hint: "A cereal prize makes talk radio fade when you point it north. There are extremely scientific tests at web://prizefrequency.net/crystal",
    desperateHint: "The breakfast crystal is a receiver, not a prize. prizefrequency.net/crystal caught the carrier tone."
  },
  {
    id: "weather_cellar",
    url: "web://weather-cellar.net/project",
    title: "Basement Weather Project",
    hint: "One basement has seventeen fans and one suspicious cloud. Somebody mapped it at web://weather-cellar.net/project",
    desperateHint: "LOCAL WEATHER IS GENERATED IN A BASEMENT. weather-cellar.net/project photographed the equipment."
  },
  {
    id: "glasswater_town",
    url: "web://glasswater.test/town",
    title: "The Town Beneath Glasswater",
    hint: "Low water exposed a tiny duplicate town across Glasswater Reservoir. See web://glasswater.test/town before the level rises.",
    desperateHint: "They built a rehearsal town beneath the reservoir. glasswater.test/town shows the model and the real towers."
  },
  {
    id: "shelf_shift",
    url: "web://afterhours-library.net/order",
    title: "After-Hours Shelf Shift",
    hint: "The county library books rearrange themselves into messages after closing. The shelf log is at web://afterhours-library.net/order",
    desperateHint: "BOOKS ARE SORTING THE READERS. afterhours-library.net/order has the spiral before staff reset it."
  },
  {
    id: "last_quarter",
    url: "web://last-quarter.arcade/score",
    title: "The Last Quarter Cabinet",
    hint: "A dead arcade cabinet posts high scores before anyone plays. Someone copied the screen at web://last-quarter.arcade/score",
    desperateHint: "THE CABINET KNOWS TOMORROW'S INITIALS. last-quarter.arcade/score is updating by itself."
  },
  {
    id: "fountain_numbers",
    url: "web://fountain-voices.net/tape",
    title: "Fountain Number Broadcast",
    hint: "The Northbridge Mall fountain pump clicks five-number groups after closing. Tape notes: web://fountain-voices.net/tape",
    desperateHint: "COINS MARK THE LISTENING POSITIONS. fountain-voices.net/tape caught the fountain transmission."
  },
  {
    id: "exit_zero",
    url: "web://exit-zero.info/route",
    title: "Exit Zero",
    hint: "Drivers report an Exit 0 sign in heavy fog, but the ramp is gone by daylight. Photos: web://exit-zero.info/route",
    desperateHint: "DO NOT TAKE EXIT ZERO. exit-zero.info/route shows where the road stops being county property."
  }
];

export const ORPHAN_RUMORS = [
  "The school planetarium is transmitting attendance records through the fake stars. There used to be a page, but the address is blank now.",
  "Every thirteenth vending-machine cola has a map printed under the label. Nobody can agree which vending machine.",
  "A second town hall meets for nine minutes before the real town hall opens. The meeting minutes link returns ADDRESS NOT FOUND.",
  "The lake's fiberglass swan boats spell names when viewed from the water tower. No photographs survived the upload.",
  "Phone books from next year are already in a locked motel room off Route 6. The room number changes in every message.",
  "A local weather presenter has not blinked since 1994. All supposed video captures point to missing files.",
  "The old mall directory lists a basement store called TOMORROW'S RETURNS. No matching page exists.",
  "Someone found a modem handshake hidden inside the high-school marching-band tape, but the audio URL has never resolved."
];

function photo(src: string, alt: string) {
  return `<figure><img src="${src}" alt="${alt}"><figcaption>${alt}</figcaption></figure>`;
}

function rumorShell(className: string, eyebrow: string, title: string, body: string, photos: string, verdict: string) {
  return `<main class="page rumor-page ${className}">
    <header><small>${eyebrow}</small><h1>${title}</h1><marquee scrollamount="3">THE DIRECTORY WILL NOT SHOW YOU THIS PAGE</marquee></header>
    <section class="rumor-copy">${body}</section>
    <section class="rumor-photos">${photos}</section>
    <aside><b>WHAT THIS ACTUALLY PROVES:</b> ${verdict}</aside>
    <footer>Last updated: probably recently &nbsp;|&nbsp; Source quality: <b>awful</b></footer>
  </main>`;
}

export const rumorPages: Record<string, PageDefinition> = {
  "web://midnight-dial.net/log": {
    url: "web://midnight-dial.net/log",
    title: "The Midnight Dial",
    site: "rumorarchive",
    ownerId: "system_core",
    summary: "A dubious log claims a roadside payphone receives calls reflected from the moon.",
    minimumPhase: 2,
    searchable: false,
    listed: false,
    render: () => rumorShell("rumor-phone", "BELLWETHER NIGHT LOG #6", "THE MIDNIGHT DIAL",
      `<p>At 12:13 AM the receiver hums. At 12:14 the moon appears on the black plastic. At 12:15 somebody hears a voice saying either “return” or “Bernard.”</p><p>The phone company says moisture makes the line ring. The phone company would say that because moisture pays no long-distance fees.</p>`,
      photo(evidence.payphoneMoon, "The phone and alleged caller") + photo(evidence.receiverMoon, "Moon trapped in receiver") + photo(evidence.frequencyNotes, "Frequencies copied after midnight"),
      "A wet roadside phone can hum, and shiny plastic reflects the moon.")
  },
  "web://birdband.watch/relay": {
    url: "web://birdband.watch/relay",
    title: "Municipal Pigeon Relay",
    site: "rumorarchive",
    ownerId: "system_core",
    summary: "A bird watcher mistakes ordinary research bands and a twig for a municipal wireless relay.",
    minimumPhase: 2,
    searchable: false,
    listed: false,
    render: () => rumorShell("rumor-birds", "CITIZEN AIRSPACE AUDIT", "THE PIGEONS HAVE USER ACCOUNTS",
      `<p>Five pigeons appeared above the permit office after a zoning meeting. Four wore shiny bands. One carried a short vertical “antenna.”</p><p>The bands are therefore packet addresses and the birds are therefore uploading complaints to City Hall. This is the only reasonable explanation if you refuse to consider bird-banding programs or twigs.</p>`,
      photo(evidence.bandedPigeons, "Relay flock on utility wire") + photo(evidence.pigeonAntenna, "Suspected feather antenna"),
      "Some tagged birds sat on a wire. One pigeon stood behind a twig.")
  },
  "web://railghost.org/schedule": {
    url: "web://railghost.org/schedule",
    title: "The 2:17 Freight",
    site: "rumorarchive",
    ownerId: "system_core",
    summary: "Long-exposure photographs become evidence for a scheduled invisible freight train.",
    minimumPhase: 2,
    searchable: false,
    listed: false,
    render: () => rumorShell("rumor-rail", "UNPUBLISHED TIMETABLE", "TRAIN 0 PASSES AT 2:17",
      `<p>The West Morrow platform closed in 1986, yet its clock loses one minute every Thursday. A camera left on the tracks recorded white and red streaks with no locomotive between them.</p><p>Conclusion: an invisible government freight train carries discontinued weekdays to a storage facility inland.</p>`,
      photo(evidence.ghostTracks, "Tracks waiting for Train 0") + photo(evidence.trainStreak, "No locomotive between streaks") + photo(evidence.stationClock, "Clock approaching 2:17"),
      "A long camera exposure captured vehicle lights near an old station.")
  },
  "web://prizefrequency.net/crystal": {
    url: "web://prizefrequency.net/crystal",
    title: "Breakfast Crystal Receiver",
    site: "rumorarchive",
    ownerId: "system_core",
    summary: "A plastic cereal-box prize is tested as though it were a classified radio crystal.",
    minimumPhase: 2,
    searchable: false,
    listed: false,
    render: () => rumorShell("rumor-crystal", "PRIZE FREQUENCY LAB", "THE SECRET CRYSTAL IS LISTENING",
      `<p>Three cereal boxes contained a translucent purple prize. When held near an AM radio, static changed. The effect was strongest when a hand also touched the radio antenna.</p><p>The package says “collect all four,” which may describe a toy promotion—or the four-node listening array required for complete neighborhood coverage.</p>`,
      photo(evidence.cerealCrystal, "Crystal in original fictional package") + photo(evidence.crystalRadio, "Unauthorized breakfast-band test"),
      "Plastic and a nearby hand can affect weak radio reception.")
  },
  "web://weather-cellar.net/project": {
    url: "web://weather-cellar.net/project",
    title: "Basement Weather Project",
    site: "rumorarchive",
    ownerId: "system_core",
    summary: "A basement appliance collection is blamed for unusually localized weather.",
    minimumPhase: 2,
    searchable: false,
    listed: false,
    render: () => rumorShell("rumor-weather", "HYPERLOCAL CLIMATE WATCH", "THIS BASEMENT MAKES THE WEATHER",
      `<p>Seventeen fans, four humidifiers, two heaters, and one homemade weather vane occupy the same property. A dark cloud later passed over that property.</p><p>The homeowner calls this “drying out the basement.” That is exactly what a private weather contractor would call atmospheric calibration.</p>`,
      photo(evidence.basementWeather, "Climate equipment below ground") + photo(evidence.garageVane, "Directional control antenna") + photo(evidence.houseCloud, "Cloud directly above target house"),
      "A cluttered basement contains appliances and weather happened outdoors.")
  },
  "web://glasswater.test/town": {
    url: "web://glasswater.test/town",
    title: "The Town Beneath Glasswater",
    site: "rumorarchive",
    ownerId: "system_core",
    summary: "Haze, utility structures, and a toy model become a supposedly submerged duplicate town.",
    minimumPhase: 2,
    searchable: false,
    listed: false,
    render: () => rumorShell("rumor-reservoir", "GLASSWATER SHORE COMMITTEE", "THEY BUILT OUR TOWN TWICE",
      `<p>During a low-water week, towers appeared across the reservoir. A toy village was then found on a county map at a yard sale.</p><p>The shapes do not match, but a perfect match would be too obvious. The underwater duplicate may be used to rehearse traffic jams before introducing them downtown.</p>`,
      photo(evidence.reservoirShore, "Glasswater at low level") + photo(evidence.reservoirTowers, "Duplicate skyline through haze") + photo(evidence.reservoirModel, "Planning model found at yard sale"),
      "Utility structures are visible across a reservoir, and somebody owns model houses.")
  },
  "web://afterhours-library.net/order": {
    url: "web://afterhours-library.net/order",
    title: "After-Hours Shelf Shift",
    site: "rumorarchive",
    ownerId: "system_core",
    summary: "A reshelving cart accident becomes proof that library books organize their readers.",
    minimumPhase: 2,
    searchable: false,
    listed: false,
    render: () => rumorShell("rumor-library", "DEWEY DECIMAL COUNTER-INTELLIGENCE", "THE BOOKS RESHELVE US",
      `<p>A custodian found books in a spiral after closing. Reading the call numbers clockwise produces 001, 153, 302, and 999—nearly a sentence if all meanings are supplied afterward.</p><p>Staff claim a cart tipped over during carpet cleaning. The carpet-cleaning invoice has not been uploaded.</p>`,
      photo(evidence.libraryAisle, "Aisle after public hours") + photo(evidence.bookSpiral, "Message assembled by the collection"),
      "A pile of books fell or was stacked into an interesting shape.")
  },
  "web://last-quarter.arcade/score": {
    url: "web://last-quarter.arcade/score",
    title: "The Last Quarter Cabinet",
    site: "rumorarchive",
    ownerId: "system_core",
    summary: "A malfunctioning high-score table is presented as tomorrow's player registry.",
    minimumPhase: 2,
    searchable: false,
    listed: false,
    render: () => rumorShell("rumor-arcade", "CABINET PROPHECY PROJECT", "INSERT QUARTER // RECEIVE TOMORROW",
      `<p>The purple cabinet at the Last Quarter arcade was unplugged, but its screen still displayed ten sets of initials. Two matched customers who arrived the following day.</p><p>One set was “AAA,” and the other was “BOB.” Statistically impossible if you do not calculate the statistics.</p>`,
      photo(evidence.prophecyArcade, "Cabinet between sessions") + photo(evidence.highScore, "Tomorrow's alleged initials"),
      "A cabinet retained a common high-score list, including very common names.")
  },
  "web://fountain-voices.net/tape": {
    url: "web://fountain-voices.net/tape",
    title: "Fountain Number Broadcast",
    site: "rumorarchive",
    ownerId: "system_core",
    summary: "A shopping-mall pump rhythm and tossed coins become a coded broadcast.",
    minimumPhase: 2,
    searchable: false,
    listed: false,
    render: () => rumorShell("rumor-fountain", "NORTHBRIDGE MALL LISTENING POST", "THE FOUNTAIN COUNTS AFTER CLOSING",
      `<p>The pump clicks in groups of five after 10 PM. Coins on the basin floor form three circles and a bent arrow pointing toward the food court.</p><p>A cassette recorder captured mostly rushing water, one janitor, and a noise that could be “seven” if played repeatedly.</p>`,
      photo(evidence.fountainNight, "Transmission site after closing") + photo(evidence.coinPattern, "Listener positions marked in coins") + photo(evidence.fountainRecorder, "Original surveillance cassette"),
      "A mechanical pump repeats and people throw coins into fountains.")
  },
  "web://exit-zero.info/route": {
    url: "web://exit-zero.info/route",
    title: "Exit Zero",
    site: "rumorarchive",
    ownerId: "system_core",
    summary: "A reflective artifact and a foggy ramp become a road supposedly omitted from every map.",
    minimumPhase: 2,
    searchable: false,
    listed: false,
    render: () => rumorShell("rumor-road", "ROUTE 6 ABSENCE REPORT", "EXIT ZERO IS NOT ON THE MAP",
      `<p>Three drivers saw a blank green sign near mile 81 during heavy fog. One photograph contains a pale oval that resembles a zero. Another shows an ordinary ramp with no readable sign.</p><p>The ramp may lead to the county's missing hour, where clocks are taken during daylight-saving time.</p>`,
      photo(evidence.exitZero, "Unmarked ramp near mile 81") + photo(evidence.fogRoad, "Zero-shaped reflection in fog"),
      "Fog, glare, and an unreadable sign made a familiar road look unfamiliar.")
  }
};
