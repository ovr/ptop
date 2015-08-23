var app = require('app'),
    BrowserWindow = require('browser-window'),
    Menu = require('menu');

require('electron-debug')();
require('crash-reporter').start();

var mainWindow = null;
var menu = null;

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 1500,
        height: 800
    });

    mainWindow.loadUrl('file://' + __dirname + '/index.html');
    mainWindow.focus();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    // Dock Menu (Mac)
    if (process.platform === 'darwin') {
        //var dockMenu = Menu.buildFromTemplate([
        //    { label: 'New Window', click: function() { console.log('New Window'); } },
        //    { label: 'New Window with Settings', submenu: [
        //        { label: 'Basic' },
        //        { label: 'Pro'},
        //    ]},
        //    { label: 'New Command...'},
        //]);
        //app.dock.setMenu(dockMenu);
    }

    var template = [
        {
            label: 'Activity Manager',
            submenu: [
                {
                    label: 'About',
                    selector: 'showAboutPanel'
                }
            ]
        }
    ];
    menu = Menu.buildFromTemplate(template);

    if (process.platform === 'darwin') {
        Menu.setApplicationMenu(menu);
    } else {
        mainWindow.setMenu(menu);
    }
});
