const { app, BrowserWindow, globalShortcut } = require("electron");
const realDate = {
  buttonX: false,
  buttonC: false
};

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1040,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // and load the index.html of the app.
  win.loadFile("./pages/html/index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
