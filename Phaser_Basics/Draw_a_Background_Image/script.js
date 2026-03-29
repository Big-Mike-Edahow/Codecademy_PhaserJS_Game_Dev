// script.js

function preload() {
    this.load.image('sky', 'https://content.codecademy.com/courses/learn-phaser/sky.jpg')
}

function create() {
    this.add.image(250, 230, 'sky')
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
