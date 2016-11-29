'use strict';

const path = require('path');
const { app } = require('electron');
const { setIpcMain, openIndexWindow, openSettingWindow } = require('./window');

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  setIpcMain();
  openIndexWindow();
});
