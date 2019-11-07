import { app, BrowserWindow, Tray } from 'electron';

let tray: Tray;

app.on('ready', () => {
  let window: BrowserWindow | null = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    vibrancy: 'light',
    titleBarStyle: 'customButtonsOnHover',
    minimizable: false,
    maximizable: false,
    closable: false, // 不能用常规方法退出，需要在 before-quite 中自行退出 app
    webPreferences: {
      nodeIntegration: true,
      preload: `${__dirname}/preload.js`,
    },
  });

  window.on('closed', () => {
    window = null;
  });

  window.loadURL(`file://${__dirname}/renderer.html`);

  tray = new Tray(`${__public}/iconTemplate@2x.png`);
  tray.on('click', () => {
    if (window) window.show();
  });
});

app.on('before-quit', () => {
  tray.destroy();
  app.exit();
});
