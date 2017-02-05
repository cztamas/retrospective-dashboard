var JoinController = {
		
	initialize: function() {
		
		var isLoginPage = window.location.href.indexOf('#feedbackPage') == -1;
		var username = getCookie('username');
		
		if (!isLoginPage && username != null) {
			setTimeout(function(){ ParticipantService.join(username); }, 3000);
		}
	},
	
	enter: function() {
		if ($('#username').val().length == 0) {
			return;
		}
		
		ParticipantService.join($('#username').val()); 
		setCookie("username", $('#username').val()); 
		$.mobile.changePage('#feedbackPage');
	}
		
};