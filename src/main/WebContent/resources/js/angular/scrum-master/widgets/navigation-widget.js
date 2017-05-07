app.controller("navigation-widget", function NavigationWidgetController($scope) {
	
	app.controllers.navigationWidget = $scope;
	
	$scope.initialize = function() {
		$scope.navigateTo('retrospective-history');
	};
	
	$scope.navigateTo = function(target) {
		
		// navbar selection
		$('.nav-sidebar-menuitem').removeClass('active');
		$('#menuitem-' + target).addClass('active');
		
		// display relevant content page only
		$('.page-content').hide();
		$('#content-' + target).show();
		
		switch (target) {
		
			case 'retrospective-history':
				app.getController('retrospective-history-page').refresh();
				break;
				
			case 'scrum-teams':
				app.getController('scrum-teams-page').refresh();
				break;
		}
	};
	
});