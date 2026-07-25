import {
  BYTE_BARN_COMPILATION_TRACKS,
  BYTE_BARN_COMPILATION_URL,
  BYTE_BARN_TEASER_URL
} from "./byte-barn-revival";
import type { GameState, PageComment, PageDefinition } from "./types";

export const BYTE_BARN_CAMPAIGN_THUMB =
  new URL("../assets/images/byte-barn-forever/album-front.webp", import.meta.url).href;

const tributeAssets = {
  albumFront: BYTE_BARN_CAMPAIGN_THUMB,
  albumBack: new URL("../assets/images/byte-barn-forever/album-back.webp", import.meta.url).href,
  albumInsert: new URL("../assets/images/byte-barn-forever/album-insert.webp", import.meta.url).href,
  albumDisc: new URL("../assets/images/byte-barn-forever/album-disc.webp", import.meta.url).href,
  campaignLogo: new URL("../assets/images/byte-barn-forever/campaign-logo.webp", import.meta.url).href,
  artistBurst: new URL("../assets/images/byte-barn-forever/artist-burst.webp", import.meta.url).href,
  waveform: new URL("../assets/images/byte-barn-forever/waveform.webp", import.meta.url).href,
  stickerSheet: new URL("../assets/images/byte-barn-forever/sticker-sheet.webp", import.meta.url).href,
  campaignAd: new URL("../assets/images/byte-barn-forever/campaign-ad.webp", import.meta.url).href
} as const;

const tributeArtistPhotos: Record<string, string> = {
  "Buck Hollister & The Mile Markers": new URL("../assets/images/byte-barn-forever/buck-hollister.webp", import.meta.url).href,
  "The Apology Window": new URL("../assets/images/byte-barn-forever/apology-window.webp", import.meta.url).href,
  "Exit 14": new URL("../assets/images/byte-barn-forever/exit-14.webp", import.meta.url).href,
  "Kira Chrome": new URL("../assets/images/byte-barn-forever/kira-chrome.webp", import.meta.url).href,
  "Static Orchard": new URL("../assets/images/byte-barn-forever/static-orchard.webp", import.meta.url).href,
  "Reservoir Saints": new URL("../assets/images/byte-barn-forever/reservoir-saints.webp", import.meta.url).href,
  "Grave Receipt": new URL("../assets/images/byte-barn-forever/grave-receipt.webp", import.meta.url).href,
  "The Cart Returns": new URL("../assets/images/byte-barn-forever/cart-returns.webp", import.meta.url).href,
  "5th Exit": new URL("../assets/images/byte-barn-forever/fifth-exit.webp", import.meta.url).href,
  "Next Saturday": new URL("../assets/images/byte-barn-forever/next-saturday.webp", import.meta.url).href
};

const soundwaveMemberAssets = {
  mixtapeStack: new URL("../assets/images/soundwave-members/soundwave-mixtape-stack.webp", import.meta.url).href,
  stephPortrait: new URL("../assets/images/soundwave-members/starline-steph-portrait.webp", import.meta.url).href,
  stephScrapbook: new URL("../assets/images/soundwave-members/starline-steph-scrapbook.webp", import.meta.url).href,
  stephDanceNotes: new URL("../assets/images/soundwave-members/starline-steph-dance-notes.webp", import.meta.url).href,
  sidPortrait: new URL("../assets/images/soundwave-members/safetypin-sid-portrait.webp", import.meta.url).href,
  sidBasementShow: new URL("../assets/images/soundwave-members/safetypin-sid-basement-show.webp", import.meta.url).href,
  sidXeroxNotebook: new URL("../assets/images/soundwave-members/safetypin-sid-xerox-notebook.webp", import.meta.url).href,
  masonPortrait: new URL("../assets/images/soundwave-members/flannel-mason-portrait.webp", import.meta.url).href,
  masonFuzzFloor: new URL("../assets/images/soundwave-members/flannel-mason-fuzz-floor.webp", import.meta.url).href,
  masonTapeBox: new URL("../assets/images/soundwave-members/flannel-mason-tape-box.webp", import.meta.url).href,
  simonPortrait: new URL("../assets/images/soundwave-members/subbass-simon-portrait.webp", import.meta.url).href,
  simonSampler: new URL("../assets/images/soundwave-members/subbass-simon-sampler.webp", import.meta.url).href,
  simonRaveFlyers: new URL("../assets/images/soundwave-members/subbass-simon-rave-flyers.webp", import.meta.url).href,
  simonSpeakerBench: new URL("../assets/images/soundwave-members/subbass-simon-speaker-bench.webp", import.meta.url).href,
  cassPortrait: new URL("../assets/images/soundwave-members/country-cass-portrait.webp", import.meta.url).href,
  cassCountyStage: new URL("../assets/images/soundwave-members/country-cass-county-stage.webp", import.meta.url).href,
  cassLyricNotebook: new URL("../assets/images/soundwave-members/country-cass-lyric-notebook.webp", import.meta.url).href,
  cassOpenMic: new URL("../assets/images/soundwave-members/country-cass-open-mic.webp", import.meta.url).href,
  ricoPortrait: new URL("../assets/images/soundwave-members/rhymetape-rico-portrait.webp", import.meta.url).href,
  ricoFridgeStudio: new URL("../assets/images/soundwave-members/rhymetape-rico-fridge-studio.webp", import.meta.url).href,
  ricoTapeWall: new URL("../assets/images/soundwave-members/rhymetape-rico-tape-wall.webp", import.meta.url).href,
  ricoCipher: new URL("../assets/images/soundwave-members/rhymetape-rico-rec-center-cipher.webp", import.meta.url).href,
  ricoRhymeNotebook: new URL("../assets/images/soundwave-members/rhymetape-rico-rhyme-notebook.webp", import.meta.url).href,
  ricoCarTest: new URL("../assets/images/soundwave-members/rhymetape-rico-car-test.webp", import.meta.url).href,
  ricoWebGuide: new URL("../assets/images/soundwave-members/rhymetape-rico-web-guide.webp", import.meta.url).href,
  ricoShowArchive: new URL("../assets/images/soundwave-members/rhymetape-rico-show-archive.webp", import.meta.url).href,
  ricoByteBarnClue: new URL("../assets/images/soundwave-members/rhymetape-rico-byte-barn-clue.webp", import.meta.url).href
} as const;

