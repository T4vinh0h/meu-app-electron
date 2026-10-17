const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
abrirSobre: () => ipcRenderer.send('abrir-sobre'),
abrirAjuda: () => ipcRenderer.send('abrir-ajuda'),
abrirCalculadora: () => ipcRenderer.send('abrir-calculadora'),
voltarHome: () => ipcRenderer.send('voltar-home')
});