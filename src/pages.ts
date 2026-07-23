import type { GameState, PageDefinition } from "./types";

const fakeImage = (label: string, variant = "blue") =>
  `<div class="fake-image ${variant}" role="img" aria-label="Placeholder image: ${label}"><span>${label}</span></div>`;

export const pages: Record<string, PageDefinition> = {
  "web://home": {
    url: "web://home",
    title: "OrbitNet Directory",
    site: "directory",
    render: (state) => `
      <main class="page directory-page">
        <header class="directory-logo"><span>ORBIT</span><b>NET</b></header>
        <p class="directory-tagline">Your friendly guide to the Information Superhighway!</p>
        <div class="search-box"><input value="Try clicking a featured site below!" readonly><button disabled>Search</button></div>
        <section class="directory-grid">
          <button class="directory-card" data-nav="web://rainbow.gdn/home">
            ${fakeImage("RAINBOW GARDEN", "rainbow")}
            <strong>Rainbow Garden</strong><span>Art, pets, poetry & more!</span>
          </button>
          <button class="directory-card" data-nav="web://nightsignal.net/home">
            ${fakeImage("NIGHT SIGNAL", "night")}
            <strong>Night Signal Club</strong><span>Late-night radio mysteries.</span>
          </button>
        </section>
        <p class="counter">You are visitor <strong>000042</strong> · Pages discovered: ${state.visited.length}/6</p>
      </main>`
  },
  "web://rainbow.gdn/home": {
    url: "web://rainbow.gdn/home",
    title: "~* Rainbow Garden *~",
    site: "rainbow",
    render: () => `
      <main class="page rainbow-page">
        <div class="sparkles">★ . · ✿ · . ★ . · ✿ · . ★</div>
        <h1>Welcome to Rainbow Garden!</h1>
        <p class="marquee">~ a cozy patch of the web maintained by Juniper ~</p>
        ${fakeImage("PHOTO OF MY GARDEN.JPG", "rainbow")}
        <p>Hello web travelers! This is my little home for drawings, tiny poems, and pictures of my cat, <b>Modem</b>.</p>
        <nav class="page-links">
          <button data-nav="web://rainbow.gdn/about">About Me & Modem</button>
          <button data-nav="web://rainbow.gdn/guestbook">Sign My Guestbook</button>
          <button data-nav="web://nightsignal.net/home">Cool Link: Night Signal</button>
        </nav>
        <footer>Best viewed at 800×600 · Made with Notepad</footer>
      </main>`
  },
  "web://rainbow.gdn/about": {
    url: "web://rainbow.gdn/about",
    title: "About Juniper",
    site: "rainbow",
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
  "web://rainbow.gdn/guestbook": {
    url: "web://rainbow.gdn/guestbook",
    title: "Rainbow Guestbook",
    site: "rainbow",
    render: () => `
      <main class="page rainbow-page guestbook-page">
        <h1>Rainbow Guestbook</h1>
        <p><b>Mira_917:</b> Your cat picture is enormous. I love it. P.S. archive password is still <code>ORBIT</code>.</p>
        <p><b>xX_DarkRaven_Xx:</b> nice site. visit mine when it is done.</p>
        <p><b>GardenerDad:</b> Please call your father.</p>
        <fieldset><legend>Leave a message</legend><input placeholder="Your name"><textarea placeholder="Your message"></textarea><button disabled>Sign Guestbook</button></fieldset>
        <button class="text-link" data-nav="web://rainbow.gdn/home">← Return home</button>
      </main>`
  },
  "web://nightsignal.net/home": {
    url: "web://nightsignal.net/home",
    title: "NIGHT SIGNAL // 91.7",
    site: "signal",
    render: () => `
      <main class="page signal-page">
        <header><span>NIGHT</span> SIGNAL <small>91.7 FM</small></header>
        ${fakeImage("LIVE TRANSMISSION OFFLINE", "static")}
        <h2>For people who are still awake.</h2>
        <p>We collect unusual broadcasts, answering-machine fragments, and sounds that do not have obvious owners.</p>
        <div class="signal-nav"><button data-nav="web://nightsignal.net/archive">ENTER RECORDING ARCHIVE</button><button data-nav="web://rainbow.gdn/home">FRIEND SITE: RAINBOW GARDEN</button></div>
        <p class="warning">NOTICE: The station is currently unattended. Do not adjust your receiver.</p>
      </main>`
  },
  "web://nightsignal.net/archive": {
    url: "web://nightsignal.net/archive",
    title: "Signal Archive",
    site: "signal",
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
  }
};

export const notFoundPage = (url: string): PageDefinition => ({
  url,
  title: "Page Not Found",
  site: "directory",
  render: () => `<main class="page not-found"><h1>404</h1><p>OrbitNet could not locate <code>${url.replaceAll("<", "&lt;")}</code>.</p><button data-nav="web://home">Return to the directory</button></main>`
});
