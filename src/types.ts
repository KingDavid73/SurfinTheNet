export type AppId = "browser" | "mail" | "files" | "chat" | "music" | "settings" | "helper" | "diagnostics" | "bbs";

export type AiPhase = "offline" | "ready" | "loading" | "warming" | "idle" | "generating" | "reviewing" | "error";

export interface AiPersonaSummary {
  id: string;
  screenName: string;
  displayName: string;
  statusMessage: string;
}

export interface AiMetrics {
  totalMs: number;
  generationMs: number;
  modelLoadMs: number | null;
  outputTokens: number;
  tokensPerSecond: number | null;
  stopReason: string;
  backend: string | null;
}

export interface AiMessage {
  id: string;
  role: "player" | "character";
  text: string;
  createdAt: string;
  metrics?: AiMetrics;
}

export interface AiConversation {
  persona: AiPersonaSummary;
  messages: AiMessage[];
}

export interface AiStatus {
  phase: AiPhase;
  modelAvailable: boolean;
  modelName: string;
  modelFile: string;
  persona: AiPersonaSummary;
  backend: string | null;
  loadMs: number | null;
  warmupMs: number | null;
  warmed: boolean;
  error: string | null;
}

export interface AiSendResult {
  conversation: AiConversation;
  metrics: AiMetrics;
  status: AiStatus;
}

export interface ContentSafeguardResult {
  text: string;
  action: "unchanged" | "words-replaced" | "rewritten";
  reviewMs: number;
}

export interface PageComment {
  id: string;
  pageUrl: string;
  ownerId: string;
  role: "player" | "owner" | "visitor";
  author: string;
  text: string;
  createdAt: string;
  availableAt?: string;
  revealAfterVisit: number;
}

export interface PageCommentRequest {
  ownerId: string;
  pageUrl: string;
  pageTitle: string;
  pageSummary: string;
  playerComment: string;
  recentComments: Array<{ role: "player" | "owner" | "visitor"; author: string; text: string }>;
  relationshipScore: number;
}

export interface PageCommentResult {
  text: string;
  owner: AiPersonaSummary;
  metrics: AiMetrics;
}

export interface AmbientPostJob {
  id: string;
  personaId: string;
  pageUrl: string;
  createdAt: string;
  attempts: number;
  surface?: "comment" | "aim" | "email";
  privateOutreachMode?: "introduction" | "follow-up";
  commentLength?: "short" | "medium" | "long";
  randyReaction?: "zone-page" | "personal-page";
}

export interface AmbientCommentRequest {
  personaId: string;
  pageOwnerId: string;
  pageUrl: string;
  pageTitle: string;
  pageSummary: string;
  pageContext: string;
  existingComments: Array<{ role: "player" | "owner" | "visitor"; author: string; text: string }>;
  recentDirectMessages?: Array<{ role: "player" | "owner"; author: string; text: string }>;
  storyPhase: StoryPhase;
  deliverySurface?: "comment" | "aim" | "email";
  privateOutreachMode?: "introduction" | "follow-up";
  commentLength?: "short" | "medium" | "long";
  randyReaction?: "zone-page" | "personal-page";
}

export interface AmbientCommentResult {
  text: string;
  author: AiPersonaSummary;
  metrics: AiMetrics;
}

export interface DesktopSettings {
  theme: "classic" | "plum" | `zone-${string}`;
  wallpaper: "teal" | "clouds" | `zone-${string}`;
  cursor: "arrow" | "star" | `cursor-${number}`;
  musicVolume: number;
  browserTextSize: "small" | "medium" | "large" | "extra-large";
}

