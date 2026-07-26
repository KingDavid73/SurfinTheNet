import { createRequire } from "node:module";
import path from "node:path";
import { readFile } from "node:fs/promises";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
const { AiService } = require(path.join(root, "ai-service.cjs"));
const persona = JSON.parse(await readFile(path.join(root, "personas", "orbit_guide.json"), "utf8"));
const service = new AiService({ rootDirectory: root, getUserDataDirectory: () => root });

function promptFor(storyPhase, playerMessage = "What should I do next?") {
  return service.buildDirectReplySystemPrompt(persona, {
    channel: "helper",
    playerMessage,
    relationshipScore: 10,
    helperContext: {
      storyPhase,
      currentPage: {
        url: "web://raven.web/vault",
        title: "DarkRaven's Black File",
        summary: "A locked private case archive."
      },
      visitedUrls: ["web://home", "web://raven.web/home", "web://raven.web/vault"],
      discoveredMysteries: storyPhase >= 3 ? ["morrow_five", "glass_lake", "quiet_county", "adaptive_index"] : [],
      darkRavenVaultUnlocked: storyPhase >= 2,
      continuityConsoleUnlocked: storyPhase >= 4
    }
  });
}

function assertIncludes(text, expected, label) {
  if (!text.includes(expected)) throw new Error(`${label}: expected prompt to include ${JSON.stringify(expected)}`);
}

function assertExcludes(text, expected, label) {
  if (text.includes(expected)) throw new Error(`${label}: prompt leaked ${JSON.stringify(expected)}`);
}

const phaseOne = promptFor(1, "I am stuck at DarkRaven's Black File.");
assertIncludes(phaseOne, "story phase 1", "phase one");
assertIncludes(phaseOne, "darkraven_black_file", "phase one");
assertIncludes(phaseOne, "\"privateAnswer\":\"0614\"", "phase one private design knowledge");
assertExcludes(phaseOne, "adaptive_index_route", "phase one");
assertExcludes(phaseOne, "continuity_recovery_phrase", "phase one");
assertIncludes(phaseOne, "Never output an unsolved privateAnswer", "spoiler policy");

const phaseTwo = promptFor(2, "How do I find the hidden archive after the three cases?");
assertIncludes(phaseTwo, "darkraven_black_file", "phase two retains completed knowledge summary");
assertIncludes(phaseTwo, "adaptive_index_route", "phase two");
assertIncludes(phaseTwo, "\"privateAnswer\":\"web://archive.orbitnet.local/labs/home\"", "phase two selected private knowledge");
assertExcludes(phaseTwo, "continuity_console_address", "phase two");

const phaseThree = promptFor(3, "The continuity lock asks for a recovery phrase.");
assertIncludes(phaseThree, "continuity_console_address", "phase three");
assertIncludes(phaseThree, "\"privateAnswer\":\"stayonline\"", "phase three private design knowledge");
assertExcludes(phaseThree, "stable free play", "phase three");

const phaseFour = promptFor(4);
assertIncludes(phaseFour, "stable free play", "phase four");
assertIncludes(phaseFour, "\"continuityConsoleUnlocked\":true", "phase four progress");

const ordinaryAim = service.buildDirectReplySystemPrompt(persona, {
  channel: "aim",
  relationshipScore: 10,
  authoredConversationContext: ["Give the player the authored MMDD format clue now."]
});
assertExcludes(ordinaryAim, "PRIVATE DESIGN DATA", "non-helper direct reply");
assertIncludes(ordinaryAim, "Authored conversation state (canonical and mandatory)", "authored social state");
assertIncludes(ordinaryAim, "Give the player the authored MMDD format clue now.", "authored social instruction");

const ambientIntroduction = service.buildAmbientCommentSystemPrompt(persona, {
  personaId: "orbit_guide",
  pageOwnerId: "darkraven_xx",
  pageUrl: "web://morrow-five.net/home",
  pageTitle: "Morrow Five",
  pageSummary: "A mystery page.",
  pageContext: "Numbers and clues.",
  storyPhase: 2,
  deliverySurface: "aim",
  privateOutreachMode: "introduction"
});
assertIncludes(ambientIntroduction, "first unsolicited private message", "ambient private introduction");
assertIncludes(ambientIntroduction, "Do not mention a named mystery", "ambient introduction spoiler boundary");

const ambientFollowUp = service.buildAmbientCommentSystemPrompt(persona, {
  personaId: "orbit_guide",
  pageOwnerId: "darkraven_xx",
  pageUrl: "web://morrow-five.net/home",
  pageTitle: "Morrow Five",
  pageSummary: "A mystery page.",
  pageContext: "Numbers and clues.",
  storyPhase: 2,
  deliverySurface: "aim",
  privateOutreachMode: "follow-up"
});
assertIncludes(ambientFollowUp, "previously talking with them", "ambient private follow-up");
assertIncludes(ambientFollowUp, "Ask one natural, probing question", "ambient follow-up behavior");

const phaseThreeContext = {
  storyPhase: 3,
  currentPage: { url: "web://legacy.orbitos.local/admin/continuity", title: "Continuity Lock", summary: "A locked archive." },
  visitedUrls: [],
  discoveredMysteries: ["morrow_five", "glass_lake", "quiet_county", "adaptive_index"],
  darkRavenVaultUnlocked: true,
  continuityConsoleUnlocked: false
};
const redactedPhrase = service.enforceHelperSpoilerBoundary("Just type STAY ONLINE.", persona, phaseThreeContext);
assertExcludes(redactedPhrase.toLowerCase().replace(/[^a-z0-9]+/g, ""), "stayonline", "phrase leak safeguard");
assertIncludes(redactedPhrase, "three retired account pages", "phrase leak fallback hint");
const redactedAddress = service.enforceHelperSpoilerBoundary("Open web://legacy.orbitos.local/admin/continuity.", persona, phaseThreeContext);
assertExcludes(redactedAddress, "web://legacy.orbitos.local/admin/continuity", "address leak safeguard");
const harmlessHint = "Inspect unfamiliar old usernames that begin commenting after phase three.";
if (service.enforceHelperSpoilerBoundary(harmlessHint, persona, phaseThreeContext) !== harmlessHint) {
  throw new Error("spoiler safeguard altered a harmless hint");
}

console.log("HELPER_KNOWLEDGE_OK: active and completed phase knowledge is supplied without leaking future phases.");
