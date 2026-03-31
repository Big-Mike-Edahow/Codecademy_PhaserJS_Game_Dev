// EndScene.js

export default class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndScene" });
  }

  preload() {
    this.load.setBaseURL("static");
    this.load.setPath("images/");
    this.load.image("end", "game_over.png");
  }

  create() {
    screen = this.add.image(0, 0, "end").setDisplaySize(480, 560).setOrigin(0);

    this.input.keyboard.on("keydown", () => {
      this.scene.stop("EndScene");
      window.location.reload(true);
    });
  }
}
