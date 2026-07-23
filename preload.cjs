const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("gameAPI", {
  load: () => ipcRenderer.invoke("save:load"),
  save: (state) => ipcRenderer.invoke("save:write", state),
  reset: () => ipcRenderer.invoke("save:reset")
});
