# Levels

Now that we have a system for specifying where platforms should be in each level, we can
create multiple levels! Each level is going to inherit from our customized Level class and
then inject information about the level inside the constructor. By doing this we’re able to
separate each of our Levels from one-another!