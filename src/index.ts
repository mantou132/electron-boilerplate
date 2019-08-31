import { app, BrowserWindow } from 'electron';

app.on('ready', () => {
  let window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  window.on('closed', () => {
    window = null;
  });

  /**
   * UI 作为 web app 开发
   * 需要使用 electron API 时可以用 BrowserWindow preload 插入适配代码
   */
  window.loadURL('https://github.com');
});
