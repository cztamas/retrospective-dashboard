app.controller("participant-page", function ParticipantPageController(
		$scope, 
		keepaliveService,
		participantService) {
	
	$scope.stickers = [];
	
	$scope.constants = {
		stickersLocalStorageKey: 'retrospective.stickers',
	};
		
	$scope.initialize = function(code, token) {
		
		participantService.initialize(code, token);
		
		var isLoginPage = window.location.href.indexOf('#feedbackPage') == -1 && window.location.href.indexOf('#commentsPage') == -1;
		var username = Utils.getCookie('username');
		
		// on page refresh, we can join and keepalive, if username exists in session
		if (!isLoginPage && username != null) {
			setTimeout(function(){ keepaliveService.join(username, Context.code, Context.token); }, 3000);
		}
		
		// reload stickers from local storage, if there is any
		if (localStorage.getItem($scope.constants.stickersLocalStorageKey)) {
			$scope.stickers = JSON.parse(localStorage.getItem($scope.constants.stickersLocalStorageKey));
			$scope.refreshStickers();
		}
	};
	
	$scope.navigateToCreateComment = function() {
		$.mobile.changePage('#feedbackPage'); 
		$('#commentAddOrEdit').data('mode', 'add');
		
		$scope.clearForm();
	};
	
	$scope.addSticker = function() {
		
		var glad = $('#slider-fill-glad').val();
		var control = $('#slider-fill-control').val();
		var comment = $('#comment').val();
		
		var noControl = 1000 - control;
		
		var isAdding = $('#commentAddOrEdit').data('mode') == 'add';
		if (comment == '') {
			$('#errorLabel').html('Comment field is required');
			return;
		}
		
		$('#errorLabel').html('');
		
		if (isAdding) {
			$scope.stickers.push({ 
				glad: glad, 
				noControl: noControl, 
				comment: comment,
				id: 'id_' + Math.floor(Math.random() * 99999)
			});
			
		}
		else {
			for (var i=0; i!=$scope.stickers.length; i++) {
				if ($scope.stickers[i].id == $('#commentAddOrEdit').data('commentid')) {
					$scope.stickers[i].glad = glad;
					$scope.stickers[i].noControl = noControl;
					$scope.stickers[i].comment = comment;	
				}
			}
		}
		
		localStorage.setItem($scope.constants.stickersLocalStorageKey, JSON.stringify($scope.stickers));	
		
		$scope.clearForm();
		$scope.refreshStickers();
		$.mobile.changePage('#commentsPage');
	};
	
	$scope.editSticker = function(commentId) {
		
		$('#commentAddOrEdit').data('mode', 'edit');
		$scope.clearForm();
		
		var sticker = $scope.getSticker(commentId);
		if (sticker == null) {
			$.mobile.changePage('#commentsPage');	
			return;
		}
		
		$('#comment').val(sticker.comment);
		$('#slider-fill-control').val(1000 - sticker.noControl);
		$('#slider-fill-glad').val(sticker.glad);
		$('#slider-fill-control').slider("refresh");
		$('#slider-fill-glad').slider("refresh");
		$('#commentAddOrEdit').data('commentid', commentId);
		$.mobile.changePage('#feedbackPage');
	};
	
	$scope.getSticker = function(commentId) {
		for (var i=0; i!=$scope.stickers.length; i++) {
			if ($scope.stickers[i].id == commentId) {
				return $scope.stickers[i];
			}
		}
		
		return null;
	};
	
	$scope.clearForm = function() {
		
		$('#comment').val('');
		$('#slider-fill-control').val('0').slider("refresh");
		$('#slider-fill-glad').val('0').slider("refresh");
		
		if ($('#commentAddOrEdit').data('mode') == 'add') {
			$('#commentAddOrEdit').html('Add');
		}
		else {
			$('#commentAddOrEdit').html('Edit');
		}
	};
	
	$scope.refreshStickers = function() {
		
		$('#stickersContainer').html('');
		
		for (var i=0; i!=$scope.stickers.length; i++) {
			
			var gladPercentage = parseInt($scope.stickers[i].glad / 10);
			var gladHtml = '<div class="progress">'
				    + '<div class="progress-bar" role="progressbar" aria-valuenow="'+gladPercentage+'" aria-valuemin="0" aria-valuemax="1000" style="width: '+gladPercentage+'%;"> ' 
				    + gladPercentage 
				    + '% glad</div>'
				    +'</div>';
			
			var controlPercentage = parseInt((1000-$scope.stickers[i].noControl) / 10);
			var controlHtml = '<div class="progress">'
				    + '<div class="progress-bar" role="progressbar" aria-valuenow="'+controlPercentage+'" aria-valuemin="0" aria-valuemax="1000" style="width: '+controlPercentage+'%;"> ' 
				    + controlPercentage
				    + '% control</div>'
				    +'</div>';
			
			$('#stickersContainer').append('<li class="ui-li-static ui-body-inherit'
					+ (i == $scope.stickers.length-1 ? ' ui-body-inheritui-last-child ui-last-child' : '')
					+ (i == 0 ? ' ui-body-inheritui-first-child ui-first-child' : '')+'">'
					+ '<strong style="font-size: 16pt;">'+$scope.stickers[i].comment+'</strong>'
					+ '<p>'
					+gladHtml + controlHtml
					+ '</p><p>'
					+ '<a href="#" onClick="app.getController(\'participant-page as participantPage\').startDeleteComment(\''+$scope.stickers[i].id+'\')" class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-left">Delete</a>'
					+ '<a href="#" onClick="app.getController(\'participant-page as participantPage\').editSticker(\''+$scope.stickers[i].id+'\')" class="ui-btn ui-btn-inline ui-icon-edit ui-btn-icon-left">Edit</a>'
					+ '<a href="#" onClick="app.getController(\'participant-page as participantPage\').publishSticker(\''+$scope.stickers[i].id+'\')" class="ui-btn ui-btn-inline ui-icon-action ui-btn-icon-left">Publish</a>'
					+'</p></li>');	
		}
		
		if ($scope.stickers.length == 0) {
			$('#stickersContainer').html('<li><i>There is no comment in pending state.<br/>You can add a comment, then <b>Publish</b> to the board whenever you want.</i></li>');
		}
	};
	
	$scope.publishSticker = function(commentId) {
		
		var sticker = $scope.getSticker(commentId);
		if (sticker == null) {
			return;
		}
		
		$scope.confirmDialog('Publish', 'Are you sure?', 'Publish', function() {
			var requestModel = {
				comment: sticker.comment,
				glad: sticker.glad / 1000,
				noControl: sticker.noControl / 1000,
				userId: null,
				username: Utils.getCookie('username'),
				sessionCode: Context.code,
				sessionToken: Context.token
			};
				
			participantService.publish(requestModel, function() {
				$scope.deleteComment(commentId);
			});
		});
	};
	
	$scope.startDeleteComment = function(commentId) {
		
		$scope.confirmDialog('Delete', 'Are you sure?', 'Delete', function() {
			$scope.deleteComment(commentId);
		});
	};
	
	$scope.deleteComment = function(commentId) {
		
		var stickers = [];
		for (var i=0; i!=$scope.stickers.length; i++) {
			if ($scope.stickers[i].id != commentId) {
				stickers.push($scope.stickers[i]);
			}
		}
		
		$scope.stickers = stickers;
		localStorage.setItem($scope.constants.stickersLocalStorageKey, JSON.stringify($scope.stickers));
		$scope.refreshStickers();
	};
	
	$scope.enterRoom = function() {
		if ($('#username').val().length == 0) {
			$('#loginErrorLabel').html('Username is required');
			return;
		}
		
		$('#loginErrorLabel').html('');
		keepaliveService.join($('#username').val(), Context.code, Context.token); 
		Utils.setCookie("username", $('#username').val()); 
		$.mobile.changePage('#feedbackPage');
	};
	
	$scope.confirmDialog = function(title, description, exitButton, callback) {
		
		$("#sure .sure-1").text(title);
		$("#sure .sure-2").text(description);
		$("#sure .sure-do").text(exitButton).on("click.sure", function() {
			callback();
			$(this).off("click.sure");
		});
		
		$.mobile.changePage("#sure");
	};
		
});