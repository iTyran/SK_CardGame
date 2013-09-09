// CardGroup.js

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

		// node.addChild(this._layer);
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
	_at: null,
	_level: null,
	_name: null,
	
	_skillA: null,
	_skillB: null,
	_sAnimal: null,

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
		var sprite = cc.Sprite.create(IMG.card.Purple);
		var status = cc.Sprite.create(IMG.card.Status.Purple);
		var at = cc.Sprite.create(IMG.cardAt);
		var hp = cc.Sprite.create(IMG.cardHp);
		var skillA = cc.Sprite.create(IMG.skill["001"]);
		var skillB = cc.Sprite.create(IMG.skill["002"]);

		// var t = cc.TextureCache.getInstance().addImage(IMG.skill["001"]);
		// skillB.setTexture(t);

		status.setPosition(cc.p(0, -100));
		hp.setPosition(cc.p(-39, -128));
		at.setPosition(cc.p(-13, -163));
		skillA.setPosition(cc.p(103, -57));
		skillB.setPosition(cc.p(82, -112));

		this.addChild(sprite);
		this.addChild(at);
		this.addChild(hp);
		this.addChild(status);
		this.addChild(skillA);
		this.addChild(skillB);

		this._level = cc.LabelTTF.create("3", "", 24);
		this._level.setPosition(cc.p(-122, -208));
		this.addChild(this._level);

		this._name = cc.LabelTTF.create("zlong", "", 34);
		this._name.setPosition(cc.p(0, 208));
		this.addChild(this._name);

	},
	updateInfo:function(info){
		this._level.setString(info.Level);
		this._name.setString(info.Name);
	},
	getAnimal:function(){
		return this._sAnimal;
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

var CardGroup = cc.Layer.extend({
	init:function(){
		if (this._super()){

			var card = Card.create();
			card.setPosition(VisibleRect.center());
			this.addChild(card);
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

		var menu = cc.Menu.create(itemImgBack);
		menu.setPosition(cc.p(0, 0));
		this.addChild(menu);
		
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









