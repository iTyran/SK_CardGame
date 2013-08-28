var HitEffect = cc.Sprite.extend({
	active:true,
    ctor:function () {
		this._super();

		this.initWithSpriteFrameName("hit.png");
		this.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
	},
	reset:function(pos,rotation,scale)
	{
		this.setPosition(pos);
		this.setRotation(rotation);
		this.setScale(scale);
		this.runAction(cc.ScaleBy.create(0.3, 2,2));
		this.runAction(cc.Sequence.create(cc.FadeOut.create(0.3), cc.CallFunc.create(this.destroy, this)));

	},
    destroy:function () {
		this.setPosition(g_hideSpritePos);
		this.active = false;
    }
});

HitEffect.getOrCreateHitEffect = function(pos,rotation,scale) {
	for (var j = 0; j < MW.CONTAINER.HITS.length; j++) {
		selChild = MW.CONTAINER.HITS[j];
		
		if (selChild.active == false)
		{
			selChild.active = true;
			selChild.reset(pos,rotation,scale);
			return selChild;
		}
	}
	
	var hit = new HitEffect();
	hit.reset(pos,rotation,scale);

	g_sharedGameLayer.addBulletHits(hit,9999);
	MW.CONTAINER.HITS.push(hit);
	return hit;
}
