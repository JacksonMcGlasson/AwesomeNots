game.HeroDeathManager = Object.extend({
    init: function (x, y, settings) {
        this.alwaysUpdate = true;
    },
    update: function () {
        //if the player is dead
        if (game.data.player.dead) {
            //remove the player
            me.game.world.removeChild(game.data.player);
            //removes the marker for the player on the minimap
            me.game.world.removeChild(game.data.miniPlayer);
            //resets the player
            me.state.current().resetPlayer(10, 0);
            me.state.current().resetEnemy(2500, 0);
        }
        return true;
    }
});