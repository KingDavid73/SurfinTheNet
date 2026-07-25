import {
  BYTE_BARN_COMPILATION_TRACKS,
  BYTE_BARN_COMPILATION_URL
} from "./byte-barn-revival";
import type { GameState, PageComment, PageDefinition } from "./types";

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
    <header><div><small>HOME TAPES // LOCAL SHOWS // LOUD OPINIONS</small><h2>SoundWave Member Pages</h2></div><span>${soundwaveMembers.length} regulars online</span></header>
    <div>
      ${state.storyPhase >= 3 ? `<button class="soundwave-revival-card" data-nav="${BYTE_BARN_COMPILATION_URL}">
        <span class="soundwave-revival-disc">BB</span>
        <span><small>ORBITNET FRONT-PAGE EVENT</small><strong>BYTE BARN FOREVER</strong><em>10 major artists remake one forgotten local jingle. Hear the full compilation.</em></span>
        <b>PLAY THE ALBUM &rsaquo;</b>
      </button>` : ""}
      ${soundwaveMembers.map((member) => `<button class="soundwave-member-card member-${member.className}" data-nav="${member.url}">
        <i>${member.genre.slice(0, 3)}</i>
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
      seed("sound-rico-sid", memberByClass.rap.url, memberByClass.rap.ownerId, "visitor", "SafetyPin_Sid", "The flyer looks good. InkMoth charged you for that much black toner?", "1999-11-03T16:20:00")
    ],
    render: () => `<main class="page sound-user-page sound-rap">
      ${pageHeader("LOCAL TAPES // BEAT NOTES // VERSES IN PROGRESS", "RICO'S RHYME & TAPE EXCHANGE", memberByClass.rap.handle)}
      <section class="rap-tape-deck"><h2>NOW IN THE DECK</h2><p><b>SIDE A:</b> Dynamo City cipher, recorded behind the rec center.</p><p><b>SIDE B:</b> three instrumentals and somebody asking where the extension cord went.</p></section>
      <section class="rap-rhyme-book"><h2>RHYME BOOK // DO NOT COPY</h2><p>signal / digital / difficult / pivotal</p><p>mall / call / food court / no, start over</p></section>
      <aside class="rap-trade"><b>TAPE TRADE:</b> Send a list first. Do not mail your only copy. Label your beats.</aside>
      ${returnToZone()}
    </main>`
  },
  [BYTE_BARN_COMPILATION_URL]: {
    url: BYTE_BARN_COMPILATION_URL,
    title: "BYTE BARN FOREVER - The Tribute Album",
    site: "bytebarntribute",
    ownerId: "orbit_guide",
    summary: "A front-page compilation gathers ten major artists reinventing Byte Barn's forgotten computer-store jingle.",
    listed: true,
    minimumPhase: 3,
    hubId: "zone-soundwave",
    searchTerms: ["byte barn", "tribute album", "compilation cd", "covers", "remixes", "popular artists", "jingle"],
    render: () => `<main class="page byte-barn-tribute-page">
      <header><small>ORBITNET + SOUNDWAVE PRESENT</small><h1>BYTE BARN<br><b>FOREVER</b></h1><p>10 ARTISTS // 1 FORGOTTEN JINGLE // NO RECEIPT REQUIRED</p></header>
      <section class="tribute-lead">
        <div class="tribute-cover-placeholder"><span>BYTE</span><b>BARN</b><em>FOREVER</em><small>COMPILATION CD</small></div>
        <div><h2>HOW DID THIS HAPPEN?</h2><p>Byte Barn's television jingle had not aired in years. Its old Orbit page never removed the audio file. A few newcomers found it, traded it, covered it, and accidentally sent the biggest names in music down the same fluorescent aisle.</p><p>The result is ten completely sincere versions of one extremely inexpensive commercial tune. Love songs, mall elegies, punk complaints, heavy breakdowns, and a country song about loading a computer into a truck.</p><button data-song-nav="${BYTE_BARN_COMPILATION_URL}" data-song-file="${BYTE_BARN_COMPILATION_TRACKS[0].track.file}">PLAY THE ALBUM FROM TRACK 1</button></div>
      </section>
      <section class="tribute-track-list">
        <header><span>TRACK</span><span>ARTIST / SONG</span><span>PUBLICITY PHOTO</span></header>
        ${BYTE_BARN_COMPILATION_TRACKS.map((entry, index) => `<article class="tribute-track">
          <b>${String(index + 1).padStart(2, "0")}</b>
          <div><small>${entry.genre}</small><h2>${entry.artist}</h2><h3>${entry.title}</h3><p>${entry.blurb}</p><button data-song-nav="${BYTE_BARN_COMPILATION_URL}" data-song-file="${entry.track.file}">PLAY THIS TRACK &rsaquo;</button></div>
          <figure class="tribute-photo-slot" data-tribute-artist="${entry.artist}"><span>ARTIST PHOTO</span><figcaption>${entry.artist}</figcaption></figure>
        </article>`).join("")}
      </section>
      <aside class="tribute-impact"><b>ORBIT TRAFFIC BULLETIN</b><p>The compilation announcement produced the busiest day in network history. New accounts are arriving faster than the old directory can alphabetize them.</p></aside>
      <footer><button data-nav="web://orbitnet.local/zones/soundwave">&larr; SOUNDWAVE</button><button data-nav="web://bytebarn.com/home">THE ORIGINAL BYTE BARN SITE &rsaquo;</button></footer>
    </main>`
  }
};
