export type AppId = "browser" | "mail" | "files";

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
}

export interface PageDefinition {
  url: string;
  title: string;
  site: "directory" | "rainbow" | "signal";
  render: (state: GameState) => string;
}

declare global {
  interface Window {
    gameAPI?: {
      load: () => Promise<GameState>;
      save: (state: GameState) => Promise<boolean>;
      reset: () => Promise<GameState>;
    };
  }
}
