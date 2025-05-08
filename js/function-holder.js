import { isInDialog, option1, option2, option3, thePlayer } from "./game-script.js";

export function myFunction(data) {
    console.log("Hello from myFunction!", data);
    return data * 2;
  }


export let canSelect = true

export let selectedOption = 1

if (!isInDialog && canSelect) {
  selectedOption = 4
}

export function selectingOption(upOrDown) {
  if (canSelect) {
      canSelect = false
      selectedOption += upOrDown
      if (selectedOption <= 0) {
          selectedOption = 3
      } else if (selectedOption >= 4) {
          selectedOption = 1
      }
      option1.classList.remove("highlight", "normal");
      option2.classList.remove("highlight", "normal");
      option3.classList.remove("highlight", "normal");
      if (selectedOption == 1) {
          option1.classList.toggle("highlight");
          option2.classList.toggle("normal");
          option3.classList.toggle("normal");
          console.log("Option 1 selected");
      } else if (selectedOption == 2) {
          option1.classList.toggle("normal");
          option2.classList.toggle("highlight");
          option3.classList.toggle("normal");
          console.log("Option 2 selected");
      } else if (selectedOption == 3) {
          option1.classList.toggle("normal");
          option2.classList.toggle("normal");
          option3.classList.toggle("highlight");
          console.log("Option 3 selected");
      }
      setTimeout(() => {
          canSelect = true
      }, 150);
  }
  return selectedOption
}


export function teleportPlayer(scene, x, y) {
  scene.cameras.main.setLerp(1, 1); // Adjust the values for smoother or faster movement
  scene.player.x = x
  scene.player.y = y
}

// export function collectionOfColliders() {

// }



