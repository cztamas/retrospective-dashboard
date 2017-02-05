var ParticipantService = {
		
	stompClient: null,
	webSocketUrl: null,
	code: null,
	token: null,
	username: null,
	
	// event to be fired when someone joined
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
	
	join: function(username) {
		this.username = username;
		
		try {
			this.stompClient.send("/app/board/join/" + this.code + '/' + this.token, {}, JSON.stringify({'username': username, 'id': 'afsdf'}));	
		}
		catch (error) {
			console.log(error);
		}
		
		this.keepalive();
	},
	
	keepalive: function() {
		var self = this;
		
		if ($('#existance').length == 0) {
			return;
		}
		
		setTimeout(function(){ 
			self.stompClient.send("/app/board/join/" + self.code + '/' + self.token, {}, JSON.stringify({'username': self.username, 'id': 'afsdf'}));
			console.log('Keepalive message sent in the name of ' + self.username);
			self.keepalive();
		}, 3000);
	}
		
};