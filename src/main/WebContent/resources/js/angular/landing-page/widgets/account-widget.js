app.controller("account-widget", function AccountWidgetController($scope, accountService) {
	
	$scope.login = function () {
		
		accountService.login($('#login-email').val(), $('#login-password').val(),
				
			// on success
			function() {
				var startUrl = app.domain + app.rootUrl + "/scrum-master";
				location.href = startUrl;
			},
			
			// on error
			function(errorCode) {
				
    			var message = 'Unexpected issue on server side, cant login right now. Send us a punch email or something to hurry the fix.';
    			switch (errorCode) {
    				case 8:
    					message = 'Email address or password not valid.';
    					break;
    				case 12:
    					message = 'Email address has not been verified. Please check your emails for the verification URL.';
    					break;
    			}
    			
    			BootstrapDialog.show({ type: BootstrapDialog.TYPE_WARNING, title: 'Login', message: message });
			});
    };
    
    
    $scope.register = function (email, password) {
		
    	if ($('#register-password1').val() != $('#register-password2').val()) {
    		
    		BootstrapDialog.show({ 
    			type: BootstrapDialog.TYPE_WARNING, 
    			title: 'Registration', 
    			message: 'Password mismatch.' 
    		});
    		
    		return;
    	}
    	
    	accountService.register($('#register-email').val(), $('#register-password1').val(),
    		
    		// on success
    		function() {
    		
    			$scope.clearRegistrationForm();
    			$('.nav-tabs a[href="#1"]').tab('show');
    		
    			BootstrapDialog.show({ 
    				type: BootstrapDialog.TYPE_PRIMARY, 
    				title: 'Registration', 
    				message: 'An email has been sent to your email address. Please follow the email verification link to complete your registration.' 
    			});
    		},
    		
    		// on error
    		function(errorCode) {
    			
    			var message = 'Unexpected issue on server side, cant register right now. Send us a punch email or something to hurry the fix.';
    			switch (errorCode) {
    			
    				case 9:
    					message = 'Registration with the provided email already exist.';
    					break;
    					
    				case 10:
    					message = 'Password length should be at least 6 characters.';
    					break;
    					
    				case 11:
    					message = 'Invalid email address.';
    					break;
    			}
    			
    			BootstrapDialog.show({ type: BootstrapDialog.TYPE_WARNING, title: 'Registration', message: message });
    		});	
    };
    
    $scope.forgotPassword = function() {
    	var email = $('#forgot-password-email').val();
    	if (email == null || email == '') {
    		BootstrapDialog.show({ type: BootstrapDialog.TYPE_WARNING, title: 'Registration', message: 'Email address is missing.' });
    		return;
    	}
    	
    	accountService.forgotPassword(email,
    		// on success
    		function() {
	    		BootstrapDialog.show({ 
					type: BootstrapDialog.TYPE_PRIMARY, 
					title: 'Account Recovery', 
					message: 'An email has been sent to your email address. Please follow the URL to reset your password.' 
				});
    		},
    		
    		// on error
    		function(errorCode) {
    			
    			var message = 'Unexpected issue on server side, cant recover account right now. Send us a punch email or something to hurry the fix.';
    			switch (errorCode) {
    			
    				case 13:
    					message = 'Account not found.';
    					break;

    			}
    			
    			BootstrapDialog.show({ type: BootstrapDialog.TYPE_WARNING, title: 'Account Recovery', message: message });
    		});
    };
    
    $scope.clearRegistrationForm = function() {
    	$('#register-email').val('');
    	$('#register-password1').val('');
    	$('#register-password2').val('');
    };
	
});