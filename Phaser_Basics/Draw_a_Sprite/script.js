// script.js

function preload() {
    this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/codey.png');
}

function create() {
    this.add.sprite(50, 50, 'codey');
}

const config = {
    type: Phaser.AUTO,
    width: 450,
    height: 600,
    backgroundColor: "#5f2a55",
    scene: {
        create,
        preload
    }
}

const game = new Phaser.Game(config)
