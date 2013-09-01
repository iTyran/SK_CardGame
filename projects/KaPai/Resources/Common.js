// common.js

var IMG = IMG || {};

IMG.loginEditBox = "orange_edit.png";
IMG.loginBackGround = "login_background.png";

IMG.loading = "loading.png";
IMG.loadingBg = "loading_bg.png";
IMG.editBox = "edit_box.png";
IMG.loginBox = "login_box.png";
IMG.btnLogin = "btn_login.png";
IMG.btnLoginPress = "btn_login_press.png";
IMG.btnRegister = "btn_register.png";
IMG.btnRegisterPress = "btn_register_press.png";
IMG.btnCancel = "btn_cancel.png";
IMG.btnCancelPress = "btn_cancel_press.png";


var WS = WS || {};

WS.MSG = "web_socket";
WS.LOGIN = "CM_LOGIN";
WS.REGISTER = "CM_REGISTER";


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

