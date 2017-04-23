app.controller("session-settings-widget", function SessionSettingsWidgetController($scope, boardService) {
	
	$scope.state = {
		isAnonymous: null
	};
	
	$scope.initialize = function() {
		$('#settings-dialog').hide();
		$('#postit-size-slider').slider().on('change', function(event) {
			app.getController('board-page').resizePostIts(event.value.newValue);
		});
	};
	
	$scope.setSessionName = function() {
		var sessionName = $('#sessionName').val();
		var boardPage = app.getController('board-page');
		
		boardPage.state.sessionParameters.name = sessionName;
		boardService.registerSessionParameters(Context.code, boardPage.state.sessionParameters, function() {
			alert('Session name has been changed.');
			$scope.safeApply();
		});
	};
	
	$scope.setSessionComment = function() {
		var sessionComment = $('#sessionComment').val();
		var boardPage = app.getController('board-page');
		
		boardPage.state.sessionParameters.comment = sessionComment;
		boardService.registerSessionParameters(Context.code, boardPage.state.sessionParameters, function() {
			alert('Comment has been changed.');
		});
	};
	
	$scope.setIsAnonymous = function() {
		
		var isChecked = $('#anonymousCheckBox').prop('checked');
		var boardPage = app.getController('board-page');
		
		Context.displayUsernames = !isChecked; 
		boardPage.state.sessionParameters.isAnonymous = isChecked;
		boardService.registerSessionParameters(Context.code, boardPage.state.sessionParameters, function() { });
		
		boardPage.showStickers();
	};
	
	$scope.safeApply = function() {
		try {
			$scope.$apply();	
		}
		catch (error) {
			
		}
	};
});