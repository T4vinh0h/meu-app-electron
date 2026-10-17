document.getElementById('btnSobre')
.addEventListener('click', () => {
window.electronAPI.abrirSobre();
});

document.getElementById('btnAjuda')
.addEventListener('click', () => {
window.electronAPI.abrirAjuda();
});

document.getElementById('btnCalculadora')
.addEventListener('click', () => {
window.electronAPI.abrirCalculadora();
});