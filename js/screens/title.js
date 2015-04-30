game.TitleScreen = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function () {
        //adds title screen image
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage("title-screen")), -10);
        //plays music
        me.audio.playTrack("George Street Shuffle");

        game.data.option1 = new (me.Renderable.extend({
            init: function () {
                //text settings
                this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                this.font = new me.Font("Arial", 46, "white");
                //makes so you can click on text to navigate the game
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
            },
            draw: function (renderer) {
                //the text you can click on
                this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);

            },
            update: function (dt) {
                return true;
            },
            newGame: function () {
                //when the text is clicked you are brought to the new profile page
                me.input.releasePointerEvent('pointerdown', this);
                me.input.releasePointerEvent('pointerdown', this);
                me.state.change(me.state.NEW);
            }

        }));
        //adds start new game text
        me.game.world.addChild(game.data.option1);

        game.data.option2 = new (me.Renderable.extend({
            init: function () {
                //text settings
                this._super(me.Renderable, 'init', [380, 340, 250, 50]);
                this.font = new me.Font("Arial", 46, "white");
                //makes so you can click on text to navigate the game
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
            },
            draw: function (renderer) {
                //the text you can click on
                this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);

            },
            update: function (dt) {
                return true;
            },
            newGame: function () {
                //when the text is clicked you are brought to the load profile page
                me.input.releasePointerEvent('pointerdown', this);
                me.state.change(me.state.LOAD);
            }

        }));
        // adds continue text
        me.game.world.addChild(game.data.option2);

    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function () {
        //stops music
        me.audio.stopTrack();
    }
});
