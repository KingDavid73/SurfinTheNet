import type { PageComment, PageDefinition } from "./types";

const COZY_IMAGES = {
  roses: new URL("../assets/images/generated-cells/cozy/r1c1.webp", import.meta.url).href,
  tomatoes: new URL("../assets/images/generated-cells/cozy/r1c2.webp", import.meta.url).href,
  cottage: new URL("../assets/images/generated-cells/cozy/r1c3.webp", import.meta.url).href,
  bread: new URL("../assets/images/generated-cells/cozy/r1c4.webp", import.meta.url).href,
  pressedFlowers: new URL("../assets/images/generated-cells/cozy/r1c5.webp", import.meta.url).href,
  harvest: new URL("../assets/images/generated-cells/cozy/r2c2.webp", import.meta.url).href,
  mending: new URL("../assets/images/generated-cells/cozy/r2c4.webp", import.meta.url).href,
  kitchenTable: new URL("../assets/images/generated-cells/cozy/r3c1.webp", import.meta.url).href,
  rainyBaking: new URL("../assets/images/generated-cells/cozy/r3c2.webp", import.meta.url).href,
  homework: new URL("../assets/images/generated-cells/cozy/r3c3.webp", import.meta.url).href,
  overlook: new URL("../assets/images/generated-cells/cozy/r4c1.webp", import.meta.url).href,
  forestTrail: new URL("../assets/images/generated-cells/cozy/r4c2.webp", import.meta.url).href,
  creek: new URL("../assets/images/generated-cells/cozy/r4c4.webp", import.meta.url).href,
  cards: new URL("../assets/images/generated-cells/cozy/r5c1.webp", import.meta.url).href,
  paperBird: new URL("../assets/images/generated-cells/cozy/r5c2.webp", import.meta.url).href,
  pressedBook: new URL("../assets/images/generated-cells/cozy/r5c3.webp", import.meta.url).href
} as const;

const cozyGallery = (...items: Array<[string, string]>) =>
  `<div class="cozy-generated-gallery">${items.map(([src, alt]) => `<figure><img src="${src}" alt="${alt}"><figcaption>${alt}</figcaption></figure>`).join("")}</div>`;

const RUTH_URL = "web://rosepatch.home/garden";
const ELLEN_URL = "web://hearthside.home/welcome";
const SUE_URL = "web://snacktime.home/mompage";
const TOM_URL = "web://trailnotes.home/index";
const PAM_URL = "web://paperbird.home/crafts";

const COZY_ARCHIVE_GIFS = {
  rose: new URL("../assets/images/archive-gifs/rose-bloom.gif", import.meta.url).href,
  butterfly: new URL("../assets/images/archive-gifs/pink-butterfly.gif", import.meta.url).href,
  hiker: new URL("../assets/images/archive-gifs/walking-hiker.gif", import.meta.url).href,
  sewing: new URL("../assets/images/archive-gifs/sewing-machine.gif", import.meta.url).href
} as const;

const seed = (
  id: string,
  pageUrl: string,
  ownerId: string,
  role: PageComment["role"],
  author: string,
  text: string,
  createdAt: string
): PageComment => ({ id, pageUrl, ownerId, role, author, text, createdAt, revealAfterVisit: 0 });

export const cozyMembers = [
  {
    url: RUTH_URL,
    handle: "RosePatch_Ruth",
    title: "Ruth's Rose & Tomato Patch",
    description: "Garden notes, seed-envelope wisdom, one blurry harvest photo, and an update overdue since last summer.",
    patch: "BACKYARD GARDENS",
    className: "ruth",
    badge: "R+T"
  },
  {
    url: ELLEN_URL,
    handle: "Hearthside_Ellen",
    title: "The Hearthside Book",
    description: "Country recipes, pressed flowers, mending notes, and a quiet page Ellen stopped tending in 1997.",
    patch: "COUNTRY LIVING",
    className: "ellen",
    badge: "HB"
  },
  {
    url: SUE_URL,
    handle: "Snacktime_Sue",
    title: "Sue's Kitchen-Table Homepage",
    description: "School-lunch ideas, rainy-day survival, family sayings, and a family photo that never finished uploading.",
    patch: "FAMILY & HOME",
    className: "sue",
    badge: "MOM"
  },
  {
    url: TOM_URL,
    handle: "TrailNote_Tom",
    title: "Tom's Weekend Trail Notes",
    description: "Short local hikes, penciled mileage, weather cautions, and directions copied from a folded road map.",
    patch: "HIKING & OUTDOORS",
    className: "tom",
    badge: "TN"
  },
  {
    url: PAM_URL,
    handle: "PaperBird_Pam",
    title: "Pam's Paper Bird Workshop",
    description: "Scrap-paper crafts, glue advice, handmade cards, and three projects promised for next month.",
    patch: "CRAFTS & HANDMADE",
    className: "pam",
    badge: "PB"
  }
] as const;

