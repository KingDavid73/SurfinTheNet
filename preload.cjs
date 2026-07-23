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
  safeguard: (text) => ipcRenderer.invoke("ai:safeguard-text", text),
  comment: (request) => ipcRenderer.invoke("ai:page-comment", request),
  ambientComment: (request) => ipcRenderer.invoke("ai:ambient-comment", request),
  directReply: (request) => ipcRenderer.invoke("ai:direct-reply", request),
  search: (request) => ipcRenderer.invoke("ai:semantic-search", request),
  reset: () => ipcRenderer.invoke("ai:reset")
});
