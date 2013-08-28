var SparkEffect = cc.Class.extend({
	active:true,
	spark1:null,
	spark2:null,
	scale:1.2,
	duration:0.7,
	ctor:function () {
		this.spark1 = cc.Sprite.createWithSpriteFrameName("explode2.png");
		this.spark1.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
		this.spark2 = cc.Sprite.createWithSpriteFrameName("explode3.png");
		this.spark2.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
	 },
	reset:function(pos) {
		this.spark1.setPosition(pos);
		this.spark2.setPosition(pos);

		this.spark1.setScale(this.scale);
		this.spark2.setScale(this.scale);
		this.spark2.setRotation(Math.random() * 360);

		var right = cc.RotateBy.create(this.duration, 45);
		var scaleBy = cc.ScaleBy.create(this.duration, 3, 3);
		var seq = cc.Sequence.create( cc.FadeOut.create(this.duration), cc.CallFunc.create(this.destroy, this));

		this.spark1.runAction(right);
		this.spark1.runAction(scaleBy);
		this.spark2.runAction(scaleBy.copy());

		this.spark1.runAction(seq);
		this.spark2.runAction(seq.copy());
	},
	destroy:function () {
		this.spark1.setPosition(g_hideSpritePos);
		this.spark2.setPosition(g_hideSpritePos);
		this.active = false;
	}
});

SparkEffect.getOrCreateSparkEffect = function(pos) {
	for (var j = 0; j < MW.CONTAINER.SPARKS.length; j++) {
		selChild = MW.CONTAINER.SPARKS[j];
		
		if (selChild.active == false)
		{
			selChild.active = true;
			selChild.reset(pos);
			return selChild;
		}
	}
	
	var spark = new SparkEffect();
	spark.reset(pos);
	
	g_sharedGameLayer.addSpark(spark.spark1);
	g_sharedGameLayer.addSpark(spark.spark2);
	MW.CONTAINER.SPARKS.push(spark);
	return spark;
}
