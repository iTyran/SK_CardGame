// Card.js

var Animal = cc.Class.extend({
	_layer: null,
	_card: null,
	_center: null,

	_animate: null,
	
	init:function(node){
		this._card = node;

		var an = cc.Sprite.create(IMG.dog["001"]);
		var cs = an.getContentSize();
		this._center = cc.p(cs.width / 2, cs.height / 2);
		this._layer = cc.LayerColor.create(cc.c4b(0, 0, 125, 125), cs.width, cs.height);
		this._layer.setPosition(cc.p(-cs.width / 2, -cs.height / 2 + 50));
		this._layer.setAnchorPoint(cc.p(0.5, 0));
		this._layer.addChild(an);
		an.setPosition(this._center);
	},
	getNode:function(){
		return this._layer;
	},
	attack:function(){
		if (!this._animate){
			this._animate = cc.Sprite.create(IMG.attack[0]);
			this._animate.setPosition(cc.pAdd(this._center, cc.p(30, 0)));
			this._layer.addChild(this._animate);
			this._animate.runAction(Utile.getAnimate(0.1, IMG.attack, this.unAnimate, this));
			// this._attack.runAction(Utile.getAnimate(0.1, IMG.attack));
		}
	},
	hurt:function(){
		if (!this._animate){
			this._animate = cc.Sprite.create(IMG.hurt[0]);
			this._animate.setPosition(cc.pAdd(this._center, cc.p(0, 0)));
			this._layer.addChild(this._animate);
			this._animate.runAction(Utile.getAnimate(0.2, IMG.hurt, this.unAnimate, this));
			// this._animate.runAction(Utile.getAnimate(0.2, IMG.hurt));
		}
	},
	unAnimate:function(){
		if (this._animate){
			this._animate.removeFromParent();
		}
	}
}
							);

var Card = cc.Node.extend({
	
	_hp: null,
	_atk: null,
	_level: null,
	_name: null,
	
	_skillA: null,
	_skillB: null,
	_sAnimal: null,

	_node: null,

	init:function(){
		if (this._super()){
			this.initLayer();

			var animal = new Animal();
			animal.init(this);
			this._sAnimal = animal.getNode();
			// this.addChild(this._sAnimal);

			var info = {};
			info.Name = "巡逻兵";
			info.ID = "001";
			info.Level = 1;
			info.HP = 380;
			info.ATK = 110;
			info.Skill = ["001", "002"];
			
			this.updateInfo(info);

			return true;
		}
		return false;
	},
	initLayer:function(){
		this._node = cc.Node.create();
		this.addChild(this._node);
		
		var sprite = cc.Sprite.create(IMG.card.Purple);
		var status = cc.Sprite.create(IMG.card.Status.Purple);
		var skillA = cc.Sprite.create(IMG.skill["001"]);
		var skillB = cc.Sprite.create(IMG.skill["002"]);

		// var t = cc.TextureCache.getInstance().addImage(IMG.skill["001"]);
		// skillB.setTexture(t);

		status.setPosition(cc.p(0, -100));
		skillA.setPosition(cc.p(103, -57));
		skillB.setPosition(cc.p(82, -112));

		this._node.addChild(sprite);
		this._node.addChild(status);
		this._node.addChild(skillA);
		this._node.addChild(skillB);

		this._level = cc.LabelTTF.create("1", "", 24);
		this._level.setPosition(cc.p(122, 208));
		this._node.addChild(this._level);

		this._name = cc.LabelTTF.create("zlong", "", 34);
		this._name.setPosition(cc.p(0, 208));
		this._node.addChild(this._name);

		this._hp = cc.LabelTTF.create("1", "", 24);
		this._hp.setPosition(cc.p(-40, -126));
		this._node.addChild(this._hp);

		this._atk = cc.LabelTTF.create("1", "", 24);
		this._atk.setPosition(cc.p(-5, -162));
		this._node.addChild(this._atk);
	},
	updateInfo:function(info){
		this._level.setString(info.Level);
		this._name.setString(info.Name);
		this._hp.setString(info.HP);
		this._atk.setString(info.ATK);
	},
	getAnimal:function(){
		return this._sAnimal;
	},
	updateDisplay:function(scrollViewOffset, wd){
		var distance = (this.getPosition().x + scrollViewOffset.x );
		var value = VisibleRect.center().x - distance;

		var temp = value / VisibleRect.center().x / 2.5;
		this.setScale(1 - Math.abs(temp));
		this.getCamera().setEye(10 * temp ,0, 10);

		var x = value / wd;

		var offset = cc.p(x * x* x* 30, 0);
		this._node.setPosition(offset);
	}
	
});

Card.position = [
	cc.p(-198, -120),
	cc.p(-198, 120),
	cc.p(-370, -225),
	cc.p(-370, 0),
	cc.p(-370, 225)
];

Card.create = function(type, index){
	var card = new Card();
	card.init();
	if (type){
		card.setScale(0.44);
		var p = Card.position[index];
		var point = type == C.CAT ? cc.p(-p.x, p.y): p;
		card.setPosition(point);
	}
	return card;
};
