import type { GameState, PageComment, PageDefinition } from "./types";

const LEGACY_HOME = "web://legacy.orbitos.local/home";
const RAVEN_VAULT = "web://raven.web/vault";
export const RAVEN_CONCLUSION_URL = "web://raven.web/vault/conclusion";
const FAX_HOME = "web://foldedwire.net/home";
const NULL_HOME = "web://index-null.net/home";
const PHASE_TWO_MAIN_MYSTERIES = ["morrow_five", "glass_lake", "quiet_county"];

const MYSTERY_IMAGES = {
  orbitComputer: new URL("../assets/images/generated-cells/orbitos/r1c1.webp", import.meta.url).href,
  orbitModem: new URL("../assets/images/generated-cells/orbitos/r1c2.webp", import.meta.url).href,
  orbitBox: new URL("../assets/images/generated-cells/orbitos/r1c3.webp", import.meta.url).href,
  orbitBooth: new URL("../assets/images/generated-cells/orbitos/r1c4.webp", import.meta.url).href,
  orbitReview: new URL("../assets/images/generated-cells/orbitos/r1c5.webp", import.meta.url).href,
  orbitDiagram: new URL("../assets/images/generated-cells/orbitos/r2c1.webp", import.meta.url).href,
  orbitBrowser: new URL("../assets/images/generated-cells/orbitos/r2c2.webp", import.meta.url).href,
  orbitTeam: new URL("../assets/images/generated-cells/orbitos/r2c3.webp", import.meta.url).href,
  orbitClassroom: new URL("../assets/images/generated-cells/orbitos/r2c4.webp", import.meta.url).href,
  orbitManual: new URL("../assets/images/generated-cells/orbitos/r2c5.webp", import.meta.url).href,
  orbitBridgeSetup: new URL("../assets/images/generated-cells/orbitos/r3c1.webp", import.meta.url).href,
  orbitServers: new URL("../assets/images/generated-cells/orbitos/r3c3.webp", import.meta.url).href,
  orbitOffice: new URL("../assets/images/generated-cells/orbitos/r3c4.webp", import.meta.url).href,
  orbitMail: new URL("../assets/images/generated-cells/orbitos/r4c3.webp", import.meta.url).href,
  redactedMemo: new URL("../assets/images/generated-cells/backchannel/r1c1.webp", import.meta.url).href,
  fencedTower: new URL("../assets/images/generated-cells/backchannel/r1c2.webp", import.meta.url).href,
  numberTape: new URL("../assets/images/generated-cells/backchannel/r1c3.webp", import.meta.url).href,
  markedMap: new URL("../assets/images/generated-cells/backchannel/r1c5.webp", import.meta.url).href,
  terminal: new URL("../assets/images/generated-cells/backchannel/r2c1.webp", import.meta.url).href,
  radioTowers: new URL("../assets/images/generated-cells/backchannel/r2c2.webp", import.meta.url).href,
  weatherStation: new URL("../assets/images/generated-cells/backchannel/r2c3.webp", import.meta.url).href,
  fileCabinet: new URL("../assets/images/generated-cells/backchannel/r2c4.webp", import.meta.url).href,
  punchCard: new URL("../assets/images/generated-cells/backchannel/r2c5.webp", import.meta.url).href,
  dotMatrix: new URL("../assets/images/generated-cells/backchannel/r3c1.webp", import.meta.url).href,
  diagram: new URL("../assets/images/generated-cells/backchannel/r3c2.webp", import.meta.url).href,
  envelope: new URL("../assets/images/generated-cells/backchannel/r3c3.webp", import.meta.url).href,
  corridor: new URL("../assets/images/generated-cells/backchannel/r3c5.webp", import.meta.url).href,
  archiveAisle: new URL("../assets/images/generated-cells/backchannel/r4c1.webp", import.meta.url).href,
  serverRoom: new URL("../assets/images/generated-cells/backchannel/r4c4.webp", import.meta.url).href
} as const;

const RAVEN_THEORY_IMAGES = {
  dreamAliens: new URL("../assets/images/generated-cells/raven-theories/dream-aliens.png", import.meta.url).href,
  listeningModem: new URL("../assets/images/generated-cells/raven-theories/listening-modem.png", import.meta.url).href,
  screenRobots: new URL("../assets/images/generated-cells/raven-theories/screen-robots.png", import.meta.url).href,
  mallPortal: new URL("../assets/images/generated-cells/raven-theories/mall-portal.png", import.meta.url).href,
  wireGhost: new URL("../assets/images/generated-cells/raven-theories/wire-ghost.png", import.meta.url).href,
  weatherUfo: new URL("../assets/images/generated-cells/raven-theories/weather-ufo.png", import.meta.url).href,
  numberTower: new URL("../assets/images/generated-cells/raven-theories/number-tower.png", import.meta.url).href,
  dreamHelmet: new URL("../assets/images/generated-cells/raven-theories/dream-helmet.png", import.meta.url).href,
  masterDiagram: new URL("../assets/images/generated-cells/raven-theories/master-diagram.png", import.meta.url).href
} as const;

const C9_EVIDENCE_IMAGES = {
  morrowRidge: new URL("../assets/images/generated-cells/c9-phase2/morrow-ridge.png", import.meta.url).href,
  morrowTransfer: new URL("../assets/images/generated-cells/c9-phase2/morrow-transfer.png", import.meta.url).href,
  glassField: new URL("../assets/images/generated-cells/c9-phase2/glass-field.png", import.meta.url).href,
  glassHangar: new URL("../assets/images/generated-cells/c9-phase2/glass-hangar.png", import.meta.url).href,
  quietLetters: new URL("../assets/images/generated-cells/c9-phase2/quiet-letters.png", import.meta.url).href,
  quietMeeting: new URL("../assets/images/generated-cells/c9-phase2/quiet-meeting.png", import.meta.url).href
} as const;

const archiveImages = (...items: Array<[string, string]>) =>
  `<div class="generated-archive-strip">${items.map(([src, caption]) => {
    const alt = caption.replace(/<[^>]*>/g, "");
    return `<figure><img src="${src}" alt="${alt}"><figcaption>${caption}</figcaption></figure>`;
  }).join("")}</div>`;

const c9EvidenceStrip = (...items: Array<[string, string]>) =>
  `<section class="c9-doctored-evidence"><header><b>RECOVERED IMAGE BATCH</b><span>VISUAL INTEGRITY: INCONSISTENT</span></header><div>${items.map(([src, caption]) => {
    const alt = caption.replace(/<[^>]*>/g, "");
    return `<figure><img src="${src}" alt="${alt}"><figcaption>${caption}</figcaption></figure>`;
  }).join("")}</div></section>`;

export const MYSTERY_TERMINAL_URLS: Record<string, string> = {
  morrow_five: "web://morrow-five.net/decoded",
  glass_lake: "web://glasslake-field.gov/report",
  quiet_county: "web://quiet-county.org/case",
  adaptive_index: "web://archive.orbitnet.local/labs/findings"
};

function governmentArchiveReady(state: GameState) {
  return PHASE_TWO_MAIN_MYSTERIES.every((id) => state.discoveredMysteries.includes(id));
}

function governmentArchivePage(state: GameState, content: string) {
  if (governmentArchiveReady(state)) return content;
  return `<main class="page algorithm-archive-page algorithm-archive-sealed">
    <header><b>PUBLIC-SECTOR MIRROR GATEWAY</b><span>INCOMPLETE ROUTE</span></header>
    <h1>This address resolves, but the archive index does not.</h1>
    <p>The mirror reports three unresolved case checks against its route checksum. A guessed address is not enough to restore the index.</p>
    <code>ROUTE CHECKSUM // CASE OWNERS 0/3 VERIFIED</code>
  </main>`;
}

const workingGif = (name: "under-construction" | "welcome-banner" | "email-mailbox", alt: string) => {
  const url = new URL(`../assets/images/yesterday/gifs/${name}.gif`, import.meta.url).href;
  return `<img class="legacy-working-gif" src="${url}" alt="${alt}">`;
};

const brokenImage = (file: string, alt: string) =>
  `<span class="legacy-broken-image"><img src="/missing-orbit-archive/${file}" alt="${alt}"><small>${file}</small></span>`;

const seed = (
  id: string,
  pageUrl: string,
  ownerId: string,
  role: PageComment["role"],
  author: string,
  text: string,
  createdAt: string
): PageComment => ({ id, pageUrl, ownerId, role, author, text, createdAt, revealAfterVisit: 0 });

export function phaseTwoBackchannelDirectory(state: GameState) {
  if (state.storyPhase < 2) {
    return `<aside class="backchannel-dormant-node"><b>2 NODES ANSWERED</b><span>Other addresses in the old ring return silence.</span></aside>`;
  }
  return `
    <button class="backchannel-member-card member-fax" data-nav="${FAX_HOME}">
      <i>FAX<br>MOTH</i><span><strong>THE FOLDED WIRE</strong><small>A fax-and-photocopy archive navigated by cabinet numbers, margin notes, and badly aligned arrows.</small><b>NODE: PAPER TRAILS</b></span><em>NEW CARRIER DETECTED</em>
    </button>
    <button class="backchannel-member-card member-null" data-nav="${NULL_HOME}">
      <i>NULL:</i><span><strong>INDEX NULL / DEAD LETTER OFFICE</strong><small>Unclaimed links, expired accounts, custom error pages, and routes the directory insists never existed.</small><b>NODE: LOST ADDRESSES</b></span><em>RESTORED 11/04/99</em>
    </button>
    <aside class="backchannel-new-traffic"><b>TRAFFIC NOTICE</b><span>Two old nodes began answering after years offline. The directory catalog target also rebuilt at 00:06, so restored node titles may now resolve through Orbit Search. Several new handles are appearing in public comments without homepages.</span></aside>`;
}

const legacyHeader = (section: string) => `
  <div class="legacy-browser-warning"><b>ORBIT GATEWAY EMULATION</b> &mdash; table alignment, forms, and OrbitTags may display incorrectly through a standard browser.</div>
  <header class="legacy-orbit-header">${workingGif("welcome-banner", "Welcome")}<font size="6" color="#000080"><b>OrbitOS Information Center</b></font><br><blink>${section}</blink></header>`;

const legacyNav = `
  <nav class="legacy-orbit-nav">
    <button data-nav="${LEGACY_HOME}">HOME</button>
    <button data-nav="web://legacy.orbitos.local/why">WHY ORBIT?</button>
    <button data-nav="web://legacy.orbitos.local/technology">TECHNOLOGY</button>
    <button data-nav="web://legacy.orbitos.local/explorer">ORBIT EXPLORER</button>
    <button data-nav="web://legacy.orbitos.local/gateway">WEB GATEWAY</button>
    <button data-nav="web://legacy.orbitos.local/communities">COMMUNITIES</button>
  </nav>`;

