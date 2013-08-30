// gamescene.js

var GameLayer = cc.Layer.extend({
	init:function(){
		if (this._super()){
			cc.log("game scene init ...");
			return true;
		}
		return false;
	}
});

GameLayer.scene = function(){
	var scene = cc.Scene.create();
	var layer = new GameLayer();
	layer.init();
	scene.addChild(layer);
	return scene;
};
