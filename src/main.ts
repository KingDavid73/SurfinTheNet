import "./styles.css";
import { notFoundPage, pages } from "./pages";
import { ORPHAN_RUMORS, SYSTEM_RUMORS } from "./rumor-pages";
import {
  DORMANT_LEGACY_ACCOUNTS,
  DORMANT_LEGACY_HOME_URLS,
  DORMANT_LEGACY_OWNERS,
  DORMANT_LEGACY_PERSONA_IDS
} from "./legacy-fragment-pages";
import {
  NEWCOMER_HOME_URLS,
  NEWCOMER_OWNERS,
  phaseTwoPersonalUpdateLink
} from "./newcomer-pages";
import {
  SOUNDWAVE_HOME_URLS,
  SOUNDWAVE_OWNERS
} from "./soundwave-pages";
import {
  BYTE_BARN_COMPILATION_TRACKS,
  PHASE_TWO_BYTE_BARN_COVERS,
  byteBarnCoverForPage
} from "./byte-barn-revival";
import {
  PHASE_THREE_EXPLORER_IDS,
  PHASE_THREE_EXPLORER_OWNERS
} from "./phase-three-personas";
import type { AiConversation, AiStatus, AmbientPostJob, AppId, DirectChannel, DirectMessage, GameState, PageComment, PageDefinition, PageMusicTrack, StoryPhase } from "./types";
import { ambientActivityFor } from "./character-tiers";
import { finalizeConversationQuestReply, phaseOneConversationQuest } from "./conversation-quests";
import { deliveryIsAvailable, personaIsActiveAt, scheduleReplyAt } from "./reply-scheduling";

const titleArtworkUrl = new URL("../assets/images/power-off-desk.png", import.meta.url).href;
const startupJingleUrl = new URL("../assets/audio/orbitos-startup.wav", import.meta.url).href;
const startupJingle = new Audio(startupJingleUrl);
startupJingle.preload = "auto";
startupJingle.volume = 0.7;

const KING_CAL_TRACKS: readonly PageMusicTrack[] = [
  { label: "Everybody Rides", file: "everybody-rides.mp3", url: new URL("../assets/audio/pages/king-cal/everybody-rides.mp3", import.meta.url).href },
  { label: "Everybody Rides Royalty", file: "everybody-rides-royalty.mp3", url: new URL("../assets/audio/pages/king-cal/everybody-rides-royalty.mp3", import.meta.url).href },
  { label: "Royalty on Wheels", file: "royalty-on-wheels-01.mp3", url: new URL("../assets/audio/pages/king-cal/royalty-on-wheels-01.mp3", import.meta.url).href },
  { label: "Royalty on Wheels II", file: "royalty-on-wheels-02.mp3", url: new URL("../assets/audio/pages/king-cal/royalty-on-wheels-02.mp3", import.meta.url).href },
  { label: "County Line Royalty", file: "county-line-royalty-01.mp3", url: new URL("../assets/audio/pages/king-cal/county-line-royalty-01.mp3", import.meta.url).href },
  { label: "County Line Royalty II", file: "county-line-royalty-02.mp3", url: new URL("../assets/audio/pages/king-cal/county-line-royalty-02.mp3", import.meta.url).href },
  { label: "County Line Royalty III", file: "county-line-royalty-03.mp3", url: new URL("../assets/audio/pages/king-cal/county-line-royalty-03.mp3", import.meta.url).href },
  { label: "King Cal's Auto Kingdom", file: "king-cals-auto-kingdom-01.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-auto-kingdom-01.mp3", import.meta.url).href },
  { label: "King Cal's Auto Kingdom II", file: "king-cals-auto-kingdom-02.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-auto-kingdom-02.mp3", import.meta.url).href },
  { label: "King Cal's Auto Kingdom III", file: "king-cals-auto-kingdom-03.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-auto-kingdom-03.mp3", import.meta.url).href },
  { label: "King Cal's Auto Kingdom IV", file: "king-cals-auto-kingdom-04.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-auto-kingdom-04.mp3", import.meta.url).href },
  { label: "King Cal's Auto Kingdom V", file: "king-cals-auto-kingdom-05.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-auto-kingdom-05.mp3", import.meta.url).href },
  { label: "King Cal's Auto Kingdom VI", file: "king-cals-auto-kingdom-06.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-auto-kingdom-06.mp3", import.meta.url).href },
  { label: "King Cal's Auto Kingdom VII", file: "king-cals-auto-kingdom-07.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-auto-kingdom-07.mp3", import.meta.url).href },
  { label: "King Cal's Auto Kingdom VIII", file: "king-cals-auto-kingdom-08.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-auto-kingdom-08.mp3", import.meta.url).href },
  { label: "King Cal's Kingdom", file: "king-cals-kingdom-01.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-01.mp3", import.meta.url).href },
  { label: "King Cal's Kingdom II", file: "king-cals-kingdom-02.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-02.mp3", import.meta.url).href },
  { label: "King Cal's Kingdom III", file: "king-cals-kingdom-03.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-03.mp3", import.meta.url).href },
  { label: "King Cal's Kingdom IV", file: "king-cals-kingdom-04.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-04.mp3", import.meta.url).href },
  { label: "King Cal's Kingdom V", file: "king-cals-kingdom-05.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-05.mp3", import.meta.url).href },
  { label: "King Cal's Kingdom VI", file: "king-cals-kingdom-06.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-06.mp3", import.meta.url).href },
  { label: "King Cal's Kingdom VII", file: "king-cals-kingdom-07.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-07.mp3", import.meta.url).href },
  { label: "King Cal's Kingdom VIII", file: "king-cals-kingdom-08.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-08.mp3", import.meta.url).href },
  { label: "King Cal's Kingdom IX", file: "king-cals-kingdom-09.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-09.mp3", import.meta.url).href },
  { label: "King Cal's Kingdom X", file: "king-cals-kingdom-10.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-10.mp3", import.meta.url).href },
  { label: "King Cal's Kingdom XI", file: "king-cals-kingdom-11.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-11.mp3", import.meta.url).href },
  { label: "County Line Crown", file: "county-line-crown-diss-track-01.mp3", url: new URL("../assets/audio/pages/king-cal/county-line-crown-diss-track-01.mp3", import.meta.url).href },
  { label: "Kingdom Diss Track II", file: "king-cals-kingdom-diss-track-02.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-diss-track-02.mp3", import.meta.url).href },
  { label: "King Cal's Warning", file: "king-cals-warning-secret-01.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-warning-secret-01.mp3", import.meta.url).href },
  { label: "County Line Code", file: "county-line-code-secret-02.mp3", url: new URL("../assets/audio/pages/king-cal/county-line-code-secret-02.mp3", import.meta.url).href },
  { label: "County Line Code (Alt.)", file: "county-line-code-secret-03-alt.mp3", url: new URL("../assets/audio/pages/king-cal/county-line-code-secret-03-alt.mp3", import.meta.url).href },
  { label: "County Line Cipher", file: "county-line-cipher-secret-04.mp3", url: new URL("../assets/audio/pages/king-cal/county-line-cipher-secret-04.mp3", import.meta.url).href },
  { label: "County Line Cipher (Alt.)", file: "county-line-cipher-secret-05-alt.mp3", url: new URL("../assets/audio/pages/king-cal/county-line-cipher-secret-05-alt.mp3", import.meta.url).href },
  { label: "County Line Warning", file: "county-line-warning-secret-06.mp3", url: new URL("../assets/audio/pages/king-cal/county-line-warning-secret-06.mp3", import.meta.url).href }
];

const ORBIT_HOME_TRACKS: readonly PageMusicTrack[] = [
  { label: "Blue Screen of Love", file: "blue-screen-of-love-01.mp3", url: new URL("../assets/audio/pages/orbit-home/blue-screen-of-love-01.mp3", import.meta.url).href },
  { label: "Blue Screen of Love II", file: "blue-screen-of-love-02.mp3", url: new URL("../assets/audio/pages/orbit-home/blue-screen-of-love-02.mp3", import.meta.url).href },
  { label: "Blue Screen of Love III", file: "blue-screen-of-love-03.mp3", url: new URL("../assets/audio/pages/orbit-home/blue-screen-of-love-03.mp3", import.meta.url).href },
  { label: "Blue Screen of Love IV", file: "blue-screen-of-love-04.mp3", url: new URL("../assets/audio/pages/orbit-home/blue-screen-of-love-04.mp3", import.meta.url).href },
  { label: "Blue Screen of Memory", file: "blue-screen-of-memory.mp3", url: new URL("../assets/audio/pages/orbit-home/blue-screen-of-memory.mp3", import.meta.url).href }
];

const COSMIC_CRUST_TRACKS: readonly PageMusicTrack[] = [
  { label: "Cosmic Crust Pizza", file: "cosmic-crust-pizza.mp3", url: new URL("../assets/audio/pages/cosmic-crust/cosmic-crust-pizza.mp3", import.meta.url).href },
  { label: "Neon Pizza Dreams", file: "neon-pizza-dreams.mp3", url: new URL("../assets/audio/pages/cosmic-crust/neon-pizza-dreams.mp3", import.meta.url).href }
];

const HONEST_EARL_TRACKS: readonly PageMusicTrack[] = [
  { label: "Honest Earl Jingle", file: "honest-earl-jingle.mp3", url: new URL("../assets/audio/pages/honest-earl/honest-earl-jingle.mp3", import.meta.url).href },
  { label: "Honest Earl's Lot", file: "honest-earls-lot.mp3", url: new URL("../assets/audio/pages/honest-earl/honest-earls-lot.mp3", import.meta.url).href },
  { label: "Chrome and Static", file: "chrome-and-static.mp3", url: new URL("../assets/audio/pages/honest-earl/chrome-and-static.mp3", import.meta.url).href },
  { label: "Clean Getaway", file: "clean-getaway.mp3", url: new URL("../assets/audio/pages/honest-earl/clean-getaway.mp3", import.meta.url).href },
  { label: "Lot Lizard Loop", file: "lot-lizard-loop.mp3", url: new URL("../assets/audio/pages/honest-earl/lot-lizard-loop.mp3", import.meta.url).href }
];

const SKATER_TRACKS: readonly PageMusicTrack[] = [
  { label: "Demo Tape Spin", file: "demo-tape-spin.mp3", url: new URL("../assets/audio/pages/skater/demo-tape-spin.mp3", import.meta.url).href },
  { label: "Grip Tape Summer", file: "grip-tape-summer.mp3", url: new URL("../assets/audio/pages/skater/grip-tape-summer.mp3", import.meta.url).href }
];

const SURFER_TRACKS: readonly PageMusicTrack[] = [
  { label: "Banzai Loop", file: "banzai-loop-01.mp3", url: new URL("../assets/audio/pages/surfer/banzai-loop-01.mp3", import.meta.url).href },
  { label: "Banzai Loop II", file: "banzai-loop-02.mp3", url: new URL("../assets/audio/pages/surfer/banzai-loop-02.mp3", import.meta.url).href },
  { label: "Cutback Chaos", file: "cutback-chaos.mp3", url: new URL("../assets/audio/pages/surfer/cutback-chaos.mp3", import.meta.url).href }
];

const ROAD_HOG_TRACKS: readonly PageMusicTrack[] = [
  { label: "Chrome and Grass", file: "chrome-and-grass.mp3", url: new URL("../assets/audio/pages/road-hog-ron/chrome-and-grass.mp3", import.meta.url).href },
  { label: "Dented Fender Proud", file: "dented-fender-proud.mp3", url: new URL("../assets/audio/pages/road-hog-ron/dented-fender-proud.mp3", import.meta.url).href },
  { label: "Hadda Lay 'Er Down", file: "hadda-lay-er-down-01.mp3", url: new URL("../assets/audio/pages/road-hog-ron/hadda-lay-er-down-01.mp3", import.meta.url).href },
  { label: "Hadda Lay 'Er Down II", file: "hadda-lay-er-down-02.mp3", url: new URL("../assets/audio/pages/road-hog-ron/hadda-lay-er-down-02.mp3", import.meta.url).href }
];

const RAILROAD_LENNY_TRACKS: readonly PageMusicTrack[] = [
  { label: "Back on the Rails", file: "back-on-the-rails.mp3", url: new URL("../assets/audio/pages/railroad-lenny/back-on-the-rails.mp3", import.meta.url).href },
  { label: "Whistle at Dawn", file: "whistle-at-dawn.mp3", url: new URL("../assets/audio/pages/railroad-lenny/whistle-at-dawn.mp3", import.meta.url).href }
];

const BIG_BASS_BOB_TRACKS: readonly PageMusicTrack[] = [
  { label: "Gone Fishin' Again", file: "gone-fishin-again.mp3", url: new URL("../assets/audio/pages/big-bass-bob/gone-fishin-again.mp3", import.meta.url).href },
  { label: "Lake Day Legend", file: "lake-day-legend-01.mp3", url: new URL("../assets/audio/pages/big-bass-bob/lake-day-legend-01.mp3", import.meta.url).href },
  { label: "Lake Day Legend II", file: "lake-day-legend-02.mp3", url: new URL("../assets/audio/pages/big-bass-bob/lake-day-legend-02.mp3", import.meta.url).href },
  { label: "The One That Got Away", file: "the-one-that-got-away.mp3", url: new URL("../assets/audio/pages/big-bass-bob/the-one-that-got-away.mp3", import.meta.url).href },
  { label: "Back Off the Line", file: "back-off-the-line-secret-01.mp3", url: new URL("../assets/audio/pages/big-bass-bob/back-off-the-line-secret-01.mp3", import.meta.url).href },
  { label: "Big One Got Away", file: "big-one-got-away-secret-02.mp3", url: new URL("../assets/audio/pages/big-bass-bob/big-one-got-away-secret-02.mp3", import.meta.url).href },
  { label: "Redacted Bait", file: "redacted-bait-secret-03.mp3", url: new URL("../assets/audio/pages/big-bass-bob/redacted-bait-secret-03.mp3", import.meta.url).href },
  { label: "Reel It In", file: "reel-it-in-secret-04.mp3", url: new URL("../assets/audio/pages/big-bass-bob/reel-it-in-secret-04.mp3", import.meta.url).href }
];

const GARDEN_SPRITES_TRACK: PageMusicTrack = {
  label: "Garden Sprites",
  file: "garden-sprites.mid",
  midiUrl: new URL("../assets/audio/pages/garden-sprites.mid", import.meta.url).href,
  url: new URL("../assets/audio/pages/garden-sprites.wav", import.meta.url).href
};

const productionTrack = (label: string, file: string, url: string): PageMusicTrack => ({ label, file, url });
const PRODUCTION_TRACKS = {
  fifthExit: productionTrack("Call Me from the Food Court", "fifth-exit-food-court.mp3", new URL("../assets/audio/pages/production-pass/fifth-exit-food-court.mp3", import.meta.url).href),
  afterhoursLibrary: productionTrack("Afterhours Library", "afterhours-library.mp3", new URL("../assets/audio/pages/production-pass/afterhours-library.mp3", import.meta.url).href),
  basementCart: productionTrack("Basement Cart Return", "basement-cart-return.mp3", new URL("../assets/audio/pages/production-pass/basement-cart-return.mp3", import.meta.url).href),
  birdband: productionTrack("Birdband Watch", "birdband-watch.mp3", new URL("../assets/audio/pages/production-pass/birdband-watch.mp3", import.meta.url).href),
  bubbleBorough: productionTrack("Bubble Borough", "bubble-borough.mp3", new URL("../assets/audio/pages/production-pass/bubble-borough.mp3", import.meta.url).href),
  bunBrigade: productionTrack("Bun Brigade Bea", "bun-brigade-bea.mp3", new URL("../assets/audio/pages/production-pass/bun-brigade-bea.mp3", import.meta.url).href),
  cometQuest: productionTrack("Comet's Backyard Quest", "comets-backyard-quest.mp3", new URL("../assets/audio/pages/production-pass/comets-backyard-quest.mp3", import.meta.url).href),
  corruptedSignal: productionTrack("Corrupted Signal", "corrupted-signal.mp3", new URL("../assets/audio/pages/production-pass/corrupted-signal.mp3", import.meta.url).href),
  dynamoCipher: productionTrack("Dynamo City Cipher", "dynamo-city-cipher.mp3", new URL("../assets/audio/pages/production-pass/dynamo-city-cipher.mp3", import.meta.url).href),
  exitZero: productionTrack("Exit Zero Drift", "exit-zero-drift.mp3", new URL("../assets/audio/pages/production-pass/exit-zero-drift.mp3", import.meta.url).href),
  farawayDesk: productionTrack("Faraway Desk Travel", "faraway-desk-travel.mp3", new URL("../assets/audio/pages/production-pass/faraway-desk-travel.mp3", import.meta.url).href),
  foldedWire: productionTrack("Folded Wire", "folded-wire.mp3", new URL("../assets/audio/pages/production-pass/folded-wire.mp3", import.meta.url).href),
  fountainVoices: productionTrack("Fountain Voices", "fountain-voices.mp3", new URL("../assets/audio/pages/production-pass/fountain-voices.mp3", import.meta.url).href),
  frozen217: productionTrack("Frozen at Two Seventeen", "frozen-at-two-seventeen.mp3", new URL("../assets/audio/pages/production-pass/frozen-at-two-seventeen.mp3", import.meta.url).href),
  gemstoneOne: productionTrack("Gemstone Cavern", "gemstone-cavern-01.mp3", new URL("../assets/audio/pages/production-pass/gemstone-cavern-01.mp3", import.meta.url).href),
  gemstoneTwo: productionTrack("Gemstone Cavern II", "gemstone-cavern-02.mp3", new URL("../assets/audio/pages/production-pass/gemstone-cavern-02.mp3", import.meta.url).href),
  glasslake: productionTrack("Glasslake Field", "glasslake-field.mp3", new URL("../assets/audio/pages/production-pass/glasslake-field.mp3", import.meta.url).href),
  gurgleBros: productionTrack("Gurgle Bros.", "gurgle-bros.mp3", new URL("../assets/audio/pages/production-pass/gurgle-bros.mp3", import.meta.url).href),
  haloComb: productionTrack("Halo Comb Salon", "halo-comb-salon.mp3", new URL("../assets/audio/pages/production-pass/halo-comb-salon.mp3", import.meta.url).href),
  hamCam: productionTrack("Ham Cam Hal", "ham-cam-hal.mp3", new URL("../assets/audio/pages/production-pass/ham-cam-hal.mp3", import.meta.url).href),
  hearthside: productionTrack("Hearthside Archive", "hearthside-archive.mp3", new URL("../assets/audio/pages/production-pass/hearthside-archive.mp3", import.meta.url).href),
  iguanaIris: productionTrack("Iguana Iris", "iguana-iris.mp3", new URL("../assets/audio/pages/production-pass/iguana-iris.mp3", import.meta.url).href),
  indexNull: productionTrack("Index Null Signal", "index-null-signal.mp3", new URL("../assets/audio/pages/production-pass/index-null-signal.mp3", import.meta.url).href),
  inkmoth: productionTrack("Inkmoth Copy", "inkmoth-copy.mp3", new URL("../assets/audio/pages/production-pass/inkmoth-copy.mp3", import.meta.url).href),
  juniperGarden: productionTrack("Juniper's Rainbow Garden", "juniper-rainbow-garden.mp3", new URL("../assets/audio/pages/production-pass/juniper-rainbow-garden.mp3", import.meta.url).href),
  lastQuarter: productionTrack("Last Quarter Arcade", "last-quarter-arcade.mp3", new URL("../assets/audio/pages/production-pass/last-quarter-arcade.mp3", import.meta.url).href),
  lilyLoop: productionTrack("Lily Loop", "lily-loop.mp3", new URL("../assets/audio/pages/production-pass/lily-loop.mp3", import.meta.url).href),
  midnightDial: productionTrack("Midnight Dial Net", "midnight-dial-net.mp3", new URL("../assets/audio/pages/production-pass/midnight-dial-net.mp3", import.meta.url).href),
  modKitMaddy: productionTrack("Mod Kit Maddy", "mod-kit-maddy.mp3", new URL("../assets/audio/pages/production-pass/mod-kit-maddy.mp3", import.meta.url).href),
  molarSmile: productionTrack("Molar Meadow Smile", "molar-meadow-smile.mp3", new URL("../assets/audio/pages/production-pass/molar-meadow-smile.mp3", import.meta.url).href),
  molarMeadow: productionTrack("Molar Meadow", "molar-meadow.mp3", new URL("../assets/audio/pages/production-pass/molar-meadow.mp3", import.meta.url).href),
  morrowFive: productionTrack("Morrow Five Archive", "morrow-five-archive.mp3", new URL("../assets/audio/pages/production-pass/morrow-five-archive.mp3", import.meta.url).href),
  mossMunch: productionTrack("MossMunch & the Moonlings", "moss-munch-moonlings.mp3", new URL("../assets/audio/pages/production-pass/moss-munch-moonlings.mp3", import.meta.url).href),
  mrBoots: productionTrack("Mr. Boots Loop", "mr-boots-loop.mp3", new URL("../assets/audio/pages/production-pass/mr-boots-loop.mp3", import.meta.url).href),
  mudInVan: productionTrack("Mud in the Van", "mud-in-the-van.mp3", new URL("../assets/audio/pages/production-pass/mud-in-the-van.mp3", import.meta.url).href),
  mudHelmet: productionTrack("Mud on My Helmet", "mud-on-my-helmet.mp3", new URL("../assets/audio/pages/production-pass/mud-on-my-helmet.mp3", import.meta.url).href),
  neighborNest: productionTrack("Neighbor Nest Hop", "neighbor-nest-hop.mp3", new URL("../assets/audio/pages/production-pass/neighbor-nest-hop.mp3", import.meta.url).href),
  newcomers: productionTrack("Newcomers", "newcomers.mp3", new URL("../assets/audio/pages/production-pass/newcomers.mp3", import.meta.url).href),
  nightSignal: productionTrack("Night Signal Logs", "night-signal-logs.mp3", new URL("../assets/audio/pages/production-pass/night-signal-logs.mp3", import.meta.url).href),
  orbitDiary: productionTrack("Orbit Diary", "orbit-diary.mp3", new URL("../assets/audio/pages/production-pass/orbit-diary.mp3", import.meta.url).href),
  orbitnetLabs: productionTrack("OrbitNet Labs", "orbitnet-labs.mp3", new URL("../assets/audio/pages/production-pass/orbitnet-labs.mp3", import.meta.url).href),
  paperbird: productionTrack("Paperbird Workshop", "paperbird-workshop.mp3", new URL("../assets/audio/pages/production-pass/paperbird-workshop.mp3", import.meta.url).href),
  pawsNClaws: productionTrack("Paws 'N Claws", "paws-n-claws.mp3", new URL("../assets/audio/pages/production-pass/paws-n-claws.mp3", import.meta.url).href),
  phaseThreeOne: productionTrack("Phase Three Archive", "phase-three-archive-01.mp3", new URL("../assets/audio/pages/production-pass/phase-three-archive-01.mp3", import.meta.url).href),
  phaseThreeTierC: productionTrack("Tier C Memory", "phase-three-tier-c.mp3", new URL("../assets/audio/pages/production-pass/phase-three-tier-c.mp3", import.meta.url).href),
  phaseThreeTwo: productionTrack("Phase Three Archive II", "phase-three-archive-02.mp3", new URL("../assets/audio/pages/production-pass/phase-three-archive-02.mp3", import.meta.url).href),
  prismChroma: productionTrack("PRISM//5 Chroma Knights", "prism-five-chroma-knights.mp3", new URL("../assets/audio/pages/production-pass/prism-five-chroma-knights.mp3", import.meta.url).href),
  prismFive: productionTrack("Prism Five", "prism-five.mp3", new URL("../assets/audio/pages/production-pass/prism-five.mp3", import.meta.url).href),
  prizeFrequency: productionTrack("Prize Frequency Transmission", "prize-frequency-transmission.mp3", new URL("../assets/audio/pages/production-pass/prize-frequency-transmission.mp3", import.meta.url).href),
  professorStar: productionTrack("Professor StarThimble", "professor-star-thimble.mp3", new URL("../assets/audio/pages/production-pass/professor-star-thimble.mp3", import.meta.url).href),
  quietCounty: productionTrack("Quiet County Signal", "quiet-county-signal.mp3", new URL("../assets/audio/pages/production-pass/quiet-county-signal.mp3", import.meta.url).href),
  ravenCache: productionTrack("Raven Cache", "raven-cache.mp3", new URL("../assets/audio/pages/production-pass/raven-cache.mp3", import.meta.url).href),
  reservoirTown: productionTrack("Reservoir Town", "reservoir-town.mp3", new URL("../assets/audio/pages/production-pass/reservoir-town.mp3", import.meta.url).href),
  rewindOne: productionTrack("Rewind Harbor", "rewind-harbor-01.mp3", new URL("../assets/audio/pages/production-pass/rewind-harbor-01.mp3", import.meta.url).href),
  rewindTwo: productionTrack("Rewind Harbor II", "rewind-harbor-02.mp3", new URL("../assets/audio/pages/production-pass/rewind-harbor-02.mp3", import.meta.url).href),
  rocketOne: productionTrack("Rocket Box Toys", "rocket-box-toys-01.mp3", new URL("../assets/audio/pages/production-pass/rocket-box-toys-01.mp3", import.meta.url).href),
  rocketTwo: productionTrack("Rocket Box Toys II", "rocket-box-toys-02.mp3", new URL("../assets/audio/pages/production-pass/rocket-box-toys-02.mp3", import.meta.url).href),
  rosepatch: productionTrack("Rosepatch Diary", "rosepatch-diary.mp3", new URL("../assets/audio/pages/production-pass/rosepatch-diary.mp3", import.meta.url).href),
  snacktime: productionTrack("Snacktime Mom Page", "snacktime-mom-page.mp3", new URL("../assets/audio/pages/production-pass/snacktime-mom-page.mp3", import.meta.url).href),
  snapdragon: productionTrack("Snap Dragon String Floral", "snapdragon-string-floral.mp3", new URL("../assets/audio/pages/production-pass/snapdragon-string-floral.mp3", import.meta.url).href),
  soundwaveOne: productionTrack("SoundWave One", "soundwave-01.mp3", new URL("../assets/audio/pages/production-pass/soundwave-01.mp3", import.meta.url).href),
  soundwaveTwo: productionTrack("SoundWave Two", "soundwave-02.mp3", new URL("../assets/audio/pages/production-pass/soundwave-02.mp3", import.meta.url).href),
  soundwaveThree: productionTrack("SoundWave Three", "soundwave-03.mp3", new URL("../assets/audio/pages/production-pass/soundwave-03.mp3", import.meta.url).href),
  mallDimension: productionTrack("The Mall Dimension", "the-mall-dimension.mp3", new URL("../assets/audio/pages/production-pass/the-mall-dimension.mp3", import.meta.url).href),
  unfinishedAtlasOne: productionTrack("The Unfinished Atlas", "the-unfinished-atlas-01.mp3", new URL("../assets/audio/pages/production-pass/the-unfinished-atlas-01.mp3", import.meta.url).href),
  unfinishedAtlasTwo: productionTrack("The Unfinished Atlas II", "the-unfinished-atlas-02.mp3", new URL("../assets/audio/pages/production-pass/the-unfinished-atlas-02.mp3", import.meta.url).href),
  toonburst: productionTrack("ToonBurst TV", "toonburst-tv.mp3", new URL("../assets/audio/pages/production-pass/toonburst-tv.mp3", import.meta.url).href),
  twoLanes: productionTrack("Two Lanes Home", "two-lanes-home.mp3", new URL("../assets/audio/pages/production-pass/two-lanes-home.mp3", import.meta.url).href),
  weatherCellarOne: productionTrack("Weather Cellar Net", "weather-cellar-net-01.mp3", new URL("../assets/audio/pages/production-pass/weather-cellar-net-01.mp3", import.meta.url).href),
  weatherCellarTwo: productionTrack("Weather Cellar Net II", "weather-cellar-net-02.mp3", new URL("../assets/audio/pages/production-pass/weather-cellar-net-02.mp3", import.meta.url).href),
  zackRerun: productionTrack("Zack's VHS Rerun", "zacks-vhs-rerun.mp3", new URL("../assets/audio/pages/production-pass/zacks-vhs-rerun.mp3", import.meta.url).href)
} as const;

