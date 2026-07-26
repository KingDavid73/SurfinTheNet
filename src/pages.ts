import type { GameState, PageDefinition } from "./types";
import { kidsBusinessPages } from "./kids-business-pages";
import { dealerPages } from "./dealer-pages";
import { fillerBusinessPages } from "./filler-business-pages";
import { gameGridMembers, gameGridPages } from "./gamegrid-pages";
import { xtremeMembers, xtremePages } from "./xtreme-pages";
import { petPlanetMembers, petPlanetPages } from "./petplanet-pages";
import { fandomMembers, fandomPages } from "./fandom-pages";
import { yesterdayMembers, yesterdayPages } from "./yesterday-pages";
import { cozyMembers, cozyPages } from "./cozy-pages";
import { mysteryPages, phaseTwoBackchannelDirectory } from "./mystery-pages";
import { rumorPages } from "./rumor-pages";
import { legacyFragmentPages } from "./legacy-fragment-pages";
import { coreCharacterPages } from "./core-character-pages";
import {
  BYTE_BARN_CAMPAIGN_THUMB,
  soundwaveDirectoryBody,
  soundwavePages
} from "./soundwave-pages";
import { BYTE_BARN_COMPILATION_URL, BYTE_BARN_TEASER_URL } from "./byte-barn-revival";
import {
  BYTE_BARN_FAN_HUB_MEMBER,
  NEWCOMER_ZONE_BUTTON,
  newcomerMembers,
  newcomerPages,
  phaseTwoOddityPages
} from "./newcomer-pages";

const escapeHtml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
const FINAL_PAGE_ART = {
  "juniper-garden": new URL("../assets/images/generated-cells/rainbow-garden/r1c1.webp", import.meta.url).href,
  "juniper-and-modem": new URL("../assets/images/generated-cells/rainbow-garden/r1c2.webp", import.meta.url).href,
  "modem-phone-jack": new URL("../assets/images/generated-cells/rainbow-garden/r1c3.webp", import.meta.url).href,
  "phone-jack-closeup": new URL("../assets/images/generated-cells/rainbow-garden/r2c1.webp", import.meta.url).href,
  "darkraven-sigil": new URL("../assets/images/generated-cells/darkraven/r1c1.webp", import.meta.url).href
} as const;
const finalPageArt = (name: keyof typeof FINAL_PAGE_ART, alt: string) =>
  `<img class="final-page-art" src="${FINAL_PAGE_ART[name]}" alt="${alt}">`;
const CONSOLE_ASSETS = {
  "pulse-cgi-console": new URL("../assets/images/console-web/pulse-cgi-console.png", import.meta.url).href,
  "pulse-cgi-controller": new URL("../assets/images/console-web/pulse-cgi-controller.png", import.meta.url).href,
  "pulse-cgi-network": new URL("../assets/images/console-web/pulse-cgi-network.png", import.meta.url).href,
  "pulse-cgi-racers": new URL("../assets/images/console-web/pulse-cgi-racers.png", import.meta.url).href,
  "pulse-cgi-player": new URL("../assets/images/console-web/pulse-cgi-player.png", import.meta.url).href,
  "vanta-editorial-console": new URL("../assets/images/console-web/vanta-editorial-console.png", import.meta.url).href,
  "vanta-editorial-portal": new URL("../assets/images/console-web/vanta-editorial-portal.png", import.meta.url).href,
  "vanta-editorial-eye": new URL("../assets/images/console-web/vanta-editorial-eye.png", import.meta.url).href,
  "cubit-gouache-console": new URL("../assets/images/console-web/cubit-gouache-console.png", import.meta.url).href,
  "cubit-gouache-mascot": new URL("../assets/images/console-web/cubit-gouache-mascot.png", import.meta.url).href,
  "cubit-gouache-multiplayer": new URL("../assets/images/console-web/cubit-gouache-multiplayer.png", import.meta.url).href,
  "cubit-gouache-cases": new URL("../assets/images/console-web/cubit-gouache-cases.png", import.meta.url).href,
  "cubit-gouache-controller": new URL("../assets/images/console-web/cubit-gouache-controller.png", import.meta.url).href,
  "cubit-gouache-players": new URL("../assets/images/console-web/cubit-gouache-players.png", import.meta.url).href
} as const;
const consoleAsset = (name: keyof typeof CONSOLE_ASSETS, alt: string, className = "") =>
  `<img class="console-web-art ${className}" src="${CONSOLE_ASSETS[name]}" alt="${alt}">`;
const BUSINESS_ASSETS = {
  "bytebarn-system": new URL("../assets/images/business-web/bytebarn-system.png", import.meta.url).href,
  "bytebarn-open-tower": new URL("../assets/images/business-web/bytebarn-open-tower.png", import.meta.url).href,
  "bytebarn-modem": new URL("../assets/images/business-web/bytebarn-modem.png", import.meta.url).href,
  "bytebarn-upgrades": new URL("../assets/images/business-web/bytebarn-upgrades.png", import.meta.url).href,
  "bytebarn-technician": new URL("../assets/images/business-web/bytebarn-technician.png", import.meta.url).href,
  "bytebarn-software": new URL("../assets/images/business-web/bytebarn-software.png", import.meta.url).href,
  "bytebarn-primary-logo": new URL("../assets/images/byte-barn/primary-logo.webp", import.meta.url).href,
  "bytebarn-store-icon": new URL("../assets/images/byte-barn/store-icon.webp", import.meta.url).href,
  "bytebarn-masthead-logo": new URL("../assets/images/byte-barn/masthead-logo.webp", import.meta.url).href,
  "bytebarn-tested-badge": new URL("../assets/images/byte-barn/tested-badge.webp", import.meta.url).href,
  "bytebarn-no-mystery": new URL("../assets/images/byte-barn/no-mystery-parts.webp", import.meta.url).href,
  "bytebarn-warehouse-sale": new URL("../assets/images/byte-barn/warehouse-sale.webp", import.meta.url).href,
  "bytebarn-delivery-truck": new URL("../assets/images/byte-barn/delivery-truck.webp", import.meta.url).href,
  "bytebarn-service-patch": new URL("../assets/images/byte-barn/service-patch.webp", import.meta.url).href,
  "bytebarn-web-button": new URL("../assets/images/byte-barn/web-button.webp", import.meta.url).href,
  "cosmiccrust-pizza": new URL("../assets/images/business-web/cosmiccrust-pizza.png", import.meta.url).href,
  "cosmiccrust-slice": new URL("../assets/images/business-web/cosmiccrust-slice.png", import.meta.url).href,
  "cosmiccrust-meal": new URL("../assets/images/business-web/cosmiccrust-meal.png", import.meta.url).href,
  "cosmiccrust-delivery": new URL("../assets/images/business-web/cosmiccrust-delivery.png", import.meta.url).href,
  "cosmiccrust-arcade": new URL("../assets/images/business-web/cosmiccrust-arcade.png", import.meta.url).href,
  "cosmiccrust-astronaut": new URL("../assets/images/business-web/cosmiccrust-astronaut.png", import.meta.url).href,
  "pawsnclaws-pickles": new URL("../assets/images/business-web/pawsnclaws-pickles.png", import.meta.url).href,
  "pawsnclaws-adoption": new URL("../assets/images/business-web/pawsnclaws-adoption.png", import.meta.url).href,
  "pawsnclaws-aquarium": new URL("../assets/images/business-web/pawsnclaws-aquarium.png", import.meta.url).href,
  "pawsnclaws-birds": new URL("../assets/images/business-web/pawsnclaws-birds.png", import.meta.url).href,
  "pawsnclaws-supplies": new URL("../assets/images/business-web/pawsnclaws-supplies.png", import.meta.url).href,
  "pawsnclaws-bev": new URL("../assets/images/business-web/pawsnclaws-bev.png", import.meta.url).href
} as const;
const businessAsset = (name: keyof typeof BUSINESS_ASSETS, alt: string, className = "") =>
  `<img class="business-web-art ${className}" src="${BUSINESS_ASSETS[name]}" alt="${alt}">`;
const BYTE_BARN_COMMERCIAL_VIDEO = new URL(
  "../assets/video/byte-barn/byte-barn-commercial.mp4",
  import.meta.url
).href;
const byteBarnHeader = (detail: string) =>
  `<header class="bytebarn-header"><div class="bytebarn-brand-lockup">${businessAsset("bytebarn-masthead-logo", "Byte Barn Computer Superstore logo")}</div><em>${detail}</em></header>`;
const NAV_BUTTON_ASSETS: Record<string, string> = {
  "gamegrid-zone": new URL("../assets/images/navigation-buttons/gamegrid-zone.png", import.meta.url).href,
  "xtreme-zone": new URL("../assets/images/navigation-buttons/xtreme-zone.png", import.meta.url).href,
  "petplanet-zone": new URL("../assets/images/navigation-buttons/petplanet-zone.png", import.meta.url).href,
  "fanverse-zone": new URL("../assets/images/navigation-buttons/fanverse-zone.png", import.meta.url).href,
  "yesterday-zone": new URL("../assets/images/navigation-buttons/yesterday-zone.png", import.meta.url).href,
  "soundwave-zone": new URL("../assets/images/navigation-buttons/soundwave-zone.png", import.meta.url).href,
  "cozycommons-zone": new URL("../assets/images/navigation-buttons/cozycommons-zone.png", import.meta.url).href,
  "backchannel-zone": new URL("../assets/images/navigation-buttons/backchannel-zone.png", import.meta.url).href,
  "newcomers-zone": NEWCOMER_ZONE_BUTTON,
  lagmaster: new URL("../assets/images/navigation-buttons/lagmaster.png", import.meta.url).href,
  velvetmage: new URL("../assets/images/navigation-buttons/velvetmage.png", import.meta.url).href,
  playerfour: new URL("../assets/images/navigation-buttons/playerfour.png", import.meta.url).href,
  maddy: new URL("../assets/images/navigation-buttons/maddy.png", import.meta.url).href,
  queenie: new URL("../assets/images/navigation-buttons/queenie.png", import.meta.url).href,
  codedex: new URL("../assets/images/navigation-buttons/codedex.png", import.meta.url).href,
  dee: new URL("../assets/images/navigation-buttons/dee.png", import.meta.url).href,
  cole: new URL("../assets/images/navigation-buttons/cole.png", import.meta.url).href,
  nico: new URL("../assets/images/navigation-buttons/nico.png", import.meta.url).href,
  ty: new URL("../assets/images/navigation-buttons/ty.png", import.meta.url).href,
  troy: new URL("../assets/images/navigation-buttons/troy.png", import.meta.url).href,
  ollie: new URL("../assets/images/navigation-buttons/ollie.png", import.meta.url).href,
  viktor: new URL("../assets/images/navigation-buttons/viktor.png", import.meta.url).href,
  juniper: new URL("../assets/images/navigation-buttons/juniper.png", import.meta.url).href,
  mira: new URL("../assets/images/navigation-buttons/mira.png", import.meta.url).href,
  raven: new URL("../assets/images/navigation-buttons/raven.png", import.meta.url).href,
  carla: new URL("../assets/images/navigation-buttons/carla.png", import.meta.url).href,
  ray: new URL("../assets/images/navigation-buttons/ray.png", import.meta.url).href,
  bea: new URL("../assets/images/navigation-buttons/bea.png", import.meta.url).href,
  "pet-hal": new URL("../assets/images/navigation-buttons/pet-hal.png", import.meta.url).href,
  iris: new URL("../assets/images/navigation-buttons/iris.png", import.meta.url).href,
  sam: new URL("../assets/images/navigation-buttons/sam.png", import.meta.url).href,
  moss: new URL("../assets/images/navigation-buttons/moss.png", import.meta.url).href,
  blipzo: new URL("../assets/images/navigation-buttons/blipzo.png", import.meta.url).href,
  starthimble: new URL("../assets/images/navigation-buttons/starthimble.png", import.meta.url).href,
  prism5: new URL("../assets/images/navigation-buttons/prism5.png", import.meta.url).href,
  gemwell: new URL("../assets/images/navigation-buttons/gemwell.png", import.meta.url).href,
  atlas: new URL("../assets/images/navigation-buttons/atlas.png", import.meta.url).href,
  roadhog: new URL("../assets/images/navigation-buttons/roadhog.png", import.meta.url).href,
  "dot-old": new URL("../assets/images/navigation-buttons/dot-old.png", import.meta.url).href,
  "dot-new": new URL("../assets/images/navigation-buttons/dot-new.png", import.meta.url).href,
  "old-hal": new URL("../assets/images/navigation-buttons/old-hal.png", import.meta.url).href,
  lenny: new URL("../assets/images/navigation-buttons/lenny.png", import.meta.url).href,
  bob: new URL("../assets/images/navigation-buttons/bob.png", import.meta.url).href
};
const navButtonArt = (name: string, alt: string, className = "") =>
  `<img class="nav-button-art ${className}" src="${NAV_BUTTON_ASSETS[name]}" alt="${alt}">`;

