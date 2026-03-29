// script.js

const gameState = {}

function preload() {
    // load our 'incredible' sound here!
    this.load.audio('incredible', 'https://content.codecademy.com/courses/learn-phaser/incredible.mp3');

    this.load.audio('awesome', 'https://content.codecademy.com/courses/learn-phaser/reallyawesome.mp3');

}

function create() {
    // add our 'incredible' sound to our scene here!
    gameState.incredible = this.sound.add('incredible');

    gameState.awesome = this.sound.add('awesome')

    // Display "Incredible" and "Really, really awesome" buttons
    gameState.incredibleBox = this.add.rectangle(200, 150, 300, 200, 0xdadaaa)
    gameState.awesomeBox = this.add.rectangle(200, 400, 300, 200, 0xaadada)
    gameState.incredibleText = this.add.text(150, 135, "Incredible", { fill: "#222222", font: "20px Times New Roman" })
    gameState.awesomeText = this.add.text(110, 385, "Really, really awesome", { fill: "#222222", font: "20px Times New Roman" })
    gameState.incredibleBox.setInteractive();
    gameState.awesomeBox.setInteractive();

    // add a 'pointerup' handler to incredibleBox here:
    gameState.incredibleBox.on('pointerup', function () {
        gameState.incredible.play();
    })

    gameState.awesomeBox.on('pointerup', function () {
        gameState.awesome.play();
    })
}

const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 600,
    backgroundColor: "#333333",
    scene: {
        preload,
        create
    }
}

const game = new Phaser.Game(config)