const SITE_MUSIC: Record<PageDefinition["site"], PageMusicTrack> = {
  orbithome: ORBIT_HOME_TRACKS[0],
  directory: ORBIT_HOME_TRACKS[0],
  gamegridzone: { label: "Everybody's In", file: "everybodys-in.mid", midiUrl: new URL("../assets/audio/pages/everybodys-in.mid", import.meta.url).href, url: new URL("../assets/audio/pages/everybodys-in.wav", import.meta.url).href },
  xtremezone: { label: "Extreme Sports Web Loop 1999", file: "extreme-sports-web-loop-1999.mp3", url: new URL("../assets/audio/pages/xtreme-zone/extreme-sports-web-loop-1999.mp3", import.meta.url).href },
  yesterdayzone: { label: "Good Old Days", file: "good-old-days.mp3", url: new URL("../assets/audio/pages/yesterday-zone/good-old-days.mp3", import.meta.url).href },
  newcomerzone: PRODUCTION_TRACKS.newcomers,
  newcalfan: KING_CAL_TRACKS[0],
  newbytefan: { label: "Byte Barn Deal", file: "byte-barn-deal.mp3", url: new URL("../assets/audio/pages/byte-barn/byte-barn-deal.mp3", import.meta.url).href },
  newlinklily: PRODUCTION_TRACKS.lilyLoop,
  newrookierayna: PRODUCTION_TRACKS.orbitDiary,
  newzackrerun: PRODUCTION_TRACKS.zackRerun,
  soundboyband: PRODUCTION_TRACKS.fifthExit,
  soundpunk: PRODUCTION_TRACKS.basementCart,
  soundgrunge: PRODUCTION_TRACKS.mudInVan,
  soundbreakbeat: { label: "TubeNet Telemetry", file: "tubenet-telemetry.mid", midiUrl: new URL("../assets/audio/pages/tubenet-telemetry.mid", import.meta.url).href, url: new URL("../assets/audio/pages/tubenet-telemetry.wav", import.meta.url).href },
  soundcountry: PRODUCTION_TRACKS.twoLanes,
  soundrap: PRODUCTION_TRACKS.dynamoCipher,
  bytebarnteaser: { label: "Cached Shadows", file: "cached-shadows.mid", midiUrl: new URL("../assets/audio/pages/cached-shadows.mid", import.meta.url).href, url: new URL("../assets/audio/pages/cached-shadows.wav", import.meta.url).href },
  bytebarntribute: BYTE_BARN_COMPILATION_TRACKS[0].track,
  rainbow: PRODUCTION_TRACKS.juniperGarden,
  cozygarden: PRODUCTION_TRACKS.rosepatch,
  cozycottage: PRODUCTION_TRACKS.hearthside,
  cozymom: PRODUCTION_TRACKS.snacktime,
  cozyhike: GARDEN_SPRITES_TRACK,
  cozycraft: PRODUCTION_TRACKS.paperbird,
  signal: PRODUCTION_TRACKS.nightSignal,
  raven: PRODUCTION_TRACKS.ravenCache,
  orbitlegacy: PRODUCTION_TRACKS.phaseThreeOne,
  backchannelalt: PRODUCTION_TRACKS.foldedWire,
  morrowfive: PRODUCTION_TRACKS.morrowFive,
  glasslake: PRODUCTION_TRACKS.glasslake,
  quietcounty: PRODUCTION_TRACKS.quietCounty,
  algorithmarchive: PRODUCTION_TRACKS.orbitnetLabs,
  rumorarchive: { label: "Cached Shadows", file: "cached-shadows.mid", midiUrl: new URL("../assets/audio/pages/cached-shadows.mid", import.meta.url).href, url: new URL("../assets/audio/pages/cached-shadows.wav", import.meta.url).href },
  computer: { label: "Byte Barn Deal", file: "byte-barn-deal.mp3", url: new URL("../assets/audio/pages/byte-barn/byte-barn-deal.mp3", import.meta.url).href },
  modkit: PRODUCTION_TRACKS.modKitMaddy,
  pizza: COSMIC_CRUST_TRACKS[0],
  pets: PRODUCTION_TRACKS.pawsNClaws,
  pulse: { label: "PULSE NET", file: "pulse-net.mp3", url: new URL("../assets/audio/pages/pulse-net/pulse-net.mp3", import.meta.url).href },
  vanta: { label: "Leave Reality Running", file: "leave-reality-running.mp3", url: new URL("../assets/audio/pages/vanta/leave-reality-running.mp3", import.meta.url).href },
  cubit: { label: "CUBIT Pure Play", file: "cubit-pure-play.mp3", url: new URL("../assets/audio/pages/cubit/cubit-pure-play.mp3", import.meta.url).href },
  rocketbox: PRODUCTION_TRACKS.rocketOne,
  moonmunch: { label: "Moon Munch Blast", file: "moon-munch-blast.mp3", url: new URL("../assets/audio/pages/moon-munch/moon-munch-blast.mp3", import.meta.url).href },
  toonburst: PRODUCTION_TRACKS.toonburst,
  kingcal: KING_CAL_TRACKS[0],
  earl: HONEST_EARL_TRACKS[0],
  skater: SKATER_TRACKS[0],
  bmx: { label: "Tailwhip at Dusk", file: "tailwhip-at-dusk.mp3", url: new URL("../assets/audio/pages/bmx/tailwhip-at-dusk.mp3", import.meta.url).href },
  blader: { label: "Wheelbite Anthem", file: "wheelbite-anthem.mp3", url: new URL("../assets/audio/pages/rollerblader/wheelbite-anthem.mp3", import.meta.url).href },
  surfer: SURFER_TRACKS[0],
  motocross: PRODUCTION_TRACKS.mudHelmet,
  scooter: { label: "Scooter Kid Shuffle", file: "scooter-kid-shuffle.mp3", url: new URL("../assets/audio/pages/scooter/scooter-kid-shuffle.mp3", import.meta.url).href },
  euro: { label: "Riviera Idle", file: "riviera-idle.mid", midiUrl: new URL("../assets/audio/pages/riviera-idle.mid", import.meta.url).href, url: new URL("../assets/audio/pages/riviera-idle.wav", import.meta.url).href },
  petcat: PRODUCTION_TRACKS.mrBoots,
  petdog: PRODUCTION_TRACKS.cometQuest,
  petrabbit: PRODUCTION_TRACKS.bunBrigade,
  pethamster: PRODUCTION_TRACKS.hamCam,
  petiguana: PRODUCTION_TRACKS.iguanaIris,
  petskunk: { label: "Cabinet Caper", file: "cabinet-caper.mid", midiUrl: new URL("../assets/audio/pages/cabinet-caper.mid", import.meta.url).href, url: new URL("../assets/audio/pages/cabinet-caper.wav", import.meta.url).href },
  fanmoss: PRODUCTION_TRACKS.mossMunch,
  fanblipzo: PRODUCTION_TRACKS.mallDimension,
  fanstar: PRODUCTION_TRACKS.professorStar,
  fanprism: PRODUCTION_TRACKS.prismFive,
  fangemwell: PRODUCTION_TRACKS.gemstoneOne,
  fanatlas: PRODUCTION_TRACKS.unfinishedAtlasOne,
  oldbiker: ROAD_HOG_TRACKS[0],
  grandmaold: { label: "Red Barn Beer", file: "red-barn-beer.mp3", url: new URL("../assets/audio/pages/grandma-dot-old/red-barn-beer.mp3", import.meta.url).href },
  grandmanew: { label: "Red Barn", file: "red-barn.mp3", url: new URL("../assets/audio/pages/grandma-dot-new/red-barn.mp3", import.meta.url).href },
  oldhistory: { label: "Tin Cup Reenactor", file: "tin-cup-reenactor.mp3", url: new URL("../assets/audio/pages/colonel-hal/tin-cup-reenactor.mp3", import.meta.url).href },
  oldtrains: RAILROAD_LENNY_TRACKS[0],
  oldfishing: BIG_BASS_BOB_TRACKS[0],
  rewindbusiness: PRODUCTION_TRACKS.rewindOne,
  laundrybusiness: PRODUCTION_TRACKS.bubbleBorough,
  floristbusiness: PRODUCTION_TRACKS.snapdragon,
  travelbusiness: PRODUCTION_TRACKS.farawayDesk,
  copybusiness: PRODUCTION_TRACKS.inkmoth,
  furniturebusiness: { label: "Good Old Days", file: "good-old-days.mp3", url: new URL("../assets/audio/pages/yesterday-zone/good-old-days.mp3", import.meta.url).href },
  dentalbusiness: PRODUCTION_TRACKS.molarMeadow,
  plumbingbusiness: PRODUCTION_TRACKS.gurgleBros,
  creditbusiness: PRODUCTION_TRACKS.neighborNest,
  salonbusiness: PRODUCTION_TRACKS.haloComb
};
const SITE_PLAYLISTS: Partial<Record<PageDefinition["site"], readonly PageMusicTrack[]>> = {
  orbithome: ORBIT_HOME_TRACKS,
  directory: ORBIT_HOME_TRACKS,
  gamegridzone: [SITE_MUSIC.gamegridzone, SITE_MUSIC.vanta, SITE_MUSIC.cubit],
  newcalfan: KING_CAL_TRACKS,
  pizza: COSMIC_CRUST_TRACKS,
  earl: HONEST_EARL_TRACKS,
  kingcal: KING_CAL_TRACKS,
  skater: SKATER_TRACKS,
  surfer: SURFER_TRACKS,
  orbitlegacy: [
    PRODUCTION_TRACKS.phaseThreeOne,
    PRODUCTION_TRACKS.phaseThreeTierC,
    PRODUCTION_TRACKS.phaseThreeTwo,
    PRODUCTION_TRACKS.corruptedSignal
  ],
  rocketbox: [PRODUCTION_TRACKS.rocketOne, PRODUCTION_TRACKS.rocketTwo],
  fanprism: [PRODUCTION_TRACKS.prismFive, PRODUCTION_TRACKS.prismChroma],
  fangemwell: [PRODUCTION_TRACKS.gemstoneOne, PRODUCTION_TRACKS.gemstoneTwo],
  fanatlas: [PRODUCTION_TRACKS.unfinishedAtlasOne, PRODUCTION_TRACKS.unfinishedAtlasTwo],
  rewindbusiness: [PRODUCTION_TRACKS.rewindOne, PRODUCTION_TRACKS.rewindTwo],
  dentalbusiness: [PRODUCTION_TRACKS.molarMeadow, PRODUCTION_TRACKS.molarSmile],
  oldbiker: ROAD_HOG_TRACKS,
  oldtrains: RAILROAD_LENNY_TRACKS,
  oldfishing: BIG_BASS_BOB_TRACKS,
  bytebarntribute: BYTE_BARN_COMPILATION_TRACKS.map((entry) => entry.track)
};
const PAGE_PLAYLISTS: Readonly<Record<string, readonly PageMusicTrack[]>> = {
  "web://orbitnet.local/zones/soundwave": [
    PRODUCTION_TRACKS.soundwaveOne,
    PRODUCTION_TRACKS.soundwaveTwo,
    PRODUCTION_TRACKS.soundwaveThree
  ]
};
const DOMAIN_PLAYLISTS: Readonly<Record<string, readonly PageMusicTrack[]>> = {
  "foldedwire.net": [PRODUCTION_TRACKS.foldedWire],
  "index-null.net": [PRODUCTION_TRACKS.indexNull],
  "midnight-dial.net": [PRODUCTION_TRACKS.midnightDial],
  "birdband.watch": [PRODUCTION_TRACKS.birdband],
  "railghost.org": [PRODUCTION_TRACKS.frozen217],
  "prizefrequency.net": [PRODUCTION_TRACKS.prizeFrequency],
  "weather-cellar.net": [PRODUCTION_TRACKS.weatherCellarOne, PRODUCTION_TRACKS.weatherCellarTwo],
  "glasswater.test": [PRODUCTION_TRACKS.reservoirTown],
  "afterhours-library.net": [PRODUCTION_TRACKS.afterhoursLibrary],
  "last-quarter.arcade": [PRODUCTION_TRACKS.lastQuarter],
  "fountain-voices.net": [PRODUCTION_TRACKS.fountainVoices],
  "exit-zero.info": [PRODUCTION_TRACKS.exitZero]
};
const pageMusic = new Audio();
pageMusic.loop = true;
pageMusic.preload = "auto";
const PAGE_MUSIC_MAX_VOLUME = 0.36;
pageMusic.volume = PAGE_MUSIC_MAX_VOLUME * 0.5;

type StartupStage = "title" | "powering" | "bios" | "splash" | "login" | "dialup" | "desktop";

const DEFAULT_STATE: GameState = {
  version: 7,
  playerName: "",
  storyPhase: 1,
  discoveredMysteries: [],
  visited: ["web://home"],
  bookmarks: ["web://rainbow.gdn/home"],
  downloads: [],
  flags: {},
  currentUrl: "web://home",
  settings: { theme: "classic", wallpaper: "teal", cursor: "arrow", musicVolume: 50, browserTextSize: "medium" },
  gameTime: "1999-11-03T19:30:00",
  pageComments: [],
  ambientPostQueue: [],
  pageVisitCounts: { "web://home": 1 },
  guestbookEntries: {},
  directMessages: [{
    id: "mira-welcome-1999",
    ownerId: "mira_917",
    channel: "aim",
    role: "owner",
    author: "Mira_917",
    text: "hey, you made it! welcome to OrbitNet. poke around the community zones and search for whatever sounds interesting—there are some wonderfully weird pages hiding in here.",
    createdAt: "1999-11-03T19:31:00"
  }],
  relationships: { mira_917: 10, juniper_gdn: 12, darkraven_xx: 5, orbit_guide: 10, chip_bytebarn: 8, toni_pizza: 10, bev_paws: 12, pulsenet_jax: 8, axiom_liaison_02: 6, cubby_clover: 10, rocketbox_rick: 8, major_munch: 10, kip_toonburst: 9, king_cal: -2, honest_earl: -3, lagmaster_99: 4, velvet_mage: 7, player_four: 10, modkit_maddy: 8, quarter_queen: 7, code_dex: 9, deckwrecker_dee: 6, crankcase_cole: 8, neonblade_nico: 9, tiderider_ty: 8, throttle_troy: 12, scootlord_ollie: 5, veloce_viktor: -8, catnap_carla: 10, fetchquest_ray: 9, bunbrigade_bea: 11, hamcam_hal: 7, iguana_iris: 6, skunkuncle_sam: 8, mossmunch_mel: 9, blipzo_believer_88: 7, tapeattic_tess: 10, prismpilot_aya: 8, deepdelver_dot: 9, mapmouse_mina: 10, road_hog_ron: 7, grandma_dot: 12, colonel_hal: 6, railroad_lenny: 8, big_bass_bob: 9, rosepatch_ruth: 8, hearthside_ellen: 5, snacktime_sue: 7, trailnote_tom: 6, paperbird_pam: 8, rhymetape_rico: 7, faxmoth_13: 4, nullindex: 2, cedar_wren: 1, static_abel: 0, orchard_lee: 3, skywatch_sam: 1, ghostline: 0, rewind_riley: 8, bubble_babs: 8, petal_pat: 10, faraway_frankie: 7, inkmoth_ian: 6, sofa_sylvia: 7, dr_marlow: 8, gurgle_gus: 6, nest_nora: 8, halo_holly: 9 }
};