const soundwavePortraitByClass: Record<string, string> = {
  boyband: soundwaveMemberAssets.stephPortrait,
  punk: soundwaveMemberAssets.sidPortrait,
  grunge: soundwaveMemberAssets.masonPortrait,
  breakbeat: soundwaveMemberAssets.simonPortrait,
  country: soundwaveMemberAssets.cassPortrait,
  rap: soundwaveMemberAssets.ricoPortrait
};

function soundPhoto(src: string, alt: string, caption: string, className = "") {
  return `<figure class="sound-member-photo ${className}"><img src="${src}" alt="${alt}"><figcaption>${caption}</figcaption></figure>`;
}

const seed = (
  id: string,
  pageUrl: string,
  ownerId: string,
  role: PageComment["role"],
  author: string,
  text: string,
  createdAt: string
): PageComment => ({ id, pageUrl, ownerId, role, author, text, createdAt, revealAfterVisit: 0 });

export const soundwaveMembers = [
  {
    ownerId: "starline_steph",
    handle: "StarLine_Steph",
    title: "Steph's 5th Exit Hotline",
    description: "Boy-band rankings, magazine clippings, dance-step diagrams, and a very serious harmony chart.",
    genre: "BOY BANDS",
    className: "boyband",
    url: "web://soundwave.zone/users/starlinesteph/home"
  },
  {
    ownerId: "safetypin_sid",
    handle: "SafetyPin_Sid",
    title: "Sid's Stapled Noise",
    description: "Basement-show reports, photocopied local-punk reviews, three chords, and no guest-list privileges.",
    genre: "PUNK",
    className: "punk",
    url: "web://soundwave.zone/users/safetypinsid/home"
  },
  {
    ownerId: "flannel_mason",
    handle: "Flannel_Mason",
    title: "Mason's Low-Ceiling Guitar Room",
    description: "Grunge tabs, fuzz-pedal settings, bootleg tape notes, and arguments about which hiss sounds best.",
    genre: "GRUNGE",
    className: "grunge",
    url: "web://soundwave.zone/users/flannelmason/home"
  },
  {
    ownerId: "subbass_simon",
    handle: "SubBass_Simon",
    title: "SIMON // BREAK THE BEAT",
    description: "Bedroom breakbeats, rave-flyer reviews, sampler experiments, and warnings about the downstairs neighbor.",
    genre: "BREAKBEAT",
    className: "breakbeat",
    url: "web://soundwave.zone/users/subbasssimon/home"
  },
  {
    ownerId: "country_cass",
    handle: "CountryCass_88",
    title: "Cass's Saturday Country Notebook",
    description: "Radio countdowns, county-fair concerts, handwritten chords, and songs tested at open-mic night.",
    genre: "COUNTRY",
    className: "country",
    url: "web://soundwave.zone/users/countrycass/home"
  },
  {
    ownerId: "rhymetape_rico",
    handle: "RhymeTape_Rico",
    title: "Rico's Rhyme & Tape Exchange",
    description: "Mixtape reviews, beat notes, local-show flyers, and verses recorded beside a humming refrigerator.",
    genre: "RAP",
    className: "rap",
    url: "web://soundwave.zone/users/rhymetaperico/home"
  }
] as const;

export const SOUNDWAVE_OWNERS: Record<string, { screenName: string; displayName: string }> =
  Object.fromEntries(soundwaveMembers.map((member) => [
    member.ownerId,
    { screenName: member.handle, displayName: member.handle.split("_").at(-1) ?? member.handle }
  ]));

export const SOUNDWAVE_HOME_URLS: Record<string, string> =
  Object.fromEntries(soundwaveMembers.map((member) => [member.ownerId, member.url]));

function pageHeader(kicker: string, title: string, handle: string) {
  return `<header class="sound-user-header"><small>${kicker}</small><h1>${title}</h1><p>maintained by ${handle}</p></header>`;
}

function returnToZone() {
  return `<footer class="sound-user-footer"><button data-nav="web://orbitnet.local/zones/soundwave">&larr; SOUNDWAVE DIRECTORY</button><span>best heard through computer speakers</span></footer>`;
}

const memberByClass = Object.fromEntries(soundwaveMembers.map((member) => [member.className, member]));

