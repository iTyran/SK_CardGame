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
		var un = cc.Node.create();
		var unBack = cc.Sprite.create(IMG.usBack);

		un.addChild(unBack);
		return un;
	}
});

GameLayer.scene = function(){
	var scene = cc.Scene.create();
	var layer = new GameLayer();
	layer.init();
	scene.addChild(layer);
	return scene;
};

var GalleryLayer = cc.Layer.extend({
	_scrollView: null,
	
	_colorLayer: null,
	_cardWidth: null,
	_cardHeight: null,
	_cardDistance: null,
	_contentSize: null,

	_touchPoint: null,
	_touchOffset: null,
	init:function(){
		if (this._super()){
			
			this._colorLayer = cc.LayerColor.create();
			this._cardWidth = 200;
			this._cardDistance = 40;
			this._cardHeight = 290;
			this._contentSize = VisibleRect.winSize();
			// this._contentSize = cc.size(1024, 768 / 2);

			for (var i = 0; i < 8; i++){
				// var card = cc.Sprite.create("card.png");
				var card = Card.create("card.png");
				
				card.setPosition(cc.p((this._cardWidth + this._cardDistance) * i, this._contentSize.height / 2));
				this._colorLayer.addChild(card, 0, i);
			}

			// this.addChild(this._colorLayer);
			this._scrollView = cc.ScrollView.create(this._contentSize, this._colorLayer);
			this._scrollView.setTouchEnabled(false);
			this._scrollView.setDelegate(this);
			this.addChild(this._scrollView);
			
			this.updateDisplay();
		}
	},
	addCard:function(){
		// cc.log("gallery layer init..");
	},
	onEnter:function(){
		this._super();
		cc.registerTargettedDelegate(0, true, this);
	},
	onExit:function(){
		cc.unregisterTouchDelegate(this);
		this._super();
	},
	scrollViewDidScroll:function(obj){
		this.updateDisplay();
	},
    onTouchBegan:function(touch, event) {
		this._touchPoint = touch.getLocationInView();
		this._touchOffset = this._scrollView.getContentOffset();
		cc.log("on touch begain ...");		
        return true;
    },
	onTouchMoved:function(touch, event){ 
		var movePoint = touch.getLocationInView();
		var distance = movePoint.x - this._touchPoint.x;
		var adjustPoint = cc.p(this._touchOffset.x + distance, 0);
		this._scrollView.setContentOffset(adjustPoint, false);
		cc.log("on touch moved ..");
	},
	onTouchEnded:function(touch, event){
		this.adjustScrollView();
		cc.log("on touch ended ..");
	},
	onTouchCancelled:function(touch, event){
		cc.log("on touch cancelled ..");
	},
	updateDisplay:function(){
		// test
		for (var i = 0; i < 8; i++){
			var card = this._colorLayer.getChildByTag(i);
			card.updateDisplay(this._scrollView.getContentOffset(), this._cardWidth + this._cardDistance);
		}		
	},
	adjustScrollView:function(){
		// end test
		var width = this._cardWidth + this._cardDistance;
		var winOffset = (VisibleRect.winSize().width / 2) % width;
		
		var touchOffset = this._scrollView.getContentOffset();
		var index = Math.round((touchOffset.x - winOffset) / width);

		cc.log("index:" + winOffset);
		var adjustPoint = cc.p(width * index + winOffset, 0);
		this._scrollView.setContentOffsetInDuration(adjustPoint, 0.3);

	}
});

var Card = cc.Node.extend({
	_sprite: null,
	init:function(image){
		this._sprite = cc.Sprite.create(image);
		this._sprite.setScale(0.65);
		this.addChild(this._sprite);
	},
	updateDisplay:function(scrollViewOffset, wd){
		var distance = (this.getPosition().x + scrollViewOffset.x );
		var value = VisibleRect.center().x - distance;

		var temp = value / VisibleRect.center().x / 2.5;
		this.setScale(1 - Math.abs(temp));
		this.getCamera().setEye(10 * temp ,0, 10);

		var x = value / wd;
		this._sprite.setPosition(cc.p(x * x* x* 30, 0));
	}
});

Card.create = function(image){
	var card = new Card();
	card.init(image);
	return card;
};

