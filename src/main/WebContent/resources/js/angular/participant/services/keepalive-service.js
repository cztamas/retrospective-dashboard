app.service('keepaliveService', function() {
	
	var self = this;
	
	self.socket = null;
	var stompClient = null;
	var code = null;
	var token = null;
	var username = null;
	var isRunning = false;
	
	self.start = function() {
		
		if (self.isRunning) {
			return;
		}
		
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
	        
	    	// on success
	    	try {
	    		self.isRunning = true;
				self.stompClient.send("/app/board/join/" + self.code + '/' + self.token, {}, JSON.stringify({'username': self.username}));	
			}
			catch (error) {
				console.log(error);
			}
			
			self.keepalive();
			
	    }, function(error) {
	    	// on error, retry after 3 seconds
	    	setTimeout(function() { 
	    		console.error('Warning: keepalive service could not start due to websocket failure, reconnecting in 3 seconds');
	    		self.isRunning = false;
	    		self.start(); 
	    	}, 3000);
	    });
	};
	
	self.keepalive = function() {
		
		if (!self.isRunning) {
			return;
		}
		
		if ($('#existance').length == 0) {
			return;
		}
		
		setTimeout(function(){ 
			try {
				if (self.stompClient.connected) {
					self.stompClient.send("/app/board/join/" + self.code + '/' + self.token, {}, JSON.stringify({'username': self.username, 'id': 'afsdf'}));		
				}
				else {
					// retry connect
					setTimeout(function() {
						// we attempt to reconnect with a little delay, connection might have been restored by a previous cycle
						if (!self.stompClient.connected) {
							console.error('Warning: keepalive message could not be sent (broken pipe), reconnecting in 3 seconds');
				    		self.isRunning = false;
				    		self.start();	
						}
			    	}, 3000);
					return;
				}
			}
			catch (error) {
				console.log(error);
			}
			
			console.log('Keepalive message sent in the name of ' + self.username);
			self.keepalive();
		}, 3000);
	};

	self.join = function(username, code, token) {
		self.code = code;
		self.token = token;
		self.username = username;
		self.start();
	};

});