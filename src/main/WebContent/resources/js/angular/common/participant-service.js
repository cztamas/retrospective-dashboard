app.service('participantService', function ParticipantService() {
	var self = this;
	
	self.socket = null;
	self.stompClient = null;
	self.webSocketUrl = null;
	self.code = null;
	self.token = null;
	
	self.onJoin = null;
		
	self.initialize = function(code, token) {
		
		self.code = code;
		self.token = token;
	
		self.connect();
		self.checkConnection();
	};
	
	self.checkConnection = function() {
		setTimeout(function() {
			if (!self.stompClient.connected) {
				console.error('Warning: participant service lost websocket connection, attempting to reconnect');
				self.connect();
			}
			
			self.checkConnection();
		}, 5000);
	};
	
	self.connect = function() {
		
		if (self.stompClient && self.stompClient.connected) {
			return;
		}
		
		if (self.socket && self.socket != null) {
			self.socket.close();
		}
    	
    	if (self.stompClient && self.stompClient != null) {
			self.stompClient.disconnect();
		}
		
		self.socket = new SockJS(app.rootUrl + '/ws');	
		self.stompClient = Stomp.over(self.socket);
	    self.stompClient.connect({}, function (frame) {
	        
	        self.stompClient.subscribe('/topic/join/' + self.code + '/' + self.token, function (greeting) {
	        	var participantJoinedBroadcastMessage = JSON.parse(greeting.body);
	        	
	        	if (self.onJoin) {
	        		self.onJoin(participantJoinedBroadcastMessage);
	        	}
	        });
	    }, 
	    function(error) {
	    	console.log(error);
	    });
	};
	
	self.publish = function(stickers, onSuccess) {
		
		$.ajax({
		    method: 'POST',
		    url: app.rootUrl + "/rest/participant/sticker/" + Context.code + '/' + Context.token,
		    dataType: 'json',
		    contentType: 'application/json',
		    data: JSON.stringify(stickers),
		    
		    statusCode: {
		    	200: function(data) {
		    		
		    		if (data.errorCode !== 0) {
		    			console.log(data);
		    			return;
		    		}
		    		
		    		try {
		    			self.stompClient.send("/app/board/sticker/" + self.code + '/' + self.token, {}, JSON.stringify({ stickers: stickers }));
		    			onSuccess();
		    		}
		    		catch (error) {
		    			console.log(error);
		    		}
	            },
	        }
		});	
	};
	
});