var BoardService = {
	
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
				message: stickersFromServer[i].message, 
				glad: stickersFromServer[i].glad, 
				noControl: stickersFromServer[i].noControl
			});
			
		}
		
		return stickersForUi;
	}
		
};