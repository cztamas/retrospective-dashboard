app.service('accountService', function AccountService() {
	
	var self = this;
	
	self.login = function(email, password, onSuccess, onError) {
		
		var request = { 
			email: email,
			password: password 
		};
		
		$.ajax({
		    method: 'POST',
		    url: app.rootUrl + "/rest/account/login",
		    dataType: 'json',
		    contentType: 'application/json',
		    data: JSON.stringify(request),
		    
		    statusCode: {
		    	200: function(data) {
		    		
		    		if (data.errorCode !== 0) {
		    			console.log(data);
		    			
		    			onError(data.errorCode);
		    			return;
		    		}
		    		
		    		onSuccess();
	            },
	        }
		});	
	};
	
	self.register = function(email, password, onSuccess, onError) {
		var request = { 
			email: email,
			password: password
		};
			
		$.ajax({
		    method: 'POST',
		    url: app.rootUrl + "/rest/account/registration",
		    dataType: 'json',
		    contentType: 'application/json',
		    data: JSON.stringify(request),
		    
		    statusCode: {
		    	200: function(data) {
		    		
		    		if (data.errorCode !== 0) {
		    			console.log(data);
		    			
		    			onError(data.errorCode);
		    			return;
		    		}
		    		
		    		onSuccess();
	            },
	        }
		});	
	};
	
	self.forgotPassword = function(email, onSuccess, onError) {
		$.ajax({
		    method: 'POST',
		    url: app.rootUrl + "/rest/account/forgot-password",
		    dataType: 'json',
		    contentType: 'application/json',
		    data: email,
		    
		    statusCode: {
		    	200: function(data) {
		    		
		    		if (data.errorCode !== 0) {
		    			console.log(data);
		    			
		    			onError(data.errorCode);
		    			return;
		    		}
		    		
		    		onSuccess();
	            },
	        }
		});	
	};
	
});