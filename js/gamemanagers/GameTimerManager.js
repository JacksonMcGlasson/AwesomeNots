game.GameTimerManager = Object.extend({
    init: function (x, y, settings) {
        //variables for the timer
        this.now = new Date().getTime();
        this.lastHero = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.lastGold = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
    },
    update: function () {
        this.now = new Date().getTime();
        this.goldTimerCheck();
        this.creepTimerCheck();

        return true;
    },
    //gives player gold on a timer
    goldTimerCheck: function () {
        if (Math.round(this.now / 1000) % 20 === 0 && (this.now - this.lastGold >= 1000)) {
            this.lastGold = this.now;
            //gives gold
            game.data.gold += game.data.exp1 + 1;
            console.log("Current gold:" + game.data.gold);
        }
    },
    //spawns creeps on a timer
    creepTimerCheck: function () {
        //has it been 10 sec since last creep spawn
        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            //makes only one a second
            this.lastCreep = this.now;
            //spawns enemy creep
            var creepe = me.pool.pull("EnemyCreep", 2550, 0, {});
            me.game.world.addChild(creepe, 60);
            //spawns player creep
            var creeper = me.pool.pull("PlayerCreep", 500, 30, {});
            me.game.world.addChild(creeper, 60);
        }
    }
});