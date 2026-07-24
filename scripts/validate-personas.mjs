import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const personaDirectory = path.join(root, "personas");
const requiredStrings = ["id", "screenName", "displayName", "name", "location", "archetype", "setting", "background"];
const requiredArrays = ["personality", "speechStyle", "likes", "dislikes", "knownFacts", "exampleReplies"];
const failures = [];
let count = 0;

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
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`PERSONAS_OK: ${count} persona files include name, age, location, archetype, personality, voice, preferences, facts, and relationship context.`);
