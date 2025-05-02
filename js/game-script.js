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

// =====================================================================
function preload() {
    this.load.image("basement", "../media/basement.png");
    this.load.image("player", "../media/guy-standingT.png");
    this.load.image("alert", "../media/Alert!.png");
}
// =====================================================================



// =====================================================================
function create() {
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.add.image(0, 0, "basement").setScale(2.5);
    this.cursors = this.input.keyboard.createCursorKeys();
    cursors = this.cursors; // make cursors available globally

    this.player = this.physics.add.sprite(-100, 0, "player").setScale(2.2).setBounce(0).setCollideWorldBounds(false).setDepth(2);
    let stairs = this.physics.add.staticGroup();
    this.targetLocation = this.physics.add.sprite(150, 80, "null").setScale(0.5).setVisible(false).setGravityY(0).setDrag(0, 999); //chinese food alert
    this.alert = this.physics.add.sprite(this.targetLocation.x, this.targetLocation.y + -30, "alert").setScale(4).setDrag(0, 999).setGravityY(0).setVisible(false);

    function collider(object, scene, x, y, width, height) {
        let collider = scene.physics.add.staticSprite(x, y, "transparent");
        collider.setScale(width, height).refreshBody().setVisible(false);
        scene.physics.add.collider(object, collider); // add collider to the object
        return collider;
    }

    collider(this.player, this, 0, 157, 100, 0.1) //floor
    collider(this.player, this, -300, -155, 10, 0.1) //ceiling
    collider(this.player, this, 110, -85, 21, 0.1) //ceiling lower
    collider(this.player, this, 450, 0, 0.1, 10) //right wall
    collider(this.player, this, -450, 0, 0.1, 10) //left wall


    collider(this.player, this, -430, -36, 2, 0.5) //stair top landing
    this.physics.add.collider(this.player, stairs);

    this.cameras.main.startFollow(this.player, true, 1, 1); //camera
    this.cameras.main.setZoom(1);

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

    // checks range
    let playerTotargetLocation = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.targetLocation.x, this.targetLocation.y)

    console.log("--------------------playerTotargetLocation: " + playerTotargetLocation + "--------------------");

    if (playerTotargetLocation < 70) {
        console.log("within range of interactible" + playerTotargetLocation);
        this.alert.setVisible(true);
        if (cursors.down.isDown || keyS.isDown) {
            console.log("PRESSSSSSSSSSSSSSSSSSSSSSSS")
        }
    } else {
        console.log("not within range of interactible" + playerTotargetLocation);
        this.alert.setVisible(false);
    }

}
// =====================================================================