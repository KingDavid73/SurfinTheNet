import type { PageComment, PageDefinition } from "./types";

const FANVERSE_URL = "web://orbitnet.local/zones/fanverse";
const MOSS_URL = "web://fanverse.zone/users/mossmunchmel/home";
const BLIPZO_URL = "web://fanverse.zone/users/blipzobeliever88/home";
const STAR_URL = "web://fanverse.zone/users/tapeattictess/home";
const PRISM_URL = "web://fanverse.zone/users/prismpilotaya/home";
const GEMWELL_URL = "web://fanverse.zone/users/deepdelverdot/home";
const ATLAS_URL = "web://fanverse.zone/users/mapmousemina/home";
const GEMWELL_TRUE_BOTTOM_ROOM = new URL("../assets/images/fandom-members/gemwell/true-bottom-trove.png", import.meta.url).href;

const FANDOM_ASSETS = {
  "moss-ensemble": new URL("../assets/images/fandom-members/mossmunch/official/ensemble.png", import.meta.url).href,
  "moss-lily-crossing": new URL("../assets/images/fandom-members/mossmunch/official/lily-crossing.png", import.meta.url).href,
  "moss-brindle-map": new URL("../assets/images/fandom-members/mossmunch/official/brindle-map.png", import.meta.url).href,
  "moss-dry-mayor": new URL("../assets/images/fandom-members/mossmunch/official/dry-mayor.png", import.meta.url).href,
  "moss-root-tunnel": new URL("../assets/images/fandom-members/mossmunch/official/root-tunnel.png", import.meta.url).href,
  "moss-mushroom-chase": new URL("../assets/images/fandom-members/mossmunch/official/mushroom-chase.png", import.meta.url).href,
  "moss-treehouse": new URL("../assets/images/fandom-members/mossmunch/official/treehouse-sunset.png", import.meta.url).href,
  "moss-model-sheet": new URL("../assets/images/fandom-members/mossmunch/official/model-sheet.png", import.meta.url).href,
  "moss-vhs-cover": new URL("../assets/images/fandom-members/mossmunch/official/vhs-cover.png", import.meta.url).href,
  "moss-pencil": new URL("../assets/images/fandom-members/mossmunch/fan/pencil-friends.png", import.meta.url).href,
  "moss-mayor-art": new URL("../assets/images/fandom-members/mossmunch/fan/mayor-confrontation.png", import.meta.url).href,
  "moss-watercolor": new URL("../assets/images/fandom-members/mossmunch/fan/bog-watercolor.png", import.meta.url).href,
  "moss-fiction-cover": new URL("../assets/images/fandom-members/mossmunch/fan/lantern-fiction-cover.png", import.meta.url).href,
  "moss-fiction-pages": new URL("../assets/images/fandom-members/mossmunch/fan/fiction-pages.png", import.meta.url).href,
  "moss-plush": new URL("../assets/images/fandom-members/mossmunch/fan/plush-photo.png", import.meta.url).href,
  "moss-mel": new URL("../assets/images/fandom-members/mossmunch/fan/mel-portrait.png", import.meta.url).href,
  "moss-chart": new URL("../assets/images/fandom-members/mossmunch/fan/continuity-chart.png", import.meta.url).href,
  "moss-vhs": new URL("../assets/images/fandom-members/mossmunch/fan/vhs-collection.png", import.meta.url).href,
  "blipzo-hero": new URL("../assets/images/fandom-members/blipzo/official/hero-render.png", import.meta.url).href,
  "blipzo-foodcourt": new URL("../assets/images/fandom-members/blipzo/official/foodcourt-game.png", import.meta.url).href,
  "blipzo-escalator": new URL("../assets/images/fandom-members/blipzo/official/escalator-game.png", import.meta.url).href,
  "blipzo-boss": new URL("../assets/images/fandom-members/blipzo/official/leaselord-boss.png", import.meta.url).href,
  "blipzo-kiosk": new URL("../assets/images/fandom-members/blipzo/official/kiosk-select.png", import.meta.url).href,
  "blipzo-zero": new URL("../assets/images/fandom-members/blipzo/official/store-zero.png", import.meta.url).href,
  "blipzo-ad": new URL("../assets/images/fandom-members/blipzo/official/magazine-ad.png", import.meta.url).href,
  "blipzo-model": new URL("../assets/images/fandom-members/blipzo/official/model-sheet.png", import.meta.url).href,
  "blipzo-map": new URL("../assets/images/fandom-members/blipzo/official/atrium-map.png", import.meta.url).href,
  "blipzo-rail-art": new URL("../assets/images/fandom-members/blipzo/fan/escalator-art.png", import.meta.url).href,
  "blipzo-fries-art": new URL("../assets/images/fandom-members/blipzo/fan/foodcourt-art.png", import.meta.url).href,
  "blipzo-zero-art": new URL("../assets/images/fandom-members/blipzo/fan/store-zero-art.png", import.meta.url).href,
  "blipzo-fiction-cover": new URL("../assets/images/fandom-members/blipzo/fan/after-closing-cover.png", import.meta.url).href,
  "blipzo-fiction-pages": new URL("../assets/images/fandom-members/blipzo/fan/fiction-pages.png", import.meta.url).href,
  "blipzo-zero-map": new URL("../assets/images/fandom-members/blipzo/fan/store-zero-map.png", import.meta.url).href,
  "blipzo-trent": new URL("../assets/images/fandom-members/blipzo/fan/trent-portrait.png", import.meta.url).href,
  "blipzo-clay": new URL("../assets/images/fandom-members/blipzo/fan/clay-models.png", import.meta.url).href,
  "blipzo-comparison": new URL("../assets/images/fandom-members/blipzo/fan/level-comparison.png", import.meta.url).href,
  "star-ensemble": new URL("../assets/images/fandom-members/starthimble/official/ensemble.png", import.meta.url).href,
  "star-cabinet": new URL("../assets/images/fandom-members/starthimble/official/cabinet-glow.png", import.meta.url).href,
  "star-luma-rain": new URL("../assets/images/fandom-members/starthimble/official/luma-rain.png", import.meta.url).href,
  "star-mayor": new URL("../assets/images/fandom-members/starthimble/official/mayor-town.png", import.meta.url).href,
  "star-upward-snow": new URL("../assets/images/fandom-members/starthimble/official/upward-snow.png", import.meta.url).href,
  "star-bottle-storm": new URL("../assets/images/fandom-members/starthimble/official/bottle-storm.png", import.meta.url).href,
  "star-observatory": new URL("../assets/images/fandom-members/starthimble/official/observatory.png", import.meta.url).href,
  "star-workshop": new URL("../assets/images/fandom-members/starthimble/official/workshop.png", import.meta.url).href,
  "star-vhs-art": new URL("../assets/images/fandom-members/starthimble/official/vhs-art.png", import.meta.url).href,
  "star-tess": new URL("../assets/images/fandom-members/starthimble/fan/tess-portrait.png", import.meta.url).href,
  "star-vhs-shelf": new URL("../assets/images/fandom-members/starthimble/fan/vhs-shelf.png", import.meta.url).href,
  "star-corkboard": new URL("../assets/images/fandom-members/starthimble/fan/corkboard.png", import.meta.url).href,
  "star-luma-plush": new URL("../assets/images/fandom-members/starthimble/fan/luma-plush.png", import.meta.url).href,
  "star-zine": new URL("../assets/images/fandom-members/starthimble/fan/zine.png", import.meta.url).href,
  "star-fiction-cover": new URL("../assets/images/fandom-members/starthimble/fan/fiction-cover.png", import.meta.url).href,
  "star-fiction-pages": new URL("../assets/images/fandom-members/starthimble/fan/fiction-pages.png", import.meta.url).href,
  "star-diagram": new URL("../assets/images/fandom-members/starthimble/fan/cabinet-diagram.png", import.meta.url).href,
  "star-key-tape": new URL("../assets/images/fandom-members/starthimble/fan/key-tape.png", import.meta.url).href,
  "prism-group": new URL("../assets/images/fandom-members/prism5/official/group.png", import.meta.url).href,
  "prism-civilians": new URL("../assets/images/fandom-members/prism5/official/civilians.png", import.meta.url).href,
  "prism-rose": new URL("../assets/images/fandom-members/prism5/official/rose-transform.png", import.meta.url).href,
  "prism-azure": new URL("../assets/images/fandom-members/prism5/official/azure-transform.png", import.meta.url).href,
  "prism-viridian": new URL("../assets/images/fandom-members/prism5/official/viridian-flight.png", import.meta.url).href,
  "prism-citrine-violet": new URL("../assets/images/fandom-members/prism5/official/citrine-violet.png", import.meta.url).href,
  "prism-null": new URL("../assets/images/fandom-members/prism5/official/null-regent.png", import.meta.url).href,
  "prism-badges": new URL("../assets/images/fandom-members/prism5/official/badges.png", import.meta.url).href,
  "prism-finale": new URL("../assets/images/fandom-members/prism5/official/finale.png", import.meta.url).href,
  "prism-aya": new URL("../assets/images/fandom-members/prism5/fan/aya-portrait.png", import.meta.url).href,
  "prism-pencil": new URL("../assets/images/fandom-members/prism5/fan/pencil-group.png", import.meta.url).href,
  "prism-violet-art": new URL("../assets/images/fandom-members/prism5/fan/violet-watercolor.png", import.meta.url).href,
  "prism-bootlegs": new URL("../assets/images/fandom-members/prism5/fan/bootleg-figures.png", import.meta.url).href,
  "prism-chart": new URL("../assets/images/fandom-members/prism5/fan/transform-chart.png", import.meta.url).href,
  "prism-sixth": new URL("../assets/images/fandom-members/prism5/fan/sixth-crystal-art.png", import.meta.url).href,
  "prism-fiction-pages": new URL("../assets/images/fandom-members/prism5/fan/fiction-pages.png", import.meta.url).href,
  "prism-tapes": new URL("../assets/images/fandom-members/prism5/fan/tape-collection.png", import.meta.url).href,
  "prism-handmade-badges": new URL("../assets/images/fandom-members/prism5/fan/handmade-badges.png", import.meta.url).href
} as const;

const fanImage = (name: keyof typeof FANDOM_ASSETS, alt: string, className = "") =>
  `<img class="fandom-art ${className}" src="${FANDOM_ASSETS[name]}" alt="${alt}">`;

