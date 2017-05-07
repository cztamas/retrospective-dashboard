app.controller("scrum-teams-page", function ScrumTeamsPageController($scope, scrumMasterService, errorHandlerService) {
	
	app.controllers.scrumTeamsPage = $scope;
	
	$scope.state = {
		scrumTeams: []	
	};
	
	$scope.createScrumTeam = function() {
		var name = $('#new-scrum-team-name').val();
		
		scrumMasterService.createScrumTeam(name,
				
			// on success
			function() {
				$('#new-scrum-team-name').val('');
				$scope.refresh();
			},
			
			// on error
			errorHandlerService.handle);
	};
	
	$scope.removeScrumTeam = function(scrumTeamId) {
		
		BootstrapDialog.confirm('Are you sure you want to remove this Scrum Team?', function(result){
            if (!result) {
                return;
            }
            
            scrumMasterService.removeScrumTeam(scrumTeamId,
				
    			// on success
    			function() {
    				$scope.refresh();
    			},
    			
    			// on error
    			errorHandlerService.handle);
        });
		
		
	};
	
	$scope.refresh = function() {
		scrumMasterService.getScrumTeams(
				
			// on success
			function(scrumTeams) {
				$scope.state.scrumTeams = scrumTeams;
				$scope.$digest();
			},
			
			// on error
			errorHandlerService.handle);
	};
});