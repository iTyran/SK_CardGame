 // FightLayer.js

var FightLayer = cc.Layer.extend({
	_my: null,
	_monster: null,

	_nFight: null,
	_bgSize: null,
	_bgOffset: null,

	_animalNode: null,
	_combat: null,
	
	init:function(){
		cc.log("fight layer init ...");
		if (this._super()){
			this._bgOffset = cc.size(98, 92);

			// test start combat
			var json = cc.FileUtils.getInstance().getStringFromFile("json/combat.json");
			this._combat = JSON.parse(json);
			this.startCombat();

			this.initDisplay();
			
			return true;
		}
		return false;
	},
	startCombat:function(){
		// init
		var my = this._combat.My;
		this._my = [];
		for(var di in my){
			var m = my[di];
			m.Type = C.DOG;
			this._my.push(Card.createWithCombat(m));
		}
		var monster = this._combat.Monster;
		this._monster = [];
		for(var ci in monster){
			var mon = monster[ci];
			mon.Type = C.CAT;
			this._monster.push(Card.createWithCombat(mon));
		}
		this.initCard();

		// start combat
		this.combatAction(0);
	},
	combatAction:function(index){
		if (index < this._combat.Combat.size){
			// return;
		}
		var cb = this._combat.Combat[index];

		cc.log("index:" + cb.Attacker);

		var attacker = this.getCardByHash(cb.Attacker);
		if (attacker){
			attacker.getAnimal().attack();
		}
		var beattacked = this.getCardByHash(cb.Beattacked);
		if (beattacked){
			beattacked.getAnimal().hurt();
		}
	},
	getCardByHash:function(hash){
		for(var mi in this._my){
			if (hash == this._my[mi].getInfo().Hash)
				return this._my[mi];
		}
		for (var ri in this._monster){
			if (hash == this._monster[ri].getInfo().Hash)
				return this._monster[ri];
		}
		return null;
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

		for(var id = 0; id < this._my.length; id++){
			var dogCard = this._my[id];
			var scale = dogCard.getScaleX();
			node.addChild(dogCard);
			var dog = dogCard.getAnimal().getNode();

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
			
		for(var ic = 0; ic < this._monster.length; ic++){
			var catCard = this._monster[ic];
			var cat = catCard.getAnimal().getNode();
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

