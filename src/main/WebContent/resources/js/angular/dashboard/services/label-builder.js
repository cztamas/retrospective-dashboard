app.service('labelBuilderService', function LabelBuilderService(configuration) {
	
	var self = this;
	
	self.build = function(boardHeight, boardWidth) {
		var gladBottom = boardHeight - 20;
		gladBottom -= 120;
		$('#glad').css('bottom', gladBottom + 'px');
		
		var sadBottom = Math.ceil(boardHeight / 2) + 30;
		sadBottom -= 70;
		$('#sad').css('bottom', sadBottom + 'px');
		
		var madBottom = 50 + 20;
		$('#mad').css('bottom', madBottom + 'px');
		
		var inControlLeft = 50 + 90;
		$('#in-control').css('bottom', '10px');
		$('#in-control').css('left', inControlLeft + 'px');
		
		var noControlLeft = 50 + boardWidth - 150;
		$('#no-control').css('bottom', '10px');
		$('#no-control').css('left', noControlLeft + 'px');
	};
    
});