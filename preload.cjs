const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("gameAPI", {
  load: () => ipcRenderer.invoke("save:load"),
  save: (state) => ipcRenderer.invoke("save:write", state),
  reset: () => ipcRenderer.invoke("save:reset")
});

contextBridge.exposeInMainWorld("aiAPI", {
  status: () => ipcRenderer.invoke("ai:status"),
  preload: () => ipcRenderer.invoke("ai:preload"),
  conversation: () => ipcRenderer.invoke("ai:conversation"),
  send: (message) => ipcRenderer.invoke("ai:send", message),
  comment: (request) => ipcRenderer.invoke("ai:page-comment", request),
  directReply: (request) => ipcRenderer.invoke("ai:direct-reply", request),
  reset: () => ipcRenderer.invoke("ai:reset")
});
