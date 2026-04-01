// game.js

// Variable declarations.
let game;
let platforms;
let player;
let cursors;
let platformCount = 0;
let emitter;
let particles;

// Config options.
let gameOptions = {
  width: 480,
  height: 640,
  gravity: 800,
};

class JumpScene extends Phaser.Scene {
  constructor() {
    super({ key: "JumpScene" });
  }

  preload() {
    this.load.setBaseURL("static");
    this.load.setPath("images/");
    this.load.image("platform", "platform.png");
    this.load.image("stripe", "stripe.png");
    this.load.spritesheet("codey", "codey.png", {
      frameWidth: 72,
      frameHeight: 90,
    });
  }

  create() {
    // Create gradient background.
    const graphics = this.add.graphics();
    graphics.fillGradientStyle(0xdadaff, 0x6cfafa, 0xfccaff, 0xdadaff, 1);
    graphics.fillRect(0, 0, gameOptions.width, gameOptions.height);

    // Add particle effects.
    particles = this.add.particles("stripe");

    // Set the world bounds to the width of the canvas.
    this.physics.world.setBounds(0, 0, 480, 640);

    // Create the platforms.
    platforms = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    for (let i = 0; i < 8; i++) {
      let randomX = Math.floor(Math.random() * 400) + 24;
      platforms.create(randomX, i * 80, "platform").setScale(0.5);
    }

    // Create the sprite and it's properties.
    player = this.physics.add.sprite(100, 450, "codey").setScale(0.75);
    player.setBounce(1);
    player.setCollideWorldBounds(true);
    player.body.checkCollision.up = false;
    player.body.checkCollision.left = false;
    player.body.checkCollision.right = false;

    // Character animations.
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("codey", { start: 2, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    // Collider for player and platforms.
    this.physics.add.collider(player, platforms);

    // CursorsKeys object for up, down, left, right, shift, and space.
    cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // Animate Codey.
    player.anims.play("jump", true);

    // Horizontal velocity of sprite.
    if (cursors.left.isDown) {
      // Negative x velocity to go left on the screen.
      player.setVelocityX(-240);
      player.flipX = true;
    } else if (cursors.right.isDown) {
      // Positive x velocity to go right on the screen.
      player.setVelocityX(240);
      player.flipX = false;
    } else {
      // Nuetral velocity in upwards direction.
      player.setVelocityX(0);
    }

    // If Codey lands on a platform...
    if (player.body.touching.down) {
      this.cameras.main.shake(100, 0.004);
      player.setVelocityY(-500);
    }

    // Move platforms down. Creates an effect of progressing upwards.
    if (player.body.y < gameOptions.height / 2) {
      platforms.children.iterate(updateY, this);
      if (platformCount > 10 && !emitter) {
        // Particle emitter.
        emitter = particles.createEmitter({
          x: { min: 0, max: gameOptions.width },
          y: gameOptions.height + 10,
          lifespan: 2500,
          speedY: { min: -300, max: -500 },
          scale: 0.5,
          quantity: 5,
          blendMode: "ADD",
        });
      }
    }
  }
}

// Move the platforms lower, until they're off screen.
// Reposition them above the screen for an endless effect.
function updateY(platform) {
  // Keep the player in the center of the screen.
  let delta = Math.floor(gameOptions.height / 2) - player.y;

  // Divide delta loop by 30 to make it smaller.
  if (delta > 0) {
    platform.y += delta / 30;
  }

  // Keep platforms within the world bounds.
  if (platform.y > 640) {
    platform.y = -platform.height;
    platform.x = Math.floor(Math.random() * 400) + 24;
    platformCount += 1;
  }
}

// Game config.
let config = {
  type: Phaser.AUTO,
  width: gameOptions.width,
  height: gameOptions.height,
  backgroundColor: "#4599ff",
  parent: "game-canvas",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: gameOptions.gravity },
    },
  },
  scene: [JumpScene],
  title: "Codey Jump",
  version: "1.0",
};

// Create new game.
game = new Phaser.Game(config);
