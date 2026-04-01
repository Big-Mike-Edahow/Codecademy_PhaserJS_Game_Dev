# Platforms

If we want to create a side-scrolling platformer, we better make some platforms for the
player to jump on! We’ve created a static group for our platforms as before. But how do we
decide where to place these platforms?

This is a design choice, but we can at least make the design easier to accomplish by
parsing out x and y-coordinates and placing our platforms on a grid.

Creating a system for our levels is important! We’ll be able to create multiple levels
using this tool and this will allow us to separate out the code creating the levels from
the code that places all of the platforms.
