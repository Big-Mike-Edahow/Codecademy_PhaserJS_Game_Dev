// GameScene.js

// Global variables
const cubeSize = 38;
let board;
let score = 0;

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.setBaseURL("static");
    this.load.setPath("images/");
    this.load.spritesheet("blocks", "blocks.png", {
      frameWidth: 38,
      frameHeight: 38,
    });
    this.load.image("grid", "grid.png");
  }

  create() {
    // Use custom pointer
    this.input.setDefaultCursor(
      "url(static/images/hammer.png), pointer",
    );
    this.add.image(0, 0, "grid").setOrigin(0).setScale(0.5);
    // Set boundaries of the game
    this.physics.world.setBounds(0, 0, 480, 600);
    // Create a 12 x 12 board
    board = this.makeBoard(12);
    // Create and display score
    score = 0;
    let scoreText = this.add.text(15, 610, `Score: ${score}`, {
      fontSize: "25px",
      fill: "#fff",
    });
    // Start and display a timer
    this.initialTime = 60; // in seconds
    let timerText = this.add.text(
      250,
      610,
      `Time Left: ${formatTime(this.initialTime)}`,
      { fontSize: "25px", fill: "#fff" },
    );
    // Phaser timer event
    this.time.addEvent({
      delay: 1000, // in milliseconds = 1 second
      callback: onTimedEvent,
      callbackScope: this,
      loop: true,
    });
    // Helper function to format time in minutes and seconds
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      seconds %= 60;
      const secondsString = seconds.toString().padStart(2, "0");
      return `${minutes}:${secondsString}`; // 08:00 for example
    }
    // Callback function for timer counts down or ends game
    function onTimedEvent() {
      if (this.initialTime === 0) {
        this.endGame();
      } else {
        this.initialTime--;
        timerText.setText(`Time Left: ${formatTime(this.initialTime)}`);
      }
    }
    // Listener for clicks on cubes
    this.input.on("gameobjectdown", function (pointer, cube, event) {
      // An array of cube sprites of the same color and next to each other
      const neighborCubes = getNeighbors(cube);
      // Remove matching cubes from game if there's at least 2 of them
      if (neighborCubes.length > 0) {
        // Update score
        score += neighborCubes.length;
        scoreText.setText(`Score: ${score}`);
        // Update cube sprites
        neighborCubes.forEach((neighbor) => {
          // Remove neighboring cube from display
          neighbor.destroy();
          // Shift remaining cubes down
          renderCubes(neighbor);
        });
        // Remove any empty columns in the board
        removeCols();
      }

      // Helper function shifts removes empty columns
      function removeCols() {
        // Get the indices of empty columns in the board array
        const emptyCols = board
          .map((col, i) => (col.every((cube) => cube.removed) ? i : null))
          .filter((res) => Number.isInteger(res));
        // For each empty column, shift all remaining columns to the left
        emptyCols.forEach((emptyCol) => {
          const columnsToMove = board.slice(emptyCol + 1);
          // Update the properties of cubes of moved column
          columnsToMove.forEach((col) => {
            col.forEach((cube) => {
              cube.x -= cubeSize;
              cube.col--;
            });
          });
        });

        // Remove all empty columns from the board array
        board.splice(emptyCols[0], emptyCols.length);
      }
      // Helper function moves cube sprites down
      function renderCubes(cube) {
        for (let row = 0; row < cube.row; row++) {
          // Move cube sprite down by 30px
          board[cube.col][row].y += cubeSize;
          // Update the row of cube
          board[cube.col][row].row += 1;
        }
        // Update board array
        let removed = board[cube.col].splice(cube.row, 1);
        board[cube.col] = removed.concat(board[cube.col]);
      }
    });
  }

  update() {
    // If no more remaining valid moves, end game
    if (!remainingMoves()) {
      this.endGame();
    }
  }

  makeBoard(size) {
    // Helper function to assign cube properties
    // A nested array, inner arrays represent empty columns
    const board = Array(size).fill(Array(size).fill("x"));
    // Fill board array with cube sprites and return it
    return board.map((col, i) => {
      return col.map((row, j) => {
        // Make Phaser sprite representing a cube
        return this.makeCube(i, j);
      });
    });
  }

  makeCube(colIndex, rowIndex) {
    const sideMargin = 31;
    const topMargin = 30;
    // Create a Phaser sprite
    const cube = this.physics.add.sprite(
      colIndex * cubeSize + sideMargin,
      rowIndex * cubeSize + topMargin,
      "blocks",
    );
    // Choose color randomly
    const max = 3;
    const min = 0;
    const color = Math.floor(Math.random() * (max - min + 1)) + min;
    // Don't let cube move beyond edges of board
    cube.setCollideWorldBounds(true);
    cube.body.collideWorldBounds = true;
    // Set the cube to a specific color
    cube.setFrame(color);
    // Make the cube clickable
    cube.setInteractive();
    // Add some information to make it easier to find a cube
    cube.col = colIndex;
    cube.row = rowIndex;
    cube.removed = false;

    return cube;
  }

  endGame() {
    // Stop sprites moving
    this.physics.pause();
    // Transition to end scene w/fade
    this.cameras.main.fade(800, 0, 0, 0, false, function (camera, progress) {
      if (progress > 0.5) {
        this.scene.stop("GameScene");
        this.scene.start("EndScene");
      }
    });
  }
}

// Helper function that only checks the immediate neighbors of a cube
function checkClosest(cube) {
  const results = [];
  // Coordinates of up, down, left, right cubes to check
  const directions = [
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: -1, col: 0 },
    { row: 1, col: 0 },
  ];
  const currCol = cube.col;
  const currRow = cube.row;
  const color = cube.frame.name;
  // TG2: Build .checkCloset() function
  directions.forEach((direction) => {
    // coords of neighbor cube to check
    const newCol = currCol + direction.col;
    const newRow = currRow + direction.row;
    // Exit if the new col or row doesn't exist or will be removed
    if (
      !board[newCol] ||
      !board[newCol][newRow] ||
      board[newCol][newRow].removed
    ) {
      return;
    }
    // Check color of neighboring cube
    if (color === board[newCol][newRow].frame.name) {
      results.push(board[newCol][newRow]);
    }
  });
  // Return an array of neighboring cubes with the same color
  return results;
}

// Helper function to get neighborCubes of a block
function getNeighbors(cube) {
  // Variables
  let start = cube;
  let cubesToCheck = [start];
  let validNeighborCubes = [];
  // Check cubes in cubesToCheck for valid neighborCubes
  while (cubesToCheck.length > 0) {
    let curr = cubesToCheck.shift();
    // Only collect cubes we haven't already removed as a valid neighbor
    if (curr.removed === false) {
      validNeighborCubes.push(curr);
      curr.removed = true;
    }
    // An array of matching cubes
    let matches = checkClosest(curr);
    // Mark matching cubes to be removed from board, check more cubes
    matches.forEach((curr) => {
      curr.removed = true;
      validNeighborCubes.push(curr);
      cubesToCheck.push(curr);
    });
  }
  // If not enough matching cubes, clear and reset the clicked cube
  if (validNeighborCubes.length === 1) {
    validNeighborCubes[0].removed = false;
    validNeighborCubes = [];
  }

  return validNeighborCubes;
}

// Helper function to check remaining moves
function remainingMoves() {
  // Returns true or false at least 1 remaining move in board
  return board.some((col) => {
    // Find the first cube that has at least 1 matching neighbor cube
    return col.find((cube) => {
      return !cube.removed && checkClosest(cube).length > 0;
    });
  });
}
