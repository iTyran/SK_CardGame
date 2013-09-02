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

		var itemImgBack = cc.MenuItemImage.create(IMG.btnBack, IMG.btnBackPress, function(){
			cc.Director.getInstance().replaceScene(GameLayer.scene());
		}, this);
		itemImgBack.setPosition(cc.pAdd(VisibleRect.topRight(), cc.p(-80, -80)));

		var itemImgFight = cc.MenuItemImage.create(IMG.btnInstance, IMG.btnInstancePress, function(){
			cc.Director.getInstance().replaceScene(FightLayer.scene());
		}, this);
		itemImgFight.setPosition(cc.pAdd(VisibleRect.topRight(), cc.p(-300, -300)));

		var menu = cc.Menu.create(itemImgBack, itemImgFight);
		menu.setPosition(cc.p(0, 0));
		this.addChild(menu);

	},
	initMenu:function(){

	}	
});

InstanceLayer.scene = function(){
	var scene = cc.Scene.create();
	var layer = new InstanceLayer();
	layer.init();
	scene.addChild(layer);
	return scene;
};





