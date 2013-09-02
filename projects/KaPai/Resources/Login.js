// login.js

var RegisterLayer = cc.Layer.extend({
	_loginName: null,
	_loginPwd: null,
	_loginPwdConfim: null,
	_email: null,
	init:function(){
		if (this._super()){
			this.initLayer();
		}
		return true;
	},
	initLayer:function(){
		var backGround = cc.Sprite.create(IMG.loginBackGround);
		backGround.setPosition(VisibleRect.center());
		this.addChild(backGround);

		var editBoxSize = cc.size(350, 80);
		this._loginName = cc.EditBox.create(
			editBoxSize,
			cc.Scale9Sprite.create(IMG.editBox),
			cc.Scale9Sprite.create(IMG.editBox)
		);
		this._loginPwd = cc.EditBox.create(
			editBoxSize,
			cc.Scale9Sprite.create(IMG.editBox),
			cc.Scale9Sprite.create(IMG.editBox)
		);
		this._loginPwdConfim = cc.EditBox.create(
			editBoxSize,
			cc.Scale9Sprite.create(IMG.editBox),
			cc.Scale9Sprite.create(IMG.editBox)
		);
		this._email = cc.EditBox.create(
			editBoxSize,
			cc.Scale9Sprite.create(IMG.editBox),
			cc.Scale9Sprite.create(IMG.editBox)
		);

		this._loginName.setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, 150)));
		this._loginPwd.setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, 50)));
		this._loginPwdConfim.setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, -50)));
		this._email.setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, -150)));

		this._loginName.setPlaceHolder("Login Name");
		this._loginPwd.setPlaceHolder("Password");
		this._loginPwdConfim.setPlaceHolder("Pwd Confirm");
		this._email.setPlaceHolder("Email");

		var layer = cc.Layer.create();
		layer.setPosition(cc.p(0, 100));
		this.addChild(layer);

		var loginBox = cc.Scale9Sprite.create(IMG.loginBox);
		loginBox.setContentSize(cc.size(550, 450));
		loginBox.setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, 0)));
		layer.addChild(loginBox);
		
		layer.addChild(this._loginName);
		layer.addChild(this._loginPwd);
		layer.addChild(this._loginPwdConfim);
		layer.addChild(this._email);
		
		var itemImgRegister = cc.MenuItemImage.create(IMG.btnRegister, IMG.btnRegisterPress, this.callRegister, this);
		var itemImgCancel = cc.MenuItemImage.create(IMG.btnCancel, IMG.btncancelPress, function(){
			cc.Director.getInstance().replaceScene(LoginLayer.scene());
		}, this);
		
		itemImgRegister.setPosition(cc.pAdd(VisibleRect.center(), cc.p(- 200, -230)));
		itemImgCancel.setPosition(cc.pAdd(VisibleRect.center(), cc.p(200, -230)));

		var menu = cc.Menu.create(itemImgRegister, itemImgCancel);
		menu.setPosition(cc.p(0, 0));
		this.addChild(menu);

	},
	callRegister:function(){
		var user = {};
		user.Username = this._loginName.getText();
		user.Password = this._loginPwd.getText();
		user.Email = this._email.getText();

		if (!user.Username || !user.Password){
			cc.log("username or password is not null !");
		}else if (user.Password != this._loginPwdConfim.getText()){
			cc.log("password confirm !!!");
		}else{
			Socket.getInstance().send(WS.REGISTER, user);
		}
	}
});

var CreateUserLayer = cc.Layer.extend({
	init:function(){
		if (this._super()){
			this.initLayer();
		}
		cc.log("");
	},
	initLayer:function(){
		var backGround = cc.Sprite.create(IMG.loginBackGround);
		backGround.setPosition(VisibleRect.center());
		this.addChild(backGround);

		var layer = cc.Layer.create();
		
	}
});

