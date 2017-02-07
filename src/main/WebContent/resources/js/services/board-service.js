var BoardService = {
	
	participants: [],
	participantMaxAge: 10, // after this many seconds, participant is considered to be timed out
	stompClient: null,
		
	initialize: function() {
		var self = this;
		this.aging();
		
		var socket = new SockJS(app.rootUrl + '/ws');
	    this.stompClient = Stomp.over(socket);
	    this.stompClient.connect({}, function (frame) {
	        
	        self.stompClient.subscribe('/topic/sticker/' + Context.code + '/' + Context.token, function (sticker) {
	        	debugger;
	        	Board.Current.refreshStickers();
	        });
	    });
	},
	
	aging: function() {
		var self = this;
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
	},
	
	addParticipant: function(participantDetails) {
		for (var i=0; i!=this.participants.length; i++) {
			if (this.participants[i].username == participantDetails.username) {
				this.participants[i].age = this.participantMaxAge;
				return;
			}
		}
		
		this.participants.push(participantDetails);
	},

	getSessionDetails: function(sessionCode, onSuccess) {
		
		var self = this;
		
		$.ajax({
		    method: 'GET',
		    url: app.rootUrl + "/rest/host/session/" + sessionCode,
		    dataType: 'json',
		    contentType: 'application/json',
		    
		    statusCode: {
		    	200: function(data) {
		    		
		    		if (data.errorCode !== 0) {
		    			console.log(data);
		    			return;
		    		}
		    		
		    		onSuccess(self.transform(data.stickers));   
	            },
	        }
		});	
		
	},
	
	transform: function(stickersFromServer) {
		var stickersForUi = [];
		
		for (var i=0; i!=stickersFromServer.length; i++) {
			
			stickersForUi.push({
				sentBy: stickersFromServer[i].userId, 
				id: stickersFromServer[i].id, 
				message: stickersFromServer[i].comment, 
				glad: stickersFromServer[i].glad, 
				noControl: stickersFromServer[i].noControl
			});
			
		}
		
		return stickersForUi;
	}
		
};