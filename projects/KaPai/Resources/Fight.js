 // FightLayer.js

var FightLayer = cc.Layer.extend({
	_dogs: null,
	_cats: null,

	_nFight: null,
	_bgSize: null,
	_bgOffset: null,

	_animalNode: null,
	
	init:function(){
		cc.log("fight layer init ...");
		if (this._super()){
			this._bgOffset = cc.size(98, 92);

			// test start combat
			var json = cc.FileUtils.getInstance().getStringFromFile("json/combat.json");
			this.startCombat(JSON.parse(json));

			this.initDisplay();			

			return true;
		}
		return false;
	},
	startCombat:function(combat){
		var dogs = combat.My;
		this._dogs = [];		
		for(var di in dogs){
			var dog = dogs[di];
			dog.Type = C.DOG;
			this._dogs.push(Card.createWithCombat(dog));
		}
		var cats = combat.Monster;
		this._cats = [];
		for(var ci in cats){
			var cat = cats[ci];
			cat.Type = C.CAT;
			this._cats.push(Card.createWithCombat(cat));
		}
		this.initCard();
	},
	initCard:function(){
		
		var fightBackground = cc.Sprite.create(IMG.fightBackground);
		var cs = fightBackground.getContentSize();
		this._bgSize = cs;
		this._nFight = cc.LayerColor.create(cc.c4b(255, 0, 0, 100), cs.width, cs.height);
		this._nFight.setAnchorPoint(cc.p(0.5 ,0));

		this._animalNode = cc.Node.create();
		this._animalNode.setPosition(cc.p(cs.width / 2, cs.height / 2));

		var p = cc.pSub(VisibleRect.topRight(), cc.p(cs.width, cs.height));
		this.setPosition(cc.p(p.x / 2, p.y / 2));
		this.addChild(this._nFight);		
		this.addChild(this._animalNode);

		var node = cc.Node.create();
		node.setPosition(cc.p(cs.width / 2, cs.height / 2));
		node.addChild(fightBackground);
		this._nFight.addChild(node);

		// add cards
		// this._dogs = [];
		// this._dogs.push(Card.create(C.DOG, 4));
		// this._dogs.push(Card.create(C.DOG, 3));
		// this._dogs.push(Card.create(C.DOG, 2));		
		// this._dogs.push(Card.create(C.DOG, 1));
		// this._dogs.push(Card.create(C.DOG, 0));

		// this._cats = [];
		// this._cats.push(Card.create(C.CAT, 4));
		// this._cats.push(Card.create(C.CAT, 3));
		// this._cats.push(Card.create(C.CAT, 2));
		// this._cats.push(Card.create(C.CAT, 1));
		// this._cats.push(Card.create(C.CAT, 0));

		for(var id = 0; id < this._dogs.length; id++){
			var dogCard = this._dogs[id];
			var scale = dogCard.getScaleX();
			node.addChild(dogCard);
			var dog = dogCard.getAnimal();

			var dcp = dogCard.getPosition();
			var dp = dog.getPosition();
			var np = cc.pAdd(dcp, cc.p(0, dp.y * scale));
			
			var nd = cc.Node.create();
			dog.setScale(scale);
			dog.setPosition(cc.p(dog.getPosition().x, 0));
			nd.addChild(dog);

			this.updatePoint(nd, np);
			this._animalNode.addChild(nd);
		}
			
		for(var ic = 0; ic < this._cats.length; ic++){
			var catCard = this._cats[ic];
			var cat = catCard.getAnimal();
			catCard.addChild(cat);
			// cc.log("position:" + cat.getPosition().x + " " + cat.getPosition().y);
			node.addChild(catCard);
		}

	},
	updatePoint:function(nd, p){
		var o = cc.p(0, -this._bgSize.height / 2);
		var xPercent  = Math.abs(p.x) / this._bgSize.width * 2;
		var yPercent = (p.y + this._bgSize.height / 2) / this._bgSize.height ;

		var xOffset = yPercent * this._bgOffset.width * xPercent;
		var yOffset =  yPercent * yPercent * this._bgOffset.height;

		// cc.log("xP: " + xOffset + " yP: " + yOffset);
		var rp = cc.p(p.x + xOffset ,p.y - yOffset);
		var scale = (this._bgSize.width / 2 - yPercent * this._bgOffset.width) / (this._bgSize.width / 2);
		var offsetY = (1 -scale) * this._bgOffset.height / 2;
		nd.setPosition(cc.pAdd(rp, cc.p(0, offsetY)));
		nd.setScale(scale);
	},
	initDisplay:function(){
		var eye = this._nFight.getCamera().getEye();
		var z = eye.z;
		this._nFight.getCamera().setEye(eye.x, -z * 0.28, z);
	}
});

FightLayer.scene = function(){
	var scene = cc.Scene.create();
	var layer = new FightLayer();
	layer.init();
	scene.addChild(layer);
	return scene;
};