var LoginLayer = cc.Layer.extend({
	winSize: null,
	pCenter: null,
	_loginName: null,
	_loginPwd: null,
	init:function(){
		if (this._super()){
			this.winSize = cc.Director.getInstance().getWinSize();
			this.initLayer();

			if(Socket.getInstance().init(this)){
				Gm.getInstance().loading(this);				
			}
		}
		return true;
	},
	onOpen:function(){
		cc.log("login on open .");
		Gm.getInstance().unLoading();

		// get user cache
		var user = Gm.getInstance().getCacheLoginUser();
		this._loginName.setText(user.Username);
		this._loginPwd.setText(user.Password);
	},
	onError:function(){
		cc.log("login on error .");		
	},
	initLayer:function(){
		var backGround = cc.Sprite.create(IMG.loginBackGround);
		backGround.setPosition(VisibleRect.center());
		this.addChild(backGround);

		var layer = cc.Layer.create();
		layer.setPosition(cc.p(0, 0));
		this.addChild(layer);

		var loginBox = cc.Sprite.create(IMG.loginBox);
		loginBox.setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, 100)));
		layer.addChild(loginBox);		
		
		var boxSize = cc.size(350, 80);
		this._loginName = cc.EditBox.create(
			boxSize,
			cc.Scale9Sprite.create(IMG.editBox),
			cc.Scale9Sprite.create(IMG.editBox));


		this._loginPwd = cc.EditBox.create(
			boxSize,
			cc.Scale9Sprite.create(IMG.editBox),
			cc.Scale9Sprite.create(IMG.editBox)
		);
		this._loginPwd.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);

		// this._loginName.setPlaceholderFontColor(cc.c3b(255, 0, 0));
		this._loginName.setPlaceHolder("Login Name");
		this._loginPwd.setPlaceHolder("Password");

		layer.addChild(this._loginName);
		layer.addChild(this._loginPwd);
		
		this._loginName.setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, 170)));
		this._loginPwd.setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, 30)));

		var itemImgLoginName = cc.MenuItemImage.create(IMG.btnLogin, IMG.btnLoginPress, this.callLogin, this);
		var itemImgLoginPwd = cc.MenuItemImage.create(IMG.btnRegister, IMG.btnRegisterPress, function(){
			cc.Director.getInstance().replaceScene(RegisterLayer.scene());
		}, this);
		itemImgLoginName.setPosition(cc.pAdd(VisibleRect.center(), cc.p(-170, -200)));
		itemImgLoginPwd.setPosition(cc.pAdd(VisibleRect.center(), cc.p(170, -200)));

		var menu = cc.Menu.create(itemImgLoginName, itemImgLoginPwd);
		menu.setPosition(cc.p(0 ,0));
		layer.addChild(menu);
		
	},
	onEnter:function(){
		this._super();
		Socket.getInstance().addObserver(this, this.callSocket);
	},
	onExit:function(){
		this._super();
		Socket.getInstance().removeObserver(this);
	},
	getUserByEditBox:function(){
		var user = {};
		user.Username = this._loginName.getText();
		user.Password = this._loginPwd.getText();
		return user;
	},
	callLogin:function(){
		var user = this.getUserByEditBox();
		if (!user.Username || !user.Password){
			cc.log("username or password is not null !");
		}else{					
			Socket.getInstance().send(WS.LOGIN, user);
		}
	},
	callSocket:function(obj){
		if (obj.Command == WS.LOGIN && obj.Return.Code == 0){
			cc.log("login:" + obj.Return.Message);
			Gm.getInstance().setCacheLoginUser(this.getUserByEditBox());
			cc.Director.getInstance().replaceScene(GameLayer.scene());
		}
	}
});


LoginLayer.scene = function(){
	var scene = cc.Scene.create();
	var layer = new LoginLayer();
	layer.init();
	scene.addChild(layer);
	return scene;
};

RegisterLayer.scene = function(){
	var scene = cc.Scene.create();
	var layer = new RegisterLayer();
	layer.init();
	scene.addChild(layer);
	return scene;
};
