// Game.js

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  parent: "game-canvas",
  scene: [StartScene, GameScene, EndScene],
  title: "Treasure Hunter",
  version: "1.0",
};

const game = new Phaser.Game(config);
