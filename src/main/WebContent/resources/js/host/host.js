app.controller("host", function($scope) {
	
	$scope.createSession = function () {
		
		$.ajax({
		    method: 'POST',
		    url: app.rootUrl + "/rest/host/session",
		    dataType: 'json',
		    contentType: 'application/json',
		    data: null,
		    
		    statusCode: {
		    	200: function(data) {
		    		
		    		if (data.errorCode !== 0) {
		    			console.log(data);
		    			return;
		    		}
		    		
		    		var startUrl = app.domain + app.rootUrl + "/start/" + data.sessionDetails.code + "/" + data.sessionDetails.token;
		    		location.href = startUrl;
	            },
	        }
		});	
    }
	
});