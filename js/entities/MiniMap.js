game.MiniMap = me.Entity.extend({
    init: function (x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "minimap",
                width: 439,
                height: 140,
                spritewidth: "439",
                spriteheight: "140",
                getShape: function () {
                    return(new me.Rect(0, 0, 439, 140)).toPolygon();
                }
            }]);
        this.floating = true;
        this.mapping = false;

    },
    update: function () {
        this.now = new Date().getTime();

        //if the map key is pressed
        if (me.input.isKeyPressed("map") && ((this.now - this.lastMap) >= 1000)) {
            this.lastMap = this.now;
            if (!this.mapping) {
                //remove map
                console.log("time to buy");
                mapOff();
            } else {
                //bring map back
                this.mapOn();
            }
        }


        return true;
    },
    mapOff: function () {
        this.mapping = false;
        me.game.world.removeChild(game.data.minimap);


    },
    //when 
    mapOn: function () {
        this.mapping = true;
        me.game.world.addChild(game.data.minimap, 69);
    }
});