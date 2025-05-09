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
            debug: true
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
let canSelect2 = true
let selectingOptions = false
let canSelect = true
let selectedOption = 1
let canSelect3 = true
let isTextOnScreen = false
let canSelect4 = true

let stairStartX = -196;
let stairStartY = 159;
let stepWidth = 0.63;
let stepHeight = 0.626;
let stepSpacing = 20;
let stepCount = 16;






export let thePlayer

export let movementDisabled = false
let basementDoorUnlocked = 0
let teleporterButtons = 0

export const option1 = document.getElementById("opt1");
export const option2 = document.getElementById("opt2");
export const option3 = document.getElementById("opt3");
const name = document.getElementById("name");
const textContent = document.getElementById("textContent");
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

    document.getElementById("onscreenText").style.display = "none"; // Hide the dialog box initially
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
this.cameras.main.setZoom(1.5);
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
            platformGroup.add(platform);
        }
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

    if (movementDisabled == false || movementDisabled == undefined) {
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

    if (movementDisabled) {
        this.player.setVelocityX(0);
    }

    const cameraCenterX = this.cameras.main.scrollX + this.cameras.main.width / 2;

    console.log(Math.trunc(this.player.x) + " " + Math.trunc(cameraCenterX))

    if (Math.trunc(this.player.x) == Math.trunc(cameraCenterX)) {
        this.cameras.main.setLerp(0.05, 0.1);
        // console.log(";oseifjlskdrh liqehglc xjrdloksghlkashg;kszhgrl;kdjh")
    }

    if (this.alerts == false || this.alerts == undefined) {
        this.alerts = {};
    }

    function compressInput(thing1, thing2) {
        return thing1 + thing2
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

    playerNearAlert(this.player, this, -430, -100, "alertLeft", () => {
        // selectingOptions = true
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

    



    if (!movementDisabled && canSelect) {
        selectedOption = 4
    }

    function enableDialogBox(hasOptions) {
        if (canSelect4) {
            canSelect4 = false
            document.getElementById("onscreenText").style.display = "flex";
            if (!hasOptions) { // this is basically the opposite?
                option1.classList.remove("highlight", "normal");
                option2.classList.remove("highlight", "normal");
                option3.classList.remove("highlight", "normal");
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
            }
            dialogBoxOptions.style.display = "flex";
            option1.classList.add("highlight", "normal");
            option2.classList.add("highlight", "normal");
            option3.classList.add("highlight", "normal");
            console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
            setTimeout(() => {
                canSelect4 = true
            }, 300);
        }
    }

    function onscreenText(name1, textContent1, selectingoptions1) {
        if (canSelect3) {
            canSelect3 = false
            enableDialogBox(false)
            name.innerHTML = name1 + " : "
            textContent.innerHTML = textContent1
            selectingOptions = selectingoptions1
            movementDisabled = true;

            if (isTextOnScreen) {
                isTextOnScreen = false;
                exitDialog()
                return
            }
            isTextOnScreen = true
            setTimeout(() => {
                canSelect3 = true
            }, 150);
        }
        
    }








    if (!movementDisabled && canSelect) {
        selectedOption = 4
    }

    function selectingOption(upOrDown) {
        if (!selectingOptions) {
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
    }

    function dialogOptions(opt1, opt2, opt3, act1, act2, act3, name1, textContent1) {
        option1.innerHTML = opt1
        option2.innerHTML = opt2
        option3.innerHTML = opt3
        name.innerHTML = name1 + " : "
        textContent.innerHTML = textContent1

        if (!canSelect2) return; // Exit early if canSelect2 is false

        console.log(canSelect2 + " " + selectedOption + "AAAAAAAA");
        console.log("Interacted with target location! aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        enableDialogBox(true)
        movementDisabled = true;
        canSelect2 = false

        if (selectedOption === 1) {
            console.log("Option 1 selected");
            act1()
        } else if (selectedOption === 2) {
            console.log("Option 2 selected");
            act2()
        } else if (selectedOption === 3) {
            console.log("Option 3 selected");
            act3()
        } else if (selectedOption === 4) {
            console.log("Option 4 selected");
        } else {
            console.log("No option selected");
            // exitDialog()
        }
        setTimeout(() => {
            canSelect2 = true
        }, 150);
    }



    if (movementDisabled) {
        if (keyRIGHT.isDown || keyD.isDown) {
            selectingOption(1)
        } else if (keyLEFT.isDown || keyA.isDown) {
            selectingOption(-1)
        }
    }

    function exitDialog() {
        document.getElementById("onscreenText").style.display = "none";
        isTextOnScreen = false;
        movementDisabled = false;
        console.log("Dialog closed");
    }

    if (keyEnter.isDown && movementDisabled) {
        exitDialog()
        // this is the emergency exit
    }



}
// =====================================================================






// TEST THIS












