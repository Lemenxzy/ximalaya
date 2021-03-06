import { app, BrowserWindow, Menu, shell } from 'electron';
import appMenu from './menu.js';

const path = require('path');

let willQuitApp = false;


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  Menu.setApplicationMenu(appMenu);
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    minWidth: 1100,
    minHeight: 800,
    backgroundColor: '#2e2c29',
    darkTheme: true,
    show: false,
    webPreferences: {
      preload: path.resolve(__dirname, 'browser.js'),
      nodeIntegration: true,
      plugins: true,
    },
    icon: path.join(__dirname, 'src/images/icon/icon.icns'),
  });

  // and load the index.html of the app.
  mainWindow.loadURL('https://www.ximalaya.com');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  mainWindow.on('close', (e) => {
    if (willQuitApp) {
      /* the user tried to quit the app */
      mainWindow = null;
    } else {
      /* the user only tried to close the window */
      e.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    if (url.indexOf('toLoginCallback') > 0) {
      const win = new BrowserWindow({
        webPreferences: {
          preload: path.resolve(__dirname, 'jq.js'),
        },
      });
      win.on('close', () => {
        mainWindow.reload();
      });
      win.loadURL(url);
    } else {
      shell.openExternal(url);
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  willQuitApp = true;
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  // if (mainWindow === null) {
  //   createWindow();
  // }
  mainWindow.show();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
