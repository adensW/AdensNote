const { ipcMain, BrowserWindow } = require('electron')

function on (name, listener) {
  ipcMain.on(name, listener)
}

function off (name, listener) {
  ipcMain.removeListener(name, listener)
}

function once (name, listener) {
  ipcMain.once(name, listener)
}

function emit (name, ...args) {
  const currentWeb = BrowserWindow.getAllWindows().pop().webContents
  currentWeb.send(name, ...args)
}
export default {
  emit,
  on,
  off,
  once
}