const ORBIT_ZONES = [
  {
    id: "gamegrid",
    url: "web://orbitnet.local/zones/gamegrid",
    title: "Game Grid",
    badge: "GG",
    tagline: "Cheats, clans, console wars & high scores",
    welcome: "Power up with players swapping strategies, homemade levels, reviews, arcade scores, and arguments about which console totally rules.",
    categories: ["PC & Mac Games", "Console Corner", "Arcade High Scores", "RPG Headquarters", "Mods & Maps", "Cheats & Walkthroughs"],
    bulletin: "Zone challenge: post your fastest lap, strangest character build, or most impossible boss victory.",
    searchTerms: ["gamers", "games", "gaming", "video games", "pc games", "console", "arcade", "rpg", "cheats", "mods", "clans"]
  },
  {
    id: "xtreme",
    url: "web://orbitnet.local/zones/xtreme",
    title: "X-Treme Edge",
    badge: "X!",
    tagline: "Skate, ride, climb, race—then upload it",
    welcome: "The loudest zone on OrbitNet is home to skate crews, BMX riders, snowboarders, surfers, motocross fans, and anybody with scraped knees.",
    categories: ["Skateboarding", "BMX & Mountain Bikes", "Snowboarding", "Surf & Wake", "Motocross", "Gear & Safety"],
    bulletin: "This week's challenge: tell us about your best trick, your worst wipeout, and the helmet that saved your head.",
    searchTerms: ["extreme", "xtreme", "sports", "skate", "skateboarding", "bmx", "snowboard", "surfing", "motocross", "stunts"]
  },
  {
    id: "petplanet",
    url: "web://orbitnet.local/zones/petplanet",
    title: "Pet Planet",
    badge: "PP",
    tagline: "Homepages for every kind of best friend",
    welcome: "Trade pet photos, care tips, adoption stories, aquarium advice, and lengthy explanations of why your animal is the smartest one online.",
    categories: ["Cats on the Web", "Dogs & Puppies", "Fish & Aquariums", "Birds & Small Pets", "Reptile Room", "Rescue & Adoption"],
    bulletin: "Pet of the week submissions should include one photo, one favorite snack, and one embarrassing habit.",
    searchTerms: ["pets", "pet", "animals", "cats", "dogs", "fish", "aquarium", "birds", "reptiles", "adoption", "pet photos"]
  },
  {
    id: "fanverse",
    url: "web://orbitnet.local/zones/fanverse",
    title: "The FanVerse",
    badge: "FV",
    tagline: "Every universe has room for one more homepage",
    welcome: "A meeting place for science-fiction watchers, anime tape traders, comic collectors, fantasy readers, fan artists, and dedicated continuity experts.",
    categories: ["Science Fiction", "Anime & Manga", "Comics", "Fantasy Worlds", "TV & Movie Clubs", "Fan Fiction & Art"],
    bulletin: "Spoiler warnings are required. Passionate debates are encouraged. Forty-screen character essays are apparently unavoidable.",
    searchTerms: ["fandom", "fans", "fan club", "science fiction", "sci-fi", "anime", "manga", "comics", "fantasy", "fan fiction", "fan art"]
  },
  {
    id: "yesterday",
    url: "web://orbitnet.local/zones/yesterday",
    title: "Yesterday Online",
    badge: "YO",
    tagline: "The past has a brand-new homepage",
    welcome: "Explore family histories, antiques, old-time radio, classic machinery, local legends, historical reenactment, and carefully scanned photographs.",
    categories: ["Genealogy", "Antiques & Collecting", "Old-Time Radio", "Railroads & Machinery", "Living History", "Local History"],
    bulletin: "Volunteer scanners are preserving newsletters, photographs, timetables, and stories before another basement floods.",
    searchTerms: ["history", "old time", "old fashioned", "vintage", "antiques", "genealogy", "old radio", "railroads", "reenactment", "historic"]
  },
  {
    id: "soundwave",
    url: "web://orbitnet.local/zones/soundwave",
    title: "SoundWave",
    badge: "SW",
    tagline: "Bands, beats, tabs & totally legal MP3 talk",
    welcome: "Discover garage bands, electronic producers, guitar-tab archivists, concert diarists, bedroom DJs, and people with extremely serious mixtape opinions.",
    categories: ["Local Bands", "MP3 & Digital Audio", "Guitar Tabs", "Electronic & Rave", "Concert Journals", "Mixtapes & Reviews"],
    bulletin: "Bandwidth reminder: please compress audio previews before uploading them to your member page.",
    searchTerms: ["music", "bands", "mp3", "guitar", "tabs", "rave", "electronic", "concert", "mixtape", "dj", "audio"]
  },
  {
    id: "cozycommons",
    url: "web://orbitnet.local/zones/cozycommons",
    title: "Cozy Commons",
    badge: "CC",
    tagline: "Gardens, journals, crafts & somewhere to linger",
    welcome: "A low-pressure neighborhood for garden logs, personal journals, recipes, nature walks, handmade projects, pen pals, and pages that never fit anywhere else.",
    categories: ["Personal Journals", "Gardens & Nature", "Crafts & Homemade", "Quiet Hobbies", "Pen Pals & Guestbooks", "Beautiful Miscellany"],
    bulletin: "There is no weekly challenge. Make a cup of tea, sign somebody's guestbook, and tell us what is growing near your window.",
    searchTerms: ["cozy", "cottage", "cottagecore", "nature", "garden", "journals", "crafts", "hang out", "friends", "miscellaneous", "personal pages"]
  },
  {
    id: "backchannel",
    url: "web://orbitnet.local/zones/backchannel",
    title: "The Backchannel",
    badge: "BC",
    tagline: "Signals, secrets, code & pages off the index",
    welcome: "OrbitNet's night shift compares strange broadcasts, unlisted addresses, homemade utilities, suspicious timestamps, code puzzles, and theories with varying relationships to reality.",
    categories: ["Signal Watchers", "Unlisted Pages", "Codes & Ciphers", "Shareware & Tools", "Rumor Boards", "Midnight Logs"],
    bulletin: "Extraordinary claims still require screenshots. Mark guesses as guesses, preserve original files, and synchronize your clocks before declaring a pattern.",
    searchTerms: ["conspiracy", "hacker", "hidden web", "deep web", "numbers station", "codes", "cipher", "secrets", "unlisted pages", "mystery", "radio signal"]
  },
  {
    id: "newcomers",
    url: "web://orbitnet.local/zones/newcomers",
    title: "Newbie Nebula",
    badge: "NEW",
    tagline: "Fresh accounts, first homepages & links worth the wait",
    welcome: "OrbitNet is busy again. New arrivals are building first pages, trading strange addresses, preserving favorite commercials, and discovering that the old neighborhood has a lot of unexplained closets.",
    categories: ["First Homepages", "Favorite Finds", "Fan Shrines", "Web Reviews", "New User Help", "Page Archaeology"],
    bulletin: "New member wave detected overnight. Be welcoming, label borrowed graphics, and tell somebody if their background makes the text disappear.",
    searchTerms: ["newcomers", "new users", "newbies", "first homepage", "fan page", "weird pages", "new members"],
    minimumPhase: 2
  }
] as const;

function availableZones(state: GameState) {
  return ORBIT_ZONES.filter((zone) => !("minimumPhase" in zone) || zone.minimumPhase <= state.storyPhase);
}

function zoneNavigation(state: GameState, activeId?: string) {
  return availableZones(state).map((zone) => activeId === zone.id
    ? `<b class="active">${zone.title}</b>`
    : `<button data-nav="${zone.url}">${zone.title}</button>`).join("");
}

function zoneDirectoryBody(zoneId: string, state: GameState) {
  if (zoneId === "gamegrid") return `
    <section class="gamegrid-member-directory member-page-directory">
      <header><div><small>NEW &amp; UPDATED</small><h2>Game Grid Member Pages</h2></div><span>${gameGridMembers.length} pages online</span></header>
      <div>${gameGridMembers.map((member) => `<button class="gamegrid-member-card member-${member.className}" data-nav="${member.url}">${navButtonArt(member.className === "dex" ? "codedex" : member.className, `${member.handle}'s homemade page button`, "member-button-art")}<span><strong>${member.title}</strong><small>${member.description}</small><b>PLAYS: ${member.console}</b></span><em>VISIT ›</em></button>`).join("")}</div>
    </section>`;
  if (zoneId === "xtreme") return `
    <section class="xtreme-member-directory member-page-directory">
      <header><div><small>CREW PAGES // FRESH UPLOADS</small><h2>X-Treme Edge Riders</h2></div><span>${xtremeMembers.length} pages online</span></header>
      <div>${xtremeMembers.map((member) => `<button class="xtreme-member-card member-${member.className}" data-nav="${member.url}">${navButtonArt(member.className, `${member.handle}'s homemade page button`, "member-button-art")}<span><strong>${member.title}</strong><small>${member.description}</small><b>RIDES: ${member.discipline}</b></span><em>DROP IN ›</em></button>`).join("")}</div>
    </section>`;
  if (zoneId === "petplanet") return `
    <section class="petplanet-member-directory member-page-directory">
      <header><div><small>FRESH PHOTOS // GOOD ANIMALS</small><h2>Pet Planet Member Pages</h2></div><span>${petPlanetMembers.length} pages online</span></header>
      <div>${petPlanetMembers.map((member) => `<button class="petplanet-member-card member-${member.className}" data-nav="${member.url}">${navButtonArt(member.className === "hal" ? "pet-hal" : member.className, `${member.handle}'s homemade page button`, "member-button-art")}<span><strong>${member.title}</strong><small>${member.description}</small><b>PETS: ${member.pets}</b></span><em>VISIT</em></button>`).join("")}</div>
    </section>`;
  if (zoneId === "fanverse") return `
    <section class="fandom-member-directory member-page-directory">
      <header><div><small>DEEP ARCHIVES // BIG FEELINGS</small><h2>FanVerse Member Archives</h2></div><span>${fandomMembers.length + (state.storyPhase >= 2 ? 1 : 0)} shrines online</span></header>
      <div>
        ${state.storyPhase >= 2 ? `<button class="fandom-member-card member-bytebarn" data-nav="${BYTE_BARN_FAN_HUB_MEMBER.url}"><img class="member-button-art" src="${BYTE_BARN_FAN_HUB_MEMBER.button}" alt="${BYTE_BARN_FAN_HUB_MEMBER.handle}'s homemade Byte Barn club button"><span><strong>${BYTE_BARN_FAN_HUB_MEMBER.title}</strong><small>${BYTE_BARN_FAN_HUB_MEMBER.description}</small><b>FANDOM: ${BYTE_BARN_FAN_HUB_MEMBER.fandom}</b></span><em>HEAR THE COVERS</em></button>` : ""}
        ${fandomMembers.map((member) => `<button class="fandom-member-card member-${member.className}" data-nav="${member.url}">${navButtonArt(member.className, `${member.handle}'s homemade page button`, "member-button-art")}<span><strong>${member.title}</strong><small>${member.description}</small><b>FANDOM: ${member.fandom}</b></span><em>ENTER ARCHIVE</em></button>`).join("")}
      </div>
    </section>`;
  if (zoneId === "yesterday") return `
    <section class="yesterday-member-directory member-page-directory">
      <header><div><small>PERSONAL HOME PAGES // BEST VIEWED AT 800×600</small><h2>Yesterday Online Neighbors</h2></div><span>${yesterdayMembers.length} pages indexed (probably)</span></header>
      <div>${yesterdayMembers.map((member) => `<button class="yesterday-member-card member-${member.className}" data-nav="${member.url}">${navButtonArt(member.className === "hal" ? "old-hal" : member.className, `${member.handle}'s homemade page button`, "member-button-art")}<span><strong>${member.title}</strong><small>${member.description}</small><b>TOPIC: ${member.interest}</b></span><em>CLICK HERE!!!</em></button>`).join("")}</div>
    </section>`;
  if (zoneId === "cozycommons") return `
    <section class="cozy-member-directory member-page-directory">
      <header><div><small>OLD TEA // SLOW PAGES</small><h2>Neighbors Around the Commons</h2></div><span>${cozyMembers.length + 1} garden gates listed</span></header>
      <div>
        <button class="cozy-member-card member-juniper" data-nav="web://rainbow.gdn/home">${navButtonArt("juniper", "Juniper's homemade Rainbow Garden page button", "member-button-art")}<span><strong>~* Rainbow Garden *~</strong><small>Juniper's scrapbook of flowers, scanner art, tiny poems, rainy radio, and her orange cat Modem.</small><b>PATCH: GARDENS &amp; JOURNALS</b></span><em>FOLLOW THE PATH</em></button>
        ${cozyMembers.map((member) => `<button class="cozy-member-card member-${member.className}" data-nav="${member.url}"><i class="cozy-handmade-button">${member.badge}</i><span><strong>${member.title}</strong><small>${member.description}</small><b>PATCH: ${member.patch}</b></span><em>${member.handle} &middot; VISIT</em></button>`).join("")}
        <aside class="cozy-abandoned-note"><b>WEB RING NOTICE</b><p>Several neighbors have not updated in a while. Broken counters and quiet guestbooks are normal. Please leave the porch light on.</p></aside>
      </div>
    </section>`;
  if (zoneId === "soundwave") return soundwaveDirectoryBody(state);
  if (zoneId === "backchannel") return `
    <section class="backchannel-member-directory member-page-directory">
      <header><div><small>UNVERIFIED // RECORDED // STILL ONLINE</small><h2>Backchannel Nodes</h2></div><span>${state.storyPhase >= 2 ? "4 live connections" : "2 live connections"}</span></header>
      <div>
        <button class="backchannel-member-card member-mira" data-nav="web://nightsignal.net/home">${navButtonArt("mira", "Mira's homemade Night Signal page button", "member-button-art")}<span><strong>NIGHT SIGNAL</strong><small>Mira's after-hours archive of strange broadcasts, clock drift, answering-machine fragments, and disciplined field notes.</small><b>NODE: SIGNAL WATCH</b></span><em>TUNE IN</em></button>
        <button class="backchannel-member-card member-raven" data-nav="web://raven.web/home">${navButtonArt("raven", "DarkRaven's homemade hidden-web page button", "member-button-art")}<span><strong>xX_DarkRaven_Xx's VOID</strong><small>Deleted games, forbidden files, hidden pages, suspicious patterns, and approximately one useful fact per seven theories.</small><b>NODE: UNLISTED WEB</b></span><em>ENTER VOID</em></button>
        ${phaseTwoBackchannelDirectory(state)}
        <aside><b>BACKCHANNEL ETIQUETTE</b><p>Archive first. Compare clocks. Separate observation from theory. Do not run mystery executables just because the filename says FINAL_REAL_2.</p></aside>
      </div>
    </section>`;
  if (zoneId === "newcomers") return `
    <section class="newcomer-member-directory member-page-directory">
      <header><div><small>FRESH ACCOUNTS // INDEXED THIS MORNING</small><h2>Meet the New Arrivals</h2></div><span>${newcomerMembers.length} first pages online</span></header>
      <div>
        ${newcomerMembers.map((member) => `<button class="newcomer-member-card" data-nav="${member.url}"><img src="${member.button}" alt="${member.handle}'s homemade page badge"><span><strong>${member.title}</strong><small>${member.description}</small><b>NEW USER: ${member.handle}</b></span><em>MEET THEM ›</em></button>`).join("")}
        <aside class="newcomer-wave-note"><b>WHY A NEW ZONE?</b><p>Word escaped that something strange was happening inside this nearly forgotten network. One member told a friend, those friends passed addresses around at school and on regular-web boards, and the old categories suddenly had more first pages than they could absorb. New arrivals stay here until they choose a permanent neighborhood—or decide that collecting weird links is a neighborhood.</p></aside>
      </div>
    </section>`;
  return "";
}

