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
	
	self.removeScrumTeam = function(scrumTeamId, onSuccess, onError) {
		$.ajax({
		    method: 'DELETE',
		    url: app.rootUrl + "/rest/scrum-master/scrum-team/" + scrumTeamId,
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
	
	self.getScrumTeams = function(onSuccess, onError) {
		
		$.ajax({
		    method: 'GET',
		    url: app.rootUrl + "/rest/scrum-master/scrum-team-list",
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
	
	self.createScrumTeam = function(name, onSuccess, onError) {
		
		$.ajax({
		    method: 'PUT',
		    url: app.rootUrl + "/rest/scrum-master/scrum-team",
		    dataType: 'json',
		    data: name,
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