import type { GameState, PageDefinition } from "./types";

export const BARNRAISERS_ZONE_URL = "web://orbitnet.local/zones/barnraisers";
export const BYTE_BARN_BITES_ZONE_URL = "web://orbitnet.local/zones/bytebarnbites";
export const WIDEWORLD_URL = "web://wideworld.online/orbit-reunion";
export const WIDEWORLD_ARCHIVE_URL = "web://wideworld.online/company/silverdial-bridge";
export const RANDY_FIRST_URL = "web://freshorbit.zone/users/bigrandy/checkingin";
export const RANDY_ZONE_PAGES = [
  { zoneId: "newcomers", url: RANDY_FIRST_URL, title: "Checking In", topic: "ORBIT" },
  { zoneId: "gamegrid", url: "web://gamegrid.zone/users/bigrandy/powerplayer", title: "Power Player", topic: "POWER PLAYERS" },
  { zoneId: "petplanet", url: "web://petplanet.zone/users/bigrandy/animalpal", title: "Animal Pal", topic: "ANIMAL PALS" },
  { zoneId: "cozycommons", url: "web://cozycommons.zone/users/bigrandy/grillcaptain", title: "Grill Captain", topic: "BACKYARD GRILLS" },
  { zoneId: "xtreme", url: "web://xtreme.zone/users/bigrandy/maximumedge", title: "Maximum Edge", topic: "EXTREME SPORTS" },
  { zoneId: "fanverse", url: "web://fanverse.zone/users/bigrandy/superfan", title: "Super Fan", topic: "FAN CULTURE" },
  { zoneId: "yesterday", url: "web://yesterday.zone/users/bigrandy/goodoldays", title: "Good Old Days", topic: "THE GOOD OLD DAYS" },
  { zoneId: "soundwave", url: "web://soundwave.zone/users/bigrandy/hitmaker", title: "Hit Maker", topic: "HOT MUSIC" },
  { zoneId: "backchannel", url: "web://backchannel.zone/users/bigrandy/truthcaptain", title: "Truth Captain", topic: "THE REAL TRUTH" }
] as const;
export const RANDY_PAGES = RANDY_ZONE_PAGES.map((page) => page.url);

export const FEUD_MEMBERS = {
  barnraisers: [
    { ownerId: "barnbeat_ben", handle: "BarnBeat_Ben", title: "MASTER COVER INDEX", url: "web://barnraisers.zone/users/ben/index", blurb: "Every known cover, badge, dub, and tape-trading branch." },
    { ownerId: "rhymetape_rico", handle: "RhymeTape_Rico", title: "CROOKED CLAP ARCHIVE", url: "web://barnraisers.zone/users/rico/clap", blurb: "A sample-by-sample defense of the original jingle." },
    { ownerId: "subbass_simon", handle: "SubBass_Simon", title: "REMIX LABORATORY", url: "web://barnraisers.zone/users/simon/lab", blurb: "Loops, stems, technical notes, and responsible bass." }
  ],
  bytebarnbites: [
    { ownerId: "safetypin_sid", handle: "SafetyPin_Sid", title: "SELLING OUT IS STILL SELLING", url: "web://bytebarnbites.zone/users/sid/manifesto", blurb: "An anti-commercial manifesto with its own unauthorized remix." },
    { ownerId: "tapeattic_tess", handle: "TapeAttic_Tess", title: "BETTER FORGOTTEN COMMERCIALS", url: "web://bytebarnbites.zone/users/tess/archive", blurb: "Old local jingles that deserve the attention more, according to Tess." },
    { ownerId: "lagmaster_99", handle: "LagMaster_99", title: "JINGLE TIER LIST", url: "web://bytebarnbites.zone/users/lagmaster/tiers", blurb: "Rankings, Byte Barn roasts, and one diss remix nobody authorized." }
  ]
} as const;

const esc = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

function zonePage(kind: keyof typeof FEUD_MEMBERS, state: GameState) {
  const pro = kind === "barnraisers";
  const updates = state.storyPhase >= 7
    ? `<aside class="revival-truce"><b>JOINT STATEMENT: WE SAVED THE NETWORK FIRST.</b> Patch verified. Clean tapes mirrored. The feud resumes below, because ${pro ? "the original clap still matters" : "nostalgia still requires adult supervision"}.</aside>`
    : state.storyPhase === 6
      ? `<aside class="revival-truce"><b>FEUD PAUSED.</b> Both rings are mirroring clean copies while something called a Community Accelerator chews through public pages.</aside>`
    : state.storyPhase >= 4
      ? `<aside class="revival-update"><b>BYTE BARN FOREVER UPDATE:</b> ${pro ? "We knew the crooked clap could fill an expo hall." : "A corporate nostalgia festival is still a corporate nostalgia festival. Yes, we have tickets."}</aside>`
      : "";
  return `<main class="page feud-zone ${pro ? "barnraisers" : "barnbites"}">
    <header><small>ORBITNET INDEPENDENT MUSIC RING // PHASE 3</small><h1>${pro ? "BARNRAISERS" : "BYTE BARN BITES!"}</h1><p>${pro ? "PRESERVE IT · FLIP IT · PASS THE TAPE" : "NOSTALGIA IS NOT ABOVE CRITICISM (OR REMIXING)"}</p></header>
    <nav><button data-nav="web://home">ORBIT HOME</button><button data-nav="${pro ? BYTE_BARN_BITES_ZONE_URL : BARNRAISERS_ZONE_URL}">VISIT THE OPPOSITION</button></nav>
    ${updates}<section class="feud-member-grid">${FEUD_MEMBERS[kind].map((member) => `<button data-nav="${member.url}"><span>${pro ? "♫" : "!"}</span><strong>${member.title}</strong><b>${member.handle}</b><small>${member.blurb}</small></button>`).join("")}</section>
    <footer>${pro ? "TAPE TRADES REQUIRE LABELS" : "NO BRANDS ARE SAFE FROM A THREE-CHORD REVIEW"}</footer>
  </main>`;
}

