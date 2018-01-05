const {app, BrowserWindow, ipcMain} = require('electron');

const path = require('path')
const url = require('url')
const fs = require('fs');

const utils = require("./utils.js");

require('electron-reload')(__dirname, {
	electron: require('electron')
  });

let mainWindow;

function createWindow () {
	// Create the browser window.
	mainWindow = new BrowserWindow({width: 800, height: 600})

	// and load the index.html of the app.
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}))

	// Open the DevTools.
	mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		mainWindow = null
	})

	//To make sure that mainWindow is set
	utils.setMainWindow(mainWindow);
};

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit()
	}
});

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow()
	}
});

// Handle comands from Renderer
ipcMain.on("load-file", (event, arg) => {
	utils.readAndParseExtended(arg);
});

