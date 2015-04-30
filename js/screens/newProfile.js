game.NewProfile = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function () {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage("new-screen")), -10);
        //plays music
         me.audio.playTrack("George Street Shuffle");
        //makes input and register button visible
        document.getElementById("input").style.visibility = "visible";
        document.getElementById("register").style.visibility = "visible";
        //unbinds keys
        me.input.unbindKey(me.input.KEY.B);
        me.input.unbindKey(me.input.KEY.Q);
        me.input.unbindKey(me.input.KEY.W);
        me.input.unbindKey(me.input.KEY.E);
        me.input.unbindKey(me.input.KEY.Z);

        //adds text
        me.game.world.addChild(new (me.Renderable.extend({
            init: function () {
                //text settings
                this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");

            },
            draw: function (renderer) {
                //text you see on screen
                this.font.draw(renderer.getContext(), "PICK A USERNAME AND PASSWORD ", this.pos.x, this.pos.y);
            }

        })));

    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    //gets rid of everything
    onDestroyEvent: function () {
        //hides and input and register button
        document.getElementById("input").style.visibility = "hidden";
        document.getElementById("register").style.visibility = "hidden";
        //stops music
         me.audio.stopTrack();
    }
});
