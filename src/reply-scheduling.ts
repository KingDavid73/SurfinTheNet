export type ReplyTimingChannel = "comment" | "email" | "aim" | "helper";
export type ActivityProfile = "day" | "business" | "evening" | "night" | "flexible";

const DAY_PERSONAS = new Set([
  "juniper_gdn", "grandma_dot", "rosepatch_ruth", "hearthside_ellen", "snacktime_sue",
  "trailnote_tom", "paperbird_pam", "catnap_carla", "fetchquest_ray", "bunbrigade_bea",
  "hamcam_hal", "iguana_iris", "skunkuncle_sam", "petal_pat", "nest_nora"
]);

const BUSINESS_PERSONAS = new Set([
  "chip_bytebarn", "toni_pizza", "bev_paws", "pulsenet_jax", "axiom_liaison_02",
  "cubby_clover", "rocketbox_rick", "major_munch", "kip_toonburst", "king_cal",
  "honest_earl", "rewind_riley", "bubble_babs", "faraway_frankie", "inkmoth_ian",
  "sofa_sylvia", "dr_marlow", "gurgle_gus", "halo_holly"
]);

const EVENING_PERSONAS = new Set([
  "lagmaster_99", "velvet_mage", "player_four", "modkit_maddy", "quarter_queen",
  "code_dex", "deckwrecker_dee", "crankcase_cole", "neonblade_nico", "tiderider_ty",
  "throttle_troy", "scootlord_ollie", "veloce_viktor"
]);

const NIGHT_PERSONAS = new Set([
  "mira_917", "darkraven_xx", "faxmoth_13", "nullindex", "static_abel",
  "ghostline", "big_bass_bob", "cedar_wren", "orchard_lee"
]);

const ACTIVE_WINDOWS: Record<ActivityProfile, { startHour: number; endHour: number }> = {
  day: { startHour: 7, endHour: 19 },
  business: { startHour: 9, endHour: 18 },
  evening: { startHour: 15, endHour: 24 },
  night: { startHour: 20, endHour: 4 },
  flexible: { startHour: 8, endHour: 24 }
};

export function activityProfileFor(personaId: string): ActivityProfile {
  if (DAY_PERSONAS.has(personaId)) return "day";
  if (BUSINESS_PERSONAS.has(personaId)) return "business";
  if (EVENING_PERSONAS.has(personaId)) return "evening";
  if (NIGHT_PERSONAS.has(personaId)) return "night";
  return "flexible";
}

export function personaIsActiveAt(personaId: string, gameTime: string | Date) {
  const date = gameTime instanceof Date ? gameTime : new Date(gameTime);
  const { startHour, endHour } = ACTIVE_WINDOWS[activityProfileFor(personaId)];
  const hour = date.getHours() + date.getMinutes() / 60;
  return startHour < endHour
    ? hour >= startHour && hour < endHour
    : hour >= startHour || hour < endHour;
}

function minutesUntilActive(personaId: string, candidate: Date) {
  if (personaIsActiveAt(personaId, candidate)) return 0;
  const { startHour } = ACTIVE_WINDOWS[activityProfileFor(personaId)];
  const nextStart = new Date(candidate);
  nextStart.setHours(startHour, 0, 0, 0);
  if (nextStart <= candidate) nextStart.setDate(nextStart.getDate() + 1);
  return Math.ceil((nextStart.getTime() - candidate.getTime()) / 60_000);
}

function ranged(randomValue: number, minimum: number, maximum: number) {
  return minimum + Math.max(0, Math.min(1, randomValue)) * (maximum - minimum);
}

function baseDelayMinutes(channel: ReplyTimingChannel, random: () => number) {
  const band = random();
  if (channel === "helper") return 0;
  if (channel === "aim") {
    if (band < 0.70) return ranged(random(), 0, 0.75);
    if (band < 0.95) return ranged(random(), 0.75, 5);
    return ranged(random(), 5, 60);
  }
  if (channel === "comment") {
    if (band < 0.70) return ranged(random(), 5, 120);
    if (band < 0.92) return ranged(random(), 120, 480);
    return ranged(random(), 480, 1440);
  }
  if (band < 0.55) return ranged(random(), 60, 360);
  if (band < 0.85) return ranged(random(), 360, 1080);
  return ranged(random(), 1080, 2880);
}

export function replyTimingBounds(channel: ReplyTimingChannel) {
  if (channel === "comment") return { minimumMinutes: 5, maximumMinutes: 1440 };
  if (channel === "email") return { minimumMinutes: 60, maximumMinutes: 2880 };
  if (channel === "aim") return { minimumMinutes: 0, maximumMinutes: 60 };
  return { minimumMinutes: 0, maximumMinutes: 0 };
}

export function scheduleReplyAt(
  personaId: string,
  channel: ReplyTimingChannel,
  sentAt: string,
  random: () => number = Math.random
) {
  const sent = new Date(sentAt);
  const bounds = replyTimingBounds(channel);
  let delayMinutes = baseDelayMinutes(channel, random);
  if (channel !== "helper") {
    const candidate = new Date(sent.getTime() + delayMinutes * 60_000);
    const waitForActivity = minutesUntilActive(personaId, candidate);
    if (waitForActivity > 0) delayMinutes += waitForActivity + ranged(random(), 0, 15);
  }
  delayMinutes = Math.max(bounds.minimumMinutes, Math.min(bounds.maximumMinutes, delayMinutes));
  return new Date(sent.getTime() + delayMinutes * 60_000).toISOString();
}

export function deliveryIsAvailable(availableAt: string | undefined, gameTime: string) {
  return !availableAt || new Date(availableAt).getTime() <= new Date(gameTime).getTime();
}
