import type { GameState, PageDefinition } from "./types";

const fakeImage = (label: string, variant = "blue") =>
  `<div class="fake-image ${variant}" role="img" aria-label="Placeholder image: ${label}"><span>${label}</span></div>`;
const escapeHtml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");

export const pages: Record<string, PageDefinition> = {
  "web://home": {
    url: "web://home",
    title: "OrbitNet Directory",
    site: "directory",
    ownerId: "orbit_guide",
    summary: "The official OrbitNet directory links members to featured personal pages and provides basic help for new users.",
    commentsEnabled: true,
    listed: true,
    hubId: "directory",
    searchTerms: ["directory", "featured sites", "help", "orbitnet"],
    render: (state) => `
      <main class="page directory-page">
        <header class="directory-logo"><span>ORBIT</span><b>NET</b></header>
        <p class="directory-tagline">Your friendly guide to the Information Superhighway!</p>
        <form class="search-box orbit-search-form"><input name="query" placeholder="Search pages, people, and phrases..." aria-label="Search OrbitNet"><button>Search</button></form>
        <section class="directory-grid">
          <button class="directory-card" data-nav="web://rainbow.gdn/home">
            ${fakeImage("RAINBOW GARDEN", "rainbow")}
            <strong>Rainbow Garden</strong><span>Art, pets, poetry & more!</span>
          </button>
          <button class="directory-card" data-nav="web://nightsignal.net/home">
            ${fakeImage("NIGHT SIGNAL", "night")}
            <strong>Night Signal Club</strong><span>Late-night radio mysteries.</span>
          </button>
          <button class="directory-card" data-nav="web://raven.web/home">
            ${fakeImage("DARKRAVEN'S VOID", "raven")}
            <strong>DarkRaven's Void</strong><span>Games, rumors, files and secrets.</span>
          </button>
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
    hubId: "personal-pages",
    searchTerms: ["juniper", "garden", "cat", "art", "modem"],
    render: () => `
      <main class="page rainbow-page">
        <div class="sparkles">★ . · ✿ · . ★ . · ✿ · . ★</div>
        <h1>Welcome to Rainbow Garden!</h1>
        <p class="marquee">~ a cozy patch of the web maintained by Juniper ~</p>
        ${fakeImage("PHOTO OF MY GARDEN.JPG", "rainbow")}
        <p>Hello web travelers! This is my little home for drawings, tiny poems, and pictures of my cat, <b>Modem</b>.</p>
        <div class="contact-strip rainbow-contact"><span>Want to say something privately?</span><button data-email-owner="juniper_gdn">✉ Email Juniper</button></div>
        <nav class="page-links">
          <button data-nav="web://rainbow.gdn/about">About Me & Modem</button>
          <button data-nav="web://rainbow.gdn/modem">Modem's Cat Corner</button>
          <button data-nav="web://rainbow.gdn/guestbook">Read My Guestbook</button>
          <button data-nav="web://nightsignal.net/home">Cool Link: Night Signal</button>
        </nav>
        <footer>Best viewed at 800×600 · Made with Notepad</footer>
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
        <h1>About the Webmaster</h1>
        <div class="profile-layout">
          ${fakeImage("JUNIPER + MODEM", "pink")}
          <div><p><b>Name:</b> Juniper</p><p><b>Likes:</b> gardening, scanner art, rainy radio</p><p><b>Dislikes:</b> broken links, olives</p></div>
        </div>
        <hr><p>I keep hearing a strange voice underneath 91.7 FM after midnight. My friend Mira says the Night Signal archive has recordings.</p>
        <button class="text-link" data-nav="web://rainbow.gdn/home">← Back to my garden</button>
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
        <h1>~ Modem's Cat Corner ~</h1>
        ${fakeImage("MODEM_LOOKING_SUSPICIOUS.GIF", "pink")}
        <p><b>Modem's schedule:</b> breakfast, window, nap, mysterious hallway sprint, dinner, keyboard.</p>
        <p>Last night he stared at the phone jack for twenty minutes before the modem rang. Cats know more than they admit!!!</p>
        <p class="tiny-old-link">old camera test: <button class="text-link" data-nav="web://rainbow.gdn/old/phonejack.html">phonejack_2.htm</button></p>
        <button class="text-link" data-nav="web://rainbow.gdn/home">← Return to Rainbow Garden</button>
      </main>`
  },
  "web://rainbow.gdn/old/phonejack.html": {
    url: "web://rainbow.gdn/old/phonejack.html",
    title: "Untitled Document",
    site: "rainbow",
    ownerId: "juniper_gdn",
    summary: "An unlisted old camera-test page shows Juniper's phone jack and notes a repeating incoming call with no caller.",
    listed: false,
    hubId: "personal-pages",
    searchTerms: ["phone jack", "camera test", "incoming call", "modem"],
    render: () => `
      <main class="page rainbow-page old-page">
        <h2>camera test please ignore</h2>
        ${fakeImage("PHONEJACK_2.JPG", "pink")}
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
    hubId: "after-dark",
    searchTerms: ["mira", "radio", "91.7", "night signal", "broadcast"],
    render: () => `
      <main class="page signal-page">
        <header><span>NIGHT</span> SIGNAL <small>91.7 FM</small></header>
        ${fakeImage("LIVE TRANSMISSION OFFLINE", "static")}
        <h2>For people who are still awake.</h2>
        <p>We collect unusual broadcasts, answering-machine fragments, and sounds that do not have obvious owners.</p>
        <div class="contact-strip signal-contact"><span>Mira is currently online.</span><button data-aim-owner="mira_917">◎ IM Mira_917</button></div>
        <div class="signal-nav">
          <button data-nav="web://nightsignal.net/archive">ENTER RECORDING ARCHIVE</button>
          <button data-nav="web://nightsignal.net/fieldlog">READ OPERATOR LOG</button>
          <button data-nav="web://rainbow.gdn/home">FRIEND SITE: RAINBOW GARDEN</button>
        </div>
        <p class="warning">NOTICE: The station is currently unattended. Do not adjust your receiver.</p>
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
          <h1>RECORDING ARCHIVE</h1>
          <p>Recovered directory listing · Last updated 11/03/1999</p>
          <table><thead><tr><th>FILE</th><th>DESCRIPTION</th><th>STATUS</th></tr></thead><tbody>
            <tr><td>rain_004.wav</td><td>Seven minutes of rainfall</td><td>corrupt</td></tr>
            <tr><td>caller_unknown.wav</td><td>Unidentified caller</td><td>missing</td></tr>
            <tr class="featured-file"><td>SIGNAL_NOTE.TXT</td><td>Operator's desk note</td><td><button data-download="signal-note" ${downloaded ? "disabled" : ""}>${downloaded ? "DOWNLOADED" : "DOWNLOAD"}</button></td></tr>
          </tbody></table>
          <p class="archive-hint">Downloaded files appear in <b>My Files</b> on the desktop.</p>
          <button class="text-link" data-nav="web://nightsignal.net/home">← Station front page</button>
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
        <h1>OPERATOR FIELD LOG</h1>
        <p><b>11/01 — 23:17</b><br>Carrier under normal programming. Three words. Too muddy to transcribe.</p>
        <p><b>11/02 — 23:17</b><br>Same signal, same time. Station clock lost four seconds immediately afterward.</p>
        <p><b>11/03 — pending</b><br>If it returns tonight, I am recording the full band.</p>
        <button class="text-link" data-nav="web://nightsignal.net/home">← Station front page</button>
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
    hubId: "after-dark",
    searchTerms: ["darkraven", "games", "rumors", "hidden pages", "void"],
    render: () => `
      <main class="page raven-page">
        <div class="raven-stars">+ . * . + . * . +</div>
        <h1>xX_DarkRaven_Xx's VOID</h1>
        <p class="raven-warning">YOU HAVE ENTERED A DOMAIN OF SECRETS</p>
        ${fakeImage("RAVEN_SIGIL.GIF", "raven")}
        <p>I investigate deleted game levels, forbidden cheat codes, and pages OrbitNet pretends do not exist.</p>
        <div class="contact-strip raven-contact"><span>AIM STATUS: ONLINE</span><button data-aim-owner="darkraven_xx">◎ MESSAGE xX_DarkRaven_Xx</button></div>
        <nav class="raven-nav"><button data-nav="web://raven.web/orbit">THE ORBIT HOLE</button><button data-nav="web://rainbow.gdn/guestbook">JUNIPER'S GUESTBOOK</button></nav>
        <footer>Optimized for darkness · No portal employees</footer>
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
        <h1>THE ORBIT HOLE</h1>
        <p>I saw an unlisted maintenance page flash behind the directory at exactly <b>11:17 PM</b>. The address ended in <code>/below</code>.</p>
        <p>Everyone says it was a cache error. Cache errors do not know your screen name.</p>
        <div class="raven-evidence">EVIDENCE_01.BMP<br><small>[ image removed by host ]</small></div>
        <button class="text-link" data-nav="web://raven.web/home">← Return to the Void</button>
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
