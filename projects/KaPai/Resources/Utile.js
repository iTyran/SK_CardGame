// utiles.js

var MoveLayer = cc.LayerColor.extend({
	_location: null,
	_pBegin: null,
	_label: null,

	_parent: null,
	
	init:function(){
		this._super(cc.c4b(125, 125, 125, 255), 100, 50);
		this._label = cc.LabelTTF.create("(50, 50)", "", 15);
		this._label.setPosition(cc.p(50, 30));
		this.addChild(this._label);
	},
	onEnter:function(){
		cc.registerTargettedDelegate(cc.MENU_HANDLER_PRIORITY, true, this);
		this._super();
		this.updateDisplay();
	},
	onExit:function(){
		cc.unregisterTouchDelegate(this);
		this._super();
	},
	updateDisplay:function(){
		if (this.getParent()){
			var p = this.getParent().getPosition();
			var c = cc.pSub(p, VisibleRect.center());
			var str = "p:(" + p.x + "," + p.y + ")\n";
			str += "c:(" + c.x + "," + c.y + ")\n";
			this._label.setString(str);
		}
	},
	onTouchBegan:function(touch, event){
		if (Utile.containsTouchLocation(this, touch)){
			cc.log("leafsoar kltwjt");
			this._location = this.getParent().getPosition();
			this._pBegin = touch.getLocation();;
			return true;
		}
		return false;
	},
	onTouchMoved:function(touch, event){
		cc.log("touch moved");
		var pMove = touch.getLocation();
		var p = cc.p(pMove.x - this._pBegin.x, pMove.y - this._pBegin.y);
		p = cc.p(Math.round(p.x), Math.round(p.y));
		this.getParent().setPosition(cc.pAdd(this._location, p));
		this.updateDisplay();
	},
	onTouchEnded:function(touch, event){
		cc.log("touch ended");
	}
});

MoveLayer.create = function(){
	var ml = new MoveLayer();
	ml.init();
	return ml; 
};

var Utile = Utile || {};

Utile.canMove = function(node){
	var MoveLayer = cc.LayerColor.extend({
		
	});
	var move = MoveLayer.create(cc.c4b(100, 0, 100, 255), 100, 50);
	move.setPosition(cc.p(-25, -25));
	node.addChild(move);
	cc.registerTargettedDelegate(-128, true, move);

	return;
};

Utile.containsTouchLocation = function(node, touch){
	var size = node.getContentSize();
	var rect = cc.rect(size.width * (1 -node.getScaleX()), size.height * (1 - node.getScaleY()), size.width, size.height);
	return cc.rectContainsPoint(rect, node.convertTouchToNodeSpace(touch));
	
};

Utile.getAnimate = function(dt, images, func, st){
	var am = cc.Animation.create();
	for (var i in images){
		am.addSpriteFrameWithFile(images[i]);
	}
	am.setDelayPerUnit(dt);
	am.setRestoreOriginalFrame(false);
	if (!func)
		return cc.RepeatForever.create(cc.Animate.create(am));
	else
		return cc.Sequence.create(cc.Animate.create(am), cc.CallFunc.create(func, st));
};

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
