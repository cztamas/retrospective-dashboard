var ParticipantService = {
		
	stompClient: null,
	webSocketUrl: null,
	code: null,
	token: null,
		
	initialize: function(code, token) {
		this.code = code;
		this.token = token;
		
		var self = this;
	
		var socket = new SockJS(app.rootUrl + '/ws');
	    stompClient = Stomp.over(socket);
	    stompClient.connect({}, function (frame) {
	        
	        console.log('Connected: ' + frame);
	        
	        stompClient.subscribe('/topic/join/' + self.code + '/' + self.token, function (greeting) {
	        	console.log(JSON.parse(greeting.body).content);
	        });
	    });
	},
	
	join: function() {
		
		stompClient.send("/app/board/join/" + this.code + '/' + this.token, {}, JSON.stringify({'username': 'void', 'id': 'afsdf'}));
	}
		
};