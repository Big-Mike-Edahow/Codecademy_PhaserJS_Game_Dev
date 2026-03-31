// EndScene.js

export default class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndScene" });
  }

  init(data) {
    this.finalScore = data.score;
  }

  preload() {
    this.load.setBaseURL("static");
    this.load.setPath("images/");
    this.load.image("endScreen", "end_screen.png");
  }

  create() {
    const background = this.add.image(0, 0, "endScreen");
    background.setOrigin(0);
    background.setDisplaySize(480, 560);

    this.add.text(140, 470, `Your score is ${this.finalScore}.`, {
      fontFamily: "Arial",
      fontSize: "24px",
      color: "#ffffff",
    });

    this.input.on("pointerup", () => {
      this.scene.stop("EndScene");
      window.location.reload(true);
    });
  }
}
