SURFIN' THE NET - EXISTING INSTALL UPDATE

This patch updates an existing Windows installation without reinstalling
the local language model and without resetting the current save.

1. Close Surfin' the Net completely.
2. Extract the entire ZIP to a normal folder.
3. Double-click "Apply Update.cmd".
4. Launch the game from the same shortcut as before.

The updater expects the original per-user install location:
  %LOCALAPPDATA%\Programs\SurfinTheNet

It replaces only:
  resources\app.asar
  resources\personas

It does NOT replace:
  resources\models
  the save and chat files stored in AppData

If the updater reports an error, the previous app files are restored.
