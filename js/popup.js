function backgroundFullscreen() {
    document.body.style.height = `${window.innerHeight}px`;
}

window.onload = backgroundFullscreen;

window.onresize = backgroundFullscreen;




const invisibleButton = document.getElementById('invisiblebtn');
const outputDiv = document.getElementById('output');

// Make the button invisible
invisibleButton.style.backgroundColor = 'transparent';
invisibleButton.style.border = 'none';
invisibleButton.style.color = 'transparent'; // If the button has text
invisibleButton.style.cursor = 'pointer'; // Good for indicating interactivity
invisibleButton.style.position = 'absolute'; // Or 'fixed' depending on your layout
invisibleButton.style.left = '1345px'; // Adjust the value as needed
invisibleButton.style.top = '680px'



