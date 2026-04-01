// game.js

// Store and manage the dynamic data for the game.
const gameState = {
  counter: 1, // Keeps track of what number is being guessed.
  correct: 0, // Number of correct guesses.
  incorrect: 0, // Number of incorrect guesses.
  numCoordinates: {}, //make sure no coordinates repeat.
};

// Game configuration.
const config = {
  type: Phaser.AUTO,
  width: 450,
  height: 600,
  backgroundColor: "F8B392",
  parent: "game-canvas",
  scene: [StartScene, GameScene, EndScene],
  title: "Cody's Countdown Conundrum",
  version: "1.0",
};

// Create a new game.
const game = new Phaser.Game(config);
