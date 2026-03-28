// StartScene.js

export default  class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  preload() {
    this.load.setBaseURL("static");
    this.load.setPath("images/");
    this.load.image("start", "start_screen.png");
  }

  create() {
    const screen = this.add.image(0, 0, "start").setDisplaySize(480, 560).setOrigin(0);

    // on keypress any, transition to GameScene
    this.input.keyboard.on("keydown", () => {
      this.scene.stop("StartScene");
      this.scene.start("GameScene");
    });
  }
}