const GEMWELL_SPRITES = [
  ["ruby", "Ruby cluster", new URL("../assets/images/fandom-members/gemwell/sprites/ruby.png", import.meta.url).href, "COMMON // A rough cluster of red cave rubies found near the first drip-stone shelves. The stones grow warm whenever an old passage lies behind the rock, as if they remember the fire that once ran through the mountain."],
  ["sapphire", "Sapphire shard", new URL("../assets/images/fandom-members/gemwell/sprites/sapphire.png", import.meta.url).href, "COMMON // A blue shard chipped from a shallow water seam. Its point settles toward the nearest hidden spring, which is why Dot carries one on a thread whenever the tunnel begins to fork."],
  ["emerald", "Emerald geode", new URL("../assets/images/fandom-members/gemwell/sprites/emerald.png", import.meta.url).href, "UNCOMMON // A split green geode with glassy crystal teeth inside. Its crack closes and reopens in a new shape after every rest, leaving a different little map of veins across its heart."],
  ["amethyst", "Spiral amethyst", new URL("../assets/images/fandom-members/gemwell/sprites/amethyst.png", import.meta.url).href, "UNCOMMON // A purple crystal curled into a naturally occurring spiral. Six pale bands turn beneath its surface, though only five can be seen at once; the hidden band appears when the cave has gone still."],
  ["citrine", "Citrine sunstone", new URL("../assets/images/fandom-members/gemwell/sprites/citrine.png", import.meta.url).href, "COMMON // A warm yellow stone found near beetle nests and sunless shallows. It brightens beneath a watchful gaze, as if pleased to be carried farther than the other stones."],
  ["opal", "Opal egg", new URL("../assets/images/fandom-members/gemwell/sprites/opal.png", import.meta.url).href, "QUEST ITEM? // A polished opal shaped almost like an egg, with tiny colors moving beneath its skin. It returns to the same hollow whenever it is set aside and seems less like treasure than a patient little animal waiting for a name."],
  ["quartz", "Quartz crown", new URL("../assets/images/fandom-members/gemwell/sprites/quartz.png", import.meta.url).href, "UNCOMMON // Five clear quartz points have grown together in the shape of a small crown. Each point chimes in a different order at dusk, as though the stone is practicing a ceremony nobody remembers."],
  ["black-prism", "Black rainbow prism", new URL("../assets/images/fandom-members/gemwell/sprites/black-prism.png", import.meta.url).href, "RUMORED // A dark prism that should reflect nothing, yet flashes eight colors when the chamber is still. Dot calls the eighth color a warning from below; it looks almost like a color dreaming of being born."],
  ["lantern-beetle", "Lantern beetle", new URL("../assets/images/fandom-members/gemwell/sprites/lantern-beetle.png", import.meta.url).href, "PASSIVE // A small cave beetle with a glowing amber abdomen. It follows lit gems and freezes whenever a stranger speaks, as if trained by some vanished keeper to listen before it moves."],
  ["crystal-moth", "Crystal moth", new URL("../assets/images/fandom-members/gemwell/sprites/crystal-moth.png", import.meta.url).href, "PASSIVE // A pale moth whose wings look cut from thin quartz. Its dust reveals hairline doors behind decorative stone, making it the first creature Dot trusts more than any old guidebook."],
  ["centipede", "Cave centipede", new URL("../assets/images/fandom-members/gemwell/sprites/centipede.png", import.meta.url).href, "HOSTILE? // A segmented blue cave pest that normally hugs the walls. It advances one joint whenever the deep bell rings, as though the sound is calling it from a nest beneath the shaft."],
  ["jewel-snail", "Jewel-shell snail", new URL("../assets/images/fandom-members/gemwell/sprites/jewel-snail.png", import.meta.url).href, "DOCILE // A very slow snail carrying a faceted shell like a precious gem. Its shell grows richer with depth while its pace never changes, making it the steadiest companion in the whole cave."],
  ["salamander", "Blind cave salamander", new URL("../assets/images/fandom-members/gemwell/sprites/salamander.png", import.meta.url).href, "RARE // A pale salamander with milk-white eyes. It turns toward a raised hand before anyone reaches for it, so it either sees through stone or knows the shape of a visitor's intention."],
  ["gem-bat", "Gem-eyed bat", new URL("../assets/images/fandom-members/gemwell/sprites/gem-bat.png", import.meta.url).href, "NOCTURNAL // A little black bat with two bright jewels for eyes. The jewels match the warning lamp on the oldest depth stones exactly, as if the markers themselves have learned to fly."],
  ["walking-stalagmite", "Walking stalagmite", new URL("../assets/images/fandom-members/gemwell/sprites/walking-stalagmite.png", import.meta.url).href, "MISFILED // A jagged stalagmite that shuffles when the camp goes quiet. Dot found tiny footprints in the grit and now bows to it before passing, just in case it is somebody's ancestor."],
  ["mushroom-crab", "Mushroom crab", new URL("../assets/images/fandom-members/gemwell/sprites/mushroom-crab.png", import.meta.url).href, "SOCIAL // A squat crustacean wearing a cluster of glowing mushrooms as a shell. Groups form arrow shapes pointing away from the nearest exit, which is amusing until every arrow agrees."],
  ["pearl-spider", "Pearl spider", new URL("../assets/images/fandom-members/gemwell/sprites/pearl-spider.png", import.meta.url).href, "PASSIVE // A white spider that spins a very regular pearl-thread web. Its pattern repeats until the lower reaches, then gains one impossible strand leading toward a place no map admits."],
  ["geode-frog", "Geode frog", new URL("../assets/images/fandom-members/gemwell/sprites/geode-frog.png", import.meta.url).href, "RARE // A fat little frog with a cracked geode for a back. Its croak carries four notes, the last so quiet it sounds like a distant bell answering from farther down."],
  ["helmet", "Abandoned helmet", new URL("../assets/images/fandom-members/gemwell/sprites/helmet.png", import.meta.url).href, "ABANDONED // A miner's helmet resting in a dry room with no visible owner. Its visor reflects a ladder that is not present, as if the cave remembers paths that have already drowned."],
  ["fossil-key", "Fossil key", new URL("../assets/images/fandom-members/gemwell/sprites/fossil-key.png", import.meta.url).href, "KEY ITEM // A bone-white key fossilized into a curl of old stone. It fits no known lock, but its teeth echo the crest carved into the royal treasury far below."],
  ["glass-tooth", "Glass tooth", new URL("../assets/images/fandom-members/gemwell/sprites/glass-tooth.png", import.meta.url).href, "UNKNOWN // A translucent tooth that seems to hold a cold edge without cutting the hand. No beast claims it, yet the deeper creatures all part around it as though they know whose mouth it came from."],
  ["compass-seed", "Compass seed", new URL("../assets/images/fandom-members/gemwell/sprites/compass-seed.png", import.meta.url).href, "UNSTABLE // A seed pod with one tiny needle in its center. Each time the shaft turns, a new needle sprouts and points toward a direction the surface world does not have."],
  ["singing-pebble", "Singing pebble", new URL("../assets/images/fandom-members/gemwell/sprites/singing-pebble.png", import.meta.url).href, "SONG // A smooth gray pebble that sings three notes when warmed in the palm. Down here the little tune sounds less like a child's jingle than a fragment of a royal signal."],
  ["cracked-crown", "Cracked crown", new URL("../assets/images/fandom-members/gemwell/sprites/cracked-crown.png", import.meta.url).href, "FORGOTTEN // A small broken crown half-buried in ordinary cave dirt. Its inner band bears a name that has been scraped away, implying somebody expected another traveler to descend this far."],
  ["depth-marker", "Runed depth marker", new URL("../assets/images/fandom-members/gemwell/sprites/depth-marker.png", import.meta.url).href, "WAYSTONE // A stone marker carved with curling runes instead of numbers. The curls match a sign on the oldest map of Orra, hinting that the Lusterkin knew of roads beyond the cave." ]
] as const;

const GEMWELL_DEEP_SPRITES = [
  ["star-sapphire", "Star sapphire", new URL("../assets/images/fandom-members/gemwell/deep-sprites/star-sapphire.png", import.meta.url).href, "TREASURE // A sapphire cut into four points like a compass star. It flashes before the tunnels shift, the same light Lusterkin surveyors carried through the moving stone."],
  ["ember-ruby", "Ember ruby", new URL("../assets/images/fandom-members/gemwell/deep-sprites/ember-ruby.png", import.meta.url).href, "TREASURE // A coal-red ruby that stays warm without flame. Held above black water, it draws a narrow skin of warmth across the surface like a rationed piece of sun."],
  ["moon-lantern", "Moon lantern", new URL("../assets/images/fandom-members/gemwell/deep-sprites/moon-lantern.png", import.meta.url).href, "RELIC // A hand lantern holding a pale crescent instead of a bulb. It lights paths that do not exist until illuminated, suggesting the royal court built their passages from memory and moonlight rather than stone."],
  ["quartz-crown", "Quartz crown", new URL("../assets/images/fandom-members/gemwell/deep-sprites/quartz-crown.png", import.meta.url).href, "ROYAL // A delicate crown grown from clear quartz and cracked at the base. It rings whenever its bearer bows toward the dark, an old ceremonial warning or perhaps an invitation."],
  ["bone-key", "Bone key", new URL("../assets/images/fandom-members/gemwell/deep-sprites/bone-key.png", import.meta.url).href, "KEY ITEM // A pale key carved from something much larger than any surface animal. It turns in empty air before a lock appears, as though the door has not yet decided to become stone."],
  ["royal-gloves", "Damp royal gloves", new URL("../assets/images/fandom-members/gemwell/deep-sprites/royal-gloves.png", import.meta.url).href, "RELIC // Velvet gloves, still wet with black cave water and far too small for a miner. Their fingers always turn deeper, as if they still belong to the queen who led her court away from the flooded throne."],
  ["pearl-door", "Pearl door", new URL("../assets/images/fandom-members/gemwell/deep-sprites/pearl-door.png", import.meta.url).href, "PASSAGE // A round door faced with cloudy pearl layers and no visible handle. It opens only after the bearer has stood quietly before it, revealing the court's habit of hiding their most important halls from the impatient."],
  ["glass-tooth-deep", "Glass tooth", new URL("../assets/images/fandom-members/gemwell/deep-sprites/glass-tooth.png", import.meta.url).href, "WEAPON? // The same impossible glass tooth found higher up, now sharp enough to catch the light. No creature owns it, but every nearby creature turns away, which may mean it was made from the tooth of the thing beneath the black tide."],
  ["compass-seed-deep", "Compass seed", new URL("../assets/images/fandom-members/gemwell/deep-sprites/compass-seed.png", import.meta.url).href, "LIVING MAP // The little seed grows a fresh needle toward the lowest chamber. It behaves less like a tool than a root searching for the buried king's hall."],
  ["singing-stone", "Singing stone", new URL("../assets/images/fandom-members/gemwell/deep-sprites/singing-stone.png", import.meta.url).href, "RELIC // A larger, polished singing stone. Beside a crown it supplies the missing fourth note of a royal call-and-response once used to open sealed halls."],
  ["miner-helmet", "Miner helmet", new URL("../assets/images/fandom-members/gemwell/deep-sprites/miner-helmet.png", import.meta.url).href, "ABANDONED // An older helmet with a lamp that shines downward even when left on the floor. The inside bears a scratched surveyor number, perhaps from the expedition that first found the king's drowned treasury."],
  ["lantern-beetle-deep", "Lantern beetle", new URL("../assets/images/fandom-members/gemwell/deep-sprites/lantern-beetle.png", import.meta.url).href, "GUIDE? // A brighter, slower lantern beetle that circles buried royal objects before settling. Dot thinks these were ordinary cave insects trained by the court to lead children through the dark."],
  ["crystal-moth-deep", "Crystal moth", new URL("../assets/images/fandom-members/gemwell/deep-sprites/crystal-moth.png", import.meta.url).href, "NOCTURNAL // Its wing dust outlines a stair descending under black water. When it lands, submerged steps brighten briefly, restoring a section of the old royal road."],
  ["jewel-snail-deep", "Jewel-shell snail", new URL("../assets/images/fandom-members/gemwell/deep-sprites/jewel-snail.png", import.meta.url).href, "CARRIER // This snail's jewel shell contains a little chamber with a chair-shaped shadow. The court may have used shells like these to carry their smallest belongings during the flood."],
  ["blind-salamander-deep", "Blind salamander", new URL("../assets/images/fandom-members/gemwell/deep-sprites/blind-salamander.png", import.meta.url).href, "WITNESS // A white salamander that stops at every old waystone. It waits until the explorer turns away, then slips onward as though it knows a truer measure of the depth."]
] as const;

