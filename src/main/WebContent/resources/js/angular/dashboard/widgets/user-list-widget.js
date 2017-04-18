app.controller("user-list-widget", function UserListWidgetController($scope, participantService, boardService) {
	
	$scope.state = {
		users: [],
		revealedUsers: {}
	};
	
	$scope.$watch('state.users');
	$scope.$watch('state.revealedUsers');
	
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
	
	$scope.revealUser = function(user) {
		if (!$scope.state.revealedUsers[user]) {
			$scope.state.revealedUsers[user] = true;	
		}
		else {
			$scope.state.revealedUsers[user] = undefined;
		}
		
		app.getController('board-page').revealPartial($scope.state.revealedUsers);
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