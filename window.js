const { ipcMain, BrowserWindow, Menu } = require('electron');

const setMenu = () => {
  const defaultTemplate = [{
    label: 'Elecnote',
    submenu: [{
      label: '设置',
      click: () => openSettingWindow(),
    }],
  }, {
    label: 'Edit',
    submenu: [{
      role: 'copy',
    }, {
      role: 'paste',
    }, {
      role: 'reload',
    }, {
      role: 'toggledevtools',
    }, {
      role: 'quit',
    }],
  }];
  const menu = Menu.buildFromTemplate(defaultTemplate);
  Menu.setApplicationMenu(menu);
};



let settingWindow = null;
const openSettingWindow = () => {
  settingWindow = new BrowserWindow({width: 600, height: 400});
  settingWindow.loadURL('file://' + __dirname + '/app/setting/index.html');
  // settingWindow.webContents.openDevTools();
  settingWindow.on('closed', function() {
    // console.log('setting window closed');
    openIndexWindow();
  });
  setMenu();
  return settingWindow;
};

let indexWindow = null;
const openIndexWindow = () => {
  indexWindow = new BrowserWindow({width: 1000, height: 500});
  indexWindow.loadURL('file://' + __dirname + '/app/index/index.html');
  // indexWindow.webContents.openDevTools();
  indexWindow.on('closed', function() {
    console.log('index window closed');
  });
  setMenu();
  return indexWindow;
};

const setIpcMain = () => {
  ipcMain.on('show-setting-window', () => {
    openSettingWindow();
  });
};

module.exports = {
  setIpcMain,
  openSettingWindow,
  openIndexWindow,
};
