// gamescene.js

var GameLayer = cc.Layer.extend({
	
	init:function(){
		if (this._super()){
			cc.log("game scene init ...");
			this.initLayer();
			this.CharInfo.init(this);
			Socket.getInstance().send(WS.CHAR_GET);
			return true;
		}
		return false;
	},
	initLayer:function(){
		var backGround = cc.Sprite.create(IMG.bgMain);
		backGround.setPosition(VisibleRect.center());
		this.addChild(backGround);

		// add menu
		var itemImgInstance = cc.MenuItemImage.create(IMG.btnInstance, IMG.btnInstancePress, function(){
			cc.Director.getInstance().replaceScene(InstanceLayer.scene());
		}, this);
		var itemImgShop = cc.MenuItemImage.create(IMG.btnShop, IMG.btnShopPress, function(){
			cc.log("open shop .");
		}, this);
		var itemImgCardUpgrade = cc.MenuItemImage.create(IMG.btnCardUpgrade, IMG.btnCardUpgradePress, function(){
			cc.log("card upgrade");
		}, this);
		var itemImgCardGroup = cc.MenuItemImage.create(IMG.btnCardGroup, IMG.btnCardGroupPress, function(){
			cc.log("card group");
		}, this);
		
		itemImgInstance.setPosition(cc.pAdd(VisibleRect.topRight(), cc.p(-200, -200)));
		itemImgShop.setPosition(cc.pAdd(VisibleRect.bottomRight(), cc.p(-180, 180)));
		itemImgCardUpgrade.setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, 0)));
		itemImgCardGroup.setPosition(cc.pAdd(VisibleRect.bottom(), cc.p(0, 130)));

		var menu = cc.Menu.create(itemImgInstance, itemImgShop, itemImgCardUpgrade, itemImgCardGroup);
		menu.setPosition(cc.p(0, 0));
		this.addChild(menu);

	},
	onEnter:function(){
		this._super();
		Socket.getInstance().addObserver(this, this.callSocket);
	},
	onExit:function(){
		this._super();
		Socket.getInstance().removeObserver(this);
	},
	callSocket:function(obj){
		if (obj.Command == WS.CHAR_GET && obj.Return.Code == 0){
			this.CharInfo.updateInfo(JSON.parse(obj.Return.Message));
		}
	},
	CharInfo:{
		_name: null,
		
		init:function(node){
			var us = cc.Node.create();
			us.setPosition(cc.pAdd(VisibleRect.topLeft(), cc.p(200, -80)));
			
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

			this._name = cc.LabelTTF.create("", "", 24);
			this._name.setPosition(cc.p(15, 22));
			us.addChild(this._name);
			node.addChild(us);
		},
		updateInfo:function(info){
			this._name.setString(info.CharName);
		}
	}
});

GameLayer.scene = function(){
	var scene = cc.Scene.create();
	var layer = new GameLayer();
	layer.init();
	scene.addChild(layer);
	return scene;
};