const GEMWELL_ABYSS_SPRITES = [
  ["abyss-eel", "Glassfin eel", new URL("../assets/images/fandom-members/gemwell/abyss-sprites/abyss-eel.png", import.meta.url).href, "ABYSSAL // A transparent eel with a bright thread running through its spine. It leaves lights spelling the same rune in a different order, probably tracing the route the king took when he entered the black water alone."],
  ["crown-jelly", "Crown jelly", new URL("../assets/images/fandom-members/gemwell/abyss-sprites/crown-jelly.png", import.meta.url).href, "PASSIVE // A soft jellyfish whose bell flares into a tiny crown shape. It chimes in the presence of old regalia, perhaps counting the ceremonial crowns the court scattered to hide its ruler from the tide."],
  ["pearl-spider-abyss", "Pearl-eyed spider", new URL("../assets/images/fandom-members/gemwell/abyss-sprites/pearl-spider-abyss.png", import.meta.url).href, "WEAVER // A deep-water spider with pearl lights for eyes and thread that does not sink. Its web traces the outline of a drowned vault, like an archivist rebuilding a hall from the last memory left in the water."],
  ["lantern-fish", "Lantern fish", new URL("../assets/images/fandom-members/gemwell/abyss-sprites/lantern-fish.png", import.meta.url).href, "WATCHER // A narrow black fish with a lantern that shows scenes from long ago. It keeps a respectful distance, as though checking whether a new witness has come to hear the court's story."],
  ["crystal-hands", "Crystal hands", new URL("../assets/images/fandom-members/gemwell/abyss-sprites/crystal-hands.png", import.meta.url).href, "GARDEN // Dozens of clear hands grow upward from the floor, palms empty and open. The pose resembles the mural of the court giving their jewels to the queen, except these hands have been waiting in the dark long after the owners vanished."],
  ["black-serpent", "Black-water serpent", new URL("../assets/images/fandom-members/gemwell/abyss-sprites/black-serpent.png", import.meta.url).href, "GUARDIAN // A long serpent visible only in the ceiling's reflection on the black sea. It circles the empty throne without ever touching it, the last guard assigned to protect a king who chose not to return."],
  ["stone-throne", "Stone throne", new URL("../assets/images/fandom-members/gemwell/abyss-sprites/stone-throne.png", import.meta.url).href, "VACANT // A plain basalt throne softened by centuries of water. Its seat remains warm after the room has been empty for a minute, which makes the court's old claim—that their king was only resting—harder to dismiss."],
  ["drowned-crown", "Drowned crown", new URL("../assets/images/fandom-members/gemwell/abyss-sprites/drowned-crown.png", import.meta.url).href, "ROYAL // A heavy gold crown floating against gravity above the black tide. It points toward the true bottom because it is not a symbol of rule at all; it is the lock the king carried down to keep the tide contained."],
  ["shell-door", "Shell door", new URL("../assets/images/fandom-members/gemwell/abyss-sprites/shell-door.png", import.meta.url).href, "PASSAGE // A huge shell-shaped door with a wet spiral seam. Beyond it lies a lightless corridor and the sound of footsteps below: the last intact passage between the drowned court and its treasure vault."],
  ["pale-helmet", "Pale knight helmet", new URL("../assets/images/fandom-members/gemwell/abyss-sprites/pale-helmet.png", import.meta.url).href, "HONOR GUARD // A white guard's helmet that slowly turns its visor toward the empty throne. The knight is gone, but its posture says the guard was ordered to wait until the king's watch ended."],
  ["rune-anchor", "Rune anchor", new URL("../assets/images/fandom-members/gemwell/abyss-sprites/rune-anchor.png", import.meta.url).href, "RELIC // An iron anchor carved with the same curled rune found on the depth markers. It keeps the black sea from rising into earlier levels, one of several bindings the court made after the king sealed himself beneath it."],
  ["whale-skull", "Glass whale skull", new URL("../assets/images/fandom-members/gemwell/abyss-sprites/whale-skull.png", import.meta.url).href, "FOSSIL // A translucent whale skull too large to fit through the room where it appears. Its teeth hum the completed four-note signal, implying the black tide may once have been an ocean with creatures older than the Lusterkin."],
  ["star-moth", "Star moth", new URL("../assets/images/fandom-members/gemwell/abyss-sprites/star-moth.png", import.meta.url).href, "MESSENGER // A bright moth with a star burning in each wing. It follows broken royal sigils toward the sealed vault, carrying a trail of light through passages the court tried to forget."],
  ["sleeping-monarch", "Sleeping stone monarch", new URL("../assets/images/fandom-members/gemwell/abyss-sprites/sleeping-monarch.png", import.meta.url).href, "FINAL WITNESS // Not a statue: the stone monarch blinks when no one is watching. Its face matches the crown mural, confirming the king remained awake beneath the court's last history, waiting for someone to understand why he stayed."],
  ["bottomless-marker", "Bottomless well marker", new URL("../assets/images/fandom-members/gemwell/abyss-sprites/bottomless-marker.png", import.meta.url).href, "WAYSTONE // A final marker planted where every survey ends. Its rune reads THE KING WAS NEVER LOST: the kingdom misplaced the story, while the cave kept it."]
] as const;

