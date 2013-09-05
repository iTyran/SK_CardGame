// utiles.js

// var Utile = Utile || {};

// Utile.canMove = function(node){
// 	var MoveLayer = cc.LayerColor.extend({
		
// 	});
// 	var move = MoveLayer.create(cc.c4b(100, 0, 100, 255), 100, 50);
// 	move.setPosition(cc.p(-25, -25));
// 	node.addChild(move);
// 	cc.registerTargettedDelegate(-128, true, move);

// 	return;
// };


var Check = Check || {};

Check.notNull = function(str){
	if (!str) return false;
	if (!str.trim().length > 0) return false;		
	return true;
};

Check.isEmail = function(str){
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(str);
};

cc.log("utiles.js");
