const { app, BrowserWindow } = require("electron");
const path = require("path");

app.whenReady().then(() => {
  const win = new BrowserWindow({
    fullscreen: true,
    frame: false,
    icon: path.join(__dirname, "icon.ico"),
    webPreferences: {
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(__dirname, "index.html"));

  win.webContents.on("before-input-event", (event, input) => {
    if (input.key === "F11") {
      win.setFullScreen(!win.isFullScreen());
    }
    if (input.key === "Escape") {
      if (win.isFullScreen()) {
        win.setFullScreen(false);
      }
    }
  });
});

app.on("window-all-closed", () => app.quit());
