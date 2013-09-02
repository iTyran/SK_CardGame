// FightLayer.js

var FightLayer = cc.Layer.extend({
	init:function(){
		if (this._super()){
			this.initLayer();

			return true;
		}
		cc.log("fight layer init ...");
		return false;
	},
	initLayer:function(){
		var fightNode = cc.Node.create();
		fightNode.setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, 0)));	// cc.p(0, 80)
		this.addChild(fightNode);
		
		var fightBackground = cc.Sprite.create(IMG.fightBackground);
		fightNode.addChild(fightBackground);

		// add cards
		var card = new Card();
		card.init();
		fightNode.addChild(card);
	}
});

FightLayer.scene = function(){
	var scene = cc.Scene.create();
	var layer = new FightLayer();
	layer.init();
	scene.addChild(layer);
	return scene;
};

var Card = cc.Node.extend({
	
	_hp: null,
	_at: null,
	
	init:function(){
		if (this._super()){
			var sprite = cc.Sprite.create(IMG.cardPurple);
			var status = cc.Sprite.create(IMG.cardPurpleStatus);
			var at = cc.Sprite.create(IMG.cardAt);

			status.setPosition(cc.p(0, -100));

			this.addChild(sprite);
			this.addChild(at);
			this.addChild(status);
			
			return true;
		}
		return false;
	}
});

