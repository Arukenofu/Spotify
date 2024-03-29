import {app, BrowserWindow, ipcMain, session} from 'electron';
import {join} from 'path';

function createWindow () {
  const mainWindow = new BrowserWindow({
    height: 725,
    minHeight: 725,
    width: 1200,
    minWidth: 1200,
    icon: "C:\\Users\\Admin\\Desktop\\VueElectronTest-master\\src\\main\\logo.png",
    backgroundColor: '#000000',
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: '#000000',
      symbolColor: '#ffffff',
      height: 30,
    },
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  }
  else {
    mainWindow.loadFile(`${app.getAppPath()}/renderer/index.html`);
  }
}

app.whenReady().then(() => {
  createWindow();

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['script-src \'self\'']
      }
    })
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('message', (event, message) => {
  console.log(message);
})