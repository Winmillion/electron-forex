/*jshint esversion: 10 */ 

const { app, BrowserWindow, dialog } = require('electron');

require("electron-reload")(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;


function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    // win.loadFile('index.html')
    win.loadURL(`file://${__dirname}/index.html`);
    win.setProgressBar(0.6);

    // Open the DevTools.
    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

app.on("browser-window-focus", () => {
    let CPUUsage = process.getCPUUsage().percentCPUUsage;
    if (CPUUsage > 1) CPUUsage = 1;
    console.log(CPUUsage);
    win.setProgressBar(CPUUsage);
    console.log(__dirname);

    // load a dialog window :)
    // const response = dialog.showMessageBox(null)
    // console.log(response)

    win.flashFrame(false);

});

app.on("browser-window-blur", () => {
    win.flashFrame(true);
    win.setProgressBar(0.25);

});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
