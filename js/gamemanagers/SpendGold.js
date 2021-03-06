game.SpendGold = Object.extend({
    init: function (x, y, settings) {
        this.now = new Date().getTime();
        this.lastBuy = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused = true;
        this.buying = false;
    },
    update: function () {
        this.now = new Date().getTime();
        //if B is pressed than the buy screen will load or be removed 
        if (me.input.isKeyPressed("buy") && ((this.now - this.lastBuy) >= 1000)) {
            console.log("buy screen");
            this.lastBuy = this.now;
            if (!this.buying) {
                console.log("time to buy");
                this.startBuying();
            } else {
                this.stopBuying();
            }
        }
        this.checkBuyKeys();

        return true;
    },
    startBuying: function () {

        this.buying = true;

        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        //draws the screen
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage("gold-screen"));
        game.data.buyscreen.updateWhenPaused = true;
        //sets opacity for buy screeen
        game.data.buyscreen.setOpacity(0.8);
        //adds buyscreen
        me.game.world.addChild(game.data.buyscreen, 69);
        //stops player
        game.data.player.body.setVelocity(0, 0);
        //pauses game 
        me.state.pause(me.state.PLAY);
        //binds keys 
        me.input.bindKey(me.input.KEY.F1, "F1", true);
        me.input.bindKey(me.input.KEY.F2, "F2", true);
        me.input.bindKey(me.input.KEY.F3, "F3", true);
        me.input.bindKey(me.input.KEY.F4, "F4", true);
        me.input.bindKey(me.input.KEY.F5, "F5", true);
        me.input.bindKey(me.input.KEY.F6, "F6", true);
        //sets text
        this.setBuyText();


    },
    setBuyText: function () {
        game.data.buytext = new (me.Renderable.extend({
            init: function () {
                //text settings
                this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");
                this.updateWhenPaused = true;
                this.alwaysUpdate = true;

            },
            draw: function (renderer) {
                //sets text
                this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B TO SKIP. CURRENT GOLD: " + game.data.gold, this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "SKILL 1: INCREASE DAMAGE. CURRENT LEVEL: " + game.data.skill1 + " COST: " + ((game.data.skill1 + 1) * 10), this.pos.x, this.pos.y + 40);
                this.font.draw(renderer.getContext(), "SKILL 2: RUN FASTER. CURRENT LEVEL: " + game.data.skill2 + " COST: " + ((game.data.skill2 + 1) * 10), this.pos.x, this.pos.y + 80);
                this.font.draw(renderer.getContext(), "SKILL 3: INCREASE HEALTH. CURRENT LEVEL: " + game.data.skill3 + " COST: " + ((game.data.skill3 + 1) * 10), this.pos.x, this.pos.y + 120);
                this.font.draw(renderer.getContext(), "ABILITY Q: SPEED BURST. CURRENT LEVEL: " + game.data.ability1 + " COST: " + ((game.data.ability1 + 1) * 10), this.pos.x, this.pos.y + 160);
                this.font.draw(renderer.getContext(), "ABILITY W: EAT CREEP FOR HEALTH. CURRENT LEVEL: " + game.data.ability2 + " COST: " + ((game.data.ability2 + 1) * 10), this.pos.x, this.pos.y + 220);
                this.font.draw(renderer.getContext(), "ABILITY E: SPEAR THROUGH. CURRENT LEVEL: " + game.data.ability3 + " COST: " + ((game.data.ability3 + 1) * 10), this.pos.x, this.pos.y + 260);

            }

        }));
        me.game.world.addChild(game.data.buytext, 70);
    },
    stopBuying: function () {

        this.buying = false;
        me.state.resume(me.state.PLAY);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        me.game.world.removeChild(game.data.buyscreen);
        me.input.unbindKey(me.input.KEY.F1, "F1", true);
        me.input.unbindKey(me.input.KEY.F2, "F2", true);
        me.input.unbindKey(me.input.KEY.F3, "F3", true);
        me.input.unbindKey(me.input.KEY.F4, "F4", true);
        me.input.unbindKey(me.input.KEY.F5, "F5", true);
        me.input.unbindKey(me.input.KEY.F6, "F6", true);
        me.game.world.removeChild(game.data.buytext);
    },
    checkBuyKeys: function () {
        if (me.input.isKeyPressed("F1")) {
            if (this.checkCost(1)) {
                this.makePurchase(1);
            }
        } else if (me.input.isKeyPressed("F2")) {
            if (this.checkCost(2)) {
                this.makePurchase(2);
            }
        } else if (me.input.isKeyPressed("F3")) {
            if (this.checkCost(3)) {
                this.makePurchase(3);
            }
        } else if (me.input.isKeyPressed("F4")) {
            if (this.checkCost(4)) {
                this.makePurchase(4);
            }
        } else if (me.input.isKeyPressed("F5")) {
            if (this.checkCost(5)) {
                this.makePurchase(5);
            }
        } else if (me.input.isKeyPressed("F6")) {
            if (this.checkCost(6)) {
                this.makePurchase(6);
            }
        }
    },
    //checks to make sure that enough is payed
    checkCost: function (skill) {
        if (skill === 1 && (game.data.gold >= ((game.data.skill1 + 1) * 10))) {
            return true;
        } else if (skill === 2 && (game.data.gold >= ((game.data.skill2 + 1) * 10))) {
            return true;
        } else if (skill === 3 && (game.data.gold >= ((game.data.skill3 + 1) * 10))) {
            return true;
        } else if (skill === 4 && (game.data.gold >= ((game.data.ability1 + 1) * 10))) {
            return true;
        } else if (skill === 5 && (game.data.gold >= ((game.data.ability2 + 1) * 10))) {
            return true;
        } else if (skill === 6 && (game.data.gold >= ((game.data.ability3 + 1) * 10))) {
            return true;
        }
        else {
            return false;
        }
    },
    makePurchase: function (skill) {
        if (skill === 1) {
            //cost is subtracted from total gold
            game.data.gold -= ((game.data.skill1 + 1) * 10);
            //skill is leveled up
            game.data.skill1 += 1;
            //increases the variable that the skill relys on 
            game.data.playerAttack += 1;
        } else if (skill === 2) {
            game.data.gold -= ((game.data.skill2 + 1) * 10);
            game.data.skill2 += 1;
            game.data.playerMoveSpeed += 1;
        } else if (skill === 3) {
            game.data.gold -= ((game.data.skill3 + 1) * 10);
            game.data.skill3 += 1;
            game.data.playerHealth += 1;
        } else if (skill === 4) {
            game.data.gold -= ((game.data.ability1 + 1) * 10);
            //levels up ability
            game.data.ability1 += 1;
        } else if (skill === 5) {
            game.data.gold -= ((game.data.ability2 + 1) * 10);
            game.data.ability2 += 1;
        } else if (skill === 6) {
            game.data.gold -= ((game.data.ability3 + 1) * 10);
            game.data.ability3 += 1;
        }
    }
});

