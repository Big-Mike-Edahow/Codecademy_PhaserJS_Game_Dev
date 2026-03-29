// StartScene.js

class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: "StartScene",
    });
  }

  preload() {
    this.load.setBaseURL("static");
    this.load.setPath("images/");
    this.load.spritesheet("startScreen", "start_screen.png", {
      frameWidth: 480,
      frameHeight: 640,
    });
  }

  create() {
    // Adds in the background image.
    this.add.sprite(240, 320, "startScreen");

    // Transition from StartScene to GameScene on a click.
    this.input.on("pointerup", () => {
      this.scene.stop("StartScene");
      this.scene.start("GameScene");
    });
  }
}
