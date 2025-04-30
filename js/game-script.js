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
    this.load.image("basement", "../media/basement.png");
    this.load.image("player", "../media/guy-standingT.png");
    this.load.image("alert", "../media/Alert!.png");
}
// =====================================================================

function createCollider(scene, x, y, width, height) {
    const collider = scene.physics.add.staticSprite(x, y, "transparent");
    collider.setScale(width, height).refreshBody().setVisible(false);
    return collider;
}

// Example usage in your scene's create method:
this.physics.add.collider(
    this.player,
    createCollider(this, 100, 665, 100, 0.1) // floor
);



// =====================================================================
function create() {

    this.add.image(centerScreenW, centerScreenH, "basement").setScale(2.5);
    this.cursors = this.input.keyboard.createCursorKeys();
    cursors = this.cursors; // make cursors available globally

    this.player = this.physics.add.sprite(450, 450, "player").setScale(2.2).setBounce(0).setCollideWorldBounds(false);
    let stairs = this.physics.add.staticGroup();
    this.chineseFood = this.physics.add.sprite(590, 600, "alert").setScale(2.5).setVisible(false).setGravityY(0).setDrag(0, 999); //chinese food alert
    this.alert = this.physics.add.sprite(this.chineseFood.x, this.chineseFood.y + -30, "alert").setScale(4).setDrag(0, 999).setGravityY(0).setVisible(false);

    function collider(object, scene, x, y, width, height) {
        let collider = scene.physics.add.staticSprite(x, y, "transparent");
        collider.setScale(width, height).refreshBody().setVisible(false);
        scene.physics.add.collider(object, collider); // add collider to the object
        return collider;
    }

    collider(this.player, this, 100, 665, 100, 0.1)
    collider(this.player, this, 100, 350, 10, 0.1) //ceiling
    collider(this.player, this, 550, 420, 21, 0.1) //ceiling lower
    collider(this.player, this, 890, 500, 0.1, 10) //right wall
    collider(this.player, this, -10, 500, 0.1, 10) //left wall


    collider(this.player, this, 0, 470, 2, 0.5)
    this.physics.add.collider(this.player, stairs);

    this.cameras.main.startFollow(this.player, true, 0.1, 0.1); //camera
    this.cameras.main.setZoom(1);

    // let graphics = this.add.graphics(1);
    // graphics.fillStyle(0x000000, 0.5); 
    // graphics.fillRect(x, y, width, height);

    let stairStartX = 245;  //stairs
    let stairStartY = 666;
    let stepWidth = 0.645;
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
        this.player.setVelocityY(-250);
    }

    // checks range
    let playerToChineseFood = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.chineseFood.x, this.chineseFood.y)

    console.log("--------------------playerToChineseFood: " + playerToChineseFood + "--------------------");

    if (playerToChineseFood < 70) {
        console.log("within range of scientist" + playerToChineseFood);
        this.alert.setVisible(true);
        if (cursors.down.isDown) {
            console.log("PRESSSSSSSSSSSSSSSSSSSSSSSS")
        }
    } else {
        console.log("not within range of scientist" + playerToChineseFood);
        this.alert.setVisible(false);
    }

}
// =====================================================================