game.Pause = Object.extend({
    init: function (x, y, settings) {
        this.now = new Date().getTime();
        this.lastPause = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused = true;
        this.pausing = false;
    },
    update: function () {
        this.now = new Date().getTime();
        console.log("update");
        // console.log(this.now - this.lastBuy);
        if (me.input.isKeyPressed("pause") && ((this.now - this.lastPause) >= 1000)) {
            console.log("pause screen");
            this.lastPause = this.now;
            if (!this.pausing) {
                console.log("pausing");
                this.pause();
            } else {
                this.resume();
            }
        }
        return true;
    },
    pause: function () {

        this.pausing = true;

        //the game pauses
        me.state.pause(me.state.PLAY);
        //sets wher pause screen will appear
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        //what is drawn as the background for the pause screen
        game.data.pausescreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage("pause"));
        //the text of the pause screen is set
        this.setPauseText();
        //it will update
        game.data.pausescreen.updateWhenPaused = true;
        //sets opacity
        game.data.pausescreen.setOpacity(0.8);
        //adds the actual pause screen
        me.game.world.addChild(game.data.pausescreen, 69);
        //stops the player
        game.data.player.body.setVelocity(0, 0);




    },
    setPauseText: function () {
        game.data.pausetext = new (me.Renderable.extend({
            init: function () {
                //font and other settings
                this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");
                this.updateWhenPaused = true;
                this.alwaysUpdate = true;

            },
            draw: function (renderer) {
                //the actual text you will see on the screen
                this.font.draw(renderer.getContext(), "PAUSE SCREEN ", this.pos.x, this.pos.y);


            }

        }));
        //adds the text
        me.game.world.addChild(game.data.pausetext, 70);
    },
    resume: function () {
        console.log("blue");
        this.pausing = false;
        //resumes the game
        me.state.resume(me.state.PLAY);
        //the player can move now
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        //removes the pause screen
        me.game.world.removeChild(game.data.pausescreen);
        //removes the pause text
        me.game.world.removeChild(game.data.pausetext);
    }


});