function memberPage(member: (typeof FEUD_MEMBERS)[keyof typeof FEUD_MEMBERS][number], pro: boolean, state: GameState) {
  const later = state.storyPhase === 6 ? `<section class="feud-emergency"><h2>NETWORK PRESERVATION BREAK</h2><p>The feud can wait. Save clean copies, write down unfamiliar object names, and use ByteForge if the web page starts recommending minivans.</p><button data-open="bbs">OPEN ORBIT TERMINAL</button></section>` : state.storyPhase >= 7 ? `<section class="feud-emergency"><h2>CLEAN MIRROR VERIFIED</h2><p>We saved the network together. This does not mean the other ring is right about the clap.</p></section>` : "";
  const opinions: Record<string, string[]> = {
    barnbeat_ben: ["The tape tree proves a local ad can become folk music without permission from a marketing department.", "Ownership matters. So do liner notes. Credit the person whose dub you sampled."],
    rhymetape_rico: ["The clap is late by 31 milliseconds. That is not a mistake; that is the entire pocket.", "A commercial can become community art, but the corporation does not get to pretend it invented the community."],
    subbass_simon: ["STEM A: refrigerator hum. STEM B: crooked clap. STEM C: Chip saying ‘no mystery parts.’", "Do not normalize the loop until you decide whether the hiss is part of the rhythm."],
    safetypin_sid: ["I oppose advertising jingles on principle. I also made mine louder and added a breakdown.", "Nostalgia is not politics, but who gets paid for nostalgia definitely is."],
    tapeattic_tess: ["Byte Barn is catchy. The 1993 Dew Drop Carpet Warehouse spot has a key change and a haunted vacuum.", "Preservation means remembering the awkward local things, not only the one that got a festival."],
    lagmaster_99: ["S TIER: my diss remix. A TIER: original clap. B TIER: everything with fewer than four air horns.", "Selling out is only bad when somebody else gets the better sponsorship banner."]
  };
  return `<main class="page feud-member ${pro ? "barnraisers" : "barnbites"}">
    <header><button data-nav="${pro ? BARNRAISERS_ZONE_URL : BYTE_BARN_BITES_ZONE_URL}">← RING INDEX</button><small>${esc(member.handle)} PRESENTS</small><h1>${esc(member.title)}</h1></header>
    <section class="feud-zine"><div class="feud-cassette">${pro ? "MIX" : "NO!"}</div><div>${opinions[member.ownerId].map((text) => `<p>${esc(text)}</p>`).join("")}<blockquote>${state.storyPhase >= 4 ? (pro ? "Byte Barn Forever is enormous. The original dub still fits on one ordinary tape." : "We attended for research. The research had an encore.") : "This argument will continue after the tape ends."}</blockquote></div></section>
    ${later}<footer><button data-nav="${pro ? BYTE_BARN_BITES_ZONE_URL : BARNRAISERS_ZONE_URL}">${pro ? "READ A COMPLAINT" : "READ A DEFENSE"}</button></footer>
  </main>`;
}

function wideWorldPage(state: GameState) {
  return `<main class="page wideworld-page"><header><b>WIDEWORLD</b><span>ONLINE</span><small>THE WHOLE INTERNET, HELPfully ORGANIZED™</small></header>
    ${state.storyPhase >= 7 ? `<aside class="wideworld-denial"><b>GATEWAY STATUS NOTICE</b><p>WideWorld denies intentionally altering Orbit community pages. The Community Accelerator gateway has nevertheless been disabled while we review certain inherited SilverDial components.</p></aside>` : ""}
    <section class="wideworld-hero"><h1>THE ORBIT REUNION DIRECTORY</h1><p>WideWorld Online welcomes returning Orbit members with improved regular-web compatibility, one convenient index, and absolutely no need to understand how the bridge works.</p><div><b>16,402</b><span>community objects accelerated</span></div></section>
    <section class="wideworld-columns"><article><h2>AN OLD NETWORK, A NEW OPPORTUNITY</h2><p>Our recently reactivated bridge technology connects Orbit pages to the modern WideWorld family. This service was enabled automatically for public communities.</p></article><article><h2>POWERED BY EXPERIENCE</h2><p>WideWorld acquired selected SilverDial access and compatibility assets in 1997. The code is proven, scalable, and old enough that nobody on this page remembers writing it.</p>${state.storyPhase >= 5 ? `<button data-nav="${WIDEWORLD_ARCHIVE_URL}">OPEN CORPORATE ARCHIVE</button>` : ""}</article></section>
    <footer>WideWorld Community Accelerator build WW-22.6 · public gateway active</footer></main>`;
}

