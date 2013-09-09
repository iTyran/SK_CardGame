// gamescene.js

var GameLayer = cc.Layer.extend({
	
	init:function(){
		if (this._super()){
			cc.log("game scene init ...");
			this.initLayer();
			this.CharInfo.init(this);
			Socket.getInstance().send(WS.CHAR_GET);
			this.CharInfo.updateInfo();
			return true;
		}
		return false;
	},
	initLayer:function(){
		var backGround = cc.Sprite.create(IMG.bgMain);
		backGround.setPosition(VisibleRect.center());
		this.addChild(backGround);

		// add menu
		var itemImgInstance = cc.MenuItemImage.create(IMG.btn.Instance, IMG.btn.InstancePress, function(){
			cc.Director.getInstance().replaceScene(InstanceLayer.scene());
		}, this);
		var itemImgShop = cc.MenuItemImage.create(IMG.btn.Shop, IMG.btn.ShopPress, function(){
			cc.log("open shop .");
		}, this);
		var itemImgCardUpgrade = cc.MenuItemImage.create(IMG.btn.CardUpgrade, IMG.btn.CardUpgradePress, function(){
			cc.log("card upgrade");
		}, this);
		var itemImgCardGroup = cc.MenuItemImage.create(IMG.btn.CardGroup, IMG.btn.CardGroupPress, function(){
			cc.Director.getInstance().replaceScene(CardGroup.scene());
		}, this);
		
		itemImgInstance.setPosition(cc.pAdd(VisibleRect.topRight(), cc.p(-200, -200)));
		itemImgShop.setPosition(cc.pAdd(VisibleRect.bottomRight(), cc.p(-180, 180)));
		itemImgCardUpgrade.setPosition(cc.pAdd(VisibleRect.center(), cc.p(-220, 90)));
		itemImgCardGroup.setPosition(cc.pAdd(VisibleRect.center(), cc.p(-150, -200)));

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
			Gm.getInstance().setCharInfo(JSON.parse(obj.Return.Message));
			this.CharInfo.updateInfo();
		}
	},
	CharInfo:{
		_name: null,
		_level: null,
		_vit: null,
		
		init:function(node){
			var us = cc.Node.create();
			us.setPosition(cc.pAdd(VisibleRect.topLeft(), cc.p(200, -80)));
			
			var usBack = cc.Sprite.create(IMG.usBack);
			var usImg = cc.Sprite.create(IMG.usImg);
			var usImgBack = cc.Sprite.create(IMG.usImgBack);
			var usName = cc.Sprite.create(IMG.usName);
			var usLevel = cc.Sprite.create(IMG.usLevel);
			this._vit = cc.Sprite.create(IMG.usVit);

			usImg.setPosition(cc.p(-120, 0));
			usImgBack.setPosition(cc.p(-120, 0));
			usName.setPosition(cc.p(5, 22));
			usLevel.setPosition(cc.p(-160, 45));
			
			this._vit.setPosition(cc.p(-100, - 33));
			this._vit.setAnchorPoint(cc.p(0.05, 0.5));
			// usVit.setScaleX(0.1);

			us.addChild(this._vit);
			us.addChild(usName);
			us.addChild(usImgBack);
			us.addChild(usImg);
			us.addChild(usBack);
			us.addChild(usLevel);

			this._name = cc.LabelTTF.create("", "", 24);
			this._name.setPosition(cc.p(15, 22));

			this._level = cc.LabelTTF.create("", "", 24);
			this._level.setPosition(usLevel.getPosition());
			
			us.addChild(this._name);
			us.addChild(this._level);
			
			node.addChild(us);
		},
		updateInfo:function(){
			var info = Gm.getInstance().getCharInfo();
			if(info){
				this._name.setString(info.CharName);
				this._level.setString(info.Level);
				this._vit.setScaleX(info.Vitality / 60);
			}
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

