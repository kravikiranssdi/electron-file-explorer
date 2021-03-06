'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var env = require('./vendor/electron_boilerplate/env_config');
var windowStateKeeper = require('./vendor/electron_boilerplate/window_state');

var mainWindow;
var DEBUG = false;

// Preserver of the window size and position between app launches.
var mainWindowState = windowStateKeeper('main', {
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300
});

// You have data from config/env_XXX.json file loaded here in case you need it.
// console.log(env.name);

app.on('ready', function () {

    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: 800,
        height: 600,
        'min-width': 400,
        'min-height': 300
    });

    if (DEBUG) {
        mainWindow.openDevTools();
    }

    if (mainWindowState.isMaximized) {
        mainWindow.maximize();
    }

    mainWindow.loadUrl('file://' + __dirname + '/app.html');

    mainWindow.on('close', function () {
        mainWindowState.saveState(mainWindow);
    });
});

app.on('window-all-closed', function () {
    app.quit();
});
