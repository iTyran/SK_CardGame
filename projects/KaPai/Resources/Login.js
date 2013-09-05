// login.js

var CharacterLayer = cc.Layer.extend({
	_charName: null,
	_showMessage: null,
	init:function(){
		if (this._super()){
			this.initLayer();
			return true;
		}
		return false;
	},
	initLayer:function(){
		var backGround = cc.Sprite.create(IMG.loginBackGround);
		backGround.setPosition(VisibleRect.center());
		this.addChild(backGround);

		var layer = cc.Layer.create();
		layer.setPosition(cc.p(0, 100));
		this.addChild(layer);
		
		// var loginBox = cc.Scale9Sprite.create(IMG.loginBox);
		// loginBox.setContentSize(cc.size(550, 450));
		var loginBox = cc.Sprite.create(IMG.loginBox);
		loginBox.setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, 0)));
		layer.addChild(loginBox);

		var editBoxSize = cc.size(350, 80);
		this._charName = cc.EditBox.create(
			editBoxSize,
			cc.Scale9Sprite.create(IMG.editBox),
			cc.Scale9Sprite.create(IMG.editBox)
		);
		this._charName.setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, 0)));
		this._charName.setPlaceHolder("Char Name");
		layer.addChild(this._charName);


		var itemImgCancel = cc.MenuItemImage.create(IMG.btnCancel, IMG.btnCancelPress, function(){
			cc.log("careate char cancel.");
			cc.Director.getInstance().replaceScene(LoginLayer.scene());
		}, this);
		itemImgCancel.setPosition(cc.pAdd(VisibleRect.center(), cc.p(200, -230)));

		var itemImgCreate = cc.MenuItemImage.create(IMG.btnCreate, IMG.btnCreatePress, this.callCreate, this);
		itemImgCreate.setPosition(cc.pAdd(VisibleRect.center(), cc.p(-200, -230)));
		
		var menu = cc.Menu.create(itemImgCreate, itemImgCancel);
		menu.setPosition(cc.p(0, 0));
		this.addChild(menu);


	},
	callCreate:function(){
		cc.log("create char..");
		var u = {};
		u.CharName = this._charName.getText();
		
		if (u.CharName == ""){
			cc.log("char name not null");
		}else{
			Socket.getInstance().send(WS.CHAR_CREATE, u);
		}
	},
	onEnter:function(){
		this._super();
		Socket.getInstance().addObserver(this, this.callSocket);
	},
	onExit:function(){
		this._super();
		Socket.getInstance().removeObserver(this);
	},
	callSocket:function(obj){
		if (obj.Command == WS.CHAR_CREATE && obj.Return.Code == 0){
			cc.Director.getInstance().replaceScene(GameLayer.scene());
		}
		cc.log("leafsoar");
	}
});

var RegisterLayer = cc.Layer.extend({
	_loginName: null,
	_loginPwd: null,
	_loginPwdConfim: null,
	_email: null,

	_showMessage: null,
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
		this._loginPwd.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);		
		this._loginPwdConfim.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);		

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

		this._showMessage = cc.LabelTTF.create("", "", 34);
		this._showMessage.setColor(cc.BLACK);
		this._showMessage.setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, -320)));
		this.addChild(this._showMessage);
	},
	callRegister:function(){
		var user = {};
		user.Username = this._loginName.getText();
		user.Password = this._loginPwd.getText();
		user.Email = this._email.getText();

		this.showMessage();
		if (!Check.notNull(user.Username) || !Check.notNull(user.Password)){
			this.showMessage("username or password not null !");
		}else if (user.Password != this._loginPwdConfim.getText()){
			this.showMessage("password confirm !!!");
		}else if(!Check.isEmail(user.Email)){
			this.showMessage("email format error !!!");			
		}else{
			Socket.getInstance().send(WS.REGISTER, user);
		}
	},
	showMessage:function(text){
		this._showMessage.setString(text ? text: "");
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

	_showMessage: null,
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

		this._showMessage = cc.LabelTTF.create("", "", 34);
		this._showMessage.setColor(cc.BLACK);
		this._showMessage.setPosition(cc.pAdd(VisibleRect.center(), cc.p(0, -320)));
		this.addChild(this._showMessage);
		
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
		this.showMessage();
		if (obj.Command == WS.LOGIN){
			if ( obj.Return.Code == 0){
				Gm.getInstance().setCacheLoginUser(this.getUserByEditBox());
				if (obj.Return.Message == "CreateCharacter"){
					cc.log("create character ");
					cc.Director.getInstance().replaceScene(CharacterLayer.scene());
				}else{
					cc.log("login:" + obj.Return.Message);
					cc.Director.getInstance().replaceScene(GameLayer.scene());				
				}
			} else if (obj.Return.Code == 4){
				this.showMessage(obj.Return.Message);
			}
		}
	},
	showMessage:function(text){
		this._showMessage.setString(text ? text: "");
	}		
});


LoginLayer.scene = function(){
	var scene = cc.Scene.create();
	var layer = new LoginLayer();
	layer.init();
	scene.addChild(layer);
	return scene;
};

CharacterLayer.scene = function(){
	var scene = cc.Scene.create();
	var layer = new CharacterLayer();
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

