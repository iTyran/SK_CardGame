//bullet
var Bullet = cc.Sprite.extend({
    active:true,
    xVelocity:0,
    yVelocity:200,
    power:1,
    HP:1,
    moveType:null,
    zOrder:3000,
    attackMode:MW.ENEMY_MOVE_TYPE.NORMAL,
    parentType:MW.BULLET_TYPE.PLAYER,
    ctor:function (bulletSpeed, weaponType, attackMode) {
        this._super();

        this.yVelocity = -bulletSpeed;
        this.attackMode = attackMode;
        this.initWithSpriteFrameName(weaponType);
        this.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
							  
        /*var tmpAction;
         switch (this.attackMode) {
         case MW.ENEMY_MOVE_TYPE.NORMAL:
         tmpAction = cc.MoveBy.create(2, cc.p(this.getPosition().x, 400));
         break;
         case MW.ENEMY_ATTACK_MODE.TSUIHIKIDAN:
         tmpAction = cc.MoveTo.create(2, GameLayer.create()._ship.getPosition());
         break;
         }
         this.runAction(tmpAction);*/
    },
    update:function (dt) {
        var p = this.getPosition();
        p.x -= this.xVelocity * dt;
        p.y -= this.yVelocity * dt;
        this.setPosition( p );
		if (p.x < 0 || p.x > g_sharedGameLayer.screenRect.width || p.y < 0 || p.y > g_sharedGameLayer.screenRect.height || this.HP <= 0)
		{					  
			this.active = false;
			this.destroy();
		}
    },
    destroy:function () {
		var explode = HitEffect.getOrCreateHitEffect(this.getPosition(), Math.random()*360, 0.75);
		this.setPosition(g_hideSpritePos);
    },
    hurt:function () {
        this.HP--;
    },
    collideRect:function(p){
        return cc.rect(p.x - 3, p.y - 3, 6, 6);
    }
});

Bullet.getOrCreateBullet = function(bulletSpeed, weaponType, attackMode, zOrder ,mode) {
	
	if(mode == MW.UNIT_TAG.PLAYER_BULLET)
	{
		for (var j = 0; j < MW.CONTAINER.PLAYER_BULLETS.length; j++) {
			selChild = MW.CONTAINER.PLAYER_BULLETS[j];
			if (selChild.active == false)
			{
				selChild.HP = 1;
				selChild.active = true;
				return selChild;
			}
		}
		
		var b = new Bullet(bulletSpeed, weaponType, attackMode);
		g_sharedGameLayer.addBullet(b, zOrder, mode);
		MW.CONTAINER.PLAYER_BULLETS.push(b);
		return b;
	}
	else
	{
		for (var j = 0; j < MW.CONTAINER.ENEMY_BULLETS.length; j++) {
			selChild = MW.CONTAINER.ENEMY_BULLETS[j];
			if (selChild.active == false)
			{
				selChild.HP = 1;
				selChild.active = true;
				return selChild;
			}
		}
		
		var b = new Bullet(bulletSpeed, weaponType, attackMode);
		g_sharedGameLayer.addBullet(b, zOrder, mode);
		MW.CONTAINER.ENEMY_BULLETS.push(b);
		return b;
	}
};

