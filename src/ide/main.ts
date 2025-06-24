import { app, BrowserWindow } from "electron";
import path from "path"
import { Window } from "./window.js";


app.on('ready', () => 
    Window(app)
)
