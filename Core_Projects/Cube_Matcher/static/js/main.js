// main.js

function main() {
  const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    backgroundColor: "000000",
    parent: "game-canvas",
    scene: [StartScene, GameScene, EndScene],
    physics: {
      default: "arcade",
      arcade: {
        gravity: 200,
        enableBody: true,
      },
    },
    title: "Cube Matcher",
    version: "1.0",
  };

  const game = new Phaser.Game(config);
}

main();
