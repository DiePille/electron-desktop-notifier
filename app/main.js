//if (require('electron-squirrel-startup')) return;

const {app, BrowserWindow, Tray, Menu} = require('electron');
const path = require('path');

const ipcMain = require('electron').ipcMain;

const iconPath = path.join(__dirname, 'icon32.png');

const test = require('electron-squirrel-startup');

let mainWindow;
let tray;

//if (require('electron-squirrel-startup')) return;

app.on('ready', function() {

  tray = new Tray(iconPath);

  ipcMain.on('showBalloon', function(event, arg) {
     tray.displayBalloon({
       icon: iconPath,
       title:''+arg[0].title+'',
       content:''+arg[0].body+''
     });
  });

  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'Beenden',
      click: function() {
        app.quit()
      }
    }
  ]);

  tray.setToolTip('DesktopNotifier is running');
  tray.setContextMenu(contextMenu);

  mainWindow = new BrowserWindow({width: 800, height: 600, frame: true, autoHideMenuBar: true, resizable: false, icon: iconPath});
  mainWindow.loadURL('file://' + __dirname + '/window.html');

  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  });
  mainWindow.on('show', () => {
    //
  });
  mainWindow.on('hide', () => {
    //mainWindow.setHighlightMode('never')
  });


});

app.on('window-all-closed', () => {
  app.quit()
});