const orbitZonePages = Object.fromEntries(ORBIT_ZONES.map((zone) => [zone.url, {
  url: zone.url,
  title: `${zone.title} - OrbitNet Community Zone`,
  site: zone.id === "gamegrid" ? "gamegridzone" : zone.id === "xtreme" ? "xtremezone" : zone.id === "yesterday" ? "yesterdayzone" : zone.id === "newcomers" ? "newcomerzone" : "directory",
  ownerId: "orbit_guide",
  summary: `${zone.title} is an OrbitNet community zone for ${zone.tagline.toLowerCase()}.`,
  listed: true,
  ...("minimumPhase" in zone ? { minimumPhase: zone.minimumPhase } : {}),
  hubId: `zone-${zone.id}`,
  searchTerms: [...zone.searchTerms, "orbitnet zone", "community"],
  render: (state) => `
    <main class="page orbit-zone-page zone-${zone.id}">
      <header class="zone-masthead">
        <div class="zone-badge" aria-hidden="true">${zone.badge}</div>
        <div><small>ORBITNET COMMUNITY ZONE</small><h1>${zone.title}</h1><p>${zone.tagline}</p></div>
      </header>
      <nav class="zone-network-nav"><button data-nav="web://home">⌂ OrbitNet Home</button>${zoneNavigation(state, zone.id)}</nav>
      <section class="zone-welcome"><h2>Welcome to ${zone.title}!</h2><p>${zone.welcome}</p></section>
      <aside class="zone-bulletin"><h2>Zone Bulletin</h2><p>${zone.bulletin}</p></aside>
      ${zoneDirectoryBody(zone.id, state)}
      <footer>OrbitNet Community Services · Zone ID: ${zone.id.toUpperCase()} · Last indexed 11/03/1999</footer>
    </main>`
} satisfies PageDefinition]));

