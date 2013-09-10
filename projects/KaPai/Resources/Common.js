// common.js

// config
var C = C || {};
C.DOG = "card_dog";
C.CAT = "card_cat";

// images 
var IMG = IMG || {};

IMG.loginEditBox = "orange_edit.png";
IMG.loginBackGround = "login_background.png";

IMG.loading = "loading.png";
IMG.loadingBg = "loading_bg.png";
IMG.editBox = "edit_box.png";
IMG.loginBox = "login_box.png";

IMG.bgMain = "bg_instance.png";
IMG.bgInstance = "bg_instance.png";

IMG.btn = {
	"Login": "btn_login.png",
	"LoginPress": "btn_login_press.png",
	"Register": "btn_register.png",
	"RegisterPress": "btn_register_press.png",
	"Cancel": "btn_cancel.png",
	"CancelPress": "btn_cancel_press.png",
	"Create": "btn_create.png",
	"CreatePress": "btn_create_press.png",
	"Back": "btn_back.png",
	"BackPress": "btn_back_press.png",

	"Instance": "btn_instance.png",
	"InstancePress": "btn_instance_press.png",
	"Shop": "btn_shop.png",
	"ShopPress": "btn_shop_press.png",
	"CardUpgrade": "btn_card_upgrade.png",
	"CardUpgradePress": "btn_card_upgrade_press.png",
	"CardGroup": "btn_card_group.png",
	"CardGroupPress": "btn_card_group_press.png"
};


// user status
IMG.usImgBack = "us_img_back.png";
IMG.usImg = "us_img.png";
IMG.usName = "us_name.png";
IMG.usBack = "us_back.png";
IMG.usVit = "us_vit.png";
IMG.usLevel = "us_level.png";

IMG.fightBackground = "fight_background.png";

IMG.cardAt = "card_at.png";
IMG.cardHp = "card_hp.png";

IMG.cardGround = "card_group.png";

// IMG.cardPurpleStatus = "";
// IMG.cardGreenStatus = "card_green_status.png";
// IMG.cardOrangeStatus = "card_orange_status.png";


IMG.card = {
	"Orange": "card_orange.png",
	"Green": "card_green.png",
	"Purple": "card_purple.png",
	"Status": {
		"Orange": "card_orange_status.png",
		"Green": "card_green_status.png",
		"Purple": "card_purple_status.png"
	}	
};

IMG.attack = [
	"attack_1.png",
	"attack_2.png",
	"attack_3.png",
	"attack_4.png",
	"attack_5.png",
	"attack_6.png",
	"attack_7.png"
];

IMG.hurt = [
	"hurt_1.png",
	"hurt_2.png",
	"hurt_3.png"
];

IMG.dog = {
	"001": "card_dog_1.png",
	"002": "card_dog_2.png",
	"003": "card_dog_3.png",
	"004": "card_dog_4.png",
	"005": "card_dog_5.png"
};

IMG.dogFace = {
	"001": "card_dog_face_1.png",
	"002": "card_dog_face_2.png",
	"003": "card_dog_face_3.png",
	"004": "card_dog_face_4.png",
	"005": "card_dog_face_5.png"
};

IMG.skill = {
	"001": "card_skill_1.png",
	"002": "card_skill_2.png"
};

var WS = WS || {};

WS.MSG = "web_socket";
WS.LOGIN = "CM_LOGIN";
WS.REGISTER = "CM_REGISTER";
WS.CHAR_CREATE = "CM_CHAR_CREATE";
WS.CHAR_GET = "CM_CHAR_GET";

cc.s_sharedNotificationCenter = null;

cc.NotificationCenter = cc.Class.extend({
    ctor:function() {
        this._observers = [];
    },

    /**
     * @param {cc.Class} target
     * @param {String} selector
     * @param {String} name
     * @param {cc.Class} obj
     */
    addObserver:function(target, selector, name, obj) {
        if (this._observerExisted(target, name))
            return;

        var observer = new cc.NotificationObserver(target, selector, name, obj);
        if (!observer)
            return;

        this._observers.push(observer);
    },

    /**
     * Removes the observer by the specified target and name.
     * @param {cc.Class} target
     * @param {String} name
     */
    removeObserver:function(target, name) {
        for (var i = 0; i < this._observers.length; i++) {
            var observer = this._observers[i];
            if (!observer)
                continue;
            if (observer.getName() == name && observer.getTarget() == target) {
                this._observers.splice(i, 1);
                return;
            }
        }
    },

    /**
     * Removes all notifications registered by this target
     * @param {cc.Class} target  The target of this notification.
     * @returns {number} the number of observers removed
     */
    removeAllObservers:function(target){
        var removes = [];
        for(var i = 0; i< this._observers.length;i++){
            var selObserver = this._observers[i];
            if(selObserver.getTarget() == target)
                removes.push(selObserver);
        }
        cc.ArrayRemoveArray(this._observers, removes);
        return removes.length;
    },

    /**
     * @param {String} name
     * @param {cc.Class} object
     */
    postNotification:function(name, object) {
        for (var i = 0; i < this._observers.length; i++) {
            var observer = this._observers[i];
            if (!observer)
                continue;
            if (observer.getName() == name)
                observer.performSelector(object);
        }
    },

    /**
     * @param {cc.Class} target
     * @param {String} name
     * @return {Boolean}
     * @private
     */
    _observerExisted:function(target, name) {
        for (var i = 0; i < this._observers.length; i++)
        {
            var observer = this._observers[i];
            if (!observer)
                continue;
            if (observer.getName() == name && observer.getTarget() == target)
                return true;
        }
        return false;
    },
    _observers:null
});

