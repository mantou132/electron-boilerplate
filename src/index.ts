import { app, BrowserWindow } from 'electron';

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
      preload: `${process.env.NODE_ENV === 'production' ? process.cwd() : __dirname}/preload/index.js`,
    },
  });

  window.on('closed', () => {
    window = null;
  });

  /**
   * UI 作为 web app 开发
   * 需要使用 electron API 时可以用 BrowserWindow preload 插入适配代码
   */
  window.loadURL('https://xianqiao.wang');
});

app.on('before-quit', () => {
  app.exit();
});
