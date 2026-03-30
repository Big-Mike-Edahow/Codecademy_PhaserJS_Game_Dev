// scene.js

// Object to store persistent game data.
const gameState = {
  score: 0,
};

function preload() {
  this.load.setBaseURL("static");
  this.load.setPath("images/");
  this.load.image("bug1", "bug_1.png");
  this.load.image("bug2", "bug_2.png");
  this.load.image("bug3", "bug_3.png");
  this.load.image("platform", "platform.png");
  this.load.image("codey", "codey.png");
}

function create() {
  // Create the player.
  gameState.player = this.physics.add.sprite(320, 450, "codey").setScale(1);

  // Create the platforms.
  const platforms = this.physics.add.staticGroup();
  platforms.create(300, 570, "platform").setScale(1.75).refreshBody();

  // Score text.
  gameState.scoreText = this.add.text(270, 520, "Score: 0", {
    fontSize: "20px",
    fill: "#000000",
  });

  //  Player physics properties. Give the little guy a slight bounce.
  gameState.player.setBounce(0.2);
  gameState.player.setCollideWorldBounds(true);

  //  Collide the player with the platform.
  this.physics.add.collider(gameState.player, platforms);

  //  Input Events.
  gameState.cursors = this.input.keyboard.createCursorKeys();

  // Create the bugs.
  const bugs = this.physics.add.group();
  const bugList = ["bug1", "bug2", "bug3"];

  function bugGen() {
    const xCoord = Math.random() * 640;
    let randomBug = bugList[Math.floor(Math.random() * 3)];
    bugs.create(xCoord, 10, randomBug);
  }

  const bugGenLoop = this.time.addEvent({
    delay: 100,
    callback: bugGen,
    callbackScope: this,
    loop: true,
  });

  // Bugs colliding with the platform are destroyed.
  this.physics.add.collider(bugs, platforms, function (bug) {
    bug.destroy();
    gameState.score += 10;
    gameState.scoreText.setText(`Score: ${gameState.score}`);
  });

  // Bugs colliding with the player ends the game.
  this.physics.add.collider(gameState.player, bugs, () => {
    bugGenLoop.destroy();
    this.physics.pause();

    // Game Over! text.
    let content = ["Game Over!", "Click to Restart!"];
    let text = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      content,
      {
        font: "64px Arial",
        fill: "#000",
        align: "center",
      },
    );
    text.setOrigin(0.5, 0.5);

    // Restart the scene on pointer up.
    this.input.on("pointerup", () => {
      gameState.score = 0;
      this.scene.restart();
    });
  });
}

function update() {
  if (gameState.cursors.left.isDown) {
    gameState.player.setVelocityX(-180);
  } else if (gameState.cursors.right.isDown) {
    gameState.player.setVelocityX(180);
  } else {
    gameState.player.setVelocityX(0);
  }
}
