var Board = {};
Board.GladSadMad = {
	
	constants: {
		offsetLocalStorageKey: 'retrospective.offset',
	},
	axisXBottom: 50,
	axisYLeft: 150,
	isRevealed: false,
	mode: null, // session | dashboard
	offset: {},
	
	stickers: [],
	
	stickerThemes: [ '#ff9999', '#99ff99' ],
		
	initialize: function() {
		
		// Load offsets from Local Storage in session mode
		if (this.mode == 'session' && localStorage.getItem(this.constants.offsetLocalStorageKey)) {
			this.offset = JSON.parse(localStorage.getItem(this.constants.offsetLocalStorageKey));
		}
		
		this.resize();
		this.refreshStickers();
	},
	
	startRefreshingParticipants: function() {
		var self = this;
		setTimeout(function(){ 
			self.refreshParticipants();
			console.log('Refresh participants loop');
			self.startRefreshingParticipants();
		}, 3000);
	},
	
	refreshParticipants: function() {
		
		$('#boardParticipants').html('');
		if (BoardService.participants.length == 0) {
			return;
		}
		
		$('#boardParticipants').html('');
		var activeParticipants = 0;
		for (var i=0; i!=BoardService.participants.length; i++) {
			
			if (BoardService.participants[i].age == -1) {
				// timed out
				continue;
			}
			
			$('#boardParticipants').append('<span class="board-participant">'
					+ BoardService.participants[i].username
					+'</span>');	
			
			activeParticipants += 1;
		}
	},
	
	showStickers: function() {
		$('#stickerCount').html(this.stickers.length);
		$('#boardContent').html('');
		
		if (!this.isRevealed) {
			return;
		}
		
		for (var i=0; i!=this.stickers.length; i++) {
			var bottom = (this.getBoardHeight() * this.stickers[i].glad) + this.axisXBottom - (this.stickers[i].glad * Configuration.stickerHeight);
			var left = this.axisYLeft + (this.getBoardWidth() * this.stickers[i].noControl) - (this.stickers[i].noControl * Configuration.stickerWidth);
			
			var controlId = 'sticker_' + this.stickers[i].id;
			var controlOriginalPlaceholderId = controlId + '_orig';
			
			// sticker's original palce marker
			if (this.mode == 'session') { 
				$("#boardContent").append('<div class="original-sticker-place" id="'+controlOriginalPlaceholderId+'" '
						+ 'style="'
						+ 'width: '+Configuration.stickerWidth+'px; '
						+ 'height: '+Configuration.stickerHeight+'px; '
						+ 'position: absolute; '
						+ 'transform: rotate('+this.stickers[i].transform+'deg); '
						+ 'bottom: '+bottom+'px; '
						+ 'left: '+left+'px; '
						+ '" ' 
						+ '></div>');
			}
			
			// sticker
			var bottomWithOffset = bottom;
			var leftWithOffset = left;
			if (this.offset[this.stickers[i].id]) {
				bottomWithOffset += Utils.isInt(this.offset[this.stickers[i].id].bottomOffset) ? this.offset[this.stickers[i].id].bottomOffset : 0;
				leftWithOffset += Utils.isInt(this.offset[this.stickers[i].id].leftOffset) ? this.offset[this.stickers[i].id].leftOffset : 0;
			}
			
			$("#boardContent").append('<div '
					+ 'data-sticker-id="'+this.stickers[i].id+'" '
					+ 'data-original-bottom="'+bottom+'" '
					+ 'data-original-left="'+left+'" '
					+ 'id='+controlId+' ' 
					+ 'class="sticker ui-widget-content" '
					+ 'style="'
					+ 'font-size: ' + Configuration.stickerFontSize + '; '
					+ 'height: '+Configuration.stickerHeight+'px; ' 
					+ 'width: '+Configuration.stickerWidth+'px; ' 
					+ 'background-image: -ms-linear-gradient(bottom left, #FCCD4D 0%, #FBDF93 50%, #FCCD4D 100%);'
					+ 'background-image: -moz-linear-gradient(bottom left, #FCCD4D 0%, #FBDF93 50%, #FCCD4D 100%);'
					+ 'background-image: -o-linear-gradient(bottom left, #FCCD4D 0%, #FBDF93 50%, #FCCD4D 100%);'
					+ 'background-image: -webkit-gradient(linear, left bottom, right top, color-stop(0, #FCCD4D), color-stop(50, #FBDF93), color-stop(100, #FCCD4D));'
					+ 'background-image: -webkit-linear-gradient(bottom left, #FCCD4D 0%, #FBDF93 50%, #FCCD4D 100%);'
					+ 'background-image: linear-gradient(to top right, #FCCD4D 0%, #FBDF93 50%, #FCCD4D 100%);'
					+ 'position: absolute; '
					+ 'transform: rotate('+this.stickers[i].transform+'deg); '
					+ 'bottom: '+bottom+'px; ' 
					+ 'left: '+leftWithOffset+'px;" '
					+ 'onMouseUp="$(\'#' + controlOriginalPlaceholderId+'\').hide(); $(\'#' + controlId+'\').css(\'transform\', \'rotate('+this.stickers[i].transform+'deg)\'); Board.Current.registerOffset(\''+controlId+'\', \''+this.stickers[i].id+'\'); " '
					+ 'onMouseDown="$(\'#' + controlOriginalPlaceholderId+'\').show(); $(\'#' + controlId+'\').css(\'transform\', \'rotate(0deg)\');" '
					+'>'+Utils.htmlEncode(this.stickers[i].message)+'</div>');
			
			// jQuery UI "draggable" is manipulating the control's "top" css property instead of bottom, so we have to store the top 
			// value before setting the offset-adjusted position
			$('#' + controlId).data('originalTop', $('#' + controlId).css('top').replace('px', ''));
			$('#' + controlId).css('bottom', bottomWithOffset);
			
			if (this.mode == 'session') {
				$('#' + controlId).draggable();	
			}
			
			$('#' + controlOriginalPlaceholderId).hide();
		}
	},
	
	registerOffset: function(controlId, stickerId) {
		
		if (this.mode !== 'session') {
			return;
		}
		
		var originalLeft = $('#' + controlId).data('originalLeft');
		var originalTop = $('#' + controlId).data('originalTop');
		var currentLeft = parseInt($('#' + controlId).css('left').replace('px', ''));
		var currentTop = parseInt($('#' + controlId).css('top').replace('px', ''));
		
		this.offset[stickerId] = {
			leftOffset: currentLeft - originalLeft,
			bottomOffset: -1 * (currentTop - originalTop)
		};
		
		localStorage.setItem(this.constants.offsetLocalStorageKey, JSON.stringify(this.offset));	
		BoardService.persistOffsets(Context.code, this.offset);
	},
	
	refreshStickers: function() {
		
		var self = this;
		
		BoardService.getSessionDetails(Context.code, function(stickers, offsetSettings) {
			
			try {
				if (offsetSettings != null) {
					self.offset = JSON.parse(offsetSettings);
				}	
			}
			catch (error) {
				Utils.handleError('Dashboard: unable to apply offsets', error);
			}
			
			self.stickers = stickers;
			self.showStickers();
		});
	},
	
	reveal: function(code) {
		this.isRevealed = true;
		this.refreshStickers();
	},
		
	resize: function() {
		$('#axisX').css('width', this.getBoardWidth() + 'px');
		$('#axisY').css('height', this.getBoardHeight() + 'px');
		
		this.adjustLabels();
		this.showStickers();
	},
	
	adjustLabels: function() {
		var gladBottom = this.getBoardHeight() - 20;
		gladBottom -= 120;
		$('#glad').css('bottom', gladBottom + 'px');
		
		var sadBottom = Math.ceil(this.getBoardHeight() / 2) + 30;
		sadBottom -= 70;
		$('#sad').css('bottom', sadBottom + 'px');
		
		var madBottom = 50 + 20;
		$('#mad').css('bottom', madBottom + 'px');
		
		var inControlLeft = 50 + 90;
		$('#in-control').css('bottom', '10px');
		$('#in-control').css('left', inControlLeft + 'px');
		
		var noControlLeft = 50 + this.getBoardWidth() - 150;
		$('#no-control').css('bottom', '10px');
		$('#no-control').css('left', noControlLeft + 'px');
		
		console.log(gladBottom);
	},
	
	getBoardWidth: function() {
		return window.innerWidth - 120 - 50;
	},
	
	getBoardHeight: function() {
		return window.innerHeight - 50 - 70;
	}
		
};

Board.Current = Board.GladSadMad;