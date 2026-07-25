import type { PageDefinition, PageMusicTrack } from "./types";

export const BYTE_BARN_COMPILATION_URL = "web://soundwave.zone/features/byte-barn-forever";
export const BYTE_BARN_TEASER_URL = "web://soundwave.zone/features/incoming-signal";

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
  note: string;
  track: PageMusicTrack;
}

export const PHASE_TWO_BYTE_BARN_COVERS: readonly ByteBarnCoverPlacement[] = [
  {
    pageUrl: "web://soundwave.zone/users/subbasssimon/home",
    site: "soundbreakbeat",
    uploader: "SubBass_Simon",
    note: "I chopped the store clap, pushed the bass until my desk moved, and left the cheap keyboard stab exactly where it belongs.",
    track: BYTE_BARN_FAN_TRACKS.breakbeat
  },
  {
    pageUrl: "web://soundwave.zone/users/rhymetaperico/home",
    site: "soundrap",
    uploader: "RhymeTape_Rico",
    note: "Old commercial, new verses. The barn line still lands. I do not make the rules.",
    track: BYTE_BARN_FAN_TRACKS.retroRap
  },
  {
    pageUrl: "web://fanverse.zone/users/tapeattictess/home",
    site: "fanstar",
    uploader: "TapeAttic_Tess",
    note: "I made a Halloween dub for the StarThimble tape club and somehow everybody kept the Byte Barn chorus.",
    track: BYTE_BARN_FAN_TRACKS.halloween
  },
  {
    pageUrl: "web://yesterday.zone/users/grandmadot/home",
    site: "grandmanew",
    uploader: "Grandma_Dot",
    note: "THE GRANDCHILDREN helped me make this Christmas one. I did not know the computer store song had so many versions.",
    track: BYTE_BARN_FAN_TRACKS.christmas
  },
  {
    pageUrl: "web://trailnotes.home/index",
    site: "cozyhike",
    uploader: "TrailNote_Tom",
    note: "A campfire arrangement recorded on the porch. The birds enter during the second chorus without permission.",
    track: BYTE_BARN_FAN_TRACKS.acoustic
  },
  {
    pageUrl: "web://yesterday.zone/users/railroadlenny/home",
    site: "oldtrains",
    uploader: "Railroad_Lenny",
    note: "Four gentlemen from the depot society supplied the harmony. No trains were delayed.",
    track: BYTE_BARN_FAN_TRACKS.barbershop
  },
  {
    pageUrl: "web://xtreme.zone/users/scootlordollie/home",
    site: "scooter",
    uploader: "ScootLord_Ollie",
    note: "THUNDER SCOOT GLAM BARN MIX. Recorded with one borrowed guitar and the confidence of six guitars.",
    track: BYTE_BARN_FAN_TRACKS.glam
  }
] as const;

export function byteBarnCoverForPage(pageUrl: string) {
  return PHASE_TWO_BYTE_BARN_COVERS.find((placement) => placement.pageUrl === pageUrl);
}
