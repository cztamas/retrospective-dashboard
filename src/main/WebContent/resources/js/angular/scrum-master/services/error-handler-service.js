app.service('errorHandlerService', function() {
	
	var self = this;
	
	self.handle = function(errorCode) {
		
		var errorMessage = null;
		switch (errorCode) {
		
			case 8:
				location.href = app.rootUrl;
				return;
				break;
				
			case 7:
				errorMessage = 'Database Error, please try again.';
				break;
				
			case 14:
				errorMessage = 'Scrum Team name is missing.';
				break;
				
			case 15:
				errorMessage = 'Scrum Team already exist.';
				break;
		}
		
		if (errorMessage != null) {
			BootstrapDialog.show({ type: BootstrapDialog.TYPE_WARNING, title: 'Error', message: errorMessage });
		}
		else {
			BootstrapDialog.show({ type: BootstrapDialog.TYPE_WARNING, title: 'Error', message: 'Unexpected error with code ' + errorCode });
		}
	};
	
});