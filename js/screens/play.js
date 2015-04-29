game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function () {
        // reset the score
        game.data.score = 0;
        
      
        //loads level
        me.levelDirector.loadLevel("Level01");
        //resets the player entity
        this.resetPlayer(10, 0);
        //resets enemy hero
        this.resetEnemy(2500, 0);
        //loads game timer manager
        var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {});
        me.game.world.addChild(gameTimerManager, 0);
        //loads hero death manager
        var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
        me.game.world.addChild(heroDeathManager, 0);
        //loads experience manager
        var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
        me.game.world.addChild(experienceManager, 0);
        //loads spend gold screen
        var spendGold = me.pool.pull("SpendGold", 0, 0, {});
        me.game.world.addChild(spendGold, 0);
        //adds in mini map
        game.data.minimap = me.pool.pull("MiniMap", 10, 10, {});
        me.game.world.addChild(game.data.minimap, 30);
          //plays music
          me.audio.playTrack("Happy-Chiptune");
        //binds keys
        me.input.bindKey(me.input.KEY.B, "buy");
        me.input.bindKey(me.input.KEY.P, "pause");
        me.input.bindKey(me.input.KEY.M, "map");
        me.input.bindKey(me.input.KEY.Q, "ability1");
        me.input.bindKey(me.input.KEY.W, "ability2");
        me.input.bindKey(me.input.KEY.E, "ability3");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.UP, "jump");
        me.input.bindKey(me.input.KEY.Z, "attack");
        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },
    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function () {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
        me.game.world.removeChild(game.data.player);
        me.audio.stopTrack();

    },
    resetPlayer: function (x, y) {
        //resets the position of the player
        game.data.player = me.pool.pull("player", x, y, {});
        me.game.world.addChild(game.data.player, 60);
        
       
        //resets the position of the mini player on the map
        game.data.miniPlayer = me.pool.pull("MiniPlayerLocation", 10, 10, {});
        me.game.world.addChild(game.data.miniPlayer, 31);
    },
    resetEnemy: function (x, y) {
        //resets the position of the enemy hero
        game.data.enemyhero = me.pool.pull("EnemyHero", x, y, {});
        me.game.world.addChild(game.data.enemyhero, 60);
        
    }
});
