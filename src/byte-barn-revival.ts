import type { PageDefinition, PageMusicTrack } from "./types";

export const BYTE_BARN_COMPILATION_URL = "web://soundwave.zone/features/byte-barn-forever";
export const BYTE_BARN_TEASER_URL = "web://soundwave.zone/features/incoming-signal";
export const BYTE_BARN_FAN_HUB_URL = "web://fanverse.zone/clubs/byte-barn-beat-exchange";

export const BYTE_BARN_FAN_TRACKS = {
  halloween: {
    label: "Byte Barn Boo Bash",
    file: "byte-barn-boo-bash.mp3",
    url: new URL("../assets/audio/pages/byte-barn-revival/fan/byte-barn-boo-bash.mp3", import.meta.url).href
  },
  breakbeat: {
    label: "Byte Barn Breakbeat Deal",
    file: "byte-barn-breakbeat-deal.mp3",
    url: new URL("../assets/audio/pages/byte-barn-revival/fan/byte-barn-breakbeat-deal.mp3", import.meta.url).href
  },
  christmas: {
    label: "Byte Barn Christmas Deal",
    file: "byte-barn-christmas-deal.mp3",
    url: new URL("../assets/audio/pages/byte-barn-revival/fan/byte-barn-christmas-deal.mp3", import.meta.url).href
  },
  retroRap: {
    label: "Byte Barn Deal (Retro Rap Remix)",
    file: "byte-barn-retro-rap.mp3",
    url: new URL("../assets/audio/pages/byte-barn-revival/fan/byte-barn-retro-rap.mp3", import.meta.url).href
  },
  acoustic: {
    label: "Byte Barn Deal (Acoustic Folk Jingle)",
    file: "byte-barn-acoustic-folk.mp3",
    url: new URL("../assets/audio/pages/byte-barn-revival/fan/byte-barn-acoustic-folk.mp3", import.meta.url).href
  },
  barbershop: {
    label: "Byte Barn Deal (Barbershop Quartet)",
    file: "byte-barn-barbershop.mp3",
    url: new URL("../assets/audio/pages/byte-barn-revival/fan/byte-barn-barbershop.mp3", import.meta.url).href
  },
  glam: {
    label: "Byte Barn Deal (Glam Rock Remix)",
    file: "byte-barn-glam-rock.mp3",
    url: new URL("../assets/audio/pages/byte-barn-revival/fan/byte-barn-glam-rock.mp3", import.meta.url).href
  },
  barbershopAlt: {
    label: "Byte Barn Barbershop Jingle",
    file: "byte-barn-barbershop-jingle-alt.mp3",
    url: new URL("../assets/audio/pages/byte-barn-revival/fan/byte-barn-barbershop-jingle-alt.mp3", import.meta.url).href
  },
  dealRemix: {
    label: "Byte Barn Deal (Basement Remix)",
    file: "byte-barn-deal-remix.mp3",
    url: new URL("../assets/audio/pages/byte-barn-revival/fan/byte-barn-deal-remix.mp3", import.meta.url).href
  },
  vaporwave: {
    label: "Byte Barn Deal (Vaporwave Edit)",
    file: "byte-barn-vaporwave-edit.mp3",
    url: new URL("../assets/audio/pages/byte-barn-revival/fan/byte-barn-vaporwave-edit.mp3", import.meta.url).href
  }
} as const satisfies Record<string, PageMusicTrack>;

export interface ByteBarnCompilationTrack {
  artist: string;
  title: string;
  genre: string;
  blurb: string;
  track: PageMusicTrack;
}

