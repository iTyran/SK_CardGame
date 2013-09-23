// gamemanager.js

var s_gameManager = null;

var Gm = cc.Class.extend({
	_charInfo: null,
	_loadingNode: null,
	getCacheLoginUser:function(){
		var cacheUser = {};
		cacheUser.Username = sys.localStorage.getItem("Username");
		cacheUser.Password = sys.localStorage.getItem("Password");
		return cacheUser;
	},
	setCacheLoginUser:function(user){
		sys.localStorage.setItem("Username", user.Username);
		sys.localStorage.setItem("Password", user.Password);
	},
	loading:function(node){
		if (!this._loadingParent){
			var layer = new LoadingMode();
			layer.init();
			node.addChild(layer);
			this._loadingNode = layer;
		}else{
			cc.log("error loading layer ..");
		}
	},
	unLoading:function(){
		if (!this._loadingNode){
			cc.log("error unloading layer ..");
		}else{
			this._loadingNode.getParent().removeChild(this._loadingNode);
			this._loadingNode = null;
		}
		cc.log("");
	},
	getCharInfo:function(){
		return this._charInfo;
	},
	setCharInfo:function(info){
		this._charInfo = info;
	}
});

Gm.getInstance = function(){
	if (!s_gameManager){
		s_gameManager = new Gm();
	}
	return s_gameManager;
};
