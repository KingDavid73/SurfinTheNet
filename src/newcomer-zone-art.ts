export const NEWCOMER_ZONE_ART = Object.fromEntries(
  ["keesha", "ben", "lily", "rayna", "zack", "enter", "backdrop"].map((name) => [
    name,
    new URL(`../assets/images/zone-decor/newcomers/${name}.png`, import.meta.url).href
  ])
) as Record<string, string>;
