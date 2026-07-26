SURFIN' THE NET - EXISTING INSTALL UPDATE

This patch updates an existing Windows installation without reinstalling
the local language model and without resetting the current save.

1. Close Surfin' the Net completely.
2. Extract the entire ZIP to a normal folder.
3. Double-click "Apply Update.cmd".
4. Select the folder containing "Surfin' the Net.exe".
5. Approve the Windows administrator prompt if the game is installed under
   Program Files.
6. Launch the game from the same shortcut as before.

The updater does not assume an installation location. It suggests a standard
Program Files or older AppData installation when one is found, but you can
select any custom installation folder.

It replaces only:
  resources\app.asar
  resources\personas

It does NOT replace:
  resources\models
  the save and chat files stored in AppData

If the updater reports an error, the previous app files are restored.
