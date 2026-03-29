// StartScene.js

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  preload() {
    this.load.setBaseURL("static");
    this.load.setPath("images/");
    this.load.image("startScreen", "start_screen.png");
  }

  create() {
    const background = this.add.image(0, 0, "startScreen");
    background.setOrigin(0);
    background.setDisplaySize(480, 560);

    this.input.on("pointerup", () => {
      this.scene.start("GameScene");
      this.scene.stop("StartScene");
    });
  }
}
