'use strict';
const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  openSettingWindow();
  // // Create the browser window.
  // mainWindow = new BrowserWindow({
  //   width: 1200,
  //   height: 700,
  //   // titleBarStyle: 'hidden-inset'
  // });
  // // and load the index.html of the app.
  // mainWindow.loadURL('file://' + __dirname + '/app/index/index.html');
  // // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  // // Emitted when the window is closed.
  // mainWindow.on('closed', function() {
  //   // Dereference the window object, usually you would store windows
  //   // in an array if your app supports multi windows, this is the time
  //   // when you should delete the corresponding element.
  //   mainWindow = null;
  // });
  // let settingWindow = new BrowserWindow({width: 1000, height: 500});
  // settingWindow.loadURL('file://' + __dirname + '/app/setting/index.html');
  // settingWindow.webContents.openDevTools();
  // settingWindow.on('closed', function() {
  //   console.log('setting window closed');
  // });
  // menu
  // const template = [{
  //   label: 'Edit',
  //   submenu: [{
  //     label: '设置',
  //     click() {
  //       const settingWindow = new BrowserWindow({width: 500, height: 500});
  //       settingWindow.loadURL('file://' + __dirname + '/app/setting/index.html');
  //     },
  //   }, {
  //     role: 'reload'
  //   }, {
  //     role: 'toggledevtools'
  //   }, {
  //     role: 'quit'
  //   }]
  // }];
  // const menu = Menu.buildFromTemplate(template);
  // Menu.setApplicationMenu(menu);
});

const setMenu = () => {
  const defaultTemplate = [{
    label: 'Elecnote',
    submenu: [{
      label: '设置',
      click: () => {
        const settingWindow = new BrowserWindow({width: 500, height: 500});
        settingWindow.loadURL('file://' + __dirname + '/app/setting/index.html');
      },
    }],
  }, {
    label: 'Edit',
    submenu: [{
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

var settingWindow = null;
const openSettingWindow = () => {
  settingWindow = new BrowserWindow({width: 600, height: 400});
  settingWindow.loadURL('file://' + __dirname + '/app/setting/index.html');
  // settingWindow.webContents.openDevTools();
  settingWindow.on('closed', function() {
    console.log('setting window closed');
    openIndexWindow();
  });
  setMenu();
}

var indexWindow = null;
const openIndexWindow = () => {
  indexWindow = new BrowserWindow({width: 1000, height: 500});
  indexWindow.loadURL('file://' + __dirname + '/app/index/index.html');
  indexWindow.webContents.openDevTools();
  indexWindow.on('closed', function() {
    console.log('index window closed');
  });
  setMenu();
}
