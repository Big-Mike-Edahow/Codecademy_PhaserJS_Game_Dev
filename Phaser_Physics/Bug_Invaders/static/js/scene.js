// scene.js

function preload() {
  this.load.setBaseURL("static");
  this.load.setPath("images/");
  this.load.image("bug1", "bug_1.png");
  this.load.image("bug2", "bug_2.png");
  this.load.image("bug3", "bug_3.png");
  this.load.image("platform", "platform.png");
  this.load.image("codey", "codey.png");
  this.load.image("bugPellet", "bug_pellet.png");
  this.load.image("bugRepellent", "bug_repellent.png");
}
// sortedEnemies() returns an array of enemy sprites sorted by their x coordinate.
function sortedEnemies() {
  const orderedByXCoord = gameState.enemies
    .getChildren()
    .sort((a, b) => a.x - b.x);
  return orderedByXCoord;
}

// numOfTotalEnemies() returns the number of total enemies.
function numOfTotalEnemies() {
  const totalEnemies = gameState.enemies.getChildren().length;
  return totalEnemies;
}

const gameState = {
  enemyVelocity: 1,
};

function create() {
  gameState.active = true;

  // If gameState.active is false, listen for a pointerup
  // event and restart when the event happens.
  this.input.on("pointerup", () => {
    if (gameState.active === false) {
      window.location.reload(true);
    }
  });

  // Creating static platforms.
  const platforms = this.physics.add.staticGroup();
  platforms.create(225, 490, "platform").setScale(1, 0.3).refreshBody();

  // Display the initial number of bugs. It's value is 24 at the start of game.
  gameState.scoreText = this.add.text(175, 482, "Bugs Left: 24", {
    fontSize: "15px",
    fill: "#000000",
  });

  // Uses the physics plugin to create Codey.
  gameState.player = this.physics.add.sprite(225, 450, "codey").setScale(0.75);

  // Create Collider objects.
  gameState.player.setCollideWorldBounds(true);
  this.physics.add.collider(gameState.player, platforms);

  // Creates cursor objects to be used in update().
  gameState.cursors = this.input.keyboard.createCursorKeys();

  // Create the enemies.
  gameState.enemies = this.physics.add.group();
  // Creates rows of enemies.
  for (let yVal = 1; yVal < 4; yVal++) {
    for (let xVal = 1; xVal < 9; xVal++) {
      gameState.enemies
        .create(50 * xVal, 50 * yVal, "bug1")
        .setScale(0.6)
        .setGravityY(-200);
    }
  }

  // Create pellets fired by enemies.
  const pellets = this.physics.add.group();
  const genPellet = () => {
    let randomBug = Phaser.Utils.Array.GetRandom(
      gameState.enemies.getChildren(),
    );
    pellets.create(randomBug.x, randomBug.y, "bugPellet");
  };
  gameState.pelletsLoop = this.time.addEvent({
    delay: 300,
    callback: genPellet,
    callbackScope: this,
    loop: true,
  });

  // Collision detection between pellets and platform.
  this.physics.add.collider(pellets, platforms, function (pellet) {
    pellet.destroy();
  });

  // Collision detection between pellets and Codey.
  this.physics.add.collider(pellets, gameState.player, () => {
    gameState.active = false;
    gameState.enemyVelocity = 1;
    gameState.pelletsLoop.destroy();
    this.physics.pause();
    this.add.text(150, 250, "Game Over!\nRestart?", {
      fontSize: "24px",
      fill: "#000",
    });
  });

  // Group object for Codeys ammo.
  gameState.bugRepellent = this.physics.add.group();

  // Collider for pellets and enemies.
  this.physics.add.collider(
    gameState.enemies,
    gameState.bugRepellent,
    (bug, repellent) => {
      bug.destroy();
      repellent.destroy();
      gameState.scoreText.setText(`Bugs left: ${numOfTotalEnemies()}`);
    },
  );

  // Collider for player and enemies.
  this.physics.add.collider(gameState.enemies, gameState.player, () => {
    gameState.active = false;
    gameState.enemyVelocity = 1;
    this.physics.pause();
    this.add.text(210, 250, "Game Over!\nRestart?", {
      fontSize: "24px",
      fill: "#000",
    });
  });
}

function update() {
  if (gameState.active) {
    // If the game is active, then players can control Codey
    if (gameState.cursors.left.isDown) {
      gameState.player.setVelocityX(-160);
    } else if (gameState.cursors.right.isDown) {
      gameState.player.setVelocityX(160);
    } else {
      gameState.player.setVelocityX(0);
    }

    // Execute code if the spacebar key is pressed
    if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
      gameState.bugRepellent
        .create(gameState.player.x, gameState.player.y, "bugRepellent")
        .setGravityY(-400);
    }
    // Create logic for if the player kills all of the enemies.
    if (numOfTotalEnemies() === 0) {
      gameState.active = false;
      gameState.enemyVelocity = 1;
      this.physics.pause();
      this.add.text(100, 250, "You have won!", {
        fontSize: "24px",
        fill: "#000",
      });
    } else {
      gameState.enemies.getChildren().forEach((bug) => {
        bug.x += gameState.enemyVelocity;
      });
      gameState.leftMostBug = sortedEnemies()[0];
      gameState.rightMostBug = sortedEnemies()[sortedEnemies().length - 1];
      if (gameState.leftMostBug.x < 10 || gameState.rightMostBug.x > 440) {
        gameState.enemyVelocity *= -1;
        gameState.enemies.getChildren().forEach((enemy) => {
          enemy.y += 10;
        });
      }
    }
  }
}
