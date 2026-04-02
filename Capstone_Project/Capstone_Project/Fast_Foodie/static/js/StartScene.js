// StartScene.js

class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  preload() {
    this.load.setBaseURL("static");
    // Preload screen.
    this.load.setPath("images/");
    this.load.image("start", "start_screen.png");
    // Preload song.
    this.load.setPath("audio/music/");
    this.load.audio("introTheme", "1-introTheme.mp3");
  }

  create() {
    gameState.currentMusic = this.sound.add("introTheme");

    gameState.currentMusic.play({ loop: true });

    // Define the main camera so we can use it for easy midpoints, top, and bottom of view.
    gameState.cam = this.cameras.main;

    // Title screen text.
    this.add
      .image(gameState.cam.midPoint.x, gameState.cam.midPoint.y, "start")
      .setOrigin(0.5)
      .setScale(0.5);

    // Create keyboard keys.
    gameState.keys = {};

    // Enter button.
    gameState.keys.Enter = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER,
    );
  }

  update() {
    // Press Enter to start the game.
    if (Phaser.Input.Keyboard.JustDown(gameState.keys.Enter)) {
      this.scene.stop("StartScene");
      this.scene.start("TutorialScene");
    }
  }
}
