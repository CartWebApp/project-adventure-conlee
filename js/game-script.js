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
let selectedOption = 1
let canSelect = true
let isInDialog = false
let basementDoorUnlocked = false

const option1 = document.getElementById("opt1");
const option2 = document.getElementById("opt2");
const option3 = document.getElementById("opt3");
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
    this.load.image("lab", "../media/inside-labratory.png");
}
// =====================================================================



// =====================================================================
function create() {
    document.getElementById("onscreenText").style.display = "none"; // Hide the dialog box initially
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.add.image(0, 0, "basement").setScale(2.5);
    this.add.image(2000, 43, "lab").setScale(2.5);
    this.add.image(4000, 0, "teleporter").setScale(2.5);
    this.cursors = this.input.keyboard.createCursorKeys();
    cursors = this.cursors; // make cursors available globally

    this.player = this.physics.add.sprite(-100, 0, "player").setScale(2.2).setBounce(0).setCollideWorldBounds(false).setDepth(2);
    let stairs = this.physics.add.staticGroup();


    function collider(object, scene, x, y, width, height) {
        let collider = scene.physics.add.staticSprite(x, y, "transparent");
        collider.setScale(width, height).refreshBody().setVisible(false);
        scene.physics.add.collider(object, collider); // add collider to the object
        return collider;
    }

    collider(this.player, this, 0, 157, 500, 0.1) //floor
    collider(this.player, this, -300, -155, 10, 0.1) //ceiling
    collider(this.player, this, 110, -85, 21, 0.1) //ceiling lower
    collider(this.player, this, 450, 0, 0.1, 10) //right wall
    collider(this.player, this, -450, 0, 0.1, 10) //left wall


    collider(this.player, this, -430, -36, 2, 0.5) //stair top landing
    this.physics.add.collider(this.player, stairs);

    this.cameras.main.startFollow(this.player, true, 1, 1); //camera
    this.cameras.main.setZoom(1);
    this.cameras.main.setLerp(0.01, 0.1); // Adjust the values for smoother or faster movement


    let stairStartX = -196;  //stairs
    let stairStartY = 159;
    let stepWidth = 0.63;
    let stepHeight = 0.626;
    let stepSpacing = 20;
    let stepCount = 16;

    for (let i = 0; i < stepCount; i++) {
        let stepX = stairStartX - i * stepWidth * stepSpacing;
        let stepY = stairStartY - i * stepHeight * stepSpacing;

        let step = stairs.create(stepX, stepY, null);
        step.setSize(stepWidth, stepHeight);
        step.setVisible(false);
        step.refreshBody();
    }


}
// =====================================================================



// =====================================================================
function update() {

    if (isInDialog == false || isInDialog == undefined) {
        if (cursors.left.isDown || keyA.isDown) {
            this.player.setVelocityX(-160);
            this.player.scaleX = -2.2
            this.player.body.setOffset(20, 0)
        }

        else if (cursors.right.isDown || keyD.isDown) {
            this.player.setVelocityX(160);
            this.player.scaleX = 2.2
            this.player.body.setOffset(0, 0)
        }

        else {
            this.player.setVelocityX(0);
        }

        if (cursors.up.isDown && this.player.body.touching.down || keyW.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-250);
        }
    }

    if (isInDialog) {
        this.player.setVelocityX(0);
        // this.player.body.setOffset(0, 0)
    }

    const cameraCenterX = this.cameras.main.scrollX + this.cameras.main.width / 2;
    console.log(cameraCenterX)
    function teleportPlayer(scene, x, y) {
        scene.cameras.main.setLerp(1, 1); // Adjust the values for smoother or faster movement
        scene.player.x = x
        scene.player.y = y
    }

    if (this.player.x == cameraCenterX) {
        this.cameras.main.setLerp(0.01, 0.1);

    }

    if (this.alerts == false || this.alerts == undefined) {
        this.alerts = {};
    }

    function playerNearAlert(player, scene, x, y, funct) {
        const alertLocation = `${x},${y}`; // Unique key for each alert based on its position

        // Create the alert sprite only if it doesn't already exist
        if (scene.alerts[alertLocation] == false || scene.alerts[alertLocation] == undefined) {
            const alert = scene.add.sprite(x, y, 'alert');
            alert.setScale(4).setDepth(1).setVisible(false);
            scene.alerts[alertLocation] = alert;
        }
        const alert = scene.alerts[alertLocation]; // Get the existing alert sprite
        const playerToTargetLocation = Phaser.Math.Distance.Between(player.x, player.y, x, y);

        if (playerToTargetLocation < 70) {
            // console.log("within range of interactible " + playerToTargetLocation);
            alert.setVisible(true);
            if (cursors.down.isDown || keyS.isDown) {
                console.log("Press Detect! " + playerToTargetLocation);
                funct();
            }
        } else {
            // console.log("not within range of interactible" + playerToTargetLocation);
            alert.setVisible(false);
        }
    }

    playerNearAlert(this.player, this, -430, -100, () => {
        console.log("Interacted with target location!");
        if (basementDoorUnlocked) {
            teleportPlayer(this, 2000, 0) // teleport to lab
            // this.player.x = 2100
            // this.player.y = 0
        }

    });

    playerNearAlert(this.player, this, 2240, 50, () => {
        console.log("Interacted with target location!");
        teleportPlayer(this, 4000, 0) // teleport to basement

    });

    playerNearAlert(this.player, this, 150, 50, () => {
        console.log("Interacted with target location! aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        document.getElementById("onscreenText").style.display = "flex";
        isInDialog = true;
        if (canSelect) {
            if (selectedOption == 1) {
                console.log("Option 1 selected");
                // exitDialog()
            } else if (selectedOption == 2) {
                console.log("Option 2 selected");
                // exitDialog()
            } else if (selectedOption == 3) {
                console.log("Option 3 selected");
                basementDoorUnlocked = true
                exitDialog()
            } else {
                console.log("No option selected");
                // exitDialog()
            }
            setTimeout(() => {
                canSelect = true
            }, 150);
        }
    });

    function selectingOption(upOrDown) {
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

    if (isInDialog) {
        if (cursors.right.isDown || keyD.isDown) {
            selectingOption(1)
        } else if (cursors.left.isDown || keyA.isDown) {
            selectingOption(-1)
        }
    }

    function exitDialog() {
        document.getElementById("onscreenText").style.display = "none";
        isInDialog = false;
        console.log("Dialog closed");
    }

    if (keyEnter.isDown && isInDialog) {
        exitDialog()
        // this is the emergency exit
    }

}
// =====================================================================