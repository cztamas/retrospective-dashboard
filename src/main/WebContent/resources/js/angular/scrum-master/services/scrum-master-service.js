app.service('scrumMasterService', function() {
	
	var self = this;
	
	self.getSessionInfoHeadList = function(onSuccess, onError) {
		
		$.ajax({
		    method: 'GET',
		    url: app.rootUrl + "/rest/scrum-master/session",
		    dataType: 'json',
		    contentType: 'application/json',
		    
		    statusCode: {
		    	200: function(data) {
		    		
		    		if (data.errorCode !== 0) {
		    			onError(data.errorCode);
		    			return;
		    		}
		    		
		    		onSuccess(data.content);   
	            },
	        }
		});	
		
	};
});