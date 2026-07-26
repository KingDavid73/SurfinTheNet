import type { GameState, PageComment, PageDefinition } from "./types";
import {
  BYTE_BARN_FAN_HUB_URL,
  PHASE_TWO_BYTE_BARN_COVERS
} from "./byte-barn-revival";

const newcomerArt = {
  "keesha-portrait": new URL("../assets/images/phase2-newcomers/keesha-portrait.png", import.meta.url).href,
  "keesha-commercial-tv": new URL("../assets/images/phase2-newcomers/keesha-commercial-tv.png", import.meta.url).href,
  "keesha-tape-shelf": new URL("../assets/images/phase2-newcomers/keesha-tape-shelf.png", import.meta.url).href,
  "keesha-crown-sign": new URL("../assets/images/phase2-newcomers/keesha-crown-sign.png", import.meta.url).href,
  "keesha-desk": new URL("../assets/images/phase2-newcomers/keesha-desk.png", import.meta.url).href,
  "ben-portrait": new URL("../assets/images/phase2-newcomers/ben-portrait.png", import.meta.url).href,
  "ben-speaker-pc": new URL("../assets/images/phase2-newcomers/ben-speaker-pc.png", import.meta.url).href,
  "ben-cassette-dub": new URL("../assets/images/phase2-newcomers/ben-cassette-dub.png", import.meta.url).href,
  "ben-store-flyer": new URL("../assets/images/phase2-newcomers/ben-store-flyer.png", import.meta.url).href,
  "ben-family-desk": new URL("../assets/images/phase2-newcomers/ben-family-desk.png", import.meta.url).href,
  "lily-portrait": new URL("../assets/images/phase2-newcomers/lily-portrait.png", import.meta.url).href,
  "lily-url-binder": new URL("../assets/images/phase2-newcomers/lily-url-binder.png", import.meta.url).href,
  "lily-weird-crt": new URL("../assets/images/phase2-newcomers/lily-weird-crt.png", import.meta.url).href,
  "lily-library-pc": new URL("../assets/images/phase2-newcomers/lily-library-pc.png", import.meta.url).href,
  "lily-field-notebook": new URL("../assets/images/phase2-newcomers/lily-field-notebook.png", import.meta.url).href,
  "rayna-portrait": new URL("../assets/images/phase2-newcomers/rayna-portrait.png", import.meta.url).href,
  "rayna-modem": new URL("../assets/images/phase2-newcomers/rayna-modem.png", import.meta.url).href,
  "rayna-web-diary": new URL("../assets/images/phase2-newcomers/rayna-web-diary.png", import.meta.url).href,
  "rayna-computer-nook": new URL("../assets/images/phase2-newcomers/rayna-computer-nook.png", import.meta.url).href,
  "rayna-first-tower": new URL("../assets/images/phase2-newcomers/rayna-first-tower.png", import.meta.url).href,
  "zack-portrait": new URL("../assets/images/phase2-newcomers/zack-portrait.png", import.meta.url).href,
  "zack-scanner": new URL("../assets/images/phase2-newcomers/zack-scanner.png", import.meta.url).href,
  "zack-vhs-stack": new URL("../assets/images/phase2-newcomers/zack-vhs-stack.png", import.meta.url).href,
  "zack-page-thumbnails": new URL("../assets/images/phase2-newcomers/zack-page-thumbnails.png", import.meta.url).href,
  "zack-floppy-binder": new URL("../assets/images/phase2-newcomers/zack-floppy-binder.png", import.meta.url).href,
  "cal-car-crown": new URL("../assets/images/phase2-newcomers/cal-car-crown.png", import.meta.url).href,
  "cal-dub-tape": new URL("../assets/images/phase2-newcomers/cal-dub-tape.png", import.meta.url).href,
  "cal-soldout-cd": new URL("../assets/images/phase2-newcomers/cal-soldout-cd.png", import.meta.url).href,
  "cal-fan-badge": new URL("../assets/images/phase2-newcomers/cal-fan-badge.png", import.meta.url).href,
  "cal-crt": new URL("../assets/images/dealer-web/cal-commercials/cal-commercial-1996.png", import.meta.url).href,
  "byte-barn-sticker": new URL("../assets/images/phase2-newcomers/byte-barn-sticker.png", import.meta.url).href,
  "byte-waveform": new URL("../assets/images/phase2-newcomers/byte-waveform.png", import.meta.url).href,
  "byte-barn-doodle": new URL("../assets/images/phase2-newcomers/byte-barn-doodle.png", import.meta.url).href,
  "byte-flyer": new URL("../assets/images/phase2-newcomers/byte-flyer.png", import.meta.url).href,
  "byte-speaker-pc": new URL("../assets/images/phase2-newcomers/byte-speaker-pc.png", import.meta.url).href,
  "weird-gem-cavern": new URL("../assets/images/phase2-newcomers/weird-gem-cavern.png", import.meta.url).href,
  "weird-purple-mascot": new URL("../assets/images/phase2-newcomers/weird-purple-mascot.png", import.meta.url).href,
  "weird-radio-tower": new URL("../assets/images/phase2-newcomers/weird-radio-tower.png", import.meta.url).href,
  "weird-pet-page": new URL("../assets/images/phase2-newcomers/weird-pet-page.png", import.meta.url).href,
  "weird-deep-pit": new URL("../assets/images/phase2-newcomers/weird-deep-pit.png", import.meta.url).href,
  "new-satellite": new URL("../assets/images/phase2-newcomers/new-satellite.png", import.meta.url).href,
  "new-globe": new URL("../assets/images/phase2-newcomers/new-globe.png", import.meta.url).href,
  "new-mailbox": new URL("../assets/images/phase2-newcomers/new-mailbox.png", import.meta.url).href,
  "new-construction-modem": new URL("../assets/images/phase2-newcomers/new-construction-modem.png", import.meta.url).href,
  "new-monitor-ring": new URL("../assets/images/phase2-newcomers/new-monitor-ring.png", import.meta.url).href,
  "newbie-zone": new URL("../assets/images/phase2-newcomers/newbie-zone.png", import.meta.url).href,
  "keesha-badge": new URL("../assets/images/phase2-newcomers/keesha-badge.png", import.meta.url).href,
  "ben-badge": new URL("../assets/images/phase2-newcomers/ben-badge.png", import.meta.url).href,
  "lily-badge": new URL("../assets/images/phase2-newcomers/lily-badge.png", import.meta.url).href,
  "zack-badge": new URL("../assets/images/phase2-newcomers/zack-badge.png", import.meta.url).href
} as const;

