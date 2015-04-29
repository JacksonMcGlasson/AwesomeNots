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
        // console.log(this.now - this.lastBuy);
        if (me.input.isKeyPressed("map") && ((this.now - this.lastMap) >= 1000)) {
            console.log("buy screen");
            this.lastMap = this.now;
            if (!this.mapping) {
                console.log("time to buy");
                this.startMapping();
            } else {
                this.stopMapping();
            }
        }
       

        return true;
    },
    startMapping: function () {
       this.mapping = false;
        me.game.world.removeChild(game.data.minimap);
       
        
    },
    //when 
    stopMapping: function () {
        this.mapping = true;
        me.game.world.addChild(game.data.minimap, 69);
    }
});