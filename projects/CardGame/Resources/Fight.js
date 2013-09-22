 // FightLayer.js

var FightLayer = cc.Layer.extend({
	_my: null,
	_monster: null,

	_nFight: null,
	_bgSize: null,
	_bgOffset: null,

	_animalNode: null,
	_combat: null,
	
	init:function(combat){
		cc.log("fight layer init ...");
		if (this._super()){
			this._bgOffset = cc.size(98, 92);

			// test start combat
			// var json = cc.FileUtils.getInstance().getStringFromFile("json/combat.json");
			this._combat = combat;
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
			m.Type = C.MY;
			this._my.push(Card.createWithCombat(m));
		}
		var monster = this._combat.Monster;
		this._monster = [];
		for(var ci in monster){
			var mon = monster[ci];
			mon.Type = C.MONSTER;
			this._monster.push(Card.createWithCombat(mon));
		}
		this.initCard();

		// start combat
		this.combatAction(0);
	},
	combatAction:function(index){
		if (index >= this._combat.Combat.length){
			this.runAction(cc.Sequence.create(
				cc.DelayTime.create(0.6),
				cc.CallFunc.create(function(){
					this.combatEnd();
				}, this)
			));
			return;
		}
		var cb = this._combat.Combat[index];

		var attacker = this.getCardByHash(cb.Attacker);
		var beattacked = this.getCardByHash(cb.Beattacked);

		if (!attacker || !beattacked)
			return;

		var delay = 2;
		if (cb.Skill > 0){
			// effect attack
			attacker.attack(cb.Skill);
			beattacked.runAction(cc.Sequence.create(
				cc.DelayTime.create(1.4),
				cc.CallFunc.create(function(){
					beattacked.hurt(cb.Damage, true);
				})
			));
			delay = 2.5;
		} else {
			// normal attack
			attacker.attack(0);
			var ba = cc.Sequence.create(cc.DelayTime.create(0.9), cc.CallFunc.create(function(){
				beattacked.hurt(cb.Damage);
			}, this));
			beattacked.runAction(ba);
		}
		var action = cc.Sequence.create(cc.DelayTime.create(delay), cc.CallFunc.create(function(){
			var ni = index + 1;
			this.combatAction(ni);
		}, this));
		this.runAction(action);
	},
	combatEnd:function(){
		var end = this._combat.End;
		cc.log("action end;");
		// var ml = new ModeLayer();
		// ml.init();
		// this.addChild(ml);

		// add combat result layer

		var ml = new ModeLayer();
		ml.init(this);
		
		var endLayer = cc.LayerColor.create(cc.c4b(0, 0, 0, 192), VisibleRect.rect().width, VisibleRect.rect().height);
		endLayer.setPosition(cc.p(0, 0));
		ml.addChild(endLayer);
		this.addChild(ml);
		
		var lblExperience = cc.LabelTTF.create("Experience: " + this._combat.End.Experience, "", 66);
		cc.log("result:" + this._combat.End.Result);
		var lblisWin = cc.LabelTTF.create(this._combat.End.Result ? "You Win !": "You Lost !", "", 66);
		lblExperience.setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, 100)));
		lblisWin.setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, -100)));
		endLayer.addChild(lblExperience);
		endLayer.addChild(lblisWin);
	},
	modelLayerTouch:function(){
		// cc.log("action mode layer touch ");
		cc.Director.getInstance().replaceScene(InstanceLayer.scene());
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

		var p = cc.pSub(VisibleRect.topRight(), cc.p(cs.width, cs.height));
		// this.setPosition(cc.p(p.x / 2, p.y / 2));
		this._nFight.setPosition(cc.p(p.x / 2, p.y / 2));
		this._animalNode.setPosition(cc.pAdd(cc.p(cs.width / 2, cs.height / 2), cc.p(p.x / 2, p.y / 2)));
		
		this.addChild(this._nFight);		
		this.addChild(this._animalNode);

		var node = cc.Node.create();
		node.setPosition(cc.p(cs.width / 2, cs.height / 2));
		node.addChild(fightBackground);
		this._nFight.addChild(node);

		for(var id = 0; id < this._my.length; id++){
			var myCard = this._my[id];
			var scale = myCard.getScaleX();
			node.addChild(myCard);
			var myAn = myCard.getAnimal().getNode();

			var dcp = myCard.getPosition();
			var dp = myAn.getPosition();
			var np = cc.pAdd(dcp, cc.p(0, dp.y * scale));
			
			var nd = cc.Node.create();
			myAn.setScale(scale);
			myAn.setPosition(cc.p(myAn.getPosition().x, 0));
			nd.addChild(myAn);

			this.updatePoint(nd, np);
			this._animalNode.addChild(nd);
		}
			
		for(var ic = 0; ic < this._monster.length; ic++){
			var msCard = this._monster[ic];
			var cScale = msCard.getScaleX();
			node.addChild(msCard);
			var msAn = msCard.getAnimal().getNode();

			var cDcp = msCard.getPosition();
			var cDp = msAn.getPosition();
			var dNp = cc.pAdd(cDcp, cc.p(0, cDp.y * cScale));

			var cNd = cc.Node.create();
			msAn.setScale(cScale);
			msAn.setPosition(cc.p(msAn.getPosition().x, 0));
			cNd.addChild(msAn);
			
			// msCard.addChild(msAn);
			this.updatePoint(cNd, dNp);
			this._animalNode.addChild(cNd);
		}

	},
	updatePoint:function(nd, p){
		var o = cc.p(0, -this._bgSize.height / 2);
		var xPercent  = -p.x / this._bgSize.width * 2;
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

FightLayer.scene = function(combat){
	var scene = cc.Scene.create();
	var layer = new FightLayer();
	layer.init(combat);
	scene.addChild(layer);
	return scene;
};

