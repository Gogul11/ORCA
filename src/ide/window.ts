import { App, BrowserWindow } from "electron";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const Window = (app : App) => {
    const win : BrowserWindow = new BrowserWindow({
        minWidth : 300,
        minHeight : 300,
        show : false
    })

    win.loadURL("http://localhost:5173/")
    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = dirname(__filename);
    // win.loadFile(path.join(__dirname, '../dist-ui/index.html'))
    
    win.once('ready-to-show', () => {
        win.show()
    })

    

    // return win;
}