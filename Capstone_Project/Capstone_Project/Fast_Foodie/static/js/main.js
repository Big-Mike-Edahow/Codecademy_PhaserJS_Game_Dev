// main.js

// Game config.
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "cccccc",
  parent: "game-canvas",
  physics: {
    default: "arcade",
    arcade: {},
  },
  scene: [StartScene, TutorialScene, GameScene, WinScene, LoseScene],
  title: "Fast Foodie",
  version: "1.0",
};

// Create new game.
const game = new Phaser.Game(config);
