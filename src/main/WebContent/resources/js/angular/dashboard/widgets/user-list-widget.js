app.controller("user-list-widget", function UserListWidgetController($scope, configuration, participantService, boardService) {
	
	app.controllers.userListWidget = $scope;
	
	$scope.state = {
		users: [],
		disconnectedStickerOwners: [] // list of usernames who sent at least one sticker AND not active user
	};
	
	$scope.$watch('state.users');
	
	$scope.getUserClassname = function(username) {
		return Context.displayUsernames ? 'user-' + Math.abs(username.hashCode()) : '';
	};
	
	$scope.onMouseOver = function(username) {
		if (!Context.displayUsernames) {
			return;
		}
		
		$('.sticker-base').not('.' + $scope.getUserClassname(username)).css('opacity', configuration.stickerOpacity);
	};
	
	$scope.onMouseOut = function(username) {
		if (!Context.displayUsernames) {
			return;
		}
		
		$('.sticker-base').not('.' + $scope.getUserClassname(username)).css('opacity', '');
	};
	
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
	
	$scope.refreshOnce = function() {
		// refresh active users
		$scope.state.users = boardService.participants;
		
		// refresh inactive users
		var disconnectedUsers = [];
		for (var i=0; i!=boardService.stickerOwners.length; i++) {
			var isActive = $scope.isActive(boardService.stickerOwners[i]);
			
			if (!isActive) {
				disconnectedUsers.push(boardService.stickerOwners[i]);	
			}
		}
		$scope.state.disconnectedStickerOwners = disconnectedUsers;
    	$scope.$digest();
	};
	
	$scope.startRefreshingParticipants = function() {
		
		setTimeout(function(){ 
			$scope.refreshOnce();
			$scope.startRefreshingParticipants();
		}, 3000);
	};
	
	$scope.isActive = function(username) {
		for (var i=0; i!=$scope.state.users.length; i++) {
			if ($scope.state.users[i].username == username 
					&& $scope.activeUserFilter($scope.state.users[i])) {
				return true;
			}
		}
		
		return false;
	};
	
	$scope.addParticipant = function(participantDetails) {
    	boardService.addParticipant(participantDetails);
    	$scope.state.users = boardService.participants;
    	$scope.$digest();
    };
});