export const pages: Record<string, PageDefinition> = {
  ...kidsBusinessPages,
  ...dealerPages,
  ...fillerBusinessPages,
  ...orbitZonePages,
  ...gameGridPages,
  ...xtremePages,
  ...petPlanetPages,
  ...fandomPages,
  ...yesterdayPages,
  ...cozyPages,
  ...mysteryPages,
  ...rumorPages,
  ...legacyFragmentPages,
  ...coreCharacterPages,
  ...newcomerPages,
  ...phaseTwoOddityPages,
  ...soundwavePages,
  "web://home": {
    url: "web://home",
    title: "OrbitNet Directory",
    site: "orbithome",
    ownerId: "orbit_guide",
    summary: "The official OrbitNet directory connects members to topic-based community zones and provides basic help for new users.",
    listed: true,
    hubId: "directory",
    searchTerms: ["directory", "community zones", "communities", "help", "orbitnet"],
    render: (state) => `
      <main class="page directory-page">
        <header class="directory-logo"><span>ORBIT</span><b>NET</b></header>
        <p class="directory-tagline">${availableZones(state).length} communities. Thousands of interests. One friendly corner of the Information Superhighway!</p>
        <form class="search-box orbit-search-form"><input name="query" placeholder="Search pages, people, and phrases..." aria-label="Search OrbitNet"><button>Search</button></form>
        ${state.storyPhase >= 4 ? `<section class="directory-byte-barn-event">
          <img src="${BYTE_BARN_CAMPAIGN_THUMB}" alt="Byte Barn Forever album cover">
          <div><small>BREAKING // BIGGEST TRAFFIC DAY IN ORBIT HISTORY</small><h1>BYTE BARN FOREVER</h1><p>Ten major artists remade one forgotten computer-store jingle. The CD is live—and all ten acts will perform at the one-night Glasswater Expo festival.</p><em>Other network news: Continuity audit confirms account impersonation // 7 replies</em></div>
          <button data-nav="${BYTE_BARN_COMPILATION_URL}">ALBUM + FESTIVAL &rsaquo;</button>
        </section>`
          : state.storyPhase >= 3 ? `<section class="directory-incoming-event">
            <div class="incoming-signal-orb"><i></i><b>10</b></div>
            <div><small>PAID NETWORK ANNOUNCEMENT // SIGNAL LOCKED</small><h1>SOMETHING LOUD IS COMING</h1><p>One source. Ten signals. Full transmission pending final clearance.</p></div>
            <button data-nav="${BYTE_BARN_TEASER_URL}">OPEN COUNTDOWN &rsaquo;</button>
          </section>` : ""}
        <section class="zone-directory-intro"><div><small>START EXPLORING</small><h1>Choose Your Community</h1></div><p>Every OrbitNet member page belongs to a neighborhood. Pick a zone or search the entire network.</p></section>
        <section class="zone-directory-grid">
          ${availableZones(state).map((zone) => `<button class="zone-directory-card zone-${zone.id}" data-nav="${zone.url}">${navButtonArt(`${zone.id}-zone`, `${zone.title} community button`, "zone-card-art")}<span class="zone-card-copy"><strong>${zone.title}</strong><small>${zone.tagline}</small></span><b>ENTER ZONE ›</b></button>`).join("")}
        </section>
        <section class="orbit-pal-promo">
          <div class="orbit-pal-mini"><i></i><b>?</b></div>
          <div><h2>New to the Net?</h2><p>Download <b>Orbit Pal</b>, your friendly desktop guide! Ask how to browse, search, download files, send messages, and get unstuck.</p></div>
          <button data-download-helper ${state.flags.orbit_pal_installed ? "disabled" : ""}>${state.flags.orbit_pal_installed ? "Orbit Pal Installed!" : "Download Orbit Pal FREE"}</button>
        </section>
        <p class="counter">You are visitor <strong>000042</strong> · Pages discovered: ${state.visited.length}</p>
      </main>`
  },
  "web://rainbow.gdn/home": {
    url: "web://rainbow.gdn/home",
    title: "~* Rainbow Garden *~",
    site: "rainbow",
    ownerId: "juniper_gdn",
    summary: "Juniper's colorful homepage contains drawings, tiny poems, garden photos, and links about her cat Modem.",
    commentsEnabled: true,
    listed: true,
    hubId: "zone-cozycommons",
    searchTerms: ["juniper", "garden", "cat", "art", "modem"],
    render: () => `
      <main class="page rainbow-page">
        <header class="rainbow-masthead">
          <div class="sparkles">* . o . * . o . *</div>
          <h1>Rainbow Garden</h1>
          <marquee scrollamount="3">~ welcome, web traveler! mind the seedlings and please do not feed Modem after midnight ~</marquee>
        </header>
        <div class="rainbow-home-grid">
          <section class="garden-feature">
            <div class="garden-photo">${finalPageArt("juniper-garden", "A slightly blurry snapshot of Juniper's last orange and yellow marigolds before frost")}<span>the last marigolds before frost</span></div>
            <article class="garden-update"><small>GARDEN LOG // NOV. 3</small><h2>Hello from my little patch of the web!</h2><p>I made this place for drawings, tiny poems, plant notes, and an unreasonable number of pictures of my cat, <b>Modem</b>.</p><blockquote>the rain taps the glass<br>the modem answers softly<br>someone else is there</blockquote></article>
          </section>
          <aside class="rainbow-sidebar">
            <h2>Garden Paths</h2>
            <nav class="page-links">
              <button data-nav="web://rainbow.gdn/about"><b>ME + MODEM</b><small>who maintains this mess?</small></button>
              <button data-nav="web://rainbow.gdn/modem"><b>CAT CORNER</b><small>daily schedule & evidence</small></button>
              <button data-nav="web://rainbow.gdn/scrapbook"><b>PRESSED BOOK</b><small>flowers, scraps & folded notes</small></button>
              <button data-nav="web://rainbow.gdn/guestbook"><b>GUESTBOOK</b><small>leave muddy footprints</small></button>
              <button data-nav="web://nightsignal.net/home"><b>NIGHT SIGNAL</b><small>Mira's very cool radio page</small></button>
            </nav>
            <div class="seed-swap"><b>VIRTUAL SEED SWAP</b><p>Currently offering: moonflower, marigold, and one mystery envelope Dad says not to open indoors.</p></div>
          </aside>
        </div>
        <div class="contact-strip rainbow-contact"><span>Want to say something privately?</span><button data-email-owner="juniper_gdn">Email Juniper</button></div>
        <footer><span>Best viewed at 800x600</span><b>Member of the Cozy Corners Web Ring</b><span>Made with Notepad</span></footer>
      </main>`
  },
  "web://rainbow.gdn/about": {
    url: "web://rainbow.gdn/about",
    title: "About Juniper",
    site: "rainbow",
    ownerId: "juniper_gdn",
    summary: "Juniper introduces herself, her cat Modem, her scanner art hobby, and a strange voice she hears beneath 91.7 FM.",
    render: () => `
      <main class="page rainbow-page about-page">
        <header class="rainbow-subhead"><small>YOU ARE HERE: /ABOUT/ME.HTML</small><h1>About the Webmaster</h1></header>
        <div class="profile-layout">
          <div class="juniper-polaroid">${finalPageArt("juniper-and-modem", "An awkward snapshot of Juniper holding her orange cat Modem, with a thumb at the edge")}<span>taken by Dad, thumb cropped out</span></div>
          <section class="juniper-profile">
            <h2>Juniper, age 23</h2>
            <dl><div><dt>BIRTHDAY</dt><dd>June 14 (Raven forgot once and now has a “system”)</dd></div><div><dt>LIKES</dt><dd>gardening, scanner art, rainy radio, cinnamon tea</dd></div><div><dt>DISLIKES</dt><dd>broken links, olives, chain email, wet socks</dd></div><div><dt>WEB SKILLS</dt><dd>HTML, image maps (almost), turning it off and on</dd></div></dl>
            <div class="currently-box"><b>CURRENTLY...</b><p>reading: <i>The Orchard at Dusk</i><br>listening: 91.7 FM<br>growing: moonflowers in the kitchen</p></div>
          </section>
        </div>
        <section class="scanner-art-note"><h2>Why I made this page</h2><p>Paper scraps disappear into drawers. A web page can be a drawer your friends visit. I scan leaves, seed packets, receipts, and bits of handwriting before they get lost.</p><p class="odd-signal-note">Lately I keep hearing a strange voice underneath 91.7 FM after midnight. Mira says the Night Signal archive has recordings. Modem hears it too.</p></section>
        <nav class="rainbow-bottom-nav"><button data-nav="web://rainbow.gdn/home">&lt; Garden</button><button data-nav="web://rainbow.gdn/modem">Cat Corner &gt;</button></nav>
      </main>`
  },
  "web://rainbow.gdn/modem": {
    url: "web://rainbow.gdn/modem",
    title: "Modem's Cat Corner",
    site: "rainbow",
    ownerId: "juniper_gdn",
    summary: "A shrine to Juniper's orange cat Modem, including his daily schedule and a blurry picture of him staring at the phone jack.",
    render: () => `
      <main class="page rainbow-page cat-page">
        <header class="cat-corner-header"><span>=^..^=</span><div><small>THE OFFICIAL SHRINE</small><h1>Modem's Cat Corner</h1></div><span>=^..^=</span></header>
        <div class="cat-corner-grid">
          <div class="modem-photo">${finalPageArt("modem-phone-jack", "Juniper's orange cat Modem staring suspiciously at a beige telephone jack")}<b>SUBJECT: MODEM</b><small>orange / loud / denies everything</small></div>
          <section class="modem-dossier">
            <h2>Daily Transmission Schedule</h2>
            <ol><li><b>6:04</b> breakfast alarm</li><li><b>8:30</b> window surveillance</li><li><b>11:17</b> phone-jack inspection</li><li><b>13:00</b> nap (classified)</li><li><b>18:02</b> hallway sprint</li><li><b>23:17</b> keyboard assistance</li></ol>
          </section>
          <article class="cat-news"><small>BREAKING CAT NEWS</small><h2>Modem knows something.</h2><p>Last night he stared at the phone jack for twenty minutes before the modem rang. Cats know more than they admit!!!</p><p class="tiny-old-link">old camera test: <button class="text-link" data-nav="web://rainbow.gdn/old/phonejack.html">phonejack_2.htm</button></p></article>
          <aside class="cat-poll"><b>MODEM'S FAVORITES</b><p>Box: printer paper<br>Toy: receipt<br>Food: yours<br>Enemy: downstairs vacuum</p></aside>
        </div>
        <nav class="rainbow-bottom-nav"><button data-nav="web://rainbow.gdn/about">&lt; About Juniper</button><button data-nav="web://rainbow.gdn/home">Garden Home</button></nav>
      </main>`
  },
  "web://rainbow.gdn/old/phonejack.html": {
    url: "web://rainbow.gdn/old/phonejack.html",
    title: "Untitled Document",
    site: "rainbow",
    ownerId: "juniper_gdn",
    summary: "An unlisted old camera-test page shows Juniper's phone jack and notes a repeating incoming call with no caller.",
    listed: false,
    hubId: "zone-cozycommons",
    searchTerms: ["phone jack", "camera test", "incoming call", "modem"],
    render: () => `
      <main class="page rainbow-page old-page">
        <h2>camera test please ignore</h2>
        ${finalPageArt("phone-jack-closeup", "A blurry early digital-camera test photo of a beige telephone jack with Modem in the foreground")}
        <p>trying dad's digital camera. this is where Modem keeps staring.</p>
        <p><small>note to self: incoming call log says 000-0000 at 11:17 again. probably broken?</small></p>
        <button class="text-link" data-nav="web://rainbow.gdn/home">← home</button>
      </main>`
  },
  "web://rainbow.gdn/guestbook": {
    url: "web://rainbow.gdn/guestbook",
    title: "Rainbow Guestbook",
    site: "rainbow",
    ownerId: "juniper_gdn",
    summary: "Juniper's public guestbook includes notes from Mira, DarkRaven, and Juniper's father.",
    render: (state) => {
      const entries = state.guestbookEntries["rainbow"] ?? [];
      const signed = Boolean(state.flags.rainbow_guestbook_signed);
      return `<main class="page rainbow-page guestbook-page">
        <h1>Rainbow Guestbook</h1>
        <div class="guestbook-signatures">
          <p><b>Mira_917:</b> Your cat picture is enormous. I love it. P.S. archive password is still <code>ORBIT</code>.</p>
          <p><b>xX_DarkRaven_Xx:</b> nice site. visit mine when it is done.</p>
          <p><b>GardenerDad:</b> Please call your father.</p>
          ${entries.map((entry) => `<p class="player-signature"><b>${escapeHtml(entry.author)}:</b> ${escapeHtml(entry.text)}</p>`).join("")}
        </div>
        ${signed
          ? `<p class="guestbook-thanks">Thanks for signing! Your message is now part of the guestbook.</p>`
          : `<form class="guestbook-form" data-guestbook="rainbow"><label><b>Sign Juniper's guestbook:</b><textarea name="signature" maxlength="240" rows="3" placeholder="Write one short message..."></textarea></label><button>Sign Guestbook</button></form>`}
        <button class="text-link" data-nav="web://rainbow.gdn/home">← Return home</button>
      </main>`;
    }
  },
  "web://nightsignal.net/home": {
    url: "web://nightsignal.net/home",
    title: "NIGHT SIGNAL // 91.7",
    site: "signal",
    ownerId: "mira_917",
    summary: "Mira's Night Signal station collects unusual broadcasts, answering-machine fragments, and sounds without obvious owners.",
    commentsEnabled: true,
    listed: true,
    hubId: "zone-backchannel",
    searchTerms: ["mira", "radio", "91.7", "night signal", "broadcast"],
    render: () => `
      <main class="page signal-page">
        <header class="signal-masthead"><div><span>NIGHT</span> SIGNAL</div><small>91.7 FM // MERCER COUNTY // AFTER HOURS</small></header>
        <div class="frequency-scale"><span>88</span><i></i><span>90</span><i></i><b>91.7</b><i></i><span>94</span><i></i><span>98</span><i></i><span>104</span></div>
        <div class="signal-console">
          <aside class="signal-rack">
            <div class="rack-lights"><i></i><i></i><i></i><i></i><i></i></div>
            <b>STATION INDEX</b>
            <nav class="signal-nav"><button data-nav="web://nightsignal.net/archive">01 / RECORDINGS</button><button data-nav="web://nightsignal.net/fieldlog">02 / FIELD LOG</button><button data-nav="web://nightsignal.net/desk">03 / MIRA'S DESK</button><button data-nav="web://rainbow.gdn/home">04 / RAINBOW GARDEN</button></nav>
            <small>REMOTE LINK: 2400 BAUD<br>UPLINK: UNSTABLE</small>
          </aside>
          <section class="signal-transmission">
            <div class="signal-scope" role="img" aria-label="Green radio waveform display"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><span>LIVE INPUT / NO CARRIER</span></div>
            <h1>For people who are still awake.</h1>
            <p>Night Signal collects unusual broadcasts, answering-machine fragments, numbers read by strangers, and sounds without obvious owners.</p>
            <div class="contact-strip signal-contact"><span>Mira is currently online.</span><button data-aim-owner="mira_917">IM Mira_917</button></div>
          </section>
          <aside class="signal-status">
            <b>TONIGHT'S BOARD</b>
            <dl><div><dt>23:00</dt><dd>rain tape</dd></div><div><dt>23:17</dt><dd class="warning">open band</dd></div><div><dt>00:05</dt><dd>callers</dd></div><div><dt>01:00</dt><dd>sign-off?</dd></div></dl>
            <p><b>RECEIVER A:</b> 91.7<br><b>RECEIVER B:</b> scanning<br><b>TAPE 3:</b> armed</p>
          </aside>
        </div>
        <p class="signal-warning"><b>NOTICE:</b> The station is currently unattended. Do not adjust your receiver.</p>
      </main>`
  },
  "web://nightsignal.net/archive": {
    url: "web://nightsignal.net/archive",
    title: "Signal Archive",
    site: "signal",
    ownerId: "mira_917",
    summary: "The Night Signal recording archive lists rainfall, an unidentified caller, and a recently appeared operator note.",
    render: (state) => {
      const downloaded = state.downloads.some((file) => file.id === "signal-note");
      return `
        <main class="page signal-page archive-page">
          <header class="signal-subhead"><span>RECORDING ARCHIVE</span><small>NS-917 / TAPE LIBRARY</small></header>
          <div class="archive-meta"><span>Recovered directory listing</span><b>LAST SYNC 11/03/1999 22:48</b><span>4.6 MB FREE</span></div>
          <table><thead><tr><th>FILE</th><th>DESCRIPTION</th><th>STATUS</th></tr></thead><tbody>
            <tr><td>rain_004.wav</td><td>Seven minutes of rainfall; voice at 05:42?</td><td class="archive-bad">CORRUPT</td></tr>
            <tr><td>caller_unknown.wav</td><td>Unidentified caller asking for "the lower room"</td><td class="archive-bad">MISSING</td></tr>
            <tr><td>bridge_hum.aif</td><td>Electrical hum beneath Mercer overpass</td><td>CATALOGED</td></tr>
            <tr><td>numbers_2.wav</td><td>Digits repeated backward; probably scanner bleed</td><td>REVIEW</td></tr>
            <tr class="featured-file"><td>SIGNAL_NOTE.TXT</td><td>Operator's desk note</td><td><button data-download="signal-note" ${downloaded ? "disabled" : ""}>${downloaded ? "DOWNLOADED" : "DOWNLOAD"}</button></td></tr>
          </tbody></table>
          <div class="archive-hint"><b>LOCAL COPY NOTE</b><p>Downloaded files appear in <strong>My Files</strong> on the desktop. Audio entries are catalog records only until the station finishes digitizing them.</p></div>
          <nav class="signal-bottom-nav"><button data-nav="web://nightsignal.net/home">&lt; STATION</button><button data-nav="web://nightsignal.net/fieldlog">FIELD LOG &gt;</button></nav>
        </main>`;
    }
  },
  "web://nightsignal.net/fieldlog": {
    url: "web://nightsignal.net/fieldlog",
    title: "Operator Field Log",
    site: "signal",
    ownerId: "mira_917",
    summary: "Mira's operator log notes that the same unknown transmission returned at 11:17 PM on three consecutive nights.",
    render: () => `
      <main class="page signal-page fieldlog-page">
        <header class="signal-subhead"><span>OPERATOR FIELD LOG</span><small>M. VALE / DESK 2</small></header>
        <section class="log-timeline">
          <article><time>11/01<br><b>23:17</b></time><div><small>ENTRY 041</small><h2>Carrier under normal programming.</h2><p>Three words. Too muddy to transcribe. Receiver B's signal meter moved although its antenna was disconnected.</p></div><em>UNCONFIRMED</em></article>
          <article><time>11/02<br><b>23:17</b></time><div><small>ENTRY 042</small><h2>Same signal. Same time.</h2><p>Station clock lost four seconds immediately afterward. Tape counter advanced eleven seconds.</p></div><em>REPEATED</em></article>
          <article class="pending-log"><time>11/03<br><b>--:--</b></time><div><small>ENTRY 043</small><h2>If it returns tonight...</h2><p>I am recording the full band. Juniper says her phone rang at the same minute. That is not evidence yet.</p></div><em>OPEN</em></article>
        </section>
        <aside class="signal-method"><b>FIELD METHOD</b><span>two receivers / synchronized clocks / fresh tape / write it down before inventing a theory</span></aside>
        <nav class="signal-bottom-nav"><button data-nav="web://nightsignal.net/home">&lt; STATION</button><button data-nav="web://nightsignal.net/archive">RECORDINGS &gt;</button></nav>
      </main>`
  },
  "web://raven.web/home": {
    url: "web://raven.web/home",
    title: "xX_DarkRaven_Xx's VOID",
    site: "raven",
    ownerId: "darkraven_xx",
    summary: "DarkRaven's dramatic black-and-purple homepage contains game rumors, homemade utilities, and claims about hidden OrbitNet pages.",
    commentsEnabled: true,
    listed: true,
    hubId: "zone-backchannel",
    searchTerms: ["darkraven", "games", "rumors", "hidden pages", "void"],
    render: () => `
      <main class="page raven-page">
        <header class="raven-masthead"><div class="raven-stars">+ . * . + . * . +</div><h1>xX_DarkRaven_Xx's VOID</h1><p class="raven-warning">YOU HAVE ENTERED A DOMAIN OF SECRETS</p></header>
        <div class="raven-home-grid">
          <aside class="raven-sidebar">
            <div class="raven-sigil">${finalPageArt("darkraven-sigil", "DarkRaven's homemade black raven and purple crescent web sigil")}</div>
            <nav class="raven-nav"><button data-nav="web://raven.web/orbit">THE ORBIT HOLE</button><button data-nav="web://raven.web/files">FORBIDDEN FILES</button><button data-nav="web://raven.web/links">SHADOW LINKS</button><button data-nav="web://raven.web/about">ABOUT THE FIGURE</button><button data-nav="web://raven.web/vault">BLACK FILE [LOCKED]</button><button data-nav="web://rainbow.gdn/guestbook">JUNIPER'S GUESTBOOK</button></nav>
            <small>VOID VISITORS<br><b>00000666</b></small>
          </aside>
          <section class="raven-center">
            <article class="raven-manifesto"><small>LAST UPDATED 11.03.99</small><h2>THE TRUTH IS UNDER CONSTRUCTION</h2><p>I investigate deleted game levels, forbidden cheat codes, haunted shareware, and pages OrbitNet pretends do not exist.</p><p>Most rumors are fake. The interesting ones are only <em>mostly</em> fake.</p></article>
            <div class="raven-caseboard">
              <article><b>CASE 01</b><span>ORBIT HOLE</span><small>status: watching</small></article>
              <i></i>
              <article><b>CASE 02</b><span>91.7 SIGNAL</span><small>status: repeating</small></article>
              <i></i>
              <article><b>CASE 03</b><span>PHONE JACK</span><small>status: cat involved</small></article>
            </div>
            <div class="contact-strip raven-contact"><span>OIM STATUS: ONLINE</span><button data-aim-owner="darkraven_xx">MESSAGE xX_DarkRaven_Xx</button></div>
          </section>
          <aside class="raven-bulletins">
            <h2>VOID BULLETINS</h2>
            <p><b>11/03:</b> Added proof OrbitNet has pages outside the directory.</p>
            <p><b>11/02:</b> Mira says clock drift is "not ghosts." Coward.</p>
            <p><b>11/01:</b> Juniper says purple text is not a whole personality. She still signed my guestbook first.</p>
            <p><b>PERSONAL:</b> Find Juniper something better than grocery-store carnations before her birthday. Do not ask why.</p>
            <p><b>10/31:</b> Graveyard Shift 99 rumor still unverified.</p>
            <p><b>REMINDER:</b> four-digit dates use <code>MMDD</code>. This is not a hint.</p>
            <div class="raven-award">THIS SITE<br><b>DOES NOT</b><br>USE FRAMES</div>
          </aside>
        </div>
        <footer><span>Optimized for darkness</span><b>NO PORTAL EMPLOYEES</b><span>HTML by Raven</span></footer>
      </main>`
  },
  "web://raven.web/orbit": {
    url: "web://raven.web/orbit",
    title: "The Orbit Hole",
    site: "raven",
    ownerId: "darkraven_xx",
    summary: "DarkRaven claims OrbitNet keeps an unlisted maintenance page that briefly appears when the directory clock reaches 11:17 PM.",
    render: () => `
      <main class="page raven-page orbit-hole-page">
        <header class="raven-case-header"><small>CASE FILE 01 // OPEN</small><h1>THE ORBIT HOLE</h1><b>HOST CLAIM: CACHE ERROR</b></header>
        <div class="orbit-evidence-grid">
          <section><h2>What happened</h2><p>I saw an unlisted maintenance page flash behind the directory at exactly <b>11:17 PM</b>. The address ended in <code>/below</code>.</p><p>Everyone says it was a cache error. Cache errors do not know your screen name.</p><table><tbody><tr><th>TIME</th><td>23:17:04</td></tr><tr><th>WINDOW TITLE</th><td>ORBIT SERVICE BELOW</td></tr><tr><th>VISIBLE TEXT</th><td>WELCOME BACK, RAVEN</td></tr><tr><th>WITNESSES</th><td>1 (me, counts double)</td></tr></tbody></table></section>
          <div class="raven-evidence"><span>EVIDENCE_01.BMP</span><b>[ IMAGE REMOVED BY HOST ]</b><small>checksum changed after upload</small></div>
          <aside><h2>Possible address</h2><code>web://orbitnet.local/???/below</code><p>The middle segment was hidden by the browser status bar. I am testing old staff terms and maintenance words.</p><button data-nav="web://nightsignal.net/fieldlog">COMPARE 11:17 LOG</button></aside>
        </div>
        <nav class="raven-bottom-nav"><button data-nav="web://raven.web/home">&lt; VOID HOME</button><button data-nav="web://raven.web/links">SHADOW LINKS &gt;</button></nav>
      </main>`
  },
  "web://raven.web/files": {
    url: "web://raven.web/files",
    title: "DarkRaven's Forbidden Files",
    site: "raven",
    ownerId: "darkraven_xx",
    summary: "DarkRaven's homemade download index catalogs deleted game rumors, small utilities, and files removed by OrbitNet.",
    listed: true,
    hubId: "zone-backchannel",
    searchTerms: ["darkraven files", "forbidden files", "deleted game", "shareware", "utilities", "downloads"],
    render: () => `
      <main class="page raven-page raven-files-page">
        <header class="raven-case-header"><small>DIRECTORY /VOID/FILES</small><h1>FORBIDDEN FILES</h1><b>DOWNLOAD AT YOUR OWN RISK</b></header>
        <section class="forbidden-file-list">
          <article><i>EXE</i><div><h2>CACHESEER 0.4</h2><p>Shows titles left behind in the Orbit Explorer cache. Crashes if you have more than 8 MB free memory, somehow.</p></div><strong>QUARANTINED</strong></article>
          <article><i>ZIP</i><div><h2>GRAVEYARD_SHIFT_99_MAPS</h2><p>Supposed deleted multiplayer maps. Contents are three screenshots and a text file arguing about fog.</p></div><strong>UNVERIFIED</strong></article>
          <article><i>TXT</i><div><h2>PORTAL_ERRORS.TXT</h2><p>List of error-page phrases collected by Raven. Entry 17 includes a response addressed to the visitor.</p></div><strong>HOST REMOVED</strong></article>
          <article><i>BAT</i><div><h2>MODEM_GHOST.BAT</h2><p>Plays a sound when the phone rings. Juniper says Modem already does this without software.</p></div><strong>POINTLESS</strong></article>
        </section>
        <p class="raven-disclaimer">No download buttons remain because OrbitNet removed the files twice and Dad says executable attachments are why the computer makes that noise.</p>
        <nav class="raven-bottom-nav"><button data-nav="web://raven.web/home">&lt; VOID HOME</button><button data-nav="web://bytebarn.com/software">SAFE SOFTWARE</button><button data-nav="web://raven.web/links">SHADOW LINKS &gt;</button></nav>
      </main>`
  },
  "web://raven.web/links": {
    url: "web://raven.web/links",
    title: "DarkRaven's Shadow Links",
    site: "raven",
    ownerId: "darkraven_xx",
    summary: "DarkRaven's annotated link web connects Night Signal, Juniper's phone-jack test, OrbitNet, and other suspicious pages.",
    listed: true,
    hubId: "zone-backchannel",
    searchTerms: ["darkraven links", "shadow links", "mystery pages", "11:17", "phone jack", "night signal"],
    render: () => `
      <main class="page raven-page raven-links-page">
        <header class="raven-case-header"><small>FOLLOW THE THREADS</small><h1>SHADOW LINKS</h1><b>LINKS DIE. SCREENSHOTS LIE.</b></header>
        <section class="shadow-link-map">
          <button class="link-node node-signal" data-nav="web://nightsignal.net/fieldlog"><b>NIGHT SIGNAL</b><small>same time / clock drift</small></button>
          <button class="link-node node-juniper" data-nav="web://rainbow.gdn/old/phonejack.html"><b>PHONE JACK TEST</b><small>000-0000 / cat witness</small></button>
          <div class="link-node node-center"><b>11:17</b><small>every road points here</small></div>
          <button class="link-node node-orbit" data-nav="web://home"><b>ORBITNET</b><small>directory hides more than it lists</small></button>
          <button class="link-node node-hole" data-nav="web://raven.web/orbit"><b>ORBIT HOLE</b><small>/below / unknown segment</small></button>
          <i class="thread-one"></i><i class="thread-two"></i><i class="thread-three"></i><i class="thread-four"></i>
        </section>
        <aside class="shadow-note"><b>RAVEN'S RULE:</b> A coincidence happens once. A pattern happens twice. A conspiracy happens when three people start selling T-shirts about it.<br><small>PERSONAL SECURITY RULE: a date is only a bad password if somebody knows whose date it is.</small></aside>
        <nav class="raven-bottom-nav"><button data-nav="web://raven.web/home">&lt; VOID HOME</button><button data-nav="web://raven.web/files">FORBIDDEN FILES &gt;</button></nav>
      </main>`
  },
  "web://bytebarn.com/home": {
    url: "web://bytebarn.com/home",
    title: "BYTE BARN Computer Superstore",
    site: "computer",
    ownerId: "chip_bytebarn",
    summary: "Byte Barn is a neighborhood computer shop selling desktop PCs, upgrades, modems, software, repairs, and beginner-friendly technical advice.",
    commentsEnabled: true,
    listed: true,
    hubId: "business",
    searchTerms: ["computers", "computer store", "pc", "hardware", "software", "repair", "modem", "internet", "desktop", "upgrades", "computer parts"],
    render: (state) => `
      <main class="page computer-page">
        ${byteBarnHeader("LOCALLY COMPUTED SINCE 1987")}
        <nav class="bytebarn-nav"><button data-nav="web://bytebarn.com/home">HOME</button><button data-nav="web://bytebarn.com/systems">SYSTEMS & UPGRADES</button><button data-nav="web://bytebarn.com/software">SOFTWARE</button><button data-nav="web://bytebarn.com/service">STORE & SERVICE</button></nav>
        <div class="bytebarn-alert">WEEKEND WAREHOUSE SALE! &nbsp; FREE 20' PHONE CORD WITH ANY MODEM &nbsp; WHILE SUPPLIES LAST</div>
        <section class="computer-hero">
          <div class="bytebarn-product">${businessAsset("bytebarn-system", "A complete beige Byte Barn family computer system")}${businessAsset("bytebarn-warehouse-sale", "Byte Barn weekend warehouse sale graphic", "sale-burst-art")}</div>
          <div><p class="catalog-code">SYSTEM 11-99 / HOME OFFICE</p><h1>Put CopperPeak Power in the Family Room!</h1><p>The complete <b>ORBIT 350</b> pairs a CopperPeak Summit II processor with everything needed to get homework, games, and the Information Superhighway off one desk and onto another desk.</p><ul><li>350MHz Summit II processor</li><li>64MB memory</li><li>4.3GB hard drive</li><li>15&quot; color monitor</li><li>56K modem &amp; speakers</li></ul><strong class="hero-price"><small>COMPLETE SYSTEM</small>$1,299</strong><button data-nav="web://bytebarn.com/systems">COMPARE SYSTEMS &gt;</button></div>
        </section>
        <section class="bytebarn-commercial">
          <header><div><small>BYTE BARN VIDEO VAULT</small><h2>Watch our classic TV spot!</h2></div><span>BB-TV // ARCHIVE</span></header>
          <div class="bytebarn-video-deck">
            <div class="bytebarn-video-screen">
              <video controls preload="metadata" playsinline data-stop-page-music data-default-volume="0.5" src="${BYTE_BARN_COMMERCIAL_VIDEO}" aria-label="Byte Barn television commercial">
                Your browser cannot play the Byte Barn commercial.
              </video>
              <i class="video-rec-light" aria-hidden="true"></i>
            </div>
            <aside><b>COMMERCIAL_ARCHIVE.MPG</b><span>Now available through the Information Superhighway!</span><small>Playing this clip stops OrbitAmp so you can hear Chip's pitch without two songs fighting each other.</small></aside>
          </div>
        </section>
        ${state.storyPhase >= 2 ? `<aside class="bytebarn-jingle-traffic"><b>OLD JINGLE FILE NOTICE</b><span>Our retired TV commercial has somehow become the most requested file on this server. Chip says downloading it will not improve your computer.</span><button data-nav="web://freshorbit.zone/users/barnbeatben/home">VISIT BEN'S JINGLE FAN PAGE &rsaquo;</button></aside>` : ""}
        <section class="computer-deals">
          <article>${businessAsset("bytebarn-modem", "An external 56K modem")}<div><b>56K MODEM KIT</b><span>External modem, cable &amp; patient setup guide.</span><strong>$79</strong></div></article>
          <article>${businessAsset("bytebarn-upgrades", "Computer upgrade cards, memory, and joystick")}<div><b>UPGRADE COUNTER</b><span>Memory, video, sound, joysticks and honest advice.</span><strong>FROM $29</strong></div></article>
          <article>${businessAsset("bytebarn-technician", "Chip repairing an open desktop computer")}<div><b>HOUSE CALL</b><span>Chip fixes what the manual cannot.</span><strong>$45/hr</strong></div></article>
        </section>
        <section class="bytebarn-brand-promise">
          ${businessAsset("bytebarn-tested-badge", "Byte Barn Tested service seal")}
          <div><h2>Built here. Tested here. Explained here.</h2><p>Every Byte Barn system gets a full afternoon on the bench before it leaves Market Plaza. We list the real parts, include the driver disks, label the cables, and write your setup notes in complete sentences.</p></div>
          ${businessAsset("bytebarn-no-mystery", "No Mystery Parts Byte Barn badge")}
        </section>
        <aside class="bytebarn-fine-print"><b>WHY BYTE BARN?</b><span>No mystery parts. No 40-minute hold music. If we sell it, somebody in this building knows how it works.</span></aside>
        <p class="business-owner">Questions? Leave Chip a note below. He checks the site between repair jobs and answers in plain English.</p>
        <footer><img src="${BUSINESS_ASSETS["bytebarn-web-button"]}" alt="Byte Barn web button"> BYTE BARN &middot; 1840 Market Plaza &middot; Mon-Fri 9-8 &middot; Sat 9-6 &middot; Closed Sunday</footer>
      </main>`
  },
  "web://bytebarn.com/systems": {
    url: "web://bytebarn.com/systems",
    title: "BYTE BARN Systems & Upgrades",
    site: "computer",
    ownerId: "chip_bytebarn",
    summary: "Byte Barn compares three 1999 home computer systems and lists memory, video, sound, modem, and repair upgrades.",
    listed: true,
    hubId: "business",
    searchTerms: ["computer systems", "desktop PC prices", "CopperPeak", "Trailhead", "Summit", "RAM", "hard drive", "video card", "sound card", "computer upgrade"],
    render: () => `
      <main class="page computer-page bytebarn-systems-page">
        ${byteBarnHeader("SYSTEMS & UPGRADES / NOVEMBER 1999")}
        <nav class="bytebarn-nav"><button data-nav="web://bytebarn.com/home">HOME</button><button data-nav="web://bytebarn.com/software">SOFTWARE</button><button data-nav="web://bytebarn.com/service">STORE & SERVICE</button></nav>
        <section class="bytebarn-systems-intro">${businessAsset("bytebarn-open-tower", "An open beige computer tower showing its components")}<div><p class="catalog-code">NO MYSTERY PARTS INSIDE</p><h1>Choose the computer you need.</h1><p>Not the one a salesman needs to move before inventory. Every processor below comes from CopperPeak Microdevices and every listed component is printed on your invoice.</p>${businessAsset("bytebarn-no-mystery", "No Mystery Parts Byte Barn badge", "systems-promise-badge")}</div></section>
        <section class="system-comparison">
          <article><span>GOOD</span><h2>STUDY 300</h2><strong>$899</strong><ul><li>300MHz CopperPeak Trailhead</li><li>32MB RAM</li><li>3.2GB drive</li><li>40X CD-ROM</li><li>15&quot; monitor</li></ul><button data-email-owner="chip_bytebarn">ASK CHIP</button></article>
          <article class="featured"><span>BETTER</span><h2>ORBIT 350</h2><strong>$1,299</strong><ul><li>350MHz CopperPeak Summit II</li><li>64MB RAM</li><li>4.3GB drive</li><li>3D video</li><li>56K modem</li></ul><button data-email-owner="chip_bytebarn">ASK CHIP</button></article>
          <article><span>BEST</span><h2>CREATOR 450</h2><strong>$1,799</strong><ul><li>450MHz CopperPeak Summit III</li><li>128MB RAM</li><li>10GB drive</li><li>CD recorder</li><li>17&quot; monitor</li></ul><button data-email-owner="chip_bytebarn">ASK CHIP</button></article>
        </section>
        <section class="upgrade-table">
          <div>${businessAsset("bytebarn-upgrades", "Computer memory, video, and sound upgrade parts")}</div>
          <table><caption>UPGRADE COUNTER</caption><tbody><tr><th>32MB MEMORY</th><td>Installed while you wait</td><td>$49</td></tr><tr><th>3D VIDEO CARD</th><td>Games stop looking like homework</td><td>$129</td></tr><tr><th>8GB HARD DRIVE</th><td>Includes drive copy</td><td>$179</td></tr><tr><th>SOUND + SPEAKERS</th><td>16-bit stereo kit</td><td>$89</td></tr><tr><th>PC CLEAN & TUNE</th><td>Inside and out</td><td>$39</td></tr></tbody></table>
        </section>
        <button class="console-return" data-nav="web://bytebarn.com/home">&lt; BACK TO THE FRONT PAGE</button>
        <footer>Prices good through 11/30/99. Monitor shown may be heavier than it appears.</footer>
      </main>`
  },
  "web://bytebarn.com/software": {
    url: "web://bytebarn.com/software",
    title: "BYTE BARN Software Aisle",
    site: "computer",
    ownerId: "chip_bytebarn",
    summary: "Byte Barn's software aisle recommends practical 1999 home, office, education, internet, and game software without mystery bundles.",
    listed: true,
    hubId: "business",
    searchTerms: ["computer software", "office software", "antivirus", "internet software", "educational software", "pc games", "shareware"],
    render: () => `
      <main class="page computer-page bytebarn-software-page">
        ${byteBarnHeader("SOFTWARE AISLE / SHELF 4")}
        <nav class="bytebarn-nav"><button data-nav="web://bytebarn.com/home">HOME</button><button data-nav="web://bytebarn.com/systems">SYSTEMS & UPGRADES</button><button data-nav="web://bytebarn.com/service">STORE & SERVICE</button></nav>
        <section class="software-aisle-hero">${businessAsset("bytebarn-software", "Boxed late-1990s computer software arranged on a Byte Barn shelf")}<div><p class="catalog-code">NO MYSTERY BUNDLES</p><h1>Programs you might actually open.</h1><p>Chip has removed the trial discs, duplicate encyclopedias, and anything that changes your browser homepage without asking.</p></div></section>
        <div class="software-shelf-tabs"><b>HOME & OFFICE</b><span>INTERNET</span><span>LEARNING</span><span>GAMES</span></div>
        <section class="software-shelf">
          <article><i>BB</i><div><h2>PaperTrail Home Office</h2><p>Letters, budgets, labels, and a surprisingly aggressive clip-art wizard.</p></div><strong>$69.99</strong></article>
          <article><i>NET</i><div><h2>WebWalker Kit 4.0</h2><p>Browser, email, chat, and a printed guide explaining what all four are.</p></div><strong>$24.99</strong></article>
          <article><i>ABC</i><div><h2>Planet Facts Deluxe</h2><p>Two CD-ROMs of animals, volcanoes, planets, and narration by a patient man.</p></div><strong>$34.99</strong></article>
          <article><i>!</i><div><h2>CleanBoot Utility Pack</h2><p>Backups, disk cleanup, and antivirus updates through December 2000.</p></div><strong>$39.99</strong></article>
          <article><i>PC</i><div><h2>Graveyard Shift 99</h2><p>Night security strategy. Returned copy; manual contains somebody's level passwords.</p></div><strong>$19.99</strong></article>
        </section>
        <aside class="bytebarn-fine-print"><b>SHAREWARE TABLE</b><span>Bring one blank disk. Chip will copy any public shareware title from the store archive for $1 plus the disk. Please know the filename.</span></aside>
        <button class="console-return" data-nav="web://bytebarn.com/home">&lt; BACK TO THE FRONT PAGE</button>
        <footer>Software may not be returned after opening unless the box contains the wrong number of disks.</footer>
      </main>`
  },
  "web://bytebarn.com/service": {
    url: "web://bytebarn.com/service",
    title: "BYTE BARN Store & Service Desk",
    site: "computer",
    ownerId: "chip_bytebarn",
    summary: "Byte Barn lists its store hours, repair rates, house-call area, beginner classes, address, and practical service policies.",
    listed: true,
    hubId: "business",
    searchTerms: ["computer repair", "computer store hours", "tech support", "house call", "computer class", "Byte Barn address"],
    render: () => `
      <main class="page computer-page bytebarn-service-page">
        ${byteBarnHeader("1840 MARKET PLAZA / SERVICE ENTRANCE B")}
        <nav class="bytebarn-nav"><button data-nav="web://bytebarn.com/home">HOME</button><button data-nav="web://bytebarn.com/systems">SYSTEMS & UPGRADES</button><button data-nav="web://bytebarn.com/software">SOFTWARE</button></nav>
        <section class="service-desk-layout">
          <div class="service-photo">${businessAsset("bytebarn-technician", "Chip working at the Byte Barn repair counter")}<span>Chip at bench 2. Bench 1 is where the coffee goes.</span></div>
          <section><p class="catalog-code">WALK-INS WELCOME</p><h1>We fix computers without making you feel foolish.</h1><div class="service-hours"><h2>STORE HOURS</h2><dl><div><dt>MON-FRI</dt><dd>9 AM-8 PM</dd></div><div><dt>SATURDAY</dt><dd>9 AM-6 PM</dd></div><div><dt>SUNDAY</dt><dd>CLOSED</dd></div></dl></div><button data-email-owner="chip_bytebarn">EMAIL CHIP A QUESTION</button></section>
        </section>
        <section class="service-menu">
          <article><b>BENCH DIAGNOSIS</b><strong>$25</strong><p>Applied to repair if you approve the work.</p></article>
          <article><b>HOUSE CALL</b><strong>$45/hr</strong><p>Within ten miles. Please clear a path to the computer.</p></article>
          <article><b>CLEAN & TUNE</b><strong>$39</strong><p>Dust, startup cleanup, disk check, cable labeling.</p></article>
          <article><b>NEW USER NIGHT</b><strong>FREE</strong><p>Thursdays at 7. Bring questions, not the whole tower.</p></article>
        </section>
        <section class="bytebarn-service-brand"><div>${businessAsset("bytebarn-service-patch", "Byte Barn service counter patch")}</div><p><b>THE BLUE-APRON BENCH</b><br>Repairs are tagged, tested, and signed by the person who did the work. If your receipt says “Chip,” you can ask Chip what he found.</p>${businessAsset("bytebarn-delivery-truck", "Byte Barn computer delivery truck")}</section>
        <div class="service-map"><b>HOW TO FIND US</b><span>Market Plaza, between Value Shoes and the old pharmacy. Use the entrance under the enormous blue BYTE BARN sign.</span><i>N ↑<br>LOT ─ [BYTE BARN] ─ MARKET ST.</i></div>
        <button class="console-return" data-nav="web://bytebarn.com/home">&lt; BACK TO THE FRONT PAGE</button>
        <footer>Data backup is recommended before service. If your hard drive makes a clicking sound, stop turning it on to demonstrate.</footer>
      </main>`
  },
  "web://cosmiccrust.biz/home": {
    url: "web://cosmiccrust.biz/home",
    title: "Cosmic Crust Pizza Online",
    site: "pizza",
    ownerId: "toni_pizza",
    summary: "Cosmic Crust is a family pizza restaurant offering hot food, slices, dinner, lunch, delivery, coupons, and late-night takeout.",
    commentsEnabled: true,
    listed: true,
    hubId: "business",
    searchTerms: ["pizza", "food", "restaurant", "dinner", "lunch", "delivery", "takeout", "coupon", "pepperoni", "arcade", "wings", "breadsticks"],
    render: () => `
      <main class="page pizza-page">
        <header class="cosmic-header"><div><span>COSMIC</span><b>CRUST</b><i>★</i></div><small>PIZZA &amp; GALACTIC ARCADE</small></header>
        <nav class="cosmic-nav"><button data-nav="web://cosmiccrust.biz/home">HOME PLANET</button><button data-nav="web://cosmiccrust.biz/menu">MENU & COUPONS</button><button data-nav="web://cosmiccrust.biz/arcade">ARCADE SCORES</button><button data-nav="web://cosmiccrust.biz/alienclub">ALIEN CLUB</button></nav>
        <div class="pizza-marquee">HOT &middot; FRESH &middot; DELIVERED TO EARTH AND SURROUNDING SUBURBS &middot; CALL 555-PIES</div>
        <section class="pizza-splash">
          <div class="cosmic-pizza-hero">${businessAsset("cosmiccrust-pizza", "A bubbling Cosmic Crust pepperoni pizza surrounded by planets")}<span class="cosmic-burst">OUT OF<br>THIS WORLD!</span></div>
          <div><p class="cosmic-kicker">NOW ORBITING YOUR NEIGHBORHOOD</p><h1>The Future of Dinner Is Round!</h1><p>Family sauce. Properly crispy crust. Cheese with enough gravitational pull to bring everybody to the table.</p><button data-nav="web://cosmiccrust.biz/menu">VIEW THE GALACTIC MENU &gt;&gt;</button><small>Online ordering coming as soon as Toni trusts the computer.</small></div>
        </section>
        <section class="cosmic-specials">
          <article>${businessAsset("cosmiccrust-meal", "A Cosmic Crust pizza meal with takeout box and sodas")}<div><span>MISSION FOR FOUR</span><b>1 LARGE + BREADSTICKS + 2 SODAS</b><strong>$14.99</strong></div></article>
          <article>${businessAsset("cosmiccrust-arcade", "Two colorful arcade cabinets")}<div><span>FREE TOKENS TUESDAY</span><b>2 TOKENS WITH EVERY SLICE</b><strong>HIGH SCORE: TAZ 88420</strong></div></article>
        </section>
        <section class="coupon"><b>PRINT THIS PAGE!</b><strong>$3 OFF</strong><span>any large two-topping pizza &middot; coupon code MARS99 &middot; expires 12/31/99</span></section>
        <p class="business-owner">Tell Toni what topping deserves a permanent place on the menu.</p>
        <footer>Free delivery over $12 &middot; Please allow 30-45 Earth minutes &middot; 81 Comet Road &middot; Open until midnight Fri-Sat</footer>
      </main>`
  },
  "web://cosmiccrust.biz/menu": {
    url: "web://cosmiccrust.biz/menu",
    title: "Cosmic Crust Galactic Menu & Coupons",
    site: "pizza",
    ownerId: "toni_pizza",
    summary: "Cosmic Crust's menu lists pizza sizes, toppings, specialty pies, wings, breadsticks, drinks, delivery prices, and printable coupons.",
    listed: true,
    hubId: "business",
    searchTerms: ["pizza menu", "pizza prices", "pepperoni", "cheese pizza", "wings", "breadsticks", "soda", "delivery coupon"],
    render: () => `
      <main class="page pizza-page cosmic-menu-page">
        <header class="cosmic-header"><div><span>COSMIC</span><b>CRUST</b><i>★</i></div><small>GALACTIC MENU / FALL 1999</small></header>
        <nav class="cosmic-nav"><button data-nav="web://cosmiccrust.biz/home">HOME PLANET</button><button data-nav="web://cosmiccrust.biz/arcade">ARCADE SCORES</button><button data-nav="web://cosmiccrust.biz/alienclub">ALIEN CLUB</button></nav>
        <section class="menu-hero">${businessAsset("cosmiccrust-slice", "A giant stretchy-cheese pepperoni pizza slice")}<div><h1>BUILD YOUR OWN<br>PIZZA PLANET</h1><p>Every orbit begins with sauce and cheese.</p></div></section>
        <section class="cosmic-menu-grid">
          <article><h2>CHOOSE A SIZE</h2><dl><div><dt>PERSONAL / 8&quot;</dt><dd>$4.49</dd></div><div><dt>MEDIUM / 12&quot;</dt><dd>$8.99</dd></div><div><dt>LARGE / 14&quot;</dt><dd>$11.99</dd></div><div><dt>GALACTIC / 18&quot;</dt><dd>$15.99</dd></div></dl><small>First topping included. Extra toppings 75&cent; / $1 / $1.25 / $1.50.</small></article>
          <article><h2>TOPPING STATION</h2><p>Pepperoni &middot; Sausage &middot; Ham &middot; Bacon &middot; Mushroom &middot; Onion &middot; Green Pepper &middot; Black Olive &middot; Pineapple &middot; Jalape&ntilde;o</p><aside>ANCHOVIES AVAILABLE BY REQUEST.<br><small>Toni would like everyone to be normal about this.</small></aside></article>
          <article><h2>SIGNATURE ORBITS</h2><dl><div><dt>RED GIANT</dt><dd>Pepperoni, sausage, ham</dd></div><div><dt>GREEN MOON</dt><dd>Mushroom, pepper, onion, olive</dd></div><div><dt>SPACE CADET</dt><dd>Cheese with smiley pepperoni</dd></div><div><dt>TONI'S COMET</dt><dd>Hot pepper, sausage, extra cheese</dd></div></dl></article>
          <article><h2>SIDE MISSIONS</h2><dl><div><dt>Garlic Breadsticks</dt><dd>$3.49</dd></div><div><dt>10 Meteor Wings</dt><dd>$6.99</dd></div><div><dt>Garden Salad</dt><dd>$3.99</dd></div><div><dt>2-Liter Soda</dt><dd>$2.29</dd></div></dl></article>
        </section>
        <div class="menu-delivery">${businessAsset("cosmiccrust-delivery", "The red Cosmic Crust delivery car with a ringed planet topper")}<p><b>DELIVERY RANGE:</b> Five miles from 81 Comet Road. Free over $12; otherwise $1.50. Call <b>555-PIES</b>. We accept cash, check, and major credit cards over the telephone if Toni can find the imprinter.</p></div>
        <button class="console-return" data-nav="web://cosmiccrust.biz/home">&lt;&lt; RETURN TO HOME PLANET</button>
        <footer>Prices do not include tax. Coupons cannot be combined, stacked, folded into spacecraft, or argued about.</footer>
      </main>`
  },
  "web://cosmiccrust.biz/arcade": {
    url: "web://cosmiccrust.biz/arcade",
    title: "Cosmic Crust Galactic Arcade Scores",
    site: "pizza",
    ownerId: "toni_pizza",
    summary: "Cosmic Crust's arcade page tracks local high scores, cabinet problems, token specials, and the restaurant's very serious house rules.",
    listed: true,
    hubId: "business",
    searchTerms: ["arcade", "high scores", "pizza arcade", "tokens", "video games", "Cosmic Crust scores"],
    render: () => `
      <main class="page pizza-page cosmic-arcade-page">
        <header class="cosmic-header"><div><span>COSMIC</span><b>CRUST</b><i>★</i></div><small>GALACTIC ARCADE / SCORE LINK</small></header>
        <nav class="cosmic-nav"><button data-nav="web://cosmiccrust.biz/home">HOME PLANET</button><button data-nav="web://cosmiccrust.biz/menu">MENU & COUPONS</button><button data-nav="web://cosmiccrust.biz/alienclub">ALIEN CLUB</button></nav>
        <section class="arcade-score-hero">${businessAsset("cosmiccrust-arcade", "Two colorful arcade cabinets in the Cosmic Crust game room")}<div><small>SCORES PHONED IN BY TONI</small><h1>DEFEND YOUR INITIALS.</h1><p>The red cabinet's second button sticks. This is part of the challenge until the repair guy comes Tuesday.</p></div></section>
        <section class="arcade-leaderboards">
          <article><h2>STAR HAULER</h2><ol><li><b>TAZ</b><span>88,420</span></li><li><b>MIR</b><span>71,105</span></li><li><b>JAX</b><span>69,990</span></li><li><b>DAD</b><span>12,400</span></li></ol></article>
          <article><h2>METEOR TAXI</h2><ol><li><b>QQ</b><span>204,110</span></li><li><b>DEX</b><span>190,450</span></li><li><b>TON</b><span>44,020</span></li><li><b>AAA</b><span>90</span></li></ol></article>
          <article><h2>ALIEN PINBALL</h2><ol><li><b>BEV</b><span>9,802,110</span></li><li><b>CHP</b><span>8,114,020</span></li><li><b>RAV</b><span>6,666,666</span></li><li><b>MOM</b><span>2,801,300</span></li></ol></article>
        </section>
        <aside class="arcade-rules"><b>HOUSE RULES</b><span>No tilting, no quarters on the glass, no pizza on the controls, and no claiming the machine "ate it" if Toni watched you miss the slot.</span><strong>TUESDAY: 2 FREE TOKENS WITH EVERY SLICE</strong></aside>
        <button class="console-return" data-nav="web://cosmiccrust.biz/home">&lt;&lt; RETURN TO HOME PLANET</button>
        <footer>Scores reset only when the machine does. Staff scores count, even when this seems unfair.</footer>
      </main>`
  },
  "web://cosmiccrust.biz/alienclub": {
    url: "web://cosmiccrust.biz/alienclub",
    title: "Cosmic Crust Junior Alien Club",
    site: "pizza",
    ownerId: "toni_pizza",
    summary: "The Cosmic Crust Junior Alien Club offers birthday rewards, collectible mission patches, coloring contests, and a printable membership form.",
    listed: true,
    hubId: "business",
    searchTerms: ["kids club", "birthday pizza", "alien club", "coloring contest", "Cosmic Crust membership"],
    render: () => `
      <main class="page pizza-page alien-club-page">
        <header class="cosmic-header"><div><span>COSMIC</span><b>CRUST</b><i>★</i></div><small>JUNIOR ALIEN CLUB / AGES 12 & UNDER</small></header>
        <nav class="cosmic-nav"><button data-nav="web://cosmiccrust.biz/home">HOME PLANET</button><button data-nav="web://cosmiccrust.biz/menu">MENU & COUPONS</button><button data-nav="web://cosmiccrust.biz/arcade">ARCADE SCORES</button></nav>
        <section class="alien-club-hero"><div>${businessAsset("cosmiccrust-astronaut", "A child astronaut mascot holding a Cosmic Crust pizza")}<span>CAPTAIN CRUSTY SAYS: BRING AN ADULT!</span></div><section><small>ATTENTION EARTH KIDS</small><h1>JOIN THE JUNIOR ALIEN CLUB!</h1><p>Get one free personal cheese pizza during your birthday month, a membership card, and important mail approximately four times per year.</p><div class="club-status">ONLINE SIGN-UP: <b>NOT INVENTED YET</b><br><span>Print this page or ask Toni for the paper form.</span></div></section></section>
        <section class="club-perks"><article><b>MISSION PATCHES</b><p>Collect Moon, Mars, and Mysterious Green Planet patches with three separate visits.</p></article><article><b>COLORING CONTEST</b><p>Draw Captain Crusty somewhere pizza has never been. Winner receives tokens and wall fame.</p></article><article><b>BIRTHDAY ORBIT</b><p>Free personal cheese pizza. Toppings cost regular Earth money.</p></article></section>
        <div class="club-form"><b>MEMBERSHIP TRANSMISSION FORM</b><span>Name ____________________ Birthday __________ Favorite topping ____________________</span><small>Parent or guardian signature required. Cosmic Crust will not sell your address because Toni cannot find the mailing-label program.</small></div>
        <button class="console-return" data-nav="web://cosmiccrust.biz/home">&lt;&lt; RETURN TO HOME PLANET</button>
        <footer>Junior Alien Club mail may include coupons, contests, pizza facts, and one annual drawing of a comet wearing sunglasses.</footer>
      </main>`
  },
  "web://pawsnclaws.net/home": {
    url: "web://pawsnclaws.net/home",
    title: "Paws & Claws Pet Emporium",
    site: "pets",
    ownerId: "bev_paws",
    summary: "Paws and Claws is a friendly pet store with cats, dogs, fish, birds, pet food, toys, grooming supplies, and adoption-day information.",
    commentsEnabled: true,
    listed: true,
    hubId: "business",
    searchTerms: ["pet store", "pets", "animals", "cat", "dog", "fish", "bird", "pet food", "toys", "adoption", "aquarium", "pet supplies", "shelter"],
    render: () => `
      <main class="page pets-page">
        <header class="paws-header"><div><span>PAWS</span><i>&</i><b>CLAWS</b></div><small>PET EMPORIUM &middot; 22 WILLOW LANE</small></header>
        <nav class="paws-nav"><button data-nav="web://pawsnclaws.net/home">WELCOME</button><button data-nav="web://pawsnclaws.net/adoption">ADOPTION DAY</button><button data-nav="web://pawsnclaws.net/departments">DEPARTMENTS</button><button data-nav="web://pawsnclaws.net/photos">PET PHOTO WALL</button></nav>
        <div class="paw-trail">●　●　●　●　●　●　●</div>
        <section class="pet-welcome">
          <div class="pickles-card">${businessAsset("pawsnclaws-pickles", "Pickles the orange shop cat asleep beside the cash register")}<small>Pickles, Assistant Manager<br>(currently on break)</small></div>
          <div><p class="paws-note">A NOTE FROM BEV:</p><h1>Everything for Your Best Friend!</h1><p>Food, toys, tanks, tiny sweaters, and advice from people who genuinely want to see your pet photos.</p><p>We are a small store. That means we remember your dog's name and we will absolutely notice if you buy the wrong fish food.</p><button data-nav="web://pawsnclaws.net/adoption">MEET SATURDAY'S PETS &gt;</button></div>
        </section>
        <section class="pet-departments">
          <article>${businessAsset("pawsnclaws-supplies", "Leashes, toys, bowls, grooming tools, and a pet sweater")}<b>DOG &amp; CAT</b><span>Food &middot; beds &middot; leashes &middot; toys &middot; tiny seasonal clothing</span></article>
          <article>${businessAsset("pawsnclaws-aquarium", "A healthy planted freshwater aquarium")}<b>AQUARIUM ROOM</b><span>Healthy fish &middot; tested water &middot; tanks bigger than a flower vase</span></article>
          <article>${businessAsset("pawsnclaws-birds", "Two budgerigar birds perched together")}<b>BIRDS &amp; SMALL PETS</b><span>Seed &middot; cages &middot; bedding &middot; things to chew that are not your furniture</span></article>
        </section>
        <aside class="adoption-callout">${businessAsset("pawsnclaws-adoption", "A shelter dog and cat waiting at adoption day")}<div><b>SATURDAY ADOPTION DAY</b><p>Meet animals from Willow County Shelter, 10 AM-2 PM. Bring the family. Leave impulsive promises at home.</p><button data-nav="web://pawsnclaws.net/adoption">HOW ADOPTION DAY WORKS</button></div></aside>
        <p class="business-owner">Bev reads every message. Pickles walks across the keyboard for about half of them.</p>
        <footer>22 Willow Lane &middot; Mon-Fri 10-7 &middot; Sat 9-5 &middot; Sun 11-4 &middot; &ldquo;If your pet can wear it, we probably sell it.&rdquo;</footer>
      </main>`
  },
  "web://pawsnclaws.net/adoption": {
    url: "web://pawsnclaws.net/adoption",
    title: "Paws & Claws Saturday Adoption Day",
    site: "pets",
    ownerId: "bev_paws",
    summary: "Paws & Claws explains its Saturday shelter adoption event, application process, fees, supplies, and responsible pet preparation.",
    listed: true,
    hubId: "business",
    searchTerms: ["pet adoption", "adopt dog", "adopt cat", "animal shelter", "Saturday adoption", "adoption fees", "responsible pet owner"],
    render: () => `
      <main class="page pets-page paws-adoption-page">
        <header class="paws-header"><div><span>PAWS</span><i>&</i><b>CLAWS</b></div><small>SATURDAY ADOPTION DAY</small></header>
        <nav class="paws-nav"><button data-nav="web://pawsnclaws.net/home">WELCOME</button><button data-nav="web://pawsnclaws.net/departments">DEPARTMENTS</button><button data-nav="web://pawsnclaws.net/photos">PET PHOTO WALL</button></nav>
        <section class="adoption-hero">${businessAsset("pawsnclaws-adoption", "A friendly shelter dog and cat at adoption day")}<div><p class="paws-note">WILLOW COUNTY SHELTER VISITS EVERY SATURDAY</p><h1>Maybe your best friend is waiting.</h1><p>10 AM-2 PM at 22 Willow Lane. Meeting is easy. Taking somebody home should take a little thought.</p></div></section>
        <section class="adoption-steps">
          <article><span>1</span><h2>MEET</h2><p>Talk with a shelter volunteer and spend time with an animal. Everybody in the household should agree.</p></article>
          <article><span>2</span><h2>ASK</h2><p>Learn about temperament, medical care, food, exercise, other pets, and the mysteries of the vacuum cleaner.</p></article>
          <article><span>3</span><h2>APPLY</h2><p>Bring identification and landlord approval if you rent. The shelter reviews applications; nobody goes home as a surprise gift.</p></article>
          <article><span>4</span><h2>PREPARE</h2><p>Food, bowls, collar, carrier, bed, and a quiet first day. Bev gives adopters 10% off their starter supplies.</p></article>
        </section>
        <section class="adoption-details">
          <div>${businessAsset("pawsnclaws-bev", "Bev holding Pickles in the pet store")}<small>Bev and Pickles, who was not consulted about this photograph.</small></div>
          <div><h2>THIS WEEK'S NOTES</h2><ul><li>Dogs: $65 adoption fee</li><li>Cats: $45 adoption fee</li><li>Spay/neuter and first vaccines included</li><li>Please bring a secure carrier for cats</li><li>Resident dogs may attend a supervised introduction</li></ul><aside><b>NOT READY TO ADOPT?</b><p>The shelter also needs unopened food, clean towels, volunteers, and people willing to tell their friends.</p></aside></div>
        </section>
        <button class="console-return" data-nav="web://pawsnclaws.net/home">&lt; BACK TO THE EMPORIUM</button>
        <footer>Adoptions are arranged by Willow County Shelter. Paws & Claws provides the space, supplies, and emergency lint rollers.</footer>
      </main>`
  },
  "web://pawsnclaws.net/departments": {
    url: "web://pawsnclaws.net/departments",
    title: "Paws & Claws Store Departments",
    site: "pets",
    ownerId: "bev_paws",
    summary: "Paws & Claws describes its dog, cat, aquarium, bird, small-pet, grooming, and special-order departments with practical care advice.",
    listed: true,
    hubId: "business",
    searchTerms: ["pet supplies", "dog food", "cat toys", "fish tanks", "bird cages", "hamster supplies", "pet grooming"],
    render: () => `
      <main class="page pets-page paws-departments-page">
        <header class="paws-header"><div><span>PAWS</span><i>&</i><b>CLAWS</b></div><small>STORE DEPARTMENTS &middot; ASK BEFORE TAPPING THE GLASS</small></header>
        <nav class="paws-nav"><button data-nav="web://pawsnclaws.net/home">WELCOME</button><button data-nav="web://pawsnclaws.net/adoption">ADOPTION DAY</button><button data-nav="web://pawsnclaws.net/photos">PET PHOTO WALL</button></nav>
        <section class="department-map">
          <header><small>YOU ARE AT THE FRONT DOOR</small><h1>Everything they need.<br>Several things they absolutely do not.</h1></header>
          <div class="department-map-grid">
            <article class="dept-dog">${businessAsset("pawsnclaws-supplies", "Leashes, pet toys, bowls, grooming tools, and a sweater")}<div><b>DOG & CAT</b><p>Food, beds, collars, toys, brushes, carriers, and seasonal clothing Bev insists is practical.</p></div></article>
            <article class="dept-fish">${businessAsset("pawsnclaws-aquarium", "A planted freshwater aquarium")}<div><b>AQUARIUM ROOM</b><p>Freshwater fish, tested water, filters, lights, plants, and tanks bigger than a flower vase.</p></div></article>
            <article class="dept-bird">${businessAsset("pawsnclaws-birds", "Two budgerigars perched together")}<div><b>BIRDS & SMALL PETS</b><p>Seed, cages, bedding, wheels, tunnels, and things to chew that are not your furniture.</p></div></article>
          </div>
        </section>
        <section class="department-services"><article><span>MON</span><b>NAIL TRIM NIGHT</b><small>5-7 PM / call ahead for nervous dogs</small></article><article><span>THU</span><b>WATER TESTING</b><small>bring half a cup in a clean jar / free</small></article><article><span>ANY</span><b>SPECIAL ORDERS</b><small>if Bev can pronounce it, Bev can probably order it</small></article></section>
        <aside class="department-warning"><b>FIRST PET?</b><p>Please ask before buying a tank, cage, or habitat. The animal is usually the least expensive part of doing it correctly.</p></aside>
        <button class="console-return" data-nav="web://pawsnclaws.net/home">&lt; BACK TO THE EMPORIUM</button>
        <footer>Prices change. Good care does not. Pickles reserves the right to occupy any empty box.</footer>
      </main>`
  },
  "web://pawsnclaws.net/photos": {
    url: "web://pawsnclaws.net/photos",
    title: "Paws & Claws Pet Photo Wall",
    site: "pets",
    ownerId: "bev_paws",
    summary: "The Paws & Claws customer photo wall features local pets, handwritten captions, monthly awards, and submission instructions.",
    listed: true,
    hubId: "business",
    searchTerms: ["pet photos", "customer pets", "cat pictures", "dog pictures", "fish pictures", "pet of the month"],
    render: () => `
      <main class="page pets-page paws-photos-page">
        <header class="paws-header"><div><span>PAWS</span><i>&</i><b>CLAWS</b></div><small>CUSTOMER PET PHOTO WALL / SCANNED BY BEV</small></header>
        <nav class="paws-nav"><button data-nav="web://pawsnclaws.net/home">WELCOME</button><button data-nav="web://pawsnclaws.net/adoption">ADOPTION DAY</button><button data-nav="web://pawsnclaws.net/departments">DEPARTMENTS</button></nav>
        <div class="photo-wall-title"><span>NEW!</span><h1>Our Customers Have Excellent Pets</h1><p>Photographs are returned unless Pickles sits on the envelope.</p></div>
        <section class="pet-photo-wall">
          <article>${businessAsset("pawsnclaws-pickles", "Pickles the orange shop cat asleep by the register")}<b>PICKLES</b><small>Employee of the month, self-appointed.</small></article>
          <article>${businessAsset("pawsnclaws-adoption", "A shelter dog and cat posing together")}<b>RUSTY + BEAN</b><small>Met here Saturday. Now share one couch.</small></article>
          <article>${businessAsset("pawsnclaws-birds", "Two budgerigars perched together")}<b>ZIP + DOT</b><small>Know six words, use four irresponsibly.</small></article>
          <article>${businessAsset("pawsnclaws-aquarium", "A healthy planted freshwater aquarium")}<b>THE WHOLE TANK</b><small>Submitted by Ira, who declined to pick a favorite.</small></article>
          <article>${businessAsset("pawsnclaws-bev", "Bev holding Pickles in the pet store")}<b>BEV + MANAGEMENT</b><small>Management objected to being held.</small></article>
          <article>${businessAsset("pawsnclaws-supplies", "Pet supplies arranged for a customer photograph")}<b>PHOTO MISSING</b><small>Bailey ate the original. This is extremely on brand.</small></article>
        </section>
        <aside class="photo-submit"><b>ADD YOUR PET TO THE WALL</b><p>Bring one labeled 4x6 print to the register. Include pet name, your first name, and one sentence Bev is allowed to put on the Internet.</p></aside>
        <button class="console-return" data-nav="web://pawsnclaws.net/home">&lt; BACK TO THE EMPORIUM</button>
        <footer>Pet of the Month receives a ribbon, a small treat, and no meaningful additional responsibilities.</footer>
      </main>`
  },
  "web://pulsenet.red/home": {
    url: "web://pulsenet.red/home",
    title: "PULSE/NET - The World Is Player Two",
    site: "pulse",
    ownerId: "pulsenet_jax",
    summary: "PULSE/NET is a $199 online-ready video game console built for arcade racing, fighting games, sports, and network multiplayer with an included 56K modem.",
    commentsEnabled: true,
    listed: true,
    hubId: "business",
    searchTerms: ["video games", "videogame console", "gaming", "arcade", "online", "multiplayer", "racing", "fighting", "sports", "modem", "cheap console"],
    render: () => `
      <main class="page pulse-page">
        <header class="pulse-header">
          <div class="pulse-logo"><span>PULSE</span><b>/NET</b><small>REDshift interactive</small></div>
          <nav><button data-nav="web://pulsenet.red/home">START</button><button data-nav="web://pulsenet.red/network">NETWORK</button></nav>
        </header>
        <div class="pulse-status"><i></i> NETWORK STATUS: LIVE &nbsp;//&nbsp; 1,993 PLAYERS CONNECTED &nbsp;//&nbsp; 11.11.99</div>
        <section class="pulse-hero">
          <div class="pulse-rings">${consoleAsset("pulse-cgi-network", "")}${consoleAsset("pulse-cgi-console", "The white PULSE/NET console", "pulse-machine")}</div>
          <div><p class="pulse-kicker">ARCADE. HOME. EVERYWHERE.</p><h1>THE WORLD IS<br><em>PLAYER TWO.</em></h1><p>Rivals do not go home anymore. Neither do you. PULSE/NET puts a 56K connection in every box and the arcade in every room.</p><strong class="pulse-price">$199</strong><button data-nav="web://pulsenet.red/network">ENTER THE NETWORK &gt;</button></div>
        </section>
        <section class="pulse-panels">
          <article>${consoleAsset("pulse-cgi-racers", "Two orange arcade racing cars")}<b>SPEED HAS A SCREEN NAME.</b><span>RACE // RANK // REMATCH</span></article>
          <article>${consoleAsset("pulse-cgi-controller", "PULSE/NET controller")}<b>FOUR PORTS. ZERO MERCY.</b><span>LOCAL OR GLOBAL</span></article>
          <article>${consoleAsset("pulse-cgi-player", "An arcade racer leaning into a cabinet")}<b>THE NETWORK IS IN THE BOX.</b><span>NOT ON A ROADMAP.</span></article>
        </section>
        <p class="business-owner">Jax is running the launch lobby. Ask about PULSE/NET games, connections, or who is brave enough to play.</p>
        <footer>REDshift interactive // Everybody's in. // Best experienced at 800 x 600</footer>
      </main>`
  },
  "web://pulsenet.red/network": {
    url: "web://pulsenet.red/network",
    title: "PULSE/NET Network - Everybody's In",
    site: "pulse",
    ownerId: "pulsenet_jax",
    summary: "The PULSE/NET network page explains its included 56K modem, player lobbies, rankings, web browser, email, and color save puck.",
    listed: true,
    hubId: "business",
    searchTerms: ["PULSE network", "56K modem", "online play", "rankings", "lobby", "email", "web browser"],
    render: () => `
      <main class="page pulse-page pulse-network-page">
        <header class="pulse-header"><div class="pulse-logo"><span>PULSE</span><b>/NET</b></div><nav><button data-nav="web://pulsenet.red/home">START</button></nav></header>
        <div class="pulse-status"><i></i> YOU ARE CONNECTED // PING: 188ms // MODEM: 56K</div>
        <section class="pulse-network-grid">
          <div class="pulse-network-map">${consoleAsset("pulse-cgi-network", "Orange and cyan PULSE network signal")}<span class="node one">YOU</span><span class="node two">TOKYO</span><span class="node three">LONDON</span><span class="node four">CHICAGO</span></div>
          <div><p class="pulse-kicker">NO EXTRA BOX. NO EXTRA EXCUSE.</p><h1>EVERYBODY'S IN.</h1><p>Plug PULSE/NET into a phone line. Make a screen name. Enter a game lobby. Check rankings, challenge friends, browse the web, or send electronic mail from the couch.</p><dl><div><dt>MODEM</dt><dd>56K INCLUDED</dd></div><div><dt>PLAYER PORTS</dt><dd>4</dd></div><div><dt>MEMORY</dt><dd>COLOR SAVE PUCK</dd></div><div><dt>DISC</dt><dd>1GB GD FORMAT</dd></div></dl></div>
        </section>
        <aside class="pulse-ticker">LIVE LOBBIES: VELOCITY BURN 214 // STEEL FIST 189 // TURF WAR '00 351 // NEW PLAYERS WELCOME</aside>
        <button class="console-return" data-nav="web://pulsenet.red/home">&lt; BACK TO PULSE/NET</button>
        <footer>Connection fees may apply. Ask whoever pays the phone bill before 200-minute tournament sessions.</footer>
      </main>`
  },
  "web://vanta2.com/home": {
    url: "web://vanta2.com/home",
    title: "VANTA² - Leave Reality Running",
    site: "vanta",
    ownerId: "axiom_liaison_02",
    summary: "VANTA2 is a premium $299 video game and DVD entertainment console for cinematic games, movies, music, and a library of more than 1,100 original Axiom titles.",
    commentsEnabled: true,
    listed: true,
    hubId: "business",
    searchTerms: ["video games", "videogame console", "gaming", "DVD player", "movies", "music", "cinematic", "premium console", "backward compatible", "entertainment"],
    render: () => `
      <main class="page vanta-page">
        <div class="vanta-loader"><span>AXIOM CONSUMER SYSTEMS</span><i>INTRO COMPLETE</i></div>
        <header><div class="vanta-mark">VANTA<sup>2</sup></div><nav><button data-nav="web://vanta2.com/home">01 / ARRIVAL</button><button data-nav="web://vanta2.com/spec">02 / SYSTEM</button></nav></header>
        <section class="vanta-hero">
          <div class="vanta-machine">${consoleAsset("vanta-editorial-portal", "")}${consoleAsset("vanta-editorial-console", "The tall black VANTA2 console", "vanta-console")}</div>
          <div><p class="vanta-node">NODE 01.1999 // SIGNAL ACQUIRED</p><h1>LEAVE REALITY<br><span>RUNNING.</span></h1><p class="vanta-manifesto">Games remember you.<br>Films surround you.<br>Music lives here.</p><button data-nav="web://vanta2.com/spec">OPEN THE SECOND DOOR</button></div>
        </section>
        <section class="vanta-strip"><div>300 MHz<br><small>VECTOR SOUL</small></div><div>4.7 GB<br><small>DVD MEDIA</small></div><div>1,100+<br><small>WORLDS RETURN</small></div><div>$299<br><small>WINTER 2000</small></div></section>
        <p class="business-owner">The Axiom Liaison monitors this transmission. Product questions will be acknowledged.</p>
        <footer>VANTA<sup>2</sup> // A second world is waiting. // Flash 4 recommended</footer>
      </main>`
  },
  "web://vanta2.com/spec": {
    url: "web://vanta2.com/spec",
    title: "VANTA² System Architecture",
    site: "vanta",
    ownerId: "axiom_liaison_02",
    summary: "The VANTA2 system architecture page lists its Vector Soul processor, Direct-RAM, DVD playback, audio CD support, USB expansion, and backward compatibility.",
    listed: true,
    hubId: "business",
    searchTerms: ["VANTA specifications", "Vector Soul", "DVD playback", "USB", "backward compatibility", "Direct RAM"],
    render: () => `
      <main class="page vanta-page vanta-spec-page">
        <div class="vanta-loader"><span>AXIOM CONSUMER SYSTEMS</span><i>TECHNICAL CHANNEL</i></div>
        <header><div class="vanta-mark">VANTA<sup>2</sup></div><nav><button data-nav="web://vanta2.com/home">01 / ARRIVAL</button></nav></header>
        <section class="vanta-spec-intro">${consoleAsset("vanta-editorial-eye", "A silver collage eye surrounding a blue iris")}<div><p class="vanta-node">NODE 02 // THE MACHINE BEHIND THE IMAGE</p><h1>A SYSTEM FOR<br>SECOND WORLDS.</h1></div></section>
        <section class="vanta-specs">
          <article><span>01</span><b>VECTOR SOUL</b><strong>300 MHz / 128-bit</strong><p>Geometry, light, behavior, memory.</p></article>
          <article><span>02</span><b>DIRECT-RAM</b><strong>32 MB</strong><p>A straight path from thought to image.</p></article>
          <article><span>03</span><b>DISC</b><strong>4.7 GB DVD</strong><p>Games. Films. CD audio. One aperture.</p></article>
          <article><span>04</span><b>ANCESTRY</b><strong>1,100+ TITLES</strong><p>Your original Axiom library crosses over.</p></article>
          <article><span>05</span><b>EXPANSION</b><strong>2 USB / 2 PAD</strong><p>What arrives later already has a door.</p></article>
          <article><span>06</span><b>ADMISSION</b><strong>$299</strong><p>Reality remains available separately.</p></article>
        </section>
        <button class="console-return" data-nav="web://vanta2.com/home">RETURN TO ARRIVAL</button>
        <footer>Specifications subject to refinement before the threshold opens.</footer>
      </main>`
  },
  "web://cubit.fun/home": {
    url: "web://cubit.fun/home",
    title: "CUBIT - Pure Play!",
    site: "cubit",
    ownerId: "cubby_clover",
    summary: "CUBIT is a colorful $189 games-only console with four controller ports, a carrying grip, compact game discs, and an emphasis on simple local multiplayer fun.",
    commentsEnabled: true,
    listed: true,
    hubId: "business",
    searchTerms: ["video games", "videogame console", "gaming", "family", "kids", "four player", "local multiplayer", "party games", "colorful", "affordable console"],
    render: () => `
      <main class="page cubit-page">
        <header><div class="cubit-logo">CU<span>B</span>IT<sup>*</sup></div><p>THE LITTLE BOX WITH A BIG WEEKEND!</p></header>
        <nav><button data-nav="web://cubit.fun/home">HOME</button><button data-nav="web://cubit.fun/games">GAMES!</button></nav>
        <div class="cubit-marquee">*** PURE PLAY! *** FOUR CONTROLLER PORTS! *** NO LOADING A MOVIE BY ACCIDENT! ***</div>
        <section class="cubit-hero">
          <div class="cubit-product">${consoleAsset("cubit-gouache-console", "The hand-painted indigo CUBIT console with carrying handle")}${consoleAsset("cubit-gouache-mascot", "Cubby, the hand-painted smiling yellow star mascot", "cubit-star")}</div>
          <div><span class="sticker">JUST<br>$189!</span><h1>BRING<br>EVERYBODY.</h1><p>No movies. No spreadsheets. No excuses. Pick a controller.</p><button data-nav="web://cubit.fun/games">SEE THE GAMES &gt;&gt;</button></div>
        </section>
        <section class="cubit-features">
          <article>${consoleAsset("cubit-gouache-multiplayer", "Four colorful hand-painted controllers")}<b>FOUR'S A PARTY!</b><p>Four ports right on the front. No adapter scavenger hunt.</p></article>
          <article>${consoleAsset("cubit-gouache-cases", "A hand-painted stack of colorful game cases")}<b>SMALL DISC. BIG FUN!</b><p>1.2GB mini-discs are tough to mistake for your dad's jazz CDs.</p></article>
          <article>${consoleAsset("cubit-gouache-controller", "Chunky hand-painted lime CUBIT controller")}<b>IT JUST FITS!</b><p>A big green button means nobody has to read the manual.</p></article>
        </section>
        <p class="business-owner">Cubby Clover answers questions between snack breaks and four-player rematches.</p>
        <footer>Best viewed with images ON! &nbsp; | &nbsp; CUBIT is a Clover Toyworks thing &nbsp; | &nbsp; PURE PLAY</footer>
      </main>`
  },
  "web://cubit.fun/games": {
    url: "web://cubit.fun/games",
    title: "CUBIT Games - Pick a Controller!",
    site: "cubit",
    ownerId: "cubby_clover",
    summary: "The CUBIT games page features colorful fictional four-player party, racing, adventure, and fighting games for the CUBIT console.",
    listed: true,
    hubId: "business",
    searchTerms: ["CUBIT games", "party games", "kart racing", "adventure", "fighting", "four player games"],
    render: () => `
      <main class="page cubit-page cubit-games-page">
        <header><div class="cubit-logo">CU<span>B</span>IT<sup>*</sup></div><p>GAMES! GAMES! ALSO: GAMES!</p></header>
        <nav><button data-nav="web://cubit.fun/home">HOME</button></nav>
        <section class="cubit-games-title">${consoleAsset("cubit-gouache-players", "Four friends playing CUBIT together on a couch")}<div><h1>PICK A CONTROLLER!</h1><p>Everybody gets a turn. Preferably at the same time.</p></div></section>
        <section class="cubit-game-grid">
          <article><span class="game-burst indigo">4P</span><h2>BLOCK PARTY DELUXE</h2><p>Build it. Bump it. Knock your friend's tower into the soup.</p><b>PUZZLE / PARTY</b></article>
          <article><span class="game-burst orange">NEW</span><h2>TURBO LUNCHBOX</h2><p>Race sandwiches, juice boxes, and one extremely fast banana.</p><b>RACING / 1-4 PLAYERS</b></article>
          <article><span class="game-burst aqua">BIG!</span><h2>STAR SCOUTS</h2><p>Save seven tiny planets with a flashlight and excellent teamwork.</p><b>ADVENTURE / 1-2 PLAYERS</b></article>
          <article><span class="game-burst lime">WOW</span><h2>BACKYARD BRAWLERS</h2><p>The sprinkler is on. The gloves are off. Mom is going to be furious.</p><b>ACTION / 1-4 PLAYERS</b></article>
        </section>
        <div class="cubit-downloads">${consoleAsset("cubit-gouache-cases", "A hand-painted stack of CUBIT game cases")}<p><b>FREE STUFF!</b><br>Printable covers and desktop pictures are coming as soon as our webmaster finds the ZIP disk.</p></div>
        <button class="console-return" data-nav="web://cubit.fun/home">&lt;&lt; BACK HOME</button>
        <footer>Coming dates are guesses made by cheerful people in a very busy office.</footer>
      </main>`
  },
  "web://orbitnet.local/below": {
    url: "web://orbitnet.local/below",
    title: "OrbitNet Maintenance Node",
    site: "directory",
    ownerId: "orbit_guide",
    summary: "An unlisted OrbitNet maintenance node contains a terse synchronization notice and a timestamp matching the Night Signal anomaly.",
    listed: false,
    hubId: "system",
    searchTerms: ["below", "maintenance", "11:17", "synchronization"],
    render: () => `
      <main class="page system-hidden-page">
        <header>ORBIT NETWORK OPERATIONS</header>
        <h1>Maintenance Node /below</h1>
        <p>This endpoint is not included in the public member directory.</p>
        <pre>SYNC WINDOW: 23:17:00
NODE STATUS: LISTENING
PUBLIC INDEX: FALSE
ROUTE OWNER: [ unavailable ]</pre>
        <p class="system-warning">If you reached this page through a member link, please notify your community host.</p>
        <button data-nav="web://home">Return to OrbitNet</button>
      </main>`
  }
};

export const notFoundPage = (url: string): PageDefinition => ({
  url,
  title: "Page Not Found",
  site: "directory",
  ownerId: "orbit_guide",
  summary: `OrbitNet could not locate the requested address ${url}.`,
  render: () => `<main class="page not-found"><h1>404</h1><p>OrbitNet could not locate <code>${url.replaceAll("<", "&lt;")}</code>.</p><button data-nav="web://home">Return to the directory</button></main>`
});
