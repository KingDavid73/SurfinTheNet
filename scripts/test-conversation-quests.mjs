import assert from "node:assert/strict";
import {
  finalizeConversationQuestReply,
  phaseOneConversationQuest,
  VELVET_FAVORITE_GAME
} from "../src/conversation-quests.ts";

const gameTime = "1999-11-03T20:00:00.000Z";
const baseInput = {
  storyPhase: 1,
  channel: "aim",
  gameTime,
  flags: {},
  directMessages: []
};

const velvetQuestion = phaseOneConversationQuest({
  ...baseInput,
  ownerId: "velvet_mage",
  playerMessage: "What's your favorite Axiom game?"
});
assert.equal(velvetQuestion.markVelvetAsked, true);
assert.match(velvetQuestion.authoredContext.join(" "), new RegExp(VELVET_FAVORITE_GAME));

const prematureGuess = phaseOneConversationQuest({
  ...baseInput,
  ownerId: "lagmaster_99",
  playerMessage: "Velvet's favorite is Rain City 2091."
});
assert.equal(prematureGuess.completesLagFavor, false);
assert.equal(prematureGuess.lagHintDue, false);
assert.match(prematureGuess.authoredContext.join(" "), /unverified guess/i);

const deliveredVelvetReply = {
  id: "velvet-reply",
  ownerId: "velvet_mage",
  channel: "aim",
  role: "owner",
  author: "VelvetMage",
  text: "Rain City 2091. Every witness remembers a different city, which makes it feel alive.",
  createdAt: "1999-11-03T19:55:00.000Z",
  availableAt: "1999-11-03T19:55:00.000Z"
};
const futureVelvetReply = {
  ...deliveredVelvetReply,
  id: "future-velvet-reply",
  createdAt: "1999-11-03T20:05:00.000Z",
  availableAt: "1999-11-03T20:05:00.000Z"
};
const replyStillInTransit = phaseOneConversationQuest({
  ...baseInput,
  ownerId: "lagmaster_99",
  playerMessage: "Velvet's favorite is Rain City 2091.",
  directMessages: [futureVelvetReply]
});
assert.equal(replyStillInTransit.completesLagFavor, false);
assert.equal(replyStillInTransit.lagHintDue, false);

const completedFavor = phaseOneConversationQuest({
  ...baseInput,
  ownerId: "lagmaster_99",
  playerMessage: "I asked Velvet. Her favorite is Rain City 2091.",
  directMessages: [deliveredVelvetReply]
});
assert.equal(completedFavor.completesLagFavor, true);
assert.equal(completedFavor.lagHintDue, true);
assert.match(completedFavor.authoredContext.join(" "), /MMDD/);
assert.doesNotMatch(completedFavor.authoredContext.join(" "), /0614/);
assert.match(
  finalizeConversationQuestReply(completedFavor, "Fine, I have a secret that might help."),
  /\bMMDD\b/
);
assert.match(
  finalizeConversationQuestReply(velvetQuestion, "I like quite a few Axiom games."),
  new RegExp(VELVET_FAVORITE_GAME)
);

const alreadyRewarded = phaseOneConversationQuest({
  ...baseInput,
  ownerId: "lagmaster_99",
  playerMessage: "Any more Raven clues?",
  flags: {
    phase_one_lag_favor_completed: true,
    phase_one_lag_hint_delivered: true
  }
});
assert.equal(alreadyRewarded.lagHintDue, false);
assert.match(alreadyRewarded.authoredContext.join(" "), /already gave/i);

const laterPhase = phaseOneConversationQuest({
  ...baseInput,
  storyPhase: 2,
  ownerId: "lagmaster_99",
  playerMessage: "Rain City 2091"
});
assert.deepEqual(laterPhase.authoredContext, []);
assert.equal(laterPhase.completesLagFavor, false);

console.log("Phase-one conversation quest checks passed.");
