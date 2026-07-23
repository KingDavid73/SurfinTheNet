import type { GameState, PageDefinition } from "./types";

const fakeImage = (label: string, variant = "blue") =>
  `<div class="fake-image ${variant}" role="img" aria-label="Placeholder image: ${label}"><span>${label}</span></div>`;
const escapeHtml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
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

export const pages: Record<string, PageDefinition> = {
  "web://home": {
    url: "web://home",
    title: "OrbitNet Directory",
    site: "directory",
    ownerId: "orbit_guide",
    summary: "The official OrbitNet directory links members to featured personal pages and provides basic help for new users.",
    listed: true,
    hubId: "directory",
    searchTerms: ["directory", "featured sites", "help", "orbitnet"],
    render: (state) => `
      <main class="page directory-page">
        <header class="directory-logo"><span>ORBIT</span><b>NET</b></header>
        <p class="directory-tagline">Your friendly guide to the Information Superhighway!</p>
        <form class="search-box orbit-search-form"><input name="query" placeholder="Search pages, people, and phrases..." aria-label="Search OrbitNet"><button>Search</button></form>
        <section class="orbit-pal-promo">
          <div class="orbit-pal-mini"><i></i><b>?</b></div>
          <div><h2>New to the Net?</h2><p>Download <b>Orbit Pal</b>, your friendly desktop guide! Ask how to browse, search, download files, send messages, and get unstuck.</p></div>
          <button data-download-helper ${state.flags.orbit_pal_installed ? "disabled" : ""}>${state.flags.orbit_pal_installed ? "Orbit Pal Installed!" : "Download Orbit Pal FREE"}</button>
        </section>
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
  "web://bytebarn.com/home": {
    url: "web://bytebarn.com/home",
    title: "BYTE BARN Computer Superstore",
    site: "computer",
    ownerId: "chip_bytebarn",
    summary: "Byte Barn is a neighborhood computer shop selling desktop PCs, upgrades, modems, software, repairs, and beginner-friendly technical advice.",
    commentsEnabled: true,
    listed: true,
    hubId: "business",
    searchTerms: ["computers", "computer store", "pc", "hardware", "software", "repair", "modem", "internet"],
    render: () => `
      <main class="page computer-page">
        <header><span>BYTE</span><b>BARN</b><small>COMPUTER SUPERSTORE</small></header>
        <div class="computer-hero">${fakeImage("THIS WEEK'S DREAM MACHINE", "computer")}<div><h1>Pentium Power for the Whole Family!</h1><p>Locally owned PCs, upgrades, repairs, and patient answers since 1987.</p><button disabled>BUILD YOUR PC</button></div></div>
        <section class="computer-deals">
          <article><b>ORBIT 350</b><span>64MB RAM · 4.3GB drive</span><strong>$1,299</strong></article>
          <article><b>56K MODEM KIT</b><span>Includes 20 feet of phone cord!</span><strong>$79</strong></article>
          <article><b>HOUSE CALL</b><span>Chip fixes what the manual cannot.</span><strong>$45/hr</strong></article>
        </section>
        <p class="business-owner">Questions? Leave Chip a note below. He checks the site between repair jobs.</p>
        <footer>BYTE BARN · 1840 Market Plaza · Open Mon–Sat</footer>
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
    searchTerms: ["pizza", "food", "restaurant", "dinner", "lunch", "delivery", "takeout", "coupon", "pepperoni"],
    render: () => `
      <main class="page pizza-page">
        <header><span>COSMIC</span><b>CRUST</b><i>★</i></header>
        <div class="pizza-marquee">HOT · FRESH · DELIVERED TO EARTH AND SURROUNDING SUBURBS · CALL 555-PIES</div>
        <section class="pizza-splash">${fakeImage("SPINNING PIZZA.GIF", "pizza")}<div><h1>The Future of Dinner Is Round!</h1><p>Family recipes, arcade games, and cheese with appropriate gravitational pull.</p><button disabled>ORDER ONLINE (COMING SOON)</button></div></section>
        <section class="coupon"><b>PRINT THIS PAGE!</b><strong>$3 OFF</strong><span>any large two-topping pizza · Expires 12/31/99</span></section>
        <p class="business-owner">Tell Toni what topping deserves a permanent place on the menu.</p>
        <footer>Free delivery over $12 · Please allow 30–45 Earth minutes</footer>
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
    searchTerms: ["pet store", "pets", "animals", "cat", "dog", "fish", "bird", "pet food", "toys", "adoption"],
    render: () => `
      <main class="page pets-page">
        <header><span>PAWS</span><i>&</i><b>CLAWS</b><small>PET EMPORIUM</small></header>
        <div class="paw-trail">●　●　●　●　●</div>
        <section class="pet-welcome"><div>${fakeImage("SHOP CAT: PICKLES", "pets")}<small>Pickles, Assistant Manager</small></div><div><h1>Everything for Your Best Friend!</h1><p>Food, toys, tanks, tiny sweaters, and advice from people who genuinely want to see your pet photos.</p></div></section>
        <div class="pet-departments"><span>🐕 DOG AISLE</span><span>🐈 CAT CORNER</span><span>🐟 AQUARIUM</span><span>🐦 BIRD ROOM</span></div>
        <aside><b>Saturday Adoption Day</b><p>Meet local shelter animals from 10 AM–2 PM. Bring the whole family!</p></aside>
        <p class="business-owner">Bev reads every message. Pickles walks across the keyboard for about half of them.</p>
        <footer>22 Willow Lane · “If your pet can wear it, we probably sell it.”</footer>
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
          <nav><button data-nav="web://pulsenet.red/home">START</button><button data-nav="web://pulsenet.red/network">NETWORK</button><button disabled>GAMES</button><button disabled>DOWNLOADS</button></nav>
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
        <header class="pulse-header"><div class="pulse-logo"><span>PULSE</span><b>/NET</b></div><nav><button data-nav="web://pulsenet.red/home">START</button><button>NETWORK</button><button disabled>GAMES</button></nav></header>
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
        <div class="vanta-loader"><span>AXIOM CONSUMER SYSTEMS</span><i>INTRO COMPLETE</i><button disabled>SKIP INTRO</button></div>
        <header><div class="vanta-mark">VANTA<sup>2</sup></div><nav><button data-nav="web://vanta2.com/home">01 / ARRIVAL</button><button data-nav="web://vanta2.com/spec">02 / SYSTEM</button><button disabled>03 / TRANSMISSIONS</button></nav></header>
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
        <header><div class="vanta-mark">VANTA<sup>2</sup></div><nav><button data-nav="web://vanta2.com/home">01 / ARRIVAL</button><button>02 / SYSTEM</button></nav></header>
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
        <nav><button data-nav="web://cubit.fun/home">HOME</button><button data-nav="web://cubit.fun/games">GAMES!</button><button disabled>COLORS!</button><button disabled>CLUB CUBIT!</button></nav>
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
        <aside class="cubit-poll"><b>THIS WEEK'S POLL:</b> Which CUBIT color are you? <button disabled>INDIGO</button><button disabled>TANGERINE</button><button disabled>JET</button></aside>
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
        <nav><button data-nav="web://cubit.fun/home">HOME</button><button>GAMES!</button><button disabled>COLORS!</button><button disabled>CLUB CUBIT!</button></nav>
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
