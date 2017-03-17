app.service('keepaliveService', function() {
	
	var self = this;
	
	var stompClient = null;
	var code = null;
	var token = null;
	var username = null;
	var isRunning = false;
	
	self.start = function() {
		
		if (self.isRunning) {
			return;
		}
		
		var socket = new SockJS(app.rootUrl + '/ws');
	    self.stompClient = Stomp.over(socket);
	    self.stompClient.connect({}, function (frame) {
	        
	    	try {
	    		self.isRunning = true;
				self.stompClient.send("/app/board/join/" + self.code + '/' + self.token, {}, JSON.stringify({'username': self.username}));	
			}
			catch (error) {
				console.log(error);
			}
			
			self.keepalive();
			
	    });
	};
	
	self.keepalive = function() {
		
		if ($('#existance').length == 0) {
			return;
		}
		
		setTimeout(function(){ 
			try {
				self.stompClient.send("/app/board/join/" + self.code + '/' + self.token, {}, JSON.stringify({'username': self.username, 'id': 'afsdf'}));	
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