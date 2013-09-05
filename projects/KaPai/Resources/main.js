/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org

 http://www.cocos2d-x.org


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

// boot code needed for cocos2d + JS bindings.
// Not needed by cocos2d-html5

require("jsb.js");
require("Common.js");
require("GameManager.js");
require("Socket.js");
require("Login.js");
require("Game.js");
require("Instance.js");
require("Fight.js");
require("Utile.js");

try{
	var uri = "172.100.104.204:1234";
	// var uri = "ws://localhost:8082/echo;
	Socket.getInstance().setUri(uri);
	director = cc.Director.getInstance();
	// director.runWithScene(GameLayer.scene());
	director.runWithScene(LoginLayer.scene());
	// director.runWithScene(FightLayer.scene());
	// director.runWithScene(CharacterLayer.scene());

	var winSize = VisibleRect.winSize();
	cc.log("winSize width: " + winSize.width + " height: " + winSize.height);
}catch(e){
	cc.log(e);
}

