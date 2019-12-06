// Modules to control application life and create native browser window
const electron = require('electron')
const {app, BrowserWindow} = electron
const path = require('path')
const Menu =electron.Menu

const isMac = process.platform === 'darwin'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  createWindow()
})

// let template = [
//   {
//     label: 'Menu 1',
//     submenu: [{
//       label: 'Menu items 1'
//     }]
//   },
//   {
//     label: 'Menu 2',
//       submenu: [{
//         label: 'Another Menu item'
//       }, {
//         label: 'One More Menu Item'
//     }]
//   }
// ]

let template = [
  {
    label: 'Edit App',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        lebel: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectAll'
      }]
  }
]


// for addjusting menu structure on macOS
if (process.platform === 'darwin'){
  const name = electron.app.getName()
  template.unshift({
    label: name,
    submenu: [{
      label: 'Quit',
      accelerator: 'Command+Q',
      click: function() {
        app.quit()
      }
    }]
  })
}



// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