const oddityArt = {
  "pulse-box-right": new URL("../assets/images/phase2-oddities/pulse-box-right.png", import.meta.url).href,
  "pulse-box-left": new URL("../assets/images/phase2-oddities/pulse-box-left.png", import.meta.url).href,
  "pulse-controller-badge": new URL("../assets/images/phase2-oddities/pulse-controller-badge.png", import.meta.url).href,
  "pulse-sketch": new URL("../assets/images/phase2-oddities/pulse-sketch.png", import.meta.url).href,
  "curb-night": new URL("../assets/images/phase2-oddities/curb-night.png", import.meta.url).href,
  "curb-recorder": new URL("../assets/images/phase2-oddities/curb-recorder.png", import.meta.url).href,
  "curb-utility": new URL("../assets/images/phase2-oddities/curb-utility.png", import.meta.url).href,
  "curb-chalk": new URL("../assets/images/phase2-oddities/curb-chalk.png", import.meta.url).href,
  "panther-silhouette": new URL("../assets/images/phase2-oddities/panther-silhouette.png", import.meta.url).href,
  "panther-tracks": new URL("../assets/images/phase2-oddities/panther-tracks.png", import.meta.url).href,
  "panther-eyes": new URL("../assets/images/phase2-oddities/panther-eyes.png", import.meta.url).href,
  "panther-normal-cat": new URL("../assets/images/phase2-oddities/panther-normal-cat.png", import.meta.url).href,
  "moth-pale": new URL("../assets/images/phase2-oddities/moth-pale.png", import.meta.url).href,
  "moth-leaves": new URL("../assets/images/phase2-oddities/moth-leaves.png", import.meta.url).href,
  "moth-modem": new URL("../assets/images/phase2-oddities/moth-modem.png", import.meta.url).href,
  "moth-specimen": new URL("../assets/images/phase2-oddities/moth-specimen.png", import.meta.url).href,
  "knocker-ripples": new URL("../assets/images/phase2-oddities/knocker-ripples.png", import.meta.url).href,
  "knocker-log": new URL("../assets/images/phase2-oddities/knocker-log.png", import.meta.url).href,
  "knocker-dock": new URL("../assets/images/phase2-oddities/knocker-dock.png", import.meta.url).href,
  "knocker-stump": new URL("../assets/images/phase2-oddities/knocker-stump.png", import.meta.url).href,
  "blipzo-crt": new URL("../assets/images/phase2-oddities/blipzo-crt.png", import.meta.url).href,
  "blipzo-plush": new URL("../assets/images/phase2-oddities/blipzo-plush.png", import.meta.url).href,
  "blipzo-magazine": new URL("../assets/images/phase2-oddities/blipzo-magazine.png", import.meta.url).href,
  "blipzo-drawing": new URL("../assets/images/phase2-oddities/blipzo-drawing.png", import.meta.url).href
} as const;

const image = (source: string, alt: string) => `<img src="${source}" alt="${alt}">`;
const seed = (
  id: string,
  pageUrl: string,
  ownerId: string,
  role: PageComment["role"],
  author: string,
  text: string,
  createdAt: string
): PageComment => ({ id, pageUrl, ownerId, role, author, text, createdAt, revealAfterVisit: 0 });

export const NEWCOMER_ZONE_BUTTON = newcomerArt["newbie-zone"];
export const BYTE_BARN_FAN_HUB_MEMBER = {
  ownerId: "barnbeat_ben",
  handle: "BarnBeat_Ben",
  title: "The Byte Barn Beat Exchange",
  description: "Every community cover of the retired computer-store jingle, plus arguments about the crooked clap and who remembers the original commercial.",
  fandom: "BYTE BARN JINGLE",
  className: "bytebarn",
  url: BYTE_BARN_FAN_HUB_URL,
  button: newcomerArt["ben-badge"]
} as const;

export const newcomerMembers = [
  {
    ownerId: "tapedeck_keesha",
    handle: "TapeDeck_Keesha",
    displayName: "Keesha",
    title: "The Unofficial Kingdom Tape Vault",
    description: "Commercial tapes, favorite King Cal rhymes, homemade crown art, and proof that a terrible deal can still have a great chorus.",
    url: "web://freshorbit.zone/users/tapedeckkeesha/home",
    button: newcomerArt["keesha-badge"]
  },
  {
    ownerId: "barnbeat_ben",
    handle: "BarnBeat_Ben",
    displayName: "Ben",
    title: "BYTE BARN BEAT BARN",
    description: "A fan page for the computer-store jingle Ben taped off television because the hook is completely phat.",
    url: "web://freshorbit.zone/users/barnbeatben/home",
    button: newcomerArt["ben-badge"]
  },
  {
    ownerId: "linklily_99",
    handle: "LinkLily_99",
    displayName: "Lily",
    title: "Lily's Weird Web Field Trip",
    description: "Printed addresses, page reviews, broken links, and the strangest corners Lily has found since joining Orbit.",
    url: "web://freshorbit.zone/users/linklily/home",
    button: newcomerArt["lily-badge"]
  },
  {
    ownerId: "rookie_rayna",
    handle: "Rookie_Rayna",
    displayName: "Rayna",
    title: "Rayna's First Week Online",
    description: "A first-computer diary about dial-up noises, new neighbors, and why everybody suddenly seems to be investigating something.",
    url: "web://freshorbit.zone/users/rookierayna/home",
    button: newcomerArt["new-satellite"]
  },
  {
    ownerId: "rerun_zack",
    handle: "Rerun_Zack",
    displayName: "Zack",
    title: "Zack's Page About Pages",
    description: "Scanned VHS labels, screenshots of old sites, and reviews of homepages that are more interesting when half broken.",
    url: "web://freshorbit.zone/users/rerunzack/home",
    button: newcomerArt["zack-badge"]
  }
] as const;

export const NEWCOMER_OWNERS: Record<string, { screenName: string; displayName: string }> =
  Object.fromEntries(newcomerMembers.map((member) => [
    member.ownerId,
    {
      screenName: member.handle,
      displayName: member.displayName
    }
  ]));

export const NEWCOMER_HOME_URLS: Record<string, string> =
  Object.fromEntries(newcomerMembers.map((member) => [member.ownerId, member.url]));

