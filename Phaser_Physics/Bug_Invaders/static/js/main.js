// main.js

function main() {
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
    scene: {
      preload,
      create,
      update,
    },
    title: "Bug Invaders",
    version: "1.0",
  };

  const game = new Phaser.Game(config);
}

main();
