game.EnemyHero = me.Entity.extend({
    init: function (x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "enemyhero",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function () {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);
        this.health = game.data.playerHealth;
        this.alwaysUpdate = true;
        //if enemy is attacking or not
        this.attacking = false;
        //keeps track of creep attacks
        this.lastAtacking = new Date().getTime();
        // last time creep hit anything 
        this.lastHit = new Date().getTime();
        this.now = new Date().getTime();
        this.body.setVelocity(game.data.playerMoveSpeed, 20);

        this.type = "EnemyHero";

        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.setCurrentAnimation("walk");
    },
    loseHealth: function (damage) {
        this.health = this.health - damage;
    },
    update: function (delta) {
        //console.log(this.health);
        if (this.health <= 0) {
            me.game.world.removeChild(this);
        }
        this.now = new Date().getTime();

        this.body.vel.x -= this.body.accel.x * me.timer.tick;

        me.collision.check(this, true, this.collideHandler.bind(this), true);

        this.body.update(delta);


        this._super(me.Entity, "update", [delta]);

        return true;
    },
    collideHandler: function (response) {

        if (response.b.type === "PlayerBase") {
            this.attacking = true;
            this.lastAtacking = this.now;
            this.body.vel.x = 0;
            //  this.pos.x = this.pos.x + 1;
            if (this.now - this.lastHit >= game.data.creepAttackTimer) {
                this.lastHit = this.now;
                response.b.loseHealth(game.data.playerAttack);
            }
        } else if (response.b.type === "PlayerEntity") {
            var xdif = this.pos.x - response.b.pos.x;

            this.attacking = true;
            //this.lastAtacking = this.now;

            //keeps moving creep to right to maintain position
            if (xdif < 0) {
                //this.pos.x = this.pos.x + 1;
                this.body.vel.x = 0;
            }
            if (this.now - this.lastHit >= game.data.creepAttackTimer && xdif < 0) {
                this.lastHit = this.now;
                //makes player lose health
                response.b.loseHealth(game.data.enemyCreepAttack);
            }
        } else if (response.b.type === "PlayerCreep") {
            var xdif = this.pos.x - response.b.pos.x;

            this.attacking = true;
            //this.lastAtacking = this.now;

            //keeps moving creep to right to maintain position
            if (xdif > 0) {
                //this.pos.x = this.pos.x + 1;
                this.body.vel.x = 0;
            }
            if (this.now - this.lastHit >= game.data.creepAttackTimer && xdif < 0) {
                this.lastHit = this.now;
                //makes player lose health
                response.b.loseHealth(game.data.playerAttack);
            }
        }
    }
});