const KEESHA_URL = newcomerMembers[0].url;
const BEN_URL = newcomerMembers[1].url;
const LILY_URL = newcomerMembers[2].url;
const RAYNA_URL = newcomerMembers[3].url;
const ZACK_URL = newcomerMembers[4].url;

export const newcomerPages: Record<string, PageDefinition> = {
  [KEESHA_URL]: {
    url: KEESHA_URL,
    title: "The Unofficial Kingdom Tape Vault",
    site: "newcalfan",
    ownerId: "tapedeck_keesha",
    summary: "Keesha's newcomer fan shrine preserves King Cal commercial tapes, handmade crown graphics, and rankings of his silliest local-car-dealer songs.",
    commentsEnabled: true,
    listed: true,
    minimumPhase: 2,
    hubId: "zone-newcomers",
    searchTerms: ["newcomer", "king cal fan", "commercial tapes", "car dealer songs", "local celebrity", "cassette"],
    seedComments: [
      seed("new-keesha-cal", KEESHA_URL, "tapedeck_keesha", "visitor", "KingCalCars", "Keesha, you found the old Crown Vic tape! The Kingdom salutes a true royal archivist.", "1999-11-04T08:16:00"),
      seed("new-keesha-earl", KEESHA_URL, "tapedeck_keesha", "visitor", "Honest_Earl", "A catchy rhyme does not lower the interest rate. I admit the 1992 hook is difficult to forget.", "1999-11-04T08:41:00"),
      seed("new-keesha-ben", KEESHA_URL, "tapedeck_keesha", "visitor", "BarnBeat_Ben", "Track four is all that and a bag of chips. I need a dub after the Byte Barn tape.", "1999-11-04T09:02:00")
    ],
    render: () => `
      <main class="page newcomer-page newcomer-keesha">
        <header><img src="${newcomerArt["keesha-badge"]}" alt=""><div><small>NEW TO ORBIT // OLD TO THE KINGDOM</small><h1>THE UNOFFICIAL KINGDOM TAPE VAULT</h1><p>maintained by TapeDeck_Keesha</p></div></header>
        <marquee>♛ BAD CARS! GOOD HOOKS! PLEASE REWIND! ♛</marquee>
        <section class="newcomer-intro">
          ${image(newcomerArt["keesha-portrait"], "A scanned flash portrait of Keesha")}
          <div><h2>Why does this exist?</h2><p>My cousin sent me an Orbit address because people here were talking about old King Cal commercials. I have been taping those things since I was eleven. The deals are highway robbery, the jackets are undefeated, and half the songs have no business being that catchy.</p><p>This is a fan archive, not financial advice. Do not buy a car because the chorus rhymes <i>payment</i> with <i>entertainment</i>.</p><button data-nav="web://kingcalscars.biz/home">VISIT THE ACTUAL KINGDOM</button></div>
        </section>
        <section class="keesha-tape-wall">
          <h2>THE CROWN SHELF</h2>
          <figure>${image(newcomerArt["cal-dub-tape"], "A homemade King Cal commercial compilation cassette")}<figcaption>TAPE 1 — commercials recorded over a school concert</figcaption></figure>
          <figure>${image(newcomerArt["cal-soldout-cd"], "A homemade mock-up of the sold-out King Cal greatest hits disc")}<figcaption>THE CD — sold out before I even joined this place</figcaption></figure>
          <figure>${image(newcomerArt["cal-crt"], "A CRT screen grab from an old King Cal commercial")}<figcaption>THE VELVET ERA — bold suit, questionable sedan</figcaption></figure>
          <figure>${image(newcomerArt["keesha-commercial-tv"], "Keesha watching an old car commercial on television")}<figcaption>research position / do not block television</figcaption></figure>
        </section>
        <aside class="newcomer-rating"><b>KEESHA'S CURRENT TOP THREE</b><ol><li>“Everybody Rides” — impossible not to sing</li><li>“Royalty on Wheels” — strongest fake trumpet</li><li>the warning song — honestly kind of strange</li></ol></aside>
      </main>`
  },
  [BEN_URL]: {
    url: BEN_URL,
    title: "Byte Barn Beat Barn",
    site: "newbytefan",
    ownerId: "barnbeat_ben",
    summary: "Ben's exuberant newcomer page celebrates Byte Barn's television jingle, cheap speakers, and the computer store that accidentally made his favorite song.",
    commentsEnabled: true,
    listed: true,
    minimumPhase: 2,
    hubId: "zone-newcomers",
    searchTerms: ["newcomer", "byte barn fan", "computer store jingle", "phat song", "commercial music", "speakers"],
    seedComments: [
      seed("new-ben-chip", BEN_URL, "barnbeat_ben", "visitor", "Chip_At_ByteBarn", "The jingle was recorded in Lou's garage for fifty dollars and a refurbished sound card. I will tell him it has a fan page.", "1999-11-04T08:25:00"),
      seed("new-ben-keesha", BEN_URL, "barnbeat_ben", "visitor", "TapeDeck_Keesha", "The hook is phat. The store clap at the end is off beat. Both facts make it better.", "1999-11-04T08:47:00"),
      seed("new-ben-maddy", BEN_URL, "barnbeat_ben", "visitor", "ModKit_Maddy", "The kick drum is clipping through a consumer limiter. Compliment.", "1999-11-04T09:11:00"),
      seed("new-ben-simon", BEN_URL, "barnbeat_ben", "visitor", "SubBass_Simon", "Does anybody have a clean copy of the store clap? I have an idea and very little sampler memory.", "1999-11-04T10:06:00"),
      seed("new-ben-rico", BEN_URL, "barnbeat_ben", "visitor", "RhymeTape_Rico", "Byte it, boot it, bring it to the barn already has a meter. Somebody was going to flip this sooner or later.", "1999-11-04T10:19:00")
    ],
    render: () => `
      <main class="page newcomer-page newcomer-ben">
        <header><img src="${newcomerArt["ben-badge"]}" alt=""><div><h1>BYTE BARN<br><em>BEAT BARN</em></h1><p>THE JINGLE IS PHAT. THERE, I SAID IT.</p></div></header>
        <section class="ben-equalizer">${image(newcomerArt["byte-waveform"], "A colorful homemade waveform graphic")}<div><b>♫ BYTE IT / BOOT IT / BRING IT TO THE BARN ♫</b><span>unofficial transcription from television — probably wrong</span></div></section>
        <section class="newcomer-intro">
          ${image(newcomerArt["ben-portrait"], "A scanned flash portrait of Ben")}
          <div><h2>How I got here</h2><p>Somebody at school printed RhymeTape_Rico's weird-page listening guide, so naturally I used my entire evening finding the Byte Barn ad. It has not been on television in years, but the old store page still serves the full song. That beat is da bomb. The little keyboard stab after “bring it to the barn” could move units by itself.</p><p>I do not work there. My family computer came from a grocery-store raffle and sounds like a vacuum cleaner. If you make a cover, leave the Byte Barn slogan intact so everybody knows where this started.</p><button data-nav="web://bytebarn.com/home">GO TO BYTE BARN</button></div>
        </section>
        <section class="ben-gear-grid">
          <figure>${image(newcomerArt["byte-barn-sticker"], "A homemade computer and barn sticker")}<figcaption>my first web sticker</figcaption></figure>
          <figure>${image(newcomerArt["ben-speaker-pc"], "Ben's beige computer and speakers")}<figcaption>listening station / speakers at maximum fuzz</figcaption></figure>
          <figure>${image(newcomerArt["ben-cassette-dub"], "Ben dubbing the computer-store jingle onto cassette")}<figcaption>mix tape position 03</figcaption></figure>
          <figure>${image(newcomerArt["byte-flyer"], "A crooked scan of a computer-store flyer")}<figcaption>the ad where I found the phone number</figcaption></figure>
        </section>
        <div class="ben-verdict">FINAL VERDICT: ALL THAT + 1 BAG OF CHIPS</div>
      </main>`
  },
  [BYTE_BARN_FAN_HUB_URL]: {
    url: BYTE_BARN_FAN_HUB_URL,
    title: "The Byte Barn Beat Exchange",
    site: "newbytefan",
    ownerId: "barnbeat_ben",
    summary: "A phase-two FanVerse club catalogs every community-made Byte Barn jingle cover and remix while old viewers and first-time listeners compare memories.",
    commentsEnabled: true,
    listed: true,
    minimumPhase: 2,
    hubId: "zone-fanverse",
    searchTerms: ["byte barn fan club", "byte barn remixes", "byte barn covers", "commercial jingle", "barnflip", "beat exchange"],
    seedComments: [
      seed("barn-hub-chip", BYTE_BARN_FAN_HUB_URL, "barnbeat_ben", "visitor", "Chip_At_ByteBarn", "For the record: Lou recorded the original in his garage for fifty dollars. I had not heard it in years until this page appeared.", "1999-11-05T12:18:00"),
      seed("barn-hub-keesha", BYTE_BARN_FAN_HUB_URL, "barnbeat_ben", "visitor", "TapeDeck_Keesha", "OH MAN, I remember this! It ran after the Saturday movie almost every week. The crooked clap is exactly how I remember it.", "1999-11-05T12:44:00"),
      seed("barn-hub-rayna", BYTE_BARN_FAN_HUB_URL, "barnbeat_ben", "visitor", "Rookie_Rayna", "I never heard the commercial before Orbit. Is everybody nostalgic for the store or just for the song? Either way the spooky one rules.", "1999-11-05T13:09:00"),
      seed("barn-hub-rico", BYTE_BARN_FAN_HUB_URL, "barnbeat_ben", "visitor", "RhymeTape_Rico", "It started with one retired ad hiding on an old store mirror. Now kids outside Orbit are trading dubs at the rec center. That is a scene.", "1999-11-05T15:31:00"),
      seed("barn-hub-simon", BYTE_BARN_FAN_HUB_URL, "barnbeat_ben", "visitor", "SubBass_Simon", "People from two local music boards asked for the clean clap. They cannot even open Orbit without the bridge emulator, so I mailed a tape.", "1999-11-06T00:02:00"),
      seed("barn-hub-steph", BYTE_BARN_FAN_HUB_URL, "barnbeat_ben", "visitor", "StarLine_Steph", "my cousin heard it from a friend who heard it from somebody HERE. now her quartet has a version and three girls at school put it on their pages. this is officially a thing.", "1999-11-06T17:24:00"),
      seed("barn-hub-cass", BYTE_BARN_FAN_HUB_URL, "barnbeat_ben", "visitor", "CountryCass_88", "Half the open-mic room remembered the ad and half swore it never aired here. Everybody sang the barn line by the second chorus.", "1999-11-07T11:14:00")
    ],
    render: () => {
      const uploads = PHASE_TWO_BYTE_BARN_COVERS.filter((placement) => placement.kind !== "favorite");
      return `
        <main class="page byte-barn-fan-hub">
          <header>
            <img src="${newcomerArt["ben-badge"]}" alt="Ben's homemade Byte Barn badge">
            <div><small>FANVERSE CLUB // STARTED BY BARNBEAT_BEN</small><h1>THE BYTE BARN<br><em>BEAT EXCHANGE</em></h1><p>one old commercial + too many blank tapes = a scene</p></div>
          </header>
          <marquee scrollamount="4">*** NEW COVERS ARRIVING FROM OUTSIDE ORBIT *** DUB YOUR FAVORITE *** TAG IT [[BARNFLIP]] *** KEEP THE CROOKED CLAP ***</marquee>
          <section class="barn-hub-origin">
            ${image(newcomerArt["byte-barn-sticker"], "A homemade Byte Barn computer-and-barn sticker")}
            <div><small>HOW THIS GOT OUT</small><h2>Somebody told a friend. Their friend told a band.</h2>
              <p>Rico found Byte Barn's retired television jingle still playing on the store's stale Orbit page. Ben built a shrine. Then the mystery crowd arrived, carried the address back to school, record shops, rec-center shows, and regular web boards, and people who could barely get the Orbit bridge working started mailing each other tape dubs.</p>
              <p>Some locals remember the commercial instantly. Others swear it never aired where they lived. Everybody agrees the little keyboard stab is impossible to remove from your head.</p>
              <button data-song-nav="${BYTE_BARN_FAN_HUB_URL}" data-song-file="byte-barn-deal.mp3">PLAY THE ORIGINAL JINGLE</button>
              <button data-nav="web://bytebarn.com/home">VISIT THE OLD STORE PAGE</button>
            </div>
          </section>
          <section class="barn-hub-rule"><b>THE EXCHANGE RULE</b><span>If you make a version, keep the slogan somewhere in it. If you only love somebody else's version, put that one on your page too. Repeats are the point.</span></section>
          <section class="barn-hub-track-list">
            <header><div><small>LOCAL + COMMUNITY AUDIO</small><h2>${uploads.length} COVERS / REMIXES SO FAR</h2></div><span>updated whenever somebody sends Ben a filename</span></header>
            ${uploads.map((placement, index) => `<article>
              <b>${String(index + 1).padStart(2, "0")}</b>
              <div><h3>${placement.track.label}</h3><p>${placement.note}</p><span>posted by ${placement.uploader}</span></div>
              <button data-song-nav="${BYTE_BARN_FAN_HUB_URL}" data-song-file="${placement.track.file}">TUNE ORBITAMP &rsaquo;</button>
            </article>`).join("")}
          </section>
          <section class="barn-hub-share-board">
            <div>${image(newcomerArt["ben-cassette-dub"], "A homemade cassette dub of Byte Barn covers")}<b>FAVORITE-COVER TAPE CHAIN</b></div>
            <p>You do not have to make a remix to join in. Link your favorite from your homepage, trade a cassette, or tell somebody outside Orbit how to reach the exchange. Seeing the same version on three pages means it is winning.</p>
            <button data-nav="${BEN_URL}">MEET BEN / SEE THE ORIGINAL SHRINE</button>
          </section>
        </main>`;
    }
  },
  [LILY_URL]: {
    url: LILY_URL,
    title: "Lily's Weird Web Field Trip",
    site: "newlinklily",
    ownerId: "linklily_99",
    summary: "Lily reviews the strangest Orbit pages she can find and keeps a paper binder of addresses in case the directory changes again.",
    commentsEnabled: true,
    listed: true,
    minimumPhase: 2,
    hubId: "zone-newcomers",
    searchTerms: ["newcomer", "weird pages", "links", "site reviews", "printed urls", "web field trip"],
    seedComments: [
      seed("new-lily-dot", LILY_URL, "linklily_99", "visitor", "DeepDelver_Dot", "The Gemwell pit is not endless. It is merely longer than good judgment.", "1999-11-04T09:08:00"),
      seed("new-lily-trent", LILY_URL, "linklily_99", "visitor", "BlipzoBeliever_88", "Thank you for recognizing Store 00 as a major cultural destination.", "1999-11-04T09:32:00"),
      seed("new-lily-mira", LILY_URL, "linklily_99", "visitor", "Mira_917", "Printing addresses sounds excessive until one vanishes. Keep the binder.", "1999-11-04T09:55:00")
    ],
    render: () => `
      <main class="page newcomer-page newcomer-lily">
        <header><div class="lily-orbit">${image(newcomerArt["new-globe"], "A sparkling homemade globe graphic")}</div><div><small>FIELD NOTES FROM A NEW ARRIVAL</small><h1>Lily's Weird Web Field Trip</h1><p>if a page makes me say “why,” it goes in the binder</p></div></header>
        <section class="lily-desk">
          ${image(newcomerArt["lily-portrait"], "A scanned flash portrait of Lily")}
          ${image(newcomerArt["lily-url-binder"], "Lily's binder of printed web addresses")}
          <div><h2>Current route</h2><p>I heard Orbit was busy again, then discovered “busy” mostly means six people arguing about a purple mall creature and somebody building a webpage that takes ten minutes to reach the bottom.</p><p>I print every address because the directory feels like it changes when I am not looking. That is probably the dial-up talking.</p></div>
        </section>
        <section class="lily-review-board">
          <article>${image(newcomerArt["weird-gem-cavern"], "A glowing gemstone cavern webpage")}<div><b>GEMWELL DESCENT</b><span>beautiful, excessive, possibly measured in miles</span><button data-nav="web://fanverse.zone/users/deepdelverdot/home">VISIT</button></div></article>
          <article>${image(newcomerArt["weird-purple-mascot"], "A fuzzy purple mascot shrine")}<div><b>THE BLIPZO ARCHIVE</b><span>strong commitment to a game I cannot prove was sold</span><button data-nav="web://fanverse.zone/users/blipzobeliever88/home">VISIT</button></div></article>
          <article>${image(newcomerArt["weird-radio-tower"], "A moonlit radio-tower webpage")}<div><b>NIGHT SIGNAL</b><span>the only page here that owns a reliable clock</span><button data-nav="web://nightsignal.net/home">VISIT</button></div></article>
          <article>${image(newcomerArt["weird-pet-page"], "A colorful pet homepage")}<div><b>PET PLANET</b><span>the safest possible exit from the rabbit holes</span><button data-nav="web://orbitnet.local/zones/petplanet">VISIT</button></div></article>
        </section>
      </main>`
  },
  [RAYNA_URL]: {
    url: RAYNA_URL,
    title: "Rayna's First Week Online",
    site: "newrookierayna",
    ownerId: "rookie_rayna",
    summary: "Rayna documents learning her first home computer, joining Orbit during its unexpected revival, and meeting a community already deep in rumor fever.",
    commentsEnabled: true,
    listed: true,
    minimumPhase: 2,
    hubId: "zone-newcomers",
    searchTerms: ["newcomer", "first computer", "first week online", "dial up diary", "orbit revival"],
    seedComments: [
      seed("new-rayna-juniper", RAYNA_URL, "rookie_rayna", "visitor", "Juniper_Gdn", "Welcome! The modem sound stops being alarming eventually. Then it becomes alarming when you do not hear it.", "1999-11-04T08:58:00"),
      seed("new-rayna-ray", RAYNA_URL, "rookie_rayna", "visitor", "FetchQuest_Ray", "Pet Planet is a good first stop. Ignore any hamster diagrams marked experimental.", "1999-11-04T09:17:00"),
      seed("new-rayna-zack", RAYNA_URL, "rookie_rayna", "visitor", "Rerun_Zack", "You joined on the exact night everything got weird. Great timing.", "1999-11-04T09:44:00")
    ],
    render: () => `
      <main class="page newcomer-page newcomer-rayna">
        <header>${image(newcomerArt["new-satellite"], "A sparkling homemade satellite")}<div><h1>RAYNA'S FIRST WEEK ONLINE</h1><p>DAY 2: I HAVE ALREADY FORGOTTEN THREE PASSWORDS</p></div></header>
        <section class="rayna-entry">
          <div class="rayna-polaroids">${image(newcomerArt["rayna-portrait"], "A scanned flash portrait of Rayna")}${image(newcomerArt["rayna-first-tower"], "Rayna proudly posing with her first computer tower")}</div>
          <article><h2>November 4, 1999</h2><p>My aunt gave us her old computer, Ben sent me this address, and now I have a homepage. Yesterday I thought a “guestbook” was something at a wedding. Today three strangers have opinions about my modem.</p><p>Everybody says Orbit was nearly empty a month ago. It does not feel empty now. There is a whole new zone for people who arrived this week, and every old user is making a page about a logo they remember differently or a noise behind a convenience store.</p><p>I like it here. I am also going to bed before somebody explains numbers stations to me again.</p></article>
        </section>
        <section class="rayna-lessons"><h2>THINGS I LEARNED</h2><ul><li>Write down the address before clicking away.</li><li>The computer is not broken while the modem screams.</li><li>Do not ask Game Grid which console is best.</li><li>Everybody here has at least one theory.</li></ul>${image(newcomerArt["rayna-modem"], "Rayna connecting cables to a beige modem")}</section>
      </main>`
  },
  [ZACK_URL]: {
    url: ZACK_URL,
    title: "Zack's Page About Pages",
    site: "newzackrerun",
    ownerId: "rerun_zack",
    summary: "Zack scans tapes and collects screenshots of strange, broken, or abandoned Orbit pages because old web debris is more interesting than polished sites.",
    commentsEnabled: true,
    listed: true,
    minimumPhase: 2,
    hubId: "zone-newcomers",
    searchTerms: ["newcomer", "old websites", "broken pages", "scans", "vhs", "web archaeology", "page screenshots"],
    seedComments: [
      seed("new-zack-lenny", ZACK_URL, "rerun_zack", "visitor", "Railroad_Lenny", "A broken photograph may still preserve the caption. Save both.", "1999-11-04T09:21:00"),
      seed("new-zack-lily", ZACK_URL, "rerun_zack", "visitor", "LinkLily_99", "I have addresses if you have screenshots. We should trade indexes.", "1999-11-04T09:39:00"),
      seed("new-zack-raven", ZACK_URL, "rerun_zack", "visitor", "xX_DarkRaven_Xx", "Old debris is evidence. Label timestamps. Never trust the directory.", "1999-11-04T10:03:00")
    ],
    render: () => `
      <main class="page newcomer-page newcomer-zack">
        <header>${image(newcomerArt["zack-badge"], "A homemade scanner and VHS emblem")}<div><h1>ZACK'S PAGE ABOUT PAGES</h1><p>screenshots // tape labels // abandoned buttons // dead counters</p></div></header>
        <section class="zack-workbench">
          ${image(newcomerArt["zack-portrait"], "A scanned flash portrait of Zack")}
          <div><h2>Web archaeology, sort of</h2><p>My cousin told me Orbit had become interesting again. She meant the conspiracy stuff. I stayed because half the network looks like somebody left a bedroom exactly as it was, except the bedroom is a webpage and some of the furniture says FILE NOT FOUND.</p><p>I am scanning whatever I can before people “fix” it. Broken is information.</p></div>
          ${image(newcomerArt["new-construction-modem"], "A homemade construction cone and modem graphic")}
        </section>
        <section class="zack-scan-strip">
          <figure>${image(newcomerArt["zack-scanner"], "Zack using a flatbed scanner")}<figcaption>scanner acquired from school surplus</figcaption></figure>
          <figure>${image(newcomerArt["zack-vhs-stack"], "A stack of old VHS tapes")}<figcaption>local-commercial tapes from Keesha</figcaption></figure>
          <figure>${image(newcomerArt["zack-page-thumbnails"], "A CRT showing many tiny homepage screenshots")}<figcaption>pages queued for capture</figcaption></figure>
          <figure>${image(newcomerArt["zack-floppy-binder"], "A binder of labeled floppy disks")}<figcaption>one page per disk because I enjoy suffering</figcaption></figure>
        </section>
        <aside class="zack-rule"><b>THE RULE:</b> save the ugly version first. You can make it pretty after you know what disappeared.</aside>
      </main>`
  }
};

