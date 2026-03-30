// main.js

function main() {
  const config = {
    type: Phaser.AUTO,
    parent: "game-canvas",
    backgroundColor: 0xfea0fd,
    width: 450,
    height: 550,
    scene: {
      preload,
      create,
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
        enableBody: true,
        debug: false,
      },
    },
    title: "Fantasy Adventure Game",
    version: "1.0",
  };

  const game = new Phaser.Game(config);
}

main();
