app.service('boardService', function BoardService() {
	
	var self = this;
	
	self.socket = null;
	self.participants = [];
	self.participantMaxAge = 10; // after this many seconds, participant is considered to be timed out
	self.stompClient = null;
	self.onStickerReceived = null;
	
    self.initialize = function(onStickerReceived, isReconnect) {
    	
    	self.onStickerReceived = onStickerReceived;
    	if (!isReconnect) {
    		self.aging();	
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
		if (!Context.stompClientDebug) {
			self.stompClient.debug = null;	
		}
		
	    self.stompClient.connect({}, function (frame) {
	        
	        self.stompClient.subscribe('/topic/sticker/' + Context.code + '/' + Context.token, function (sticker) {
	        	self.onStickerReceived();
	        });
	    }, function(error) {
	    	console.log(error);
	    });
	    
	    if (!isReconnect) {
	    	self.checkConnection();	
	    }
    };
    
    self.checkConnection = function() {
    	setTimeout(function() {
    		if (!self.stompClient.connected) {
    			console.error('Warning: board service lost websocket connection, attempting to reconnect');
    			self.initialize(self.onStickerReceived, true);
    		}
    		
    		self.checkConnection();
    	}, 5000);
    };
    
    self.aging = function() {
		
		setTimeout(function(){ 
			
			for (var i=0; i!=self.participants.length; i++) {
				if (self.participants[i].age === undefined) {
					self.participants[i].age = self.participantMaxAge;
				}
				else {
					self.participants[i].age -= 1;
					if (self.participants[i].age < -1) {
						self.participants[i].age = -1;
					}
				}
			}
			
			console.log('Participant aging cycle executed');
			self.aging();
		}, 1000);
	};
	
	self.addParticipant = function(participantDetails) {
		for (var i=0; i!=self.participants.length; i++) {
			if (self.participants[i].username == participantDetails.username) {
				self.participants[i].age = self.participantMaxAge;
				return;
			}
		}
		
		self.participants.push(participantDetails);
	};
	
	self.registerSessionParameters = function(sessionCode, sessionParameters, onSuccess) {
		$.ajax({
		    method: 'POST',
		    url: app.rootUrl + "/rest/host/session/" + sessionCode + '/params',
		    dataType: 'json',
		    contentType: 'application/json',
		    data: JSON.stringify(sessionParameters),
		    
		    statusCode: {
		    	200: function(data) {
		    		
		    		if (data.errorCode !== 0) {
		    			console.log(data);
		    			return;
		    		}   
		    		
		    		if (onSuccess) {
		    			onSuccess();
		    		}
	            },
	        }
		});	
	};
	
	self.persistOffsets = function(sessionCode, offsets) {
		$.ajax({
		    method: 'POST',
		    url: app.rootUrl + "/rest/host/session/" + sessionCode + '/offset',
		    dataType: 'json',
		    contentType: 'application/json',
		    data: JSON.stringify(offsets),
		    
		    statusCode: {
		    	200: function(data) {
		    		
		    		if (data.errorCode !== 0) {
		    			console.log(data);
		    			return;
		    		}   
	            },
	        }
		});	
		
	};

	self.getSessionDetails = function(sessionCode, onSuccess) {
		
		$.ajax({
		    method: 'GET',
		    url: app.rootUrl + "/rest/host/session/" + sessionCode,
		    dataType: 'json',
		    contentType: 'application/json',
		    
		    statusCode: {
		    	200: function(data) {
		    		
		    		if (data.errorCode !== 0) {
		    			
		    			if (data.errorCode == 2) {
		    				$('#errorMessage').html('Invalid security token.');
		    				$('#errorDialog').dialog({width: 450});
		    			}
		    			
		    			return;
		    		}
		    		
		    		onSuccess(self.transform(data.stickers), data.offsetSettings, data.sessionParameters);   
	            },
	        }
		});	
		
	};
	
	self.transform = function(stickersFromServer) {
		var stickersForUi = [];
		
		for (var i=0; i!=stickersFromServer.length; i++) {
			
			stickersForUi.push({
				sentBy: stickersFromServer[i].userId, 
				id: stickersFromServer[i].id, 
				message: stickersFromServer[i].comment, 
				glad: stickersFromServer[i].glad, 
				noControl: stickersFromServer[i].noControl,
				transform: stickersFromServer[i].transform,
				username: stickersFromServer[i].username
			});
			
		}
		
		return stickersForUi;
	};
    
});