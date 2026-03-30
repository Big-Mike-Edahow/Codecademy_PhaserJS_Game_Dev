// main.js

function main() {
  const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    backgroundColor: "b9eaff",
    parent: "game-canvas",
    scene: {
      preload,
      create,
      update,
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
        enableBody: true,
        debug: false,
      },
    },
    title: "Bug Dodger",
    version: "1.0",
  };

  const game = new Phaser.Game(config);
}

main();
