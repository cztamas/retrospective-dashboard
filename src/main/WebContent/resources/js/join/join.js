var JoinController = {
		
	stickers: [],
	
	constants: {
		stickersLocalStorageKey: 'retrospective.stickers',
	},
		
	initialize: function() {
		
		var isLoginPage = window.location.href.indexOf('#feedbackPage') == -1 && window.location.href.indexOf('#commentsPage') == -1;
		var username = Utils.getCookie('username');
		
		// on page refresh, we can join and keepalive, if username exists in session
		if (!isLoginPage && username != null) {
			setTimeout(function(){ ParticipantService.join(username); }, 3000);
		}
		
		// reload stickers from local storage, if there is any
		if (localStorage.getItem(this.constants.stickersLocalStorageKey)) {
			this.stickers =	JSON.parse(localStorage.getItem(this.constants.stickersLocalStorageKey));
			this.refreshStickers();
		}
	},
	
	addSticker: function(glad, noControl, comment) {
		
		var isAdding = $('#commentAddOrEdit').data('mode') == 'add';
		if (comment == '') {
			$('#errorLabel').html('Comment field is required');
			return;
		}
		
		$('#errorLabel').html('');
		
		if (isAdding) {
			this.stickers.push({ 
				glad: glad, 
				noControl: noControl, 
				comment: comment,
				id: 'id_' + Math.floor(Math.random() * 99999)
			});
			
		}
		else {
			for (var i=0; i!=this.stickers.length; i++) {
				if (this.stickers[i].id == $('#commentAddOrEdit').data('commentid')) {
					this.stickers[i].glad = glad;
					this.stickers[i].noControl = noControl;
					this.stickers[i].comment = comment;	
				}
			}
		}
		
		localStorage.setItem(this.constants.stickersLocalStorageKey, JSON.stringify(this.stickers));	
		
		this.clearForm();
		this.refreshStickers();
		$.mobile.changePage('#commentsPage');
	},
	
	editSticker: function(commentId) {
		
		$('#commentAddOrEdit').data('mode', 'edit');
		this.clearForm();
		
		var sticker = this.getSticker(commentId);
		if (sticker == null) {
			$.mobile.changePage('#commentsPage');	
			return;
		}
		
		$('#comment').val(sticker.comment);
		$('#slider-fill-nocontrol').val(sticker.noControl);
		$('#slider-fill-glad').val(sticker.glad);
		$('#commentAddOrEdit').data('commentid', commentId);
		$.mobile.changePage('#feedbackPage');
	},
	
	getSticker: function(commentId) {
		for (var i=0; i!=this.stickers.length; i++) {
			if (this.stickers[i].id == commentId) {
				return this.stickers[i];
			}
		}
		
		return null;
	},
	
	clearForm: function() {
		$('#comment').val('');
		$('#slider-fill-nocontrol').val('60');
		$('#slider-fill-glad').val('60');
		
		if ($('#commentAddOrEdit').data('mode') == 'add') {
			$('#commentAddOrEdit').html('Add');
		}
		else {
			$('#commentAddOrEdit').html('Edit');
		}
	},
	
	refreshStickers: function() {
		
		$('#stickersContainer').html('');
		
		for (var i=0; i!=this.stickers.length; i++) {
			
			$('#stickersContainer').append('<li class="ui-li-static ui-body-inherit'
					+ (i == this.stickers.length-1 ? ' ui-body-inheritui-last-child ui-last-child' : '')
					+ (i == 0 ? ' ui-body-inheritui-first-child ui-first-child' : '')+'"><p>Glad: '
					+ this.stickers[i].glad+', No Control: '+this.stickers[i].noControl+'<br/><strong style="font-size: 16pt;">'+this.stickers[i].comment+'</strong><br/>'
					+ '<a href="#" onClick="JoinController.startDeleteComment(\''+this.stickers[i].id+'\');" class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-left">Delete</a>'
					+ '<a href="#" onClick="JoinController.editSticker(\''+this.stickers[i].id+'\');" class="ui-btn ui-btn-inline ui-icon-edit ui-btn-icon-left">Edit</a>'
					+ '<a href="#" onClick="JoinController.publishSticker(\''+this.stickers[i].id+'\');" class="ui-btn ui-btn-inline ui-icon-action ui-btn-icon-left">Publish</a>'
					+'</p></li>');	
		}
		
		if (this.stickers.length == 0) {
			$('#stickersContainer').html('<li><i>There is no comment in pending state.<br/>You can add a comment, then <b>Publish</b> to the board whenever you want.</i></li>');
		}
	},
	
	publishSticker: function(commentId) {
		
		var self = this;
		var sticker = this.getSticker(commentId);
		if (sticker == null) {
			return;
		}
		
		this.confirmDialog('Publish', 'Are you sure?', 'Publish', function() {
			var requestModel = {
				comment: sticker.comment,
				glad: sticker.glad / 1000,
				noControl: sticker.noControl / 1000,
				userId: null,
				username: Utils.getCookie('username'),
				sessionCode: Context.code,
				sessionToken: Context.token
			};
				
			ParticipantService.publish(requestModel, function() {
				self.deleteComment(commentId);
			});
		});
	},
	
	startDeleteComment: function(commentId) {
		var self = this;
		this.confirmDialog('Delete', 'Are you sure?', 'Delete', function() {
			self.deleteComment(commentId);
		});
	},
	
	deleteComment: function(commentId) {
		
		var stickers = [];
		for (var i=0; i!=this.stickers.length; i++) {
			if (this.stickers[i].id != commentId) {
				stickers.push(this.stickers[i]);
			}
		}
		
		this.stickers = stickers;
		localStorage.setItem(this.constants.stickersLocalStorageKey, JSON.stringify(this.stickers));
		this.refreshStickers();
	},
	
	enterRoom: function() {
		if ($('#username').val().length == 0) {
			$('#loginErrorLabel').html('Username is required');
			return;
		}
		
		$('#loginErrorLabel').html('');
		ParticipantService.join($('#username').val()); 
		Utils.setCookie("username", $('#username').val()); 
		$.mobile.changePage('#feedbackPage');
	},
	
	confirmDialog: function(title, description, exitButton, callback) {
		
		$("#sure .sure-1").text(title);
		$("#sure .sure-2").text(description);
		$("#sure .sure-do").text(exitButton).on("click.sure", function() {
			callback();
			$(this).off("click.sure");
		});
		
		$.mobile.changePage("#sure");
	}
		
};