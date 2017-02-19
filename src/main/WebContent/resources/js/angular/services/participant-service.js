app.service('participantService', function() {
	var self = this;
	
	self.stompClient = null;
	self.webSocketUrl = null;
	self.code = null;
	self.token = null;
	
	self.onJoin = null;
		
	self.initialize = function(code, token) {
		
		self.code = code;
		self.token = token;
	
		var socket = new SockJS(app.rootUrl + '/ws');
	    self.stompClient = Stomp.over(socket);
	    self.stompClient.connect({}, function (frame) {
	        
	        self.stompClient.subscribe('/topic/join/' + self.code + '/' + self.token, function (greeting) {
	        	var participantJoinedBroadcastMessage = JSON.parse(greeting.body);
	        	
	        	if (self.onJoin) {
	        		self.onJoin(participantJoinedBroadcastMessage);
	        	}
	        });
	    });
	};
	
	self.publish = function(sticker, onSuccess) {
		
		$.ajax({
		    method: 'POST',
		    url: app.rootUrl + "/rest/participant/sticker/" + Context.code + '/' + Context.token,
		    dataType: 'json',
		    contentType: 'application/json',
		    data: JSON.stringify(sticker),
		    
		    statusCode: {
		    	200: function(data) {
		    		
		    		if (data.errorCode !== 0) {
		    			console.log(data);
		    			return;
		    		}
		    		
		    		try {
		    			self.stompClient.send("/app/board/sticker/" + self.code + '/' + self.token, {}, JSON.stringify(sticker));
		    			onSuccess();
		    		}
		    		catch (error) {
		    			console.log(error);
		    		}
	            },
	        }
		});	
	};
	
	self.join = function(username) {
		KeepaliveService.code = this.code;
		KeepaliveService.token = this.token;
		KeepaliveService.username = username;
		KeepaliveService.start();
	};
});