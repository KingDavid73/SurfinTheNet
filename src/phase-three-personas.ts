export const PHASE_THREE_EXPLORERS = [
  { id: "dialup_daria", screenName: "DialUp_Daria", displayName: "Daria" },
  { id: "cached_cory", screenName: "CachedCory", displayName: "Cory" },
  { id: "netmom_nadine", screenName: "NetMom_Nadine", displayName: "Nadine" },
  { id: "shiftkey_shawn", screenName: "ShiftKey_Shawn", displayName: "Shawn" },
  { id: "ufowendy_77", screenName: "UFOWendy_77", displayName: "Wendy" },
  { id: "archive_omar", screenName: "ArchiveOmar", displayName: "Omar" },
  { id: "pixiekit_amy", screenName: "PixieKit_Amy", displayName: "Amy" },
  { id: "grayhat_gary", screenName: "GrayHatGary", displayName: "Gary" }
] as const;

export const PHASE_THREE_EXPLORER_IDS = PHASE_THREE_EXPLORERS.map(({ id }) => id);

export const PHASE_THREE_EXPLORER_OWNERS = Object.fromEntries(
  PHASE_THREE_EXPLORERS.map(({ id, screenName, displayName }) => [id, { screenName, displayName }])
);
