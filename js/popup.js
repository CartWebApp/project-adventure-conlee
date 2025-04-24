function backgroundFullscreen() {
    document.body.style.height = `${window.innerHeight}px`;
}

window.onload = backgroundFullscreen;

window.onresize = backgroundFullscreen;


preload()

let button = this.add.image(100, 100, 'button').setScale(2).setInteractuve