/**
 * @return {cc.NotificationCenter}
 */
cc.NotificationCenter.getInstance = function() {
    if (!cc.s_sharedNotificationCenter) {
        cc.s_sharedNotificationCenter = new cc.NotificationCenter();
    }
    return cc.s_sharedNotificationCenter;
};

cc.NotificationObserver = cc.Class.extend({

    /**
     * @param {cc.Class} target
     * @param {String} selector
     * @param {String} name
     * @param {cc.Class} obj
     */
    ctor:function (target, selector, name, obj) {
        this._target = target;
        this._selector = selector;
        this._name = name;
        this._object = obj;
    },

    /**
     * @param {cc.Class} obj
     */
    performSelector:function (obj) {
        if (this._target && (typeof(this._selector) == "string")) {
            this._target[this._selector](obj);
        } else if (this._target && (typeof(this._selector) == "function")) {
            this._selector.call(this._target, obj);
        } else {
            this._selector(obj);
        }
    },

    _target:null,
    _selector:null,
    _name:null,
    _object:null,

    /**
     * @return {cc.Class}
     */
    getTarget:function () {
        return this._target;
    },

    /**
     * @return {String}
     */
    getSelector:function () {
        return this._selector;
    },

    /**
     * @return {String}
     */
    getName:function () {
        return this._name;
    },

    /**
     * @return {cc.Class}
     */
    getObject:function () {
        return this._object;
    }
});

var s_winSize = cc.size(0, 0);
var s_rcVisible = cc.rect(0, 0, 0, 0);
var s_ptCenter = cc.p(0, 0);
var s_ptTop = cc.p(0, 0);
var s_ptTopRight = cc.p(0, 0);
var s_ptRight = cc.p(0, 0);
var s_ptBottomRight = cc.p(0, 0);
var s_ptBottom = cc.p(0, 0);
var s_ptLeft = cc.p(0, 0);
var s_ptTopLeft = cc.p(0, 0);

var VisibleRect = {
	winSize:function(){
		if (s_winSize.width == 0){
			s_winSize = cc.Director.getInstance().getWinSize();
		}
		return s_winSize;
	},
	rect:function () {
		if (s_rcVisible.width == 0) {
			var s = cc.Director.getInstance().getWinSize();
			s_rcVisible = cc.rect(0, 0, s.width, s.height);
		}
		return s_rcVisible;
	},
	center:function () {
		if (s_ptCenter.x == 0) {
			var rc = VisibleRect.rect();
			s_ptCenter.x = rc.x + rc.width / 2;
			s_ptCenter.y = rc.y + rc.height / 2;
		}
		return s_ptCenter;
	},
	top:function () {
		if (s_ptTop.x == 0) {
			var rc = VisibleRect.rect();
			s_ptTop.x = rc.x + rc.width / 2;
			s_ptTop.y = rc.y + rc.height;
		}
		return s_ptTop;
	},
	topRight:function () {
		if (s_ptTopRight.x == 0) {
			var rc = VisibleRect.rect();
			s_ptTopRight.x = rc.x + rc.width;
			s_ptTopRight.y = rc.y + rc.height;
		}
		return s_ptTopRight;
	},
	right:function () {
		if (s_ptRight.x == 0) {
			var rc = VisibleRect.rect();
			s_ptRight.x = rc.x + rc.width;
			s_ptRight.y = rc.y + rc.height / 2;
		}
		return s_ptRight;
	},
	bottomRight:function () {
		if (s_ptBottomRight.x == 0) {
			var rc = VisibleRect.rect();
			s_ptBottomRight.x = rc.x + rc.width;
			s_ptBottomRight.y = rc.y;
		}
		return s_ptBottomRight;
	},
	bottom:function () {
		if (s_ptBottom.x == 0) {
			var rc = VisibleRect.rect();
			s_ptBottom.x = rc.x + rc.width / 2;
			s_ptBottom.y = rc.y;
		}
		return s_ptBottom;
	},
	bottomLeft:function () {
		return VisibleRect.rect();
	},
	left:function () {
		if (s_ptLeft.x == 0) {
			var rc = VisibleRect.rect();
			s_ptLeft.x = rc.x;
			s_ptLeft.y = rc.y + rc.height / 2;
		}
		return s_ptLeft;
	},
	topLeft:function () {
		if (s_ptTopLeft.x == 0) {
			var rc = VisibleRect.rect();
			s_ptTopLeft.x = rc.x;
			s_ptTopLeft.y = rc.y + rc.height;
		}
		return s_ptTopLeft;
	}
};

