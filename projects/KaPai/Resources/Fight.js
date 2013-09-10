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
			this.initCard();
			// this.initDisplay();
			this.initAnimal();
			return true;
		}
		return false;
	},
	initCard:function(){
		
		var fightBackground = cc.Sprite.create(IMG.fightBackground);
		var cs = fightBackground.getContentSize();
		this._bgSize = cs;
		this._nFight = cc.LayerColor.create(cc.c4b(255, 0, 0, 100), cs.width, cs.height);
		this._nFight.setAnchorPoint(cc.p(0.5 ,0));

		// var animalLayer = cc.LayerColor.create(cc.c4b(0, 0, 255, 100), cs.width, cs.height);
		// animalLayer.setAnchorPoint(cc.p(0.5, 0));

		this._animalNode = cc.Node.create();
		this._animalNode.setPosition(cc.p(cs.width / 2, cs.height / 2));
		// this._animalNode.addChild(animalLayer);


		var p = cc.pSub(VisibleRect.topRight(), cc.p(cs.width, cs.height));
		this.setPosition(cc.p(p.x / 2, p.y / 2));
		this.addChild(this._nFight);		
		this.addChild(this._animalNode);

		var node = cc.Node.create();
		node.setPosition(cc.p(cs.width / 2, cs.height / 2));
		node.addChild(fightBackground);
		this._nFight.addChild(node);

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
			var dogCard = this._dogs[id];
			node.addChild(dogCard);

			var dog = dogCard.getAnimal();
			var dogP = dog.getPosition();
			var dogScale = dogCard.getScaleX();
			// cc.log("scale: " + dogScale);
			var point = cc.pAdd(dogCard.getPosition(), cc.p(dogP.x, dogP.y * dogScale));
			dog.setScale(dogScale);
			dog.setPosition(this.getNewPoint(point));
			cc.log("p:" + dogP.x + " " + dogP.y * dogScale);
			// this._animalNode.addChild(dog);

			var nd = cc.Node.create();
			var t = cc.Sprite.create(IMG.btn.Back);
			t.setScale(0.2);
			nd.addChild(t);
			nd.addChild(dog);
			this._animalNode.addChild(nd);
			

			// dogCard.addChild(dog);
			// var point = cc.pAdd(dogCard.getPosition(), animal.getPosition());
			// animal.setScale(0.44);
			// animal.setPosition(point);
			// cc.log("pos:" + animal.getPosition().x + " " + animal.getPosition().y);
			// this._animalNode.addChild(animal);
			// node.addChild(animal);
		}
			
		for(var ic = 0; ic < this._cats.length; ic++){
			var catCard = this._cats[ic];
			var cat = catCard.getAnimal();
			catCard.addChild(cat);
			// cc.log("position:" + cat.getPosition().x + " " + cat.getPosition().y);
			node.addChild(catCard);
		}

	},
	initAnimal:function(){

	},
	getNewPoint:function(p){
		var o = cc.p(0, -this._bgSize.height / 2);
		var lp = p;
		cc.log("Position:" + lp.x + " " + lp.y);
		return p;
	},
	initDisplay:function(){
		var eye = this._nFight.getCamera().getEye();
		var z = eye.z;
		this._nFight.getCamera().setEye(eye.x, -z * 0.28, z);
		
		// add test layer
		var cl1 = cc.LayerColor.create(cc.c4b(255, 0, 0, 100), this._bgSize.width, 20);
		this.addChild(cl1);

		this._bgOffset = cc.size(98, 92);
		var cl2 = cc.LayerColor.create(cc.c4b(255, 0, 0, 100), this._bgSize.width, 20);
		cl2.setPosition(cc.p(0 + this._bgOffset.width, this._bgSize.height - 20 - this._bgOffset.height));
		this.addChild(cl2);
	}	
});

FightLayer.scene = function(){
	var scene = cc.Scene.create();
	var layer = new FightLayer();
	layer.init();
	scene.addChild(layer);
	return scene;
};

