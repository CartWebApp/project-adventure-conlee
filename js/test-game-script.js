
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

// =====================================================================
function preload() {
    this.load.image("background", "../media/background-ig.png");
    this.load.image("floor", "../media/floor-ig.png");
    this.load.image("guy", "../media/guy-standingT.png");
    this.load.image("button", "../media/button-ig.png");
    this.load.image("scientist", "../media/scientist-standing-new.png");
    this.load.image('basement', '../media/basement.png');
    this.load.image('basement-floor', '../media/floor-basement.png');
    this.load.image("alert", "../media/Alert!.png");
    this.load.image('stairs', '../media/stairs.png');
    this.load.image('ground2', '../media/new-line.png');
    this.load.image('food', '../media/Chinese-food.png');
    this.load.image('transparent', '../media/transparent-box.png');

}
// =====================================================================

// =====================================================================
function create() {



    this.add.image(centerScreenW, centerScreenH, "basement").setScale(2.5);

    this.cursors = this.input.keyboard.createCursorKeys();

    const box = this.add.graphics();
    box.fillStyle(0xffffff, 1);
    box.fillRoundedRect(650, 360, 300, 75, 3);

    let text = this.add.text(662, 370, 'buh', {
        fontSize: '15px',
        color: '#000',
        wordWrap: { width: 290 }
    });

    let ground = this.physics.add.staticGroup();
    let stairs = this.physics.add.staticGroup();
    let transparent = this.physics.add.staticGroup();

    ground.create(1070, 664, "basement-floor").setScale(3.2, 2).refreshBody();
    ground.create(593, 465, 'ground2').setScale(2.3).refreshBody();
    let transparentBox = transparent.create(1180, 586, 'transparent').setScale(1.3).refreshBody();

    transparentBox.setInteractive(false);


    let stairStartX = 800;
    let stairStartY = 650;
    let stepWidth = 0.5;
    let stepHeight = 0.5;
    let stepSpacing = 20;
    let stepCount = 18;

    for (let i = 0; i < stepCount; i++) {
        let stepX = stairStartX - i * stepWidth * stepSpacing;   // moves RIGHT
        let stepY = stairStartY - i * stepHeight * stepSpacing;  // moves UP

        let step = stairs.create(stepX, stepY, null);
        step.setSize(stepWidth, stepHeight);
        step.setVisible(false);
        step.refreshBody();
    }

    this.player = this.physics.add.sprite(595, 182, "guy").setScale(2.2).setBounce(0).setCollideWorldBounds(true);
    this.scientist = this.physics.add.sprite(400, 182, "scientist").setScale(2.2).setBounce(0.2).setCollideWorldBounds(true).setDrag(100, 0);

    this.physics.add.collider(this.player, ground);
    this.physics.add.collider(this.scientist, ground)
    this.physics.add.collider(this.player, stairs);

    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(2);
    this.alert = this.physics.add.sprite(this.scientist.x, this.scientist.y + -50, "alert").setScale(4).setDrag(0, 999).setGravityY(0).setVisible(false);
    this.cameras.main.setBackgroundColor("#d5d5d5")
}
// =====================================================================

// =====================================================================
function update() {

    let transparentBox = this.input.keyboard.createCursorKeys();

    if (transparentBox.down.isDown) {
        // Get the transparent box (first child of the 'transparent' group)
        if (transparentBox.left.isDown) {

        }
    }

    this.alert.x = this.scientist.x;
    this.alert.y = this.scientist.y - 64;

    let cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.scaleX = -2.2
        this.player.body.setOffset(20, 0)
    }

    else if (cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.scaleX = 2.2
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
            // text.setText("buhhhhh")
        }
    } else {
        console.log("not within range of scientist" + playerToScientist);
        this.alert.setVisible(false);
    }
    
}


  // this.targetLocation = this.physics.add.sprite(150, 80, "null").setScale(0.5).setVisible(false).setGravityY(0).setDrag(0, 999); //chinese food alert
    // this.alert = this.physics.add.sprite(this.targetLocation.x, this.targetLocation.y + -30, "alert").setScale(4).setDrag(0, 999).setGravityY(0).setVisible(false);

      // // checks range
    // let playerTotargetLocation = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.targetLocation.x, this.targetLocation.y)

    // // console.log("--------------------playerTotargetLocation: " + playerTotargetLocation + "--------------------");

    // if (playerTotargetLocation < 70) {
    //     // console.log("within range of interactible" + playerTotargetLocation);
    //     this.alert.setVisible(true);
    //     if (cursors.down.isDown || keyS.isDown) {
    //         console.log("PRESSSSSSSSSSSSSSSSSSSSSSSS")
    //     }
    // } else {
    //     // console.log("not within range of interactible" + playerTotargetLocation);
    //     this.alert.setVisible(false);
    // }