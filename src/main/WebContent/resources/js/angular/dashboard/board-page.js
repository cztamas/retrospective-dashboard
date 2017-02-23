app.controller("board-page", function BoardPageController(
		$scope, 
		configuration,
		boardService,
		stickerBuilderService,
		labelBuilderService) {
	
	$scope.enum = { 
		mode: { 
			session: 'session', 
			dashboard: 'dashboard' 
		} 
	};
	
	$scope.configuration = {
		offsetLocalStorageKey: 'retrospective.offset',
		stickerThemes: [ '#ff9999', '#99ff99' ],
	};
	
	$scope.state = {
		mode: null, // session | dashboard
		isRevealed: false,
		offset: {},
		stickers: [],
	};
	
	$scope.initialize = function(shareUrl, code, token) {
		
		boardService.initialize($scope.refreshStickers);
		
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
    
	$scope.showStickers = function() {
		
		$scope.$digest();
		$('#boardContent').html('');
		
		if (!$scope.state.isRevealed) {
			return;
		}
		
		stickerBuilderService.build(
				$scope.state.stickers, 
				$scope.state.offset, 
				$scope.getBoardHeight(), 
				$scope.getBoardWidth(), 
				$scope.state.mode == $scope.enum.mode.session);
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
			leftOffset: Math.ceil(currentLeft - originalLeft),
			bottomOffset: Math.ceil(-1 * (currentTop - originalTop))
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
		
		labelBuilderService.build($scope.getBoardHeight(), $scope.getBoardWidth());
		$scope.showStickers();
	};
	
	$scope.getBoardWidth = function() {
		return window.innerWidth - 120 - 50;
	};
	
	$scope.getBoardHeight = function() {
		return window.innerHeight - 50 - 70;
	};
		
	
});