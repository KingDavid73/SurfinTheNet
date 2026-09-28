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

/* Explicit supporting-tier pool for the owners of the phase-four company
   pages. They can author ambient public comments, but retain the normal low
   activity multiplier used by background Orbit citizens. */
export const SUPPORTING_BUSINESS_PERSONA_IDS = [
  "veluna_kaye",
  "aureline_julian",
  "kestrel_vera",
  "westbell_dale",
  "bigbang_meg",
  "nullstate_curator",
  "dogeared_ruth",
  "secondsunrise_mavis",
  "criticalhit_gabe",
  "marcy_flash",
  "wondervale_guest",
  "greenstripe_ron",
  "hank_tank",
  "pixelpetal_dana",
  "maximart_1844"
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
