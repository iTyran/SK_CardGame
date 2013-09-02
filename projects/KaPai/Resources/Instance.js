// Instance.js

var InstanceLayer = cc.Layer.extend({
	init:function(){
		if (this._super()){
			this.initLayer();
			return true;
		}
		cc.log("instance init.");
		return false;
	},
	initLayer:function(){
		var backGround = cc.Sprite.create(IMG.bgInstance);
		backGround.setPosition(VisibleRect.center());
		this.addChild(backGround);
		
		cc.log("instance init layer ..");
	}
});

InstanceLayer.scene = function(){
	var scene = cc.Scene.create();
	var layer = new InstanceLayer();
	layer.init();
	scene.addChild(layer);
	return scene;
};
