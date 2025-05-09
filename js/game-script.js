import { myFunction, teleportPlayer } from './function-holder.js';

let centerScreenW = visualViewport.width / 2
let centerScreenH = visualViewport.height / 2

var config = {
    type: Phaser.AUTO,
    width: visualViewport.width,
    height: visualViewport.height,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            // overlapBias: 99,
            debug: false
        },

    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    render: {
        pixelArt: true
    },
    fps: { target: 60, forceSetTimeOut: true }
};

var game = new Phaser.Game(config);

let keyW
let keyA
let keyS
let keyD
let keyEnter
let keyUP
let keyDOWN
let keyLEFT
let keyRIGHT

let inDialogue = false
let dialogBoxIsOnlyText = undefined
// let selectingOptions = false
let selectedOption = 1
// let isTextOnScreen = false
// let currentStoryStage = 0
// let playerName = "unnamed player" // this is the name of the player

let canInteract = false
let canInteract2 = true
// let canInteract3 = true
// let canInteract4 = true
// let canInteract5 = true

let stairStartX = -196;
let stairStartY = 159;
let stepWidth = 0.63;
let stepHeight = 0.626;
let stepSpacing = 20;
let stepCount = 16;






let thePlayer


let basementDoorUnlocked = 0
let teleporterButtons = 0

export const option1 = document.getElementById("opt1");
export const option2 = document.getElementById("opt2");
export const option3 = document.getElementById("opt3");
const name = document.getElementById("name");
const textContent = document.getElementById("textContent");
const dialogBoxBox = document.getElementById("onscreenText");
const dialogBoxOptions = document.getElementById("options");
option1.classList.remove("highlight", "normal");
option2.classList.remove("highlight", "normal");
option3.classList.remove("highlight", "normal");
option1.classList.add("highlight");
option2.classList.add("normal");
option3.classList.add("normal");

// =====================================================================
function preload() {
    this.load.image("teleporter", "../media/inside-portal-machine.png");
    this.load.image("basement", "../media/basement.png");
    this.load.image("player", "../media/guy-standingT.png");
    this.load.image("alert", "../media/Alert!.png");
    this.load.image("alertLeft", "../media/Alert!-left.png");
    this.load.image("alertRight", "../media/Alert!-right.png");
    this.load.image("lab", "../media/inside-labratory.png");
    this.load.image("job", "../media/mine-shaft-1stteleporter.png");
    this.load.image("cave", "../media/cave.png");
    this.load.image("cavetwo", "../media/cave-w-door.png");
    this.load.image("chest", "../media/open-chest.png");
    this.load.image("outside", "../media/outside-new.png");
    this.load.image("prison", "../media/JAIL-SCENE.png");
    this.load.image("blue", "../media/blue-button.png");
    this.load.image("cyan", "../media/cyan-button.png");
    this.load.image("red", "../media/red-button.png");
    this.load.image("pink", "../media/pink-button.png");
    this.load.image("black", "../media/black-button.png");
}
// =====================================================================