export function soundwaveDirectoryBody(state: GameState) {
  return `<section class="soundwave-member-directory member-page-directory">
    <header><img class="soundwave-directory-tapes" src="${soundwaveMemberAssets.mixtapeStack}" alt="Stack of member mixtapes and a portable cassette player"><div><small>HOME TAPES // LOCAL SHOWS // LOUD OPINIONS</small><h2>SoundWave Member Pages</h2></div><span>${soundwaveMembers.length} regulars online</span></header>
    <div>
      ${state.storyPhase >= 4 ? `<button class="soundwave-revival-card" data-nav="${BYTE_BARN_COMPILATION_URL}">
        <img src="${BYTE_BARN_CAMPAIGN_THUMB}" alt="Byte Barn Forever album cover">
        <span><small>ORBITNET FRONT-PAGE EVENT</small><strong>BYTE BARN FOREVER</strong><em>10 major artists, one tribute CD, and a one-night festival. Hear the full compilation.</em></span>
        <b>ALBUM + FESTIVAL &rsaquo;</b>
      </button>`
        : state.storyPhase >= 3 ? `<button class="soundwave-incoming-card" data-nav="${BYTE_BARN_TEASER_URL}">
          <i><span></span><b>10</b></i>
          <span><small>PAID TRANSMISSION // DETAILS WITHHELD</small><strong>SOMETHING LOUD IS COMING</strong><em>One source. Ten signals. Await final clearance.</em></span>
          <b>OPEN COUNTDOWN &rsaquo;</b>
        </button>` : ""}
      ${soundwaveMembers.map((member) => `<button class="soundwave-member-card member-${member.className}" data-nav="${member.url}">
        <i><img src="${soundwavePortraitByClass[member.className]}" alt=""></i>
        <span><strong>${member.title}</strong><small>${member.description}</small><b>${member.handle} // ${member.genre}</b></span>
        <em>LISTEN IN &rsaquo;</em>
      </button>`).join("")}
    </div>
  </section>`;
}

