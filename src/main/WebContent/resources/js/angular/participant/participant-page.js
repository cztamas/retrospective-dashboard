app.controller("participant-page", function ParticipantPageController(
		$scope, 
		keepaliveService,
		participantService,
		gsmEditorPlot,
		gsmEditorDiscrete) {
	
	app.controllers.participantPage = $scope;
	
	$scope.stickers = [];
	$scope.confirmCallback = function() {};
	$scope.gsmEditor = gsmEditorPlot;
	
	$scope.state = {
		isMobileView: null,
		boardType: null
	};
	
	$scope.constants = {
		stickersLocalStorageKey: 'retrospective.stickers',
	};
		
	$scope.initialize = function(code, token, isMobileView, boardType) {
		
		$scope.gsmEditor = (boardType == 1) ? gsmEditorPlot : gsmEditorDiscrete;
		$scope.state.boardType = boardType;
		$scope.state.isMobileView = isMobileView;
		
		participantService.initialize(code, token);
		
		var isLoginPage = isMobileView && window.location.href.indexOf('#feedbackPage') == -1 && window.location.href.indexOf('#commentsPage') == -1;
		var username = isMobileView === true ? Utils.getCookie('username') : null;
		
		if (!isMobileView && Utils.getCookie('username') != null && Utils.getCookie('username') != '') {
			$('#username').val(Utils.getCookie('username'));
		}
		
		// on page refresh, we can join and keepalive, if username exists in session
		if (isMobileView && !isLoginPage && username != null) {
			$scope.join(username);
		}
		
		// reload stickers from local storage, if there is any
		if (localStorage.getItem($scope.constants.stickersLocalStorageKey)) {
			$scope.stickers = JSON.parse(localStorage.getItem($scope.constants.stickersLocalStorageKey));
			$scope.refreshStickers();
		}
	};
	
	$scope.join = function(username) {
		
		if (!$scope.state.isMobileView) {
			username = $('#username').val();
		}
		
		if (username == null || username == '') {
			BootstrapDialog.alert({ type: BootstrapDialog.TYPE_WARNING, title: 'Warning', message: 'Username is empty' });
			return;
		}
		
		setTimeout(function(){ keepaliveService.join(username, Context.code, Context.token); }, 3000);
		$scope.onJoined();
	};
	
	$scope.onJoined = function() {
		if (!$scope.state.isMobileView) {
			$('#set-button').hide();
			$('#username').attr('readonly', 'readonly');
			Utils.setCookie('username', $('#username').val());
			BootstrapDialog.alert('Username is now set, thanks.');
		}
	};
	
	$scope.navigateToCreateComment = function() {
		
		if ($scope.state.isMobileView) {
			$.mobile.changePage('#feedbackPage');
		}
		else {
			$('#create-comment-dialog').modal('show');
		}
		 
		$('#commentAddOrEdit').data('mode', 'add');
		$scope.clearForm();
	};
	
	$scope.addSticker = function() {
		
		var glad = $('#slider-fill-glad').val();
		var noControl = $('#slider-fill-control').val();
		var comment = $('#comment').val();
		
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
					break;
				}
			}
		}
		
		localStorage.setItem($scope.constants.stickersLocalStorageKey, JSON.stringify($scope.stickers));	
		
		$scope.clearForm();
		$scope.refreshStickers();
		
		if ($scope.state.isMobileView) {
			// in mobile view, we have to return to comments page
			$.mobile.changePage('#commentsPage');	
		}
		else {
			// in desktop view, we have to close modal
			$('#create-comment-dialog').modal('hide');
		}
	};
	
	$scope.editSticker = function(commentId) {
		
		$('#commentAddOrEdit').data('mode', 'edit');
		$scope.clearForm();
		
		var sticker = $scope.getSticker(commentId);
		if (sticker == null) {
			if ($scope.state.isMobileView) {
				$.mobile.changePage('#commentsPage');		
			}
		
			return;
		}
		
		$('#comment').val(sticker.comment);
		
		if ($scope.state.isMobileView) {
			// slider
			$('#slider-fill-control').val(sticker.noControl);
			$('#slider-fill-glad').val(sticker.glad);
			
			try {
				$('#slider-fill-control').slider('refresh');
				$('#slider-fill-glad').slider('refresh');	
			} catch (error) {
				// if slider is not initialized yet (user navigates to "edit" page without visiting "add comment" page), 
				// we can get an error
			}
		}
		else {
			$('#slider-fill-control').bootstrapSlider('setValue', sticker.noControl)
			$('#slider-fill-glad').bootstrapSlider('setValue', sticker.glad);
		}
		
		$scope.gsmEditor.editSticker(sticker, $scope.state.isMobileView);
		
		$('#commentAddOrEdit').data('commentid', commentId);
		
		if ($scope.state.isMobileView) {
			$.mobile.changePage('#feedbackPage');
		}
		else {
			$('#create-comment-dialog').modal('show');
			$('#marker-ball').addClass('hidden');
		}
		
		$scope.setCrosshair(sticker.glad, sticker.noControl, 'plot-area', 10);
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
		
		if ($scope.state.isMobileView) {
			// we are using jQuery Mobile's Slider in mobile view
			try {
				$('#slider-fill-control').val('0').slider("refresh");
				$('#slider-fill-glad').val('0').slider("refresh");
					
			} 
			catch(error) {
				// if slider is not initialized yet (user navigates to "edit" page without visiting "add comment" page), 
				// we can get an error
			}
		}
		else {
			// we are using a different slider for desktop web client
			$('#slider-fill-control').bootstrapSlider('setValue', 500);
			$('#slider-fill-glad').bootstrapSlider('setValue', 500);
		}
		
		$scope.gsmEditor.clearForm($scope.state.isMobileView);
		
		if ($('#commentAddOrEdit').data('mode') == 'add') {
			$('#commentAddOrEdit').html('Add');
		}
		else {
			$('#commentAddOrEdit').html('Edit');
		}
	};
	
	$scope.setCrosshair = function(glad, noControl, plotId, renderPlotTryCount) {
		
		if ($scope.state.boardType == 2) {
			// we are not using plot are for Vertical Board (only glad, sad, mad discrete values are allowed)
			return;
		}
		
		$('#marker-ball').removeClass('hidden');
		var pos = $("#" + plotId).position();
		
		if (pos.left == 0 && pos.top == 0 && renderPlotTryCount > 0) {
			setTimeout(function() {
				console.warn('Trying to render marker dot on plot area (attempt '+(11-renderPlotTryCount)+'), plot area is not visible yet, position can not be determined');
				$scope.setCrosshair(glad, noControl, plotId, renderPlotTryCount - 1)
			}, 100);
			return;
		}
		
		console.log('Plot Area visible, rendering marker dot');
		
		var plotSize = { 
			width: $("#" + plotId).width(), 
			height: $("#" + plotId).height() 
		};
		
		var relativeX = (noControl / 1000) * plotSize.width;
		var relativeY = (1 - (glad / 1000)) * plotSize.height;
		
		$('#' + plotId).data('glad', glad);
		$('#' + plotId).data('noControl', noControl);
		
		$('#marker-ball').attr('style', 'position: absolute; left: ' + (pos.left + relativeX - 5) + 'px; top: ' + (pos.top + relativeY - 5) + 'px; ');
	};
	
	$scope.refreshStickers = function() {
		if ($scope.state.isMobileView) {
			$scope.refreshStickersForMobile();			
		}
		else {
			$scope.refreshStickersForWeb();
		}
	};
	
	$scope.refreshStickersForMobile = function() {
		$('#publish-all-btn').prop('disabled', false);
		$('#stickersContainer').html('');
		
		for (var i=0; i!=$scope.stickers.length; i++) {
			$scope.gsmEditor.renderStickerForMobile($scope.stickers[i], i, $scope.stickers.length);
		}
		
		if ($scope.stickers.length == 0) {
			$('#publish-all-btn').prop('disabled', true);
			$('#stickersContainer').html('<li><table width="100%">' 
					+ '<tr>' 
					+ '  <td width="33%">&nbsp;</td>'
					+ '  <td style="font-size: 8pt; color: #cccccc; border: solid 1px #cccccc; padding-top: 20px; padding-left: 20px; padding-right: 20px; padding-bottom: 20px;"><i>No feedback to be published.</i></td>'
					+ '  <td width="33%">&nbsp;</td>'
					+ '</tr></table><br/></li>');
		}
	};
	
	$scope.refreshStickersForWeb = function() {
		
		if ($scope.stickers.length == 0) {
			$('#publish-all-btn').prop('disabled', true);
			$('#stickersContainer').html('<table width="100%">' 
					+ '<tr>' 
					+ '  <td align="middle" style="font-size: 12pt; color: #cccccc; border: solid 1px #cccccc; padding-top: 20px; padding-left: 20px; padding-right: 20px; padding-bottom: 20px;">'
					+ '    <i>No feedback to be published.</i></td>'
					+ '</tr></table>');
			return;
		}
		
		$('#publish-all-btn').prop('disabled', false);
		$('#stickersContainer').html('');
		
		for (var i=0; i!=$scope.stickers.length; i++) {
			$scope.gsmEditor.renderStickerForWeb($scope.stickers[i]);
		}
	};

	$scope.publishAll = function() {
		
		// make sure that username is sent to server
		if (!$scope.state.isMobileView && !keepaliveService.isRunning) {
			BootstrapDialog.alert({ type: BootstrapDialog.TYPE_WARNING, title: 'Warning', message: 'Username is not set' });
			return;
		}
		
		// determine username
		var username = null;
		if ($scope.state.isMobileView) {
			username = Utils.getCookie('username');	
		}
		else {
			username = $('#username').val(); 
		}
		
		$scope.confirmDialog('Publish', 'Are you sure you want to publish all comments?', 'Publish All', function() {
			
			var comments = [];
			for (var i=0; i!=$scope.stickers.length; i++) {
				comments.push($scope.createRequestModel($scope.stickers[i], username));
			}
			
			participantService.publish(comments, function() {
				$scope.stickers = [];
				$scope.deleteComment(null);
			});
		});
	};
	
	$scope.publishSticker = function(commentId) {
		
		var sticker = $scope.getSticker(commentId);
		
		// determine username
		var username = null;
		if ($scope.state.isMobileView) {
			username = Utils.getCookie('username');	
		}
		else {
			username = $('#username').val(); 
		}
		
		// make sure that username is sent to server
		if (!$scope.state.isMobileView && !keepaliveService.isRunning) {
			BootstrapDialog.alert({ type: BootstrapDialog.TYPE_WARNING, title: 'Warning', message: 'Username is not set' });
			return;
		}
		
		if (sticker == null) {
			return;
		}
		
		$scope.confirmDialog('Publish', 'Are you sure you want to publish this comment?', 'Publish', function() {
			
			var requestModel = $scope.createRequestModel(sticker, username);
			
			participantService.publish([requestModel], function() {
				$scope.deleteComment(commentId);
			});
		});
	};
	
	$scope.createRequestModel = function(sticker, username) {
		return {
			comment: sticker.comment,
			glad: sticker.glad / 1000,
			noControl: sticker.noControl / 1000,
			userId: null,
			username: username,
			sessionCode: Context.code,
			sessionToken: Context.token
		};
	};
	
	$scope.startDeleteComment = function(commentId) {
		
		$scope.confirmDialog('Delete', 'Are you sure you want to delete this comment?', 'Delete', function() {
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
		if ($scope.state.isMobileView) {
			
			$scope.confirmCallback = callback;
			
			$("#sure .sure-1").text(title);
			$("#sure .sure-2").text(description);
			$("#sure .sure-do").text(exitButton).on("click.sure", function() {
				$scope.confirmCallback();
				$scope.confirmCallback = function() {};
				$("#sure .sure-do").off("click.sure");
			});
			
			$.mobile.changePage("#sure");	
		}
		else {
			if (confirm(description)) {
				callback();
			}
		}
	};
		
});