import { remote , ipcRenderer } from "electron"


function getCurrentWindow():Electron.BrowserWindow{
    return remote.getCurrentWindow()
}

function openMenu(x:number,y:number):void{
    ipcRenderer.send('display-app-menu',{x,y})
}

function minimizeWindow( browserWindow : Electron.BrowserWindow = getCurrentWindow() ):void{
    if ( browserWindow.minimizable ){
        browserWindow.minimize()
    }
}

function maximizeWindow( browserWindow : Electron.BrowserWindow = getCurrentWindow() ):void{
    if ( browserWindow.maximizable ){
        browserWindow.maximize()
    }
}

function unmaximizeWindow( browserWindow : Electron.BrowserWindow = getCurrentWindow() ):void{
        browserWindow.unmaximize()
}

function maxUnmaxWindow( browserWindow : Electron.BrowserWindow = getCurrentWindow() ):void{
    if ( browserWindow.isMaximized() ){
        browserWindow.unmaximize()
    }else{
        browserWindow.maximize()
    }
}

function closeWindow( browserWindow : Electron.BrowserWindow = getCurrentWindow() ):void{
    browserWindow.close()
}

function isWindowMaximized( browserWindow : Electron.BrowserWindow = getCurrentWindow() ):boolean{
    return browserWindow.isMaximized()
}

export{
    getCurrentWindow,
    openMenu,
    minimizeWindow,
    maximizeWindow,
    unmaximizeWindow,
    maxUnmaxWindow,
    isWindowMaximized,
    closeWindow
}