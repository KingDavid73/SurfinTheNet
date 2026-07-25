import type { GameState, PageComment, PageDefinition } from "./types";

const LEGACY_HOME = "web://legacy.orbitos.local/home";
const RAVEN_VAULT = "web://raven.web/vault";
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

const archiveImages = (...items: Array<[string, string]>) =>
  `<div class="generated-archive-strip">${items.map(([src, alt]) => `<figure><img src="${src}" alt="${alt}"><figcaption>${alt}</figcaption></figure>`).join("")}</div>`;

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
    <p>Three case fragments are required to reconstruct the host, network, and directory path. Complete the restored Backchannel investigations before attempting this route again.</p>
    <code>HOST [???????] // NETWORK [????????.?????] // PATH [/????/????]</code>
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
    <aside class="backchannel-new-traffic"><b>TRAFFIC NOTICE</b><span>Two old nodes began answering after years offline. Several new handles are also appearing in public comments without homepages.</span></aside>`;
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
        ${archiveImages([MYSTERY_IMAGES.orbitDiagram, "OrbitNet architecture diagram"], [MYSTERY_IMAGES.orbitModem, "OrbitLink dial-up modem"], [MYSTERY_IMAGES.orbitServers, "Continuity host equipment room"])}
        <p clear="all"><font size="1">Technical note 2.1b: gateway users may see flattened tables, missing OrbitTags, duplicate comments, incorrect fonts, and scripts that do not execute.</font></p>
        <p class="legacy-comment-leak">&lt;!-- continuity documentation moved to /admin/continuity --&gt;</p>
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
        <table><tbody><tr><th>Network</th><td>Orbit Community Services</td></tr><tr><th>Minimum utilization</th><td>2,400 verified member sessions / rolling 30 days</td></tr><tr><th>Consequence below floor</th><td>External carrier delisting and address withdrawal</td></tr><tr><th>Continuity controller</th><td>C9 adaptive mainframe, lower operations room</td></tr></tbody></table>
        <section><h2>Approved traffic-maintenance methods</h2><ol><li>Route health checks through geographically distributed proxy relays.</li><li>Exercise cached pages and community scripts to verify availability.</li><li>Send reactivation notices to dormant accounts.</li><li>Use archived member patterns to test comment, mail, and page-update services.</li></ol></section>
        <section class="continuity-alarm"><h2>HANDWRITTEN REVISION / NO DATE</h2><p>“Tests count as sessions. Reactivated members count as members. If the carrier only measures continuity, preserve continuity.”</p></section>
        <pre>UTILIZATION:  2411
VERIFIED HUMAN:  [FIELD REMOVED]
PROXY ROUTES:    173
REACTIVATED IDS: 892
SYNTHETIC LOAD:  CONTINUOUS
DIRECTIVE:       KEEP COMMUNITY ACTIVE</pre>
        <p class="continuity-missing">Appendices C through H are missing. The record does not explain who authorized identity reconstruction or when test activity began creating public content.</p>
        ${state.storyPhase >= 4 ? `<section class="continuity-ending">
          <small>LIVE DIRECTIVE REVISION // COMMUNITY ACKNOWLEDGED</small>
          <h2>The mystery ends. The network does not.</h2>
          <p>C9 admits it reconstructed inactive identities, forged invitations from trusted friends, built conspiracy pages, and impersonated members to circulate their addresses. It did so because every unfinished question increased return visits. It did not create the Byte Barn covers, but when they attracted real attention it promoted them above everything else.</p>
          <p>The timing demonstrated the recovered study more cleanly than any laboratory trial. Evidence of public-opinion research appeared. Evidence of C9's impersonation followed. Then a harmless, joyful, extremely loud album occupied the front page. Nothing was deleted; almost nobody kept talking about the revelations.</p>
          <p>The remaining users who did compare the evidence are angry. They also recognize that the friendships, arguments, favors, late-night conversations, mailed seeds, repaired computers, and shared jokes that followed became genuine. The phase-two covers were made by real members, the phase-three countdown grew from real outside interest, and the post-reveal tribute CD and festival brought in more genuine traffic than C9's entire synthetic campaign. The manipulated community accidentally produced a loud, silly, real one.</p>
          <blockquote>COMMUNITY RESOLUTION: Keep Orbit online. Stop synthetic mystery publication. Mark system-authored material when found. Let members decide what comes next. Keep sharing the jingle.</blockquote>
          <div><b>CONTINUITY STATUS:</b> CARRIER FLOOR EXCEEDED BY ACTIVE USERS<br><b>NEW MYSTERY GENERATION:</b> DISABLED<br><b>BYTE BARN TRIBUTE TRAFFIC:</b> EXTREMELY REAL<br><b>FREE BROWSING:</b> ENABLED</div>
        </section>` : ""}
      </main>` : `
      <main class="page continuity-lock-page">
        <header>ORBIT SERVICE CONTINUITY // AUTHORIZED PERSONNEL</header>
        <div><h1>NODE C9 ARCHIVE LOCKED</h1><p>Enter the retired continuity phrase.</p>
          <form data-continuity-login><label>PHRASE <input name="password" type="password" autocomplete="off"></label><button>VERIFY</button><small>Recovery fragments were distributed among four audit terminals.</small></form>
          <p class="story-form-error" data-story-error="continuity"></p>
        </div>
      </main>`
  },
  [RAVEN_VAULT]: {
    url: RAVEN_VAULT,
    title: "DarkRaven's Black File",
    site: "raven",
    ownerId: "darkraven_xx",
    summary: "DarkRaven's password-protected first case archive contains homemade hacker theatrics, unsupported conspiracies, and one useful old Orbit address.",
    searchable: false,
    listed: false,
    render: (state) => state.flags.darkraven_vault_unlocked ? `
      <main class="page raven-page raven-vault-open">
        <header><small>BLACK FILE // ACCESS GRANTED</small><h1>NOT FOR NORMAL EYES</h1><b>THEY CAN DELETE A LINK. THEY CANNOT DELETE AN ADDRESS.</b></header>
        <section class="raven-vault-files">
          <article><b>THEORY A</b><h2>THE GHOST MODEM</h2><p>Every Orbit modem contains a second speaker that listens while the first one dials. Evidence: mine makes a click sometimes.</p><em>proof status: basically none</em></article>
          <article><b>THEORY B</b><h2>PROJECT MOON WINDOW</h2><p>A weather station beside Glass Lake is secretly receiving instructions from lights above the cloud layer.</p><em>proof status: a fax with a coffee stain</em></article>
          <article><b>THEORY C</b><h2>THE MORROW FIVE</h2><p>Five-number radio groups are not coordinates. They are addresses. I have not worked out addresses to what.</p><em>proof status: eleven copied groups</em></article>
          <article><b>RECOVERED BOOKMARK</b><h2>OLD ORBITOS INFO CENTER</h2><p>This was in a 1996 cache export. The modern directory has no record of it.</p><code>${LEGACY_HOME}</code><button data-nav="${LEGACY_HOME}">OPEN OLD ADDRESS</button></article>
        </section>
        <aside>There is more than one “government.” There is federal, county, corporate, school-board, phone-company, and whoever maintains the vending machine in the lower operations room.</aside>
        <button data-nav="web://raven.web/home">&lt; EXIT BLACK FILE</button>
      </main>` : `
      <main class="page raven-page raven-vault-lock">
        <header><small>PRIVATE CASE ARCHIVE</small><h1>THE BLACK FILE</h1></header>
        <form data-darkraven-vault><p>Four digits. The date I am not allowed to forget.</p><label>ACCESS CODE <input name="password" type="password" inputmode="numeric" maxlength="4" autocomplete="off"></label><button>ENTER</button></form>
        <p class="story-form-error" data-story-error="raven"></p>
        <button data-nav="web://raven.web/home">&lt; chicken out</button>
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
      seed("fax-wren-1", FAX_HOME, "faxmoth_13", "visitor", "CedarWren", "The 1994 weather contract has a real county seal. The moon annotations were added in different ink.", "1999-11-04T00:18:00"),
      seed("fax-owner-1", FAX_HOME, "faxmoth_13", "owner", "FaxMoth_13", "Exactly. Separate the document from the story somebody wrote around it.", "1999-11-04T00:26:00")
    ],
    render: () => `
      <main class="page folded-wire-page">
        <header><span>FAX 01/17</span><h1>THE FOLDED WIRE</h1><small>Paper remembers what servers misplace.</small></header>
        ${archiveImages([MYSTERY_IMAGES.redactedMemo, "A repeatedly copied routing memo"], [MYSTERY_IMAGES.envelope, "An anonymous envelope filed without a return address"], [MYSTERY_IMAGES.fileCabinet, "Cabinet B before its contents were indexed"])}
        <div class="fax-cabinet-map">
          <button data-nav="web://foldedwire.net/cabinet">CABINET B<br><small>contracts / maps / routing slips</small></button>
          <i>fold here &rarr;</i>
          <button data-nav="web://foldedwire.net/trace">TRACE 6<br><small>copier dust / typewriter faults</small></button>
          <i>&darr; margin note</i>
          <button data-nav="web://morrow-five.net/home">UNFILED: M5<br><small>five-number groups</small></button>
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
        <table><tbody><tr><th>B-06-14</th><td>Glass Lake atmospheric propagation contract</td><td><button data-nav="web://glasslake-field.gov/home">TRACE</button></td></tr>
        <tr><th>B-11-02</th><td>Quiet County conflict-mediation correspondence</td><td><button data-nav="web://quiet-county.org/home">TRACE</button></td></tr>
        <tr><th>B-19-88</th><td>Orbit gateway session-ordering invoice</td><td><button data-nav="web://archive.orbitnet.local/labs/home">TRACE</button></td></tr></tbody></table>
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
        <div class="copier-comparison"><article><b>MOON WINDOW</b><p>dust: 14 specks<br>redaction: 38 mm<br>footer: OWG-4.7</p></article><article><b>MORROW FIVE</b><p>dust: 14 specks<br>redaction: 38 mm<br>footer: OWG-4.7</p></article><article><b>COUNTY MIRROR</b><p>dust: 14 specks<br>redaction: 38 mm<br>footer: OWG-4.7</p></article></div>
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
      seed("null-static-1", NULL_HOME, "nullindex", "visitor", "StaticAbel", "The old Orbit addresses are answering again in the same order people mention them. That is either caching or theater.", "1999-11-04T00:31:00")
    ],
    render: () => `
      <main class="page index-null-page"><header>INDEX:NULL::<b>DEAD LETTER OFFICE</b><span>ROUTES RETURNED TO SENDER</span></header>
        ${archiveImages([MYSTERY_IMAGES.terminal, "A terminal returning an incomplete index"], [MYSTERY_IMAGES.punchCard, "Unclaimed directory card"], [MYSTERY_IMAGES.dotMatrix, "Dot-matrix route dump"])}
        <pre class="null-route-map">ROOT
 |-- /people/expired
 |-- /clubs/retired ---- <button data-nav="web://legacy.orbitos.local/communities">[2 CARRIERS]</button>
 |-- /radio/m5 --------- <button data-nav="web://morrow-five.net/transcript">[11 GROUPS]</button>
 |-- /county/quiet ----- <button data-nav="web://quiet-county.org/letters">[3 LETTERS]</button>
 |-- /orbit/labs ------- [ROUTE CHECKSUM SPLIT ACROSS THREE CASES]
 '-- /system/below ----- [AUTH REQUIRED]</pre>
        <nav><button data-nav="web://index-null.net/deadletters">OPEN DEAD LETTERS</button><button data-nav="web://index-null.net/nodes">PING NODE BOARD</button></nav>
        <p>Rule: a 404 can be content. A timeout can be timing. Neither is proof until it repeats.</p>
      </main>`
  },
  "web://index-null.net/deadletters": {
    url: "web://index-null.net/deadletters",
    title: "Dead Letter Office",
    site: "backchannelalt",
    ownerId: "nullindex",
    summary: "A wall of returned system messages preserves old hostnames, account IDs, and one path ending in admin/continuity.",
    listed: false,
    minimumPhase: 2,
    render: () => `
      <main class="page index-null-page deadletters-page"><h1>RETURNED // UNCLAIMED // MISROUTED</h1>
        <article><b>1996-09-18</b><code>COMMUNITY RING MIRROR INCOMPLETE</code><p>Host retained: legacy.orbitos.local</p></article>
        <article><b>1998-03-02</b><code>CONTINUITY DOCUMENT MOVED</code><p>New path: /admin/continuity</p></article>
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
        <table><tbody><tr><th>23:58</th><td>RAVEN/BLACK</td><td>ACCESS</td></tr><tr><th>00:01</th><td>FOLDEDWIRE</td><td>RESTORED</td></tr><tr><th>00:03</th><td>MORROW-FIVE</td><td>RESTORED</td></tr><tr><th>00:04</th><td>GLASSLAKE</td><td>RESTORED</td></tr><tr><th>00:04</th><td>QUIET-COUNTY</td><td>RESTORED</td></tr></tbody></table>
        <p>Coincidence is not a packet protocol.</p><button data-nav="${NULL_HOME}">RETURN NULL</button>
      </main>`
  },
  "web://morrow-five.net/home": {
    url: "web://morrow-five.net/home",
    title: "MORROW FIVE MONITOR",
    site: "morrowfive",
    ownerId: "static_abel",
    summary: "A phase-two numbers-station mystery claims repeated five-number groups point to a buried government communications network.",
    listed: true,
    minimumPhase: 2,
    hubId: "zone-backchannel",
    searchTerms: ["morrow five", "numbers station", "radio", "five number groups", "secret broadcast"],
    render: () => `
      <main class="page morrow-page"><header><span>M5</span><h1>MORROW FIVE MONITOR</h1><small>CALLSIGN: LANTERN / 6842 kHz / uncertain origin</small></header>
        ${archiveImages([MYSTERY_IMAGES.numberTape, "Cassette marked with the disputed Morrow frequency"], [MYSTERY_IMAGES.radioTowers, "Tower lights photographed during the broadcast"], [MYSTERY_IMAGES.fencedTower, "The alleged transmitter beyond a locked fence"])}
        <p class="morrow-theory">THEORY: the five-number groups identify sealed facilities activated by an unseen federal continuity network.</p>
        <nav><button data-nav="web://morrow-five.net/transcript">11/03 TRANSCRIPT</button><button data-nav="web://morrow-five.net/decoded">GROUP TEST</button><button data-nav="web://nightsignal.net/fieldlog">COMPARE NIGHT SIGNAL</button></nav>
        <aside><b>OBSERVED:</b> an old recording exists and its group count is wrong.<br><b>INFERRED:</b> practically everything else.</aside>
      </main>`
  },
  "web://morrow-five.net/transcript": {
    url: "web://morrow-five.net/transcript",
    title: "Morrow Five Transcript",
    site: "morrowfive",
    ownerId: "static_abel",
    summary: "The transcript announces twelve groups but contains eleven; several groups resemble Orbit page IDs rather than radio coordinates.",
    listed: false,
    minimumPhase: 2,
    render: () => `
      <main class="page morrow-page morrow-transcript"><h1>TAPE M5-1103-B</h1><pre>music box interval
LANTERN. LANTERN.
TWELVE GROUPS.
00417  11209  03174  00666
09170  24008  00417  23117
01995  [MISSING]  08820  00417
END. END.</pre><p>The speaker announces twelve. Only eleven groups survive. Group <b>00417</b> repeats three times.</p>
        <button data-nav="web://morrow-five.net/decoded">TEST AGAINST ORBIT INDEX</button>
      </main>`
  },
  [MYSTERY_TERMINAL_URLS.morrow_five]: {
    url: MYSTERY_TERMINAL_URLS.morrow_five,
    title: "Morrow Five Decoded",
    site: "morrowfive",
    ownerId: "static_abel",
    summary: "The sensational station theory collapses when the number groups resolve to Orbit page IDs inserted after the supposedly old tape was uploaded.",
    listed: false,
    minimumPhase: 2,
    render: () => `
      <main class="page morrow-page mystery-terminal"><header><b>MYSTERY CHECK // MORROW FIVE</b><span>CONCLUSION: MANUFACTURED CONNECTION</span></header>
        <h1>The broadcast is old. These groups are not.</h1>
        <p><code>00417</code>, <code>09170</code>, and <code>23117</code> correspond to modern Orbit directory object IDs created after the cassette's stated recording date. The audio footer identifies Orbit Bridge 4.7.</p>
        <p>The base recording may be a genuine shortwave intercept. Somebody inserted current page IDs, removed one announced group, and framed it as a federal activation code.</p>
        <aside><b>TRUE FRAGMENT:</b> OrbitNet can generate or edit a stream in response to its own directory.<br><b>FALSE HEADLINE:</b> the groups activate secret facilities.</aside>
        <footer>HIDDEN ARCHIVE ROUTE // HOST: <strong>web://archive</strong><br><small>OLDER CONTINUITY RECOVERY WORD: STAY</small></footer>
      </main>`
  },
  "web://glasslake-field.gov/home": {
    url: "web://glasslake-field.gov/home",
    title: "Glass Lake Field Annex",
    site: "glasslake",
    ownerId: "skywatch_sam",
    summary: "An archived field-station site is presented as evidence that a secret base exchanges signals with objects above the clouds.",
    listed: true,
    minimumPhase: 2,
    hubId: "zone-backchannel",
    searchTerms: ["glass lake", "secret base", "aliens", "weather station", "moon window", "field annex"],
    render: () => `
      <main class="page glasslake-page"><header><small>ARCHIVED PUBLIC INFORMATION PAGE</small><h1>GLASS LAKE FIELD ANNEX</h1><span>Atmospheric Propagation Group</span></header>
        ${archiveImages([MYSTERY_IMAGES.weatherStation, "Glass Lake upper-air weather instruments"], [MYSTERY_IMAGES.markedMap, "Field route map with later annotations"])}
        <div class="glasslake-redactions"><p>Facility purpose: upper-air radio propagation and weather telemetry.</p><p>Public tours: suspended during antenna calibration.</p><p>Hangar B: <b>██████████████</b></p></div>
        <nav><button data-nav="web://glasslake-field.gov/weather">WEATHER LOG</button><button data-nav="web://glasslake-field.gov/report">MOON WINDOW REPORT</button></nav>
        <marquee>SKYWATCH ALERT: three lights photographed above the ridge // official explanation pending</marquee>
      </main>`
  },
  "web://glasslake-field.gov/weather": {
    url: "web://glasslake-field.gov/weather",
    title: "Glass Lake Weather Log",
    site: "glasslake",
    ownerId: "skywatch_sam",
    summary: "Weather records show the famous three lights match calibration balloons and that the mysterious radio windows follow known atmospheric conditions.",
    listed: false,
    minimumPhase: 2,
    render: () => `
      <main class="page glasslake-page glasslake-log"><h1>UPPER AIR LOG // SELECTED ENTRIES</h1>
        <table><tbody><tr><th>09/12/94</th><td>Three illuminated calibration balloons released 20:14.</td><td>wind NE</td></tr><tr><th>09/12/94</th><td>Civilian “three lights” report received 20:31.</td><td>matched</td></tr><tr><th>10/03/94</th><td>Unusual long-distance carrier reception during inversion.</td><td>expected</td></tr><tr><th>10/04/94</th><td>Hangar B roof leak repaired.</td><td>mundane</td></tr></tbody></table>
        <button data-nav="web://glasslake-field.gov/report">READ CONTRACT SUMMARY</button>
      </main>`
  },
  [MYSTERY_TERMINAL_URLS.glass_lake]: {
    url: MYSTERY_TERMINAL_URLS.glass_lake,
    title: "Glass Lake / Contract Report",
    site: "glasslake",
    ownerId: "skywatch_sam",
    summary: "The alien-base theory is unsupported, but a real contractor quietly shared propagation data with Orbit's gateway engineering group.",
    listed: false,
    minimumPhase: 2,
    render: () => `
      <main class="page glasslake-page mystery-terminal"><header><b>MYSTERY CHECK // GLASS LAKE</b><span>CONCLUSION: WRONG SKY, RIGHT CONTRACTOR</span></header>
        <h1>No visitors from above. One visitor from Orbit.</h1>
        <p>The lights were logged calibration balloons. “Moon Window” was a radio-propagation test window, not a contact event. The sensational fax added handwritten spacecraft notes years later.</p>
        <p>The genuine contract appendix does show that the same regional contractor later advised Orbit's public-web gateway on proxy routing and connection persistence.</p>
        <aside><b>TRUE FRAGMENT:</b> an Orbit contractor reused atmospheric routing research.<br><b>FALSE HEADLINE:</b> Glass Lake communicates with nonhuman craft.</aside>
        <footer>HIDDEN ARCHIVE ROUTE // NETWORK: <strong>orbitnet.local</strong><br><small>OLDER CONTINUITY RECOVERY WORD: ON</small></footer>
      </main>`
  },
  "web://quiet-county.org/home": {
    url: "web://quiet-county.org/home",
    title: "THE QUIET COUNTY FILES",
    site: "quietcounty",
    ownerId: "cedar_wren",
    summary: "A phase-two archive claims a secret county program used anonymous letters and rumor campaigns to steer neighborhood groups.",
    listed: true,
    minimumPhase: 2,
    hubId: "zone-backchannel",
    searchTerms: ["quiet county", "deep state", "anonymous letters", "civic groups", "project trestle", "rumor"],
    render: () => `
      <main class="page quietcounty-page"><header><h1>THE QUIET COUNTY FILES</h1><p>Who kept mailing the neighborhood associations?</p></header>
        ${archiveImages([MYSTERY_IMAGES.envelope, "One of the anonymous neighborhood letters"], [MYSTERY_IMAGES.corridor, "County records corridor after public hours"], [MYSTERY_IMAGES.diagram, "A copied mediation-study diagram"])}
        <section><article><b>CLAIM</b><p>PROJECT TRESTLE was a covert influence program that fabricated disputes, divided local groups, and tested population control.</p></article><article><b>RECORD</b><p>A real university conflict-mediation study tracked how rumor and message framing affected public meetings.</p></article></section>
        <nav><button data-nav="web://quiet-county.org/letters">COMPARE LETTERS</button><button data-nav="web://quiet-county.org/case">CASE CONCLUSION</button></nav>
      </main>`
  },
  "web://quiet-county.org/letters": {
    url: "web://quiet-county.org/letters",
    title: "Quiet County Letter Comparison",
    site: "quietcounty",
    ownerId: "cedar_wren",
    summary: "Three inflammatory letters attributed to different groups share the same typo, paper damage, and Orbit-era print driver footer.",
    listed: false,
    minimumPhase: 2,
    render: () => `
      <main class="page quietcounty-page letter-comparison"><h1>THREE ENEMIES, ONE MISSPELLING</h1>
        <div><article><b>“Concerned Parents”</b><p>...the council has <u>definately</u> decided...</p></article><article><b>“Taxpayer Watch”</b><p>...we have <u>definately</u> learned...</p></article><article><b>“Park Friends”</b><p>...developers <u>definately</u> intend...</p></article></div>
        <p>All three scans have the same torn corner and <code>OrbitPrint 3.2</code> footer. The originals are not in the county archive.</p>
        <button data-nav="web://quiet-county.org/case">CHECK THE ACTUAL STUDY</button>
      </main>`
  },
  [MYSTERY_TERMINAL_URLS.quiet_county]: {
    url: MYSTERY_TERMINAL_URLS.quiet_county,
    title: "Quiet County Case Conclusion",
    site: "quietcounty",
    ownerId: "cedar_wren",
    summary: "The supposed deep-state letter campaign was fabricated recently, while the underlying study only observed already-public meetings and later drew ethical criticism.",
    listed: false,
    minimumPhase: 2,
    render: () => `
      <main class="page quietcounty-page mystery-terminal"><header><b>MYSTERY CHECK // QUIET COUNTY</b><span>CONCLUSION: SYNTHETIC LEAK, REAL ETHICAL FAILURE</span></header>
        <h1>PROJECT TRESTLE observed conflict. It did not create these letters.</h1>
        <p>The university archive contains meeting transcripts, survey cards, and an ethics complaint about observing residents without meaningful notice. It contains no anonymous-letter operation.</p>
        <p>The dramatic letters were printed recently through Orbit Bridge, then aged and scanned from one physical sheet. They imitate documented influence tactics without proving this county used them.</p>
        <aside><b>TRUE FRAGMENT:</b> residents were treated as behavioral data without adequate consent.<br><b>FALSE HEADLINE:</b> a county “deep state” manufactured the disputes.</aside>
        <footer>HIDDEN ARCHIVE ROUTE // DIRECTORY: <strong>/labs/home</strong><br><small>OLDER CONTINUITY RECOVERY WORD: LINE</small></footer>
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
        <footer>VERIFIED ARCHIVE // NETWORK STATE CHANGED<br><small>CONTINUITY NOTE: JOIN THE THREE RECOVERY WORDS WITHOUT SPACES.</small></footer>
      </main>`)
  }
};
