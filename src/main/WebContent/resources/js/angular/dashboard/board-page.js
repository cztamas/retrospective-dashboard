app.controller("board-page", function BoardPageController(
		$scope, 
		configuration,
		boardService,
		stickerBuilderService,
		stickerBuilderV2Service,
		stickerColorThemeService,
		labelBuilderService,
		loadingService,
		revealDropdownProviderService) {
	
	$scope.stickerBuilderProvider = stickerBuilderService;
	
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
		isPartialReveal: false,
		revealedUsers: {},
		usersWithPublishedStickers: [], // item: { username: "akos-sereg", isRevealed: true }
		offset: {},
		stickers: [],
		sessionParameters: {},
		isLocked: false,
		token: null
	};
	
	$scope.$watch('state.usersWithPublishedStickers');
	
	$scope.initialize = function(shareUrl, code, token, boardType) {
		
		switch (boardType) {
		
			// Plot
			case 1:
				$scope.stickerBuilderProvider = stickerBuilderService;
				break;
				
			// Vertical
			case 2: 
				$scope.stickerBuilderProvider = stickerBuilderV2Service;
				break;
		}
		
		$scope.state.token = token;
		
		if ($scope.state.mode == $scope.enum.mode.session) {
			// websocket connection is allowed only for Session mode (disabled in Dashboard mode)
			boardService.initialize($scope.refreshStickers, false);	
		}
		
		$(document).tooltip();
		$('#dialog').hide();
		$('#shareUrl').html(shareUrl);
		$('.label-dbl-click-remove').hide();
		
		// Load offsets from Local Storage in session mode
		if ($scope.state.mode == $scope.enum.mode.session && localStorage.getItem($scope.configuration.offsetLocalStorageKey)) {
			$scope.state.offset = JSON.parse(localStorage.getItem($scope.configuration.offsetLocalStorageKey));
		}
		
		// Setup context menu
		var colorThemes = stickerColorThemeService.getStickerBackgroundCssList();
		for (var i=0; i!=colorThemes.length; i++) {
			$('#color-sample-' + i).attr('style', colorThemes[i]);
		}
		
		// Initialize sesttings dialog
		app.getController('session-settings-widget').initialize();
		
		$scope.resize();
		$scope.refreshStickers();
    };
    
    $scope.getStickerBackgroundCssList = function() {
    	return stickerColorThemeService.getStickerBackgroundCssList();
    };
    
	$scope.showStickers = function() {
		
		$scope.safeDigest();
		
		$('#boardContent').html('');
		
		if (!$scope.state.isRevealed) {
			return;
		}
		
		$scope.stickerBuilderProvider.build(
				$scope.state.stickers, 
				$scope.state.offset, 
				$scope.getBoardHeight(), 
				$scope.getBoardWidth(), 
				$scope.state.mode == $scope.enum.mode.session,
				$scope.state.isPartialReveal ? $scope.state.revealedUsers : null);
	};
	
	$scope.registerRemoved = function(controlId, stickerId) {
		if ($scope.state.mode !== $scope.enum.mode.session) {
			return;
		}
		
		$scope.state.offset[stickerId] = { removed: true };
		localStorage.setItem($scope.configuration.offsetLocalStorageKey, JSON.stringify($scope.state.offset));	
		boardService.persistOffsets(Context.code, $scope.state.offset);
		$scope.showStickers();
	};
	
	$scope.registerColorChange = function(controlId, stickerId, colorIndex) {
		
		if ($scope.state.mode !== $scope.enum.mode.session) {
			return;
		}
		
		if (!$scope.state.offset[stickerId]) {
			$scope.state.offset[stickerId] = {};
		}
		
		$scope.state.offset[stickerId].colorTheme = colorIndex;
		
		localStorage.setItem($scope.configuration.offsetLocalStorageKey, JSON.stringify($scope.state.offset));	
		boardService.persistOffsets(Context.code, $scope.state.offset);
		$scope.showStickers();
	};
	
	$scope.setPostItSize = function(size) {
		var configs = [{ boxSizeRatio: 0.5, stickerFontSize: '7pt' }, 
		               { boxSizeRatio: 0.75, stickerFontSize: '10pt' }, 
		               { boxSizeRatio: 1.0, stickerFontSize: '14pt' }];
		
		if (size >= configs.length) {
			return;
		}
		
		$scope.stickerBuilderProvider.configuration.boxSizeRatio = configs[size].boxSizeRatio;
		$scope.stickerBuilderProvider.configuration.stickerFontSize = configs[size].stickerFontSize;
		
		$scope.state.sessionParameters.size = size;
	};
	
	$scope.resizePostIts = function(size) {
		
		$scope.setPostItSize(size);
		boardService.registerSessionParameters(Context.code, $scope.state.sessionParameters);
		
		$scope.showStickers();
	};
	
	$scope.registerOffset = function(controlId, stickerId) {
		
		if ($scope.state.mode !== $scope.enum.mode.session) {
			return;
		}
		
		var originalLeft = $('#' + controlId).data('originalLeft');
		var originalTop = $('#' + controlId).data('originalTop');
		var currentLeft = parseInt($('#' + controlId).css('left').replace('px', ''));
		var currentTop = parseInt($('#' + controlId).css('top').replace('px', ''));
		
		if (!$scope.state.offset[stickerId]){
			$scope.state.offset[stickerId] = {};
		}
		
		$scope.state.offset[stickerId].leftOffset = Math.ceil(currentLeft - originalLeft);
		$scope.state.offset[stickerId].bottomOffset = Math.ceil(-1 * (currentTop - originalTop));
		
		localStorage.setItem($scope.configuration.offsetLocalStorageKey, JSON.stringify($scope.state.offset));	
		boardService.persistOffsets(Context.code, $scope.state.offset);
	};
	
	$scope.refreshStickers = function() {
		
		loadingService.start();
		boardService.getSessionDetails(Context.code, function(stickers, offsetSettings, sessionParameters, isLocked) {
			
			try {
				if (offsetSettings != null) {
					$scope.state.offset = JSON.parse(offsetSettings);
				}	
			}
			catch (error) {
				Utils.handleError('Dashboard: unable to apply offsets', error);
			}
			
			// initialize stickers
			$scope.state.stickers = stickers;
			
			$scope.state.usersWithPublishedStickers = revealDropdownProviderService.extractUsers(stickers, $scope.state.revealedUsers);
			$scope.safeDigest();
			
			// set post-it size
			try {
				
				$scope.state.sessionParameters = sessionParameters;
				$scope.state.isLocked = isLocked;
				
				$scope.setPostItSize(sessionParameters.size);
				$('#sessionName').val(Utils.htmlEncode($scope.state.sessionParameters.name));
				$('#sessionComment').val(Utils.htmlEncode($scope.state.sessionParameters.comment));
				$('#sessionCommentText').html(Utils.nl2br(Utils.htmlEncode($scope.state.sessionParameters.comment)));
				app.getController('session-settings-widget').state.isAnonymous = $scope.state.sessionParameters.isAnonymous;
				Context.displayUsernames = !$scope.state.sessionParameters.isAnonymous
				$("#postit-size-slider").bootstrapSlider('setValue', sessionParameters.size);	
			}
			catch (error) {
				Utils.handleError('Dashboard: unable to apply post-it size', error);
			}
			
			// render stickers
			$scope.showStickers();
			loadingService.end();
		});
	};
	
	$scope.revealAll = function() {
		$scope.state.isRevealed = true;
		$scope.state.isPartialReveal = false;
		$scope.state.revealedUsers = revealDropdownProviderService.getUsersWithPublishedStickers($scope.state.stickers);
		
		$scope.refreshStickers();
	};
	
	$scope.revealPartial = function(revealedUsers) {
		$scope.state.isRevealed = true;
		$scope.state.revealedUsers = revealedUsers;
		$scope.state.isPartialReveal = true;
		
		$scope.refreshStickers();
	};
	
	$scope.revealUser = function(username) {
		
		if (!$scope.state.revealedUsers[username]) {
			$scope.state.revealedUsers[username] = true;
		}
		else {
			$scope.state.revealedUsers[username] = undefined;
		}
	
		$scope.revealPartial($scope.state.revealedUsers);
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
		
	$scope.safeDigest = function() {
    	try {
    		$scope.$digest();	
    	}
    	catch (error) {
    		
    	}
    	
    };
});