export type AppId = "browser" | "mail" | "files" | "chat" | "settings";

export type AiPhase = "offline" | "ready" | "loading" | "warming" | "idle" | "generating" | "error";

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
  role: "player" | "owner";
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
  recentComments: Array<{ author: string; text: string }>;
}

export interface PageCommentResult {
  text: string;
  owner: AiPersonaSummary;
  metrics: AiMetrics;
}

export interface DesktopSettings {
  theme: "classic" | "plum";
  wallpaper: "teal" | "clouds";
  cursor: "arrow" | "star";
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
  pageVisitCounts: Record<string, number>;
}

export interface PageDefinition {
  url: string;
  title: string;
  site: "directory" | "rainbow" | "signal" | "raven";
  ownerId: string;
  summary: string;
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
      reset: () => Promise<AiConversation>;
    };
  }
}
