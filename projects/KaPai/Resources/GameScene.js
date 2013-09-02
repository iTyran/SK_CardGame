// gamescene.js

var GameLayer = cc.Layer.extend({
	init:function(){
		if (this._super()){
			cc.log("game scene init ...");
			this.initLayer();
			return true;
		}
		return false;
	},
	initLayer:function(){
		var backGround = cc.Sprite.create(IMG.bgMain);
		backGround.setPosition(VisibleRect.center());
		this.addChild(backGround);

		// add instance
		var itemImgInstance = cc.MenuItemImage.create(IMG.btnInstance, IMG.btnInstancePress, function(){
			cc.Director.getInstance().replaceScene(InstanceLayer.scene());
		}, this);
		itemImgInstance.setPosition(cc.pAdd(VisibleRect.topRight(), cc.p(-200, -200)));

		var menu = cc.Menu.create(itemImgInstance);
		menu.setPosition(cc.p(0, 0));
		this.addChild(menu);

		var us = this.getUserStatus();
		us.setPosition(cc.pAdd(VisibleRect.topLeft(), cc.p(200, -80)));
		this.addChild(us);

	},
	getUserStatus:function(){
		var us = cc.Node.create();
		var usBack = cc.Sprite.create(IMG.usBack);
		var usImg = cc.Sprite.create(IMG.usImg);
		var usImgBack = cc.Sprite.create(IMG.usImgBack);
		var usVit = cc.Sprite.create(IMG.usVit);
		var usName = cc.Sprite.create(IMG.usName);

		usImg.setPosition(cc.p(-120, 0));
		usImgBack.setPosition(cc.p(-120, 0));
		usVit.setPosition(cc.p(30, - 33));
		usName.setPosition(cc.p(5, 22));

		us.addChild(usVit);
		us.addChild(usName);
		us.addChild(usImgBack);
		us.addChild(usImg);
		us.addChild(usBack);

		var name = cc.LabelTTF.create("zilongshanren", "", 24);
		name.setPosition(cc.p(15, 22));
		us.addChild(name);
		return us;
	}
});

GameLayer.scene = function(){
	var scene = cc.Scene.create();
	var layer = new GameLayer();
	layer.init();
	scene.addChild(layer);
	return scene;
};

