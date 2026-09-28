import type { PageComment, PageDefinition } from "./types";

const DEALER_ASSETS = {
  "cal-owner": new URL("../assets/images/dealer-web/cal-owner.png", import.meta.url).href,
  "cal-sedan": new URL("../assets/images/dealer-web/cal-sedan.png", import.meta.url).href,
  "cal-minivan": new URL("../assets/images/dealer-web/cal-minivan.png", import.meta.url).href,
  "cal-pickup": new URL("../assets/images/dealer-web/cal-pickup.png", import.meta.url).href,
  "cal-office": new URL("../assets/images/dealer-web/cal-office.png", import.meta.url).href,
  "cal-lot": new URL("../assets/images/dealer-web/cal-lot.png", import.meta.url).href,
  "cal-commercial-1982": new URL("../assets/images/dealer-web/cal-commercials/cal-commercial-1982.png", import.meta.url).href,
  "cal-commercial-1985": new URL("../assets/images/dealer-web/cal-commercials/cal-commercial-1985.png", import.meta.url).href,
  "cal-commercial-1988": new URL("../assets/images/dealer-web/cal-commercials/cal-commercial-1988.png", import.meta.url).href,
  "cal-commercial-1990": new URL("../assets/images/dealer-web/cal-commercials/cal-commercial-1990.png", import.meta.url).href,
  "cal-commercial-1992": new URL("../assets/images/dealer-web/cal-commercials/cal-commercial-1992.png", import.meta.url).href,
  "cal-commercial-1994": new URL("../assets/images/dealer-web/cal-commercials/cal-commercial-1994.png", import.meta.url).href,
  "cal-commercial-1996": new URL("../assets/images/dealer-web/cal-commercials/cal-commercial-1996.png", import.meta.url).href,
  "cal-commercial-1999": new URL("../assets/images/dealer-web/cal-commercials/cal-commercial-1999.png", import.meta.url).href,
  "cal-greatest-hits-cd": new URL("../assets/images/dealer-web/cal-commercials/cal-greatest-hits-cd.png", import.meta.url).href,
  "earl-owner": new URL("../assets/images/dealer-web/earl-owner.png", import.meta.url).href,
  "earl-hatchback": new URL("../assets/images/dealer-web/earl-hatchback.png", import.meta.url).href,
  "earl-convertible": new URL("../assets/images/dealer-web/earl-convertible.png", import.meta.url).href,
  "earl-wagon": new URL("../assets/images/dealer-web/earl-wagon.png", import.meta.url).href,
  "earl-office": new URL("../assets/images/dealer-web/earl-office.png", import.meta.url).href,
  "earl-lot": new URL("../assets/images/dealer-web/earl-lot.png", import.meta.url).href
} as const;

const dealerAsset = (name: keyof typeof DEALER_ASSETS, alt: string, className = "") =>
  `<img class="dealer-photo ${className}" src="${DEALER_ASSETS[name]}" alt="${alt}">`;

const seed = (
  id: string,
  pageUrl: string,
  ownerId: string,
  role: PageComment["role"],
  author: string,
  text: string,
  createdAt: string
): PageComment => ({ id, pageUrl, ownerId, role, author, text, createdAt, revealAfterVisit: 0 });

const CAL_URL = "web://kingcalscars.biz/home";
const EARL_URL = "web://honestearl.com/home";

