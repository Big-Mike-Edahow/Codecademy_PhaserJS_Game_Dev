// loseScene.js

class LoseScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoseScene" });
  }

  preload() {
    // Preload screen.
    this.load.setBaseURL("static");
    this.load.setPath("images/");
    this.load.image("lose", "lose_screen.png").set;

    // Preload song.
    this.load.setPath("audio/music/");
    this.load.audio("loseTheme", "4-loseTheme.mp3");
  }

  create() {
    // Stop, reassign, and play the new music.
    gameState.currentMusic.stop();
    gameState.currentMusic = this.sound.add("loseTheme");
    gameState.currentMusic.play({ loop: true });

    // Lose screen.
    this.add
      .image(gameState.cam.midPoint.x, gameState.cam.midPoint.y, "lose")
      .setDisplaySize(config.width, config.height);

    // Prompt.
    this.add
      .text(
        gameState.cam.midPoint.x,
        gameState.cam.midPoint.y + 200,
        "Press enter to play again",
        { fontSize: "24px", fill: "#ffffff" },
      )
      .setOrigin(0.5);

    // Define enter key again.
    gameState.keys.Enter = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER,
    );
  }

  update() {
    // Press Enter to start the game.
    if (Phaser.Input.Keyboard.JustDown(gameState.keys.Enter)) {
      this.scene.stop("LoseScene");
      this.scene.start("TutorialScene");
    }
  }
}