export const BYTE_BARN_COMPILATION_TRACKS: readonly ByteBarnCompilationTrack[] = [
  {
    artist: "Buck Hollister & The Mile Markers",
    title: "Back of the Truck at Byte Barn",
    genre: "country",
    blurb: "A tailgate, a busted radio, and one last computer loaded before sundown.",
    track: {
      label: "Back of the Truck at Byte Barn",
      file: "back-of-the-truck-at-byte-barn.mp3",
      url: new URL("../assets/audio/pages/byte-barn-revival/cd/back-of-the-truck-at-byte-barn.mp3", import.meta.url).href
    }
  },
  {
    artist: "The Apology Window",
    title: "Back to Byte Barn (Simpler Times)",
    genre: "emo",
    blurb: "A trembling goodbye to the mall, the food court, and the computer aisle.",
    track: {
      label: "Back to Byte Barn (Simpler Times)",
      file: "back-to-byte-barn-simpler-times.mp3",
      url: new URL("../assets/audio/pages/byte-barn-revival/cd/back-to-byte-barn-simpler-times.mp3", import.meta.url).href
    }
  },
  {
    artist: "Exit 14",
    title: "Back to the Byte Barn",
    genre: "midwest emo",
    blurb: "Angular guitars remember a parking lot that nobody else thought mattered.",
    track: {
      label: "Back to the Byte Barn",
      file: "back-to-the-byte-barn.mp3",
      url: new URL("../assets/audio/pages/byte-barn-revival/cd/back-to-the-byte-barn.mp3", import.meta.url).href
    }
  },
  {
    artist: "Kira Chrome",
    title: "Breaking Up at Byte Barn",
    genre: "pop",
    blurb: "The year's brightest pop star chooses the worst possible place for a breakup.",
    track: {
      label: "Breaking Up at Byte Barn",
      file: "breaking-up-at-byte-barn.mp3",
      url: new URL("../assets/audio/pages/byte-barn-revival/cd/breaking-up-at-byte-barn.mp3", import.meta.url).href
    }
  },
  {
    artist: "Static Orchard",
    title: "Byte Barn Bites Back",
    genre: "nu metal",
    blurb: "Detuned guitars, receipt-printer scratches, and a chorus built for cargo shorts.",
    track: {
      label: "Byte Barn Bites Back",
      file: "byte-barn-bites-back.mp3",
      url: new URL("../assets/audio/pages/byte-barn-revival/cd/byte-barn-bites-back.mp3", import.meta.url).href
    }
  },
  {
    artist: "Reservoir Saints",
    title: "Byte Barn Breakdown",
    genre: "post-grunge",
    blurb: "A gravel-voiced tribute to bad fluorescent lights and better weekends.",
    track: {
      label: "Byte Barn Breakdown",
      file: "byte-barn-breakdown.mp3",
      url: new URL("../assets/audio/pages/byte-barn-revival/cd/byte-barn-breakdown.mp3", import.meta.url).href
    }
  },
  {
    artist: "Grave Receipt",
    title: "Byte Barn of the Damned",
    genre: "horror punk",
    blurb: "The midnight inventory rises, clocks in, and demands an employee discount.",
    track: {
      label: "Byte Barn of the Damned",
      file: "byte-barn-of-the-damned.mp3",
      url: new URL("../assets/audio/pages/byte-barn-revival/cd/byte-barn-of-the-damned.mp3", import.meta.url).href
    }
  },
  {
    artist: "The Cart Returns",
    title: "Byte Barn Parking Lot Punk",
    genre: "punk",
    blurb: "Ninety seconds of shopping carts, cracked asphalt, and refusing the warranty.",
    track: {
      label: "Byte Barn Parking Lot Punk",
      file: "byte-barn-parking-lot-punk.mp3",
      url: new URL("../assets/audio/pages/byte-barn-revival/cd/byte-barn-parking-lot-punk.mp3", import.meta.url).href
    }
  },
  {
    artist: "5th Exit",
    title: "Falling at the Byte Barn",
    genre: "boy band pop",
    blurb: "Five perfect harmonies ask whether love can survive the clearance aisle.",
    track: {
      label: "Falling at the Byte Barn",
      file: "falling-at-the-byte-barn.mp3",
      url: new URL("../assets/audio/pages/byte-barn-revival/cd/falling-at-the-byte-barn.mp3", import.meta.url).href
    }
  },
  {
    artist: "Next Saturday",
    title: "Pop Punk Byte Barn",
    genre: "pop punk",
    blurb: "A sugar-rush finale about missing the bus and meeting behind the loading dock.",
    track: {
      label: "Pop Punk Byte Barn",
      file: "pop-punk-byte-barn.mp3",
      url: new URL("../assets/audio/pages/byte-barn-revival/cd/pop-punk-byte-barn.mp3", import.meta.url).href
    }
  }
] as const;

export interface ByteBarnCoverPlacement {
  pageUrl: string;
  site: PageDefinition["site"];
  uploader: string;
  kind?: "upload" | "favorite";
  note: string;
  comment: string;
  commentTime: string;
  track: PageMusicTrack;
}

