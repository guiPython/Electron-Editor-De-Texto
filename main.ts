import { app, BrowserWindow , Menu , ipcMain } from 'electron'
import { FileEditor } from "./src/scripts/file"
import path from "path"

let window : BrowserWindow
var file = new FileEditor("newFile.txt","",false,`${app.getPath("documents")}/newFile.txt`)

async function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            nodeIntegration: true
        }
    })

    await window.loadFile(path.resolve(__dirname, "./src/pages/index/index.html"))
    file.createFile()
}

async function createMenu() {
    let menuTemplate: Electron.MenuItemConstructorOptions[] = [
        {
            label: "Arquivo",
            submenu: [
                {
                    label:"Novo",
                    accelerator:"CmdOrCtrl+N",
                    click(){
                        file.createFile()
                    }
                },
                {
                    label:"Abrir",
                    accelerator:"CmdOrCtrl+O",
                    click(){
                        file.openFile()
                    }
                },
                {
                    label:"Salvar",
                    accelerator:"CmdOrCtrl+S",
                    click(){
                        file.saveFile()
                    }
                },
                {
                    label:"Salvar como...",
                    accelerator:"CmdOrCtrl+Shift+S",
                    click(){
                        file.saveFileAs()
                    }
                },
                {   
                    label:"Fechar",
                    accelerator:"CmdOrCtrl+Q",
                    role: process.platform === "darwin" ? 'close' : 'quit'
                },
            ]
        },
        {
            label:"Editar",
            submenu:[
                {
                    label:"Desfazer",
                    role:"undo"
                },
                {
                    label:"Refazer",
                    role:"redo"
                },
                {
                    type:"separator",
                },
                {
                    label:"Copiar",
                    role:"copy"
                },
                {
                    label:"Cortar",
                    role:"cut"
                },
                {
                    label:"Colar",
                    role:"paste"
                },
            ]
        }
]

    let menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
}

app.whenReady().then( async () => 
    {
        createMenu()
        await createWindow()
    }
)

app.on("activate" , async () => {
    if ( BrowserWindow.getAllWindows().length === 0 ){
        await createWindow()
    }
})

app.on("window-all-closed",()=>{
    if ( process.platform === "darwin") app.quit()
})

ipcMain.on("update-content",(event,data)=>{
    file.setConteudo(data)
})

export { window }