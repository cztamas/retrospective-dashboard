app.controller("init-page", function InitPageController($scope) {
	
	$scope.createSession = function (boardType) {
		
		$.ajax({
		    method: 'POST',
		    url: app.rootUrl + "/rest/host/session",
		    dataType: 'json',
		    contentType: 'application/json',
		    data: JSON.stringify(boardType),
		    
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