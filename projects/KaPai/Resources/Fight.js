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

