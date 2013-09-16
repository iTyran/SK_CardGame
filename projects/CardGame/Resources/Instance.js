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


		// big level
		var levelBg = cc.Sprite.create(IMG.level["bg"]);
		levelBg.setPosition(cc.pAdd(VisibleRect.top(), cc.p(-180, -130)));
		this.addChild(levelBg);

		var itemLevel1 = cc.MenuItemImage.create(IMG.level["1"], IMG.level["1Press"], function(){
			this.showLevel(1);
		}, this);
		itemLevel1.setPosition(cc.pAdd(levelBg.getPosition(), cc.p(-100, 0)));

		
		var itemImgBack = cc.MenuItemImage.create(IMG.btn.Back, IMG.btn.BackPress, function(){
			cc.Director.getInstance().replaceScene(GameLayer.scene());
		}, this);
		itemImgBack.setPosition(cc.pAdd(VisibleRect.topRight(), cc.p(-120, -120)));

		var menu = cc.Menu.create(itemImgBack, itemLevel1);
		menu.setPosition(cc.p(0, 0));
		this.addChild(menu);

		// default show level 1
		this.showLevel(1); 
	},
	showLevel:function(level){
		var level_tag = 1000;
		this.removeChildByTag(level_tag);
		
		if (level == 1){
			var item1 = cc.MenuItemImage.create(IMG.level["1_1"], IMG.level["1_1"], function(){
				Socket.getInstance().send(WS.RAID, {"Scene": 1, "Stage": 1});
				Gm.getInstance().loading(this);				
			}, this);
			var item2 = cc.MenuItemImage.create(IMG.level["1_2"], IMG.level["1_2"], function(){
				cc.log(" level 1 2");
			}, this);
			var item3 = cc.MenuItemImage.create(IMG.level["1_3"], IMG.level["1_3"], function(){
				cc.log(" level 1 3");
			}, this);
			var item4 = cc.MenuItemImage.create(IMG.level["1_4"], IMG.level["1_4"], function(){
				cc.log(" level 1 4");
			}, this);

			item1.setPosition(cc.pAdd(VisibleRect.center(), cc.p(- 310, 40)));
			item2.setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, 80)));
			item3.setPosition(cc.pAdd(VisibleRect.center(), cc.p(120, -225)));
			item4.setPosition(cc.pAdd(VisibleRect.center(), cc.p(365, -90)));
			
			var menu = cc.Menu.create(item1, item2, item3, item4);
			menu.setPosition(cc.p(0, 0));
			this.addChild(menu, 0, level_tag);			
		}
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
		if (obj && obj.Command == WS.RAID){
			if (obj.Return.Code == 0){
				cc.log(obj);
				var combat = obj.Return.Message;
				Gm.getInstance().unLoading(this);				
				cc.Director.getInstance().replaceScene(FightLayer.scene(combat));
			}
		}

	}
});

InstanceLayer.scene = function(){
	var scene = cc.Scene.create();
	var layer = new InstanceLayer();
	layer.init();
	scene.addChild(layer);
	return scene;
};