var LoadingLayer = cc.Layer.extend({
	init:function(){
		var loadingBg = cc.Sprite.create(IMG.loadingBg);
		loadingBg.setPosition(VisibleRect.center());
		this.addChild(loadingBg);

		var loading = cc.Sprite.create(IMG.loading);
		loading.setPosition(VisibleRect.center());
		this.addChild(loading);

		var action = cc.RotateBy.create(2, 360);
		loading.runAction(cc.RepeatForever.create(action));
	},
	onEnter:function(){
		cc.registerTargettedDelegate(cc.MENU_HANDLER_PRIORITY, true, this);
		this._super();
	},
	onExit:function(){
		cc.unregisterTouchDelegate(this);
		this._super();
	},
	onTouchBegan:function(){
		return true;
	}
});


// var GalleryLayer = cc.Layer.extend({
// 	_scrollView: null,
	
// 	_colorLayer: null,
// 	_cardWidth: null,
// 	_cardHeight: null,
// 	_cardDistance: null,
// 	_contentSize: null,

// 	_touchPoint: null,
// 	_touchOffset: null,
// 	init:function(){
// 		if (this._super()){
			
// 			this._colorLayer = cc.LayerColor.create();
// 			this._cardWidth = 200;
// 			this._cardDistance = 40;
// 			this._cardHeight = 290;
// 			this._contentSize = VisibleRect.winSize();
// 			// this._contentSize = cc.size(1024, 768 / 2);

// 			for (var i = 0; i < 8; i++){
// 				// var card = cc.Sprite.create("card.png");
// 				var card = Card.create("card.png");
				
// 				card.setPosition(cc.p((this._cardWidth + this._cardDistance) * i, this._contentSize.height / 2));
// 				this._colorLayer.addChild(card, 0, i);
// 			}

// 			// this.addChild(this._colorLayer);
// 			this._scrollView = cc.ScrollView.create(this._contentSize, this._colorLayer);
// 			this._scrollView.setTouchEnabled(false);
// 			this._scrollView.setDelegate(this);
// 			this.addChild(this._scrollView);
			
// 			this.updateDisplay();
// 		}
// 	},
// 	addCard:function(){
// 		// cc.log("gallery layer init..");
// 	},
// 	onEnter:function(){
// 		this._super();
// 		cc.registerTargettedDelegate(0, true, this);
// 	},
// 	onExit:function(){
// 		cc.unregisterTouchDelegate(this);
// 		this._super();
// 	},
// 	scrollViewDidScroll:function(obj){
// 		this.updateDisplay();
// 	},
//     onTouchBegan:function(touch, event) {
// 		this._touchPoint = touch.getLocationInView();
// 		this._touchOffset = this._scrollView.getContentOffset();
// 		cc.log("on touch begain ...");		
//         return true;
//     },
// 	onTouchMoved:function(touch, event){ 
// 		var movePoint = touch.getLocationInView();
// 		var distance = movePoint.x - this._touchPoint.x;
// 		var adjustPoint = cc.p(this._touchOffset.x + distance, 0);
// 		this._scrollView.setContentOffset(adjustPoint, false);
// 		cc.log("on touch moved ..");
// 	},
// 	onTouchEnded:function(touch, event){
// 		this.adjustScrollView();
// 		cc.log("on touch ended ..");
// 	},
// 	onTouchCancelled:function(touch, event){
// 		cc.log("on touch cancelled ..");
// 	},
// 	updateDisplay:function(){
// 		// test
// 		for (var i = 0; i < 8; i++){
// 			var card = this._colorLayer.getChildByTag(i);
// 			card.updateDisplay(this._scrollView.getContentOffset(), this._cardWidth + this._cardDistance);
// 		}		
// 	},
// 	adjustScrollView:function(){
// 		// end test
// 		var width = this._cardWidth + this._cardDistance;
// 		var winOffset = (VisibleRect.winSize().width / 2) % width;
		
// 		var touchOffset = this._scrollView.getContentOffset();
// 		var index = Math.round((touchOffset.x - winOffset) / width);

// 		cc.log("index:" + winOffset);
// 		var adjustPoint = cc.p(width * index + winOffset, 0);
// 		this._scrollView.setContentOffsetInDuration(adjustPoint, 0.3);

// 	}
// });

// var Card = cc.Node.extend({
// 	_sprite: null,
// 	init:function(image){
// 		this._sprite = cc.Sprite.create(image);
// 		this._sprite.setScale(0.65);
// 		this.addChild(this._sprite);
// 	},
// 	updateDisplay:function(scrollViewOffset, wd){
// 		var distance = (this.getPosition().x + scrollViewOffset.x );
// 		var value = VisibleRect.center().x - distance;

// 		var temp = value / VisibleRect.center().x / 2.5;
// 		this.setScale(1 - Math.abs(temp));
// 		this.getCamera().setEye(10 * temp ,0, 10);

// 		var x = value / wd;
// 		this._sprite.setPosition(cc.p(x * x* x* 30, 0));
// 	}
// });

// Card.create = function(image){
// 	var card = new Card();
// 	card.init(image);
// 	return card;
// };