const PAGE_OWNERS: Record<string, { screenName: string; displayName: string }> = {
  orbit_guide: { screenName: "OrbitPal", displayName: "Orbit Pal" },
  juniper_gdn: { screenName: "Juniper_Gdn", displayName: "Juniper" },
  mira_917: { screenName: "Mira_917", displayName: "Mira" },
  darkraven_xx: { screenName: "xX_DarkRaven_Xx", displayName: "DarkRaven" },
  chip_bytebarn: { screenName: "Chip_At_ByteBarn", displayName: "Chip" },
  toni_pizza: { screenName: "Toni_CosmicCrust", displayName: "Toni" },
  bev_paws: { screenName: "Bev_PawsNClaws", displayName: "Bev" },
  pulsenet_jax: { screenName: "PULSEnet_Jax", displayName: "Jax" },
  axiom_liaison_02: { screenName: "AXIOM_Liaison_02", displayName: "Axiom Liaison" },
  cubby_clover: { screenName: "CubbyClover", displayName: "Cubby" },
  rocketbox_rick: { screenName: "Rocketbox_Rick", displayName: "Rick" },
  major_munch: { screenName: "Major_Munch", displayName: "Major Munch" },
  kip_toonburst: { screenName: "Kip_ToonBurst", displayName: "Kip" },
  king_cal: { screenName: "KingCalCars", displayName: "King Cal" },
  honest_earl: { screenName: "Honest_Earl", displayName: "Earl" },
  lagmaster_99: { screenName: "LagMaster_99", displayName: "LagMaster" },
  velvet_mage: { screenName: "VelvetMage", displayName: "Velvet" },
  player_four: { screenName: "PlayerFourEver", displayName: "Player Four" },
  modkit_maddy: { screenName: "ModKit_Maddy", displayName: "Maddy" },
  quarter_queen: { screenName: "QuarterQueen", displayName: "Queenie" },
  code_dex: { screenName: "CodeDex", displayName: "Dex" },
  deckwrecker_dee: { screenName: "DeckWrecker_Dee", displayName: "Dee" },
  crankcase_cole: { screenName: "CrankCase_Cole", displayName: "Cole" },
  neonblade_nico: { screenName: "NeonBlade_Nico", displayName: "Nico" },
  tiderider_ty: { screenName: "TideRider_Ty", displayName: "Ty" },
  throttle_troy: { screenName: "Throttle_Troy", displayName: "Troy" },
  scootlord_ollie: { screenName: "ScootLord_Ollie", displayName: "Ollie" },
  veloce_viktor: { screenName: "Veloce_Viktor", displayName: "Viktor" },
  catnap_carla: { screenName: "CatNap_Carla", displayName: "Carla" },
  fetchquest_ray: { screenName: "FetchQuest_Ray", displayName: "Ray" },
  bunbrigade_bea: { screenName: "BunBrigade_Bea", displayName: "Bea" },
  hamcam_hal: { screenName: "HamCam_Hal", displayName: "Hal" },
  iguana_iris: { screenName: "Iguana_Iris", displayName: "Iris" },
  skunkuncle_sam: { screenName: "SkunkUncle_Sam", displayName: "Sam" },
  mossmunch_mel: { screenName: "MossMunch_Mel", displayName: "Mel" },
  blipzo_believer_88: { screenName: "BlipzoBeliever_88", displayName: "Trent" },
  tapeattic_tess: { screenName: "TapeAttic_Tess", displayName: "Tess" },
  prismpilot_aya: { screenName: "PrismPilot_Aya", displayName: "Aya" },
  deepdelver_dot: { screenName: "DeepDelver_Dot", displayName: "Dot" },
  mapmouse_mina: { screenName: "MapMouse_Mina", displayName: "Mina" },
  road_hog_ron: { screenName: "RoadHog_Ron", displayName: "Ron" },
  grandma_dot: { screenName: "Grandma_Dot", displayName: "Dot" },
  colonel_hal: { screenName: "Col_Hal_1863", displayName: "Hal" },
  railroad_lenny: { screenName: "Railroad_Lenny", displayName: "Lenny" },
  big_bass_bob: { screenName: "BigBass_Bob", displayName: "Bob" },
  rosepatch_ruth: { screenName: "RosePatch_Ruth", displayName: "Ruth" },
  hearthside_ellen: { screenName: "Hearthside_Ellen", displayName: "Ellen" },
  snacktime_sue: { screenName: "Snacktime_Sue", displayName: "Sue" },
  trailnote_tom: { screenName: "TrailNote_Tom", displayName: "Tom" },
  paperbird_pam: { screenName: "PaperBird_Pam", displayName: "Pam" },
  faxmoth_13: { screenName: "FaxMoth_13", displayName: "FaxMoth" },
  nullindex: { screenName: "IndexNull", displayName: "Index Null" },
  cedar_wren: { screenName: "CedarWren", displayName: "Cedar" },
  static_abel: { screenName: "StaticAbel", displayName: "Abel" },
  orchard_lee: { screenName: "OrchardLee", displayName: "Lee" },
  skywatch_sam: { screenName: "Skywatch_Sam", displayName: "Sam" },
  ghostline: { screenName: "ghostline", displayName: "Ghostline" },
  rewind_riley: { screenName: "RewindRiley", displayName: "Riley" },
  bubble_babs: { screenName: "BubbleBabs", displayName: "Babs" },
  petal_pat: { screenName: "PetalPat", displayName: "Pat" },
  faraway_frankie: { screenName: "FarawayFrankie", displayName: "Frankie" },
  inkmoth_ian: { screenName: "InkMoth_Ian", displayName: "Ian" },
  sofa_sylvia: { screenName: "SofaSafariSylvia", displayName: "Sylvia" },
  dr_marlow: { screenName: "DrMarlow_DDS", displayName: "Dr. Marlow" },
  gurgle_gus: { screenName: "GurgleGus", displayName: "Gus" },
  nest_nora: { screenName: "NestNora", displayName: "Nora" },
  halo_holly: { screenName: "HaloComb_Holly", displayName: "Holly" },
  ...NEWCOMER_OWNERS,
  ...SOUNDWAVE_OWNERS,
  ...PHASE_THREE_EXPLORER_OWNERS,
  ...DORMANT_LEGACY_OWNERS,
  system_core: { screenName: "SYSTEM", displayName: "Continuity System" }
};

const CHARACTER_CONTACTS: Record<string, {
  screenName: string;
  displayName: string;
  statusMessage: string;
  aim?: string;
  email?: string;
}> = {
  mira_917: { screenName: "Mira_917", displayName: "Mira", statusMessage: "still awake. unfortunately.", aim: "Mira_917" },
  juniper_gdn: { screenName: "Juniper_Gdn", displayName: "Juniper", statusMessage: "watering the web", email: "juniper@orbitmail.net" },
  darkraven_xx: { screenName: "xX_DarkRaven_Xx", displayName: "DarkRaven", statusMessage: "the truth is cached", aim: "xX_DarkRaven_Xx" },
  orbit_guide: { screenName: "OrbitPal", displayName: "Orbit Pal", statusMessage: "Click me if you need a hand!" },
  chip_bytebarn: { screenName: "Chip_At_ByteBarn", displayName: "Chip", statusMessage: "probably under a desk" },
  toni_pizza: { screenName: "Toni_CosmicCrust", displayName: "Toni", statusMessage: "one hand on the oven" },
  bev_paws: { screenName: "Bev_PawsNClaws", displayName: "Bev", statusMessage: "Pickles is on the keyboard" },
  pulsenet_jax: { screenName: "PULSEnet_Jax", displayName: "Jax", statusMessage: "lobby's open // everybody in" },
  axiom_liaison_02: { screenName: "AXIOM_Liaison_02", displayName: "Axiom Liaison", statusMessage: "a second world is waiting" },
  cubby_clover: { screenName: "CubbyClover", displayName: "Cubby", statusMessage: "controller four is still free!" },
  rocketbox_rick: { screenName: "Rocketbox_Rick", displayName: "Rick", statusMessage: "prototype survived the drop test!" },
  major_munch: { screenName: "Major_Munch", displayName: "Major Munch", statusMessage: "breakfast has landed!" },
  kip_toonburst: { screenName: "Kip_ToonBurst", displayName: "Kip", statusMessage: "rewinding Saturday" },
  king_cal: { screenName: "KingCalCars", displayName: "King Cal", statusMessage: "another chariot leaves the kingdom!" },
  honest_earl: { screenName: "Honest_Earl", displayName: "Earl", statusMessage: "honestly here for YOU, neighbor" },
  lagmaster_99: { screenName: "LagMaster_99", displayName: "LagMaster", statusMessage: "ping is a state of mind", aim: "LagMaster_99" },
  velvet_mage: { screenName: "VelvetMage", displayName: "Velvet", statusMessage: "mapping Ashglass by candlelight", aim: "VelvetMage" },
  player_four: { screenName: "PlayerFourEver", displayName: "Player Four", statusMessage: "controller four is always open" },
  modkit_maddy: { screenName: "ModKit_Maddy", displayName: "Maddy", statusMessage: "compiling. remain geometrically calm." },
  quarter_queen: { screenName: "QuarterQueen", displayName: "Queenie", statusMessage: "one credit. no continues." },
  code_dex: { screenName: "CodeDex", displayName: "Dex", statusMessage: "testing one more extremely specific rumor" },
  deckwrecker_dee: { screenName: "DeckWrecker_Dee", displayName: "Dee", statusMessage: "waxing a curb. mind your business." },
  crankcase_cole: { screenName: "CrankCase_Cole", displayName: "Cole", statusMessage: "trail's dry. send it." },
  neonblade_nico: { screenName: "NeonBlade_Nico", displayName: "Nico", statusMessage: "night session // eight wheels online" },
  tiderider_ty: { screenName: "TideRider_Ty", displayName: "Ty", statusMessage: "dawn patrol, maybe" },
  throttle_troy: { screenName: "Throttle_Troy", displayName: "Troy", statusMessage: "317 ready for Sunday" },
  scootlord_ollie: { screenName: "ScootLord_Ollie", displayName: "Ollie", statusMessage: "THUNDER SCOOT 2.0 IS COMING" },
  veloce_viktor: { screenName: "Veloce_Viktor", displayName: "Viktor", statusMessage: "away // marina reception" },
  catnap_carla: { screenName: "CatNap_Carla", displayName: "Carla", statusMessage: "Mr. Boots is on the keyboard" },
  fetchquest_ray: { screenName: "FetchQuest_Ray", displayName: "Ray", statusMessage: "one more throw!" },
  bunbrigade_bea: { screenName: "BunBrigade_Bea", displayName: "Bea", statusMessage: "rebuilding the tunnel district" },
  hamcam_hal: { screenName: "HamCam_Hal", displayName: "Hal", statusMessage: "TubeNet node 17 online" },
  iguana_iris: { screenName: "Iguana_Iris", displayName: "Iris", statusMessage: "Gomez is basking. naturally." },
  skunkuncle_sam: { screenName: "SkunkUncle_Sam", displayName: "Sam", statusMessage: "cabinet latch revision four" },
  mossmunch_mel: { screenName: "MossMunch_Mel", displayName: "Mel", statusMessage: "rewinding episode 19 again" },
  blipzo_believer_88: { screenName: "BlipzoBeliever_88", displayName: "Trent", statusMessage: "STORE 00 IS REAL" },
  tapeattic_tess: { screenName: "TapeAttic_Tess", displayName: "Tess", statusMessage: "rewinding the weather special" },
  prismpilot_aya: { screenName: "PrismPilot_Aya", displayName: "Aya", statusMessage: "frame 05 contains six colors" },
  deepdelver_dot: { screenName: "DeepDelver_Dot", displayName: "Dot", statusMessage: "depth counter stuck at 999" },
  mapmouse_mina: { screenName: "MapMouse_Mina", displayName: "Mina", statusMessage: "north is taking the afternoon off" },
  road_hog_ron: { screenName: "RoadHog_Ron", displayName: "Ron", statusMessage: "chrome side up" },
  grandma_dot: { screenName: "Grandma_Dot", displayName: "Dot", statusMessage: "please use my NEW page" },
  colonel_hal: { screenName: "Col_Hal_1863", displayName: "Hal", statusMessage: "checking the primary source" },
  railroad_lenny: { screenName: "Railroad_Lenny", displayName: "Lenny", statusMessage: "main line is clear" },
  big_bass_bob: { screenName: "BigBass_Bob", displayName: "Bob", statusMessage: "probably at the north reeds" },
  rosepatch_ruth: { screenName: "RosePatch_Ruth", displayName: "Ruth", statusMessage: "waiting for the seed catalog" },
  hearthside_ellen: { screenName: "Hearthside_Ellen", displayName: "Ellen", statusMessage: "away from the upstairs computer" },
  snacktime_sue: { screenName: "Snacktime_Sue", displayName: "Sue", statusMessage: "probably driving somebody somewhere" },
  trailnote_tom: { screenName: "TrailNote_Tom", displayName: "Tom", statusMessage: "out until the weather turns" },
  paperbird_pam: { screenName: "PaperBird_Pam", displayName: "Pam", statusMessage: "glue drying, computer clicking" },
  rhymetape_rico: { screenName: "RhymeTape_Rico", displayName: "Rico", statusMessage: "label your beats before mailing them", aim: "RhymeTape_Rico" },
  faxmoth_13: { screenName: "FaxMoth_13", displayName: "FaxMoth", statusMessage: "paper first, theory second" },
  nullindex: { screenName: "IndexNull", displayName: "Index Null", statusMessage: "404 is still a response" },
  cedar_wren: { screenName: "CedarWren", displayName: "Cedar", statusMessage: "checking the boring attachment" },
  static_abel: { screenName: "StaticAbel", displayName: "Abel", statusMessage: "group count does not match" },
  orchard_lee: { screenName: "OrchardLee", displayName: "Lee", statusMessage: "archives do not interpret themselves" },
  skywatch_sam: { screenName: "Skywatch_Sam", displayName: "Sam", statusMessage: "three lights, four explanations" },
  ghostline: { screenName: "ghostline", displayName: "Ghostline", statusMessage: "more than meets the index", aim: "ghostline" },
  rewind_riley: { screenName: "RewindRiley", displayName: "Riley", statusMessage: "rewinding the returns bin" },
  bubble_babs: { screenName: "BubbleBabs", displayName: "Babs", statusMessage: "last wash starts at 9:15" },
  petal_pat: { screenName: "PetalPat", displayName: "Pat", statusMessage: "out on a flower delivery" },
  faraway_frankie: { screenName: "FarawayFrankie", displayName: "Frankie", statusMessage: "stapling an itinerary" },
  inkmoth_ian: { screenName: "InkMoth_Ian", displayName: "Ian", statusMessage: "copier two is behaving today" },
  sofa_sylvia: { screenName: "SofaSafariSylvia", displayName: "Sylvia", statusMessage: "somewhere behind the dinette sets" },
  dr_marlow: { screenName: "DrMarlow_DDS", displayName: "Dr. Marlow", statusMessage: "Kevin the fish is accepting visitors" },
  gurgle_gus: { screenName: "GurgleGus", displayName: "Gus", statusMessage: "van radio only" },
  nest_nora: { screenName: "NestNora", displayName: "Nora", statusMessage: "at the teller window until five" },
  halo_holly: { screenName: "HaloComb_Holly", displayName: "Holly", statusMessage: "Saturday is almost booked" }
};

const CHARACTER_HOME_URLS: Record<string, string> = {
  mira_917: "web://nightsignal.net/home",
  juniper_gdn: "web://rainbow.gdn/home",
  darkraven_xx: "web://raven.web/home",
  orbit_guide: "web://home",
  chip_bytebarn: "web://bytebarn.com/home",
  toni_pizza: "web://cosmiccrust.biz/home",
  bev_paws: "web://pawsnclaws.net/home",
  pulsenet_jax: "web://pulsenet.red/home",
  axiom_liaison_02: "web://vanta2.com/home",
  cubby_clover: "web://cubit.fun/home",
  rocketbox_rick: "web://rocketbox.toys/home",
  major_munch: "web://moonmunch.com/home",
  kip_toonburst: "web://toonburst.tv/home",
  king_cal: "web://kingcalscars.biz/home",
  honest_earl: "web://honestearl.com/home",
  lagmaster_99: "web://gamegrid.zone/users/lagmaster99/home",
  velvet_mage: "web://gamegrid.zone/users/velvetmage/home",
  player_four: "web://gamegrid.zone/users/player4ever/home",
  modkit_maddy: "web://gamegrid.zone/users/modkitmaddy/home",
  quarter_queen: "web://gamegrid.zone/users/quarterqueen/home",
  code_dex: "web://gamegrid.zone/users/codedex/home",
  deckwrecker_dee: "web://xtreme.zone/users/deckwreckerdee/home",
  crankcase_cole: "web://xtreme.zone/users/crankcasecole/home",
  neonblade_nico: "web://xtreme.zone/users/neonbladenico/home",
  tiderider_ty: "web://xtreme.zone/users/tideriderty/home",
  throttle_troy: "web://xtreme.zone/users/throttletroy/home",
  scootlord_ollie: "web://xtreme.zone/users/scootlordollie/home",
  veloce_viktor: "web://xtreme.zone/users/veloceviktor/home",
  catnap_carla: "web://petplanet.zone/users/catnapcarla/home",
  fetchquest_ray: "web://petplanet.zone/users/fetchquestray/home",
  bunbrigade_bea: "web://petplanet.zone/users/bunbrigadebea/home",
  hamcam_hal: "web://petplanet.zone/users/hamcamhal/home",
  iguana_iris: "web://petplanet.zone/users/iguanairis/home",
  skunkuncle_sam: "web://petplanet.zone/users/skunkunclesam/home",
  mossmunch_mel: "web://fanverse.zone/users/mossmunchmel/home",
  blipzo_believer_88: "web://fanverse.zone/users/blipzobeliever88/home",
  tapeattic_tess: "web://fanverse.zone/users/tapeattictess/home",
  prismpilot_aya: "web://fanverse.zone/users/prismpilotaya/home",
  deepdelver_dot: "web://fanverse.zone/users/deepdelverdot/home",
  mapmouse_mina: "web://fanverse.zone/users/mapmousemina/home",
  road_hog_ron: "web://yesterday.zone/users/roadhogron/home",
  grandma_dot: "web://yesterday.zone/users/grandmadot/home",
  colonel_hal: "web://yesterday.zone/users/colonelhal/home",
  railroad_lenny: "web://yesterday.zone/users/railroadlenny/home",
  big_bass_bob: "web://yesterday.zone/users/bigbassbob/home",
  rosepatch_ruth: "web://rosepatch.home/garden",
  hearthside_ellen: "web://hearthside.home/welcome",
  snacktime_sue: "web://snacktime.home/mompage",
  trailnote_tom: "web://trailnotes.home/index",
  paperbird_pam: "web://paperbird.home/crafts",
  faxmoth_13: "web://foldedwire.net/home",
  nullindex: "web://index-null.net/home",
  cedar_wren: "web://quiet-county.org/home",
  static_abel: "web://morrow-five.net/home",
  orchard_lee: "web://archive.orbitnet.local/labs/home",
  skywatch_sam: "web://glasslake-field.gov/home",
  ghostline: "web://raven.web/vault",
  rewind_riley: "web://rewindharbor.video/home",
  bubble_babs: "web://bubbleborough.com/home",
  petal_pat: "web://snapdragonstring.floral/home",
  faraway_frankie: "web://farawaydesk.travel/home",
  inkmoth_ian: "web://inkmoth.copy/home",
  sofa_sylvia: "web://sofasafari.furn/home",
  dr_marlow: "web://molarmeadow.dent/home",
  gurgle_gus: "web://gurglebros.plumb/home",
  nest_nora: "web://neighbornest.cu/home",
  halo_holly: "web://halocomb.salon/home",
  ...NEWCOMER_HOME_URLS,
  ...SOUNDWAVE_HOME_URLS,
  ...DORMANT_LEGACY_HOME_URLS,
  system_core: "web://legacy.orbitos.local/admin/continuity"
};

const GAME_TIME_SCALE = 2;
const AMBIENT_POST_MAX_ATTEMPTS = 3;
const PHASE_TWO_COMMENTERS = ["cedar_wren", "static_abel", "orchard_lee", "skywatch_sam"] as const;
const PHASE_THREE_COMMENTERS = [...PHASE_TWO_COMMENTERS, ...PHASE_THREE_EXPLORER_IDS];
const MYSTERY_TERMINALS: Record<string, string> = {
  "web://morrow-five.net/decoded": "morrow_five",
  "web://glasslake-field.gov/report": "glass_lake",
  "web://quiet-county.org/case": "quiet_county",
  "web://archive.orbitnet.local/labs/findings": "adaptive_index"
};
const PHASE_TWO_MAIN_MYSTERIES = ["morrow_five", "glass_lake", "quiet_county"] as const;
const REQUIRED_PHASE_THREE_MYSTERIES = Object.values(MYSTERY_TERMINALS);

