// game.js

const gameState = {
  score: 0,
};

const config = {
  type: Phaser.AUTO,
  width: 450,
  height: 500,
  backgroundColor: "b9eaff",
  parent: "game-canvas",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      enableBody: true,
    },
  },
  scene: [StartScene, GameScene],
  title: "Bug Dodger",
  version: "1.0",
};

const game = new Phaser.Game(config);
