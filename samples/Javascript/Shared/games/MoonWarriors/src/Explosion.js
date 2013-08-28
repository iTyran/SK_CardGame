var Explosion = cc.Sprite.extend({
    tmpWidth:0,
    tmpHeight:0,
	active:true,
    ctor:function () {
        this._super();

        var pFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame("explosion_01.png");
        this.initWithSpriteFrame(pFrame);
		this.setBlendFunc(gl.SRC_ALPHA, gl.ONE);

        var cs = this.getContentSize();
        this.tmpWidth = cs.width;
        this.tmpHeight = cs.height;

        var animation = cc.AnimationCache.getInstance().getAnimation("Explosion");
        this.runAction(cc.Sequence.create(
            cc.Animate.create(animation),
            cc.CallFunc.create(this.destroy, this)
        ));
    },
    destroy:function () {
		this.setPosition(g_hideSpritePos);
		this.active = false;
    }
});

Explosion.sharedExplosion = function () {
    var animFrames = [];
    var str = "";
    for (var i = 1; i < 35; i++) {
        str = "explosion_" + (i < 10 ? ("0" + i) : i) + ".png";
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
        animFrames.push(frame);
    }
    var animation = cc.Animation.create(animFrames, 0.04);
    cc.AnimationCache.getInstance().addAnimation(animation, "Explosion");
};

Explosion.getOrCreateExplosion = function() {
	for (var j = 0; j < MW.CONTAINER.EXPLOSIONS.length; j++) {
		var selChild = MW.CONTAINER.EXPLOSIONS[j];
		
		if (selChild.active == false)
		{
			selChild.active = true;
			var animation = cc.AnimationCache.getInstance().getAnimation("Explosion");
			selChild.runAction(cc.Sequence.create(
											  cc.Animate.create(animation),
											  cc.CallFunc.create(selChild.destroy, selChild)));
			return selChild;
		}
	}
	
	var explosion = new Explosion();
	g_sharedGameLayer.addExplosions(explosion);
	MW.CONTAINER.EXPLOSIONS.push(explosion);
	return explosion;
} ;
