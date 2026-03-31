// main.js

function main() {
  const config = {
    type: Phaser.AUTO,
    width: 500,
    height: 600,
    parent: "game-canvas",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 1500 },
        enableBody: true,
      },
    },
    scene: [GameScene],
    title: "Cave Crisis",
    version: "1.0",
  };

  const game = new Phaser.Game(config);
}

main();
