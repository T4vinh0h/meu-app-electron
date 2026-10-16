const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'html/JAVASCRIPT/preload.js'),
        nodeIntegration: false,
        contextIsolation: true,
    },
  });

  win.loadFile('html/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
  });

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
  });

ipcMain.on('abrir-sobre', () => {
  const janelaSobre = new BrowserWindow({
    width: 400,
    height: 300,
    title: 'Sobre',
  });
  janelaSobre.loadFile('html/sobre.html');
});

ipcMain.on('abrir-ajuda', () => {
  const janelaAjuda = new BrowserWindow({
    width: 500,
    height: 400,
    title: 'Ajuda',
  });
  janelaAjuda.loadFile('html/ajuda.html');
});

// 
// let mainWindow;

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'html/JAVASCRIPT/preload.js'),
//       nodeIntegration: false,
//       contextIsolation: true,
//     },
//   });

//   mainWindow.loadFile('html/index.html');
// }

// // Alterar os handlers IPC para recarregar na mesma janela
// ipcMain.on('abrir-sobre', () => {
//   mainWindow.loadFile('html/sobre.html');
// });

// ipcMain.on('abrir-ajuda', () => {
//   mainWindow.loadFile('html/ajuda.html');
// });

// // Adicionar um handler para voltar ao index
// ipcMain.on('voltar-home', () => {
//   mainWindow.loadFile('html/index.html');
// });
// // 