export interface PhaseTwoPersonalUpdate {
  homeUrl: string;
  url: string;
  ownerId: string;
  title: string;
  teaser: string;
}

export const phaseTwoPersonalUpdates: readonly PhaseTwoPersonalUpdate[] = [
  {
    homeUrl: "web://gamegrid.zone/users/lagmaster99/home",
    url: "web://gamegrid.zone/users/lagmaster99/comet-logo",
    ownerId: "lagmaster_99",
    title: "THE COMET POINTED LEFT",
    teaser: "LagMaster compares PULSE/NET boxes and discovers that memory has terrible quality control."
  },
  {
    homeUrl: "web://xtreme.zone/users/deckwreckerdee/home",
    url: "web://xtreme.zone/users/deckwreckerdee/curb-hum",
    ownerId: "deckwrecker_dee",
    title: "THE CURB THAT HUMS",
    teaser: "Dee records a midnight vibration under the skate spot. It is probably electrical. Probably."
  },
  {
    homeUrl: "web://petplanet.zone/users/catnapcarla/home",
    url: "web://petplanet.zone/users/catnapcarla/porch-panther",
    ownerId: "catnap_carla",
    title: "THE BELLWATER PORCH PANTHER",
    teaser: "Carla documents an enormous neighborhood shadow that is increasingly likely to be somebody's cat."
  },
  {
    homeUrl: "web://rainbow.gdn/home",
    url: "web://rainbow.gdn/moonseed-moth",
    ownerId: "juniper_gdn",
    title: "The Moonseed Moth",
    teaser: "Juniper wonders whether a pale garden moth appears when her dial-up modem connects."
  },
  {
    homeUrl: "web://yesterday.zone/users/bigbassbob/home",
    url: "web://yesterday.zone/users/bigbassbob/lake-knocker",
    ownerId: "big_bass_bob",
    title: "LAKE KNOCKER EVIDENCE",
    teaser: "Bob investigates mysterious dock knocks, circular ripples, and an unusually photogenic stump."
  },
  {
    homeUrl: "web://fanverse.zone/users/blipzobeliever88/home",
    url: "web://fanverse.zone/users/blipzobeliever88/cap-stripe",
    ownerId: "blipzo_believer_88",
    title: "BLIPZO'S MISSING CAP STRIPE",
    teaser: "Trent compares tapes, plush toys, and fan art to settle a mascot-detail memory nobody else had."
  }
] as const;

