// socket.js

s_sharedSocket = null;

var Socket = cc.Class.extend({
	_observers: null,
	_webSocket: null,

	ctor:function(){
		this._observers = [];
	},
	init:function(uri){
		this._webSocket = new WebSocket(uri);
		this._webSocket.onopen = function(){
			cc.log("ws:onopen websocket uri:" + uri);
		};
		this._webSocket.onerror = function(evt){
			cc.log("ws:onerror:" + evt.data);
		},
		this._webSocket.onmessage = this.onmessage;
	},
	onmessage:function(evt){
		try{
			var json = JSON.parse(evt.data);			
			cc.NotificationCenter.getInstance().postNotification(WS.MSG, json);
		}catch(e){
			cc.log("warning:" + e);
			cc.NotificationCenter.getInstance().postNotification(WS.MSG, evt.data);					
		}
	},
	send:function(data){
		if (typeof(data) == "string")
			this._webSocket.send(data);
		else
			this._webSocket.send(JSON.stringify(data));
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