// =====================================================================
function create() {
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    dialogBoxBox.style.display = "none"; // Hide the dialog box initially
    this.add.image(0, 0, "basement").setScale(2.5);
    this.add.image(2000, 43, "lab").setScale(2.5);
    this.add.image(4000, 23, "teleporter").setScale(2.5);
    this.add.image(6000, 0, "job").setScale(2.5);
    this.add.image(8000, 40, "cave").setScale(2.5);
    this.add.image(10000, 40, "cavetwo").setScale(2.5);
    this.add.sprite(10110, 141, "chest").setScale(2);
    this.add.image(12000, 85, "outside").setScale(2.5);
    this.add.image(14000, 43, "lab").setScale(2.5);
    this.add.image(16000, 50, "prison").setScale(2.5);
    this.add.image(3834, 101, "blue").setScale(2.6);
    this.add.image(3939, 101, "cyan").setScale(2.6);
    this.add.image(4044, 101, "red").setScale(2.6);
    this.add.image(4149, 101, "pink").setScale(2.6);
    this.add.image(4254, 101, "black").setScale(2.6);
    



    // thePlayer = this.player = this.physics.add.sprite(-423, -88, "player").setScale(2.2).setBounce(0).setCollideWorldBounds(false).setDepth(2);
    // let stairs = this.physics.add.staticGroup();


    this.player = this.physics.add.sprite(-100, 0, "player")
    .setScale(2.2)
    .setBounce(0)
    .setCollideWorldBounds(false)
    .setDepth(2);
    const stairs = this.physics.add.staticGroup();
const platforms = this.physics.add.staticGroup();

// Colliders
this.physics.add.collider(this.player, stairs);
this.physics.add.collider(this.player, platforms); // FIXED — now using correct player

// Camera
this.cameras.main.startFollow(this.player, true, 1, 1);
this.cameras.main.setZoom(2);
this.cameras.main.setLerp(0.05, 0.1);

// Create staircase
createStaircase(this, 10225, 140, 39, 5, 3.5, platforms);

    function collider(object, scene, x, y, width, height) {
        let collider = scene.physics.add.staticSprite(x, y, "transparent");
        collider.setScale(width, height).refreshBody().setVisible(false);
        scene.physics.add.collider(object, collider); // add collider to the object
        return collider;
    }

    for (let i = 0; i < stepCount; i++) {
        let stepX = stairStartX - i * stepWidth * stepSpacing;
        let stepY = stairStartY - i * stepHeight * stepSpacing;

        let step = stairs.create(stepX, stepY, null);
        step.setSize(stepWidth, stepHeight);
        step.setVisible(false);
        step.refreshBody();
    }

//staircase for cave
function createStaircase(scene, startX, startY, steps, stepWidth, stepHeight, platformGroup) {
    for (let i = 0; i < steps; i++) {
        const x = startX + i * stepWidth;
        const y = startY - i * stepHeight;

        // Create a platform at (x, y)
        const platform = scene.physics.add.staticImage(x, y, 'platform');
        
        // Set the platform's alpha to 0 to make it transparent/invisible
        platform.setAlpha(0);

        // Add the platform to the group
        platformGroup.add(platform);
    }

    collider(this.player, this, 0, 160, 10000, 0.1) //floor
    collider(this.player, this, -300, -155, 10, 0.1) //ceiling
    collider(this.player, this, 110, -85, 21, 0.1) //ceiling lower
    collider(this.player, this, 450, 0, 0.1, 10) //right wall (x, y , w, h)
    collider(this.player, this, -450, 0, 0.1, 10) //left wall
    collider(this.player, this, -430, -36, 2, 0.5) //stair top landing

    // for inside lab scene
    collider(this.player, this, 1550, 0, 0, 10)//left wall
    collider(this.player, this, 2450, 0, 0, 10)//right wall
    collider(this.player, this, 2000, -100, 30, 0)//ceiling
    collider(this.player, this, 2250, 110, 0, 3)//wall infront of machine

    //inside of teleporter
    collider(this.player, this, 3550, 0, 0, 10)//left wall
    collider(this.player, this, 4450, 0, 0, 10)//left wall
    collider(this.player, this, 4000, -100, 30, 0)//ceiling
    // collider(this.player, this, 8000, 116, 30, 0);


    //inside cave
    collider(this.player, this, 7550, 0, 0, 10);
    collider(this.player, this, 8450, 0, 0, 10);
    collider(this.player, this, 8000, -100, 30, 0)//ceiling

    //second cave
    collider(this.player, this, 9550, 0, 0, 10);
    collider(this.player, this, 10450, 0, 0, 10);
    collider(this.player, this, 10000, -100, 30, 0)//ceiling

    //outside
    collider(this.player, this, 11550, 0, 0, 10);
    collider(this.player, this, 12450, 0, 0, 10);
    collider(this.player, this, 12000, -50, 30, 0)//ceiling

    // second lab scene
    collider(this.player, this, 13550, 0, 0, 10)//left wall
    collider(this.player, this, 14450, 0, 0, 10)//right wall
    collider(this.player, this, 14000, -100, 30, 0)//ceiling
    collider(this.player, this, 14250, 110, 0, 3)//wall infront of machine

    // jail scene
    collider(this.player, this, 15550, 0, 0, 10)//left wall
    collider(this.player, this, 16450, 0, 0, 10)//right wall
    collider(this.player, this, 16000, -90, 30, 0)//ceiling

}
// =====================================================================



// =====================================================================
function update() {

    // collectionOfColliders()

    if (inDialogue == false || inDialogue == undefined) {
        if (keyLEFT.isDown || keyA.isDown) {
            this.player.setVelocityX(-160);
            this.player.scaleX = -2.2
            this.player.body.setOffset(20, 0)
        }

        else if (keyRIGHT.isDown || keyD.isDown) {
            this.player.setVelocityX(160);
            this.player.scaleX = 2.2
            this.player.body.setOffset(0, 0)
        }

        else {
            this.player.setVelocityX(0);
        }

        if (keyUP.isDown && this.player.body.touching.down || keyW.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-250);
        }
    }

    if (inDialogue) {
        this.player.setVelocityX(0);
    }


    const cameraCenterX = this.cameras.main.scrollX + this.cameras.main.width / 2;
    // console.log(Math.trunc(this.player.x) + " " + Math.trunc(this.player.y) + " " + Math.trunc(cameraCenterX))
    if (Math.trunc(this.player.x) == Math.trunc(cameraCenterX)) {
        this.cameras.main.setLerp(0.05, 0.1);
    }


    if (this.alerts == false || this.alerts == undefined) {
        this.alerts = {};
    }
    function playerNearAlert(player, scene, x, y, alert1, funct) {
        const alertLocation = `${x},${y}`; // Unique key for each alert based on its position
        // Create the alert sprite only if it doesn't already exist
        if (scene.alerts[alertLocation] == false || scene.alerts[alertLocation] == undefined) {
            const alert = scene.add.sprite(x, y, alert1);
            alert.setScale(4).setDepth(1).setVisible(false);
            scene.alerts[alertLocation] = alert;
        }
        const alert = scene.alerts[alertLocation]; // Get the existing alert sprite
        const playerToTargetLocation = Phaser.Math.Distance.Between(player.x, player.y, x, y);
        if (playerToTargetLocation < 70) {
            // console.log("within range of interactible " + playerToTargetLocation);
            alert.setVisible(true);
            if (keyDOWN.isDown || keyS.isDown) {
                console.log("Press Detect! " + playerToTargetLocation);
                funct();
            }
        } else {
            // console.log("not within range of interactible" + playerToTargetLocation);
            alert.setVisible(false);
        }
    }











    // THIS IS THE FIRST INTERACTION
    playerNearAlert(this.player, this, 150, 50, "alert", () => {
        // selectingOptions = true
        // if (currentStoryStage === 0) {
        //     onscreenText(playerName, "oh boy i cant wait to enjoy my chinese food", false);
        //     currentStoryStage += 1
        //     return currentStoryStage
        // }

        // if (currentStoryStage === 1) {
        //     onscreenText(playerName, "dang this tastes good", false);
        // }
        console.log("Detecting Interact")
        // dialogOptions("Get a job", "Complain", "Go to the location", () => compressInput(eval("basementDoorUnlocked = 1"), exitDialog()), () => compressInput(eval("basementDoorUnlocked = 2"), exitDialog()), () => compressInput(eval("basementDoorUnlocked = 3"), exitDialog()), "Narrator", "What are you going to do with the Fortune Cookie?");


        dialogBox("Narrator", "What are you going to do with the Fortune Cookie?", false, 3, "Get a job", "Complain", "Go to the location", () => { basementDoorUnlocked = 1; exitDialog() }, () => { basementDoorUnlocked = 2; exitDialog() }, () => { basementDoorUnlocked = 3; exitDialog() });

        // dialogBox("bucko", "sayin crap", true)
    });

    playerNearAlert(this.player, this, -430, -100, "alertLeft", () => {
        // console.log("Interacted with target location!");
        // if (basementDoorUnlocked == 1) {
        //     teleportPlayer(this, 6000, 0) // teleport to lab
        // } else if (basementDoorUnlocked == 2) {
        //     teleportPlayer(this, 4000, 0) // teleport to lab
        // } else if (basementDoorUnlocked == 3) {
        //     teleportPlayer(this, 2000, 0) // teleport to lab
        // } else {
        //     onscreenText(playerName, "nah i dont wanna go outside right now", false);
        // }
        // console.log(basementDoorUnlocked + " " + basementDoorUnlocked);
    });

    playerNearAlert(this.player, this, 2208, 60, "alertRight", () => {
        // selectingOptions = false
        // console.log("Interacted with target location!");
        // teleportPlayer(this, 4000, 0); // teleport to basement
        // option1.innerHTML = "adasa";
        // option2.innerHTML = null;
        // option3.innerHTML = null;
        // return selectingOptions
    });



    //         if (!canInteract) return
    //         canInteract = false
        console.log("Interacted with target location!");
        if (basementDoorUnlocked == 1) {
            teleportPlayer(this, 2000, 0) // teleport to lab
        } else if (basementDoorUnlocked == 2) {
            teleportPlayer(this, 2000, 0) // teleport to lab
        } else if (basementDoorUnlocked == 3) {
            teleportPlayer(this, 2000, 0) // teleport to lab
        } else {
            onscreenText("player", "nah i dont wanna go outside right now", false);
        }
        // console.log("SELECTIONG OTPNSONS TRYE");
        // return selectingOptions
    });

    playerNearAlert(this.player, this, 2240, 50, "alertLeft", () => {
        console.log("Interacted with target location!");
        teleportPlayer(this, 4000, 23); // basement
    });
    
    playerNearAlert(this.player, this, 150, 50, "alert", () => {
        dialogOptions("Get a job", "Complain", "Go to the location", () => compressInput(eval("basementDoorUnlocked = 1"), exitDialog()), () => compressInput(eval("basementDoorUnlocked = 2"), exitDialog()), () => compressInput(eval("basementDoorUnlocked = 3"), exitDialog()), "Narrator", "What are you going to do with the Fortune Cookie?");
    });
    
    playerNearAlert(this.player, this, 4149, 50, "alertLeft", () => {  // blue button
        console.log("Clicked correct button");  
        teleportPlayer(this, 7900, 0);
    });
    playerNearAlert(this.player, this, 3834, 50, "alertLeft", () => {   // cyan button
        console.log("Clicked incorrect button");
        teleportPlayer(this, -310, -36);
    });
    // playerNearAlert(this.player, this, 3944, 50, "alertLeft", () => {  // red button
    //     console.log("Clicked incorrect button");
    //     teleportPlayer(this, -310, -36);
    // });
    // playerNearAlert(this.player, this, 4049, 50, "alertLeft", () => {  // pink button
    //     console.log("Clicked incorrect button");
    //         teleportPlayer(this, -310, -36);
    // });
    // playerNearAlert(this.player, this, 4254, 50, "alertLeft", () => { // black button
    //     console.log("Clicked incorrect button");
    //         teleportPlayer(this, -310, -36);
    // });

    // playerNearAlert(this.player, this, 8435, 50, "alertLeft", () => { // teleport from 1st cave to second
    //     console.log("Going to next cave");
    //         teleportPlayer(this, 9557, 0);
    // });
    
    
    playerNearAlert(this.player, this, 8410, 50, "alertRight", () => {   //teleport from 1st cave to 2nd cave
        console.log("Going to next part of the cave");
        teleportPlayer(this, 9570, 40);
    });
    playerNearAlert(this.player, this, 10110, 100, "alertRight", () => {   //open box
        console.log("Box Opened");
        //have a message that says "what the heck the blusotnium was supposed to be in here but it isn't, there is a key though"
        //this is where the character change from human to inside of a car
    });
    playerNearAlert(this.player, this, 10440, -100, "alertRight", () => {   //exit door
        console.log("Traveling outside the cave");
        teleportPlayer(this, 11550, 0);
    });

    playerNearAlert(this.player, this, 10440, -100, "alertRight", () => {   //outside to jail or lab
        console.log("Traveling outside the cave");
        teleportPlayer(this, 11550, 0);
    });

    playerNearAlert(this.player, this, 12440, 60, "alertRight", () => {   //outside to lab
        console.log("Traveling outside the cave");
        teleportPlayer(this, 13560, 0);
    });

    








    //         setTimeout(() => {
    //             canInteract = true
    //         }, 150);




    function dialogBox(speaker = "undefined", speakerText = "no text defined", justText = false, questionAmount = 3, opt1 = "option 1", opt2 = "option 2", opt3 = "option 3", func1 = eval("console.log('option 1'); exitDialog()"), func2 = eval("console.log('option 2'); exitDialog()"), func3 = eval("console.log('option 3'); exitDialog()")) {
        inDialogue = true;
        console.log("dialogBox called", { speaker, speakerText, justText, questionAmount, opt1, opt2, opt3 });
        dialogBoxOptions.style.display = "none";
        dialogBoxBox.style.display = "flex";
        name.innerHTML = speaker + " : "
        textContent.innerHTML = speakerText

        if (!justText) {
            if (!canInteract2) return
            canInteract2 = false
            dialogBoxIsOnlyText = false
            dialogBoxOptions.style.display = "flex";
            if (questionAmount == 3) {
                console.log("1111111111111111111111")
                option1.innerHTML = opt1
                option2.innerHTML = opt2
                option3.innerHTML = opt3
                if (selectedOption == 1) {
                    option1.classList.toggle("highlight");
                    option2.classList.toggle("normal");
                    option3.classList.toggle("normal");
                } else if (selectedOption == 2) {
                    option1.classList.toggle("normal");
                    option2.classList.toggle("highlight");
                    option3.classList.toggle("normal");
                } else if (selectedOption == 3) {
                    option1.classList.toggle("normal");
                    option2.classList.toggle("normal");
                    option3.classList.toggle("highlight");
                }
            } else if (questionAmount == 2) {
                console.log("2222222222222222222222")

                option1.innerHTML = opt1
                option2.innerHTML = opt2
                option3.style.display = "none"
                if (selectedOption == 1) {
                    option1.classList.toggle("highlight");
                    option2.classList.toggle("normal");
                    // option3.classList.toggle("normal");
                } else if (selectedOption == 2) {
                    option1.classList.toggle("normal");
                    option2.classList.toggle("highlight");
                    // option3.classList.toggle("normal");
                }
                // else if (selectedOption == 3) {
                //     option1.classList.toggle("normal");
                //     option2.classList.toggle("normal");
                //     option3.classList.toggle("highlight");
                // }
            } else if (questionAmount == 1) {
                console.log("3333333333333333333333333333")

                option1.innerHTML = opt1
                option2.style.display = "none"
                option3.style.display = "none"
                if (selectedOption == 1) {
                    option1.classList.toggle("highlight");
                    // option2.classList.toggle("normal");
                    // option3.classList.toggle("normal");
                }
                // else if (selectedOption == 2) {
                //     option1.classList.toggle("normal");
                //     option2.classList.toggle("highlight");
                //     option3.classList.toggle("normal");
                // } else if (selectedOption == 3) {
                //     option1.classList.toggle("normal");
                //     option2.classList.toggle("normal");
                //     option3.classList.toggle("highlight");
                // }
            }
            setTimeout(() => {
                canInteract2 = true
            }, 1000);
            return dialogBoxIsOnlyText
        }
        dialogBoxIsOnlyText = true
        return dialogBoxIsOnlyText
    }



    function exitDialog() {
        dialogBoxOptions.style.display = "none";
        dialogBoxBox.style.display = "none";
        inDialogue = false;
        return selectedOption = 4
    }



    if (inDialogue) {
        if (keyEnter.isDown) {
            console.log("Emergency exit pressed");
            exitDialog()
            return
        }
        if (keyLEFT.isDown || keyA.isDown) {
            selectedOption -= 1
            if (selectedOption <= 0) {
                selectedOption = 3
            }
            console.log("left pressed")
            return selectedOption
        } else if (keyRIGHT.isDown || keyD.isDown) {
            selectedOption += 1
            if (selectedOption >= 4) {
                selectedOption = 1
            }
            console.log("right pressed")
            return selectedOption
        }
        if (!canInteract) {
            if ((keyDOWN.isDown || keyS.isDown) && dialogBoxIsOnlyText) {
                console.log("canInteract is false");
                canInteract = true;
                exitDialog();
            }
            setTimeout(() => {
                canInteract = false;
            }, 150);
        }
    }





    // function compressInput(thing1, thing2) {
    //     return thing1 + thing2
    // }

    // if (!inDialogue && cadaanS 

    // function enableDialogBox(hasOptions) {
    //     console.log("enableDialogBox called", { canInteract4, hasOptions });

    //     if (canInteract4) {
    //         canInteract4 = false
    //         document.getElementById("onscreenText").style.display = "flex";
    //         if (hasOptions) { // this is basically the opposite?
    //             option1.classList.add("highlight", "normal");
    //             option2.classList.add("highlight", "normal");
    //             option3.classList.add("highlight", "normal");
    //             dialogBoxOptions.style.display = "flex";

    //             console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
    //             return
    //         }
    //         // dialogBoxOptions.style.display = "flex";
    //         option1.classList.remove("highlight", "normal");
    //         option2.classList.remove("highlight", "normal");
    //         option3.classList.remove("highlight", "normal");
    //         dialogBoxOptions.style.display = "none";
    //         console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    //         setTimeout(() => {
    //             canInteract4 = true
    //         }, 150);
    //     }
    // }

    // function onscreenText(name1, textContent1, selectingoptions1) {
    //     if (!canInteract3) return
    //     canInteract3 = false
    //     enableDialogBox(false)
    //     name.innerHTML = name1 + " : "
    //     textContent.innerHTML = textContent1
    //     selectingOptions = selectingoptions1
    //     inDialogue = true;

    //     if (isTextOnScreen) {
    //         isTextOnScreen = false;
    //         exitDialog()
    //         return
    //     }
    //     isTextOnScreen = true
    //     setTimeout(() => {
    //         canInteract3 = true
    //     }, 150);
    // }



    // if (!canInteract2) return; // Exit early if canInteract2 is false
    // canInteract2 = false
    // setTimeout(() => {
    //     canInteract2 = true
    // }, 150);



    // if (!inDialogue && canInteract) {
    //     selectedOption = 4
    // }

    // function selectingOption(upOrDown) {
    //     console.log("1111111111111111111111111111111")
    //     if (selectingOptions) {
    //         console.log("222222222222222222222222222222222222")

    //         if (!canInteract) return
    //         canInteract = false
    //         selectedOption += upOrDown
    //         console.log("33333333333333333333333333333333333333")

    //         if (selectedOption <= 0) {
    //             selectedOption = 3
    //         } else if (selectedOption >= 4) {
    //             selectedOption = 1
    //         }
    //         console.log("4444444444444444444444444444444444444444")

    //         console.log("selectedOption: " + selectedOption);
    //         option1.classList.remove("highlight", "normal");
    //         option2.classList.remove("highlight", "normal");
    //         option3.classList.remove("highlight", "normal");
    //         console.log("555555555555555555555555555555555555555555555555555")

    //         if (selectedOption == 1) {
    //             option1.classList.toggle("highlight");
    //             option2.classList.toggle("normal");
    //             option3.classList.toggle("normal");
    //             console.log("Option 1 selected");
    //         } else if (selectedOption == 2) {
    //             option1.classList.toggle("normal");
    //             option2.classList.toggle("highlight");
    //             option3.classList.toggle("normal");
    //             console.log("Option 2 selected");
    //         } else if (selectedOption == 3) {
    //             option1.classList.toggle("normal");
    //             option2.classList.toggle("normal");
    //             option3.classList.toggle("highlight");
    //             console.log("Option 3 selected");
    //         }
    //         console.log("66666666666666666666666666666666666666")

    //         setTimeout(() => {
    //             canInteract = true
    //         }, 150);

    //         return selectedOption
    //     }
    // }

    // function dialogOptions(opt1, opt2, opt3, act1, act2, act3, name1, textContent1) {
    //     option1.innerHTML = opt1
    //     option2.innerHTML = opt2
    //     option3.innerHTML = opt3
    //     name.innerHTML = name1 + " : "
    //     textContent.innerHTML = textContent1

    //     if (!canInteract2) return; // Exit early if canInteract2 is false

    //     console.log(canInteract2 + " " + selectedOption + " SUPERDUPER");
    //     console.log("Interacted with target location! aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    //     enableDialogBox(true)
    //     inDialogue = true;
    //     canInteract2 = false

    //     if (selectedOption === 1) {
    //         console.log("Option 1 selected");
    //         act1()

    //     } else if (selectedOption === 2) {
    //         console.log("Option 2 selected");
    //         act2()
    //     } else if (selectedOption === 3) {
    //         console.log("Option 3 selected");
    //         act3()
    //     } else if (selectedOption === 4) {
    //         console.log("Option 4 selected");
    //     } else {
    //         console.log("No option selected");
    //         // exitDialog()
    //     }
    //     setTimeout(() => {
    //         canInteract2 = true
    //     }, 150);
    // }



    // if (inDialogue) {
    //     if (keyRIGHT.isDown || keyD.isDown) {
    //         selectingOption(1)
    //         console.log("right pressed")
    //     } else if (keyLEFT.isDown || keyA.isDown) {
    //         selectingOption(-1)
    //         console.log("left pressed")
    //     }
    // }

    // function exitDialog() {
    //     document.getElementById("onscreenText").style.display = "none";
    //     isTextOnScreen = false;
    //     inDialogue = false;
    //     console.log("Dialog closed");
    // }

    // if (keyEnter.isDown && inDialogue) {
    //     exitDialog()
    //     // this is the emergency exit
    // }



}
// =====================================================================

