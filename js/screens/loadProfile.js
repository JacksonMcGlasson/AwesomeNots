game.LoadProfile = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function () {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage("load-screen")), -10);
        //plays music
        me.audio.playTrack("George Street Shuffle");
        //makes input and load button visible
        document.getElementById("input").style.visibility = "visible";
        document.getElementById("load").style.visibility = "visible";
        //unbinds all the keys
        me.input.unbindKey(me.input.KEY.B);
        me.input.unbindKey(me.input.KEY.Q);
        me.input.unbindKey(me.input.KEY.W);
        me.input.unbindKey(me.input.KEY.E);
        me.input.unbindKey(me.input.KEY.Z);


        me.game.world.addChild(new (me.Renderable.extend({
            init: function () {
                //settings for where the text is and what it look like
                this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");

            },
            draw: function (renderer) {
                //the text seen on screen
                this.font.draw(renderer.getContext(), "ENTER YOUR USERNAME AND PASSWORD ", this.pos.x, this.pos.y);
            }

        })));

    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function () {
        //hides the input and load buttons
        document.getElementById("input").style.visibility = "hidden";
        document.getElementById("load").style.visibility = "hidden";
        //stops the music
        me.audio.stopTrack();

    }
});



