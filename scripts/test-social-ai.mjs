import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";
import { finalizeConversationQuestReply, phaseOneConversationQuest } from "../src/conversation-quests.ts";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
const { AiService } = require(path.join(root, "ai-service.cjs"));
const service = new AiService({ rootDirectory: root, getUserDataDirectory: () => root });
const authoredTurn = phaseOneConversationQuest({
  storyPhase: 1,
  ownerId: "lagmaster_99",
  channel: "aim",
  playerMessage: "I asked Velvet. Rain City 2091 is her favorite.",
  gameTime: "1999-11-03T20:00:00.000Z",
  flags: {},
  directMessages: [{
    id: "velvet-reply",
    ownerId: "velvet_mage",
    channel: "aim",
    role: "owner",
    author: "VelvetMage",
    text: "Rain City 2091. Every witness remembers a different city, which makes it feel alive.",
    createdAt: "1999-11-03T19:55:00.000Z",
    availableAt: "1999-11-03T19:55:00.000Z"
  }]
});

const result = await service.generateDirectReply({
  ownerId: "lagmaster_99",
  channel: "aim",
  playerMessage: "I asked Velvet. Rain City 2091 is her favorite.",
  relationshipScore: 5,
  recentMessages: [],
  authoredConversationContext: authoredTurn.authoredContext
});

const finalReply = finalizeConversationQuestReply(authoredTurn, result.text);
assert.match(finalReply, /\bMMDD\b|month[- ]day/i);
assert.doesNotMatch(finalReply, /\b0614\b|June\s+14/i);
console.log(`SOCIAL_AI_OK: ${finalReply}`);
console.log(`RAW_MODEL_REPLY: ${result.text}`);
console.log(JSON.stringify(result.metrics));
process.exit(0);
