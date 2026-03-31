// main.js

import StartScene from './StartScene.js';
import GameScene from './GameScene.js';
import EndScene from './EndScene.js';

function main() {
  const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 560,
    backgroundColor: "#000080",
    parent: "game-canvas",
    scene: [StartScene, GameScene, EndScene],
    title: "Business Outfitted Bob",
    version: "1.0",
    physics: {
      default: "arcade",
      arcade: {
        gravity: 0,
        enableBody: true,
      },
    },
  };

  const game = new Phaser.Game(config);
}

main();
