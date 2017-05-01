app.controller("qr-code-widget", function QrCodeWidgetController($scope) {
	
	app.controllers.qrCodeWidget = $scope;
	
	$scope.configuration = {
		placeholders: {
			qrCodeContainer: 'qrCodeContainer',
			qrCodeImageContainer: 'qrcode',
			boardContainer: 'board',	
		},
		colors: {
			dark: '#000000',
			light: '#ffffff'
		}
	};
	
	$scope.state = {
		codedUrl: null,
	};
	
	$scope.initialize = function(codedUrl, placeholders) {
		$scope.state.codedUrl = codedUrl;
		$scope.configuration.placeholders = placeholders;
		
		new QRCode(document.getElementById($scope.configuration.placeholders.qrCodeImageContainer), {
		    text: $scope.state.codedUrl,
		    width: window.innerHeight * 0.60,
		    height: window.innerHeight * 0.60,
		    colorDark : $scope.configuration.colors.dark,
		    colorLight : $scope.configuration.colors.light,
		    correctLevel : QRCode.CorrectLevel.H
		});
	};
	
	$scope.show = function() {
		$('#join-url').val(app.domain + app.rootUrl + '/join-web/' + Context.code + '/' + Context.token);
		$('#' + $scope.configuration.placeholders.qrCodeContainer).show();
		$('#' + $scope.configuration.placeholders.boardContainer).hide();
	};
	
	$scope.hide = function() {
		$('#' + $scope.configuration.placeholders.qrCodeContainer).hide();
		$('#' + $scope.configuration.placeholders.boardContainer).show();
	};
});