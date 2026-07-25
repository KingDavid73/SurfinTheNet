import type { DirectChannel, DirectMessage, StoryPhase } from "./types";

export const VELVET_FAVORITE_GAME = "Rain City 2091";

export interface ConversationQuestTurn {
  authoredContext: string[];
  markVelvetAsked: boolean;
  completesLagFavor: boolean;
  lagHintDue: boolean;
}

interface ConversationQuestInput {
  storyPhase: StoryPhase;
  ownerId: string;
  channel: DirectChannel;
  playerMessage: string;
  gameTime: string;
  flags: Record<string, boolean>;
  directMessages: DirectMessage[];
}

const EMPTY_TURN: ConversationQuestTurn = {
  authoredContext: [],
  markVelvetAsked: false,
  completesLagFavor: false,
  lagHintDue: false
};

function asksForFavoriteGame(message: string) {
  const normalized = message.toLowerCase();
  const asksPreference = /\b(favou?rite|best|like most|love most|top)\b/.test(normalized);
  const asksGame = /\b(game|axiom|rpg|role.?playing|play)\b/.test(normalized);
  return asksPreference && asksGame;
}

function mentionsVelvetFavorite(message: string) {
  return /\brain\s+city(?:\s+2091)?\b/i.test(message);
}

function velvetAnswerHasArrived(messages: DirectMessage[], gameTime: string) {
  const now = Date.parse(gameTime);
  return messages.some((entry) => {
    if (
      entry.ownerId !== "velvet_mage" ||
      entry.channel !== "aim" ||
      entry.role !== "owner" ||
      !mentionsVelvetFavorite(entry.text)
    ) {
      return false;
    }
    const visibleAt = Date.parse(entry.availableAt ?? entry.createdAt);
    return Number.isFinite(visibleAt) && Number.isFinite(now) && visibleAt <= now;
  });
}

export function phaseOneConversationQuest(input: ConversationQuestInput): ConversationQuestTurn {
  if (input.storyPhase !== 1 || input.channel !== "aim") return EMPTY_TURN;

  if (input.ownerId === "velvet_mage" && asksForFavoriteGame(input.playerMessage)) {
    return {
      authoredContext: [
        `The player has directly asked about your favorite Axiom game. Answer clearly that it is ${VELVET_FAVORITE_GAME}, then give one brief personal reason: its witnesses remember conflicting versions of the city.`
      ],
      markVelvetAsked: true,
      completesLagFavor: false,
      lagHintDue: false
    };
  }

  if (input.ownerId !== "lagmaster_99") return EMPTY_TURN;

  const answerArrived = velvetAnswerHasArrived(input.directMessages, input.gameTime);
  const playerReportedAnswer = mentionsVelvetFavorite(input.playerMessage);
  const wasComplete = Boolean(input.flags.phase_one_lag_favor_completed);
  const completesLagFavor = !wasComplete && answerArrived && playerReportedAnswer;
  const favorComplete = wasComplete || completesLagFavor;
  const lagHintDue = favorComplete && !input.flags.phase_one_lag_hint_delivered;

  if (lagHintDue) {
    return {
      authoredContext: [
        "The player has completed your social favor by actually asking Velvet and reporting her answer.",
        "You MUST acknowledge the favor and now share this exact spoiler-safe security hint in your own voice: Raven once bragged that his four-digit personal-date locks are written in month-day order, MMDD.",
        "This is the agreed reward: deliver it directly without refusing, hedging, or claiming you will keep the hint to yourself.",
        "Do not reveal whose date Raven used, the date itself, or the four digits."
      ],
      markVelvetAsked: false,
      completesLagFavor,
      lagHintDue: true
    };
  }

  if (playerReportedAnswer && !answerArrived) {
    return {
      authoredContext: [
        "The player guessed or claimed Velvet's favorite before a reply from Velvet actually arrived. Treat it as an unverified guess, tell them to ask Velvet directly, and do not give the Raven hint."
      ],
      markVelvetAsked: false,
      completesLagFavor: false,
      lagHintDue: false
    };
  }

  if (!favorComplete) {
    return {
      authoredContext: [
        `You have a badly concealed crush on VelvetMage. When it fits the conversation, especially if the player asks for secrets, clues, DarkRaven help, or useful gossip, offer a trade: ask Velvet which Axiom game is her favorite for your "LAGWAVE market research," then report back. Do not state ${VELVET_FAVORITE_GAME} yourself. Promise one useful Raven security hint in return.`
      ],
      markVelvetAsked: false,
      completesLagFavor: false,
      lagHintDue: false
    };
  }

  return {
    authoredContext: [
      "The Velvet favor is complete and you already gave the player Raven's month-day ordering hint. Do not repeat it unless the player asks."
    ],
    markVelvetAsked: false,
    completesLagFavor: false,
    lagHintDue: false
  };
}

export function finalizeConversationQuestReply(turn: ConversationQuestTurn, generatedReply: string) {
  const reply = generatedReply.trim();
  if (turn.markVelvetAsked && !mentionsVelvetFavorite(reply)) {
    return `${VELVET_FAVORITE_GAME}. Every witness remembers a different version of the city, so it feels alive in a way most game worlds do not.`;
  }
  if (turn.lagHintDue && !/\bMMDD\b|month[- ]day/i.test(reply)) {
    return "Trade paid: Raven writes four-digit personal dates in month-day order—MMDD. Whose date is your problem.";
  }
  return reply;
}
