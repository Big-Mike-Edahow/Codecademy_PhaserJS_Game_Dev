# Lighting

Different light colors things differently, so it will be a stronger effect if we color our
world for each time of day. In order to convey this effect we are going to use the .setTint() method on each of our GameObjects.

.setTint() performs a color multiplication effect that changes each pixel in your image
consistently, in a way similar to having a colored light cast on it. It’s a lot like
looking at the same thing through a pair of sunglasses. When we do this, we can contrast
the effect of a strong overhead sun during the afternoon, with, say, a lavender light
present in the early morning. At night, we can just make everything a little bit darker.