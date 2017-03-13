app.service('stickerBuilderService', function StickerBuilderService(configuration) {
	
	var self = this;
	
	self.configuration = {
		axisXBottom: 50,
		axisYLeft: 150,
		headerHeight: 50
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
	
	self.build = function(stickers, offset, boardHeight, boardWidth, isSession) {
		for (var i=0; i!=stickers.length; i++) {
			
			if (offset[stickers[i].id] && offset[stickers[i].id].removed === true) {
				continue;
			}
			
			var stickerWidth = configuration.stickerWidth;
			/*if (Utils.htmlEncode(stickers[i].message).length > 50) {
				stickerWidth = configuration.stickerLargerWidth;
			}*/
			
			var bottom = (boardHeight * stickers[i].glad) + self.configuration.axisXBottom - (stickers[i].glad * configuration.stickerHeight);
			var left = self.calculateLeft(boardWidth, stickers[i].noControl, stickerWidth); //self.configuration.axisYLeft + (boardWidth * stickers[i].noControl) - (stickers[i].noControl * stickerWidth);
			
			var controlId = 'sticker_' + stickers[i].id;
			var controlOriginalPlaceholderId = controlId + '_orig';
			
			// sticker's original palce marker
			if (isSession) { 
				$("#boardContent").append('<div class="original-sticker-place" id="'+controlOriginalPlaceholderId+'" '
						+ 'style="'
						+ 'width: '+stickerWidth+'px; '
						+ 'height: '+configuration.stickerHeight+'px; '
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
			
			var onDragging = '$(\'#' + controlOriginalPlaceholderId+'\').show(); '
		    	+ '$(\'.label-dbl-click-remove\').show(); '
		    	+ '$(\'#' + controlId+'\').css(\'transform\', \'rotate(0deg)\');';
			
			var onDraggingOver = '$(\'#' + controlOriginalPlaceholderId+'\').hide(); ' 
				+ '$(\'#' + controlId+'\').css(\'transform\', \'rotate('+stickers[i].transform+'deg)\'); ' 
				+ '$(\'.label-dbl-click-remove\').hide(); '
				+ 'app.getController(\'board-page\').registerOffset(\''+controlId+'\', \''+stickers[i].id+'\'); ';
			
			$("#boardContent").append('<div '
					+ 'data-sticker-id="'+stickers[i].id+'" '
					+ 'data-original-bottom="'+bottom+'" '
					+ 'data-original-left="'+left+'" '
					+ 'id='+controlId+' ' 
					+ 'class="sticker ui-widget-content" '
					+ 'style="'
					+ 'font-size: ' + configuration.stickerFontSize + '; '
					+ 'height: '+configuration.stickerHeight+'px; ' 
					+ 'width: '+stickerWidth+'px; '
					+ 'background-image: -ms-linear-gradient(bottom left, #FCCD4D 0%, #FBDF93 50%, #FCCD4D 100%);'
					+ 'background-image: -moz-linear-gradient(bottom left, #FCCD4D 0%, #FBDF93 50%, #FCCD4D 100%);'
					+ 'background-image: -o-linear-gradient(bottom left, #FCCD4D 0%, #FBDF93 50%, #FCCD4D 100%);'
					+ 'background-image: -webkit-gradient(linear, left bottom, right top, color-stop(0, #FCCD4D), color-stop(50, #FBDF93), color-stop(100, #FCCD4D));'
					+ 'background-image: -webkit-linear-gradient(bottom left, #FCCD4D 0%, #FBDF93 50%, #FCCD4D 100%);'
					+ 'background-image: linear-gradient(to top right, #FCCD4D 0%, #FBDF93 50%, #FCCD4D 100%);'
					+ 'position: absolute; '
					+ 'transform: rotate('+stickers[i].transform+'deg); '
					+ 'bottom: '+bottom+'px; ' 
					+ 'left: '+leftWithOffset+'px;" '
					+ 'onMouseUp="'+onDraggingOver+'" '
					+ 'onMouseDown="'+onDragging+'" '
					+'>'+Utils.htmlEncode(stickers[i].message)+'</div>');
			
			// jQuery UI "draggable" is manipulating the control's "top" css property instead of bottom, so we have to store the top 
			// value before setting the offset-adjusted position
			$('#' + controlId).data('originalTop', $('#' + controlId).css('top').replace('px', ''));
			$('#' + controlId).css('bottom', bottomWithOffset);
			
			// If sticker's text content is too large, it may overflow
			if (Utils.isOverflowing($('#' + controlId).get(0))) {
				stickerWidth = configuration.stickerLargerWidth;
				$('#' + controlId).css('width', stickerWidth + 'px');
				$('#' + controlId).css('left', self.calculateLeftWidthOffset(boardWidth, stickers[i].noControl, stickerWidth, offset[stickers[i].id]) + 'px');
				$('#' + controlOriginalPlaceholderId).css('width', configuration.stickerLargerWidth + 'px');
				$('#' + controlOriginalPlaceholderId).css('left', self.calculateLeft(boardWidth, stickers[i].noControl, stickerWidth) + 'px');
			}
			
			$('#' + controlId).css('overflow', 'hidden');
			
			if (isSession) {
				$('#' + controlId).draggable({
					drag: function(event, ui) { 
						
						var width = parseInt($('#' + ui.helper[0].id).css('width').replace('px', ''));
						ui.position.left = Math.min(boardWidth - (width - configuration.stickerWidth), ui.position.left);
						ui.position.left = Math.max(self.configuration.axisYLeft - 25,  ui.position.left);
						
						ui.position.top = Math.min(self.configuration.headerHeight + 20 + boardHeight - configuration.stickerHeight - 10, ui.position.top);
						ui.position.top = Math.max(self.configuration.headerHeight + 20, ui.position.top);
				    }
				});	
				
				var stickerId = stickers[i].id;
				$('#' + controlId).dblclick(function() {
					if (confirm('Are you sure you want to remove this item?')) {
						app.getController('board-page').registerRemoved(controlId, stickerId);    
					}
					
				});
			}
			
			$('#' + controlOriginalPlaceholderId).hide();
		}
	};
    
});