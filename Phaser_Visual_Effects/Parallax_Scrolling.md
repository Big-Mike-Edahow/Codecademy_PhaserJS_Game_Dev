# Parallax Scrolling

We’re going to create the illusion of depth in our frozen tundra world using something
called a parallax effect. Parallax motion refers to an observable real-world phenomenon
that things closer to us move faster than things further from us. A full moon or a faraway
mountain may not appear to move much at all as you drive down a highway on a clear night,
but it’s simply so far away that the movement is occurring very slowly. By comparison, a
hedge of trees against the road or a neon light for a roadside shop will whizz by.

In order to simulate this motion, we can to create three different background layers of
different sizes. Why do they need to be different sizes? Since we’ll be scrolling some of
our “nearer” layers very fast and some of our “farther” layers very slow, we will need our
“nearer” layers to be longer or else they will scroll off the screen.