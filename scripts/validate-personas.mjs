import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const personaDirectory = path.join(root, "personas");
const requiredStrings = ["id", "screenName", "displayName", "name", "location", "archetype", "setting", "background"];
const requiredArrays = ["personality", "speechStyle", "likes", "dislikes", "knownFacts", "exampleReplies"];
const tieredRequiredArrays = ["hobbies", "interests"];
const expectedMain = new Set(["mira_917", "system_core", "darkraven_xx", "juniper_gdn", "lagmaster_99", "faxmoth_13"]);
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
