// EndScene.js

class EndScene extends Phaser.Scene {
  constructor() {
    super({
      key: "EndScene",
    });
  }

  preload() {
    this.load.setBaseURL("static");
    this.load.setPath("images/");
    this.load.image("playerWins", "you_won.png");
    this.load.image("playerLose", "you_lost.png");
  }

  create() {
    if (gameState.player.health <= 0) {
      // A lose screen appears if Electric Mouse has 0 (or less) HP:
      let lose = this.add.sprite(240, 320, "playerLose");
    } else {
      // A win screen appears:
      let win = this.add.sprite(240, 320, "playerWins");
    }

    this.input.on("pointerdown", () => {
      this.scene.stop("EndScene");
      window.location.reload(true);
    });
  }
}
