import * as path from "path"
import { window } from "../../main"
import { dialog } from "electron"
import * as fs from "fs"

interface FileConstructor {
    new (nome: string , conteudo: string , salvo: boolean , path: string):FileInterface
}

interface FileInterface {
    setNome(nome:string): void;
    getNome(): string;
    setSalvo(salvo:boolean): void;
    getSalvo(): boolean;
    setConteudo(conteudo:string): void;
    getConteudo(): string;
    setPath(path:string): void;
    getPath(): string;
    writeFile(path:string):void;
    readFile(path:string):string;
    saveFile() : any;
    saveFileAs(): any;
    openFile() : any;
    createFile() : void;
    __repr__() : void;
}

const FileEditor: FileConstructor = class FileEditor implements FileInterface{
    nome:string ; conteudo:string ; salvo:boolean ; path:string
    constructor(nome:string,conteudo:string,salvo:boolean,path:string){
        this.nome = nome;
        this.conteudo = conteudo;
        this.salvo = salvo;
        this.path = path
    }

    async writeFile(path:string){
        fs.writeFile(path,this.conteudo,(error)=>{if(error) throw error;})
    }

    readFile(path:string){
        try{
            return fs.readFileSync(path,'utf8')
        }
        catch(e){
            console.log(e)
            return ""
        }
    }

    async saveFile(){
        try{
            if ( this.salvo ){
                await this.writeFile(this.path)
            }
            else{
                await this.saveFileAs()
            }
        }
        catch(e){
            console.log(e)
        }
    }
    async saveFileAs(){
        let dialogFile = await dialog.showSaveDialog({
            defaultPath:this.path,
        })
        if ( dialogFile.canceled ){ return false }

        try{
            if ( dialogFile.filePath !== undefined ){
                await this.writeFile(dialogFile.filePath)
                this.setNome(path.basename(dialogFile.filePath))
                this.setSalvo(true)
                this.setPath(dialogFile.filePath)
                window.webContents.send('set-file',this)
            }
        }
        catch(e){
            console.log(e)
        }
    }
    async openFile(){
        let dialogFile = await dialog.showOpenDialog({
            defaultPath: this.path
        })
        if ( dialogFile.canceled ){return false}

        this.setNome(path.basename(dialogFile.filePaths[0]))
        this.setPath(dialogFile.filePaths[0])
        this.setConteudo(this.readFile(dialogFile.filePaths[0]))
        this.setSalvo(true)
        
        window.webContents.send("set-file",this)
    }
    async createFile(){
        this.setConteudo("")
        window.webContents.send("set-file",this)
    }

    setNome(nome:string){
        this.nome = nome
    }
    getNome(){
        return this.nome
    }
    setConteudo(conteudo:string){
        this.conteudo = conteudo
    }
    getConteudo(){
        return this.conteudo
    }
    setPath(path:string){
        this.path = path
    }
    getPath(){
        return this.path
    }
    setSalvo(salvo:boolean){
        this.salvo = salvo
    }
    getSalvo(){
        return this.salvo
    }
    __repr__(){
        console.log(`O arquivo ${this.nome} tem o conteudo : ${this.conteudo} e esta salvo em ${this.path}`)
    }
}


export{FileEditor}