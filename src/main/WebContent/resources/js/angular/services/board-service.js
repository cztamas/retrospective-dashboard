app.service('boardService', function() {
	
	var self = this;
	
	self.participants = [];
	self.participantMaxAge = 10; // after this many seconds, participant is considered to be timed out
	self.stompClient = null;
	
    self.initialize = function () {
		self.aging();
		
		var socket = new SockJS(app.rootUrl + '/ws');
	    self.stompClient = Stomp.over(socket);
	    self.stompClient.connect({}, function (frame) {
	        
	        self.stompClient.subscribe('/topic/sticker/' + Context.code + '/' + Context.token, function (sticker) {
	        	app.getController('board-page').refreshStickers();
	        });
	    });
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
		    		
		    		onSuccess(self.transform(data.stickers), data.offsetSettings);   
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
				transform: stickersFromServer[i].transform
			});
			
		}
		
		return stickersForUi;
	};
    
});