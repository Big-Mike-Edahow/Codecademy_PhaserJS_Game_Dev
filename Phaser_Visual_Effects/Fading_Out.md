# Fading Out

Fading out of a Scene seems like a fitting transition. A cue taken from the film industry,
fade-out offers a much softer effect than the shake but is as concise in Phaser. .fade() is
a camera method that takes the following arguments:

duration, the length of the fade in milliseconds.
red, the 0-255 integer value of how red the fadeout color is.
green, the 0-255 integer value of how green the fadeout color is.
blue, the 0-255 integer value of how blue the fadeout color is.
force, starts the fadeout over if it’s already been started.
callback, the callback to use during the fadeout effect.
context, the context to use for the callback (defaults to the Scene the camera is in).

We can call:

this.cameras.main.fade(100, 255, 255, 255, false, function(camera, progress) {
  if (progress > .5) {
    gameState.player.x = 5;
  }
});

In the above code the camera fades to white very quickly. Halfway through the fadeout,
the gameState.player gets moved 5 pixels from the left edge of the game.