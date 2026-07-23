# Surfin' the Net

A small Electron vertical slice for an old-computer / old-internet exploration game.

## Run it

During normal development, use the live-reloading dev process:

```powershell
npm.cmd install
npm.cmd run dev
```

For a quick production-mode check without creating an installer:

```powershell
npm.cmd run start
```

Installer and executable packaging is intentionally reserved for milestone builds; do not run it after routine tweaks. When a milestone is ready, the command is:

```powershell
npm.cmd run make
```

## What is in the slice

- A draggable fake desktop with a Start menu and taskbar
- Orbit Explorer with history, bookmarks, an address bar, and six local pages
- Two visually distinct fake sites with five content pages between them
- Orbit Mail and My Files apps
- A downloadable clue that becomes a readable file
- Versioned state saved through Electron and restored after restarting
- An end-to-end smoke test (`npm.cmd run test:smoke`)

## Adding content

Fake pages live in `src/pages.ts`. Each page has a fake URL, title, site theme, and render function. The desktop and game-state plumbing lives in `src/main.ts`; visual styling lives in `src/styles.css`.

The renderer never receives unrestricted Node.js access. Save operations go through the narrow API exposed by `preload.cjs`.
