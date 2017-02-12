var KeepaliveService = {

	code: null,
	token: null,
	username: null,
	
	isRunning: false,
	
	start: function() {
		
		if (this.isRunning) {
			return;
		}
		
		var self = this;
		try {
			ParticipantService.stompClient.send("/app/board/join/" + this.code + '/' + this.token, {}, JSON.stringify({'username': self.username, 'id': 'afsdf'}));	
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
			try {
				ParticipantService.stompClient.send("/app/board/join/" + self.code + '/' + self.token, {}, JSON.stringify({'username': self.username, 'id': 'afsdf'}));	
			}
			catch (error) {
				console.log(error);
			}
			
			console.log('Keepalive message sent in the name of ' + self.username);
			self.keepalive();
		}, 3000);
	}

}