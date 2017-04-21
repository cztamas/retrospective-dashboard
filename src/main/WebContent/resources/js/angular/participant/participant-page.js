app.controller("participant-page", function ParticipantPageController(
		$scope, 
		keepaliveService,
		participantService) {
	
	$scope.stickers = [];
	
	$scope.state = {
		isMobileView: null
	};
	
	$scope.constants = {
		stickersLocalStorageKey: 'retrospective.stickers',
	};
		
	$scope.initialize = function(code, token, isMobileView) {
		
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
			$('#slider-fill-control').val(sticker.noControl);
			$('#slider-fill-glad').val(sticker.glad);
			$('#slider-fill-control').slider('refresh');
			$('#slider-fill-glad').slider('refresh');	
		}
		else {
			$('#slider-fill-control').bootstrapSlider('setValue', sticker.noControl)
			$('#slider-fill-glad').bootstrapSlider('setValue', sticker.glad);
		}
		
		$('#commentAddOrEdit').data('commentid', commentId);
		
		if ($scope.state.isMobileView) {
			$.mobile.changePage('#feedbackPage');	
		}
		else {
			$('#create-comment-dialog').modal('show');
			$('#marker-ball').addClass('hidden');
			$scope.setCrosshair(sticker.glad, sticker.noControl, 'plot-area', 10);
		}
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
			$('#slider-fill-control').val('0').slider("refresh");
			$('#slider-fill-glad').val('0').slider("refresh");	
		}
		else {
			// we are using a different slider for desktop web client
			$('#slider-fill-control').bootstrapSlider('setValue', 500);
			$('#slider-fill-glad').bootstrapSlider('setValue', 500);
			
			// and we are using coordinates as well
			$('#marker-ball').addClass('hidden');
		}
		
		if ($('#commentAddOrEdit').data('mode') == 'add') {
			$('#commentAddOrEdit').html('Add');
		}
		else {
			$('#commentAddOrEdit').html('Edit');
		}
	};
	
	$scope.setCrosshair = function(glad, noControl, plotId, renderPlotTryCount) {
		
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
			
			var gladPercentage = parseInt($scope.stickers[i].glad / 10);
			var gladHtml = '<div class="progress">'
				    + '<div class="progress-bar" role="progressbar" aria-valuenow="'+gladPercentage+'" aria-valuemin="0" aria-valuemax="1000" style="width: '+gladPercentage+'%;"> ' 
				    + gladPercentage 
				    + '% glad</div>'
				    +'</div>';
			
			var controlPercentage = parseInt(($scope.stickers[i].noControl) / 10);
			var controlHtml = '<div class="progress">'
				    + '<div class="progress-bar" role="progressbar" aria-valuenow="'+controlPercentage+'" aria-valuemin="0" aria-valuemax="1000" style="width: '+controlPercentage+'%;"> ' 
				    + controlPercentage
				    + '% no control</div>'
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
		
		var template = '<div class="panel panel-default">'
			  + '<div class="panel-heading">{comment}</div>'
			  + '<div class="panel-body">'
			  + '  <div class="progress">'
	  		  + '     <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: {gladPercentage}%;">Glad</div>'
			  + '  </div>'
			  + '  <div class="progress">'
	  		  + '     <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: {controlPercentage}%;">No Control</div>'
			  + '</div>'
				
			  + '<div class="btn-group" role="group" aria-label="...">'
			  + '  <button type="button" class="btn btn-default" onClick="app.getController(\'participant-page as participantPage\').startDeleteComment(\'{stickerId}\')">Delete</button>'
			  + '  <button type="button" class="btn btn-default" onClick="app.getController(\'participant-page as participantPage\').editSticker(\'{stickerId}\')">Edit</button>'
			  + '  <button type="button" class="btn btn-default" onClick="app.getController(\'participant-page as participantPage\').publishSticker(\'{stickerId}\')">Publish</button>'
			  + '</div></div></div>';
		
		for (var i=0; i!=$scope.stickers.length; i++) {
			var gladPercentage = parseInt($scope.stickers[i].glad / 10);
			var controlPercentage = parseInt(($scope.stickers[i].noControl) / 10);
			
			$('#stickersContainer').append(template
					.replaceAll('{gladPercentage}', gladPercentage)
					.replaceAll('{controlPercentage}', controlPercentage)
					.replaceAll('{comment}', $scope.stickers[i].comment)
					.replaceAll('{stickerId}', $scope.stickers[i].id));
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
			$("#sure .sure-1").text(title);
			$("#sure .sure-2").text(description);
			$("#sure .sure-do").text(exitButton).on("click.sure", function() {
				callback();
				$(this).off("click.sure");
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