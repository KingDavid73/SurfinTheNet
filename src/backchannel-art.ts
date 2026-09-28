export const BACKCHANNEL_ART = Object.fromEntries(
  ["raven", "mira", "fax", "null", "enter", "board", "dish", "floppy", "eye", "wordmark", "mascot", "backdrop", "evidence", "cyber", "terminal", "eye-frame"].map((name) => [
    name,
    new URL(`../assets/images/zone-decor/backchannel/${name}.png`, import.meta.url).href
  ])
) as Record<string, string>;

export const BACKCHANNEL_GIFS = {
  ravenEye: new URL("../assets/images/archive-gifs/darkraven/raven-eye.gif", import.meta.url).href,
  ravenOrbit: new URL("../assets/images/archive-gifs/darkraven/raven-orbit.gif", import.meta.url).href,
  radioScan: new URL("../assets/images/archive-gifs/nightsignal/radio-scan.gif", import.meta.url).href,
  antenna: new URL("../assets/images/archive-gifs/nightsignal/antenna.gif", import.meta.url).href
} as const;