const calComments: PageComment[] = [
  seed("cal-seed-earl-1", CAL_URL, "king_cal", "player", "Honest_Earl", "That Crown Regent sat behind my fence for two winters before Cal bought it. Ask him why the trunk is a different shade of burgundy.", "1999-11-02T17:41:00"),
  seed("cal-seed-cal-1", CAL_URL, "king_cal", "owner", "KingCalCars", "Earl, your lot has an inflatable gorilla because even your balloons refuse to work there. The trunk is a distinguished accent panel.", "1999-11-02T18:03:00"),
  seed("cal-seed-denise", CAL_URL, "king_cal", "player", "DeniseM", "The Regent's passenger window fell down inside the door on County Line Road. Cal said power windows are a luxury and I still have three years of payments.", "1999-11-03T09:12:00"),
  seed("cal-seed-cal-2", CAL_URL, "king_cal", "owner", "KingCalCars", "Denise, the motor still makes a noise, which proves it has power. Bring it by Tuesday and we can discuss our Royal Labor Rate.", "1999-11-03T09:44:00"),
  seed("cal-seed-louie", CAL_URL, "king_cal", "player", "Louie_73", "The sign said $89 a week. Nobody mentioned 156 weeks, CrownGuard, or the $289 royal preparation fee until I was in the office.", "1999-11-03T14:28:00"),
  seed("cal-seed-cal-3", CAL_URL, "king_cal", "owner", "KingCalCars", "Louie, weeks continuing to occur is not a hidden fee. Every number was printed on the gold sheet beneath the coffee mug.", "1999-11-03T14:51:00"),
  seed("cal-seed-tv-tom", CAL_URL, "king_cal", "visitor", "TeeVeeTom", "My barbershop still closes Fridays with the Everybody Rides tape. You sell questionable automobiles, Cal, but you are County Line royalty.", "1999-11-03T17:22:00"),
  seed("cal-seed-cal-4", CAL_URL, "king_cal", "owner", "KingCalCars", "Tom understands the crown. A car may last a month, but a royal hook lasts forever.", "1999-11-03T17:39:00")
];

const earlComments: PageComment[] = [
  seed("earl-seed-cal-1", EARL_URL, "honest_earl", "player", "KingCalCars", "HONEST? Your office clock runs backward during financing. That SunnyBee is old enough to remember when your hair was real.", "1999-11-02T18:17:00"),
  seed("earl-seed-earl-1", EARL_URL, "honest_earl", "owner", "Honest_Earl", "Cal, my hair and my cars are both honestly represented. Go polish your plastic crown and your mandatory fabric treatment.", "1999-11-02T18:32:00"),
  seed("earl-seed-tina", EARL_URL, "honest_earl", "player", "Tina_R", "The convertible overheated before I got home. Earl said the temperature gauge was only a suggestion and offered me a gallon jug for $18.", "1999-11-03T10:06:00"),
  seed("earl-seed-earl-2", EARL_URL, "honest_earl", "owner", "Honest_Earl", "Tina, I offered the neighbor price on that coolant. The Breeze is happiest with the top down and the heater on full.", "1999-11-03T10:39:00"),
  seed("earl-seed-darryl", EARL_URL, "honest_earl", "player", "DarrylP", "How does $79 a week turn into $15,715? And why was there a $245 friendship filing fee? We are not friends.", "1999-11-03T16:21:00"),
  seed("earl-seed-earl-3", EARL_URL, "honest_earl", "owner", "Honest_Earl", "Darryl, friendship is a service, not a guarantee. The total is right there if you multiply the weekly amount by all 180 friendly weeks.", "1999-11-03T16:46:00")
];