export const soundwavePages: Record<string, PageDefinition> = {
  [memberByClass.boyband.url]: {
    url: memberByClass.boyband.url,
    title: "Steph's 5th Exit Hotline",
    site: "soundboyband",
    ownerId: memberByClass.boyband.ownerId,
    summary: "Steph's enthusiastic boy-band fan page ranks harmonies, magazine posters, dance moves, and 5th Exit singles.",
    commentsEnabled: true,
    listed: true,
    hubId: "zone-soundwave",
    searchTerms: ["boy band", "pop music", "5th exit", "dance moves", "teen pop", "music fan"],
    seedComments: [
      seed("sound-steph-cass", memberByClass.boyband.url, memberByClass.boyband.ownerId, "visitor", "CountryCass_88", "The matching silver jackets are a lot, but that key change absolutely works.", "1999-11-02T20:14:00"),
      seed("sound-steph-sid", memberByClass.boyband.url, memberByClass.boyband.ownerId, "visitor", "SafetyPin_Sid", "My official review is no. My unofficial review is track four gets stuck in your head.", "1999-11-02T20:46:00")
    ],
    render: () => `<main class="page sound-user-page sound-boyband">
      ${pageHeader("THE UNOFFICIAL 5TH EXIT ONLINE HOTLINE", "STEPH'S 5TH EXIT HOTLINE", memberByClass.boyband.handle)}
      <marquee>*** ELIAS IS THE DREAMY ONE // MARCUS HAS THE BEST VOICE // DO NOT EMAIL ME ABOUT THIS RANKING ***</marquee>
      <section class="steph-photo-scrapbook">
        ${soundPhoto(soundwaveMemberAssets.stephPortrait, "Steph posing in her bedroom beneath a wall of pop posters", "me in front of THE WALL // mom took this")}
        ${soundPhoto(soundwaveMemberAssets.stephScrapbook, "Steph's handmade boy-band scrapbook collage", "scrapbook page 11 // do not bend")}
        ${soundPhoto(soundwaveMemberAssets.stephDanceNotes, "Hand-drawn dance steps and costume notes", "the food-court routine, revised")}
      </section>
      <section class="boyband-countdown"><h2>STEPH'S CURRENT TOP 5</h2><ol><li>Call Me From the Food Court</li><li>One More Exit</li><li>Pager Heart</li><li>Every Friday Night</li><li>Girl, Rewind</li></ol></section>
      <section class="sound-scrapbook"><article><b>HARMONY SCIENCE</b><p>The last chorus goes up one whole step. This is why it feels like the song has physically lifted the mall roof.</p></article><article><b>DANCE MOVE OF THE WEEK</b><p>Step, point, jacket grab, quarter turn. Mom says the lamp is not part of the choreography.</p></article><article><b>WANTED</b><p>Any magazine with the blue-jacket photo. Will trade two duplicate sticker sheets.</p></article></section>
      ${returnToZone()}
    </main>`
  },
  [memberByClass.punk.url]: {
    url: memberByClass.punk.url,
    title: "Sid's Stapled Noise",
    site: "soundpunk",
    ownerId: memberByClass.punk.ownerId,
    summary: "Sid reviews tiny punk shows, photocopies local flyers, and posts three-chord guitar notes from a basement bedroom.",
    commentsEnabled: true,
    listed: true,
    hubId: "zone-soundwave",
    searchTerms: ["punk", "local bands", "garage band", "zine", "guitar", "basement show"],
    seedComments: [
      seed("sound-sid-mason", memberByClass.punk.url, memberByClass.punk.ownerId, "visitor", "Flannel_Mason", "Your flyer says eight sharp. Did any band actually start before ten?", "1999-11-01T23:18:00"),
      seed("sound-sid-steph", memberByClass.punk.url, memberByClass.punk.ownerId, "visitor", "StarLine_Steph", "The lettering is impossible to read but I like the dog somebody drew in the corner.", "1999-11-02T17:03:00")
    ],
    render: () => `<main class="page sound-user-page sound-punk">
      ${pageHeader("COPIED AT INKMOTH // STAPLED WRONG ON PURPOSE", "SID'S STAPLED NOISE", memberByClass.punk.handle)}
      <section class="sid-xerox-strip">
        ${soundPhoto(soundwaveMemberAssets.sidPortrait, "Sid outside a small suburban show hall", "SID // waiting for somebody with the key")}
        ${soundPhoto(soundwaveMemberAssets.sidBasementShow, "A crowded basement punk show", "THE CART RETURNS // song maybe four")}
        ${soundPhoto(soundwaveMemberAssets.sidXeroxNotebook, "Sid's photocopied punk notebook and flyer pages", "INKMOTH COPY // toner setting: too much")}
      </section>
      <section class="punk-manifesto"><h2>LOCAL SHOW REPORT #14</h2><p><b>The Cart Returns</b> played behind the bowling alley. Power went out during song three. Nobody noticed until song five.</p><p>Cover: $4. Floor: sticky. Drummer: excellent. Bathroom: absolutely not.</p></section>
      <div class="punk-chords"><b>THREE CHORDS YOU NEED</b><code>E5 &nbsp; A5 &nbsp; B5</code><span>the fourth chord is leaving</span></div>
      <section class="sound-scrapbook"><article><b>DEMO WANTED</b><p>If your band has a tape, put the band name on both the case AND the cassette.</p></article><article><b>NEXT SHOW</b><p>Saturday at the old VFW hall. Bring exact change and do not lean on the fuse box.</p></article></section>
      ${returnToZone()}
    </main>`
  },
  [memberByClass.grunge.url]: {
    url: memberByClass.grunge.url,
    title: "Mason's Low-Ceiling Guitar Room",
    site: "soundgrunge",
    ownerId: memberByClass.grunge.ownerId,
    summary: "Mason trades grunge guitar tabs, fuzz settings, and cassette notes from a low-ceiling basement practice room.",
    commentsEnabled: true,
    listed: true,
    hubId: "zone-soundwave",
    searchTerms: ["grunge", "alternative rock", "guitar tabs", "fuzz pedal", "bootleg tapes", "flannel"],
    seedComments: [
      seed("sound-mason-sid", memberByClass.grunge.url, memberByClass.grunge.ownerId, "visitor", "SafetyPin_Sid", "Too many pedals. The broken little gray one sounds good though.", "1999-11-02T00:04:00"),
      seed("sound-mason-simon", memberByClass.grunge.url, memberByClass.grunge.ownerId, "visitor", "SubBass_Simon", "That tape hiss at 0:18 is practically a hi-hat. Sample it.", "1999-11-02T01:22:00")
    ],
    render: () => `<main class="page sound-user-page sound-grunge">
      ${pageHeader("TUNED DOWN // RECORDED TOO HOT", "THE LOW-CEILING GUITAR ROOM", memberByClass.grunge.handle)}
      <section class="mason-contact-sheet">
        ${soundPhoto(soundwaveMemberAssets.masonPortrait, "Mason playing guitar in his basement", "practice room // ceiling not pictured")}
        ${soundPhoto(soundwaveMemberAssets.masonFuzzFloor, "Fuzz pedals and cables on worn basement carpet", "current signal chain // gray one is broken correctly")}
        ${soundPhoto(soundwaveMemberAssets.masonTapeBox, "A shoebox of hand-labeled cassette bootlegs", "the tape box // ask before dubbing")}
      </section>
      <section class="grunge-tape-log"><h2>TAPE BOX</h2><p><b>RESERVOIR SAINTS - 8/12/98</b><br>Third-generation dub. Crowd louder than guitar. Keep.</p><p><b>GARAGE PRACTICE #6</b><br>One complete song, five false starts, furnace at 60Hz.</p></section>
      <section class="grunge-settings"><h2>FUZZ SETTINGS</h2><dl><div><dt>GAIN</dt><dd>all the way, then apologize</dd></div><div><dt>TONE</dt><dd>about 2 o'clock</dd></div><div><dt>LEVEL</dt><dd>depends whether Dad is home</dd></div></dl></section>
      <blockquote>"Perfectly clean audio is hiding something." - Mason, after losing the original tape</blockquote>
      ${returnToZone()}
    </main>`
  },
  [memberByClass.breakbeat.url]: {
    url: memberByClass.breakbeat.url,
    title: "SIMON // BREAK THE BEAT",
    site: "soundbreakbeat",
    ownerId: memberByClass.breakbeat.ownerId,
    summary: "Simon's Y2K breakbeat page documents bedroom sampler experiments, rave flyers, and bass-heavy works in progress.",
    commentsEnabled: true,
    listed: true,
    hubId: "zone-soundwave",
    searchTerms: ["breakbeat", "electronic", "rave", "sampler", "dj", "drum loop", "bass"],
    seedComments: [
      seed("sound-simon-rico", memberByClass.breakbeat.url, memberByClass.breakbeat.ownerId, "visitor", "RhymeTape_Rico", "Loop B is the one. Stop adding sirens and finish it.", "1999-11-03T00:31:00"),
      seed("sound-simon-mason", memberByClass.breakbeat.url, memberByClass.breakbeat.ownerId, "visitor", "Flannel_Mason", "I do not understand any of this, but the downstairs-neighbor warning seems accurate.", "1999-11-03T00:50:00")
    ],
    render: () => `<main class="page sound-user-page sound-breakbeat">
      ${pageHeader("BPM 148 // BUFFER 64K // MIND THE SPEAKERS", "SIMON // BREAK THE BEAT", memberByClass.breakbeat.handle)}
      <div class="breakbeat-sequencer">${Array.from({ length: 32 }, (_, index) => `<i class="${index % 7 === 0 || index % 11 === 0 ? "hot" : ""}"></i>`).join("")}</div>
      <section class="simon-sampler-rack">
        ${soundPhoto(soundwaveMemberAssets.simonPortrait, "Simon at his bedroom sampler workstation", "STUDIO B // studio A is the kitchen")}
        ${soundPhoto(soundwaveMemberAssets.simonSampler, "Chunky sampler, drum machine, and floppy disks", "64K OF UNREASONABLE POWER")}
        ${soundPhoto(soundwaveMemberAssets.simonRaveFlyers, "Neon rave flyers and speaker diagrams under blacklight", "flyers worth saving // addresses removed")}
        ${soundPhoto(soundwaveMemberAssets.simonSpeakerBench, "Disassembled speakers and headphones on Simon's repair bench", "speaker surgery // patient survived")}
      </section>
      <section class="breakbeat-panel"><h2>CURRENT PROJECT: CONCRETE ORBIT</h2><p>Sources: one drum machine, bus-door hiss, a dropped toolbox, and the dial-up noise my brother says I am not allowed to sample again.</p><dl><div><dt>A SIDE</dt><dd>fast / rude / nearly finished</dd></div><div><dt>B SIDE</dt><dd>faster / ruder / corrupted</dd></div></dl></section>
      <aside class="breakbeat-warning">WARNING: LOW FREQUENCIES MAY REARRANGE FLOPPY DISKS</aside>
      ${returnToZone()}
    </main>`
  },
  [memberByClass.country.url]: {
    url: memberByClass.country.url,
    title: "Cass's Saturday Country Notebook",
    site: "soundcountry",
    ownerId: memberByClass.country.ownerId,
    summary: "Cass keeps a friendly country-radio countdown, county-fair concert diary, and notebook of open-mic songs.",
    commentsEnabled: true,
    listed: true,
    hubId: "zone-soundwave",
    searchTerms: ["country music", "radio countdown", "county fair", "guitar chords", "open mic", "songwriting"],
    seedComments: [
      seed("sound-cass-steph", memberByClass.country.url, memberByClass.country.ownerId, "visitor", "StarLine_Steph", "Your number three has the same key change as a 5th Exit song. This is a compliment.", "1999-11-02T19:43:00"),
      seed("sound-cass-rico", memberByClass.country.url, memberByClass.country.ownerId, "visitor", "RhymeTape_Rico", "The truck song has a beat hiding under it. I am just saying.", "1999-11-02T21:07:00")
    ],
    render: () => `<main class="page sound-user-page sound-country">
      ${pageHeader("SATURDAY RADIO // FAIRGROUND NOTES // OPEN-MIC CHORDS", "CASS'S COUNTRY NOTEBOOK", memberByClass.country.handle)}
      <section class="cass-photo-album">
        ${soundPhoto(soundwaveMemberAssets.cassPortrait, "Cass holding her acoustic guitar on the porch", "one more before the light went away")}
        ${soundPhoto(soundwaveMemberAssets.cassCountyStage, "Cass playing with a country trio at the county fair", "county fair // second set")}
        ${soundPhoto(soundwaveMemberAssets.cassLyricNotebook, "Cass's lyric notebook, chord diagrams, and guitar picks", "Thursday notebook page")}
        ${soundPhoto(soundwaveMemberAssets.cassOpenMic, "Cass singing at a small community-room open mic", "Glasswater Grill // somebody actually listened")}
      </section>
      <section class="country-radio"><h2>THIS WEEK'S COUNTY COUNTDOWN</h2><ol><li>Buck Hollister - Two Lanes Home</li><li>June Wilder - Porch Light</li><li>The Mile Markers - County Line Coffee</li></ol></section>
      <section class="country-notebook"><h2>SONG IDEA</h2><p>Verse one: leaving the fair after they shut the lights off.<br>Verse two: finding one ride still running.<br>Chorus: needs a better rhyme for "parking lot."</p></section>
      <aside class="country-show"><b>NEXT OPEN MIC:</b> Thursday, 7 PM, back room of the Glasswater Grill. Sign-up is on a clipboard, not online.</aside>
      ${returnToZone()}
    </main>`
  },
  [memberByClass.rap.url]: {
    url: memberByClass.rap.url,
    title: "Rico's Rhyme & Tape Exchange",
    site: "soundrap",
    ownerId: memberByClass.rap.ownerId,
    summary: "Rico reviews rap tapes, trades local-show flyers, annotates beats, and records verses in his family's kitchen.",
    commentsEnabled: true,
    listed: true,
    hubId: "zone-soundwave",
    searchTerms: ["rap", "hip hop", "mixtape", "beats", "rhymes", "local show", "cassette trade"],
    seedComments: [
      seed("sound-rico-simon", memberByClass.rap.url, memberByClass.rap.ownerId, "visitor", "SubBass_Simon", "I can clean the refrigerator hum. Or loop it. Looping it is better.", "1999-11-03T01:12:00"),
      seed("sound-rico-sid", memberByClass.rap.url, memberByClass.rap.ownerId, "visitor", "SafetyPin_Sid", "The flyer looks good. InkMoth charged you for that much black toner?", "1999-11-03T16:20:00"),
      seed("sound-rico-steph", memberByClass.rap.url, memberByClass.rap.ownerId, "visitor", "StarLine_Steph", "you were right about the computer-store song and now the little keyboard part will not leave my head. this is your fault.", "1999-11-03T18:42:00")
    ],
    render: (state) => `<main class="page sound-user-page sound-rap">
      ${pageHeader("LOCAL TAPES // BEAT NOTES // VERSES IN PROGRESS", "RICO'S RHYME & TAPE EXCHANGE", memberByClass.rap.handle)}
      <section class="rico-archive-lead">
        ${soundPhoto(soundwaveMemberAssets.ricoPortrait, "Rico at his kitchen-table recording station", "RICO // kitchen session 10/29")}
        <div>
          ${soundPhoto(soundwaveMemberAssets.ricoFridgeStudio, "Rico recording beside the refrigerator with a cassette four-track", "THE FRIDGE BOOTH // hum is part of the room tone")}
          ${soundPhoto(soundwaveMemberAssets.ricoTapeWall, "Rico's organized wall and crates of traded mixtapes", "trade wall // duplicates live in the red crate")}
        </div>
      </section>
      <section class="rap-tape-deck"><h2>NOW IN THE DECK</h2><p><b>SIDE A:</b> Dynamo City cipher, recorded behind the rec center.</p><p><b>SIDE B:</b> three instrumentals and somebody asking where the extension cord went.</p></section>
      <section class="rico-session-strip">
        ${soundPhoto(soundwaveMemberAssets.ricoCipher, "Rico hosting an outdoor cipher behind the recreation center", "REC CENTER CIPHER // extension cord recovered")}
        ${soundPhoto(soundwaveMemberAssets.ricoRhymeNotebook, "Rico's rhyme notebook covered in arrows and revisions", "page 47 // arrows mean try again")}
        ${soundPhoto(soundwaveMemberAssets.ricoCarTest, "Rico testing a cassette through old car speakers at dusk", "parking-lot speaker test")}
      </section>
      <section class="rap-rhyme-book"><h2>RHYME BOOK // DO NOT COPY</h2><p>signal / digital / difficult / pivotal</p><p>mall / call / food court / no, start over</p></section>
      <section class="rico-listening-guide">
        <small>UPDATED WHEN I FIND SOMETHING WORTH THE DOWNLOAD</small>
        <h2>RICO'S WEIRD-PAGE LISTENING GUIDE</h2>
        <p>I do not care what the page is supposed to be about. If the loop works through one cheap speaker, it goes in the notebook.</p>
        <button data-nav="web://soundwave.zone/users/rhymetaperico/deep-cuts">OPEN THE DEEP-CUT WEB GUIDE &rsaquo;</button>
        ${state.storyPhase >= 4
          ? `<button class="rico-barn-flash" data-nav="${BYTE_BARN_COMPILATION_URL}">THE BYTE BARN THING WENT NATIONAL. I WAS HERE WHEN IT WAS ONE CROOKED CLAP &rsaquo;</button>`
          : state.storyPhase >= 3
            ? `<button data-nav="${BYTE_BARN_TEASER_URL}">SOUNDWAVE SOLD THE TOP BANNER TO A COUNTDOWN. TEN WHAT? NOBODY WILL SAY. &rsaquo;</button>`
          : state.storyPhase >= 2
            ? `<p class="rico-barn-status"><b>BARN WATCH:</b> Everybody is making versions now. This is how scenes happen: one person hears a thing, then nobody leaves it alone.</p>`
            : `<p class="rico-barn-status"><b>NEW:</b> There is a computer-store mirror in here with a retired commercial loop. Corny hook. Crooked clap. Tiny keyboard stab. I respect all three.</p>`}
      </section>
      <aside class="rap-trade"><b>TAPE TRADE:</b> Send a list first. Do not mail your only copy. Label your beats.</aside>
      <div class="rico-contact-strip"><button data-aim-owner="rhymetape_rico">OIM RICO</button><span>recommendations accepted // unlabeled audio ignored</span></div>
      ${returnToZone()}
    </main>`
  },
  "web://soundwave.zone/users/rhymetaperico/deep-cuts": {
    url: "web://soundwave.zone/users/rhymetaperico/deep-cuts",
    title: "Rico's Deep-Cut Web Guide",
    site: "soundrap",
    ownerId: memberByClass.rap.ownerId,
    summary: "Rico recommends unlikely Orbit pages solely because their background music is worth hearing.",
    listed: false,
    hubId: "zone-soundwave",
    searchTerms: ["weird page music", "deep cuts", "page songs", "commercial jingles", "rico recommendations"],
    render: (state) => `<main class="page rico-deep-cuts">
      <header><small>RHYMETAPE_RICO PRESENTS</small><h1>DEEP-CUT WEB GUIDE</h1><p>good sounds hiding behind bad layouts, strange hobbies, and terrible deals</p></header>
      <section class="rico-guide-rules"><b>THE RULES</b><span>1. Let the loop play twice.</span><span>2. Cheap speakers are the final judge.</span><span>3. A ridiculous source is still a source.</span></section>
      <section class="rico-guide-archive">
        ${soundPhoto(soundwaveMemberAssets.ricoWebGuide, "Rico's binder of printed strange web pages and listening notes", "THE BINDER // volume two")}
        ${soundPhoto(soundwaveMemberAssets.ricoShowArchive, "Local-show flyers, cassette demos, tickets, and envelopes", "SOURCE MATERIAL // dates mostly verified")}
        ${soundPhoto(soundwaveMemberAssets.ricoByteBarnClue, "An old cassette and printout of the Byte Barn page beside a marked waveform", "BYTE BARN // crooked clap circled")}
      </section>
      <section class="rico-guide-list">
        <article><b>01</b><div><h2>KING CAL'S AUTO KINGDOM</h2><p>Bad financing. Incredible homemade commercial archive. Every era has a different drum machine and Cal attacks the beat like it owes him money.</p><button data-nav="web://kingcalscars.biz/home">HEAR THE KINGDOM &rsaquo;</button></div></article>
        <article><b>02</b><div><h2>BIG BASS BOB'S DOCK</h2><p>Fishing page with more tracks than some labels. A few songs get weird if you listen past the first chorus. Bob says it is lake atmosphere.</p><button data-nav="web://yesterday.zone/users/bigbassbob/home">GO TO THE DOCK &rsaquo;</button></div></article>
        <article class="rico-byte-barn-pick"><b>03</b><div><h2>BYTE BARN</h2><p>The old store mirror still plays a commercial that has not been on television in years. Corny hook, one clap sitting just behind the beat, tiny keyboard stab. Whoever recorded it understood cheap speakers. Do not overthink it.</p><button data-nav="web://bytebarn.com/home">HEAR THE OLD JINGLE &rsaquo;</button></div></article>
        <article><b>04</b><div><h2>COSMIC CRUST</h2><p>The pizza page sounds like a keyboard fell into a planetarium. The second track is smoother. Both make the coupon section feel much more important.</p><button data-nav="web://cosmiccrust.biz/home">ENTER ORBIT &rsaquo;</button></div></article>
      </section>
      ${state.storyPhase >= 4
        ? `<aside class="rico-guide-update phase-three"><b>UPDATE // I GUESS THIS WAS IMPORTANT</b><p>Ten major artists made a Byte Barn record and now they are all playing one festival. The traffic is bigger than Orbit has seen in years. I still like the crooked original clap best.</p><button data-nav="${BYTE_BARN_COMPILATION_URL}">OPEN BYTE BARN FOREVER &rsaquo;</button></aside>`
        : state.storyPhase >= 3
          ? `<aside class="rico-guide-update"><b>UPDATE // SOMEBODY BOUGHT THE WHOLE TOP BANNER</b><p>The countdown says ten signals and one source. Label people keep visiting the fan-cover pages, then refusing to answer questions. I have a guess. I am not posting it yet.</p><button data-nav="${BYTE_BARN_TEASER_URL}">WATCH THE SIGNAL &rsaquo;</button></aside>`
        : state.storyPhase >= 2
          ? `<aside class="rico-guide-update"><b>UPDATE // THE BARN LINE ESCAPED</b><p>Simon chopped it. Tess made it spooky. Somebody recorded a barbershop version at the depot. Mine is in the player below. Follow the versions before the trail gets too big.</p></aside>`
          : `<aside class="rico-guide-update"><b>NOTE</b><p>The Byte Barn link is not a mystery. It is just a good forgotten jingle on a stale computer-store page. Sometimes that is enough.</p></aside>`}
      <footer><button data-nav="${memberByClass.rap.url}">&larr; BACK TO RICO'S TAPE EXCHANGE</button><button data-aim-owner="rhymetape_rico">SEND RICO A RECOMMENDATION</button></footer>
    </main>`
  },
  [BYTE_BARN_TEASER_URL]: {
    url: BYTE_BARN_TEASER_URL,
    title: "Incoming SoundWave Transmission",
    site: "bytebarnteaser",
    ownerId: "orbit_guide",
    summary: "A mysterious paid SoundWave countdown promises one source, ten signals, and a major announcement after final clearance.",
    listed: false,
    searchable: false,
    minimumPhase: 3,
    hubId: "zone-soundwave",
    render: (state) => state.storyPhase >= 4
      ? `<main class="page incoming-signal-page signal-revealed">
          <header><small>TRANSMISSION CLEARED // ALL CHANNELS OPEN</small><h1>BYTE BARN FOREVER</h1><p>The countdown is over. The album and festival are live.</p></header>
          <button data-nav="${BYTE_BARN_COMPILATION_URL}">ENTER THE FULL CAMPAIGN &rsaquo;</button>
        </main>`
      : `<main class="page incoming-signal-page">
          <header><small>ORBITNET PAID TRANSMISSION // AUTHORIZATION PENDING</small><h1>SOMETHING LOUD IS COMING</h1><p>Do not adjust your speakers.</p></header>
          <div class="incoming-countdown-core"><i></i><b>10</b><span>SIGNALS DETECTED</span></div>
          <section><p>ONE SOURCE</p><p>TEN INTERPRETATIONS</p><p>FULL NETWORK PREMIERE</p></section>
          <pre>ARTIST DATA:  [WITHHELD]
SOURCE FILE:  [WITHHELD]
RELEASE TYPE: CD + LIVE EVENT
VENUE:        [WITHHELD]
STATUS:       FINAL CLEARANCE</pre>
          <footer><span>WATCH THIS ADDRESS</span><button data-nav="web://orbitnet.local/zones/soundwave">&larr; RETURN TO SOUNDWAVE</button></footer>
        </main>`
  },
  [BYTE_BARN_COMPILATION_URL]: {
    url: BYTE_BARN_COMPILATION_URL,
    title: "BYTE BARN FOREVER - The Tribute Album",
    site: "bytebarntribute",
    ownerId: "orbit_guide",
    summary: "A front-page compilation gathers ten major artists reinventing Byte Barn's forgotten computer-store jingle.",
    listed: true,
    minimumPhase: 4,
    hubId: "zone-soundwave",
    searchTerms: ["byte barn", "tribute album", "compilation cd", "covers", "remixes", "popular artists", "jingle"],
    render: () => `<main class="page byte-barn-tribute-page">
      <header class="tribute-masthead">
        <div class="tribute-label-line"><span>ORBITNET + SOUNDWAVE PRESENT</span><b>WORLDWIDE WEB PREMIERE // NOVEMBER 1999</b></div>
        <img src="${tributeAssets.campaignLogo}" alt="Byte Barn Forever chrome campaign logo">
        <p>10 ARTISTS // 1 FORGOTTEN JINGLE // 1 NIGHT AT GLASSWATER EXPO</p>
        <nav><button data-song-nav="${BYTE_BARN_COMPILATION_URL}" data-song-file="${BYTE_BARN_COMPILATION_TRACKS[0].track.file}">▶ PLAY THE ALBUM</button><button data-nav="web://bytebarn.com/home">HEAR THE ORIGINAL</button></nav>
      </header>
      <section class="tribute-lead">
        <div class="tribute-package-viewer">
          <div class="tribute-jewel-main"><img data-tribute-main src="${tributeAssets.albumFront}" alt="Byte Barn Forever front cover"><i></i></div>
          <div class="tribute-package-tabs" aria-label="View album packaging">
            <button class="active" data-tribute-art="${tributeAssets.albumFront}" data-tribute-alt="Byte Barn Forever front cover"><img src="${tributeAssets.albumFront}" alt=""><span>FRONT</span></button>
            <button data-tribute-art="${tributeAssets.albumBack}" data-tribute-alt="Byte Barn Forever back cover"><img src="${tributeAssets.albumBack}" alt=""><span>BACK</span></button>
            <button data-tribute-art="${tributeAssets.albumInsert}" data-tribute-alt="Byte Barn Forever booklet insert"><img src="${tributeAssets.albumInsert}" alt=""><span>INSERT</span></button>
            <button data-tribute-art="${tributeAssets.albumDisc}" data-tribute-alt="Byte Barn Forever compact disc"><img src="${tributeAssets.albumDisc}" alt=""><span>DISC</span></button>
          </div>
        </div>
        <div class="tribute-launch-copy">
          <img class="tribute-artist-burst" src="${tributeAssets.artistBurst}" alt="Ten artists gathered around a compact disc">
          <small>THE INTERNET'S LEAST LIKELY HIT RECORD</small>
          <h1>HOW DID THIS HAPPEN?</h1>
          <p>Byte Barn's television jingle had not aired in years. Its old Orbit mirror never removed the audio file. Rico found the crooked clap, newcomers traded the link, and ordinary users started making covers on their own pages.</p>
          <p>Then the versions escaped Orbit. Now ten major artists have produced completely sincere songs from one extremely inexpensive commercial tune: love songs, mall elegies, punk complaints, heavy breakdowns, and a country song about loading a computer into a truck.</p>
          <aside class="tribute-festival-callout"><small>JUST ANNOUNCED</small><b>BYTE BARN FOREVER LIVE!</b><span>All ten artists // one night // Glasswater Expo Pavilion // Orbit simulcast</span></aside>
          <blockquote>“Some songs wait for radio. This one waited inside an obsolete computer-store homepage.”<br><b>— RhymeTape_Rico</b></blockquote>
          <button data-song-nav="${BYTE_BARN_COMPILATION_URL}" data-song-file="${BYTE_BARN_COMPILATION_TRACKS[0].track.file}">START WITH TRACK 01 &rsaquo;</button>
        </div>
      </section>
      <section class="tribute-signal">
        <img src="${tributeAssets.waveform}" alt="Three colorful digital waveforms">
        <div><small>ORBITAMP EXCLUSIVE STREAM</small><h2>THE JINGLE HAS LEFT THE BARN.</h2><p>Select any artist below. OrbitAmp will stay tuned while you read the campaign.</p></div>
      </section>
      <section class="tribute-track-list">
        <header><span>NO.</span><span>ARTIST / SONG</span><span>OFFICIAL PUBLICITY PHOTO</span></header>
        ${BYTE_BARN_COMPILATION_TRACKS.map((entry, index) => `<article class="tribute-track genre-${entry.genre.replace(/\s+/g, "-")}">
          <b>${String(index + 1).padStart(2, "0")}</b>
          <div class="tribute-track-copy"><small>${entry.genre}</small><h2>${entry.artist}</h2><h3>${entry.title}</h3><p>${entry.blurb}</p><button data-song-nav="${BYTE_BARN_COMPILATION_URL}" data-song-file="${entry.track.file}">▶ PLAY THIS TRACK</button></div>
          <figure class="tribute-artist-photo" data-tribute-artist="${entry.artist}"><img src="${tributeArtistPhotos[entry.artist]}" alt="${entry.artist} official publicity photograph"><figcaption>${entry.artist}</figcaption></figure>
        </article>`).join("")}
      </section>
      <section class="tribute-extras">
        <figure><img src="${tributeAssets.albumInsert}" alt="Open Byte Barn Forever booklet insert"><figcaption>THE 12-PAGE BOOKLET // FAN-REMIX FAMILY TREE + ARTIST NOTES</figcaption></figure>
        <figure><img src="${tributeAssets.stickerSheet}" alt="Byte Barn Forever promotional sticker designs"><figcaption>FIRST-PRESSING PROMOTIONAL STICKER SHEET</figcaption></figure>
        <figure><img src="${tributeAssets.campaignAd}" alt="Byte Barn Forever launch artwork with a concert crowd"><figcaption>THE CAMPAIGN IMAGE NOW APPEARING IN MUSIC MAGAZINES</figcaption></figure>
      </section>
      <aside class="tribute-impact"><b>ORBIT TRAFFIC BULLETIN // RECORD HIGH</b><p>The surprise CD and festival announcement produced the busiest day in network history. New accounts are arriving faster than the old directory can alphabetize them. For the first time in years, actual listener traffic exceeds the carrier's continuation floor.</p><small>OTHER NETWORK TOPIC: Continuity audit and identity-reconstruction report // archived in Backchannel</small></aside>
      <footer><button data-nav="web://orbitnet.local/zones/soundwave">&larr; SOUNDWAVE</button><span>BYTE BARN FOREVER // AN ORBIT-BORN PHENOMENON</span><button data-nav="web://bytebarn.com/home">THE ORIGINAL BYTE BARN SITE &rsaquo;</button></footer>
    </main>`
  }
};
