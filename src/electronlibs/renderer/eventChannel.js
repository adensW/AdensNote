const { ipcRenderer } = require('electron')
function on (name, listener) {
  ipcRenderer.on(name, listener)
}

function off (name, listener) {
  ipcRenderer.removeListener(name, listener)
}

function once (name, listener) {
  ipcRenderer.once(name, listener)
}

function emit (name, ...args) {
  ipcRenderer.send(name, ...args)
}

export default {
  emit,
  on,
  off,
  once
}
