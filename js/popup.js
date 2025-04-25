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
invisibleButton.style.top = '680px';



let isHovered = false;

// Detect mouse hover over the button
document.getElementById('invisiblebtn').addEventListener('mouseover', function() {
    isHovered = true; // Set the hover state to true
});

// Detect mouse leaving the button
document.getElementById('invisiblebtn').addEventListener('mouseleave', function() {
    isHovered = false; // Set the hover state to false when mouse leaves
});

// Add a keydown event listener to the document to detect the ArrowDown key
document.addEventListener('keydown', function(event) {
    // Check if the key pressed is ArrowDown and the mouse is hovering over the button
    if (event.key === 'ArrowDown' && isHovered) {
        document.getElementById('popupText').textContent = 'That was delicious, you still have one more thing to eat, the fortune cookie, do you want to eat it?';
    }
});

// Optional: Make the button focusable to trigger the keydown event
document.getElementById('invisiblebtn').setAttribute('tabindex', '0');



