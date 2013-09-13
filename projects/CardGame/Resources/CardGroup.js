// CardGroup.js


var CardGroup = cc.Layer.extend({
	init:function(){
		if (this._super()){
			
//			var card = Card.create();
//			card.setPosition(VisibleRect.center());
//			card.addChild(card.getAnimal().getNode());
//			this.addChild(card);
			var cardGallery = new GalleryLayer();
			cardGallery.init();
			cardGallery.setPosition(cc.p(0, -85));
			this.addChild(cardGallery);
			this.initLayer();

			return true;
		}
		return false;
	},
	initLayer:function(){
		var itemImgBack = cc.MenuItemImage.create(IMG.btn.Back, IMG.btn.BackPress, function(){
			cc.Director.getInstance().replaceScene(GameLayer.scene());
		}, this);
		itemImgBack.setPosition(cc.pAdd(VisibleRect.topRight(), cc.p(-80, -80)));
		var btn1 = cc.Sprite.create(IMG.btn.Back);
		btn1.setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, 130)));
		this.addChild(btn1);

		var menu = cc.Menu.create(itemImgBack);
		menu.setPosition(cc.p(0, 0));
		this.addChild(menu);
		var CardGroup = cc.Scale9Sprite.create(IMG.cardGroup);
		CardGroup.setContentSize(cc.size(800, 160));
		var dogFace1 = cc.Sprite.create(IMG.dogFace["001"]);
		var dogFace2 = cc.Sprite.create(IMG.dogFace["002"]);
		var dogFace3 = cc.Sprite.create(IMG.dogFace["003"]);
		var dogFace4 = cc.Sprite.create(IMG.dogFace["004"]);
		var dogFace5 = cc.Sprite.create(IMG.dogFace["005"]);

		CardGroup.setPosition(cc.p(450, 650));
		dogFace1.setPosition(cc.p(150, 650));
		dogFace2.setPosition(cc.p(300, 650));
		dogFace3.setPosition(cc.p(450, 650));
		dogFace4.setPosition(cc.p(600, 650));
		dogFace5.setPosition(cc.p(750, 650));

		this.addChild(CardGroup);
		this.addChild(dogFace1);
		this.addChild(dogFace2);
		this.addChild(dogFace3);
		this.addChild(dogFace4);
		this.addChild(dogFace5);

		return;
	}
});

CardGroup.scene = function(){
	var scene = cc.Scene.create();
	var layer = new CardGroup();
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
				// var card = Card.create("card.png");
				var card = Card.create();
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
		cc.log("x = " + this._touchPoint.x + "y = " + this._touchPoint.y);
		if (this._touchPoint.y >= 300 && this._touchPoint.y <= 655){
			this._touchOffset = this._scrollView.getContentOffset();
		}
		else{
			this._touchOffset = null;
		}
		cc.log("on touch begain ...");		
		cc.log("Xn = " + this.convertTouchToNodeSpace(touch).x + " Yn = " + this.convertTouchToNodeSpace(touch).y);
		if ((this._touchPoint.x >= 460 && this._touchPoint.x <= 555) && (this._touchPoint.y >= 200 && this._touchPoint.y <= 670)) {
			cc.log("Touched logo");
		}
        return true;
    },
	onTouchMoved:function(touch, event){ 
		var movePoint = touch.getLocationInView();
		var distance = movePoint.x - this._touchPoint.x;
		var adjustPoint = cc.p(this._touchOffset.x + distance, 0);
		if (adjustPoint.x >= 528) {
			adjustPoint.x = 528;
		}
		else if (adjustPoint.x <= -1228) {
			adjustPoint.x = -1228;
		}
		this._scrollView.setContentOffset(adjustPoint, false);
		cc.log("on touch moved .. " + adjustPoint.x);
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
			var scale = card.getScaleX();
			card.setScale(scale * 0.75);
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


GalleryLayer.scene = function(){
	var scene = cc.Scene.create();
	var layer = new GalleryLayer();
	layer.init();
	scene.addChild(layer);
	cc.log("gallery layer ");
	return scene;
};



// var Card = cc.Node.extend({
// 	_sprite: null,
// 	init:function(image){
// 		this._sprite = cc.Sprite.create(image);
// 		this._sprite.setScale(0.65);
// 		this.addChild(this._sprite);
// 	},
// });

// Card.create = function(image){
// 	var card = new Card();
// 	card.init(image);
// 	return card;
// };
