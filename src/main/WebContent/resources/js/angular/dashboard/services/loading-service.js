app.service('loadingService', function LoadingService(configuration) {
	
	var self = this;
	
	self.start = function() {
		$('#loading-gif').show();
	};
	
	self.end = function() {
		$('#loading-gif').hide();
	};
    
});