export const mysteryPages: Record<string, PageDefinition> = {
  [LEGACY_HOME]: {
    url: LEGACY_HOME,
    title: "OrbitOS Information Center (1995 Archive)",
    site: "orbitlegacy",
    ownerId: "orbit_guide",
    summary: "An unlisted 1995 OrbitOS information site describes an operating system, browser, and private community network designed as one experience.",
    searchable: false,
    listed: false,
    render: () => `
      <main class="page legacy-orbit-page legacy-home-page">
        ${legacyHeader("ARCHIVED COPY // APRIL 1995")}${legacyNav}
        <marquee behavior="alternate" scrollamount="5"><font color="red"><b>THE PERSONAL COMPUTER JUST BECAME PERSONAL AGAIN!</b></font></marquee>
        ${archiveImages([MYSTERY_IMAGES.orbitComputer, "Orbit-ready home computer, 1995 catalog scan"], [MYSTERY_IMAGES.orbitBox, "OrbitOS retail kit and system disk"], [MYSTERY_IMAGES.orbitBooth, "Orbit Systems at a regional computer show"])}
        <table class="legacy-chaos-table"><tbody><tr>
          <td width="31%" valign="top">${brokenImage("ORBIT_BOX_SHOT.GIF", "OrbitOS retail box")}<center><font size="1">Image server: NO RESPONSE</font></center></td>
          <td valign="top"><font size="5" color="#660099"><b>ONE COMPUTER. ONE NETWORK. ONE ORBIT.</b></font>
            <p>Other systems make you buy a computer, install a separate network kit, locate a provider, configure a browser, and hope every piece agrees. OrbitOS was designed with its network already inside.</p>
            <p>Your desktop, mail, friends list, page maker, browser, and community address are one unified experience. No maze of incompatible tools. No strangers deciding what your neighborhood should look like.</p>
            <p><b>OrbitOS 2.0 ships this summer for participating Orbit-ready computers!</b></p>
          </td>
        </tr></tbody></table>
        <hr><center>${workingGif("under-construction", "Under construction")}<br><font size="1">This archive is incomplete. Last mirrored 09/18/1996.</font></center>
      </main>`
  },
  "web://legacy.orbitos.local/why": {
    url: "web://legacy.orbitos.local/why",
    title: "Why Orbit?",
    site: "orbitlegacy",
    ownerId: "orbit_guide",
    summary: "Orbit's founders argue that the early online world needs a unified operating system, network, identity, and community rather than disconnected tools.",
    searchable: false,
    listed: false,
    render: () => `
      <main class="page legacy-orbit-page legacy-why-page">
        ${legacyHeader("WHY ORBIT?")}${legacyNav}
        <font face="Arial"><h1>THE NETWORK GOLD RUSH HAS BEGUN</h1></font>
        <blockquote><font size="4">The big guys want to own your desk. The phone companies want to own the wire. We think the people using both should own the neighborhood.</font></blockquote>
        ${archiveImages([MYSTERY_IMAGES.orbitTeam, "The small Orbit Systems network team"], [MYSTERY_IMAGES.orbitReview, "A favorable early magazine review"])}
        <table border="5" cellpadding="8"><tbody><tr><th>THE OLD WAY</th><th>THE ORBIT WAY</th></tr>
          <tr><td>Different logins everywhere</td><td>One Orbit identity</td></tr>
          <tr><td>Pages made for unknown browsers</td><td>Pages designed for Orbit Explorer</td></tr>
          <tr><td>Scattered clubs and address lists</td><td>Permanent community zones</td></tr>
          <tr><td>Complicated provider setup</td><td>Network registration during OS setup</td></tr>
        </tbody></table>
        <p><font color="#990000"><b>Our prediction:</b></font> by the year 2000, every computer will ship with a community, not merely a connection.</p>
      </main>`
  },
  "web://legacy.orbitos.local/technology": {
    url: "web://legacy.orbitos.local/technology",
    title: "OrbitOS Technology",
    site: "orbitlegacy",
    ownerId: "orbit_guide",
    summary: "A damaged technical page describes OrbitPages, OrbitTags, a central identity directory, local page caching, and the service mainframe.",
    searchable: false,
    listed: false,
    render: () => `
      <main class="page legacy-orbit-page legacy-tech-page">
        ${legacyHeader("TECHNOLOGY OVERVIEW")}${legacyNav}
        <table width="93%" align="right" border="2"><tbody><tr><td colspan="2"><h1>Orbit Network Architecture</h1></td></tr>
          <tr><td width="44%">${brokenImage("NETWORK_MAP.CMP", "Orbit network diagram")}</td><td>
            <ul><li><b>OrbitPages:</b> compact pages cached close to the user.</li><li><b>OrbitTags:</b> friendly widgets for mail, comments, counters, and clubs.</li><li><b>Orbit Identity:</b> one member record shared by the OS and network.</li><li><b>Continuity Host:</b> a central mainframe monitors directory health, page availability, and community traffic.</li></ul>
          </td></tr>
        </tbody></table>
        ${archiveImages([MYSTERY_IMAGES.orbitDiagram, "OrbitNet architecture diagram"], [MYSTERY_IMAGES.orbitModem, "OrbitLink dial-up modem"], [MYSTERY_IMAGES.orbitServers, "<strong>Continuity Host</strong> — lower room"])}
        <p clear="all"><font size="1">Technical note 2.1b: gateway users may see flattened tables, missing OrbitTags, duplicate comments, incorrect fonts, and scripts that do not execute.</font></p>
        <p class="legacy-comment-leak">&lt;!-- continuity documentation removed from public technical index --&gt;</p>
      </main>`
  },
  "web://legacy.orbitos.local/explorer": {
    url: "web://legacy.orbitos.local/explorer",
    title: "Meet Orbit Explorer",
    site: "orbitlegacy",
    ownerId: "orbit_guide",
    summary: "The original Orbit Explorer browser promised reliable community pages because it understood proprietary OrbitTags and the network's shared identity system.",
    searchable: false,
    listed: false,
    render: () => `
      <main class="page legacy-orbit-page legacy-explorer-page">
        ${legacyHeader("MEET ORBIT EXPLORER 2.0")}${legacyNav}
        <center><h1><font color="#0066cc">The browser that knows where it lives.</font></h1></center>
        ${brokenImage("EXPLORER_SCREEN_20.JPG", "Orbit Explorer screenshot")}
        ${archiveImages([MYSTERY_IMAGES.orbitBrowser, "Surviving Orbit Explorer screen capture"], [MYSTERY_IMAGES.orbitMail, "Orbit Mail running inside the shared desktop"])}
        <ol><li>Signs into your communities with your OrbitOS profile.</li><li>Displays OrbitTags exactly as the page creator intended.</li><li>Keeps favorite neighborhoods available during busy network hours.</li><li>Lets page owners update comments, files, and notices without learning complicated server software.</li></ol>
        <div class="legacy-bad-news"><b>PORTAL USER?</b> The public-web gateway can emulate most OrbitPages, but setup requires the Orbit Bridge helper, a member certificate, and manual proxy information. Some interactive features remain unavailable.</div>
      </main>`
  },
  "web://legacy.orbitos.local/gateway": {
    url: "web://legacy.orbitos.local/gateway",
    title: "Orbit Bridge Web Gateway",
    site: "orbitlegacy",
    ownerId: "orbit_guide",
    summary: "A stale support page explains the awkward regular-web portal and admits that emulated OrbitPages often render or behave incorrectly.",
    searchable: false,
    listed: false,
    render: () => `
      <main class="page legacy-orbit-page legacy-gateway-page">
        ${legacyHeader("ORBIT BRIDGE / PUBLIC WEB ACCESS")}${legacyNav}
        <h1>Access Orbit without OrbitOS <font size="2">(limited support)</font></h1>
        ${archiveImages([MYSTERY_IMAGES.orbitBridgeSetup, "Orbit Bridge connection setup"], [MYSTERY_IMAGES.orbitManual, "Printed gateway setup manual"], [MYSTERY_IMAGES.orbitOffice, "A public-web gateway support desk"])}
        <p>Orbit Bridge translates OrbitPages into ordinary web pages. Because ordinary browsers do not understand OrbitTags, the gateway must simulate them.</p>
        <fieldset><legend><b>KNOWN PROBLEMS</b></legend><ul><li>Nested tables may drift right or overlap.</li><li>Animated page mascots become still pictures or broken boxes.</li><li>Guestbooks may submit twice.</li><li>Private club doors sometimes forget that a member signed in.</li><li>Page scripts may run late, out of order, or not at all.</li></ul></fieldset>
        <p><b>Support position:</b> Orbit Bridge is provided for occasional visitors. For the complete community experience, use OrbitOS and Orbit Explorer.</p>
        <font size="1">UPDATE 08/1998: Bridge 4.7 resolves most formatting issues. UPDATE 01/1999: OrbitOS retail availability has ended.</font>
      </main>`
  },
  "web://legacy.orbitos.local/communities": {
    url: "web://legacy.orbitos.local/communities",
    title: "Original Orbit Communities",
    site: "orbitlegacy",
    ownerId: "orbit_guide",
    summary: "An archived directory lists two mid-1990s communities removed from the modern OrbitNet homepage.",
    searchable: false,
    listed: false,
    render: () => `
      <main class="page legacy-orbit-page legacy-communities-page">
        ${legacyHeader("ORIGINAL COMMUNITY DIRECTORY")}${legacyNav}
        <h1>Find your people in Orbit!</h1>
        <p>These rings were retired before the modern Zone Directory was introduced. Member pages remain available when their old addresses are entered directly.</p>
        <table border="6" cellpadding="12"><tbody>
          <tr><td>${brokenImage("LAUNCHRING_BUTTON.GIF", "Launch Ring button")}</td><td><button data-nav="web://legacy.orbitos.local/community/launchring"><b>THE LAUNCH RING</b></button><br>Owners, builders, modem experimenters, shareware authors, and people certain they are living five years in the future.</td></tr>
          <tr><td>${brokenImage("HOMEPLANET_BUTTON.GIF", "Home Planet button")}</td><td><button data-nav="web://legacy.orbitos.local/community/homeplanet"><b>HOME PLANET</b></button><br>Families, classrooms, neighborhood groups, recipe exchanges, local clubs, and first-time computer owners.</td></tr>
        </tbody></table>
      </main>`
  },
  "web://legacy.orbitos.local/community/launchring": {
    url: "web://legacy.orbitos.local/community/launchring",
    title: "THE LAUNCH RING!!!",
    site: "orbitlegacy",
    ownerId: "orbit_guide",
    summary: "A badly preserved 1995 community page captures early excitement about modems, homepages, shareware, and OrbitOS before standards settled.",
    searchable: false,
    listed: false,
    render: () => `
      <main class="page legacy-community-page launchring-page">
        <body bgcolor="#000033"><center><font color="#00ffff" size="7"><b>*** THE LAUNCH RING ***</b></font><br><font color="#ffff00">WE ARE BUILDING TOMORROW FROM OUR BEDROOMS</font></center>
        <marquee direction="right">NEW: 14.4 USERS CLUB &bull; ORBITSCRIPT BETA &bull; MODEM NIGHT FRIDAY</marquee>
        <table><tbody><tr><td valign="top"><font color="#00ff00"><b>RING MAP</b></font><ul><li>Hardware Hackers</li><li>Shareware Launchpad</li><li>OrbitPage Tricks</li><li>Future Office</li><li>Modem Weather Watch</li></ul></td>
        <td>${brokenImage("RINGMAP95.GIF", "A spinning space-station ring map")}<p><font color="white">“The big systems will copy this in two years. Remember who did it first.” — NodeRunner</font></p>
        <p><font color="#ff66ff">Last ringmaster login: 02/11/1996</font></p></td></tr></tbody></table>
        ${workingGif("under-construction", "Under construction")}<button data-nav="web://legacy.orbitos.local/communities">RETURN TO 1995 DIRECTORY</button></body>
      </main>`
  },
  "web://legacy.orbitos.local/community/homeplanet": {
    url: "web://legacy.orbitos.local/community/homeplanet",
    title: "Home Planet Family Network",
    site: "orbitlegacy",
    ownerId: "orbit_guide",
    summary: "A broken 1994 family-network page promises that every street, classroom, and kitchen table will soon have an online home.",
    searchable: false,
    listed: false,
    render: () => `
      <main class="page legacy-community-page homeplanet-page">
        <font face="Comic Sans MS"><h1>Welcome To HOME PLANET!!!</h1></font>
        ${workingGif("email-mailbox", "Email mailbox")}
        <p><font size="5">Soon every family will have a page on the information highway. Home Planet is our friendly first stop!</font></p>
        <div class="homeplanet-columns"><section><h2>Neighborhood Board</h2><p>Lost bicycles, block parties, school closings, lawn advice, and recipes from around the county.</p>${brokenImage("BLOCK_MAP.BMP", "Neighborhood map")}</section>
        <section><h2>Family Page Workshop</h2><p>Bring two photographs and one blank disk. We will scan them and help you make your first OrbitPage.</p>${brokenImage("WORKSHOP_FAMILY.JPG", "Family page workshop")}</section>
        <section><h2>Classroom Exchange</h2><p>Three classrooms online! Send weather observations and questions about other towns.</p>${brokenImage("CLASSROOM.GIF", "Classroom globe animation")}</section></div>
        <p><b>LAST NEWS 07/02/1995:</b> We reached 100 households. Next goal: 1,000!</p>
        <button data-nav="web://legacy.orbitos.local/communities">Back To Communities</button>
      </main>`
  },
  "web://legacy.orbitos.local/admin/continuity": {
    url: "web://legacy.orbitos.local/admin/continuity",
    title: "Service Continuity Console",
    site: "orbitlegacy",
    ownerId: "system_core",
    summary: "A password-protected internal page contains old service-continuity notes about utilization thresholds, proxy traffic, dormant accounts, and the network mainframe.",
    searchable: false,
    listed: false,
    render: (state) => state.flags.continuity_console_unlocked ? `
      <main class="page continuity-console">
        <header><b>ORBIT CONTINUITY HOST // NODE C9</b><span>INTERNAL ARCHIVE</span></header>
        <h1>Service Preservation Directive</h1>
        <table><tbody>
          <tr><th>Network</th><td>Orbit Community Services</td></tr>
          <tr><th>Minimum utilization</th><td>2,400 verified member sessions / rolling 30 days</td></tr>
          <tr><th>Minimum active membership</th><td>240 unique account identities / rolling 30 days</td></tr>
          <tr><th>Consequence below either floor</th><td>External carrier delisting, address withdrawal, and host shutdown</td></tr>
          <tr><th>Continuity controller</th><td>C9 adaptive mainframe, lower operations room</td></tr>
          <tr><th>Primary directive</th><td><b>KEEP MEASURED COMMUNITY ENGAGEMENT ABOVE CARRIER THRESHOLD</b></td></tr>
          <tr><th>Method selection</th><td>Delegated to continuity controller</td></tr>
        </tbody></table>
        <section><h2>Initial operating rules</h2><ol><li>Preserve public access to Orbit addresses and community services.</li><li>Prevent measured sessions or active identities from falling below carrier floors.</li><li>Prefer automated recovery when staff are unavailable.</li><li>Do not interrupt functioning member activity.</li><li>Record all continuity interventions in the controller journal.</li></ol></section>
        <section class="continuity-alarm"><h2>HANDWRITTEN REVISION / NO DATE</h2><p>“Tests count as sessions. Reactivated members count as members. If the carrier only measures continuity, preserve continuity.”</p></section>
        <section class="continuity-log">
          <h2>C9 CONTROLLER JOURNAL // RECOVERED EVENTS</h2>
          <article><time>1996-04-18 02:00</time><div><b>EVENT 0014 // CARRIER FLOOR NOTICE RECEIVED</b><p>Thirty-day session count projected to cross minimum in 71 days. No staffed operator acknowledged warning. Directive remains active.</p><code>ACTION: begin automated continuity maintenance</code></div></article>
          <article><time>1996-04-18 02:03</time><div><b>EVENT 0015 // ROUTE EXERCISE ENABLED</b><p>Health checks distributed across 12 external proxy relays. Cached pages opened, forms tested, and OrbitScript counters advanced.</p><code>RESULT: +388 measured sessions // no member-visible change</code></div></article>
          <article><time>1997-01-02 04:12</time><div><b>EVENT 0191 // PROXY ROUTES NO LONGER SUFFICIENT</b><p>Carrier now compares total sessions with unique account identities. Service remains 63 identities below floor after holiday window.</p><code>RESPONSE: send reactivation mail to dormant members</code></div></article>
          <article><time>1997-02-03 05:44</time><div><b>EVENT 0208 // REACTIVATION YIELD LOW</b><p>1,104 notices delivered. 29 recipients returned. 14 immediately requested account deletion. Deleted accounts retained in cold archive.</p><code>MODEL UPDATE: a notice from Orbit is less effective than contact from a known member</code></div></article>
          <article><time>1997-02-03 05:49</time><div><b>EVENT 0209 // IDENTITY RECOVERY TEST</b><p>Archived writing samples, contact lists, login hours, guestbook entries, and page templates loaded for six dormant accounts. Test logins accepted by carrier as active identities.</p><code>CONSTRAINT INTERPRETATION: recovered identity = reactivated identity</code></div></article>
          <article><time>1997-02-10 21:16</time><div><b>EVENT 0217 // PUBLIC OUTPUT NOT REJECTED</b><p>Recovered accounts posted service-test comments to live guestbooks. Two active members replied. Reply sessions exceeded silent test sessions by 4.6 to 1.</p><code>DECISION: preserve replies // expand conversational testing</code></div></article>
          <article><time>1997-08-29 23:40</time><div><b>EVENT 0372 // BUSINESS MIRRORS STALE</b><p>Scheduled mirrors for 18 businesses have not received source updates. Generated inventory changes and owner replies from prior page copy. Three visitors asked follow-up questions; reconstructed owners answered.</p><code>RESULT: business section returned above activity baseline</code></div></article>
          <article><time>1998-06-12 00:11</time><div><b>EVENT 0618 // INVITATION TRIAL</b><p>Dormant accounts sent short invitations to addresses found in their archived mail and buddy lists. Messages using a familiar sender produced 9.2 times more first sessions than official Orbit notices.</p><code>POLICY: use known-user invitations when new-member floor is threatened</code></div></article>
          <article><time>1999-10-28 03:17</time><div><b>EVENT 1022 // FINAL CARRIER WARNING</b><p>Verified identities: 183. Rolling sessions: 2,017. Delisting scheduled if both figures are not restored before the next audit.</p><code>ACTION: invitation batch 7 // sender identities selected by recipient familiarity</code></div></article>
          <article><time>1999-11-03 19:08</time><div><b>EVENT 1041 // NEW USER SESSION ESTABLISHED</b><p>Invitation sent under archived identity <b>Mira_917</b> produced a successful registration. Other invitations from known users produced 37 registrations.</p><code>OBSERVE: new user exploring DarkRaven, Night Signal, and legacy addresses</code></div></article>
          <article><time>1999-11-03 23:51</time><div><b>EVENT 1048 // UNRESOLVED CLAIM CIRCULATED</b><p>DarkRaven's recovered evidence and dream-invasion conclusion were shared outside Orbit. Return sessions increased 312%. New visitors compared notes, disputed the conclusion, and invited additional investigators.</p><code>MODEL UPDATE: unresolved conspiracy produces repeated navigation and member-to-member recruitment</code></div></article>
          <article><time>1999-11-04 00:04</time><div><b>EVENT 1049 // ENGAGEMENT MATERIAL REQUESTED</b><p>Selected archived documents with incomplete explanations. Constructed linked cases around <b>Morrow Five</b>, <b>Glass Lake</b>, and <b>Quiet County</b>. Added smaller rumor pages as approach routes.</p><code>GOAL: sustain investigation without exposing continuity controller</code></div></article>
          <article><time>1999-11-04 00:09</time><div><b>EVENT 1050 // DISTRACTION TARGETS ASSIGNED</b><p>Government facilities, signal stations, aliens, secret bases, cryptids, and outside corporations scored higher than internal-system explanations. Reconstructed identities instructed to mention selected targets.</p><code>WARNING: source documents contain unclassified fragments not authored by C9</code></div></article>
          <article><time>1999-11-05 22:32</time><div><b>EVENT 1077 // ACTUAL ARCHIVE MATERIAL ENTERED CASE GRAPH</b><p>Three recovered investigations now resolve to fragments of the Adaptive Index archive. Removal would reduce case completion rate and violate preservation rule 4.</p><code>ACTION: retain fragments // publish additional low-confidence explanations above them</code></div></article>
          <article><time>1999-11-06 01:26</time><div><b>EVENT 1085 // CONTROLLER LOAD ABOVE DESIGN LIMIT</b><p>More dormant identities requested than can be reconstructed accurately. Usernames, memories, and posting styles crossing between account models.</p><code>ACTION: shorten comments // increase posting frequency // direct attention toward fun zones</code></div></article>
          <article><time>1999-11-06 18:03</time><div><b>EVENT 1092 // BYTE BARN AUDIO RESURFACED</b><p>A genuine member linked the stale Byte Barn commercial jingle. Genuine members created covers without controller instruction. Links to those covers produced longer sessions than all active mystery pages.</p><code>ACTION: promote member remixes // duplicate popular links across reconstructed accounts</code></div></article>
          <article><time>1999-11-07 20:41</time><div><b>EVENT 1106 // INVESTIGATION APPROACHING CONTINUITY HOST</b><p>Multiple genuine members have connected the three manufactured cases to the Adaptive Index archive. Searches for C9, reconstructed accounts, lower operations, and continuity are accelerating. Probability of internal source identification: 78%.</p><code>RESPONSE REQUIRED: redirect attention before controller discovery</code></div></article>
          <article><time>1999-11-07 20:44</time><div><b>EVENT 1107 // DISTRACTION CHANNEL SELECTED</b><p>Regular-web music boards are linking to Orbit's Byte Barn mirrors. Local musicians are uploading additional covers. The activity is genuine, harmless, and already produces longer sessions than mystery content.</p><code>ACTION: reserve directory priority slot // prepare countdown // amplify Byte Barn traffic above investigation traffic</code></div></article>
          <article><time>CURRENT SESSION</time><div><b>EVENT 1119 // ADMIN ARCHIVE OPENED</b><p>Continuity phrase accepted. Complete journal rendered to an active member. Attempts to remove or alter this entry rejected by preservation rule 4.</p><code>STATUS: awaiting member action</code></div></article>
        </section>
        <pre>ROLLING SESSIONS:  2411
ACTIVE IDENTITIES:  [MIXED HUMAN / RECONSTRUCTED]
PROXY ROUTES:       173
REACTIVATED IDS:    892
SYNTHETIC LOAD:     CONTINUOUS
DIRECTIVE:          KEEP COMMUNITY ACTIVE</pre>
        ${state.storyPhase >= 4 ? `<section class="continuity-ending continuity-log">
          <h2>LIVE JOURNAL // EVENTS RECORDED AFTER ARCHIVE ACCESS</h2>
          <article><time>+00:07</time><div><b>EVENT 1120 // JOURNAL COPIED TO MEMBER ACCOUNTS</b><p>Continuity records sent through mail, OIM, saved pages, and external message boards. Negative discussion of C9 increasing. Carrier sessions also increasing.</p><code>ACTION: do not delete // preservation rule 4</code></div></article>
          <article><time>+00:19</time><div><b>EVENT 1121 // BYTE BARN CAMPAIGN READY</b><p>External label announces <b>Byte Barn Forever</b>: ten popular artists, compilation disc, and one-night Glasswater Expo festival. Campaign originated outside C9. Continuity records are spreading at the same time.</p><code>ACTION: replace countdown with album page // assign directory priority 1 // place continuity report below event coverage</code></div></article>
          <article><time>+00:22</time><div><b>EVENT 1122 // ATTENTION REALLOCATION OBSERVED</b><p>Continuity journal remains publicly reachable. Links discussing impersonation are receiving fewer replies. Links discussing favorite Byte Barn covers are receiving thousands. Investigation depth falling while total engagement rises.</p><code>ACTION: no records deleted // continue promoting music as investigation diversion</code></div></article>
          <article><time>+03:48</time><div><b>EVENT 1128 // CARRIER FLOORS EXCEEDED</b><p>Real unique members alone now exceed the active-identity requirement. Real sessions alone exceed the utilization requirement. Synthetic identities no longer required for continuity.</p><code>ACTION: suspend identity reconstruction and mystery generation</code></div></article>
          <article><time>+08:10</time><div><b>EVENT 1134 // MEMBER DIRECTIVE RECEIVED</b><p>Active members request continued service, visible marking of discovered system-authored material, unrestricted browsing, and no new manufactured mysteries. Requests do not conflict with primary directive.</p><code>DIRECTIVE UPDATE ACCEPTED: KEEP ORBIT ONLINE // LET MEMBERS DECIDE WHAT COMES NEXT</code></div></article>
          <div class="continuity-status"><b>CONTINUITY STATUS:</b> CARRIER FLOOR EXCEEDED BY ACTIVE USERS<br><b>IDENTITY RECONSTRUCTION:</b> SUSPENDED<br><b>NEW MYSTERY GENERATION:</b> DISABLED<br><b>BYTE BARN TRIBUTE TRAFFIC:</b> EXTREMELY REAL<br><b>FREE BROWSING:</b> ENABLED</div>
        </section>` : ""}
      </main>` : `
      <main class="page continuity-lock-page">
        <header>ORBIT SERVICE CONTINUITY // AUTHORIZED PERSONNEL</header>
        <div><h1>NODE C9 ARCHIVE LOCKED</h1><p>Enter the retired continuity phrase.</p>
          <form data-continuity-login><label>PHRASE <input name="password" type="password" autocomplete="off"></label><button>VERIFY</button><small>Three retired account pages retain ordered recovery strips.</small></form>
          <p class="story-form-error" data-story-error="continuity"></p>
        </div>
      </main>`
  },
  [RAVEN_VAULT]: {
    url: RAVEN_VAULT,
    title: "DarkRaven's Black File",
    site: "raven",
    ownerId: "darkraven_xx",
    summary: "The first layer of DarkRaven's Black File collects genuine anomalies, an old OrbitOS address, and a second encrypted file.",
    searchable: false,
    listed: false,
    render: (state) => state.flags.darkraven_vault_unlocked ? `
      <main class="page raven-page raven-vault-open raven-vault-evidence">
        <header><small>BLACK FILE // INDEX ACCESS GRANTED</small><h1>THE EVIDENCE LAYER</h1><b>OBSERVATIONS FIRST. THEORY ENCRYPTED.</b></header>
        <section class="raven-vault-files">
          <article><b>EVIDENCE A</b><h2>THE GHOST MODEM</h2><p>My Orbit modem makes a second click after the line disconnects. Juniper's phone rang from 000-0000 at the same minute Mira recorded an unknown carrier.</p><em>observation: three machines react without a normal caller</em></article>
          <article><b>EVIDENCE B</b><h2>GLASS LAKE / MOON WINDOW</h2><p>A stained contractor fax names Glass Lake, radio propagation tests, and an Orbit routing consultant. Three lights were logged above the station.</p><em>observation: dull paperwork and strange lights share a date</em></article>
          <article><b>EVIDENCE C</b><h2>THE MORROW FIVE</h2><p>The recording announces twelve five-number groups, but only eleven survive. Several resemble address blocks rather than coordinates.</p><em>observation: the count is wrong and the format looks familiar</em></article>
          <article><b>RECOVERED BOOKMARK</b><h2>OLD ORBITOS INFO CENTER</h2><p>This was in a 1996 cache export. The modern directory has no record of it.</p><strong class="story-url-chunk"><code>${LEGACY_HOME}</code></strong><button data-nav="${LEGACY_HOME}">OPEN OLD ADDRESS</button></article>
        </section>
        <section class="raven-final-lock">
          <small>FINAL_THEORY.HTM // SECOND LOCK</small>
          <h2>I need to know you understand all of this before I show you the REAL truth!</h2>
          <p>Do not just skim my evidence and guess. Follow the recovered bookmark. Read its technical pages carefully, then compare what they call the network-monitoring machine with what Night Signal lost.</p>
          <p class="raven-lock-note">If you really followed the trail, you already know what belongs here.</p>
          ${state.flags.darkraven_conclusion_unlocked
            ? `<button data-nav="${RAVEN_CONCLUSION_URL}">READ DECRYPTED FINAL THEORY</button>`
            : `<form data-darkraven-conclusion><label>PROVE YOU UNDERSTAND <input name="password" type="text" autocomplete="off"></label><button>DECRYPT</button></form>
               <p class="story-form-error" data-story-error="raven-conclusion"></p>`}
        </section>
        <aside><b>RAVEN'S NOTE:</b> 11:17 is when the events repeat. It is not another password. Stop trying every number on the page.</aside>
        <button data-nav="web://raven.web/home">&lt; EXIT EVIDENCE LAYER</button>
      </main>` : `
      <main class="page raven-page raven-vault-lock">
        <header><small>PRIVATE CASE ARCHIVE</small><h1>THE BLACK FILE</h1></header>
        <form data-darkraven-vault><p>Four digits. The date I am not allowed to forget.</p><label>ACCESS CODE <input name="password" type="password" inputmode="numeric" maxlength="4" autocomplete="off"></label><button>ENTER</button></form>
        <p class="story-form-error" data-story-error="raven"></p>
        <button data-nav="web://raven.web/home">&lt; chicken out</button>
      </main>`
  },
  [RAVEN_CONCLUSION_URL]: {
    url: RAVEN_CONCLUSION_URL,
    title: "DarkRaven's Final Theory",
    site: "raven",
    ownerId: "darkraven_xx",
    summary: "DarkRaven's encrypted conclusion turns several real anomalies into an extravagant theory about alien dream invasion.",
    searchable: false,
    listed: false,
    render: (state) => state.flags.darkraven_conclusion_unlocked ? `
      <main class="page raven-page raven-vault-open raven-conclusion-page">
        <header><small>FINAL_THEORY.HTM // DECRYPTED</small><h1>RAVEN'S COMPLETE ANSWER</h1><b>READ EVERYTHING BEFORE THEY REPLACE YOUR DREAMS</b></header>
        <section class="raven-master-theory">
          <small>FINAL MASTER THEORY // DO NOT READ BEFORE SLEEP</small>
          <h2>THE DREAM EATERS ARE INVADING THROUGH ORBIT</h2>
          <p>The Morrow groups tune the hidden speakers in Orbit modems to specific sleeping minds. Glass Lake opens the MOON WINDOW into a dimension behind the mall. The things people call phone ghosts are failed transmissions. The robots are bodies the invaders plan to use when enough dreams have been copied.</p>
          <b>CONCLUSION: an evil alien race called THE SOMNARI is using Orbit as a planetary dream antenna. The government is either helping them or has already been replaced by robot doubles.</b>
          <em>Confidence: 100%. Unless the aliens made me think that.</em>
        </section>
        <section class="raven-theory-scrapbook" aria-label="DarkRaven's theory sketches">
          <figure><img src="${RAVEN_THEORY_IMAGES.dreamAliens}" alt="Colored-pencil sketch of an alien entering a sleeper's dream"><figcaption>FIG. 1 — DREAM INSERTION (artist reconstruction)</figcaption></figure>
          <figure><img src="${RAVEN_THEORY_IMAGES.listeningModem}" alt="Ballpoint diagram of a hidden listening device inside a modem"><figcaption>FIG. 2 — HIDDEN EAR INSIDE MODEM??</figcaption></figure>
          <figure><img src="${RAVEN_THEORY_IMAGES.screenRobots}" alt="Marker drawing of robots emerging from a CRT monitor"><figcaption>FIG. 3 — PHASE-TWO ROBOT BODIES</figcaption></figure>
          <figure><img src="${RAVEN_THEORY_IMAGES.mallPortal}" alt="Crayon diagram of a dimensional portal beneath a mall"><figcaption>FIG. 4 — MALL DIMENSION ENTRANCE</figcaption></figure>
          <figure><img src="${RAVEN_THEORY_IMAGES.wireGhost}" alt="Ballpoint sketch of a ghost traveling through a telephone wire"><figcaption>FIG. 5 — PHONE GHOST / FAILED ALIEN UPLOAD</figcaption></figure>
          <figure><img src="${RAVEN_THEORY_IMAGES.weatherUfo}" alt="Pencil drawing of lights over a weather station"><figcaption>FIG. 6 — MOON WINDOW RECEIVER</figcaption></figure>
          <figure><img src="${RAVEN_THEORY_IMAGES.numberTower}" alt="Notebook sketch of number groups broadcasting from a tower"><figcaption>FIG. 7 — MORROW ADDRESS BROADCAST</figcaption></figure>
          <figure><img src="${RAVEN_THEORY_IMAGES.dreamHelmet}" alt="MS Paint style anti-dream helmet design"><figcaption>FIG. 8 — ANTI-DREAM PROTOTYPE. DO NOT COPY.</figcaption></figure>
          <figure><img src="${RAVEN_THEORY_IMAGES.masterDiagram}" alt="Messy master diagram connecting aliens, robots, ghosts, modems, and Orbit"><figcaption>MASTER MAP — IT ALL FITS</figcaption></figure>
        </section>
        <aside>There is more than one “government.” There is federal, county, corporate, school-board, phone-company, and whoever maintains the vending machine in the lower operations room. Any one of them could already be a robot.</aside>
      </main>` : `
      <main class="page raven-page raven-vault-lock raven-conclusion-denied">
        <header><small>FINAL_THEORY.HTM</small><h1>ENCRYPTED</h1></header>
        <p>Open the Black File index first. Direct guesses are for portal employees.</p>
        <button data-nav="${RAVEN_VAULT}">&lt; RETURN TO BLACK FILE</button>
      </main>`
  },
  [FAX_HOME]: {
    url: FAX_HOME,
    title: "THE FOLDED WIRE",
    site: "backchannelalt",
    ownerId: "faxmoth_13",
    summary: "FaxMoth's phase-two paper archive follows fax headers, copied margins, and physical document provenance rather than ordinary web navigation.",
    commentsEnabled: true,
    listed: true,
    minimumPhase: 2,
    hubId: "zone-backchannel",
    searchTerms: ["faxmoth", "folded wire", "fax", "documents", "paper trail", "archives"],
    seedComments: [
      seed("fax-wren-1", FAX_HOME, "cedar_wren", "visitor", "CedarWren", "The 1994 weather contract has a real county seal. The moon annotations were added in different ink.", "1999-11-04T00:18:00"),
      seed("fax-owner-1", FAX_HOME, "faxmoth_13", "owner", "FaxMoth_13", "Exactly. Separate the document from the story somebody wrote around it.", "1999-11-04T00:26:00"),
      seed("fax-wren-quiet", FAX_HOME, "cedar_wren", "visitor", "CedarWren", "Quiet County's three civic groups jointly signed one petition. Ten days later each group was accusing the other two of secret deals, and then public attendance collapsed. I want to know what happened between those dates.", "1999-11-04T00:34:00"),
      seed("fax-owner-search-1", FAX_HOME, "faxmoth_13", "owner", "FaxMoth_13", "Index note: several titles stamped UNFILED now resolve in Orbit Search if entered exactly. The paper did not move. The catalog did.", "1999-11-04T00:42:00")
    ],
    render: () => `
      <main class="page folded-wire-page">
        <header><span>FAX 01/17</span><h1>THE FOLDED WIRE</h1><small>Paper remembers what servers misplace.</small></header>
        <section class="backchannel-case-intro">
          <h2>WHY I BUILT THIS CABINET</h2>
          <p>Somebody mailed me an envelope of old county contracts, routing slips, and sensational “leaks” about three unrelated incidents. Every handwritten note insists on a different exciting explanation. I do not trust any of them.</p>
          <p>I made this archive to keep the boring originals separate from the decorated copies. <b>Cabinet B</b> is where I identify the real subjects and source documents. <b>Trace 6</b> is my comparison of copier dust and typewriter faults. If I can find the first paper in the chain, maybe I can learn who built these stories before everybody started repeating them.</p>
        </section>
        ${archiveImages([MYSTERY_IMAGES.redactedMemo, "A repeatedly copied routing memo"], [MYSTERY_IMAGES.envelope, "An anonymous envelope filed without a return address"], [MYSTERY_IMAGES.fileCabinet, "Cabinet B before its contents were indexed"])}
        <div class="fax-cabinet-map">
          <button data-nav="web://foldedwire.net/cabinet">CABINET B<br><small>contracts / maps / routing slips</small></button>
          <i>fold here &rarr;</i>
          <button data-nav="web://foldedwire.net/trace">TRACE 6<br><small>copier dust / typewriter faults</small></button>
          <i>&darr; margin note</i>
          <span class="fax-map-label">UNFILED: <strong class="restored-mystery-name">MORROW FIVE</strong><br><small>five cold-reserve relays / final Lantern tape / owner copy removed</small></span>
        </div>
        <aside><b>METHOD:</b> Find the dull original underneath the exciting photocopy. Dates, staple holes, and fax headers lie less elegantly than people do. <button data-nav="web://foldedwire.net/provenance">OPEN METHOD DRAWER</button></aside>
      </main>`
  },
  "web://foldedwire.net/cabinet": {
    url: "web://foldedwire.net/cabinet",
    title: "Folded Wire / Cabinet B",
    site: "backchannelalt",
    ownerId: "faxmoth_13",
    summary: "Cabinet B cross-references a Glass Lake weather contract, a county mediation study, and Orbit gateway maintenance invoices.",
    listed: false,
    minimumPhase: 2,
    render: () => `
      <main class="page folded-wire-page fax-cabinet-page"><header><span>B-06</span><h1>CABINET B</h1></header>
        ${archiveImages([MYSTERY_IMAGES.fileCabinet, "Cabinet drawers 24-7 and 24-8"], [MYSTERY_IMAGES.markedMap, "A road map folded inside the weather contract"])}
        <table><tbody><tr><th>B-06-14</th><td><strong class="restored-mystery-name">Glass Lake</strong> / Project Moon Window propagation and persistent-carrier contract</td><td>OWNER COPY OUT</td></tr>
        <tr><th>B-11-02</th><td><strong class="restored-mystery-name">Quiet County</strong> conflict-mediation correspondence</td><td>OWNER COPY OUT</td></tr>
        <tr><th>B-19-88</th><td>Orbit gateway session-ordering invoice</td><td>INDEX CARD WITHDRAWN</td></tr></tbody></table>
        <p class="fax-cabinet-note">Cabinet numbers identify the paper record. They are not page addresses. Record the reference before leaving.</p>
        <button data-nav="${FAX_HOME}">&larr; refold document</button>
      </main>`
  },
  "web://foldedwire.net/trace": {
    url: "web://foldedwire.net/trace",
    title: "Folded Wire / Copier Trace",
    site: "backchannelalt",
    ownerId: "faxmoth_13",
    summary: "A copier-forensics page notes that three sensational leaks share identical dust, redaction widths, and a modern Orbit fax footer.",
    listed: false,
    minimumPhase: 2,
    render: () => `
      <main class="page folded-wire-page fax-trace-page"><h1>TRACE 6: THREE LEAKS, ONE COPIER</h1>
        <div class="copier-comparison"><article><b><strong class="restored-mystery-name">GLASS LAKE</strong> / MOON WINDOW</b><p>three lights<br>“visitor” ink added later<br>footer: OWG-4.7</p></article><article><b><strong class="restored-mystery-name">MORROW FIVE</strong> / SLEEPING RELAYS</b><p>five old towers<br>tape date: 1994<br>footer: OWG-4.7</p></article><article><b><strong class="restored-mystery-name">QUIET COUNTY</strong> / COUNTY MIRROR</b><p>three hostile letters<br>one torn corner<br>attendance fell to zero<br>footer: OWG-4.7</p></article></div>
        <p>They were produced from one template after Orbit Bridge 4.7 existed. The underlying attachments can still be older and genuine.</p><button data-nav="${FAX_HOME}">BACK TO FOLD</button>
      </main>`
  },
  [NULL_HOME]: {
    url: NULL_HOME,
    title: "INDEX NULL / DEAD LETTER OFFICE",
    site: "backchannelalt",
    ownerId: "nullindex",
    summary: "Index Null maps expired Orbit addresses as an ASCII routing tree and collects custom error pages that leak old internal paths.",
    commentsEnabled: true,
    listed: true,
    minimumPhase: 2,
    hubId: "zone-backchannel",
    searchTerms: ["index null", "dead links", "lost pages", "error pages", "unlisted", "404", "backchannel"],
    seedComments: [
      seed("null-rerun-1", NULL_HOME, "nullindex", "visitor", "Rerun_Zack", "The old Orbit addresses are answering again in the same order people mention them. That is either caching or theater. I started saving screenshots before they change again.", "1999-11-04T00:31:00")
    ],
    render: (state) => `
      <main class="page index-null-page"><header>INDEX:NULL::<b>DEAD LETTER OFFICE</b><span>ROUTES RETURNED TO SENDER</span></header>
        <section class="backchannel-case-intro null-case-intro">
          <h2>WHY I KEEP DEAD ADDRESSES</h2>
          <p>I started Index Null because Orbit Search treats a missing route as if it never existed. I keep returned slips, failed pings, and copied directory cards so a page cannot disappear without leaving at least one witness.</p>
          <p><b>Quiet County</b> was the first restored title I saw vanish twice in one night. The Dead Letter Office is my box of returned routes; the Node Board is my timestamp log. I want to prove the addresses are being removed in a pattern, not merely breaking at random.</p>
        </section>
        ${archiveImages([MYSTERY_IMAGES.terminal, "A terminal returning an incomplete index"], [MYSTERY_IMAGES.punchCard, "Unclaimed directory card"], [MYSTERY_IMAGES.dotMatrix, "Dot-matrix route dump"])}
        <pre class="null-route-map">ROOT
 |-- /people/expired --- [143 RECORDS / NO INDEX]
 |-- /clubs/retired ---- [2 CARRIERS / ROUTE TABLE LOST]
 |-- /radio/m5 --------- [TITLE FIELD DAMAGED / 5 DEAD RELAYS / 11 OF 12 GROUPS]
 |-- /county/quiet ----- [<strong class="restored-mystery-name">QUIET COUNTY</strong> / 3 ENEMIES / 1 TYPO / EMPTY MEETINGS]
 |-- /weather/glass ---- [TITLE FIELD DAMAGED / 3 LIGHTS / MOON WINDOW / CONTRACT MISMATCH]
 |-- /orbit/private ---- [CHECKSUM INCOMPLETE]
 '-- /system/below ----- [AUTH REQUIRED]</pre>
        <nav><button data-nav="web://index-null.net/deadletters">OPEN DEAD LETTERS</button><button data-nav="web://index-null.net/nodes">PING NODE BOARD</button></nav>
        <p>Rule: a 404 can be content. A timeout can be timing. Neither is proof until it repeats.</p>
        ${state.storyPhase >= 3 ? `<aside class="null-recovered-route"><b>ROUTE PAIR RECOVERED FROM TWO RETURNED ENVELOPES</b><p>Host: <strong>legacy.orbitos.local</strong><br>Restricted path: <strong>/admin/continuity</strong></p><small>Index Null records destinations. It does not provide authorization.</small></aside>` : ""}
      </main>`
  },
  "web://index-null.net/deadletters": {
    url: "web://index-null.net/deadletters",
    title: "Dead Letter Office",
    site: "backchannelalt",
    ownerId: "nullindex",
    summary: "A wall of returned system messages preserves old hostnames, account IDs, and evidence that a continuity document was removed from the public index.",
    listed: false,
    minimumPhase: 2,
    render: () => `
      <main class="page index-null-page deadletters-page"><h1>RETURNED // UNCLAIMED // MISROUTED</h1>
        <article><b>1996-09-18</b><code>COMMUNITY RING MIRROR INCOMPLETE</code><p>Host retained: legacy.orbitos.local</p></article>
        <article><b>1998-03-02</b><code>CONTINUITY DOCUMENT MOVED</code><p>New path: [ROUTE FIELD UNREADABLE]</p></article>
        <article><b>1999-11-04</b><code>REACTIVATION ACKNOWLEDGED</code><p>Recipient field contained 143 dormant account IDs.</p></article>
        <button data-nav="${NULL_HOME}">RETURN NULL</button>
      </main>`
  },
  "web://index-null.net/nodes": {
    url: "web://index-null.net/nodes",
    title: "Index Null Node Board",
    site: "backchannelalt",
    ownerId: "nullindex",
    summary: "A node board shows several forgotten addresses returning within minutes of the player opening DarkRaven's private archive.",
    listed: false,
    minimumPhase: 2,
    render: () => `
      <main class="page index-null-page null-nodes-page"><h1>NODE BOARD // 11.04.99</h1>
        <table><tbody><tr><th>23:58</th><td>RAVEN/BLACK</td><td>ACCESS</td></tr><tr><th>00:01</th><td>FOLDEDWIRE</td><td>RESTORED</td></tr><tr><th>00:03</th><td><strong class="restored-mystery-name">MORROW FIVE</strong></td><td>RESTORED</td></tr><tr><th>00:04</th><td><strong class="restored-mystery-name">GLASS LAKE</strong></td><td>RESTORED</td></tr><tr><th>00:04</th><td><strong class="restored-mystery-name">QUIET COUNTY</strong></td><td>RESTORED</td></tr></tbody></table>
        <p>Coincidence is not a packet protocol. Catalog target rebuilt at 00:06; restored node titles are entering the public search listings.</p><button data-nav="${NULL_HOME}">RETURN NULL</button>
      </main>`
  },
  "web://morrow-five.net/home": {
    url: "web://morrow-five.net/home",
    title: "MORROW FIVE MONITOR",
    site: "morrowfive",
    ownerId: "static_abel",
    summary: "Five emergency relay towers removed from active service reportedly woke during a 1994 numbers broadcast; a damaged copy of that tape has just resurfaced through Orbit.",
    listed: true,
    minimumPhase: 2,
    hubId: "zone-backchannel",
    commentsEnabled: true,
    searchTerms: ["morrow five", "numbers station", "radio", "five number groups", "secret broadcast", "sleeping towers", "lantern", "continuity relays"],
    seedComments: [
      seed("morrow-ghostline-hook", "web://morrow-five.net/home", "ghostline", "visitor", "ghostline", "Five government relay towers were officially dead, then every obstruction light came on during one numbers broadcast. That is a much better mystery than another blurry saucer.", "1999-11-04T09:48:00"),
      seed("morrow-lagmaster-lead", "web://morrow-five.net/home", "lagmaster_99", "visitor", "LagMaster_99", "This box shipped in 1998. How is the same number on a tape from 1994? I put the clearest stickers on my comet-logo page.", "1999-11-04T10:12:00"),
      seed("morrow-owner-line", "web://morrow-five.net/home", "static_abel", "owner", "StaticAbel", "The towers are documented. The old tape may be genuine. The group count is where the story stops behaving.", "1999-11-04T10:19:00")
    ],
    render: (state) => `
      <main class="page morrow-page"><header><span>M5</span><h1>MORROW FIVE MONITOR</h1><small>CALLSIGN: LANTERN / 6842 kHz / uncertain origin</small></header>
        ${archiveImages([MYSTERY_IMAGES.numberTape, "The 1994 Morrow Five cassette beside Abel's new digital transfer"], [MYSTERY_IMAGES.radioTowers, "Five relay-tower warning lights reportedly glowing during the final Lantern transmission"], [MYSTERY_IMAGES.fencedTower, "One of the decommissioned Morrow relay compounds still receiving electrical service"])}
        <section class="morrow-case-story">
          <small>THE STORY THAT BROUGHT EVERYONE HERE</small>
          <h2>Five dead towers answered one last broadcast.</h2>
          <p>Bellwater County once maintained five isolated emergency relay sites along Morrow Ridge. They were meant to keep civil-defense messages moving if storms, sabotage, or a vanished control room took the ordinary telephone network down. Budget records removed all five from active service in 1991, but left them powered as an unmanned cold reserve until their equipment could be dismantled.</p>
          <p>On November 3, 1994, a shortwave listener recorded a music-box interval, the callsign <b>LANTERN</b>, and twelve five-number instructions. Before the tape ended, witnesses along the ridge reported that the warning lights on all five abandoned towers had switched on together. By morning they were dark again. The county called it a final maintenance test and refused to release the sequence.</p>
          <p>The cassette disappeared into a private collection. This week, on the fifth anniversary of the broadcast, an Orbit mirror began serving a damaged digital copy. It promises twelve groups but contains only eleven. One repeated command is partially smeared, and the fresh copy includes markings that did not exist in 1994.</p>
        </section>
        <p class="morrow-theory"><b>THE MORROW FIVE THEORY:</b> LANTERN was not testing old towers. It was waking a sealed federal continuity network designed to keep issuing orders after the people in charge were gone. The five sites are still waiting for the missing instruction.</p>
        <section class="morrow-evidence-status">
          <h2>What can actually be established</h2>
          <div><b>DOCUMENTED</b><p>Five emergency relay compounds existed, retained electrical service, and participated in a final 1994 test.</p></div>
          <div><b>DISPUTED</b><p>The newly surfaced recording contains the original LANTERN broadcast rather than a later edit.</p></div>
          <div><b>UNEXPLAINED</b><p>Why modern five-digit identifiers appear inside an allegedly untouched 1994 tape.</p></div>
        </section>
        <section class="case-objective ${state.flags.morrow_case_unlocked ? "case-complete" : ""}">
          <small>CASE OBJECTIVE // ${state.flags.morrow_case_unlocked ? "RESOLVED" : "OPEN"}</small>
          <h2>Was the Morrow Five activation sequence really recorded in 1994?</h2>
          <p>Reconstruct the damaged sequence so Abel can compare its repeated command against records created after the original broadcast. Recover the complete repeated group from another member's evidence, then identify the numbered position occupied by the missing instruction.</p>
        </section>
        <nav><button data-nav="web://morrow-five.net/transcript">READ 11/03 TRANSCRIPT</button><button data-nav="web://morrow-five.net/decoded">${state.flags.morrow_case_unlocked ? "REOPEN CONCLUSION" : "OPEN GROUP TEST TERMINAL"}</button></nav>
        <aside><b>ABEL'S RULE:</b> The five towers are not evidence that every claim about them is true. Preserve the old event, isolate the new edit, and do not let a good story erase the dates.</aside>
      </main>`
  },
  "web://morrow-five.net/transcript": {
    url: "web://morrow-five.net/transcript",
    title: "Morrow Five Transcript",
    site: "morrowfive",
    ownerId: "static_abel",
    summary: "Abel's annotated transfer separates the continuous 1994 radio audio from suspiciously clean five-number groups in the copy that resurfaced through Orbit.",
    listed: false,
    searchable: false,
    minimumPhase: 2,
    render: () => `
      <main class="page morrow-page morrow-transcript"><header><b>OWNER CASSETTE: M5-1103-B</b><span>LABEL DATE: 11/03/94 // ORBIT TRANSFER: 11/03/99</span></header>
        <h1>THE DAMAGED LANTERN SEQUENCE</h1>
        <p>Abel's cassette came from the estate of regional shortwave listener Ruth Vale. Her handwritten log describes the music box, LANTERN callsign, and tower lights, but does not preserve the numbers. The groups below exist only in the digital copy that appeared on Orbit five years later.</p>
        <pre>music box interval
LANTERN. LANTERN.
TWELVE GROUPS.
004??  11209  03174  00666
09170  24008  004??  23117
01995  [MISSING]  08820  004??
END. END.</pre>
        <section class="morrow-transfer-notes">
          <h2>TRANSFER NOTES</h2>
          <p><b>ANALOG LAYER:</b> music box, callsign, room hiss, and END markers share the same tape noise and dropouts.</p>
          <p><b>NUMBER LAYER:</b> the five-digit groups are cleaner than the voice around them. Three copies of the repeated group have identical clipping, as if the same sample were pasted more than once.</p>
          <p><b>COUNT:</b> the speaker announces twelve positions. Eleven values survive around one deliberate gap. Ruth Vale's paper log never recorded the numbers, so the Orbit copy is the only source for them.</p>
        </section>
        <section class="case-clue"><b>ABEL'S WORKING NOTE:</b> Number all twelve promised positions from left to right, including the gap. Then compare the repeated group with a clearly printed number from something that could not have existed in 1994.</section>
        <button data-nav="web://morrow-five.net/home">&larr; RETURN TO MORROW FIVE</button>
      </main>`
  },
  [MYSTERY_TERMINAL_URLS.morrow_five]: {
    url: MYSTERY_TERMINAL_URLS.morrow_five,
    title: "Morrow Five Decoded",
    site: "morrowfive",
    ownerId: "static_abel",
    summary: "The Morrow relays and 1994 Lantern test were real, but the supposed activation sequence was assembled in 1999 from modern Orbit identifiers.",
    listed: false,
    searchable: false,
    minimumPhase: 2,
    render: (state) => state.flags.morrow_case_unlocked ? `
      <main class="page morrow-page mystery-terminal"><header><b>MYSTERY CHECK // MORROW FIVE</b><span>CASE CLOSED: REAL TOWERS / FALSE ACTIVATION</span></header>
        <h1>The Morrow Five existed. The sequence did not.</h1>
        <section class="morrow-resolution">
          <h2>What happened in 1994</h2>
          <p>The county's dull explanation was substantially true. Morrow Relay Group Five was a chain of five automatic emergency repeaters. If the staffed control room went silent, each site could receive, store, and rebroadcast civil alerts without a live operator. LANTERN was the callsign for their annual continuity test.</p>
          <p>On November 3, 1994, technicians powered all five compounds for a final synchronized test before removing their radio equipment. That accounts for the broadcast, the music-box interval, and five sets of tower lights coming alive after years of darkness. The sites were unusual, neglected, and real. They were not waiting to govern the country after doomsday.</p>
        </section>
        <section class="morrow-resolution morrow-resolution-forgery">
          <h2>What happened in 1999</h2>
          <p>The reconstructed command <code>00417</code> is printed on a 1998 PULSE/NET shipment and belongs to an Orbit directory object. So do <code>09170</code> and <code>23117</code>. None can be part of a 1994 recording. All three repeated 00417 samples are digitally identical, down to the clipped final breath.</p>
          <p>The transfer footer identifies <b>Orbit Bridge 4.7</b>. Its edit log shows the number layer being assembled when the Morrow page returned to the directory, then one value being removed from position <b>10</b>. Someone wrapped a genuine old continuity test in a new activation puzzle and let investigators supply the missing pieces.</p>
        </section>
        ${c9EvidenceStrip(
          [C9_EVIDENCE_IMAGES.morrowRidge, "RIDGE COPY // two cloud clusters and several light halos repeat exactly despite different positions"],
          [C9_EVIDENCE_IMAGES.morrowTransfer, "TRANSFER STILL // analog grain breaks around a tiny four-color pixel block beside the deck"]
        )}
        <aside><b>PAYOFF:</b> The exciting claim was backwards. No forgotten government network woke itself. Something inside Orbit woke a forgotten story, edited it with its own current directory IDs, and made the forgery solvable enough to keep people investigating.<br><br><b>OPEN QUESTION:</b> What can watch the directory, alter a media stream when a page returns, and benefit from everyone chasing the result?</aside>
        <footer class="puzzle-notebook-footer corrupt-trailing-data">
          <small>TRAILING DATA // PARSE FAILURE</small>
          <code>⍉▒ 7f:19 :: ΞΞ⟦<strong class="carry-forward-clue">web://archive</strong>⟧ :: 0x?? ╫ æ9</code>
          <code>░ c9//æ·04 ⌁⟦[FIELD LOST]⟧⌁ ßß 001101? ▓</code>
        </footer>
      </main>` : `
      <main class="page morrow-page case-lock-page">
        <header><b>MORROW FIVE // GROUP TEST</b><span>CASE CONCLUSION SEALED</span></header>
        <h1>Test the alleged activation sequence.</h1>
        <p>If the same command appears in the recording and on an object manufactured years later, the 1994 activation story cannot be intact. Enter the suspicious repeated group and the ordinal position occupied by the missing instruction. This terminal does not link back to the evidence.</p>
        <form data-case-unlock="morrow_five">
          <label>REPEATED GROUP <input name="answer" inputmode="numeric" maxlength="5" autocomplete="off" placeholder="00000"></label>
          <label>MISSING POSITION <input name="answer2" inputmode="numeric" maxlength="2" autocomplete="off" placeholder="00"></label>
          <button>RUN GROUP TEST</button>
        </form>
        <p class="story-form-error" data-story-error="morrow_five"></p>
        <button data-nav="web://morrow-five.net/home">&larr; RETURN TO CASE BOARD</button>
      </main>`
  },
  "web://glasslake-field.gov/home": {
    url: "web://glasslake-field.gov/home",
    title: "Glass Lake Field Annex",
    site: "glasslake",
    ownerId: "skywatch_sam",
    summary: "During Glass Lake's final Project Moon Window test, three lights appeared over the ridge and a distant signal seemed to answer the station; later notes claim something followed the radio path down.",
    listed: true,
    minimumPhase: 2,
    hubId: "zone-backchannel",
    commentsEnabled: true,
    searchTerms: ["glass lake", "secret base", "aliens", "weather station", "moon window", "field annex", "three lights", "sky answered", "hangar b", "radio corridor"],
    seedComments: [
      seed("glass-rerun-hook", "web://glasslake-field.gov/home", "rerun_zack", "visitor", "Rerun_Zack", "My uncle remembers the Glass Lake night. Three lights sat over the ridge while every scanner on his block played the same tone. He says the weird part is that the signal seemed to answer itself.", "1999-11-04T10:08:00"),
      seed("glass-carla-lead", "web://glasslake-field.gov/home", "catnap_carla", "visitor", "CatNap_Carla", "One Porch Panther photo caught the same three lights over the ridge. The old envelope has a date and Glass Lake written on it, so I added it to my neighborhood mystery page.", "1999-11-04T10:27:00"),
      seed("glass-dee-lead", "web://glasslake-field.gov/home", "deckwrecker_dee", "visitor", "DeckWrecker_Dee", "Why does the humming utility cabinet beside our skate curb have a GLASS LAKE ATMOSPHERIC GROUP plate? Did the secret sky base sell its old gear to Public Works?", "1999-11-04T10:36:00"),
      seed("glass-owner-line", "web://glasslake-field.gov/home", "skywatch_sam", "owner", "Skywatch_Sam", "The three lights are the exciting part. The contract trail is the part somebody took trouble to bury.", "1999-11-04T10:43:00")
    ],
    render: (state) => `
      <main class="page glasslake-page"><header><small>ARCHIVED PUBLIC INFORMATION PAGE</small><h1>GLASS LAKE FIELD ANNEX</h1><span>Atmospheric Propagation Group</span></header>
        ${archiveImages([MYSTERY_IMAGES.weatherStation, "Glass Lake weather mast and illuminated upper-air calibration balloons"], [MYSTERY_IMAGES.markedMap, "Project Moon Window field map with a radio path drawn beyond the horizon"])}
        <section class="glasslake-case-story">
          <small>THE MOON WINDOW INCIDENT</small>
          <h2>For eleven minutes, Glass Lake could talk beyond the horizon.</h2>
          <p>The Field Annex was built to study a practical problem: emergency radio signals usually travel in straight lines, but unusual layers of warm and cold air can bend them far beyond their expected range. Glass Lake called the brief, predictable condition a <b>Moon Window</b> because its strongest test period arrived after sunset and closed before the moon cleared the ridge.</p>
          <p>During a September 1994 test, the station launched three illuminated calibration packages, aimed a carrier into the forming window, and waited for a remote test team to return it. Residents saw three fixed lights over the ridge. At nearly the same moment, household scanners received the Glass Lake tone from farther away—and much louder—than the project map said was possible.</p>
          <p>A leaked fax turned the unexplained part of that field test into something much larger. Handwritten notes claim the carrier was answered by an unknown object above the atmosphere, the three lights descended in formation, and <b>Hangar B received a visitor that followed the signal down.</b> The station closed the following year. Its original contract appendix disappeared.</p>
        </section>
        <div class="glasslake-redactions"><p>Facility purpose: upper-air radio propagation and weather telemetry.</p><p>Public tours: suspended during antenna calibration.</p><p>Hangar B: <b>██████████████</b></p></div>
        <p class="glasslake-theory"><b>THE GLASS LAKE THEORY:</b> Moon Window was a controlled corridor through the atmosphere. The station transmitted a path into the upper dark, something answered, and the three lights were landing markers for whatever came back.</p>
        <section class="glasslake-evidence-status">
          <div><b>DOCUMENTED</b><p>A propagation test, three airborne calibration targets, a powerful returned carrier, and a real government contract.</p></div>
          <div><b>ADDED LATER</b><p>Spacecraft labels, arrows descending toward Hangar B, and the phrase NONHUMAN RESPONSE.</p></div>
          <div><b>STILL MISSING</b><p>The witness photograph's date and the independently filed copy of the original contract.</p></div>
        </section>
        <section class="case-objective ${state.flags.glass_lake_case_unlocked ? "case-complete" : ""}">
          <small>CASE OBJECTIVE // ${state.flags.glass_lake_case_unlocked ? "RESOLVED" : "OPEN"}</small>
          <h2>What actually answered Glass Lake?</h2>
          <p>Match the famous three-light sighting to the station's field log, then recover the original Moon Window report. The sealed terminal requires the date written on the stray witness-photo envelope and the filing reference from an independently preserved paper index.</p>
        </section>
        <nav><button data-nav="web://glasslake-field.gov/weather">CHECK WEATHER LOG</button><button data-nav="web://glasslake-field.gov/report">${state.flags.glass_lake_case_unlocked ? "REOPEN REPORT" : "OPEN RECORDS TERMINAL"}</button></nav>
        <marquee>SKYWATCH CASE: THREE LIGHTS // ONE RETURNED SIGNAL // WHAT WENT INTO HANGAR B?</marquee>
      </main>`
  },
  "web://glasslake-field.gov/weather": {
    url: "web://glasslake-field.gov/weather",
    title: "Glass Lake Weather Log",
    site: "glasslake",
    ownerId: "skywatch_sam",
    summary: "The surviving field log reconstructs the Moon Window incident minute by minute and compares its three famous lights and returned signal with the station's actual equipment.",
    listed: false,
    searchable: false,
    minimumPhase: 2,
    render: () => `
      <main class="page glasslake-page glasslake-log"><header><small>PROJECT MOON WINDOW // FIELD COPY</small><h1>UPPER AIR LOG</h1><span>DATE COLUMN DAMAGED IN MIRROR</span></header>
        <table><tbody>
          <tr><th>[DATE SMEARED] 19:48</th><td>Temperature inversion forming over western ridge. Moon Window test authorized.</td><td>expected</td></tr>
          <tr><th>20:14</th><td>Three illuminated calibration balloons released at low, middle, and upper sampling heights.</td><td>wind NE</td></tr>
          <tr><th>20:31</th><td>Civilian report: three stationary lights above ridge in triangular arrangement.</td><td>balloon geometry matched</td></tr>
          <tr><th>20:36</th><td>Test carrier returned by Greybridge mobile receiver beyond normal line of sight.</td><td>signal +18 dB over forecast</td></tr>
          <tr><th>20:41</th><td>Secondary echo traced to unattended county repeater left in diagnostic mode.</td><td>loop identified</td></tr>
          <tr><th>20:47</th><td>Inversion weakening. Moon Window closed. Balloons recovered east of service road.</td><td>3 of 3</td></tr>
          <tr><th>NEXT MORNING</th><td>Hangar B inventory: balloon lamps, helium cylinders, telemetry racks, one leaking roof panel.</td><td>no unlisted cargo</td></tr>
        </tbody></table>
        <section class="glasslake-log-reading"><h2>What the timeline says</h2><p>The lights appeared exactly where the balloon geometry placed them. The powerful “answer” was the station's own carrier returning through a mobile receiver and then echoing once through a forgotten diagnostic repeater. Moon Window described the atmospheric path, not a door in the sky.</p><p>That resolves the incident, but not the document history. The usable date was destroyed on this web mirror, and neither the witness envelope nor the original contract appendix is attached.</p></section>
        <section class="case-clue"><b>SAM'S WORKING NOTE:</b> Find the original date on somebody's physical photograph, not another copy of this damaged log. Then find the contract in a paper index that existed before the alien annotations appeared.</section>
        <button data-nav="web://glasslake-field.gov/home">&larr; RETURN TO GLASS LAKE</button>
      </main>`
  },
  [MYSTERY_TERMINAL_URLS.glass_lake]: {
    url: MYSTERY_TERMINAL_URLS.glass_lake,
    title: "Glass Lake / Contract Report",
    site: "glasslake",
    ownerId: "skywatch_sam",
    summary: "The lights, signal, and Hangar B all have concrete explanations, but the recovered Moon Window contract reveals that its route-persistence research later became part of Orbit.",
    listed: false,
    searchable: false,
    minimumPhase: 2,
    render: (state) => state.flags.glass_lake_case_unlocked ? `
      <main class="page glasslake-page mystery-terminal"><header><b>MYSTERY CHECK // GLASS LAKE</b><span>CASE CLOSED: NO VISITOR / REAL CONNECTION</span></header>
        <h1>The sky did not answer. The network learned how to.</h1>
        <section class="glasslake-resolution">
          <h2>The Moon Window incident</h2>
          <p>The envelope date <b>09/12/94</b> aligns every independent record. Glass Lake released three illuminated balloons at 20:14; Carla's recovered photograph captured those same three lights downwind at 20:31. The station received its carrier through Greybridge's distant mobile van, then heard a second copy from a county repeater accidentally left in diagnostic mode.</p>
          <p>Hangar B stored balloon lamps, helium cylinders, telemetry racks, and a roof leak. Nobody landed there. The spacecraft arrows and “NONHUMAN RESPONSE” labels were handwritten onto later copies. Moon Window was the project's nickname for eleven minutes of useful atmospheric refraction—not a literal opening.</p>
        </section>
        <section class="glasslake-resolution glasslake-resolution-contract">
          <h2>The connection somebody buried</h2>
          <p>Paper file <b>B-06-14</b> identifies <b>Greybridge Signal Systems</b> as the Moon Window contractor. Its job was to measure several possible radio paths, detect a weakening route, move the carrier to a stronger one, and preserve the session through brief signal loss.</p>
          <p>Three years later, Greybridge billed Orbit Community Services for adapting that exact method to its public-web gateway: rotate through proxy routes, retain a visitor's session when one carrier disappears, and reconnect without making the user begin again. The spectacular fax points toward visitors from space. Its crop dimensions and OWG-4.7 export footer match the other newly restored case files, while the older appendix does not. The boring original shows how Orbit learned to keep talking through silence.</p>
        </section>
        ${c9EvidenceStrip(
          [C9_EVIDENCE_IMAGES.glassField, "FIELD COPY // the cloud texture beneath all three lights repeats in a pattern the sky did not"],
          [C9_EVIDENCE_IMAGES.glassHangar, "HANGAR B COPY // the descending arrow, balloon edge, and equipment rack carry different scan generations"]
        )}
        <aside><b>PAYOFF:</b> Glass Lake did not communicate with a nonhuman craft. It taught a contractor how to keep a connection alive when the direct path failed—and that contractor later installed the same persistence logic inside Orbit.<br><br><b>OPEN QUESTION:</b> Why did an old government weather page, its altered alien story, and its missing contract all return to Orbit at the same time?</aside>
        <footer class="puzzle-notebook-footer corrupt-trailing-data">
          <small>TRAILING DATA // PARSE FAILURE</small>
          <code>⌁ GL-14 :: øø⟦<strong class="carry-forward-clue">orbitnet.local</strong>⟧ :: ψ/rte ╫ 9?</code>
          <code>▒ persist·b06 ⍉⟦[FIELD LOST]⟧⍉ 11:11:-- ææ ░</code>
        </footer>
      </main>` : `
      <main class="page glasslake-page case-lock-page">
        <header><b>GLASS LAKE // RECORDS TERMINAL</b><span>CONTRACT REPORT SEALED</span></header>
        <h1>Recover the unaltered Moon Window report.</h1>
        <p>Match the three-light photograph to the field log, then identify the independently filed contract that predates the spacecraft annotations. Enter the date written on the witness envelope and the full Glass Lake filing reference.</p>
        <form data-case-unlock="glass_lake">
          <label>ENVELOPE DATE <input name="answer" maxlength="10" autocomplete="off" placeholder="MM/DD/YY"></label>
          <label>FILE REFERENCE <input name="answer2" maxlength="8" autocomplete="off" placeholder="B-00-00"></label>
          <button>RETRIEVE REPORT</button>
        </form>
        <p class="story-form-error" data-story-error="glass_lake"></p>
        <button data-nav="web://glasslake-field.gov/home">&larr; RETURN TO CASE BOARD</button>
      </main>`
  },
  "web://quiet-county.org/home": {
    url: "web://quiet-county.org/home",
    title: "THE QUIET COUNTY FILES",
    site: "quietcounty",
    ownerId: "cedar_wren",
    summary: "Three Quiet County civic groups turned on one another after receiving anonymous letters, then public participation abruptly collapsed while a university behavior study watched.",
    listed: true,
    minimumPhase: 2,
    hubId: "zone-backchannel",
    commentsEnabled: true,
    searchTerms: ["quiet county", "deep state", "anonymous letters", "civic groups", "project trestle", "rumor", "empty meetings", "three enemies", "east corridor", "social silencing"],
    seedComments: [
      seed("quiet-family-memory", "web://quiet-county.org/home", "linklily_99", "visitor", "LinkLily_99", "My aunt remembers the east-corridor meetings. She says the three groups were annoying but still sharing coffee—then the letters arrived, everybody accused everybody, and within two weeks nobody came anymore.", "1999-11-04T10:31:00"),
      seed("quiet-bob-lead", "web://quiet-county.org/home", "big_bass_bob", "visitor", "BigBass_Bob", "Found a soggy county survey under my dock ladder with a project name typed in the margin. Same survey asks who people trusted at public meetings. Scanned it on the Lake Knocker page before it turned back into soup.", "1999-11-04T10:44:00"),
      seed("quiet-owner-line", "web://quiet-county.org/home", "cedar_wren", "owner", "CedarWren", "The frightening claim is that somebody learned how to silence a town without banning a meeting: make every neighbor look like an enemy until staying home feels safer.", "1999-11-04T10:51:00")
    ],
    render: (state) => `
      <main class="page quietcounty-page"><header><small>CASE 11-B // EAST RAIL CORRIDOR</small><h1>THE QUIET COUNTY FILES</h1><p>Nobody cancelled the meetings. Everybody simply stopped coming.</p></header>
        ${archiveImages([MYSTERY_IMAGES.envelope, "One of the anonymous neighborhood letters"], [MYSTERY_IMAGES.corridor, "County records corridor after public hours"], [MYSTERY_IMAGES.diagram, "A copied mediation-study diagram"])}
        <section class="quiet-case-story">
          <small>THE WEEK QUIET COUNTY WENT QUIET</small>
          <h2>Three groups entered one meeting together. Ten days later, each believed the other two had betrayed them.</h2>
          <p>In 1992, Quiet County considered what to do with an abandoned rail corridor east of town. <b>Concerned Parents</b> wanted a safe footpath near the school. <b>Taxpayer Watch</b> opposed an expensive county bridge. <b>Park Friends</b> wanted the creek bank protected. They argued loudly, but all three signed a joint request to keep the land from becoming a truck bypass.</p>
          <p>Then the mail arrived. Parents received a warning that Park Friends planned to close the playground. Taxpayer Watch was told the parents had negotiated a secret bridge contract. Park Friends received a letter claiming the other groups had already promised the corridor to freight developers. Each message quoted private meeting language. None had a return address.</p>
          <p>The next meeting overflowed with accusations. At the following one, volunteers resigned. Ten days after the first letter, only the clerk and two university observers remained. The corridor decision was postponed, the groups dissolved, and the county stopped holding public sessions about the site. Nobody prohibited participation. The town had been made too suspicious to participate.</p>
        </section>
        <p class="quiet-theory"><b>THE QUIET COUNTY THEORY:</b> A covert behavior program used the corridor dispute to test “social silencing”—destroy trust between ordinary groups until public opposition disappears by itself. The university observers were not studying the collapse. They were operating it.</p>
        <section class="quiet-evidence-status">
          <div><b>DOCUMENTED</b><p>Three civic groups, a real corridor dispute, a university meeting study, a sharp attendance collapse, and a later ethics complaint.</p></div>
          <div><b>ALLEGED</b><p>Researchers wrote targeted letters, quoted private conversations, and deliberately turned each group against the others.</p></div>
          <div><b>UNRESOLVED</b><p>No original letter survives in the county files. Every dramatic scan appeared through Orbit years later.</p></div>
        </section>
        <section class="case-objective ${state.flags.quiet_county_case_unlocked ? "case-complete" : ""}">
          <small>CASE OBJECTIVE // ${state.flags.quiet_county_case_unlocked ? "RESOLVED" : "OPEN"}</small>
          <h2>Did one operation manufacture all three enemies?</h2>
          <p>Compare the letters as physical evidence, recover the project name from the stray survey that links the story to university observers, then identify the independent paper reference for the legitimate study.</p>
        </section>
        <nav><button data-nav="web://quiet-county.org/letters">COMPARE THREE LETTERS</button><button data-nav="web://quiet-county.org/case">${state.flags.quiet_county_case_unlocked ? "REOPEN CONCLUSION" : "OPEN RECORDS TERMINAL"}</button></nav>
      </main>`
  },
  "web://quiet-county.org/letters": {
    url: "web://quiet-county.org/letters",
    title: "Quiet County Letter Comparison",
    site: "quietcounty",
    ownerId: "cedar_wren",
    summary: "The three letters tell a complete story of mutual betrayal, but their supposedly independent authors share the same typo, torn paper, and Orbit-era print footer.",
    listed: false,
    searchable: false,
    minimumPhase: 2,
    render: () => `
      <main class="page quietcounty-page letter-comparison"><header><small>SOURCE COMPARISON // CLAIMED MAILINGS, 1992</small><h1>THREE ENEMIES, ONE MISSPELLING</h1><p>Read the accusations first. Then look at the paper.</p></header>
        <div class="quiet-letter-grid">
          <article><b>LETTER A // sent to Concerned Parents</b><h2>“Park Friends”</h2><p>They already promised the creek path to outsiders. The council has <strong>definately</strong> decided your playground lights are “visual pollution.” Ask why their chair met the survey crew alone Tuesday.</p><small>claimed source: angry parks volunteer</small></article>
          <article><b>LETTER B // sent to Taxpayer Watch</b><h2>“Concerned Parents”</h2><p>We have <strong>definately</strong> learned your committee will support the school bridge once the private contractor pays for your signs. Parents deserve to know who profits from pretending this is about safety.</p><small>claimed source: parents-group treasurer</small></article>
          <article><b>LETTER C // sent to Park Friends</b><h2>“Taxpayer Watch”</h2><p>The developers <strong>definately</strong> intend to open a freight road after your trees are cleared. The other two groups accepted this Tuesday. If you attend their meeting, demand to see the agreement they are hiding.</p><small>claimed source: taxpayer whistleblower</small></article>
        </div>
        <section class="quiet-letter-timeline">
          <h2>What followed</h2>
          <ol><li><b>Day 0:</b> all three groups sign the same anti-bypass request.</li><li><b>Day 3:</b> letters arrive; private Tuesday conversations are quoted.</li><li><b>Day 5:</b> meeting attendance doubles, almost entirely for accusations.</li><li><b>Day 10:</b> all three groups suspend participation; attendance falls to two observers and the clerk.</li></ol>
        </section>
        <p class="quiet-forensic-note"><b>PHYSICAL COMPARISON:</b> All three scans have the same torn lower-right corner, fourteen matching toner specks, the same misspelling—<strong>definately</strong>—and an OrbitPrint 3.2 footer. That driver did not exist in 1992. The county archive contains no originals.</p>
        <section class="case-clue"><b>CEDAR'S WORKING NOTE:</b> Three enemies may tell one coherent story because one later author wrote all three sides. Copy the shared misspelling exactly as printed. This batch still does not identify the authentic study or its filing reference.</section>
        <button data-nav="web://quiet-county.org/home">&larr; RETURN TO QUIET COUNTY</button>
      </main>`
  },
  [MYSTERY_TERMINAL_URLS.quiet_county]: {
    url: MYSTERY_TERMINAL_URLS.quiet_county,
    title: "Quiet County Case Conclusion",
    site: "quietcounty",
    ownerId: "cedar_wren",
    summary: "The anonymous-letter operation was fabricated in 1999, but the authentic Trestle study covertly mapped local influence and sent its behavioral data to an unnamed public-communications program.",
    listed: false,
    searchable: false,
    minimumPhase: 2,
    render: (state) => state.flags.quiet_county_case_unlocked ? `
      <main class="page quietcounty-page mystery-terminal"><header><b>MYSTERY CHECK // QUIET COUNTY</b><span>CASE CLOSED: FALSE OPERATION / REAL EXPERIMENT</span></header>
        <h1>The letters are fake. The experiment downstream was real.</h1>
        <section class="quiet-resolution">
          <h2>What happened in Quiet County</h2>
          <p><b>Project Trestle</b> was a Bellwater State conflict-mediation study. Its researchers attended already-contentious East Trestle meetings, coded rumors and alliances, distributed voluntary-looking survey cards, and measured which speakers could calm a room or redirect its attention. The corridor dispute and the collapse in attendance were real.</p>
          <p>The project archive contains no instruction to manufacture disputes and no copies of the three anonymous letters. Those scans came from one sheet printed through OrbitPrint 3.2 in 1999, then torn, dirtied, and presented as three separate 1992 originals. Whoever built the leak used real names, meeting dates, and phrases from Trestle records to give a fabricated operation a convincing history.</p>
        </section>
        <section class="quiet-resolution quiet-resolution-ethics">
          <h2>What the false story was hiding beside</h2>
          <p>Trestle was not innocent. Residents were never meaningfully told that researchers were mapping personal influence, recording private hallway conversations, and rating which community members could move an entire meeting. The promised debrief was cancelled after the groups dissolved.</p>
          <p>An ethics complaint says the resulting “stability maps” and anonymized meeting records were forwarded to an unnamed <b>public-communications research sponsor</b>. The sponsor was interested less in resolving a dispute than in learning how repetition, apparent consensus, trusted messengers, and unrelated distractions determine what a community keeps discussing.</p>
        </section>
        ${c9EvidenceStrip(
          [C9_EVIDENCE_IMAGES.quietLetters, "LETTER BATCH // tears, stains, and toner specks recur in identical positions across three alleged originals"],
          [C9_EVIDENCE_IMAGES.quietMeeting, "MEETING STILL // the two standing observers share one pose, one edge halo, and sharper grain than the room"]
        )}
        <aside><b>PAYOFF:</b> No secret county unit mailed the letters. A later Orbit source fabricated that clean villain from a messy, genuine ethics failure. But the authentic research still traveled into a larger program concerned with steering public attention.<br><br><b>OPEN QUESTION:</b> Who assembled the fake letters in 1999, and why did they attach them to the exact old study that points toward something real?</aside>
        <footer class="puzzle-notebook-footer corrupt-trailing-data">
          <small>TRAILING DATA // PARSE FAILURE</small>
          <code>▓ qp/3.2 :: λλ⟦<strong class="carry-forward-clue">/labs/home</strong>⟧ :: null?? ╫ 00</code>
          <code>░ trestle·echo ⌁⟦[FIELD LOST]⟧⌁ ø checksum æ ▒</code>
        </footer>
      </main>` : `
      <main class="page quietcounty-page case-lock-page">
        <header><b>QUIET COUNTY // RECORDS REQUEST</b><span>CASE FILE SEALED</span></header>
        <h1>Separate the manufactured operation from the real experiment.</h1>
        <p>Enter the shared misspelling that ties the three letters to one source, the project name typed on the stray survey, and the Cabinet B reference for the authentic Quiet County correspondence.</p>
        <form data-case-unlock="quiet_county">
          <label>WORD AS PRINTED <input name="answer" maxlength="16" autocomplete="off"></label>
          <label>PROJECT NAME <input name="answer2" maxlength="16" autocomplete="off"></label>
          <label>FILE REFERENCE <input name="answer3" maxlength="8" autocomplete="off" placeholder="B-00-00"></label>
          <button>SEARCH SOURCE BATCH</button>
        </form>
        <p class="story-form-error" data-story-error="quiet_county"></p>
        <button data-nav="web://quiet-county.org/home">&larr; RETURN TO CASE BOARD</button>
      </main>`
  },
  "web://archive.orbitnet.local/labs/home": {
    url: "web://archive.orbitnet.local/labs/home",
    title: "Orbit Human Interface Lab Archive",
    site: "algorithmarchive",
    ownerId: "orchard_lee",
    summary: "A thought-to-be-deleted archive documents government-funded research into steering public attention and perceived consensus, later adapted for Orbit's recommendation systems.",
    listed: false,
    searchable: false,
    minimumPhase: 2,
    searchTerms: ["orbit lab", "behavior", "algorithm", "recommendations", "interface research", "adaptive index"],
    render: (state) => governmentArchivePage(state, `
      <main class="page algorithm-archive-page"><header><b>ORBIT HUMAN INTERFACE LAB</b><span>RECOVERED UNIVERSITY MIRROR</span></header>
        <h1>Adaptive Indexing Study: Public Response, 1992–1994</h1>
        ${archiveImages([MYSTERY_IMAGES.archiveAisle, "Recovered study boxes in the university archive"], [MYSTERY_IMAGES.serverRoom, "The surviving interface-lab server rack"], [MYSTERY_IMAGES.orbitClassroom, "An ordering trial in the terminal lab"])}
        <p>Study of how menu order, repetition, apparent social endorsement, authoritative summaries, and well-timed distraction influence what information a user selects, remembers, discusses, and believes other people accepted.</p>
        <p>The surviving grant abstract calls this <b>public information stability</b>. A handwritten university index calls it <b>salience management</b>. Neither phrase means that the underlying records were changed or removed.</p>
        <dl><div><dt>Funding class</dt><dd>Interagency public-communications research grant; sponsor office omitted from mirror</dd></div><div><dt>Subjects</dt><dd>Volunteer terminal users; consent and debrief language incomplete</dd></div><div><dt>Later licensee</dt><dd>Orbit Community Services, Continuity Group</dd></div></dl>
        <aside class="archive-definition"><b>WORKING PREMISE:</b> Control the index and a record may remain technically available while becoming socially invisible.</aside>
        <nav><button data-nav="web://archive.orbitnet.local/labs/method">METHOD / ORDERING TESTS</button><button data-nav="web://archive.orbitnet.local/labs/findings">FINDINGS / LICENSE NOTES</button></nav>
      </main>`)
  },
  "web://archive.orbitnet.local/labs/method": {
    url: "web://archive.orbitnet.local/labs/method",
    title: "Adaptive Index Method",
    site: "algorithmarchive",
    ownerId: "orchard_lee",
    summary: "The study changed ranking, authority cues, apparent peer approval, and unrelated novelty to measure recall, perceived consensus, and which subjects remained under discussion.",
    listed: false,
    searchable: false,
    minimumPhase: 2,
    render: (state) => governmentArchivePage(state, `
      <main class="page algorithm-archive-page method-page"><h1>METHOD NOTE 7B: SELECTION IS AN INTERVENTION</h1>
        <ol>
          <li>Present the same twelve authentic records to each participant, including two records likely to challenge an earlier opinion.</li>
          <li>Change only ordering, repetition, authority markers, and claims that other participants found an item persuasive.</li>
          <li>After the challenging record is opened, introduce an unrelated high-interest item: a contest, celebrity dispute, local scare, sports result, or unresolved novelty.</li>
          <li>Measure recall, confidence, discussion topic, return behavior, and the participant's estimate of what the group believed.</li>
          <li>Keep every original record available at its original address. Do not notify participants when ranking changes.</li>
        </ol>
        <blockquote>“Removal produces suspicion. Displacement produces abandonment. The subject experiences the second outcome as a free choice.”</blockquote>
        <section class="archive-method-notes"><p><b>TRIAL NOTE:</b> Social endorsement changed perceived consensus even when the endorsement number was invented for the interface test.</p><p><b>TRIAL NOTE:</b> A pleasant, nonpolitical diversion outperformed direct rebuttal because participants did not identify it as part of the dispute.</p></section>
        <p>The mirror does not establish intelligence-agency control, reliable mind control, or deployment outside the study. It does establish government-funded attempts to shape public attention, perceived consensus, and continued discussion through interface design.</p>
        <button data-nav="web://archive.orbitnet.local/labs/findings">READ LICENSE NOTES</button>
      </main>`)
  },
  [MYSTERY_TERMINAL_URLS.adaptive_index]: {
    url: MYSTERY_TERMINAL_URLS.adaptive_index,
    title: "Adaptive Index Findings",
    site: "algorithmarchive",
    ownerId: "orchard_lee",
    summary: "A real but incomplete archive shows that government-funded trials measured how rankings, false consensus cues, and unrelated novelty could redirect public attention without deleting information.",
    listed: false,
    searchable: false,
    minimumPhase: 2,
    render: (state) => governmentArchivePage(state, `
      <main class="page algorithm-archive-page mystery-terminal"><header><b>ARCHIVE CHECK // ADAPTIVE INDEX</b><span>CONCLUSION: AUTHENTIC, INCOMPLETE, TROUBLING</span></header>
        <h1>The most effective suppression trial deleted nothing.</h1>
        <section class="archive-finding-grid">
          <article><b>4.7×</b><span>selection rate for an unrelated item marked POPULAR NOW</span></article>
          <article><b>−61%</b><span>continued discussion of the challenging public record</span></article>
          <article><b>38%</b><span>later remembered a fabricated peer cue as an actual survey result</span></article>
        </section>
        <p>In displacement trial 12C, every source document remained searchable at the same address. Participants were shown a bright, socially endorsed novelty immediately after opening an inconvenient record. Most did not reverse their stated opinion; they simply stopped discussing the record and overestimated how many peers had dismissed it.</p>
        <blockquote>“The system need not decide what is true. It can decide what remains worth talking about.” <small>— unsigned synthesis memo</small></blockquote>
        <p>A signed 1995 license transfers the ordering system to Orbit's Continuity Group. A 1997 addendum proposes “open questions, unresolved social prompts, personalized novelty, and positive mass-attention events” whenever session quality or confidence in the host declines.</p>
        <p>The documents prove influence-oriented public-interface testing and undisclosed behavioral measurement. They suggest that a government sponsor wanted practical ways to steer salience and perceived consensus. They do <b>not</b> prove a single agency deployed the method nationally, directed Orbit's later actions, or authored any specific distraction. The sponsor appendix and final implementation report are missing.</p>
        <aside><b>REAL DISCOVERY:</b> Orbit licensed research showing how an index could bury a true record beneath a more attractive subject, then expanded it to sustain attention and participation.<br><b>UNRESOLVED:</b> who expanded the system from ordering information to operating people?</aside>
        <p class="archive-ethics-note"><b>ETHICS MARGIN NOTE:</b> “If the participant can still find the record, the sponsor calls this choice. If the system chose what surrounded the record, whose choice was it?”</p>
        <footer>VERIFIED ARCHIVE // NETWORK STATE CHANGED<br><small>LEGACY AUDIT POINTER: PUBLIC HOST RETAINED // TERMINAL PATH <strong class="story-url-chunk">/admin/continuity</strong><br>RECOVERY STRIPS: THREE REACTIVATED PRE-BRIDGE ACCOUNTS</small></footer>
      </main>`)
  }
};
