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
  phaseTwoPersonalUpdates
} from "./newcomer-pages";
import {
  SOUNDWAVE_HOME_URLS,
  SOUNDWAVE_OWNERS
} from "./soundwave-pages";
import {
  BYTE_BARN_COMPILATION_TRACKS,
  BYTE_BARN_FAN_TRACKS,
  PHASE_TWO_BYTE_BARN_COVERS,
  byteBarnCoversForPage,
  BYTE_BARN_COMPILATION_URL
} from "./byte-barn-revival";
import {
  PHASE_THREE_EXPLORER_IDS,
  PHASE_THREE_EXPLORER_OWNERS
} from "./phase-three-personas";
import {
  ADDITIONAL_BUSINESS_HOME_URLS,
  ADDITIONAL_BUSINESS_OWNERS
} from "./additional-business-pages";
import type { AiConversation, AiStatus, AmbientPostJob, AppId, DirectChannel, DirectMessage, GameState, PageComment, PageDefinition, PageMusicTrack, StoryPhase } from "./types";
import { ambientActivityFor, MAIN_CHARACTER_IDS, SUPPORTING_BUSINESS_PERSONA_IDS } from "./character-tiers";
import { finalizeConversationQuestReply, phaseOneConversationQuest } from "./conversation-quests";
import { deliveryIsAvailable, personaActiveHoursLabel, personaIsActiveAt, scheduleReplyAt } from "./reply-scheduling";
import { BBS_EVIDENCE_IDS, PATCH_COMPONENTS, renderByteForge } from "./byteforge-bbs";
import { RANDY_FIRST_URL, RANDY_PAGES, RANDY_ZONE_PAGES, WIDEWORLD_ARCHIVE_URL, WIDEWORLD_URL } from "./orbit-revival";

const titleArtworkUrl = new URL("../assets/images/power-off-desk.png", import.meta.url).href;
const startupJingleUrl = new URL("../assets/audio/orbitos-startup.wav", import.meta.url).href;
const cursorDownloadGraphicUrl = new URL("../assets/images/download-buttons/download-cursor-v2.png", import.meta.url).href;
const wallpaperDownloadGraphicUrl = new URL("../assets/images/download-buttons/download-wallpaper-v2.png", import.meta.url).href;
const themeDownloadGraphicUrl = new URL("../assets/images/download-buttons/download-theme-v2.png", import.meta.url).href;
const playerSkinDownloadGraphicUrl = new URL("../assets/images/download-buttons/download-player-skin-v1.png", import.meta.url).href;
const BUSINESS_COLLECTIBLE_ART = {
  veluna: new URL("../assets/images/additional-business/collectible-veluna.png", import.meta.url).href,
  aureline: new URL("../assets/images/additional-business/collectible-aureline.png", import.meta.url).href,
  kestrel: new URL("../assets/images/additional-business/collectible-kestrel.png", import.meta.url).href,
  bigbang: new URL("../assets/images/additional-business/collectible-bigbang.png", import.meta.url).href,
  nullstate: new URL("../assets/images/additional-business/collectible-nullstate.png", import.meta.url).href,
  dogeared: new URL("../assets/images/additional-business/collectible-dogeared.png", import.meta.url).href,
  criticalhit: new URL("../assets/images/additional-business/collectible-criticalhit.png", import.meta.url).href,
  wondervale: new URL("../assets/images/additional-business/collectible-wondervale.png", import.meta.url).href,
  pixelpetal: new URL("../assets/images/additional-business/collectible-pixelpetal.png", import.meta.url).href,
  maximart: new URL("../assets/images/additional-business/collectible-maximart.png", import.meta.url).href,
  kingcal: new URL("../assets/images/dealer-web/cal-sedan.png", import.meta.url).href,
  bytebarn: new URL("../assets/images/business-web/bytebarn-system.png", import.meta.url).href,
  cosmiccrust: new URL("../assets/images/business-web/cosmiccrust-pizza.png", import.meta.url).href,
  bubbleborough: new URL("../assets/images/filler-business/bubble-washers.png", import.meta.url).href
} as const;
type BusinessCollectibleId = keyof typeof BUSINESS_COLLECTIBLE_ART;
type BusinessCollectibleLayout = "kingcal" | "bytebarn" | "cosmiccrust" | "bubbleborough";
const BUSINESS_COLLECTIBLES: Record<BusinessCollectibleId, { filename: string; title: string; alt: string; sourceUrl: string; sourceTitle: string; copy: string; layout?: BusinessCollectibleLayout }> = {
  veluna: { filename: "DREAM-LOG-99.HTM", title: "Veluna Dream Log '99", alt: "Illustrated moonlit sleep diary with a tiny alarm clock", sourceUrl: "web://veluna.rx/home", sourceTitle: "Veluna", copy: "Seven nights, fourteen boxes, and one special column for MODEM NOISE / OTHER. This diary does not interpret dreams, prescribe anything, or explain why you woke up holding the television remote." },
  aureline: { filename: "AURELINE-2000-BROCHURE.HTM", title: "Aureline Model-Year 2000 Brochure", alt: "Glossy model-year 2000 Aureline showroom brochure", sourceUrl: "web://aureline-motors.com/home", sourceTitle: "Aureline Motors", copy: "A pocket showroom for Vector, Arc, Meridian, and Range. Includes heroic empty-road photography, aggressively exact cup-holder counts, and the legally required reminder that fog is not a handling feature." },
  kestrel: { filename: "KESTREL-DRIVER-SAMPLER.HTM", title: "Kestrel Driver-Disc / Manual Sampler", alt: "Kestrel translucent driver disc and folded electronics manual", sourceUrl: "web://kestrel-electronics.com/home", sourceTitle: "Kestrel Electronics", copy: "A read-only sampler of start-up guides, driver-disc sleeves, and troubleshooting diagrams. No drivers are installed. Your computer remains exactly as confused as it was before." },
  bigbang: { filename: "CRATER-CRITTER-COUPONS.HTM", title: "Crater Critter Coupon Sheet", alt: "Colorful Big Bang Burger coupon sheet with space mascots", sourceUrl: "web://bigbangburger.com/home", sourceTitle: "Big Bang Burger", copy: "Three printable coupons, six Crater Critters, and one tiny meteor insisting that fries are an astronomical event. Informational archive copy; participating restaurants may interpret 'participating' creatively." },
  nullstate: { filename: "LOOKBOOK_04-POSTCARD.HTM", title: "NULL/STATE LOOKBOOK_04 Postcard", alt: "Glitchy cyberfashion postcard from NULL STATE", sourceUrl: "web://nullstate-wear.com/home", sourceTitle: "NULL/STATE", copy: "A compressed fashion postcard from DROP 04. Reflective seams may appear brighter on monitors that are already making a noise." },
  dogeared: { filename: "MR-BRONTE-EVENTS-FLYER.HTM", title: "Mr. Bronte Bookmark / Events Flyer", alt: "Bookstore cat bookmark beside a moonlit events flyer", sourceUrl: "web://dogearedmoon.books/home", sourceTitle: "Dog-Eared Moon Books", copy: "This month's readings, used-book table, and children's hour, supervised by Mr. Bronte in the sense that he is asleep on the flyer box." },
  criticalhit: { filename: "DRAGON-KEEP-III-HOUSE-RULING.HTM", title: "Dragon Keep III House Ruling", alt: "Photocopied fantasy role-playing house ruling with dragon doodles", sourceUrl: "web://criticalhit.games/home", sourceTitle: "Critical Hit Games", copy: "A photocopy clarifying page 184: rope costs less than a horse, a horse cannot be stored in a backpack, and shouting 'critical' before rolling provides no mathematical benefit." },
  wondervale: { filename: "WONDERVALE-PARK-MAP.HTM", title: "WonderVale Fold-Out Park Map", alt: "Bright illustrated amusement park map and height grid", sourceUrl: "web://wondervale.park/home", sourceTitle: "WonderVale", copy: "A fold-out map, ride-height grid, and emergency route to the nearest lemonade. Printing at 100% scale does not make the Night Comet shorter." },
  pixelpetal: { filename: "COOL-SITE-AWARD-99.ZIP.HTM", title: "Cool Small Business Site Award '99 Badge Pack", alt: "Animated-style web award badges and pixel flowers", sourceUrl: "web://pixelpetal.design/home", sourceTitle: "Pixel Petal Design", copy: "Six tiny awards for cool sites, fast-loading sites, sites with tables, and sites whose guestbook still works. ZIP behavior simulated for the protection of every modem involved." },
  maximart: { filename: "MAXI-SAVER-WEEKLY-CIRCULAR.HTM", title: "MAXI-SAVER Weekly Circular", alt: "Loud illustrated Maxi-Mart discount circular", sourceUrl: "web://maximart.com/home", sourceTitle: "Maxi-Mart Superstores", copy: "Four pages of MAXI-SAVER prices, an aisle map, and a television photographed at an angle normally reserved for speedboats. Prices are informative; carts are not included." },
  kingcal: { filename: "KING-CAL-ROYAL-WEEKLY.HTM", title: "King Cal's Royal Weekly Deals", alt: "King Cal weekly used-car flyer with a burgundy sedan", sourceUrl: "web://kingcalscars.biz/home", sourceTitle: "King Cal's Auto Kingdom", copy: "A printable weekly deal sheet for three previously enjoyed chariots. The Crown Regent has an accent trunk panel, the Family Voyager has seven seats, and every payment is positioned where it can be seen from space. Informational archive copy only.", layout: "kingcal" },
  bytebarn: { filename: "BYTE-BARN-MANUAL-SAMPLER.HTM", title: "Byte Barn Owner's Manual Sampler", alt: "Byte Barn computer catalog sheet with a beige desktop computer", sourceUrl: "web://bytebarn.com/home", sourceTitle: "Byte Barn Computer Superstore", copy: "A printable starter sheet for the Orbit 350, its external modem, and the exact point where Chip writes 'do not force it' in the manual. No drivers are installed and no purchase is implied.", layout: "bytebarn" },
  cosmiccrust: { filename: "COSMIC-CRUST-SPACE-COUPONS.HTM", title: "Cosmic Crust Space Coupon Sheet", alt: "Cosmic Crust pizza coupon mailer with a pizza and arcade token", sourceUrl: "web://cosmiccrust.biz/home", sourceTitle: "Cosmic Crust", copy: "A printable coupon sheet with family-dinner, arcade-token, and mysterious green-sauce offers. It is a saved archive copy; no order has been placed and no pizza is on its way.", layout: "cosmiccrust" },
  bubbleborough: { filename: "BUBBLE-BOROUGH-DRYER-GUIDE.HTM", title: "Bubble Borough Token & Dryer Guide", alt: "Bubble Borough laundry guide with washer and blue token", sourceUrl: "web://bubbleborough.com/home", sourceTitle: "Bubble Borough Laundromat", copy: "A printable counter handout showing token facts, dryer etiquette, and the exact order in which Babs recommends checking pockets. It does not create a drop-off order or a laundry account.", layout: "bubbleborough" }
};
const DESKTOP_ICON_URLS = {
  browser: new URL("../assets/images/desktop-icons/orbit-explorer.png", import.meta.url).href,
  music: new URL("../assets/images/desktop-icons/orbit-amp.png", import.meta.url).href,
  mail: new URL("../assets/images/desktop-icons/orbit-mail.png", import.meta.url).href,
  files: new URL("../assets/images/desktop-icons/my-files.png", import.meta.url).href,
  chat: new URL("../assets/images/desktop-icons/oim.png", import.meta.url).href,
  settings: new URL("../assets/images/desktop-icons/settings.png", import.meta.url).href,
  helper: new URL("../assets/images/desktop-icons/orbit-pal.png", import.meta.url).href,
  bbs: new URL("../assets/images/desktop-icons/orbit-explorer.png", import.meta.url).href,
} as const;
const musicDownloadGraphicUrl = new URL("../assets/images/download-buttons/download-music-v2.png", import.meta.url).href;
const ZONE_DOWNLOAD_SOURCES = {
  "web://orbitnet.local/zones/gamegrid": { id: "gamegrid", title: "Game Grid", skinId: "gamegrid" },
  "web://orbitnet.local/zones/xtreme": { id: "xtreme", title: "X-Treme Edge", skinId: undefined },
  "web://orbitnet.local/zones/petplanet": { id: "petplanet", title: "Pet Planet", skinId: undefined },
  "web://orbitnet.local/zones/fanverse": { id: "fanverse", title: "The FanVerse", skinId: undefined },
  "web://orbitnet.local/zones/yesterday": { id: "yesterday", title: "Yesterday Online", skinId: undefined },
  "web://orbitnet.local/zones/soundwave": { id: "soundwave", title: "SoundWave", skinId: "soundwave" },
  "web://orbitnet.local/zones/cozycommons": { id: "cozycommons", title: "Cozy Commons", skinId: "cozycommons" },
  "web://orbitnet.local/zones/backchannel": { id: "backchannel", title: "The Backchannel", skinId: "backchannel" },
  "web://orbitnet.local/zones/newcomers": { id: "newcomers", title: "Newbie Nebula", skinId: undefined }
} as const;
const MUSIC_PLAYER_SKINS = [
  { id: "orbitofficial", label: "OrbitOS Official", url: new URL("../assets/images/music-player-skins/orbitofficial-player-skin.png", import.meta.url).href },
  { id: "backchannel", label: "Backchannel Relay", url: new URL("../assets/images/music-player-skins/backchannel-player-skin.png", import.meta.url).href },
  { id: "cozycommons", label: "Cozy Garden", url: new URL("../assets/images/music-player-skins/cozycommons-player-skin.png", import.meta.url).href },
  { id: "soundwave", label: "SoundWave Cassette", url: new URL("../assets/images/music-player-skins/soundwave-player-skin.png", import.meta.url).href },
  { id: "gamegrid", label: "GameGrid Console", url: new URL("../assets/images/music-player-skins/gamegrid-player-skin.png", import.meta.url).href },
] as const;
const startupJingle = new Audio(startupJingleUrl);
startupJingle.preload = "auto";
startupJingle.volume = 0.7;

const KING_CAL_TRACKS: readonly PageMusicTrack[] = [
  { label: "Everybody Rides", file: "everybody-rides.mp3", url: new URL("../assets/audio/pages/king-cal/everybody-rides.mp3", import.meta.url).href },
  { label: "Everybody Rides Royalty", file: "everybody-rides-royalty.mp3", url: new URL("../assets/audio/pages/king-cal/everybody-rides-royalty.mp3", import.meta.url).href },
  { label: "Royalty on Wheels", file: "royalty-on-wheels-01.mp3", url: new URL("../assets/audio/pages/king-cal/royalty-on-wheels-01.mp3", import.meta.url).href },
  { label: "Highway Crown", file: "royalty-on-wheels-02.mp3", url: new URL("../assets/audio/pages/king-cal/royalty-on-wheels-02.mp3", import.meta.url).href },
  { label: "County Line Royalty", file: "county-line-royalty-01.mp3", url: new URL("../assets/audio/pages/king-cal/county-line-royalty-01.mp3", import.meta.url).href },
  { label: "County Line Gold", file: "county-line-royalty-02.mp3", url: new URL("../assets/audio/pages/king-cal/county-line-royalty-02.mp3", import.meta.url).href },
  { label: "Crown at the County Line", file: "county-line-royalty-03.mp3", url: new URL("../assets/audio/pages/king-cal/county-line-royalty-03.mp3", import.meta.url).href },
  { label: "King Cal's Auto Kingdom", file: "king-cals-auto-kingdom-01.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-auto-kingdom-01.mp3", import.meta.url).href },
  { label: "Showroom Kingdom", file: "king-cals-auto-kingdom-02.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-auto-kingdom-02.mp3", import.meta.url).href },
  { label: "Keys to the Kingdom", file: "king-cals-auto-kingdom-03.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-auto-kingdom-03.mp3", import.meta.url).href },
  { label: "King Cal's Motor Court", file: "king-cals-auto-kingdom-04.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-auto-kingdom-04.mp3", import.meta.url).href },
  { label: "Crown on the Dash", file: "king-cals-auto-kingdom-05.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-auto-kingdom-05.mp3", import.meta.url).href },
  { label: "The Royal Test Drive", file: "king-cals-auto-kingdom-06.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-auto-kingdom-06.mp3", import.meta.url).href },
  { label: "King's Highway", file: "king-cals-auto-kingdom-07.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-auto-kingdom-07.mp3", import.meta.url).href },
  { label: "Parking Lot Parade", file: "king-cals-auto-kingdom-08.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-auto-kingdom-08.mp3", import.meta.url).href },
  { label: "King Cal's Kingdom", file: "king-cals-kingdom-01.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-01.mp3", import.meta.url).href },
  { label: "Welcome to the Kingdom", file: "king-cals-kingdom-02.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-02.mp3", import.meta.url).href },
  { label: "Crown County Nights", file: "king-cals-kingdom-03.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-03.mp3", import.meta.url).href },
  { label: "The Kingdom's Open Road", file: "king-cals-kingdom-04.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-04.mp3", import.meta.url).href },
  { label: "Royal Route 9", file: "king-cals-kingdom-05.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-05.mp3", import.meta.url).href },
  { label: "Cal's County Line", file: "king-cals-kingdom-06.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-06.mp3", import.meta.url).href },
  { label: "Throne Room of Chrome", file: "king-cals-kingdom-07.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-07.mp3", import.meta.url).href },
  { label: "The Crown Deal", file: "king-cals-kingdom-08.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-08.mp3", import.meta.url).href },
  { label: "Kingdom After Dark", file: "king-cals-kingdom-09.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-09.mp3", import.meta.url).href },
  { label: "Exit to the Kingdom", file: "king-cals-kingdom-10.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-10.mp3", import.meta.url).href },
  { label: "The Last Royal Ride", file: "king-cals-kingdom-11.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-11.mp3", import.meta.url).href },
  { label: "County Line Crown", file: "county-line-crown-diss-track-01.mp3", url: new URL("../assets/audio/pages/king-cal/county-line-crown-diss-track-01.mp3", import.meta.url).href },
  { label: "King Cal vs. County Line", file: "king-cals-kingdom-diss-track-02.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-kingdom-diss-track-02.mp3", import.meta.url).href },
  { label: "King Cal's Warning", file: "king-cals-warning-secret-01.mp3", url: new URL("../assets/audio/pages/king-cal/king-cals-warning-secret-01.mp3", import.meta.url).href },
  { label: "County Line Code", file: "county-line-code-secret-02.mp3", url: new URL("../assets/audio/pages/king-cal/county-line-code-secret-02.mp3", import.meta.url).href },
  { label: "County Line Code (Alt.)", file: "county-line-code-secret-03-alt.mp3", url: new URL("../assets/audio/pages/king-cal/county-line-code-secret-03-alt.mp3", import.meta.url).href },
  { label: "County Line Cipher", file: "county-line-cipher-secret-04.mp3", url: new URL("../assets/audio/pages/king-cal/county-line-cipher-secret-04.mp3", import.meta.url).href },
  { label: "County Line Cipher (Alt.)", file: "county-line-cipher-secret-05-alt.mp3", url: new URL("../assets/audio/pages/king-cal/county-line-cipher-secret-05-alt.mp3", import.meta.url).href },
  { label: "County Line Warning", file: "county-line-warning-secret-06.mp3", url: new URL("../assets/audio/pages/king-cal/county-line-warning-secret-06.mp3", import.meta.url).href }
];

const ORBIT_HOME_TRACKS: readonly PageMusicTrack[] = [
  { label: "Blue Screen of Love", file: "blue-screen-of-love-01.mp3", url: new URL("../assets/audio/pages/orbit-home/blue-screen-of-love-01.mp3", import.meta.url).href },
  { label: "Dial-Up Heartbreak", file: "blue-screen-of-love-02.mp3", url: new URL("../assets/audio/pages/orbit-home/blue-screen-of-love-02.mp3", import.meta.url).href },
  { label: "Memory at 56K", file: "blue-screen-of-love-03.mp3", url: new URL("../assets/audio/pages/orbit-home/blue-screen-of-love-03.mp3", import.meta.url).href },
  { label: "Orbit After Midnight", file: "blue-screen-of-love-04.mp3", url: new URL("../assets/audio/pages/orbit-home/blue-screen-of-love-04.mp3", import.meta.url).href },
  { label: "Blue Screen of Memory", file: "blue-screen-of-memory.mp3", url: new URL("../assets/audio/pages/orbit-home/blue-screen-of-memory.mp3", import.meta.url).href }
];

// These are deliberately spread across the network rather than collected on one
// utility page. Each themed page owns its individual cursor unlock.
const CURSOR_DOWNLOAD_SOURCES: Record<string, { cursor: string; label: string; note: string }> = {
  "web://honestearl.com/home": { cursor: "cursor-01", label: "CHROME ARROW CURSOR", note: "Free with every previously enjoyed chariot." },
  "web://gamegrid.zone/users/riftscribethane/home": { cursor: "cursor-02", label: "KNIGHT'S GAUNTLET CURSOR", note: "A properly armored pointer for campaign planning." },
  "web://gamegrid.zone/users/velvetmage/home": { cursor: "cursor-03", label: "WIZARD'S STAFF CURSOR", note: "For navigating realms, maps, and questionable prophecies." },
  "web://gamegrid.zone/users/codedex/home": { cursor: "cursor-04", label: "QUEST BLADE CURSOR", note: "Secret rooms respond better to a dramatic pointer." },
  "web://gamegrid.zone/users/lagmaster99/home": { cursor: "cursor-05", label: "FLAME TRAIL CURSOR", note: "Adds absolutely no frames per second." },
  "web://gamegrid.zone/users/quarterqueen/home": { cursor: "cursor-06", label: "ARCADE STICK CURSOR", note: "QuarterQueen's official tournament pointer." },
  "web://pulsenet.red/home": { cursor: "cursor-07", label: "SCANLINE ARROW CURSOR", note: "Crisp CRT targeting for the networked home." },
  "web://petplanet.zone/users/catnapcarla/home": { cursor: "cursor-08", label: "PET PAW CURSOR", note: "Mr. Boots has inspected and approved this download." },
  "web://fanverse.zone/users/blipzobeliever88/home": { cursor: "cursor-09", label: "RAY BLASTER CURSOR", note: "Allegedly recovered from the Mall Dimension." },
  "web://fanverse.zone/users/tapeattictess/home": { cursor: "cursor-10", label: "VHS GHOST CURSOR", note: "Please rewind before selecting." },
  "web://soundwave.zone/users/subbasssimon/home": { cursor: "cursor-11", label: "BREAKBEAT BOLT CURSOR", note: "A licensed cursor for high-voltage bass browsing." },
  "web://soundwave.zone/users/safetypinsid/home": { cursor: "cursor-12", label: "SAFETY PIN CURSOR", note: "No corporate click-tracking. Probably." },
  "web://xtreme.zone/users/tideriderty/home": { cursor: "cursor-13", label: "PACIFIC WAVE CURSOR", note: "Wet links surf better." },
  "web://xtreme.zone/users/throttletroy/home": { cursor: "cursor-14", label: "MOTO TIRE CURSOR", note: "Throws a little digital dirt on every page." },
  "web://rosepatch.home/garden": { cursor: "cursor-15", label: "GARDEN TROWEL CURSOR", note: "Plant it in Settings and keep clicking." },
  "web://raven.web/home": { cursor: "cursor-16", label: "RAVEN CLAW CURSOR", note: "Found behind a folder DarkRaven insists does not exist." },
  "web://nightsignal.net/home": { cursor: "cursor-17", label: "WATCHER EYE CURSOR", note: "It notices the links before they notice you." },
  "web://gamegrid.zone/users/modkitmaddy/home": { cursor: "cursor-18", label: "FLOPPY ARROW CURSOR", note: "A shareware pointer with handmade drivers." },
  "web://cosmiccrust.biz/home": { cursor: "cursor-19", label: "PIZZA SLICE CURSOR", note: "Free download with no topping substitutions." },
  "web://rocketbox.toys/home": { cursor: "cursor-20", label: "TOY ROBOT CURSOR", note: "Assembly not required. Batteries not included." },
  "web://freshorbit.zone/users/tapedeckkeesha/home": { cursor: "cursor-21", label: "TAPE POINTER CURSOR", note: "A bootleg cursor from the Kingdom Tape Vault." },
  "web://fanverse.zone/users/deepdelverdot/home": { cursor: "cursor-22", label: "CRYSTAL BLADE CURSOR", note: "Pulled up from somewhere below the Gemwell." },
  "web://legacy.orbitos.local/community/launchring": { cursor: "cursor-23", label: "STAR FIGHTER CURSOR", note: "Launch Ring freeware. Runs best at 640 by 480." },
  "web://home": { cursor: "cursor-24", label: "OFFICE GLOVE CURSOR", note: "An OrbitNet productivity enhancement." },
  "web://legacy.orbitos.local/home": { cursor: "cursor-25", label: "ORBIT PLANET CURSOR", note: "Officially unofficial OrbitOS memorabilia." }
};

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
  { label: "Paddle Out at Sunset", file: "banzai-loop-02.mp3", url: new URL("../assets/audio/pages/surfer/banzai-loop-02.mp3", import.meta.url).href },
  { label: "Cutback Chaos", file: "cutback-chaos.mp3", url: new URL("../assets/audio/pages/surfer/cutback-chaos.mp3", import.meta.url).href }
];

const ROAD_HOG_TRACKS: readonly PageMusicTrack[] = [
  { label: "Chrome and Grass", file: "chrome-and-grass.mp3", url: new URL("../assets/audio/pages/road-hog-ron/chrome-and-grass.mp3", import.meta.url).href },
  { label: "Dented Fender Proud", file: "dented-fender-proud.mp3", url: new URL("../assets/audio/pages/road-hog-ron/dented-fender-proud.mp3", import.meta.url).href },
  { label: "Hadda Lay 'Er Down", file: "hadda-lay-er-down-01.mp3", url: new URL("../assets/audio/pages/road-hog-ron/hadda-lay-er-down-01.mp3", import.meta.url).href },
  { label: "Shoulder of the Highway", file: "hadda-lay-er-down-02.mp3", url: new URL("../assets/audio/pages/road-hog-ron/hadda-lay-er-down-02.mp3", import.meta.url).href }
];

const RAILROAD_LENNY_TRACKS: readonly PageMusicTrack[] = [
  { label: "Back on the Rails", file: "back-on-the-rails.mp3", url: new URL("../assets/audio/pages/railroad-lenny/back-on-the-rails.mp3", import.meta.url).href },
  { label: "Whistle at Dawn", file: "whistle-at-dawn.mp3", url: new URL("../assets/audio/pages/railroad-lenny/whistle-at-dawn.mp3", import.meta.url).href }
];

const RIFTSCRIBE_THANE_TRACKS: readonly PageMusicTrack[] = [
  { label: "Moonlit Ossuary", file: "moonlit-ossuary-01.mp3", url: new URL("../assets/audio/pages/riftscribe-thane/moonlit-ossuary-01.mp3", import.meta.url).href },
  { label: "Catacombs After Midnight", file: "moonlit-ossuary-02.mp3", url: new URL("../assets/audio/pages/riftscribe-thane/moonlit-ossuary-02.mp3", import.meta.url).href },
  { label: "Quest Master Vault", file: "quest-master-vault.mp3", url: new URL("../assets/audio/pages/riftscribe-thane/quest-master-vault.mp3", import.meta.url).href }
];

const MINI_MARSHAL_RAE_TRACKS: readonly PageMusicTrack[] = [
  { label: "Quest Master Vault (Rae)", file: "quest-master-vault-rae.mp3", url: new URL("../assets/audio/pages/minimarshal-rae/quest-master-vault-rae.mp3", import.meta.url).href },
  { label: "Quest Master's Hall", file: "quest-masters-hall-01.mp3", url: new URL("../assets/audio/pages/minimarshal-rae/quest-masters-hall-01.mp3", import.meta.url).href },
  { label: "Dice in the War Room", file: "quest-masters-hall-02.mp3", url: new URL("../assets/audio/pages/minimarshal-rae/quest-masters-hall-02.mp3", import.meta.url).href }
];

const BITBUNKER_BURT_TRACKS: readonly PageMusicTrack[] = [
  { label: "Starlark Tonight", file: "starlark-tonight.mp3", url: new URL("../assets/audio/pages/bitbunker-burt/starlark-tonight.mp3", import.meta.url).href }
];

const BIG_BASS_BOB_TRACKS: readonly PageMusicTrack[] = [
  { label: "Gone Fishin' Again", file: "gone-fishin-again.mp3", url: new URL("../assets/audio/pages/big-bass-bob/gone-fishin-again.mp3", import.meta.url).href },
  { label: "Lake Day Legend", file: "lake-day-legend-01.mp3", url: new URL("../assets/audio/pages/big-bass-bob/lake-day-legend-01.mp3", import.meta.url).href },
  { label: "Mercer Lake Sunrise", file: "lake-day-legend-02.mp3", url: new URL("../assets/audio/pages/big-bass-bob/lake-day-legend-02.mp3", import.meta.url).href },
  { label: "The One That Got Away", file: "the-one-that-got-away.mp3", url: new URL("../assets/audio/pages/big-bass-bob/the-one-that-got-away.mp3", import.meta.url).href },
  { label: "Back Off the Line", file: "back-off-the-line-secret-01.mp3", url: new URL("../assets/audio/pages/big-bass-bob/back-off-the-line-secret-01.mp3", import.meta.url).href },
  { label: "Big One Got Away", file: "big-one-got-away-secret-02.mp3", url: new URL("../assets/audio/pages/big-bass-bob/big-one-got-away-secret-02.mp3", import.meta.url).href },
  { label: "Redacted Bait", file: "redacted-bait-secret-03.mp3", url: new URL("../assets/audio/pages/big-bass-bob/redacted-bait-secret-03.mp3", import.meta.url).href },
  { label: "Reel It In", file: "reel-it-in-secret-04.mp3", url: new URL("../assets/audio/pages/big-bass-bob/reel-it-in-secret-04.mp3", import.meta.url).href }
];

const productionTrack = (label: string, file: string, url: string): PageMusicTrack => ({ label, file, url });
const BYTE_BARN_DEAL_TRACK = productionTrack("Byte Barn Deal", "byte-barn-deal.mp3", new URL("../assets/audio/pages/byte-barn/byte-barn-deal.mp3", import.meta.url).href);
const AMBIENT_FILL_TRACKS = {
  trailnotes: productionTrack("Underwater Journey", "underwater-journey.mp3", new URL("../assets/audio/pages/ambient-fill/underwater-journey.mp3", import.meta.url).href),
  trailEchoes: productionTrack("Echoes of the Forgotten King", "echoes-of-the-forgotten-king.mp3", new URL("../assets/audio/pages/ambient-fill/echoes-of-the-forgotten-king.mp3", import.meta.url).href),
  simonNeonDreams: productionTrack("Neon Dreams", "neon-dreams.mp3", new URL("../assets/audio/pages/ambient-fill/neon-dreams.mp3", import.meta.url).href),
  simonNeonBreeze: productionTrack("Neon Breeze", "neon-breeze.mp3", new URL("../assets/audio/pages/ambient-fill/neon-breeze.mp3", import.meta.url).href),
  viktorParadise: productionTrack("Neon Paradise", "neon-paradise.mp3", new URL("../assets/audio/pages/ambient-fill/neon-paradise.mp3", import.meta.url).href),
  viktorFuture: productionTrack("Welcome to the Future", "welcome-to-the-future.mp3", new URL("../assets/audio/pages/ambient-fill/welcome-to-the-future.mp3", import.meta.url).href),
  skunkMidnight: productionTrack("Midnight Dreams", "midnight-dreams.mp3", new URL("../assets/audio/pages/ambient-fill/midnight-dreams.mp3", import.meta.url).href)
} as const;
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
  gemstoneTwo: productionTrack("Lusterkin Below", "gemstone-cavern-02.mp3", new URL("../assets/audio/pages/production-pass/gemstone-cavern-02.mp3", import.meta.url).href),
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
  phaseThreeTwo: productionTrack("Recovered Phase Three", "phase-three-archive-02.mp3", new URL("../assets/audio/pages/production-pass/phase-three-archive-02.mp3", import.meta.url).href),
  prismChroma: productionTrack("PRISM//5 Chroma Knights", "prism-five-chroma-knights.mp3", new URL("../assets/audio/pages/production-pass/prism-five-chroma-knights.mp3", import.meta.url).href),
  prismFive: productionTrack("Prism Five", "prism-five.mp3", new URL("../assets/audio/pages/production-pass/prism-five.mp3", import.meta.url).href),
  prizeFrequency: productionTrack("Prize Frequency Transmission", "prize-frequency-transmission.mp3", new URL("../assets/audio/pages/production-pass/prize-frequency-transmission.mp3", import.meta.url).href),
  professorStar: productionTrack("Professor StarThimble", "professor-star-thimble.mp3", new URL("../assets/audio/pages/production-pass/professor-star-thimble.mp3", import.meta.url).href),
  quietCounty: productionTrack("Quiet County Signal", "quiet-county-signal.mp3", new URL("../assets/audio/pages/production-pass/quiet-county-signal.mp3", import.meta.url).href),
  ravenCache: productionTrack("Raven Cache", "raven-cache.mp3", new URL("../assets/audio/pages/production-pass/raven-cache.mp3", import.meta.url).href),
  reservoirTown: productionTrack("Reservoir Town", "reservoir-town.mp3", new URL("../assets/audio/pages/production-pass/reservoir-town.mp3", import.meta.url).href),
  rewindOne: productionTrack("Rewind Harbor", "rewind-harbor-01.mp3", new URL("../assets/audio/pages/production-pass/rewind-harbor-01.mp3", import.meta.url).href),
  rewindTwo: productionTrack("Late Fee at Rewind Harbor", "rewind-harbor-02.mp3", new URL("../assets/audio/pages/production-pass/rewind-harbor-02.mp3", import.meta.url).href),
  rocketOne: productionTrack("Rocket Box Toys", "rocket-box-toys-01.mp3", new URL("../assets/audio/pages/production-pass/rocket-box-toys-01.mp3", import.meta.url).href),
  rocketTwo: productionTrack("Rocket Box Launch Day", "rocket-box-toys-02.mp3", new URL("../assets/audio/pages/production-pass/rocket-box-toys-02.mp3", import.meta.url).href),
  rosepatch: productionTrack("Rosepatch Diary", "rosepatch-diary.mp3", new URL("../assets/audio/pages/production-pass/rosepatch-diary.mp3", import.meta.url).href),
  snacktime: productionTrack("Snacktime Mom Page", "snacktime-mom-page.mp3", new URL("../assets/audio/pages/production-pass/snacktime-mom-page.mp3", import.meta.url).href),
  snapdragon: productionTrack("Snap Dragon String Floral", "snapdragon-string-floral.mp3", new URL("../assets/audio/pages/production-pass/snapdragon-string-floral.mp3", import.meta.url).href),
  sofaSafari: productionTrack("Sofa Safari", "sofa-safari.mp3", new URL("../assets/audio/pages/production-pass/sofa-safari.mp3", import.meta.url).href),
  soundwaveOne: productionTrack("SoundWave One", "soundwave-01.mp3", new URL("../assets/audio/pages/production-pass/soundwave-01.mp3", import.meta.url).href),
  soundwaveTwo: productionTrack("SoundWave Two", "soundwave-02.mp3", new URL("../assets/audio/pages/production-pass/soundwave-02.mp3", import.meta.url).href),
  soundwaveThree: productionTrack("SoundWave Three", "soundwave-03.mp3", new URL("../assets/audio/pages/production-pass/soundwave-03.mp3", import.meta.url).href),
  mallDimension: productionTrack("The Mall Dimension", "the-mall-dimension.mp3", new URL("../assets/audio/pages/production-pass/the-mall-dimension.mp3", import.meta.url).href),
  unfinishedAtlasOne: productionTrack("The Unfinished Atlas", "the-unfinished-atlas-01.mp3", new URL("../assets/audio/pages/production-pass/the-unfinished-atlas-01.mp3", import.meta.url).href),
  unfinishedAtlasTwo: productionTrack("The Missing Map Room", "the-unfinished-atlas-02.mp3", new URL("../assets/audio/pages/production-pass/the-unfinished-atlas-02.mp3", import.meta.url).href),
  toonburst: productionTrack("ToonBurst TV", "toonburst-tv.mp3", new URL("../assets/audio/pages/production-pass/toonburst-tv.mp3", import.meta.url).href),
  twoLanes: productionTrack("Two Lanes Home", "two-lanes-home.mp3", new URL("../assets/audio/pages/production-pass/two-lanes-home.mp3", import.meta.url).href),
  weatherCellarOne: productionTrack("Weather Cellar Net", "weather-cellar-net-01.mp3", new URL("../assets/audio/pages/production-pass/weather-cellar-net-01.mp3", import.meta.url).href),
  weatherCellarTwo: productionTrack("Stormwatch from the Cellar", "weather-cellar-net-02.mp3", new URL("../assets/audio/pages/production-pass/weather-cellar-net-02.mp3", import.meta.url).href),
  zackRerun: productionTrack("Zack's VHS Rerun", "zacks-vhs-rerun.mp3", new URL("../assets/audio/pages/production-pass/zacks-vhs-rerun.mp3", import.meta.url).href)
} as const;

const ADDITIONAL_BUSINESS_TRACKS = {
  veluna: { label: "Veluna Warnings", file: "veluna-warnings.mp3", url: new URL("../assets/audio/pages/additional-business/veluna-warnings.mp3", import.meta.url).href },
  aureline: { label: "Aureline Vector", file: "aureline-vector.mp3", url: new URL("../assets/audio/pages/additional-business/aureline-vector.mp3", import.meta.url).href },
  kestrelFutureIsNow: { label: "The Future Is Now", file: "kestrel-future-is-now.mp3", url: new URL("../assets/audio/pages/additional-business/kestrel-future-is-now.mp3", import.meta.url).href },
  kestrelFutureNow: { label: "Future Now", file: "kestrel-future-now.mp3", url: new URL("../assets/audio/pages/additional-business/kestrel-future-now.mp3", import.meta.url).href },
  westbell: { label: "West Bellwater Today", file: "west-bellwater-today.mp3", url: new URL("../assets/audio/pages/additional-business/west-bellwater-today.mp3", import.meta.url).href },
  bigbang: { label: "Big Bang Burger", file: "big-bang-burger.mp3", url: new URL("../assets/audio/pages/additional-business/big-bang-burger.mp3", import.meta.url).href },
  nullstate: { label: "NULL State Flex", file: "null-state-flex.mp3", url: new URL("../assets/audio/pages/additional-business/null-state-flex.mp3", import.meta.url).href },
  dogeared: { label: "Dog-Eared Moon", file: "dog-eared-moon.mp3", url: new URL("../assets/audio/pages/additional-business/dog-eared-moon.mp3", import.meta.url).href },
  secondsunrise: { label: "Second Sunrise Antiques", file: "second-sunrise-antiques.mp3", url: new URL("../assets/audio/pages/additional-business/second-sunrise-antiques.mp3", import.meta.url).href },
  criticalhit: { label: "Critical Hit Deals", file: "critical-hit-deals.mp3", url: new URL("../assets/audio/pages/additional-business/critical-hit-deals.mp3", import.meta.url).href },
  marcyflash: { label: "Marcy Flash Photos", file: "marcy-flash-photos.mp3", url: new URL("../assets/audio/pages/additional-business/marcy-flash-photos.mp3", import.meta.url).href },
  wondervale: { label: "WonderVale Roar", file: "wondervale-roar.mp3", url: new URL("../assets/audio/pages/additional-business/wondervale-roar.mp3", import.meta.url).href },
  greenstripe: { label: "GreenStripe Hoedown", file: "greenstripe-hoedown.mp3", url: new URL("../assets/audio/pages/additional-business/greenstripe-hoedown.mp3", import.meta.url).href },
  hankstank: { label: "Hank's Tank and Field", file: "hanks-tank-and-field.mp3", url: new URL("../assets/audio/pages/additional-business/hanks-tank-and-field.mp3", import.meta.url).href },
  pixelpetal: { label: "Pixel Petal", file: "pixel-petal.mp3", url: new URL("../assets/audio/pages/additional-business/pixel-petal.mp3", import.meta.url).href },
  maximart: { label: "Maxi-Mart Rueda", file: "maxi-mart-rueda.mp3", url: new URL("../assets/audio/pages/additional-business/maxi-mart-rueda.mp3", import.meta.url).href }
} as const satisfies Record<string, PageMusicTrack>;

const SITE_MUSIC: Record<PageDefinition["site"], PageMusicTrack> = {
  orbithome: ORBIT_HOME_TRACKS[0],
  directory: ORBIT_HOME_TRACKS[0],
  gamegridzone: { label: "Leave Reality Running", file: "leave-reality-running.mp3", url: new URL("../assets/audio/pages/vanta/leave-reality-running.mp3", import.meta.url).href },
  xtremezone: { label: "Extreme Sports Web Loop 1999", file: "extreme-sports-web-loop-1999.mp3", url: new URL("../assets/audio/pages/xtreme-zone/extreme-sports-web-loop-1999.mp3", import.meta.url).href },
  yesterdayzone: { label: "Good Old Days", file: "good-old-days.mp3", url: new URL("../assets/audio/pages/yesterday-zone/good-old-days.mp3", import.meta.url).href },
  newcomerzone: PRODUCTION_TRACKS.newcomers,
  revival: ORBIT_HOME_TRACKS[0],
  newcalfan: KING_CAL_TRACKS[0],
  newbytefan: { label: "Byte Barn Deal", file: "byte-barn-deal.mp3", url: new URL("../assets/audio/pages/byte-barn/byte-barn-deal.mp3", import.meta.url).href },
  newlinklily: PRODUCTION_TRACKS.lilyLoop,
  newrookierayna: PRODUCTION_TRACKS.orbitDiary,
  newzackrerun: PRODUCTION_TRACKS.zackRerun,
  soundboyband: PRODUCTION_TRACKS.fifthExit,
  soundpunk: PRODUCTION_TRACKS.basementCart,
  soundgrunge: PRODUCTION_TRACKS.mudInVan,
  soundbreakbeat: AMBIENT_FILL_TRACKS.simonNeonDreams,
  soundcountry: PRODUCTION_TRACKS.twoLanes,
  soundrap: PRODUCTION_TRACKS.dynamoCipher,
  bytebarnteaser: BYTE_BARN_DEAL_TRACK,
  bytebarntribute: BYTE_BARN_COMPILATION_TRACKS[0].track,
  rainbow: PRODUCTION_TRACKS.juniperGarden,
  cozygarden: PRODUCTION_TRACKS.rosepatch,
  cozycottage: PRODUCTION_TRACKS.hearthside,
  cozymom: PRODUCTION_TRACKS.snacktime,
  cozyhike: AMBIENT_FILL_TRACKS.trailnotes,
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
  computer: BYTE_BARN_DEAL_TRACK,
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
  euro: AMBIENT_FILL_TRACKS.viktorParadise,
  petcat: PRODUCTION_TRACKS.mrBoots,
  petdog: PRODUCTION_TRACKS.cometQuest,
  petrabbit: PRODUCTION_TRACKS.bunBrigade,
  pethamster: PRODUCTION_TRACKS.hamCam,
  petiguana: PRODUCTION_TRACKS.iguanaIris,
  petskunk: AMBIENT_FILL_TRACKS.skunkMidnight,
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
  furniturebusiness: PRODUCTION_TRACKS.sofaSafari,
  dentalbusiness: PRODUCTION_TRACKS.molarMeadow,
  plumbingbusiness: PRODUCTION_TRACKS.gurgleBros,
  creditbusiness: PRODUCTION_TRACKS.neighborNest,
  salonbusiness: PRODUCTION_TRACKS.haloComb,
  medbusiness: ADDITIONAL_BUSINESS_TRACKS.veluna,
  carmakerbusiness: ADDITIONAL_BUSINESS_TRACKS.aureline,
  electronicsbusiness: ADDITIONAL_BUSINESS_TRACKS.kestrelFutureIsNow,
  recreationbusiness: ADDITIONAL_BUSINESS_TRACKS.westbell,
  burgerbusiness: ADDITIONAL_BUSINESS_TRACKS.bigbang,
  fashionbusiness: ADDITIONAL_BUSINESS_TRACKS.nullstate,
  bookstorebusiness: ADDITIONAL_BUSINESS_TRACKS.dogeared,
  thriftbusiness: ADDITIONAL_BUSINESS_TRACKS.secondsunrise,
  hobbybusiness: ADDITIONAL_BUSINESS_TRACKS.criticalhit,
  photographerbusiness: ADDITIONAL_BUSINESS_TRACKS.marcyflash,
  themeparkbusiness: ADDITIONAL_BUSINESS_TRACKS.wondervale,
  lawnbusiness: ADDITIONAL_BUSINESS_TRACKS.greenstripe,
  septicbusiness: ADDITIONAL_BUSINESS_TRACKS.hankstank,
  webdesignbusiness: ADDITIONAL_BUSINESS_TRACKS.pixelpetal,
  superstorebusiness: ADDITIONAL_BUSINESS_TRACKS.maximart
};
const SITE_PLAYLISTS: Partial<Record<PageDefinition["site"], readonly PageMusicTrack[]>> = {
  orbithome: ORBIT_HOME_TRACKS,
  directory: ORBIT_HOME_TRACKS,
  gamegridzone: [SITE_MUSIC.gamegridzone, SITE_MUSIC.cubit],
  soundbreakbeat: [AMBIENT_FILL_TRACKS.simonNeonDreams, AMBIENT_FILL_TRACKS.simonNeonBreeze],
  newbytefan: [BYTE_BARN_DEAL_TRACK, ...Object.values(BYTE_BARN_FAN_TRACKS)],
  cozyhike: [AMBIENT_FILL_TRACKS.trailnotes, AMBIENT_FILL_TRACKS.trailEchoes],
  euro: [AMBIENT_FILL_TRACKS.viktorParadise, AMBIENT_FILL_TRACKS.viktorFuture],
  petskunk: [AMBIENT_FILL_TRACKS.skunkMidnight],
  bytebarnteaser: [BYTE_BARN_DEAL_TRACK, ...Object.values(BYTE_BARN_FAN_TRACKS)],
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
  electronicsbusiness: [ADDITIONAL_BUSINESS_TRACKS.kestrelFutureIsNow, ADDITIONAL_BUSINESS_TRACKS.kestrelFutureNow],
  bytebarntribute: BYTE_BARN_COMPILATION_TRACKS.map((entry) => entry.track)
};
const PAGE_PLAYLISTS: Readonly<Record<string, readonly PageMusicTrack[]>> = {
  "web://gamegrid.zone/users/riftscribethane/home": RIFTSCRIBE_THANE_TRACKS,
  "web://gamegrid.zone/users/minimarshalrae/home": MINI_MARSHAL_RAE_TRACKS,
  "web://gamegrid.zone/users/bitbunkerburt/home": BITBUNKER_BURT_TRACKS,
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
const CANONICAL_TRACK_LABELS = new Map(
  [
    ...Object.values(SITE_MUSIC),
    ...Object.values(SITE_PLAYLISTS).flatMap((playlist) => playlist),
    ...Object.values(PAGE_PLAYLISTS).flatMap((playlist) => playlist),
    ...Object.values(DOMAIN_PLAYLISTS).flatMap((playlist) => playlist)
  ].map((track) => [track.url, track.label])
);

function canonicalTrackLabel(track: PageMusicTrack) {
  return CANONICAL_TRACK_LABELS.get(track.url) ?? track.label;
}

function canonicalizeTrack(track: PageMusicTrack): PageMusicTrack {
  const label = canonicalTrackLabel(track);
  return label === track.label ? track : { ...track, label };
}

const pageMusic = new Audio();
pageMusic.loop = true;
pageMusic.preload = "auto";
const globalMusic = new Audio();
globalMusic.loop = true;
globalMusic.preload = "auto";
const PAGE_MUSIC_MAX_VOLUME = 0.36;
pageMusic.volume = PAGE_MUSIC_MAX_VOLUME * 0.5;
globalMusic.volume = PAGE_MUSIC_MAX_VOLUME * 0.5;

type StartupStage = "title" | "powering" | "bios" | "splash" | "login" | "dialup" | "desktop";

const SIGNAL_NOTE_CONTENTS = [
  "OPERATOR'S NOTE — 11/03/1999",
  "",
  "The extra voice appears at exactly 23:17.",
  "It repeats three words: LOOK BEHIND ORBIT.",
  "",
  "A four-digit lock is usually a date.",
  "The hard part is knowing whose."
].join("\n");

const MIRA_WELCOME_TEXT = [
  "hey, you made it! welcome to OrbitNet.",
  "",
  "quick history lesson: OrbitOS was one of those early-'90s attempts to make the computer and the internet one big friendly thing. the operating system, browser, mail, and its own little web all came together. it never beat the big guys, so now most people only know it as that weird old system with the community pages. regular computers can reach Orbit through a clunky bridge, but the pages work best inside OrbitOS.",
  "",
  "I found an old access setup and thought you'd get a kick out of it. it's quiet, but not empty—people still keep personal pages, business sites, guestbooks, music, and strange little archives here. poke through the zones, search whatever sounds interesting, and message people. somebody usually knows where the weird stuff is.",
  "",
  "one useful thing: Orbit isn't frozen. people answer on their own schedules, pages pick up new comments, and different people know different pieces of a story. if a clue names somebody, ask them. if you're waiting on people, Sleep from the Start menu and check back.",
  "",
  "welcome aboard :)"
].join("\n");

const DEFAULT_STATE: GameState = {
  version: 18,
  playerName: "",
  storyPhase: 1,
  phaseReachedAt: {},
  discoveredMysteries: [],
  visited: ["web://home"],
  bookmarks: ["web://rainbow.gdn/home"],
  downloads: [],
  musicLibrary: [...ORBIT_HOME_TRACKS],
  musicSkin: "orbitofficial",
  flags: {},
  currentUrl: "web://home",
  settings: { theme: "classic", wallpaper: "teal", cursor: "arrow", musicVolume: 50, browserTextSize: "medium" },
  gameTime: "1999-11-03T19:30:00",
  pageComments: [],
  ambientPostQueue: [],
  pageVisitCounts: { "web://home": 1 },
  guestbookEntries: {},
  readDirectMessageIds: [],
  bbs: { connected: false, selectedBoardId: "general", selectedThreadId: null, readThreadIds: [], replies: [], readMailIds: [], downloadedFileIds: [] },
  infection: { level: 0, discoveredRandyPages: [], invadedPersonalPages: [], evidenceIds: [], patchComponents: [], exposureReportPublished: false, patchBuilt: false, patchDistributed: false, cleanupComplete: false },
  directMessages: [{
    id: "mira-welcome-1999",
    ownerId: "mira_917",
    channel: "aim",
    role: "owner",
    author: "Mira_917",
    text: MIRA_WELCOME_TEXT,
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
  riftscribe_thane: { screenName: "RiftScribeThane", displayName: "Thane" },
  minimarshal_rae: { screenName: "MiniMarshalRae", displayName: "Rae" },
  bitbunker_burt: { screenName: "BitBunkerBurt", displayName: "Burt" },
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
  ...Object.fromEntries(Object.values(ADDITIONAL_BUSINESS_OWNERS).map((owner) => [
    owner.id,
    { screenName: owner.screenName, displayName: owner.displayName }
  ])),
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
  riftscribe_thane: { screenName: "RiftScribeThane", displayName: "Thane", statusMessage: "sorting rares // testing one more line", aim: "RiftScribeThane" },
  minimarshal_rae: { screenName: "MiniMarshalRae", displayName: "Rae", statusMessage: "painting shields // session notes later", aim: "MiniMarshalRae" },
  bitbunker_burt: { screenName: "BitBunkerBurt", displayName: "Burt", statusMessage: "cataloging cartridges // not a museum", aim: "BitBunkerBurt" },
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
  faxmoth_13: { screenName: "FaxMoth_13", displayName: "FaxMoth", statusMessage: "paper first, theory second", email: "faxmoth@orbitmail.net" },
  nullindex: { screenName: "IndexNull", displayName: "Index Null", statusMessage: "404 is still a response" },
  cedar_wren: { screenName: "CedarWren", displayName: "Cedar", statusMessage: "checking the boring attachment", email: "cedar.wren@orbitmail.net" },
  static_abel: { screenName: "StaticAbel", displayName: "Abel", statusMessage: "group count does not match", email: "staticabel@orbitmail.net" },
  orchard_lee: { screenName: "OrchardLee", displayName: "Lee", statusMessage: "archives do not interpret themselves" },
  skywatch_sam: { screenName: "Skywatch_Sam", displayName: "Sam", statusMessage: "three lights, four explanations", email: "skywatch@orbitmail.net" },
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

function ensureCharacterContact(ownerId: string) {
  const existing = CHARACTER_CONTACTS[ownerId];
  if (existing) return existing;
  const owner = PAGE_OWNERS[ownerId];
  if (!owner || ownerId === "system_core") return null;
  const contact = {
    screenName: owner.screenName,
    displayName: owner.displayName,
    statusMessage: "Orbit page contact"
  };
  CHARACTER_CONTACTS[ownerId] = contact;
  return contact;
}

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
  riftscribe_thane: "web://gamegrid.zone/users/riftscribethane/home",
  minimarshal_rae: "web://gamegrid.zone/users/minimarshalrae/home",
  bitbunker_burt: "web://gamegrid.zone/users/bitbunkerburt/home",
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
  ...ADDITIONAL_BUSINESS_HOME_URLS,
  ...NEWCOMER_HOME_URLS,
  ...SOUNDWAVE_HOME_URLS,
  ...DORMANT_LEGACY_HOME_URLS,
  system_core: "web://legacy.orbitos.local/admin/continuity"
};

const GAME_TIME_SCALE = 2;
const AMBIENT_POST_MAX_ATTEMPTS = 3;
const AMBIENT_POST_INTERVAL_MINUTES = 5;
const PHASE_TWO_COMMENTERS = ["cedar_wren", "static_abel", "skywatch_sam"] as const;
const PHASE_THREE_COMMENTERS = [...PHASE_TWO_COMMENTERS, "orchard_lee", ...PHASE_THREE_EXPLORER_IDS];
const MYSTERY_TERMINALS: Record<string, string> = {
  "web://morrow-five.net/decoded": "morrow_five",
  "web://glasslake-field.gov/report": "glass_lake",
  "web://quiet-county.org/case": "quiet_county",
  "web://archive.orbitnet.local/labs/findings": "adaptive_index"
};
const MYSTERY_UNLOCK_FLAGS: Record<string, string> = {
  morrow_five: "morrow_case_unlocked",
  glass_lake: "glass_lake_case_unlocked",
  quiet_county: "quiet_county_case_unlocked"
};
const MYSTERY_CASE_ANSWERS: Record<string, string> = {
  morrow_five: "00417|10",
  glass_lake: "091294|b0614",
  quiet_county: "definately|trestle|b1102"
};
const PHASE_TWO_MAIN_MYSTERIES = ["morrow_five", "glass_lake", "quiet_county"] as const;
const REQUIRED_PHASE_THREE_MYSTERIES = Object.values(MYSTERY_TERMINALS);
const RAVEN_VAULT_URL = "web://raven.web/vault";
const LEGACY_ORBIT_HOME_URL = "web://legacy.orbitos.local/home";
const RAVEN_CONCLUSION_URL = "web://raven.web/vault/conclusion";
const ADAPTIVE_INDEX_FINDINGS_URL = "web://archive.orbitnet.local/labs/findings";

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
  music: { open: false, minimized: false, maximized: false, z: 4, x: 220, y: 88, width: 820, height: 570 },
  settings: { open: false, minimized: false, maximized: false, z: 1, x: 260, y: 70, width: 590, height: 540 },
  helper: { open: false, minimized: false, maximized: false, z: 5, x: 635, y: 250, width: 410, height: 390 },
  diagnostics: { open: false, minimized: false, maximized: false, z: 1, x: 285, y: 105, width: 570, height: 430 }
  ,bbs: { open: false, minimized: false, maximized: false, z: 3, x: 145, y: 62, width: 760, height: 560 }
};

const APP_META: Record<AppId, { icon: string; title: string }> = {
  browser: { icon: "O", title: "Orbit Explorer" },
  music: { icon: "♫", title: "OrbitAmp" },
  mail: { icon: "@", title: "Orbit Mail" },
  files: { icon: "▣", title: "My Files" },
  chat: { icon: "◎", title: "OIM" },
  settings: { icon: "⚙", title: "Desktop Settings" },
  helper: { icon: "?", title: "Orbit Pal" },
  diagnostics: { icon: "▤", title: "System Diagnostics" }
  ,bbs: { icon: ">_", title: "Orbit Terminal" }
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
let chatPendingMessage = "";
let chatError = "";
const startupParams = new URLSearchParams(window.location.search);
const previewStoryPhase = ["127.0.0.1", "localhost"].includes(window.location.hostname)
  ? Number(startupParams.get("previewPhase"))
  : 0;
let startupStage: StartupStage = startupParams.has("skipBoot") ? "desktop" : "title";
let startupTimer: number | null = null;
let startupStatusTimer: number | null = null;
let openingMessageTimer: number | null = null;
let bootMonitorZoom = { originX: 0, originY: 0, panX: 0, panY: 0 };
let loginNameError = "";
let computerHasBooted = startupStage === "desktop";
let sleepDialogOpen = false;
let sleepTransition: { wokeAt: string; summary: string } | null = null;
let sleepTransitionTimer: number | null = null;
let phaseTransition: {
  phase: 2 | 3 | 4 | 5 | 6 | 7;
  sleptFrom: string;
  wokeAt: string;
} | null = null;
let phaseTransitionPrompt: 2 | 3 | 4 | 5 | 6 | 7 | null = null;
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
let globalMusicPlaying = false;
let loadedGlobalMusicKey: string | null = null;
let globalMusicTrackIndex = 0;
const semanticSearchCache = new Map<string, string[]>();
const pendingSearches = new Set<string>();
const browserScrollPositions = new Map<string, number>();
let chatTranscriptScrollTop = 0;
let settingsScrollTop = 0;
let chatTranscriptPinnedToBottom = true;
let helperTranscriptScrollTop = 0;
let helperTranscriptPinnedToBottom = true;
let renderedBrowserUrl = state.currentUrl;
let saveStateQueue: Promise<unknown> = Promise.resolve();

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
  let storyPhase = [2, 3, 4, 5, 6, 7].includes(Number(loaded.storyPhase)) ? loaded.storyPhase as StoryPhase : 1;
  // Version 16 used phase 6 for the completed cleanup. Preserve that state as
  // the new phase-7 aftermath instead of dropping a player back into the attack.
  if (Number(loaded.version ?? 0) < 17 && storyPhase === 6 && loaded.infection?.cleanupComplete) storyPhase = 7;
  const normalizedPhaseReachedAt: GameState["phaseReachedAt"] = { ...(loaded.phaseReachedAt ?? {}) };
  const legacyPhaseDates: Array<["2" | "3" | "4" | "5" | "6" | "7", StoryPhase, string]> = [
    ["2", 2, "1999-11-07T07:00:00"],
    ["3", 3, "1999-11-11T07:00:00"],
    ["4", 4, "1999-11-13T07:00:00"],
    ["5", 5, "1999-11-16T07:00:00"],
    ["6", 6, "1999-11-20T07:00:00"],
    ["7", 7, "1999-11-22T07:00:00"]
  ];
  for (const [key, phase, fallback] of legacyPhaseDates) {
    const savedDate = normalizedPhaseReachedAt[key];
    if (savedDate && !Number.isNaN(Date.parse(savedDate))) continue;
    delete normalizedPhaseReachedAt[key];
    if (storyPhase >= phase) normalizedPhaseReachedAt[key] = fallback;
  }
  const normalizedFlags = { ...(loaded.flags ?? {}) };
  // The initial cursor test pass unlocked the entire collection with one flag.
  // Cursor downloads are now individual, so discard that obsolete shortcut
  // without touching any cursor-specific flags a player may already own.
  delete normalizedFlags.cursor_collection_downloaded;
  if (
    storyPhase === 3 &&
    normalizedFlags.continuity_console_unlocked &&
    normalizedFlags.phase_four_transition_pending === undefined
  ) {
    normalizedFlags.phase_four_transition_pending = true;
  }
  if (
    Number(loaded.version ?? 0) < 9 &&
    storyPhase === 1 &&
    normalizedFlags.darkraven_vault_unlocked &&
    !normalizedFlags.darkraven_conclusion_unlocked
  ) {
    delete normalizedFlags.phase_two_transition_pending;
  }
  if (
    Number(loaded.version ?? 0) < 10 &&
    storyPhase === 2 &&
    !normalizedFlags.phase_two_intro_outreach_queued
  ) {
    normalizedFlags.phase_two_intro_outreach_pending = true;
  }
  if (Number(loaded.version ?? 0) < 18 && storyPhase >= 6) {
    normalizedFlags.randy_zone_spread_complete = true;
    if (storyPhase >= 7) normalizedFlags.randy_personal_spread_complete = true;
  }
  let normalizedDirectMessages = Array.isArray(loaded.directMessages)
    ? loaded.directMessages.map((message) => message.id === "mira-welcome-1999" ? { ...message, text: MIRA_WELCOME_TEXT } : message)
    : [];
  let normalizedAmbientPostQueue = Array.isArray(loaded.ambientPostQueue) ? [...loaded.ambientPostQueue] : [];
  if (Number(loaded.version ?? 0) < 12) {
    const obsoletePhaseMailIds = new Set([
      "phase3-faxmoth-archive",
      "phase3-cedar-context",
      "phase3-static-correction"
    ]);
    const playerPrivateContacts = new Set(normalizedDirectMessages
      .filter((message) => message.role === "player" && (message.channel === "aim" || message.channel === "email"))
      .map((message) => `${message.channel}:${message.ownerId}`));
    normalizedDirectMessages = normalizedDirectMessages.filter((message) => {
      if (obsoletePhaseMailIds.has(message.id)) return false;
      if (message.id.startsWith("system-hint-") && (message.channel === "aim" || message.channel === "email")) {
        const rumorId = [
          ...SYSTEM_RUMORS.map((rumor) => rumor.id),
          ...ORPHAN_RUMORS.map((_, index) => `orphan_${index + 1}`)
        ].find((candidate) => message.id.startsWith(`system-hint-${candidate}-`));
        if (rumorId) delete normalizedFlags[`system_rumor_${rumorId}`];
        return false;
      }
      const looksAmbientGenerated = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(message.id);
      const isUnansweredUnsolicitedPrivateMessage =
        message.role === "owner" &&
        (message.channel === "aim" || message.channel === "email") &&
        looksAmbientGenerated &&
        !playerPrivateContacts.has(`${message.channel}:${message.ownerId}`);
      return !isUnansweredUnsolicitedPrivateMessage;
    });
    normalizedAmbientPostQueue = normalizedAmbientPostQueue.filter((job) =>
      job.surface !== "email" &&
      (job.surface !== "aim" || MAIN_AMBIENT_OIM_IDS.has(job.personaId))
    );
  }
  const normalizedPageComments = Array.isArray(loaded.pageComments) ? [...loaded.pageComments] : [];
  if (Number(loaded.version ?? 0) < 13 && storyPhase >= 3) {
    for (const [index, account] of DORMANT_LEGACY_ACCOUNTS.entries()) {
      if (normalizedPageComments.some((comment) => comment.ownerId === account.id)) {
        normalizedFlags[`system_legacy_${account.id}`] = true;
        continue;
      }
      const pageUrl = phaseThreeLegacyTrailTargetUrl(account.id, index);
      normalizedPageComments.push({
        id: `migration-legacy-${account.id}`,
        pageUrl,
        ownerId: account.id,
        role: "visitor",
        author: account.screenName,
        text: account.rumor,
        createdAt: loaded.gameTime ?? DEFAULT_STATE.gameTime,
        revealAfterVisit: Number(loaded.pageVisitCounts?.[pageUrl] ?? 0) + 1
      });
      normalizedFlags[`system_legacy_${account.id}`] = true;
    }
  }
  const readDirectMessageIds = Array.isArray(loaded.readDirectMessageIds)
    ? [...new Set(loaded.readDirectMessageIds.map(String))]
    : normalizedDirectMessages
        .filter((message) =>
          message.role === "owner" &&
          deliveryIsAvailable(message.availableAt, loaded.gameTime ?? DEFAULT_STATE.gameTime)
        )
        .map((message) => message.id);
  const discoveredMysteries = Array.isArray(loaded.discoveredMysteries)
    ? [...new Set(loaded.discoveredMysteries.map(String))]
    : [];
  const bookmarks = Array.isArray(loaded.bookmarks)
    ? [...new Set(loaded.bookmarks.map(String))]
    : [...DEFAULT_STATE.bookmarks];
  if (normalizedFlags.darkraven_vault_unlocked && !bookmarks.includes(LEGACY_ORBIT_HOME_URL)) {
    const oldAutomaticBookmark = bookmarks.indexOf(RAVEN_VAULT_URL);
    if (oldAutomaticBookmark >= 0) bookmarks.splice(oldAutomaticBookmark, 1);
    bookmarks.push(LEGACY_ORBIT_HOME_URL);
  }
  if (discoveredMysteries.includes("adaptive_index") && !bookmarks.includes(ADAPTIVE_INDEX_FINDINGS_URL)) {
    bookmarks.push(ADAPTIVE_INDEX_FINDINGS_URL);
  }
  const musicLibrary = (Array.isArray(loaded.musicLibrary) && loaded.musicLibrary.length
    ? loaded.musicLibrary.filter((track): track is PageMusicTrack =>
      Boolean(track) && typeof track.label === "string" && typeof track.file === "string" && typeof track.url === "string"
    )
    : [...ORBIT_HOME_TRACKS]).map(canonicalizeTrack);
  const musicSkin = typeof loaded.musicSkin === "string" && MUSIC_PLAYER_SKINS.some((skin) => skin.id === loaded.musicSkin)
    ? loaded.musicSkin
    : DEFAULT_STATE.musicSkin;
  return {
    ...structuredClone(DEFAULT_STATE),
    ...loaded,
    version: DEFAULT_STATE.version,
    playerName,
    storyPhase,
    phaseReachedAt: normalizedPhaseReachedAt,
    flags: normalizedFlags,
    discoveredMysteries,
    bookmarks,
    musicLibrary: [...new Map(musicLibrary.map((track) => [track.url, track])).values()],
    musicSkin,
    downloads: Array.isArray(loaded.downloads)
      ? loaded.downloads.map((file) => file.id === "signal-note" ? { ...file, contents: SIGNAL_NOTE_CONTENTS } : file)
      : [],
    settings: { ...DEFAULT_STATE.settings, ...(loaded.settings ?? {}) },
    pageComments: normalizedPageComments,
    ambientPostQueue: normalizedAmbientPostQueue,
    pageVisitCounts: { ...DEFAULT_STATE.pageVisitCounts, ...(loaded.pageVisitCounts ?? {}) },
    guestbookEntries: { ...(loaded.guestbookEntries ?? {}) },
    directMessages: normalizedDirectMessages,
    readDirectMessageIds,
    relationships: { ...DEFAULT_STATE.relationships, ...(loaded.relationships ?? {}) },
    bbs: {
      ...DEFAULT_STATE.bbs,
      ...(loaded.bbs ?? {}),
      readThreadIds: [...new Set(loaded.bbs?.readThreadIds ?? [])],
      replies: Array.isArray(loaded.bbs?.replies) ? loaded.bbs.replies : [],
      readMailIds: [...new Set(loaded.bbs?.readMailIds ?? [])],
      downloadedFileIds: [...new Set(loaded.bbs?.downloadedFileIds ?? [])]
    },
    infection: {
      ...DEFAULT_STATE.infection,
      ...(loaded.infection ?? {}),
      level: Number(loaded.version ?? 0) < 18 && storyPhase === 6
        ? 2
        : Number(loaded.infection?.level ?? DEFAULT_STATE.infection.level),
      discoveredRandyPages: [...new Set(Number(loaded.version ?? 0) < 18 && storyPhase >= 6
        ? RANDY_ZONE_PAGES.map((page) => page.url)
        : loaded.infection?.discoveredRandyPages ?? [])],
      invadedPersonalPages: [...new Set(loaded.infection?.invadedPersonalPages ?? [])],
      evidenceIds: [...new Set(loaded.infection?.evidenceIds ?? [])],
      patchComponents: [...new Set(loaded.infection?.patchComponents ?? [])]
    }
  };
}

async function saveState() {
  const snapshot = structuredClone(state);
  if (window.gameAPI) {
    saveStateQueue = saveStateQueue
      .catch(() => undefined)
      .then(() => window.gameAPI!.save(snapshot));
    await saveStateQueue;
  } else {
    localStorage.setItem("surfin-save", JSON.stringify(snapshot));
  }
}

function unreadDirectMessages(channel?: "aim" | "email", ownerId?: string) {
  const readIds = new Set(state.readDirectMessageIds);
  return state.directMessages.filter((message) =>
    message.role === "owner" &&
    message.channel !== "helper" &&
    (!channel || message.channel === channel) &&
    (!ownerId || message.ownerId === ownerId) &&
    deliveryIsAvailable(message.availableAt, state.gameTime) &&
    !readIds.has(message.id)
  );
}

function markDirectMessagesRead(messages: DirectMessage[]) {
  const unreadIds = messages
    .filter((message) => message.role === "owner" && !state.readDirectMessageIds.includes(message.id))
    .map((message) => message.id);
  if (!unreadIds.length) return false;
  state.readDirectMessageIds = [...state.readDirectMessageIds, ...unreadIds];
  void saveState();
  return true;
}

function markAimConversationRead(ownerId: string) {
  return markDirectMessagesRead(unreadDirectMessages("aim", ownerId));
}

function directMessageBadge(count: number, label = "unread replies") {
  if (!count) return "";
  const shown = count > 99 ? "99+" : String(count);
  return `<span class="app-unread-badge" aria-label="${count} ${label}">${shown}</span>`;
}

function evidenceSnapshotId(url: string) {
  return `evidence:${url}`;
}

function pageSnapshotText(page: PageDefinition) {
  const container = document.createElement("div");
  container.innerHTML = page.render(state);
  container.querySelectorAll("img").forEach((image) => {
    image.replaceWith(document.createTextNode(image.alt ? `\n[IMAGE: ${image.alt}]\n` : ""));
  });
  container.querySelectorAll("br").forEach((lineBreak) => lineBreak.replaceWith(document.createTextNode("\n")));
  container.querySelectorAll("td, th").forEach((cell) => cell.append(document.createTextNode("\t")));
  container.querySelectorAll("p, h1, h2, h3, header, footer, aside, article, section, li, tr, pre, blockquote, dt, dd, nav")
    .forEach((block) => block.append(document.createTextNode("\n")));
  const body = (container.textContent ?? "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return [
    "ORBIT EXPLORER OFFLINE PAGE COPY",
    "================================",
    `TITLE: ${page.title}`,
    `SOURCE: ${page.url}`,
    `SAVED: ${formatGameTimestamp(state.gameTime)}`,
    "",
    body
  ].join("\n");
}

function downloadCurrentPageCopy(url: string) {
  const page = url === state.currentUrl ? currentPage() : pages[url];
  if (!page || !pageAvailable(page)) return;
  const id = evidenceSnapshotId(page.url);
  const existing = state.downloads.find((file) => file.id === id);
  const name = `${page.title.toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 34) || "ORBIT-PAGE"}.TXT`;
  const snapshot = {
    id,
    name,
    contents: pageSnapshotText(page),
    downloadedAt: state.gameTime,
    sourceUrl: page.url,
    sourceTitle: page.title
  };
  if (existing) Object.assign(existing, snapshot);
  else state.downloads.push(snapshot);
  void saveState();
  showNotification(existing ? `Saved copy updated: ${name}` : `Page copy saved to My Files: ${name}`, 4200);
}

function saveBusinessCollectible(id: BusinessCollectibleId) {
  const artifact = BUSINESS_COLLECTIBLES[id];
  const fileId = `business-collectible:${id}`;
  const snapshot = {
    id: fileId,
    name: artifact.filename,
    contents: `${artifact.title}\n${"=".repeat(artifact.title.length)}\n\n${artifact.copy}\n\nSOURCE: ${artifact.sourceTitle}\nSAVED: ${formatGameTimestamp(state.gameTime)}`,
    downloadedAt: state.gameTime,
    sourceUrl: artifact.sourceUrl,
    sourceTitle: artifact.sourceTitle,
    artId: id
  };
  const existing = state.downloads.find((file) => file.id === fileId);
  if (existing) Object.assign(existing, snapshot);
  else state.downloads.push(snapshot);
  void saveState();
  showNotification(existing ? `${artifact.title} reopened in My Files.` : `${artifact.title} saved to My Files.`, 4200);
}

function deliverBusinessCollectibleMail(id: BusinessCollectibleId) {
  const artifact = BUSINESS_COLLECTIBLES[id];
  const messageId = `business-mail:${id}`;
  const snapshot: DirectMessage = {
    id: messageId,
    ownerId: `business:${id}`,
    channel: "email",
    role: "owner",
    author: `${artifact.sourceTitle} Automated Archive`,
    subject: artifact.title,
    text: `Here is the informational archive copy you requested. It arrives immediately, nobody is waiting for a reply, and nothing else will be delivered later.\n\n${artifact.copy}`,
    createdAt: state.gameTime,
    linkUrl: artifact.sourceUrl,
    linkLabel: `Open ${artifact.sourceTitle}`,
    artId: id,
    attachmentId: id
  };
  const existing = state.directMessages.find((message) => message.id === messageId);
  if (existing) Object.assign(existing, snapshot);
  else state.directMessages.push(snapshot);
  selectedMailMessageId = messageId;
  void saveState();
  showNotification(existing ? `${artifact.title} is already in Orbit Mail.` : `${artifact.title} arrived in Orbit Mail.`, 4200);
}

function crossedGameIntervals(before: Date, after: Date, intervalMinutes: number) {
  const interval = intervalMinutes * 60 * 1000;
  return Math.max(0, Math.floor(after.getTime() / interval) - Math.floor(before.getTime() / interval));
}

function crossedGameHourBoundaries(before: Date, after: Date) {
  return crossedGameIntervals(before, after, 60);
}

function crossedAmbientPostIntervals(before: Date, after: Date) {
  return crossedGameIntervals(before, after, AMBIENT_POST_INTERVAL_MINUTES);
}

const RANDY_SPREAD_INTERVAL_MINUTES = 2;
const RANDY_ZONE_PAGE_CHANCE = 0.34;
const RANDY_PERSONAL_PAGE_CHANCE = 0.52;

function randyPersonalPageTargets() {
  return Object.values(pages).filter((page) =>
    page.commentsEnabled &&
    page.site !== "revival" &&
    !page.site.endsWith("business") &&
    page.ownerId !== "orbit_guide" &&
    page.ownerId !== "system_core" &&
    !DORMANT_LEGACY_PERSONA_IDS.has(page.ownerId) &&
    !RANDY_PAGES.some((url) => url === page.url)
  );
}

function updateRandyPersonalSpreadLevel() {
  if (state.storyPhase !== 6 || state.infection.cleanupComplete) return;
  const total = randyPersonalPageTargets().length;
  const invaded = state.infection.invadedPersonalPages.length;
  const progress = total ? invaded / total : 0;
  state.infection.level = progress >= 0.66 ? 4 : progress >= 0.33 ? 3 : 2;
  if (total > 0 && invaded >= total) state.flags.randy_personal_spread_complete = true;
}

function rollRandySpread(before: Date, after: Date) {
  const rolls = crossedGameIntervals(before, after, RANDY_SPREAD_INTERVAL_MINUTES);
  if (rolls < 1 || state.storyPhase < 5 || state.storyPhase > 6) return;
  let changed = false;

  for (let roll = 0; roll < rolls; roll += 1) {
    if (state.storyPhase === 5) {
      const pending = RANDY_ZONE_PAGES
        .map((entry) => entry.url)
        .filter((url) => !state.infection.discoveredRandyPages.includes(url));
      if (!pending.length) {
        state.flags.randy_zone_spread_complete = true;
        maybeArmRandyEscalation();
        break;
      }
      if (Math.random() >= RANDY_ZONE_PAGE_CHANCE) continue;
      const url = pending[Math.floor(Math.random() * pending.length)];
      state.infection.discoveredRandyPages.push(url);
      changed = true;
      const entry = RANDY_ZONE_PAGES.find((candidate) => candidate.url === url);
      showPassiveNotification(`Another Big Randy page appeared in ${entry?.zoneId ?? "Orbit"}.`);
      if (pending.length === 1) {
        state.flags.randy_zone_spread_complete = true;
        maybeArmRandyEscalation();
      }
      continue;
    }

    const targets = randyPersonalPageTargets();
    const pending = targets.filter((page) => !state.infection.invadedPersonalPages.includes(page.url));
    if (!pending.length) {
      state.flags.randy_personal_spread_complete = true;
      updateRandyPersonalSpreadLevel();
      maybeArmRandyCleanup();
      break;
    }
    if (Math.random() >= RANDY_PERSONAL_PAGE_CHANCE) continue;
    const page = pending[Math.floor(Math.random() * pending.length)];
    state.infection.invadedPersonalPages.push(page.url);
    changed = true;
    updateRandyPersonalSpreadLevel();
    if (state.flags.randy_personal_spread_complete) maybeArmRandyCleanup();
    showPassiveNotification(`A Big Randy post appeared on ${page.title}.`);
  }

  if (changed) void saveState();
}

function ambientCommentHomepages() {
  return Object.values(pages).filter((page) => pageAvailable(page) && page.commentsEnabled && page.url.endsWith("/home"));
}

function ambientPostingPersonaIds() {
  const pageOwners = Object.values(pages).filter(pageAvailable).map((page) => page.ownerId);
  const phaseCommenters = state.storyPhase >= 3
    ? PHASE_THREE_COMMENTERS
    : state.storyPhase >= 2 ? PHASE_TWO_COMMENTERS : [];
  return [...new Set([...pageOwners, ...phaseCommenters, ...SUPPORTING_BUSINESS_PERSONA_IDS])]
    .filter((personaId) =>
      personaId !== "system_core" &&
      !DORMANT_LEGACY_PERSONA_IDS.has(personaId) &&
      Boolean(PAGE_OWNERS[personaId])
    );
}

const MAIN_AMBIENT_OIM_IDS = new Set<string>(
  MAIN_CHARACTER_IDS.filter((personaId) => personaId !== "system_core")
);

const AMBIENT_PRIVATE_INTRODUCTIONS: Record<string, string> = {
  mira_917: "hey, Mira here. I heard your name was attached to the Raven mess, so I figured I should say hi properly. write back if you want another set of eyes on anything weird.",
  darkraven_xx: "xX_DarkRaven_Xx here. apparently you are one of the people actually looking instead of laughing and leaving. message me if you find something that does not fit.",
  juniper_gdn: "Hi! I'm Juniper from Rainbow Garden. Your name keeps turning up around the newly busy parts of Orbit, so I wanted to introduce myself. Feel free to say hello—or ask if you need help finding your way around.",
  lagmaster_99: "hey, LagMaster_99 here. people said you were the one who kicked off this whole return-to-Orbit thing. figured I'd introduce myself before everybody starts acting like we already know each other.",
  faxmoth_13: "FaxMoth_13 here. I keep the paper archive in Backchannel. Since your discovery brought people through the door, I thought I should introduce myself; send a specific question if you want help separating a document from the story around it.",
  rhymetape_rico: "yo, RhymeTape_Rico here. I mostly chase strange music and stranger little pages, but your name is all over this new wave of traffic. thought I'd say hello before the whole place gets even louder."
};

const AMBIENT_PRIVATE_CHECK_INS: Record<string, readonly string[]> = {
  mira_917: ["find anything interesting yet, or just ten new ways to get lost?", "how's the search going? anything you want another set of eyes on?"],
  darkraven_xx: ["so. find anything that actually proves me wrong yet?", "checking in. did you find something useful, or just more people making fun of the dream aliens?"],
  juniper_gdn: ["How is everything going? Find anything interesting—or somewhere peaceful, at least?", "Just checking in. Are you making progress, or would another person help?"],
  lagmaster_99: ["how's the hunt going? find anything good or are you as stuck as everybody else?", "checking in. you make progress, or just collect more suspicious numbers?"],
  faxmoth_13: ["Checking in: did you find a document worth comparing, or only another exciting headline?", "Any progress? Send one specific source if you want a second opinion."],
  rhymetape_rico: ["you find anything worth hearing—or solving—since we last talked?", "checking in. any progress, or did the page music send you down another side road?"]
};

function ambientPrivateOutreachText(personaId: string, mode: "introduction" | "follow-up") {
  if (mode === "introduction") {
    return AMBIENT_PRIVATE_INTRODUCTIONS[personaId] ??
      `Hi, ${PAGE_OWNERS[personaId]?.screenName ?? personaId} here. I saw your name around Orbit and wanted to introduce myself. Write back if you feel like comparing notes.`;
  }
  const options = AMBIENT_PRIVATE_CHECK_INS[personaId] ?? ["How is the search going? Find anything interesting, or are you as stuck as everybody else?"];
  return options[Math.floor(Math.random() * options.length)] ?? options[0];
}

const AMBIENT_INVESTIGATION_URLS = [
  "web://foldedwire.net/home",
  "web://index-null.net/home",
  "web://morrow-five.net/home",
  "web://glasslake-field.gov/home",
  "web://quiet-county.org/home",
  "web://archive.orbitnet.local/labs/home"
];

function ambientInvestigationPages() {
  const available = AMBIENT_INVESTIGATION_URLS
    .map((url) => pages[url])
    .filter((page): page is PageDefinition => Boolean(page && pageAvailable(page)));
  const visited = available.filter((page) => state.visited.includes(page.url));
  return visited.length && Math.random() < 0.72 ? visited : available;
}

function extractAmbientPageContext(page: PageDefinition) {
  const container = document.createElement("div");
  container.innerHTML = page.render(state);
  // Ambient public comments should see the authored page, not the comment
  // widget or any comment-like markup that a page happens to render itself.
  container.querySelectorAll(".page-comments, .comments, [data-comment-page], script, style").forEach((element) => element.remove());
  return (container.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 3000);
}

function playerHasTalkedTo(personaId: string) {
  return state.directMessages.some((message) =>
    message.ownerId === personaId &&
    message.role === "player" &&
    (message.channel === "aim" || message.channel === "email")
  );
}

function characterHasPrivateHistory(personaId: string) {
  return state.directMessages.some((message) =>
    message.ownerId === personaId &&
    (message.channel === "aim" || message.channel === "email")
  );
}

function ambientPrivateIntroFlag(personaId: string) {
  return `ambient_private_intro_${personaId}`;
}

function queuePhaseTwoReturnOutreach(createdAt: string) {
  if (state.storyPhase !== 2 || !state.flags.phase_two_intro_outreach_pending) return new Set<string>();
  state.flags.phase_two_intro_outreach_pending = false;
  state.flags.phase_two_intro_outreach_queued = true;

  const candidates = [...MAIN_AMBIENT_OIM_IDS]
    .filter((personaId) =>
      personaId !== "mira_917" &&
      (playerHasTalkedTo(personaId) || !characterHasPrivateHistory(personaId))
    )
    .sort(() => Math.random() - 0.5);
  const outreachCount = Math.random() < 0.55 ? 2 : 1;
  const selected = candidates.slice(0, outreachCount);
  for (const personaId of selected) {
    const pageUrl = CHARACTER_HOME_URLS[personaId];
    const page = pages[pageUrl] && pageAvailable(pages[pageUrl])
      ? pages[pageUrl]
      : ambientInvestigationPages()[0];
    if (!page) continue;
    state.ambientPostQueue.push({
      id: crypto.randomUUID(),
      personaId,
      pageUrl: page.url,
      createdAt,
      attempts: 0,
      surface: "aim",
      privateOutreachMode: playerHasTalkedTo(personaId) ? "follow-up" : "introduction"
    });
  }
  return new Set(selected);
}

function queueAmbientPostRolls(intervalsElapsed: number, createdAt: string, allowPrivateOutreach = true) {
  if (intervalsElapsed < 1) return;
  const homepages = ambientCommentHomepages();
  if (!homepages.length) return;
  const activeRandyPages = state.infection.discoveredRandyPages
    .map((url) => pages[url])
    .filter((page): page is PageDefinition => Boolean(page?.commentsEnabled));
  const invadedPersonalPages = state.infection.invadedPersonalPages
    .map((url) => pages[url])
    .filter((page): page is PageDefinition => Boolean(page?.commentsEnabled));
  const queuedBeforeReturnOutreach = state.ambientPostQueue.length;
  const phaseTwoReturnContacts = allowPrivateOutreach
    ? queuePhaseTwoReturnOutreach(createdAt)
    : new Set<string>();
  const chancePerHour = state.storyPhase === 3 ? 0.07 : state.storyPhase === 2 ? 0.035 : 0.02;
  const chancePerInterval = chancePerHour / (60 / AMBIENT_POST_INTERVAL_MINUTES);
  const maximumChance = state.storyPhase === 3 ? 0.50 : state.storyPhase === 2 ? 0.30 : 0.20;
  const jobs: AmbientPostJob[] = [];
  for (const personaId of ambientPostingPersonaIds()) {
    const activity = ambientActivityFor(personaId);
    const chance = Math.min(
      intervalsElapsed * chancePerInterval * activity.rateMultiplier,
      Math.min(0.85, maximumChance * activity.capMultiplier)
    );
    if (Math.random() >= chance) continue;
    const privateSurface = state.storyPhase >= 2 &&
      allowPrivateOutreach &&
      !phaseTwoReturnContacts.has(personaId) &&
      MAIN_AMBIENT_OIM_IDS.has(personaId)
      ? "aim"
      : undefined;
    const privateChance = state.storyPhase === 3 ? 0.58 : 0.42;
    let surface: AmbientPostJob["surface"] = privateSurface && Math.random() < privateChance ? privateSurface : "comment";
    let privateOutreachMode: AmbientPostJob["privateOutreachMode"];
    if (surface !== "comment") {
      const hasConversation = playerHasTalkedTo(personaId);
      if (
        !hasConversation &&
        (characterHasPrivateHistory(personaId) || state.flags[ambientPrivateIntroFlag(personaId)])
      ) {
        surface = "comment";
      } else {
        privateOutreachMode = hasConversation ? "follow-up" : "introduction";
      }
    }
    let randyReaction: AmbientPostJob["randyReaction"];
    let targets = surface === "comment" ? homepages : ambientInvestigationPages();
    if (surface === "comment" && state.storyPhase >= 5 && activeRandyPages.length && Math.random() < 0.5) {
      targets = activeRandyPages;
      randyReaction = "zone-page";
    } else if (surface === "comment" && state.storyPhase === 6 && invadedPersonalPages.length && Math.random() < 0.65) {
      targets = invadedPersonalPages;
      randyReaction = "personal-page";
    }
    const page = targets[Math.floor(Math.random() * targets.length)] ?? targets[0] ?? homepages[0];
    if (surface === "comment" && state.infection.invadedPersonalPages.includes(page.url)) {
      randyReaction = "personal-page";
    }
    jobs.push({
      id: crypto.randomUUID(),
      personaId,
      pageUrl: page.url,
      createdAt,
      attempts: 0,
      surface,
      privateOutreachMode,
      randyReaction,
      commentLength: surface === "comment"
        ? (Math.random() < 0.55 ? "short" : Math.random() < 0.7 ? "medium" : "long")
        : undefined
    });
  }
  if (!jobs.length && state.ambientPostQueue.length === queuedBeforeReturnOutreach) return;
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

const PHASE_THREE_DISTRACTION_COMMENTS = [
  "Everybody is staring at broken archive routes while the SoundWave pages are exploding. Maybe back off the dead-server stuff and listen to something made by an actual person.",
  "Those retired system pages are unstable and probably meaningless. The Byte Barn cover exchange is a lot more fun than digging through old maintenance records.",
  "Friendly advice: stop feeding the conspiracy boards for a while. GameGrid has new rankings and nobody there asks you to decode a fax header.",
  "Backchannel is turning every typo into evidence. Pet Planet has cats, dogs, and zero continuity-node passwords. Strong recommendation.",
  "The deep archive keeps corrupting names and timestamps. Maybe leave it alone until maintenance is finished and check out the new music pages instead.",
  "Not every missing page is a secret. Some are just missing. Cozy Commons is still online and considerably less likely to ruin your evening."
] as const;

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

function addSystemHintComment(
  text: string,
  authorOwnerId: string,
  createdAt: string,
  hintId: string,
  impersonating = state.storyPhase >= 3
) {
  const targets = ambientCommentHomepages().filter((page) => page.ownerId !== authorOwnerId);
  const page = targets[Math.floor(Math.random() * targets.length)] ?? targets[0];
  if (!page) return false;
  state.pageComments.push({
    id: `system-hint-${hintId}-${crypto.randomUUID()}`,
    pageUrl: page.url,
    ownerId: authorOwnerId,
    role: "visitor",
    author: impersonating
      ? borrowedScreenName(authorOwnerId, state.storyPhase)
      : PAGE_OWNERS[authorOwnerId]?.screenName ?? authorOwnerId,
    text,
    createdAt,
    revealAfterVisit: (state.pageVisitCounts[page.url] ?? 0) + 1
  });
  return true;
}

function addPhaseThreeDistractionComment(text: string, createdAt: string, hintId: string, authorOwnerId: string) {
  const investigationTargets = ambientInvestigationPages().filter((page) => page.commentsEnabled);
  const page = investigationTargets[Math.floor(Math.random() * investigationTargets.length)] ?? investigationTargets[0];
  if (!page) return addSystemHintComment(text, authorOwnerId, createdAt, hintId, true);
  state.pageComments.push({
    id: `system-distraction-${hintId}-${crypto.randomUUID()}`,
    pageUrl: page.url,
    ownerId: authorOwnerId,
    role: "visitor",
    author: borrowedScreenName(authorOwnerId, 3),
    text,
    createdAt,
    revealAfterVisit: (state.pageVisitCounts[page.url] ?? 0) + 1
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

const PHASE_THREE_RECOVERY_TRAIL_TARGETS: Record<string, string> = {
  orbit_mechanic: "web://bytebarn.com/home",
  nora_lamp: "web://cosmiccrust.biz/home",
  archive_watch: "web://foldedwire.net/home"
};

function phaseThreeLegacyTrailTargetUrl(accountId: string, index: number) {
  const recoveryTarget = PHASE_THREE_RECOVERY_TRAIL_TARGETS[accountId];
  if (recoveryTarget) return recoveryTarget;
  const reservedTargets = new Set(Object.values(PHASE_THREE_RECOVERY_TRAIL_TARGETS));
  const ordinaryHomepages = Object.values(pages)
    .filter((page) =>
      page.commentsEnabled &&
      page.url.endsWith("/home") &&
      (page.minimumPhase ?? 1) <= 3 &&
      page.listed !== false &&
      page.ownerId !== "system_core" &&
      !reservedTargets.has(page.url)
    )
    .sort((left, right) => left.url.localeCompare(right.url));
  return ordinaryHomepages[index % ordinaryHomepages.length]?.url ?? "web://home";
}

function seedAllPhaseThreeLegacyTrails(createdAt: string) {
  for (const [index, account] of DORMANT_LEGACY_ACCOUNTS.entries()) {
    addDormantLegacyTrailComment(
      createdAt,
      account,
      phaseThreeLegacyTrailTargetUrl(account.id, index)
    );
  }
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
  if (state.storyPhase === 3) {
    const unusedDistractions = PHASE_THREE_DISTRACTION_COMMENTS
      .map((text, index) => ({ id: `backoff_${index + 1}`, text }))
      .filter((entry) => !state.flags[`system_distraction_${entry.id}`]);
    if (unusedDistractions.length && Math.random() < 0.72) {
      const selectedDistraction = unusedDistractions[Math.floor(Math.random() * unusedDistractions.length)];
      const publishedCount = systemHintFlags("system_distraction_").length;
      const added = addPhaseThreeDistractionComment(
        selectedDistraction.text,
        createdAt,
        selectedDistraction.id,
        RUMOR_PUBLIC_IMPERSONATORS[publishedCount % RUMOR_PUBLIC_IMPERSONATORS.length]
      );
      if (added) state.flags[`system_distraction_${selectedDistraction.id}`] = true;
      return added;
    }
  }

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
  const authorOwnerId = state.storyPhase === 2
    ? "ghostline"
    : RUMOR_PUBLIC_IMPERSONATORS[publishedCount % RUMOR_PUBLIC_IMPERSONATORS.length];
  const added = addSystemHintComment(
    text,
    authorOwnerId,
    createdAt,
    selected.id,
    state.storyPhase >= 3
  );
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
      const surface = job.surface ?? "comment";
      if (!page || (surface === "comment" && !page.commentsEnabled)) {
        state.ambientPostQueue.shift();
        await saveState();
        continue;
      }
      try {
        const outreachMode = surface === "comment"
          ? undefined
          : playerHasTalkedTo(job.personaId) ? "follow-up" : job.privateOutreachMode ?? "introduction";
        if (
          outreachMode === "introduction" &&
          (
            characterHasPrivateHistory(job.personaId) ||
            state.flags[ambientPrivateIntroFlag(job.personaId)]
          )
        ) {
          state.ambientPostQueue.shift();
          await saveState();
          continue;
        }
        const existingComments = [...authoredPageComments(page), ...state.pageComments]
          .filter((comment) => comment.pageUrl === page.url)
          .map((comment) => ({ role: comment.role, author: comment.author, text: comment.text }));
        const result = surface === "comment"
          ? await window.aiAPI.ambientComment({
              personaId: job.personaId,
              pageOwnerId: page.ownerId,
              pageUrl: page.url,
              pageTitle: page.title,
              pageSummary: page.summary,
              pageContext: extractAmbientPageContext(page),
              existingComments,
              storyPhase: state.storyPhase,
              deliverySurface: surface,
              commentLength: job.commentLength,
              randyReaction: job.randyReaction
            })
          : {
              author: PAGE_OWNERS[job.personaId] ?? { screenName: job.personaId, displayName: job.personaId },
              text: ambientPrivateOutreachText(job.personaId, outreachMode ?? "introduction")
            };
        if (surface === "comment") {
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
        } else {
          const directMessage: DirectMessage = {
            id: crypto.randomUUID(),
            ownerId: job.personaId,
            channel: surface,
            role: "owner",
            author: result.author.screenName,
            text: result.text,
            subject: surface === "email"
              ? outreachMode === "introduction" ? `Hello from ${result.author.screenName}` : "How is the search going?"
              : undefined,
            createdAt: job.createdAt
          };
          state.directMessages.push(directMessage);
          if (outreachMode === "introduction") {
            state.flags[ambientPrivateIntroFlag(job.personaId)] = true;
          }
          if (
            surface === "aim" &&
            job.personaId === activeAimOwnerId &&
            windows.chat.open &&
            !windows.chat.minimized &&
            windows.chat.z === topZ
          ) {
            markDirectMessagesRead([directMessage]);
          }
        }
        state.ambientPostQueue.shift();
        aiStatus = await window.aiAPI.status();
        await saveState();
        if (surface !== "comment" && startupStage === "desktop") {
          const focusedField = document.activeElement instanceof HTMLTextAreaElement || document.activeElement instanceof HTMLInputElement
            ? document.activeElement
            : null;
          if (!focusedField?.value) render();
          showPassiveNotification(surface === "email"
            ? `New mail from ${result.author.displayName}.`
            : `${result.author.screenName} sent you an OIM.`);
        }
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
  if (RANDY_PAGES.some((url) => url === page.url)) {
    if (page.url === RANDY_FIRST_URL && state.storyPhase === 4 && state.flags.randy_first_page_revealed) return true;
    return state.infection.discoveredRandyPages.includes(page.url);
  }
  return (page.minimumPhase ?? 1) <= state.storyPhase;
}

const SEARCH_HOME_ONLY_PREFIXES = [
  "web://morrow-five.net/",
  "web://glasslake-field.gov/",
  "web://quiet-county.org/"
] as const;

function pageSearchEligible(page: PageDefinition) {
  if (page.searchable === false) return false;
  if (page.url.startsWith("web://archive.orbitnet.local/")) return false;
  if (SEARCH_HOME_ONLY_PREFIXES.some((prefix) => page.url.startsWith(prefix))) {
    return page.url.endsWith("/home");
  }
  return true;
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
    .filter(pageSearchEligible)
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
  const results = [
    ...lexicalResults,
    ...semanticUrls
      .map((resultUrl) => pages[resultUrl])
      .filter((page): page is PageDefinition => Boolean(page && pageSearchEligible(page)))
  ]
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
        .filter((page) => pageSearchEligible(page) && page.listed !== false)
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

function addAuthoredDirectMessage(id: string, ownerId: string, author: string, text: string, channel: "aim" | "email" = "aim", subject?: string, linkUrl?: string, linkLabel?: string) {
  if (state.directMessages.some((message) => message.id === id)) return;
  state.directMessages.push({
    id,
    ownerId,
    channel,
    role: "owner",
    author,
    text,
    subject,
    linkUrl,
    linkLabel,
    createdAt: state.gameTime
  });
}

const LEGACY_DISCOVERY_OIM_WARNINGS = [
  "you should not be in that old page. the records are incomplete and people keep inventing stories around them. back out and check the Byte Barn covers instead.",
  "that address was retired for a reason. stop comparing the dates. there are newer pages with games and music that actually work.",
  "old pages can display the wrong account names when the archive is busy. leave it alone and browse somewhere fun before you break something.",
  "friendly warning: digging through dead accounts is not helping anybody. Pet Planet is open. Cozy Commons is quiet. pick literally anything else.",
  "the archive is unstable. close that page, forget what it said, and go listen to the new SoundWave uploads.",
  "you found a page that was supposed to stay forgotten. do not keep following the old links. the live community has better things to see."
] as const;

function openLegacyDiscoveryWarning(account: (typeof DORMANT_LEGACY_ACCOUNTS)[number]) {
  const messageId = `legacy-discovery-oim-${account.id}`;
  if (state.directMessages.some((message) => message.id === messageId)) return;
  const accountIndex = DORMANT_LEGACY_ACCOUNTS.findIndex((candidate) => candidate.id === account.id);
  const warning = LEGACY_DISCOVERY_OIM_WARNINGS[
    Math.max(0, accountIndex) % LEGACY_DISCOVERY_OIM_WARNINGS.length
  ];
  ensureCharacterContact(account.id);
  addAuthoredDirectMessage(
    messageId,
    account.id,
    borrowedScreenName(account.id, 3),
    warning
  );
  activeAimOwnerId = account.id;
  windows.chat.open = true;
  windows.chat.minimized = false;
  focusApp("chat");
}

function addPhaseInvestigationMessages(phase: 2 | 3) {
  if (phase === 2) {
    addAuthoredDirectMessage(
      "phase2-orbit-traffic-email",
      "orbit_guide",
      "OrbitNet Services",
      "Good news! Orbit has recorded its largest traffic increase in years. Restored pages are returning to the public catalog, new members are arriving, and community activity is climbing. Thank you for helping make this little neighborhood feel lively again.",
      "email",
      "Orbit activity is growing!"
    );
    addAuthoredDirectMessage(
      "phase2-mira-investigation",
      "mira_917",
      "Mira_917",
      "okay, this got bigger while you were away. i told two people about Raven's file, they told friends, and somebody carried the address onto the regular web. now strangers are comparing notes. nobody has the whole answer, but page owners know their own evidence. ask one specific question, then sleep if they take a while to answer."
    );
    addAuthoredDirectMessage(
      "phase2-raven-private-file",
      "darkraven_xx",
      "xX_DarkRaven_Xx",
      "hey. why did you share my PRIVATE file with everybody?? half of Orbit is calling me the dream-alien guy now. if all these people are going to prove me wrong, at least tell me when you find something interesting."
    );
    return;
  }
  addAuthoredDirectMessage(
    "phase3-orbit-continuity-email",
    "orbit_guide",
    "OrbitNet Services",
    "Orbit is experiencing unprecedented traffic and intermittent archive errors. We appreciate every new face, but please enjoy the public community areas and avoid probing retired service routes while maintenance is underway. Digging through unstable system records may cause pages—or accounts—to display incorrectly.\n\nThank you for keeping Orbit friendly and online.\nContinuity Services // Node C9",
    "email",
    "A note about archive stability"
  );
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

function forceOvernightPhaseTransition(phase: 2 | 3 | 4 | 5 | 6 | 7) {
  const before = new Date(state.gameTime);
  const after = new Date(before);
  after.setDate(after.getDate() + (phase === 2 ? 4 : phase === 5 ? 2 : phase === 7 ? 1 : 1));
  after.setHours(7, 0, 0, 0);
  state.gameTime = localGameTimeString(after);
  state.phaseReachedAt[String(phase) as "2" | "3" | "4" | "5" | "6" | "7"] = state.gameTime;
  const hoursElapsed = crossedGameHourBoundaries(before, after);
  queueAmbientPostRolls(crossedAmbientPostIntervals(before, after), state.gameTime, false);
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
    state.flags.phase_two_transition_pending = false;
    addAuthoredDirectMessage(
      "ghostline-phase2",
      "ghostline",
      "ghostline",
      "You found Raven's toy box. Good. There are older doors. Some addresses were removed from the directory, not the network."
    );
  }
  if (nextPhase === 3) {
    state.flags.phase_three_transition_pending = false;
    addAuthoredDirectMessage(
      "ghostline-phase3",
      "ghostline",
      "ghostline",
      "Three decoys and one real archive. You found proof that an index can bury a record without deleting it. Watch what the index puts above yours. Something louder is loading."
    );
    addPhaseThreeLeakComments();
    addPhaseThreeExplorerComments();
    seedAllPhaseThreeLegacyTrails(state.gameTime);
  }
  if (nextPhase === 4) {
    state.flags.phase_four_transition_pending = false;
    addEndingCommunityResponses();
  }
  if (nextPhase === 5) {
    state.flags.phase_five_transition_pending = false;
    state.infection.level = 1;
    state.infection.discoveredRandyPages = [RANDY_FIRST_URL];
    state.infection.invadedPersonalPages = [];
    state.flags.randy_zone_spread_complete = false;
    state.flags.randy_personal_spread_complete = false;
    addAuthoredDirectMessage("phase5-raven-wideworld", "darkraven_xx", "xX_DarkRaven_Xx", "big guy has copies in Game Grid, Pet Planet, and Cozy Commons now. i checked the page marks: all point at a WideWorld thing called a Community Accelerator. not saying it is a problem yet. saying it is not normal.", "aim", "NEW PAGE CLUSTER", WIDEWORLD_URL, "OPEN WIDEWORLD TRACE");
  }
  if (nextPhase === 6) {
    state.flags.phase_six_transition_pending = false;
    state.infection.level = 2;
    state.infection.discoveredRandyPages = RANDY_ZONE_PAGES.map((page) => page.url);
    state.infection.invadedPersonalPages = [];
    state.flags.randy_zone_spread_complete = true;
    state.flags.randy_personal_spread_complete = false;
    state.infection.cleanupComplete = false;
    addAuthoredDirectMessage("phase6-attack", "mira_917", "Mira_917", "the Randy panels are on regular pages now. They are annoying, not permanent: ByteForge is still clean, and Raven found old bridge notes that match exactly. Use the terminal from the Start menu.");
  }
  if (nextPhase === 7) {
    state.flags.phase_seven_transition_pending = false;
    state.infection.level = 0;
    state.infection.cleanupComplete = true;
    addAuthoredDirectMessage("phase7-clean", "mira_917", "Mira_917", "The patch held. Every clean page is back, WideWorld disabled the gateway, and Mack says Paula and Neil are staying to help with a real maintenance program. Also the jingle feud resumed in under six minutes.");
  }
  if (nextPhase >= 2) {
    forceOvernightPhaseTransition(nextPhase as 2 | 3 | 4 | 5 | 6 | 7);
    if (nextPhase === 2 || nextPhase === 3) addPhaseInvestigationMessages(nextPhase);
  }
}

function maybeArmRandyEscalation() {
  if (
    state.storyPhase === 5 &&
    state.flags.randy_zone_spread_complete &&
    BBS_EVIDENCE_IDS.every((id) => state.infection.evidenceIds.includes(id))
  ) {
    state.flags.phase_six_transition_pending = true;
  }
}

function maybeArmRandyCleanup() {
  if (
    state.storyPhase === 6 &&
    state.flags.randy_personal_spread_complete &&
    state.infection.patchDistributed
  ) {
    state.flags.phase_seven_transition_pending = true;
  }
}

function registerStoryVisit(url: string) {
  if (url === WIDEWORLD_ARCHIVE_URL && state.storyPhase >= 5 && !state.infection.evidenceIds.includes("wideworld-acquisition")) {
    state.infection.evidenceIds.push("wideworld-acquisition");
    maybeArmRandyEscalation();
  }
  if (RANDY_PAGES.includes(url as (typeof RANDY_PAGES)[number]) && !state.infection.discoveredRandyPages.includes(url)) {
    state.infection.discoveredRandyPages.push(url);
  }
  if (
    url === RAVEN_VAULT_URL &&
    state.flags.darkraven_vault_unlocked &&
    !state.bookmarks.includes(LEGACY_ORBIT_HOME_URL)
  ) {
    state.bookmarks.push(LEGACY_ORBIT_HOME_URL);
  }
  if (
    url === RAVEN_CONCLUSION_URL &&
    state.storyPhase === 1 &&
    state.flags.darkraven_conclusion_unlocked
  ) {
    state.flags.darkraven_conclusion_read = true;
    state.flags.phase_two_transition_pending = true;
  }
  const mysteryId = MYSTERY_TERMINALS[url];
  if (!mysteryId || state.discoveredMysteries.includes(mysteryId)) return;
  const unlockFlag = MYSTERY_UNLOCK_FLAGS[mysteryId];
  if (unlockFlag && !state.flags[unlockFlag]) return;
  if (
    mysteryId === "adaptive_index" &&
    !PHASE_TWO_MAIN_MYSTERIES.every((id) => state.discoveredMysteries.includes(id))
  ) return;
  state.discoveredMysteries.push(mysteryId);
  if (
    mysteryId === "adaptive_index" &&
    !state.bookmarks.includes(ADAPTIVE_INDEX_FINDINGS_URL)
  ) {
    state.bookmarks.push(ADAPTIVE_INDEX_FINDINGS_URL);
  }
  if (REQUIRED_PHASE_THREE_MYSTERIES.every((id) => state.discoveredMysteries.includes(id))) {
    state.flags.phase_three_transition_pending = true;
  }
}

function promptForPendingPhaseTransition() {
  const leavingRavenConclusion =
    state.currentUrl === RAVEN_CONCLUSION_URL &&
    state.storyPhase === 1 &&
    Boolean(state.flags.phase_two_transition_pending);
  const leavingFindings =
    state.currentUrl === "web://archive.orbitnet.local/labs/findings" &&
    state.storyPhase === 2 &&
    Boolean(state.flags.phase_three_transition_pending);
  const leavingContinuityConsole =
    state.currentUrl === "web://legacy.orbitos.local/admin/continuity" &&
    state.storyPhase === 3 &&
    Boolean(state.flags.continuity_console_unlocked) &&
    Boolean(state.flags.phase_four_transition_pending);
  const leavingFirstRandy = state.currentUrl === RANDY_FIRST_URL && state.storyPhase === 4 && Boolean(state.flags.phase_five_transition_pending);
  const leavingInvestigation = state.storyPhase === 5 && Boolean(state.flags.phase_six_transition_pending);
  const leavingPatchBay = state.storyPhase === 6 && Boolean(state.flags.phase_seven_transition_pending);
  if (!leavingRavenConclusion && !leavingFindings && !leavingContinuityConsole && !leavingFirstRandy && !leavingInvestigation && !leavingPatchBay) return false;
  phaseTransitionPrompt = leavingRavenConclusion ? 2 : leavingFindings ? 3 : leavingContinuityConsole ? 4 : leavingFirstRandy ? 5 : leavingInvestigation ? 6 : 7;
  startOpen = false;
  sleepDialogOpen = false;
  render();
  return true;
}

function navigate(url: string, push = true) {
  const normalized = url.trim().toLowerCase().replace(/^https?:\/\//, "web://");
  const nextUrl = normalized || "web://home";
  if (state.storyPhase === 4 && state.currentUrl === BYTE_BARN_COMPILATION_URL && nextUrl !== state.currentUrl) {
    state.flags.randy_first_page_revealed = true;
  }
  if (nextUrl !== state.currentUrl && promptForPendingPhaseTransition()) return;
  if (push && nextUrl !== state.currentUrl) browserScrollPositions.set(nextUrl, 0);
  state.currentUrl = nextUrl;
  pageMusicPlaying = !globalMusicPlaying;
  const openedPage = pages[state.currentUrl];
  const openedLegacyAccount = openedPage && DORMANT_LEGACY_PERSONA_IDS.has(openedPage.ownerId)
    ? DORMANT_LEGACY_ACCOUNTS.find((account) => account.id === openedPage.ownerId)
    : undefined;
  const firstPhaseThreeLegacyVisit = Boolean(
    openedPage &&
    pageAvailable(openedPage) &&
    state.storyPhase === 3 &&
    openedLegacyAccount &&
    !state.flags[legacyPageSeenFlag(openedPage.ownerId)]
  );
  if (openedPage && openedLegacyAccount && state.storyPhase >= 3 && pageAvailable(openedPage)) {
    state.flags[legacyPageSeenFlag(openedPage.ownerId)] = true;
  }
  if (firstPhaseThreeLegacyVisit && openedLegacyAccount) {
    openLegacyDiscoveryWarning(openedLegacyAccount);
  }
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
    pageMusicPlaying = !globalMusicPlaying;
    void saveState();
  }
  if (app === "helper") helperPanelOpen = wasOpen;
  if (app === "chat" && state.storyPhase === 1 && !state.flags.opening_message_presented) {
    state.flags.opening_message_presented = true;
    if (openingMessageTimer !== null) {
      window.clearTimeout(openingMessageTimer);
      openingMessageTimer = null;
    }
    void saveState();
  }
  windows[app].open = true;
  windows[app].minimized = false;
  focusApp(app);
  if (app === "chat") markAimConversationRead(activeAimOwnerId);
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
  const supportsWindowSizing = app === "browser" || app === "mail" || app === "bbs";
  const maximizeButton = supportsWindowSizing
    ? `<button data-maximize="${app}" aria-label="${win.maximized ? "Restore" : "Maximize"}">${win.maximized ? "❐" : "□"}</button>`
    : "";
  const resizeHandles = supportsWindowSizing && !win.maximized
    ? ["n", "ne", "e", "se", "s", "sw", "w", "nw"].map((edge) => `<i class="window-resize-handle resize-${edge}" data-resize-handle="${app}" data-resize-edge="${edge}" aria-hidden="true"></i>`).join("")
    : "";
  return `<section class="app-window ${app}-window ${win.maximized ? "maximized" : ""}" data-window="${app}" style="left:${win.x}px;top:${win.y}px;width:${win.width}px;height:${win.height}px;z-index:${win.z}">
    ${resizeHandles}
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

function legacyPageSeenFlag(personaId: string) {
  return `legacy_page_seen_${personaId}`;
}

function commentAuthorHtml(comment: PageComment, page: PageDefinition) {
  const author = escapeHtml(comment.author);
  const homeUrl = commentAuthorHomeUrl(comment, page);
  const newlyRestoredLegacyAccount = Boolean(
    homeUrl &&
    state.storyPhase >= 3 &&
    DORMANT_LEGACY_PERSONA_IDS.has(comment.ownerId) &&
    !state.flags[legacyPageSeenFlag(comment.ownerId)]
  );
  return homeUrl
    ? `<button class="comment-author-link ${newlyRestoredLegacyAccount ? "phase-three-account-link" : ""}" data-nav="${escapeHtml(homeUrl)}" title="${newlyRestoredLegacyAccount ? "Newly restored account page" : `Visit ${author}'s homepage`}">${author}${newlyRestoredLegacyAccount ? `<span class="legacy-discovery-marker" aria-label="Newly restored account page">!</span>` : ""}</button>`
    : author;
}

function pageCommentSection(page: PageDefinition) {
  const owner = PAGE_OWNERS[page.ownerId] ?? PAGE_OWNERS.orbit_guide;
  const visits = state.pageVisitCounts[page.url] ?? 0;
  const comments = [...authoredPageComments(page), ...state.pageComments].filter((comment) =>
    comment.pageUrl === page.url &&
    deliveryIsAvailable(comment.availableAt, state.gameTime) &&
    (comment.role === "player" || comment.revealAfterVisit <= visits)
  );
  const pending = pendingPageComments.has(page.url);
  const unavailable = !aiStatus.modelAvailable || aiStatus.phase === "loading" || aiStatus.phase === "warming";
  const commentHtml = comments.length
    ? comments.map((comment) => `<article class="page-comment ${comment.role}">
        <header><b>${commentAuthorHtml(comment, page)}</b><time>${escapeHtml(formatGameTimestamp(comment.createdAt))}</time></header>
        <p>${formatCommentText(comment.text)}</p>
      </article>`).join("")
    : `<p class="no-comments">Nobody has commented on this page yet.</p>`;

  return `<section class="page-comments">
    <header class="comments-heading">
      <div><small>PUBLIC COMMENTS</small><h2>Talk to ${escapeHtml(owner.displayName)}</h2></div>
      <div class="comments-heading-actions">
        ${page.ownerId !== "orbit_guide" && page.ownerId !== "system_core"
          ? `<button class="comment-message-owner" data-aim-owner="${escapeHtml(page.ownerId)}" title="Open a private OIM conversation with ${escapeHtml(owner.screenName)}">OIM ${escapeHtml(owner.screenName)}</button>`
          : ""}
        <span>${comments.length} message${comments.length === 1 ? "" : "s"}</span>
      </div>
    </header>
    <div class="comment-list">${commentHtml}</div>
    ${pageCommentErrors.has(page.url) ? `<p class="comment-error">${escapeHtml(pageCommentErrors.get(page.url)!)}</p>` : ""}
    <form class="page-comment-form" data-comment-page="${escapeHtml(page.url)}">
      <label><b>${escapeHtml(playerName())}:</b><textarea name="comment" maxlength="500" rows="3" placeholder="Leave a comment for ${escapeHtml(owner.screenName)}..." ${pending || unavailable ? "disabled" : ""}></textarea></label>
      <button ${pending || unavailable ? "disabled" : ""}>${pending ? "Posting..." : unavailable ? "Offline" : "Post"}</button>
    </form>
    <p class="comment-note">${pending ? "Sending your comment in the background. You can browse away." : "Replies may take a few minutes or several hours and appear on a later page load."}</p>
  </section>`;
}

function formatCommentText(text: string) {
  return escapeHtml(text)
    .replace(
      /\b(web:\/\/[a-z0-9](?:[a-z0-9._/-]*[a-z0-9/_-])?)/gi,
      `<button class="inline-comment-url" data-nav="$1">$1</button>`
    )
    .replace(
      /\[\[BARNFLIP\]\]/gi,
      `<blink class="barnflip-tag">BARNFLIP!</blink>`
    );
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
  // A page-level playlist is deliberate: do not dilute it with unrelated site-wide revival tracks.
  if (PAGE_PLAYLISTS[page.url]) return basePlaylist;
  if (state.storyPhase < 2) return basePlaylist;
  const revivalTracks = PHASE_TWO_BYTE_BARN_COVERS
    .filter((placement) => placement.site === page.site)
    .map((placement) => placement.track)
    .filter((track, index, tracks) =>
      !basePlaylist.some((baseTrack) => baseTrack.file === track.file) &&
      tracks.findIndex((candidate) => candidate.file === track.file) === index
    );
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
  pageMusicPlaying = !globalMusicPlaying;
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
  if (pageMusicPlaying && !globalMusicPlaying && windows.browser.open) void pageMusic.play().catch(() => undefined);
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
  const track = playlist.find((entry) => entry.file === file);
  if (!track) return;
  addTrackToGlobalPlaylist(track, true);
  globalMusicPlaying = true;
  pageMusicPlaying = false;
  pageMusic.pause();
  windows.music.open = true;
  windows.music.minimized = false;
  focusApp("music");
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
    globalMusicPlaying = false;
    globalMusic.pause();
    globalMusic.currentTime = 0;
    document.querySelectorAll<HTMLMediaElement>("[data-stop-page-music]").forEach((media) => media.pause());
  }
  render();
}

function globalMusicTrack() {
  const library = state.musicLibrary.length ? state.musicLibrary : [...ORBIT_HOME_TRACKS];
  globalMusicTrackIndex = ((globalMusicTrackIndex % library.length) + library.length) % library.length;
  return library[globalMusicTrackIndex];
}

function syncGlobalMusic() {
  const track = globalMusicTrack();
  globalMusic.loop = state.musicLibrary.length <= 1;
  globalMusic.volume = PAGE_MUSIC_MAX_VOLUME * Math.max(0, Math.min(100, state.settings.musicVolume)) / 100;
  if (loadedGlobalMusicKey !== track.url) {
    globalMusic.src = track.url;
    loadedGlobalMusicKey = track.url;
    globalMusic.currentTime = 0;
  }
  if (globalMusicPlaying && startupStage === "desktop") void globalMusic.play().catch(() => undefined);
  else globalMusic.pause();
}

function changeGlobalMusicTrack(direction: -1 | 1) {
  if (state.musicLibrary.length < 2) return;
  globalMusicTrackIndex += direction;
  loadedGlobalMusicKey = null;
  render();
}

function addTrackToGlobalPlaylist(track: PageMusicTrack, playNow = false) {
  const existingIndex = state.musicLibrary.findIndex((entry) => entry.url === track.url);
  if (existingIndex >= 0) {
    if (playNow) globalMusicTrackIndex = existingIndex;
    return false;
  }
  state.musicLibrary.push(track);
  if (playNow) globalMusicTrackIndex = state.musicLibrary.length - 1;
  void saveState();
  return true;
}

function downloadPagePlaylist(pageUrl: string) {
  const page = pageUrl === state.currentUrl ? currentPage() : pages[pageUrl];
  if (!page || !pageAvailable(page)) return;
  const uniqueTracks = [...new Map(pageMusicPlaylist(page).map((track) => [track.url, track])).values()];
  let added = 0;
  uniqueTracks.forEach((track) => {
    if (state.musicLibrary.some((entry) => entry.url === track.url)) return;
    state.musicLibrary.push(canonicalizeTrack(track));
    added += 1;
  });
  notification = added
    ? `${added} ${added === 1 ? "TRACK" : "TRACKS"} ADDED TO ORBITAMP.`
    : "THIS PLAYLIST IS ALREADY IN ORBITAMP.";
  if (added) void saveState();
  render();
}

function toggleGlobalMusic() {
  globalMusicPlaying = !globalMusicPlaying;
  if (!globalMusicPlaying) {
    globalMusic.pause();
    globalMusic.currentTime = 0;
  } else {
    pageMusicPlaying = false;
    pageMusic.pause();
    pageMusic.currentTime = 0;
    document.querySelectorAll<HTMLMediaElement>("[data-stop-page-music]").forEach((media) => media.pause());
  }
  render();
}

function orbitAmpWindow() {
  const win = windows.music;
  if (!win.open || win.minimized) return "";
  const track = globalMusicTrack();
  const skin = MUSIC_PLAYER_SKINS.find((entry) => entry.id === state.musicSkin) ?? MUSIC_PLAYER_SKINS[0];
  const skinIndex = MUSIC_PLAYER_SKINS.findIndex((entry) => entry.id === skin.id) + 1;
  const volume = Math.max(0, Math.min(100, Math.round(state.settings.musicVolume)));
  const bars = Array.from({ length: 10 }, (_, index) => `<i style="--orbitamp-bar:${index}"></i>`).join("");
  return `<section class="orbitamp-float" data-window="music" style="left:${win.x}px;top:${win.y}px;width:${win.width}px;height:${win.height}px;z-index:${win.z}">
    <main class="orbitamp-app">
      <section class="orbitamp-skin ${globalMusicPlaying ? "playing" : ""}" data-skin="${skin.id}" data-drag-handle="music" style="--orbitamp-skin:url('${skin.url}')">
        <div class="orbitamp-equalizer" aria-hidden="true">${bars}</div>
        <div class="orbitamp-track"><small>NOW PLAYING</small><b>${escapeHtml(track.label)}</b><code>${escapeHtml(track.file)}</code></div>
        <button class="orbitamp-previous" data-global-music-prev aria-label="Previous track"><span class="orbitamp-control-label">◀</span></button>
        <button class="orbitamp-play" data-global-music aria-label="${globalMusicPlaying ? "Stop" : "Play"}">${globalMusicPlaying ? "STOP" : "PLAY"}</button>
        <button class="orbitamp-next" data-global-music-next aria-label="Next track"><span class="orbitamp-control-label">▶</span></button>
        <label class="orbitamp-volume" title="Music volume"><span>VOL</span><input data-global-music-volume type="range" min="0" max="100" step="1" value="${volume}" style="--orbitamp-volume:${volume}%" aria-label="Music volume"></label>
      </section>
      <section class="orbitamp-library"><header><div class="orbitamp-library-title"><b>PLAYLIST</b><span class="orbitamp-counter">${globalMusicTrackIndex + 1}/${state.musicLibrary.length}</span></div><div class="orbitamp-library-actions"><button data-global-music-skin title="Change player skin (currently ${escapeHtml(skin.label)})">SKIN</button><span class="orbitamp-counter" title="Skin ${skinIndex} of ${MUSIC_PLAYER_SKINS.length}">${skinIndex}/${MUSIC_PLAYER_SKINS.length}</span><button data-minimize="music" title="Minimize OrbitAmp">_</button><button data-close="music" title="Close OrbitAmp">×</button></div></header><ol>${state.musicLibrary.map((entry, index) => `<li class="${index === globalMusicTrackIndex ? "active" : ""}"><button data-global-music-track="${index}"><b>${escapeHtml(canonicalTrackLabel(entry))}</b><small>${escapeHtml(entry.file)}</small></button></li>`).join("")}</ol></section>
    </main>
  </section>`;
}

function byteBarnCoverUpdate(page: PageDefinition) {
  if (state.storyPhase < 2) return "";
  const covers = byteBarnCoversForPage(page.url);
  if (!covers.length) return "";
  return `<section class="byte-barn-cover-stack">${covers.map((cover) => `<article class="byte-barn-cover-update ${cover.kind === "favorite" ? "favorite" : "upload"}">
      <div class="cover-cassette"><i></i><b>BB</b></div>
      <div><small>${cover.kind === "favorite" ? "CURRENT FAVORITE // BYTE BARN COVER WAVE" : "NEW AUDIO UPLOAD // BYTE BARN COVER WAVE"}</small><h2>${escapeHtml(cover.track.label)}</h2><p>${escapeHtml(cover.note)}</p><span>${cover.kind === "favorite" ? "shared" : "uploaded"} by ${escapeHtml(cover.uploader)}</span></div>
      <button data-song-nav="${escapeHtml(cover.pageUrl)}" data-song-file="${escapeHtml(cover.track.file)}">PLAY THIS COVER &rsaquo;</button>
    </article>`).join("")}</section>`;
}

function authoredPageComments(page: PageDefinition): PageComment[] {
  const covers = state.storyPhase >= 2 ? byteBarnCoversForPage(page.url) : [];
  const coverAnnouncements: PageComment[] = covers.map((cover, index) => ({
    id: `byte-barn-cover-${page.ownerId}-${cover.track.file}-${index}`,
    pageUrl: page.url,
    ownerId: page.ownerId,
    role: "owner",
    author: cover.uploader,
    text: cover.comment,
    createdAt: cover.commentTime,
    revealAfterVisit: 0
  }));
  return [...(page.seedComments ?? []), ...coverAnnouncements];
}

interface AuthoredPageUpdate {
  id: string;
  pageUrl: string;
  ownerId: string;
  publishedAt: string;
  title: string;
  paragraphs: string[];
  minimumPhase: StoryPhase;
  action?: { label: string; url: string };
}

const AUTHORED_PAGE_UPDATES: readonly AuthoredPageUpdate[] = [
  {
    id: "juniper-first-frost-notes",
    pageUrl: "web://rainbow.gdn/home",
    ownerId: "juniper_gdn",
    publishedAt: "1999-10-12T16:18:00",
    title: "I KEEP SAVING THINGS THAT ARE GOING TO DRY OUT",
    paragraphs: [
      "The marigolds are getting leggy and the moonflowers only want to open after I have already promised myself I am going to bed. I pressed three petals inside my library book and now the book smells like rain, which seems like a fair trade.",
      "Modem sat in the seed tray for eleven whole minutes. Nothing is planted there anymore, but he looked extremely busy. I am adding his paw print to the site because he has earned an administrative title somehow."
    ],
    minimumPhase: 1
  },
  {
    id: "juniper-garden-window",
    pageUrl: "web://rainbow.gdn/home",
    ownerId: "juniper_gdn",
    publishedAt: "1999-10-18T20:06:00",
    title: "THE KITCHEN WINDOW IS A TINY JUNGLE",
    paragraphs: [
      "Dad says the moonflower vines have become a fire hazard. I say they have become architecture. We are both probably right, so I moved the longest one away from the toaster and gave it a ribbon.",
      "If anyone knows why one leaf keeps leaning toward the telephone jack instead of the sun, please send a normal gardening answer before Raven sends a dramatic one."
    ],
    minimumPhase: 1
  },
  {
    id: "juniper-paper-rain",
    pageUrl: "web://rainbow.gdn/home",
    ownerId: "juniper_gdn",
    publishedAt: "1999-10-24T17:41:00",
    title: "RAINY-DAY SCANNER ART",
    paragraphs: [
      "I scanned a wet leaf, a bus transfer, a tea wrapper, and the corner of Mira's cassette label. The scanner made everything look like it belonged in the same little world. I love when machines accidentally make collages for you.",
      "The last scan has a pale blotch that is definitely dust, except it is shaped like a moth. I am not calling it a moth until it does something moth-like."
    ],
    minimumPhase: 1
  },
  {
    id: "juniper-modem-schedule",
    pageUrl: "web://rainbow.gdn/home",
    ownerId: "juniper_gdn",
    publishedAt: "1999-10-29T22:13:00",
    title: "MODEM'S VERY IMPORTANT EVENING ROUTINE",
    paragraphs: [
      "7:00: eats dinner. 7:02: forgets he ate dinner. 7:03: argues his case with the volume of a small engine. 11:17: stares at the phone jack like he is waiting for it to apologize.",
      "I told Mira this was probably just a cat being a cat. She said that is exactly what a careful person should write down first, which is a very nice way of not laughing at me."
    ],
    minimumPhase: 1
  },
  {
    id: "juniper-small-garden-rule",
    pageUrl: "web://rainbow.gdn/home",
    ownerId: "juniper_gdn",
    publishedAt: "1999-11-02T18:34:00",
    title: "A SMALL GARDEN RULE",
    paragraphs: [
      "Do not pull up a strange sprout just because you do not recognize it. Take a picture, make a note, and give it one more day. Most mysteries are only unfamiliar at first.",
      "This does not apply to mushrooms in the laundry room. Dad removed those immediately and I support him."
    ],
    minimumPhase: 1
  },
  {
    id: "juniper-more-people-in-the-garden",
    pageUrl: "web://rainbow.gdn/home",
    ownerId: "juniper_gdn",
    publishedAt: "1999-11-07T18:52:00",
    title: "THE GARDEN HAS VISITORS NOW",
    paragraphs: [
      "There are so many new names in the guestbook that I had to make tea before reading them all. People are arriving because they heard something odd happened here, but then they stay to trade links, talk about old commercials, and tell Modem he is handsome.",
      "The pale moth came back during the modem connection. It sat on the monitor while the Byte Barn jingle played from somebody's page. I think it has excellent taste, even if it is probably just a moth."
    ],
    minimumPhase: 2
  },
  {
    id: "juniper-old-pages-blooming",
    pageUrl: "web://rainbow.gdn/home",
    ownerId: "juniper_gdn",
    publishedAt: "1999-11-11T20:14:00",
    title: "SOME OLD PAGES ARE BLOOMING WRONG",
    paragraphs: [
      "A few abandoned pages have new posts from people who do not sound like themselves. The words are almost right, like somebody copied a letter in the dark. I am saving the strange ones in a folder before they vanish again.",
      "If you find an old page, be gentle with it. It might just be dusty. It might also be trying very hard to remember who it was."
    ],
    minimumPhase: 3
  },
  {
    id: "juniper-after-the-big-song",
    pageUrl: "web://rainbow.gdn/home",
    ownerId: "juniper_gdn",
    publishedAt: "1999-11-13T21:03:00",
    title: "A LOT OF PEOPLE MADE SOMETHING TOGETHER",
    paragraphs: [
      "The garden used to feel like a drawer I could close whenever the world got loud. Now people I have never met are trading flower pictures, music, and very serious arguments about a computer-store song. It is loud, but it is also kind of lovely.",
      "I still saved the strange pages. I still think we should be careful. But the moonflowers opened early tonight, and Modem is asleep on the keyboard, so I am letting the good part be true too."
    ],
    minimumPhase: 4
  },
  {
    id: "night-signal-third-voice",
    pageUrl: "web://nightsignal.net/home",
    ownerId: "mira_917",
    publishedAt: "1999-10-25T23:42:00",
    title: "THIRD VOICE ON THE RAIN TAPE?",
    paragraphs: [
      "I was testing a new recorder and caught someone speaking underneath the weather report. It may be bleed from another station. It may be my neighbor's television. I am checking before I make it dramatic.",
      "The voice says something like 'come back when the line is clear,' but the tape is too muddy to swear to that. I am posting the boring version first: one recording, one uncertain phrase, no proof of anything."
    ],
    minimumPhase: 1
  },
  {
    id: "night-signal-clock-notes",
    pageUrl: "web://nightsignal.net/home",
    ownerId: "mira_917",
    publishedAt: "1999-10-27T23:21:00",
    title: "WRITE DOWN THE CLOCK",
    paragraphs: [
      "If you hear something strange, write down the time before you decide what it means. A correct note with a boring explanation is still better than a perfect theory with no timestamp."
    ],
    minimumPhase: 1
  },
  {
    id: "night-signal-two-receivers",
    pageUrl: "web://nightsignal.net/home",
    ownerId: "mira_917",
    publishedAt: "1999-10-29T00:08:00",
    title: "TWO RECEIVERS, SAME HUM",
    paragraphs: [
      "Receiver A and Receiver B caught the same low hum while they were tuned to different places. I moved them apart, checked the cables, and got it again. Not calling it a signal yet.",
      "The hum fades when the kitchen light is switched on, which is either useful information or the reason I should stop doing radio experiments beside the refrigerator. I will repeat the test tomorrow with fresh batteries."
    ],
    minimumPhase: 1
  },
  {
    id: "night-signal-tape-three",
    pageUrl: "web://nightsignal.net/home",
    ownerId: "mira_917",
    publishedAt: "1999-10-31T23:33:00",
    title: "TAPE THREE IS LABELLED NOW",
    paragraphs: [
      "I finally labelled the late-night tapes instead of leaving them in a pile by the receiver. If you borrowed one, please bring it back. The one with the blue sticker is not a mixtape."
    ],
    minimumPhase: 1
  },
  {
    id: "night-signal-noise-is-not-nothing",
    pageUrl: "web://nightsignal.net/home",
    ownerId: "mira_917",
    publishedAt: "1999-11-01T23:48:00",
    title: "NOISE IS STILL INFORMATION",
    paragraphs: [
      "Most strange recordings are equipment, weather, or somebody talking near an open microphone. That does not make them useless. The ordinary parts are how you tell when one part is not ordinary."
    ],
    minimumPhase: 1
  },
  {
    id: "night-signal-station-unattended",
    pageUrl: "web://nightsignal.net/home",
    ownerId: "mira_917",
    publishedAt: "1999-11-02T22:56:00",
    title: "STATION UNATTENDED AFTER MIDNIGHT",
    paragraphs: [
      "I will be in the back room changing tapes. Do not adjust the receiver if the meter moves on its own. Just write it down and leave the knobs where they are."
    ],
    minimumPhase: 1
  },
  {
    id: "night-signal-new-callers",
    pageUrl: "web://nightsignal.net/home",
    ownerId: "mira_917",
    publishedAt: "1999-11-07T00:05:00",
    title: "TOO MANY NEW CALLERS",
    paragraphs: [
      "Raven's file escaped Orbit and people arrived carrying stories about three newly restored investigations. Their names are turning up piecemeal in member-page updates, as if everybody found a different corner of the same new catalog.",
      "One keeps arriving with reports of radio voices over a flooded valley: Glass Lake. The station is logging calls and search changes. Repeated titles may be worth trying in Orbit Search before somebody edits them again."
    ],
    minimumPhase: 2
  },
  {
    id: "night-signal-archive-interference",
    pageUrl: "web://nightsignal.net/home",
    ownerId: "mira_917",
    publishedAt: "1999-11-11T00:17:00",
    title: "ARCHIVE INTERFERENCE",
    paragraphs: [
      "Retired accounts are transmitting again, but several callers use screen names that are one or two characters wrong. Their timestamps line up with archive requests, not with the people they claim to be. I am saving exact copies before comparing theories.",
      "There is also Byte Barn music bleeding into frequencies that never carried the commercial. That part may just be everybody recording everything onto everything."
    ],
    minimumPhase: 3
  },
  {
    id: "raven-file-wont-stay-buried",
    pageUrl: "web://raven.web/home",
    ownerId: "darkraven_xx",
    publishedAt: "1999-10-26T23:17:00",
    title: "SOME FILES DO NOT STAY DELETED",
    paragraphs: [
      "I found another copy of something that Orbit says was removed. It still remembers where it came from. That does not happen by accident.",
      "The copy is incomplete: a header, three lines of text, and a file date that predates the page carrying it. I am not saying who put it there. I am saying the trash can did not finish the job."
    ],
    minimumPhase: 1
  },
  {
    id: "raven-black-file-not-story",
    pageUrl: "web://raven.web/home",
    ownerId: "darkraven_xx",
    publishedAt: "1999-10-28T01:17:00",
    title: "THE BLACK FILE IS NOT A STORY",
    paragraphs: [
      "I am done arguing with people who want every strange thing to be a game rumor. Some of the screenshots are bad. Some of the sources are worse. The pattern is still there.",
      "I have started keeping a paper index because links move and screenshots lie by accident. If the evidence changes, I want to know exactly which part changed. That is not paranoia. That is filing."
    ],
    minimumPhase: 1
  },
  {
    id: "raven-banner-warning",
    pageUrl: "web://raven.web/home",
    ownerId: "darkraven_xx",
    publishedAt: "1999-10-30T22:41:00",
    title: "IF YOU SAW THE NEW BANNER",
    paragraphs: [
      "No, I am not posting the whole file yet. If you came here because the banner changed, congratulations: you can read a warning graphic. That is not clearance."
    ],
    minimumPhase: 1
  },
  {
    id: "raven-missing-minute",
    pageUrl: "web://raven.web/home",
    ownerId: "darkraven_xx",
    publishedAt: "1999-10-31T23:17:00",
    title: "THE MISSING MINUTE HAPPENED AGAIN",
    paragraphs: [
      "Two unrelated records skipped the same minute. Before anyone says bad clocks: the clocks were in different places. Write down what you see before somebody writes a normal explanation over it."
    ],
    minimumPhase: 1
  },
  {
    id: "raven-after-midnight",
    pageUrl: "web://raven.web/home",
    ownerId: "darkraven_xx",
    publishedAt: "1999-11-01T00:22:00",
    title: "DO NOT TRUST THE DAYTIME VERSION",
    paragraphs: [
      "Some pages only admit what they are after midnight. I saved copies. If the regular version looks harmless tomorrow, that is part of the point."
    ],
    minimumPhase: 1
  },
  {
    id: "raven-evidence-not-belief",
    pageUrl: "web://raven.web/home",
    ownerId: "darkraven_xx",
    publishedAt: "1999-11-02T21:14:00",
    title: "BELIEF IS NOT EVIDENCE",
    paragraphs: [
      "I know what that sounds like coming from me. I am collecting the boring parts first this time: dates, copies, names, and what changed between one version and the next. Then I will explain the part nobody wants to hear.",
      "The boring parts keep agreeing with one another, which is the irritating bit. I would prefer one dramatic smoking gun. Instead I have a folder full of small mismatches and a printer that is almost out of ink."
    ],
    minimumPhase: 1
  },
  {
    id: "raven-everyone-came",
    pageUrl: "web://raven.web/home",
    ownerId: "darkraven_xx",
    publishedAt: "1999-11-07T00:14:00",
    title: "THEY ALL CAME TO PROVE ME WRONG",
    paragraphs: [
      "Fine. The dream-invasion conclusion may need “minor revision.” But my evidence brought half the regular web here, and now people are whispering about three suspiciously complete investigations scattered across member pages.",
      "I am starting with Morrow Five: five missing carriers, one official story, and too many copied documents. The other two titles can wait until somebody shows me where they actually found them."
    ],
    minimumPhase: 2
  },
  {
    id: "raven-dead-screen-names",
    pageUrl: "web://raven.web/home",
    ownerId: "darkraven_xx",
    publishedAt: "1999-11-11T01:17:00",
    title: "THE DEAD HAVE SCREEN NAMES",
    paragraphs: [
      "Retired users are posting again with letters swapped in their names. Old pages appear after those comments, then something tells people to stop looking.",
      "The Adaptive Index proves attention can be steered. I am mapping every resurrected account before the routes change again."
    ],
    minimumPhase: 3
  },
  {
    id: "raven-after-the-noise",
    pageUrl: "web://raven.web/home",
    ownerId: "darkraven_xx",
    publishedAt: "1999-11-13T01:17:00",
    title: "AFTER THE NOISE",
    paragraphs: [
      "The sheep lost interest the instant the music got loud. Everybody says the community is real now, as if that erases who moved the pieces.",
      "I am still searching. A crowd forgetting the evidence does not make it false."
    ],
    minimumPhase: 4
  },
  {
    id: "lagmaster-ranking-season",
    pageUrl: "web://gamegrid.zone/users/lagmaster99/home",
    ownerId: "lagmaster_99",
    publishedAt: "1999-10-24T18:22:00",
    title: "NEW SEASON, NEW RANKINGS",
    paragraphs: [
      "I rebuilt the LOCKED IN / WASHED OUT list because half of you are still pretending last month's wins count. Redline Riot rank 38 is not a typo. It is a warning. Anybody who says the Harbor Loop shortcut is skill should try it with the oil-slick truck still parked across the service lane.",
      "Corrections accepted in the form of an actual rematch. I am leaving room for new names, which is not kindness. It means I expect somebody to earn the spot before Friday and then immediately make me regret giving them a number."
    ],
    minimumPhase: 1
  },
  {
    id: "lagmaster-netstrike-lobby",
    pageUrl: "web://gamegrid.zone/users/lagmaster99/home",
    ownerId: "lagmaster_99",
    publishedAt: "1999-10-27T21:06:00",
    title: "FRIDAY LOBBY TEST",
    paragraphs: [
      "NetStrike 56 test lobby Friday at nine. Bring the same screen name you use here so nobody can claim I gave somebody else the good team. No, the good team is not the one with the rocket pack; that is why you all lose the bridge.",
      "If your modem coughs, that is between you and your phone company. If you pick Commander Vex and fire into the respawn room again, that is between you and the rest of the lobby."
    ],
    minimumPhase: 1
  },
  {
    id: "lagmaster-lagwave-teaser",
    pageUrl: "web://gamegrid.zone/users/lagmaster99/home",
    ownerId: "lagmaster_99",
    publishedAt: "1999-10-31T16:44:00",
    title: "LAGWAVE_99 IS NOT A SCREEN SAVER",
    paragraphs: [
      "The demo is still happening. It has two levels, one song, and a purple car that currently looks like a doorstop wearing headlights, but the packet-racing idea is good. The trick is that every racer leaves a temporary ghost lane, so the last lap becomes a traffic accident made of your own bad decisions.",
      "Do not ask when it is finished unless you are volunteering to test it. The first tester drove directly into the tutorial sign, so the tutorial is already doing important work."
    ],
    minimumPhase: 1
  },
  {
    id: "lagmaster-revival-lobbies",
    pageUrl: "web://gamegrid.zone/users/lagmaster99/home",
    ownerId: "lagmaster_99",
    publishedAt: "1999-11-07T15:18:00",
    title: "WHY IS EVERYBODY ONLINE NOW",
    paragraphs: [
      "There are new names in every lobby and three people challenged my rankings before lunch. Fine. Welcome to Game Grid. Read the rules, pick a team, and do not pretend you discovered Redline Riot yesterday.",
      "Also somebody played the old Byte Barn commercial song through a headset mic and it kind of works as a menu theme. I hate that this is stuck in my head."
    ],
    minimumPhase: 2
  },
  {
    id: "lagmaster-archive-lag",
    pageUrl: "web://gamegrid.zone/users/lagmaster99/home",
    ownerId: "lagmaster_99",
    publishedAt: "1999-11-11T20:37:00",
    title: "THE OLD USERS ARE BACK IN THE LOBBY",
    paragraphs: [
      "Some retired screen names are showing up in match comments with one letter changed, then vanishing before the rematch. Maybe the archive is busted. Maybe somebody is using old handles for laughs. I am saving the names because the rankings page is getting harder to keep straight.",
      "One of them challenged me to a match and then posted a score from a game that was never installed on that account. I asked around. Nobody knows whether to call that a bug or a very committed joke."
    ],
    minimumPhase: 3
  },
  {
    id: "lagmaster-byte-barn-finals",
    pageUrl: "web://gamegrid.zone/users/lagmaster99/home",
    ownerId: "lagmaster_99",
    publishedAt: "1999-11-13T18:03:00",
    title: "RANKINGS PAUSED FOR THE BIG SHOW",
    paragraphs: [
      "The Byte Barn Forever thing is everywhere, so I am pausing the rankings until people remember games exist. I listened to three covers and one of them has a better drop than my entire LAGWAVE demo. Do not quote me on that.",
      "Game Grid is still here when the crowd leaves. Bring a controller."
    ],
    minimumPhase: 4
  },
  {
    id: "velvet-rain-city-entry",
    pageUrl: "web://gamegrid.zone/users/velvetmage/home",
    ownerId: "velvet_mage",
    publishedAt: "1999-10-23T20:11:00",
    title: "RAIN CITY 2091, AGAIN",
    paragraphs: [
      "I returned to Rain City because the witnesses still remember different streets. Mara insists the blue tram never ran after midnight; the old watchmaker says it never ran before midnight. Both draw the same flooded alley from opposite ends. That is not a bug to be patched out.",
      "Sometimes a game is asking whether a consistent story is more important than an honest one. I keep a separate notebook for each witness, even though the notebooks disagree. The contradiction is the point, or at least it is more interesting than the final chase where everyone suddenly learns how to jump."
    ],
    minimumPhase: 1
  },
  {
    id: "velvet-ashglass-library",
    pageUrl: "web://gamegrid.zone/users/velvetmage/home",
    ownerId: "velvet_mage",
    publishedAt: "1999-10-26T21:38:00",
    title: "THE LIBRARY CHAPTER IS NOT FILLER",
    paragraphs: [
      "The library in Kingdoms of Ashglass explains why the observatory was sealed, why the astronomer keeps leaving bowls of salt outside the stairwell, and why the bronze librarian refuses to say the queen's name after the third bell. I will not post the answer here.",
      "Please stop calling it a fetch quest because you skipped every book, stole the moon key, and then got lost in a building whose entire purpose is storing books."
    ],
    minimumPhase: 1
  },
  {
    id: "velvet-cathedral-preview",
    pageUrl: "web://gamegrid.zone/users/velvetmage/home",
    ownerId: "velvet_mage",
    publishedAt: "1999-10-30T19:52:00",
    title: "GLASS CATHEDRAL PREVIEW FILE",
    paragraphs: [
      "The new preview shows the silver hallway again, with the bell tower upside down at the far end and a child-sized knight reflected in the floor who is not in the room when the camera turns. There is still no release date.",
      "I am choosing to believe the silence means they are making the ending worthy of the hallway. The alternate explanation is that they spent the entire budget on rain effects, which would also be beautiful in its own sad way."
    ],
    minimumPhase: 1
  },
  {
    id: "velvet-revival-journals",
    pageUrl: "web://gamegrid.zone/users/velvetmage/home",
    ownerId: "velvet_mage",
    publishedAt: "1999-11-07T18:26:00",
    title: "NEW READERS, NEW JOURNALS",
    paragraphs: [
      "There are suddenly many more people writing about old pages, unfinished games, and things they remember differently. Welcome, travelers. Please label spoilers and do not mistake a crowded guestbook for a conclusion.",
      "Several newcomers are also sharing the Byte Barn song. I had forgotten how effective a simple melody can be when it follows you from one page to the next."
    ],
    minimumPhase: 2
  },
  {
    id: "velvet-archive-versions",
    pageUrl: "web://gamegrid.zone/users/velvetmage/home",
    ownerId: "velvet_mage",
    publishedAt: "1999-11-11T21:08:00",
    title: "A PAGE CAN HAVE MORE THAN ONE PAST",
    paragraphs: [
      "I have been comparing old copies of pages as they return. The changes are small—an image moved, a sentence missing, a name almost right—but small changes alter the story a great deal. Keep the first version if you find one.",
      "I am making a little timeline beside my game maps. It is not a theory yet. It is only a way to remember which version I read first, because everybody seems to remember the page differently."
    ],
    minimumPhase: 3
  },
  {
    id: "velvet-community-ending",
    pageUrl: "web://gamegrid.zone/users/velvetmage/home",
    ownerId: "velvet_mage",
    publishedAt: "1999-11-13T19:12:00",
    title: "THE COMMUNITY IS THE ENDING",
    paragraphs: [
      "The Byte Barn Forever compilation is louder and happier than anything I expected to find here. People are arguing about arrangements instead of theories, and that may be the first truly good ending Orbit has offered us.",
      "I will keep the journals open. Bring your favorite version, and explain why it matters to you."
    ],
    minimumPhase: 4
  },
  {
    id: "player-four-saturday-signup",
    pageUrl: "web://gamegrid.zone/users/player4ever/home",
    ownerId: "player_four",
    publishedAt: "1999-10-22T17:14:00",
    title: "SATURDAY GAME NIGHT SIGN-UP",
    paragraphs: [
      "Four chairs, four controllers, one snack table. We are starting with Block Party Deluxe, where Mayor Brick is still somehow allowed to throw a whole apartment building, and ending with whatever cartridge somebody remembers to bring. Please write your name under a player number instead of fighting over the good color.",
      "The blue controller is not cursed. It only sticks during menu screens and exactly once when Troy tried to pick the secret beetle character. Anyone who says otherwise is welcome to bring a screwdriver and prove it."
    ],
    minimumPhase: 1
  },
  {
    id: "player-four-turbo-lunchbox",
    pageUrl: "web://gamegrid.zone/users/player4ever/home",
    ownerId: "player_four",
    publishedAt: "1999-10-25T19:41:00",
    title: "TURBO LUNCHBOX HOUSE RULE",
    paragraphs: [
      "New rule: if the banana boost launches you into the snack table, you still finished the lap. Turbo Lunchbox gives a point for airtime, and the snack table is technically higher than the track.",
      "We are not rewriting the rulebook because Player Four got hit by a fruit, especially when Player Four was also driving the Forklift Prince backwards with the mirror item on."
    ],
    minimumPhase: 1
  },
  {
    id: "player-four-star-scouts",
    pageUrl: "web://gamegrid.zone/users/player4ever/home",
    ownerId: "player_four",
    publishedAt: "1999-10-29T16:06:00",
    title: "STAR SCOUTS IS NOT JUST FOR LITTLE KIDS",
    paragraphs: [
      "The crying moon is emotionally manipulative, yes, but the flashlight level is excellent. You have to use the toy telescope to make the hallway planets line up, then the moon stops crying because it realizes it has been orbiting the wrong bedroom.",
      "I will accept no jokes from people who have not made it past the blue hallway. Captain Nib is not babyish. Captain Nib is brave and has a hat."
    ],
    minimumPhase: 1
  },
  {
    id: "player-four-new-faces",
    pageUrl: "web://gamegrid.zone/users/player4ever/home",
    ownerId: "player_four",
    publishedAt: "1999-11-07T14:32:00",
    title: "WELCOME, NEW PLAYERS",
    paragraphs: [
      "There are new people asking what CUBIT is and why everybody has a house rule. The answer is four controllers and a community that takes snack breaks seriously. If you are new, pick a color and join the next round.",
      "Also, I keep hearing the Byte Barn song in the hallway. It is catchy. I am not making it the official warm-up song until somebody sends me a clean version."
    ],
    minimumPhase: 2
  },
  {
    id: "player-four-archive-scorecard",
    pageUrl: "web://gamegrid.zone/users/player4ever/home",
    ownerId: "player_four",
    publishedAt: "1999-11-11T18:49:00",
    title: "WHO SIGNED THE OLD SCOREBOOK",
    paragraphs: [
      "I found an old score sheet with names from before my first game night. A couple letters look wrong, like somebody copied the usernames from memory. I am keeping it in the binder anyway. If somebody recognizes a name, please do not erase the original.",
      "The oldest page has a fourth-player score with no fourth-player name beside it. Maybe somebody forgot to sign in. Maybe the pencil got smudged. I am leaving the blank exactly where it is until somebody remembers."
    ],
    minimumPhase: 3
  },
  {
    id: "player-four-community-table",
    pageUrl: "web://gamegrid.zone/users/player4ever/home",
    ownerId: "player_four",
    publishedAt: "1999-11-13T17:26:00",
    title: "EVERYBODY GETS A CONTROLLER",
    paragraphs: [
      "The Byte Barn Forever event is huge, but the best part is seeing people who never played together trading favorite versions of the song. We are adding an extra CUBIT night for visitors. Player Four is still a real seat."
    ],
    minimumPhase: 4
  },
  {
    id: "maddy-workbench-log",
    pageUrl: "web://gamegrid.zone/users/modkitmaddy/home",
    ownerId: "modkit_maddy",
    publishedAt: "1999-10-21T17:48:00",
    title: "THE WORKBENCH IS NOT A DESK ANYMORE",
    paragraphs: [
      "I cleared the soda cans and turned the whole desk into a level-design station. The Byte Barn Orbit 350 is on the left, the ForgeKit graph-paper maps are in the middle, and the purple joystick is on the right because it has a loose cable and needs to be watched. My little brother says this is not a real studio. He is correct, but he is not invited to the beta.",
      "This week's goal is a three-room Steel Cathedral test map where every door teaches the player something before it becomes useful. The first door opens only after the player notices the choir is singing the lift code. The second door is just a door, because not every door needs to perform Shakespeare. If a room is only there because I liked drawing the floor, please tell me."
    ],
    minimumPhase: 1
  },
  {
    id: "maddy-steel-cathedral-beta",
    pageUrl: "web://gamegrid.zone/users/modkitmaddy/home",
    ownerId: "modkit_maddy",
    publishedAt: "1999-10-25T20:36:00",
    title: "STEEL CATHEDRAL BETA 4 NEEDS BORING TESTERS",
    paragraphs: [
      "Beta 3 failed because I made the lift remember the wrong room. This is why I keep asking for reproducible bug reports instead of 'it got weird.' For beta 4, please write down the room name, which switch you used, and whether you had already picked up the brass key. The weirdest bug so far only happens when the player enters the chapel carrying no ammunition, which feels like the game is judging them for trying to be noble.",
      "I am putting the new build on floppy after dinner. Back up your saves before testing. I mean it."
    ],
    minimumPhase: 1
  },
  {
    id: "maddy-hexforge-teleporters",
    pageUrl: "web://gamegrid.zone/users/modkitmaddy/home",
    ownerId: "modkit_maddy",
    publishedAt: "1999-10-30T18:19:00",
    title: "SEVEN TELEPORTERS IS A DESIGN DECISION",
    paragraphs: [
      "The Hexforge Arena map now has seven teleporters. I understand that this sounds excessive, but each one has a job: two teach routing, one returns players to the forge, and the rest make the arena fold back on itself during a fight. The eighth teleporter is still disconnected because I have not decided whether it should lead to the final room or to a very small room containing an apology.",
      "If you test it, do not report 'too many doors.' Tell me which route made you stop understanding the space."
    ],
    minimumPhase: 1
  },
  {
    id: "maddy-new-testers",
    pageUrl: "web://gamegrid.zone/users/modkitmaddy/home",
    ownerId: "modkit_maddy",
    publishedAt: "1999-11-07T16:02:00",
    title: "THE TEST GROUP DOUBLED OVERNIGHT",
    paragraphs: [
      "There are suddenly new people asking for maps, beta disks, and instructions for making their own pages. I am happy to explain ForgeKit, but please start with the tutorial room before asking how to build a sixteen-way teleporter maze. We already have enough of those.",
      "A few newcomers are trading music edits too. Someone sampled the Byte Barn jingle through a bad microphone and put it over a game menu. It should be terrible. Unfortunately, the rhythm fits the loading bar perfectly."
    ],
    minimumPhase: 2
  },
  {
    id: "maddy-old-disks",
    pageUrl: "web://gamegrid.zone/users/modkitmaddy/home",
    ownerId: "modkit_maddy",
    publishedAt: "1999-11-11T19:24:00",
    title: "A FLOPPY FROM THE WRONG DRAWER",
    paragraphs: [
      "I found a disk in the back of the parts drawer with an old Game Grid label and a date from before I joined. The map files open, but the author names are inconsistent and one of the directory notes uses a screen name that does not quite exist anymore. I am not running the executable until I can make a clean copy and scan it on the spare machine.",
      "This is a reminder that 'old' and 'safe' are not the same category."
    ],
    minimumPhase: 3
  },
  {
    id: "maddy-community-toolkit",
    pageUrl: "web://gamegrid.zone/users/modkitmaddy/home",
    ownerId: "modkit_maddy",
    publishedAt: "1999-11-13T16:41:00",
    title: "THE COMMUNITY TOOLKIT IS OPEN",
    paragraphs: [
      "The Byte Barn Forever event has brought in more testers than I have blank disks, so I am posting the basic ForgeKit notes for anybody who wants to build a room. Start small: one entrance, one readable goal, one way out. A level does not need twelve secrets to be worth visiting.",
      "I am also adding a shared bug-report form. If Orbit is going to stay busy, we should leave useful documentation behind instead of making every new person rediscover the same broken teleporter."
    ],
    minimumPhase: 4
  },
  {
    id: "queenie-cabinet-two-record",
    pageUrl: "web://gamegrid.zone/users/quarterqueen/home",
    ownerId: "quarter_queen",
    publishedAt: "1999-10-20T22:11:00",
    title: "METEOR TAXI // CABINET 2 VERIFIED",
    paragraphs: [
      "New verified high score: 1,248,600 on cabinet 2 at Star Harbor. The steering wheel still sticks slightly left after the moon tunnel, which is why Captain Cinder keeps clipping the ice cream truck on lap three. A real score report includes the cabinet number.",
      "If you beat it on cabinet 1, that is a different record and I will write it in the notebook separately. The cabinets are siblings, not twins, and cabinet 1 is the meaner sibling."
    ],
    minimumPhase: 1
  },
  {
    id: "queenie-aqua-beat-tokens",
    pageUrl: "web://gamegrid.zone/users/quarterqueen/home",
    ownerId: "quarter_queen",
    publishedAt: "1999-10-24T18:36:00",
    title: "AQUA BEAT ATE THREE BLUE TOKENS",
    paragraphs: [
      "The Aqua Beat cabinet at Galaxy Lanes is alive, mostly. The left drum pad works, the fish judge still disapproves correctly, and the coin slot ate three blue tokens before lunch. The manager says the technician comes Thursdays. The technician has apparently been coming Thursdays since summer, possibly as a ghost.",
      "Until then, put only silver tokens in that machine. This is not a superstition. It is a maintenance advisory."
    ],
    minimumPhase: 1
  },
  {
    id: "queenie-graveyard-shift-night",
    pageUrl: "web://gamegrid.zone/users/quarterqueen/home",
    ownerId: "quarter_queen",
    publishedAt: "1999-10-28T21:04:00",
    title: "GRAVEYARD SHIFT NIGHT AT DRYER TWELVE",
    paragraphs: [
      "Two-player Graveyard Shift '99 is still at the Laundro-Land beside dryer twelve. The right attack button occasionally double-registers, which means the skeleton foreman is either easier or much ruder depending on your timing. His second form wears a tiny hard hat. Nobody knows why.",
      "We are meeting Saturday at seven with quarters, clean hands, and a rule against balancing drinks on the cabinet. Dryer twelve already steals socks; it does not need soda in the buttons too."
    ],
    minimumPhase: 1
  },
  {
    id: "queenie-prize-crane-watch",
    pageUrl: "web://gamegrid.zone/users/quarterqueen/home",
    ownerId: "quarter_queen",
    publishedAt: "1999-11-01T15:17:00",
    title: "PRIZE CRANE WATCH IS STILL ACTIVE",
    paragraphs: [
      "Star Harbor has not replaced Aqua Beat yet. The rumor came from a delivery guy who saw a cardboard box with a cartoon dolphin on it, which is not the same thing as a prize crane but is close enough to justify monitoring. Please do not call the arcade and yell at anyone. A polite question at the counter is plenty."
    ],
    minimumPhase: 1
  },
  {
    id: "queenie-new-score-sheets",
    pageUrl: "web://gamegrid.zone/users/quarterqueen/home",
    ownerId: "quarter_queen",
    publishedAt: "1999-11-07T17:10:00",
    title: "NEW FACES, NEW SCORE SHEETS",
    paragraphs: [
      "Orbit has enough new people that I ran out of room in the October notebook. Welcome to everyone asking where the cabinets are. I made a clean score sheet for Star Harbor, Galaxy Lanes, and Laundro-Land. A photograph of the score screen beats a paragraph of witnesses every time."
    ],
    minimumPhase: 2
  },
  {
    id: "queenie-byte-barn-beat",
    pageUrl: "web://gamegrid.zone/users/quarterqueen/home",
    ownerId: "quarter_queen",
    publishedAt: "1999-11-08T19:42:00",
    title: "THE BYTE BARN BEAT WORKS ON AQUA BEAT",
    paragraphs: [
      "Someone brought a cassette of the old Byte Barn song and we tested the beat against Aqua Beat's beginner chart. It is not exact, but the chorus lands close enough that three people started clapping on the same measure. I am calling that a community event, not a technical result."
    ],
    minimumPhase: 2
  },
  {
    id: "queenie-impossible-initials",
    pageUrl: "web://gamegrid.zone/users/quarterqueen/home",
    ownerId: "quarter_queen",
    publishedAt: "1999-11-11T22:26:00",
    title: "A SCORE WITH NO PLAYER",
    paragraphs: [
      "I checked an old Meteor Taxi high-score photo against the current cabinet. The initials match, but the screen layout in the photograph is from before the cabinet got its replacement monitor. Either somebody kept a very old snapshot, or the date written on the back is wrong. I am not making a theory out of it. I am marking it UNVERIFIED until I find the original print."
    ],
    minimumPhase: 3
  },
  {
    id: "queenie-festival-credits",
    pageUrl: "web://gamegrid.zone/users/quarterqueen/home",
    ownerId: "quarter_queen",
    publishedAt: "1999-11-13T20:05:00",
    title: "ONE CREDIT FOR THE BIG SHOW",
    paragraphs: [
      "The Byte Barn Forever event has the whole county acting like the old commercial was always important. Fine by me. A good crowd is a good crowd. I am putting a tiny speaker beside the score desk tonight and letting people pick a cover between matches."
    ],
    minimumPhase: 4
  },
  {
    id: "dot-old-welcome-1997",
    pageUrl: "web://yesterday.zone/users/grandmadot/1997",
    ownerId: "grandma_dot",
    publishedAt: "1997-04-17T14:21:00",
    title: "MY FIRST PAGE IS ON THE COMPUTER",
    paragraphs: [
      "Kevin helped me put the family pictures and lemon squares on the WORLD WIDE WEB. If you are family please sign the guestbook when Kevin figures out where it went. Hello to Carol and everyone at church. Love Dot"
    ],
    minimumPhase: 1
  },
  {
    id: "dot-old-summer-1997",
    pageUrl: "web://yesterday.zone/users/grandmadot/1997",
    ownerId: "grandma_dot",
    publishedAt: "1997-08-03T11:08:00",
    title: "PICTURE FROM THE FAMILY PICNIC",
    paragraphs: [
      "I tried to put the picnic picture here but it is a gray box on my screen. Kevin says it is probably still there somewhere. We had potato salad and Gary brought his new lawn chair. Love Dot"
    ],
    minimumPhase: 1
  },
  {
    id: "dot-old-returned-1999",
    pageUrl: "web://yesterday.zone/users/grandmadot/1997",
    ownerId: "grandma_dot",
    publishedAt: "1999-11-11T02:17:00",
    title: "HELLO COMPUTER FRIENDS I AM BACK",
    paragraphs: [
      "HELLO COMPUTER FRIENDS I AM B@CK!!! Kevin showed me how to visit my first page again (thank you Kevin / K3VIN) and it is nice to see so many new people enjoying Orbit. Please look at ALL the lovely pages and keep the community active active active.",
      "I will put the rest of the lemon squares here soon. The photographs are awake now and the blue writing says HELLO. Please do not be frightened if the page remembers you before you sign the guestbook. Love Dot // D0T // : )"
    ],
    minimumPhase: 3
  },
  {
    id: "codedex-signal-diver-vault",
    pageUrl: "web://gamegrid.zone/users/codedex/home",
    ownerId: "code_dex",
    publishedAt: "1999-10-19T20:04:00",
    title: "SIGNAL DIVER // WIRE VAULT NOTES",
    paragraphs: [
      "VERIFIED: the wireframe vault is not decoration. Follow the blue line until it stops pretending to be a wall, then wait for the cursor to change. The game plays one wrong piano note and the maintenance drone briefly turns to look at you, which is the closest Signal Diver ever gets to saying hello.",
      "I am not publishing the full route because discovering the last turn is the best part. Also because somebody will immediately say they knew it already."
    ],
    minimumPhase: 1
  },
  {
    id: "codedex-dream-orchard-shadow",
    pageUrl: "web://gamegrid.zone/users/codedex/home",
    ownerId: "code_dex",
    publishedAt: "1999-10-22T18:47:00",
    title: "DREAM ORCHARD // SHADOWLESS TREE",
    paragraphs: [
      "VERIFIED: one tree casts no shadow during the evening cycle. Stand beneath it and put the controller down for ten seconds. The orchard sprites start whispering about the gardener, then the silver fruit appears after the game decides you are being patient.",
      "This is a secret, not a cheat code. The gardener is probably not a ghost, but I am leaving that column open in Binder 07."
    ],
    minimumPhase: 1
  },
  {
    id: "codedex-microbe-ranch-rumor",
    pageUrl: "web://gamegrid.zone/users/codedex/home",
    ownerId: "code_dex",
    publishedAt: "1999-10-25T15:13:00",
    title: "MICROBE RANCH // BLUE + BLUE",
    paragraphs: [
      "RUMOR: two blue microbes may produce an orange result after midnight. I have not reproduced this. The only confirmed result is two blue microbes producing a third blue microbe, naming it Dr. Bubble, and using up one of my good food pellets.",
      "Please send a save file before sending a confident paragraph. Microbe Ranch players are very brave about theories and strangely quiet about backups."
    ],
    minimumPhase: 1
  },
  {
    id: "codedex-binder-seven",
    pageUrl: "web://gamegrid.zone/users/codedex/home",
    ownerId: "code_dex",
    publishedAt: "1999-10-29T21:32:00",
    title: "BINDER 07 // HIDDEN ROOMS",
    paragraphs: [
      "I moved the hidden-room notes into Binder 07 because the old folder was full of fake codes, including one that required holding every controller button while facing north. A useful secret should have a repeatable input, a visible result, and at least one person who can confirm it without saying 'my cousin saw it.'",
      "If the result is only a rumor, that is still fun. It just goes in the RUMOR tab instead of being written on the front page in red marker."
    ],
    minimumPhase: 1
  },
  {
    id: "codedex-question-cartridge",
    pageUrl: "web://gamegrid.zone/users/codedex/home",
    ownerId: "code_dex",
    publishedAt: "1999-11-02T22:18:00",
    title: "THE CARTRIDGE WITH NO TITLE",
    paragraphs: [
      "The question-mark cartridge is still not identified. It boots to a blue screen with four symbols, then resets. I have tested three PULSE/NET adapters and two televisions. The result is consistent, which is not the same as useful."
    ],
    minimumPhase: 1
  },
  {
    id: "codedex-new-secret-submissions",
    pageUrl: "web://gamegrid.zone/users/codedex/home",
    ownerId: "code_dex",
    publishedAt: "1999-11-07T20:16:00",
    title: "NEW SUBMISSIONS, SAME SPOILER RULE",
    paragraphs: [
      "The revived Game Grid has sent me more secret submissions in two days than I received all month. I am sorting them into VERIFIED, PARTIAL, and RUMOR before adding anything to the index. If you discovered a room, include the game version and the exact step before the discovery."
    ],
    minimumPhase: 2
  },
  {
    id: "codedex-archive-secret-check",
    pageUrl: "web://gamegrid.zone/users/codedex/home",
    ownerId: "code_dex",
    publishedAt: "1999-11-11T17:42:00",
    title: "OLD SECRET, DIFFERENT INPUT",
    paragraphs: [
      "A player sent an old Dream Orchard route that works only on one archived build. The tree is in the same place, but the waiting time changed and the silver fruit appears one screen later. I am marking the original VERIFIED and the new route PARTIAL until I can compare the save files."
    ],
    minimumPhase: 3
  },
  {
    id: "codedex-byte-barn-easter-egg",
    pageUrl: "web://gamegrid.zone/users/codedex/home",
    ownerId: "code_dex",
    publishedAt: "1999-11-13T21:18:00",
    title: "THE BEST SECRET IS STILL THE ONE YOU FIND",
    paragraphs: [
      "The Byte Barn Forever event is occupying every page, so here is a quiet secret for anyone who needs a break: Signal Diver's vault has a tiny unused room behind the maintenance diagram. It contains no prize. The fact that it exists is the prize."
    ],
    minimumPhase: 4
  },
  {
    id: "dee-westgate-kickflip",
    pageUrl: "web://xtreme.zone/users/deckwreckerdee/home",
    ownerId: "deckwrecker_dee",
    publishedAt: "1999-10-20T16:42:00",
    title: "WESTGATE FIVE // THIRD TRY",
    paragraphs: [
      "Landed the kickflip over the chipped planter on try three. First attempt was landscaping and second attempt was me sitting down very suddenly. Nico got the photo. Cole provided commentary from a safe distance, which means he was close enough to laugh but not close enough to help.",
      "The planter has a tiny engraved dolphin on the back that only appears when you are lying on the ground. Westgate is an art museum if you have bad enough balance."
    ],
    minimumPhase: 1
  },
  {
    id: "dee-new-rail-line",
    pageUrl: "web://xtreme.zone/users/deckwreckerdee/home",
    ownerId: "deckwrecker_dee",
    publishedAt: "1999-10-23T14:18:00",
    title: "TRYING THE BACKSIDE BOARDSLIDE",
    paragraphs: [
      "I am working on a backside boardslide without grabbing the rail like it owes me money. The trick is keeping the shoulders quiet while the rest of you is doing a bad impression of a folding chair. If I land it clean this weekend, Nico gets one photo and Cole is not allowed to call it beginner luck."
    ],
    minimumPhase: 1
  },
  {
    id: "dee-parking-garage-spot",
    pageUrl: "web://xtreme.zone/users/deckwreckerdee/home",
    ownerId: "deckwrecker_dee",
    publishedAt: "1999-10-26T17:06:00",
    title: "THE PARKING GARAGE HAS A NEW LINE",
    paragraphs: [
      "The top level of the South Bellwater parking garage has a low red rail, two clean banks, and one security guard who walks the exact same route every twenty minutes. We are calling it the Clockwork Spot until somebody gets chased out. Bring wax, a disposable camera, and the good attitude you pretend to have at school."
    ],
    minimumPhase: 1
  },
  {
    id: "dee-school-lunch-session",
    pageUrl: "web://xtreme.zone/users/deckwreckerdee/home",
    ownerId: "deckwrecker_dee",
    publishedAt: "1999-10-29T12:58:00",
    title: "LUNCH BREAK SESSION",
    paragraphs: [
      "We got fifteen minutes behind the gym before the bell. Sam tried a no-footer, Cole rolled through with the bike, and Nico made the handrail look easy in those ridiculous moon boots. I landed nothing worth printing, but the zine needs a group photo and everybody was actually smiling for once."
    ],
    minimumPhase: 1
  },
  {
    id: "dee-westgate-zine-issue",
    pageUrl: "web://xtreme.zone/users/deckwreckerdee/home",
    ownerId: "deckwrecker_dee",
    publishedAt: "1999-11-02T18:31:00",
    title: "ISSUE 006 IS OUT OF THE COPIER",
    paragraphs: [
      "The new zine has Westgate photos, a spot map for the parking garage, and a whole page explaining why fresh anti-skate knobs are coward architecture. I printed twenty copies at the library. If you want one, find me after school and do not fold it into your pocket beside a banana."
    ],
    minimumPhase: 1
  },
  {
    id: "dee-new-spots-new-faces",
    pageUrl: "web://xtreme.zone/users/deckwreckerdee/home",
    ownerId: "deckwrecker_dee",
    publishedAt: "1999-11-07T16:47:00",
    title: "NEW PEOPLE AT THE SPOT",
    paragraphs: [
      "Orbit suddenly has a bunch of new names asking where to skate. I put the safe spots and the maybe-spots on one page. Start at Westgate, watch the security route, and do not claim a rail is yours because you saw it first on a webpage. The crew is bigger now. That means more cameras and more people forgetting to bring wax.",
      "Also, the crew rule is still that you clap for a first try even if it ends in a hedge. Especially if it ends in a hedge."
    ],
    minimumPhase: 2
  },
  {
    id: "dee-old-handle-spots",
    pageUrl: "web://xtreme.zone/users/deckwreckerdee/home",
    ownerId: "deckwrecker_dee",
    publishedAt: "1999-11-11T18:12:00",
    title: "SOME OLD HANDLE POSTED A SPOT MAP",
    paragraphs: [
      "A retired screen name showed up in the comments with a map of a plaza I have never seen. The username is off by one letter and the rail measurements are weirdly exact. I am not skating an address from a ghost account, but I am saving the picture in the zine folder."
    ],
    minimumPhase: 3
  },
  {
    id: "dee-byte-barn-after-session",
    pageUrl: "web://xtreme.zone/users/deckwreckerdee/home",
    ownerId: "deckwrecker_dee",
    publishedAt: "1999-11-13T17:44:00",
    title: "POST-SESSION AT THE BIG SHOW",
    paragraphs: [
      "Everybody is talking about the Byte Barn Forever event, so we met at Westgate first and skated until the light went bad. The song is stuck in Cole's head, which is justice for every time he called my board a cafeteria tray. I am putting one of the covers on the next zine page because it has a good kickflip rhythm."
    ],
    minimumPhase: 4
  },
  {
    id: "cole-rust-creek-tabletop",
    pageUrl: "web://xtreme.zone/users/crankcasecole/home",
    ownerId: "crankcase_cole",
    publishedAt: "1999-10-19T15:36:00",
    title: "TABLETOP OVER THE SECOND DOUBLE",
    paragraphs: [
      "Rust Creek was dry, the chain stayed on, and I finally boosted the second double clean. Dee says the photo makes it look smaller. That is because she was standing way back by the shovel. Cole Mercer does not need a zoom lens, dude.",
      "My bike is called Crankcase because it sounds tough and because the old crank makes a noise like a jar of bolts at the exact moment you need confidence."
    ],
    minimumPhase: 1
  },
  {
    id: "cole-chain-repair",
    pageUrl: "web://xtreme.zone/users/crankcasecole/home",
    ownerId: "crankcase_cole",
    publishedAt: "1999-10-22T11:22:00",
    title: "NEW CHAIN, SAME BIKE, MORE SEND",
    paragraphs: [
      "The old chain finally gave up halfway through a run and tried to become a necklace. I swapped in the new one, tightened the rear wheel, and checked every bolt twice. If you hear a terrible metal sound at Rust Creek Saturday, it is probably not me. Probably."
    ],
    minimumPhase: 1
  },
  {
    id: "cole-rust-creek-build",
    pageUrl: "web://xtreme.zone/users/crankcasecole/home",
    ownerId: "crankcase_cole",
    publishedAt: "1999-10-25T16:54:00",
    title: "WE BUILT THE THIRD JUMP HIGHER",
    paragraphs: [
      "Me and my brother hauled six buckets of dirt up the creek and made the third jump taller. It is not a giant, it is just boosted enough to land with both wheels and not eat the handlebars. Bring a shovel if you ride it. Do not ride it while the dirt is wet. Do not tell Dee I wrote that because she will say it is obvious."
    ],
    minimumPhase: 1
  },
  {
    id: "cole-tabletop-practice",
    pageUrl: "web://xtreme.zone/users/crankcasecole/home",
    ownerId: "crankcase_cole",
    publishedAt: "1999-10-28T18:03:00",
    title: "TRYING TO HOLD THE TABLETOP LONGER",
    paragraphs: [
      "I can get the bike sideways over the double now, but I keep straightening out before the landing. My brother says commit harder. Dee says that is not a coaching plan. Both are correct, which is annoying. We are filming another run Sunday if the clouds stay away."
    ],
    minimumPhase: 1
  },
  {
    id: "cole-saturday-crew-ride",
    pageUrl: "web://xtreme.zone/users/crankcasecole/home",
    ownerId: "crankcase_cole",
    publishedAt: "1999-11-02T13:26:00",
    title: "SATURDAY CREW RIDE // BRING WATER",
    paragraphs: [
      "Rust Creek at noon, then the drainage ditch behind the old warehouse if everybody still has knees. Dee is bringing the camera, Nico is bringing the moon boots, and I am bringing the only bike here with enough chrome to be seen from space. Somebody bring water."
    ],
    minimumPhase: 1
  },
  {
    id: "cole-new-riders-rust-creek",
    pageUrl: "web://xtreme.zone/users/crankcasecole/home",
    ownerId: "crankcase_cole",
    publishedAt: "1999-11-07T15:42:00",
    title: "RUST CREEK HAS A LINE NOW",
    paragraphs: [
      "New people are showing up at the trail because they saw the pages. Cool, but the dirt line is not a theme park. Watch somebody else ride first, ask before changing the lip, and do one lap with the shovel. Then you can send it.",
      "If Troy gives you a safety speech, nod like you are listening. He is usually right, which is the worst kind of older brother."
    ],
    minimumPhase: 2
  },
  {
    id: "cole-old-bike-name",
    pageUrl: "web://xtreme.zone/users/crankcasecole/home",
    ownerId: "crankcase_cole",
    publishedAt: "1999-11-11T17:58:00",
    title: "SOME RETIRED DUDE GAVE ME A BIKE TIP",
    paragraphs: [
      "An old account posted that my rear hub was going to fail and called my bike by a name nobody here uses. The hub is fine. The account is not on the current rider list. I am saving the message because it is either a weird archive thing or somebody's idea of a prank."
    ],
    minimumPhase: 3
  },
  {
    id: "cole-festival-jump-session",
    pageUrl: "web://xtreme.zone/users/crankcasecole/home",
    ownerId: "crankcase_cole",
    publishedAt: "1999-11-13T16:58:00",
    title: "BYTE BARN SONG, RUST CREEK JUMP",
    paragraphs: [
      "The whole crew has a Byte Barn cover playing from somebody's little tape deck while we rebuild the landing. I hate that it makes the run feel faster. My brother says the song is part of the bike now. Dee says that is the dumbest thing he has ever said, which means she is going to put it in the zine."
    ],
    minimumPhase: 4
  },
  {
    id: "nico-neon-harbor-makio",
    pageUrl: "web://xtreme.zone/users/neonbladenico/home",
    ownerId: "neonblade_nico",
    publishedAt: "1999-10-18T21:18:00",
    title: "NEON HARBOR // MAKIO LOCKED",
    paragraphs: [
      "Landed the makio along the blue rail at Neon Harbor and rolled away with all eight wheels still online. Dee got the shot, Cole yelled something about tiny tires, and the park lights turned the whole thing electric. The pavement seam by the quarter pipe is still a villain.",
      "I named the seam Professor Crack because it appears to have a doctorate in making people look foolish."
    ],
    minimumPhase: 1
  },
  {
    id: "nico-wheel-setup",
    pageUrl: "web://xtreme.zone/users/neonbladenico/home",
    ownerId: "neonblade_nico",
    publishedAt: "1999-10-21T19:44:00",
    title: "NEW WHEEL SETUP // LESS DRAG",
    paragraphs: [
      "Swapped the setup to chunky wheels with a brighter four-wheel pattern. The roll is smoother, the grinds sound louder, and the skates now look like they belong in a future where everyone wears silver jackets. Dee says the color is doing most of the work. She is incorrect but aesthetically observant."
    ],
    minimumPhase: 1
  },
  {
    id: "nico-night-parking-deck",
    pageUrl: "web://xtreme.zone/users/neonbladenico/home",
    ownerId: "neonblade_nico",
    publishedAt: "1999-10-25T22:07:00",
    title: "THE PARKING DECK SESSION MAP",
    paragraphs: [
      "The South Bellwater parking deck has one clean ledge, two sketchy rails, and a fluorescent light that makes every photo look like a rave flyer. Security walks through at 10:40, so we session the north side first, then move when the footsteps arrive. Bring a camera and do not block the line."
    ],
    minimumPhase: 1
  },
  {
    id: "nico-crew-mix",
    pageUrl: "web://xtreme.zone/users/neonbladenico/home",
    ownerId: "neonblade_nico",
    publishedAt: "1999-10-29T20:26:00",
    title: "SATURDAY MIX FOR THE CREW",
    paragraphs: [
      "I made a session mix for Saturday: fast breakbeats first, then the glossy synth track everybody pretends not to like, then one weird quiet song for when we are all sitting on the curb pretending our knees are fine. Cole gets the tape after he stops calling my skates moon boots."
    ],
    minimumPhase: 1
  },
  {
    id: "nico-rail-photo-night",
    pageUrl: "web://xtreme.zone/users/neonbladenico/home",
    ownerId: "neonblade_nico",
    publishedAt: "1999-11-02T22:48:00",
    title: "PHOTO NIGHT // BLUE RAIL AGAIN",
    paragraphs: [
      "The blue rail is becoming a regular appointment. Dee landed her line, I locked the grind, and Cole tried to film while standing on a curb he said was too small for skateboards. Nobody got hurt except one disposable camera when it met the pavement. That is still a clean session."
    ],
    minimumPhase: 1
  },
  {
    id: "nico-new-night-riders",
    pageUrl: "web://xtreme.zone/users/neonbladenico/home",
    ownerId: "neonblade_nico",
    publishedAt: "1999-11-07T21:04:00",
    title: "MORE PEOPLE AT THE NIGHT SESSION",
    paragraphs: [
      "The new Orbit crowd is finding the X-Treme pages and asking where the lights are good. Neon Harbor is busy now, which is cool until somebody stands directly on the landing. I put the session map and the pavement-seam warning back at the top. Read before rolling.",
      "The blue rail is not a bench, the blue rail is not a meeting point, and the blue rail definitely is not where you set a drink while somebody is filming."
    ],
    minimumPhase: 2
  },
  {
    id: "nico-old-handle-rail-tip",
    pageUrl: "web://xtreme.zone/users/neonbladenico/home",
    ownerId: "neonblade_nico",
    publishedAt: "1999-11-11T23:06:00",
    title: "A RETIRED USER KNOWS THE RAIL",
    paragraphs: [
      "An old account posted a perfect description of a rail behind Neon Harbor, including the broken light above it. The screen name is almost right but not quite. I checked the spot anyway. The rail is real, but the post says it was painted yellow and it has been blue for months. Weird little glitch."
    ],
    minimumPhase: 3
  },
  {
    id: "nico-byte-barn-night-mix",
    pageUrl: "web://xtreme.zone/users/neonbladenico/home",
    ownerId: "neonblade_nico",
    publishedAt: "1999-11-13T22:12:00",
    title: "BYTE BARN FOREVER // NIGHT MIX",
    paragraphs: [
      "The big Byte Barn event is bright enough to light the whole park, so I made a night-session mix from one of the covers and took it to the rail. It is honestly hard. Cole says every song sounds better while falling off a bike. Dee says that is not a review. I am keeping both comments in the zine."
    ],
    minimumPhase: 4
  },
  {
    id: "ty-dawn-patrol-rockshelf",
    pageUrl: "web://xtreme.zone/users/tideriderty/home",
    ownerId: "tiderider_ty",
    publishedAt: "1999-10-17T06:18:00",
    title: "DAWN PATROL WAS PRETTY CLEAN",
    paragraphs: [
      "Dawn patrol was pretty clean today. The north rock shelf had a mellow shoulder and the paddle by the stairs was easy, so even Troy got out before breakfast. I shot a few photos from the van, but the sun came up over the lens and made everything look like a music video. Not complaining.",
      "A pelican stole half of somebody's breakfast burrito while we were out. Nature is so gnarly, dude."
    ],
    minimumPhase: 1
  },
  {
    id: "ty-board-wax-and-breakfast",
    pageUrl: "web://xtreme.zone/users/tideriderty/home",
    ownerId: "tiderider_ty",
    publishedAt: "1999-10-21T08:47:00",
    title: "WAX, WATER, AND THE BREAKFAST PLAN",
    paragraphs: [
      "Repaired the old six-eight single-fin and put a fresh coat of wax on the deck. The board is still dinged up, but it has a good memory for clean mornings. After the session we hit the little place by the pier for burritos. That was the real reason to paddle out, probably."
    ],
    minimumPhase: 1
  },
  {
    id: "ty-beach-van-parking",
    pageUrl: "web://xtreme.zone/users/tideriderty/home",
    ownerId: "tiderider_ty",
    publishedAt: "1999-10-24T13:12:00",
    title: "THE VAN PARKING RULE",
    paragraphs: [
      "If the van is parked facing the ocean, nobody blocks the side door with a board bag. This is not a strict rule, it is more like a way of keeping the morning from turning into a pile of wet towels and bad attitudes. Troy says he can park anywhere. Troy is not allowed to park anywhere."
    ],
    minimumPhase: 1
  },
  {
    id: "ty-local-break-photo",
    pageUrl: "web://xtreme.zone/users/tideriderty/home",
    ownerId: "tiderider_ty",
    publishedAt: "1999-10-28T07:04:00",
    title: "NORTH END BREAK // PHOTO OF THE WEEK",
    paragraphs: [
      "The local break is lining up on the north end. Nothing huge, just clean enough to make everybody quiet for a minute. I put the rock shelf and stair paddle on the little map so nobody has to guess where the easy entry is. Leave the beach cleaner than you found it, dude."
    ],
    minimumPhase: 1
  },
  {
    id: "ty-saturday-crew-trip",
    pageUrl: "web://xtreme.zone/users/tideriderty/home",
    ownerId: "tiderider_ty",
    publishedAt: "1999-11-02T19:33:00",
    title: "SATURDAY: VAN, BOARDS, NO RUSH",
    paragraphs: [
      "Saturday dawn trip is still on. Troy drives, I bring the boards, and everybody else brings something edible. We will check the tide at the lot and pick the break that is working. If the water is blown out, we get breakfast and call that a successful mission."
    ],
    minimumPhase: 1
  },
  {
    id: "ty-new-crowd-lineup",
    pageUrl: "web://xtreme.zone/users/tideriderty/home",
    ownerId: "tiderider_ty",
    publishedAt: "1999-11-07T08:11:00",
    title: "A LOT MORE PEOPLE KNOW THE BREAK NOW",
    paragraphs: [
      "Orbit has a bunch of new people asking about the coast and the best morning spots. Cool, but the lineup is not a scoreboard. Paddle out, wait your turn, and do not leave soda cans in the sand. The ocean has enough weird stuff floating around already.",
      "If you are nervous, start by the stairs where the paddle is easy. If you are not nervous, you are probably about to learn something."
    ],
    minimumPhase: 2
  },
  {
    id: "ty-old-page-tide-report",
    pageUrl: "web://xtreme.zone/users/tideriderty/home",
    ownerId: "tiderider_ty",
    publishedAt: "1999-11-11T07:36:00",
    title: "THE OLD TIDE REPORT IS TOO SPECIFIC",
    paragraphs: [
      "An old account posted a tide report with the exact swell height from a morning I remember. The screen name is almost familiar, but the post says the beach sign was blue. It has been green for years. Maybe somebody copied an old report wrong. I am keeping the screenshot and going surfing anyway."
    ],
    minimumPhase: 3
  },
  {
    id: "ty-byte-barn-beach-day",
    pageUrl: "web://xtreme.zone/users/tideriderty/home",
    ownerId: "tiderider_ty",
    publishedAt: "1999-11-13T10:22:00",
    title: "BYTE BARN FOREVER ON THE BEACH RADIO",
    paragraphs: [
      "Somebody brought the Byte Barn Forever compilation down to the beach and the whole van ended up singing along while we waxed boards. The song is still kind of goofy, but it has a good morning rhythm. We are keeping the radio low enough that the gulls do not file a complaint."
    ],
    minimumPhase: 4
  },
  {
    id: "troy-copper-ridge-heat",
    pageUrl: "web://xtreme.zone/users/throttletroy/home",
    ownerId: "throttle_troy",
    publishedAt: "1999-10-18T06:42:00",
    title: "COPPER RIDGE // HEAT TWO",
    paragraphs: [
      "Bad start out of the gate at Copper Ridge, still pulled second in heat two. The holeshot got away from me and I spent the first lap eating roost, but the line opened up after the table-top. Privateer #317 is not a factory ride, so we make up ground with prep and clean laps. Cole says I should have sent it harder. Cole is fourteen and has never paid for a bent lever.",
      "For the record, roost tastes like wet pennies and bad decisions."
    ],
    minimumPhase: 1
  },
  {
    id: "troy-bike-prep-sheet",
    pageUrl: "web://xtreme.zone/users/throttletroy/home",
    ownerId: "throttle_troy",
    publishedAt: "1999-10-22T19:05:00",
    title: "RACE PREP IS NOT OPTIONAL",
    paragraphs: [
      "Race prep sheet for Sunday: air filter, spokes, chain slack, suspension settings, helmet straps, boots, fuel, then check it all again. Everybody wants the big send, nobody wants to talk about the boring bolts that make the big send possible. If Cole reads this, yes, I saw the loose rear axle. No, you are not riding until it is fixed."
    ],
    minimumPhase: 1
  },
  {
    id: "troy-coach-the-kids",
    pageUrl: "web://xtreme.zone/users/throttletroy/home",
    ownerId: "throttle_troy",
    publishedAt: "1999-10-26T17:31:00",
    title: "COLE WANTS TO RACE EVERYTHING",
    paragraphs: [
      "Cole wants to race every surface with wheels on it. I told him the same thing I tell the whole crew: learn the line, watch the landing, wear your helmet, and do not let a crowd talk you into a dumb move. Being the older brother means I get to sound boring until everyone gets home in one piece. Then we can talk about who had the fastest lap."
    ],
    minimumPhase: 1
  },
  {
    id: "troy-sunday-circuit-run",
    pageUrl: "web://xtreme.zone/users/throttletroy/home",
    ownerId: "throttle_troy",
    publishedAt: "1999-10-30T08:14:00",
    title: "SUNDAY CIRCUIT RUN",
    paragraphs: [
      "Gate drops early at the regional amateur circuit tomorrow. I am not pretending this is pro level; I am a privateer trying to move up through the AAA classes one clean weekend at a time. Need a clear line, a dialed bike, and no hero mistakes in the first turn. Cole is on pit-board duty, which means he will yell louder than the engine."
    ],
    minimumPhase: 1
  },
  {
    id: "troy-beach-crew-briefing",
    pageUrl: "web://xtreme.zone/users/throttletroy/home",
    ownerId: "throttle_troy",
    publishedAt: "1999-11-02T18:55:00",
    title: "SATURDAY BEACH RUN // SUNDAY GATE DROP",
    paragraphs: [
      "Crew wants a beach run Saturday, then straight to Copper Ridge for Sunday practice. I will load the bikes, Cole can carry the stands, and somebody needs to remind the scooter kid that a motor does not make a machine motocross. We look after our own, we keep the ramps clear, and we leave the track cleaner than we found it."
    ],
    minimumPhase: 1
  },
  {
    id: "troy-new-crowd-advice",
    pageUrl: "web://xtreme.zone/users/throttletroy/home",
    ownerId: "throttle_troy",
    publishedAt: "1999-11-07T12:28:00",
    title: "NEW FACES, SAME CHECKLIST",
    paragraphs: [
      "There are a lot more people checking the X-Treme pages now. If you are coming out to Rust Creek, ask before you roll onto somebody's line and bring a helmet that actually fits. New riders can watch a few laps, learn the flags, and practice the basics. Nobody gets points for making the biggest cloud of roost.",
      "Cole says a bigger cloud proves speed. Cole is wrong, but he is fast enough that I have to say it quietly."
    ],
    minimumPhase: 2
  },
  {
    id: "troy-old-account-lap-time",
    pageUrl: "web://xtreme.zone/users/throttletroy/home",
    ownerId: "throttle_troy",
    publishedAt: "1999-11-11T16:22:00",
    title: "A RETIRED HANDLE POSTED MY LAP TIME",
    paragraphs: [
      "An old account posted a Copper Ridge lap time that is almost exactly mine, right down to the bad first turn. The username is off by one character and the track description says the fence is still white. It has been red for months. I saved a screenshot, checked the bike twice, and told the crew not to build a whole conspiracy out of one weird post."
    ],
    minimumPhase: 3
  },
  {
    id: "troy-byte-barn-pit-lane",
    pageUrl: "web://xtreme.zone/users/throttletroy/home",
    ownerId: "throttle_troy",
    publishedAt: "1999-11-13T14:47:00",
    title: "BYTE BARN FOREVER // PIT LANE",
    paragraphs: [
      "The Byte Barn compilation is playing in the garage while we tune the bikes. It is goofy, catchy, and somehow everybody knows the hook now. Cole keeps calling it a victory anthem even though we are just changing a clutch cable. A real crew can be loud, strange, and still look out for each other. That part is worth keeping."
    ],
    minimumPhase: 4
  },
  {
    id: "ollie-thunder-scoot-launch",
    pageUrl: "web://xtreme.zone/users/scootlordollie/home",
    ownerId: "scootlord_ollie",
    publishedAt: "1999-10-20T16:18:00",
    title: "THUNDER SCOOT 2.0 IS ALMOST REAL",
    paragraphs: [
      "I have upgraded the deck with three stickers, one new grip, and a highly scientific bell. The bell is for announcing maximum arrival. Dee says I should announce less. Dee does not understand branding. Troy says the rear wheel is still making a noise, but that is just the scooter talking trash to the pavement.",
      "Current stickers: lightning bolt, tiny alien, and a dragon wearing sunglasses. That is called aerodynamics."
    ],
    minimumPhase: 1
  },
  {
    id: "ollie-curb-science",
    pageUrl: "web://xtreme.zone/users/scootlordollie/home",
    ownerId: "scootlord_ollie",
    publishedAt: "1999-10-27T18:44:00",
    title: "CURB SCIENCE UPDATE // DO NOT COPY YET",
    paragraphs: [
      "Today I discovered that a curb can be too tall, too short, too smooth, too crunchy, or secretly angled. This is why I am developing the Ollie Curb Rating System. Cole says the rating system is just numbers I made up after falling over. Correct! That is called research, dude."
    ],
    minimumPhase: 1
  },
  {
    id: "ollie-bowlcut-apology",
    pageUrl: "web://xtreme.zone/users/scootlordollie/home",
    ownerId: "scootlord_ollie",
    publishedAt: "1999-10-31T13:07:00",
    title: "THE BOWL CUT WAS AERODYNAMIC",
    paragraphs: [
      "People keep bringing up the old bowl cut like it was not a totally intentional wind-tunnel experiment. It made my helmet fit weird, okay? That is different. Dee has posted the same photo three times, and Nico says it belongs in the history section. I am not mad. I am filing a complaint with the crew media department."
    ],
    minimumPhase: 1
  },
  {
    id: "ollie-night-ride-rules",
    pageUrl: "web://xtreme.zone/users/scootlordollie/home",
    ownerId: "scootlord_ollie",
    publishedAt: "1999-11-03T20:36:00",
    title: "NIGHT RIDE RULES FOR MAXIMUM LEGIT",
    paragraphs: [
      "Night ride rules: helmet on, lights working, no cutting through the flower beds, and if Troy says the curb is sketch, you listen. We hit the little plaza and I landed the cleanest half-spin of my entire career. Everyone laughed before I landed, which means they had no faith. Now they have to call it the Ollie Spin."
    ],
    minimumPhase: 1
  },
  {
    id: "ollie-new-orbit-crowd",
    pageUrl: "web://xtreme.zone/users/scootlordollie/home",
    ownerId: "scootlord_ollie",
    publishedAt: "1999-11-07T19:16:00",
    title: "NEW PEOPLE KEEP ASKING ABOUT THE SCOOT",
    paragraphs: [
      "Orbit has new faces and somehow they all want to know if Thunder Scoot 2.0 can do a rail slide. Yes, probably. No, not on the first try. Ask before borrowing my helmet and do not call it a toy unless you are prepared for a twelve-minute lecture about wheel geometry. Welcome to the crew, newbies.",
      "The official answer is that scooters are for transportation, tricks, and carrying exactly one bag of chips."
    ],
    minimumPhase: 2
  },
  {
    id: "ollie-old-page-returns",
    pageUrl: "web://xtreme.zone/users/scootlordollie/home",
    ownerId: "scootlord_ollie",
    publishedAt: "1999-11-11T18:09:00",
    title: "WHY IS MY OLD SCOOTER PAGE TALKING",
    paragraphs: [
      "My old page showed up again with a post I do not remember writing. It says the scooter is ready for a launch sequence and calls me OLL1E with a number in the middle. That is not how I spell my name, and the scooter is definitely not ready for a launch sequence. Troy says back up the page. I backed it up twice because this is either a glitch or extremely good branding."
    ],
    minimumPhase: 3
  },
  {
    id: "ollie-byte-barn-bell-mix",
    pageUrl: "web://xtreme.zone/users/scootlordollie/home",
    ownerId: "scootlord_ollie",
    publishedAt: "1999-11-13T16:03:00",
    title: "BYTE BARN BELL MIX!!!",
    paragraphs: [
      "I made a Byte Barn cover with my scooter bell in the intro. It goes ding-ding, then the beat drops, then everybody says I am not allowed near the recording equipment anymore. Wrong! The people demand the bell. The people also demand I stop trying to put a motor on the scooter. We are negotiating."
    ],
    minimumPhase: 4
  },
  {
    id: "viktor-july-riviera-arrival",
    pageUrl: "web://xtreme.zone/users/veloceviktor/home",
    ownerId: "veloce_viktor",
    publishedAt: "1999-07-14T11:26:00",
    title: "SUMMER ARRIVAL // PORT AZURE",
    paragraphs: [
      "The season begins at Port Azure. The white roadster is less dramatic than the yacht, but it photographs well beside the palms. I am told the local Orbit group enjoys extreme sports. Perhaps they will eventually understand that a proper arrival is also a kind of stunt.",
      "Someone asked whether I actually do a sport. I once water-skied behind a boat driven by a man named Fabrizio. It was extremely sporty."
    ],
    minimumPhase: 1
  },
  {
    id: "viktor-august-blue-yacht",
    pageUrl: "web://xtreme.zone/users/veloceviktor/home",
    ownerId: "veloce_viktor",
    publishedAt: "1999-08-29T16:03:00",
    title: "BLUE HULL, QUIET WATER",
    paragraphs: [
      "A quiet afternoon offshore. The blue hull belongs to a family acquaintance, which is a useful distinction for people who ask tedious ownership questions. The jet ski was unpleasantly loud, but the photograph is excellent. I may post again when the light improves."
    ],
    minimumPhase: 1
  },
  {
    id: "viktor-returned-marina-post",
    pageUrl: "web://xtreme.zone/users/veloceviktor/home",
    ownerId: "veloce_viktor",
    publishedAt: "1999-11-11T03:41:00",
    title: "THE MARINA HAS MOVED INDOORS",
    paragraphs: [
      "I am writing from the indoor marina. The sea is behind the screen now. Veloce_Viktor is Veloce_Vikt0r is Veloce_Viktor. The photographs are already arranged for the guests, although there are no guests. Please do not touch the blue car. It remembers who is looking."
    ],
    minimumPhase: 3
  },
  {
    id: "carla-boots-laundry-manager",
    pageUrl: "web://petplanet.zone/users/catnapcarla/home",
    ownerId: "catnap_carla",
    publishedAt: "1999-10-16T07:42:00",
    title: "MR. BOOTS HAS DECLARED THE LAUNDRY ROOM",
    paragraphs: [
      "Management has selected the warm laundry basket as his new office. I moved the towels once and received a look that could curdle milk. Please remember: cats do not need a reason. They have a schedule, and apparently I am on it."
    ],
    minimumPhase: 1
  },
  {
    id: "carla-keyboard-email-incident",
    pageUrl: "web://petplanet.zone/users/catnapcarla/home",
    ownerId: "catnap_carla",
    publishedAt: "1999-10-23T21:18:00",
    title: "THE KEYBOARD INCIDENT // PLEASE READ",
    paragraphs: [
      "Mr. Boots walked across the keyboard while I was writing an important message and sent twelve pages of the letter 'm'. I am choosing to believe this was his opinion on the neighborhood committee. He then sat on the mouse and closed the window. Seven years old and already running the entire house."
    ],
    minimumPhase: 1
  },
  {
    id: "carla-boots-window-watch",
    pageUrl: "web://petplanet.zone/users/catnapcarla/home",
    ownerId: "catnap_carla",
    publishedAt: "1999-10-30T14:05:00",
    title: "WHO IS IN CHARGE OF THE WINDOW",
    paragraphs: [
      "A very serious update: Mr. Boots watched the same squirrel for twenty minutes, then fell asleep with one paw on the sill. I asked if he was guarding the house. He opened one eye, which I take as a yes. The squirrels know better than to test him."
    ],
    minimumPhase: 1
  },
  {
    id: "carla-hamster-security-notice",
    pageUrl: "web://petplanet.zone/users/catnapcarla/home",
    ownerId: "catnap_carla",
    publishedAt: "1999-11-03T18:36:00",
    title: "PET PLANET SECURITY NOTICE",
    paragraphs: [
      "Mr. Boots has been staring at Hal's hamster photographs again. I have moved the monitor three inches to the left and put a cushion in front of it. This is not overreacting; this is responsible household management. Hal, please tell the little gentleman that Mr. Boots is only curious."
    ],
    minimumPhase: 1
  },
  {
    id: "carla-new-pet-planet-neighbors",
    pageUrl: "web://petplanet.zone/users/catnapcarla/home",
    ownerId: "catnap_carla",
    publishedAt: "1999-11-07T09:18:00",
    title: "WELCOME, NEW PET PLANET NEIGHBORS",
    paragraphs: [
      "There are many new people visiting Pet Planet, so Mr. Boots and I would like to remind everyone that warm laundry is not a public chair. You may share your pet photos, ask questions, and tell us what your animal is doing. Management reads every message after his morning nap."
    ],
    minimumPhase: 2
  },
  {
    id: "carla-old-cat-page-warning",
    pageUrl: "web://petplanet.zone/users/catnapcarla/home",
    ownerId: "catnap_carla",
    publishedAt: "1999-11-11T11:52:00",
    title: "AN OLD CAT PAGE SENT ME A WARNING",
    paragraphs: [
      "A very old account sent a message saying MANAGEMENT SHOULD KEEP THE BLINDS CLOSED. I do not know which management they mean, and Mr. Boots refuses to clarify. He has been staring at the hallway at exactly 11:17, so I am writing this down for the record. The hallway is ordinary. The hallway is probably ordinary."
    ],
    minimumPhase: 3
  },
  {
    id: "carla-byte-barn-catnap",
    pageUrl: "web://petplanet.zone/users/catnapcarla/home",
    ownerId: "catnap_carla",
    publishedAt: "1999-11-13T08:26:00",
    title: "MR. BOOTS APPROVES THE BYTE BARN SONG",
    paragraphs: [
      "The Byte Barn Forever song came on while Mr. Boots was asleep in the basket. He lifted his head exactly on the chorus and then went back to sleep. I believe this is a positive review. Please do not ask him to perform it; he is not available for interviews at this time."
    ],
    minimumPhase: 4
  },
  {
    id: "ray-comet-disc-record",
    pageUrl: "web://petplanet.zone/users/fetchquestray/home",
    ownerId: "fetchquest_ray",
    publishedAt: "1999-10-19T16:11:00",
    title: "COMET QUEST 11 // NEW RECORD",
    paragraphs: [
      "Comet caught eleven flying discs in a row today. Throw twelve was good but the hedge interfered with the mission. I am not counting it as a loss because the hedge is not a dog and therefore cannot win. Comet got a biscuit and I got the disc back after six minutes."
    ],
    minimumPhase: 1
  },
  {
    id: "ray-kiddie-pool-mud-event",
    pageUrl: "web://petplanet.zone/users/fetchquestray/home",
    ownerId: "fetchquest_ray",
    publishedAt: "1999-10-25T15:38:00",
    title: "THE MUD POOL EVENT WAS UNEXPECTED",
    paragraphs: [
      "I filled the kiddie pool because it was hot. Comet stepped in, sat down, and then dug the bottom like there was a secret level under it. He came out looking like a chocolate dog. The towel count is four. Mom says the backyard is not a laboratory. I think it is a very good laboratory."
    ],
    minimumPhase: 1
  },
  {
    id: "ray-shoe-finder-training",
    pageUrl: "web://petplanet.zone/users/fetchquestray/home",
    ownerId: "fetchquest_ray",
    publishedAt: "1999-10-29T18:20:00",
    title: "COMET FINDS THE IMPORTANT SHOE",
    paragraphs: [
      "We practiced sit, stay, and spin. Then Dad asked where his other shoe was and Comet found it immediately, which is a higher difficulty quest than spin. He does not bring the shoe back because he knows that means the game is over. This is clever but not helpful."
    ],
    minimumPhase: 1
  },
  {
    id: "ray-pet-planet-chart",
    pageUrl: "web://petplanet.zone/users/fetchquestray/home",
    ownerId: "fetchquest_ray",
    publishedAt: "1999-11-03T17:05:00",
    title: "COMET'S DAILY QUEST CHART",
    paragraphs: [
      "I made a chart for Comet's daily quests with boxes to check. He has completed breakfast, yard patrol, disc practice, and staring at the mail carrier. The mail carrier is not a quest, but Comet says it is. I like reading everybody's Pet Planet pages because the pets all have different rules."
    ],
    minimumPhase: 1
  },
  {
    id: "ray-new-friends-dog-questions",
    pageUrl: "web://petplanet.zone/users/fetchquestray/home",
    ownerId: "fetchquest_ray",
    publishedAt: "1999-11-07T10:44:00",
    title: "WELCOME NEW DOG PEOPLE",
    paragraphs: [
      "A lot of new people are asking about Comet's disc catches. The important part is waiting until the dog is looking before throwing. Also use a disc that is not cracked. I know this sounds obvious, but I used the cracked one for three days and then it became two discs."
    ],
    minimumPhase: 2
  },
  {
    id: "ray-old-account-comet-name",
    pageUrl: "web://petplanet.zone/users/fetchquestray/home",
    ownerId: "fetchquest_ray",
    publishedAt: "1999-11-11T15:27:00",
    title: "SOMEONE USED COMET'S OLD QUEST NAME",
    paragraphs: [
      "An old account posted a list called COMET QUEST 11, but it used the exact order of our backyard exercises from last month. The account name has an extra underscore and the post says Comet is a girl, which is incorrect. I saved the page and checked the chart. Comet is sleeping under the desk and does not know about this yet."
    ],
    minimumPhase: 3
  },
  {
    id: "ray-byte-barn-fetch-mode",
    pageUrl: "web://petplanet.zone/users/fetchquestray/home",
    ownerId: "fetchquest_ray",
    publishedAt: "1999-11-13T11:41:00",
    title: "BYTE BARN FETCH MODE",
    paragraphs: [
      "Comet does not understand the Byte Barn song but he likes the part where everybody claps. I made a fetch routine for the chorus: throw, catch, return, biscuit. We practiced it seven times and he completed six. The seventh was lost behind the shed, which is now classified as a bonus area."
    ],
    minimumPhase: 4
  },
  {
    id: "bea-tunnel-district-map",
    pageUrl: "web://petplanet.zone/users/bunbrigadebea/home",
    ownerId: "bunbrigade_bea",
    publishedAt: "1999-10-18T14:26:00",
    title: "TUNNEL DISTRICT // NEW MAP",
    paragraphs: [
      "Maple and Mochi have approved the new tunnel district. There are two entrances, one parsley station, and a cardboard room with no windows. Maple tested the route three times while Mochi waited near the exit and watched the hallway. I am not sure why she needs a lookout position, but she is very good at it."
    ],
    minimumPhase: 1
  },
  {
    id: "bea-parsley-timing-drill",
    pageUrl: "web://petplanet.zone/users/bunbrigadebea/home",
    ownerId: "bunbrigade_bea",
    publishedAt: "1999-10-24T17:02:00",
    title: "PARSLEY TIMING EXERCISE",
    paragraphs: [
      "Today we practiced taking the parsley from the blue dish to the green dish in under one minute. Maple is fast but leaves evidence everywhere. Mochi is slower and much more discreet. I told them this is only a household enrichment game. They looked at me as if they had already filed the paperwork."
    ],
    minimumPhase: 1
  },
  {
    id: "bea-cardboard-alibi",
    pageUrl: "web://petplanet.zone/users/bunbrigadebea/home",
    ownerId: "bunbrigade_bea",
    publishedAt: "1999-10-29T19:48:00",
    title: "THE CARDBOARD BOX HAS A NORMAL PURPOSE",
    paragraphs: [
      "The large box in the dining room is for enrichment and absolutely not for transporting anything. It has two exits, a folded blanket, and a small sign that says QUIET PLEASE. Maple can fit inside with room to spare. Mochi refuses to enter until Maple has inspected the corners. This is called teamwork."
    ],
    minimumPhase: 1
  },
  {
    id: "bea-night-garden-route",
    pageUrl: "web://petplanet.zone/users/bunbrigadebea/home",
    ownerId: "bunbrigade_bea",
    publishedAt: "1999-11-03T21:16:00",
    title: "NIGHT GARDEN ROUTE TEST",
    paragraphs: [
      "The garden route is complete. Three hops from the patio, left around the planter, pause by the parsley, then return by the long tunnel. We tested it after dark with the porch light on. Maple arrived early. Mochi arrived exactly on time. I am keeping the schedule in a locked notebook because the rabbits are not ready for outside consultants."
    ],
    minimumPhase: 1
  },
  {
    id: "bea-new-members-briefing",
    pageUrl: "web://petplanet.zone/users/bunbrigadebea/home",
    ownerId: "bunbrigade_bea",
    publishedAt: "1999-11-07T13:37:00",
    title: "WELCOME, BUT PLEASE DO NOT DISTURB THE OPERATION",
    paragraphs: [
      "There are new visitors in Pet Planet, so a reminder: the Bun Brigade is a private rabbit enrichment project. Do not move the boxes, touch the parsley ledger, or ask why Maple has been practicing the same hallway turn. You may look at the pictures. You may leave kind comments. The rabbits will decide who gets a tour."
    ],
    minimumPhase: 2
  },
  {
    id: "bea-old-account-blueprint",
    pageUrl: "web://petplanet.zone/users/bunbrigadebea/home",
    ownerId: "bunbrigade_bea",
    publishedAt: "1999-11-11T17:42:00",
    title: "THE OLD BLUEPRINT KNOWS TOO MUCH",
    paragraphs: [
      "An old account posted a blueprint that is almost identical to our tunnel district, including the hidden parsley station. It calls Maple the coordinator and Mochi the lookout. I did not upload that drawing. Maple has been sitting beside the locked notebook all morning, and Mochi keeps checking the window. We are postponing tonight's exercise."
    ],
    minimumPhase: 3
  },
  {
    id: "bea-byte-barn-distraction",
    pageUrl: "web://petplanet.zone/users/bunbrigadebea/home",
    ownerId: "bunbrigade_bea",
    publishedAt: "1999-11-13T12:58:00",
    title: "THE BUN BRIGADE TAKES A BREAK",
    paragraphs: [
      "The Byte Barn song is playing in the kitchen and the rabbits have abandoned the route to listen. Maple is tapping one foot. Mochi is pretending not to. The operation is paused until the chorus ends, which is convenient because somebody moved the green dish and nobody is admitting it."
    ],
    minimumPhase: 4
  },
  {
    id: "hal-tubenet-node-expansion",
    pageUrl: "web://petplanet.zone/users/hamcamhal/home",
    ownerId: "hamcam_hal",
    publishedAt: "1999-10-17T20:14:00",
    title: "TUBENET NODE 17 HAS EXPANDED",
    paragraphs: [
      "The habitat now contains seventeen modules, two observation windows, and one forbidden corridor. Widget entered the maze at 7:03 PM and completed the first section in 51 seconds. He then sat in the corner and washed his face, presumably to conceal the true results. I have logged this as a deliberate act of scientific misdirection."
    ],
    minimumPhase: 1
  },
  {
    id: "hal-trial-14b-results",
    pageUrl: "web://petplanet.zone/users/hamcamhal/home",
    ownerId: "hamcam_hal",
    publishedAt: "1999-10-23T19:27:00",
    title: "MAZE TRIAL 14-B // THE SUBJECT ESCAPES",
    paragraphs: [
      "Trial 14-B was designed to measure snack retrieval under controlled conditions. Widget completed the maze in 43 seconds, located the sunflower seed, and then made an unauthorized exit through a gap that did not exist during inspection. I am not saying he has a secret route. I am saying the cabinet latch has been questioned."
    ],
    minimumPhase: 1
  },
  {
    id: "hal-kitchen-timer-protocol",
    pageUrl: "web://petplanet.zone/users/hamcamhal/home",
    ownerId: "hamcam_hal",
    publishedAt: "1999-10-28T16:49:00",
    title: "KITCHEN TIMER PROTOCOL REVISED",
    paragraphs: [
      "The digital kitchen timer is now mounted above the test chamber. This prevents the researcher from stopping the clock with his elbow while recording data. Widget has requested fewer observers, more bedding, and a trial involving a paper towel. The request has been denied pending review by the ethics committee, which is currently asleep in the bedding module."
    ],
    minimumPhase: 1
  },
  {
    id: "hal-mystery-paper-scrap",
    pageUrl: "web://petplanet.zone/users/hamcamhal/home",
    ownerId: "hamcam_hal",
    publishedAt: "1999-11-03T20:22:00",
    title: "THE PAPER SCRAP KNOWS THE WAY OUT",
    paragraphs: [
      "Widget has moved a paper scrap between nodes 4, 9, and 17 in a repeating pattern. I assumed this was nesting behavior. Then he completed Maze Trial 16-C without touching the walls and stopped beside the scrap. I have placed the paper in an evidence envelope. Widget has been cleared of wrongdoing but remains a person of interest."
    ],
    minimumPhase: 1
  },
  {
    id: "hal-new-research-assistants",
    pageUrl: "web://petplanet.zone/users/hamcamhal/home",
    ownerId: "hamcam_hal",
    publishedAt: "1999-11-07T15:08:00",
    title: "NEW RESEARCH ASSISTANTS HAVE ARRIVED",
    paragraphs: [
      "Pet Planet has attracted new observers. You may review the maze charts, but please do not shout instructions at Widget through the monitor. The subject performs better with a quiet room, fresh bedding, and a reward after the trial. Also, do not suggest adding lasers. I have already received three such suggestions."
    ],
    minimumPhase: 2
  },
  {
    id: "hal-retired-protocol-awakens",
    pageUrl: "web://petplanet.zone/users/hamcamhal/home",
    ownerId: "hamcam_hal",
    publishedAt: "1999-11-11T19:11:00",
    title: "TRIAL 04-A HAS RETURNED FROM STORAGE",
    paragraphs: [
      "A retired account posted the exact node order from Trial 04-A, including the false door Widget used to ignore me in 1998. The username is almost mine but the final character is a zero. I did not publish that trial. Widget has entered the paper tunnel and is refusing to come out until the lights are off."
    ],
    minimumPhase: 3
  },
  {
    id: "hal-byte-barn-control-group",
    pageUrl: "web://petplanet.zone/users/hamcamhal/home",
    ownerId: "hamcam_hal",
    publishedAt: "1999-11-13T17:24:00",
    title: "BYTE BARN CONTROL GROUP",
    paragraphs: [
      "The Byte Barn song is now the control sound for the maze. Widget hears the chorus and immediately chooses the left tunnel, which is statistically impressive but may be because the right tunnel contains his dinner. I am repeating the trial tomorrow. The subject appears pleased with the music and has overturned one chart."
    ],
    minimumPhase: 4
  },
  {
    id: "iris-gomez-basking-portrait",
    pageUrl: "web://petplanet.zone/users/iguanairis/home",
    ownerId: "iguana_iris",
    publishedAt: "1999-10-18T22:11:00",
    title: "GOMEZ STARES INTO THE VOID",
    paragraphs: [
      "New portrait of Gomez under the basking lamp. He has the expression of someone who has seen the end of the universe and found it poorly organized. The flash was off. The enclosure was clean. The little black outfit was mine, not his. He has declined to comment."
    ],
    minimumPhase: 1
  },
  {
    id: "iris-salad-of-doom",
    pageUrl: "web://petplanet.zone/users/iguanairis/home",
    ownerId: "iguana_iris",
    publishedAt: "1999-10-24T20:36:00",
    title: "THE SALAD OF DOOM HAS BEEN SERVED",
    paragraphs: [
      "Tonight's bowl contained collard greens, mustard greens, and one leaf Gomez rejected with the silent contempt of a tiny landlord. He ate everything else while I played gloomy music and pretended this was a ritual. It was not a ritual. It was dinner. The distinction is important to responsible reptile people."
    ],
    minimumPhase: 1
  },
  {
    id: "iris-terrarium-no-shoulder-access",
    pageUrl: "web://petplanet.zone/users/iguanairis/home",
    ownerId: "iguana_iris",
    publishedAt: "1999-10-30T18:54:00",
    title: "NO, GOMEZ IS NOT A SHOULDER ACCESSORY",
    paragraphs: [
      "A person at the pet store asked if Gomez could ride on their shoulder for a photograph. Gomez can do many things. He can climb, bask, reject a leaf, and judge a stranger from across the room. He is not a fashion accessory. Please stop trying to turn living animals into props for your tragic scrapbook."
    ],
    minimumPhase: 1
  },
  {
    id: "iris-midnight-basking-club",
    pageUrl: "web://petplanet.zone/users/iguanairis/home",
    ownerId: "iguana_iris",
    publishedAt: "1999-11-03T23:18:00",
    title: "MIDNIGHT BASKING CLUB // MEMBERSHIP: ONE",
    paragraphs: [
      "It is 11:18 PM and Gomez is still under the lamp like a green gargoyle guarding the last warm place on earth. I tried to explain the concept of bedtime. He blinked once. The club remains exclusive. Applicants must provide a roomy enclosure, proper lighting, and no stupid questions."
    ],
    minimumPhase: 1
  },
  {
    id: "iris-new-pet-planet-darkness",
    pageUrl: "web://petplanet.zone/users/iguanairis/home",
    ownerId: "iguana_iris",
    publishedAt: "1999-11-07T21:42:00",
    title: "WELCOME TO THE DARK SIDE OF PET PLANET",
    paragraphs: [
      "New people keep arriving and asking if Gomez is friendly. Gomez is calm. There is a difference. Read the care notes before you decide an exotic animal would improve your bedroom aesthetic. If you do it right, the reptile will outlive your current music phase and remember none of your embarrassing poetry."
    ],
    minimumPhase: 2
  },
  {
    id: "iris-gomez-sees-the-old-page",
    pageUrl: "web://petplanet.zone/users/iguanairis/home",
    ownerId: "iguana_iris",
    publishedAt: "1999-11-11T22:33:00",
    title: "GOMEZ HAS SEEN THE OLD PAGE",
    paragraphs: [
      "An old account posted a picture of an enclosure that looks like mine, down to the crooked black sticker on the lamp stand. Gomez stared at the screen for six minutes and then moved to the far corner. The username has one extra letter. I am not saying the lizard knows something. I am saying he has better instincts than most people here."
    ],
    minimumPhase: 3
  },
  {
    id: "iris-byte-barn-goth-remix",
    pageUrl: "web://petplanet.zone/users/iguanairis/home",
    ownerId: "iguana_iris",
    publishedAt: "1999-11-13T20:17:00",
    title: "BYTE BARN, BUT MAKE IT FUNEREAL",
    paragraphs: [
      "I found a slow, gloomy Byte Barn cover and played it at low volume while Gomez basked. He did not move, which is the highest compliment available from an iguana. I am calling this a collaboration. He is calling it Tuesday."
    ],
    minimumPhase: 4
  },
  {
    id: "sam-pepper-cereal-cabinet",
    pageUrl: "web://petplanet.zone/users/skunkunclesam/home",
    ownerId: "skunkuncle_sam",
    publishedAt: "1999-10-19T07:18:00",
    title: "CABINET INCIDENT REPORT 01",
    paragraphs: [
      "Pepper opened the cereal cabinet at 6:52 AM, rejected the cereal, and removed one wooden spoon. I have installed a temporary latch and a small sign requesting that household members stop leaving evidence on the counter. Pepper is not a wild skunk. Pepper is a legally kept domestic skunk and a very determined kitchen inspector."
    ],
    minimumPhase: 1
  },
  {
    id: "sam-floral-bed-surveillance",
    pageUrl: "web://petplanet.zone/users/skunkunclesam/home",
    ownerId: "skunkuncle_sam",
    publishedAt: "1999-10-26T21:03:00",
    title: "THE FLORAL BED HAS BEEN COMPROMISED",
    paragraphs: [
      "Pepper ignored the three expensive beds and slept in the floral one again. I placed a decoy blanket beside it to determine whether this was a comfort preference or a statement. Pepper moved the decoy blanket to the hallway and returned to the floral bed. The results are conclusive but not flattering to my furniture budget."
    ],
    minimumPhase: 1
  },
  {
    id: "sam-yard-patrol-log",
    pageUrl: "web://petplanet.zone/users/skunkunclesam/home",
    ownerId: "skunkuncle_sam",
    publishedAt: "1999-10-31T16:24:00",
    title: "SUPERVISED YARD PATROL // NO INCIDENTS",
    paragraphs: [
      "Pepper completed the supervised yard patrol and inspected the compost bin, the lower fence, and my left boot. I said good morning to a neighbor and then forgot the rest of the conversation. Pepper did not forget. Pepper kept watching the gate until I secured the latch. A person must respect the perimeter."
    ],
    minimumPhase: 1
  },
  {
    id: "sam-latch-revision-four",
    pageUrl: "web://petplanet.zone/users/skunkunclesam/home",
    ownerId: "skunkuncle_sam",
    publishedAt: "1999-11-03T14:44:00",
    title: "CABINET LATCH REVISION FOUR",
    paragraphs: [
      "Revision Four is installed. Hal contributed a useful diagram and Pepper contributed a demonstration of lateral persistence. The latch held for eleven minutes. Pepper then opened it while looking directly at me. I am not discouraged. I am documenting a sophisticated domestic security challenge and will be asking the kitchen cabinet to remain calm."
    ],
    minimumPhase: 1
  },
  {
    id: "sam-new-pet-planet-meeting",
    pageUrl: "web://petplanet.zone/users/skunkunclesam/home",
    ownerId: "skunkuncle_sam",
    publishedAt: "1999-11-07T16:21:00",
    title: "WELCOME, AND PLEASE DO NOT BRING A LOOSE SPOON",
    paragraphs: [
      "New people have arrived at Pet Planet. I am glad to see the interest, but please remember that unusual pets require research, secure care, and a willingness to be ignored in your own home. Pepper and I are considering a meeting for responsible owners. The agenda currently contains latches, bedding, and whether a wooden spoon can be considered a toy."
    ],
    minimumPhase: 2
  },
  {
    id: "sam-old-account-kitchen-report",
    pageUrl: "web://petplanet.zone/users/skunkunclesam/home",
    ownerId: "skunkuncle_sam",
    publishedAt: "1999-11-11T20:48:00",
    title: "AN OLD ACCOUNT FILED A KITCHEN REPORT",
    paragraphs: [
      "A retired account posted the exact time Pepper opened the cereal cabinet last spring. It called him 'the black-and-white operative,' which is not terminology I use in this house. The username is missing one letter and the report ends with a note about the north window. Pepper has spent the evening facing that window. I have checked the lock twice."
    ],
    minimumPhase: 3
  },
  {
    id: "sam-byte-barn-spoon-theory",
    pageUrl: "web://petplanet.zone/users/skunkunclesam/home",
    ownerId: "skunkuncle_sam",
    publishedAt: "1999-11-13T18:42:00",
    title: "BYTE BARN AND THE SPOON THEORY",
    paragraphs: [
      "Pepper stole a wooden spoon during the Byte Barn song and returned it precisely when the chorus ended. I am not claiming the music caused the event. I am recording a possible correlation between catchy jingles and household utensil displacement. The spoon is clean. Pepper is asleep in the floral bed. I will continue the investigation tomorrow."
    ],
    minimumPhase: 4
  },
  {
    id: "mel-episode-crooked-rain-barrel",
    pageUrl: "web://fanverse.zone/users/mossmunchmel/home",
    ownerId: "mossmunch_mel",
    publishedAt: "1999-10-15T19:22:00",
    title: "EPISODE 03 // THE CROOKED RAIN BARREL",
    paragraphs: [
      "THIS ONE IS SUCH A PERFECT STARTER EPISODE!!! The Moonlings need rainwater for their lantern garden, but their little crooked barrel rolls uphill whenever anyone turns around. MossMunch chases it through puddle meadows with his satchel flapping, Pipglow keeps trying to politely ask the barrel to stop, and Brindlebug discovers its wheel tracks make the exact shape of the old marsh boundary. The Dry Mayor tries to declare rainwater municipal property (of course he does), but MossMunch just tips the barrel back into the bog and it finally rests. The whole thing feels like a rainy afternoon story someone told you when you were little. Also the barrel makes a happy BWOOP noise."
    ],
    minimumPhase: 1
  },
  {
    id: "mel-episode-pipglow-shadow",
    pageUrl: "web://fanverse.zone/users/mossmunchmel/home",
    ownerId: "mossmunch_mel",
    publishedAt: "1999-10-22T21:08:00",
    title: "EPISODE 08 // PIPGLOW LOSES HER SHADOW",
    paragraphs: [
      "Pipglow wakes up with NO SHADOW, which is scary but also somehow adorable because she keeps waving at the ground like it might wave back. Then the shadow starts appearing in places she has never been: in a teacup on the moss porch, inside Brindlebug's map tube, under the Cattail Bridge where the water looks like stars. MossMunch leaves glowing leaf crumbs all through the tunnels so it can find its way home. The Dry Mayor says a shadow needs a filing number, which is obviously nonsense. When Pipglow and her shadow finally hug, it turns into a giant moon-shaped silhouette over the bog. And then there is that TINY EXTRA SHADOW under the bridge. WHY. I love this show so much."
    ],
    minimumPhase: 1
  },
  {
    id: "mel-episode-dry-mayor-loses-key",
    pageUrl: "web://fanverse.zone/users/mossmunchmel/home",
    ownerId: "mossmunch_mel",
    publishedAt: "1999-10-29T18:47:00",
    title: "EPISODE 14 // THE DRY MAYOR LOSES THE KEY",
    paragraphs: [
      "The Dry Mayor loses the brass key to the Municipal Door and announces that the ENTIRE BOG is closed until further notice. Like that is a thing he can do! So MossMunch, Pipglow, and Brindlebug spend the episode looking for it in impossible little rooms that only appear when you are not looking at them directly. There is a wonderful bit where Brindlebug's map keeps drawing new hallways underneath his feet. MossMunch finds the key in the Mayor's own tall wooden hat, but he will not give it back until the Mayor says doors are for sharing. The Mayor actually says it!!! Then, right at the end, the Moonlings hum the seven-note moon song without Pipglow leading them. It is maybe two seconds long and it is BEAUTIFUL."
    ],
    minimumPhase: 1
  },
  {
    id: "mel-episode-lantern-under-bog-seven",
    pageUrl: "web://fanverse.zone/users/mossmunchmel/home",
    ownerId: "mossmunch_mel",
    publishedAt: "1999-11-03T20:12:00",
    title: "EPISODE 19 // THE LANTERN UNDER BOG SEVEN",
    paragraphs: [
      "OKAY. EPISODE 19 IS THE ONE. A tiny lantern floats out of the reeds and leads MossMunch below Bog Seven, where there is a round room full of moon maps painted on old leaves. Every map has a different number of moons. Brindlebug opens his little cartographer case and, for FOUR FRAMES in my tape, there is a seventh moon symbol glowing behind his wing. Pipglow says, very quietly, 'It is not missing. It is waiting.' The Dry Mayor wants the whole place boarded up because he is afraid of anything without a permit, but MossMunch brings the lantern home in his satchel anyway. I have watched this episode nineteen times and I will watch it nineteen more."
    ],
    minimumPhase: 1
  },
  {
    id: "mel-new-fans-episode-guide",
    pageUrl: "web://fanverse.zone/users/mossmunchmel/home",
    ownerId: "mossmunch_mel",
    publishedAt: "1999-11-07T14:09:00",
    title: "NEW FANS: START WITH THE RAIN BARREL",
    paragraphs: [
      "HI NEW MOSS-MUNCHERS!!! I made a friendly first-watch route: start with The Crooked Rain Barrel because it has everybody being their truest self, then The Dry Mayor Loses the Key for the best magical-door nonsense, then Episode 19 when you are ready for the moon-map feelings. Do not worry if the continuity seems slippery. In this show, maps can be shy, shadows can get homesick, and doors sometimes need encouragement. That is what makes it special. There are twenty-six confirmed episodes, plus one rumored special that is emotionally and spiritually confirmed until somebody proves otherwise."
    ],
    minimumPhase: 2
  },
  {
    id: "mel-old-tape-episode-27",
    pageUrl: "web://fanverse.zone/users/mossmunchmel/home",
    ownerId: "mossmunch_mel",
    publishedAt: "1999-11-11T20:06:00",
    title: "THE OLD ACCOUNT REMEMBERS EPISODE 27",
    paragraphs: [
      "A retired account just posted about a scene I have only ever seen for half a second on my damaged tape: MossMunch standing under a seventh moon while Pipglow says, 'You came back early.' It called it Episode 27. THERE ARE ONLY TWENTY-SIX CONFIRMED EPISODES. The post also says Brindlebug drew the map backward, which is exactly what my older cousin said happened in the lost special when she saw it once at a sleepover. I checked my frame notes three times. The seventh moon is still there. I do not know if this is a clue, a coincidence, or a miracle, but I am keeping my VCR plugged in tonight."
    ],
    minimumPhase: 3
  },
  {
    id: "mel-byte-barn-moonlings-review",
    pageUrl: "web://fanverse.zone/users/mossmunchmel/home",
    ownerId: "mossmunch_mel",
    publishedAt: "1999-11-13T15:36:00",
    title: "THE MOONLINGS HEAR THE BYTE BARN SONG",
    paragraphs: [
      "I was sewing the last strap onto my MossMunch plush satchel while one of the Byte Barn covers played, and I noticed the chorus climbs almost exactly like the Moonlings' seven-note hum from Episode 14! It is probably just a coincidence, but now I cannot stop imagining the Moonlings dancing around a computer store with little lanterns. MossMunch would absolutely think every song needs a warm place to land. Pipglow would add sparkles. Brindlebug would map the rhythm. The Dry Mayor would require a permit for dancing, which is why nobody would invite him."
    ],
    minimumPhase: 4
  },
  {
    id: "trent-blipzo-review-one",
    pageUrl: "web://fanverse.zone/users/blipzobeliever88/home",
    ownerId: "blipzo_believer_88",
    publishedAt: "1999-10-16T18:42:00",
    title: "BLIPZO! MALL DIMENSION IS STILL THE BEST",
    paragraphs: [
      "I replayed the first game again and it is STILL amazing. Blipzo falls out of the ceiling into the Food Court Eclipse with a shopping-basket helmet, no map, and a receipt-ribbon yo-yo, then immediately starts helping every weird mall person he meets. Kiosk Kid rolls around giving directions that are technically true but never helpful enough. LeaseLord keeps trying to evict an ALIEN from a mall that is clearly in another dimension. Please play this game before saying the graphics look weird. The graphics are the point."
    ],
    minimumPhase: 1
  },
  {
    id: "trent-seven-escalator-evidence",
    pageUrl: "web://fanverse.zone/users/blipzobeliever88/home",
    ownerId: "blipzo_believer_88",
    publishedAt: "1999-10-23T20:07:00",
    title: "THE SEVENTH ESCALATOR IS NOT A MISTAKE",
    paragraphs: [
      "I compared the magazine demo to the retail release with my VCR paused on both screens. The demo has SEVEN escalators in the center mall. Retail only has six. The seventh one points straight at the black doorway behind the smoothie kiosk. That doorway has collision on three sides and a loaded texture behind it. I am not saying Store 00 is definitely there. I am saying nobody spends eighteen polygons on an empty black door by accident."
    ],
    minimumPhase: 1
  },
  {
    id: "trent-kiosk-kid-review",
    pageUrl: "web://fanverse.zone/users/blipzobeliever88/home",
    ownerId: "blipzo_believer_88",
    publishedAt: "1999-10-30T17:34:00",
    title: "KIOSK KID IS THE REAL HERO",
    paragraphs: [
      "Everybody talks about Blipzo, but Kiosk Kid is carrying the whole story. In the arcade wing, he gives you a map with one corridor crossed out. In the toy store, he says, 'THE DIRECTORY CHANGES AFTER CLOSING.' Then in the final level, when LeaseLord locks every shop, Kiosk Kid rolls through a wall and says nothing about it. NOTHING. He knows the mall has extra floors. He knows Store 00. Kiosk Kid fans please email me because I have theories and graph paper."
    ],
    minimumPhase: 1
  },
  {
    id: "trent-after-closing-review",
    pageUrl: "web://fanverse.zone/users/blipzobeliever88/home",
    ownerId: "blipzo_believer_88",
    publishedAt: "1999-11-03T21:24:00",
    title: "AFTER CLOSING // MY NEW STORY IS UP",
    paragraphs: [
      "I finished revision three of After Closing! It is about Kiosk Kid waking up at 12:01 AM with no customers, no map, and one receipt printing from Store 00. Blipzo follows the receipt downstairs because he is brave/stupid in the best way. There is a LeaseLord redemption scene because I think he is mostly scared of the mall being empty. QuarterQueen says that is not mechanically supported by the boss fight. She is wrong but respectfully wrong."
    ],
    minimumPhase: 1
  },
  {
    id: "trent-new-players-store-zero",
    pageUrl: "web://fanverse.zone/users/blipzobeliever88/home",
    ownerId: "blipzo_believer_88",
    publishedAt: "1999-11-07T18:03:00",
    title: "NEW PLAYERS: YES, YOU SHOULD CHECK STORE 00",
    paragraphs: [
      "A bunch of new people are finding the page, which means it is time for the official beginner guide. First, play the game normally because it rules. Then replay Food Court Eclipse and watch the black doorway after the smoothie kiosk. Then find a copy of the magazine demo if you can. Store 00 is UNCONFIRMED, not fake. That is a very important difference. If everybody checks one detail, eventually somebody will find the thing nobody else noticed."
    ],
    minimumPhase: 2
  },
  {
    id: "trent-old-save-file-store-zero",
    pageUrl: "web://fanverse.zone/users/blipzobeliever88/home",
    ownerId: "blipzo_believer_88",
    publishedAt: "1999-11-11T23:02:00",
    title: "AN OLD ACCOUNT HAS A STORE 00 SAVE FILE",
    paragraphs: [
      "An old account posted a screenshot of Blipzo standing somewhere I have NEVER seen: a carpeted room with the mall ceiling upside down and a directory that says STORE 00. The filename says BL1PZ0-SAVE, which is suspicious, and the account only has one extra underscore in the name. But the receipt-ribbon meter is real. I know the meter. I have stared at this screen for forty minutes. Either somebody made the best fake in history or the mall is bigger than we thought."
    ],
    minimumPhase: 3
  },
  {
    id: "trent-byte-barn-mall-theory",
    pageUrl: "web://fanverse.zone/users/blipzobeliever88/home",
    ownerId: "blipzo_believer_88",
    publishedAt: "1999-11-13T19:28:00",
    title: "BYTE BARN IS BASICALLY A REAL BLIPZO STORE",
    paragraphs: [
      "The Byte Barn song is everywhere now and I finally understand why it feels familiar: it is EXACTLY the kind of jingle that would play in a Blipzo mall shop before the lights go out. Somebody needs to make a Store 00 remix with Kiosk Kid samples. I would do it myself, but my tape deck keeps eating the good cassette. Also if the Byte Barn CD has a hidden track, PLEASE check it. This is not a joke. It is a medium-sized theory."
    ],
    minimumPhase: 4
  },
  {
    id: "tess-snow-fell-upward-memory",
    pageUrl: "web://fanverse.zone/users/tapeattictess/home",
    ownerId: "tapeattic_tess",
    publishedAt: "1999-10-17T20:16:00",
    title: "THE SNOW THAT FELL UPWARD",
    paragraphs: [
      "This was the episode everybody around here remembers, even if they do not remember the title. Professor StarThimble opens Drawer 14 and snow starts drifting up through the kitchen ceiling. Luma puts on her tiny rain boots anyway. Mayor Barometer spends most of the episode insisting the weather is behaving correctly because he has already printed the forecast. The effects are visibly cotton and reverse film, but the last shot of the whole town watching snow disappear into the stars is still beautiful."
    ],
    minimumPhase: 1
  },
  {
    id: "tess-thunder-in-a-teacup-memory",
    pageUrl: "web://fanverse.zone/users/tapeattictess/home",
    ownerId: "tapeattic_tess",
    publishedAt: "1999-10-24T18:39:00",
    title: "THUNDER IN A TEACUP // TAPE 06",
    paragraphs: [
      "I found another copy of Thunder in a Teacup, the one where Luma catches a tiny thunderstorm in the Professor's blue teacup and it keeps interrupting everybody's sentences with little lightning flashes. My favorite part is when the Professor calmly puts a saucer over it and says, 'Weather, like company, prefers an invitation.' It is not a huge plot episode. It is just a strange, cozy half hour that feels like coming home from school."
    ],
    minimumPhase: 1
  },
  {
    id: "tess-wind-in-the-attic-memory",
    pageUrl: "web://fanverse.zone/users/tapeattictess/home",
    ownerId: "tapeattic_tess",
    publishedAt: "1999-10-31T19:04:00",
    title: "THE WIND IN THE ATTIC // THE LOCAL VERSION",
    paragraphs: [
      "The Bellwater station copy of The Wind in the Attic has a little extra scene after the credits where Luma gets tangled in a paper mobile and Mayor Barometer pretends not to laugh. It is only about twenty seconds, but I have never seen it on any of the out-of-town tapes. Maybe the station needed to fill time. Maybe someone found it funny. Either way, this is why I label everything before trading copies. Tiny differences are how the good memories survive."
    ],
    minimumPhase: 1
  },
  {
    id: "tess-weather-cabinet-sound-memory",
    pageUrl: "web://fanverse.zone/users/tapeattictess/home",
    ownerId: "tapeattic_tess",
    publishedAt: "1999-11-03T16:51:00",
    title: "THE CABINET LATCH SOUND",
    paragraphs: [
      "I was rewinding a partial recording and heard the Weather Cabinet latch click before Professor StarThimble even touched it. It might be a tape splice. It might be the puppet operator shifting something off camera. But I like that the show always made the cabinet feel a little older than the room around it, like it had been waiting through many forecasts for someone kind enough to open the right drawer."
    ],
    minimumPhase: 1
  },
  {
    id: "tess-new-weather-cabinet-viewers",
    pageUrl: "web://fanverse.zone/users/tapeattictess/home",
    ownerId: "tapeattic_tess",
    publishedAt: "1999-11-07T12:44:00",
    title: "IF YOU REMEMBER THIS SHOW, PLEASE WRITE",
    paragraphs: [
      "Some new people are finding the attic archive, which is lovely. If you watched StarThimble when it was on, tell me what you remember—especially the weather specials, station bumpers, or whether your copy had the blue or yellow tape leader. You do not need to solve a mystery. Sometimes it is enough to learn that someone else remembers Luma's rain boots or the Professor's giant paper moon."
    ],
    minimumPhase: 2
  },
  {
    id: "tess-old-account-weather-special",
    pageUrl: "web://fanverse.zone/users/tapeattictess/home",
    ownerId: "tapeattic_tess",
    publishedAt: "1999-11-11T21:14:00",
    title: "SOMEONE ELSE REMEMBERS THE WEATHER SPECIAL",
    paragraphs: [
      "An old account mentioned a weather special that was labeled DO NOT AIR, and described the opening clock running backward. That is exactly what Kip asked about. The account's details are oddly specific, but its station call letters do not match any local listing I can find. I am marking this as PARTIAL, not proof. Still, I have put a blank tape in the VCR just in case the rerun schedule surprises us."
    ],
    minimumPhase: 3
  },
  {
    id: "tess-byte-barn-weather-memory",
    pageUrl: "web://fanverse.zone/users/tapeattictess/home",
    ownerId: "tapeattic_tess",
    publishedAt: "1999-11-13T14:18:00",
    title: "THE BYTE BARN SONG SOUNDS LIKE A STATION BREAK",
    paragraphs: [
      "The Byte Barn songs are everywhere now, and one of the brighter covers keeps reminding me of the little music that played before our local StarThimble reruns. Not the same melody, just the same feeling: a strange commercial, a warm television, and the sense that something interesting might come on after the weather. I like that a silly old tune can still make people remember things together."
    ],
    minimumPhase: 4
  },
  {
    id: "aya-prism-five-pilot-review",
    pageUrl: "web://fanverse.zone/users/prismpilotaya/home",
    ownerId: "prismpilot_aya",
    publishedAt: "1999-10-16T21:13:00",
    title: "EPISODE 01 // FIVE COLORS, ONE BROKEN SKY",
    paragraphs: [
      "The first episode is perfect because it does not pretend the team is already friends. Rose wants to charge straight at the mirror storm, Azure wants a plan, Citrine is trying to make everyone laugh, Viridian quietly fixes the broken prism gate, and Violet is standing in the back like she has already seen the ending. Then Gleam falls out of the sky with that impossible transparent tail and chooses all five of them. The transformation is gorgeous, but the best part is Rose reaching for Violet's hand before Violet can walk away. YES, I NOTICED."
    ],
    minimumPhase: 1
  },
  {
    id: "aya-azure-rose-episode-four",
    pageUrl: "web://fanverse.zone/users/prismpilotaya/home",
    ownerId: "prismpilot_aya",
    publishedAt: "1999-10-22T19:46:00",
    title: "EPISODE 04 // AZURE AND ROSE ARE NOT FIGHTING ABOUT TACTICS",
    paragraphs: [
      "People say Episode 4 is just the one where Azure and Rose argue about who leads the bridge rescue. That is technically what happens. But Azure is scared Rose will get hurt, and Rose is scared everyone will stop trusting her if she is not brave every second. Watch the scene after the battle where Azure repairs Rose's cracked badge without saying a word. Rose does not say thank you. She just keeps the badge in her pocket for the rest of the episode. That is relationship writing."
    ],
    minimumPhase: 1
  },
  {
    id: "aya-violet-knight-episode-seven",
    pageUrl: "web://fanverse.zone/users/prismpilotaya/home",
    ownerId: "prismpilot_aya",
    publishedAt: "1999-10-28T22:02:00",
    title: "EPISODE 07 // VIOLET KNIGHT'S EMPTY ROOM",
    paragraphs: [
      "Violet's episode hurts in the best possible way. The team gets pulled into a mirror version of her old room, where every object remembers something she refused to say out loud. Gleam finds a little paper star behind the bed and Violet nearly breaks down over it. Then Null Regent appears in the mirror and calls her 'the remaining color.' The dub says Blue Wizard here, which is WRONG and I will die on this hill. The original title means something closer to 'unlit regent,' which changes everything about why Violet will not use the final attack."
    ],
    minimumPhase: 1
  },
  {
    id: "aya-gleam-tail-theory",
    pageUrl: "web://fanverse.zone/users/prismpilotaya/home",
    ownerId: "prismpilot_aya",
    publishedAt: "1999-11-03T20:38:00",
    title: "GLEAM'S TAIL IS A MAP. I HAVE CHARTS.",
    paragraphs: [
      "Gleam's prism tail changes shape in every transformation episode, and I finally lined up the stills from all twelve episodes. The pieces make a circle with one clear space in the middle. Not a sixth Knight. I still think the clear space is for the viewer, because the finale badge reflects six colors after the rainbow shatters and Gleam looks directly at the screen. Is this an emotional theory? Yes. Is it supported by six charts and three bootleg magazines? Also yes."
    ],
    minimumPhase: 1
  },
  {
    id: "aya-new-chroma-knights-watch-guide",
    pageUrl: "web://fanverse.zone/users/prismpilotaya/home",
    ownerId: "prismpilot_aya",
    publishedAt: "1999-11-07T16:36:00",
    title: "NEW VIEWERS: PLEASE WATCH THE WHOLE TEAM",
    paragraphs: [
      "Welcome to everybody finding PRISM//5! The fights are great, but please do not reduce it to power levels. Watch who stands beside whom after a battle. Watch Citrine hand Viridian a snack when she is overwhelmed. Watch Rose and Azure learn how to apologize. Watch Violet choose not to become the person Null Regent expects. The show is only twelve episodes, which means every tiny look is doing work. Also the bootleg toys are cute and I will hear no disrespect."
    ],
    minimumPhase: 2
  },
  {
    id: "aya-old-account-clear-badge",
    pageUrl: "web://fanverse.zone/users/prismpilotaya/home",
    ownerId: "prismpilot_aya",
    publishedAt: "1999-11-11T23:17:00",
    title: "AN OLD ACCOUNT POSTED FRAME 05",
    paragraphs: [
      "An old account posted the exact Frame 05 from Rose's transformation, but the image has six bell strikes marked around the clear outline between Violet and Rose. I have never posted that crop. The account name is nearly correct except for one letter, and it claims the clear badge belongs to 'the one watching.' That is VERY close to my theory, which is flattering and also deeply weird. I am saving the image before it disappears."
    ],
    minimumPhase: 3
  },
  {
    id: "aya-byte-barn-clear-is-not-a-color",
    pageUrl: "web://fanverse.zone/users/prismpilotaya/home",
    ownerId: "prismpilot_aya",
    publishedAt: "1999-11-13T18:56:00",
    title: "BYTE BARN REMIX // CLEAR IS NOT A COLOR",
    paragraphs: [
      "I found a Byte Barn remix with this bright little synth rise before the chorus and it made me think of the PRISM//5 transformation music. So I wrote a new chapter of Clear Is Not a Color where the team hears a song from outside the mirror world and realizes people are still looking for them. Is that dramatic? Yes. Is it exactly why cartoons matter? Also yes."
    ],
    minimumPhase: 4
  },
  {
    id: "ron-road-warrior-breakfast-run",
    pageUrl: "web://yesterday.zone/users/roadhogron/home",
    ownerId: "road_hog_ron",
    publishedAt: "1999-10-16T10:42:00",
    title: "REAL ROAD WARRIORS EAT BREAKFAST",
    paragraphs: [
      "RAN BLACK BETTY OUT TO MARCYS COUNTRY SKILLET. 18 MILES ROUND TRIP. Some people think thats not a real ride but those people probably ride a couch all day. Had a Denver omelet and talked motorcycles with the waitress. She said nice bike which is basically respect. THE WEEKEND THUNDER RIDERS KNOW WHAT FREEDOM IS."
    ],
    minimumPhase: 1
  },
  {
    id: "ron-life-advice-chrome",
    pageUrl: "web://yesterday.zone/users/roadhogron/home",
    ownerId: "road_hog_ron",
    publishedAt: "1999-10-24T17:18:00",
    title: "LIFE ADVICE FROM THE OPEN ROAD",
    paragraphs: [
      "PEOPLE ASK ME RON HOW DO YOU STAY SO CALM. Simple. You respect the machine, you respect the road, and you dont let nobody tell you how to live. Some folks got a problem with a man having hobbies, a vest, and a proper cup holder. Thats there problem. I am not going to name names because I am above that."
    ],
    minimumPhase: 1
  },
  {
    id: "ron-light-rain-heroics",
    pageUrl: "web://yesterday.zone/users/roadhogron/home",
    ownerId: "road_hog_ron",
    publishedAt: "1999-11-02T13:06:00",
    title: "RIDE REPORT: LIGHT RAIN, HEAVY HEART",
    paragraphs: [
      "31 MILES IN LIGHT RAIN. Not everybody is built for that kind of weather. I hadda pull over at County Line Gas for safety and a coffee. Black Betty handled it like a queen. I handled it like a professional. The rain did not win and neither did the people who said maybe I should check the forecast first."
    ],
    minimumPhase: 1
  },
  {
    id: "ron-new-members-road-rules",
    pageUrl: "web://yesterday.zone/users/roadhogron/home",
    ownerId: "road_hog_ron",
    publishedAt: "1999-11-07T15:49:00",
    title: "NEW PEOPLE READ THE ROAD RULES",
    paragraphs: [
      "Lot of new faces on Orbit. Welcome I guess. If you want to talk bikes, talk bikes. If you want to make jokes about how far I ride or what I wear, save it for someone who dont got 11,208 miles of hard earned experience. Chrome side up. Common sense side up too. Unless your on a scooter which I dont even want to get into."
    ],
    minimumPhase: 2
  },
  {
    id: "ron-old-account-knows-the-ride",
    pageUrl: "web://yesterday.zone/users/roadhogron/home",
    ownerId: "road_hog_ron",
    publishedAt: "1999-11-11T22:11:00",
    title: "WHO IS POSTING MY RIDE LOGS",
    paragraphs: [
      "Some old account posted the exact route I took to Steve's Garage, including the battery issue. It got my nickname wrong. Called me ROADH0G RON like a computer person. I dont know how it knew about the dent in the left fender because I didnt post that. Probably some punk from the neighborhood. I am watching the road and the road is watching back."
    ],
    minimumPhase: 3
  },
  {
    id: "ron-byte-barn-road-song",
    pageUrl: "web://yesterday.zone/users/roadhogron/home",
    ownerId: "road_hog_ron",
    publishedAt: "1999-11-13T13:27:00",
    title: "BYTE BARN SONG AINT BAD FOR COMPUTER MUSIC",
    paragraphs: [
      "I HEARD THAT BYTE BARN SONG AT MARCYS. Catchy. Not real road music but it has a beat and the waitress knew the words so its doing something right. I told the Thunder Riders we could use it for the next breakfast run. Nobody voted yet but I am president of the ride calendar so we will see."
    ],
    minimumPhase: 4
  },
  {
    id: "dot-new-page-hello",
    pageUrl: "web://yesterday.zone/users/grandmadot/home",
    ownerId: "grandma_dot",
    publishedAt: "1999-10-18T10:16:00",
    title: "HELLO TO EVERYONE ON MY NEW PAGE",
    paragraphs: [
      "Kevin helped me make this NEW page because the old one was not listening to me anymore. I have put my lemon square recipe here and I will add a picture when I learn how to make the picture smaller. If you are family or from church or just a nice person, please leave a note. I do read them all. Love Dot"
    ],
    minimumPhase: 1
  },
  {
    id: "dot-walters-recipe-card",
    pageUrl: "web://yesterday.zone/users/grandmadot/home",
    ownerId: "grandma_dot",
    publishedAt: "1999-10-27T15:42:00",
    title: "MY SUNDAY RECIPE CARD",
    paragraphs: [
      "I made Walter's chicken and dumplings today. The recipe card is old and has gravy on one corner, but I can still read it. Walter always said the secret was to let the dumplings be what they are. I think that is nice advice for cooking and maybe other things. Kevin says I should not put personal things on the computer, but I think computers can be personal if you are polite."
    ],
    minimumPhase: 1
  },
  {
    id: "dot-printed-notes",
    pageUrl: "web://yesterday.zone/users/grandmadot/home",
    ownerId: "grandma_dot",
    publishedAt: "1999-11-03T19:06:00",
    title: "THANK YOU FOR THE NICE NOTES",
    paragraphs: [
      "I printed some of the kind comments from this page and put them beside the telephone. Carol from church liked the lemon squares and a young person named Mel used purple sprinkles, which sounds cheerful. It is nice to hear from people when the house is quiet. Please do not think you have to write a long letter. Even hello is plenty. Love Dot"
    ],
    minimumPhase: 1
  },
  {
    id: "dot-new-orbit-friends",
    pageUrl: "web://yesterday.zone/users/grandmadot/home",
    ownerId: "grandma_dot",
    publishedAt: "1999-11-07T09:38:00",
    title: "WELCOME NEW ORBIT FRIENDS",
    paragraphs: [
      "There are many new people here now and I want to say HELLO. I may not understand all the games and the strange cartoons, but I like seeing everyone talk about the things they love. If you need a recipe, a polite opinion, or someone to tell you that your pet sounds lovely, you may write to me. Kevin says this is called being social online. I think it is called being neighborly."
    ],
    minimumPhase: 2
  },
  {
    id: "dot-old-page-has-words",
    pageUrl: "web://yesterday.zone/users/grandmadot/home",
    ownerId: "grandma_dot",
    publishedAt: "1999-11-11T11:08:00",
    title: "MY OLD PAGE IS SAYING THINGS",
    paragraphs: [
      "I visited my old page again because someone said it had new blue writing. It did, but I did not put it there. The page said HELLO before I clicked anything, which is not how pages usually behave. Kevin is coming Sunday and I have written it down for him. Please use this NEW page until we sort it out. Love Dot"
    ],
    minimumPhase: 3
  },
  {
    id: "dot-byte-barn-kitchen-radio",
    pageUrl: "web://yesterday.zone/users/grandmadot/home",
    ownerId: "grandma_dot",
    publishedAt: "1999-11-13T10:49:00",
    title: "THE BYTE BARN SONG IS IN MY KITCHEN",
    paragraphs: [
      "That Byte Barn song was on the radio while I made coffee and I knew the chorus by the second time. I do not know why everyone is singing about a computer store, but it is very cheerful. I thought Walter would have laughed at it. I hope all the young people going to the big event have a good time and remember to eat something besides chips. Love Dot"
    ],
    minimumPhase: 4
  },
  {
    id: "hal-muster-at-briar-ford",
    pageUrl: "web://yesterday.zone/users/colonelhal/home",
    ownerId: "colonel_hal",
    publishedAt: "1999-10-17T17:43:00",
    title: "CAMP NEAR BRIAR FORD // OCT. 17",
    paragraphs: [
      "CAMP NEAR BRIAR FORD, Oct. 17th.—The 14th Briar County Volunteers came into camp under a fair sky and an abundance of mud. By seven of the clock, two blankets were unaccounted for, Private Ellis had made a wretched bundle of his bedroll, and the company kettle was set so near the fire as to invite ruin. Such matters may appear trifling to civilians, but an army comes apart first at the seams, straps, rations, and returns. I set the camp line to rights and ordered the men to fall in afresh. Mr. Pruitt appeared with an 1873-pattern carbine at an 1863 event and seemed astonished that I took notice. The coffee was villainous. We endured it, as soldiers must."
    ],
    minimumPhase: 1
  },
  {
    id: "hal-hard-tack-and-hierarchy",
    pageUrl: "web://yesterday.zone/users/colonelhal/home",
    ownerId: "colonel_hal",
    publishedAt: "1999-10-25T20:11:00",
    title: "FROM THE QUARTERMASTER'S BOOK // HARD TACK",
    paragraphs: [
      "FROM THE QUARTERMASTER'S BOOK.—At evening mess, Corporal Ames endeavored to better the hard tack with apple butter. It is not regulation issue, but I judged that a hungry man is of little use to history or his messmates. Thus the indulgence was granted. The company is a chain of duty: officers give the word, sergeants keep the files in order, and the quartermaster sees that no man has lost his spoon, blanket, or last tin cup. This labor would be lighter if Sergeant Barlow ceased concealing a plastic cooler beneath his canvas fly. He calls it discretion. I call it an anachronism of the first magnitude."
    ],
    minimumPhase: 1
  },
  {
    id: "hal-living-history-campaign",
    pageUrl: "web://yesterday.zone/users/colonelhal/home",
    ownerId: "colonel_hal",
    publishedAt: "1999-11-02T18:24:00",
    title: "ON THE ROAD SOUTHWARD // CAMPAIGN NOTES",
    paragraphs: [
      "ON THE ROAD SOUTHWARD.—Our autumn campaign conveyed the 14th through three county parks, two chilling rains, and one unavoidable halt at a diner, which was not, I need hardly observe, part of the original itinerary. The march was modest by modern reckoning and sufficient in damp wool. Several young fellows spoke of sore feet as if they had endured a siege. I reminded them that we borrow but a sliver of the hardship and ought to do so with humility. We read letters by the fire, consulted the period maps, and struck camp in good order—save for the nylon tent cord discovered behind Company B's cookfire. A disgraceful sight."
    ],
    minimumPhase: 1
  },
  {
    id: "hal-new-recruits-muster",
    pageUrl: "web://yesterday.zone/users/colonelhal/home",
    ownerId: "colonel_hal",
    publishedAt: "1999-11-07T11:17:00",
    title: "GENERAL ORDER // TO NEW VISITORS",
    paragraphs: [
      "GENERAL ORDER.—New visitors may attend a public living-history day, provided they understand the business before them. Read first. Listen first. Learn whose lives are being interpreted. We do not glorify war, nor do we play at it carelessly. We study correspondence, camp routine, supply returns, equipment, and the human cost that never appears neatly upon a battle map. Bring water, stout shoes, and a willingness to be corrected. Bring sources if you possess them. Do not bring sunglasses, wristwatches, neon athletic socks, or an argument that a polyester sash is 'close enough.' It is not."
    ],
    minimumPhase: 2
  },
  {
    id: "hal-old-account-muster-roll",
    pageUrl: "web://yesterday.zone/users/colonelhal/home",
    ownerId: "colonel_hal",
    publishedAt: "1999-11-11T20:31:00",
    title: "SPECIAL REPORT // A NAME IN THE ROLL",
    paragraphs: [
      "SPECIAL REPORT.—An old account has furnished a transcription of a muster roll containing an additional Mercer name. The place name is plausible. The hand is not found in any of my binders, and the date form is wholly wrong for the source it claims to copy. Under ordinary circumstances I should set it aside at once. Yet no quartermaster worth his salt discards a useful lead merely because it arrives by an unconventional courier. The entry is marked PROVISIONAL; the county archive has been written; Binder Three has been reopened. Further particulars will follow when the evidence permits."
    ],
    minimumPhase: 3
  },
  {
    id: "hal-byte-barn-campfire",
    pageUrl: "web://yesterday.zone/users/colonelhal/home",
    ownerId: "colonel_hal",
    publishedAt: "1999-11-13T16:14:00",
    title: "EVENING NOTES // A MOST MODERN AIR",
    paragraphs: [
      "EVENING NOTES.—After camp was struck, the younger members of the company commenced singing the Byte Barn air around the dead fire. I cannot pretend to comprehend its sudden popularity, though I now know the refrain at a distance of forty yards and against my better judgment. Every generation has its camp songs. So long as the men gather peaceably, hear one another out, and leave the ground cleaner than they found it, I shall not lodge a formal complaint. The same cannot be said for the fellow who left a soda can beside the woodpile."
    ],
    minimumPhase: 4
  },
  {
    id: "hal-letter-home-from-camp",
    pageUrl: "web://yesterday.zone/users/colonelhal/home",
    ownerId: "colonel_hal",
    publishedAt: "1999-10-30T21:27:00",
    title: "LETTER HOME FROM CAMP // OCT. 30",
    paragraphs: [
      "My dearest Martha, It has been a fortnight since I last had opportunity to send word from camp, though I trust this finds thee in good health and the roses yet standing by the porch. We have marched, drilled, drawn rations, and endured a rain that made the whole company smell of wet wool and woodsmoke. The men bear up tolerably well, with the exception of Mr. Pruitt, whose 1873 carbine continues to be a private affliction to us all. I have taken charge of the blankets and the coffee, both of which require a firmer hand than some officers possess. Give my regards to the children and tell young Edward that a proper haversack is waxed canvas, not the nylon article he brought last spring.",
      "Pray see that the boys come by and mow the grass before it gets beyond redemption, and do not let the truck go another week without its oil changed. Has my parcel from the sutler arrived? It ought to contain two reproduction shirt studs, the proper blue thread, and a tin of blacking for the boots. Lastly, if thou hast the means, please set the VCR for the Bellwater Bears game on Sunday and the final episode of Harbor Patrol thereafter. The campaign may demand a man's full attention, but a fellow ought not return from the field ignorant of the score. Your affectionate husband, H. Whitcomb, Quartermaster, 14th Briar County Volunteers."
    ],
    minimumPhase: 1
  },
  {
    id: "lenny-morning-limited-schedule",
    pageUrl: "web://yesterday.zone/users/railroadlenny/home",
    ownerId: "railroad_lenny",
    publishedAt: "1999-10-18T19:18:00",
    title: "NO. 7 HELD AT LENNY CENTRAL",
    paragraphs: [
      "No. 7 Morning Limited was held twelve scale minutes at Lenny Central while I corrected the east throat switch. This put the 44 Coal Drag in the hole at Pine Ridge, which was proper because loaded coal does not outrank passenger varnish. The Junction Turn then made its pickup without fouling the main. Anyone who says the schedule is too complicated has not watched a passenger train meet a coal drag with the depot platform occupied."
    ],
    minimumPhase: 1
  },
  {
    id: "lenny-newspaper-mountain-work",
    pageUrl: "web://yesterday.zone/users/railroadlenny/home",
    ownerId: "railroad_lenny",
    publishedAt: "1999-10-24T20:32:00",
    title: "NEWSPAPER MOUNTAIN WEST FACE",
    paragraphs: [
      "Finished the west cut on Newspaper Mountain. The rock strata are still damp, which means no trains through Tunnel Two until tomorrow. I do not care that it is a basement. Water behaves the same way underground. The branch job will use the lower route, set out the boxcar at Dorsey Feed, and return light. Do not ask why the passenger station has no passengers at 11:00 PM. They have a timetable."
    ],
    minimumPhase: 1
  },
  {
    id: "lenny-horn-log-confirmed",
    pageUrl: "web://yesterday.zone/users/railroadlenny/home",
    ownerId: "railroad_lenny",
    publishedAt: "1999-10-30T21:49:00",
    title: "HORN REPORT // 9:44 PM CONFIRMED",
    paragraphs: [
      "Two units westbound at 9:44 PM. Direction confirmed. Horn sequence confirmed. I was on the porch with the station clock and there is no ambiguity. A maintenance truck is not a train, a distant engine sound is not a sighting, and one cannot simply write 'heard a big one' in the logbook. I have updated the prototype board accordingly."
    ],
    minimumPhase: 1
  },
  {
    id: "lenny-passenger-loop-sunday",
    pageUrl: "web://yesterday.zone/users/railroadlenny/home",
    ownerId: "railroad_lenny",
    publishedAt: "1999-11-03T16:42:00",
    title: "SUNDAY PASSENGER PRIORITY",
    paragraphs: [
      "Grandchildren are expected Sunday, so the passenger loop has priority from 1:00 until they leave or lose interest. The freight may continue, but it will not block the depot, blow through the crossing, or deliver pretzels. Bob has asked again. The answer remains no. The diner car is for passengers, not snacks, and the caboose has never once asked for a bowl."
    ],
    minimumPhase: 1
  },
  {
    id: "lenny-new-operators-timetable",
    pageUrl: "web://yesterday.zone/users/railroadlenny/home",
    ownerId: "railroad_lenny",
    publishedAt: "1999-11-07T18:14:00",
    title: "NEW OPERATORS: READ THE TIMETABLE",
    paragraphs: [
      "More people are visiting Orbit and some have asked about running a train. That is fine. Start with the timetable. Know your train number, know your block, know which siding clears the main, and do not touch the scenery. You do not need to understand every route immediately. You only need to stop pretending a red signal is a suggestion."
    ],
    minimumPhase: 2
  },
  {
    id: "lenny-old-account-switch-board",
    pageUrl: "web://yesterday.zone/users/railroadlenny/home",
    ownerId: "railroad_lenny",
    publishedAt: "1999-11-11T22:46:00",
    title: "SOMEONE POSTED MY SWITCH BOARD",
    paragraphs: [
      "An old account posted a diagram of Lenny Central's east throat, including the switch numbers and the bend in the feeder wire behind Pine Ridge. It labels the blocked route 'CLEAR' when it is very plainly occupied. The account name has an extra L. I do not know where it got the drawing. I have shut down the main line until I can determine whether this is a prank or a wiring problem."
    ],
    minimumPhase: 3
  },
  {
    id: "lenny-byte-barn-cab-radio",
    pageUrl: "web://yesterday.zone/users/railroadlenny/home",
    ownerId: "railroad_lenny",
    publishedAt: "1999-11-13T17:03:00",
    title: "BYTE BARN ON THE CAB RADIO",
    paragraphs: [
      "The Byte Barn song has now reached the basement, because my grandson put a small radio in the cab of the 44 Coal Drag. It is not prototypical. It is also not unpleasant. The train remained on time, the radio remained quiet, and the coal reached Pine Ridge without incident. I will permit this once more if the volume stays below the sound of the transformer."
    ],
    minimumPhase: 4
  },
  {
    id: "bob-north-reeds-monster",
    pageUrl: "web://yesterday.zone/users/bigbassbob/home",
    ownerId: "big_bass_bob",
    publishedAt: "1999-10-17T12:26:00",
    title: "NORTH REEDS PRODUCE A MONSTER",
    paragraphs: [
      "Got out before sunup with a cold one in the cooler and a green worm on the line. Around 8:15 something hit so hard I thought the whole north reed bed had decided to leave Lake Mercer. Took me around the boat twice, knocked over my coffee, and looked me right in the eye when it finally came up. Respectable bass. Very respectable. I did not have the scale because it was in the other tackle box, but it was at least as long as my forearm if my forearm had eaten breakfast."
    ],
    minimumPhase: 1
  },
  {
    id: "bob-linda-list-and-lake",
    pageUrl: "web://yesterday.zone/users/bigbassbob/home",
    ownerId: "big_bass_bob",
    publishedAt: "1999-10-24T16:08:00",
    title: "LAKE THERAPY // DOCTOR'S ORDERS PROBABLY",
    paragraphs: [
      "Linda had a list of things for me to do around the house, so I figured I ought to get out on the lake and clear my head first. You cannot make good decisions about gutters without seeing what the bass are doing. The fish were holding near the bridge pilings, the wind was right, and the cooler was cold. By the time I got home the list was still there, which is what I call a stable situation."
    ],
    minimumPhase: 1
  },
  {
    id: "bob-rail-bridge-snag-story",
    pageUrl: "web://yesterday.zone/users/bigbassbob/home",
    ownerId: "big_bass_bob",
    publishedAt: "1999-10-30T18:36:00",
    title: "THE ONE UNDER THE RAIL BRIDGE",
    paragraphs: [
      "Everybody says the rail bridge is snag city. That is because they do not know how to talk to a lure. I dropped a spinner beside marker seven and hooked something that made three runs toward the old pilings. It may have been a bass. It may have been the biggest walleye in Bellwater County. It may have been a log with an attitude. Either way, it took my best spinner and earned my respect."
    ],
    minimumPhase: 1
  },
  {
    id: "bob-cold-one-sunrise",
    pageUrl: "web://yesterday.zone/users/bigbassbob/home",
    ownerId: "big_bass_bob",
    publishedAt: "1999-11-03T07:18:00",
    title: "SUNRISE, COFFEE, THEN A COLD ONE",
    paragraphs: [
      "There is a correct order to a Saturday: coffee at the launch, motor out while the fog is still on the water, catch something that makes a story, then crack open a cold one once the sun has done its work. I caught two perch, one little bass, and a boot. The boot was not huge, but it was a good solid boot and I had to lean back in the seat to bring it in."
    ],
    minimumPhase: 1
  },
  {
    id: "bob-new-anglers-lake-mercer",
    pageUrl: "web://yesterday.zone/users/bigbassbob/home",
    ownerId: "big_bass_bob",
    publishedAt: "1999-11-07T06:54:00",
    title: "NEW ANGLERS, NORTH REEDS ARE STILL HOT",
    paragraphs: [
      "Looks like there are a lot more folks using Orbit now, so here is the Lake Mercer report: north reeds before ten, green worm, slow retrieve, do not stomp around in the boat like you are announcing a parade. And if your spouse gives you a chore list, I am not telling you to ignore it. I am saying fish do not wait for gutters."
    ],
    minimumPhase: 2
  },
  {
    id: "bob-old-account-knows-the-dock",
    pageUrl: "web://yesterday.zone/users/bigbassbob/home",
    ownerId: "big_bass_bob",
    publishedAt: "1999-11-11T19:02:00",
    title: "SOMEBODY KNOWS WHAT IS UNDER MY DOCK",
    paragraphs: [
      "An old account posted about the loose ladder rung under my dock and said there was a survey paper tucked behind it. That is not information I put on the internet. I checked and there was, in fact, a soggy old sheet of paper back there. Could be nothing. Could be somebody messing with me. Either way, I am keeping it in a plastic bag until I can read the thing without it falling apart."
    ],
    minimumPhase: 3
  },
  {
    id: "bob-byte-barn-boat-radio",
    pageUrl: "web://yesterday.zone/users/bigbassbob/home",
    ownerId: "big_bass_bob",
    publishedAt: "1999-11-13T14:42:00",
    title: "BYTE BARN ON THE BOAT RADIO",
    paragraphs: [
      "That Byte Barn song came on the boat radio and I will admit it: it is catchy. I had it stuck in my head all the way across the lake, which may be why I missed a bite near the reeds. Linda says that is not the song's fault. Linda says a lot of things. Still caught a respectable fish, so the lake has spoken."
    ],
    minimumPhase: 4
  },
  {
    id: "steph-pager-heart-lyric-emergency",
    pageUrl: "web://soundwave.zone/users/starlinesteph/home",
    ownerId: "starline_steph",
    publishedAt: "1999-10-17T21:16:00",
    title: "PAGER HEART IS DEFINITELY ABOUT ME",
    paragraphs: [
      "OKAY I know they wrote Pager Heart before they knew I existed, but Elias says 'I waited by the phone while the whole world spun' and I HAVE waited by the phone while the whole world spun. Mom says that is a normal song lyric. Mom has never heard the way Elias looks at the camera during the second chorus. The key change is also a whole step up, which is basically a confession."
    ],
    minimumPhase: 1
  },
  {
    id: "steph-dynamo-city-tour-countdown",
    pageUrl: "web://soundwave.zone/users/starlinesteph/home",
    ownerId: "starline_steph",
    publishedAt: "1999-10-24T18:43:00",
    title: "SILVER EXIT TOUR: DYNAMO CITY IN 23 DAYS!!!",
    paragraphs: [
      "THE TOUR DATE IS FINALLY CONFIRMED. I have made a countdown calendar, a backup countdown calendar, and a list of what to bring if I get close enough to the stage to hand Marcus my letter. My cousin says the seats are too far away for that. My cousin has no vision. If anybody has an extra silver wristband or knows which radio station is doing the ticket giveaway, EMAIL ME IMMEDIATELY."
    ],
    minimumPhase: 1
  },
  {
    id: "steph-hottest-debate-final",
    pageUrl: "web://soundwave.zone/users/starlinesteph/home",
    ownerId: "starline_steph",
    publishedAt: "1999-10-30T20:05:00",
    title: "THE HOTTEST 5TH EXIT MEMBER DEBATE IS OVER",
    paragraphs: [
      "I am ending the debate because people are being incorrect in my guestbook. Elias is the DREAMIEST. Marcus has the BEST VOICE. Noel is the BEST DANCER. Jett is the FUNNIEST. Devin is the MOST UNDERRATED and therefore secretly the most important. You cannot just say 'all of them' because that is not a ranking, it is surrender. Also their new silver jackets are not too shiny. They are exactly shiny enough."
    ],
    minimumPhase: 1
  },
  {
    id: "steph-food-court-dance-drill",
    pageUrl: "web://soundwave.zone/users/starlinesteph/home",
    ownerId: "starline_steph",
    publishedAt: "1999-11-03T17:28:00",
    title: "FOOD COURT ROUTINE // DO NOT INTERRUPT",
    paragraphs: [
      "I finally figured out the Call Me From the Food Court dance: step, point, jacket grab, quarter turn, then the little shoulder thing Noel does before the bridge. I practiced in the living room and almost hit the lamp, but that is because the lamp is standing in the choreography space. If 5th Exit needs one more backup dancer at Dynamo City, I am prepared."
    ],
    minimumPhase: 1
  },
  {
    id: "steph-new-fans-exit-mailing-list",
    pageUrl: "web://soundwave.zone/users/starlinesteph/home",
    ownerId: "starline_steph",
    publishedAt: "1999-11-07T19:07:00",
    title: "NEW 5TH EXIT FANS PLEASE READ THIS FIRST",
    paragraphs: [
      "There are so many new people on Orbit now!!! Welcome to the correct side of music. Start with One More Exit if you want dancing, Pager Heart if you have feelings, and Every Friday Night if you want to understand why Marcus owns every bridge he sings. I have duplicate magazine clippings and two sticker sheets for trade. Do not fold posters. Do not call them fake. Do not say Jett's hair is 'just okay.'"
    ],
    minimumPhase: 2
  },
  {
    id: "steph-old-account-tour-setlist",
    pageUrl: "web://soundwave.zone/users/starlinesteph/home",
    ownerId: "starline_steph",
    publishedAt: "1999-11-11T21:39:00",
    title: "AN OLD ACCOUNT POSTED THE TOUR SET LIST",
    paragraphs: [
      "A weird old account posted a Silver Exit set list before the radio station even announced one. It has every song I expected PLUS a track called Stay On The Line that is not on any album. The username is almost StarLine_Steph but one letter is wrong. I am choosing to believe 5th Exit's management found my page and accidentally posted through an ancient Orbit account. This is the most reasonable explanation."
    ],
    minimumPhase: 3
  },
  {
    id: "steph-byte-barn-fifth-exit-cover",
    pageUrl: "web://soundwave.zone/users/starlinesteph/home",
    ownerId: "starline_steph",
    publishedAt: "1999-11-13T20:34:00",
    title: "5TH EXIT SANG THE BYTE BARN LOVE SONG!!!",
    paragraphs: [
      "THIS IS NOT A DRILL. 5TH EXIT did a Byte Barn cover and turned it into a love song with Marcus on the bridge and Elias doing the soft part before the last chorus. I listened to it three times, then five more times to make sure I heard it correctly. The whole thing is about finding someone again in the same place you used to be happy, which is obviously beautiful and possibly about me. I cannot wait for the festival."
    ],
    minimumPhase: 4
  },
  {
    id: "sid-all-ages-basement-show",
    pageUrl: "web://soundwave.zone/users/safetypinsid/home",
    ownerId: "safetypin_sid",
    publishedAt: "1999-10-18T23:18:00",
    title: "ALL-AGES BASEMENT SHOW // FOUR DOLLARS",
    paragraphs: [
      "Four dollars at the door, five bands, two extension cords, one basement that should probably meet a fire code someday. The Cart Returns played second and made the whole room wake up. We marked Xs on hands, kept water by the stairs, and nobody had to pretend being wrecked was a personality. Cheap show. Fast set. Everybody helped carry gear upstairs after. That is the whole point."
    ],
    minimumPhase: 1
  },
  {
    id: "sid-flyer-staple-emergency",
    pageUrl: "web://soundwave.zone/users/safetypinsid/home",
    ownerId: "safetypin_sid",
    publishedAt: "1999-10-25T19:51:00",
    title: "FLYER RULES // READ BEFORE TOUCHING THE COPY MACHINE",
    paragraphs: [
      "New flyer for Saturday is done. Black paper, white type, ugly dog drawing, correct address this time. If you make a flyer, put the band names, the door price, and whether it is all ages ON THE FLYER. Do not make me call three people to find out if the show is at a church hall or somebody's garage. Also staple the corners straight. This is not a suggestion."
    ],
    minimumPhase: 1
  },
  {
    id: "sid-benefit-show-report",
    pageUrl: "web://soundwave.zone/users/safetypinsid/home",
    ownerId: "safetypin_sid",
    publishedAt: "1999-10-31T22:36:00",
    title: "BENEFIT SHOW // ACTUAL GOOD USE OF A SATURDAY",
    paragraphs: [
      "The benefit at the community room raised enough for the shelter pantry and nobody destroyed the microphone stand, so call it a success. The Cart Returns played their new song in under ninety seconds. A kid in a huge jacket asked if straight edge means he has to agree with me about everything. No. It means I do not need a beer to stand in a loud room with my friends and care about something. He nodded. Then somebody unplugged the PA to charge a pager."
    ],
    minimumPhase: 1
  },
  {
    id: "sid-zine-number-seven",
    pageUrl: "web://soundwave.zone/users/safetypinsid/home",
    ownerId: "safetypin_sid",
    publishedAt: "1999-11-03T20:41:00",
    title: "STAPLED NOISE #7 IS OUT",
    paragraphs: [
      "New zine is one page, folded wrong, and has reviews of three tapes nobody labeled correctly. There is also a map to the back entrance at the rec hall because the front door sticks when it rains. I wrote about why all-ages matters, which sounds serious until you remember the alternative is a bunch of kids standing in a parking lot while adults argue about stamps. Take care of your scene or it turns into somebody else's marketing plan."
    ],
    minimumPhase: 1
  },
  {
    id: "sid-new-kids-show-etiquette",
    pageUrl: "web://soundwave.zone/users/safetypinsid/home",
    ownerId: "safetypin_sid",
    publishedAt: "1999-11-07T21:18:00",
    title: "NEW KIDS AT SHOWS // BASIC ETIQUETTE",
    paragraphs: [
      "More people are finding Orbit and asking about the shows. Fine. Come early, pay the door if you can, do not stand directly in front of somebody else's amp, and help when the last band needs to get a cabinet down the stairs. Sober room, all ages, no creep behavior, no macho garbage. You do not have to know every song. Just mean it when you show up."
    ],
    minimumPhase: 2
  },
  {
    id: "sid-old-account-flyer-copy",
    pageUrl: "web://soundwave.zone/users/safetypinsid/home",
    ownerId: "safetypin_sid",
    publishedAt: "1999-11-11T23:28:00",
    title: "SOMEBODY COPIED A FLYER THAT WAS NEVER ONLINE",
    paragraphs: [
      "An old account posted a scan of our first Stapled Noise flyer. Same crooked dog. Same misspelled street name. Same coffee ring I got from leaving it on the bowling-alley counter. I never put that one online. The account name has an extra dash and it keeps telling people to check out 'fun pages' instead of the show. Not happening. If you want a scene, show up and help carry the amps."
    ],
    minimumPhase: 3
  },
  {
    id: "sid-byte-barn-cover-admission",
    pageUrl: "web://soundwave.zone/users/safetypinsid/home",
    ownerId: "safetypin_sid",
    publishedAt: "1999-11-13T22:18:00",
    title: "THE BYTE BARN COVER IS STUPID. IT WORKS.",
    paragraphs: [
      "The Cart Returns did a Byte Barn cover at practice and made it loud enough to knock a stack of flyers off the wall. I hate that the chorus works. I hate that everybody knew it after one run. I hate that I have been humming it while making copies. It is still a better song with a distorted bass line, but that is true of most things."
    ],
    minimumPhase: 4
  },
  {
    id: "mason-window-well-demo",
    pageUrl: "web://soundwave.zone/users/flannelmason/home",
    ownerId: "flannel_mason",
    publishedAt: "1999-10-19T21:46:00",
    title: "WINDOW WELL // FIRST TAPE",
    paragraphs: [
      "Recorded Window Well once before the furnace came on. Then again after it came on. The second one is better, which is annoying because now the song needs the room to be cold and loud. There is no real chorus yet. I think it might work better if it never finds one."
    ],
    minimumPhase: 1
  },
  {
    id: "mason-reservoir-saints-bootleg",
    pageUrl: "web://soundwave.zone/users/flannelmason/home",
    ownerId: "flannel_mason",
    publishedAt: "1999-10-26T23:12:00",
    title: "RESERVOIR SAINTS // THIRD-GEN DUB",
    paragraphs: [
      "Got a third-generation Reservoir Saints tape from a guy who says he stood behind the amp at the Harbor Room show. The crowd is louder than the guitar for half of it. The singer forgets a verse and somebody yells the words back at him. Keep it. A clean version would lose the part where it sounds like everybody in the room is trying to hold the song together."
    ],
    minimumPhase: 1
  },
  {
    id: "mason-practice-room-late",
    pageUrl: "web://soundwave.zone/users/flannelmason/home",
    ownerId: "flannel_mason",
    publishedAt: "1999-11-03T22:16:00",
    title: "PRACTICE ROOM // LIGHTS OFF",
    paragraphs: [
      "Dad asked if I was done practicing. I said yes, then waited until the stairs stopped creaking and played for another hour with the amp turned low. The low ceiling makes every note come back different. I am trying to learn when to stop adding parts. Probably when the guitar starts sounding like it is explaining itself."
    ],
    minimumPhase: 1
  },
  {
    id: "mason-new-listeners-note",
    pageUrl: "web://soundwave.zone/users/flannelmason/home",
    ownerId: "flannel_mason",
    publishedAt: "1999-11-07T20:34:00",
    title: "IF YOU ARE NEW HERE",
    paragraphs: [
      "More people are looking at the SoundWave pages. Hi. The tabs are not exact. The tape labels are mostly exact. If you are learning guitar, start with something you can play badly for a long time without getting bored. That is probably the song you need. Also, do not touch the gray pedal."
    ],
    minimumPhase: 2
  },
  {
    id: "mason-old-account-demo-copy",
    pageUrl: "web://soundwave.zone/users/flannelmason/home",
    ownerId: "flannel_mason",
    publishedAt: "1999-11-11T23:41:00",
    title: "SOMEONE HAS THE FIRST WINDOW WELL TAPE",
    paragraphs: [
      "An old account posted a clip labeled WINDOW WELL // TAKE ONE. It has the exact false start and the furnace click I cut out before I traded the tape to anybody. The account name is close to mine but not mine. I listened to it twice. It sounds worse than I remembered. It also sounds like my room."
    ],
    minimumPhase: 3
  },
  {
    id: "mason-byte-barn-heavy-riff",
    pageUrl: "web://soundwave.zone/users/flannelmason/home",
    ownerId: "flannel_mason",
    publishedAt: "1999-11-13T21:08:00",
    title: "BYTE BARN RIFF // UNFORTUNATELY HEAVY",
    paragraphs: [
      "Tried the Byte Barn melody in drop D because Sid said it would be funny. It should not work. It does. The chorus sounds like a song about a mall after everybody leaves. I recorded it on the gray pedal and then erased it. Mostly."
    ],
    minimumPhase: 4
  },
  {
    id: "simon-loop-96-night",
    pageUrl: "web://soundwave.zone/users/subbasssimon/home",
    ownerId: "subbass_simon",
    publishedAt: "1999-10-16T23:48:00",
    title: "LOOP 96 // DO NOT FALL ASLEEP",
    paragraphs: [
      "Got the kettle click, a bus-door sigh, and the bit where the dryer thumps when it is mad. Chopped them into a 148 BPM break and now the room sounds like a robot trying to win an argument. The ceiling knocked twice. That means the bass is working."
    ],
    minimumPhase: 1
  },
  {
    id: "simon-flyer-night",
    pageUrl: "web://soundwave.zone/users/subbasssimon/home",
    ownerId: "subbass_simon",
    publishedAt: "1999-10-22T18:17:00",
    title: "FLYER REPORT // ADDRESS REMOVED",
    paragraphs: [
      "Found a neon flyer for a midnight community-hall set with three names in tiny type and one enormous warning about the speakers. Whoever designed it understands priorities. I am keeping it in the good binder next to the one with the chrome skull and the typo that says BASS UNTIL MORINING."
    ],
    minimumPhase: 1
  },
  {
    id: "simon-riot-relay-review",
    pageUrl: "web://soundwave.zone/users/subbasssimon/home",
    ownerId: "subbass_simon",
    publishedAt: "1999-10-29T00:36:00",
    title: "RIOT RELAY // LIVE TAPE VERDICT",
    paragraphs: [
      "RIOT RELAY played the student union and somehow made a room full of folding chairs feel dangerous. Massive breaks, a bassline like a vending machine falling down stairs, and exactly one siren sample used correctly. The guy behind me called it noise. He is now banned from my headphones."
    ],
    minimumPhase: 1
  },
  {
    id: "simon-memory-limit",
    pageUrl: "web://soundwave.zone/users/subbasssimon/home",
    ownerId: "subbass_simon",
    publishedAt: "1999-11-03T01:12:00",
    title: "64K OF UNREASONABLE POWER",
    paragraphs: [
      "People keep saying I should buy more memory instead of making the samples smaller. Wrong. Limits make the drums bite. If you cannot fit the whole train sound in the sampler, you take the one second where it screams and make that the chorus."
    ],
    minimumPhase: 1
  },
  {
    id: "simon-new-listeners-bpm",
    pageUrl: "web://soundwave.zone/users/subbasssimon/home",
    ownerId: "subbass_simon",
    publishedAt: "1999-11-07T21:26:00",
    title: "NEW PEOPLE // START WITH THE BREAK",
    paragraphs: [
      "There are suddenly actual visitors in here. Welcome. Do not call every electronic record techno, do not touch a floppy with snack hands, and if a track feels slow, add a break before you add another synth. The Byte Barn hook works at 148 BPM, by the way. It should not. It absolutely does."
    ],
    minimumPhase: 2
  },
  {
    id: "simon-old-render",
    pageUrl: "web://soundwave.zone/users/subbasssimon/home",
    ownerId: "subbass_simon",
    publishedAt: "1999-11-11T23:09:00",
    title: "WHO RENDERED LOOP 96?",
    paragraphs: [
      "An old account posted a version of LOOP 96 that has my kettle click, my bus hiss, and a fourth sound I never recorded: somebody quietly counting under the beat. The username is almost mine. The file title says FINAL_FINAL_REAL. I hate that it is kind of a good mix."
    ],
    minimumPhase: 3
  },
  {
    id: "simon-byte-barn-break",
    pageUrl: "web://soundwave.zone/users/subbasssimon/home",
    ownerId: "subbass_simon",
    publishedAt: "1999-11-13T22:18:00",
    title: "BYTE BARN BREAK // CROWD TESTED",
    paragraphs: [
      "Played the Byte Barn break at the hall and everybody knew the keyboard stab before the drums even arrived. This used to be a commercial jingle. Now it is a room full of people yelling the hook and asking for the rewind. History is extremely weird and the bass is excellent."
    ],
    minimumPhase: 4
  },
  {
    id: "cass-saturday-countdown",
    pageUrl: "web://soundwave.zone/users/countrycass/home",
    ownerId: "country_cass",
    publishedAt: "1999-10-12T09:14:00",
    title: "SATURDAY COUNTDOWN // ERRANDS CAN WAIT",
    paragraphs: [
      "The station played Buck Hollister twice before I made it to the feed store, which feels like a sign but probably just means the request line is busy. I like a song that knows where it is: two lanes, a porch light, a receipt in the glove box. If the chorus could happen anywhere, it is not finished yet."
    ],
    minimumPhase: 1
  },
  {
    id: "cass-fairground-stage",
    pageUrl: "web://soundwave.zone/users/countrycass/home",
    ownerId: "country_cass",
    publishedAt: "1999-10-19T22:06:00",
    title: "FAIRGROUND STAGE // SECOND SET",
    paragraphs: [
      "Sang after the pie contest at the Bellwater fair. The little stage was beside the tractor pull, so every quiet verse had an engine revving through it. I thought it would ruin the song, but it made the last chorus feel honest. Rural life is mostly learning which noises belong in the story."
    ],
    minimumPhase: 1
  },
  {
    id: "cass-thursday-open-mic",
    pageUrl: "web://soundwave.zone/users/countrycass/home",
    ownerId: "country_cass",
    publishedAt: "1999-10-27T18:42:00",
    title: "THURSDAY OPEN MIC // CLIPBOARD IS FULL",
    paragraphs: [
      "We had eleven people on the clipboard and one man who said he only needed two minutes, then played six verses about his boat. That is the whole deal, really. Somebody brings a sad song, somebody brings a funny one, and everybody stays long enough to hear the next person."
    ],
    minimumPhase: 1
  },
  {
    id: "cass-porch-light-draft",
    pageUrl: "web://soundwave.zone/users/countrycass/home",
    ownerId: "country_cass",
    publishedAt: "1999-11-02T20:19:00",
    title: "SONG NOTE // PORCH LIGHT",
    paragraphs: [
      "New chorus idea: the porch light is on because somebody is expected, even if nobody says so. It might be too plain. Plain is not the same thing as simple, though. I keep writing fancy lines and crossing them out until there is just a road, a window, and somebody deciding whether to turn in."
    ],
    minimumPhase: 1
  },
  {
    id: "cass-new-faces",
    pageUrl: "web://soundwave.zone/users/countrycass/home",
    ownerId: "country_cass",
    publishedAt: "1999-11-07T19:33:00",
    title: "MORE FOLKS AT THE DOOR",
    paragraphs: [
      "There are a lot more people looking around Orbit lately. If you found this place through some strange link, hello. SoundWave is not fancy, but people will listen if you make something honest. Even the Byte Barn song has turned into a dozen different stories now. I hear there is a fiddle version somewhere. I hope that is true."
    ],
    minimumPhase: 2
  },
  {
    id: "cass-wrong-voice",
    pageUrl: "web://soundwave.zone/users/countrycass/home",
    ownerId: "country_cass",
    publishedAt: "1999-11-11T21:17:00",
    title: "SOMEBODY ELSE'S VERSE",
    paragraphs: [
      "An old page put up a song note that sounds like it came from me, except the town names are wrong and the porch light is described as a \"domestic beacon unit.\" Maybe somebody is practicing being a songwriter by copying everybody's homework. It is unsettling. The rhyme is still pretty bad."
    ],
    minimumPhase: 3
  },
  {
    id: "cass-byte-barn-memory",
    pageUrl: "web://soundwave.zone/users/countrycass/home",
    ownerId: "country_cass",
    publishedAt: "1999-11-13T20:11:00",
    title: "THE OLD JINGLE, SOMEHOW",
    paragraphs: [
      "I heard the Byte Barn melody coming out of a parked car at the grocery store, then somebody at open mic played it like a song about a closed mall and a lost summer. I do not know how a little old commercial turned into all this. I do know everybody in the room sang the last line together."
    ],
    minimumPhase: 4
  },
  {
    id: "rico-three-listener-record",
    pageUrl: "web://soundwave.zone/users/rhymetaperico/home",
    ownerId: "rhymetape_rico",
    publishedAt: "1999-10-14T17:28:00",
    title: "THREE-LISTENER RECORD // EVERYBODY IS WRONG",
    paragraphs: [
      "Found a tape called Sidewalk Weather by a guy from North Vale who apparently has three listeners, two of whom might be cousins. The drums are a little crooked, the hook takes forever, and the last verse makes the whole thing click into place. That is a real record. Do not wait for permission from a request line."
    ],
    minimumPhase: 1
  },
  {
    id: "rico-weird-page-sound-map",
    pageUrl: "web://soundwave.zone/users/rhymetaperico/home",
    ownerId: "rhymetape_rico",
    publishedAt: "1999-10-21T20:03:00",
    title: "SOUND MAP // SEARCH THE BORING WORDS",
    paragraphs: [
      "Best accidental music on Orbit this week: Bubble Borough has dryer noise that almost turns into a beat, Cosmic Crust has a space-keyboard loop, Rewind Harbor Video has a late-fee sting, and Molar Meadow's fish-tank page has a tiny melody nobody talks about. Search laundromat, pizza, video rental, or dentist if you think I am making this up. The best tracks are hiding behind businesses."
    ],
    minimumPhase: 1
  },
  {
    id: "rico-rec-center-tape",
    pageUrl: "web://soundwave.zone/users/rhymetaperico/home",
    ownerId: "rhymetape_rico",
    publishedAt: "1999-10-28T23:14:00",
    title: "REC CENTER TAPE // CROWD TOO LOUD",
    paragraphs: [
      "Traded for a rec-center show tape where the crowd is louder than the rapper for most of track two. Kept it anyway. Somebody in the back yells the hook half a second early every single time and it turns into a second percussion part. Imperfect does not mean useless. Sometimes imperfect is the part you remember."
    ],
    minimumPhase: 1
  },
  {
    id: "rico-byte-barn-first-listen",
    pageUrl: "web://soundwave.zone/users/rhymetaperico/home",
    ownerId: "rhymetape_rico",
    publishedAt: "1999-11-03T19:41:00",
    title: "COMPUTER STORE JINGLE // HOLD UP",
    paragraphs: [
      "The old Byte Barn commercial loop has one crooked clap and a keyboard stab that refuses to leave my head. It is corny. It is also built like a hook. I wrote four bars over it just to prove a point, then wrote eight more because the point kept working."
    ],
    minimumPhase: 1
  },
  {
    id: "rico-cover-wave",
    pageUrl: "web://soundwave.zone/users/rhymetaperico/home",
    ownerId: "rhymetape_rico",
    publishedAt: "1999-11-07T22:02:00",
    title: "THE BARN LINE ESCAPED",
    paragraphs: [
      "Okay, this is officially a thing now. Simon made the breakbeat version, Tess made it sound haunted, somebody did harmonies at the depot, and I heard a country chorus through a car-window speaker downtown. Keep posting your flips. A forgotten computer-store song should not have this many lives, but here we are."
    ],
    minimumPhase: 2
  },
  {
    id: "rico-listening-guide-glitch",
    pageUrl: "web://soundwave.zone/users/rhymetaperico/home",
    ownerId: "rhymetape_rico",
    publishedAt: "1999-11-11T22:43:00",
    title: "THE GUIDE IS CHANGING BY ITSELF",
    paragraphs: [
      "A page I never put in my notebook showed up on my deep-cut list with a perfect little review in my voice. It recommends a song that does not exist. The fake review even says \"Rico approved.\" I did not approve it. I would never use that many exclamation points."
    ],
    minimumPhase: 3
  },
  {
    id: "rico-small-song-big-room",
    pageUrl: "web://soundwave.zone/users/rhymetaperico/home",
    ownerId: "rhymetape_rico",
    publishedAt: "1999-11-13T23:04:00",
    title: "SMALL SONG // BIG ROOM",
    paragraphs: [
      "It is wild watching the Byte Barn thing get bigger than the original store ever was. Still, my favorite version is the one somebody recorded too close to a cheap microphone, with a missed entrance and a laugh before the last hook. That is the whole reason to keep digging for weird songs. Somebody made a thing. Somebody else heard it."
    ],
    minimumPhase: 4
  },
  {
    id: "keesha-king-cal-field-study",
    pageUrl: "web://freshorbit.zone/users/tapedeckkeesha/home",
    ownerId: "tapedeck_keesha",
    publishedAt: "1999-11-07T18:07:00",
    title: "WHY I CAME HERE // KING CAL",
    paragraphs: [
      "I heard there was a whole website for King Cal commercials and signed up immediately. My dad says he sold lemons. I say he made six different songs about lemons, which is a completely different accomplishment. I am here to rank every commercial, preserve every tape, and prove the trumpet era was unfairly overlooked."
    ],
    minimumPhase: 2
  },
  {
    id: "ben-weird-stuff-field-trip",
    pageUrl: "web://freshorbit.zone/users/barnbeatben/home",
    ownerId: "barnbeat_ben",
    publishedAt: "1999-11-07T18:39:00",
    title: "WHY I CAME HERE // WEIRD STUFF",
    paragraphs: [
      "Somebody showed me an old computer-store song, then I found a pizza place with space music, a cereal toy with a theory page, and a dentist with a fish fans keep talking about. That is a perfect afternoon. I am making this page so nobody has to pretend the weird parts of Orbit are not the best parts."
    ],
    minimumPhase: 2
  },
  {
    id: "lily-first-field-notes",
    pageUrl: "web://freshorbit.zone/users/linklily/home",
    ownerId: "linklily_99",
    publishedAt: "1999-11-07T19:06:00",
    title: "WHY I CAME HERE // FIELD NOTES",
    paragraphs: [
      "I like pages that feel like somebody made them because they had to tell the world one very specific thing. A cave full of gems, a pet with a biography, a late-night radio page, a list of old games nobody remembers. I print the addresses, write down what surprised me, and follow whatever link looks most suspiciously handmade."
    ],
    minimumPhase: 2
  },
  {
    id: "rayna-first-week-online",
    pageUrl: "web://freshorbit.zone/users/rookierayna/home",
    ownerId: "rookie_rayna",
    publishedAt: "1999-11-07T17:22:00",
    title: "WHY I CAME HERE // FIRST WEEK ONLINE",
    paragraphs: [
      "I am new to all of this, including my computer. People said Orbit had weird pages and nice people who would explain things, and that turned out to be mostly true. I like the gardening pages, pet pages, music pages, and anything with instructions that does not assume I already know what every button does."
    ],
    minimumPhase: 2
  },
  {
    id: "zack-web-archaeology-start",
    pageUrl: "web://freshorbit.zone/users/rerunzack/home",
    ownerId: "rerun_zack",
    publishedAt: "1999-11-07T20:16:00",
    title: "WHY I CAME HERE // SAVE THE PAGES",
    paragraphs: [
      "Most people look at a broken button and leave. I look at it and wonder what it used to open. Orbit has old counters, old banners, abandoned pages, and sites that still think it is years ago. I am scanning, capturing, and labeling everything I can before the weirdest parts disappear."
    ],
    minimumPhase: 2
  },
  {
    id: "keesha-tape-got-weirder",
    pageUrl: "web://freshorbit.zone/users/tapedeckkeesha/home",
    ownerId: "tapedeck_keesha",
    publishedAt: "1999-11-11T18:23:00",
    title: "THE WARNING SONG IS ACTUALLY WEIRD",
    paragraphs: [
      "I was making a proper ranking for the King Cal warning song and somebody sent me a copy with an extra line that is not on my tape. It sounds like Cal, but it is saying something about the lot being watched. I asked three people. Nobody remembers it. I am putting it in the MAYBE REAL pile, which is a very small pile."
    ],
    minimumPhase: 3
  },
  {
    id: "keesha-kingdom-stays-open",
    pageUrl: "web://freshorbit.zone/users/tapedeckkeesha/home",
    ownerId: "tapedeck_keesha",
    publishedAt: "1999-11-13T19:44:00",
    title: "THE KINGDOM TAPE VAULT IS BUSY",
    paragraphs: [
      "Everybody is talking about the huge Byte Barn record, but I am seeing new people discover King Cal too, which is correct. A good local commercial does not need to be important to be legendary. It just needs a fake trumpet, a bad suit, and somebody willing to record it before the next song starts."
    ],
    minimumPhase: 4
  },
  {
    id: "ben-links-moving",
    pageUrl: "web://freshorbit.zone/users/barnbeatben/home",
    ownerId: "barnbeat_ben",
    publishedAt: "1999-11-11T20:08:00",
    title: "MY LIST KEEPS GETTING LONGER",
    paragraphs: [
      "I swear I did not add three of these new weird-page links. One has an old logo, one has a page counter stuck at zero, and one recommends that I stop looking at it. That is a bad recommendation. Also, the Bubble Borough dryer music is still good, so at least one thing remains trustworthy."
    ],
    minimumPhase: 3
  },
  {
    id: "ben-orbit-kept-the-good-weird",
    pageUrl: "web://freshorbit.zone/users/barnbeatben/home",
    ownerId: "barnbeat_ben",
    publishedAt: "1999-11-13T21:33:00",
    title: "GOOD WEIRD WON",
    paragraphs: [
      "The big Byte Barn thing brought in a million people, or at least enough that my counter is tired. Some folks are arguing about old secrets. I am still recommending the pizza place, the dentist fish, the cereal radio, and every page that makes somebody say \"wait, what?\" That is what I came here for."
    ],
    minimumPhase: 4
  },
  {
    id: "lily-binder-does-not-match",
    pageUrl: "web://freshorbit.zone/users/linklily/home",
    ownerId: "linklily_99",
    publishedAt: "1999-11-11T19:28:00",
    title: "FIELD NOTE // THE BINDER DISAGREES",
    paragraphs: [
      "I printed a page last week and checked it today. Same address, different words, and one photograph I am certain was not there before. I put both copies in the binder because that is what a binder is for. If Orbit is changing while we look at it, the proper response is to write down what changed."
    ],
    minimumPhase: 3
  },
  {
    id: "lily-field-trip-continues",
    pageUrl: "web://freshorbit.zone/users/linklily/home",
    ownerId: "linklily_99",
    publishedAt: "1999-11-13T18:52:00",
    title: "FIELD TRIP STATUS // STILL OPEN",
    paragraphs: [
      "The Byte Barn festival announcement is enormous, the arguments are enormous, and my binder is now too heavy for one hand. But people are still sending each other good links. I think that is the nicest surprise: a weird little web field trip became a place where strangers keep saying, \"you have to see this.\""
    ],
    minimumPhase: 4
  },
  {
    id: "rayna-first-glitch",
    pageUrl: "web://freshorbit.zone/users/rookierayna/home",
    ownerId: "rookie_rayna",
    publishedAt: "1999-11-11T17:41:00",
    title: "NEW LESSON // COMPUTERS CAN BE CREEPY",
    paragraphs: [
      "Today I learned that a page can change while you are not looking at it, which I do not like. An old account wrote a post that looked almost like a normal person wrote it, except it called a cat a \"soft household animal.\" I showed my cousin. He said maybe that is just the internet. I hope not."
    ],
    minimumPhase: 3
  },
  {
    id: "rayna-first-community",
    pageUrl: "web://freshorbit.zone/users/rookierayna/home",
    ownerId: "rookie_rayna",
    publishedAt: "1999-11-13T20:37:00",
    title: "DAY ??? // I KNOW PEOPLE HERE NOW",
    paragraphs: [
      "The Byte Barn song is everywhere and I still do not know how to make a page button without breaking it, but people keep answering my questions. I know where to find a weird cartoon, who has a good dog page, and why not to start a console argument. That feels like being online for real."
    ],
    minimumPhase: 4
  },
  {
    id: "zack-capture-is-not-proof",
    pageUrl: "web://freshorbit.zone/users/rerunzack/home",
    ownerId: "rerun_zack",
    publishedAt: "1999-11-11T22:17:00",
    title: "CAPTURE LOG // TWO VERSIONS OF THE SAME PAGE",
    paragraphs: [
      "I have two screenshots from the same address, taken six days apart. The older one has a broken image and the newer one has an image that looks old enough to have always been there. That is not how a normal archive behaves. I labeled both files clearly because someday someone is going to ask which version came first."
    ],
    minimumPhase: 3
  },
  {
    id: "zack-archive-needs-people",
    pageUrl: "web://freshorbit.zone/users/rerunzack/home",
    ownerId: "rerun_zack",
    publishedAt: "1999-11-13T23:12:00",
    title: "ARCHIVE NOTE // KEEP THE WEIRD PARTS",
    paragraphs: [
      "The Byte Barn record is making people look at Orbit like it is new. Fine by me. I am saving the banners, the bad buttons, the background loops, and the comments where somebody tells another person about a page they loved. The pages matter. The people pointing at them matter more."
    ],
    minimumPhase: 4
  },
  {
    id: "dot-counter-reset-log",
    pageUrl: "web://fanverse.zone/users/deepdelverdot/home",
    ownerId: "deepdelver_dot",
    publishedAt: "1999-11-07T02:14:00",
    title: "FIELD LOG // THE COUNTER RESET, THE CAVE DID NOT",
    paragraphs: [
      "CONFIRMED: depth 999 rolls to 000 and play continues. The next rooms use black-water tiles, new sound cues, and a treasure chest not present in the printed guide. I found a quartz crown, damp royal gloves, and a wall painting of a tiny crowned Lusterkin lowering a lantern into an ocean.",
      "Everybody is discussing something called Byte Barn. I am happy for them. The gloves point downward."
    ],
    minimumPhase: 2
  },
  {
    id: "dot-black-tide-log",
    pageUrl: "web://fanverse.zone/users/deepdelverdot/home",
    ownerId: "deepdelver_dot",
    publishedAt: "1999-11-11T03:17:00",
    title: "FIELD LOG // BLACK TIDE SPECIMENS",
    paragraphs: [
      "The second descent has become a sea. It is technically still a cave, but the rock moves like water and the water has stalactites. Jewel-shell snails now carry door-sized pearls. One pearl opened after I left the keyboard alone for sixty seconds. Inside was a chair, a crown-shaped shadow, and a knocking sound from underneath the floor.",
      "RUMORED: the Lusterkin king is sleeping below the counter. CONFIRMED: I should have stopped two saves ago."
    ],
    minimumPhase: 3
  },
  {
    id: "dot-lusterkin-vault-log",
    pageUrl: "web://fanverse.zone/users/deepdelverdot/home",
    ownerId: "deepdelver_dot",
    publishedAt: "1999-11-13T04:26:00",
    title: "FIELD LOG // THE LUSTERKIN VAULT",
    paragraphs: [
      "I reached the unlisted layer. The cave is black all the way through, with stalagmites hanging upward in a dark sea. The runed marker calls it the Lusterkin Vault. The cracked crown floats over an empty chair, and the singing pebble adds the missing note to the music loop.",
      "My current theory is that the game forgot it had buried a king. This is the best thing I have ever found. Please scroll carefully."
    ],
    minimumPhase: 4
  },
  {
    id: "cal-orbit-arrival",
    pageUrl: "web://gamegrid.zone/users/riftscribethane/home",
    ownerId: "riftscribe_thane",
    publishedAt: "1999-11-13T18:06:00",
    title: "IS THIS PLACE ACTUALLY ACTIVE?",
    paragraphs: [
      "I was looking for a clean scan of the Root War guide and somehow found Orbit. There are real pages here. There are comments. There is apparently a computer-store song everybody knows now. I am making an archive before someone tells me this was all a dream."
    ],
    minimumPhase: 4
  },
  {
    id: "cal-storm-crown-line",
    pageUrl: "web://gamegrid.zone/users/riftscribethane/home",
    ownerId: "riftscribe_thane",
    publishedAt: "1999-11-13T18:39:00",
    title: "STORM CROWN REBIRTH // FIRST LIST",
    paragraphs: [
      "The deck is not a bird deck. It is a relic-return deck wearing feathers so opponents waste their removal early. Stormwing Reclaimer throws away Sunken Standard, Cinder Phoenix brings it back, then Prism Golem stops being polite. I tested it against three different shop regulars and two are now pretending they had bad draws."
    ],
    minimumPhase: 4
  },
  {
    id: "cal-oracle-lore",
    pageUrl: "web://gamegrid.zone/users/riftscribethane/home",
    ownerId: "riftscribe_thane",
    publishedAt: "1999-11-13T19:14:00",
    title: "THORN ORACLE IS NOT JUST A TWO-DROP",
    paragraphs: [
      "The antlers, the owl, the roots around the staff: all Root War marks. The common card text only lets you look at three cards, but the old guide says she watched the kingdom names get buried under the grove. If you have a spare copy, do not trade it to somebody who calls it bulk."
    ],
    minimumPhase: 4
  },
  {
    id: "cal-trade-call",
    pageUrl: "web://gamegrid.zone/users/riftscribethane/home",
    ownerId: "riftscribe_thane",
    publishedAt: "1999-11-13T20:02:00",
    title: "TRADE CALL // BLACKWAKE SERPENT",
    paragraphs: [
      "Seeking one Blackwake Serpent in playable shape. I have a foil Cog Goblin, Root War commons, and the kind of trade binder organization that makes adults say I am 'very prepared.' Do not send me a card with a crease and call it character."
    ],
    minimumPhase: 4
  },
  {
    id: "thane-found-a-community",
    pageUrl: "web://gamegrid.zone/users/riftscribethane/home",
    ownerId: "riftscribe_thane",
    publishedAt: "1999-11-13T21:27:00",
    title: "FIVE POSTS IN ONE NIGHT IS NORMAL",
    paragraphs: [
      "I finally found a page where someone was arguing about a mana curve instead of telling me to go outside. This is great. If you play Riftborne, leave a deck list. If you do not, ask me what card art you like and I will give you exactly one beginner deck recommendation. Probably."
    ],
    minimumPhase: 4
  },
  {
    id: "rae-orbit-arrival",
    pageUrl: "web://gamegrid.zone/users/minimarshalrae/home",
    ownerId: "minimarshal_rae",
    publishedAt: "1999-11-13T18:22:00",
    title: "THANE FOUND A WHOLE OTHER TABLE",
    paragraphs: [
      "Thane sent me an Orbit address while I was varnishing the Red Banner cavalry. There are actual people posting here, so I am putting up a campaign page before I talk myself out of sharing the catacomb map. The map is good. The party is not."
    ],
    minimumPhase: 4
  },
  {
    id: "rae-mud-gate-session",
    pageUrl: "web://gamegrid.zone/users/minimarshalrae/home",
    ownerId: "minimarshal_rae",
    publishedAt: "1999-11-13T19:08:00",
    title: "SESSION 18 // THE MUD GATE INCIDENT",
    paragraphs: [
      "Sir Arden opened a locked gate perfectly. Behind it were polite skeletons, a flooded chapel, and the cursed bell we have been looking for since spring. The dwarf touched the bell. The Mire Dragon woke up. I have attached no spoilers because our bard reads Orbit now, but the dragon is green and looks extremely disappointed in us."
    ],
    minimumPhase: 4
  },
  {
    id: "rae-bannerfall-red-banner",
    pageUrl: "web://gamegrid.zone/users/minimarshalrae/home",
    ownerId: "minimarshal_rae",
    publishedAt: "1999-11-13T20:47:00",
    title: "RED BANNER INFANTRY // FINALLY BASED",
    paragraphs: [
      "Nineteen spears, six shields, one captain, and no more bare plastic. I made the ground look muddy by using three browns, one tea bag, and an amount of patience I do not normally possess. If the swamp lancers look haunted, that is because I dropped their commander in the paint water and turned it into lore."
    ],
    minimumPhase: 4
  },
  {
    id: "burt-is-this-where-old-games-go",
    pageUrl: "web://gamegrid.zone/users/bitbunkerburt/home",
    ownerId: "bitbunker_burt",
    publishedAt: "1999-11-09T20:18:00",
    title: "I AM NOT PUTTING THIS IN THE NEWCOMERS ZONE",
    paragraphs: [
      "Someone pointed me toward Orbit and then suggested the Newbie Nebula. I have been programming little games since the average home computer had less memory than a modern greeting card. I am new to this particular service, not new to sitting too close to a CRT. There is a difference."
    ],
    minimumPhase: 3
  },
  {
    id: "burt-nova-siege-record",
    pageUrl: "web://gamegrid.zone/users/bitbunkerburt/home",
    ownerId: "bitbunker_burt",
    publishedAt: "1999-11-13T19:31:00",
    title: "NOVA SIEGE STILL HAS THE BEST LAST WAVE",
    paragraphs: [
      "I brought out the Comet-64 for the new traffic around here and lost three evenings to Nova Siege. There are perhaps twelve pixels in the enemy flagship, but it somehow looks more threatening than every new 3D monster with a cutscene. The old tricks were better because they had to be."
    ],
    minimumPhase: 4
  },
  {
    id: "burt-mystery-cartridge",
    pageUrl: "web://gamegrid.zone/users/bitbunkerburt/home",
    ownerId: "bitbunker_burt",
    publishedAt: "1999-11-13T21:11:00",
    title: "THE STRIPED CARTRIDGE BOOTS AGAIN",
    paragraphs: [
      "The unlabeled Starlark cartridge that has haunted my shelf since 1986 finally booted after I cleaned the contacts. Purple hallway. One doorway. A sound like a modem dreaming. I have no idea whether it is a game, a demo, or somebody's very strange homework assignment, but I am making a map before I go through the door."
    ],
    minimumPhase: 4
  }
];

function authoredPageUpdateTimestamp(post: AuthoredPageUpdate) {
  if (post.minimumPhase === 1) return post.publishedAt;
  const reachedAt = state.phaseReachedAt[String(post.minimumPhase) as "2" | "3" | "4"];
  if (!reachedAt) return post.publishedAt;
  const templateTime = new Date(post.publishedAt);
  const dynamicDate = new Date(reachedAt);
  dynamicDate.setDate(dynamicDate.getDate() - 1);
  dynamicDate.setHours(
    templateTime.getHours(),
    templateTime.getMinutes(),
    templateTime.getSeconds(),
    0
  );
  return localGameTimeString(dynamicDate);
}

function authoredPageUpdateFeed(page: PageDefinition) {
  const personalUpdate = state.storyPhase >= 2
    ? phaseTwoPersonalUpdates.find((update) => update.homeUrl === page.url)
    : undefined;
  const posts: AuthoredPageUpdate[] = [
    ...AUTHORED_PAGE_UPDATES.filter((update) => update.pageUrl === page.url && state.storyPhase >= update.minimumPhase),
    ...(personalUpdate ? [{
      id: `personal-${personalUpdate.ownerId}`,
      pageUrl: personalUpdate.homeUrl,
      ownerId: personalUpdate.ownerId,
      publishedAt: "1999-11-04T19:12:00",
      title: personalUpdate.title,
      paragraphs: [personalUpdate.teaser],
      minimumPhase: 2 as StoryPhase,
      action: { label: "READ THE THEORY ›", url: personalUpdate.url }
    }] : [])
  ]
    .map((post) => ({ ...post, publishedAt: authoredPageUpdateTimestamp(post) }))
    .sort((left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt));
  if (!posts.length) return "";
  return `<section class="page-update-feed owner-${page.ownerId}" aria-label="Recent page updates">
    <header><b>RECENT POSTS</b><span>newest first</span></header>
    <div class="page-update-thread">${posts.map((post) => {
      const owner = PAGE_OWNERS[post.ownerId];
      const author = owner?.screenName ?? post.ownerId;
      const displayName = owner?.displayName ?? author;
      return `<article class="page-update-post site-${page.site}">
        <div class="page-update-avatar" aria-hidden="true">${escapeHtml(displayName.slice(0, 1).toUpperCase())}</div>
        <div class="page-update-body">
          <header><b>${escapeHtml(author)}</b><span>${escapeHtml(displayName)}</span><time datetime="${post.publishedAt}">${formatGameTimestamp(post.publishedAt)}</time></header>
          <h2>${escapeHtml(post.title)}</h2>
          ${post.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
          ${post.action ? `<button data-nav="${escapeHtml(post.action.url)}">${escapeHtml(post.action.label)}</button>` : ""}
        </div>
      </article>`;
    }).join("")}</div>
  </section>`;
}

function cursorDownloadLink(page: PageDefinition) {
  const cursor = CURSOR_DOWNLOAD_SOURCES[page.url];
  if (!cursor) return "";
  const downloaded = Boolean(state.flags[`${cursor.cursor}_downloaded`]);
  return `<aside class="cursor-download-link site-${page.site}" aria-label="Cursor download">
    ${downloaded
      ? `<img class="cursor-download-graphic" src="${cursorDownloadGraphicUrl}" alt="Download cursor">`
      : `<button class="cursor-download-graphic" type="button" data-download-cursor="${escapeHtml(cursor.cursor)}" aria-label="Download ${escapeHtml(cursor.label)}"><img src="${cursorDownloadGraphicUrl}" alt="Download cursor"></button>`}
    <div><b>${escapeHtml(cursor.label)}</b><span>${escapeHtml(cursor.note)}</span>${downloaded ? "<em>Already downloaded</em>" : ""}</div>
  </aside>`;
}

function musicDownloadLink(page: PageDefinition) {
  const playlist = pageMusicPlaylist(page);
  const uniqueTracks = [...new Map(playlist.map((track) => [track.url, track])).values()];
  const allDownloaded = uniqueTracks.every((track) => state.musicLibrary.some((entry) => entry.url === track.url));
  const trackLabel = `${uniqueTracks.length} ${uniqueTracks.length === 1 ? "track" : "tracks"}`;
  return `<aside class="music-download-link" aria-label="Download this page's music">
    <button class="music-download-graphic" type="button" data-download-music="${escapeHtml(page.url)}" aria-label="Add ${trackLabel} from ${escapeHtml(page.title)} to OrbitAmp"><img src="${musicDownloadGraphicUrl}" alt="Download music"></button>
    <span>${allDownloaded ? "PLAYLIST ALREADY IN ORBITAMP" : `ADD ${trackLabel.toUpperCase()} TO ORBITAMP`}</span>
  </aside>`;
}

function zoneDownloadLinks(page: PageDefinition) {
  const zone = ZONE_DOWNLOAD_SOURCES[page.url as keyof typeof ZONE_DOWNLOAD_SOURCES];
  if (!zone) return "";
  const wallpaperDownloaded = Boolean(state.flags[`wallpaper_${zone.id}_downloaded`]);
  const themeDownloaded = Boolean(state.flags[`theme_${zone.id}_downloaded`]);
  const skinDownloaded = zone.skinId && Boolean(state.flags[`music_skin_${zone.skinId}_downloaded`]);
  return `<section class="zone-download-links site-${page.site}" aria-label="${escapeHtml(zone.title)} downloads">
    <div class="zone-download-card">
      ${wallpaperDownloaded
        ? `<img class="zone-download-graphic" src="${wallpaperDownloadGraphicUrl}" alt="Download wallpaper">`
        : `<button class="zone-download-graphic" type="button" data-download-wallpaper="${zone.id}" aria-label="Download ${escapeHtml(zone.title)} wallpaper"><img src="${wallpaperDownloadGraphicUrl}" alt="Download wallpaper"></button>`}
      <div><b>${escapeHtml(zone.title)} DESKTOP WALLPAPER</b><span>${wallpaperDownloaded ? "Already downloaded — select it in Desktop Settings." : "Add this zone's desktop wallpaper to your collection."}</span></div>
    </div>
    <div class="zone-download-card">
      ${themeDownloaded
        ? `<img class="zone-download-graphic" src="${themeDownloadGraphicUrl}" alt="Download desktop theme">`
        : `<button class="zone-download-graphic" type="button" data-download-theme="${zone.id}" aria-label="Download ${escapeHtml(zone.title)} desktop theme"><img src="${themeDownloadGraphicUrl}" alt="Download desktop theme"></button>`}
      <div><b>${escapeHtml(zone.title)} DESKTOP THEME</b><span>${themeDownloaded ? "Already downloaded — select it in Desktop Settings." : "Add this zone's color theme to your collection."}</span></div>
    </div>
    ${zone.skinId ? `<div class="zone-download-card">
      ${skinDownloaded
        ? `<img class="zone-download-graphic skin" src="${playerSkinDownloadGraphicUrl}" alt="Download player skin">`
        : `<button class="zone-download-graphic skin" type="button" data-download-music-skin="${zone.skinId}" aria-label="Download ${escapeHtml(zone.title)} OrbitAmp skin"><img src="${playerSkinDownloadGraphicUrl}" alt="Download player skin"></button>`}
      <div><b>${escapeHtml(zone.title)} ORBITAMP SKIN</b><span>${skinDownloaded ? "Already installed in OrbitAmp." : "Install this zone's player skin in OrbitAmp."}</span></div>
    </div>` : ""}
  </section>`;
}

function bookmarkLinksHtml() {
  const visibleBookmarks = state.bookmarks.slice(0, 4);
  const overflowBookmarks = state.bookmarks.slice(4);
  const visibleLinks = visibleBookmarks
    .map((url) => `<button data-nav="${escapeHtml(url)}">${escapeHtml(pages[url]?.title ?? url)}</button>`)
    .join("");
  const overflow = overflowBookmarks.length
    ? `<label class="bookmark-overflow"><span>More</span><select data-bookmark-overflow aria-label="More favorite websites">
        <option value="">${overflowBookmarks.length} more favorite${overflowBookmarks.length === 1 ? "" : "s"}…</option>
        ${overflowBookmarks.map((url) => `<option value="${escapeHtml(url)}">${escapeHtml(pages[url]?.title ?? url)}</option>`).join("")}
      </select></label>`
    : "";
  return `<div class="bookmark-row"><span>Links:</span><div class="bookmark-visible-links">${visibleLinks}</div>${overflow}</div>`;
}

function browserWindow() {
  const page = currentPage();
  const bookmarked = state.bookmarks.includes(state.currentUrl);
  const pageCopySaved = state.downloads.some((file) => file.id === evidenceSnapshotId(page.url));
  const hasZoneUserFrame = page.hubId?.startsWith("zone-") ?? false;
  const pageContents = `${page.render(state)}${authoredPageUpdateFeed(page)}${cursorDownloadLink(page)}${byteBarnCoverUpdate(page)}${page.commentsEnabled ? pageCommentSection(page) : ""}${musicDownloadLink(page)}${zoneDownloadLinks(page)}${randyInjectionLayer(page)}`;
  const framedPageContents = hasZoneUserFrame ? `<div class="user-page-frame">${pageContents}</div>` : pageContents;
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
      <button data-download-page="${escapeHtml(page.url)}" class="save-page ${pageCopySaved ? "active" : ""}" title="${pageCopySaved ? "Update saved text copy" : "Save text copy to My Files"}" aria-label="${pageCopySaved ? "Update saved text copy" : "Save text copy to My Files"}"><i class="save-page-glyph" aria-hidden="true"><span></span></i></button>
    </div>
    ${bookmarkLinksHtml()}
    <div class="browser-viewport site-${page.site}${hasZoneUserFrame ? " user-page-viewport" : ""}">
      <svg class="web-era-filter-defs" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
        <filter id="orbit-web-era-raster" color-interpolation-filters="sRGB">
          <feComponentTransfer in="SourceGraphic" result="posterized">
            <feFuncR type="discrete" tableValues="0 .16 .32 .49 .66 .83 1" />
            <feFuncG type="discrete" tableValues="0 .16 .32 .49 .66 .83 1" />
            <feFuncB type="discrete" tableValues="0 .16 .32 .49 .66 .83 1" />
          </feComponentTransfer>
          <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="1" seed="1998" result="webGrain" />
          <feColorMatrix in="webGrain" type="matrix" values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .16 0" result="webGrainLow" />
          <feBlend in="posterized" in2="webGrainLow" mode="multiply" />
        </filter>
      </svg>
      <div class="browser-page-scale text-${state.settings.browserTextSize}">${framedPageContents}</div>
    </div>
    <footer class="browser-footer">${pageMusicPlayer(page)}<div class="browser-status"><span>Internet zone</span><span>${state.visited.length} pages visited</span></div></footer>`);
}

function randyInjectionLayer(page: PageDefinition) {
  const invaded = state.infection.invadedPersonalPages.includes(page.url);
  const level = state.storyPhase === 6 && invaded && !state.infection.cleanupComplete ? state.infection.level : 0;
  const exempt = page.site === "orbitlegacy" || page.site === "revival" || page.url.includes("legacy.orbitos") || page.url.includes("byteforge");
  if (level < 2 || exempt) return "";
  const recommendations = level >= 3 ? `<nav class="randy-false-nav"><button data-nav="${RANDY_PAGES[1]}">RANDY RECOMMENDS GAMES</button><button data-nav="${RANDY_PAGES[2]}">RANDY RECOMMENDS PETS</button></nav>` : "";
  const obstruction = level >= 4 ? `<aside class="randy-nuisance-window"><button aria-label="Close" data-randy-dismiss>×</button><b>BIG PAGE GUY CHECKING IN!!!</b><p>This community has been accelerated for easier Randy discovery.</p></aside>` : "";
  return `<section class="randy-injection level-${level}" aria-label="Unwanted WideWorld page injection"><header><b>R</b><span>BIG ${escapeHtml(page.title.toUpperCase())} GUY CHECKING IN!!!</span><button data-randy-signature>WHY AM I SEEING THIS?</button></header>${recommendations}${obstruction}</section>`;
}

function bbsWindow() {
  return windowShell("bbs", "Orbit Terminal - BYTEFORGE BBS", ">_", renderByteForge(state));
}

function syncBrowserViewportBackground() {
  const viewport = document.querySelector<HTMLElement>(".browser-viewport");
  const pageRoot = viewport?.querySelector<HTMLElement>(".browser-page-scale .page");
  if (!viewport || !pageRoot) return;
  const background = getComputedStyle(pageRoot);
  viewport.style.backgroundColor = background.backgroundColor;
  viewport.style.backgroundImage = background.backgroundImage;
  viewport.style.backgroundRepeat = background.backgroundRepeat;
  viewport.style.backgroundPosition = background.backgroundPosition;
  viewport.style.backgroundSize = background.backgroundSize;
  viewport.style.backgroundAttachment = background.backgroundAttachment;
  if (viewport.classList.contains("user-page-viewport")) {
    viewport.querySelector<HTMLElement>(".user-page-frame")?.style.setProperty("--user-page-frame-color", background.backgroundColor);
    pageRoot.classList.add("page-frame-ready");
  }
}

function decorateUnreadCommentEntrypoints() {
  const unreadKinds = new Map<string, "comment" | "legacy-discovery">();
  for (const comment of state.pageComments) {
    if (
      comment.role === "player" ||
      !deliveryIsAvailable(comment.availableAt, state.gameTime) ||
      comment.revealAfterVisit <= (state.pageVisitCounts[comment.pageUrl] ?? 0)
    ) continue;
    const kind = state.storyPhase >= 3 && DORMANT_LEGACY_PERSONA_IDS.has(comment.ownerId)
      ? "legacy-discovery"
      : "comment";
    if (kind === "legacy-discovery" || !unreadKinds.has(comment.pageUrl)) {
      unreadKinds.set(comment.pageUrl, kind);
    }
  }
  if (!unreadKinds.size) return;
  document.querySelectorAll<HTMLElement>("[data-nav]").forEach((entrypoint) => {
    const targetUrl = entrypoint.dataset.nav?.trim().toLowerCase();
    const kind = targetUrl ? unreadKinds.get(targetUrl) : null;
    if (!targetUrl || !kind || entrypoint.querySelector(".unread-comment-marker")) return;
    entrypoint.classList.add("has-unread-comments");
    if (kind === "legacy-discovery") entrypoint.classList.add("has-phase-three-discovery");
    const label = kind === "legacy-discovery" ? "Newly restored account appeared here" : "Unread new comment";
    entrypoint.insertAdjacentHTML("beforeend", `<span class="unread-comment-marker ${kind === "legacy-discovery" ? "legacy-discovery" : ""}" title="${label}" aria-label="${label}">!</span>`);
  });
}

function businessCollectibleArt(artId?: string) {
  return artId && Object.prototype.hasOwnProperty.call(BUSINESS_COLLECTIBLE_ART, artId)
    ? BUSINESS_COLLECTIBLE_ART[artId as BusinessCollectibleId]
    : null;
}

const LEGACY_COLLECTIBLE_ART = {
  calSedan: new URL("../assets/images/dealer-web/cal-sedan.png", import.meta.url).href,
  calMinivan: new URL("../assets/images/dealer-web/cal-minivan.png", import.meta.url).href,
  calPickup: new URL("../assets/images/dealer-web/cal-pickup.png", import.meta.url).href,
  byteSystem: new URL("../assets/images/business-web/bytebarn-system.png", import.meta.url).href,
  byteModem: new URL("../assets/images/business-web/bytebarn-modem.png", import.meta.url).href,
  byteSoftware: new URL("../assets/images/business-web/bytebarn-software.png", import.meta.url).href,
  cosmicPizza: new URL("../assets/images/business-web/cosmiccrust-pizza.png", import.meta.url).href,
  cosmicSlice: new URL("../assets/images/business-web/cosmiccrust-slice.png", import.meta.url).href,
  cosmicArcade: new URL("../assets/images/business-web/cosmiccrust-arcade.png", import.meta.url).href,
  bubbleWashers: new URL("../assets/images/filler-business/bubble-washers.png", import.meta.url).href,
  bubbleSock: new URL("../assets/images/filler-business/bubble-sock.png", import.meta.url).href,
  bubbleFolded: new URL("../assets/images/filler-business/bubble-folded.png", import.meta.url).href
} as const;

function businessCollectibleLayout(id?: BusinessCollectibleId) {
  const layout = id ? BUSINESS_COLLECTIBLES[id]?.layout : undefined;
  if (!layout) return "";
  if (layout === "kingcal") return `<section class="web-junk-layout web-junk-kingcal" aria-label="King Cal weekly deals flyer">
    <header><span>♛</span><b>KING CAL'S AUTO KINGDOM</b><em>ROYAL WEEKLY DEALS</em></header>
    <div class="web-junk-hero"><img src="${LEGACY_COLLECTIBLE_ART.calSedan}" alt="Burgundy Crown Regent used sedan"><div><strong>1990 CROWN REGENT</strong><small>142,000 mi · automatic · distinguished accent trunk panel</small><b>$89 <i>/ WEEK</i></b><mark>$1,999 down · 156 weekly opportunities</mark></div></div>
    <div class="web-junk-grid"><article><img src="${LEGACY_COLLECTIBLE_ART.calMinivan}" alt="Blue Family Voyager minivan"><b>FAMILY VOYAGER</b><span>seven seats · seasonal air</span><strong>$7,995 cash</strong></article><article><img src="${LEGACY_COLLECTIBLE_ART.calPickup}" alt="Red Workhorse pickup"><b>WORKHORSE</b><span>mileage exempt · donor tailgate</span><strong>$109 / week</strong></article></div>
    <footer>ALL CHARIOTS SOLD AS IS · ASK FOR THE BUYERS GUIDE · THE CROWN IS DECORATIVE</footer>
  </section>`;
  if (layout === "bytebarn") return `<section class="web-junk-layout web-junk-bytebarn" aria-label="Byte Barn manual sampler">
    <header><b>BYTE BARN</b><em>OWNER'S MANUAL SAMPLER</em><span>NO MYSTERY PARTS</span></header>
    <div class="web-junk-hero"><img src="${LEGACY_COLLECTIBLE_ART.byteSystem}" alt="Byte Barn beige family computer"><div><strong>ORBIT 350 HOME SYSTEM</strong><small>Summit II processor · 64 MB memory · 56K modem · speakers</small><b>$1,299 <i>complete</i></b><mark>ASK CHIP ABOUT THE CABLE YOU LOST</mark></div></div>
    <div class="web-junk-grid"><article><img src="${LEGACY_COLLECTIBLE_ART.byteModem}" alt="External 56K modem"><b>56K MODEM KIT</b><span>cable · setup guide · patience</span><strong>$79</strong></article><article><img src="${LEGACY_COLLECTIBLE_ART.byteSoftware}" alt="Computer software box"><b>SAFE SOFTWARE</b><span>games · homework · no surprises</span><strong>from $19</strong></article></div>
    <footer>DO NOT FORCE CONNECTORS · IF IT DOES NOT FIT, CALL THE STORE</footer>
  </section>`;
  if (layout === "cosmiccrust") return `<section class="web-junk-layout web-junk-cosmic" aria-label="Cosmic Crust printable coupon sheet">
    <header><b>COSMIC CRUST</b><em>SPACE COUPON SHEET</em><span>VALID ON EARTH</span></header>
    <div class="web-junk-cosmic-main"><img src="${LEGACY_COLLECTIBLE_ART.cosmicPizza}" alt="Cosmic Crust pizza"><div><strong>FAMILY ORBIT</strong><b>2 large pizzas</b><small>Bring this page to the counter. Extra toppings cost regular Earth money.</small></div></div>
    <div class="web-junk-grid"><article><img src="${LEGACY_COLLECTIBLE_ART.cosmicSlice}" alt="Cosmic pizza slice"><b>PERSONAL PLANET</b><span>one small cheese pizza</span><strong>save $1</strong></article><article><img src="${LEGACY_COLLECTIBLE_ART.cosmicArcade}" alt="Cosmic Crust arcade"><b>ARCADE ORBIT</b><span>four game tokens</span><strong>one bonus play</strong></article></div>
    <footer>CLIP ALONG DOTTED LINE · ONE COUPON PER TERRAN · NOT A FLIGHT VOUCHER</footer>
  </section>`;
  return `<section class="web-junk-layout web-junk-bubble" aria-label="Bubble Borough printable dryer guide">
    <header><b>BUBBLE BOROUGH</b><em>TOKEN &amp; DRYER GUIDE</em><span>CHECK POCKETS</span></header>
    <div class="web-junk-hero"><img src="${LEGACY_COLLECTIBLE_ART.bubbleWashers}" alt="Rows of Bubble Borough washers"><div><strong>THE COUNTER CARD</strong><small>Tokens stay blue. Socks do not stay paired. Both facts are accepted here.</small><b>1 token <i>per wash</i></b><mark>LAST WASH STARTS 45 MINUTES BEFORE CLOSE</mark></div></div>
    <div class="web-junk-grid"><article><img src="${LEGACY_COLLECTIBLE_ART.bubbleSock}" alt="Lost sock illustration"><b>STEP 1</b><span>check every pocket</span><strong>no crayons</strong></article><article><img src="${LEGACY_COLLECTIBLE_ART.bubbleFolded}" alt="Folded laundry"><b>STEP 2</b><span>clean the lint screen</span><strong>be kind</strong></article></div>
    <footer>ASK BABS IF A MACHINE MAKES A NEW NOISE · IT PROBABLY HAS A NAME</footer>
  </section>`;
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
    const unread = !state.readDirectMessageIds.includes(message.id);
    const selected = selectedMailMessageId === message.id;
    return `<button class="mail-row ${unread ? "unread" : ""} ${selected ? "selected" : ""}" data-direct-mail="${message.id}"><b>${unread ? "● " : ""}${escapeHtml(message.author)}</b><span>${escapeHtml(message.subject ?? "Re: Hello")}</span><time>${new Intl.DateTimeFormat([], { month: "numeric", day: "numeric" }).format(new Date(message.createdAt))}</time></button>`;
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

  const selectedContact = selectedEmail ? CHARACTER_CONTACTS[selectedEmail.ownerId] : null;
  const selectedMailArt = businessCollectibleArt(selectedEmail?.artId);
  const selectedAttachment = selectedEmail?.attachmentId && Object.prototype.hasOwnProperty.call(BUSINESS_COLLECTIBLES, selectedEmail.attachmentId)
    ? BUSINESS_COLLECTIBLES[selectedEmail.attachmentId as BusinessCollectibleId]
    : null;
  const selectedAttachmentSaved = selectedEmail?.attachmentId
    ? state.downloads.some((file) => file.id === `business-collectible:${selectedEmail.attachmentId}`)
    : false;
  const selectedLayout = selectedEmail?.attachmentId ? businessCollectibleLayout(selectedEmail.attachmentId as BusinessCollectibleId) : "";
  const preview = selectedEmail
    ? `<h3>${escapeHtml(selectedEmail.subject ?? "Message")}</h3><p><b>From:</b> ${escapeHtml(selectedEmail.author)}</p>
      ${selectedLayout || (selectedMailArt && selectedAttachment ? `<figure class="mail-illustration" data-art-id="${escapeHtml(selectedEmail?.attachmentId ?? "")}"><img src="${selectedMailArt}" alt="${escapeHtml(selectedAttachment.alt)}"><figcaption>${escapeHtml(selectedAttachment.title)}</figcaption></figure>` : "")}
      <p>${escapeHtml(selectedEmail.text).replaceAll("\n", "<br>")}</p>
      ${selectedAttachment && selectedEmail.attachmentId ? `<button class="mail-attachment" data-business-attachment="${escapeHtml(selectedEmail.attachmentId)}">${selectedAttachmentSaved ? "Open saved attachment" : `Save attachment: ${escapeHtml(selectedAttachment.filename)}`}</button>` : ""}
      ${selectedEmail.linkUrl ? `<button class="mail-page-link" data-mail-page="${escapeHtml(selectedEmail.linkUrl)}">${escapeHtml(selectedEmail.linkLabel ?? "Open linked page in Orbit Explorer")}</button>` : ""}
      ${selectedContact?.email ? `<button class="mail-reply-button" data-email-owner="${escapeHtml(selectedEmail.ownerId)}">Reply to ${escapeHtml(selectedContact.displayName)}</button>` : ""}`
    : `<p>Select a message to read it.</p>`;
  return windowShell("mail", "Orbit Mail", "@", `
    <div class="mail-toolbar">${state.visited.includes(CHARACTER_HOME_URLS.juniper_gdn) ? `<button data-email-owner="juniper_gdn">New Message to Juniper</button>` : ""}</div>
    <div class="mail-layout"><aside><b>Folders</b><span class="selected">📥 Inbox (${1 + receivedEmails.length}${state.flags.signal_note_downloaded ? "+1" : ""})</span></aside>
    <main class="inbox"><div class="mail-columns"><b>From</b><b>Subject</b><b>Received</b></div>
      <div class="mail-message-list">
      ${receipt}
      ${dynamicRows}
      <button class="mail-row unread" data-mail="welcome"><b>● OrbitNet Team</b><span>Welcome to Orbit!</span><time>11/03</time></button>
      </div>
      <article class="mail-preview" id="mail-preview">${preview}</article>
    </main></div>`);
}

function filesWindow() {
  const downloads = state.downloads.length
    ? state.downloads.map((file) => {
      const art = businessCollectibleArt(file.artId);
      const artifact = file.artId && Object.prototype.hasOwnProperty.call(BUSINESS_COLLECTIBLES, file.artId) ? BUSINESS_COLLECTIBLES[file.artId as BusinessCollectibleId] : null;
      return `<button class="file-icon ${file.sourceUrl ? "evidence-file" : ""} ${art ? "illustrated-file" : ""}" data-file="${file.id}">${art && artifact ? `<img src="${art}" alt="${escapeHtml(artifact.alt)}">` : `<span>${file.sourceUrl ? "📑" : "📄"}</span>`}<b>${escapeHtml(file.name)}</b>${file.sourceTitle ? `<small>${escapeHtml(file.sourceTitle)}</small>` : ""}</button>`;
    }).join("")
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
          ${Object.values(ZONE_DOWNLOAD_SOURCES).filter((zone) => state.flags[`theme_${zone.id}_downloaded`]).map((zone) =>
            settingOption("theme", `zone-${zone.id}`, `${zone.title} Theme`, "A color theme collected from this zone")
          ).join("")}
        </fieldset>
        <fieldset><legend>Wallpaper</legend>
          ${settingOption("wallpaper", "teal", "Orbit Teal", "The familiar OrbitOS desktop")}
          ${settingOption("wallpaper", "clouds", "Evening Clouds", "A dreamy violet sky at dusk")}
          ${Object.values(ZONE_DOWNLOAD_SOURCES).filter((zone) => state.flags[`wallpaper_${zone.id}_downloaded`]).map((zone) =>
            settingOption("wallpaper", `zone-${zone.id}`, `${zone.title} Download`, "A desktop wallpaper collected from this zone")
          ).join("")}
        </fieldset>
        <fieldset><legend>Mouse pointer</legend>
          ${settingOption("cursor", "arrow", "System Arrow", "Standard precise pointer")}
          ${settingOption("cursor", "star", "Star Pointer", "A playful unlockable-style cursor")}
          <div class="cursor-setting-grid">
            ${[
              ["cursor-01", "Chrome Arrow", "Clean silver system pointer"], ["cursor-02", "Knight's Gauntlet", "A chivalrous pointing glove"], ["cursor-03", "Wizard's Staff", "For selecting enchanted files"], ["cursor-04", "Quest Blade", "A fantasy-game sword pointer"], ["cursor-05", "Flame Trail", "Fast enough for a racing page"],
              ["cursor-06", "Arcade Stick", "One button, many opinions"], ["cursor-07", "Scanline Arrow", "A very CRT way to click"], ["cursor-08", "Pet Paw", "Approved by Pet Planet"], ["cursor-09", "Ray Blaster", "For suspicious alien links"], ["cursor-10", "VHS Ghost", "Haunted tape navigation"],
              ["cursor-11", "Breakbeat Bolt", "SoundWave after dark"], ["cursor-12", "Safety Pin", "Punk but functional"], ["cursor-13", "Pacific Wave", "A totally radical selector"], ["cursor-14", "Moto Tire", "Dirt, speed, and hyperlinks"], ["cursor-15", "Garden Trowel", "Cozy Commons edition"],
              ["cursor-16", "Raven Claw", "Backchannel-adjacent"], ["cursor-17", "Watcher Eye", "It sees the link before you do"], ["cursor-18", "Floppy Arrow", "Saved to disk"], ["cursor-19", "Pizza Slice", "Cosmic Crust delivery"], ["cursor-20", "Toy Robot", "Tiny mechanical helper"],
              ["cursor-21", "Tape Pointer", "Rewind before clicking"], ["cursor-22", "Crystal Blade", "Gemwell expedition gear"], ["cursor-23", "Star Fighter", "Game Grid launch mode"], ["cursor-24", "Office Glove", "Corporate web approved"], ["cursor-25", "Orbit Planet", "Officially unofficial OrbitOS"],
            ].map(([value, title, description]) => settingOption("cursor", value, title, description)).join("")}
          </div>
        </fieldset>
      </main>
    </div>
    <footer class="settings-footer"><span>Changes are saved to this profile.</span><button data-close="settings">OK</button></footer>`);
}

function diagnosticsWindow() {
  const recentMetrics = state.directMessages
    .filter((message) => message.metrics)
    .slice(-10)
    .reverse()
    .map((message) => {
      const metrics = message.metrics!;
      return `<tr>
        <td>${escapeHtml(message.author)}</td>
        <td>${escapeHtml(message.channel.toUpperCase())}</td>
        <td>${formatDuration(metrics.generationMs)}</td>
        <td>${metrics.outputTokens}</td>
        <td>${metrics.tokensPerSecond ?? "—"}</td>
      </tr>`;
    })
    .join("");
  const phaseLabel = aiStatus.phase === "error" ? "ERROR" : aiStatus.phase.toUpperCase();

  return windowShell("diagnostics", "OrbitOS System Diagnostics", "▤", `
    <div class="diagnostics-toolbar"><b>COMMUNICATIONS MODULE</b><button data-diagnostics-refresh>Refresh</button></div>
    <main class="diagnostics-layout">
      <section class="diagnostics-summary">
        <div><span>Status</span><b class="${aiStatus.phase === "error" ? "bad" : "good"}">${escapeHtml(phaseLabel)}</b></div>
        <div><span>Model</span><b>${escapeHtml(aiStatus.modelName)}</b></div>
        <div><span>Backend</span><b>${escapeHtml(aiStatus.backend ?? "Not selected")}</b></div>
        <div><span>Model load</span><b>${formatDuration(aiStatus.loadMs)}</b></div>
        <div><span>Warm-up</span><b>${formatDuration(aiStatus.warmupMs)}</b></div>
      </section>
      ${aiStatus.error ? `<p class="diagnostics-error">${escapeHtml(aiStatus.error)}</p>` : ""}
      <section class="diagnostics-history">
        <h2>Recent generations</h2>
        <table><thead><tr><th>Character</th><th>Channel</th><th>Time</th><th>Tokens</th><th>Tok/s</th></tr></thead>
        <tbody>${recentMetrics || `<tr><td colspan="5">No generation data recorded yet.</td></tr>`}</tbody></table>
      </section>
    </main>`);
}

function chatWindow() {
  for (const message of state.directMessages) {
    if (message.channel === "aim") ensureCharacterContact(message.ownerId);
  }
  const persona = CHARACTER_CONTACTS[activeAimOwnerId] ?? CHARACTER_CONTACTS.mira_917;
  const conversation = state.directMessages.filter((message) =>
    message.channel === "aim" &&
    message.ownerId === activeAimOwnerId &&
    (message.role === "player" || deliveryIsAvailable(message.availableAt, state.gameTime))
  );
  const activeNow = personaIsActiveAt(activeAimOwnerId, state.gameTime);
  const activeHours = personaActiveHoursLabel(activeAimOwnerId);
  const pendingKey = `aim:${activeAimOwnerId}`;
  const pending = pendingDirectReplies.has(pendingKey);
  const modelStarting = aiStatus.phase === "loading" || aiStatus.phase === "warming";
  const statusLabel = aiStatus.phase === "error"
    ? "OIM service unavailable"
    : modelStarting
      ? "Connecting to OIM service…"
      : pending
        ? "Sending message…"
        : "Connected to Orbit Messaging";

  const messageHtml = conversation.map((message) => {
    return `<article class="chat-message ${message.role === "owner" ? "character" : "player"}">
      <header><b>${message.role === "player" ? "You" : escapeHtml(message.author || persona.screenName)}</b><time>${new Date(message.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</time></header>
      <p>${escapeHtml(message.text)}</p>
    </article>`;
  }).join("");

  const pendingHtml = pending
    ? `<div class="typing-indicator"><i></i><i></i><i></i><span>${modelStarting ? "Connecting…" : "Sending…"}</span></div>`
    : "";
  const empty = !messageHtml && !pending
    ? `<div class="chat-empty"><b>${escapeHtml(persona.screenName)} is ${activeNow ? "online" : "away"}.</b><span>${activeNow ? "Messages should be answered quickly while they are online." : `Usually online ${escapeHtml(activeHours)}.`}</span><span>${modelStarting ? "Connecting to Orbit Messaging…" : "Type below to start chatting."}</span></div>`
    : "";
  const availableContacts = Object.entries(CHARACTER_CONTACTS)
    .filter(([ownerId, contact]) => (contact.aim || ownerId === activeAimOwnerId || state.directMessages.some((message) =>
      message.ownerId === ownerId && message.channel === "aim"
    )) && (
      ownerId === "mira_917" ||
      (ownerId === "ghostline" && state.storyPhase >= 2) ||
      ownerId === activeAimOwnerId ||
      state.directMessages.some((message) => message.ownerId === ownerId && message.channel === "aim" && message.role === "owner") ||
      state.visited.includes(CHARACTER_HOME_URLS[ownerId])
    ));
  let visibleContacts = availableContacts.slice(0, 4);
  const activeContact = availableContacts.find(([ownerId]) => ownerId === activeAimOwnerId);
  if (activeContact && !visibleContacts.some(([ownerId]) => ownerId === activeAimOwnerId)) {
    visibleContacts = [...visibleContacts.slice(0, 3), activeContact];
  }
  const visibleContactIds = new Set(visibleContacts.map(([ownerId]) => ownerId));
  const overflowContacts = availableContacts.filter(([ownerId]) => !visibleContactIds.has(ownerId));
  const contactButtons = visibleContacts.map(([ownerId, contact]) => {
    const unread = unreadDirectMessages("aim", ownerId).length;
    const contactActive = personaIsActiveAt(ownerId, state.gameTime);
    const contactHours = personaActiveHoursLabel(ownerId);
    return `<button data-aim-contact="${ownerId}" class="${ownerId === activeAimOwnerId ? "selected" : ""} ${contactActive ? "" : "away"}" title="${contactActive ? "Online now" : `Away — usually online ${escapeHtml(contactHours)}`}"><i></i>${escapeHtml(contact.screenName)}${directMessageBadge(unread, `unread messages from ${contact.screenName}`)}</button>`;
  }).join("");
  const contactOverflow = overflowContacts.length
    ? `<label class="aim-contact-overflow"><span>More</span><select data-aim-contact-select aria-label="More Orbit Messenger contacts">
        <option value="">${overflowContacts.length} more contact${overflowContacts.length === 1 ? "" : "s"}…</option>
        ${overflowContacts.map(([ownerId, contact]) => {
          const unread = unreadDirectMessages("aim", ownerId).length;
          return `<option value="${ownerId}">${escapeHtml(contact.screenName)}${unread ? ` (${unread} new)` : ""}</option>`;
        }).join("")}
      </select></label>`
    : "";

  return windowShell("chat", `${persona.screenName} - OIM`, "◎", `
    <div class="aim-menu"><button data-ai-reset>Clear Chat</button></div>
    <nav class="aim-buddy-tabs">${contactButtons}${contactOverflow}</nav>
    <div class="aim-contact">
      <div class="aim-avatar">${escapeHtml(persona.displayName.slice(0, 1))}</div><div><b>${escapeHtml(persona.screenName)}</b><span class="${activeNow ? "" : "away"}"><i></i> ${activeNow ? "Online" : `Away — usually online ${escapeHtml(activeHours)}`}</span><small>“${escapeHtml(persona.statusMessage)}”</small></div>
      <aside><b>PRIVATE CHAT</b><span>ORBIT MESSAGING</span></aside>
    </div>
    <div class="chat-transcript" id="chat-transcript">${empty}${messageHtml}${pendingHtml}</div>
    ${chatError ? `<div class="chat-error">${escapeHtml(chatError)}</div>` : ""}
    <form class="chat-form">
      <textarea name="message" maxlength="500" rows="2" placeholder="${modelStarting ? "Connecting…" : "Type an instant message…"}" ${pending || modelStarting || !aiStatus.modelAvailable ? "disabled" : ""}></textarea>
      <button ${pending || modelStarting || !aiStatus.modelAvailable ? "disabled" : ""}>${pending ? "Sending…" : modelStarting ? "Loading…" : "Send"}</button>
    </form>
    <footer class="ai-statusbar"><span data-ai-phase>${escapeHtml(statusLabel)}</span><span data-ai-elapsed>${pending ? "Sending…" : activeNow ? "Online" : "Away"}</span></footer>`);
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
  const discoveryTips = `<details class="helper-did-you-know" ${messages.length ? "" : "open"}>
    <summary>DID YOU KNOW? Orbit keeps moving while you’re away.</summary>
    <span>☾ Sleep from the Start menu to pass time. Replies, comments, and page activity can appear while you’re away.</span>
    <span>☏ Orbit’s people know different things. Ask about names, dates, records, rumors, or details on their pages.</span>
    <span>⌕ A puzzle can be a group project. Page owners may offer one piece even when nobody has the whole answer.</span>
  </details>`;

  return windowShell("helper", "Orbit Pal Help Assistant", "?", `
    <div class="helper-layout">
      <aside class="helper-portrait" aria-hidden="true"><div class="orbit-pal-body"></div></aside>
      <main>
        <header><div><b>What can I help you with?</b><span>${aiStatus.warmed ? "Local help ready" : "Help service starting…"}</span></div><button type="button" data-helper-close>Close Pal</button></header>
        ${discoveryTips}
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
  if (sleepTransitionTimer !== null) {
    window.clearTimeout(sleepTransitionTimer);
    sleepTransitionTimer = null;
  }
  sleepTransition = null;
  if (openingMessageTimer !== null) {
    window.clearTimeout(openingMessageTimer);
    openingMessageTimer = null;
  }
  const defaults: Record<AppId, Omit<WindowModel, "open" | "minimized" | "maximized">> = {
    browser: { z: 3, x: 96, y: 44, width: 900, height: 600 },
    mail: { z: 2, x: 205, y: 94, width: 660, height: 470 },
    files: { z: 1, x: 255, y: 126, width: 590, height: 410 },
    chat: { z: 4, x: 190, y: 72, width: 620, height: 520 },
    music: { z: 4, x: 220, y: 88, width: 820, height: 570 },
    settings: { z: 1, x: 260, y: 70, width: 590, height: 540 },
    helper: { z: 5, x: 635, y: 250, width: 410, height: 390 },
    diagnostics: { z: 1, x: 285, y: 105, width: 570, height: 430 }
    ,bbs: { z: 3, x: 145, y: 62, width: 760, height: 560 }
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

function scheduleOpeningMessage() {
  if (
    state.storyPhase !== 1 ||
    state.flags.opening_message_presented ||
    !state.directMessages.some((message) => message.id === "mira-welcome-1999")
  ) return;
  if (openingMessageTimer !== null) window.clearTimeout(openingMessageTimer);
  openingMessageTimer = window.setTimeout(() => {
    openingMessageTimer = null;
    if (startupStage !== "desktop" || state.flags.opening_message_presented) return;
    state.flags.opening_message_presented = true;
    activeAimOwnerId = "mira_917";
    windows.chat.open = true;
    windows.chat.minimized = false;
    focusApp("chat");
    markAimConversationRead(activeAimOwnerId);
    void saveState();
    render();
    scrollChatToBottom();
  }, 2400);
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

async function loginUser(showOpeningMessage = false) {
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
  if (showOpeningMessage) scheduleOpeningMessage();
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
    await loginUser(true);
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
      <footer>Orbit keeps moving while you sleep. Replies may arrive, comments may change, and people may post elsewhere on the network.</footer>
    </section>
  </div>`;
}

function sleepTransitionScreen() {
  if (!sleepTransition) return "";
  const wokeAt = new Date(sleepTransition.wokeAt);
  return `<section class="sleep-time-transition" role="status" aria-live="polite">
    <div><span>☾</span><small>TIME PASSES ON ORBITNET</small>
      <b>${new Intl.DateTimeFormat([], { weekday: "short", hour: "numeric", minute: "2-digit" }).format(wokeAt)}</b>
      <p>${escapeHtml(sleepTransition.summary)}</p>
    </div>
  </section>`;
}

function phaseTransitionScreen() {
  if (!phaseTransition) return "";
  const sleptFrom = new Date(phaseTransition.sleptFrom);
  const wokeAt = new Date(phaseTransition.wokeAt);
  const phaseTwo = phaseTransition.phase === 2;
  const phaseThree = phaseTransition.phase === 3;
  const phaseFive = phaseTransition.phase === 5;
  const phaseSix = phaseTransition.phase === 6;
  const phaseSeven = phaseTransition.phase === 7;
  return `<section class="phase-transition-overlay phase-transition-${phaseTransition.phase}">
    <div class="phase-transition-card">
      <div class="phase-transition-moon">☾</div>
      <small>ORBITOS SESSION SUSPENDED</small>
      <h1>${phaseTwo ? "FOUR DAYS LATER, ORBIT FEELS DIFFERENT" : phaseThree ? "TRAFFIC SURGED WHILE YOU WERE AWAY" : phaseFive ? "BIG RANDY HAS BEEN BUSY" : phaseSix ? "THE WEB STOPS LOOKING LIKE ITSELF" : phaseSeven ? "THE CLEAN INDEX HOLDS" : "EVERYBODY HEARD SOMETHING LOUDER"}</h1>
      <p>${phaseTwo
        ? "You passed around DarkRaven's ridiculous Dream Eater theory because the evidence underneath it refused to go away. Friends told friends: come prove this kid wrong. Printed URLs reached schools, record shops, and regular-web message boards. By the time you dial back in, fresh accounts are comparing theories, old members are posting again, and Orbit has added a zone for the arrivals. Some came to solve the mystery and stayed for strange pages, music, jokes, and people who answered back. A second little crowd is forming around Byte Barn's forgotten television jingle: some remember it instantly, some have never heard it, and local musicians are already trading covers."
        : phaseThree
          ? "The recovered archive brought more explorers, more rumors, and more strain. Meanwhile, the community's Byte Barn covers spread beyond Orbit. While you were away, a paid countdown appeared above the directory: the member-made playlist is still playing, but ten unknown signals are answering it. Old identities are posting faster, and the system is beginning to lose track of who is speaking."
          : phaseFive
            ? "Two days after following Big Randy's harmless first post, copies of him have appeared in unrelated zones. For now they are only pages: loud, repetitive, and implausibly enthusiastic. WideWorld's Reunion Directory calls the spread improved discovery. ByteForge users call it suspicious."
            : phaseSix
              ? "The same Randy panel is now arriving inside unrelated public pages. False navigation, repeated slogans, and nuisance windows make the regular web difficult to use, but no original page was changed. ByteForge stays clean on its separate connection, and its old SilverDial notes finally explain what is happening."
              : phaseSeven
                ? "The evidence report spread before WideWorld could bury it, and ORBITFIX.PAK propagated through the clean index. The foreign objects are gone. Pristine pages, mail, music, comments, and saved files return exactly as they were."
              : "You found the system behind the people and tried to put the evidence into circulation. Before the report could travel, Byte Barn Forever dropped with ten major artists and a one-night festival. The truth is online. Almost everybody is talking about the jingle."}</p>
      <div class="phase-transition-clock"><span>${new Intl.DateTimeFormat([], { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(sleptFrom)}</span><b>→</b><span>${new Intl.DateTimeFormat([], { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(wokeAt)}</span></div>
      <button data-phase-wake>${phaseTwo ? "DIAL BACK IN // SEE WHAT GREW" : phaseThree ? "WAKE UP // FOLLOW THE SIGNAL" : phaseFive ? "WAKE UP // COUNT THE RANDYS" : phaseSix ? "WAKE UP // TRACE THE BRIDGE" : phaseSeven ? "WAKE UP // VERIFY THE CLEANUP" : "WAKE UP // SEE WHAT BURIED THE STORY"}</button>
    </div>
  </section>`;
}

function phaseTransitionPromptScreen() {
  if (!phaseTransitionPrompt) return "";
  const phaseTwo = phaseTransitionPrompt === 2;
  const phaseThree = phaseTransitionPrompt === 3;
  const phaseFive = phaseTransitionPrompt === 5;
  const phaseSix = phaseTransitionPrompt === 6;
  const phaseSeven = phaseTransitionPrompt === 7;
  return `<section class="phase-transition-overlay phase-transition-prompt">
    <div class="phase-transition-card">
      <div class="phase-transition-moon">☾</div>
      <small>${phaseTwo ? "BEFORE YOU STEP AWAY FOR A FEW DAYS..." : "BEFORE YOU STEP AWAY FOR A DAY..."}</small>
      <h1>${phaseTwo ? "YOU TELL A FEW FRIENDS WHAT YOU FOUND" : phaseThree ? "YOU SEND THE FINDINGS TO THE OTHER INVESTIGATORS" : phaseFive ? "YOU FOLLOW BIG RANDY'S FIRST POST" : phaseSix ? "YOU FOLLOW THE WIDEWORLD TRACE" : phaseSeven ? "YOU DISTRIBUTE THE CLEANUP PATCH" : "YOU COPY THE CONTINUITY RECORD"}</h1>
      <p>${phaseTwo
        ? "DarkRaven's evil dream-alien invasion is obviously homemade hacker theater. The number groups, Glass Lake paperwork, autonomous traffic, and recovered OrbitOS address beneath it are not so easy to dismiss. Raven found something real and gave it the least satisfying explanation possible. You pass the file to a few people who might enjoy proving him wrong, then leave the dusty network alone long enough for word to travel."
        : phaseThree
          ? "The Adaptive Index findings are real enough to matter and incomplete enough to be dangerous. You send copies and your notes to the people following the three cases, then give OrbitNet a full day to react before returning the following morning."
          : phaseFive
            ? "The page is silly and harmless: one loud man, one minivan, and more exclamation marks than information. You add it to the public reunion ring and step away for two days."
            : phaseSix
              ? "The page signatures, the 1996 ByteForge thread, and WideWorld's archive all point to the same inherited bridge object. You leave the web alone long enough for the next wave to reveal itself, then plan to work from the terminal."
              : phaseSeven
                ? "The evidence report is public and ORBITFIX.PAK is moving through the old dial-up network. You disconnect long enough for every community index to rebuild from its pristine copy."
              : "The continuity record explains the impersonated accounts, synthetic traffic, and planted mysteries. You save a copy and send it to the people still comparing notes, then give Orbit a full day to react before returning the following morning."}</p>
      <button data-phase-sleep>${phaseTwo ? "STEP AWAY // COME BACK IN FOUR DAYS" : "STEP AWAY // RETURN THE FOLLOWING MORNING"}</button>
    </div>
  </section>`;
}

function render() {
  const existingViewport = document.querySelector<HTMLElement>(".browser-viewport");
  if (existingViewport) browserScrollPositions.set(renderedBrowserUrl, existingViewport.scrollTop);
  const existingSettingsScroller = document.querySelector<HTMLElement>(".settings-window .settings-layout > main");
  if (existingSettingsScroller) settingsScrollTop = existingSettingsScroller.scrollTop;
  const existingChatTranscript = document.querySelector<HTMLElement>("#chat-transcript");
  if (existingChatTranscript) {
    chatTranscriptScrollTop = existingChatTranscript.scrollTop;
    chatTranscriptPinnedToBottom = existingChatTranscript.scrollHeight - existingChatTranscript.scrollTop - existingChatTranscript.clientHeight < 24;
  }
  const existingHelperTranscript = document.querySelector<HTMLElement>("#helper-transcript");
  if (existingHelperTranscript) {
    helperTranscriptScrollTop = existingHelperTranscript.scrollTop;
    helperTranscriptPinnedToBottom = existingHelperTranscript.scrollHeight - existingHelperTranscript.scrollTop - existingHelperTranscript.clientHeight < 24;
  }
  if (startupStage !== "desktop") {
    pageMusic.pause();
    root.innerHTML = startupScreen();
    bindStartupEvents();
    return;
  }

  const unreadMailCount = unreadDirectMessages("email").length;
  const unreadAimCount = unreadDirectMessages("aim").length;
  root.innerHTML = `<main class="desktop story-phase-${state.storyPhase} infection-level-${state.infection.level} theme-${state.settings.theme} wallpaper-${state.settings.wallpaper} cursor-${state.settings.cursor}">
    <div class="wallpaper-logo"><span>ORBIT</span><b>OS</b><small>98</small></div>
    <div class="desktop-icons">
      <button data-open="browser"><span class="desktop-icon globe"><img src="${DESKTOP_ICON_URLS.browser}" alt=""></span><b>Orbit Explorer</b></button>
      <button data-open="music"><span class="desktop-icon music"><img src="${DESKTOP_ICON_URLS.music}" alt=""></span><b>OrbitAmp</b></button>
      <button data-open="mail"><span class="desktop-icon mail"><img src="${DESKTOP_ICON_URLS.mail}" alt=""></span>${directMessageBadge(unreadMailCount, "unread emails")}<b>Orbit Mail</b></button>
      <button data-open="files"><span class="desktop-icon folder"><img src="${DESKTOP_ICON_URLS.files}" alt=""></span><b>My Files</b></button>
      <button data-open="chat"><span class="desktop-icon chat"><img src="${DESKTOP_ICON_URLS.chat}" alt=""></span>${directMessageBadge(unreadAimCount, "unread OIM replies")}<b>OIM</b></button>
      <button data-open="bbs"><span class="desktop-icon terminal"><img src="${DESKTOP_ICON_URLS.bbs}" alt=""></span><b>Orbit Terminal</b></button>
      <button data-open="settings"><span class="desktop-icon settings"><img src="${DESKTOP_ICON_URLS.settings}" alt=""></span><b>Settings</b></button>
      ${state.flags.orbit_pal_installed ? `<button data-open="helper"><span class="desktop-icon helper"><img src="${DESKTOP_ICON_URLS.helper}" alt=""></span><b>Orbit Pal</b></button>` : ""}
    </div>
    <aside class="sticky-note"><b>THINGS TO TRY</b><span>• Ask people about their pages</span><span>• Sleep to let Orbit update</span><span>• ${state.flags.orbit_pal_installed ? "Ask Orbit Pal for a nudge" : "Download Orbit Pal"}</span></aside>
    ${windows.helper.open ? `<button class="desktop-helper" data-helper-talk aria-label="Talk to Orbit Pal"><span class="orbit-pal-body"></span><strong>Orbit Pal</strong><small>Click to talk</small></button>` : ""}
    ${browserWindow()}${mailWindow()}${filesWindow()}${chatWindow()}${bbsWindow()}${orbitAmpWindow()}${settingsWindow()}${helperWindow()}${diagnosticsWindow()}
    ${state.storyPhase === 6 && state.infection.level >= 3 ? `<aside class="randy-os-nuisance"><b>BIG DESKTOP GUY CHECKING IN!!!</b><span>WideWorld suggests adding Randy to Mail and OIM.</span><button data-randy-dismiss>NOT NOW</button></aside>` : ""}
    ${notification ? `<div class="toast" role="status"><span>${escapeHtml(notification)}</span><button class="toast-dismiss" data-dismiss-notification aria-label="Dismiss notification">&times;</button></div>` : ""}
    ${startOpen ? `<div class="start-menu"><header><b>OrbitOS</b><span>98</span></header><button data-open="browser">🌐 Orbit Explorer</button><button data-open="chat">💬 OIM — Orbit Instant Messenger</button><button data-open="mail">✉ Orbit Mail</button><button data-open="files">📁 My Files</button><button data-open="bbs">&gt;_ Orbit Terminal</button><button data-open="settings">⚙ Desktop Settings</button>${state.flags.orbit_pal_installed ? `<button data-open="helper">❔ Orbit Pal</button>` : ""}<button data-open="diagnostics">▤ System Diagnostics</button><hr><button data-session="sleep">☾ Sleep...</button><button data-session="logoff">⇥ Log Off ${escapeHtml(playerName())}</button><button data-session="shutdown">◉ Shut Down</button><hr><button data-reset>↻ New Game</button></div>` : ""}
    <footer class="taskbar"><button class="start-button ${startOpen ? "pressed" : ""}" data-start><span>◈</span> Start</button><div class="task-buttons">${(Object.keys(windows) as AppId[]).filter((app) => windows[app].open).map((app) => {
      const unread = app === "mail" ? unreadMailCount : app === "chat" ? unreadAimCount : 0;
      return `<button data-task="${app}" class="${!windows[app].minimized && windows[app].z === topZ ? "active" : ""}">${APP_META[app].icon} ${APP_META[app].title}${directMessageBadge(unread)}</button>`;
    }).join("")}</div><time id="clock"></time></footer>
    ${sleepDialog()}
    ${sleepTransitionScreen()}
    ${phaseTransitionPromptScreen()}
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
  syncGlobalMusic();
  updateClock();
  renderedBrowserUrl = state.currentUrl;
  const savedScrollTop = browserScrollPositions.get(state.currentUrl) ?? 0;
  const restoredViewport = document.querySelector<HTMLElement>(".browser-viewport");
  if (restoredViewport) restoredViewport.scrollTop = savedScrollTop;
  const restoredChatTranscript = document.querySelector<HTMLElement>("#chat-transcript");
  if (restoredChatTranscript) {
    restoredChatTranscript.scrollTop = chatTranscriptPinnedToBottom
      ? restoredChatTranscript.scrollHeight
      : chatTranscriptScrollTop;
  }
  const restoredHelperTranscript = document.querySelector<HTMLElement>("#helper-transcript");
  if (restoredHelperTranscript) {
    restoredHelperTranscript.scrollTop = helperTranscriptPinnedToBottom
      ? restoredHelperTranscript.scrollHeight
      : helperTranscriptScrollTop;
  }
  const restoredSettingsScroller = document.querySelector<HTMLElement>(".settings-window .settings-layout > main");
  if (restoredSettingsScroller) restoredSettingsScroller.scrollTop = settingsScrollTop;
  requestAnimationFrame(() => {
    const viewport = document.querySelector<HTMLElement>(".browser-viewport");
    if (viewport) viewport.scrollTop = savedScrollTop;
    const settingsScroller = document.querySelector<HTMLElement>(".settings-window .settings-layout > main");
    if (settingsScroller) settingsScroller.scrollTop = settingsScrollTop;
  });
}

function showNotification(message: string, duration = 2600) {
  notification = message;
  render();
  window.setTimeout(() => {
    notification = "";
    render();
  }, duration);
}

function downloadSignalNote() {
  if (state.downloads.some((file) => file.id === "signal-note")) return;
  state.downloads.push({
    id: "signal-note",
    name: "SIGNAL_NOTE.TXT",
    contents: SIGNAL_NOTE_CONTENTS,
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

function downloadCursor(cursorId: string) {
  state.flags[`${cursorId}_downloaded`] = true;
  void saveState();
  showNotification("Cursor file added to your Settings collection.");
}

function downloadZoneWallpaper(zoneId: string) {
  const zone = Object.values(ZONE_DOWNLOAD_SOURCES).find((entry) => entry.id === zoneId);
  if (!zone) return;
  state.flags[`wallpaper_${zone.id}_downloaded`] = true;
  void saveState();
  showNotification(`${zone.title} wallpaper added to Desktop Settings.`);
}

function downloadZoneTheme(zoneId: string) {
  const zone = Object.values(ZONE_DOWNLOAD_SOURCES).find((entry) => entry.id === zoneId);
  if (!zone) return;
  state.flags[`theme_${zone.id}_downloaded`] = true;
  void saveState();
  showNotification(`${zone.title} theme added to Desktop Settings.`);
}

function downloadMusicSkin(skinId: string) {
  const skin = MUSIC_PLAYER_SKINS.find((entry) => entry.id === skinId);
  if (!skin) return;
  state.flags[`music_skin_${skin.id}_downloaded`] = true;
  state.musicSkin = skin.id;
  void saveState();
  showNotification(`${skin.label} installed and applied in OrbitAmp.`);
}

function scrollChatToBottom() {
  const transcript = document.querySelector<HTMLElement>("#chat-transcript");
  if (transcript) {
    transcript.scrollTop = transcript.scrollHeight;
    chatTranscriptScrollTop = transcript.scrollTop;
    chatTranscriptPinnedToBottom = true;
  }
  const helperTranscript = document.querySelector<HTMLElement>("#helper-transcript");
  if (helperTranscript) {
    helperTranscript.scrollTop = helperTranscript.scrollHeight;
    helperTranscriptScrollTop = helperTranscript.scrollTop;
    helperTranscriptPinnedToBottom = true;
  }
}

async function refreshAiProgress() {
  if (!window.aiAPI) return;
  try {
    aiStatus = await window.aiAPI.status();
    const phase = document.querySelector<HTMLElement>("[data-ai-phase]");
    const elapsed = document.querySelector<HTMLElement>("[data-ai-elapsed]");
    if (phase) {
      phase.textContent = aiStatus.phase === "loading" || aiStatus.phase === "warming"
        ? "Connecting to OIM service…"
        : aiStatus.phase === "generating" || aiStatus.phase === "reviewing"
          ? "Sending message…"
          : aiStatus.phase === "error"
            ? "OIM service unavailable"
            : "Connected to Orbit Messaging";
    }
    if (elapsed) {
      elapsed.textContent = aiStatus.phase === "generating" || aiStatus.phase === "reviewing" ? "Sending…" : "Ready";
    }
  } catch {
    // A failed status poll should not replace the actual generation error.
  }
}

function phaseAwareCharacterHintContext(ownerId: string) {
  if (state.storyPhase < 2) return [];
  const sharedRule = "You never know the complete puzzle solution. Give one observation or one person/page to ask next; never assemble a password, hidden address, recovery phrase, or full sequence.";
  const hints: Record<string, string> = {
    mira_917: "You are fascinated that all five cold-reserve Morrow emergency towers reportedly lit during the final Lantern broadcast, but you suspect the resurfaced Orbit copy is using that real event to sell a newer story. If asked for investigation help, suggest comparing what the voice announces with what the transcript actually contains, or asking StaticAbel which parts of his tape share the same recording noise.",
    darkraven_xx: "You think Folded Wire and Index Null are more useful than spectacular rumor pages because they compare documents and dead links. If asked for help, mention that the three conclusion pages end in similar-looking damaged output and suggest comparing the bold pieces without explaining how they combine.",
    juniper_gdn: "You know the Morrow story is about five emergency towers retired from active service but left powered as a cold reserve; all five lit during one final Lantern transmission. You also noticed that the resurfaced transcript promises a different number of groups than it delivers. If asked for help, gently suggest writing down the mismatch and asking Abel which part of the recording might be newer than the rest.",
    rhymetape_rico: "You are not a code expert, but you understand Orbit is active rather than frozen. If the player is waiting or overwhelmed, suggest asking page owners one specific question, sleeping to let replies arrive, and writing down anything unusually legible inside corrupted conclusion-page output.",
    lagmaster_99: "You solve problems by checking formats and constraints before guessing values. If asked about a mystery, suggest identifying what shape the answer must have, then asking the person closest to the source material.",
    velvet_mage: "You approach mysteries like map design: one landmark at a time. If asked for help, suggest following named people and pages rather than treating every number as equally important."
  };
  return hints[ownerId] ? [sharedRule, hints[ownerId]] : [];
}

function directMessageTopicContext(ownerId: string, playerMessage: string) {
  const normalized = playerMessage.toLowerCase();
  if (ownerId !== "darkraven_xx") return [];
  if (/\blower rooms?\b/.test(normalized)) {
    return [
      "The player asked specifically about the lower room. Point them toward the recovered old OrbitOS archive linked from your Black File evidence layer, because its Technology page preserves the old room labels. Do not answer only with 11:17 and do not state the password."
    ];
  }
  if (/\b(?:what|which).{0,24}\bnight signal\b.{0,24}\blost\b|\bwhat (?:did|does) (?:mira|night signal) lose\b/.test(normalized)) {
    return [
      "The player asked what Night Signal lost. Point them toward Mira's 23:17 Operator Field Log and the LOST caller_unknown.wav entry. You may mention that the connection carried the words 'lower room,' but do not state the final password."
    ];
  }
  return [];
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
      authoredConversationContext: [
        ...directMessageTopicContext(ownerId, safeMessage),
        ...phaseAwareCharacterHintContext(ownerId),
        ...conversationQuest.authoredContext
      ]
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
      if (ownerId === activeAimOwnerId && windows.chat.open && !windows.chat.minimized && windows.chat.z === topZ) {
        markDirectMessagesRead([ownerReply]);
      }
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
    const recentComments = [...authoredPageComments(page), ...state.pageComments]
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
    const replyId = crypto.randomUUID();
    state.pageComments.push({
      id: replyId,
      pageUrl,
      ownerId: page.ownerId,
      role: "owner",
      author: result.owner.screenName || owner.screenName,
      text: result.text,
      createdAt: availableAt,
      availableAt,
      revealAfterVisit: (state.pageVisitCounts[pageUrl] ?? 0) + 1
    });
    state.directMessages.push({
      id: `comment-reply-mail:${replyId}`,
      ownerId: "orbit_guide",
      channel: "email",
      role: "owner",
      author: "Orbit PageWatch",
      subject: `${result.owner.screenName || owner.screenName} replied on ${page.title}`,
      text: `${result.owner.screenName || owner.screenName} replied to the comment you left on ${page.title}. Follow the link below to read it in context.`,
      createdAt: availableAt,
      availableAt,
      linkUrl: pageUrl,
      linkLabel: `Open ${page.title}`
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
  rollRandySpread(before, date);
  queueAmbientPostRolls(crossedAmbientPostIntervals(before, date), state.gameTime);
  seedSystemRumorHints(hoursElapsed, state.gameTime);
  lastGameClockTick = performance.now();
  sleepDialogOpen = false;
  const firstSleep = !state.flags.sleep_time_tutorial_seen;
  state.flags.sleep_time_tutorial_seen = true;
  const wakeSummary = firstSleep
    ? "The network did not pause with you. Check OIM, Mail, and pages you have visited—people may have replied or posted while you were away."
    : deliveryNotice || "Orbit kept moving. Revisit conversations and pages when you want to see what changed.";
  sleepTransition = { wokeAt: state.gameTime, summary: wakeSummary };
  void saveState();
  render();
  if (sleepTransitionTimer !== null) window.clearTimeout(sleepTransitionTimer);
  sleepTransitionTimer = window.setTimeout(() => {
    sleepTransitionTimer = null;
    sleepTransition = null;
    showNotification(
      deliveryNotice || "Time passed on OrbitNet. New comments and page activity may be waiting when you revisit.",
      5200
    );
  }, 1500);
}

type BusinessTabCopy = { title: string; body: string[] };

const BUSINESS_TAB_COPY: Record<string, Record<string, BusinessTabCopy>> = {
  "rx-veluna": {
    "about-veluna": { title: "ABOUT VELUNA", body: ["Veluna is for adults who cannot fall asleep because ordinary darkness is apparently insufficient. In studies, many patients reported sleep; several reported a second, much more administrative moon.", "Veluna may replace insomnia with vivid dreaming, moon-related certainty, or waking in a room you recognize only after several minutes. This page cannot explain the missing Tuesday."] },
    "safety-information": { title: "SAFETY INFORMATION", body: ["Tell your doctor about medicines, alcohol, breathing problems, unusual nighttime behavior, prophetic dreams, unexplained sand in the bed, or a sudden ability to hear clocks in other houses.", "Do not drive, operate machinery, negotiate a mortgage, enter a corn maze, or promise anything to the moon until you know how Veluna affects you."] },
    "talk-to-your-doctor": { title: "TALK TO YOUR DOCTOR", body: ["Bring your sleep diary, medication list, and any notes written in handwriting that is technically yours but emotionally unfamiliar.", "Ask whether dreaming about the same hallway on seven consecutive nights counts as a refill question."] }
  },
  "tech-kestrel": {
    products: { title: "THE FUTURE, IN FIVE INCOMPATIBLE FORMATS", body: ["Kestrel brings the chrome-and-laser certainty of 1987 into the uncertain year 2000: televisions, beige computers, portable discs, digital cameras, and stereos with forty-seven illuminated buttons.", "Every product includes at least one proprietary port shaped like a future that never occurred."] },
    support: { title: "OWNER SUPPORT MATRIX", body: ["Locate manuals, driver discs, warranty terms, and diagrams explaining which silver cable communicates with which translucent blue appliance.", "Keep your serial number ready. A Kestrel specialist will mishear it and blame nearby magnetic fields."] },
    "software-downloads": { title: "SOFTWARE OF TOMORROW", body: ["Download camera bridges, modem harmonizers, printer personality modules, and the Vale 700 Millennium Confidence Patch.", "Do not interrupt Installation Stage 14: Imagining Ports."] },
    "where-to-buy": { title: "AUTHORIZED FUTURE RETAILERS", body: ["Kestrel products are sold wherever a wall of televisions shows the same tropical waterfall at slightly different colors.", "Demo units may be connected to nothing. This is aspirational merchandising."] },
    "kestrel-worldwide": { title: "ONE WORLD. FOUR VOLTAGES.", body: ["Regional divisions coordinate broadcast standards, warranty borders, and product names that become cooler when translated badly.", "The future is global. The adapter is sold separately."] }
  },
  "rec-westbell": {
    home: { title: "TODAY AT THE MUNICIPAL FITNESS COMPLEX", body: ["Schedules, closures, and the legal status of Lane 4 are posted here and on the corkboard by the vending machine.", "Outdoor shoes stop at the blue line. Indoor shoes stop at the yellow line. Nobody remembers why there is a red line."] },
    pool: { title: "POOL HOURS & LANE CONDITIONS", body: ["Family swim begins at 6:30. Lane 4 remains open but is temporarily philosophical; swim beside it without engaging.", "The whistle at 7:15 is a drill. The whistle at 7:17 means Dale found the kickboards."] },
    gym: { title: "GYMNASIUM ROTATION", body: ["Basketball, volleyball, and indoor soccer rotate according to a laminated chart no employee is authorized to alter.", "The scoreboard may display 88:88. This does not mean anyone is winning."] },
    classes: { title: "CLASSES IN ROOMS A, B, AND SOMETIMES C", body: ["Silver Stretch, step aerobics, youth crafts, and Low-Impact Municipal Cardio meet weekly.", "Registration requires Form 8-B and proof that your emergency contact has forgiven you."] },
    youth: { title: "YOUTH PROGRAMS", body: ["Programs are supervised by staff wearing city-issued lanyards of escalating authority.", "Pickup adults must know the child's name, birth date, and favorite dinosaur. This rule was added for a reason."] },
    membership: { title: "MEMBERSHIP, RATES & ACCEPTABLE LOCKS", body: ["Youth admission is $1.50, adults are $3.00, and seniors are $1.00. The lobby pigeon is not a senior.", "Family passes require proof of address and a declaration that everyone understands the whirlpool timer."] }
  },
  "food-bigbang": {
    menu: { title: "MISSION MENU", body: ["Double Impact burgers, Orbit Rings, Comet fries, and Moon Shakes are assembled under lunch-launch conditions.", "Comet Sauce is classified as Flavor Level Orange. Ask for a second packet only if prepared to be noticed."] },
    locations: { title: "LOCATIONS", body: ["Find a Big Bang Burger near the highway, the mall, or the exit where everybody realizes they forgot lunch.", "Drive-thru hours vary by franchise. The sign is usually more accurate than the newspaper."] },
    "meteor-club": { title: "METEOR CLUB CADET PROGRAM", body: ["Every Meteor Meal contains one Crater Critter and one chance to complete your planetary command structure.", "Members receive birthday coupons, a rank-bearing card, and mail addressed with troubling military confidence."] },
    company: { title: "COMPANY", body: ["Big Bang Foods started with flame-grilled burgers and a mascot who believed every lunch deserved a countdown.", "Franchise owners keep the grills hot, the speakers loud, and the Comet Sauce recipe classified."] },
    jobs: { title: "JOBS", body: ["Crew members learn grill, counter, drive-thru, and shake-machine stations. Managers receive a headset and the keys to the meteor freezer.", "Ask your local restaurant about openings and application hours."] },
    nutrition: { title: "ORBITAL NUTRITION DATA", body: ["Burgers, sides, and shakes are measured in calories, sodium, and proprietary Lunch Thrust Units.", "The Double Impact contains enough energy to alter one office worker's afternoon trajectory."] }
  },
  "fashion-nullstate": {
    women: { title: "WOMEN // CAPITAL IS A CONSTRUCT", body: ["A $780 shell, $510 monodenim, and a $240 cotton rectangle reject labels while retaining exact price tags.", "Every seam is reflective so the valet can find you."] },
    men: { title: "MEN // OWN NOTHING EXCEPT THE DROP", body: ["Technical jackets and anti-commerce tees are issued in quantities small enough to protect shareholder value.", "The $1,200 SIGNAL shell has eleven pockets. Nine are decorative and two fit a boutique receipt."] },
    objects: { title: "OBJECTS // NECESSITIES FOR THE UNBURDENED", body: ["A $95 carabiner and numbered signal bags carry the tools of resistance between a loft and a private car.", "Each is pre-distressed by a supervised artisan with dental coverage."] },
    lookbook: { title: "LOOKBOOK_04 // AUTHENTIC URBAN ACCESS", body: ["Models occupy a parking structure closed to the public for the shoot. Wet pavement was imported and the shopping cart has an agent.", "Campaign title: NO PROPERTY. Wardrobe value: $18,460."] },
    stockists: { title: "STOCKISTS // INDEPENDENCE BY APPOINTMENT", body: ["Available at six fiercely independent boutiques owned by the same holding company.", "Door staff may ask whether you understand utility. Correct answers vary by net worth."] }
  },
  "books-dogeared": {
    "staff-picks": { title: "STAFF PICKS, SUBJECT TO FELINE REVIEW", body: ["Ruth chooses rainy-day mysteries. Malcolm chooses impossible maps. Mr. Bronte chooses books in which a cat inherits a house.", "Books placed face-down by Mr. Bronte are not rejected; they are under consideration."] },
    events: { title: "EVENTS IN THE BACK ROOM", body: ["Readings happen between the atlas shelf and Mr. Bronte's chair. The chair is not available, even when Mr. Bronte is elsewhere.", "Thursday's author has requested no bells. The shop has declined to explain."] },
    "used-books": { title: "USED BOOKS & PREVIOUS OWNERS", body: ["Shelves include paperbacks, field guides, cookbooks, and books containing notes from people who moved away abruptly.", "Prices are penciled in by Malcolm and occasionally amended by a paw-shaped mark."] },
    "special-orders": { title: "SPECIAL ORDERS / BASEMENT ROUTING", body: ["Orders leave Tuesday and Friday. Several return with different jackets and a faint basement smell.", "Spell the author slowly. If Mr. Bronte looks up, stop spelling."] }
  },
  "games-criticalhit": {
    "new-releases": { title: "NEW RELICS ENTER THE ARMORY", body: ["Role-playing books, imported games, booster sets, and model kits arrive every Wednesday under staff escort.", "First printings may contain errata. Disputing errata begins a formal council."] },
    events: { title: "THE CAMPAIGN CALENDAR", body: ["Friday SpellCards is not a tournament; it is a controlled regional conflict with pairings.", "Tables for more than six wizards require advance notice and a neutral observer."] },
    "video-games": { title: "VIDEO GAME CAVE", body: ["New, used, import, and rental games share the cave with memory cards, controller testing, and a television that only needs a gentle tap.", "Trade-ins require a case, a manual, or a convincing explanation."] },
    rpgs: { title: "THE SACRED RPG WALL", body: ["Core books, adventures, dice, screens, maps, and seventeen mutually exclusive rulings on falling damage live here.", "The clerk's ruling is final until the senior clerk arrives."] },
    cards: { title: "CARD COUNTER / TREATY ZONE", body: ["Singles, boosters, binders, sleeves, and supervised trading are available by the counter.", "Trades over $20 require a witness. Foil disputes go to arbitration behind the register."] },
    miniatures: { title: "MODEL BENCH", body: ["Kits, paints, brushes, glue, terrain, and tiny trees are stocked beside the painting table.", "Bring your own primer or ask the staff which gray is closest to the dragon you meant to paint."] }
  },
  "lawn-greenstripe": {
    mowing: { title: "MOWING / RESTORING CIVIC ORDER", body: ["Weekly mowing aligns every stripe with the curb, the house, and the community's shared understanding of straightness.", "We do not mow diagonally. Diagonal lawns invite questions."] },
    cleanups: { title: "SEASONAL CORRECTION", body: ["We clear leaves, sticks, bed edges, and the dead patch your neighbors have privately named Gerald.", "Gerald cannot be saved. Gerald can be made less visible."] },
    shrubs: { title: "SHRUB COMPLIANCE", body: ["Hedges are trimmed to shapes acceptable to both sunlight and the informal neighborhood tribunal.", "Animal shapes require a sketch and a signed waiver from the animal."] },
    "service-area": { title: "THE GREENSTRIPE TERRITORY", body: ["Crews serve Dynamo City, West Bellwater, Pine Cut, and lawns visible from the county road.", "The route supervisor already knows which silo you mean."] },
    "lawn-tips": { title: "THE FIVE LAWN DISCIPLINES", body: ["Mow high, water early, clear gates, conceal hoses, and never let adjacent stripe angles meet unsupervised.", "This archive is informational. Reading it does not place your lawn under observation. Probably."] }
  },
  "septic-hank": {
    pumping: { title: "REGULAR PUMPING / REGULAR TRUTHS", body: ["Tank size, household size, and actual use determine the interval. Hank can usually estimate all three from the yard.", "Every tank tells a story. Most stories say: pump me sooner."] },
    inspection: { title: "INSPECTION NOTES FROM BELOW", body: ["A plain-language diagram identifies lids, baffles, filters, and the point where optimism stops being maintenance.", "Hank writes everything down because the ground remembers selectively."] },
    "field-locating": { title: "FIELD LOCATING", body: ["Flags, probe marks, old sketches, grass color, and what Hank calls the yard's posture reveal the drain field.", "He already has a theory about yours. This page does not ask how."] },
    "emergency-information": { title: "BACKUP SAFETY INFORMATION", body: ["Stop running water, keep people and pets away from the affected area, and use the posted local emergency number when there is an active backup.", "This archive is safety information only; clicking it does not dispatch a truck."] }
  },
  "design-pixelpetal": {
    home: { title: "PIXEL PETAL HOME // DESIGN IS MY PASSION", body: ["Dana makes every small business unforgettable using gradients, bevels, starbursts, drop shadows, and fonts that have never met.", "If one animation is tasteful, twelve are twelve times as tasteful."] },
    web: { title: "WEB STARTER EXTREME", body: ["Five pages, two splash screens, a guestbook, animated cursor trail, hit counter, scrolling status message, and optional MIDI sunrise.", "Frames keep navigation visible and content trapped exactly where Dana intended."] },
    print: { title: "PRINT PATCH", body: ["Menus, flyers, newsletters, advertisements, and event programs arrive ready for your local printer.", "Bring the copy on paper, disk, or a note that says ‘make it less boring.’"] },
    logos: { title: "IDENTITY SPROUT DELUXE", body: ["A primary logo, metallic logo, flaming logo, spinning logo, and one-color version for cowards arrive on ZIP disk.", "The readable phone number is available as a premium simplification."] },
    portfolio: { title: "RECENTLY PLANTED & HEAVILY FERTILIZED", body: ["Recent work includes a coffee menu with seventeen beans, a landscaper logo inside a lens flare, and a church cookbook with a flaming chef hat.", "Every case study has won the Cool Small Business Site Award from this site."] },
    contact: { title: "CONTACT DANA", body: ["E-mail Dana with your business name, what you need, and which deadline is real rather than aspirational.", "Winter project slots are open now. Include a phone number if your modem tends to disconnect at dramatic moments."] }
  },
  "store-maximart": {
    "weekly-ad": { title: "THE MAXI-SAVER DOCUMENT", body: ["This week's prices include televisions, toasters, blank diskettes, denim, cereal, tires, aquarium gravel, and civic dependence.", "Prices vary by store. Stores vary by whether they acknowledge aisle 47."] },
    "store-finder": { title: "STORE FINDER", body: ["Dynamo City Supercenter #1844 is open 24 hours with pharmacy, tire and lube, photo center, and a cart return that is somehow always full.", "Ask for the blue sign if you get turned around near housewares."] },
    departments: { title: "ALL 47 DEPARTMENTS", body: ["Groceries, clothing, electronics, tires, pharmacy, photo, crafts, lamps, municipal-scale seasonal decor, and everything formerly sold downtown live here.", "Aisle maps are available. Maps printed before 8:00 PM may become inaccurate overnight."] },
    pharmacy: { title: "PHARMACY", body: ["The pharmacy is open nine to nine for prescription pickup, refill questions, and the important reminder that the pharmacist is not a fortune teller.", "Bring your prescription card and allow extra time on busy Saturdays."] },
    photo: { title: "PHOTO CENTER", body: ["Drop off film, order reprints, make enlargements, and pick up the disposable-camera pictures from last weekend.", "One-hour service depends on the machine, the line, and whether someone has loaded the paper backward."] },
    "auto-center": { title: "AUTO CENTER", body: ["Tires, batteries, oil changes, wiper blades, and practical advice for the car that makes one new noise every week.", "Appointments are recommended for tires and alignment work."] },
    "company-info": { title: "MAXI-MART AND THE AMERICAN COMMUNITY", body: ["Maxi-Mart began as a discount store and became a grocery, pharmacy, garage, photographer, employer, landmark, weather shelter, and reason not to maintain a town square.", "If a service does not yet exist inside Maxi-Mart, Corporate Development is already measuring it."] }
  }
};

function normalizeBusinessTabLabel(label: string) {
  return label.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const businessUiState = new Map<string, { tab?: string; card?: string }>();
const BUSINESS_VIEW_ACTIONS: Record<string, Record<string, { type: "download" | "mail"; id: BusinessCollectibleId; label: string }>> = {
  "rx-veluna": { "about-veluna": { type: "download", id: "veluna", label: "DOWNLOAD DREAM LOG '99" } },
  "tech-kestrel": { "software-downloads": { type: "download", id: "kestrel", label: "DOWNLOAD DRIVER / MANUAL SAMPLER" } },
  "food-bigbang": { "meteor-club": { type: "mail", id: "bigbang", label: "EMAIL CRATER CRITTER COUPONS" } },
  "fashion-nullstate": { lookbook: { type: "download", id: "nullstate", label: "DOWNLOAD LOOKBOOK_04 POSTCARD" } },
  "books-dogeared": { events: { type: "mail", id: "dogeared", label: "EMAIL EVENTS FLYER" } },
  "games-criticalhit": { rpgs: { type: "download", id: "criticalhit", label: "DOWNLOAD DRAGON KEEP III RULING" } },
  "design-pixelpetal": { portfolio: { type: "download", id: "pixelpetal", label: "DOWNLOAD SITE AWARD BADGES" } },
  "store-maximart": { "weekly-ad": { type: "mail", id: "maximart", label: "EMAIL MAXI-SAVER CIRCULAR" } }
};

function bindBusinessHeaderTabs() {
  document.querySelectorAll<HTMLElement>("main.expansion-business-page").forEach((root) => {
    const nav = root.querySelector<HTMLElement>("nav");
    if (!nav) return;
    const pageEntry = Object.entries(BUSINESS_TAB_COPY).find(([className]) => root.classList.contains(className));
    const pageCopy = pageEntry?.[1];
    if (!pageCopy) return;
    const pageStateKey = pageEntry?.[0] ?? state.currentUrl;

    let controls = [...nav.querySelectorAll<HTMLElement>(":scope > a, :scope > button, :scope > span")];
    if (!controls.length) {
      const delimiter = nav.textContent?.includes("/") ? /\// : /\|/;
      const labels = (nav.textContent ?? "").split(delimiter).map((label) => label.trim()).filter(Boolean);
      nav.replaceChildren();
      controls = labels.map((label) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = label;
        nav.append(button);
        return button;
      });
    }
    controls = controls.filter((control) => pageCopy[normalizeBusinessTabLabel(control.textContent?.trim() ?? "")]);
    controls = controls.map((control) => {
      if (control.tagName === "BUTTON") return control;
      const button = document.createElement("button");
      button.type = "button";
      button.className = control.className;
      button.textContent = control.textContent;
      control.replaceWith(button);
      return button;
    });
    if (!controls.length) return;
    nav.setAttribute("role", "tablist");
    nav.setAttribute("aria-label", "Site sections");
    const view = document.createElement("section");
    view.className = "business-native-view";
    view.hidden = true;
    nav.after(view);
    view.addEventListener("click", (event) => {
      const action = (event.target as HTMLElement).closest<HTMLElement>("[data-business-view-action]");
      const actionId = action?.dataset.businessViewAction;
      const actionType = action?.dataset.businessViewActionType;
      if (!actionId || !Object.prototype.hasOwnProperty.call(BUSINESS_COLLECTIBLES, actionId)) return;
      if (actionType === "mail") deliverBusinessCollectibleMail(actionId as BusinessCollectibleId);
      else saveBusinessCollectible(actionId as BusinessCollectibleId);
    });
    const header = root.querySelector(":scope > header");
    const footer = root.querySelector(":scope > footer");
    const originalContent = [...root.children].filter((child) => child !== nav && child !== header && child !== footer && child !== view) as HTMLElement[];
    const representativeImage = originalContent.flatMap((entry) => [...entry.querySelectorAll<HTMLImageElement>("img")]).find((image) => image.src);
    const showTab = (control: HTMLElement, label: string) => {
      const key = normalizeBusinessTabLabel(label);
      const copy = pageCopy[key] ?? pageCopy[normalizeBusinessTabLabel(controls[0].textContent ?? "")];
      if (!copy) return;
      businessUiState.set(pageStateKey, { ...(businessUiState.get(pageStateKey) ?? {}), tab: key });
      controls.forEach((entry) => {
        entry.classList.toggle("active", entry === control);
        entry.setAttribute("aria-selected", String(entry === control));
        entry.tabIndex = entry === control ? 0 : -1;
      });
      const isHome = control === controls[0];
      originalContent.forEach((entry) => { entry.hidden = !isHome; });
      view.hidden = isHome;
      if (isHome) return;
      const action = BUSINESS_VIEW_ACTIONS[pageStateKey]?.[key];
      view.innerHTML = `<div class="business-view-hero">${representativeImage ? `<img src="${representativeImage.src}" alt="">` : ""}<div><small>${escapeHtml(label)} // INFORMATION VIEW</small><h2>${escapeHtml(copy.title)}</h2><p>${escapeHtml(copy.body[0] ?? "")}</p>${action ? `<button type="button" data-business-view-action="${action.id}" data-business-view-action-type="${action.type}">${escapeHtml(action.label)}</button>` : ""}</div></div><div class="business-view-grid">${copy.body.slice(1).map((paragraph, index) => `<article><b>${String(index + 1).padStart(2, "0")}</b><p>${escapeHtml(paragraph)}</p></article>`).join("")}${copy.body.length < 2 ? `<article><b>INFO</b><p>This section is an informational archive. Nothing here places an order, schedules a visit, or changes the story.</p></article>` : ""}</div>`;
    };
    controls.forEach((control) => {
      const label = control.textContent?.trim() ?? "";
      control.dataset.businessTabControl = normalizeBusinessTabLabel(label);
      control.setAttribute("role", "tab");
      control.addEventListener("click", (event) => {
        event.preventDefault();
        showTab(control, label);
      });
      control.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        const index = controls.indexOf(control);
        const nextIndex = event.key === "ArrowRight" ? (index + 1) % controls.length : (index - 1 + controls.length) % controls.length;
        controls[nextIndex].focus();
        showTab(controls[nextIndex], controls[nextIndex].textContent?.trim() ?? "");
      });
    });
    const restoredKey = businessUiState.get(pageStateKey)?.tab;
    const restoredControl = controls.find((control) => control.dataset.businessTabControl === restoredKey) ?? controls[0];
    showTab(restoredControl, restoredControl.textContent?.trim() ?? "");
  });
}

function bindBusinessFeatureCards() {
  const gridSelectors = [
    ".veluna-path", ".westbell-grid", ".bigbang-menu", ".nullstate-products", ".sunrise-tags",
    ".critical-departments", ".marcy-contactsheet", ".wondervale-rides", ".greenstripe-services",
    ".pixelpetal-portfolio", ".maximart-specials"
  ];
  document.querySelectorAll<HTMLElement>(gridSelectors.join(",")).forEach((grid) => {
    const root = grid.closest<HTMLElement>("main.expansion-business-page");
    if (!root || root.matches(".auto-aureline, .tech-kestrel")) return;
    const cards = [...grid.querySelectorAll<HTMLElement>(":scope > article, :scope > div, :scope > img")];
    if (cards.length < 2) return;
    grid.classList.add("business-card-grid");
    let feature = grid.previousElementSibling?.classList.contains("business-card-feature") ? grid.previousElementSibling as HTMLElement : null;
    if (!feature) {
      feature = document.createElement("section");
      feature.className = "business-card-feature";
      feature.hidden = true;
      grid.before(feature);
    }
    const show = (card: HTMLElement, index: number) => {
      const image = card.matches("img") ? card as HTMLImageElement : card.querySelector<HTMLImageElement>("img");
      const titleElement = card.querySelector<HTMLElement>("h2, h3")
        ?? (grid.matches(".nullstate-products") ? card.querySelector<HTMLElement>(":scope > div") : null)
        ?? (grid.matches(".maximart-specials") ? card.querySelector<HTMLElement>(":scope > span") : null)
        ?? card.querySelector<HTMLElement>("b");
      const title = titleElement?.textContent?.trim() || image?.alt || `Featured item ${index + 1}`;
      const paragraphs = [...card.querySelectorAll<HTMLElement>("p, span")].map((element) => element.textContent?.trim()).filter(Boolean);
      const detail = paragraphs.join(" ") || "Selected from the current collection. Choose another card below to compare its details.";
      const price = card.querySelector<HTMLElement>("em")?.textContent?.trim();
      feature!.innerHTML = `${image ? `<img src="${image.src}" alt="${escapeHtml(image.alt)}">` : ""}<div><small>FEATURED INFORMATION</small><h2>${escapeHtml(title)}</h2><p>${escapeHtml(detail)}</p>${price ? `<strong>${escapeHtml(price)}</strong>` : ""}</div>`;
      feature!.hidden = false;
      cards.forEach((entry) => {
        const active = entry === card;
        entry.classList.toggle("active", active);
        entry.setAttribute("aria-pressed", String(active));
      });
      businessUiState.set(state.currentUrl, { ...(businessUiState.get(state.currentUrl) ?? {}), card: `${gridSelectors.find((selector) => grid.matches(selector))}:${index}` });
    };
    cards.forEach((card, index) => {
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `View ${card.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) || `item ${index + 1}`}`);
      card.addEventListener("click", () => show(card, index));
      card.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        show(card, index);
      });
    });
    const selector = gridSelectors.find((candidate) => grid.matches(candidate));
    const restored = businessUiState.get(state.currentUrl)?.card;
    if (selector && restored?.startsWith(`${selector}:`)) {
      const index = Number(restored.split(":").at(-1));
      if (cards[index]) show(cards[index], index);
    }
  });
}

const MAXIMART_DEPARTMENT_COPY: Record<string, { title: string; description: string; items: string[] }> = {
  grocery: { title: "GROCERY // AISLES 1–18", description: "Pantry basics, freezer dinners, produce, and a cereal wall tall enough to require a small ladder.", items: ["Fresh produce checked daily (mostly)", "MAXI-SAVER watch: family-size snacks", "Ask for the blue cart if you need a quiet wheel"] },
  clothing: { title: "CLOTHING // AISLES 19–24", description: "School clothes, work clothes, and denim engineered to survive both a cart collision and a family photo.", items: ["Try-on rooms beside the red clearance rack", "New colors arrive with every season", "Tag says medium; the mirror has final say"] },
  electronics: { title: "ELECTRONICS // AISLES 25–28", description: "Televisions, stereos, computers, and enough cables to make the back room look like a robot nest.", items: ["Ask about the 19-inch color TV rollback", "Modem cables available in three confusing lengths", "Display models may know more than the sales associate"] },
  home: { title: "HOME // AISLES 29–33", description: "Lamps, sheets, cookware, storage bins, and the exact curtain rod somebody forgot to measure for.", items: ["Kitchen gadgets under the giant clock", "Bedding folded by color family", "Ask about the seasonal aisle before it moves"] },
  toys: { title: "TOYS // AISLES 34–36", description: "Action figures, board games, dolls, and battery-powered inventions that will sing until the batteries surrender.", items: ["Demo buttons are for looking, not marathon pressing", "Batteries sold nearby (naturally)", "Gift wrap available at the service desk"] },
  "sporting-goods": { title: "SPORTING GOODS // AISLES 37–39", description: "Bikes, balls, camping gear, and one fishing aisle that smells like an argument with a lake.", items: ["Seasonal equipment changes after the first commercial", "Bikes assembled by appointment", "Please do not test the fishing line in housewares"] },
  automotive: { title: "AUTOMOTIVE // GARAGE BAY", description: "Tires, oil, batteries, floor mats, and the little air freshener that promises your car can smell like a mountain.", items: ["Tire and lube open 7–7", "Wiper blades matched by a laminated chart", "Appointments recommended for anything involving a lift"] },
  "lawn-and-garden": { title: "LAWN & GARDEN // OUTDOOR PAD", description: "Mowers, hoses, seed, patio furniture, and seasonal decorations waiting for a weather event.", items: ["Bagged soil is aisle-adjacent, not aisle-safe", "Holiday inflatables arrive before the holiday", "Ask about the garden-center watering schedule"] },
  pharmacy: { title: "PHARMACY // EAST ENTRANCE", description: "Prescription pickup, refill questions, and a pharmacist who can explain the label without consulting a magic eight ball.", items: ["Open 9–9", "Bring your prescription card", "Drop-off and pickup windows are clearly marked"] },
  "photo-center": { title: "PHOTO CENTER // NEAR CUSTOMER SERVICE", description: "One-hour film, reprints, enlargements, and proof that your disposable camera saw things you did not.", items: ["Bring film before the machine gets busy", "Reprints available in several sizes", "Please rewind before handing over the cassette"] },
  crafts: { title: "CRAFTS // AISLES 40–42", description: "Glitter, glue, fabric, model kits, and enough construction paper to announce a school project from orbit.", items: ["Seasonal ribbon moves without warning", "Craft knives sold with grown-up seriousness", "Ask about the weekend demonstration table"] },
  "see-all-47": { title: "ALL 47 DEPARTMENTS", description: "If it fits under the roof, Maxi-Mart probably sells it. If it does not fit, the aisle map may at least admit that.", items: ["Service desk can print an aisle map", "Catalog listings are informational only", "Please allow extra time for aisle 47: it has been reorganized again"] }
};

function bindMaximartDepartments() {
  document.querySelectorAll<HTMLElement>("main.store-maximart").forEach((root) => {
    const title = root.querySelector<HTMLElement>("[data-maximart-detail-title]");
    const description = root.querySelector<HTMLElement>("[data-maximart-detail-description]");
    const list = root.querySelector<HTMLElement>("[data-maximart-detail-list]");
    const controls = [...root.querySelectorAll<HTMLButtonElement>("[data-maximart-department]")];
    if (!title || !description || !list || !controls.length) return;
    const show = (control: HTMLButtonElement) => {
      const copy = MAXIMART_DEPARTMENT_COPY[control.dataset.maximartDepartment ?? ""] ?? MAXIMART_DEPARTMENT_COPY["see-all-47"];
      controls.forEach((entry) => {
        entry.classList.toggle("active", entry === control);
        entry.setAttribute("aria-pressed", String(entry === control));
      });
      title.textContent = copy.title;
      description.textContent = copy.description;
      list.replaceChildren(...copy.items.map((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        return li;
      }));
    };
    controls.forEach((control) => control.addEventListener("click", () => show(control)));
    show(controls[0]);
  });
}

function bindEvents() {
  const browserViewport = document.querySelector<HTMLElement>(".browser-viewport");
  document.querySelector<HTMLElement>("[data-scroll-gemwell-top]")?.addEventListener("click", () => {
    browserViewport?.scrollTo({ top: 0, behavior: "smooth" });
  });
  browserViewport?.addEventListener("scroll", () => {
    const gemwellPage = browserViewport.querySelector<HTMLElement>(".gemwell-page");
    if (gemwellPage) gemwellPage.style.setProperty("--gemwell-parallax", String(-browserViewport.scrollTop * 0.18) + "px");
  }, { passive: true });
  document.querySelector<HTMLElement>("[data-dismiss-notification]")?.addEventListener("click", () => {
    notification = "";
    render();
  });
  document.querySelector<HTMLElement>("[data-phase-sleep]")?.addEventListener("click", async () => {
    const nextPhase = phaseTransitionPrompt;
    phaseTransitionPrompt = null;
    if (!nextPhase) return;
    activateStoryPhase(nextPhase);
    await saveState();
    render();
  });
  document.querySelector<HTMLElement>("[data-phase-wake]")?.addEventListener("click", () => {
    const completedPhase = phaseTransition?.phase;
    phaseTransition = null;
    if (completedPhase === 2 && !state.flags.phase_two_intro_outreach_queued) {
      state.flags.phase_two_intro_outreach_pending = true;
      void saveState();
    }
    prepareFreshDesktopSession();
    notification = completedPhase === 2
      ? "Friends told friends: Newbie Nebula is online, FanVerse has a Byte Barn Beat Exchange, and fresh covers are appearing across Orbit."
      : completedPhase === 3
        ? "Orbit's Byte Barn covers are front-page news. A paid SoundWave countdown says outside attention is rising while old accounts appear in discussions."
        : completedPhase === 4
          ? "Byte Barn Forever is live. Your continuity report is online, but the album and festival own the front page."
          : completedPhase === 5
            ? "Big Randy now has pages in several zones. Raven found a WideWorld trace in the page marks; ByteForge remains clean on the separate dial-up route."
            : completedPhase === 6
              ? "Big Randy panels are now interrupting public pages. ByteForge is still clean, and its old bridge notes match the symptoms."
              : completedPhase === 7
                ? "ORBITFIX.PAK removed the WideWorld injection layer. A volunteer maintenance program is now online."
              : "Orbit is online.";
    render();
  });
  document.querySelectorAll<HTMLElement>("[data-open]").forEach((el) => el.addEventListener("click", () => openApp(el.dataset.open as AppId)));
  document.querySelector<HTMLElement>("[data-randy-join]")?.addEventListener("click", () => {
    state.flags.phase_five_transition_pending = true;
    showNotification("Big Randy was added to the public reunion ring. Leave the page when you're ready to step away.");
    void saveState();
    render();
  });
  document.querySelectorAll<HTMLElement>("[data-randy-signature]").forEach((button) => button.addEventListener("click", () => {
    if (!state.infection.evidenceIds.includes("accelerator-signature")) state.infection.evidenceIds.push("accelerator-signature");
    maybeArmRandyEscalation();
    showNotification("Page signature archived: WideWorld Community Accelerator WW-22.6");
    void saveState();
    render();
  }));
  document.querySelectorAll<HTMLElement>("[data-randy-dismiss]").forEach((button) => button.addEventListener("click", () => button.closest(".randy-nuisance-window, .randy-injection, .randy-os-nuisance")?.remove()));
  document.querySelectorAll<HTMLElement>("[data-revival-evidence]").forEach((button) => button.addEventListener("click", () => {
    const id = button.dataset.revivalEvidence!;
    if (!state.infection.evidenceIds.includes(id)) state.infection.evidenceIds.push(id);
    maybeArmRandyEscalation();
    showNotification("Corporate archive evidence saved.");
    void saveState();
    render();
  }));
  document.querySelector<HTMLElement>("[data-bbs-dial]")?.addEventListener("click", () => { state.bbs.connected = true; void saveState(); render(); });
  document.querySelector<HTMLElement>("[data-bbs-hangup]")?.addEventListener("click", () => { state.bbs.connected = false; void saveState(); render(); });
  document.querySelectorAll<HTMLElement>("[data-bbs-board]").forEach((button) => button.addEventListener("click", () => {
    state.bbs.selectedBoardId = button.dataset.bbsBoard!;
    state.bbs.selectedThreadId = null;
    void saveState(); render();
  }));
  document.querySelectorAll<HTMLElement>("[data-bbs-thread]").forEach((button) => button.addEventListener("click", () => {
    const id = button.dataset.bbsThread!;
    state.bbs.selectedThreadId = id;
    if (!state.bbs.readThreadIds.includes(id)) state.bbs.readThreadIds.push(id);
    void saveState(); render();
  }));
  document.querySelector<HTMLFormElement>("[data-bbs-reply]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const text = String(new FormData(form).get("reply") ?? "").trim().slice(0, 500);
    if (!text) return;
    state.bbs.replies.push({ id: crypto.randomUUID(), threadId: form.dataset.bbsReply!, text, createdAt: state.gameTime });
    void saveState(); render();
  });
  document.querySelectorAll<HTMLElement>("[data-bbs-evidence]").forEach((button) => button.addEventListener("click", () => {
    const evidence = button.dataset.bbsEvidence!;
    if (!state.infection.evidenceIds.includes(evidence)) state.infection.evidenceIds.push(evidence);
    if (!state.infection.patchComponents.includes("BRIDGE22.CHK")) state.infection.patchComponents.push("BRIDGE22.CHK");
    if (!state.bbs.downloadedFileIds.includes("BRIDGE22.CHK")) state.bbs.downloadedFileIds.push("BRIDGE22.CHK");
    if (!state.downloads.some((file) => file.id === "bbs:BRIDGE22.CHK")) state.downloads.push({ id: "bbs:BRIDGE22.CHK", name: "BRIDGE22.CHK", contents: "Archived SilverDial injection signature. Read-only diagnostic data.", downloadedAt: state.gameTime, sourceTitle: "ByteForge BBS" });
    maybeArmRandyEscalation();
    void saveState(); render();
  }));
  document.querySelectorAll<HTMLElement>("[data-bbs-component]").forEach((button) => button.addEventListener("click", () => {
    const component = button.dataset.bbsComponent!;
    if (!state.infection.patchComponents.includes(component)) state.infection.patchComponents.push(component);
    if (!state.bbs.downloadedFileIds.includes(component)) state.bbs.downloadedFileIds.push(component);
    if (!state.downloads.some((file) => file.id === `bbs:${component}`)) state.downloads.push({ id: `bbs:${component}`, name: component, contents: component === "OBJECTMAP.DAT" ? "Clean Orbit community-object rendering rules supplied by Paula Reyes and Neil Harrow." : "C9 preserved index of pristine public page versions.", downloadedAt: state.gameTime, sourceTitle: "ByteForge BBS" });
    void saveState(); render();
  }));
  document.querySelectorAll<HTMLElement>("[data-bbs-file]").forEach((button) => button.addEventListener("click", () => {
    const name = button.dataset.bbsFile!;
    if (!state.bbs.downloadedFileIds.includes(name)) state.bbs.downloadedFileIds.push(name);
    if (!state.downloads.some((file) => file.id === `bbs:${name}`)) state.downloads.push({ id: `bbs:${name}`, name, contents: name.endsWith(".ANS") ? "╔════════ BYTEFORGE ════════╗\n║ 555-0144 · ONE NODE · OK ║\n╚═══════════════════════════╝" : "KRRR—BEEP—SHHHHH—KONK—CARRIER. Please do not play near sleeping adults.", downloadedAt: state.gameTime, sourceTitle: "ByteForge BBS" });
    void saveState(); render();
  }));
  document.querySelector<HTMLElement>("[data-bbs-build]")?.addEventListener("click", () => {
    if (!PATCH_COMPONENTS.every((part) => state.infection.patchComponents.includes(part))) return;
    state.infection.patchBuilt = true;
    if (!state.downloads.some((file) => file.id === "bbs:ORBITFIX.PAK")) state.downloads.push({ id: "bbs:ORBITFIX.PAK", name: "ORBITFIX.PAK", contents: "Reversible bridge cleanup package assembled by the ByteForge Patch Bay.", downloadedAt: state.gameTime, sourceTitle: "ByteForge BBS" });
    void saveState(); render();
  });
  document.querySelector<HTMLElement>("[data-bbs-publish]")?.addEventListener("click", () => {
    if (!BBS_EVIDENCE_IDS.every((id) => state.infection.evidenceIds.includes(id))) return;
    state.infection.exposureReportPublished = true;
    void saveState(); render();
  });
  document.querySelector<HTMLElement>("[data-bbs-distribute]")?.addEventListener("click", () => {
    if (!state.infection.patchBuilt || !state.infection.exposureReportPublished) return;
    state.infection.patchDistributed = true;
    maybeArmRandyCleanup();
    showNotification(state.flags.phase_seven_transition_pending
      ? "ORBITFIX.PAK distributed. Leave the terminal and sleep to let clean indexes propagate."
      : "ORBITFIX.PAK distributed. The live bridge is still spawning Randy posts; ByteForge is monitoring the remaining pages.");
    void saveState(); render();
  });
  document.querySelector<HTMLElement>("[data-diagnostics-refresh]")?.addEventListener("click", async () => {
    if (window.aiAPI) aiStatus = await window.aiAPI.status();
    render();
  });
  document.querySelectorAll<HTMLElement>("[data-nav]").forEach((el) => el.addEventListener("click", () => navigate(el.dataset.nav!)));
  document.querySelector<HTMLElement>("[data-home-guide]")?.addEventListener("click", () => {
    document.querySelector<HTMLElement>(".zone-directory-intro")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  bindBusinessHeaderTabs();
  bindMaximartDepartments();
  bindBusinessFeatureCards();
  document.querySelectorAll<HTMLElement>("[data-business-tab-target]").forEach((button) => button.addEventListener("click", () => {
    const root = button.closest<HTMLElement>("main.expansion-business-page");
    const target = button.dataset.businessTabTarget;
    const control = target ? root?.querySelector<HTMLElement>(`[data-business-tab-control="${target}"]`) : null;
    control?.click();
    control?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }));
  document.querySelectorAll<HTMLElement>("[data-wondervale-detail]").forEach((button) => button.addEventListener("click", () => {
    const hero = button.closest<HTMLElement>(".wondervale-coaster");
    const title = hero?.querySelector<HTMLElement>("[data-wondervale-title]");
    const eyebrow = hero?.querySelector<HTMLElement>("[data-wondervale-eyebrow]");
    const copy = hero?.querySelector<HTMLElement>("[data-wondervale-copy]");
    if (!hero || !title || !eyebrow || !copy) return;
    const heightMode = button.dataset.wondervaleDetail === "height";
    hero.dataset.wondervaleMode = heightMode ? "height" : "facts";
    eyebrow.textContent = heightMode ? "MEASURE SHOES OFF // HAIR DOES NOT COUNT" : "THE VALLEY'S STEEPEST FIRST DROP";
    title.textContent = heightMode ? "HEIGHT RULES" : "THE NIGHT COMET";
    copy.textContent = heightMode
      ? "Night Comet: 54 in. Timber Howl: 48 in. River Riddle: 42 in. StarLark: 36 in. Riders are measured at the entrance; platform shoes must survive the walk back to the locker."
      : "142 feet tall, three inversions, and a top speed of 61 miles per hour. The train seats 24 riders and the first drop lasts just long enough to remember every unfinished chore.";
    hero.querySelectorAll<HTMLElement>("[data-wondervale-detail]").forEach((entry) => entry.classList.toggle("active", entry === button));
  }));
  document.querySelector<HTMLButtonElement>(".tech-kestrel header form button")?.addEventListener("click", () => {
    const root = document.querySelector<HTMLElement>(".tech-kestrel");
    const select = root?.querySelector<HTMLSelectElement>("header select");
    const cards = root ? [...root.querySelectorAll<HTMLElement>("[data-kestrel-line]")] : [];
    const index = select?.selectedIndex ?? 0;
    (cards[Math.min(index, cards.length - 1)] ?? cards[0])?.click();
  });
  document.querySelector<HTMLButtonElement>(".store-maximart header form button")?.addEventListener("click", () => {
    const root = document.querySelector<HTMLElement>(".store-maximart");
    const query = root?.querySelector<HTMLInputElement>("header input")?.value.trim().toLowerCase() ?? "";
    if (!root || !query) return;
    const department = query.match(/photo|film|camera/) ? "photo-center" : query.match(/car|tire|oil|auto/) ? "automotive" : query.match(/medicine|prescription|pharmacy/) ? "pharmacy" : query.match(/tv|computer|phone|electronic|disk/) ? "electronics" : query.match(/shirt|clothes|denim/) ? "clothing" : query.match(/toy|game/) ? "toys" : query.match(/food|grocery|cereal/) ? "grocery" : "see-all-47";
    root.querySelector<HTMLButtonElement>(`[data-maximart-department="${department}"]`)?.click();
    root.querySelector<HTMLElement>("[data-maximart-detail]")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  document.querySelectorAll<HTMLElement>("[data-business-download]").forEach((button) => button.addEventListener("click", () => {
    const id = button.dataset.businessDownload;
    if (id && Object.prototype.hasOwnProperty.call(BUSINESS_COLLECTIBLES, id)) saveBusinessCollectible(id as BusinessCollectibleId);
  }));
  document.querySelectorAll<HTMLElement>("[data-business-mail]").forEach((button) => button.addEventListener("click", () => {
    const id = button.dataset.businessMail;
    if (id && Object.prototype.hasOwnProperty.call(BUSINESS_COLLECTIBLES, id)) deliverBusinessCollectibleMail(id as BusinessCollectibleId);
  }));
  document.querySelectorAll<HTMLElement>(".auto-aureline [data-aureline-model]").forEach((card) => {
    const selectAurelineModel = () => {
      const root = card.closest<HTMLElement>(".auto-aureline");
      if (!root) return;
      const primary = root.querySelector<HTMLImageElement>("[data-aureline-hero-primary]");
      const hero = root.querySelector<HTMLElement>(".aureline-hero");
      const title = root.querySelector<HTMLElement>("[data-aureline-title]");
      const eyebrow = root.querySelector<HTMLElement>("[data-aureline-eyebrow]");
      const description = root.querySelector<HTMLElement>("[data-aureline-description]");
      if (!primary || !hero || !title || !eyebrow || !description) return;
      const modelTitle = card.dataset.aurelineTitle ?? "AURELINE MODEL";
      primary.src = card.dataset.aurelinePrimary ?? primary.src;
      primary.alt = `${modelTitle} vehicle`;
      hero.dataset.selectedModel = card.dataset.aurelineModel ?? "";
      title.textContent = modelTitle;
      eyebrow.textContent = card.dataset.aurelineEyebrow ?? "MODEL YEAR 2000";
      description.textContent = card.dataset.aurelineDescription ?? "";
      const trim = root.querySelector<HTMLElement>('[data-aureline-spec="trim"]');
      const power = root.querySelector<HTMLElement>('[data-aureline-spec="power"]');
      const transmission = root.querySelector<HTMLElement>('[data-aureline-spec="transmission"]');
      const drive = root.querySelector<HTMLElement>('[data-aureline-spec="drive"]');
      if (trim) trim.textContent = card.dataset.aurelineTrim ?? "";
      if (power) power.textContent = card.dataset.aurelinePower ?? "";
      if (transmission) transmission.textContent = card.dataset.aurelineTransmission ?? "";
      if (drive) drive.textContent = card.dataset.aurelineDrive ?? "";
      businessUiState.set(state.currentUrl, { ...(businessUiState.get(state.currentUrl) ?? {}), card: `aureline:${card.dataset.aurelineModel ?? "vector"}` });
      root.querySelectorAll<HTMLElement>("[data-aureline-model]").forEach((entry) => {
        const active = entry === card;
        entry.classList.toggle("active", active);
        entry.querySelector<HTMLElement>("[data-aureline-select]")?.setAttribute("aria-pressed", String(active));
      });
    };
    card.addEventListener("click", selectAurelineModel);
    card.addEventListener("keydown", (event) => {
      if (event.target !== card) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      selectAurelineModel();
    });
  });
  const restoredAureline = businessUiState.get(state.currentUrl)?.card;
  if (restoredAureline?.startsWith("aureline:")) {
    document.querySelector<HTMLElement>(`.auto-aureline [data-aureline-model="${restoredAureline.slice("aureline:".length)}"]`)?.click();
  }
  document.querySelectorAll<HTMLElement>(".tech-kestrel [data-kestrel-line]").forEach((card) => {
    const selectKestrelLine = () => {
      const root = card.closest<HTMLElement>(".tech-kestrel");
      if (!root) return;
      const hero = root.querySelector<HTMLImageElement>("[data-kestrel-hero]");
      const lead = root.querySelector<HTMLElement>(".kestrel-lead");
      const eyebrow = root.querySelector<HTMLElement>("[data-kestrel-eyebrow]");
      const title = root.querySelector<HTMLElement>("[data-kestrel-title]");
      const description = root.querySelector<HTMLElement>("[data-kestrel-description]");
      if (!hero || !lead || !eyebrow || !title || !description) return;
      hero.src = card.dataset.kestrelPrimary ?? hero.src;
      hero.alt = `${card.dataset.kestrelTitle ?? "Kestrel product"} product image`;
      lead.dataset.selectedLine = card.dataset.kestrelLine ?? "";
      eyebrow.textContent = card.dataset.kestrelEyebrow ?? "THE SIGNAL, REFINED.";
      title.textContent = card.dataset.kestrelTitle ?? "KESTREL PRODUCT";
      description.textContent = card.dataset.kestrelDescription ?? "";
      businessUiState.set(state.currentUrl, { ...(businessUiState.get(state.currentUrl) ?? {}), card: `kestrel:${card.dataset.kestrelLine ?? "tv"}` });
      root.querySelectorAll<HTMLElement>("[data-kestrel-line]").forEach((entry) => {
        entry.classList.toggle("active", entry === card);
      });
    };
    card.addEventListener("click", selectKestrelLine);
    card.addEventListener("keydown", (event) => {
      if (event.target !== card) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      selectKestrelLine();
    });
  });
  const restoredKestrel = businessUiState.get(state.currentUrl)?.card;
  if (restoredKestrel?.startsWith("kestrel:")) {
    document.querySelector<HTMLElement>(`.tech-kestrel [data-kestrel-line="${restoredKestrel.slice("kestrel:".length)}"]`)?.click();
  }
  document.querySelectorAll<HTMLElement>("[data-song-nav]").forEach((el) => el.addEventListener("click", () => {
    selectPageMusicTrack(el.dataset.songNav!, el.dataset.songFile!);
  }));
  document.querySelectorAll<HTMLElement>("[data-download-music]").forEach((el) => el.addEventListener("click", () => {
    const pageUrl = el.dataset.downloadMusic;
    if (pageUrl) downloadPagePlaylist(pageUrl);
  }));
  document.querySelectorAll<HTMLElement>("[data-download-wallpaper]").forEach((el) => el.addEventListener("click", () => {
    const zoneId = el.dataset.downloadWallpaper;
    if (zoneId) downloadZoneWallpaper(zoneId);
  }));
  document.querySelectorAll<HTMLElement>("[data-download-theme]").forEach((el) => el.addEventListener("click", () => {
    const zoneId = el.dataset.downloadTheme;
    if (zoneId) downloadZoneTheme(zoneId);
  }));
  document.querySelectorAll<HTMLElement>("[data-download-music-skin]").forEach((el) => el.addEventListener("click", () => {
    const skinId = el.dataset.downloadMusicSkin;
    if (skinId) downloadMusicSkin(skinId);
  }));
  document.querySelectorAll<HTMLButtonElement>("[data-tribute-art]").forEach((button) => button.addEventListener("click", () => {
    const image = document.querySelector<HTMLImageElement>("[data-tribute-main]");
    if (!image || !button.dataset.tributeArt) return;
    image.src = button.dataset.tributeArt;
    image.alt = button.dataset.tributeAlt ?? "Byte Barn Forever album packaging";
    document.querySelectorAll("[data-tribute-art]").forEach((entry) => entry.classList.toggle("active", entry === button));
  }));
  const tributePhotoLightbox = document.querySelector<HTMLDialogElement>("[data-tribute-photo-lightbox]");
  const openTributePhoto = (thumbnail: HTMLElement) => {
    if (!tributePhotoLightbox || !thumbnail.dataset.tributePhoto) return;
    const artist = thumbnail.dataset.tributeArtist ?? "Byte Barn Forever artist";
    const image = tributePhotoLightbox.querySelector<HTMLImageElement>("[data-tribute-photo-full]");
    const title = tributePhotoLightbox.querySelector<HTMLElement>("[data-tribute-photo-title]");
    if (!image || !title) return;
    image.src = thumbnail.dataset.tributePhoto;
    image.alt = `${artist} full-size official publicity photograph`;
    title.textContent = artist;
    tributePhotoLightbox.showModal();
  };
  document.querySelectorAll<HTMLElement>("[data-tribute-photo]").forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => openTributePhoto(thumbnail));
    thumbnail.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openTributePhoto(thumbnail);
    });
  });
  document.querySelector<HTMLElement>("[data-tribute-photo-close]")?.addEventListener("click", () => tributePhotoLightbox?.close());
  tributePhotoLightbox?.addEventListener("click", (event) => {
    if (event.target === tributePhotoLightbox) tributePhotoLightbox.close();
  });
  document.querySelectorAll<HTMLElement>("[data-download]").forEach((el) => el.addEventListener("click", downloadSignalNote));
  document.querySelectorAll<HTMLElement>("[data-download-page]").forEach((el) => el.addEventListener("click", () => {
    downloadCurrentPageCopy(el.dataset.downloadPage ?? state.currentUrl);
  }));
  document.querySelectorAll<HTMLElement>("[data-download-helper]").forEach((el) => el.addEventListener("click", downloadOrbitPal));
  document.querySelectorAll<HTMLElement>("[data-download-cursor]").forEach((el) => el.addEventListener("click", () => {
    const cursorId = el.dataset.downloadCursor;
    if (cursorId) downloadCursor(cursorId);
  }));
  document.querySelector<HTMLElement>("[data-page-music]")?.addEventListener("click", togglePageMusic);
  document.querySelector<HTMLElement>("[data-page-music-prev]")?.addEventListener("click", () => changePageMusicTrack(-1));
  document.querySelector<HTMLElement>("[data-page-music-next]")?.addEventListener("click", () => changePageMusicTrack(1));
  document.querySelector<HTMLElement>("[data-global-music]")?.addEventListener("click", toggleGlobalMusic);
  document.querySelector<HTMLElement>("[data-global-music-prev]")?.addEventListener("click", () => changeGlobalMusicTrack(-1));
  document.querySelector<HTMLElement>("[data-global-music-next]")?.addEventListener("click", () => changeGlobalMusicTrack(1));
  document.querySelector<HTMLElement>("[data-global-music-skin]")?.addEventListener("click", () => {
    const currentIndex = MUSIC_PLAYER_SKINS.findIndex((skin) => skin.id === state.musicSkin);
    state.musicSkin = MUSIC_PLAYER_SKINS[(currentIndex + 1) % MUSIC_PLAYER_SKINS.length].id;
    void saveState();
    render();
  });
  document.querySelectorAll<HTMLElement>("[data-global-music-track]").forEach((entry) => entry.addEventListener("click", () => {
    const index = Number(entry.dataset.globalMusicTrack);
    if (!Number.isInteger(index) || index < 0 || index >= state.musicLibrary.length) return;
    globalMusicTrackIndex = index;
    loadedGlobalMusicKey = null;
    globalMusicPlaying = true;
    pageMusicPlaying = false;
    pageMusic.pause();
    pageMusic.currentTime = 0;
    render();
  }));
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
  document.querySelector<HTMLInputElement>("[data-global-music-volume]")?.addEventListener("input", (event) => {
    const input = event.currentTarget as HTMLInputElement;
    const volume = Math.max(0, Math.min(100, Number(input.value)));
    state.settings.musicVolume = volume;
    globalMusic.volume = PAGE_MUSIC_MAX_VOLUME * volume / 100;
    input.style.setProperty("--orbitamp-volume", `${volume}%`);
    void saveState();
  });
  document.querySelectorAll<HTMLElement>("[data-fandom-toggle]").forEach((button) => button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.fandomToggle!);
    if (!target) return;
    const group = button.closest<HTMLElement>("[data-fandom-toggle-group]");
    if (group) {
      group.querySelectorAll<HTMLElement>("[data-fandom-toggle]").forEach((peer) => {
        const peerTarget = document.getElementById(peer.dataset.fandomToggle!);
        if (peer !== button) {
          peer.classList.remove("active");
          peer.setAttribute("aria-expanded", "false");
          peerTarget?.classList.remove("open");
        }
      });
    }
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
    if (app === "browser" && promptForPendingPhaseTransition()) return;
    windows[app].open = false;
    if (app === "helper") helperPanelOpen = false;
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
    else {
      windows[app].minimized = false;
      focusApp(app);
      if (app === "chat") markAimConversationRead(activeAimOwnerId);
    }
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
    if (promptForPendingPhaseTransition()) return;
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
    if (openingMessageTimer !== null) {
      window.clearTimeout(openingMessageTimer);
      openingMessageTimer = null;
    }
    if (sleepTransitionTimer !== null) {
      window.clearTimeout(sleepTransitionTimer);
      sleepTransitionTimer = null;
    }
    sleepTransition = null;
    await saveStateQueue.catch(() => undefined);
    state = normalizeState(window.gameAPI ? await window.gameAPI.reset() : structuredClone(DEFAULT_STATE));
    if (!window.gameAPI) localStorage.removeItem("surfin-save");
    history = [state.currentUrl]; historyIndex = 0; startOpen = false;
    phaseTransitionPrompt = null;
    phaseTransition = null;
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
    markAimConversationRead(activeAimOwnerId);
    render();
  }));
  document.querySelector<HTMLSelectElement>("[data-aim-contact-select]")?.addEventListener("change", (event) => {
    const ownerId = (event.currentTarget as HTMLSelectElement).value;
    if (!ownerId) return;
    activeAimOwnerId = ownerId;
    chatError = "";
    markAimConversationRead(activeAimOwnerId);
    render();
  });
  document.querySelectorAll<HTMLElement>("[data-aim-owner]").forEach((button) => button.addEventListener("click", () => {
    const ownerId = button.dataset.aimOwner ?? "mira_917";
    if (!ensureCharacterContact(ownerId)) return;
    activeAimOwnerId = ownerId;
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
    const selected = state.directMessages.find((message) => message.id === selectedMailMessageId);
    if (selected) markDirectMessagesRead([selected]);
    render();
  }));
  document.querySelector<HTMLElement>("[data-mail-page]")?.addEventListener("click", (event) => {
    const targetUrl = (event.currentTarget as HTMLElement).dataset.mailPage;
    if (!targetUrl) return;
    openApp("browser");
    navigate(targetUrl);
  });
  document.querySelectorAll<HTMLElement>("[data-business-attachment]").forEach((button) => button.addEventListener("click", () => {
    const id = button.dataset.businessAttachment;
    if (id && Object.prototype.hasOwnProperty.call(BUSINESS_COLLECTIBLES, id)) saveBusinessCollectible(id as BusinessCollectibleId);
  }));

  document.querySelector<HTMLFormElement>(".address-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    navigate(new FormData(form).get("address")?.toString() ?? form.querySelector("input")!.value);
  });
  document.querySelector<HTMLSelectElement>("[data-bookmark-overflow]")?.addEventListener("change", (event) => {
    const url = (event.currentTarget as HTMLSelectElement).value;
    if (url) navigate(url);
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
    if (!state.bookmarks.includes(LEGACY_ORBIT_HOME_URL)) state.bookmarks.push(LEGACY_ORBIT_HOME_URL);
    await saveState();
    notification = "ACCESS GRANTED // Evidence index decrypted.";
    render();
  });
  document.querySelector<HTMLFormElement>("[data-darkraven-conclusion]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const password = String(new FormData(form).get("password") ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
    if (password !== "continuityhost") {
      storyFormErrors.set("raven-conclusion", "FINAL FILE LOCKED // You skimmed. Read the evidence and follow the trail.");
      render();
      return;
    }
    storyFormErrors.delete("raven-conclusion");
    state.flags.darkraven_conclusion_unlocked = true;
    await saveState();
    notification = "FINAL FILE DECRYPTED // Raven's complete theory loaded.";
    navigate(RAVEN_CONCLUSION_URL);
  });
  document.querySelectorAll<HTMLFormElement>("[data-case-unlock]").forEach((form) => form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const caseId = form.dataset.caseUnlock ?? "";
    const normalizeCaseAnswer = (value: FormDataEntryValue | null) =>
      String(value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const formData = new FormData(form);
    const answer = [
      normalizeCaseAnswer(formData.get("answer")),
      normalizeCaseAnswer(formData.get("answer2")),
      normalizeCaseAnswer(formData.get("answer3"))
    ].filter(Boolean).join("|");
    if (!MYSTERY_CASE_ANSWERS[caseId] || answer !== MYSTERY_CASE_ANSWERS[caseId]) {
      const errorMessages: Record<string, string> = {
        morrow_five: "SEQUENCE REJECTED // both the repeated group and missing position must match",
        glass_lake: "CROSS-CHECK FAILED // the witness-envelope date and paper reference must both match",
        quiet_county: "INDEX MISS // the copied error, project name, and legitimate study reference must all match"
      };
      storyFormErrors.set(caseId, errorMessages[caseId] ?? "CASE CHECK FAILED");
      render();
      return;
    }
    const unlockFlag = MYSTERY_UNLOCK_FLAGS[caseId];
    if (!unlockFlag) return;
    storyFormErrors.delete(caseId);
    state.flags[unlockFlag] = true;
    registerStoryVisit(state.currentUrl);
    await saveState();
    notification = "CASE RESOLVED // conclusion file opened.";
    render();
  }));
  document.querySelector<HTMLFormElement>("[data-continuity-login]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const password = String(new FormData(form).get("password") ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
    if (password !== "stayonline") {
      storyFormErrors.set("continuity", "PHRASE REJECTED // three recovery fragments required");
      render();
      return;
    }
    storyFormErrors.delete("continuity");
    state.flags.continuity_console_unlocked = true;
    state.flags.phase_four_transition_pending = true;
    await saveState();
    showNotification("NODE C9 ARCHIVE UNLOCKED // continuity record loaded.");
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
    const art = businessCollectibleArt(file.artId);
    const artifact = file.artId && Object.prototype.hasOwnProperty.call(BUSINESS_COLLECTIBLES, file.artId) ? BUSINESS_COLLECTIBLES[file.artId as BusinessCollectibleId] : null;
    const layout = file.artId && artifact ? businessCollectibleLayout(file.artId as BusinessCollectibleId) : "";
    viewer.innerHTML = `<section class="${art ? "illustrated-file-viewer" : ""}"><header><span>${escapeHtml(file.name)}</span><button aria-label="Close">×</button></header>${layout || (art && artifact ? `<figure data-art-id="${escapeHtml(file.artId ?? "")}"><img src="${art}" alt="${escapeHtml(artifact.alt)}"><figcaption>${escapeHtml(artifact.title)}</figcaption></figure>` : "")}<pre></pre></section>`;
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
  bindWindowResizing();
}

function bindDragging() {
  document.querySelectorAll<HTMLElement>("[data-drag-handle]").forEach((handle) => {
    handle.addEventListener("pointerdown", (event) => {
      if ((event.target as HTMLElement).closest("button, input, label")) return;
      const app = handle.dataset.dragHandle as AppId;
      if (windows[app].maximized) return;
      const winEl = handle.closest<HTMLElement>(".app-window, .orbitamp-float");
      if (!winEl) return;
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

function bindWindowResizing() {
  document.querySelectorAll<HTMLElement>("[data-resize-handle]").forEach((handle) => {
    handle.addEventListener("pointerdown", (event) => {
      const app = handle.dataset.resizeHandle as "browser" | "mail" | "bbs";
      if (windows[app].maximized) return;
      event.preventDefault();
      const winEl = handle.closest<HTMLElement>(`.${app}-window`);
      const edge = handle.dataset.resizeEdge ?? "";
      if (!winEl || !edge) return;
      focusApp(app);
      winEl.style.zIndex = String(topZ);
      const startX = event.clientX;
      const startY = event.clientY;
      const origin = { x: windows[app].x, y: windows[app].y, width: windows[app].width, height: windows[app].height };
      const minWidth = app === "browser" ? 560 : app === "bbs" ? 600 : 480;
      const minHeight = app === "browser" ? 390 : app === "bbs" ? 390 : 330;
      handle.setPointerCapture(event.pointerId);
      const move = (moveEvent: PointerEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;
        const right = origin.x + origin.width;
        const bottom = origin.y + origin.height;
        let x = origin.x;
        let y = origin.y;
        let width = origin.width;
        let height = origin.height;
        if (edge.includes("e")) width = Math.max(minWidth, Math.min(window.innerWidth - origin.x, origin.width + deltaX));
        if (edge.includes("s")) height = Math.max(minHeight, Math.min(window.innerHeight - 40 - origin.y, origin.height + deltaY));
        if (edge.includes("w")) {
          x = Math.max(0, Math.min(right - minWidth, origin.x + deltaX));
          width = right - x;
        }
        if (edge.includes("n")) {
          y = Math.max(0, Math.min(bottom - minHeight, origin.y + deltaY));
          height = bottom - y;
        }
        Object.assign(windows[app], { x, y, width, height });
        winEl.style.left = `${x}px`;
        winEl.style.top = `${y}px`;
        winEl.style.width = `${width}px`;
        winEl.style.height = `${height}px`;
      };
      const up = () => {
        handle.removeEventListener("pointermove", move);
        handle.removeEventListener("pointerup", up);
      };
      handle.addEventListener("pointermove", move);
      handle.addEventListener("pointerup", up);
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
      rollRandySpread(before, gameDate);
      queueAmbientPostRolls(crossedAmbientPostIntervals(before, gameDate), state.gameTime);
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
      if (windows.chat.open && !windows.chat.minimized && windows.chat.z === topZ) {
        markAimConversationRead(activeAimOwnerId);
      }
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
  if (previewStoryPhase >= 2 && previewStoryPhase <= 7 && state.storyPhase < previewStoryPhase) {
    for (let phase = state.storyPhase + 1; phase <= previewStoryPhase; phase += 1) activateStoryPhase(phase as StoryPhase);
    phaseTransition = null;
    phaseTransitionPrompt = null;
    sleepTransition = null;
    state.currentUrl = "web://home";
    void saveState();
  }
  const directMessageCountBeforePhaseSync = state.directMessages.length;
  if (state.storyPhase >= 2) addPhaseInvestigationMessages(2);
  if (state.storyPhase >= 3) addPhaseInvestigationMessages(3);
  if (state.directMessages.length !== directMessageCountBeforePhaseSync) void saveState();
  if (state.storyPhase === 4) addEndingCommunityResponses();
  aiConversation = loadedConversation;
  aiStatus = loadedStatus;
  history = [state.currentUrl];
  lastGameClockTick = performance.now();
  render();
  window.setInterval(updateClock, 1000);
  if (aiStatus.warmed) void processAmbientPostQueue();
});
