function backgroundFullscreen() {
    document.body.style.height = `${window.innerHeight}px`;
}

window.onload = backgroundFullscreen;

window.onresize = backgroundFullscreen;