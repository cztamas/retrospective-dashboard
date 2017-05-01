var app = angular.module("retrospective", []);
app.controllers = {};
app.getController = function(controllerName) {
	
	var controller = null;
	
	// angular.element(document.querySelector('[ng-controller=\''+controllerName+'\']')).scope()
	// gives non-deterministic result due to an angular bug, so it is more safe to register singleton controlers and 
	// reference them from app.controllers
	switch(controllerName) {
	
		case 'board-page':
			controller = app.controllers.boardPage;
			break;
			
		case 'participant-page as participantPage':
			controller = app.controllers.participantPage;
			break;
		
		case 'session-settings-widget':
			controller = app.controllers.sessionSettingsWidget;
			break;
			
		case 'user-list-widget':
			controller = app.controllers.userListWidget;
			break;
			
		case 'qr-code-widget':
			controller = app.controllers.qrCodeWidget;
			break;
			
		default:
			controller = angular.element(document.querySelector('[ng-controller=\''+controllerName+'\']')).scope();
			break;
	}
	
	return controller;
}

if (window.location.port !== '') {
	app.domain = 'http://' + window.location.hostname + ':' + window.location.port;
}
else {
	app.domain = 'http://' + window.location.hostname;
}