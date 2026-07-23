import type { PageDefinition } from "./types";

const KIDS_BUSINESS_ASSETS = {
  "rocketbox-hero-robot": new URL("../assets/images/kids-business/rocketbox-hero-robot.png", import.meta.url).href,
  "rocketbox-racer": new URL("../assets/images/kids-business/rocketbox-racer.png", import.meta.url).href,
  "rocketbox-playset": new URL("../assets/images/kids-business/rocketbox-playset.png", import.meta.url).href,
  "rocketbox-accessories": new URL("../assets/images/kids-business/rocketbox-accessories.png", import.meta.url).href,
  "rocketbox-rivals": new URL("../assets/images/kids-business/rocketbox-rivals.png", import.meta.url).href,
  "rocketbox-parts": new URL("../assets/images/kids-business/rocketbox-parts.png", import.meta.url).href,
  "moonmunch-mascot": new URL("../assets/images/kids-business/moonmunch-mascot.png", import.meta.url).href,
  "moonmunch-bowl": new URL("../assets/images/kids-business/moonmunch-bowl.png", import.meta.url).href,
  "moonmunch-box": new URL("../assets/images/kids-business/moonmunch-box.png", import.meta.url).href,
  "moonmunch-prize": new URL("../assets/images/kids-business/moonmunch-prize.png", import.meta.url).href,
  "moonmunch-marshmallows": new URL("../assets/images/kids-business/moonmunch-marshmallows.png", import.meta.url).href,
  "moonmunch-breakfast": new URL("../assets/images/kids-business/moonmunch-breakfast.png", import.meta.url).href,
  "toonburst-hero-team": new URL("../assets/images/kids-business/toonburst-hero-team.png", import.meta.url).href,
  "toonburst-monsters": new URL("../assets/images/kids-business/toonburst-monsters.png", import.meta.url).href,
  "toonburst-comedy": new URL("../assets/images/kids-business/toonburst-comedy.png", import.meta.url).href,
  "toonburst-tv": new URL("../assets/images/kids-business/toonburst-tv.png", import.meta.url).href,
  "toonburst-remote": new URL("../assets/images/kids-business/toonburst-remote.png", import.meta.url).href,
  "toonburst-fanclub": new URL("../assets/images/kids-business/toonburst-fanclub.png", import.meta.url).href
} as const;

const kidsAsset = (name: keyof typeof KIDS_BUSINESS_ASSETS, alt: string, className = "") =>
  `<img class="kids-business-art ${className}" src="${KIDS_BUSINESS_ASSETS[name]}" alt="${alt}">`;

