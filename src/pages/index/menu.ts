import {
    getCurrentWindow,
    openMenu,
    minimizeWindow,
    unmaximizeWindow,
    maxUnmaxWindow,
    isWindowMaximized,
    closeWindow
} from "../../scripts/menu-functions"

let window : any

window.addEventListener("DOMContentLoaded", () => {

    window.getCurrentWindow = getCurrentWindow;
    window.openMenu = openMenu;
    window.minimizeWindow = minimizeWindow;
    window.unmaximizeWindow = unmaximizeWindow;
    window.maxUnmaxWindow = maxUnmaxWindow;
    window.isWindowMaximized = isWindowMaximized;
    window.closeWindow = closeWindow

    const menuButton = document.getElementById("menu-btn") as HTMLElement;
    const minimizeButton = document.getElementById("minimize-btn") as HTMLElement;
    const maxUnmaxButton = document.getElementById("max-unmax-btn") as HTMLElement;
    const closeButton = document.getElementById("close-btn") as HTMLElement;

    menuButton.addEventListener("click", e => {
        window.openMenu(e.x, e.y);
    });

    minimizeButton.addEventListener("click", e => {
        window.minimizeWindow();
    });

    maxUnmaxButton.addEventListener("click", e => {
        const icon = maxUnmaxButton.querySelector("i.far") as HTMLElement;

        window.maxUnmaxWindow();

        if (window.isWindowMaximized()) {
            icon.classList.remove("fa-square");
            icon.classList.add("fa-clone");
        } else {
            icon.classList.add("fa-square");
            icon.classList.remove("fa-clone");
        }
    });

    closeButton.addEventListener("click", e => {
        window.closeWindow();
    });
});