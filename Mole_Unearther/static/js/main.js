// main.js

import StartScene from "./StartScene.js";
import GameScene from "./GameScene.js";
import EndScene from "./EndScene.js";

function main() {
  const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 560,
    backgroundColor: "#F8B392",
    parent: "game-canvas",
    scene: [StartScene, GameScene, EndScene],
    physics: {
      default: "arcade",
    },
    title: "Mole Unearther",
    version: "1.0",
  };

  const game = new Phaser.Game(config);
}

main();
