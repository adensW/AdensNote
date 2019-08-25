const { Menu, shell } = require('electron')
const event = require('./eventChannel').default
var menuBar = {
  menu: Menu.getApplicationMenu(),
  AdensNote: {
    label: 'AdensNote',
    submenu: [
      {
        label: 'Preferences',
        accelerator: 'Control+,',
        click () {
          //   mainWindow.webContents.send('side:preferences')
        }
      },
      {
        type: 'separator'
      },
      {
        role: 'quit',
        accelerator: 'Control+Q'
      }
    ]
  },
  File: {
    label: 'File',
    submenu: [{
      label: 'New',
      accelerator: 'CommandOrControl+N',
      click () {
        event.emit('nav:new-note')
      }
    },
    {
      label: 'Open',
      accelerator: 'CommandOrControl+o',
      click () {
        event.emit('nav:open-note')
      }
    },
    {
      label: 'Recent',
      // accelerator: 'CommandOrControl+o',
      submenu: [{
        label: 'testNote.json',
        click () {
          event.emit('nav:open-recent', 'testNote.json')
        }
      }]
    }, {
      type: 'separator'
    },
    {
      label: 'Save',
      accelerator: 'CommandOrControl+s',
      click () {
        event.emit('nav:save-note')
      }
    },
    {
      label: 'Save as',
      accelerator: 'CommandOrControl+shift+s',
      click () {
        event.emit('nav:save-as-note')
      }
    },
    {
      label: 'Print',
      accelerator: 'CommandOrControl+p',
      click () {
        event.emit('nav:print-note')
      }
    },
    {
      label: 'Export',
      accelerator: 'CommandOrControl+e',
      click () {
        event.emit('nav:export-note')
      }
    },
    {
      label: 'Publish',
      // accelerator: 'CommandOrControl+e',
      click () {
        event.emit('nav:publish-note')
      }
    }
    ]
  },
  View: {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  Help: {
    label: 'Help',
    submenu: [{
      label: 'official site',
      click () { shell.openExternal('https://note.adens.cn/') }
    }, {
      label: 'changelog',
      click () {
        shell.openExternal('https://note.adens.cn/changelog')
      }
    }, {
      type: 'separator'
    }, {
      label: 'feedback',
      click () {
        shell.openExternal('https://note.adens.cn/feedback')
      }
    },
    {
      label: 'update',
      click () {
        event.emit('nav:check-update')
      }
    }
    ]
  },
  register: function () {
    const template = [this.AdensNote, this.File, this.View, this.Help]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }

}
export default menuBar
