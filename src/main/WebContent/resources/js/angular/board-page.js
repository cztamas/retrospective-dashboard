app.controller("board-page", function($scope, boardService) {
	
	$scope.enum = { 
		mode: { 
			session: 'session', 
			dashboard: 'dashboard' 
		} 
	};
	
	$scope.configuration = {
		offsetLocalStorageKey: 'retrospective.offset',
		axisXBottom: 50,
		axisYLeft: 150,
		stickerThemes: [ '#ff9999', '#99ff99' ],
	};
	
	$scope.state = {
		mode: null, // session | dashboard
		isRevealed: false,
		offset: {},
		stickers: [],
	};
	
	$scope.initialize = function(shareUrl) {
		
		boardService.initialize();
		
		$(document).tooltip();
		$('#dialog').hide();
		$('#shareUrl').val(shareUrl);
		
		// Load offsets from Local Storage in session mode
		if ($scope.state.mode == $scope.enum.mode.session && localStorage.getItem($scope.configuration.offsetLocalStorageKey)) {
			$scope.state.offset = JSON.parse(localStorage.getItem($scope.configuration.offsetLocalStorageKey));
		}
		
		$scope.resize();
		$scope.refreshStickers();
    };
    
    $scope.addParticipant = function(participantDetails) {
    	boardService.addParticipant(participantDetails);
    	$scope.refreshParticipants();
    };
    
    $scope.startRefreshingParticipants = function() {
		
		setTimeout(function(){ 
			$scope.refreshParticipants();
			console.log('Refresh participants loop');
			$scope.startRefreshingParticipants();
		}, 3000);
	};
	
	$scope.refreshParticipants = function() {
		
		$('#boardParticipants').html('');
		if (boardService.participants.length == 0) {
			return;
		}
		
		$('#boardParticipants').html('');
		var activeParticipants = 0;
		for (var i=0; i!=boardService.participants.length; i++) {
			
			if (boardService.participants[i].age == -1) {
				// timed out
				continue;
			}
			
			$('#boardParticipants').append('<span class="board-participant">'
					+ boardService.participants[i].username
					+'</span>');	
			
			activeParticipants += 1;
		}
	};
	
	$scope.showStickers = function() {
		$('#stickerCount').html($scope.state.stickers.length);
		$('#boardContent').html('');
		
		if (!$scope.state.isRevealed) {
			return;
		}
		
		for (var i=0; i!=$scope.state.stickers.length; i++) {
			var bottom = ($scope.getBoardHeight() * $scope.state.stickers[i].glad) + $scope.configuration.axisXBottom - ($scope.state.stickers[i].glad * Configuration.stickerHeight);
			var left = $scope.configuration.axisYLeft + ($scope.getBoardWidth() * $scope.state.stickers[i].noControl) - ($scope.state.stickers[i].noControl * Configuration.stickerWidth);
			
			var controlId = 'sticker_' + $scope.state.stickers[i].id;
			var controlOriginalPlaceholderId = controlId + '_orig';
			
			// sticker's original palce marker
			if ($scope.state.mode == $scope.enum.mode.session) { 
				$("#boardContent").append('<div class="original-sticker-place" id="'+controlOriginalPlaceholderId+'" '
						+ 'style="'
						+ 'width: '+Configuration.stickerWidth+'px; '
						+ 'height: '+Configuration.stickerHeight+'px; '
						+ 'position: absolute; '
						+ 'transform: rotate('+$scope.state.stickers[i].transform+'deg); '
						+ 'bottom: '+bottom+'px; '
						+ 'left: '+left+'px; '
						+ '" ' 
						+ '></div>');
			}
			
			// sticker
			var bottomWithOffset = bottom;
			var leftWithOffset = left;
			if ($scope.state.offset[$scope.state.stickers[i].id]) {
				bottomWithOffset += Utils.isInt($scope.state.offset[$scope.state.stickers[i].id].bottomOffset) ? $scope.state.offset[$scope.state.stickers[i].id].bottomOffset : 0;
				leftWithOffset += Utils.isInt($scope.state.offset[$scope.state.stickers[i].id].leftOffset) ? $scope.state.offset[$scope.state.stickers[i].id].leftOffset : 0;
			}
			
			$("#boardContent").append('<div '
					+ 'data-sticker-id="'+$scope.state.stickers[i].id+'" '
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
					+ 'transform: rotate('+$scope.state.stickers[i].transform+'deg); '
					+ 'bottom: '+bottom+'px; ' 
					+ 'left: '+leftWithOffset+'px;" '
					+ 'onMouseUp="$(\'#' + controlOriginalPlaceholderId+'\').hide(); $(\'#' + controlId+'\').css(\'transform\', \'rotate('+$scope.state.stickers[i].transform+'deg)\'); Board.Current.registerOffset(\''+controlId+'\', \''+$scope.state.stickers[i].id+'\'); " '
					+ 'onMouseDown="$(\'#' + controlOriginalPlaceholderId+'\').show(); $(\'#' + controlId+'\').css(\'transform\', \'rotate(0deg)\');" '
					+'>'+Utils.htmlEncode($scope.state.stickers[i].message)+'</div>');
			
			// jQuery UI "draggable" is manipulating the control's "top" css property instead of bottom, so we have to store the top 
			// value before setting the offset-adjusted position
			$('#' + controlId).data('originalTop', $('#' + controlId).css('top').replace('px', ''));
			$('#' + controlId).css('bottom', bottomWithOffset);
			
			if ($scope.state.mode == $scope.enum.mode.session) {
				$('#' + controlId).draggable();	
			}
			
			$('#' + controlOriginalPlaceholderId).hide();
		}
	};
	
	$scope.registerOffset = function(controlId, stickerId) {
		
		if ($scope.state.mode !== $scope.enum.mode.session) {
			return;
		}
		
		var originalLeft = $('#' + controlId).data('originalLeft');
		var originalTop = $('#' + controlId).data('originalTop');
		var currentLeft = parseInt($('#' + controlId).css('left').replace('px', ''));
		var currentTop = parseInt($('#' + controlId).css('top').replace('px', ''));
		
		$scope.state.offset[stickerId] = {
			leftOffset: currentLeft - originalLeft,
			bottomOffset: -1 * (currentTop - originalTop)
		};
		
		localStorage.setItem($scope.configuration.offsetLocalStorageKey, JSON.stringify($scope.state.offset));	
		boardService.persistOffsets(Context.code, $scope.state.offset);
	};
	
	$scope.refreshStickers = function() {
		
		boardService.getSessionDetails(Context.code, function(stickers, offsetSettings) {
			
			try {
				if (offsetSettings != null) {
					$scope.state.offset = JSON.parse(offsetSettings);
				}	
			}
			catch (error) {
				Utils.handleError('Dashboard: unable to apply offsets', error);
			}
			
			$scope.state.stickers = stickers;
			$scope.showStickers();
		});
	};
	
	$scope.reveal = function(code) {
		$scope.state.isRevealed = true;
		$scope.refreshStickers();
	};
		
	$scope.resize = function() {
		$('#axisX').css('width', $scope.getBoardWidth() + 'px');
		$('#axisY').css('height', $scope.getBoardHeight() + 'px');
		
		$scope.adjustLabels();
		$scope.showStickers();
	};
	
	$scope.adjustLabels = function() {
		var gladBottom = $scope.getBoardHeight() - 20;
		gladBottom -= 120;
		$('#glad').css('bottom', gladBottom + 'px');
		
		var sadBottom = Math.ceil($scope.getBoardHeight() / 2) + 30;
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
	};
	
	$scope.getBoardWidth = function() {
		return window.innerWidth - 120 - 50;
	};
	
	$scope.getBoardHeight = function() {
		return window.innerHeight - 50 - 70;
	};
		
	
});