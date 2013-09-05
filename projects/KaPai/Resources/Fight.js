// FightLayer.js

var FightLayer = cc.Layer.extend({
	_dogs: null,
	_cats: null,

	_nFight: null,
	init:function(){
		if (this._super()){
			this.initLayer();

			return true;
		}
		cc.log("fight layer init ...");
		return false;
	},
	initLayer:function(){
		
		var fightBackground = cc.Sprite.create(IMG.fightBackground);
		var cs = fightBackground.getContentSize();
		this._nFight = cc.LayerColor.create(cc.c4b(255, 0, 0, 100), cs.width, cs.height);
		this._nFight.setAnchorPoint(cc.p(0.5 ,0));
		var p = cc.pSub(VisibleRect.topRight(), cc.p(cs.width, cs.height));
		this.setPosition(cc.p(p.x / 2, p.y / 2));
		this.addChild(this._nFight);

		var node = cc.Node.create();
		node.setPosition(cc.p(cs.width / 2, cs.height / 2));
		node.addChild(fightBackground);
		this._nFight.addChild(node);

		var eye = this._nFight.getCamera().getEye();
		var z = eye.z + 300;
		this._nFight.setVertexZ(300);
		this._nFight.getCamera().setEye(eye.x, -z * 0.1, z);
		// this._nFight.getCamera().setEye(eye.x, 800, 30);
		
		// add cards
		this._dogs = [];
		this._dogs.push(Card.create(C.DOG, 4));
		this._dogs.push(Card.create(C.DOG, 3));
		this._dogs.push(Card.create(C.DOG, 2));		
		this._dogs.push(Card.create(C.DOG, 1));
		this._dogs.push(Card.create(C.DOG, 0));

		this._cats = [];
		this._cats.push(Card.create(C.CAT, 4));
		this._cats.push(Card.create(C.CAT, 3));
		this._cats.push(Card.create(C.CAT, 2));
		this._cats.push(Card.create(C.CAT, 1));
		this._cats.push(Card.create(C.CAT, 0));
		
		for(var id = 0; id < this._dogs.length; id++){
			node.addChild(this._dogs[id]);
			this._dogs[id].display();
		}
			
		for(var ic = 0; ic < this._cats.length; ic++){
			node.addChild(this._cats[ic]);
			this._cats[ic].display();			
		}

		var dog = Card.create(C.DOG, 0);
		dog.setPosition(cc.p(0, 0));
		dog.display();
		node.addChild(dog);

		var test = cc.Sprite.create(IMG.cardDog1);
		test.setPosition(cc.p(20, 100));
		test.setScale(0.44);
		this.addChild(test);
	}
});

FightLayer.scene = function(){
	var scene = cc.Scene.create();
	var layer = new FightLayer();
	layer.init();
	scene.addChild(layer);
	return scene;
};

var Card = cc.Node.extend({
	
	_hp: null,
	_at: null,

	_skillA: null,
	_skillB: null,

	_sAnimal: null,
	
	init:function(){
		if (this._super()){
			var sprite = cc.Sprite.create(IMG.cardPurple);
			var status = cc.Sprite.create(IMG.cardPurpleStatus);
			var at = cc.Sprite.create(IMG.cardAt);
			var hp = cc.Sprite.create(IMG.cardHp);
			var skillA = cc.Sprite.create(IMG.cardSkill1);
			var skillB = cc.Sprite.create(IMG.cardSkill2);

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

			// var tag = 
			// var a = cc.p(0, -50);
			// tag.setPosition(cc.pAdd(cc.p(-40, -4), a));
			// this.addChild(tag);

			return true;
		}
		return false;
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
	card.setScale(0.44);
	var p = Card.position[index];
	var point = type == C.CAT ? cc.p(-p.x, p.y): p;
	card.setPosition(point);
	return card;
};
