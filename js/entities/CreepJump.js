game.CreepJump = me.Entity.extend({
    init: function (x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "spear",
                width: 48,
                height: 48,
                spritewidth: "48",
                spriteheight: "48",
                getShape: function () {
                    return(new me.Rect(0, 0, 48, 70)).toPolygon();
                }
            }]);
        
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);

        this.type = "CreepJump";

    },
    update: function (delta) {
       
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    onCollision: function () {
      
    }

});