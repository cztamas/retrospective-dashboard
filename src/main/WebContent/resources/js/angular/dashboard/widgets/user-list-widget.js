app.controller("user-list-widget", function UserListWidgetController($scope, participantService, boardService) {
	
	$scope.state = {
		users: []
	};
	
	$scope.$watch('state.users');
	
	$scope.activeUserFilter = function (item) { 
	    return item.age >= 0;
	};
	
	$scope.initialize = function(code, token, isDashboard) {
		
		if (isDashboard) {
			// do not want to initialize participant service, we are not waiting for join actions over websocket channel
			return;
		}
		
		participantService.initialize(code, token);
		participantService.onJoin = function(participantDetails) {
			$scope.addParticipant(participantDetails);
		}
	};
	
	$scope.startRefreshingParticipants = function() {
		
		setTimeout(function(){ 
			$scope.state.users = boardService.participants;
	    	$scope.$digest();
			$scope.startRefreshingParticipants();
		}, 3000);
	};
	
	$scope.addParticipant = function(participantDetails) {
    	boardService.addParticipant(participantDetails);
    	$scope.state.users = boardService.participants;
    	$scope.$digest();
    };
});