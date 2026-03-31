// StartScene.js

class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  preload() {
    this.load.setBaseURL("static");
    this.load.setPath("images/");
    this.load.image("startScreen", "start_screen.png");
  }

  create() {
    screen = this.add.image(0, 0, "startScreen").setOrigin(0);
    this.input.on("pointerup", () => {
      this.scene.stop("StartScene");
      this.scene.start("GameScene");
    });
  }
}