export const cozyPages: Record<string, PageDefinition> = {
  [RUTH_URL]: {
    url: RUTH_URL,
    title: "Ruth's Rose & Tomato Patch",
    site: "cozygarden",
    ownerId: "rosepatch_ruth",
    summary: "Ruth's semi-abandoned backyard gardening page records roses, tomatoes, seed-saving advice, and weather notes.",
    commentsEnabled: true,
    listed: true,
    hubId: "zone-cozycommons",
    searchTerms: ["garden", "gardening", "roses", "tomatoes", "seeds", "backyard", "rose patch", "ruth"],
    seedComments: [
      seed("cozy-ruth-juniper", RUTH_URL, "rosepatch_ruth", "visitor", "Juniper_Gdn", "Your newspaper seed pots worked! I have six moonflowers in the kitchen window now :)", "1998-08-20T10:14:00"),
      seed("cozy-ruth-owner", RUTH_URL, "rosepatch_ruth", "owner", "RosePatch_Ruth", "Wonderful, dear. Turn them a quarter turn every morning so they do not lean.", "1998-08-23T08:02:00")
    ],
    render: () => `
      <main class="page cozy-page cozy-ruth-page">
        <header><img class="archive-gif archive-gif-flower" src="${COZY_ARCHIVE_GIFS.rose}" alt="Animated white rose"><div><small>WELCOME TO MY BACKYARD</small><h1>Ruth's Rose &amp; Tomato Patch</h1></div><span>&#10047;</span></header>
        <marquee scrollamount="2">The garden is sleeping for winter. Please come back when the seed catalog arrives!</marquee>
        <section class="cozy-ruth-grid">
          <figure class="cozy-feature-photo"><img src="${COZY_IMAGES.harvest}" alt="A flash photograph of Ruth's tomato harvest"><figcaption>HARVEST98.JPG &mdash; too many again</figcaption></figure>
          <article><time>LAST GARDEN NOTE &mdash; AUGUST 14, 1998</time><h2>Too many tomatoes (again)</h2><p>The yellow pear tomatoes climbed over the fence and Mr. Bell says one has reached his side. I told him that makes it his responsibility now.</p><p><b>Seed-saving reminder:</b> label the envelope <em>before</em> putting the seeds in it. Trust me.</p></article>
        </section>
        ${cozyGallery([COZY_IMAGES.roses, "The fence roses after rain"], [COZY_IMAGES.tomatoes, "Tomatoes that refused to ripen together"])}
        <aside><b>RUTH'S THREE RULES</b><ol><li>Water the soil, not your shoes.</li><li>Marigolds forgive almost anything.</li><li>Never trust a squirrel near a bulb bed.</li></ol></aside>
        <footer><button data-nav="web://orbitnet.local/zones/cozycommons">&larr; Cozy Commons</button><span>Page planted 04/18/1998 &middot; last weeded 08/23/1998</span></footer>
      </main>`
  },
  [ELLEN_URL]: {
    url: ELLEN_URL,
    title: "The Hearthside Book",
    site: "cozycottage",
    ownerId: "hearthside_ellen",
    summary: "Ellen's old-fashioned country-living page preserves recipes, pressed-flower notes, mending tips, and quiet household observations.",
    commentsEnabled: true,
    listed: true,
    hubId: "zone-cozycommons",
    searchTerms: ["cottage", "cottagecore", "country living", "recipes", "pressed flowers", "mending", "home", "ellen"],
    render: () => `
      <main class="page cozy-page cozy-ellen-page">
        <header><img class="archive-gif archive-gif-butterfly" src="${COZY_ARCHIVE_GIFS.butterfly}" alt="Animated pink butterfly"><small>&mdash; notes from a small house at the end of Briar Lane &mdash;</small><h1>The Hearthside Book</h1><p>recipes &middot; sewing &middot; seasons &middot; useful little things</p></header>
        <div class="pressed-sprig" aria-hidden="true">&#10086;<br>|<br>&#10087;</div>
        <section>
          <article><h2>Apple Oat Crumble</h2><p>Six tart apples, one cup rolled oats, brown sugar by instinct, cinnamon until the kitchen smells right. Bake until the corners whisper.</p><small>posted October 6, 1997</small></article>
          <article><h2>A mending note</h2><p>A shirt repaired twice is not an old shirt. It is a familiar shirt. Keep a jar for good buttons and another for buttons whose origins are mysterious.</p><small>posted May 12, 1997</small></article>
        </section>
        ${cozyGallery([COZY_IMAGES.cottage, "The small house at the end of Briar Lane"], [COZY_IMAGES.bread, "Sunday bread cooling by the window"], [COZY_IMAGES.pressedFlowers, "Flowers saved between old dictionary pages"], [COZY_IMAGES.mending, "The cardigan with two familiar repairs"])}
        <blockquote>There is no new entry this month. The garden gate sticks and the computer is upstairs.</blockquote>
        <footer><button data-nav="web://orbitnet.local/zones/cozycommons">return to the Commons</button><span>This book has been open since 1996.</span></footer>
      </main>`
  },
  [SUE_URL]: {
    url: SUE_URL,
    title: "Sue's Kitchen-Table Homepage",
    site: "cozymom",
    ownerId: "snacktime_sue",
    summary: "Sue's family homepage collects lunch ideas, rainy-day activities, household notes, and funny things her children said.",
    commentsEnabled: true,
    listed: true,
    hubId: "zone-cozycommons",
    searchTerms: ["mom", "mom life", "family", "kids", "parenting", "lunch", "rainy day", "kitchen table", "sue"],
    seedComments: [
      seed("cozy-sue-ruth", SUE_URL, "snacktime_sue", "visitor", "RosePatch_Ruth", "The wax-paper leaf trick is clever. I am saving that for the grandchildren.", "1999-01-10T09:40:00")
    ],
    render: () => `
      <main class="page cozy-page cozy-sue-page">
        <header><div class="fridge-magnet">S</div><div><h1>Sue's Kitchen-Table Homepage</h1><p>news from our loud little house</p></div><div class="fridge-magnet">&#9786;</div></header>
        <section class="sue-corkboard">
          <article class="yellow-note"><b>LUNCHBOX IDEA #4</b><p>Cut sandwiches into stars. Save the outside pieces for yourself. This is apparently the law.</p></article>
          <div class="cozy-memory-photo broken-photo"><b>&#9633; FAMILY_PIC.JPG</b><span>image did not finish loading</span></div>
          <article class="blue-note"><b>BEN, AGE 6:</b><p>&ldquo;If the Internet is everywhere, why can't it find my other mitten?&rdquo;</p></article>
        </section>
        ${cozyGallery([COZY_IMAGES.kitchenTable, "Craft hour at the kitchen table"], [COZY_IMAGES.rainyBaking, "Rainy-day baking experiment"], [COZY_IMAGES.homework, "The quiet seven minutes after school"])}
        <section class="rainy-list"><h2>Three rainy-day things that bought me twenty minutes</h2><ul><li>Paper-bag puppets</li><li>A blanket fort with a mailbox</li><li>Letting them sort the button tin (supervised!)</li></ul><time>Last updated January 8, 1999</time></section>
        <footer><button data-nav="web://orbitnet.local/zones/cozycommons">Back to Cozy Commons</button><span>Web page maintained after bedtime.</span></footer>
      </main>`
  },
  [TOM_URL]: {
    url: TOM_URL,
    title: "Tom's Weekend Trail Notes",
    site: "cozyhike",
    ownerId: "trailnote_tom",
    summary: "Tom's low-tech hiking page records several nearby trails with mileage, weather warnings, and hand-copied directions.",
    commentsEnabled: true,
    listed: true,
    hubId: "zone-cozycommons",
    searchTerms: ["hiking", "hikes", "trail", "outdoors", "nature", "walking", "map", "weekend", "tom"],
    seedComments: [
      seed("cozy-tom-pam", TOM_URL, "trailnote_tom", "visitor", "PaperBird_Pam", "We found the old stone steps! Your note about the fallen cedar was still accurate.", "1998-10-03T17:21:00")
    ],
    render: () => `
      <main class="page cozy-page cozy-tom-page">
        <header><img class="archive-gif archive-gif-hiker" src="${COZY_ARCHIVE_GIFS.hiker}" alt="Animated backpacker walking with a hiking staff"><div><small>BOOT MILES, NOT BYTE MILES</small><h1>Tom's Weekend Trail Notes</h1></div></header>
        <div class="trail-pencil-map" role="img" aria-label="A simple hand-drawn trail map"><i></i><b>PARK</b><span>creek</span><em>OLD LOOKOUT</em></div>
        ${cozyGallery([COZY_IMAGES.overlook, "View from Old Lookout in October"], [COZY_IMAGES.forestTrail, "Fern Hollow after the leaves fell"], [COZY_IMAGES.creek, "The footbridge creek after rain"])}
        <section class="trail-cards">
          <article><h2>Fern Hollow Loop</h2><b>3.8 miles &middot; easy</b><p>Muddy after rain. At the fork after the footbridge, take the path with the blue coffee-can lid nailed to the oak.</p></article>
          <article><h2>Old Lookout Spur</h2><b>5.1 miles &middot; steady climb</b><p>The view is better after leaves fall. Bring water; the pump beside the picnic shelter was removed.</p></article>
        </section>
        <p class="trail-last-note"><b>9/27/98:</b> I will add the Quarry Road walk when I find my notebook.</p>
        <footer><button data-nav="web://orbitnet.local/zones/cozycommons">&larr; trailhead / Cozy Commons</button><span>Compass recommended. Printer optional.</span></footer>
      </main>`
  },
  [PAM_URL]: {
    url: PAM_URL,
    title: "Pam's Paper Bird Workshop",
    site: "cozycraft",
    ownerId: "paperbird_pam",
    summary: "Pam's handmade craft page shares simple paper projects, card-making notes, glue advice, and several unfinished project promises.",
    commentsEnabled: true,
    listed: true,
    hubId: "zone-cozycommons",
    searchTerms: ["crafts", "handmade", "paper crafts", "scrapbook", "cards", "glue", "paper bird", "pam"],
    seedComments: [
      seed("cozy-pam-owner", PAM_URL, "paperbird_pam", "owner", "PaperBird_Pam", "If anyone still has the little bird template, please email it to me. The disk makes a clicking sound now.", "1999-04-02T20:05:00")
    ],
    render: () => `
      <main class="page cozy-page cozy-pam-page">
        <header><span class="paper-bird">&#9700;</span><div><small>CUT &middot; FOLD &middot; SHARE</small><h1>Pam's Paper Bird Workshop</h1></div><span class="paper-bird flip">&#9700;</span></header>
        <section class="craft-scraps">
          <article><b>PROJECT 01</b><h2>Magazine Bead Garland</h2><p>Cut long paper triangles, roll around a toothpick, and seal with watered glue. Put newspaper under everything first.</p></article>
          <article><b>PROJECT 02</b><h2>Five-Minute Thank-You Card</h2><p>Fold heavy paper, glue on one fabric square, write something honest. It does not need to match.</p></article>
          <div class="cozy-memory-photo craft-photo"><b>CARDS_SCAN.BMP</b><span>three crooked cards on the scanner glass</span></div>
        </section>
        ${cozyGallery([COZY_IMAGES.cards, "Cards scanned before the glue dried"], [COZY_IMAGES.paperBird, "The missing paper-bird template, folded from memory"], [COZY_IMAGES.pressedBook, "Pam's first hand-bound leaf notebook"])}
        <aside><img class="archive-gif archive-gif-sewing" src="${COZY_ARCHIVE_GIFS.sewing}" alt="Animated vintage sewing machine"><span><b>COMING NEXT MONTH:</b> paper birds, salt-dough buttons, and the promised button-box tour.</span></aside>
        <footer><button data-nav="web://orbitnet.local/zones/cozycommons">Cozy Commons Web Ring</button><span>Last update: 04/02/1999 &middot; glue still drying</span></footer>
      </main>`
  }
};
