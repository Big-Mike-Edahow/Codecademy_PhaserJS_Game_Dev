// scene.js

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
  const platforms = this.physics.add.staticGroup();
  platforms.create(320, 350, "platform").setScale(2, 0.5).refreshBody();

  gameState.scoreText = this.add.text(320, 340, "Score: 0", {
    fontSize: "15px",
    fill: "#000",
  });

  this.player = this.physics.add.sprite(320, 300, "codey").setScale(0.5);
  this.player.setCollideWorldBounds(true);
  this.physics.add.collider(this.player, platforms);

  const bugs = this.physics.add.group();
  const bugList = ["bug1", "bug2", "bug3"];

  const bugGen = () => {
    const xCoord = Math.random() * 640;
    let randomBug = bugList[Math.floor(Math.random() * 3)];
    bugs.create(xCoord, 10, randomBug);
  };

  const bugGenLoop = this.time.addEvent({
    delay: 100,
    callback: bugGen,
    loop: true,
  });

  this.physics.add.collider(bugs, platforms, function (bug) {
    bug.destroy();
    gameState.score += 10;
    gameState.scoreText.setText(`Score: ${gameState.score}`);
  });

  this.physics.add.collider(this.player, bugs, () => {
    bugGenLoop.destroy();
    this.physics.pause();

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

    gameState.score = 0;
    this.input.on("pointerdown", () => {
      this.scene.restart();
    });
  });
}

function update() {
  const cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown) {
    this.player.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    this.player.setVelocityX(200);
  } else {
    this.player.setVelocityX(0);
  }
}