export const dealerPages: Record<string, PageDefinition> = {
  [CAL_URL]: {
    url: CAL_URL,
    title: "King Cal's Auto Kingdom — Everybody Rides Like Royalty!",
    site: "kingcal",
    ownerId: "king_cal",
    summary: "King Cal's Auto Kingdom sells overpriced high-mileage used cars with buy-here-pay-here financing, archives beloved homemade rap commercials from 1982 to 1999, and maintains an ongoing feud with Honest Earl across County Line Road.",
    commentsEnabled: true,
    seedComments: calComments,
    listed: true,
    hubId: "business",
    searchTerms: ["used car", "cars", "auto dealer", "dealership", "vehicle", "financing", "bad credit", "buy here pay here", "sedan", "minivan", "pickup", "King Cal", "commercial", "rap", "jingle", "County Line Royalty", "greatest hits"],
    render: () => `
      <main class="page kingcal-page">
        <header class="kingcal-header"><div><span>♛</span><h1>KING CAL'S</h1><b>AUTO KINGDOM</b></div><p>EVERYBODY RIDES LIKE ROYALTY!</p></header>
        <nav class="kingcal-nav"><button data-nav="${CAL_URL}">CASTLE GATES</button><button data-nav="web://kingcalscars.biz/inventory">ROYAL INVENTORY</button><button data-nav="${EARL_URL}">WHY EARL IS WRONG</button></nav>
        <div class="kingcal-marquee">KING CAL WILL NOT BE UNDERSOLD! &nbsp; ESPECIALLY BY HONEST EARL, WHO IS NEITHER!</div>
        <section class="kingcal-hero">
          <div class="cal-portrait">${dealerAsset("cal-owner", "King Cal, a Black local TV salesman in a velvet-trimmed gold suit and plastic crown, leaning on his customized burgundy sedan")}<span>THE KING<br>HIMSELF!</span></div>
          <div><p class="cal-proclamation">A ROYAL PROCLAMATION</p><h2>BAD CREDIT?<br>NO CREDIT?<br><em>NO SHAME!</em></h2><p>King Cal puts working people into dignified, previously enjoyed chariots. Our finance office says <b>YES</b> before your bank finishes saying absolutely not.</p><button data-nav="web://kingcalscars.biz/inventory">BROWSE THE KINGDOM &gt;&gt;</button><small>Approval subject to down payment, employment, residence, references, 27.9% APR, and Cal liking the cut of your jib.</small></div>
        </section>
        <section class="cal-deal">
          ${dealerAsset("cal-sedan", "King Cal's tired customized burgundy luxury sedan with whitewalls, landau roof, velour, and gold-look trim")}
          <div><span>CAL'S PERSONAL-STYLE ROYAL PICK</span><h2>1990 CROWN REGENT</h2><p>142,000 miles · whitewalls · pillow-top velour · gold-look grille · power-window sound package</p><strong>$89<small>/WEEK</small></strong><b>$1,999 DOWN · 156 WEEKS</b><mark>TOTAL: $15,883 BEFORE TAXES &amp; FEES</mark></div>
        </section>
        <aside class="cal-web-junk"><b>ROYAL WEEKLY DEALS</b><span>Save the current three-chariot flyer to Orbit Mail. It is an informational archive copy; no credit application is started.</span><button type="button" data-business-mail="kingcal">EMAIL THIS WEEK'S DEAL SHEET</button></aside>
        <section class="cal-commercial-vault">
          <header><div><small>RECORDED OFF LOCAL TV · TRACKING MAY VARY</small><h2>THE ROYAL COMMERCIAL VAULT</h2></div><strong>17 YEARS<br>OF RHYMES<br>&amp; RIDES</strong></header>
          <div class="cal-vault-intro">
            <p>King Cal bought his first thirty seconds of late-night airtime in 1982. By 1988, kids were trading his commercial tapes at school. Mechanics, barbershops, bowling alleys, and at least one wedding DJ still keep the royal hooks alive.</p>
            <blockquote>“The cars got you through the month.<br>The songs got you through the commercial break.”<cite>— County Line Cable Collector's Club</cite></blockquote>
          </div>
          <div class="cal-commercial-grid">
            <figure>${dealerAsset("cal-commercial-1982", "A degraded 1982 CRT screen grab of a younger King Cal pitching a battered brown sedan")}<figcaption><b>1982</b><span>THE FIRST CORONATION</span><small>Cal points. The car almost starts.</small></figcaption></figure>
            <figure>${dealerAsset("cal-commercial-1985", "A tracked VHS frame of King Cal holding keys beside a cheap compact car in 1985")}<figcaption><b>1985</b><span>UNTIL PAYDAY</span><small>“Not forever. Just forward.”</small></figcaption></figure>
            <figure>${dealerAsset("cal-commercial-1988", "A saturated 1988 cable-access frame of King Cal rapping beside a boom box and woodgrain minivan")}<figcaption><b>1988</b><span>ROYAL RIDE RAP</span><small>The first crown. The first beat.</small></figcaption></figure>
            <figure>${dealerAsset("cal-commercial-1990", "A 1990 VHS frame of King Cal on a cardboard palace set beside a burgundy clunker")}<figcaption><b>1990</b><span>CARDBOARD CASTLE</span><small>Two columns. No warranty.</small></figcaption></figure>
            <figure>${dealerAsset("cal-commercial-1992", "A rain-smeared 1992 camcorder frame of King Cal rapping under an umbrella on his lot")}<figcaption><b>1992</b><span>RAIN OR SHINE FINANCING</span><small>Shot in one take during a storm.</small></figcaption></figure>
            <figure>${dealerAsset("cal-commercial-1994", "A 1994 video-toaster frame with King Cal, crude lightning, floating crowns, and a tired pickup")}<figcaption><b>1994</b><span>COUNTY LINE CROWN</span><small>The diss track Earl denies hearing.</small></figcaption></figure>
            <figure>${dealerAsset("cal-commercial-1996", "A fisheye 1996 music-video frame of King Cal and neighborhood fans beside his customized sedan")}<figcaption><b>1996</b><span>ROYALTY ON WHEELS</span><small>Requested twice on local cable.</small></figcaption></figure>
            <figure>${dealerAsset("cal-commercial-1999", "A 1999 VHS freeze frame of King Cal spreading his arms across the Auto Kingdom lot at dusk")}<figcaption><b>1999</b><span>EVERYBODY RIDES</span><small>Current commercial · instant classic.</small></figcaption></figure>
            <figure class="cal-album-ad">${dealerAsset("cal-greatest-hits-cd", "The sold-out King Cal County Line Royalty greatest commercial raps CD")}<i>SOLD<br>OUT!</i><figcaption><b>LIMITED CD</b><span>COUNTY LINE ROYALTY</span><small>All the royal raps · first pressing: 300</small><em>Every copy sold at the Customer Appreciation Cookout. Cal is considering another 300.</em></figcaption></figure>
          </div>
          <footer><b>HEAR THE ARCHIVE:</b> ORBITAMP has loaded the surviving commercial masters below your browser. Use |◀ and ▶| to tour the tapes.</footer>
        </section>
        <aside class="cal-vs-earl"><b>DON'T CROSS THE ROAD!</b><p>Honest Earl charges a <em>friendship filing fee</em>. King Cal has never charged for friendship because King Cal has never claimed to be your friend.</p><button data-nav="${EARL_URL}">SEE EARL'S SO-CALLED “DEALS”</button></aside>
        <div class="cal-fine-print">All vehicles sold AS IS unless the written Buyers Guide says otherwise. Price excludes tax, title, $289 Royal Preparation, and mandatory $395 CrownGuard fabric treatment. Oral promises are as temporary as Earl's handshake.</div>
        <p class="business-owner">Question the king below. Earl already does, constantly.</p>
        <footer>King Cal's Auto Kingdom · 1400 County Line Road · Gold side of the street · Open until Cal says otherwise</footer>
      </main>`
  },
  "web://kingcalscars.biz/inventory": {
    url: "web://kingcalscars.biz/inventory",
    title: "King Cal's Royal Inventory & Financing",
    site: "kingcal",
    ownerId: "king_cal",
    summary: "King Cal lists a high-mileage sedan, minivan, and pickup with expensive weekly financing, add-ons, mileage caveats, and as-is disclosures.",
    listed: true,
    hubId: "business",
    searchTerms: ["used car inventory", "used sedan", "used minivan", "used pickup", "weekly car payment", "27.9 APR", "as is car"],
    render: () => `
      <main class="page kingcal-page cal-inventory-page">
        <header class="kingcal-header"><div><span>♛</span><h1>KING CAL'S</h1><b>ROYAL INVENTORY</b></div><p>THREE CHARIOTS. MANY PAYMENTS.</p></header>
        <nav class="kingcal-nav"><button data-nav="${CAL_URL}">CASTLE GATES</button></nav>
        <section class="cal-inventory-grid">
          <article>${dealerAsset("cal-sedan", "The customized burgundy Crown Regent with a fake landau roof, whitewalls, and gold-look grille")}<h2>1990 CROWN REGENT</h2><p>142,000 mi · automatic · whitewalls · pillow-top velour · radio receives most stations · passenger window stored safely inside door</p><strong>$1,999 DOWN<br>+ $89/WK × 156</strong><b>$15,883 + TAX &amp; FEES</b></article>
          <article>${dealerAsset("cal-minivan", "A faded blue and woodgrain Family Voyager minivan")}<h2>1988 FAMILY VOYAGER</h2><p>187,000 mi · seven seats · simulated wood · air conditioning described as seasonal</p><strong>$7,995 CASH</strong><b>FINANCING TOTAL AVAILABLE IN OFFICE</b></article>
          <article>${dealerAsset("cal-pickup", "A red pickup truck with a mismatched white tailgate")}<h2>1992 WORKHORSE</h2><p>Mileage exempt · automatic · tailgate from a respected donor vehicle · Buyers Guide included</p><strong>$2,500 DOWN<br>+ $109/WK × 156</strong><b>$19,504 + TAX &amp; FEES</b></article>
        </section>
        <section class="cal-finance">${dealerAsset("cal-office", "King Cal in his plastic crown and velvet-trimmed gold suit behind a calculator in his wood-paneled finance office")}<div><h2>THE ROYAL TREATMENT</h2><dl><div><dt>Illustrative APR</dt><dd>27.9%</dd></div><div><dt>Royal Preparation</dt><dd>$289</dd></div><div><dt>CrownGuard fabric treatment</dt><dd>$395 mandatory</dd></div><div><dt>Independent inspection</dt><dd>Before purchase, on your dime</dd></div></dl><p>Read the Buyers Guide. Get every promise in writing. If Earl says Cal never told you that, this page proves Cal just did.</p></div></section>
        <button class="console-return" data-nav="${CAL_URL}">&lt;&lt; RETURN TO THE CASTLE GATES</button>
        <footer>Inventory changes whenever something starts. Photos may show optimism not included with vehicle.</footer>
      </main>`
  },
  [EARL_URL]: {
    url: EARL_URL,
    title: "Honest Earl's Budget Motors — Honestly Here for You!",
    site: "earl",
    ownerId: "honest_earl",
    summary: "Honest Earl's Budget Motors sells overpriced high-mileage used cars through long weekly-payment plans, mandatory fees, as-is terms, and a vicious feud with King Cal across the road.",
    commentsEnabled: true,
    seedComments: earlComments,
    listed: true,
    hubId: "business",
    searchTerms: ["used car", "cars", "auto dealer", "dealership", "vehicle", "financing", "bad credit", "buy here pay here", "hatchback", "convertible", "station wagon", "Honest Earl"],
    render: () => `
      <main class="page earl-page">
        <header class="earl-header"><div><small>YOUR NEIGHBOR IN AUTOMOTIVE FRIENDSHIP</small><h1>HONEST <span>EARL'S</span></h1><b>BUDGET MOTORS</b></div><strong>✓ HONEST PRICES<br>✓ HONEST CARS<br>✓ HONEST!</strong></header>
        <nav class="earl-nav"><button data-nav="${EARL_URL}">HOME, NEIGHBOR</button><button data-nav="web://honestearl.com/inventory">HONEST INVENTORY</button><button data-nav="${CAL_URL}">KING CAL FACT CHECK</button></nav>
        <div class="earl-alert">WHY PAY FOR CAL'S CROWN? &nbsp; HONEST EARL BEATS ANY LEGIBLE OFFER BY ONE WHOLE DOLLAR!</div>
        <section class="earl-hero">
          <div>${dealerAsset("earl-owner", "Honest Earl in a white sport coat giving two thumbs up beside a yellow hatchback")}<span>THAT'S<br>HONEST EARL!</span></div>
          <div><p>EARL'S PERSONAL PROMISE #1</p><h2>I LOOK YOU<br>IN THE EYE<br><em>BEFORE I CHECK<br>YOUR CREDIT.</em></h2><p>No banks. No judgment. Just a neighbor, a calculator, and up to 180 manageable weekly opportunities to prove yourself.</p><button data-nav="web://honestearl.com/inventory">SHAKE HANDS WITH A DEAL &gt;</button><small>Handshake is ceremonial and does not modify the retail installment contract.</small></div>
        </section>
        <section class="earl-special">
          ${dealerAsset("earl-hatchback", "A tired yellow 1989 compact hatchback with balloons")}
          <div><span>EARL'S FRIEND-MAKER</span><h2>1989 SUNNYBEE</h2><p>164,000 miles · economical size · yellow paint visible from most angles</p><strong>$79<small>/WEEK</small></strong><b>$1,495 DOWN · 180 WEEKS</b><mark>TOTAL: $15,715 BEFORE TAXES &amp; FEES</mark></div>
        </section>
        <aside class="earl-vs-cal"><b>KING CAL FACT CHECK:</b><p>Cal wears a crown because a warranty wouldn't fit on his head. His “Royal Preparation” is Earl's garden hose with a more expensive name.</p><button data-nav="${CAL_URL}">INSPECT CAL'S ROYAL NONSENSE</button></aside>
        <div class="earl-fine-print">All vehicles sold AS IS unless the written Buyers Guide says otherwise. Add tax, title, $245 Friendship Filing, and mandatory $349 WeatherFriend undercoat. 26.5% illustrative APR. First payment due before the temporary tag cools.</div>
        <p class="business-owner">Leave Earl a friendly note. King Cal has already left several unfriendly ones.</p>
        <footer>Honest Earl's Budget Motors · 1401 County Line Road · Honest side of the street · We stay open one minute later than Cal</footer>
      </main>`
  },
  "web://honestearl.com/inventory": {
    url: "web://honestearl.com/inventory",
    title: "Honest Earl's Honest Inventory & Friendly Financing",
    site: "earl",
    ownerId: "honest_earl",
    summary: "Honest Earl lists a hatchback, convertible, and station wagon with very long weekly financing, mandatory friendship fees, and as-is disclosures.",
    listed: true,
    hubId: "business",
    searchTerms: ["used car inventory", "used hatchback", "used convertible", "used station wagon", "weekly car payment", "26.5 APR", "as is car"],
    render: () => `
      <main class="page earl-page earl-inventory-page">
        <header class="earl-header"><div><small>YOUR NEIGHBOR IN AUTOMOTIVE FRIENDSHIP</small><h1>HONEST <span>EARL'S</span></h1><b>HONEST INVENTORY</b></div><strong>EVERY PRICE<br>HAS A NUMBER!</strong></header>
        <nav class="earl-nav"><button data-nav="${EARL_URL}">HOME, NEIGHBOR</button></nav>
        <section class="earl-inventory-grid">
          <article>${dealerAsset("earl-hatchback", "The yellow SunnyBee used hatchback")}<h2>1989 SUNNYBEE</h2><p>164,000 mi · automatic · compact outside · surprisingly expansive payment schedule</p><strong>$1,495 DOWN<br>+ $79/WK × 180</strong><b>$15,715 + TAX &amp; FEES</b></article>
          <article>${dealerAsset("earl-convertible", "A faded white Breeze convertible with a cloudy roof")}<h2>1991 BREEZE CONVERTIBLE</h2><p>118,000 mi · top included · cooling system encourages open-air driving · three matching hubcaps</p><strong>$2,000 DOWN<br>+ $129/WK × 156</strong><b>$22,124 + TAX &amp; FEES</b></article>
          <article>${dealerAsset("earl-wagon", "A brown woodgrain Family Estate station wagon")}<h2>1987 FAMILY ESTATE</h2><p>176,000 mi · simulated woodgrain included · rear suspension pre-relaxed · third row emotionally available</p><strong>$6,995 CASH</strong><b>FRIENDLY FINANCING AVAILABLE</b></article>
        </section>
        <section class="earl-finance">${dealerAsset("earl-office", "Honest Earl shaking hands in his cramped finance office")}<div><h2>A FRIENDLY LITTLE CONTRACT</h2><dl><div><dt>Illustrative APR</dt><dd>26.5%</dd></div><div><dt>Friendship Filing</dt><dd>$245</dd></div><div><dt>WeatherFriend undercoat</dt><dd>$349 mandatory</dd></div><div><dt>Independent inspection</dt><dd>Encouraged before signing</dd></div></dl><p>Read the Buyers Guide and get promises in writing. Earl's handshake is warm, sincere, and legally decorative.</p></div></section>
        <button class="console-return" data-nav="${EARL_URL}">&lt;&lt; BACK HOME, NEIGHBOR</button>
        <footer>Inventory subject to prior sale, later repossession, and Cal peering through the fence.</footer>
      </main>`
  }
};
