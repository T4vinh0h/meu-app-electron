const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

let janelaPrincipal = null;
const janelasCalculadora = new Set();

function criarJanelaPrincipal() {
  janelaPrincipal = new BrowserWindow({
    width: 650,
    height: 430,
    minWidth: 380,
    minHeight: 340,
    title: 'Aplicativo Electron',
    webPreferences: {
      // O caminho absoluto permite carregar o preload na janela principal.
      preload: path.join(__dirname, 'html/JAVASCRIPT/preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  janelaPrincipal.loadFile(path.join(__dirname, 'html/index.html'));
  janelaPrincipal.on('closed', () => {
    janelaPrincipal = null;
  });
}

function abrirCalculadora() {
  const janela = new BrowserWindow({
    width: 430,
    height: 530,
    minWidth: 360,
    minHeight: 470,
    title: 'Calculadora',
    webPreferences: {
      preload: path.join(__dirname, 'html/JAVASCRIPT/preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  // Mantém uma referência para cada calculadora enquanto ela estiver aberta.
  janelasCalculadora.add(janela);
  janela.on('closed', () => {
    janelasCalculadora.delete(janela);
  });

  // A calculadora utiliza apenas o DOM e JavaScript, sem precisar de um preload.
  janela.loadFile(path.join(__dirname, 'html/calculadora.html'));
}

function abrirSobre() {
  const janela = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    title: 'Sobre',
    webPreferences: {
      preload: path.join(__dirname, 'html/JAVASCRIPT/preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  janela.loadFile(path.join(__dirname, 'html/sobre.html'));
}

function abrirAjuda() {
  const janela = new BrowserWindow({
    width: 500,
    height: 400,
    minWidth: 300,
    minHeight: 250,
    title: 'Ajuda',
    webPreferences: {
      preload: path.join(__dirname, 'html/JAVASCRIPT/preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  janela.loadFile(path.join(__dirname, 'html/ajuda.html'));
}

app.whenReady().then(() => {
  // Registra o evento uma única vez e aceita pedidos da janela principal.
  ipcMain.on('abrir-calculadora', (event) => {
    if (!janelaPrincipal || event.sender !== janelaPrincipal.webContents) {
      return;
    }

    abrirCalculadora();
  });

  ipcMain.on('abrir-sobre', (event) => {
    if (!janelaPrincipal || event.sender !== janelaPrincipal.webContents) {
      return;
    }

    abrirSobre();
  });

  ipcMain.on('abrir-ajuda', (event) => {
    if (!janelaPrincipal || event.sender !== janelaPrincipal.webContents) {
      return;
    }

    abrirAjuda();
  });

  // Voltar para a janela principal
  ipcMain.on('voltar-home', (event) => {
    const janela = BrowserWindow.fromWebContents(event.sender);
    if (janela && janela !== janelaPrincipal) {
      janela.close();
    }
  });

  criarJanelaPrincipal();

  // Reabre a janela principal ao ativar o aplicativo no macOS.
  app.on('activate', () => {
    if (janelaPrincipal === null) {
      criarJanelaPrincipal();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
