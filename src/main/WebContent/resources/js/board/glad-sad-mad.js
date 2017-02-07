var Board = {};
Board.GladSadMad = {
	
	axisXBottom: 50,
	axisYLeft: 150,
	stickerWidth: 200,
	stickerHeight: 200,
	isRevealed: false,
	
	stickers: [],
	
	stickerThemes: [ '#ff9999', '#99ff99' ],
		
	initialize: function() {
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
		
		$('#boardParticipants').html('Participants: ');
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
		
		if (activeParticipants == 0) {
			$('#boardParticipants').html('');
		}
		
	},
	
	showStickers: function() {
		
		$('#stickerCount').html(this.stickers.length);
		$('#boardContent').html('');
		
		if (!this.isRevealed) {
			return;
		}
		
		for (var i=0; i!=this.stickers.length; i++) {
			var bottom = (this.getBoardHeight() * this.stickers[i].glad) + this.axisXBottom - (this.stickers[i].glad * this.stickerHeight);
			var left = this.axisYLeft + (this.getBoardWidth() * this.stickers[i].noControl) - (this.stickers[i].noControl * this.stickerWidth);
			
			if (this.stickers[i].transform == undefined) {
				this.stickers[i].transform = Math.floor((Math.random() * 30) - 15 ); // -15 to 15 degrees	
			}
			
			var controlId = 'sticker_' + Math.ceil(Math.random() * 999999);
			
			$("#boardContent").append('<div id='+controlId+' ' 
					+ 'onMouseOver="$(\'#'+controlId+'\').css(\'z-index\', \'10\')" class="sticker" '
					+ 'onMouseOut="$(\'#'+controlId+'\').css(\'z-index\', \'\')" class="sticker" '
					+ 'style="' 
					+ 'background-color: #FFC300; ' 
					+ 'height: '+this.stickerHeight+'px; ' 
					+ 'width: '+this.stickerWidth+'px; ' 
					+ 'position: absolute; '
					+ 'transform: rotate('+this.stickers[i].transform+'deg); '
					+ 'bottom: '+bottom+'px; ' 
					+ 'left: '+left+'px;">'+this.stickers[i].message+'</div>')
		}
	},
	
	refreshStickers: function() {
		
		var self = this;
		
		BoardService.getSessionDetails(Context.code, function(stickers) {
			
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
		$('#glad').css('bottom', gladBottom + 'px');
		
		var sadBottom = Math.ceil(this.getBoardHeight() / 2) + 30;
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