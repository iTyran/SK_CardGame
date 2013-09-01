// gamescene.js

var GameLayer = cc.Layer.extend({
	init:function(){
		if (this._super()){
			cc.log("game scene init ...");

			// var sprite = cc.Sprite.create("card.png");
			// sprite.setScale(0.4);
			// sprite.setPosition(VisibleRect.center());
			// this.addChild(sprite);

			// var o = cc.OrbitCamera.create(0, 1, 0, -55, 90, 0, 0);
			
			// sprite.setVertexZ(180);
			// sprite.runAction(o);

			// var a = cc.FlipX3D.create(3);
			// var delay = cc.DelayTime.create(2);
			// var r = a.reverse();
			// var action = cc.Sequence.create(a, delay, r);
			// sprite.runAction(a);

			var layer = cc.Layer.create();
			var sprites = [];
			for(var i = 0; i < 5; i ++){
				var sprite = cc.Sprite.create("card.png");
				layer.addChild(sprite);
				sprite.setScale(0.6);
				sprites.push(sprite);
			}
			sprites[0].setPosition(cc.pAdd(VisibleRect.center(), cc.p(-320, 0)));
			sprites[1].setPosition(cc.pAdd(VisibleRect.center(), cc.p(-200, 0)));
			sprites[2].setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, 0)));
			sprites[3].setPosition(cc.pAdd(VisibleRect.center(), cc.p(200, 0)));
			sprites[4].setPosition(cc.pAdd(VisibleRect.center(), cc.p(320, 0)));

			sprites[0].runAction(cc.OrbitCamera.create(0, 1, 0, -68, 90, 0, 0));
			sprites[1].runAction(cc.OrbitCamera.create(0, 1, 0, -75, 90, 0, 0));
			sprites[2].runAction(cc.OrbitCamera.create(0, 1, 0, 90 + 180, 90, 0, 0));
			sprites[3].runAction(cc.OrbitCamera.create(0, 1, 0, 75 + 180, 90, 0, 0));
			sprites[4].runAction(cc.OrbitCamera.create(0, 1, 0, 68 + 180, 90, 0, 0));

			sprites[0].setScale(sprites[0].getScale() * 0.6);
			sprites[1].setScale(sprites[1].getScale() * 0.8);
			sprites[2].setScale(sprites[2].getScale() * 1);
			sprites[3].setScale(sprites[3].getScale() * 0.8);
			sprites[4].setScale(sprites[4].getScale() * 0.6);
			// var action = cc.Lens3D.create(0, cc.size(15,10), VisibleRect.center(), 512);
			// this.runAction(action);

			this.addChild(layer);

			// scroll view ..
			// var scroll = cc.ScrollView.create(cc.size(800 ,600), layer);
			// this.addChild(scroll);

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
