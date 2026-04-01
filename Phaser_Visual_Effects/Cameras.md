Cameras
8 min
In order to grant the joy of exploration and discovery it becomes important for the game world
to be larger than what a player immediately sees upon entering the game. A useful way to convince
the player of your game of this is by employing the use of cameras. A camera is a view of the
game world. Some games (those with mini-maps, for instance) employ multiple cameras, but we will
be focusing on just using one.

Phaser creates a camera by default, which we have so far been using without any customization.
Its bounds are set to be the same as the dimensions for your Game given in config. It also does
not move at all, but we will be changing both of those things for our platformer.

create() {
  gameState.player = this.physics.add.sprite(100, 100, 'codey');
  this.cameras.main.setBounds(0, 0, 2000, 600);
  this.cameras.main.startFollow(gameState.player);
}

Above we modified the default camera, this.cameras.main, to make it aware that the world is larger
than our current window. We do this by calling .setBounds() and giving bounds larger than our config
width and height. We also tell the camera to follow along our main player by calling .startFollow()
and passing it the sprite we want to follow.

The .startFollow() also has several additional optional arguments you can pass which we can use to
customize how fast the camera locks-on to its target and whether the target should be in the center
of the screen exactly or offset somewhat. Here are the arguments for .startFollow():
(target, roundPixels, lerpX, lerpY, offsetX, offsetY).

target is the sprite for the camera to follow. roundPixels is a boolean that effects rendering, set
it to true if you’re experiencing camera jitter.
lerpX and lerpY are the speed (between 0 and 1, defaults to 1) with which the camera locks on to the target. A lower lerp speed will have the effect that your character is moving much faster than the camera.
offsetX and offsetY is the offset for the camera. Set offsetX to something like -200 will keep Codey on the left side of the screen (so that more of the level ahead is on the screen).
