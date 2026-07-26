import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const personaDirectory = path.join(root, "personas");
const requiredStrings = ["id", "screenName", "displayName", "name", "location", "archetype", "setting", "background"];
const requiredArrays = ["personality", "speechStyle", "likes", "dislikes", "knownFacts", "exampleReplies"];
const tieredRequiredArrays = ["hobbies", "interests"];
const expectedMain = new Set(["mira_917", "system_core", "darkraven_xx", "juniper_gdn", "lagmaster_99", "faxmoth_13", "rhymetape_rico"]);
const expectedFeatured = new Set(["king_cal", "nullindex", "modkit_maddy", "quarter_queen", "deckwrecker_dee", "cedar_wren", "static_abel", "orchard_lee"]);
const failures = [];
let count = 0;
const observedMain = new Set();
const observedFeatured = new Set();

for (const file of (await readdir(personaDirectory)).filter((name) => name.endsWith(".json")).sort()) {
  count += 1;
  const persona = JSON.parse(await readFile(path.join(personaDirectory, file), "utf8"));
  for (const key of requiredStrings) {
    if (typeof persona[key] !== "string" || !persona[key].trim()) failures.push(`${file}: missing ${key}`);
  }
  if ((typeof persona.age !== "number" || !Number.isFinite(persona.age)) && (typeof persona.age !== "string" || !persona.age.trim())) {
    failures.push(`${file}: missing age`);
  }
  for (const key of requiredArrays) {
    if (!Array.isArray(persona[key]) || persona[key].length === 0) failures.push(`${file}: missing ${key}`);
  }
  if (!persona.relationshipToPlayer || typeof persona.relationshipToPlayer.summary !== "string") {
    failures.push(`${file}: missing relationshipToPlayer`);
  }
  if (persona.id === "orbit_guide") {
    if (persona.version < 2) failures.push(`${file}: helper knowledge version must be at least 2`);
    if (!persona.hintPolicy || !Array.isArray(persona.hintPolicy.ladder) || persona.hintPolicy.ladder.length < 4) {
      failures.push(`${file}: missing four-tier hintPolicy ladder`);
    }
    if (!Array.isArray(persona.gameplayGuidance) || persona.gameplayGuidance.length < 5) {
      failures.push(`${file}: missing expanded gameplayGuidance`);
    }
    const expectedHelperPuzzles = new Map([
      ["1", new Map([["darkraven_black_file", "0614"]])],
      ["2", new Map([
        ["morrow_five", "The five emergency relay sites were removed from active service in 1991 but retained power as a cold reserve; their final 1994 Lantern shutdown test was real. The sleeping-doomsday-network story was not: somebody later inserted modern Orbit directory object IDs through Orbit Bridge 4.7 and removed the tenth group to turn genuine old audio into a solvable activation mystery."],
        ["glass_lake", "The three lights were illuminated calibration balloons, the powerful answer was Glass Lake's own carrier returned by a distant test van and echoed through a diagnostic repeater, and Hangar B stored balloon equipment. Moon Window was an atmospheric propagation test, not a corridor for nonhuman visitors. Greybridge Signal Systems later adapted the project's route-switching and session-persistence method for Orbit."],
        ["quiet_county", "The three dramatic letters were produced from one Orbit-era sheet in 1999 and falsely presented as separate 1992 originals. Project Trestle did not manufacture the East Trestle dispute, but its researchers covertly mapped rumors, alliances, and trusted speakers, cancelled the promised debrief, and forwarded stability maps to an unnamed public-communications research sponsor."],
        ["adaptive_index_route", "web://archive.orbitnet.local/labs/home"]
      ])],
      ["3", new Map([
        ["continuity_console_address", "web://legacy.orbitos.local/admin/continuity"],
        ["continuity_recovery_phrase", "stayonline"]
      ])],
      ["4", new Map()]
    ]);
    for (const [phase, expectedPuzzles] of expectedHelperPuzzles) {
      const phaseRecord = persona.phaseKnowledge?.[phase];
      if (!phaseRecord || !Array.isArray(phaseRecord.requiredPuzzles)) {
        failures.push(`${file}: missing phaseKnowledge.${phase}.requiredPuzzles`);
        continue;
      }
      const puzzles = new Map(phaseRecord.requiredPuzzles.map((puzzle) => [puzzle.id, puzzle]));
      for (const [id, privateAnswer] of expectedPuzzles) {
        const puzzle = puzzles.get(id);
        if (!puzzle) {
          failures.push(`${file}: phase ${phase} missing puzzle ${id}`);
          continue;
        }
        if (puzzle.privateAnswer !== privateAnswer) failures.push(`${file}: ${id} privateAnswer no longer matches the implemented gate`);
        if (typeof puzzle.solutionLogic !== "string" || !puzzle.solutionLogic.trim()) failures.push(`${file}: ${id} missing solutionLogic`);
        if (!Array.isArray(puzzle.authoredRoutes) || puzzle.authoredRoutes.length < 2) failures.push(`${file}: ${id} missing authoredRoutes`);
        if (!Array.isArray(puzzle.hintTiers) || puzzle.hintTiers.length < 4) failures.push(`${file}: ${id} missing graduated hintTiers`);
      }
    }
  }
  if (persona.narrativeTier === "main" || persona.narrativeTier === "featured") {
    const expectedMultiplier = persona.narrativeTier === "main" && persona.id !== "system_core" ? 2.25 : persona.narrativeTier === "featured" ? 1.5 : 0;
    if (persona.ambientPostMultiplier !== expectedMultiplier) failures.push(`${file}: unexpected ambientPostMultiplier`);
    if (typeof persona.briefBackground !== "string" || !persona.briefBackground.trim()) failures.push(`${file}: missing briefBackground`);
    for (const key of tieredRequiredArrays) {
      if (!Array.isArray(persona[key]) || persona[key].length < 3) failures.push(`${file}: missing ${key}`);
    }
    (persona.narrativeTier === "main" ? observedMain : observedFeatured).add(persona.id);
  }
}

for (const id of expectedMain) if (!observedMain.has(id)) failures.push(`roster: missing main character ${id}`);
for (const id of expectedFeatured) if (!observedFeatured.has(id)) failures.push(`roster: missing featured character ${id}`);
for (const id of observedMain) if (!expectedMain.has(id)) failures.push(`roster: unexpected main character ${id}`);
for (const id of observedFeatured) if (!expectedFeatured.has(id)) failures.push(`roster: unexpected featured character ${id}`);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`PERSONAS_OK: ${count} persona files validated, including ${observedMain.size} main and ${observedFeatured.size} featured characters with activity weights and expanded backgrounds.`);