export const PHASE_TWO_BYTE_BARN_COVERS: readonly ByteBarnCoverPlacement[] = [
  {
    pageUrl: "web://soundwave.zone/users/subbasssimon/home",
    site: "soundbreakbeat",
    uploader: "SubBass_Simon",
    note: "I chopped the store clap, pushed the bass until my desk moved, and left the cheap keyboard stab exactly where it belongs.",
    comment: "[[BARNFLIP]] My Byte Barn breakbeat mix is in the player now. Somebody else sample that crooked store clap next.",
    commentTime: "1999-11-04T09:18:00",
    track: BYTE_BARN_FAN_TRACKS.breakbeat
  },
  {
    pageUrl: "web://soundwave.zone/users/rhymetaperico/home",
    site: "soundrap",
    uploader: "RhymeTape_Rico",
    note: "Old commercial, new verses. The barn line still lands. I do not make the rules.",
    comment: "[[BARNFLIP]] New verses over the old Byte Barn hook are up. Corny jingle, real bounce. Pass the tape.",
    commentTime: "1999-11-04T09:26:00",
    track: BYTE_BARN_FAN_TRACKS.retroRap
  },
  {
    pageUrl: "web://fanverse.zone/users/tapeattictess/home",
    site: "fanstar",
    uploader: "TapeAttic_Tess",
    note: "I made a Halloween dub for the StarThimble tape club and somehow everybody kept the Byte Barn chorus.",
    comment: "[[BARNFLIP]] I made a spooky Byte Barn dub for tape-club night. It should not work with thunder effects, but it does.",
    commentTime: "1999-11-04T09:43:00",
    track: BYTE_BARN_FAN_TRACKS.halloween
  },
  {
    pageUrl: "web://yesterday.zone/users/grandmadot/home",
    site: "grandmanew",
    uploader: "Grandma_Dot",
    note: "THE GRANDCHILDREN helped me make this Christmas one. I did not know the computer store song had so many versions.",
    comment: "[[BARNFLIP]] THE CHILDREN put our Christmas Byte Barn song in the music box. Please tell me if it is too loud.",
    commentTime: "1999-11-04T10:02:00",
    track: BYTE_BARN_FAN_TRACKS.christmas
  },
  {
    pageUrl: "web://trailnotes.home/index",
    site: "cozyhike",
    uploader: "TrailNote_Tom",
    note: "A campfire arrangement recorded on the porch. The birds enter during the second chorus without permission.",
    comment: "[[BARNFLIP]] Porch-recorded acoustic Byte Barn cover is up. The birds joined the second chorus and requested no credit.",
    commentTime: "1999-11-04T10:17:00",
    track: BYTE_BARN_FAN_TRACKS.acoustic
  },
  {
    pageUrl: "web://yesterday.zone/users/railroadlenny/home",
    site: "oldtrains",
    uploader: "Railroad_Lenny",
    note: "Four gentlemen from the depot society supplied the harmony. No trains were delayed.",
    comment: "[[BARNFLIP]] The depot society recorded a four-part Byte Barn arrangement. This is apparently what the Internet is for.",
    commentTime: "1999-11-04T10:31:00",
    track: BYTE_BARN_FAN_TRACKS.barbershop
  },
  {
    pageUrl: "web://xtreme.zone/users/scootlordollie/home",
    site: "scooter",
    uploader: "ScootLord_Ollie",
    note: "THUNDER SCOOT GLAM BARN MIX. Recorded with one borrowed guitar and the confidence of six guitars.",
    comment: "[[BARNFLIP]] THUNDER SCOOT GLAM BARN MIX IS LIVE. One guitar. Six guitars of attitude. Turn it up.",
    commentTime: "1999-11-04T10:46:00",
    track: BYTE_BARN_FAN_TRACKS.glam
  },
  {
    pageUrl: "web://soundwave.zone/users/starlinesteph/home",
    site: "soundboyband",
    uploader: "StarLine_Steph",
    note: "My cousin's quartet sent me this after I said the jingle needed real harmony. It now has four times the harmony and exactly the same amount of dignity.",
    comment: "[[BARNFLIP]] My cousin's quartet did a Byte Barn version! The last chord is enormous. This is absolutely going on a tape.",
    commentTime: "1999-11-06T16:12:00",
    track: BYTE_BARN_FAN_TRACKS.barbershopAlt
  },
  {
    pageUrl: "web://gamegrid.zone/users/lagmaster99/home",
    site: "pulse",
    uploader: "LagMaster_99",
    note: "Recorded through the headset jack, two game-menu loops, and one microphone that should have been retired in 1996.",
    comment: "[[BARNFLIP]] Uploaded my Byte Barn basement remix. It sounds better if your speakers are already blown.",
    commentTime: "1999-11-06T18:03:00",
    track: BYTE_BARN_FAN_TRACKS.dealRemix
  },
  {
    pageUrl: "web://fanverse.zone/users/prismpilotaya/home",
    site: "fanprism",
    uploader: "PrismPilot_Aya",
    note: "Slowed down, washed in mall-at-closing-time reverb, and paired with a color-cycle that takes one full chorus to repeat.",
    comment: "[[BARNFLIP]] The Byte Barn vaporwave edit is in my player. Imagine the computer aisle after closing, but emotionally significant.",
    commentTime: "1999-11-06T21:27:00",
    track: BYTE_BARN_FAN_TRACKS.vaporwave
  },
  {
    pageUrl: "web://fanverse.zone/users/tapeattictess/home",
    site: "fanstar",
    uploader: "TapeAttic_Tess",
    kind: "favorite",
    note: "Steph's cousin did not make this for Professor StarThimble, but the four-part ending sounds exactly like the Moon Choir episode.",
    comment: "[[BARNFLIP]] Also linking Steph's barbershop version because the final chord is basically the Moon Choir. I did not make this one; I just keep replaying it.",
    commentTime: "1999-11-06T22:04:00",
    track: BYTE_BARN_FAN_TRACKS.barbershopAlt
  },
  {
    pageUrl: "web://soundwave.zone/users/subbasssimon/home",
    site: "soundbreakbeat",
    uploader: "SubBass_Simon",
    kind: "favorite",
    note: "LagMaster's microphone is clipping in a way that should be wrong. It is not wrong. I sampled nothing without permission.",
    comment: "[[BARNFLIP]] LagMaster's basement remix is rude through good speakers and dangerous through bad ones. Favorite version this morning.",
    commentTime: "1999-11-07T00:18:00",
    track: BYTE_BARN_FAN_TRACKS.dealRemix
  },
  {
    pageUrl: "web://xtreme.zone/users/deckwreckerdee/home",
    site: "skater",
    uploader: "DeckWrecker_Dee",
    kind: "favorite",
    note: "Ollie's glam version is ridiculous. It also times perfectly with the long curb line behind Westgate, which is deeply annoying.",
    comment: "[[BARNFLIP]] Ollie's glam Barn mix is dumb. It also fits my curb tape. Both statements are true, so I linked it.",
    commentTime: "1999-11-07T08:12:00",
    track: BYTE_BARN_FAN_TRACKS.glam
  },
  {
    pageUrl: "web://petplanet.zone/users/catnapcarla/home",
    site: "petcat",
    uploader: "CatNap_Carla",
    kind: "favorite",
    note: "Tom's porch recording is the only version Mr. Boots has not tried to silence by sitting on the speaker.",
    comment: "[[BARNFLIP]] Linking TrailNote Tom's porch cover. Mr. Boots stayed beside the speaker for the whole song, which is his highest rating.",
    commentTime: "1999-11-07T09:34:00",
    track: BYTE_BARN_FAN_TRACKS.acoustic
  },
  {
    pageUrl: "web://fanverse.zone/users/mossmunchmel/home",
    site: "fanmoss",
    uploader: "MossMunch_Mel",
    kind: "favorite",
    note: "The thunder in Tess's spooky version sounds like the Bog Door opening. This is now unofficial MossMunch Halloween canon.",
    comment: "[[BARNFLIP]] Tess's spooky Byte Barn tape is my favorite. Play it while reading the Bog Door chapter and tell me I am wrong.",
    commentTime: "1999-11-07T10:11:00",
    track: BYTE_BARN_FAN_TRACKS.halloween
  },
  {
    pageUrl: "web://soundwave.zone/users/countrycass/home",
    site: "soundcountry",
    uploader: "CountryCass_88",
    kind: "favorite",
    note: "Tom left the birds in. Good choice. A porch recording ought to admit that it happened on a porch.",
    comment: "[[BARNFLIP]] Tom's acoustic Byte Barn version is my current favorite. You can hear the birds come in like they rehearsed.",
    commentTime: "1999-11-07T11:02:00",
    track: BYTE_BARN_FAN_TRACKS.acoustic
  }
] as const;

export function byteBarnCoversForPage(pageUrl: string) {
  return PHASE_TWO_BYTE_BARN_COVERS.filter((placement) => placement.pageUrl === pageUrl);
}