export interface GuestbookEntry {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export type DirectChannel = "aim" | "email" | "helper";
export type StoryPhase = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface BbsPlayerReply {
  id: string;
  threadId: string;
  text: string;
  createdAt: string;
}

export interface BbsState {
  connected: boolean;
  selectedBoardId: string;
  selectedThreadId: string | null;
  readThreadIds: string[];
  replies: BbsPlayerReply[];
  readMailIds: string[];
  downloadedFileIds: string[];
}

export interface InfectionState {
  level: number;
  discoveredRandyPages: string[];
  invadedPersonalPages: string[];
  evidenceIds: string[];
  patchComponents: string[];
  exposureReportPublished: boolean;
  patchBuilt: boolean;
  patchDistributed: boolean;
  cleanupComplete: boolean;
}

export interface DirectMessage {
  id: string;
  ownerId: string;
  channel: DirectChannel;
  role: "player" | "owner";
  author: string;
  text: string;
  subject?: string;
  createdAt: string;
  availableAt?: string;
  linkUrl?: string;
  linkLabel?: string;
  /** Stable registry key for optional illustrated mail artwork. */
  artId?: string;
  /** Stable collectible key for an attachment that can be saved to My Files. */
  attachmentId?: string;
  metrics?: AiMetrics;
}

export interface HelperProgressContext {
  storyPhase: StoryPhase;
  currentPage: {
    url: string;
    title: string;
    summary: string;
  };
  visitedUrls: string[];
  discoveredMysteries: string[];
  darkRavenVaultUnlocked: boolean;
  continuityConsoleUnlocked: boolean;
}

export interface DirectReplyRequest {
  ownerId: string;
  channel: DirectChannel;
  playerMessage: string;
  subject?: string;
  relationshipScore: number;
  recentMessages: Array<{ role: "player" | "owner"; author: string; text: string }>;
  helperContext?: HelperProgressContext;
  authoredConversationContext?: string[];
}

export interface DirectReplyResult {
  text: string;
  owner: AiPersonaSummary;
  metrics: AiMetrics;
}

export interface SemanticSearchRequest {
  query: string;
  pages: Array<{ url: string; title: string; summary: string }>;
}

export interface SemanticSearchResult {
  urls: string[];
  metrics: AiMetrics;
}

export interface DownloadedFile {
  id: string;
  name: string;
  contents: string;
  downloadedAt: string;
  sourceUrl?: string;
  sourceTitle?: string;
  /** Stable registry key for optional illustrated file artwork. */
  artId?: string;
}

export interface PageMusicTrack {
  label: string;
  file: string;
  url: string;
  midiUrl?: string;
}

export interface GameState {
  version: number;
  playerName: string;
  storyPhase: StoryPhase;
  phaseReachedAt: Partial<Record<"2" | "3" | "4" | "5" | "6" | "7", string>>;
  discoveredMysteries: string[];
  visited: string[];
  bookmarks: string[];
  downloads: DownloadedFile[];
  musicLibrary: PageMusicTrack[];
  musicSkin: string;
  flags: Record<string, boolean>;
  currentUrl: string;
  settings: DesktopSettings;
  gameTime: string;
  pageComments: PageComment[];
  ambientPostQueue: AmbientPostJob[];
  pageVisitCounts: Record<string, number>;
  guestbookEntries: Record<string, GuestbookEntry[]>;
  directMessages: DirectMessage[];
  readDirectMessageIds: string[];
  relationships: Record<string, number>;
  bbs: BbsState;
  infection: InfectionState;
}

export interface PageDefinition {
  url: string;
  title: string;
  site: "orbithome" | "directory" | "gamegridzone" | "xtremezone" | "yesterdayzone" | "newcomerzone" | "revival" | "newcalfan" | "newbytefan" | "newlinklily" | "newrookierayna" | "newzackrerun" | "soundboyband" | "soundpunk" | "soundgrunge" | "soundbreakbeat" | "soundcountry" | "soundrap" | "bytebarnteaser" | "bytebarntribute" | "rainbow" | "cozygarden" | "cozycottage" | "cozymom" | "cozyhike" | "cozycraft" | "signal" | "raven" | "orbitlegacy" | "backchannelalt" | "morrowfive" | "glasslake" | "quietcounty" | "algorithmarchive" | "rumorarchive" | "computer" | "modkit" | "pizza" | "pets" | "pulse" | "vanta" | "cubit" | "rocketbox" | "moonmunch" | "toonburst" | "kingcal" | "earl" | "skater" | "bmx" | "blader" | "surfer" | "motocross" | "scooter" | "euro" | "petcat" | "petdog" | "petrabbit" | "pethamster" | "petiguana" | "petskunk" | "fanmoss" | "fanblipzo" | "fanstar" | "fanprism" | "fangemwell" | "fanatlas" | "oldbiker" | "grandmaold" | "grandmanew" | "oldhistory" | "oldtrains" | "oldfishing" | "rewindbusiness" | "laundrybusiness" | "floristbusiness" | "travelbusiness" | "copybusiness" | "furniturebusiness" | "dentalbusiness" | "plumbingbusiness" | "creditbusiness" | "salonbusiness" | "medbusiness" | "carmakerbusiness" | "electronicsbusiness" | "recreationbusiness" | "burgerbusiness" | "fashionbusiness" | "bookstorebusiness" | "thriftbusiness" | "hobbybusiness" | "photographerbusiness" | "themeparkbusiness" | "lawnbusiness" | "septicbusiness" | "webdesignbusiness" | "superstorebusiness";
  ownerId: string;
  summary: string;
  commentsEnabled?: boolean;
  seedComments?: PageComment[];
  listed?: boolean;
  searchable?: boolean;
  minimumPhase?: StoryPhase;
  hubId?: string;
  searchTerms?: string[];
  render: (state: GameState) => string;
}

declare global {
  interface Window {
    gameAPI?: {
      load: () => Promise<GameState>;
      save: (state: GameState) => Promise<boolean>;
      reset: () => Promise<GameState>;
    };
    aiAPI?: {
      status: () => Promise<AiStatus>;
      preload: () => Promise<AiStatus>;
      conversation: () => Promise<AiConversation>;
      send: (message: string) => Promise<AiSendResult>;
      safeguard: (text: string) => Promise<ContentSafeguardResult>;
      comment: (request: PageCommentRequest) => Promise<PageCommentResult>;
      ambientComment: (request: AmbientCommentRequest) => Promise<AmbientCommentResult>;
      directReply: (request: DirectReplyRequest) => Promise<DirectReplyResult>;
      search: (request: SemanticSearchRequest) => Promise<SemanticSearchResult>;
      reset: () => Promise<AiConversation>;
    };
  }
}