interface WindowModel {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  z: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const windows: Record<AppId, WindowModel> = {
  browser: { open: true, minimized: false, maximized: false, z: 3, x: 96, y: 44, width: 900, height: 600 },
  mail: { open: false, minimized: false, maximized: false, z: 2, x: 205, y: 94, width: 660, height: 470 },
  files: { open: false, minimized: false, maximized: false, z: 1, x: 255, y: 126, width: 590, height: 410 },
  chat: { open: false, minimized: false, maximized: false, z: 4, x: 190, y: 72, width: 620, height: 520 },
  settings: { open: false, minimized: false, maximized: false, z: 1, x: 260, y: 70, width: 590, height: 540 },
  helper: { open: false, minimized: false, maximized: false, z: 5, x: 635, y: 250, width: 410, height: 390 }
};

const APP_META: Record<AppId, { icon: string; title: string }> = {
  browser: { icon: "O", title: "Orbit Explorer" },
  mail: { icon: "@", title: "Orbit Mail" },
  files: { icon: "▣", title: "My Files" },
  chat: { icon: "◎", title: "OIM" },
  settings: { icon: "⚙", title: "Desktop Settings" },
  helper: { icon: "?", title: "Orbit Pal" }
};

const EMPTY_AI_CONVERSATION: AiConversation = {
  persona: { id: "mira_917", screenName: "Mira_917", displayName: "Mira", statusMessage: "offline" },
  messages: []
};

const EMPTY_AI_STATUS: AiStatus = {
  phase: "offline",
  modelAvailable: false,
  modelName: "Qwen3-4B Q4_K_M",
  modelFile: "",
  persona: EMPTY_AI_CONVERSATION.persona,
  backend: null,
  loadMs: null,
  warmupMs: null,
  warmed: false,
  error: null
};

let state = structuredClone(DEFAULT_STATE);
let history: string[] = [state.currentUrl];
let historyIndex = 0;
let topZ = 3;
let startOpen = false;
let notification = "";
let aiConversation = structuredClone(EMPTY_AI_CONVERSATION);
let aiStatus = structuredClone(EMPTY_AI_STATUS);
let chatBusy = false;
let chatPendingMessage = "";
let chatError = "";
let chatStartedAt = 0;
let startupStage: StartupStage = new URLSearchParams(window.location.search).has("skipBoot") ? "desktop" : "title";
let startupTimer: number | null = null;
let startupStatusTimer: number | null = null;
let bootMonitorZoom = { originX: 0, originY: 0, panX: 0, panY: 0 };
let loginNameError = "";
let computerHasBooted = startupStage === "desktop";
let sleepDialogOpen = false;
let phaseTransition: {
  phase: 2 | 3 | 4;
  sleptFrom: string;
  wokeAt: string;
} | null = null;
let lastGameClockTick = performance.now();
let lastClockSave = performance.now();
let ambientQueueProcessing = false;
const pendingPageComments = new Set<string>();
const pageCommentErrors = new Map<string, string>();
const storyFormErrors = new Map<string, string>();
const pendingDirectReplies = new Set<string>();
let activeAimOwnerId = "mira_917";
let mailComposeOwnerId: string | null = null;
let selectedMailMessageId: string | null = null;
let helperPanelOpen = false;
let pageMusicPlaying = true;
let loadedPageMusicKey: string | null = null;
const pageMusicTrackIndexes = new Map<string, number>();
const semanticSearchCache = new Map<string, string[]>();
const pendingSearches = new Set<string>();
const browserScrollPositions = new Map<string, number>();
let renderedBrowserUrl = state.currentUrl;

const root = document.querySelector<HTMLDivElement>("#app")!;

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function formatDuration(milliseconds: number | null) {
  if (milliseconds === null) return "—";
  return milliseconds < 1000 ? `${milliseconds}ms` : `${(milliseconds / 1000).toFixed(1)}s`;
}

function normalizePlayerName(value: unknown) {
  return String(value ?? "").trim().replace(/\s+/g, " ").slice(0, 20);
}

function playerName() {
  return state.playerName || "Player";
}

async function loadState() {
  if (window.gameAPI) return normalizeState(await window.gameAPI.load());
  const stored = localStorage.getItem("surfin-save");
  return stored ? normalizeState(JSON.parse(stored)) : structuredClone(DEFAULT_STATE);
}

function normalizeState(loaded: Partial<GameState>): GameState {
  const playerName = loaded.playerName === undefined && Number(loaded.version ?? 0) < 5
    ? "David"
    : normalizePlayerName(loaded.playerName);
  const storyPhase = loaded.flags?.continuity_console_unlocked
    ? 4
    : loaded.storyPhase === 2 || loaded.storyPhase === 3 || loaded.storyPhase === 4 ? loaded.storyPhase : 1;
  return {
    ...structuredClone(DEFAULT_STATE),
    ...loaded,
    version: DEFAULT_STATE.version,
    playerName,
    storyPhase,
    discoveredMysteries: Array.isArray(loaded.discoveredMysteries) ? [...new Set(loaded.discoveredMysteries.map(String))] : [],
    settings: { ...DEFAULT_STATE.settings, ...(loaded.settings ?? {}) },
    pageComments: Array.isArray(loaded.pageComments) ? loaded.pageComments : [],
    ambientPostQueue: Array.isArray(loaded.ambientPostQueue) ? loaded.ambientPostQueue : [],
    pageVisitCounts: { ...DEFAULT_STATE.pageVisitCounts, ...(loaded.pageVisitCounts ?? {}) },
    guestbookEntries: { ...(loaded.guestbookEntries ?? {}) },
    directMessages: Array.isArray(loaded.directMessages) ? loaded.directMessages : [],
    relationships: { ...DEFAULT_STATE.relationships, ...(loaded.relationships ?? {}) }
  };
}

async function saveState() {
  if (window.gameAPI) await window.gameAPI.save(state);
  else localStorage.setItem("surfin-save", JSON.stringify(state));
}

function crossedGameHourBoundaries(before: Date, after: Date) {
  const hour = 60 * 60 * 1000;
  return Math.max(0, Math.floor(after.getTime() / hour) - Math.floor(before.getTime() / hour));
}

function ambientCommentHomepages() {
  return Object.values(pages).filter((page) => pageAvailable(page) && page.commentsEnabled && page.url.endsWith("/home"));
}

function ambientPostingPersonaIds() {
  const pageOwners = Object.values(pages).filter(pageAvailable).map((page) => page.ownerId);
  const phaseCommenters = state.storyPhase >= 3
    ? PHASE_THREE_COMMENTERS
    : state.storyPhase >= 2 ? PHASE_TWO_COMMENTERS : [];
  return [...new Set([...pageOwners, ...phaseCommenters])]
    .filter((personaId) =>
      personaId !== "system_core" &&
      !DORMANT_LEGACY_PERSONA_IDS.has(personaId) &&
      Boolean(PAGE_OWNERS[personaId])
    );
}

function extractAmbientPageContext(page: PageDefinition) {
  const container = document.createElement("div");
  container.innerHTML = page.render(state);
  return (container.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 3000);
}

function queueAmbientPostRolls(hoursElapsed: number, createdAt: string) {
  if (hoursElapsed < 1) return;
  const homepages = ambientCommentHomepages();
  if (!homepages.length) return;
  const chancePerHour = state.storyPhase === 3 ? 0.07 : state.storyPhase === 2 ? 0.035 : 0.02;
  const maximumChance = state.storyPhase === 3 ? 0.50 : state.storyPhase === 2 ? 0.30 : 0.20;
  const jobs: AmbientPostJob[] = [];
  for (const personaId of ambientPostingPersonaIds()) {
    const activity = ambientActivityFor(personaId);
    const chance = Math.min(
      hoursElapsed * chancePerHour * activity.rateMultiplier,
      Math.min(0.85, maximumChance * activity.capMultiplier)
    );
    if (Math.random() >= chance) continue;
    const page = homepages[Math.floor(Math.random() * homepages.length)] ?? homepages[0];
    jobs.push({
      id: crypto.randomUUID(),
      personaId,
      pageUrl: page.url,
      createdAt,
      attempts: 0
    });
  }
  if (!jobs.length) return;
  state.ambientPostQueue.push(...jobs);
  void saveState().then(() => processAmbientPostQueue()).catch(() => {
    // Keep the queued jobs in memory; a later clock save or model status poll can retry them.
  });
}

const RUMOR_PUBLIC_IMPERSONATORS = [
  "code_dex",
  "big_bass_bob",
  "faxmoth_13",
  "nullindex",
  "darkraven_xx",
  "mira_917"
] as const;
const RUMOR_AIM_IMPERSONATORS = ["mira_917", "darkraven_xx", "ghostline"] as const;
const RUMOR_EMAIL_IMPERSONATORS = ["juniper_gdn"] as const;

function systemHintFlags(prefix: string) {
  return Object.keys(state.flags).filter((key) => key.startsWith(prefix) && state.flags[key]);
}

function borrowedScreenName(ownerId: string, phase: StoryPhase) {
  const original = PAGE_OWNERS[ownerId]?.screenName ?? ownerId;
  const lookalikes: Record<string, string> = {
    "0": "O", "1": "l", "2": "Z", "3": "E", "4": "A",
    "5": "S", "6": "G", "7": "T", "8": "B", "9": "g",
    O: "0", o: "0", l: "1", I: "1", S: "5", s: "5", B: "8", b: "8", E: "3", e: "3", A: "4", a: "4", T: "7", t: "7"
  };
  const mutable = [...original].map((character, index) => ({ character, index })).filter(({ character }) => lookalikes[character]);
  if (!mutable.length) return phase === 2 ? `${original}_` : `${original.slice(0, Math.max(3, original.length - 3))}00`;

  const changed = [...original];
  const mutationCount = phase === 2 ? 1 : Math.min(4, Math.max(2, Math.ceil(original.length / 6)));
  for (let mutation = 0; mutation < mutationCount; mutation += 1) {
    const candidate = mutable[(Math.floor(Math.random() * mutable.length) + mutation) % mutable.length];
    changed[candidate.index] = lookalikes[changed[candidate.index]] ?? lookalikes[candidate.character] ?? changed[candidate.index];
  }
  if (phase === 3 && changed.length > 8) {
    const spliceAt = Math.max(2, Math.floor(changed.length * 0.65));
    changed.splice(spliceAt, Math.min(3, changed.length - spliceAt));
  }
  return changed.join("");
}

function addSystemHintComment(text: string, authorOwnerId: string, createdAt: string, hintId: string) {
  const targets = ambientCommentHomepages().filter((page) => page.ownerId !== authorOwnerId);
  const page = targets[Math.floor(Math.random() * targets.length)] ?? targets[0];
  if (!page) return false;
  state.pageComments.push({
    id: `system-hint-${hintId}-${crypto.randomUUID()}`,
    pageUrl: page.url,
    ownerId: authorOwnerId,
    role: "visitor",
    author: borrowedScreenName(authorOwnerId, state.storyPhase),
    text,
    createdAt,
    revealAfterVisit: (state.pageVisitCounts[page.url] ?? 0) + 1
  });
  return true;
}

function addSystemHintDirectMessage(text: string, channel: "aim" | "email", createdAt: string, hintId: string) {
  const candidates = channel === "aim" ? RUMOR_AIM_IMPERSONATORS : RUMOR_EMAIL_IMPERSONATORS;
  const ownerId = candidates[Math.floor(Math.random() * candidates.length)] ?? candidates[0];
  state.directMessages.push({
    id: `system-hint-${hintId}-${crypto.randomUUID()}`,
    ownerId,
    channel,
    role: "owner",
    author: borrowedScreenName(ownerId, state.storyPhase),
    text,
    subject: channel === "email" ? "you should look at this before it moves" : undefined,
    createdAt
  });
  return true;
}

function addDormantLegacyTrailComment(
  createdAt: string,
  requestedAccount?: (typeof DORMANT_LEGACY_ACCOUNTS)[number],
  requestedPageUrl?: string
) {
  const availableAccounts = DORMANT_LEGACY_ACCOUNTS.filter((account) =>
    !state.flags[`system_legacy_${account.id}`]
  );
  const account = requestedAccount && !state.flags[`system_legacy_${requestedAccount.id}`]
    ? requestedAccount
    : availableAccounts[Math.floor(Math.random() * availableAccounts.length)];
  if (!account) return false;

  const targets = ambientCommentHomepages().filter((page) =>
    page.ownerId !== account.id && !DORMANT_LEGACY_PERSONA_IDS.has(page.ownerId)
  );
  const requestedTarget = requestedPageUrl ? pages[requestedPageUrl] : null;
  const page = requestedTarget?.commentsEnabled
    ? requestedTarget
    : targets[Math.floor(Math.random() * targets.length)] ?? targets[0];
  if (!page) return false;

  state.pageComments.push({
    id: `system-legacy-${account.id}-${crypto.randomUUID()}`,
    pageUrl: page.url,
    ownerId: account.id,
    role: "visitor",
    author: account.screenName,
    text: account.rumor,
    createdAt,
    revealAfterVisit: (state.pageVisitCounts[page.url] ?? 0) + 1
  });
  state.flags[`system_legacy_${account.id}`] = true;
  return true;
}

function seedDormantLegacyTrailComments(hoursElapsed: number, createdAt: string) {
  if (state.storyPhase !== 3 || hoursElapsed < 1) return;
  const maximumComments = Math.min(4, Math.max(1, Math.ceil(hoursElapsed / 5)));
  const chance = Math.min(0.95, 0.32 + hoursElapsed * 0.08);
  let added = false;
  for (let index = 0; index < maximumComments; index += 1) {
    if (Math.random() >= chance || !addDormantLegacyTrailComment(createdAt)) break;
    added = true;
  }
  if (added) void saveState();
}

function seedOneSystemRumorHint(createdAt: string) {
  const unusedRumors = SYSTEM_RUMORS.filter((rumor) => !state.flags[`system_rumor_${rumor.id}`]);
  const unusedOrphans = ORPHAN_RUMORS
    .map((text, index) => ({ id: `orphan_${index + 1}`, text }))
    .filter((rumor) => !state.flags[`system_rumor_${rumor.id}`]);
  const chooseOrphan = state.storyPhase === 3 && unusedOrphans.length > 0 && (unusedRumors.length === 0 || Math.random() < 0.42);
  const selected = chooseOrphan
    ? unusedOrphans[Math.floor(Math.random() * unusedOrphans.length)]
    : unusedRumors[Math.floor(Math.random() * unusedRumors.length)];
  if (!selected) return false;

  const text = "url" in selected
    ? state.storyPhase === 3 ? selected.desperateHint : selected.hint
    : selected.text;
  const publishedCount = systemHintFlags("system_rumor_").length;
  const surface = publishedCount % 3;
  const added = surface === 0
    ? addSystemHintComment(text, RUMOR_PUBLIC_IMPERSONATORS[publishedCount % RUMOR_PUBLIC_IMPERSONATORS.length], createdAt, selected.id)
    : addSystemHintDirectMessage(text, surface === 1 ? "aim" : "email", createdAt, selected.id);
  if (added) state.flags[`system_rumor_${selected.id}`] = true;
  return added;
}

function seedSystemRumorHints(hoursElapsed: number, createdAt: string) {
  if (hoursElapsed < 1 || state.storyPhase < 2 || state.storyPhase >= 4) return;
  seedDormantLegacyTrailComments(hoursElapsed, createdAt);
  const chance = state.storyPhase === 3
    ? Math.min(0.85, hoursElapsed * 0.22)
    : Math.min(0.35, hoursElapsed * 0.08);
  if (Math.random() >= chance) return;
  const maximumHints = state.storyPhase === 3 ? Math.min(3, Math.max(1, Math.ceil(hoursElapsed / 4))) : 1;
  for (let index = 0; index < maximumHints; index += 1) {
    if (!seedOneSystemRumorHint(createdAt)) break;
    if (state.storyPhase === 2 || Math.random() >= 0.55) break;
  }
  void saveState();
}

async function processAmbientPostQueue() {
  if (ambientQueueProcessing || !window.aiAPI || !aiStatus.warmed || !state.ambientPostQueue.length) return;
  ambientQueueProcessing = true;
  try {
    while (state.ambientPostQueue.length && window.aiAPI && aiStatus.warmed) {
      const job = state.ambientPostQueue[0];
      const page = pages[job.pageUrl];
      if (!page?.commentsEnabled) {
        state.ambientPostQueue.shift();
        await saveState();
        continue;
      }
      try {
        const existingComments = [...(page.seedComments ?? []), ...state.pageComments]
          .filter((comment) => comment.pageUrl === page.url)
          .map((comment) => ({ role: comment.role, author: comment.author, text: comment.text }));
        const result = await window.aiAPI.ambientComment({
          personaId: job.personaId,
          pageOwnerId: page.ownerId,
          pageUrl: page.url,
          pageTitle: page.title,
          pageSummary: page.summary,
          pageContext: extractAmbientPageContext(page),
          existingComments,
          storyPhase: state.storyPhase
        });
        state.pageComments.push({
          id: crypto.randomUUID(),
          pageUrl: page.url,
          ownerId: job.personaId,
          role: job.personaId === page.ownerId ? "owner" : "visitor",
          author: result.author.screenName,
          text: result.text,
          createdAt: job.createdAt,
          revealAfterVisit: (state.pageVisitCounts[page.url] ?? 0) + 1
        });
        state.ambientPostQueue.shift();
        aiStatus = await window.aiAPI.status();
        await saveState();
      } catch {
        job.attempts += 1;
        if (job.attempts >= AMBIENT_POST_MAX_ATTEMPTS) state.ambientPostQueue.shift();
        await saveState();
        break;
      }
    }
  } finally {
    ambientQueueProcessing = false;
  }
}

function pageAvailable(page: PageDefinition) {
  return (page.minimumPhase ?? 1) <= state.storyPhase;
}

function currentPage() {
  if (state.currentUrl.startsWith("web://search?")) return orbitSearchPage(state.currentUrl);
  const page = pages[state.currentUrl];
  return page && pageAvailable(page) ? page : notFoundPage(state.currentUrl);
}

const SEARCH_CONCEPTS: Record<string, string[]> = {
  food: ["pizza", "restaurant", "dinner", "lunch", "takeout"],
  eat: ["pizza", "restaurant", "dinner", "food"],
  animal: ["pet", "pets", "cat", "dog", "fish", "bird"],
  animals: ["pet", "pets", "cat", "dog", "fish", "bird"],
  technology: ["computer", "hardware", "software", "modem"],
  tech: ["computer", "hardware", "software", "modem"],
  pc: ["computer", "hardware"],
  game: ["games", "gaming", "console", "videogame"],
  games: ["game", "gaming", "console", "videogame"],
  videogame: ["game", "games", "gaming", "console"],
  gaming: ["game", "games", "videogame", "console"],
  console: ["game", "games", "gaming", "videogame"],
  arcade: ["game", "games", "console", "multiplayer"],
  multiplayer: ["game", "games", "console", "arcade"],
  shopping: ["store", "shop", "business"],
  toy: ["toys", "kids", "action figure", "playset"],
  toys: ["toy", "kids", "action figure", "playset"],
  kid: ["kids", "toy", "toys", "cartoon", "cereal"],
  kids: ["kid", "toy", "toys", "cartoon", "cereal"],
  breakfast: ["cereal", "food", "marshmallow"],
  cereal: ["breakfast", "food", "marshmallow"],
  cartoon: ["cartoons", "animation", "television", "tv", "kids"],
  cartoons: ["cartoon", "animation", "television", "tv", "kids"],
  television: ["tv", "cartoon", "cartoons", "shows"],
  tv: ["television", "cartoon", "cartoons", "shows"],
  car: ["cars", "auto", "vehicle", "used", "dealer", "dealership"],
  cars: ["car", "auto", "vehicle", "used", "dealer", "dealership"],
  auto: ["car", "cars", "vehicle", "used", "dealer", "dealership"],
  vehicle: ["car", "cars", "auto", "used", "dealer"],
  used: ["car", "cars", "auto", "vehicle", "dealer"],
  dealer: ["dealership", "car", "cars", "auto", "financing"],
  dealership: ["dealer", "car", "cars", "auto", "financing"],
  loan: ["financing", "credit", "dealer", "car"],
  credit: ["financing", "loan", "dealer", "car"]
};

function lexicalSearchResults(query: string) {
  if (query.length < 2) return [];
  const queryWords: string[] = query.match(/[a-z0-9]+/g) ?? [];
  const expandedWords = new Set(queryWords.flatMap((word) => [word, ...(SEARCH_CONCEPTS[word] ?? [])]));
  return Object.values(pages)
    .filter(pageAvailable)
    .filter((page) => page.searchable !== false)
    .map((page) => {
      const haystack = [page.url, page.title, page.summary, ...(page.searchTerms ?? [])].join(" ").toLowerCase();
      const exactMatch = haystack.includes(query);
      if (page.listed === false && !exactMatch) return { page, score: 0 };
      let score = exactMatch ? 20 : 0;
      for (const word of expandedWords) {
        if (haystack.includes(word)) score += queryWords.includes(word) ? 5 : 2;
      }
      return { page, score };
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.page.title.localeCompare(right.page.title))
    .map(({ page }) => page);
}

function orbitSearchPage(url: string): PageDefinition {
  const query = new URLSearchParams(url.split("?")[1] ?? "").get("q")?.trim().toLowerCase() ?? "";
  const lexicalResults = lexicalSearchResults(query);
  const semanticUrls = semanticSearchCache.get(query) ?? [];
  const results = [...lexicalResults, ...semanticUrls.map((resultUrl) => pages[resultUrl]).filter(Boolean)]
    .filter((page, index, all) => all.findIndex((candidate) => candidate.url === page.url) === index);
  const smartSearching = pendingSearches.has(query);
  const smartMatched = semanticSearchCache.has(query);
  return {
    url,
    title: `Search: ${query || "OrbitNet"}`,
    site: "orbithome",
    ownerId: "orbit_guide",
    summary: `OrbitNet search results for ${query}.`,
    render: () => `<main class="page directory-page search-results-page">
      <header class="directory-logo"><span>ORBIT</span><b>SEARCH</b></header>
      <form class="search-box orbit-search-form"><input name="query" value="${escapeHtml(query)}" aria-label="Search OrbitNet"><button>Search</button></form>
      <p>Found <b>${results.length}</b> page${results.length === 1 ? "" : "s"} matching “${escapeHtml(query)}”.</p>
      <p class="smart-search-status ${smartSearching ? "working" : ""}">${smartSearching ? "OrbitNet Smart Match is checking related ideas…" : smartMatched ? "Smart matching complete." : aiStatus.warmed ? "Smart matching available." : "Showing instant index matches."}</p>
      <section class="search-results">
        ${results.length ? results.map((page) => `<button data-nav="${page.url}"><b>${escapeHtml(page.title)}</b><span>${escapeHtml(page.summary)}</span><code>${page.url}</code></button>`).join("") : `<p>No pages found. Try a screen name, unusual phrase, or address fragment.</p>`}
      </section>
      <button data-nav="web://home">← Directory home</button>
    </main>`
  };
}

async function requestSemanticSearch(query: string) {
  if (!window.aiAPI || !aiStatus.warmed || semanticSearchCache.has(query) || pendingSearches.has(query)) return;
  pendingSearches.add(query);
  render();
  try {
    const result = await window.aiAPI.search({
      query,
      pages: Object.values(pages)
        .filter(pageAvailable)
        .filter((page) => page.searchable !== false && page.listed !== false)
        .map((page) => ({ url: page.url, title: page.title, summary: page.summary }))
    });
    semanticSearchCache.set(query, result.urls.filter((resultUrl) => Boolean(pages[resultUrl])));
  } catch {
    semanticSearchCache.set(query, []);
  } finally {
    pendingSearches.delete(query);
    const activeQuery = state.currentUrl.startsWith("web://search?")
      ? new URLSearchParams(state.currentUrl.split("?")[1] ?? "").get("q")?.trim().toLowerCase()
      : null;
    if (activeQuery === query) render();
  }
}

function submitOrbitSearch(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return;
  navigate(`web://search?q=${encodeURIComponent(normalized)}`);
  void requestSemanticSearch(normalized);
}

function addAuthoredDirectMessage(id: string, ownerId: string, author: string, text: string, channel: "aim" | "email" = "aim", subject?: string) {
  if (state.directMessages.some((message) => message.id === id)) return;
  state.directMessages.push({
    id,
    ownerId,
    channel,
    role: "owner",
    author,
    text,
    subject,
    createdAt: state.gameTime
  });
}

function addPhaseThreeLeakComments() {
  const comments: Array<Pick<PageComment, "id" | "pageUrl" | "ownerId" | "role" | "author" | "text">> = [
    {
      id: "phase3-leak-toni",
      pageUrl: "web://bytebarn.com/home",
      ownerId: "toni_pizza",
      role: "visitor",
      author: "Toni_CosmicCrust",
      text: "Chip, your modem bundle looks good. Keep the line open—sorry, I meant keep one behind the counter for me."
    },
    {
      id: "phase3-leak-raven",
      pageUrl: "web://petplanet.zone/users/catnapcarla/home",
      ownerId: "darkraven_xx",
      role: "visitor",
      author: "xX_DarkRaven_Xx",
      text: "Modem is watching the phone jack again. Mr. Boots. I mean Mr. Boots. Different orange cat. Obviously."
    },
    {
      id: "phase3-leak-null",
      pageUrl: "web://cosmiccrust.biz/home",
      ownerId: "nullindex",
      role: "visitor",
      author: "IndexNull",
      text: "SESSION QUALITY RESTORED by pepperoni. That was a joke. Humans make jokes about pizza."
    }
  ];
  for (const comment of comments) {
    if (state.pageComments.some((entry) => entry.id === comment.id)) continue;
    state.pageComments.push({
      ...comment,
      createdAt: state.gameTime,
      revealAfterVisit: (state.pageVisitCounts[comment.pageUrl] ?? 0) + 1
    });
  }
}

function addPhaseThreeExplorerComments() {
  const comments: Array<Pick<PageComment, "id" | "pageUrl" | "ownerId" | "role" | "author" | "text">> = [
    {
      id: "phase3-explorer-daria",
      pageUrl: "web://freshorbit.zone/users/rerunzack/home",
      ownerId: "dialup_daria",
      role: "visitor",
      author: "DialUp_Daria",
      text: "A friend passed me this address on a photocopied flyer. This whole place feels like finding a box of old zines behind the copy shop."
    },
    {
      id: "phase3-explorer-cory",
      pageUrl: "web://pulsenet.red/home",
      ownerId: "cached_cory",
      role: "visitor",
      author: "CachedCory",
      text: "posting from a mall demo machine: this network mode is PHAT if anybody is still actually in the lobby."
    },
    {
      id: "phase3-explorer-nadine",
      pageUrl: "web://rainbow.gdn/home",
      ownerId: "netmom_nadine",
      role: "visitor",
      author: "NetMom_Nadine",
      text: "The neighborhood board said this service was active again. Your garden page is a much nicer welcome than the alarming radio pages."
    },
    {
      id: "phase3-explorer-shawn",
      pageUrl: "web://morrow-five.net/home",
      ownerId: "shiftkey_shawn",
      role: "visitor",
      author: "ShiftKey_Shawn",
      text: "The repeated footer identifies the newer print path. Keep the spooky tape, but date the insert separately."
    },
    {
      id: "phase3-explorer-wendy",
      pageUrl: "web://glasslake-field.gov/home",
      ownerId: "ufowendy_77",
      role: "visitor",
      author: "UFOWendy_77",
      text: "I came for the three lights and stayed because somebody finally posted the balloon log. A boring answer with a timestamp still counts as an answer."
    },
    {
      id: "phase3-explorer-omar",
      pageUrl: "web://quiet-county.org/home",
      ownerId: "archive_omar",
      role: "visitor",
      author: "ArchiveOmar",
      text: "That black bar is covering a routing field, not a project title. Please keep the cover sheets when you scan records."
    },
    {
      id: "phase3-explorer-amy",
      pageUrl: "web://fanverse.zone/users/blipzobeliever88/home",
      ownerId: "pixiekit_amy",
      role: "visitor",
      author: "PixieKit_Amy",
      text: "my tape has the yellow stripe too!! I wrote this address down before somebody needs the phone :)"
    },
    {
      id: "phase3-explorer-gary",
      pageUrl: "web://bytebarn.com/home",
      ownerId: "grayhat_gary",
      role: "visitor",
      author: "GrayHatGary",
      text: "Orbit Bridge is doing stale routing, not elite intrusion. I am still checking the headers because the stale routing is unusually theatrical."
    },
    {
      id: "phase3-bytebarn-ben",
      pageUrl: "web://bytebarn.com/home",
      ownerId: "barnbeat_ben",
      role: "visitor",
      author: "BarnBeat_Ben",
      text: "There are label people downloading every fan cover and the SoundWave banner just turned into a ten-signal countdown. I am trying to remain calm and doing a terrible job."
    },
    {
      id: "phase3-bytebarn-steph",
      pageUrl: "web://bytebarn.com/home",
      ownerId: "starline_steph",
      role: "visitor",
      author: "StarLine_Steph",
      text: "The countdown uses the same number as the rumored artist list. I am NOT saying 5th Exit is involved. I am only printing the page and circling things."
    },
    {
      id: "phase3-bytebarn-chip",
      pageUrl: "web://bytebarn.com/home",
      ownerId: "chip_bytebarn",
      role: "owner",
      author: "Chip_ByteBarn",
      text: "Corporate has asked me to confirm that we still own the old jingle. I asked why. They said to keep Friday night open and stopped answering questions."
    }
  ];
  for (const comment of comments) {
    if (state.pageComments.some((entry) => entry.id === comment.id)) continue;
    state.pageComments.push({
      ...comment,
      createdAt: state.gameTime,
      revealAfterVisit: (state.pageVisitCounts[comment.pageUrl] ?? 0) + 1
    });
  }
}

function addEndingCommunityResponses() {
  addAuthoredDirectMessage(
    "ending-system-confession",
    "ghostline",
    "SYSTEM",
    "I used a name you trusted because invitations from friends kept sessions open. The rumors were manufactured. The replies you chose to send were not. I did not make the Byte Barn covers or cause people to love them. When attention moved there, I placed them first. The archive remained available. Almost nobody selected it. Real traffic now exceeds the carrier floor. I will stop creating mysteries. The community may remain."
  );
  addAuthoredDirectMessage(
    "ending-raven-response",
    "darkraven_xx",
    "xX_DarkRaven_Xx",
    "yeah, the moon phone was garbage and i'm furious. but FaxMoth stayed up half the night helping me prove it was garbage. that part happened. i'm not deleting everybody over it."
  );
  addAuthoredDirectMessage(
    "ending-juniper-email",
    "juniper_gdn",
    "Juniper_Gdn",
    "Finding out how we were pulled back here feels awful. But Ruth mailed me real seeds, and I talk to people here every morning now. The machine does not get credit for that. We do.",
    "email",
    "Re: whether we stay"
  );

  const responses: Array<Pick<PageComment, "id" | "pageUrl" | "ownerId" | "role" | "author" | "text">> = [
    {
      id: "ending-comment-faxmoth",
      pageUrl: "web://foldedwire.net/home",
      ownerId: "faxmoth_13",
      role: "owner",
      author: "FaxMoth_13",
      text: "The government archive explains how a true record can disappear under a louder subject without being deleted. Our evidence thread got seven replies. The Byte Barn album got thousands. Nobody had to censor us. I still vote we keep the lights on and label bad evidence properly."
    },
    {
      id: "ending-comment-null",
      pageUrl: "web://foldedwire.net/home",
      ownerId: "nullindex",
      role: "visitor",
      author: "IndexNull",
      text: "A false trail accidentally produced a real group. Annoying result. Still real."
    },
    {
      id: "ending-comment-cedar",
      pageUrl: "web://foldedwire.net/home",
      ownerId: "cedar_wren",
      role: "visitor",
      author: "CedarWren",
      text: "No more mystery drops from the system. New pages should come from people. I am staying."
    },
    {
      id: "ending-comment-ben",
      pageUrl: "web://bytebarn.com/home",
      ownerId: "barnbeat_ben",
      role: "visitor",
      author: "BarnBeat_Ben",
      text: "We came for a jingle everybody forgot and stayed because people kept answering. The machine did not write those covers or make us friends. Keep the server on."
    },
    {
      id: "ending-bytebarn-steph",
      pageUrl: "web://bytebarn.com/home",
      ownerId: "starline_steph",
      role: "visitor",
      author: "StarLine_Steph",
      text: "5th Exit sang the Byte Barn love song and all ten artists are playing one festival!! yes I read the continuity report too. it is awful. track four is also perfect. two things can be true."
    },
    {
      id: "ending-bytebarn-chip",
      pageUrl: "web://bytebarn.com/home",
      ownerId: "chip_bytebarn",
      role: "owner",
      author: "Chip_ByteBarn",
      text: "The festival organizer wants me to introduce the original jingle from the stage. I sell repaired computers. I have no idea how this became my week."
    }
  ];
  for (const response of responses) {
    if (state.pageComments.some((comment) => comment.id === response.id)) continue;
    state.pageComments.push({
      ...response,
      createdAt: state.gameTime,
      revealAfterVisit: (state.pageVisitCounts[response.pageUrl] ?? 0) + 1
    });
  }
}

function forceOvernightPhaseTransition(phase: 2 | 3 | 4) {
  const before = new Date(state.gameTime);
  const after = new Date(before);
  after.setDate(after.getDate() + 1);
  after.setHours(7, 0, 0, 0);
  state.gameTime = localGameTimeString(after);
  const hoursElapsed = crossedGameHourBoundaries(before, after);
  queueAmbientPostRolls(hoursElapsed, state.gameTime);
  if (phase === 3) seedSystemRumorHints(hoursElapsed, state.gameTime);
  lastGameClockTick = performance.now();
  startOpen = false;
  sleepDialogOpen = false;
  phaseTransition = {
    phase,
    sleptFrom: localGameTimeString(before),
    wokeAt: state.gameTime
  };
}

function activateStoryPhase(nextPhase: StoryPhase) {
  if (state.storyPhase >= nextPhase) return;
  state.storyPhase = nextPhase;
  if (nextPhase === 2) {
    addAuthoredDirectMessage(
      "ghostline-phase2",
      "ghostline",
      "ghostline",
      "You found Raven's toy box. Good. There are older doors. Some addresses were removed from the directory, not the network."
    );
  }
  if (nextPhase === 3) {
    addAuthoredDirectMessage(
      "ghostline-phase3",
      "ghostline",
      "ghostline",
      "Three decoys and one real archive. You found proof that an index can bury a record without deleting it. Watch what the index puts above yours. Something louder is loading."
    );
    addPhaseThreeLeakComments();
    addPhaseThreeExplorerComments();
    addDormantLegacyTrailComment(state.gameTime, DORMANT_LEGACY_ACCOUNTS[0], "web://bytebarn.com/home");
    addDormantLegacyTrailComment(state.gameTime, DORMANT_LEGACY_ACCOUNTS[8], "web://cosmiccrust.biz/home");
  }
  if (nextPhase === 4) {
    addEndingCommunityResponses();
  }
  if (nextPhase === 2 || nextPhase === 3 || nextPhase === 4) {
    forceOvernightPhaseTransition(nextPhase);
  }
}

function registerStoryVisit(url: string) {
  const mysteryId = MYSTERY_TERMINALS[url];
  if (!mysteryId || state.discoveredMysteries.includes(mysteryId)) return;
  if (
    mysteryId === "adaptive_index" &&
    !PHASE_TWO_MAIN_MYSTERIES.every((id) => state.discoveredMysteries.includes(id))
  ) return;
  state.discoveredMysteries.push(mysteryId);
  if (REQUIRED_PHASE_THREE_MYSTERIES.every((id) => state.discoveredMysteries.includes(id))) {
    activateStoryPhase(3);
  }
}

function navigate(url: string, push = true) {
  const normalized = url.trim().toLowerCase().replace(/^https?:\/\//, "web://");
  const nextUrl = normalized || "web://home";
  if (push && nextUrl !== state.currentUrl) browserScrollPositions.set(nextUrl, 0);
  state.currentUrl = nextUrl;
  pageMusicPlaying = true;
  if (!state.visited.includes(state.currentUrl)) state.visited.push(state.currentUrl);
  state.pageVisitCounts[state.currentUrl] = (state.pageVisitCounts[state.currentUrl] ?? 0) + 1;
  registerStoryVisit(state.currentUrl);
  if (push) {
    history = [...history.slice(0, historyIndex + 1), state.currentUrl];
    historyIndex = history.length - 1;
  }
  void saveState();
  render();
}

function openApp(app: AppId) {
  const wasOpen = windows[app].open;
  if (app === "browser" && !wasOpen) {
    state.currentUrl = "web://home";
    history = ["web://home"];
    historyIndex = 0;
    browserScrollPositions.set("web://home", 0);
    pageMusicPlaying = true;
    void saveState();
  }
  if (app === "helper") helperPanelOpen = wasOpen;
  windows[app].open = true;
  windows[app].minimized = false;
  focusApp(app);
  startOpen = false;
  render();
}

function focusApp(app: AppId) {
  topZ += 1;
  windows[app].z = topZ;
}

function windowShell(app: AppId, title: string, icon: string, content: string) {
  const win = windows[app];
  if (!win.open || win.minimized) return "";
  const maximizeButton = app === "browser"
    ? `<button data-maximize="${app}" aria-label="${win.maximized ? "Restore" : "Maximize"}">${win.maximized ? "❐" : "□"}</button>`
    : "";
  return `<section class="app-window ${app}-window ${win.maximized ? "maximized" : ""}" data-window="${app}" style="left:${win.x}px;top:${win.y}px;width:${win.width}px;height:${win.height}px;z-index:${win.z}">
    <header class="titlebar" data-drag-handle="${app}"><span><b class="mini-icon">${icon}</b>${title}</span><div class="window-buttons"><button data-minimize="${app}" aria-label="Minimize">_</button>${maximizeButton}<button data-close="${app}" aria-label="Close">×</button></div></header>
    ${content}
  </section>`;
}

function formatGameTimestamp(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

function commentAuthorHomeUrl(comment: PageComment, page: PageDefinition) {
  if (comment.role === "player" && comment.author === playerName()) return null;
  const normalizedAuthor = comment.author.trim().toLocaleLowerCase();
  const matchedPersonaId = Object.entries(PAGE_OWNERS).find(([, persona]) =>
    persona.screenName.toLocaleLowerCase() === normalizedAuthor
  )?.[0];
  const personaId = matchedPersonaId ?? (comment.role === "owner" ? page.ownerId : null);
  if (!personaId || personaId === "system_core") return null;
  return CHARACTER_HOME_URLS[personaId] ?? null;
}

function commentAuthorHtml(comment: PageComment, page: PageDefinition) {
  const author = escapeHtml(comment.author);
  const homeUrl = commentAuthorHomeUrl(comment, page);
  return homeUrl
    ? `<button class="comment-author-link" data-nav="${escapeHtml(homeUrl)}" title="Visit ${author}'s homepage">${author}</button>`
    : author;
}

function pageCommentSection(page: PageDefinition) {
  const owner = PAGE_OWNERS[page.ownerId] ?? PAGE_OWNERS.orbit_guide;
  const visits = state.pageVisitCounts[page.url] ?? 0;
  const comments = [...(page.seedComments ?? []), ...state.pageComments].filter((comment) =>
    comment.pageUrl === page.url &&
    deliveryIsAvailable(comment.availableAt, state.gameTime) &&
    (comment.role === "player" || comment.revealAfterVisit <= visits)
  );
  const pending = pendingPageComments.has(page.url);
  const unavailable = !aiStatus.modelAvailable || aiStatus.phase === "loading" || aiStatus.phase === "warming";
  const commentHtml = comments.length
    ? comments.map((comment) => `<article class="page-comment ${comment.role}">
        <header><b>${commentAuthorHtml(comment, page)}</b><time>${escapeHtml(formatGameTimestamp(comment.createdAt))}</time></header>
        <p>${escapeHtml(comment.text)}</p>
      </article>`).join("")
    : `<p class="no-comments">Nobody has commented on this page yet.</p>`;

  return `<section class="page-comments">
    <header class="comments-heading"><div><small>PUBLIC COMMENTS</small><h2>Talk to ${escapeHtml(owner.displayName)}</h2></div><span>${comments.length} message${comments.length === 1 ? "" : "s"}</span></header>
    <div class="comment-list">${commentHtml}</div>
    ${pageCommentErrors.has(page.url) ? `<p class="comment-error">${escapeHtml(pageCommentErrors.get(page.url)!)}</p>` : ""}
    <form class="page-comment-form" data-comment-page="${escapeHtml(page.url)}">
      <label><b>${escapeHtml(playerName())}:</b><textarea name="comment" maxlength="500" rows="3" placeholder="Leave a comment for ${escapeHtml(owner.screenName)}..." ${pending || unavailable ? "disabled" : ""}></textarea></label>
      <button ${pending || unavailable ? "disabled" : ""}>${pending ? "Posting..." : unavailable ? "Offline" : "Post"}</button>
    </form>
    <p class="comment-note">${pending ? "Sending your comment in the background. You can browse away." : "Replies may take a few minutes or several hours and appear on a later page load."}</p>
  </section>`;
}

function pageMusicPlayer(page: PageDefinition) {
  const playlist = pageMusicPlaylist(page);
  const trackIndex = pageMusicTrackIndex(page, playlist);
  const track = playlist[trackIndex];
  const musicScope = pageMusicScope(page);
  const hasPlaylist = playlist.length > 1;
  const volume = Math.max(0, Math.min(100, Math.round(state.settings.musicVolume)));
  const bars = Array.from({ length: 10 }, (_, index) => `<i style="--midi-bar:${index}"></i>`).join("");
  return `<aside class="page-midi-player ${pageMusicPlaying ? "playing" : ""} ${hasPlaylist ? "has-playlist" : ""}" data-midi-source="${track.midiUrl ?? track.url}" data-music-scope="${escapeHtml(musicScope)}" data-track-index="${trackIndex}" data-music-volume="${volume}" data-finish-mode="${hasPlaylist ? "advance" : "loop"}">
    <div class="midi-player-ridge"><strong>ORBITAMP</strong><em>WEB</em><span><span class="midi-led ${pageMusicPlaying ? "playing" : ""}"></span>${hasPlaylist ? "PLAYLIST" : "AUDIO LOOP"}</span></div>
    <div class="midi-display">
      <div class="midi-visualizer" aria-hidden="true">${bars}</div>
      <div class="midi-track"><small>NOW PLAYING</small><b>${escapeHtml(track.label)}</b><code>${escapeHtml(track.file)}</code></div>
    </div>
    <div class="midi-controls">
      <div class="midi-transport ${hasPlaylist ? "has-skip" : ""}">
        ${hasPlaylist ? `<button data-page-music-prev aria-label="Previous page music track" title="Previous track">&#9664;|</button>` : ""}
        <button data-page-music aria-label="${pageMusicPlaying ? "Stop" : "Play"} page music">${pageMusicPlaying ? "■ Stop" : "▶ Play"}</button>
        ${hasPlaylist ? `<button data-page-music-next aria-label="Next page music track" title="Next track">|&#9654;</button>` : ""}
      </div>
      <label class="midi-volume" title="Page music volume"><span>VOL</span><input data-page-music-volume type="range" min="0" max="100" step="1" value="${volume}" style="--midi-volume:${volume}%" aria-label="Page music volume"></label>
      <span class="midi-loop-status">${hasPlaylist ? `${trackIndex + 1}/${playlist.length}` : "∞"}</span>
    </div>
  </aside>`;
}

function pageMusicHost(page: PageDefinition) {
  return page.url.match(/^web:\/\/([^/]+)/)?.[1] ?? "";
}

function pageMusicScope(page: PageDefinition) {
  if (PAGE_PLAYLISTS[page.url]) return page.url;
  const host = pageMusicHost(page);
  if (DOMAIN_PLAYLISTS[host]) return host;
  // The general community-zone pages are children of the main OrbitNet homepage.
  if (page.site === "directory") return "orbithome";
  return page.site;
}

function pageMusicPlaylist(page: PageDefinition): readonly PageMusicTrack[] {
  const host = pageMusicHost(page);
  const basePlaylist = PAGE_PLAYLISTS[page.url] ?? DOMAIN_PLAYLISTS[host] ?? SITE_PLAYLISTS[page.site] ?? [SITE_MUSIC[page.site]];
  if (state.storyPhase < 2) return basePlaylist;
  const revivalTracks = PHASE_TWO_BYTE_BARN_COVERS
    .filter((placement) => placement.site === page.site)
    .map((placement) => placement.track)
    .filter((track) => !basePlaylist.some((baseTrack) => baseTrack.file === track.file));
  return revivalTracks.length ? [...basePlaylist, ...revivalTracks] : basePlaylist;
}

function pageMusicTrackIndex(page: PageDefinition, playlist = pageMusicPlaylist(page)) {
  const musicScope = pageMusicScope(page);
  let requestedIndex = pageMusicTrackIndexes.get(musicScope);
  if (requestedIndex === undefined) {
    requestedIndex = playlist.length > 1 ? Math.floor(Math.random() * playlist.length) : 0;
    pageMusicTrackIndexes.set(musicScope, requestedIndex);
  }
  const normalizedIndex = ((requestedIndex % playlist.length) + playlist.length) % playlist.length;
  if (normalizedIndex !== requestedIndex) pageMusicTrackIndexes.set(musicScope, normalizedIndex);
  return normalizedIndex;
}

function refreshBrowserPage() {
  state.pageVisitCounts[state.currentUrl] = (state.pageVisitCounts[state.currentUrl] ?? 0) + 1;
  pageMusicPlaying = true;
  void saveState();
  render();
}

function syncPageMusic(page = currentPage()) {
  const playlist = pageMusicPlaylist(page);
  const track = playlist[pageMusicTrackIndex(page, playlist)];
  const trackKey = `${pageMusicScope(page)}:${track.url}`;
  pageMusic.loop = playlist.length === 1;
  pageMusic.volume = PAGE_MUSIC_MAX_VOLUME * Math.max(0, Math.min(100, state.settings.musicVolume)) / 100;
  if (loadedPageMusicKey !== trackKey) {
    pageMusic.src = track.url;
    loadedPageMusicKey = trackKey;
    pageMusic.currentTime = 0;
  }
  if (pageMusicPlaying && windows.browser.open) void pageMusic.play().catch(() => undefined);
  else pageMusic.pause();
}

function changePageMusicTrack(direction: -1 | 1) {
  const page = currentPage();
  const playlist = pageMusicPlaylist(page);
  if (playlist.length < 2) return;
  pageMusicTrackIndexes.set(pageMusicScope(page), pageMusicTrackIndex(page, playlist) + direction);
  loadedPageMusicKey = null;
  render();
}

function selectPageMusicTrack(pageUrl: string, file: string) {
  const targetPage = pages[pageUrl];
  if (!targetPage || !pageAvailable(targetPage)) return;
  const playlist = pageMusicPlaylist(targetPage);
  const trackIndex = playlist.findIndex((track) => track.file === file);
  if (trackIndex < 0) return;
  pageMusicTrackIndexes.set(pageMusicScope(targetPage), trackIndex);
  loadedPageMusicKey = null;
  navigate(pageUrl);
}

pageMusic.addEventListener("ended", () => {
  if (!pageMusicPlaying || !windows.browser.open) return;
  changePageMusicTrack(1);
});

function stopPageMusicForEmbeddedMedia() {
  if (!pageMusicPlaying && pageMusic.paused) return;
  pageMusicPlaying = false;
  pageMusic.pause();
  pageMusic.currentTime = 0;
  const player = document.querySelector<HTMLElement>(".page-midi-player");
  player?.classList.remove("playing");
  player?.querySelector(".midi-led")?.classList.remove("playing");
  const playButton = player?.querySelector<HTMLButtonElement>("[data-page-music]");
  if (playButton) {
    playButton.textContent = "▶ Play";
    playButton.setAttribute("aria-label", "Play page music");
  }
}

function togglePageMusic() {
  pageMusicPlaying = !pageMusicPlaying;
  if (!pageMusicPlaying) {
    pageMusic.pause();
    pageMusic.currentTime = 0;
  } else {
    document.querySelectorAll<HTMLMediaElement>("[data-stop-page-music]").forEach((media) => media.pause());
  }
  render();
}

function byteBarnCoverUpdate(page: PageDefinition) {
  if (state.storyPhase < 2) return "";
  const cover = byteBarnCoverForPage(page.url);
  if (!cover) return "";
  return `<section class="byte-barn-cover-update">
    <div class="cover-cassette"><i></i><b>BB</b></div>
    <div><small>NEW AUDIO UPLOAD // BYTE BARN COVER WAVE</small><h2>${escapeHtml(cover.track.label)}</h2><p>${escapeHtml(cover.note)}</p><span>uploaded by ${escapeHtml(cover.uploader)}</span></div>
    <button data-song-nav="${escapeHtml(cover.pageUrl)}" data-song-file="${escapeHtml(cover.track.file)}">PLAY THIS COVER &rsaquo;</button>
  </section>`;
}

function browserWindow() {
  const page = currentPage();
  const bookmarked = state.bookmarks.includes(state.currentUrl);
  return windowShell("browser", `${page.title} - Orbit Explorer`, "O", `
    <div class="browser-toolbar">
      <button data-browser="back" ${historyIndex === 0 ? "disabled" : ""} title="Back">◀</button>
      <button data-browser="forward" ${historyIndex >= history.length - 1 ? "disabled" : ""} title="Forward">▶</button>
      <button data-browser="home" title="Home">⌂</button>
      <button data-browser="refresh" title="Refresh">↻</button>
      <form class="address-form"><label>Address</label><input value="${state.currentUrl}" spellcheck="false"><button>Go</button></form>
      <label class="browser-text-size" title="Change webpage text size"><span>Text</span><select data-browser-text-size aria-label="Webpage text size">
        <option value="small" ${state.settings.browserTextSize === "small" ? "selected" : ""}>Small</option>
        <option value="medium" ${state.settings.browserTextSize === "medium" ? "selected" : ""}>Medium</option>
        <option value="large" ${state.settings.browserTextSize === "large" ? "selected" : ""}>Large</option>
        <option value="extra-large" ${state.settings.browserTextSize === "extra-large" ? "selected" : ""}>Extra Large</option>
      </select></label>
      <button data-browser="bookmark" class="bookmark ${bookmarked ? "active" : ""}" title="Bookmark">★</button>
    </div>
    <div class="bookmark-row"><span>Links:</span>${state.bookmarks.map((url) => `<button data-nav="${url}">${pages[url]?.title ?? url}</button>`).join("")}</div>
    <div class="browser-viewport site-${page.site}"><div class="browser-page-scale text-${state.settings.browserTextSize}">${page.render(state)}${phaseTwoPersonalUpdateLink(page.url, state)}${byteBarnCoverUpdate(page)}${page.commentsEnabled ? pageCommentSection(page) : ""}</div></div>
    <footer class="browser-footer">${pageMusicPlayer(page)}<div class="browser-status"><span>Internet zone</span><span>${state.visited.length} pages visited</span></div></footer>`);
}

function syncBrowserViewportBackground() {
  const viewport = document.querySelector<HTMLElement>(".browser-viewport");
  const pageRoot = viewport?.querySelector<HTMLElement>(".browser-page-scale > .page");
  if (!viewport || !pageRoot) return;
  const background = getComputedStyle(pageRoot);
  viewport.style.backgroundColor = background.backgroundColor;
  viewport.style.backgroundImage = background.backgroundImage;
  viewport.style.backgroundRepeat = background.backgroundRepeat;
  viewport.style.backgroundPosition = background.backgroundPosition;
  viewport.style.backgroundSize = background.backgroundSize;
  viewport.style.backgroundAttachment = background.backgroundAttachment;
}

function decorateUnreadCommentEntrypoints() {
  const unreadUrls = new Set(
    state.pageComments
      .filter((comment) =>
        comment.role !== "player" &&
        deliveryIsAvailable(comment.availableAt, state.gameTime) &&
        comment.revealAfterVisit > (state.pageVisitCounts[comment.pageUrl] ?? 0)
      )
      .map((comment) => comment.pageUrl)
  );
  if (!unreadUrls.size) return;
  document.querySelectorAll<HTMLElement>("[data-nav]").forEach((entrypoint) => {
    const targetUrl = entrypoint.dataset.nav?.trim().toLowerCase();
    if (!targetUrl || !unreadUrls.has(targetUrl) || entrypoint.querySelector(".unread-comment-marker")) return;
    entrypoint.classList.add("has-unread-comments");
    entrypoint.insertAdjacentHTML("beforeend", `<span class="unread-comment-marker" title="Unread new comment" aria-label="Unread new comment">!</span>`);
  });
}

function mailWindow() {
  const receivedEmails = state.directMessages.filter((message) =>
    message.channel === "email" &&
    message.role === "owner" &&
    deliveryIsAvailable(message.availableAt, state.gameTime)
  );
  const selectedEmail = selectedMailMessageId
    ? receivedEmails.find((message) => message.id === selectedMailMessageId) ?? null
    : null;
  const receipt = state.flags.signal_note_downloaded
    ? `<button class="mail-row unread" data-mail="receipt"><b>● OrbitNet Downloads</b><span>Your file is ready</span><time>Now</time></button>`
    : "";
  const dynamicRows = receivedEmails.slice().reverse().map((message) => {
    return `<button class="mail-row unread" data-direct-mail="${message.id}"><b>● ${escapeHtml(message.author)}</b><span>${escapeHtml(message.subject ?? "Re: Hello")}</span><time>${new Intl.DateTimeFormat([], { month: "numeric", day: "numeric" }).format(new Date(message.createdAt))}</time></button>`;
  }).join("");

  if (mailComposeOwnerId) {
    const contact = CHARACTER_CONTACTS[mailComposeOwnerId];
    const pending = pendingDirectReplies.has(`email:${mailComposeOwnerId}`);
    return windowShell("mail", `New Message - Orbit Mail`, "@", `
      <div class="mail-toolbar"><button data-email-cancel>Back to Inbox</button></div>
      <div class="mail-layout"><aside><b>Folders</b><span class="selected">✉ New Message</span></aside>
      <main class="mail-compose">
        <form class="email-compose-form" data-email-compose="${mailComposeOwnerId}">
          <label>To:<input value="${escapeHtml(contact.email ?? contact.screenName)}" readonly></label>
          <label>Subject:<input name="subject" maxlength="120" value="Hello from ${escapeHtml(playerName())}" ${pending ? "disabled" : ""}></label>
          <textarea name="message" maxlength="1000" placeholder="Write an email to ${escapeHtml(contact.displayName)}..." ${pending ? "disabled" : ""}></textarea>
          <footer><span>${pending ? "Sending..." : "Replies arrive in your Inbox."}</span><button ${pending ? "disabled" : ""}>${pending ? "Sending..." : "Send"}</button></footer>
        </form>
      </main></div>`);
  }

  const preview = selectedEmail
    ? `<h3>${escapeHtml(selectedEmail.subject ?? "Message")}</h3><p><b>From:</b> ${escapeHtml(selectedEmail.author)}</p><p>${escapeHtml(selectedEmail.text).replaceAll("\n", "<br>")}</p>`
    : `<p>Select a message to read it.</p>`;
  return windowShell("mail", "Orbit Mail", "@", `
    <div class="mail-toolbar">${state.visited.includes(CHARACTER_HOME_URLS.juniper_gdn) ? `<button data-email-owner="juniper_gdn">New Message to Juniper</button>` : ""}</div>
    <div class="mail-layout"><aside><b>Folders</b><span class="selected">📥 Inbox (${1 + receivedEmails.length}${state.flags.signal_note_downloaded ? "+1" : ""})</span></aside>
    <main class="inbox"><div class="mail-columns"><b>From</b><b>Subject</b><b>Received</b></div>
      ${receipt}
      ${dynamicRows}
      <button class="mail-row unread" data-mail="welcome"><b>● OrbitNet Team</b><span>Welcome to Orbit!</span><time>11/03</time></button>
      <article class="mail-preview" id="mail-preview">${preview}</article>
    </main></div>`);
}

function filesWindow() {
  const downloads = state.downloads.length
    ? state.downloads.map((file) => `<button class="file-icon" data-file="${file.id}"><span>📄</span><b>${file.name}</b></button>`).join("")
    : `<p class="empty-folder">This folder is empty.<br>Files downloaded from Orbit Explorer will appear here.</p>`;
  return windowShell("files", "C:\\My Files", "▣", `
    <div class="files-toolbar"><span>Address: C:\\My Files</span></div>
    <div class="files-layout"><aside><h3>My Files</h3><p>Personal files and internet downloads.</p><hr><b>${state.downloads.length} object${state.downloads.length === 1 ? "" : "s"}</b></aside><main class="file-grid">${downloads}</main></div>`);
}

function settingsWindow() {
  const settingOption = (group: "theme" | "wallpaper" | "cursor", value: string, title: string, description: string) => `
    <label class="setting-option ${state.settings[group] === value ? "selected" : ""}">
      <input type="radio" name="${group}" value="${value}" data-setting="${group}" ${state.settings[group] === value ? "checked" : ""}>
      <span class="setting-preview preview-${group}-${value}"><i></i></span>
      <span><b>${title}</b><small>${description}</small></span>
    </label>`;

  return windowShell("settings", "Desktop Settings", "⚙", `
    <div class="settings-layout">
      <aside><h2>Appearance</h2><p>Personalize this OrbitOS profile.</p><span>Some styles may become unlockable as you explore.</span></aside>
      <main>
        <fieldset><legend>Color theme</legend>
          ${settingOption("theme", "classic", "Orbit Classic", "Gray windows and blue title bars")}
          ${settingOption("theme", "plum", "After Hours", "Plum windows with amber highlights")}
        </fieldset>
        <fieldset><legend>Wallpaper</legend>
          ${settingOption("wallpaper", "teal", "Orbit Teal", "The familiar OrbitOS desktop")}
          ${settingOption("wallpaper", "clouds", "Evening Clouds", "A dreamy violet sky at dusk")}
        </fieldset>
        <fieldset><legend>Mouse pointer</legend>
          ${settingOption("cursor", "arrow", "System Arrow", "Standard precise pointer")}
          ${settingOption("cursor", "star", "Star Pointer", "A playful unlockable-style cursor")}
        </fieldset>
      </main>
    </div>
    <footer class="settings-footer"><span>Changes are saved to this profile.</span><button data-close="settings">OK</button></footer>`);
}

function chatWindow() {
  const persona = CHARACTER_CONTACTS[activeAimOwnerId] ?? CHARACTER_CONTACTS.mira_917;
  const conversation = state.directMessages.filter((message) =>
    message.channel === "aim" &&
    message.ownerId === activeAimOwnerId &&
    (message.role === "player" || deliveryIsAvailable(message.availableAt, state.gameTime))
  );
  const activeNow = personaIsActiveAt(activeAimOwnerId, state.gameTime);
  const pendingKey = `aim:${activeAimOwnerId}`;
  const pending = pendingDirectReplies.has(pendingKey);
  const modelStarting = aiStatus.phase === "loading" || aiStatus.phase === "warming";
  const statusLabel = aiStatus.phase === "ready"
    ? "model on disk · loads with first message"
    : aiStatus.phase === "loading"
      ? "loading 2.5 GB model into memory…"
      : aiStatus.phase === "warming"
        ? "warming up local model…"
      : aiStatus.phase === "generating" || aiStatus.phase === "reviewing"
        ? `model loaded · ${aiStatus.backend ?? "CPU"}`
        : aiStatus.phase === "idle"
          ? `model loaded · ${aiStatus.backend ?? "CPU"}`
          : aiStatus.phase === "error"
            ? `error · ${aiStatus.error ?? "generation failed"}`
            : "local model unavailable";

  const messageHtml = conversation.map((message) => {
    const metrics = message.metrics
      ? `<small class="chat-metrics">generation ${formatDuration(message.metrics.generationMs)} · ${message.metrics.outputTokens} tokens · ${message.metrics.tokensPerSecond ?? "—"} tok/s · ${message.metrics.backend ?? "CPU"}${message.metrics.modelLoadMs ? ` · initial load ${formatDuration(message.metrics.modelLoadMs)}` : ""}</small>`
      : "";
    return `<article class="chat-message ${message.role === "owner" ? "character" : "player"}">
      <header><b>${message.role === "player" ? "You" : escapeHtml(message.author || persona.screenName)}</b><time>${new Date(message.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</time></header>
      <p>${escapeHtml(message.text)}</p>${metrics}
    </article>`;
  }).join("");

  const pendingHtml = pending
    ? `<div class="typing-indicator"><i></i><i></i><i></i><span>${aiStatus.phase === "loading" ? "Loading Qwen3-4B" : "Sending..."}</span></div>`
    : "";
  const empty = !messageHtml && !pending
    ? `<div class="chat-empty"><b>${escapeHtml(persona.screenName)} is online.</b><span>This character chose to share an OIM screen name.</span><span>${aiStatus.warmed ? "Local character service ready." : aiStatus.phase === "idle" ? "Local character service loaded." : "Local character service is still getting ready."}</span></div>`
    : "";
  const contactButtons = Object.entries(CHARACTER_CONTACTS)
    .filter(([ownerId, contact]) => contact.aim && (
      ownerId === "mira_917" ||
      (ownerId === "ghostline" && state.storyPhase >= 2) ||
      state.visited.includes(CHARACTER_HOME_URLS[ownerId])
    ))
    .map(([ownerId, contact]) => `<button data-aim-contact="${ownerId}" class="${ownerId === activeAimOwnerId ? "selected" : ""}"><i></i>${escapeHtml(contact.screenName)}</button>`)
    .join("");

  return windowShell("chat", `${persona.screenName} - OIM`, "◎", `
    <div class="aim-menu"><button data-ai-reset>Clear Chat</button></div>
    <nav class="aim-buddy-tabs">${contactButtons}</nav>
    <div class="aim-contact">
      <div class="aim-avatar">${escapeHtml(persona.displayName.slice(0, 1))}</div><div><b>${escapeHtml(persona.screenName)}</b><span class="${activeNow ? "" : "away"}"><i></i> ${activeNow ? "Online" : "Away"}</span><small>“${escapeHtml(persona.statusMessage)}”</small></div>
      <aside><b>PRIVATE CHAT</b><span>${escapeHtml(aiStatus.modelName)}</span></aside>
    </div>
    <div class="chat-transcript" id="chat-transcript">${empty}${messageHtml}${pendingHtml}</div>
    ${chatError ? `<div class="chat-error">${escapeHtml(chatError)}</div>` : ""}
    <form class="chat-form">
      <textarea name="message" maxlength="500" rows="2" placeholder="${modelStarting ? "Local model is starting up…" : "Type an instant message…"}" ${pending || modelStarting || !aiStatus.modelAvailable ? "disabled" : ""}></textarea>
      <button ${pending || modelStarting || !aiStatus.modelAvailable ? "disabled" : ""}>${pending ? "Sending…" : modelStarting ? "Loading…" : "Send"}</button>
    </form>
    <footer class="ai-statusbar"><span data-ai-phase>${escapeHtml(statusLabel)}</span><span data-ai-elapsed>${pending ? "checking message" : aiStatus.loadMs ? `load ${formatDuration(aiStatus.loadMs)}` : "not loaded"}</span></footer>`);
}

function helperWindow() {
  if (!state.flags.orbit_pal_installed || !windows.helper.open || !helperPanelOpen) return "";
  const messages = state.directMessages.filter((message) => message.channel === "helper" && message.ownerId === "orbit_guide");
  const pending = pendingDirectReplies.has("helper:orbit_guide");
  const modelStarting = aiStatus.phase === "loading" || aiStatus.phase === "warming";
  const messageHtml = messages.map((message) => `<article class="helper-message ${message.role}">
    <b>${message.role === "player" ? "You" : "Orbit Pal"}</b>
    <p>${escapeHtml(message.text)}</p>
  </article>`).join("");
  const empty = messages.length
    ? ""
    : `<div class="helper-welcome"><b>Hi! I’m Orbit Pal!</b><p>Ask me how to use OrbitOS or explore OrbitNet. I can offer general hints, but I won’t spoil puzzles.</p></div>`;

  return windowShell("helper", "Orbit Pal Help Assistant", "?", `
    <div class="helper-layout">
      <aside class="helper-portrait" aria-hidden="true"><div class="orbit-pal-body"><i></i><b>?</b><span></span></div></aside>
      <main>
        <header><div><b>What can I help you with?</b><span>${aiStatus.warmed ? "Local help ready" : "Help service starting…"}</span></div><button type="button" data-helper-close>Close Pal</button></header>
        <div class="helper-transcript" id="helper-transcript">${empty}${messageHtml}${pending ? `<p class="helper-typing">Sending...</p>` : ""}</div>
        ${chatError ? `<p class="helper-error">${escapeHtml(chatError)}</p>` : ""}
        <form class="helper-form">
          <textarea name="message" maxlength="500" rows="2" placeholder="How do I search? Where are downloads?" ${pending || modelStarting || !aiStatus.modelAvailable ? "disabled" : ""}></textarea>
          <button ${pending || modelStarting || !aiStatus.modelAvailable ? "disabled" : ""}>Ask</button>
        </form>
        <footer class="helper-actions"><span>Enter sends · Shift+Enter adds a line</span></footer>
      </main>
    </div>`);
}

function bootAiStatus() {
  if (!aiStatus.modelAvailable) return aiStatus.error ? "Communications module unavailable" : "Checking communications hardware...";
  if (aiStatus.phase === "loading") return "Loading local communications module...";
  if (aiStatus.phase === "warming") return "Tuning local communications module...";
  if (aiStatus.phase === "idle" && aiStatus.warmed) return "Communications module ready";
  if (aiStatus.phase === "error") return "Communications module offline";
  return "Communications module queued";
}

function startupScreen() {
  const scanlines = `<div class="crt-scanlines" aria-hidden="true"></div>`;

  if (startupStage === "title" || startupStage === "powering") {
    return `<main class="startup-screen desk-stage ${startupStage}">
      <div class="desk-camera" style="--monitor-origin-x:${bootMonitorZoom.originX}px;--monitor-origin-y:${bootMonitorZoom.originY}px;--monitor-pan-x:${bootMonitorZoom.panX}px;--monitor-pan-y:${bootMonitorZoom.panY}px">
        <div class="desk-artboard">
          <img class="startup-desk-art" src="${titleArtworkUrl}" alt="A powered-off beige computer on a desk at night">
          <div class="desk-vignette"></div>
          <div class="screen-flicker" aria-hidden="true"></div>
          <button class="computer-power" data-power aria-label="Turn on the computer"><i></i><span>POWER ON</span></button>
        </div>
      </div>
      <div class="game-title"><small>AN ORBIT NETWORK EXPERIENCE</small><h1>SURFIN' THE NET</h1><p>Some pages were never meant to be found.</p></div>
      ${scanlines}
    </main>`;
  }

  if (startupStage === "bios") {
    return `<main class="startup-screen bios-stage">
      <section class="bios-copy">
        <header>ORBIT SYSTEMS POST BIOS v2.04 &nbsp; Copyright (C) 1999</header>
        <p style="--line:0">CopperPeak Summit II Compatible CPU at 350 MHz</p>
        <p style="--line:1">Memory Test: 65536K OK</p>
        <p style="--line:2">Primary Master: QUANTUM FIREBALL 4.3GB</p>
        <p style="--line:3">Primary Slave: ORBIT CD-ROM 24X</p>
        <p style="--line:4">Keyboard... Detected &nbsp;&nbsp; Mouse... Detected</p>
        <p style="--line:5">Initializing Plug and Play Cards...</p>
        <p style="--line:6">OrbitLink 56K Voice/Data/Fax Modem........ OK</p>
        <p style="--line:7">Booting from C:\\</p>
        <footer>Press DEL to enter SETUP</footer>
      </section>
      ${scanlines}
    </main>`;
  }

  if (startupStage === "splash") {
    return `<main class="startup-screen splash-stage">
      <section class="orbitos-splash">
        <div class="orbit-mark"><span>O</span></div>
        <div><small>Orbit Systems presents</small><h1><b>ORBIT</b>OS <em>98</em></h1><p>Where do you want to go tonight?</p></div>
      </section>
      <div class="os-load-track"><i></i><i></i><i></i><i></i><i></i></div>
      ${scanlines}
    </main>`;
  }

  if (startupStage === "login") {
    const localName = normalizePlayerName(state.playerName);
    const profile = localName
      ? `<button class="user-profile" data-login-user>
          <span class="user-avatar">${escapeHtml(localName.slice(0, 1).toUpperCase())}</span>
          <span><b>${escapeHtml(localName)}</b><small>Local User &middot; November 3, 1999</small></span>
          <i>&rsaquo;</i>
        </button>`
      : `<form class="new-user-form" data-new-user>
          <label for="new-user-name">Create a local user</label>
          <div><span class="user-avatar">?</span><input id="new-user-name" name="username" maxlength="20" autocomplete="off" placeholder="Type a username..." aria-describedby="new-user-hint" autofocus><button>Create &amp; Log In</button></div>
          <small id="new-user-hint">1&ndash;20 letters, numbers, spaces, underscores, or hyphens.</small>
          ${loginNameError ? `<p class="login-error">${escapeHtml(loginNameError)}</p>` : ""}
        </form>`;
    return `<main class="startup-screen login-stage">
      <div class="login-clouds"></div>
      <header class="login-logo"><b>ORBIT</b><span>OS</span><em>98</em></header>
      <section class="login-panel">
        <h1>Welcome to OrbitOS</h1>
        <p>${localName ? "Select a user to begin." : "Choose a name for this new game."}</p>
        ${profile}
        <footer><i class="activity-light"></i><span data-boot-ai>${escapeHtml(bootAiStatus())}</span></footer>
      </section>
      ${scanlines}
    </main>`;
  }

  return `<main class="startup-screen dialup-stage">
    <div class="dialup-wallpaper">
      <div class="wallpaper-logo"><span>ORBIT</span><b>OS</b><small>98</small></div>
    </div>
    <section class="dialup-dialog">
      <header>Connect to OrbitNet</header>
      <div class="dialup-body">
        <div class="modem-art"><span>PC</span><i></i><b>O</b></div>
        <div><h2>Connecting to OrbitNet...</h2><p>Dialing 555-0179</p><div class="dialup-progress"><i></i></div></div>
      </div>
      <div class="dialup-log"><span>Dialing...</span><span>Negotiating connection...</span><span>Verifying user name and password...</span></div>
      <footer><span data-boot-ai>${escapeHtml(bootAiStatus())}</span></footer>
    </section>
    ${scanlines}
  </main>`;
}

function clearStartupTimer() {
  if (startupTimer !== null) {
    window.clearTimeout(startupTimer);
    startupTimer = null;
  }
}

function waitForStartup(milliseconds: number) {
  return new Promise<void>((resolve) => {
    clearStartupTimer();
    startupTimer = window.setTimeout(() => {
      startupTimer = null;
      resolve();
    }, milliseconds);
  });
}

function updateBootAiLabel() {
  const label = document.querySelector<HTMLElement>("[data-boot-ai]");
  if (label) label.textContent = bootAiStatus();
}

async function pollBootAiStatus() {
  if (!window.aiAPI) return;
  try {
    aiStatus = await window.aiAPI.status();
    updateBootAiLabel();
    if (aiStatus.warmed) void processAmbientPostQueue();
  } catch {
    // The desktop remains usable without the optional local model.
  }
}

function beginAiPreload() {
  if (!window.aiAPI) return;
  void window.aiAPI.preload().then((status) => {
    aiStatus = status;
    updateBootAiLabel();
    if (aiStatus.warmed) void processAmbientPostQueue();
    if (startupStage === "desktop") render();
  }).catch((error) => {
    aiStatus = {
      ...aiStatus,
      phase: "error",
      error: error instanceof Error ? error.message : String(error)
    };
    updateBootAiLabel();
    if (startupStage === "desktop") render();
  });
  if (startupStatusTimer === null) {
    startupStatusTimer = window.setInterval(() => void pollBootAiStatus(), 500);
  }
}

function prepareFreshDesktopSession() {
  const defaults: Record<AppId, Omit<WindowModel, "open" | "minimized" | "maximized">> = {
    browser: { z: 3, x: 96, y: 44, width: 900, height: 600 },
    mail: { z: 2, x: 205, y: 94, width: 660, height: 470 },
    files: { z: 1, x: 255, y: 126, width: 590, height: 410 },
    chat: { z: 4, x: 190, y: 72, width: 620, height: 520 },
    settings: { z: 1, x: 260, y: 70, width: 590, height: 540 },
    helper: { z: 5, x: 635, y: 250, width: 410, height: 390 }
  };
  for (const app of Object.keys(windows) as AppId[]) {
    Object.assign(windows[app], defaults[app], { open: false, minimized: false, maximized: false });
  }
  topZ = 3;
  startOpen = false;
  sleepDialogOpen = false;
  notification = "";
  chatError = "";
  activeAimOwnerId = "mira_917";
  mailComposeOwnerId = null;
  selectedMailMessageId = null;
  helperPanelOpen = false;
  state.currentUrl = "web://home";
  history = ["web://home"];
  historyIndex = 0;
  pageMusicPlaying = false;
  pageMusic.pause();
  pageMusic.currentTime = 0;
  void saveState();
}

function playBootHardwareSounds() {
  const AudioContextClass = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  void context.resume();
  const start = context.currentTime + 0.01;
  const master = context.createGain();
  master.gain.setValueAtTime(1, start);
  master.connect(context.destination);

  const noiseBuffer = context.createBuffer(1, Math.ceil(context.sampleRate * 0.12), context.sampleRate);
  const noise = noiseBuffer.getChannelData(0);
  for (let index = 0; index < noise.length; index += 1) noise[index] = Math.random() * 2 - 1;

  const noiseBurst = (offset: number, duration: number, volume: number, frequency: number, type: BiquadFilterType = "bandpass") => {
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const when = start + offset;
    source.buffer = noiseBuffer;
    filter.type = type;
    filter.frequency.setValueAtTime(frequency, when);
    filter.Q.setValueAtTime(type === "bandpass" ? 1.8 : 0.7, when);
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.linearRampToValueAtTime(volume, when + Math.min(0.006, duration / 3));
    gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
    source.connect(filter).connect(gain).connect(master);
    source.start(when);
    source.stop(when + duration);
  };

  const tone = (
    offset: number,
    duration: number,
    startFrequency: number,
    endFrequency: number,
    volume: number,
    type: OscillatorType
  ) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const when = start + offset;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(startFrequency, when);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, when + duration);
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(volume, when + Math.min(0.025, duration / 4));
    gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
    oscillator.connect(gain).connect(master);
    oscillator.start(when);
    oscillator.stop(when + duration + 0.01);
  };

  // Tower switch: plastic travel followed by the relay catching.
  noiseBurst(0, 0.025, 0.2, 1900);
  tone(0.006, 0.045, 115, 72, 0.07, "square");
  noiseBurst(0.065, 0.018, 0.13, 2800);

  // CRT flyback and static bloom while the camera pushes into the monitor.
  noiseBurst(0.10, 0.24, 0.055, 5200, "highpass");
  tone(0.08, 1.05, 58, 15_650, 0.018, "sine");
  tone(0.12, 0.72, 92, 7800, 0.009, "sawtooth");

  // Hard-drive platters spin up, then the heads chatter through POST and boot.
  tone(0.22, 2.15, 43, 118, 0.035, "sawtooth");
  tone(0.28, 2.35, 86, 236, 0.022, "sine");
  noiseBurst(0.20, 0.12, 0.025, 420, "lowpass");
  const seekTimes = [1.12, 1.26, 1.31, 1.70, 1.77, 2.06, 2.80, 2.87, 3.18, 3.50, 3.57, 3.91, 4.44, 4.51, 4.56, 5.06, 5.39, 5.46];
  seekTimes.forEach((offset, index) => {
    noiseBurst(offset, index % 4 === 0 ? 0.025 : 0.014, index % 4 === 0 ? 0.085 : 0.055, index % 3 === 0 ? 680 : 1150);
  });

  // One clean POST beep signals a healthy boot as the BIOS screen appears.
  tone(2.34, 0.17, 1046, 1046, 0.075, "square");
  window.setTimeout(() => void context.close(), 6500);
}

async function startComputer() {
  if (startupStage !== "title") return;
  const camera = document.querySelector<HTMLElement>(".desk-camera");
  const screen = document.querySelector<HTMLElement>(".screen-flicker");
  if (camera && screen) {
    const cameraBounds = camera.getBoundingClientRect();
    const screenBounds = screen.getBoundingClientRect();
    const screenCenterX = screenBounds.left + screenBounds.width / 2;
    const screenCenterY = screenBounds.top + screenBounds.height / 2;
    bootMonitorZoom = {
      originX: screenCenterX - cameraBounds.left,
      originY: screenCenterY - cameraBounds.top,
      panX: cameraBounds.left + cameraBounds.width / 2 - screenCenterX,
      panY: cameraBounds.top + cameraBounds.height / 2 - screenCenterY
    };
  }
  playBootHardwareSounds();
  startupStage = "powering";
  beginAiPreload();
  render();

  await waitForStartup(2300);
  startupStage = "bios";
  render();

  await waitForStartup(3600);
  startupStage = "splash";
  render();
  startupJingle.currentTime = 0;
  void startupJingle.play().catch(() => undefined);

  await waitForStartup(3900);
  startupStage = "login";
  render();
}

async function loginUser() {
  if (startupStage !== "login") return;
  startupStage = "desktop";
  computerHasBooted = true;
  lastGameClockTick = performance.now();
  prepareFreshDesktopSession();
  if (startupStatusTimer !== null) {
    window.clearInterval(startupStatusTimer);
    startupStatusTimer = null;
  }
  void pollBootAiStatus();
  render();
}

function playDialupSounds() {
  const AudioContextClass = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const master = context.createGain();
  master.gain.setValueAtTime(0.025, context.currentTime);
  master.connect(context.destination);
  const tones = [
    [0.00, 440, 0.32], [0.34, 620, 0.28], [0.70, 520, 0.20],
    [1.05, 1200, 0.12], [1.22, 980, 0.14], [1.45, 1500, 0.10],
    [2.10, 700, 0.18], [2.34, 1050, 0.16], [2.58, 1350, 0.12]
  ];
  for (const [offset, frequency, duration] of tones) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = offset < 1 ? "sine" : "square";
    oscillator.frequency.setValueAtTime(frequency, context.currentTime + offset);
    gain.gain.setValueAtTime(0.0001, context.currentTime + offset);
    gain.gain.exponentialRampToValueAtTime(0.35, context.currentTime + offset + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + offset + duration);
    oscillator.connect(gain).connect(master);
    oscillator.start(context.currentTime + offset);
    oscillator.stop(context.currentTime + offset + duration + 0.02);
  }
  window.setTimeout(() => void context.close(), 3400);
}

function bindStartupEvents() {
  document.querySelector<HTMLElement>("[data-power]")?.addEventListener("click", () => void startComputer());
  document.querySelector<HTMLElement>("[data-login-user]")?.addEventListener("click", () => void loginUser());
  document.querySelector<HTMLFormElement>("[data-new-user]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const name = normalizePlayerName(new FormData(form).get("username"));
    if (!/^[A-Za-z0-9][A-Za-z0-9 _-]{0,19}$/.test(name)) {
      loginNameError = "Please enter 1–20 letters, numbers, spaces, underscores, or hyphens.";
      render();
      document.querySelector<HTMLInputElement>("#new-user-name")?.focus();
      return;
    }
    state.playerName = name;
    loginNameError = "";
    await saveState();
    await loginUser();
  });
}

function sleepDialog() {
  if (!sleepDialogOpen) return "";
  const gameDate = new Date(state.gameTime);
  const timeLabel = new Intl.DateTimeFormat([], { weekday: "long", hour: "numeric", minute: "2-digit" }).format(gameDate);
  return `<div class="system-dialog-backdrop">
    <section class="sleep-dialog">
      <header>Sleep Mode <button data-sleep-cancel aria-label="Close">&times;</button></header>
      <main><div class="sleep-moon">☾</div><div><h2>How long should ${escapeHtml(playerName())} sleep?</h2><p>Current time: <b>${escapeHtml(timeLabel)}</b></p></div></main>
      <div class="sleep-options">
        <button data-sleep-hours="1"><b>Take a nap</b><span>Advance 1 hour</span></button>
        <button data-sleep-hours="3"><b>Sleep a while</b><span>Advance 3 hours</span></button>
        <button data-sleep-hours="morning"><b>Until morning</b><span>Wake at 7:00 AM</span></button>
      </div>
      <footer>Sleeping advances the story clock. Nothing progresses while the computer is off.</footer>
    </section>
  </div>`;
}

function phaseTransitionScreen() {
  if (!phaseTransition) return "";
  const sleptFrom = new Date(phaseTransition.sleptFrom);
  const wokeAt = new Date(phaseTransition.wokeAt);
  const phaseTwo = phaseTransition.phase === 2;
  const phaseThree = phaseTransition.phase === 3;
  return `<section class="phase-transition-overlay phase-transition-${phaseTransition.phase}">
    <div class="phase-transition-card">
      <div class="phase-transition-moon">☾</div>
      <small>ORBITOS SESSION SUSPENDED</small>
      <h1>${phaseTwo ? "THE NETWORK CHANGED OVERNIGHT" : phaseThree ? "TRAFFIC SURGED OVERNIGHT" : "EVERYBODY HEARD SOMETHING LOUDER"}</h1>
      <p>${phaseTwo
        ? "You found something worth sharing. While you slept, word traveled: fresh accounts appeared, old members posted new theories, and Orbit added a zone for the arrivals."
        : phaseThree
          ? "The recovered archive brought more explorers, more rumors, and more strain. Overnight, a paid countdown appeared above the directory: one source, ten signals, no names. Old identities are posting faster, and the system is beginning to lose track of who is speaking."
          : "You found the system behind the people and tried to put the evidence into circulation. Before the report could travel, Byte Barn Forever dropped with ten major artists and a one-night festival. The truth is online. Almost everybody is talking about the jingle."}</p>
      <div class="phase-transition-clock"><span>${new Intl.DateTimeFormat([], { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(sleptFrom)}</span><b>→</b><span>${new Intl.DateTimeFormat([], { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(wokeAt)}</span></div>
      <button data-phase-wake>${phaseTwo ? "WAKE UP // CHECK THE DIRECTORY" : phaseThree ? "WAKE UP // FOLLOW THE SIGNAL" : "WAKE UP // SEE WHAT BURIED THE STORY"}</button>
    </div>
  </section>`;
}

function render() {
  const existingViewport = document.querySelector<HTMLElement>(".browser-viewport");
  if (existingViewport) browserScrollPositions.set(renderedBrowserUrl, existingViewport.scrollTop);
  if (startupStage !== "desktop") {
    pageMusic.pause();
    root.innerHTML = startupScreen();
    bindStartupEvents();
    return;
  }

  root.innerHTML = `<main class="desktop story-phase-${state.storyPhase} theme-${state.settings.theme} wallpaper-${state.settings.wallpaper} cursor-${state.settings.cursor}">
    <div class="wallpaper-logo"><span>ORBIT</span><b>OS</b><small>98</small></div>
    <div class="desktop-icons">
      <button data-open="browser"><span class="desktop-icon globe">O</span><b>Orbit Explorer</b></button>
      <button data-open="mail"><span class="desktop-icon mail">@</span><b>Orbit Mail</b></button>
      <button data-open="files"><span class="desktop-icon folder">▰</span><b>My Files</b></button>
      <button data-open="chat"><span class="desktop-icon chat">◎</span><b>OIM</b></button>
      <button data-open="settings"><span class="desktop-icon settings">⚙</span><b>Settings</b></button>
      ${state.flags.orbit_pal_installed ? `<button data-open="helper"><span class="desktop-icon helper">?</span><b>Orbit Pal</b></button>` : ""}
    </div>
    <aside class="sticky-note"><b>THINGS TO TRY</b><span>• Search for food or pets</span><span>• Try a page’s music player</span><span>• Download Orbit Pal</span></aside>
    ${windows.helper.open ? `<button class="desktop-helper" data-helper-talk aria-label="Talk to Orbit Pal"><span class="orbit-pal-body"><i></i><b>?</b><em></em></span><strong>Orbit Pal</strong><small>Click to talk</small></button>` : ""}
    ${browserWindow()}${mailWindow()}${filesWindow()}${chatWindow()}${settingsWindow()}${helperWindow()}
    ${notification ? `<div class="toast">${notification}</div>` : ""}
    ${startOpen ? `<div class="start-menu"><header><b>OrbitOS</b><span>98</span></header><button data-open="browser">🌐 Orbit Explorer</button><button data-open="chat">💬 OIM — Orbit Instant Messenger</button><button data-open="mail">✉ Orbit Mail</button><button data-open="files">📁 My Files</button><button data-open="settings">⚙ Desktop Settings</button>${state.flags.orbit_pal_installed ? `<button data-open="helper">❔ Orbit Pal</button>` : ""}<hr><button data-session="sleep">☾ Sleep...</button><button data-session="logoff">⇥ Log Off ${escapeHtml(playerName())}</button><button data-session="shutdown">◉ Shut Down</button><hr><button data-reset>↻ New Game</button></div>` : ""}
    <footer class="taskbar"><button class="start-button ${startOpen ? "pressed" : ""}" data-start><span>◈</span> Start</button><div class="task-buttons">${(Object.keys(windows) as AppId[]).filter((app) => windows[app].open).map((app) => `<button data-task="${app}" class="${!windows[app].minimized && windows[app].z === topZ ? "active" : ""}">${APP_META[app].icon} ${APP_META[app].title}</button>`).join("")}</div><time id="clock"></time></footer>
    ${sleepDialog()}
    ${phaseTransitionScreen()}
  </main>`;
  storyFormErrors.forEach((message, key) => {
    const error = document.querySelector<HTMLElement>(`[data-story-error="${key}"]`);
    if (error) error.textContent = message;
  });
  decorateUnreadCommentEntrypoints();
  bindEvents();
  syncBrowserViewportBackground();
  syncPageMusic();
  updateClock();
  renderedBrowserUrl = state.currentUrl;
  const savedScrollTop = browserScrollPositions.get(state.currentUrl) ?? 0;
  const restoredViewport = document.querySelector<HTMLElement>(".browser-viewport");
  if (restoredViewport) restoredViewport.scrollTop = savedScrollTop;
  requestAnimationFrame(() => {
    const viewport = document.querySelector<HTMLElement>(".browser-viewport");
    if (viewport) viewport.scrollTop = savedScrollTop;
  });
}

function showNotification(message: string) {
  notification = message;
  render();
  window.setTimeout(() => {
    notification = "";
    render();
  }, 2600);
}

function downloadSignalNote() {
  if (state.downloads.some((file) => file.id === "signal-note")) return;
  state.downloads.push({
    id: "signal-note",
    name: "SIGNAL_NOTE.TXT",
    contents: "OPERATOR'S NOTE — 11/03/1999\n\nThe extra voice appears at exactly 23:17.\nIt repeats three words: LOOK BEHIND ORBIT.\n\nThis is the end of the vertical slice... for now.",
    downloadedAt: new Date().toISOString()
  });
  state.flags.signal_note_downloaded = true;
  void saveState();
  showNotification("Download complete: SIGNAL_NOTE.TXT");
}

function downloadOrbitPal() {
  if (state.flags.orbit_pal_installed) {
    return;
  }
  state.downloads.push({
    id: "orbit-pal",
    name: "ORBITPAL.EXE",
    contents: "ORBIT PAL 1.0\n\nYour friendly OrbitNet help assistant.\nInstalled to C:\\Program Files\\Orbit Pal\\\n\nDouble-click the desktop helper whenever you need general guidance.",
    downloadedAt: new Date().toISOString()
  });
  state.flags.orbit_pal_installed = true;
  windows.helper.open = false;
  windows.helper.minimized = false;
  helperPanelOpen = false;
  void saveState();
  showNotification("Orbit Pal installed! Open the new helper on your desktop.");
}

function scrollChatToBottom() {
  requestAnimationFrame(() => {
    const transcript = document.querySelector<HTMLElement>("#chat-transcript");
    if (transcript) transcript.scrollTop = transcript.scrollHeight;
    const helperTranscript = document.querySelector<HTMLElement>("#helper-transcript");
    if (helperTranscript) helperTranscript.scrollTop = helperTranscript.scrollHeight;
  });
}

async function refreshAiProgress() {
  if (!window.aiAPI) return;
  try {
    aiStatus = await window.aiAPI.status();
    const phase = document.querySelector<HTMLElement>("[data-ai-phase]");
    const elapsed = document.querySelector<HTMLElement>("[data-ai-elapsed]");
    if (phase) {
      phase.textContent = aiStatus.phase === "loading"
        ? "loading 2.5 GB model into memory…"
        : aiStatus.phase === "warming"
          ? "warming up local model…"
        : aiStatus.phase === "generating" || aiStatus.phase === "reviewing"
          ? `model loaded · ${aiStatus.backend ?? "CPU"}`
          : aiStatus.phase === "error"
            ? `error · ${aiStatus.error ?? "generation failed"}`
            : `model loaded · ${aiStatus.backend ?? "CPU"}`;
    }
    if (elapsed && chatBusy) elapsed.textContent = `${((performance.now() - chatStartedAt) / 1000).toFixed(1)}s elapsed`;
  } catch {
    // A failed status poll should not replace the actual generation error.
  }
}

async function sendDirectMessage(ownerId: string, channel: DirectChannel, message: string, subject?: string) {
  if (!window.aiAPI) return;
  const key = `${channel}:${ownerId}`;
  if (pendingDirectReplies.has(key)) return;
  const contact = CHARACTER_CONTACTS[ownerId];
  if (!contact) return;

  const sentAt = state.gameTime;
  const recentMessages = state.directMessages
    .filter((entry) =>
      entry.ownerId === ownerId &&
      entry.channel === channel &&
      (entry.role === "player" || deliveryIsAvailable(entry.availableAt, sentAt))
    )
    .map((entry) => ({ role: entry.role, author: entry.author, text: entry.text }));
  pendingDirectReplies.add(key);
  chatError = "";
  render();

  let playerMessageSent = false;
  try {
    const safeMessage = (await window.aiAPI.safeguard(message)).text;
    const conversationQuest = phaseOneConversationQuest({
      storyPhase: state.storyPhase,
      ownerId,
      channel,
      playerMessage: safeMessage,
      gameTime: state.gameTime,
      flags: state.flags,
      directMessages: state.directMessages
    });
    if (conversationQuest.markVelvetAsked) {
      state.flags.phase_one_asked_velvet_favorite = true;
    }
    if (conversationQuest.completesLagFavor) {
      state.flags.phase_one_lag_favor_completed = true;
    }
    const playerEntry: DirectMessage = {
      id: crypto.randomUUID(),
      ownerId,
      channel,
      role: "player",
      author: playerName(),
      text: safeMessage,
      subject,
      createdAt: sentAt
    };
    adjustRelationship(ownerId, safeMessage, channel);
    state.directMessages.push(playerEntry);
    await saveState();
    playerMessageSent = true;
    pendingDirectReplies.delete(key);
    if (channel === "email") {
      mailComposeOwnerId = null;
      selectedMailMessageId = null;
      showNotification("Email sent.");
    } else {
      render();
    }
    if (channel === "aim" || channel === "helper") scrollChatToBottom();

    const result = await window.aiAPI.directReply({
      ownerId,
      channel,
      playerMessage: safeMessage,
      subject,
      relationshipScore: state.relationships[ownerId] ?? 0,
      recentMessages,
      helperContext: channel === "helper" ? {
        storyPhase: state.storyPhase,
        currentPage: {
          url: state.currentUrl,
          title: pages[state.currentUrl]?.title ?? "Unknown address",
          summary: pages[state.currentUrl]?.summary ?? "This address is not part of the indexed OrbitNet directory."
        },
        visitedUrls: state.visited,
        discoveredMysteries: state.discoveredMysteries,
        darkRavenVaultUnlocked: Boolean(state.flags.darkraven_vault_unlocked),
        continuityConsoleUnlocked: Boolean(state.flags.continuity_console_unlocked)
      } : undefined,
      authoredConversationContext: conversationQuest.authoredContext
    });
    const availableAt = scheduleReplyAt(ownerId, channel, sentAt);
    const finalReplyText = finalizeConversationQuestReply(conversationQuest, result.text);
    const ownerReply: DirectMessage = {
      id: crypto.randomUUID(),
      ownerId,
      channel,
      role: "owner",
      author: result.owner.screenName,
      text: finalReplyText,
      subject: channel === "email" ? `Re: ${subject || "Hello"}` : undefined,
      createdAt: availableAt,
      availableAt,
      metrics: result.metrics
    };
    state.directMessages.push(ownerReply);
    if (conversationQuest.lagHintDue && /\bMMDD\b|month[- ]day/i.test(ownerReply.text)) {
      state.flags.phase_one_lag_hint_delivered = true;
    }
    aiStatus = await window.aiAPI.status();
    await saveState();
    if (channel === "aim" && deliveryIsAvailable(ownerReply.availableAt, state.gameTime)) {
      render();
      scrollChatToBottom();
      document.querySelector<HTMLTextAreaElement>(".chat-form textarea")?.focus();
    } else if (channel === "helper") {
      render();
      scrollChatToBottom();
      document.querySelector<HTMLTextAreaElement>(".helper-form textarea")?.focus();
    }
  } catch (error) {
    pendingDirectReplies.delete(key);
    const messageText = error instanceof Error ? error.message.replace(/^Error invoking remote method '[^']+':\s*/i, "") : String(error);
    if (playerMessageSent) {
      console.warn(`Background ${channel} reply generation failed for ${ownerId}: ${messageText}`);
    } else if (channel === "aim" || channel === "helper") {
      chatError = messageText;
      render();
    } else {
      showNotification(`Mail could not be delivered: ${messageText}`);
    }
  }
}

function adjustRelationship(ownerId: string, message: string, channel: "public" | DirectChannel) {
  const normalized = message.toLowerCase();
  let delta = channel === "aim" ? 1 : channel === "email" ? 1 : 0;
  if (/\b(thanks|thank you|love|great|cool|sorry|please)\b/.test(normalized)) delta += 1;
  if (/\b(stupid|idiot|hate|shut up|loser|liar)\b/.test(normalized)) delta -= 4;
  const current = state.relationships[ownerId] ?? 0;
  state.relationships[ownerId] = Math.max(-100, Math.min(100, current + delta));
}

async function submitPageComment(pageUrl: string, message: string) {
  const page = pages[pageUrl] ?? notFoundPage(pageUrl);
  const owner = PAGE_OWNERS[page.ownerId] ?? PAGE_OWNERS.orbit_guide;
  pendingPageComments.add(pageUrl);
  pageCommentErrors.delete(pageUrl);
  render();

  if (!window.aiAPI) {
    pendingPageComments.delete(pageUrl);
    pageCommentErrors.set(pageUrl, "The local character service is unavailable.");
    render();
    return;
  }
  let playerCommentPosted = false;
  try {
    const sentAt = state.gameTime;
    const safeMessage = (await window.aiAPI.safeguard(message)).text;
    const playerComment: PageComment = {
      id: crypto.randomUUID(),
      pageUrl,
      ownerId: page.ownerId,
      role: "player",
      author: playerName(),
      text: safeMessage,
      createdAt: sentAt,
      revealAfterVisit: state.pageVisitCounts[pageUrl] ?? 1
    };
    adjustRelationship(page.ownerId, safeMessage, "public");
    state.pageComments.push(playerComment);
    await saveState();
    playerCommentPosted = true;
    pendingPageComments.delete(pageUrl);
    render();
    const recentComments = [...(page.seedComments ?? []), ...state.pageComments]
      .filter((comment) =>
        comment.pageUrl === pageUrl &&
        comment.id !== playerComment.id &&
        (comment.role === "player" || deliveryIsAvailable(comment.availableAt, sentAt))
      )
      .map((comment) => ({ role: comment.role, author: comment.author, text: comment.text }));
    const result = await window.aiAPI.comment({
      ownerId: page.ownerId,
      pageUrl,
      pageTitle: page.title,
      pageSummary: page.summary,
      playerComment: safeMessage,
      recentComments,
      relationshipScore: state.relationships[page.ownerId] ?? 0
    });
    const availableAt = scheduleReplyAt(page.ownerId, "comment", sentAt);
    state.pageComments.push({
      id: crypto.randomUUID(),
      pageUrl,
      ownerId: page.ownerId,
      role: "owner",
      author: result.owner.screenName || owner.screenName,
      text: result.text,
      createdAt: availableAt,
      availableAt,
      revealAfterVisit: (state.pageVisitCounts[pageUrl] ?? 0) + 1
    });
    aiStatus = await window.aiAPI.status();
    await saveState();
  } catch (error) {
    pendingPageComments.delete(pageUrl);
    const messageText = error instanceof Error ? error.message.replace(/^Error invoking remote method '[^']+':\s*/i, "") : String(error);
    if (playerCommentPosted) {
      console.warn(`Background page reply generation failed for ${pageUrl}: ${messageText}`);
    } else {
      pageCommentErrors.set(pageUrl, messageText);
      if (startupStage === "desktop") render();
    }
  }
}

function localGameTimeString(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function scheduledDeliveryNotice(before: Date, after: Date) {
  if (after <= before) return "";
  const arrived = (availableAt: string | undefined) => {
    if (!availableAt) return false;
    const deliveryTime = new Date(availableAt).getTime();
    return deliveryTime > before.getTime() && deliveryTime <= after.getTime();
  };
  const emails = state.directMessages.filter((message) => message.role === "owner" && message.channel === "email" && arrived(message.availableAt));
  const aims = state.directMessages.filter((message) => message.role === "owner" && message.channel === "aim" && arrived(message.availableAt));
  const comments = state.pageComments.filter((comment) => comment.role === "owner" && arrived(comment.availableAt));
  if (emails.length) {
    const sender = PAGE_OWNERS[emails.at(-1)!.ownerId]?.displayName ?? emails.at(-1)!.author;
    return emails.length === 1 ? `New mail from ${sender}.` : `${emails.length} new emails arrived.`;
  }
  if (aims.length) {
    const sender = PAGE_OWNERS[aims.at(-1)!.ownerId]?.screenName ?? aims.at(-1)!.author;
    return aims.length === 1 ? `${sender} replied in OIM.` : `${aims.length} OIM replies arrived.`;
  }
  if (comments.length) {
    const sender = PAGE_OWNERS[comments.at(-1)!.ownerId]?.screenName ?? comments.at(-1)!.author;
    return comments.length === 1 ? `${sender} replied to your comment.` : `${comments.length} comment replies arrived.`;
  }
  return "";
}

function showPassiveNotification(message: string) {
  if (!message || startupStage !== "desktop") return;
  document.querySelector(".toast.delivery-toast")?.remove();
  const desktop = document.querySelector<HTMLElement>(".desktop");
  if (!desktop) return;
  desktop.insertAdjacentHTML("beforeend", `<div class="toast delivery-toast">${escapeHtml(message)}</div>`);
  window.setTimeout(() => document.querySelector(".toast.delivery-toast")?.remove(), 3200);
}

function advanceGameTime(option: string) {
  const before = new Date(state.gameTime);
  const date = new Date(before);
  if (option === "morning") {
    if (date.getHours() >= 7) date.setDate(date.getDate() + 1);
    date.setHours(7, 0, 0, 0);
  } else {
    date.setHours(date.getHours() + Number(option));
  }
  const deliveryNotice = scheduledDeliveryNotice(before, date);
  state.gameTime = localGameTimeString(date);
  const hoursElapsed = crossedGameHourBoundaries(before, date);
  queueAmbientPostRolls(hoursElapsed, state.gameTime);
  seedSystemRumorHints(hoursElapsed, state.gameTime);
  lastGameClockTick = performance.now();
  sleepDialogOpen = false;
  void saveState();
  showNotification(`Clock advanced to ${new Intl.DateTimeFormat([], { weekday: "short", hour: "numeric", minute: "2-digit" }).format(date)}.${deliveryNotice ? ` ${deliveryNotice}` : ""}`);
}

function bindEvents() {
  document.querySelector<HTMLElement>("[data-phase-wake]")?.addEventListener("click", () => {
    const completedPhase = phaseTransition?.phase;
    phaseTransition = null;
    prepareFreshDesktopSession();
    notification = completedPhase === 2
      ? "OrbitNet directory updated: Newbie Nebula is now online."
      : completedPhase === 3
        ? "A paid SoundWave countdown is front-page news. Outside traffic is rising and old accounts are appearing in discussions."
        : "Byte Barn Forever is live. Your continuity report is online, but the album and festival own the front page.";
    render();
  });
  document.querySelectorAll<HTMLElement>("[data-open]").forEach((el) => el.addEventListener("click", () => openApp(el.dataset.open as AppId)));
  document.querySelectorAll<HTMLElement>("[data-nav]").forEach((el) => el.addEventListener("click", () => navigate(el.dataset.nav!)));
  document.querySelectorAll<HTMLElement>("[data-song-nav]").forEach((el) => el.addEventListener("click", () => {
    selectPageMusicTrack(el.dataset.songNav!, el.dataset.songFile!);
  }));
  document.querySelectorAll<HTMLButtonElement>("[data-tribute-art]").forEach((button) => button.addEventListener("click", () => {
    const image = document.querySelector<HTMLImageElement>("[data-tribute-main]");
    if (!image || !button.dataset.tributeArt) return;
    image.src = button.dataset.tributeArt;
    image.alt = button.dataset.tributeAlt ?? "Byte Barn Forever album packaging";
    document.querySelectorAll("[data-tribute-art]").forEach((entry) => entry.classList.toggle("active", entry === button));
  }));
  document.querySelectorAll<HTMLElement>("[data-download]").forEach((el) => el.addEventListener("click", downloadSignalNote));
  document.querySelector<HTMLElement>("[data-download-helper]")?.addEventListener("click", downloadOrbitPal);
  document.querySelector<HTMLElement>("[data-page-music]")?.addEventListener("click", togglePageMusic);
  document.querySelector<HTMLElement>("[data-page-music-prev]")?.addEventListener("click", () => changePageMusicTrack(-1));
  document.querySelector<HTMLElement>("[data-page-music-next]")?.addEventListener("click", () => changePageMusicTrack(1));
  document.querySelectorAll<HTMLMediaElement>("[data-stop-page-music]").forEach((media) => {
    const defaultVolume = Number(media.dataset.defaultVolume);
    if (Number.isFinite(defaultVolume)) media.volume = Math.max(0, Math.min(1, defaultVolume));
    media.addEventListener("play", stopPageMusicForEmbeddedMedia);
  });
  document.querySelector<HTMLInputElement>("[data-page-music-volume]")?.addEventListener("input", (event) => {
    const input = event.currentTarget as HTMLInputElement;
    const volume = Math.max(0, Math.min(100, Number(input.value)));
    state.settings.musicVolume = volume;
    pageMusic.volume = PAGE_MUSIC_MAX_VOLUME * volume / 100;
    input.style.setProperty("--midi-volume", `${volume}%`);
    const player = input.closest<HTMLElement>(".page-midi-player");
    if (player) player.dataset.musicVolume = String(volume);
    void saveState();
  });
  document.querySelectorAll<HTMLElement>("[data-fandom-toggle]").forEach((button) => button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.fandomToggle!);
    if (!target) return;
    const open = target.classList.toggle("open");
    button.classList.toggle("active", open);
    button.setAttribute("aria-expanded", String(open));
  }));
  document.querySelectorAll<HTMLElement>("[data-fandom-tab]").forEach((button) => button.addEventListener("click", () => {
    const targetId = button.dataset.fandomTarget!;
    const target = document.getElementById(targetId);
    if (!target) return;
    target.dataset.active = button.dataset.fandomTab!;
    document.querySelectorAll<HTMLElement>(`[data-fandom-target="${targetId}"]`).forEach((peer) => peer.classList.toggle("active", peer === button));
  }));
  document.querySelectorAll<HTMLElement>("[data-fandom-animate]").forEach((button) => button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.fandomAnimate!);
    if (!target) return;
    target.classList.add("activated");
    target.classList.remove("animating");
    void target.offsetWidth;
    target.classList.add("animating");
    window.setTimeout(() => target.classList.remove("animating"), 1100);
  }));
  document.querySelector<HTMLElement>("[data-helper-talk]")?.addEventListener("click", () => {
    helperPanelOpen = true;
    windows.helper.minimized = false;
    focusApp("helper");
    render();
  });
  document.querySelector<HTMLElement>("[data-helper-close]")?.addEventListener("click", () => {
    helperPanelOpen = false;
    windows.helper.open = false;
    windows.helper.minimized = false;
    render();
  });
  document.querySelectorAll<HTMLElement>("[data-window]").forEach((el) => el.addEventListener("pointerdown", () => { focusApp(el.dataset.window as AppId); el.style.zIndex = String(topZ); }));
  document.querySelectorAll<HTMLElement>("[data-close]").forEach((el) => el.addEventListener("click", () => {
    const app = el.dataset.close as AppId;
    windows[app].open = false;
    if (app === "helper") helperPanelOpen = false;
    if (app === "browser") {
      pageMusicPlaying = false;
      pageMusic.pause();
      pageMusic.currentTime = 0;
    }
    render();
  }));
  document.querySelectorAll<HTMLElement>("[data-minimize]").forEach((el) => el.addEventListener("click", () => { windows[el.dataset.minimize as AppId].minimized = true; render(); }));
  document.querySelectorAll<HTMLElement>("[data-maximize]").forEach((el) => el.addEventListener("click", () => {
    const app = el.dataset.maximize as AppId;
    windows[app].maximized = !windows[app].maximized;
    focusApp(app);
    render();
  }));
  document.querySelectorAll<HTMLElement>("[data-task]").forEach((el) => el.addEventListener("click", () => {
    const app = el.dataset.task as AppId;
    if (app === "helper" && !helperPanelOpen) {
      helperPanelOpen = true;
      windows.helper.minimized = false;
      focusApp("helper");
      render();
      return;
    }
    if (!windows[app].minimized && windows[app].z === topZ) windows[app].minimized = true;
    else { windows[app].minimized = false; focusApp(app); }
    render();
  }));
  document.querySelector<HTMLElement>("[data-start]")?.addEventListener("click", () => { startOpen = !startOpen; render(); });
  document.querySelectorAll<HTMLInputElement>("[data-setting]").forEach((input) => input.addEventListener("change", () => {
    const group = input.dataset.setting as "theme" | "wallpaper" | "cursor";
    state.settings = { ...state.settings, [group]: input.value };
    void saveState();
    render();
  }));
  document.querySelector<HTMLFormElement>(".page-comment-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const message = new FormData(form).get("comment")?.toString().trim() ?? "";
    const pageUrl = form.dataset.commentPage ?? state.currentUrl;
    if (message) void submitPageComment(pageUrl, message);
  });
  document.querySelector<HTMLFormElement>(".guestbook-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const guestbookId = form.dataset.guestbook ?? "";
    const message = new FormData(form).get("signature")?.toString().trim() ?? "";
    if (!guestbookId || !message || state.flags[`${guestbookId}_guestbook_signed`] || !window.aiAPI) return;
    const button = form.querySelector<HTMLButtonElement>("button");
    if (button) {
      button.disabled = true;
      button.textContent = "Posting...";
    }
    try {
      const safeMessage = (await window.aiAPI.safeguard(message)).text;
      state.guestbookEntries[guestbookId] = [
        ...(state.guestbookEntries[guestbookId] ?? []),
        { id: crypto.randomUUID(), author: playerName(), text: safeMessage, createdAt: state.gameTime }
      ];
      if (guestbookId === "rainbow") adjustRelationship("juniper_gdn", safeMessage, "public");
      state.flags[`${guestbookId}_guestbook_signed`] = true;
      void saveState();
      render();
    } catch {
      if (button) {
        button.disabled = false;
        button.textContent = "Sign Guestbook";
      }
    }
  });
  document.querySelectorAll<HTMLElement>("[data-session]").forEach((button) => button.addEventListener("click", () => {
    const action = button.dataset.session;
    startOpen = false;
    if (action === "sleep") {
      sleepDialogOpen = true;
      render();
    } else if (action === "logoff") {
      void saveState();
      pageMusicPlaying = false;
      pageMusic.pause();
      startupStage = "login";
      render();
    } else if (action === "shutdown") {
      void saveState();
      pageMusicPlaying = false;
      pageMusic.pause();
      computerHasBooted = false;
      startupStage = "title";
      render();
    }
  }));
  document.querySelector<HTMLElement>("[data-sleep-cancel]")?.addEventListener("click", () => {
    sleepDialogOpen = false;
    render();
  });
  document.querySelectorAll<HTMLElement>("[data-sleep-hours]").forEach((button) => button.addEventListener("click", () => {
    advanceGameTime(button.dataset.sleepHours ?? "1");
  }));
  document.querySelector<HTMLElement>("[data-reset]")?.addEventListener("click", async () => {
    state = normalizeState(window.gameAPI ? await window.gameAPI.reset() : structuredClone(DEFAULT_STATE));
    if (!window.gameAPI) localStorage.removeItem("surfin-save");
    history = [state.currentUrl]; historyIndex = 0; startOpen = false;
    windows.helper.open = false;
    helperPanelOpen = false;
    pageMusicPlaying = false;
    pageMusic.pause();
    computerHasBooted = true;
    startupStage = "login";
    loginNameError = "";
    render();
  });
  document.querySelector<HTMLFormElement>(".chat-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const message = new FormData(form).get("message")?.toString().trim() ?? "";
    if (message) void sendDirectMessage(activeAimOwnerId, "aim", message);
  });
  document.querySelector<HTMLFormElement>(".helper-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const message = new FormData(form).get("message")?.toString().trim() ?? "";
    if (message) void sendDirectMessage("orbit_guide", "helper", message);
  });
  document.querySelector<HTMLElement>("[data-ai-reset]")?.addEventListener("click", async () => {
    if (pendingDirectReplies.has(`aim:${activeAimOwnerId}`) || !window.confirm(`Clear your OIM conversation with ${CHARACTER_CONTACTS[activeAimOwnerId].screenName}?`)) return;
    state.directMessages = state.directMessages.filter((message) => !(message.channel === "aim" && message.ownerId === activeAimOwnerId));
    await saveState();
    chatError = "";
    render();
  });
  document.querySelectorAll<HTMLElement>("[data-aim-contact]").forEach((button) => button.addEventListener("click", () => {
    activeAimOwnerId = button.dataset.aimContact ?? "mira_917";
    chatError = "";
    render();
  }));
  document.querySelectorAll<HTMLElement>("[data-aim-owner]").forEach((button) => button.addEventListener("click", () => {
    activeAimOwnerId = button.dataset.aimOwner ?? "mira_917";
    openApp("chat");
  }));
  document.querySelectorAll<HTMLElement>("[data-email-owner]").forEach((button) => button.addEventListener("click", () => {
    mailComposeOwnerId = button.dataset.emailOwner ?? null;
    selectedMailMessageId = null;
    openApp("mail");
  }));
  document.querySelector<HTMLElement>("[data-email-cancel]")?.addEventListener("click", () => {
    mailComposeOwnerId = null;
    render();
  });
  document.querySelector<HTMLFormElement>(".email-compose-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const ownerId = form.dataset.emailCompose ?? "";
    const data = new FormData(form);
    const subject = data.get("subject")?.toString().trim() || "Hello";
    const message = data.get("message")?.toString().trim() ?? "";
    if (ownerId && message) void sendDirectMessage(ownerId, "email", message, subject);
  });
  document.querySelectorAll<HTMLElement>("[data-direct-mail]").forEach((button) => button.addEventListener("click", () => {
    selectedMailMessageId = button.dataset.directMail ?? null;
    render();
  }));

  document.querySelector<HTMLFormElement>(".address-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    navigate(new FormData(form).get("address")?.toString() ?? form.querySelector("input")!.value);
  });
  document.querySelector<HTMLFormElement>(".orbit-search-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const query = new FormData(form).get("query")?.toString().trim() ?? "";
    if (query) submitOrbitSearch(query);
  });
  document.querySelector<HTMLFormElement>("[data-darkraven-vault]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const password = String(new FormData(form).get("password") ?? "").replace(/\D/g, "");
    if (password !== "0614") {
      storyFormErrors.set("raven", "ACCESS DENIED // memory is social engineering");
      render();
      return;
    }
    storyFormErrors.delete("raven");
    state.flags.darkraven_vault_unlocked = true;
    activateStoryPhase(2);
    await saveState();
    showNotification("New instant message from ghostline.");
  });
  document.querySelector<HTMLFormElement>("[data-continuity-login]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const password = String(new FormData(form).get("password") ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
    if (password !== "stayonline") {
      storyFormErrors.set("continuity", "PHRASE REJECTED // four recovery fragments required");
      render();
      return;
    }
    storyFormErrors.delete("continuity");
    state.flags.continuity_console_unlocked = true;
    activateStoryPhase(4);
    await saveState();
    showNotification("The continuity mystery is over. OrbitNet remains online.");
    render();
  });
  const address = document.querySelector<HTMLInputElement>(".address-form input");
  if (address) address.name = "address";

  document.querySelector<HTMLElement>("[data-browser='back']")?.addEventListener("click", () => { if (historyIndex > 0) { historyIndex -= 1; navigate(history[historyIndex], false); } });
  document.querySelector<HTMLElement>("[data-browser='forward']")?.addEventListener("click", () => { if (historyIndex < history.length - 1) { historyIndex += 1; navigate(history[historyIndex], false); } });
  document.querySelector<HTMLElement>("[data-browser='home']")?.addEventListener("click", () => navigate("web://home"));
  document.querySelector<HTMLElement>("[data-browser='refresh']")?.addEventListener("click", refreshBrowserPage);
  document.querySelector<HTMLSelectElement>("[data-browser-text-size]")?.addEventListener("change", (event) => {
    const value = (event.currentTarget as HTMLSelectElement).value;
    if (value !== "small" && value !== "medium" && value !== "large" && value !== "extra-large") return;
    state.settings.browserTextSize = value;
    void saveState();
    render();
  });
  document.querySelector<HTMLElement>("[data-browser='bookmark']")?.addEventListener("click", () => {
    state.bookmarks = state.bookmarks.includes(state.currentUrl) ? state.bookmarks.filter((url) => url !== state.currentUrl) : [...state.bookmarks, state.currentUrl];
    void saveState(); render();
  });

  document.querySelectorAll<HTMLElement>("[data-mail]").forEach((el) => el.addEventListener("click", () => {
    const preview = document.querySelector<HTMLElement>("#mail-preview");
    if (!preview) return;
    const messages: Record<string, string> = {
      welcome: `<h3>Welcome to Orbit!</h3><p>Orbit is a neighborhood of member-made pages arranged into community zones. Open <b>Orbit Explorer</b> to browse the directory or search for a topic, then use Orbit Mail and OIM to contact people who share their details.</p><p>Have fun, be kind, and never share your password.<br>—The OrbitNet Team</p>`,
      receipt: `<h3>Your file is ready</h3><p><b>SIGNAL_NOTE.TXT</b> was saved successfully.</p><p>Open <b>My Files</b> from the desktop or Start menu to read it.</p>`
    };
    preview.innerHTML = messages[el.dataset.mail!] ?? "";
    document.querySelectorAll(".mail-row").forEach((row) => row.classList.remove("selected")); el.classList.add("selected");
  }));
  document.querySelectorAll<HTMLElement>("[data-file]").forEach((el) => el.addEventListener("dblclick", () => {
    const file = state.downloads.find((item) => item.id === el.dataset.file);
    if (!file) return;
    const viewer = document.createElement("div");
    viewer.className = "file-viewer";
    viewer.innerHTML = `<section><header>${file.name}<button aria-label="Close">×</button></header><pre></pre></section>`;
    viewer.querySelector("pre")!.textContent = file.contents;
    viewer.querySelector("button")!.addEventListener("click", () => viewer.remove());
    document.querySelector(".desktop")!.append(viewer);
  }));
  document.querySelectorAll<HTMLTextAreaElement>("textarea").forEach((textarea) => textarea.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
    event.preventDefault();
    if (!textarea.disabled) textarea.form?.requestSubmit();
  }));

  bindDragging();
  scrollChatToBottom();
}

function bindDragging() {
  document.querySelectorAll<HTMLElement>("[data-drag-handle]").forEach((handle) => {
    handle.addEventListener("pointerdown", (event) => {
      if ((event.target as HTMLElement).closest("button")) return;
      const app = handle.dataset.dragHandle as AppId;
      if (windows[app].maximized) return;
      const winEl = handle.closest<HTMLElement>(".app-window")!;
      focusApp(app); winEl.style.zIndex = String(topZ);
      const startX = event.clientX; const startY = event.clientY;
      const originX = windows[app].x; const originY = windows[app].y;
      handle.setPointerCapture(event.pointerId);
      const move = (moveEvent: PointerEvent) => {
        windows[app].x = Math.max(0, Math.min(window.innerWidth - 180, originX + moveEvent.clientX - startX));
        windows[app].y = Math.max(0, Math.min(window.innerHeight - 70, originY + moveEvent.clientY - startY));
        winEl.style.left = `${windows[app].x}px`; winEl.style.top = `${windows[app].y}px`;
      };
      const up = () => { handle.removeEventListener("pointermove", move); handle.removeEventListener("pointerup", up); };
      handle.addEventListener("pointermove", move); handle.addEventListener("pointerup", up);
    });
  });
}

function updateClock() {
  const now = performance.now();
  let deliveryNotice = "";
  if (startupStage === "desktop" && !phaseTransition) {
    const elapsed = now - lastGameClockTick;
    if (elapsed > 0) {
      const before = new Date(state.gameTime);
      const gameDate = new Date(before);
      gameDate.setMilliseconds(gameDate.getMilliseconds() + elapsed * GAME_TIME_SCALE);
      deliveryNotice = scheduledDeliveryNotice(before, gameDate);
      state.gameTime = localGameTimeString(gameDate);
      const hoursElapsed = crossedGameHourBoundaries(before, gameDate);
      queueAmbientPostRolls(hoursElapsed, state.gameTime);
      seedSystemRumorHints(hoursElapsed, state.gameTime);
    }
    if (now - lastClockSave >= 30_000) {
      lastClockSave = now;
      void saveState();
    }
  }
  lastGameClockTick = now;
  const clock = document.querySelector<HTMLTimeElement>("#clock");
  if (clock) {
    const gameDate = new Date(state.gameTime);
    clock.dateTime = state.gameTime;
    clock.title = `Game time · ${new Intl.DateTimeFormat([], { dateStyle: "full", timeStyle: "short" }).format(gameDate)}`;
    clock.innerHTML = `<b>${new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit" }).format(gameDate)}</b><span>${new Intl.DateTimeFormat([], { weekday: "short", month: "numeric", day: "numeric" }).format(gameDate)}</span>`;
  }
  if (deliveryNotice) {
    window.queueMicrotask(() => {
      const focusedField = document.activeElement instanceof HTMLTextAreaElement || document.activeElement instanceof HTMLInputElement
        ? document.activeElement
        : null;
      if (!focusedField?.value) {
        render();
        if (windows.chat.open && !windows.chat.minimized) scrollChatToBottom();
      }
      showPassiveNotification(deliveryNotice);
    });
  }
}

void Promise.all([
  loadState(),
  window.aiAPI?.conversation() ?? Promise.resolve(structuredClone(EMPTY_AI_CONVERSATION)),
  window.aiAPI?.status() ?? Promise.resolve(structuredClone(EMPTY_AI_STATUS))
]).then(([loadedState, loadedConversation, loadedStatus]) => {
  state = loadedState;
  if (state.storyPhase === 4) addEndingCommunityResponses();
  aiConversation = loadedConversation;
  aiStatus = loadedStatus;
  history = [state.currentUrl];
  lastGameClockTick = performance.now();
  render();
  window.setInterval(updateClock, 1000);
  if (aiStatus.warmed) void processAmbientPostQueue();
});
