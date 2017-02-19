var app = angular.module("retrospective", []);
app.rootUrl = "/retrospective-dashboard";
app.getController = function(controllerName) {
	return angular.element(document.querySelector('[ng-controller='+controllerName+']')).scope();
}

if (window.location.port !== '') {
	app.domain = 'http://' + window.location.hostname + ':' + window.location.port;
}
else {
	app.domain = 'http://' + window.location.hostname;
}