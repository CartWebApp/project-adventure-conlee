// import { movementDisabled, option1, option2, option3, thePlayer } from "./game-script.js";

export function myFunction(data) {
    console.log("Hello from myFunction!", data);
    return data * 2;
  }


export let canSelect = true

export let selectedOption = 1





export function teleportPlayer(scene, x, y) {
  scene.cameras.main.setLerp(1, 1); // Adjust the values for smoother or faster movement
  scene.player.x = x
  scene.player.y = y
}

// export function collectionOfColliders() {

// }



