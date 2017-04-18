app.service('stickerBuilderService', function StickerBuilderService(configuration, stickerColorThemeService) {
	
	var self = this;
	
	self.configuration = {
		axisXBottom: 50,
		axisYLeft: 150,
		headerHeight: 50,
		
		// box sizing
		boxSizeRatio: 1.0,
		stickerFontSize: '14pt'
	};
	
	self.calculateLeft = function(boardWidth, noControl, stickerWidth) {
		return self.configuration.axisYLeft + (boardWidth * noControl) - (noControl * stickerWidth);
	};
	
	self.calculateLeftWidthOffset = function(boardWidth, noControl, stickerWidth, offsetDetails) {
		var left = self.calculateLeft(boardWidth, noControl, stickerWidth);
		
		if (offsetDetails) {
			left += Utils.isInt(offsetDetails.leftOffset) ? offsetDetails.leftOffset : 0;
		}
		
		return left;
	};
	
	self.build = function(stickers, offset, boardHeight, boardWidth, isSession, revealedUsers) {
		for (var i=0; i!=stickers.length; i++) {
			
			// sticker got removed
			if (offset[stickers[i].id] && offset[stickers[i].id].removed === true) {
				continue;
			}
			
			// showing stickers for revealed users only
			if (revealedUsers && !revealedUsers[stickers[i].username]) {
				continue;
			}
			
			var stickerWidth = configuration.stickerWidth * self.configuration.boxSizeRatio;
			
			var bottom = (boardHeight * stickers[i].glad) + self.configuration.axisXBottom - (stickers[i].glad * (configuration.stickerHeight * self.configuration.boxSizeRatio));
			var left = self.calculateLeft(boardWidth, stickers[i].noControl, stickerWidth); //self.configuration.axisYLeft + (boardWidth * stickers[i].noControl) - (stickers[i].noControl * stickerWidth);
			
			var controlId = 'sticker_' + stickers[i].id;
			var controlOriginalPlaceholderId = controlId + '_orig';
			
			// sticker's original palce marker
			if (isSession) { 
				$("#boardContent").append('<div class="original-sticker-place" id="'+controlOriginalPlaceholderId+'" '
						+ 'style="'
						+ 'width: '+stickerWidth+'px; '
						+ 'height: '+(configuration.stickerHeight * self.configuration.boxSizeRatio)+'px; '
						+ 'position: absolute; '
						+ 'transform: rotate('+stickers[i].transform+'deg); '
						+ 'bottom: '+bottom+'px; '
						+ 'left: '+left+'px; '
						+ '" ' 
						+ '></div>');
			}
			
			// sticker
			var bottomWithOffset = bottom;
			var leftWithOffset = self.calculateLeftWidthOffset(boardWidth, stickers[i].noControl, stickerWidth, offset[stickers[i].id]);
			
			if (offset[stickers[i].id]) {
				bottomWithOffset += Utils.isInt(offset[stickers[i].id].bottomOffset) ? offset[stickers[i].id].bottomOffset : 0;
			}
			
			var onDragging = '$(\'#' + controlOriginalPlaceholderId+'\').show(); ';
			var onDraggingOver = '$(\'#' + controlOriginalPlaceholderId+'\').hide(); ' 
				+ 'app.getController(\'board-page\').registerOffset(\''+controlId+'\', \''+stickers[i].id+'\'); ';
			
			$("#boardContent").append('<div '
					+ (isSession ? 'data-toggle="context" ' : '')
					+ 'oncontextmenu="Context.lastRightClickOnSticker = '+stickers[i].id+'; Context.lastRightClickOnStickerControlId = '+controlId+';"'
					+ 'data-target="#context-menu" '
					+ 'data-sticker-id="'+stickers[i].id+'" '
					+ 'data-original-bottom="'+bottom+'" '
					+ 'data-original-left="'+left+'" '
					+ 'id='+controlId+' ' 
					+ 'class="sticker ui-widget-content" '
					+ (Context.displayUsernames ? 'title="'+stickers[i].username+'"' : '')
					+ 'style="'
					+ (isSession ? 'cursor: move; ' : '')
					+ 'font-size: ' + self.configuration.stickerFontSize + '; '
					+ 'height: '+(configuration.stickerHeight * self.configuration.boxSizeRatio)+'px; ' 
					+ 'width: '+stickerWidth+'px; '
					+ self.getStickerBackgroundCss(offset[stickers[i].id] ? offset[stickers[i].id].colorTheme : undefined)
					+ 'position: absolute; '
					+ 'transform: rotate('+stickers[i].transform+'deg); '
					+ 'bottom: '+bottom+'px; ' 
					+ 'left: '+leftWithOffset+'px;" '
					+ 'onMouseUp="'+onDraggingOver+'" '
					+ 'onMouseDown="'+onDragging+'" '
					+ 'onMouseOver="$(\'#remove_image_'+controlId+'\').show();" '
					+ 'onMouseOut="$(\'#remove_image_'+controlId+'\').hide();" '
					+'>'+Utils.htmlEncode(stickers[i].message) + '</div>');
			
			// jQuery UI "draggable" is manipulating the control's "top" css property instead of bottom, so we have to store the top 
			// value before setting the offset-adjusted position
			$('#' + controlId).data('originalTop', $('#' + controlId).css('top').replace('px', ''));
			$('#' + controlId).css('bottom', bottomWithOffset);
			
			// If sticker's text content is too large, it may overflow
			if (Utils.isOverflowing($('#' + controlId).get(0))) {
				stickerWidth = configuration.stickerLargerWidth * self.configuration.boxSizeRatio;
				$('#' + controlId).css('width', stickerWidth + 'px');
				$('#' + controlId).css('left', self.calculateLeftWidthOffset(boardWidth, stickers[i].noControl, stickerWidth, offset[stickers[i].id]) + 'px');
				$('#' + controlOriginalPlaceholderId).css('width', (configuration.stickerLargerWidth * self.configuration.boxSizeRatio)  + 'px');
				$('#' + controlOriginalPlaceholderId).css('left', self.calculateLeft(boardWidth, stickers[i].noControl, stickerWidth) + 'px');
			}
			
			$('#' + controlId).css('overflow', 'hidden');
			
			if (isSession) {
				$('#' + controlId).draggable({
					drag: function(event, ui) { 
						
						var width = parseInt($('#' + ui.helper[0].id).css('width').replace('px', ''));
						ui.position.left = Math.min(boardWidth - (width - configuration.stickerWidth), ui.position.left);
						ui.position.left = Math.max(self.configuration.axisYLeft - 25,  ui.position.left);
						
						ui.position.top = Math.min(self.configuration.headerHeight + 20 + boardHeight - (configuration.stickerHeight * self.configuration.boxSizeRatio) - 10, ui.position.top);
						ui.position.top = Math.max(self.configuration.headerHeight + 20, ui.position.top);
				    }
				});	
			}
			
			$('#' + controlOriginalPlaceholderId).hide();
			$('#remove_image_' + controlId).hide();
		}
	};
	
	self.getStickerBackgroundCss = function(colorTheme) {
		if (!colorTheme) {
			return stickerColorThemeService.getStickerBackgroundCssList()[0];
		}
		else {
			return stickerColorThemeService.getStickerBackgroundCssList()[colorTheme];
		}
	};
	
	self.getNextColorTheme = function(sticker) {
		var length = stickerColorThemeService.getStickerBackgroundCssList();
		var next = 0;
		if (!sticker.colorTheme) {
			return next;
		}
		else {
			next = sticker.colorTheme + 1;
		}
		
		if (next >= length) {
			next = 0;
		}
		
		return;
	};
});