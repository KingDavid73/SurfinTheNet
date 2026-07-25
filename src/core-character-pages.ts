import type { PageDefinition } from "./types";

const CORE_ART = {
  "mira-desk": new URL("../assets/images/core-characters/mira-desk.png", import.meta.url).href,
  "mira-tapes": new URL("../assets/images/core-characters/mira-tapes.png", import.meta.url).href,
  "juniper-flowers": new URL("../assets/images/core-characters/juniper-flowers.png", import.meta.url).href,
  "juniper-modem": new URL("../assets/images/core-characters/juniper-modem.png", import.meta.url).href,
  "raven-room": new URL("../assets/images/core-characters/raven-room.png", import.meta.url).href,
  "raven-notebook": new URL("../assets/images/core-characters/raven-notebook.png", import.meta.url).href,
  "lag-ranking": new URL("../assets/images/core-characters/lag-ranking.png", import.meta.url).href,
  "lag-bedroom": new URL("../assets/images/core-characters/lag-bedroom.png", import.meta.url).href,
  "fax-envelope": new URL("../assets/images/core-characters/fax-envelope.png", import.meta.url).href
} as const;

const art = (name: keyof typeof CORE_ART, alt: string) => `<img src="${CORE_ART[name]}" alt="${alt}">`;

export const coreCharacterPages: Record<string, PageDefinition> = {
  "web://nightsignal.net/desk": {
    url: "web://nightsignal.net/desk",
    title: "Night Signal / Mira's Desk",
    site: "signal",
    ownerId: "mira_917",
    summary: "Mira's personal radio desk page has tape labels, college-radio notes, a shift schedule, and small glimpses of her ordinary life beyond the mystery.",
    listed: false,
    render: () => `
      <main class="page signal-page core-mira-page">
        <header class="signal-subhead"><span>DESK TWO</span><small>MIRA'S HALF OF THE STUDIO</small></header>
        <section class="core-photo-pair">${art("mira-desk", "A cluttered late-night college radio desk")}${art("mira-tapes", "Hand-labeled cassette tapes beside a radio log")}</section>
        <div class="mira-desk-notes">
          <article><h2>ON THE CONSOLE</h2><p>Two ginger candies, one astronomy textbook I am pretending to read, Juniper's rain mix, and a mug the station manager wants back.</p></article>
          <article><h2>GOOD TRANSMISSIONS</h2><p>Callers dedicating songs to people they are afraid to call directly. Baseball games from three states away. Somebody practicing trumpet very badly.</p></article>
          <article><h2>BAD TRANSMISSIONS</h2><p>Chain-store ads at twice the volume. People who whisper coordinates. The emergency-tone test at 2 AM.</p></article>
        </div>
        <details class="core-character-interaction"><summary>Open Mira's cassette case</summary><p><b>SIDE A:</b> rainy drive / Juniper's greenhouse / that one excellent bass line<br><b>SIDE B:</b> leave blank for whatever happens after midnight</p></details>
        <nav class="signal-bottom-nav"><button data-nav="web://nightsignal.net/home">&lt; STATION</button><button data-nav="web://nightsignal.net/archive">RECORDINGS &gt;</button></nav>
      </main>`
  },
  "web://rainbow.gdn/scrapbook": {
    url: "web://rainbow.gdn/scrapbook",
    title: "Juniper's Pressed-Flower Scrapbook",
    site: "rainbow",
    ownerId: "juniper_gdn",
    summary: "Juniper's handmade scrapbook contains pressed flowers, cat photographs, tiny observations, and clues that she notices people more carefully than they realize.",
    listed: false,
    render: () => `
      <main class="page rainbow-page core-juniper-page">
        <header><small>scanned at the library, crooked on purpose</small><h1>~ Juniper's Pressed Book ~</h1></header>
        <section class="juniper-scrapbook-grid">
          <figure>${art("juniper-flowers", "Pressed flowers and handwritten labels on scrapbook paper")}<figcaption>moonflower, clover, and one leaf Modem sat on</figcaption></figure>
          <figure>${art("juniper-modem", "Orange cat named Modem sitting beside flower pots")}<figcaption>site administrator / destructive editor</figcaption></figure>
          <article><h2>things worth saving</h2><p>movie ticket with Mira<br>the blue thread from Darren's jacket<br>Dad's first tomato label<br>a note I have not answered yet</p></article>
        </section>
        <details class="core-character-interaction"><summary>Lift the folded garden note</summary><p>People tell you important things while pretending to talk about the weather. Listen to the weather part, too.</p></details>
        <nav class="rainbow-bottom-nav"><button data-nav="web://rainbow.gdn/home">&lt; Garden Home</button><button data-nav="web://rainbow.gdn/about">About Juniper</button></nav>
      </main>`
  },
  "web://raven.web/about": {
    url: "web://raven.web/about",
    title: "DarkRaven / The Figure Behind the Screen",
    site: "raven",
    ownerId: "darkraven_xx",
    summary: "DarkRaven's aggressively mysterious about page accidentally reveals an ordinary teen bedroom, his friends, his technical curiosity, and his need to be taken seriously.",
    listed: false,
    render: () => `
      <main class="page raven-page core-raven-page">
        <header class="raven-case-header"><small>SUBJECT: CLASSIFIED</small><h1>THE FIGURE BEHIND THE SCREEN</h1><b>NO PARENTS</b></header>
        <section class="raven-profile-grid">
          ${art("raven-room", "A suburban teen computer desk decorated in homemade goth style")}
          <div><h2>xX_DarkRaven_Xx</h2><p><b>REAL NAME:</b> irrelevant<br><b>AGE:</b> old enough<br><b>LOCATION:</b> behind seven proxies<br><b>ACTUAL LOCATION:</b> Bellwater, unfortunately</p><p>I build PCs from discarded parts, collect shareware disks, and document anything the directory removes. Juniper says I should mention that I also make decent grilled cheese. This is operationally irrelevant.</p></div>
        </section>
        <details class="core-character-interaction"><summary>Inspect the black notebook</summary>${art("raven-notebook", "Handwritten notebook with dramatic case names and mundane reminders")}<p>CASE 09: Who keeps moving my screwdriver? // buy Juniper birthday card BEFORE June 14 // return Mira's tape</p></details>
        <nav class="raven-bottom-nav"><button data-nav="web://raven.web/home">&lt; VOID HOME</button><button data-nav="web://raven.web/orbit">CURRENT CASE &gt;</button></nav>
      </main>`
  },
  "web://gamegrid.zone/users/lagmaster99/rankings": {
    url: "web://gamegrid.zone/users/lagmaster99/rankings",
    title: "LagMaster's LOCKED IN / WASHED OUT",
    site: "pulse",
    ownerId: "lagmaster_99",
    summary: "LagMaster's provocative peer-ranking page judges local players, games, and trends, generating arguments while revealing how badly he wants status and attention.",
    listed: false,
    render: () => `
      <main class="page gamegrid-user-page lagmaster-page core-lag-page">
        <header><small>OPINIONS UPDATED WHEN I FEEL LIKE IT</small><h1>LOCKED IN / WASHED OUT</h1><p>THE OFFICIAL BELLWATER SKILL INDEX</p></header>
        ${art("lag-ranking", "A crude homemade gamer ranking chart with marker scribbles")}
        <section class="lag-tier-list">
          <article><b>LOCKED IN</b><p>QuarterQueen — verified scores, no excuses<br>ModKit_Maddy — maps are unfair in creative ways<br>PlayerFour — owns four working controllers</p></article>
          <article><b>ON NOTICE</b><p>VelvetMage — pauses to read books inside games<br>CodeDex — calls cheat codes “routes”<br>me — temporary placement pending Friday lobby</p></article>
          <article><b>WASHED OUT</b><p>rage quitters<br>strategy-guide parrots<br>anybody who says they “almost” bought a PULSE/NET</p></article>
        </section>
        <aside class="lag-opinions">These rankings are objective. Corrections must be submitted by beating me or making a better webpage.</aside>
        <nav><button data-nav="web://gamegrid.zone/users/lagmaster99/home">&lt;&lt; FRAG SHACK</button><button data-nav="web://gamegrid.zone/users/lagmaster99/lagwave">LAGWAVE PROJECT</button></nav>
      </main>`
  },
  "web://gamegrid.zone/users/lagmaster99/lagwave": {
    url: "web://gamegrid.zone/users/lagmaster99/lagwave",
    title: "LAGWAVE 99",
    site: "pulse",
    ownerId: "lagmaster_99",
    summary: "LagMaster's embarrassing homemade game-and-music project exposes his creative ambition beneath the trash talk.",
    listed: false,
    render: () => `
      <main class="page gamegrid-user-page lagmaster-page core-lagwave-page">
        <header><small>A LAGMASTER PRODUCTION</small><h1>LAGWAVE_99</h1><p>GAME DEMO / MUSIC EXPERIENCE / MAYBE A CLAN</p></header>
        <section class="lagwave-splash">${art("lag-bedroom", "A teenage gamer at a beige computer making a homemade game")}<div><h2>COMING WHEN IT IS DONE</h2><p>Race a modem pulse through the Information Superhighway. Every missed packet changes the music. There are currently two levels, one song, and a menu that sometimes deletes itself.</p><p><b>ART:</b> me<br><b>CODE:</b> mostly me<br><b>TESTING:</b> everybody who complained<br><b>RELEASE:</b> before VANTA², probably</p></div></section>
        <details class="core-character-interaction"><summary>Read the hidden beta note</summary><p>Please do not send this to the Game Grid yet. I know the car looks like a purple doorstop. I am fixing it.</p></details>
        <nav><button data-nav="web://gamegrid.zone/users/lagmaster99/home">&lt;&lt; FRAG SHACK</button><button data-nav="web://gamegrid.zone/users/lagmaster99/rankings">SKILL INDEX</button></nav>
      </main>`
  },
  "web://foldedwire.net/provenance": {
    url: "web://foldedwire.net/provenance",
    title: "Folded Wire / Provenance Drawer",
    site: "backchannelalt",
    ownerId: "faxmoth_13",
    summary: "FaxMoth's provenance drawer teaches players to compare physical document details and separates the character's real archival method from conspiracy spectacle.",
    listed: false,
    minimumPhase: 2,
    render: () => `
      <main class="page folded-wire-page core-fax-page">
        <header><span>DRAWER 00</span><h1>PROVENANCE BEFORE PROPHECY</h1><small>A small method for large claims.</small></header>
        <section class="fax-provenance-grid">${art("fax-envelope", "An old envelope, fax header, paperclip, and handwritten archive notes")}<ol><li>Keep the full margin.</li><li>Write down who gave it to you.</li><li>Separate the old document from new annotations.</li><li>Try to prove your favorite explanation wrong.</li><li>If it survives, show somebody patient.</li></ol></section>
        <details class="core-character-interaction"><summary>Compare the paper layers</summary><p><b>1994:</b> county contract and signature.<br><b>1997:</b> fax forwarding header.<br><b>1999:</b> moon diagram, black marker, dramatic title.<br><br>The contract can be genuine while the exciting conclusion is not.</p></details>
        <button data-nav="web://foldedwire.net/home">&larr; REFOLD DOCUMENT</button>
      </main>`
  }
};
