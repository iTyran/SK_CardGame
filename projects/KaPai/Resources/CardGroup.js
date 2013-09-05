// CardGroup.js

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
			var sprite = cc.Sprite.create(IMG.cardPurple);
			var status = cc.Sprite.create(IMG.cardPurpleStatus);
			var at = cc.Sprite.create(IMG.cardAt);
			var hp = cc.Sprite.create(IMG.cardHp);
			var skillA = cc.Sprite.create(IMG.skill["001"]);
			var skillB = cc.Sprite.create(IMG.skill["002"]);

			var t = cc.TextureCache.getInstance().addImage(IMG.skill["001"]);
			skillB.setTexture(t);

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

			var an = cc.Sprite.create(IMG.cardDog1);
			var cs = an.getContentSize();
			this._sAnimal = cc.LayerColor.create(cc.c4b(0, 0, 125, 125), cs.width, cs.height);
			this._sAnimal.setPosition(cc.p(-cs.width / 2, -cs.height / 2 + 50));
			this._sAnimal.setAnchorPoint(cc.p(0.5, 0));
			this._sAnimal.addChild(an);
			an.setPosition(cc.p(cs.width / 2, cs.height / 2));
			this.addChild(this._sAnimal);

			this._level = cc.LabelTTF.create("3", "", 24);
			this._level.setPosition(cc.p(-122, -208));
			this.addChild(this._level);

			this._name = cc.LabelTTF.create("zlong", "", 24);
			this._name.setPosition(cc.p(0, 208));
			this.addChild(this._name);

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
	updateInfo:function(info){
		this._level.setString(info.Level);
		this._name.setString(info.Name);
	},
	display:function(){
		// var eye = this._sAnimal.getCamera().getEye();
		// var eye = this._sAnimal.getCamera().getCenterXYZ();
		// cc.log("display: " + eye.x + " " + eye.y + " " + eye.z);
		// this._sAnimal.getCamera().setEye(eye.x, eye.z * 20000000 , eye.z * 2 );
		// this._sAnimal.getCamera().setEye(eye.x, eye.y , eye.z);
		// this.getCamera().setEye(eye.z * -0.3, eye.z * 0.3, eye.z);
		this._sAnimal.getCamera().restore();
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
	// card.setScale(0.44);
	var p = Card.position[index];
	var point = type == C.CAT ? cc.p(-p.x, p.y): p;
	// card.setPosition(point);
	return card;
};

var CardGroup = cc.Layer.extend({
	init:function(){
		if (this._super()){

			var card = Card.create(C.DOG, 0);
			card.setPosition(VisibleRect.center());
			this.addChild(card);
			this.initLayer();

			return true;
		}
		return false;
	},
	initLayer:function(){

		

		var itemImgBack = cc.MenuItemImage.create(IMG.btnBack, IMG.btnBackPress, function(){
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









