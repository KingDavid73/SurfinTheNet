import type { PageComment, PageDefinition } from "./types";

const YESTERDAY_URL = "web://orbitnet.local/zones/yesterday";
const ROADHOG_URL = "web://yesterday.zone/users/roadhogron/home";
const DOT_OLD_URL = "web://yesterday.zone/users/grandmadot/1997";
const DOT_URL = "web://yesterday.zone/users/grandmadot/home";
const HAL_URL = "web://yesterday.zone/users/colonelhal/home";
const LENNY_URL = "web://yesterday.zone/users/railroadlenny/home";
const BOB_URL = "web://yesterday.zone/users/bigbassbob/home";

const YESTERDAY_ASSETS = {
  roadHog: new URL("../assets/images/yesterday/photos/road-hog-ron.png", import.meta.url).href,
  dotComputer: new URL("../assets/images/yesterday/photos/dot-computer.png", import.meta.url).href,
  dotRecipes: new URL("../assets/images/yesterday/photos/dot-recipes.png", import.meta.url).href,
  colonelHal: new URL("../assets/images/yesterday/photos/colonel-hal.png", import.meta.url).href,
  railroadLenny: new URL("../assets/images/yesterday/photos/railroad-lenny.png", import.meta.url).href,
  bassBob: new URL("../assets/images/yesterday/photos/bass-bob.png", import.meta.url).href,
  construction: new URL("../assets/images/yesterday/gifs/under-construction.gif", import.meta.url).href,
  skull: new URL("../assets/images/yesterday/gifs/flaming-skull.gif", import.meta.url).href,
  motorcycle: new URL("../assets/images/yesterday/gifs/motorcycle.gif", import.meta.url).href,
  email: new URL("../assets/images/yesterday/gifs/email-mailbox.gif", import.meta.url).href,
  flag: new URL("../assets/images/yesterday/gifs/american-flag.gif", import.meta.url).href,
  fishing: new URL("../assets/images/yesterday/gifs/drop-a-line.gif", import.meta.url).href,
  train: new URL("../assets/images/yesterday/gifs/steam-train.gif", import.meta.url).href,
  angel: new URL("../assets/images/yesterday/gifs/angel-cloud.gif", import.meta.url).href,
  welcome: new URL("../assets/images/yesterday/gifs/welcome-banner.gif", import.meta.url).href
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

export const yesterdayMembers = [
  {
    url: ROADHOG_URL,
    handle: "RoadHog_Ron",
    title: "RON'S IRON HORSE HOMEPAGE",
    description: "One suburban Harley, six flaming skulls, strong opinions about chrome, and a ride calendar mostly involving diners.",
    interest: "MOTORCYCLES",
    className: "roadhog"
  },
  {
    url: DOT_OLD_URL,
    handle: "GrandmaDot (old?)",
    title: "WELCOME TO DOTS FAMILY WEB PAGE",
    description: "A partly broken 1997 family page containing recipes, missing grandchildren, six font sizes, and no known password.",
    interest: "FAMILY & RECIPES",
    className: "dot-old"
  },
  {
    url: DOT_URL,
    handle: "Grandma_Dot",
    title: "Dot's NEW Internet Home!!",
    description: "Grandma Dot starts over after forgetting how to change her first homepage. Both sites are definitely hers.",
    interest: "FAMILY & RECIPES",
    className: "dot-new"
  },
  {
    url: HAL_URL,
    handle: "Col_Hal_1863",
    title: "Colonel Hal's History & Family Tree",
    description: "Reenactment photographs, genealogy binders, flag etiquette, disputed ancestors, and several solemn animated eagles.",
    interest: "HISTORY & GENEALOGY",
    className: "hal"
  },
  {
    url: LENNY_URL,
    handle: "Railroad_Lenny",
    title: "Lenny's Basement Rail Empire",
    description: "Model-railroad wiring diagrams, real train sightings, basement timetables, and the slowest loading depot on OrbitNet.",
    interest: "TRAINS",
    className: "lenny"
  },
  {
    url: BOB_URL,
    handle: "BigBass_Bob",
    title: "Bob's Fishing Hole & Joke List",
    description: "Fishing reports, grill advice, forwarded jokes, weather wisdom, and an open invitation to drop him an electronic line.",
    interest: "FISHING & JOKES",
    className: "bob"
  }
] as const;

const roadHogComments: PageComment[] = [
  seed("ron-bob-1", ROADHOG_URL, "road_hog_ron", "visitor", "BigBass_Bob", "That motorcycle has seen more pancake houses than state lines.", "1999-11-01T18:42:00"),
  seed("ron-owner-1", ROADHOG_URL, "road_hog_ron", "owner", "RoadHog_Ron", "A good rider knows where breakfast is, Bob. Chrome doesn't polish itself on an empty stomach.", "1999-11-01T18:56:00"),
  seed("ron-hal-1", ROADHOG_URL, "road_hog_ron", "visitor", "Col_Hal_1863", "Your flag bandanna is displayed backward in photograph two. I have mailed a diagram.", "1999-11-02T09:11:00"),
  seed("ron-lenny-1", ROADHOG_URL, "road_hog_ron", "visitor", "Railroad_Lenny", "Motorcycles are acceptable transportation to a train show provided the muffler is respected.", "1999-11-02T20:03:00"),
  seed("ron-dot-1", ROADHOG_URL, "road_hog_ron", "visitor", "Grandma_Dot", "Ronald your skull is on fire. Is that supposed to happen? Love Dot", "1999-11-03T08:27:00"),
  seed("ron-owner-2", ROADHOG_URL, "road_hog_ron", "owner", "RoadHog_Ron", "It's an ANIMATED GRAPHIC, Dot. Nobody's skull is currently on fire.", "1999-11-03T08:41:00")
];

const dotComments: PageComment[] = [
  seed("dot-bob-1", DOT_URL, "grandma_dot", "visitor", "BigBass_Bob", "New page came through fine, Dot. Recipe text is pink on my machine but I can squint.", "1999-11-01T15:13:00"),
  seed("dot-owner-1", DOT_URL, "grandma_dot", "owner", "Grandma_Dot", "Thank you Bob. It is supposed to be dark red. I will ask Kevin when he visits Sunday.", "1999-11-01T15:28:00"),
  seed("dot-ron-1", DOT_URL, "grandma_dot", "visitor", "RoadHog_Ron", "Your old page still comes up first when I search for pie.", "1999-11-02T08:50:00"),
  seed("dot-owner-2", DOT_URL, "grandma_dot", "owner", "Grandma_Dot", "I KNOW RONALD. I cannot get inside it. Please use this new one.", "1999-11-02T09:02:00"),
  seed("dot-mel-1", DOT_URL, "grandma_dot", "visitor", "MossMunch_Mel", "The lemon square recipe works! I used fogberry-colored sugar, by which I mean purple sprinkles.", "1999-11-03T17:14:00"),
  seed("dot-lenny-1", DOT_URL, "grandma_dot", "visitor", "Railroad_Lenny", "Bookmark updated. Your missing photograph boxes lend the old page a certain mystery.", "1999-11-03T18:20:00")
];

const halComments: PageComment[] = [
  seed("hal-lenny-1", HAL_URL, "colonel_hal", "visitor", "Railroad_Lenny", "Your 1863 rail map correctly shows the old junction. Most modern reproductions move it half a mile.", "1999-11-01T19:02:00"),
  seed("hal-owner-1", HAL_URL, "colonel_hal", "owner", "Col_Hal_1863", "Excellent eye, Leonard. Primary sources remain undefeated.", "1999-11-01T19:16:00"),
  seed("hal-ron-1", HAL_URL, "colonel_hal", "visitor", "RoadHog_Ron", "Pretty sure my great-great uncle rode with somebody important. Mom had a picture.", "1999-11-02T10:44:00"),
  seed("hal-owner-2", HAL_URL, "colonel_hal", "owner", "Col_Hal_1863", "A photograph is a beginning, Ron, not a citation. Bring it Thursday.", "1999-11-02T11:05:00"),
  seed("hal-dot-1", HAL_URL, "colonel_hal", "visitor", "Grandma_Dot", "Harold I have the blue family binder if you need it. It is under the telephone.", "1999-11-03T08:12:00"),
  seed("hal-dex-1", HAL_URL, "colonel_hal", "visitor", "CodeDex", "The guestbook counter advanced by 40 overnight. Was the regiment newsletter linked somewhere?", "1999-11-03T20:26:00")
];

const lennyComments: PageComment[] = [
  seed("lenny-hal-1", LENNY_URL, "railroad_lenny", "visitor", "Col_Hal_1863", "Your depot roof is 1870s slate on an 1892 plan. Otherwise superb.", "1999-11-01T20:08:00"),
  seed("lenny-owner-1", LENNY_URL, "railroad_lenny", "owner", "Railroad_Lenny", "The slate was on sale, Hal. My basement operates under a flexible historical charter.", "1999-11-01T20:19:00"),
  seed("lenny-bob-1", LENNY_URL, "railroad_lenny", "visitor", "BigBass_Bob", "Can the little train carry a bowl of pretzels around the room?", "1999-11-02T17:09:00"),
  seed("lenny-owner-2", LENNY_URL, "railroad_lenny", "owner", "Railroad_Lenny", "It CAN. It WILL NOT. Freight schedules are already crowded.", "1999-11-02T17:17:00"),
  seed("lenny-ron-1", LENNY_URL, "railroad_lenny", "visitor", "RoadHog_Ron", "Need more flames on the locomotive.", "1999-11-03T18:02:00"),
  seed("lenny-dot-1", LENNY_URL, "railroad_lenny", "visitor", "Grandma_Dot", "The little houses are lovely. Do the little people go to church?", "1999-11-03T18:24:00")
];

const bobComments: PageComment[] = [
  seed("bob-ron-1", BOB_URL, "big_bass_bob", "visitor", "RoadHog_Ron", "That fish gets smaller every time you tell the story.", "1999-11-01T17:33:00"),
  seed("bob-owner-1", BOB_URL, "big_bass_bob", "owner", "BigBass_Bob", "Camera adds distance. Scale is accurate. Witnesses were present.", "1999-11-01T17:48:00"),
  seed("bob-dot-1", BOB_URL, "big_bass_bob", "visitor", "Grandma_Dot", "I emailed your joke to Carol and she said she already got it from Carol.", "1999-11-02T08:41:00"),
  seed("bob-hal-1", BOB_URL, "big_bass_bob", "visitor", "Col_Hal_1863", "The quotation attributed to Benjamin Franklin is from a 1987 novelty calendar.", "1999-11-02T09:06:00"),
  seed("bob-owner-2", BOB_URL, "big_bass_bob", "owner", "BigBass_Bob", "Still good advice.", "1999-11-02T09:14:00"),
  seed("bob-lenny-1", BOB_URL, "big_bass_bob", "visitor", "Railroad_Lenny", "Lake temperature report appreciated. North Shore rail bridge visible from marker 7.", "1999-11-03T19:20:00")
];

export const yesterdayPages: Record<string, PageDefinition> = {
  [ROADHOG_URL]: {
    url: ROADHOG_URL,
    title: "RON'S IRON HORSE HOMEPAGE",
    site: "oldbiker",
    ownerId: "road_hog_ron",
    summary: "RoadHog Ron's flame-covered suburban motorcycle homepage has skull GIFs, Harley maintenance notes, diner ride reports, and strong opinions about chrome.",
    commentsEnabled: true,
    seedComments: roadHogComments,
    listed: true,
    hubId: "zone-yesterday",
    searchTerms: ["RoadHog Ron", "motorcycle", "Harley", "biker", "flames", "skulls", "chrome", "Iron Horse"],
    render: () => `
      <main class="page yesterday-page roadhog-page">
        <marquee scrollamount="7">🔥 WELCOME TO RON'S IRON HORSE HOMEPAGE 🔥 LOUD PIPES SAVE LIVES 🔥 UPDATED WHENEVER SHARON LETS ME USE THE PHONE LINE 🔥</marquee>
        <nav><button data-nav="${YESTERDAY_URL}">[ Yesterday Online ]</button><a href="#hog">MY HOG</a><a href="#rides">RIDE LOG</a><a href="#wisdom">ROAD WISDOM</a></nav>
        <header><img src="${YESTERDAY_ASSETS.skull}" alt="Animated flaming skull"><div><h1>ROAD<em>HOG</em> RON</h1><p>WELCOME TO MY CYBER GARAGE</p></div><img src="${YESTERDAY_ASSETS.skull}" alt=""></header>
        <section class="roadhog-intro" id="hog">
          <img class="yesterday-photo" src="${YESTERDAY_ASSETS.roadHog}" alt="Ron beside his touring motorcycle in a suburban driveway">
          <div><h2>That's me and BLACK BETTY</h2><p>1994 Harley-Davidson® Ultra Classic. 11,208 miles. AM/FM cassette. Enough chrome to signal aircraft.</p><p>I am a FULL PATCH MEMBER of the <b>WEEKEND THUNDER RIDERS</b>. We ride every other Saturday, weather permitting, usually to Marcy's Country Skillet.</p><img class="old-gif motorcycle-gif" src="${YESTERDAY_ASSETS.motorcycle}" alt="Animated motorcycle"></div>
        </section>
        <table class="roadhog-table" id="rides"><caption>1999 RIDE LOG</caption><tbody><tr><th>APR 17</th><td>Marcy's Skillet</td><td>18 miles</td><td>DENVER OMELET</td></tr><tr><th>MAY 08</th><td>County Line Gas</td><td>31 miles</td><td>RAIN (LIGHT)</td></tr><tr><th>JUL 03</th><td>Patriot Fun Run</td><td>44 miles</td><td>NEW BANDANNA</td></tr><tr><th>OCT 16</th><td>Steve's Garage</td><td>6 miles</td><td>BATTERY ISSUE</td></tr></tbody></table>
        <section class="roadhog-wisdom" id="wisdom"><h2 class="old-blink">RON'S RULES OF THE ROAD</h2><ol><li>Respect the machine.</li><li>Respect the road.</li><li>Never pay dealer price for a cup holder.</li><li>If you cannot hear the bike, the bike cannot hear you.</li></ol><blockquote>“It's not the destination. It's the parking spot where everyone can see your bike.”</blockquote></section>
        <p class="old-counter">You are ROAD WARRIOR # 000883</p>
        <img class="old-gif construction-gif" src="${YESTERDAY_ASSETS.construction}" alt="Under construction">
        <p class="fandom-owner-note">SIGN THE ROAD LOG BELOW. NO RICE ROCKET ARGUMENTS.</p>
      </main>`
  },
  [DOT_OLD_URL]: {
    url: DOT_OLD_URL,
    title: "WELCOME TO DOTS FAMILY WEB PAGE",
    site: "grandmaold",
    ownerId: "grandma_dot",
    summary: "Grandma Dot's abandoned and badly broken 1997 homepage still contains recipes, missing family photographs, default links, and an obsolete email address.",
    listed: true,
    hubId: "zone-yesterday",
    searchTerms: ["Grandma Dot old page", "family web page", "recipes", "broken images", "1997", "grandchildren"],
    render: () => `
      <main class="page yesterday-page dot-old-page">
        <center>
          <img src="${YESTERDAY_ASSETS.welcome}" alt="Welcome banner">
          <font color="#0000ff" size="7"><b>WELCOME TO DOTS FAMILY WEB PAGE</b></font>
          <marquee bgcolor="#ffff00" width="73%">HELLO FAMILY AND FRIENDS ON THE WORLD WIDE WEB!!!!!!</marquee>
          <p><font size="5" color="#ff00ff">This is my first WEB SITE please be patient</font></p>
          <table border="4" cellpadding="8" bgcolor="#ccffff"><tbody><tr><td valign="top">
            <font size="4"><b>MY PAGES</b></font><br><a href="#family">FAMILY</a><br><a href="#recipes">RECIPIES</a><br><a href="#angels">ANGELS</a><br><a href="#links">LINKS LINKS</a><br><a href="#notworking">CLICK HERE</a><br><br><img src="${YESTERDAY_ASSETS.email}" alt="Animated email mailbox"><br><u>Email Me</u>
          </td><td>
            <h2 id="family">THE FAMILY</h2>
            <img class="broken-old-image" src="./grandkids-final2-good.jpg" alt="Picture of all the grandchildren should be here"><img class="broken-old-image tall" src="./florida-trip.bmp" alt="Our trip to Florida">
            <p>This is all my grandchildren except Kevin who was at BAND and Lisa who does not like her picture on computers.</p>
            <hr width="48%"><h1 id="recipes"><font color="red">DOT'S FAMOUS RECEPIES</font></h1>
            <p align="left"><b>LEMON SQUARES:</b> 1 box lemon cake mix, one egg, butter (I will put the rest here later)</p>
            <p align="right"><b>HAM SURPRISE:</b> The surprise is pineapple!!!</p>
            <img src="${YESTERDAY_ASSETS.angel}" alt="Animated angel on a cloud"><h2 id="angels">MY ANGEL PAGE</h2>
          </td></tr></tbody></table>
          <br><img src="${YESTERDAY_ASSETS.construction}" alt="Under construction">
          <p><font size="2">LAST CHANGED 4/17/97 by Dot and Kevin</font></p>
          <p><a data-nav="${DOT_URL}">Is this Dot's new page? click this blue writing</a></p>
          <button data-nav="${YESTERDAY_URL}">BACK TO YESTERDAY ONLINE</button>
        </center>
      </main>`
  },
  [DOT_URL]: {
    url: DOT_URL,
    title: "Dot's NEW Internet Home!!",
    site: "grandmanew",
    ownerId: "grandma_dot",
    summary: "Grandma Dot's second homepage explains that she made a new site because she forgot how to edit the old one, alongside working recipe text and mostly working photographs.",
    commentsEnabled: true,
    seedComments: dotComments,
    listed: true,
    hubId: "zone-yesterday",
    searchTerms: ["Grandma Dot new page", "family recipes", "lemon squares", "forgot password", "old page", "grandmother"],
    render: () => `
      <main class="page yesterday-page dot-new-page">
        <nav><button data-nav="${YESTERDAY_URL}">Back to Yesterday Online</button> | <button data-nav="${DOT_OLD_URL}">My OLD Page</button></nav>
        <marquee behavior="alternate" scrollamount="3">🌹 Welcome Friends and Family 🌹 This is Dot's NEW Page 🌹 Please Change Your Book Mark 🌹</marquee>
        <header><img src="${YESTERDAY_ASSETS.angel}" alt="Animated angel"><div><h1>Dot's NEW Internet Home!!</h1><p>Made with Web Wizard and help from Kevin</p></div><img src="${YESTERDAY_ASSETS.angel}" alt=""></header>
        <section class="dot-important">
          <h2>IMPORTANT INTERNET NOTICE — November 2, 1999</h2>
          <p>I had to make this new page because I could not remember how to edit my <button data-nav="${DOT_OLD_URL}">old page</button> and the computer keeps asking for a name I used in 1997. The old page and this page are <b>BOTH ME</b>. Please tell everybody at church.</p>
        </section>
        <section class="dot-new-intro"><img class="yesterday-photo" src="${YESTERDAY_ASSETS.dotComputer}" alt="Dot beside her beige home computer"><div><h2>Hello From Dot</h2><p>I am a wife, mother of three, grandmother of seven and now a <b>WEB MISTRESS</b>. I enjoy recipes, angels, family news, day trips, and using the mouse correctly on the first try.</p><p class="old-blink">NEW: Carol's email address works now!</p></div></section>
        <section class="dot-recipe"><img class="yesterday-photo" src="${YESTERDAY_ASSETS.dotRecipes}" alt="Dot showing her family recipe binder"><div><h2>The complete lemon squares</h2><p>1 box lemon cake mix<br>1 egg<br>1 stick butter<br>powder sugar on top</p><p>Mix it until it looks right. Bake at 350 until done. This is the whole recipe that was missing on the other page.</p></div></section>
        <table class="dot-news"><caption>FAMILY NEWS</caption><tbody><tr><td>Kevin</td><td>Fixed the printer but now it is loud.</td></tr><tr><td>Lisa</td><td>Still does not want her photograph on computers.</td></tr><tr><td>Carol</td><td>Sent an email to herself by mistake.</td></tr></tbody></table>
        <p class="old-counter">You are nice visitor number 000119</p>
        <p class="fandom-owner-note">Please leave a polite note below. I print all of them.</p>
      </main>`
  },
  [HAL_URL]: {
    url: HAL_URL,
    title: "Colonel Hal's History & Family Tree",
    site: "oldhistory",
    ownerId: "colonel_hal",
    summary: "Colonel Hal's solemn personal archive combines Civil War reenactment, genealogy, flag etiquette, scanned family documents, and vigorously disputed ancestors.",
    commentsEnabled: true,
    seedComments: halComments,
    listed: true,
    hubId: "zone-yesterday",
    searchTerms: ["Colonel Hal", "Civil War reenactment", "genealogy", "family tree", "history", "1863", "flag"],
    render: () => `
      <main class="page yesterday-page colonel-hal-page">
        <marquee class="hal-marquee" scrolldelay="80">★ PRESERVING YESTERDAY WITH THE TECHNOLOGY OF TOMORROW ★ PLEASE STAND FOR THE ANIMATED FLAG ★</marquee>
        <header><img src="${YESTERDAY_ASSETS.flag}" alt="Animated American flag"><div><h1>COLONEL HAL'S</h1><h2>HISTORY &amp; FAMILY TREE ARCHIVE</h2><p>Facts are our inheritance.</p></div><img src="${YESTERDAY_ASSETS.flag}" alt=""></header>
        <nav><button data-nav="${YESTERDAY_URL}">Yesterday Online</button><a href="#service">SERVICE</a><a href="#tree">GENEALOGY</a><a href="#rules">FLAG RULES</a></nav>
        <section class="hal-intro" id="service"><img class="yesterday-photo" src="${YESTERDAY_ASSETS.colonelHal}" alt="Hal in a Civil War reenactment uniform beside genealogy binders"><div><h2>A word from “Colonel” Hal Mercer</h2><p>The quotation marks are required because my reenactment unit elected me quartermaster, not colonel. My grandson selected the web name before this distinction was explained.</p><p>This site documents the Mercer, Bell, Pfaff and possibly Tillinghast lines, plus the 14th Briar County Volunteer Living History Society.</p></div></section>
        <section class="hal-tree" id="tree"><h2>THE MERCER LINE (PROVISIONAL)</h2><pre>Edmund? Mercer (1818–1881)
      |
  Thomas Mercer (1844–1907) —— Ada Bell
      |
  [THREE BINDERS CURRENTLY DISAGREE]
      |
  Harold Mercer (that's me)</pre><p><b>Research notice:</b> Owning a sword does not establish cavalry service. Ronald has been informed.</p></section>
        <section class="hal-rules" id="rules"><h2>INTERNET FLAG ETIQUETTE</h2><p>1. Do not stretch the flag graphic.<br>2. Do not place novelty cursors over the flag.<br>3. An animated flag does not require lowering at sunset.<br>4. Cite your sources, including Aunt Marge.</p></section>
        <p class="hal-counter">ARCHIVE VISITOR 000617 · LAST MUSTER 11/03/99</p>
        <p class="fandom-owner-note">Submit family names, document dates, and corrections below. Family legends are not documents.</p>
      </main>`
  },
  [LENNY_URL]: {
    url: LENNY_URL,
    title: "Lenny's Basement Rail Empire",
    site: "oldtrains",
    ownerId: "railroad_lenny",
    summary: "Railroad Lenny's slow-loading basement empire contains a model railroad, train sightings, wiring notes, a timetable, and arguments over miniature freight priorities.",
    commentsEnabled: true,
    seedComments: lennyComments,
    listed: true,
    hubId: "zone-yesterday",
    searchTerms: ["Railroad Lenny", "model trains", "railroad", "locomotive", "basement layout", "timetable", "railfan"],
    render: () => `
      <main class="page yesterday-page lenny-page">
        <table class="lenny-shell"><tbody><tr><td colspan="2" class="lenny-banner"><marquee direction="right" scrollamount="4"><img src="${YESTERDAY_ASSETS.train}" alt="Animated steam train"> NOW ARRIVING AT LENNY CENTRAL <img src="${YESTERDAY_ASSETS.train}" alt=""></marquee></td></tr><tr><td class="lenny-menu"><b>STATION MENU</b><a href="#layout">THE LAYOUT</a><a href="#schedule">TIMETABLE</a><a href="#sightings">SIGHTINGS</a><a href="#wiring">WIRING</a><button data-nav="${YESTERDAY_URL}">ZONE DEPOT</button><span class="old-blink">● SIGNAL CLEAR</span></td><td class="lenny-content">
          <h1>LENNY'S BASEMENT RAIL EMPIRE</h1><p class="lenny-subtitle">Serving the entire southwest corner of my basement since 1984</p>
          <section class="lenny-intro" id="layout"><img class="yesterday-photo" src="${YESTERDAY_ASSETS.railroadLenny}" alt="Lenny kneeling beside his elaborate basement model railroad"><div><h2>Welcome aboard</h2><p>Four scale miles of main line. Eleven powered switches. Two towns. One mountain made from approximately nine Sunday newspapers.</p><p>The C&NW freight has right-of-way. The passenger loop has right-of-way when grandchildren are present.</p></div></section>
          <table class="lenny-timetable" id="schedule"><caption>LENNY CENTRAL MASTER TIMETABLE</caption><tbody><tr><th>TRAIN</th><th>DEPARTS</th><th>STATUS</th></tr><tr><td>#7 Morning Limited</td><td>7:15 PM</td><td>ON TIME</td></tr><tr><td>#12 Pretzel Freight</td><td>NOT AUTHORIZED</td><td>BOB</td></tr><tr><td>#44 Coal Drag</td><td>8:05 PM</td><td>TRANSFORMER WARM</td></tr></tbody></table>
          <section class="lenny-sighting" id="sightings"><h2>REAL TRAIN SIGHTING LOG</h2><p>10/27 — Two orange diesels, westbound, 4:18 PM.<br>10/31 — Maintenance truck. Waved.<br>11/02 — Heard horn at 9:44 PM. Sharon says this does not count.</p></section>
          <p class="old-counter">Passengers through this depot: 001204</p>
          <p class="fandom-owner-note">Dispatch model questions, prototype corrections, and confirmed horn times below.</p>
        </td></tr></tbody></table>
      </main>`
  },
  [BOB_URL]: {
    url: BOB_URL,
    title: "Bob's Fishing Hole & Joke List",
    site: "oldfishing",
    ownerId: "big_bass_bob",
    summary: "Big Bass Bob's personal fishing page combines lake reports, grill temperatures, forwarded workplace jokes, weather folklore, and an animated invitation to email him.",
    commentsEnabled: true,
    seedComments: bobComments,
    listed: true,
    hubId: "zone-yesterday",
    searchTerms: ["Big Bass Bob", "fishing", "largemouth bass", "lake", "boat", "grill", "email jokes", "weather"],
    render: () => `
      <main class="page yesterday-page bob-page">
        <marquee bgcolor="#003399" direction="left">~~~~ WELCOME TO BOB'S FISHING HOLE ~~~~ THE FISH ARE ALWAYS BITING SOMEWHERE ~~~~</marquee>
        <header><h1><small>&gt;&lt;(((°&gt;</small> Big Bass Bob's <small>&lt;°)))&gt;&lt;</small></h1><h2>FISHING HOLE &amp; ELECTRONIC JOKE LIST</h2><button data-nav="${YESTERDAY_URL}">Paddle back to Yesterday Online</button></header>
        <section class="bob-intro"><img class="yesterday-photo" src="${YESTERDAY_ASSETS.bassBob}" alt="Bob holding a largemouth bass beside his small fishing boat"><div><h2>THE ONE THAT DID NOT GET AWAY</h2><p>Lake Mercer, June 1998. Official length: respectable. Official weight: the scale was in the other tackle box.</p><p>I fish for bass, walleye, perch, and peace and quiet. I release most fish and all unsolicited computer advice.</p></div></section>
        <div class="bob-columns"><section><h2>BOB'S LAKE REPORT</h2><table border="2"><tbody><tr><th>SPOT</th><th>BAIT</th><th>VERDICT</th></tr><tr><td>North reeds</td><td>green worm</td><td>promising</td></tr><tr><td>Rail bridge</td><td>spinner</td><td>snag city</td></tr><tr><td>Boat launch</td><td>coffee</td><td>good conversation</td></tr></tbody></table><h3>GRILL RULE</h3><p>Fish is done when it flakes. Burgers are done when Linda says they are.</p></section>
        <aside><h2 class="old-blink">JOKE OF THE WEEK</h2><p><b>Q:</b> Why did the computer go fishing?</p><p><b>A:</b> It wanted to improve its net working!</p><p><small>Forwarded by Gary at the plant. If this joke belongs to somebody else please tell Gary.</small></p><img src="${YESTERDAY_ASSETS.email}" alt="Animated email mailbox"></aside></div>
        <section class="bob-email"><img src="${YESTERDAY_ASSETS.fishing}" alt="Animated fishing invitation"><div><h2>DROP ME A LINE</h2><p>Questions, clean jokes and verified lake temperatures welcome. Do not send attachments larger than one photograph.</p></div></section>
        <p class="old-counter">Anglers online now: 1 · Total bites: 000742</p>
        <p class="fandom-owner-note">Leave fishing reports and family-safe jokes below. Exaggeration within reason.</p>
      </main>`
  }
};