const GEMWELL_BOTTOM_SPRITES = [
  ["aurora-geode", "Aurora geode", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/aurora-geode.png", import.meta.url).href, "TREASURE // A geode whose hollow center contains a moving northern sky. One drifting green light traces a route back to the Mouth, a map the king may have kept so he could remember the world he chose to leave."],
  ["star-sword", "Star-forged sword", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/star-sword.png", import.meta.url).href, "RELIC // A narrow sword with starlight caught in its edge, embedded in black stone. It cannot be removed until the black tide is sealed, implying it was placed here as a final ward rather than a weapon of conquest."],
  ["crown-mask", "Gold crown mask", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/crown-mask.png", import.meta.url).href, "ROYAL // A gold ceremonial mask shaped like a crown around an empty face. In its polished gold, Dot sees the king, then a figure wearing the queen's gloves, then only the torchlight behind her."],
  ["crystal-atlas", "Levitating crystal atlas", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/crystal-atlas.png", import.meta.url).href, "MAP // A floating crystal map with every known depth visible at once. The true bottom is marked HOME, suggesting the sealed king did not regard the surface as his kingdom after the tide began."],
  ["phoenix-amber", "Phoenix in amber", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/phoenix-amber.png", import.meta.url).href, "LIVING // A tiny phoenix suspended in honey-colored amber. Each wingbeat warms the vault for a single breath, a surviving spark from the court's old fire ceremonies."],
  ["crystal-knight", "Crystal chess knight", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/crystal-knight.png", import.meta.url).href, "GUARDIAN // A chess knight carved from crystal and placed at the foot of the throne. It moves in an L-shape toward whatever threatens the seat, the court's smallest remaining honor guard."],
  ["moon-jar", "Sealed moon jar", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/moon-jar.png", import.meta.url).href, "LIGHT // A sealed jar carrying the first moonlight the Lusterkin brought below. It never dims, and its reflection exposes the submerged murals the black tide tried to erase."],
  ["dragon-egg", "Glowing dragon egg", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/dragon-egg.png", import.meta.url).href, "UNHATCHED // A warm dragon egg patterned with faint crown runes. It hums along with the fourth note of the final chord, perhaps because the court bred lantern dragons to answer the king's signal."],
  ["rune-harp", "Rune harp", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/rune-harp.png", import.meta.url).href, "MUSIC // A silver harp with strings made from blue cave light. It plays itself when the king stands, completing the same royal melody hinted at by pebbles, skulls, and the drowned court's bells."],
  ["celestial-watch", "Celestial pocket watch", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/celestial-watch.png", import.meta.url).href, "TIME // A pocket watch whose hands reach 999 and continue downward instead of resetting. The queen apparently used clocks like this to prove the king's vigil outlasted the surface calendar."],
  ["blueflame-goblet", "Blueflame goblet", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/blueflame-goblet.png", import.meta.url).href, "TREASURE // A ceremonial goblet holding blue flame that burns cold. In its light the black water shows its true shape: not water, but a living shadow pressed against the royal seals."],
  ["coral-dragon", "Coral dragon", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/coral-dragon.png", import.meta.url).href, "BONES // The coral-coated skeleton of a dragon smaller than a horse and older than the cave. The king's tapestry shows these dragons pulling the first anchors into place before the sea went black."],
  ["living-tapestry", "Living tapestry", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/living-tapestry.png", import.meta.url).href, "HISTORY // A wall tapestry that moves one thread at a time. It replays the king descending with the crown while the queen and court lift anchors behind him, proving the sealing was a planned sacrifice rather than a betrayal."],
  ["mirror-shield", "Black reflection shield", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/mirror-shield.png", import.meta.url).href, "DEFENSE // A polished shield that reflects the cave before the black tide arrived: lit halls, children following beetles, and a throne room still above water. The vision is beautiful enough to explain why the survivors kept trying to preserve it."],
  ["lantern-tree", "Jeweled lantern tree", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/lantern-tree.png", import.meta.url).href, "GARDEN // A small jewel tree bearing glowing fruit like lanterns. Each fruit holds a remembered chamber, likely grown by the queen so the lost kingdom could survive as a garden of places."],
  ["cave-leviathan", "Tiny cave leviathan", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/cave-leviathan.png", import.meta.url).href, "COMPANION // A hand-sized leviathan asleep in the treasure pile, dreaming in map symbols. It may be a harmless young version of the thing beneath the tide—or the court's gentle attempt to teach the player that monsters can be guardians too."],
  ["stone-queen", "Crownless stone queen", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/stone-queen.png", import.meta.url).href, "WITNESS // A stone portrait of the queen with both hands held open. She gave the crown to the king so he could lock the tide below, then stayed behind to preserve the archive and leave a route for whoever came after."],
  ["prism-keyring", "Prism-key ring", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/prism-keyring.png", import.meta.url).href, "KEYS // A ring of prism keys, each catching a different color of the old royal light. One fits the ascent gate; the others were made for sealed halls no living map remembers."],
  ["lidless-chest", "Lidless treasure chest", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/lidless-chest.png", import.meta.url).href, "LOOT // An open chest containing small versions of treasures found along the descent, brighter and intact. It is the court's strange inheritance: proof every discovery belonged to one buried story."],
  ["gem-eyes-book", "Gem-eyed spellbook", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/gem-eyes-book.png", import.meta.url).href, "FINAL NOTE // A heavy book with two gem eyes that follow whoever reads it. Its last page reads THANK YOU FOR KEEPING WATCH, as if the cave had waited for a new keeper who could climb back into daylight."],
  ["emerald-idol", "Emerald idol", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/emerald-idol.png", import.meta.url).href, "TROVE // A palm-sized idol of the first Lusterkin surveyor, carved before the kingdom had a crown. Its emerald needle points upward toward the Mouth, even when every passage seems to turn. Dot thinks the king carried it on his first descent and left it here so someone would remember there was once a way home."],
  ["wyvern-skull", "Tiny wyvern skull", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/wyvern-skull.png", import.meta.url).href, "TROVE // The skull of a lantern wyvern, a cave messenger bred to fly passages too narrow for miners. Its empty eyes flare near forgotten routes. One cracked jawbone bears the royal courier mark, suggesting the sealed king's last message may have traveled on its back."],
  ["pearl-golem", "Pearl golem", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/pearl-golem.png", import.meta.url).href, "TROVE // A thumb-high pearl golem gathers loose gems and broken keys into careful little piles. It keeps sorting until every treasure rests where the court believed it belonged. A stone tag beneath its arm reads PROPERTY OF THE QUEEN'S QUIET ARCHIVE."],
  ["starlight-hourglass", "Starlight hourglass", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/starlight-hourglass.png", import.meta.url).href, "TROVE // The glass contains pinpricks of cold starlight instead of sand. They rise whenever the ascent rope is touched, then pause at the thousandth step. The court used such clocks to measure how long the black tide could be held below; this one stopped the night the king chose to stay."],
  ["emergency-rope", "Emergency rope", new URL("../assets/images/fandom-members/gemwell/bottom-sprites/emergency-rope.png", import.meta.url).href, "TROVE // A fresh, impossible coil of rope rests beneath every old exit marker in the final room. The fibers are woven with the same crown rune found along the thousandth step, but its knot is tied in the queen's archive pattern. It is less an escape tool than a promise: somebody in the lost court expected a later explorer to reach the bottom, learn the story, and climb back out." ]
] as const;

const ATLAS_MAP = new URL("../assets/images/fandom-members/atlas/unfinished-atlas-map.png", import.meta.url).href;
const ATLAS_PLACES = [
  ["glass-orchard", "The Glass Orchard", "7¼ east, at dusk", "Fruit rings when the wind is honest. / Pick none; carry the sound instead.", new URL("../assets/images/fandom-members/atlas/places/glass-orchard.png", import.meta.url).href, 15, 16],
  ["sleeping-rail", "The Sleeping Rail", "two stops past yesterday", "The engine dreams beside the track. / Tickets are punched with tiny moons.", new URL("../assets/images/fandom-members/atlas/places/sleeping-rail.png", import.meta.url).href, 39, 17],
  ["whale-library", "The Whale Library", "shelf-current 3", "Inside the whale, each book is damp. / The quietest volume knows your name.", new URL("../assets/images/fandom-members/atlas/places/whale-library.png", import.meta.url).href, 62, 17],
  ["paper-volcano", "The Paper Volcano", "fold line 88", "It erupts in birds, never ash. / Unfold one and the mountain grows cold.", new URL("../assets/images/fandom-members/atlas/places/paper-volcano.png", import.meta.url).href, 84, 22],
  ["rain-house", "The Rain House", "beneath one small cloud", "Every room has its own weather. / The attic rains upward on Thursdays.", new URL("../assets/images/fandom-members/atlas/places/rain-house.png", import.meta.url).href, 16, 43],
  ["northless-tower", "Northless Tower", "where every arrow disagrees", "Climb until direction gives up. / The top window faces wherever you miss.", new URL("../assets/images/fandom-members/atlas/places/northless-tower.png", import.meta.url).href, 44, 43],
  ["pocket-sea", "The Pocket Sea", "one coat-lining deep", "A thimble ship crosses all afternoon. / By evening it has traveled an inch.", new URL("../assets/images/fandom-members/atlas/places/pocket-sea.png", import.meta.url).href, 67, 45],
  ["door-at-noon", "The Door at Noon", "shadow zero", "It opens only while casting no shadow. / Behind it: another handle, warm from a hand.", new URL("../assets/images/fandom-members/atlas/places/door-at-noon.png", import.meta.url).href, 88, 48],
  ["moth-ferry", "The Moth Ferry", "lampwater crossing", "Pay the moths in candle smoke. / They will not take you where you point.", new URL("../assets/images/fandom-members/atlas/places/moth-ferry.png", import.meta.url).href, 26, 70],
  ["bell-marsh", "Bell Marsh", "low tide, high chime", "The bells ring under still water. / Step only where the echo does not.", new URL("../assets/images/fandom-members/atlas/places/bell-marsh.png", import.meta.url).href, 48, 72],
  ["borrowed-moon", "The Borrowed Moon", "return before morning", "Seven ropes keep it from remembering sky. / One knot is tied by nobody.", new URL("../assets/images/fandom-members/atlas/places/borrowed-moon.png", import.meta.url).href, 70, 74],
  ["last-blank", "The Last Blank", "coordinates withheld", "Here the ink turns around. / Someone has penciled a road beyond the page.", new URL("../assets/images/fandom-members/atlas/places/last-blank.png", import.meta.url).href, 91, 76]
] as const;

const seed = (
  id: string,
  pageUrl: string,
  ownerId: string,
  role: PageComment["role"],
  author: string,
  text: string,
  createdAt: string
): PageComment => ({ id, pageUrl, ownerId, role, author, text, createdAt, revealAfterVisit: 0 });

export const fandomMembers = [
  {
    url: MOSS_URL,
    handle: "MossMunch_Mel",
    title: "Mel's Moonlit MossMunch Archive",
    description: "Twenty-six boggy episodes, disputed VHS order, character lore, handmade fan art, and one very serious root-tunnel novella.",
    fandom: "MOSSMUNCH & THE MOONLINGS",
    className: "moss"
  },
  {
    url: BLIPZO_URL,
    handle: "BlipzoBeliever_88",
    title: "BLIPZO // Mall Dimension Zero",
    description: "Cult platformer screenshots, Store 00 maps, low-poly mascot science, fan fiction, and evidence that the food court hides a second game.",
    fandom: "BLIPZO! MALL DIMENSION",
    className: "blipzo"
  },
  {
    url: STAR_URL,
    handle: "TapeAttic_Tess",
    title: "Tess's StarThimble Tape Attic",
    description: "A drawer-by-drawer archive of impossible weather, regional broadcasts, handmade puppets, lost episodes, fan fiction, and one unlabeled cassette.",
    fandom: "PROFESSOR STARTHIMBLE'S WEATHER CABINET",
    className: "starthimble"
  },
  {
    url: PRISM_URL,
    handle: "PrismPilot_Aya",
    title: "PRISM//5 Chroma Knights: Refraction",
    description: "Character prisms, transformation frames, imported tapes, bootleg toys, fan art, finale analysis, and the forbidden sixth color.",
    fandom: "PRISM//5: CHROMA KNIGHTS",
    className: "prism5"
  },
  {
    url: GEMWELL_URL,
    handle: "DeepDelver_Dot",
    title: "DeepDelver's Bottomless GEMWELL Descent",
    description: "A six-thousand-pixel expedition through an obscure shareware cavern, complete with luminous specimens, bug sightings, depth rumors, and a bottom that may not exist.",
    fandom: "GEMWELL: DESCENT OF THE LUSTERKIN",
    className: "gemwell"
  },
  {
    url: ATLAS_URL,
    handle: "MapMouse_Mina",
    title: "Mina's Unfinished Atlas of Orra",
    description: "A hand-mapped dream continent with twelve clickable destinations, tiny poems, missing coordinates, and one place the original book never finished.",
    fandom: "THE UNFINISHED ATLAS OF ORRA",
    className: "atlas"
  }
] as const;

const mossComments: PageComment[] = [
  seed("moss-kip-1", MOSS_URL, "mossmunch_mel", "visitor", "Kip_ToonBurst", "We aired The Crooked Rain Barrel once at 6:10 AM. Three calls, all from the same very awake person.", "1999-11-01T11:04:00"),
  seed("moss-owner-1", MOSS_URL, "mossmunch_mel", "owner", "MossMunch_Mel", "THAT WAS ME. Your broadcast also had the missing blue title card. Please check the tape vault!", "1999-11-01T11:12:00"),
  seed("moss-velvet-1", MOSS_URL, "mossmunch_mel", "visitor", "VelvetMage", "The lantern beneath Bog Seven feels like an Ashglass side quest written by somebody much kinder than me.", "1999-11-02T20:21:00"),
  seed("moss-dex-1", MOSS_URL, "mossmunch_mel", "visitor", "CodeDex", "Episode 19 may have two edits. In one capture, Brindlebug's map has a seventh moon symbol for exactly four frames.", "1999-11-02T21:07:00"),
  seed("moss-blipzo-1", MOSS_URL, "mossmunch_mel", "visitor", "BlipzoBeliever_88", "Store 00 has a leaf emblem on the back wall. Not saying crossover. Just saying LOOK.", "1999-11-03T17:46:00"),
  seed("moss-bea-1", MOSS_URL, "mossmunch_mel", "visitor", "BunBrigade_Bea", "The homemade plush is wonderful. Maple attempted to groom the screen.", "1999-11-03T18:32:00"),
  seed("moss-owner-2", MOSS_URL, "mossmunch_mel", "owner", "MossMunch_Mel", "Please thank Maple. The plush took six weeks and one emotionally difficult satchel.", "1999-11-03T18:41:00")
];

const blipzoComments: PageComment[] = [
  seed("blipzo-maddy-1", BLIPZO_URL, "blipzo_believer_88", "visitor", "ModKit_Maddy", "The black doorway has collision on three sides and a loaded texture behind it. That is either a room or extremely committed garbage data.", "1999-11-01T22:11:00"),
  seed("blipzo-owner-1", BLIPZO_URL, "blipzo_believer_88", "owner", "BlipzoBeliever_88", "THANK YOU. Store 00 exists. Nobody spends 18 polygons on garbage data by accident.", "1999-11-01T22:18:00"),
  seed("blipzo-queenie-1", BLIPZO_URL, "blipzo_believer_88", "visitor", "QuarterQueen", "LeaseLord fight is good. Receipt swing is floaty. I cleared it on one credit anyway.", "1999-11-02T16:02:00"),
  seed("blipzo-dex-1", BLIPZO_URL, "blipzo_believer_88", "visitor", "CodeDex", "Magazine demo has a seventh escalator not present in retail. Your graph-paper route may actually connect.", "1999-11-02T20:53:00"),
  seed("blipzo-moss-1", BLIPZO_URL, "blipzo_believer_88", "visitor", "MossMunch_Mel", "Kiosk Kid would be friends with Brindlebug. Both know too much and carry the entire plot.", "1999-11-03T17:27:00"),
  seed("blipzo-four-1", BLIPZO_URL, "blipzo_believer_88", "visitor", "PlayerFourEver", "Food Court Eclipse four-player rumor: false. We tried every controller-port order. Great sleepover though.", "1999-11-03T19:02:00"),
  seed("blipzo-owner-2", BLIPZO_URL, "blipzo_believer_88", "owner", "BlipzoBeliever_88", "Not false. UNCONFIRMED. The manual says 'bring friends after closing.' That punctuation matters.", "1999-11-03T19:09:00")
];

const starComments: PageComment[] = [
  seed("star-kip-1", STAR_URL, "tapeattic_tess", "visitor", "Kip_ToonBurst", "We had three StarThimble tapes in the station cabinet. One was labeled WEATHER SPECIAL - DO NOT AIR. Naturally I watched it.", "1999-11-01T09:14:00"),
  seed("star-owner-1", STAR_URL, "tapeattic_tess", "owner", "TapeAttic_Tess", "KIP. Was the leader blue or yellow? Did the opening clock run backward? This is an emergency.", "1999-11-01T09:28:00"),
  seed("star-mel-1", STAR_URL, "tapeattic_tess", "visitor", "MossMunch_Mel", "Upward snow also appears in MossMunch episode 11, but ours is clearly soap flakes on fishing line. Yours looks like cotton through reverse film.", "1999-11-02T18:06:00"),
  seed("star-dex-1", STAR_URL, "tapeattic_tess", "visitor", "CodeDex", "The unlabeled cassette shell is a 1988 mold. PARTIAL evidence only, but it cannot be an original 1986 recording.", "1999-11-02T20:36:00"),
  seed("star-hal-1", STAR_URL, "tapeattic_tess", "visitor", "HamCam_Hal", "Drawer 14's linkage would jam immediately. I mean that with affection. Wonderful cabinet.", "1999-11-03T14:41:00"),
  seed("star-trent-1", STAR_URL, "tapeattic_tess", "visitor", "BlipzoBeliever_88", "Does the cabinet have a Drawer 00? Please check before saying no.", "1999-11-03T17:52:00"),
  seed("star-aya-1", STAR_URL, "tapeattic_tess", "visitor", "PrismPilot_Aya", "Luma's tiny rain boots are perfect. I would defend that cloud with my life and several imported magazines.", "1999-11-03T19:11:00"),
  seed("star-owner-2", STAR_URL, "tapeattic_tess", "owner", "TapeAttic_Tess", "Drawer 00 is not in the model sheets. There is, however, a gap between 9 and 10. Trent, do not make me draw more string.", "1999-11-03T19:19:00")
];

const prismComments: PageComment[] = [
  seed("prism-mel-1", PRISM_URL, "prismpilot_aya", "visitor", "MossMunch_Mel", "The clear badge in episode 12 reflects six colors, not five. I checked on two televisions and one very confused spoon.", "1999-11-01T19:42:00"),
  seed("prism-owner-1", PRISM_URL, "prismpilot_aya", "owner", "PrismPilot_Aya", "YES. Pause after Gleam says 'a rainbow remembers what light forgets.' The clear outline is deliberate.", "1999-11-01T19:51:00"),
  seed("prism-velvet-1", PRISM_URL, "prismpilot_aya", "visitor", "VelvetMage", "Violet Knight refusing the final attack is more interesting than the attack itself. Your watercolor understands this.", "1999-11-02T21:18:00"),
  seed("prism-maddy-1", PRISM_URL, "prismpilot_aya", "visitor", "ModKit_Maddy", "Transformation charts confirm Rose gets eight frames while Azure gets seven. Either budget or symbolism. Probably both.", "1999-11-02T22:04:00"),
  seed("prism-queenie-1", PRISM_URL, "prismpilot_aya", "visitor", "QuarterQueen", "Bootleg Citrine has two left hands. This may improve the baton combo.", "1999-11-03T15:33:00"),
  seed("prism-tess-1", PRISM_URL, "prismpilot_aya", "visitor", "TapeAttic_Tess", "My imported episode 6 starts eleven seconds earlier and includes a black frame with a tiny cabinet shape. Copy available if you bring a blank tape.", "1999-11-03T18:47:00"),
  seed("prism-trent-1", PRISM_URL, "prismpilot_aya", "visitor", "BlipzoBeliever_88", "Null Regent's palace and Store 00 use the SAME FLOOR PATTERN. Different dimensions. Same mall contractor.", "1999-11-03T19:24:00"),
  seed("prism-owner-2", PRISM_URL, "prismpilot_aya", "owner", "PrismPilot_Aya", "I cannot endorse the mall-contractor theory. I have added it to the theory page.", "1999-11-03T19:31:00")
];

const gemwellComments: PageComment[] = [
  seed("gemwell-dex-1", GEMWELL_URL, "deepdelver_dot", "visitor", "CodeDex", "My depth counter wraps from 999 to 000. The cavern does not. I left the machine running overnight to confirm.", "1999-11-01T23:08:00"),
  seed("gemwell-owner-1", GEMWELL_URL, "deepdelver_dot", "owner", "DeepDelver_Dot", "CONFIRMED behavior, unconfirmed depth. Please do not call 000 the bottom. It gets excited.", "1999-11-01T23:16:00"),
  seed("gemwell-trent-1", GEMWELL_URL, "deepdelver_dot", "visitor", "BlipzoBeliever_88", "The black prism looks exactly like the crystal behind Store 00. I am being calm about this.", "1999-11-02T20:12:00"),
  seed("gemwell-tess-1", GEMWELL_URL, "deepdelver_dot", "visitor", "TapeAttic_Tess", "The singing pebble's three notes match the Weather Cabinet winding key. Probably a stock sound. Probably.", "1999-11-02T21:04:00"),
  seed("gemwell-aya-1", GEMWELL_URL, "deepdelver_dot", "visitor", "PrismPilot_Aya", "That prism is reflecting eight colors and I only have theories for six.", "1999-11-03T17:49:00"),
  seed("gemwell-maddy-1", GEMWELL_URL, "deepdelver_dot", "visitor", "ModKit_Maddy", "Sprite table contains 25 entries. Collision table contains 26. Geometrically concerning.", "1999-11-03T18:10:00"),
  seed("gemwell-owner-2", GEMWELL_URL, "deepdelver_dot", "owner", "DeepDelver_Dot", "New field rule: if something blinks without a sprite number, scroll past it and do not answer.", "1999-11-03T18:22:00"),
  seed("gemwell-mina-1", GEMWELL_URL, "deepdelver_dot", "visitor", "MapMouse_Mina", "Orra has a hole on its oldest map. Your depth marker uses the same curl. I dislike useful coincidences.", "1999-11-03T19:03:00")
];

const atlasComments: PageComment[] = [
  seed("atlas-tess-1", ATLAS_URL, "mapmouse_mina", "visitor", "TapeAttic_Tess", "The Rain House appeared on a StarThimble set sketch, but the chimney is on the other side.", "1999-11-01T18:28:00"),
  seed("atlas-owner-1", ATLAS_URL, "mapmouse_mina", "owner", "MapMouse_Mina", "Mirrored print, perhaps. Or the house moved during weather. Both are ordinary in Orra.", "1999-11-01T18:39:00"),
  seed("atlas-mel-1", ATLAS_URL, "mapmouse_mina", "visitor", "MossMunch_Mel", "The Glass Orchard fruit looks like the moon berries from episode 6! Different stems, same impossible shine.", "1999-11-02T17:42:00"),
  seed("atlas-velvet-1", ATLAS_URL, "mapmouse_mina", "visitor", "VelvetMage", "A map that admits it is unfinished is more trustworthy than one with a border.", "1999-11-02T20:51:00"),
  seed("atlas-dex-1", ATLAS_URL, "mapmouse_mina", "visitor", "CodeDex", "The first-edition dotted road enters the Last Blank by four millimeters. Later printings erase it.", "1999-11-02T21:17:00"),
  seed("atlas-aya-1", ATLAS_URL, "mapmouse_mina", "visitor", "PrismPilot_Aya", "Borrowed Moon has six tether points in the map and seven in the illustration. Noted loudly.", "1999-11-03T16:44:00"),
  seed("atlas-dot-1", ATLAS_URL, "mapmouse_mina", "visitor", "DeepDelver_Dot", "Northless Tower rune matches a GEMWELL depth marker. This is not proof. This is an unpleasant breadcrumb.", "1999-11-03T18:55:00"),
  seed("atlas-owner-2", ATLAS_URL, "mapmouse_mina", "owner", "MapMouse_Mina", "Route update: the Moth Ferry now departs from whichever shore you are not standing on.", "1999-11-03T19:12:00")
];

const atlasFragmentPages = Object.fromEntries(
  ATLAS_PLACES.map(([slug, title, coordinate, poem, image]) => {
    const url = `web://fanverse.zone/users/mapmousemina/places/${slug}`;
    return [url, {
      url,
      title: `${title} - The Unfinished Atlas of Orra`,
      site: "fanatlas",
      ownerId: "mapmouse_mina",
      summary: `A hidden illustrated atlas fragment for ${title}.`,
      listed: false,
      hubId: "zone-fanverse",
      searchTerms: [title, "Orra", "atlas fragment", coordinate],
      render: () => `
        <main class="page fandom-page atlas-fragment-page atlas-fragment-${slug}">
          <nav><button data-nav="${ATLAS_URL}">← return to Mina's map</button><span>LOOSE LEAF // ${coordinate}</span></nav>
          <article>
            <img src="${image}" alt="An illustrated atlas fragment showing ${title}">
            <div><small>THE UNFINISHED ATLAS OF ORRA</small><h1>${title}</h1><p class="atlas-coordinate">${coordinate}</p><blockquote>${poem.replace(" / ", "<br>")}</blockquote><p class="atlas-pencil">Found between pages 43 and 44. The paper smells faintly of rain.</p></div>
          </article>
          <button class="atlas-back-seal" data-nav="${ATLAS_URL}">BACK TO THE WHOLE MAP</button>
        </main>`
    } satisfies PageDefinition];
  })
) as Record<string, PageDefinition>;

export const fandomPages: Record<string, PageDefinition> = {
  [MOSS_URL]: {
    url: MOSS_URL,
    title: "MossMunch_Mel's Moonlit Archive",
    site: "fanmoss",
    ownerId: "mossmunch_mel",
    summary: "Mel's obsessive fan archive for the obscure 1989 cartoon MossMunch & the Moonlings contains animation cels, episode-order research, VHS scans, handmade fan art, a plush, continuity theories, and original fan fiction.",
    commentsEnabled: true,
    seedComments: mossComments,
    listed: true,
    hubId: "zone-fanverse",
    searchTerms: ["MossMunch Mel", "MossMunch", "Moonlings", "Pipglow", "Brindlebug", "Dry Mayor", "Fogberry Bog", "cartoon", "animation", "VHS", "fan art", "fan fiction", "Lantern Under Bog Seven"],
    render: () => `
      <main class="page fandom-page moss-page">
        <div class="moss-canopy"><button data-nav="${FANVERSE_URL}">← FANVERSE</button><span>best viewed by moonlight</span></div>
        <header>
          ${fanImage("moss-ensemble", "Official animation cel of MossMunch, Pipglow, Brindlebug and the Dry Mayor in Fogberry Bog")}
          <div><small>MOSSMUNCH_MEL'S UNOFFICIAL ARCHIVE</small><h1>MossMunch<br><i>&amp; the Moonlings</i></h1><p>Every episode. Every moon. Every map Brindlebug folded wrong.</p></div>
        </header>
        <section class="moss-welcome moss-leaf">
          ${fanImage("moss-mel", "A 1999 flash photograph of Mel wearing a homemade Pipglow antenna cap beside her CRT")}
          <div><h2>WELCOME TO FOGBERRY BOG!</h2><p>I'm Mel. I have loved this strange little 1989 cartoon since a rain-delay broadcast ate the first six minutes of episode four. There are twenty-six episodes, unless the rumored moon festival special is real, in which case there are twenty-seven and I owe CodeDex five dollars.</p><p><b>LAST UPDATE:</b> new Store 00 leaf-emblem theory added against my better judgment.</p></div>
          ${fanImage("moss-plush", "Mel's handmade MossMunch plush photographed on a floral bedspread")}
        </section>
        <section class="moss-episode moss-root">
          <div><small>EPISODE 19 // RESTORED ORDER</small><h2>THE LANTERN BELOW</h2><p>MossMunch and Pipglow enter the root tunnels after every moon-lamp in the bog goes dark. The station guide calls this episode 17. The satchel buckle and Brindlebug's seventh moon prove it comes after <i>Map of No Roads</i>.</p></div>
          ${fanImage("moss-root-tunnel", "MossMunch lighting a dark root tunnel with Pipglow")}
        </section>
        <div class="moss-winding-gallery">
          <article class="moss-polaroid one">${fanImage("moss-lily-crossing", "MossMunch and Pipglow crossing moonlit lily pads")}<b>THE LILY ROAD</b><small>official cel scan</small></article>
          <article class="moss-polaroid two">${fanImage("moss-brindle-map", "Brindlebug unfolding an impossibly long map")}<b>BRINDLEBUG SHRINE</b><small>the real hero</small></article>
          <article class="moss-polaroid three">${fanImage("moss-dry-mayor", "The Dry Mayor standing over a drained pond")}<b>DRY MAYOR FILE</b><small>mean? yes. misunderstood? page pending.</small></article>
          <article class="moss-polaroid four">${fanImage("moss-watercolor", "Mel's watercolor fan art of Fogberry Bog under a giant moon")}<b>MOON OVER FOGBERRY</b><small>watercolor by Mel, 1999</small></article>
        </div>
        <section class="moss-fiction">
          ${fanImage("moss-fiction-cover", "Handmade cover for Mel's fan fiction about a lantern under twisted roots")}
          <div><small>ORIGINAL FAN FICTION // 14 CHAPTERS</small><h2>The Lantern Under Bog Seven</h2><p>Pipglow hears a second moon humming beneath the oldest tree. Brindlebug says it is only groundwater. MossMunch packs sandwiches anyway.</p><p><i>Chapter 14 uploaded! Please read the author's note before asking whether MossMunch and the Dry Mayor are brothers.</i></p></div>
          ${fanImage("moss-fiction-pages", "Stapled typewritten MossMunch fan-fiction pages with doodled margins")}
        </section>
        <aside class="moss-theory">
          ${fanImage("moss-chart", "Mel's obsessive hand-drawn MossMunch episode continuity chart")}
          <div><h2>THE SEVENTH MOON PROBLEM</h2><p>Six moon emblems appear throughout the normal series. A seventh appears for four frames in one Episode 19 transfer and on the back wall of Blipzo's Store 00. This is probably a scanner coincidence. I have drawn fourteen arrows explaining why it is not.</p></div>
          ${fanImage("moss-vhs", "Mel's decorated VHS tape and handwritten episode-label collection")}
        </aside>
        <p class="fandom-owner-note">Sign the bog book below. No Pipglow flame-color arguments after midnight.</p>
      </main>`
  },
  [BLIPZO_URL]: {
    url: BLIPZO_URL,
    title: "BlipzoBeliever_88 - Mall Dimension Zero",
    site: "fanblipzo",
    ownerId: "blipzo_believer_88",
    summary: "Trent's Flash-like shrine to the obscure low-poly mascot platformer BLIPZO! Mall Dimension contains game screenshots, Store 00 maps, character models, hidden-level theories, fan art, clay figures, magazine comparisons, and fan fiction.",
    commentsEnabled: true,
    seedComments: blipzoComments,
    listed: true,
    hubId: "zone-fanverse",
    searchTerms: ["BlipzoBeliever", "Blipzo", "Mall Dimension", "Food Court Eclipse", "Store 00", "Kiosk Kid", "LeaseLord", "mascot platformer", "3D game", "low poly", "fan art", "fan fiction", "hidden level"],
    render: () => `
      <main class="page fandom-page blipzo-page">
        <div class="blipzo-loader"><i></i><b>BLIPZO-FAN NODE LOADED</b><span>99%</span></div>
        <div class="blipzo-stage">
          <header>
            <div><small>BLIPZOBELIEVER_88 // CULT MASCOT ARCHIVE</small><h1>BLIPZO!</h1><p>MALL DIMENSION <b>ZERO</b></p></div>
            ${fanImage("blipzo-hero", "Glossy low-poly promotional render of Blipzo leaping with his receipt-ribbon yo-yo")}
          </header>
          <nav class="blipzo-orbit-nav"><button data-nav="${FANVERSE_URL}">EXIT</button></nav>
          <section class="blipzo-intro">
            ${fanImage("blipzo-trent", "A 1999 flash photograph of Trent holding a homemade Blipzo shopping-basket helmet beside his CRT")}
            <div><h2>WELCOME, AFTER-HOURS SHOPPERS.</h2><p>I'm Trent. BLIPZO! Mall Dimension sold badly, reviewed weirdly, and contains more personality in one escalator than most games have in an entire castle. This archive covers the 1996 original, 1998's <i>Food Court Eclipse</i>, and the hidden Store 00 that absolutely exists.</p></div>
          </section>
          <section class="blipzo-screen-orbit">
            <article class="screen-a">${fanImage("blipzo-foodcourt", "Low-resolution BLIPZO gameplay in a checker-tile food court")}<span>FOOD COURT // LEVEL 1</span></article>
            <article class="screen-b">${fanImage("blipzo-escalator", "Low-resolution BLIPZO gameplay in a huge escalator canyon")}<span>ESCALATOR CANYON</span></article>
            <article class="screen-c">${fanImage("blipzo-boss", "BLIPZO boss battle against LeaseLord at a neon fountain")}<span>LEASELORD BOSS</span></article>
            <div class="blipzo-center-disc"><b>3</b><small>THREE EYES<br>ZERO FEAR</small></div>
          </section>
          <section class="blipzo-zero-file">
            <div class="zero-image">${fanImage("blipzo-zero", "The hidden black doorway to Store 00 in a purple checker-tile mall corridor")}<b>00</b></div>
            <div><small>UNUSED ROOM OR HIDDEN GAME?</small><h2>THE STORE 00 FILE</h2><p>The door appears behind the Atrium C fountain only after a zero-item run. Retail collision blocks the entrance, but the magazine demo contains an extra escalator and Maddy found a loaded texture behind the wall.</p><p><strong>CURRENT STATUS:</strong> real until the developers personally tell me otherwise, and then suspiciously real.</p></div>
            ${fanImage("blipzo-zero-map", "Trent's graph-paper speculative map connecting Store 00 to the mall escalators")}
          </section>
          <section class="blipzo-fanstuff">
            <article class="fan-tilt-left">${fanImage("blipzo-rail-art", "Marker fan art of Blipzo sliding down an escalator rail")}<h2>FAN ART</h2><p>Receipt Rail Disaster, marker on notebook paper.</p></article>
            <article class="fan-tilt-right">${fanImage("blipzo-clay", "Homemade clay Blipzo and cardboard Kiosk Kid figures")}<h2>DESK CREW</h2><p>Clay Blipzo stands up if the desk is perfectly level.</p></article>
            <article class="fan-tilt-left">${fanImage("blipzo-comparison", "Fan-made magazine page comparing two BLIPZO levels")}<h2>VERSION WATCH</h2><p>Demo fountain geometry versus retail. Seven escalators. Seven!</p></article>
          </section>
          <section class="blipzo-fiction">
            ${fanImage("blipzo-fiction-cover", "Handmade fan-fiction cover depicting the abandoned mall after midnight")}
            <div><small>ORIGINAL FICTION // REVISION 3</small><h2>AFTER CLOSING</h2><p>Kiosk Kid wakes at 12:01 AM with no map, no customers, and one receipt printing from Store 00. Blipzo follows it downstairs.</p><p>Includes 22 pages, three illustrations, and a LeaseLord redemption scene that QuarterQueen says is “not mechanically supported.”</p></div>
            ${fanImage("blipzo-fiction-pages", "Typed BLIPZO fan-fiction pages with purple highlights and mascot doodles")}
          </section>
          <footer><span>FLASHPLUG 4 REQUIRED*</span><b>*not actually required because Trent rebuilt this page four times</b></footer>
        </div>
        <p class="fandom-owner-note">Post Store 00 evidence, route times, or respectful Kiosk Kid opinions below.</p>
      </main>`
  },
  [STAR_URL]: {
    url: STAR_URL,
    title: "TapeAttic_Tess - StarThimble Weather Cabinet",
    site: "fanstar",
    ownerId: "tapeattic_tess",
    summary: "Tess's attic-built archive for the obscure puppet show Professor StarThimble's Weather Cabinet includes episode capsules, broadcast variants, practical-effects notes, fan crafts, fiction, a lost upward-snow special, and interactive cabinet drawers.",
    commentsEnabled: true,
    seedComments: starComments,
    listed: true,
    hubId: "zone-fanverse",
    searchTerms: ["TapeAttic Tess", "Professor StarThimble", "Weather Cabinet", "Luma cloud", "Mayor Barometer", "puppet show", "stop motion", "upward snow", "lost episode", "VHS", "fan fiction", "public television"],
    render: () => `
      <main class="page fandom-page starthimble-page">
        <nav class="star-attic-nav"><button data-nav="${FANVERSE_URL}">&larr; DOWNSTAIRS</button><span>TAPEATTIC_TESS PRESENTS</span><b>last dusted 11/03/99</b></nav>
        <header>
          ${fanImage("star-ensemble", "Professor StarThimble, Luma and Mayor Barometer posed as handmade television puppets")}
          <div><small>A DRAWER-BY-DRAWER FAN ARCHIVE</small><h1>Professor StarThimble's</h1><h2>Weather Cabinet</h2><p>Thirty-two drawers. Twenty-four broadcasts. At least one forecast that never happened.</p></div>
        </header>
        <section class="star-welcome">
          <div class="star-tape-stack">${fanImage("star-vhs-shelf", "Tess's shelf of carefully illustrated StarThimble VHS recordings")}<i>24 TAPES<br>19 COMPLETE</i></div>
          <div><h2>Come up to the attic.</h2><p>I'm Tess. My local station ran this little puppet program whenever baseball got rained out, which is funny because Professor StarThimble kept most of the rain in Drawer 8. I collect regional edits, reconstruct missing scenes, build questionable props, and write stories about the parts the show forgot to explain.</p><p><strong>Start with the cabinet below.</strong> Its drawers actually open. Web magic!</p></div>
          ${fanImage("star-tess", "A 1999 flash photograph of Tess beside an attic CRT and VCR showing StarThimble")}
        </section>
        <section class="star-cabinet-lab">
          <div class="star-cabinet-title"><span>CLICK A BRASS LABEL</span><h2>THE WEATHER CABINET</h2><p>Reconstructed from 183 screenshots, one publicity photo, and Hal telling me the hinges make no sense.</p></div>
          <div class="star-cabinet-object">
            ${fanImage("star-cabinet", "Professor StarThimble opening the glowing miniature Weather Cabinet")}
            <button class="drawer-button drawer-three" data-fandom-toggle="star-drawer-three" aria-expanded="false"><b>03</b><span>UPWARD SNOW</span></button>
            <button class="drawer-button drawer-eight" data-fandom-toggle="star-drawer-eight" aria-expanded="false"><b>08</b><span>INDOOR RAIN</span></button>
            <button class="drawer-button drawer-fourteen" data-fandom-toggle="star-drawer-fourteen" aria-expanded="false"><b>14</b><span>BOTTLED THUNDER</span></button>
          </div>
          <div class="star-drawers">
            <article id="star-drawer-three">
              ${fanImage("star-upward-snow", "Professor StarThimble watching snow fall upward in the lost weather special")}
              <div><small>DRAWER 03 // TAPE VARIANT B</small><h3>The Snow That Fell Upward</h3><p>Most broadcasts end when the snow reaches the observatory roof. Tess's WPLM tape continues for eleven seconds: StarThimble looks directly at the camera and says, “Weather remembers which way home is.”</p></div>
            </article>
            <article id="star-drawer-eight">
              ${fanImage("star-luma-rain", "Luma the wool cloud puppet making rain inside StarThimble's observatory")}
              <div><small>DRAWER 08 // LUMA FILE</small><h3>Rain With No Outside</h3><p>Luma winds her own key for the only time in the series. The rain falls beneath every object except the empty chair by the telescope.</p></div>
            </article>
            <article id="star-drawer-fourteen">
              ${fanImage("star-bottle-storm", "A practical-effects thunderstorm sealed inside a glass bottle")}
              <div><small>DRAWER 14 // PROP NOTES</small><h3>Thunder, bottled locally</h3><p>The lightning is scratched onto three rotating acetate cylinders. The cloud appears to be dyed cotton, although Tess's replica keeps turning purple.</p></div>
            </article>
          </div>
        </section>
        <section class="star-episode-reel">
          <header><small>SELECTED EPISODE CAPSULES</small><h2>Weather Log, 1986–1988</h2><p>Broadcast order is not story order. The moon-clock proves it.</p></header>
          <article class="reel-left">${fanImage("star-mayor", "Mayor Barometer towering over the show's miniature town")}<div><b>04</b><h3>The Mayor Measures a Breeze</h3><p>Mayor Barometer taxes the west wind. It relocates to the east side of town out of spite.</p><small>KNOWN TAPES: 5</small></div></article>
          <article class="reel-right">${fanImage("star-observatory", "The miniature hilltop observatory used in Professor StarThimble")}<div><b>11</b><h3>A Forecast for Yesterday</h3><p>The observatory receives a weather report one day late and must return the unused sunshine.</p><small>KNOWN TAPES: 2</small></div></article>
          <article class="reel-left">${fanImage("star-vhs-art", "Hand-painted period artwork of the StarThimble puppets and cabinet")}<div><b>??</b><h3>The Clock Behind the Cabinet</h3><p>Listed in one station ledger. No confirmed recording. Possibly an alternate title for episode 17—or the missing special.</p><small>STATUS: WEATHER WATCH</small></div></article>
        </section>
        <section class="star-prop-table">
          <div class="star-pinned">${fanImage("star-corkboard", "Tess's corkboard of episode notes connected by colored string")}<span>THE BROADCAST ORDER PROBLEM</span></div>
          <div class="star-prop-copy"><h2>Tess's Practical Weather Lab</h2><p>No computer effects were used in the original show, unless you count the station manager pressing the wrong button. I am rebuilding the cabinet from cereal boxes, brass paper fasteners, and optimism.</p>${fanImage("star-diagram", "A detailed hand-drawn fan diagram of the Weather Cabinet's drawers and mechanisms")}</div>
          <div class="star-windup" id="star-windup">
            ${fanImage("star-luma-plush", "Tess's handmade wind-up Luma cloud plush")}
            <button data-fandom-animate="star-windup">WIND LUMA'S KEY</button>
            <span class="star-puff">pffft!</span>
          </div>
        </section>
        <section class="star-fiction">
          ${fanImage("star-fiction-cover", "Tess's colored-pencil StarThimble fanfiction cover")}
          <div><small>FAN NOVEL // 17,804 WORDS // COMPLETE</small><h2>The Forecast at the End of the Hall</h2><p>After the Cabinet predicts a perfectly ordinary Tuesday, StarThimble becomes suspicious. Luma finds a tiny door behind Drawer 9. Mayor Barometer brings an umbrella but refuses to explain why.</p><blockquote>“There is no bad weather,” said the Professor. “Only weather that has forgotten its manners.”</blockquote></div>
          ${fanImage("star-fiction-pages", "Typed StarThimble fanfiction pages covered in small puppet doodles")}
        </section>
        <section class="star-mystery-tape" id="star-mystery-tape">
          <div>${fanImage("star-key-tape", "A brass wind-up key and mysterious unlabeled cassette on plaid fabric")}<button data-fandom-animate="star-mystery-tape">TURN THE KEY &amp; PLAY SIDE B</button></div>
          <div><small>FOUND IN A CHURCH SALE BOX // OCTOBER 1999</small><h2>The unlabeled tape</h2><p>Thirty-eight seconds of room tone, a cabinet latch, and someone quietly counting backward from ten. The tape shell is newer than the show. The voice may be Tess's VCR motor.</p><p class="star-tape-secret">After the key turns, a second voice whispers: “Not every drawer belongs to the cabinet.”</p></div>
        </section>
        <aside class="star-zine-strip">${fanImage("star-zine", "A photocopied Professor StarThimble fan-club zine")}<p><b>THE WEATHER DRAWER #3</b><br>Six photocopied pages! Prop patterns! Tape-trading rules! Do not send original recordings through the mail!</p>${fanImage("star-workshop", "The practical puppet workshop with StarThimble, Luma and Mayor Barometer models")}</aside>
        <p class="fandom-owner-note">Leave a forecast, tape lead, or puppet question in the attic ledger below.</p>
      </main>`
  },
  [PRISM_URL]: {
    url: PRISM_URL,
    title: "PrismPilot_Aya - PRISM//5 Refraction",
    site: "fanprism",
    ownerId: "prismpilot_aya",
    summary: "Aya's kinetic shrine for the obscure 1994 transformation cartoon PRISM//5: Chroma Knights includes a five-character selector, frame-by-frame transformation analysis, episode shards, fan art, bootleg toys, imported tapes, fiction, and an interactive sixth-crystal theory.",
    commentsEnabled: true,
    seedComments: prismComments,
    listed: true,
    hubId: "zone-fanverse",
    searchTerms: ["PrismPilot Aya", "PRISM 5", "Chroma Knights", "Rose Knight", "Azure Knight", "Citrine Knight", "Viridian Knight", "Violet Knight", "Gleam", "Null Regent", "transformation cartoon", "anime", "sixth crystal", "fan fiction"],
    render: () => `
      <main class="page fandom-page prism5-page">
        <div class="prism-scanline"></div>
        <nav class="prism-top-nav"><button data-nav="${FANVERSE_URL}">FANVERSE // ESC</button><span>REFRACTION NODE 05</span><b>56K COLOR MODE</b></nav>
        <header>
          <div class="prism-title"><small>PRISMPILOT_AYA'S CHARACTER SHRINE + TAPE INDEX</small><h1>PRISM<span>//5</span></h1><h2>CHROMA KNIGHTS</h2><p>Five colors entered the mirror. Six came back.</p></div>
          ${fanImage("prism-group", "The five color-coded Chroma Knights posed beneath beams of colored light")}
        </header>
        <section class="prism-welcome">
          ${fanImage("prism-aya", "A 1999 flash photograph of Aya beside a CRT decorated with Chroma Knights prism stickers")}
          <div><h2>Initialize refraction!</h2><p>I'm Aya. PRISM//5 ran for twelve episodes, arrived here on four badly subtitled tapes, and somehow has more transformation lore than shows with ten times the budget. I archive every cel wobble, badge reflection, imported magazine scan, and deeply suspicious clear crystal.</p><p><strong>Click the five shards below.</strong> This character selector took me all weekend.</p></div>
          ${fanImage("prism-civilians", "The five civilian Chroma Knights teenagers posing with Gleam the prism-tailed ferret")}
        </section>
        <section class="prism-selector">
          <div class="prism-shard-buttons">
            <button class="rose active" data-fandom-tab="rose" data-fandom-target="prism-dossiers"><i></i>ROSE</button>
            <button class="azure" data-fandom-tab="azure" data-fandom-target="prism-dossiers"><i></i>AZURE</button>
            <button class="citrine" data-fandom-tab="citrine" data-fandom-target="prism-dossiers"><i></i>CITRINE</button>
            <button class="viridian" data-fandom-tab="viridian" data-fandom-target="prism-dossiers"><i></i>VIRIDIAN</button>
            <button class="violet" data-fandom-tab="violet" data-fandom-target="prism-dossiers"><i></i>VIOLET</button>
          </div>
          <div class="prism-dossiers" id="prism-dossiers" data-active="rose">
            <article data-fandom-panel="rose">${fanImage("prism-rose", "Rose Knight transforming through a storm of magenta crystal ribbons")}<div><small>REFRACTION 01 // HEART VECTOR</small><h2>Rose Knight</h2><p>Rin turns emotion into momentum. Her ribbon blade becomes longer when she admits what she is actually feeling, which happens approximately twice.</p><b>TRANSFORMATION: 8 FRAMES</b></div></article>
            <article data-fandom-panel="azure">${fanImage("prism-azure", "Azure Knight transforming through cyan crystal arcs")}<div><small>REFRACTION 02 // STILL WATER</small><h2>Azure Knight</h2><p>Sora's shield stores one attack and returns it as light. The dub calls this “mirror bounce,” which nobody has forgiven.</p><b>TRANSFORMATION: 7 FRAMES</b></div></article>
            <article data-fandom-panel="citrine">${fanImage("prism-citrine-violet", "Citrine and Violet Knights combining yellow batons and a crescent staff")}<div><small>REFRACTION 03 // TWIN SPARK</small><h2>Citrine Knight</h2><p>Jun is the only Knight who reads the mission brief. His light batons make a tuning-fork tone hidden under the soundtrack.</p><b>FAVORITE EPISODE: 07</b></div></article>
            <article data-fandom-panel="viridian">${fanImage("prism-viridian", "Viridian Knight flying through a formation of mirror drones")}<div><small>REFRACTION 04 // OPEN SKY</small><h2>Viridian Knight</h2><p>Midori's mechanical crystal wings appear one episode before she learns to fly. Either foreshadowing or the cels were aired out of order.</p><b>WING PANELS: 12</b></div></article>
            <article data-fandom-panel="violet">${fanImage("prism-violet-art", "Aya's watercolor fan portrait of Violet Knight and Gleam")}<div><small>REFRACTION 05 // QUIET ORBIT</small><h2>Violet Knight</h2><p>Rei can hear cracks forming in mirrors. She refuses the final team attack and saves everyone by lowering her staff instead.</p><b>AYA'S FAVORITE. OBJECTIVITY SUSPENDED.</b></div></article>
          </div>
        </section>
        <section class="prism-frame-lab">
          <div>${fanImage("prism-chart", "Aya's obsessive frame-by-frame chart of all five Chroma Knight transformations")}</div>
          <div>
            <small>FRAME-BY-FRAME LAB // CLICK TO SCRUB</small><h2>Transformation Sequence 05</h2>
            <div class="prism-frame-buttons">
              <button class="active" data-fandom-tab="one" data-fandom-target="prism-frame-notes">01</button>
              <button data-fandom-tab="two" data-fandom-target="prism-frame-notes">02</button>
              <button data-fandom-tab="three" data-fandom-target="prism-frame-notes">03</button>
              <button data-fandom-tab="four" data-fandom-target="prism-frame-notes">04</button>
              <button data-fandom-tab="five" data-fandom-target="prism-frame-notes">05</button>
            </div>
            <div class="prism-frame-notes" id="prism-frame-notes" data-active="one">
              <p data-fandom-panel="one"><b>01:</b> Civilian outline. Badge is already reflecting six points.</p>
              <p data-fandom-panel="two"><b>02:</b> Armor silhouette enters one frame early on the left shoulder.</p>
              <p data-fandom-panel="three"><b>03:</b> Gleam's tail becomes transparent before the background changes.</p>
              <p data-fandom-panel="four"><b>04:</b> Hidden clear outline appears between Violet and Rose.</p>
              <p data-fandom-panel="five"><b>05:</b> Final pose. The soundtrack contains six bell strikes.</p>
            </div>
          </div>
        </section>
        <section class="prism-episode-shards">
          <header><h2>TWELVE EPISODES // TWELVE FRACTURES</h2><p>Aya's compact guide to the frames that matter.</p></header>
          <article><b>01</b><h3>Five Lights at Dusk</h3><p>Gleam chooses five heroes and looks past the camera before naming the last one.</p></article>
          <article><b>03</b><h3>Blue Refuses Blue</h3><p>Azure's shield reflects an attack that has not happened yet.</p></article>
          <article><b>06</b><h3>The Palace Has No Back</h3><p>Null Regent removes a mirror and reveals another copy of the same room.</p></article>
          <article><b>07</b><h3>Two Batons, One Note</h3><p>Citrine finds a sixth tone beneath the team's transformation chord.</p></article>
          <article><b>09</b><h3>Wings Before Flight</h3><p>Viridian remembers a battle nobody else experienced.</p></article>
          <article><b>12</b><h3>Colorless Morning</h3><p>The rainbow shatters. A clear badge lands outside the frame.</p></article>
        </section>
        <section class="prism-null-file">
          ${fanImage("prism-null", "Null Regent standing in a palace of fractured black mirrors")}
          <div><small>VILLAIN FILE // TRANSLATION DISPUTE</small><h2>Null Regent</h2><p>Not “King Nothing.” Not “Lord Blank.” The title card uses a word closer to <i>the person temporarily keeping a place empty.</i> That makes the finale considerably stranger.</p></div>
          ${fanImage("prism-finale", "The five Chroma Knights facing a shattered rainbow void in the final episode")}
        </section>
        <section class="prism-fan-gallery">
          <article>${fanImage("prism-pencil", "Colored-pencil fan art of the five Chroma Knights and Gleam")}<h3>AYA'S TEAM PORTRAIT</h3><p>Colored pencil, gel pen, three evenings.</p></article>
          <article>${fanImage("prism-bootlegs", "A flea-market package of inaccurate Chroma Knights action figures")}<h3>BOOTLEG HALL OF LIGHT</h3><p>Citrine has two left hands. Violet is labeled Blue Wizard.</p></article>
          <article>${fanImage("prism-tapes", "Aya's Chroma Knights imported VHS tapes, magazine clippings and fan collection")}<h3>TAPE MATRIX</h3><p>Four imports, two fan copies, one convention dub.</p></article>
          <article id="prism-badge-spin">${fanImage("prism-handmade-badges", "Handmade translucent Chroma Knight crystal badges on holographic fabric")}<h3>HOMEMADE REFRACTORS</h3><button data-fandom-animate="prism-badge-spin">CHARGE BADGES</button></article>
        </section>
        <section class="prism-sixth-file">
          <button class="prism-sixth-door" data-fandom-toggle="prism-sixth-reveal" aria-expanded="false"><i></i><b>UNLISTED COLOR</b><span>click the clear shard</span></button>
          <div id="prism-sixth-reveal">
            ${fanImage("prism-sixth", "Aya's fan illustration of a mysterious clear sixth crystal surrounded by the Chroma Knights")}
            <div><small>THEORY FILE 6/5 // SPOILERS</small><h2>The color between colors</h2><p>The final clear badge does not belong to a sixth Knight. Aya thinks it belongs to the viewer—the only person who remembers every timeline reflected by Null Regent's mirrors.</p><p>Tess's early episode 6 tape contains a cabinet-shaped silhouette during the clear frame. Coincidence rating: 72%.</p></div>
          </div>
        </section>
        <section class="prism-fiction">
          ${fanImage("prism-badges", "The five official translucent Chroma Knight crystal badges")}
          <div><small>FAN FICTION // 9 CHAPTERS // CONTINUING</small><h2>Clear Is Not a Color</h2><p>One year after the mirror palace closes, Gleam brings Rei a badge that reflects everybody except her. The team reunites at an abandoned planetarium to decide whether some doors should remain colorless.</p><blockquote>“A mirror is only honest about what stands in front of it.”</blockquote></div>
          ${fanImage("prism-fiction-pages", "Typed PRISM//5 fanfiction pages with pencil drawings of Gleam and Null Regent")}
        </section>
        <p class="fandom-owner-note">Submit transformation timing, tape variants, fan works, or sixth-color theories below.</p>
      </main>`
  },
  [GEMWELL_URL]: {
    url: GEMWELL_URL,
    title: "DeepDelver_Dot - GEMWELL Descent",
    site: "fangemwell",
    ownerId: "deepdelver_dot",
    summary: "DeepDelver's extraordinarily long, progressively darker field guide to the obscure 1993 shareware cavern game GEMWELL: Descent of the Lusterkin, including 25 clickable low-resolution specimens and rumors of a bottomless depth counter.",
    commentsEnabled: true,
    seedComments: gemwellComments,
    listed: true,
    hubId: "zone-fanverse",
    searchTerms: ["DeepDelver Dot", "GEMWELL", "Lusterkin", "cavern", "cave creatures", "gem sprites", "shareware", "bottomless pit"],
    render: (state) => {
      const strata = [
        ["THE MOUTH", "000–080m", "I came down looking for the Lusterkin lower road, the route every guide dismisses after the nine-hundred-ninety-ninth mark. The first tunnels were almost welcoming: warm stone, dripping roots, and a faint red glow waiting below the survey marks.", "I put a sapphire beside my sketchbook. Its point has aimed at the same wet square for twenty minutes.", GEMWELL_SPRITES.slice(0, 5)],
        ["GLASS ROOTS", "081–240m", "The easy slope ended in translucent roots that divide and rejoin behind me. I have scratched three separate trails into my map already. Something in the walls rings whenever I choose the deeper fork.", "The crown chimed when I redrew my route map. Not when I picked it up. When I redrew it.", GEMWELL_SPRITES.slice(5, 10)],
        ["THE CRAWLING VEIN", "241–500m", "The passage narrowed into a living vein of stone. I crawled until the sound of my breathing resembled the low ringing ahead. Small cave things moved aside without fear, as if they had been expecting a visitor.", "I am trying not to call anything alive until it does something I cannot explain twice.", GEMWELL_SPRITES.slice(10, 15)],
        ["PEARL DARK", "501–900m", "The air changed here: thin, pearly, and cold enough to sting my teeth. I kept seeing a ladder in the corner of my vision, always just behind me. The way back has begun to feel more imaginary than the way down.", "There is no ladder behind me. I checked before I wrote that down.", GEMWELL_SPRITES.slice(15, 20)],
        ["THE COUNTER'S END", "901–???m", "Every old survey ends here, but the shaft continues beneath the final waystone. The marks on the rock are no longer miner marks; they are curls and crowns leading downward like a procession.", "The marker resembles a sign from the oldest Orra map. I am not saying they are connected. I am circling it anyway.", GEMWELL_SPRITES.slice(20, 25)]
      ] as const;
      const phaseTwoStrata = [
        ["THE THOUSANDTH STEP", "1000–1120m", "I crossed the thousandth step and the cave answered with a slow rearranging groan. A path appeared over black water only when I carried light and stayed moving. Someone prepared this descent long before I arrived.", "Crown shapes appear beside the route, always sinking, always facing down.", GEMWELL_DEEP_SPRITES.slice(0, 5)],
        ["THE SUNKEN TREASURY", "1121–1280m", "The walls open into deliberate niches and the air smells of old rain. A hidden door admitted me only after I stopped fighting it. Beyond it, the corridors carry a four-note melody that makes the stones seem briefly less drowned.", "The gloves are too small for a miner. Both fingers point at the floor.", GEMWELL_DEEP_SPRITES.slice(5, 10)],
        ["THE LAST LAMPLIGHT", "1281–1440m", "The last lamp I found shines straight down, no matter how I turn it. I followed its beam across submerged stairs while beetles and moths gathered at my boots. Beneath the dry floor, something vast shifted like a palace being moved in secret.", "I can hear water below the dry floor. It sounds like people moving furniture very carefully.", GEMWELL_DEEP_SPRITES.slice(10, 15)]
      ] as const;
      const phaseThreeStrata = [
        ["BLACK TIDE", "1441–1600m", "The stone walls gave way to a darkness that seems to breathe around the lamp. I followed living lights across a floor that felt like deep water, hearing bells far below and seeing open hands rise wherever I stopped.", "The lantern fish showed me a scene from my first descent. I never told it that story.", GEMWELL_ABYSS_SPRITES.slice(0, 5)],
        ["THE UNLIT COURT", "1601–1760m", "At last the descent opened into a drowned court. A serpent circled the empty throne but did not strike. Every guard, door, and crown seemed turned toward one place deeper in the dark, waiting for their king's return.", "This chamber has been waiting a very long time for somebody who was not the king.", GEMWELL_ABYSS_SPRITES.slice(5, 10)],
        ["THE ABYSSAL BELL", "1761–1920m", "I found the anchor holding the tide below the old halls. A four-note call trembled through the water, and a star moth led me to a stone king and a waystone that named the impossible truth: THE KING WAS NEVER LOST.", "I asked the dark if anyone could hear me. The stone figure blinked. I stopped asking questions for a while.", GEMWELL_ABYSS_SPRITES.slice(10, 15)]
      ] as const;
      const phaseFourStrata = [
        ["THE KING'S WAKING ROOM", "1921–2080m", "Beside the stone king, the dark opened into a vault of impossible light. Northern sky moved inside a geode, an amber phoenix breathed warmth into the still air, and every relic pointed back toward the surface the king had chosen to leave.", "He brought the sky down here with him. Or someone did it for him after he could not leave.", GEMWELL_BOTTOM_SPRITES.slice(0, 5)],
        ["THE CROWN REMEMBERS", "2081–2240m", "The chamber beyond held a ring of royal keepsakes around an empty crown-shaped space. A harp answered the sleeping king, a dragon egg answered the harp, and the old court's final vigil unfolded without a single spoken word.", "The knight stepped toward the tide, then stopped. I think it was saluting.", GEMWELL_BOTTOM_SPRITES.slice(5, 10)],
        ["THE TRUE BOTTOM", "2241–2242m", "At the deepest point, I finally understood the court's last journey. The king descended with the crown to bind the black tide; the queen remained above the anchors to preserve what their people had been. The treasure is not loot. It is a kingdom refusing to be forgotten.", "I have stopped calling it a treasure cave. It feels more like somebody packed a whole kingdom into one chamber and waited for it to be found.", GEMWELL_BOTTOM_SPRITES.slice(10, 15)],
        ["AFTER THE BOTTOM", "2243m", "Beyond the trove, the queen's quiet archive waits with its small guardian and an ascent rope tied in her own knot. The book asks only that the story be carried upward. I can do that much.", "I took the rope. I am going up. I am taking notes with me.", GEMWELL_BOTTOM_SPRITES.slice(15, 20)]
      ] as const;
      const visibleStrata = [
        ...strata,
        ...(state.storyPhase >= 2 ? phaseTwoStrata : []),
        ...(state.storyPhase >= 3 ? phaseThreeStrata : []),
        ...(state.storyPhase >= 4 ? phaseFourStrata : [])
      ] as const;
      const gemwellFinalItems = GEMWELL_BOTTOM_SPRITES.slice(20);
      const gemwellFinalTrove = gemwellFinalItems.map(([slug, label, image], itemIndex) => {
        const id = `gemwell-final-note-${itemIndex}`;
        return `<button class="gemwell-final-relic gemwell-final-relic-${slug}" data-fandom-toggle="${id}" aria-expanded="false"><img src="${image}" alt="${label}"><span>${label}</span><small>inspect</small></button>`;
      }).join("");
      const gemwellFinalNotes = gemwellFinalItems.map(([, label, , description], itemIndex) => {
        const id = `gemwell-final-note-${itemIndex}`;
        return `<p class="gemwell-note" id="${id}"><b>${label}</b><span>${description}</span></p>`;
      }).join("");
      const gemwellFooter = state.storyPhase >= 4
        ? '<footer class="gemwell-bottom gemwell-true-bottom" style="background-image:linear-gradient(rgba(0,0,0,.08),rgba(0,0,0,.4)),url(' + GEMWELL_TRUE_BOTTOM_ROOM + ')"><div class="gemwell-final-trove" data-fandom-toggle-group>' + gemwellFinalTrove + '</div><div class="gemwell-final-note-stage gemwell-note-stage" aria-live="polite"><p class="gemwell-note-placeholder">THE LAST TROVE IS NOT JUST DECORATION. CLICK A RELIC.</p>' + gemwellFinalNotes + '</div><div class="gemwell-final-caption"><p>DEPTH 2243 // THE EXIT REMEMBERS</p><h2>The king kept watch. The cave kept the story.</h2><button data-scroll-gemwell-top>TAKE THE EMERGENCY ROPE UP</button></div></footer>'
        : '<footer class="gemwell-bottom"><img src="' + GEMWELL_SPRITES[24][2] + '" alt="The last runed depth marker"><p>DEPTH 000 // AGAIN</p><h2>Dot\'s machine is still scrolling.</h2><button data-scroll-gemwell-top>TAKE THE EMERGENCY ROPE UP</button></footer>';
      return `
        <main class="page fandom-page gemwell-page gemwell-phase-${state.storyPhase}">
          <header class="gemwell-mouth">
            <button data-nav="${FANVERSE_URL}">↑ CLIMB BACK TO FANVERSE</button>
            <div><small>DEEPDELVER_DOT'S SHAREWARE EXPEDITION LOG // ${state.storyPhase >= 4 ? "TRUE BOTTOM RECORDED" : state.storyPhase >= 3 ? "BLACK TIDE MAPPED" : state.storyPhase >= 2 ? "DEPTH 1440 AND DESCENDING" : "LAST UPDATED 11.03.99"}</small><h1>GEMWELL</h1><h2>DESCENT OF THE LUSTERKIN</h2><p>There is no bottom. There is only more page.</p><p class="gemwell-expedition-brief"><b>BASE CAMP NOTE //</b> Every guide I own stops at 999m, but my copy keeps giving me signs that something is still loading underneath. I am mapping the shaft past the documented end to find the lower route—or prove it is only the most stubborn bug on a very old disk.</p></div>
            <aside><b>FIELD RULES</b><span>1. Click specimens for Dot's notes.</span><span>2. Do not trust the depth counter.</span><span>3. Keep scrolling.</span></aside>
          </header>
          <div class="gemwell-rope" aria-hidden="true"></div>
          ${visibleStrata.map(([name, depth, intro, rumor, sprites], stratumIndex) => `
            <section class="gemwell-stratum gemwell-stratum-${stratumIndex + 1}">
              <div class="gemwell-depth"><span>${depth}</span><b>${name}</b></div>
              <article class="gemwell-log"><h2>FIELD LOG ${String(stratumIndex + 1).padStart(2, "0")}</h2><p>${intro}</p><blockquote>${rumor}</blockquote></article>
              <div class="gemwell-specimens" data-fandom-toggle-group>
                <div class="gemwell-specimen-row">
                ${sprites.map(([slug, label, image], specimenIndex) => {
                  const id = `gemwell-note-${stratumIndex}-${specimenIndex}`;
                  return `<button class="gemwell-specimen gemwell-specimen-${slug}" data-fandom-toggle="${id}" aria-expanded="false"><img src="${image}" alt="${label}"><b>${label}</b><span>click to inspect</span></button>`;
                }).join("")}
                </div>
                <div class="gemwell-note-stage" aria-live="polite">
                  <p class="gemwell-note-placeholder">SELECT A SPECIMEN TO OPEN DOT'S FIELD NOTES</p>
                  ${sprites.map(([, label, , description], specimenIndex) => {
                    const id = `gemwell-note-${stratumIndex}-${specimenIndex}`;
                    return `<p class="gemwell-note" id="${id}"><b>${label}</b><span>${description}</span></p>`;
                  }).join("")}
                </div>
              </div>
              <div class="gemwell-down">↓ ${stratumIndex === visibleStrata.length - 1 ? "THE PAGE ENDS. THE SHAFT DOES NOT." : "continue descent"} ↓</div>
            </section>
          `).join("")}
          ${gemwellFooter}
          <p class="fandom-owner-note">Leave specimen sightings, disk checksums, or responsible depth rumors below.</p>
        </main>`;
    }
  },
  [ATLAS_URL]: {
    url: ATLAS_URL,
    title: "MapMouse_Mina - The Unfinished Atlas of Orra",
    site: "fanatlas",
    ownerId: "mapmouse_mina",
    summary: "Mina's clickable fan atlas for an obscure illustrated fantasy serial, with twelve map destinations that each open a hidden illustrated fragment and miniature poem.",
    commentsEnabled: true,
    seedComments: atlasComments,
    listed: true,
    hubId: "zone-fanverse",
    searchTerms: ["MapMouse Mina", "Unfinished Atlas", "Orra", "fantasy map", "Glass Orchard", "Whale Library", "Northless Tower", "Moth Ferry"],
    render: () => `
      <main class="page fandom-page atlas-page">
        <nav class="atlas-ribbon"><button data-nav="${FANVERSE_URL}">FANVERSE INDEX</button><span>MAPMOUSE_MINA'S EDITION // 12 LOOSE LEAVES FOUND</span></nav>
        <header><small>A CLICKABLE PILGRIMAGE THROUGH THE OUT-OF-PRINT 1991 ORRA ANNUAL</small><h1>The Unfinished Atlas</h1><h2>of ORRA</h2><p>North is taking the afternoon off.</p></header>
        <section class="atlas-intro">
          <p><b>Hello, wayward reader!</b> I'm Mina. Every edition of <i>The Unfinished Atlas of Orra</i> contains different roads, but the same twelve places. I scanned my map and pinned the loose illustrations where I think they belong.</p>
          <p class="atlas-instruction">CLICK A LABELED PLACE. Each destination is one tiny page: one recovered picture, one scrap of writing, then back to the map.</p>
        </section>
        <section class="atlas-map-frame">
          <img src="${ATLAS_MAP}" alt="A hand-painted map of Orra with twelve strange landmarks">
          ${ATLAS_PLACES.map(([slug, title, , , , x, y]) => `<button class="atlas-hotspot atlas-hotspot-${slug}" style="left:${x}%;top:${y}%" data-nav="web://fanverse.zone/users/mapmousemina/places/${slug}"><i></i><span>${title}</span></button>`).join("")}
        </section>
        <section class="atlas-legend">
          <h2>Places the map remembers</h2>
          ${ATLAS_PLACES.map(([slug, title, coordinate, poem, image], index) => `
            <button data-nav="web://fanverse.zone/users/mapmousemina/places/${slug}">
              <img src="${image}" alt="">
              <span><b>${String(index + 1).padStart(2, "0")} // ${title}</b><small>${coordinate}</small><em>${poem.split(" / ")[0]}</em></span>
            </button>`).join("")}
        </section>
        <aside class="atlas-margin-note"><b>MINA'S PENCIL NOTE:</b> The road into the Last Blank is absent from the third printing. It is present in the first printing and in three readers' dreams.</aside>
        <p class="fandom-owner-note">Leave route corrections, edition differences, or places your copy remembers below.</p>
      </main>`
  },
  ...atlasFragmentPages
};
