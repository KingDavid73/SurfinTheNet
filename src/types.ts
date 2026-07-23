export type AppId = "browser" | "mail" | "files" | "chat" | "settings" | "helper";

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

export interface PageComment {
  id: string;
  pageUrl: string;
  ownerId: string;
  role: "player" | "owner" | "visitor";
  author: string;
  text: string;
  createdAt: string;
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
}

export interface AmbientCommentRequest {
  personaId: string;
  pageOwnerId: string;
  pageUrl: string;
  pageTitle: string;
  pageSummary: string;
  pageContext: string;
  existingComments: Array<{ role: "player" | "owner" | "visitor"; author: string; text: string }>;
}

export interface AmbientCommentResult {
  text: string;
  author: AiPersonaSummary;
  metrics: AiMetrics;
}

export interface DesktopSettings {
  theme: "classic" | "plum";
  wallpaper: "teal" | "clouds";
  cursor: "arrow" | "star";
}

export interface GuestbookEntry {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export type DirectChannel = "aim" | "email" | "helper";

export interface DirectMessage {
  id: string;
  ownerId: string;
  channel: DirectChannel;
  role: "player" | "owner";
  author: string;
  text: string;
  subject?: string;
  createdAt: string;
  metrics?: AiMetrics;
}

export interface DirectReplyRequest {
  ownerId: string;
  channel: DirectChannel;
  playerMessage: string;
  subject?: string;
  relationshipScore: number;
  recentMessages: Array<{ role: "player" | "owner"; author: string; text: string }>;
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
}

export interface GameState {
  version: number;
  visited: string[];
  bookmarks: string[];
  downloads: DownloadedFile[];
  flags: Record<string, boolean>;
  currentUrl: string;
  settings: DesktopSettings;
  gameTime: string;
  pageComments: PageComment[];
  ambientPostQueue: AmbientPostJob[];
  pageVisitCounts: Record<string, number>;
  guestbookEntries: Record<string, GuestbookEntry[]>;
  directMessages: DirectMessage[];
  relationships: Record<string, number>;
}

export interface PageDefinition {
  url: string;
  title: string;
  site: "directory" | "rainbow" | "signal" | "raven" | "computer" | "pizza" | "pets" | "pulse" | "vanta" | "cubit" | "rocketbox" | "moonmunch" | "toonburst" | "kingcal" | "earl";
  ownerId: string;
  summary: string;
  commentsEnabled?: boolean;
  seedComments?: PageComment[];
  listed?: boolean;
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
      comment: (request: PageCommentRequest) => Promise<PageCommentResult>;
      ambientComment: (request: AmbientCommentRequest) => Promise<AmbientCommentResult>;
      directReply: (request: DirectReplyRequest) => Promise<DirectReplyResult>;
      search: (request: SemanticSearchRequest) => Promise<SemanticSearchResult>;
      reset: () => Promise<AiConversation>;
    };
  }
}