export const kidsBusinessPages: Record<string, PageDefinition> = {
  "web://rocketbox.toys/home": {
    url: "web://rocketbox.toys/home",
    title: "ROCKETBOX TOYS — Build It Bigger!",
    site: "rocketbox",
    ownerId: "rocketbox_rick",
    summary: "Rocketbox Toys makes modular action figures, racers, robots, playsets, and interchangeable Snap-Lock parts for imaginative kids.",
    commentsEnabled: true,
    listed: true,
    hubId: "business",
    searchTerms: ["toy", "toys", "kids", "children", "action figure", "robot", "vehicle", "racer", "playset", "building", "modular", "birthday"],
    render: () => `
      <main class="page rocketbox-page">
        <header class="rocketbox-header"><div class="rocketbox-logo">ROCKET<span>BOX</span><sup>™</sup></div><p>ENGINEERED FOR IMAGINATION</p></header>
        <nav class="rocketbox-nav"><button data-nav="web://rocketbox.toys/home">LAUNCH PAD</button><button data-nav="web://rocketbox.toys/catalog">1999 CATALOG</button><button disabled>BUILDER LAB</button><button disabled>ROCKET CLUB</button></nav>
        <div class="rocketbox-stripe">NEW FOR FALL 1999! &nbsp; EVERY RIVET FORCE SET WORKS WITH EVERY OTHER SET!</div>
        <section class="rocketbox-hero">
          <div class="rocketbox-product">${kidsAsset("rocketbox-hero-robot", "A large modular Rocketbox robot action figure")}<span class="rocketbox-burst">48<br>WAYS TO<br>REBUILD!</span></div>
          <div><span class="rocketbox-kicker">RIVET FORCE™ SERIES 2</span><h1>BUILD IT.<br>BREAK IT.<br><em>BUILD IT BIGGER.</em></h1><p>Swap the arms. Trade the wheels. Put a rocket where the instruction sheet says the head should be. <b>Snap-Lock™ ports</b> make every Rivet Force figure, vehicle, and base part of one enormous system.</p><button data-nav="web://rocketbox.toys/catalog">ENTER THE TOY VAULT &gt;&gt;</button><small>For ages 6 and up. Small parts. Ask a grown-up before launching anything indoors.</small></div>
        </section>
        <section class="rocketbox-lineup">
          <article>${kidsAsset("rocketbox-racer", "A bright Rocketbox modular racing vehicle")}<div><b>TURBO CRAWLER</b><span>Six wheels. Two launchers. Zero indoor speed limits.*</span><strong>$19.99</strong></div></article>
          <article>${kidsAsset("rocketbox-rivals", "Two rival Rocketbox action figures")}<div><b>RIVET FORCE RIVALS</b><span>Commander Volt vs. Dr. Socket. You decide who gets the jet boots.</span><strong>$8.99 EA.</strong></div></article>
          <article>${kidsAsset("rocketbox-playset", "A large Rocketbox fortress playset")}<div><b>CRASH FORTRESS</b><span>Three levels, breakaway walls, and 22 Snap-Lock ports.</span><strong>$39.99</strong></div></article>
        </section>
        <aside class="rocketbox-field-note"><b>RICK'S BUILD OF THE WEEK:</b><span>Four Turbo Crawler wheels + Alpha Bot arms + the Fortress radar dish = “The Homework Avoider.” Send us yours! Please do not send the actual toy.</span></aside>
        <p class="business-owner">Ask Rocketbox Rick about compatible parts, missing instructions, or what to build next.</p>
        <footer>*Please obey the speed limit in your house. Rocketbox Toys, Dynamo City, USA. Products and colors may vary.</footer>
      </main>`
  },
  "web://rocketbox.toys/catalog": {
    url: "web://rocketbox.toys/catalog",
    title: "Rocketbox 1999 Toy Vault",
    site: "rocketbox",
    ownerId: "rocketbox_rick",
    summary: "The Rocketbox 1999 catalog lists Rivet Force figures, Turbo Crawler vehicles, the Crash Fortress playset, and Snap-Lock accessory packs.",
    listed: true,
    hubId: "business",
    searchTerms: ["toy catalog", "toy prices", "action figures", "robot toys", "vehicle toys", "playset", "accessories", "replacement parts"],
    render: () => `
      <main class="page rocketbox-page rocketbox-catalog-page">
        <header class="rocketbox-header"><div class="rocketbox-logo">ROCKET<span>BOX</span><sup>™</sup></div><p>1999 TOY VAULT // FILE 02</p></header>
        <nav class="rocketbox-nav"><button data-nav="web://rocketbox.toys/home">LAUNCH PAD</button><button>1999 CATALOG</button><button disabled>BUILDER LAB</button></nav>
        <section class="rocketbox-catalog-hero">${kidsAsset("rocketbox-accessories", "A Rocketbox accessory pack in colorful blister packaging")}<div><span>ONE SYSTEM. ENDLESS REBUILDS.</span><h1>THE RIVET FORCE<br>FIELD GUIDE</h1><p>Look for the silver hexagon on the box. If it has a Snap-Lock port, it connects.</p></div></section>
        <section class="rocketbox-catalog-grid">
          <article><h2>ALPHA BOT</h2><b>ITEM 1101 · $14.99</b><p>11-inch command robot with four swappable arms, light-up chest, and rescue claw.</p></article>
          <article><h2>TURBO CRAWLER</h2><b>ITEM 2204 · $19.99</b><p>All-terrain racer with pop-up wings, twin foam launchers, and six removable wheels.</p></article>
          <article><h2>CRASH FORTRESS</h2><b>ITEM 3308 · $39.99</b><p>Fold-open headquarters with breakaway wall, elevator, radar dish, and storage bay.</p></article>
          <article><h2>PARTS PACKS</h2><b>ITEM 4400 · FROM $5.99</b><p>Wheels, claws, wings, armor, tools, and connectors. Color packs sold separately.</p></article>
        </section>
        <div class="rocketbox-parts">${kidsAsset("rocketbox-parts", "An organized selection of Rocketbox Snap-Lock toy parts")}<p><b>LOST A CONNECTOR?</b> Write the item number from the bottom of your toy on an envelope. A grown-up can call 1-800-RKT-BOX for replacement part prices. Never put toy parts in your mouth.</p></div>
        <button class="console-return" data-nav="web://rocketbox.toys/home">&lt;&lt; RETURN TO LAUNCH PAD</button>
        <footer>© 1999 Rocketbox Toys. Snap-Lock and Rivet Force are totally serious trademarks.</footer>
      </main>`
  },
  "web://moonmunch.com/home": {
    url: "web://moonmunch.com/home",
    title: "Moon Munch Cereal — Breakfast Has Landed!",
    site: "moonmunch",
    ownerId: "major_munch",
    summary: "Moon Munch is a sweet space cereal with toasted corn stars, fruity Moonmallow shapes, box prizes, games, and the Major Munch mascot.",
    commentsEnabled: true,
    listed: true,
    hubId: "business",
    searchTerms: ["cereal", "breakfast", "food", "kids", "children", "marshmallow", "prize", "box top", "mascot", "sweet", "corn"],
    render: () => `
      <main class="page moonmunch-page">
        <div class="moonmunch-stars"></div>
        <header class="moonmunch-header"><div class="moonmunch-logo"><small>MAJOR MUNCH PRESENTS</small>MOON <span>MUNCH!</span></div><strong>BREAKFAST HAS LANDED!</strong></header>
        <nav class="moonmunch-nav"><button data-nav="web://moonmunch.com/home">MISSION CONTROL</button><button data-nav="web://moonmunch.com/prizes">PRIZE ZONE</button><button disabled>SPACE GAMES</button><button disabled>MUNCH MAIL</button></nav>
        <section class="moonmunch-hero">
          <div class="moonmunch-mascot">${kidsAsset("moonmunch-mascot", "Major Munch, a smiling cartoon astronaut mascot")}<span class="moon-speech">Cadet! Your spoon<br>is cleared for launch!</span></div>
          <div class="moonmunch-bowl">${kidsAsset("moonmunch-bowl", "A bowl of Moon Munch corn stars and colorful moon marshmallows")}<div><span>NEW!</span><h1>FRUITY<br>MOON<br>MALLOWS!</h1><p>Toasty corn stars with rockets, moons, aliens, and comets in four far-out fruit flavors.</p></div></div>
        </section>
        <section class="moonmunch-prize-callout">
          ${kidsAsset("moonmunch-box", "A colorful Moon Munch cereal box")}
          <div><p class="moonmunch-alert">INSIDE SPECIALLY MARKED BOXES!</p><h2>THE MOON DECODER RING</h2><p>Turn the secret dial. Decode Major Munch's message. Become the only person at breakfast who knows what <b>CRATER-7</b> means.</p><button data-nav="web://moonmunch.com/prizes">OPEN THE PRIZE ZONE!</button></div>
          ${kidsAsset("moonmunch-prize", "A plastic Moon Munch decoder ring prize")}
        </section>
        <section class="moonmunch-flavors">${kidsAsset("moonmunch-marshmallows", "Colorful rocket, moon, alien, and comet cereal marshmallows")}<p><b>COUNT THE MOONMALLOWS!</b><br>Major Munch counted 37 in his bowl, but he may have eaten some during the mission.</p></section>
        <p class="business-owner">Transmit a breakfast question to Major Munch. Do not send your real name, address, school, or other private information.</p>
        <footer>Moon Munch is part of a complete breakfast. Ask a grown-up before entering any contest. © 1999 Northstar Foods.</footer>
      </main>`
  },
  "web://moonmunch.com/prizes": {
    url: "web://moonmunch.com/prizes",
    title: "Moon Munch Prize Zone",
    site: "moonmunch",
    ownerId: "major_munch",
    summary: "Moon Munch's prize page explains decoder rings, collectible constellation cards, box-top mail offers, and parent-permission rules.",
    listed: true,
    hubId: "business",
    searchTerms: ["cereal prize", "decoder ring", "constellation card", "box tops", "mail away", "collectible", "kids club"],
    render: () => `
      <main class="page moonmunch-page moonmunch-prizes-page">
        <header class="moonmunch-header"><div class="moonmunch-logo"><small>MAJOR MUNCH PRESENTS</small>MOON <span>MUNCH!</span></div><strong>PRIZE ZONE // TOP SECRET</strong></header>
        <nav class="moonmunch-nav"><button data-nav="web://moonmunch.com/home">MISSION CONTROL</button><button>PRIZE ZONE</button><button disabled>SPACE GAMES</button></nav>
        <section class="prize-zone-hero">${kidsAsset("moonmunch-prize", "The Moon Munch plastic decoder ring")}<div><span>PRIZE FILE 11-99</span><h1>CRACK THE<br>BREAKFAST CODE!</h1><ol><li>Find the ring sealed inside a specially marked box.</li><li>Match the symbol in the cereal-box message window.</li><li>Turn the red dial to reveal your secret letter.</li></ol></div></section>
        <section class="moonmunch-collect">
          <article>${kidsAsset("moonmunch-breakfast", "A cheerful late-1990s family breakfast scene")}<div><h2>COLLECT ALL 4 STAR CARDS</h2><p>Orion, Cassiopeia, Cygnus, and “Major Munch's Definitely Real Space Route.” One card printed on every participating box.</p></div></article>
          <article><h2>CAPTAIN'S PATCH MAIL OFFER</h2><p>Send 4 box tops plus $1.50 shipping and handling. Ask a parent or guardian to read the box for the mailing address and offer details.</p><b>PLEASE DO NOT SEND MONEY THROUGH THIS WEB PAGE.</b></article>
        </section>
        <aside class="moonmunch-parent-note"><b>GROWN-UPS:</b> This pretend Prize Zone never asks a child for contact information. Real mail offers should provide full rules, dates, eligibility, and privacy details on the package.</aside>
        <button class="console-return" data-nav="web://moonmunch.com/home">&lt;&lt; BACK TO MISSION CONTROL</button>
        <footer>While supplies last. One prize per participating box. Prize colors vary.</footer>
      </main>`
  },
  "web://toonburst.tv/home": {
    url: "web://toonburst.tv/home",
    title: "TOONBURST! Saturday Starts Here",
    site: "toonburst",
    ownerId: "kip_toonburst",
    summary: "ToonBurst is a Saturday-morning cartoon block with action heroes, monsters, comedy shows, schedules, fan-club activities, and TV trivia.",
    commentsEnabled: true,
    listed: true,
    hubId: "business",
    searchTerms: ["cartoon", "cartoons", "animation", "tv", "television", "kids", "children", "saturday morning", "shows", "schedule", "fan club"],
    render: () => `
      <main class="page toonburst-page">
        <header class="toonburst-header"><div class="toonburst-logo">TOON<span>BURST!</span></div><strong>SATURDAY STARTS HERE.</strong></header>
        <nav class="toonburst-nav"><button data-nav="web://toonburst.tv/home">ON AIR</button><button data-nav="web://toonburst.tv/schedule">SHOW GRID</button><button disabled>CHARACTER BIOS</button><button disabled>FAN CLUB</button></nav>
        <div class="toonburst-ticker">NEXT SATURDAY: NEW GIZMO RANGERS! + MONDO MONSTERS MARATHON! + A LUNCHBOX LEGENDS MYSTERY!</div>
        <section class="toonburst-hero">
          ${kidsAsset("toonburst-hero-team", "The colorful Gizmo Rangers cartoon hero team")}
          <div><span>ALL-NEW AT 8:00!</span><h1>GIZMO<br>RANGERS</h1><p>Five kids. Five impossible gadgets. One principal who keeps wondering why the gym has a rocket-shaped hole in it.</p><button data-nav="web://toonburst.tv/schedule">SEE THE SATURDAY GRID &gt;</button></div>
        </section>
        <section class="toonburst-shows">
          <article>${kidsAsset("toonburst-monsters", "Friendly cartoon monsters from Mondo Monsters")}<div><b>MONDO MONSTERS</b><span>8:30 — Being scary is easy. Passing seventh grade is hard.</span></div></article>
          <article>${kidsAsset("toonburst-comedy", "The slapstick cartoon cast of Lunchbox Legends")}<div><b>LUNCHBOX LEGENDS</b><span>9:00 — Cafeteria justice, one pudding cup at a time.</span></div></article>
          <article>${kidsAsset("toonburst-tv", "A chunky television showing the ToonBurst logo")}<div><b>TOONBURST REWIND</b><span>10:30 — You pick the classic episode. Kip tries to find the tape.</span></div></article>
        </section>
        <aside class="toonburst-poll">${kidsAsset("toonburst-remote", "A colorful television remote control")}<div><b>REMOTE CONTROL POLL:</b><span>Who should get the giant robot next week?</span><button disabled>DOT</button><button disabled>RICO</button><button disabled>THE HAMSTER</button><small>Voting modem temporarily busy.</small></div></aside>
        <p class="business-owner">Kip reads the mailbag after the block. Ask about show times, characters, or last week's episode.</p>
        <footer>Check local listings. Programs and times subject to the mysterious decisions of adults. © 1999 ToonBurst Television.</footer>
      </main>`
  },
  "web://toonburst.tv/schedule": {
    url: "web://toonburst.tv/schedule",
    title: "ToonBurst Saturday Show Grid",
    site: "toonburst",
    ownerId: "kip_toonburst",
    summary: "The ToonBurst show grid lists Saturday cartoon times for Gizmo Rangers, Mondo Monsters, Lunchbox Legends, Astro Academy, and viewer's choice.",
    listed: true,
    hubId: "business",
    searchTerms: ["cartoon schedule", "tv listings", "saturday shows", "Gizmo Rangers", "Mondo Monsters", "Lunchbox Legends", "Astro Academy"],
    render: () => `
      <main class="page toonburst-page toonburst-schedule-page">
        <header class="toonburst-header"><div class="toonburst-logo">TOON<span>BURST!</span></div><strong>SHOW GRID // SATURDAY 11.06.99</strong></header>
        <nav class="toonburst-nav"><button data-nav="web://toonburst.tv/home">ON AIR</button><button>SHOW GRID</button><button disabled>CHARACTER BIOS</button></nav>
        <section class="schedule-hero">${kidsAsset("toonburst-fanclub", "A ToonBurst fan club package with membership card and stickers")}<div><span>CLIP IT. TAPE IT. DON'T MISS IT.</span><h1>YOUR SATURDAY,<br>PLANNED.</h1><p>Times are Central. Ask whoever controls the remote before promising the couch to three friends.</p></div></section>
        <section class="toonburst-grid">
          <article><time>8:00</time><div><h2>GIZMO RANGERS</h2><b>NEW: “Locker 404”</b><p>The Rangers download a map to a hallway that does not exist.</p></div></article>
          <article><time>8:30</time><div><h2>MONDO MONSTERS</h2><b>“Picture Day of Doom”</b><p>Gloop discovers that camera flashes make him invisible.</p></div></article>
          <article><time>9:00</time><div><h2>LUNCHBOX LEGENDS</h2><b>“The Missing Mozzarella”</b><p>Rico interrogates every lunch table. Twice.</p></div></article>
          <article><time>9:30</time><div><h2>ASTRO ACADEMY</h2><b>“Pop Quiz on Pluto”</b><p>The class field trip takes a wrong turn near Neptune.</p></div></article>
          <article><time>10:00</time><div><h2>MONDO MONSTERS</h2><b>Viewer Favorite</b><p>A second helping selected by last week's phone vote.</p></div></article>
          <article><time>10:30</time><div><h2>TOONBURST REWIND</h2><b>Fan Pick</b><p>The winning classic will be announced after the 9:30 station break.</p></div></article>
        </section>
        <button class="console-return" data-nav="web://toonburst.tv/home">&lt;&lt; RETURN TO ON AIR</button>
        <footer>All times Central. Schedule subject to change due to sports, news, or tape-related emergencies.</footer>
      </main>`
  }
};
