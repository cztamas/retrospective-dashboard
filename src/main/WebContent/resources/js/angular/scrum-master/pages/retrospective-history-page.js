app.controller("retrospective-history-page", function RetrospectiveHistoryPageController($scope, scrumMasterService, errorHandlerService) {
	
	app.controllers.retrospectiveHistoryPage = $scope;
	
	$scope.state = {
		sessions: []	
	};
	
	$scope.refresh = function() {
		
		scrumMasterService.getSessionInfoHeadList(
			// on success
			function(sessions) {
				$scope.state.sessions = sessions;
				$scope.$digest();
			},
			
			// on error
			errorHandlerService.handle);
		
	};
});