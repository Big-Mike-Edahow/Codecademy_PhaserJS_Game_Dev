// WinScene.js

class WinScene extends Phaser.Scene {
  constructor() {
    super({ key: "WinScene" });
  }

  preload() {
    this.load.setBaseURL("static");
    // Preload screen.
    this.load.setPath("images/");
    this.load.image("win", "win_screen.png");

    // Preload song.
    this.load.setPath("audio/music/");
    this.load.audio("winTheme", "3-winTheme.mp3");
  }

  create() {
    // Stop, reassign, and play the new music.
    gameState.currentMusic.stop();
    gameState.currentMusic = this.sound.add("winTheme");
    gameState.currentMusic.play({ loop: true });

    // Win screen text.
    this.add
      .image(gameState.cam.midPoint.x, gameState.cam.midPoint.y, "win")
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
      this.scene.stop("WinScene");
      this.scene.start("TutorialScene");
    }
  }
}
