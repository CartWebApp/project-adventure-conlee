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

// =====================================================================
function preload() {
    this.load.image("background", "../media/background-ig.png")
    this.load.image("floor", "../media/floor-ig.png")
    this.load.image("guy", "../media/guy-standingT.png")
    this.load.image("button", "../media/button-ig.png")
    this.load.image("scientist", "../media/scientist-standing-new.png")
    this.load.image('basement', '../media/basement.png');
    this.load.image('basement-floor', '../media/floor-basement.png')
    this.load.image("alert", "../media/Alert!.png")
    this.load.image('stairs', '../media/stairs.png')
    this.load.image('ground2', '../media/new-line.png')
    this.load.image('food', '../media/Chinese-food.png')

}
// =====================================================================

// =====================================================================
function create() {


    this.add.image(centerScreenW, centerScreenH, "basement").setScale(2.5);

    this.cursors = this.input.keyboard.createCursorKeys();


    const box = this.add.graphics();
    box.fillStyle(0xffffff, 1);
    box.fillRoundedRect(280, 200, 300, 65, 5); // x, y, width, height, radius

    const text = this.add.text(290, 210, 'Welcome to your room in the basement, go to the table and interact with your Chinese food', {
        fontSize: '15px',
        color: '#000',
        wordWrap: { width: 290 } // set max width of the textbox
    });



    let ground = this.physics.add.staticGroup();
    let stairs = this.physics.add.staticGroup();
    let food = this.physics.add.staticGroup();

    ground.create(685, 481, "basement-floor").setScale(3.5, 2).refreshBody();
    ground.create(249, 282, 'ground2').setScale(2.3).refreshBody();
    food.create(835, 403, 'food').setScale(2.5).refreshBody()
    let stairStartX = 445; // base X position (left side of slope)
    let stairStartY = 459; // base Y position (bottom of slope)
    let stepWidth = 0.5;
    let stepHeight = 0.5;
    let stepSpacing = 20;
    let stepCount = 17;

    for (let i = 0; i < stepCount; i++) {
        let stepX = stairStartX - i * stepWidth * stepSpacing;   // moves RIGHT
        let stepY = stairStartY - i * stepHeight * stepSpacing;  // moves UP

        let step = stairs.create(stepX, stepY, null);
        step.setSize(stepWidth, stepHeight);
        step.setVisible(false);
        step.refreshBody();
    }




    
    // ground.create(600, 400, "basement-floor").setScale(5, 2).refreshBody();
    // ground.create(100, visualViewport.height, "floor").setScale(20, 2).refreshBody();
    this.player = this.physics.add.sprite(245, 182, "guy").setScale(2.1).setBounce(0).setCollideWorldBounds(true);
    this.scientist = this.physics.add.sprite(300, 400, "scientist").setScale(2).setBounce(0.2).setCollideWorldBounds(true).setDrag(100, 0);
    // this.scientistTalkTrigger = this.physics.add.sprite(100, 100, null).setScale(3, 2).setBounce(0.2).setCollideWorldBounds(true).setDrag(0, 999).setGravityY(0).setVisible(false);
    this.physics.add.collider(this.player, ground);
    this.physics.add.collider(this.scientist, ground)
    this.physics.add.collider(this.player, stairs);
    this.physics.add.collider(this.player, food);
    // this.physics.add.overlap(this.player, this.scientistTalkTrigger, onScientistTalkTriggerOverlap, null, this);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(2);
    this.alert = this.physics.add.sprite(this.scientist.x, this.scientist.y + -50, "alert").setScale(4).setDrag(0, 999).setGravityY(0).setVisible(false);
    this.foodTextOptions = [
        "Mmm... Chinese food smells amazing.",
        "Looks like leftovers from yesterday.",
        "You're not even sure what this is.",
        "It's cold now... maybe microwave it?"
    ];
    this.foodTextIndex = 0;
    this.playerNearFood = false;

    // let overlapping = false;

    // function onScientistTalkTriggerOverlap() {
    //     console.log("Player collided");
    //     if (overlapping == false) {
    //         overlapping = true;
    //         console.log("Scientist overlapped");
    //         return overlapping;
    //     }
    // }

    // function onScientistTalkTriggerExit() {
    //     if (overlapping == true) {
    //         console.log("Player exited");
    //         overlapping = false;
    //     }
    // }


    let buttonReset = this.add.image(100, 100, "button").setScale(3, 4).setInteractive();
    buttonReset.on('pointerdown', () => {
        console.log("Button clicked!");
        this.scene.restart()
    });








}
// =====================================================================

// =====================================================================
function update() {


    // this.scientistTalkTrigger.x = this.scientist.x;
    // this.scientistTalkTrigger.y = this.scientist.y;

    this.alert.x = this.scientist.x;
    this.alert.y = this.scientist.y - 58;

    let cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.scaleX = -2
        this.player.body.setOffset(20, 0)
    }

    else if (cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.scaleX = 2
        this.player.body.setOffset(0, 0)
    }

    else {
        this.player.setVelocityX(0);
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-400);
    }

    let playerToScientist = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.scientist.x, this.scientist.y)

    console.log("--------------------playerToScientist: " + playerToScientist + "--------------------");

    if (playerToScientist < 70) {
        console.log("within range of scientist" + playerToScientist);
        this.alert.setVisible(true);
        if (cursors.down.isDown) {
            console.log("PRESSSSSSSSSSSSSSSSSSSSSSSS")
        }
    } else {
        console.log("not within range of scientist" + playerToScientist);
        this.alert.setVisible(false);
    }




}