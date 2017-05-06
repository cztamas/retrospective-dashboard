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
	};
	
});