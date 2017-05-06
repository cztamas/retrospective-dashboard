app.controller("retrospective-history-page", function RetrospectiveHistoryPageController($scope, scrumMasterService) {
	
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
			function(errorCode) {
				
				// session expired, user is not authenticated at the moment
				if (errorCode == 8) {
					location.href = app.rootUrl;
				}
				
			});
		
	};
});