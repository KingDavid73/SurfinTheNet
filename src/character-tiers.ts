export type NarrativeTier = "main" | "featured" | "supporting";

export const MAIN_CHARACTER_IDS = [
  "mira_917",
  "system_core",
  "darkraven_xx",
  "juniper_gdn",
  "lagmaster_99",
  "faxmoth_13",
  "rhymetape_rico"
] as const;

export const FEATURED_CHARACTER_IDS = [
  "king_cal",
  "nullindex",
  "modkit_maddy",
  "quarter_queen",
  "deckwrecker_dee",
  "cedar_wren",
  "static_abel",
  "orchard_lee"
] as const;

const MAIN_CHARACTERS = new Set<string>(MAIN_CHARACTER_IDS);
const FEATURED_CHARACTERS = new Set<string>(FEATURED_CHARACTER_IDS);

export function narrativeTierFor(personaId: string): NarrativeTier {
  if (MAIN_CHARACTERS.has(personaId)) return "main";
  if (FEATURED_CHARACTERS.has(personaId)) return "featured";
  return "supporting";
}

export function ambientActivityFor(personaId: string) {
  const tier = narrativeTierFor(personaId);
  if (tier === "main") return { rateMultiplier: 2.25, capMultiplier: 1.5 };
  if (tier === "featured") return { rateMultiplier: 1.5, capMultiplier: 1.2 };
  return { rateMultiplier: 1, capMultiplier: 1 };
}
