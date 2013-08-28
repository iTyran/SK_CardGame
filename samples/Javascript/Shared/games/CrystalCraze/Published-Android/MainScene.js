var kMenuSelectionNone = 0;
var kMenuSelectionPlay = 1;
var kMenuSelectionAbout = 2;

var gLastScore = 0;
var gAudioEngine;

//
// MainScene class
//
var MainScene = function(){};

MainScene.prototype.onDidLoadFromCCB = function()
{
	// Setup particles in background
	var starParticles = cc.ParticleSystem.create("particles/bg-stars.plist");
	this.starNode.addChild(starParticles);

	// Reset menu selection
	this.menuSelection = kMenuSelectionNone;

	// Setup callback for completed animations
	this.rootNode.animationManager.setCompletedAnimationCallback(this, this.onAnimationComplete);
	this.lblLastScore.setString(""+gLastScore);

	// Setup falling gems
	this.fallingGems = [];

	// Schedule callback
    this.rootNode.onUpdate = function(dt) {
        this.controller.onUpdate();
    };
    this.rootNode.schedule(this.rootNode.onUpdate);

    // Load sprite sheets
    cc.SpriteFrameCache.getInstance().addSpriteFrames("crystals.plist");

	// Setup sound
	gAudioEngine = cc.AudioEngine.getInstance();
	gAudioEngine.playMusic("sounds/loop.mp3");
};

// Create callback for button
MainScene.prototype.onPressPlay = function()
{
	this.menuSelection = kMenuSelectionPlay;
	this.rootNode.animationManager.runAnimationsForSequenceNamed("Outro");

	gAudioEngine.playEffect("sounds/click.wav");

	// Fade out gems
	for (var i = 0; i < this.fallingGems.length; i++)
	{
		var gem = this.fallingGems[i];
		gem.sprt.runAction(cc.FadeOut.create(0.5));
		//gem.particle.stopSystem();
	}
};

MainScene.prototype.onPressAbout = function()
{
	gAudioEngine.playEffect("sounds/click.wav");

	// disable menu, since another one will be on top
	this.menu.setEnabled(false);

	var aboutNode = cc.BuilderReader.load("AboutScene");
	this.rootNode.addChild(aboutNode, 10);
};

MainScene.prototype.onAnimationComplete = function()
{
	if (this.menuSelection == kMenuSelectionPlay)
	{
		var scene = cc.BuilderReader.loadAsScene("GameScene.ccbi");
		cc.Director.getInstance().replaceScene(scene);
		gAudioEngine.stopMusic();
    }
};

MainScene.prototype.onUpdate = function()
{
	var gem;
	
	if (Math.random() < 0.02)
	{
		var type = Math.floor(Math.random()*5);
		var sprt = cc.Sprite.createWithSpriteFrameName("crystals/"+type+".png");
		//var sprt = cc.Sprite.create("crystals/"+type+".png");
		//var p = cc.ParticleSystem.create("particles/falling-gem.plist");

		var x = Math.random()*this.fallingGemsLayer.getContentSize().width;
		var y = this.fallingGemsLayer.getContentSize().height + kGemSize/2;
		var scale = 0.2 + 0.8 * Math.random();

		var speed = 2*scale*kGemSize/40;

		sprt.setPosition(cc.p(x,y));
		sprt.setScale(scale);

		//p.setPosition(cc.p(x,y));
		//p.setScale(scale);
		//p.setAutoRemoveOnFinish(true);

		gem = {sprt:sprt, speed:speed};
		//var gem = {sprt:sprt, speed:speed, particle:p};
		this.fallingGems.push(gem);

		//this.fallingGemsLayer.addChild(p);
		this.fallingGemsLayer.addChild(sprt);
	}

	for (var i = this.fallingGems.length-1; i >= 0; i--)
	{
		gem = this.fallingGems[i];

		var pos = gem.sprt.getPosition();
		pos.y -= gem.speed;
		gem.sprt.setPosition(pos);
		//gem.particle.setPosition(pos);

		if (pos.y < -kGemSize/2)
		{
			this.fallingGemsLayer.removeChild(gem.sprt, true);
			//gem.particle.stopSystem();
			this.fallingGems.splice(i, 1);
		}
	}
};
