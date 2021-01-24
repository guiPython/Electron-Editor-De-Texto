import { ipcRenderer } from "electron"

ipcRenderer.on("set-file", (event, data) => {
    const textArea = ( document.getElementById("text") as HTMLTextAreaElement);
    const title = (document.getElementById("title") as HTMLTitleElement);
    textArea.value = data.conteudo;
    title.innerHTML = `${data.nome} | GuiPython EDITOR`;
})

function handleChangeText(textArea:HTMLTextAreaElement){
    ipcRenderer.send("update-content",textArea.value)
}