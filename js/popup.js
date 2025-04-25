function backgroundFullscreen() {
    document.body.style.height = `${window.innerHeight}px`;
}

window.onload = backgroundFullscreen;

window.onresize = backgroundFullscreen;




const invisibleButton = document.getElementById('invisiblebtn');
const outputDiv = document.getElementById('output');


invisibleButton.style.backgroundColor = 'transparent';
invisibleButton.style.border = 'none';
invisibleButton.style.color = 'transparent';
invisibleButton.style.cursor = 'pointer'; 
invisibleButton.style.position = 'absolute'; 
invisibleButton.style.left = '1345px'; 
invisibleButton.style.top = '680px'




    document.getElementById('invisiblebtn').addEventListener('click', function() {
        document.getElementById('popupText').textContent = 'That was delicious, you still have one more thing to eat, the fortune cookie, do you want to eat it?'
    })


