// gamemanager.js

var s_gameManager = null;

var Gm = cc.Class.extend({
	getLoginUser:function(){
		
	},
	loading:function(layer){
		
	}
});

Gm.getInstance = function(){
	if (!s_gameManager){
		s_gameManager = new Gm();
	}
	return s_gameManager;
};
