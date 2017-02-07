var ParticipantService = {
		
	stompClient: null,
	webSocketUrl: null,
	code: null,
	token: null,
	
	onJoin: null,
		
	initialize: function(code, token) {
		
		var self = this;
		this.code = code;
		this.token = token;
	
		var socket = new SockJS(app.rootUrl + '/ws');
	    this.stompClient = Stomp.over(socket);
	    this.stompClient.connect({}, function (frame) {
	        
	        self.stompClient.subscribe('/topic/join/' + self.code + '/' + self.token, function (greeting) {
	        	var participantJoinedBroadcastMessage = JSON.parse(greeting.body);
	        	
	        	if (self.onJoin) {
	        		self.onJoin(participantJoinedBroadcastMessage);
	        	}
	        });
	    });
	    
	
	},
	
	publish: function(sticker, onSuccess) {
		var self = this;
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
	},
	
	join: function(username) {
		KeepaliveService.code = this.code;
		KeepaliveService.token = this.token;
		KeepaliveService.username = username;
		KeepaliveService.start();
	},
	
};