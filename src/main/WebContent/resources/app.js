var app = angular.module("retrospective", []);
app.rootUrl = "/retrospective-dashboard";

if (window.location.port !== '') {
	app.domain = 'http://' + window.location.hostname + ':' + window.location.port;
}
else {
	app.domain = 'http://' + window.location.hostname;
}