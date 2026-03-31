// Game.js

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  parent: "game-canvas",
  scene: [StartScene, GameScene, EndScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  title: "Electric Mouse",
  version: "1.0",
};

const game = new Phaser.Game(config);
