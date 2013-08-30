// socket.js

s_sharedSocket = null;

var Socket = cc.Class.extend({
	_observers: null,
	_webSocket: null,
	_uri: null,

	_isConnection: false,
	ctor:function(){
		this._observers = [];
	},
	setUri:function(uri){
		this._uri = uri;
	},
	init:function(delegate){
		if (!this._isConnection){
			this._webSocket = new WebSocket(this._uri);
			this._webSocket.onopen = function(){
				cc.log("ws:onopen websocket uri:" + this._uri);
				delegate.onOpen();
			};
			this._webSocket.onerror = function(evt){
				cc.log("ws:onerror:" + evt.data);
				delegate.onError();
			},
			this._webSocket.onclose = function(evt){
				cc.log("ws:onclose:" + evt.data);
			},
			this._webSocket.onmessage = this.onmessage;
			return true;
		}else{
			cc.log("web socket already connection .");
			return false;
		}
	},
	onmessage:function(evt){
		try{
			cc.log("web socket onmessage:" + evt.data);
			var json = JSON.parse(evt.data);
			cc.NotificationCenter.getInstance().postNotification(WS.MSG, json);
		}catch(e){
			cc.log("warning:" + e);
			cc.NotificationCenter.getInstance().postNotification(WS.MSG, evt.data);
		}
	},
	send:function(cmd, param){
		var json = {
			"Command": cmd,
			"Param": param
		};
		var msg = JSON.stringify(json);
		cc.log("web socket send:" + msg);
		this._webSocket.send(msg);
	},
	addObserver:function(target, selector){
		cc.NotificationCenter.getInstance().addObserver(target, selector, WS.MSG, null);
	},
	removeObserver:function(target){
		cc.NotificationCenter.getInstance().removeObserver(target, WS.MSG);
	}
});

Socket.getInstance = function(){
	if (!s_sharedSocket){
		s_sharedSocket = new Socket();
	}
	return s_sharedSocket;
};