function randyPage(index: number, state: GameState) {
  const topics = RANDY_ZONE_PAGES.map((page) => page.topic);
  const first = index === 0;
  return `<main class="page randy-page"><marquee>BIG ${topics[index]} GUY CHECKING IN!!! ★ BIG ${topics[index]} GUY CHECKING IN!!!</marquee>
    <header><div class="randy-portrait">RB</div><div><small>THE OFFICIAL HOME OF</small><h1>BIG RANDY BICKFORD</h1><p>MINIVAN OWNER · WEB CELEBRITY · TOPIC EXPERT</p></div></header>
    <section><h2>BIG ${topics[index]} GUY CHECKING IN!!!</h2><p>${first ? "Hello Orbit neighbors! Randy found this friendly old network and is ready to bring POSITIVE ENERGY, SIGNATURE GRAPHICS, and regular check-ins to every topic that matters." : `Randy knows ${topics[index].toLowerCase()} because Randy has seen several pictures and once discussed the subject beside a minivan.`}</p>
    ${first && state.storyPhase === 4 ? `<button data-randy-join>ADD RANDY TO MY ORBIT REUNION RING</button><small>This only follows Randy's public page. No download is required.</small>` : `<button data-randy-signature>VIEW PAGE SIGNATURE</button>`}</section>
    <aside>— BIG RANDY —<br>“IF THE TOPIC IS BIG, RANDY IS ALREADY THERE!”</aside></main>`;
}

const revivalPages: Record<string, PageDefinition> = {
  [BARNRAISERS_ZONE_URL]: { url: BARNRAISERS_ZONE_URL, title: "BarnRaisers", site: "revival", ownerId: "barnbeat_ben", summary: "A pro-Byte Barn remix and tape-trading ring.", listed: true, minimumPhase: 3, hubId: "zone-barnraisers", render: (state) => zonePage("barnraisers", state) },
  [BYTE_BARN_BITES_ZONE_URL]: { url: BYTE_BARN_BITES_ZONE_URL, title: "Byte Barn Bites!", site: "revival", ownerId: "safetypin_sid", summary: "An affectionate anti-Byte Barn criticism and remix ring.", listed: true, minimumPhase: 3, hubId: "zone-bytebarnbites", render: (state) => zonePage("bytebarnbites", state) },
  [WIDEWORLD_URL]: { url: WIDEWORLD_URL, title: "WideWorld Orbit Reunion Directory", site: "revival", ownerId: "wideworld_system", summary: "WideWorld's unsolicited regular-web compatibility directory.", listed: false, minimumPhase: 4, render: wideWorldPage },
  [WIDEWORLD_ARCHIVE_URL]: { url: WIDEWORLD_ARCHIVE_URL, title: "WideWorld Corporate Archive: SilverDial", site: "revival", ownerId: "wideworld_system", summary: "An acquisition archive for SilverDial bridge assets.", listed: false, minimumPhase: 5, render: () => `<main class="page wideworld-archive"><h1>ACQUISITION RECORD // SILVERDIAL NETWORK SERVICES</h1><p>Asset group: Orbit Bridge 1.x compatibility injector, community-object mapper, gateway telemetry, and regional subscriber records.</p><table><tr><th>1997</th><td>WideWorld Online acquires SilverDial access and bridge assets.</td></tr><tr><th>1999</th><td>Community Accelerator build WW-22.6 reactivates the object injector against public Orbit gateways.</td></tr></table><button data-revival-evidence="wideworld-acquisition">ARCHIVE THIS RECORD</button></main>` },
  ...Object.fromEntries([...FEUD_MEMBERS.barnraisers.map((member) => [member.url, { url: member.url, title: member.title, site: "revival" as const, ownerId: member.ownerId, summary: member.blurb, listed: true, minimumPhase: 3 as const, hubId: "zone-barnraisers", commentsEnabled: true, render: (state: GameState) => memberPage(member, true, state) }]), ...FEUD_MEMBERS.bytebarnbites.map((member) => [member.url, { url: member.url, title: member.title, site: "revival" as const, ownerId: member.ownerId, summary: member.blurb, listed: true, minimumPhase: 3 as const, hubId: "zone-bytebarnbites", commentsEnabled: true, render: (state: GameState) => memberPage(member, false, state) }])]),
  ...Object.fromEntries(RANDY_ZONE_PAGES.map((entry, index) => [entry.url, { url: entry.url, title: `Big Randy: ${entry.title}`, site: "revival" as const, ownerId: "big_randy_payload", summary: `Big Randy's unsolicited ${entry.topic.toLowerCase()} fan page.`, listed: false, minimumPhase: (index === 0 ? 4 : 5) as 4 | 5, commentsEnabled: true, render: (state: GameState) => randyPage(index, state) }]))
};

export { revivalPages };