const personalUpdateByHomeUrl = new Map(phaseTwoPersonalUpdates.map((update) => [update.homeUrl, update]));

export function phaseTwoPersonalUpdateLink(pageUrl: string, state: GameState) {
  if (state.storyPhase < 2) return "";
  const update = personalUpdateByHomeUrl.get(pageUrl);
  if (!update) return "";
  return `<aside class="phase-two-personal-update">
    <span>NEW PAGE // NOVEMBER 4</span>
    <div><b>${update.title}</b><p>${update.teaser}</p></div>
    <button data-nav="${update.url}">READ THE THEORY &gt;</button>
  </aside>`;
}

function oddityGallery(items: Array<[string, string]>) {
  return `<div class="oddity-gallery">${items.map(([source, alt]) => image(source, alt)).join("")}</div>`;
}

export const phaseTwoOddityPages: Record<string, PageDefinition> = {
  "web://gamegrid.zone/users/lagmaster99/comet-logo": {
    url: "web://gamegrid.zone/users/lagmaster99/comet-logo",
    title: "The Comet Pointed Left",
    site: "pulse",
    ownerId: "lagmaster_99",
    summary: "LagMaster's low-stakes investigation into whether the fictional PULSE/NET arrow logo once pointed the opposite direction.",
    listed: false,
    minimumPhase: 2,
    hubId: "zone-gamegrid",
    searchTerms: ["pulse net logo", "comet pointed left", "logo memory", "changed logo"],
    render: () => `
      <main class="page oddity-page oddity-pulse">
        <header><small>BREAKING MEMORY // EVIDENCE QUALITY: 42%</small><h1>THE COMET POINTED LEFT</h1><p>posted by LagMaster_99 after three people disagreed with me</p></header>
        <section><div><h2>THE CLAIM</h2><p>The purple PULSE/NET comet-arrow pointed left on the first boxes. Everybody says it always pointed right. I remember left because it aimed toward the controller ports. This is a stupid thing to fake, which makes it perfect evidence of something or perfect evidence that I need sleep.</p></div>${oddityGallery([
          [oddityArt["pulse-box-right"], "A PULSE NET box with its arrow pointing right"],
          [oddityArt["pulse-box-left"], "A PULSE NET box with its arrow pointing left"],
          [oddityArt["pulse-controller-badge"], "A blurry controller badge"],
          [oddityArt["pulse-sketch"], "LagMaster's hand-drawn memory of the logo"]
        ])}</section>
        <aside><b>UPDATE:</b> Jax says one print run was accidentally mirrored for a regional store display. This explains everything and is therefore suspiciously boring.</aside>
        <details class="oddity-breadcrumb"><summary>serial-number thing I almost ignored</summary><p>The left-pointing box repeats <code>00417</code> in three different sticker fields. Somebody called StaticAbel says the same five-digit group keeps turning up in a damaged radio transcript.</p></details>
        <button data-nav="web://gamegrid.zone/users/lagmaster99/home">&lt; BACK TO LAGMASTER</button>
      </main>`
  },
  "web://xtreme.zone/users/deckwreckerdee/curb-hum": {
    url: "web://xtreme.zone/users/deckwreckerdee/curb-hum",
    title: "The Curb That Hums",
    site: "skater",
    ownerId: "deckwrecker_dee",
    summary: "Dee documents a favorite skate curb that vibrates after midnight, probably because of a nearby utility box.",
    listed: false,
    minimumPhase: 2,
    hubId: "zone-xtreme",
    searchTerms: ["humming curb", "skate spot mystery", "night vibration", "utility box"],
    render: () => `
      <main class="page oddity-page oddity-curb">
        <header><h1>THE CURB THAT HUMS</h1><p>NO, COLE, THIS IS NOT “JUST ELECTRICITY.” I KNOW IT IS PROBABLY ELECTRICITY.</p></header>
        ${oddityGallery([
          [oddityArt["curb-night"], "The empty skate curb photographed at night"],
          [oddityArt["curb-recorder"], "A pocket cassette recorder used near the curb"],
          [oddityArt["curb-utility"], "A nearby utility cabinet"],
          [oddityArt["curb-chalk"], "Chalk marks recording where the curb vibrates"]
        ])}
        <section><h2>FIELD NOTES</h2><p>At 12:17 AM the curb makes a low B-flat and shakes enough to move a bottle cap. The utility cabinet twenty feet away also hums at B-flat. This is a coincidence according to Nico, who has never respected acoustics.</p><p>Current theory: buried cable, haunted transformer, or the city installed the world's least useful bass speaker.</p></section>
        <details class="oddity-breadcrumb"><summary>faded contractor plate</summary><p>The cabinet says <code>GLASS LAKE FIELD ANNEX // ATMOSPHERIC GROUP</code>. That sounds cooler than “utility box,” so Dee copied it down.</p></details>
        <button data-nav="web://xtreme.zone/users/deckwreckerdee/home">&lt; BACK TO DEE'S DECK</button>
      </main>`
  },
  "web://petplanet.zone/users/catnapcarla/porch-panther": {
    url: "web://petplanet.zone/users/catnapcarla/porch-panther",
    title: "The Bellwater Porch Panther",
    site: "petcat",
    ownerId: "catnap_carla",
    summary: "Carla's affectionate cryptid file about a supposedly enormous local porch cat with very ordinary paw prints.",
    listed: false,
    minimumPhase: 2,
    hubId: "zone-petplanet",
    searchTerms: ["porch panther", "bellwater cryptid", "large cat", "mystery cat"],
    render: () => `
      <main class="page oddity-page oddity-panther">
        <header><span>?</span><div><h1>THE BELLWATER PORCH PANTHER</h1><p>a CatNap_Carla neighborhood wildlife investigation</p></div></header>
        ${oddityGallery([
          [oddityArt["panther-silhouette"], "A blurry dark cat silhouette on a porch"],
          [oddityArt["panther-tracks"], "Ordinary cat paw prints on concrete"],
          [oddityArt["panther-eyes"], "Two reflective eyes in the dark"],
          [oddityArt["panther-normal-cat"], "A perfectly ordinary black cat sitting beside a porch"]
        ])}
        <section><h2>DESCRIPTION</h2><p>Witnesses describe a silent black animal “as long as a coffee table” crossing three porches after midnight. Witnesses were measuring with fear. The tracks are cat-sized and photograph four is almost certainly Pickles from number 18.</p><p>I still like the name Porch Panther, so the file remains open.</p></section>
        <details class="oddity-breadcrumb"><summary>three dots above the roof</summary><p>One old photograph also caught three pale lights over the ridge on 09/12/94. Carla thinks they are porch glare. The photo envelope says “Glass Lake?” in somebody else's handwriting.</p></details>
        <button data-nav="web://petplanet.zone/users/catnapcarla/home">&lt; RETURN TO CARLA &amp; CASSEROLE</button>
      </main>`
  },
  "web://rainbow.gdn/moonseed-moth": {
    url: "web://rainbow.gdn/moonseed-moth",
    title: "The Moonseed Moth",
    site: "rainbow",
    ownerId: "juniper_gdn",
    summary: "Juniper gently investigates whether a pale moth appears near her window whenever the dial-up modem finishes connecting.",
    listed: false,
    minimumPhase: 2,
    hubId: "zone-cozycommons",
    searchTerms: ["moonseed moth", "garden mystery", "modem moth", "pale moth"],
    render: () => `
      <main class="page oddity-page oddity-moth">
        <header><p>~ a very small mystery from Rainbow Garden ~</p><h1>The Moonseed Moth</h1></header>
        <section class="moth-paper">
          ${oddityGallery([
            [oddityArt["moth-pale"], "A pale green moth photographed against a wall"],
            [oddityArt["moth-leaves"], "Spotted garden leaves"],
            [oddityArt["moth-modem"], "Juniper's beige dial-up modem"],
            [oddityArt["moth-specimen"], "A carefully pressed moth specimen"]
          ])}
          <div><h2>Observation</h2><p>On three evenings a pale moth landed on the screen just after the modem connected. The porch light also switches on at roughly that time. Science suggests the lamp. Poetry prefers the modem singing to it from very far away.</p><p>I am recording both possibilities and harming neither moth nor metaphor.</p></div>
        </section>
        <details class="oddity-breadcrumb"><summary>note from Mira about the cassette</summary><p>The modem recording announces twelve little tone groups but only eleven appear on the tape. Mira says a radio page called Morrow Five has the same counting problem.</p></details>
        <button data-nav="web://rainbow.gdn/home">← back to the garden</button>
      </main>`
  },
  "web://yesterday.zone/users/bigbassbob/lake-knocker": {
    url: "web://yesterday.zone/users/bigbassbob/lake-knocker",
    title: "Lake Knocker Evidence",
    site: "oldfishing",
    ownerId: "big_bass_bob",
    summary: "Big Bass Bob investigates noises beneath the dock and a lake cryptid that looks increasingly like a floating log.",
    listed: false,
    minimumPhase: 2,
    hubId: "zone-yesterday",
    searchTerms: ["lake knocker", "fishing cryptid", "dock knocking", "lake monster", "bellwater lake"],
    render: () => `
      <main class="page oddity-page oddity-knocker">
        <header><small>BIG BASS BOB PRESENTS</small><h1>THE LAKE KNOCKER</h1><p>IF A STUMP CAN KNOCK THREE TIMES, I WILL APOLOGIZE TO THE STUMP</p></header>
        ${oddityGallery([
          [oddityArt["knocker-ripples"], "Circular ripples beside the dock"],
          [oddityArt["knocker-log"], "A floating log in the lake"],
          [oddityArt["knocker-dock"], "A foggy empty dock"],
          [oddityArt["knocker-stump"], "A distant dark stump in the water"]
        ])}
        <section><h2>WHAT HAPPENED</h2><p>Three knocks came from under dock two at 5:40 AM. Then something made one big circle and moved toward the reeds. Could be a monster. Could be the loose ladder and a carp. Earl says it was Cal hiding a bad trade-in.</p><p>No bait was stolen, which argues against every fish I know.</p></section>
        <details class="oddity-breadcrumb"><summary>paper wedged beneath the ladder</summary><p>A soggy county survey copy has <code>PROJECT TRESTLE</code> typed in the margin. Bob assumed it meant the dock until CedarWren asked whether the same phrase appears in the Quiet County files.</p></details>
        <button data-nav="web://yesterday.zone/users/bigbassbob/home">&lt; BACK TO BOB'S DOCK</button>
      </main>`
  },
  "web://fanverse.zone/users/blipzobeliever88/cap-stripe": {
    url: "web://fanverse.zone/users/blipzobeliever88/cap-stripe",
    title: "Blipzo's Missing Cap Stripe",
    site: "fanblipzo",
    ownerId: "blipzo_believer_88",
    summary: "Trent compares inconsistent Blipzo merchandise to prove the fictional mascot once wore a different cap stripe.",
    listed: false,
    minimumPhase: 2,
    hubId: "zone-fanverse",
    searchTerms: ["blipzo cap stripe", "mascot memory", "costume difference", "blipzo theory"],
    render: () => `
      <main class="page oddity-page oddity-blipzo">
        <header><small>CONTINUITY EMERGENCY LEVEL: PURPLE</small><h1>BLIPZO'S MISSING CAP STRIPE</h1><p>the stripe was yellow. I will accept orange under protest.</p></header>
        ${oddityGallery([
          [oddityArt["blipzo-crt"], "A VHS frame of the teal three-eyed alien mascot Blipzo wearing a pale-striped purple basket hat"],
          [oddityArt["blipzo-plush"], "A three-eyed alien Blipzo plush toy with a red-striped purple basket hat"],
          [oddityArt["blipzo-magazine"], "A magazine and manual spread showing the three-eyed alien Blipzo with inconsistent stripes on his purple basket hat"],
          [oddityArt["blipzo-drawing"], "A fan drawing from memory of alien Blipzo's orange-striped basket hat"]
        ])}
        <section><h2>THE DISCREPANCY</h2><p>Blipzo is always a three-eyed teal alien in the orange jacket. The television costume has a pale stripe across the purple basket hat. The plush has red. The mall-game manual appears yellow but may be sun-faded. This is either a pre-release costume change or four manufacturers receiving four different photocopies.</p><p>Maddy says “production inconsistency” as if that makes it less important.</p></section>
        <details class="oddity-breadcrumb"><summary>boring print clue (Dex made me add this)</summary><p>Three supposedly separate reference sheets share the same torn corner, the same misspelling of “definitely,” and an <code>OrbitPrint 3.2</code> footer. CedarWren says that exact combination matters somewhere else.</p></details>
        <button data-nav="web://fanverse.zone/users/blipzobeliever88/home">&lt; RETURN TO THE BLIPZO ARCHIVE</button>
      </main>`
  }
};
