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

		var lblLoginName = cc.LabelTTF.create("Login Id:", "", 50);
		var lblLoginPwd = cc.LabelTTF.create("Login Pwd:", "", 50);
		var lblLoginPwdConfirm = cc.LabelTTF.create("Confirm Pwd:", "", 50);
		var lblEmail = cc.LabelTTF.create("Email:", "", 50);

		var editBoxSize = cc.size(350, 80);
		this._loginName = cc.EditBox.create(
			editBoxSize,
			cc.Scale9Sprite.create(IMG.loginEditBox),
			cc.Scale9Sprite.create(IMG.loginEditBox)
		);
		this._loginPwd = cc.EditBox.create(
			editBoxSize,
			cc.Scale9Sprite.create(IMG.loginEditBox),
			cc.Scale9Sprite.create(IMG.loginEditBox)
		);
		this._loginPwdConfim = cc.EditBox.create(
			editBoxSize,
			cc.Scale9Sprite.create(IMG.loginEditBox),
			cc.Scale9Sprite.create(IMG.loginEditBox)
		);
		this._email = cc.EditBox.create(
			editBoxSize,
			cc.Scale9Sprite.create(IMG.loginEditBox),
			cc.Scale9Sprite.create(IMG.loginEditBox)
		);

		lblLoginName.setPosition(cc.pAdd(VisibleRect.center(), cc.p(-200, 150)));
		lblLoginPwd.setPosition(cc.pAdd(VisibleRect.center(), cc.p(-200, 50)));
		lblLoginPwdConfirm.setPosition(cc.pAdd(VisibleRect.center(), cc.p(-200, -50)));
		lblEmail.setPosition(cc.pAdd(VisibleRect.center(), cc.p(-200, -150)));

		this._loginName.setPosition(cc.pAdd(VisibleRect.center(), cc.p(150, 150)));
		this._loginPwd.setPosition(cc.pAdd(VisibleRect.center(), cc.p(150, 50)));
		this._loginPwdConfim.setPosition(cc.pAdd(VisibleRect.center(), cc.p(150, -50)));
		this._email.setPosition(cc.pAdd(VisibleRect.center(), cc.p(150, -150)));

		var layer = cc.Layer.create();
		layer.setPosition(cc.p(0, 0));
		this.addChild(layer);
		
		layer.addChild(lblLoginName);
		layer.addChild(lblLoginPwd);
		layer.addChild(lblLoginPwdConfirm);
		layer.addChild(lblEmail);

		layer.addChild(this._loginName);
		layer.addChild(this._loginPwd);
		layer.addChild(this._loginPwdConfim);
		layer.addChild(this._email);

		var menuRegister = cc.MenuItemFont.create("Register", this.registerAction, this);
		var menuReturn = cc.MenuItemFont.create("Return", function(){
			cc.Director.getInstance().replaceScene(LoginLayer.scene());
		}, this);
		
		menuRegister.setPosition(cc.pAdd(VisibleRect.center(), cc.p(- 200, -230)));
		menuReturn.setPosition(cc.pAdd(VisibleRect.center(), cc.p(200, -230)));

		var menu = cc.Menu.create(menuRegister, menuReturn);
		menu.setPosition(cc.p(0, 0));
		this.addChild(menu);

	},
	registerAction:function(){
		var user = {};
		user.Username = this._loginName.getText();
		user.Password = this._loginPwd.getText();
		user.Email = this._email.getText();

		if (user.Password != this._loginPwdConfim.getText()){
			cc.log("password confirm !!!");
		}else{
			cc.log("menu login ..");
		}
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
		}
		cc.log("login layer init ...");
		return true;
	},
	initLayer:function(){
			var labelLoginName = cc.LabelTTF.create("Login Id:", "", 50);
			var labelLoginPwd = cc.LabelTTF.create("Login Pwd:", "", 50);

			labelLoginName.setPosition(cc.pAdd(VisibleRect.center(), cc.p(-200, 150)));			
			labelLoginPwd.setPosition(cc.pAdd(VisibleRect.center(), cc.p(-200, 50)));

			this.addChild(labelLoginName);
			this.addChild(labelLoginPwd);
			
			var boxSize = cc.size(350, 80);
			this._loginName = cc.EditBox.create(
				boxSize,
				cc.Scale9Sprite.create(IMG.loginEditBox),
				cc.Scale9Sprite.create(IMG.loginEditBox));


			this._loginPwd = cc.EditBox.create(
				boxSize,
				cc.Scale9Sprite.create(IMG.loginEditBox),
				cc.Scale9Sprite.create(IMG.loginEditBox)
			);
			this._loginPwd.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);

			
			this.addChild(this._loginName);			
			this.addChild(this._loginPwd);
			
			this._loginPwd.setPosition(cc.pAdd(VisibleRect.center(), cc.p(150, 50)));
			this._loginName.setPosition(cc.pAdd(VisibleRect.center(), cc.p(150, 150)));
			
			var itemLoginName = cc.MenuItemFont.create("Login", this.loginAction, this);
			var itemRegister = cc.MenuItemFont.create("Register", function(){
				cc.Director.getInstance().replaceScene(RegisterLayer.scene());
			}, this);
			
			itemLoginName.setPosition(cc.pAdd(VisibleRect.center(), cc.p(-100, -80)));			
			itemRegister.setPosition(cc.pAdd(VisibleRect.center(), cc.p(100, -80)));

			var menu = cc.Menu.create(itemLoginName, itemRegister);
			menu.setPosition(cc.p(0 ,0));
			this.addChild(menu);
	},
	onEnter:function(){
		this._super();
		Socket.getInstance().addObserver(this, this.socketCallback);
	},
	onExit:function(){
		this._super();
		Socket.getInstance().removeObserver(this);
	},
	loginAction:function(){
		var user = {};
		user.Username = this._loginName.getText();
		user.Password = this._loginPwd.getText();
		if (!user.Username || !user.Password){
			cc.log("username or password is not null !");
		}
		Socket.getInstance().send(user);
	},
	socketCallback:function(obj){
		cc.log("socket callback " + obj);
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
