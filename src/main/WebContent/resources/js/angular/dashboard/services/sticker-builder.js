app.service('stickerBuilderService', function StickerBuilderService(configuration) {
	
	var self = this;
	
	self.configuration = {
		axisXBottom: 50,
		axisYLeft: 150,
		headerHeight: 50
	};
	
	self.build = function(stickers, offset, boardHeight, boardWidth, isSession) {
		for (var i=0; i!=stickers.length; i++) {
			var bottom = (boardHeight * stickers[i].glad) + self.configuration.axisXBottom - (stickers[i].glad * configuration.stickerHeight);
			var left = self.configuration.axisYLeft + (boardWidth * stickers[i].noControl) - (stickers[i].noControl * configuration.stickerWidth);
			
			var controlId = 'sticker_' + stickers[i].id;
			var controlOriginalPlaceholderId = controlId + '_orig';
			
			// sticker's original palce marker
			if (isSession) { 
				$("#boardContent").append('<div class="original-sticker-place" id="'+controlOriginalPlaceholderId+'" '
						+ 'style="'
						+ 'width: '+configuration.stickerWidth+'px; '
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
			var leftWithOffset = left;
			if (offset[stickers[i].id]) {
				bottomWithOffset += Utils.isInt(offset[stickers[i].id].bottomOffset) ? offset[stickers[i].id].bottomOffset : 0;
				leftWithOffset += Utils.isInt(offset[stickers[i].id].leftOffset) ? offset[stickers[i].id].leftOffset : 0;
			}
			
			$("#boardContent").append('<div '
					+ 'data-sticker-id="'+stickers[i].id+'" '
					+ 'data-original-bottom="'+bottom+'" '
					+ 'data-original-left="'+left+'" '
					+ 'id='+controlId+' ' 
					+ 'class="sticker ui-widget-content" '
					+ 'style="'
					+ 'font-size: ' + configuration.stickerFontSize + '; '
					+ 'height: '+configuration.stickerHeight+'px; ' 
					+ 'width: '+configuration.stickerWidth+'px; ' 
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
					+ 'onMouseUp="$(\'#' + controlOriginalPlaceholderId+'\').hide(); $(\'#' + controlId+'\').css(\'transform\', \'rotate('+stickers[i].transform+'deg)\'); app.getController(\'board-page\').registerOffset(\''+controlId+'\', \''+stickers[i].id+'\'); " '
					+ 'onMouseDown="$(\'#' + controlOriginalPlaceholderId+'\').show(); $(\'#' + controlId+'\').css(\'transform\', \'rotate(0deg)\');" '
					+'>'+Utils.htmlEncode(stickers[i].message)+'</div>');
			
			// jQuery UI "draggable" is manipulating the control's "top" css property instead of bottom, so we have to store the top 
			// value before setting the offset-adjusted position
			$('#' + controlId).data('originalTop', $('#' + controlId).css('top').replace('px', ''));
			$('#' + controlId).css('bottom', bottomWithOffset);
			
			if (isSession) {
				$('#' + controlId).draggable({
					drag: function( event, ui){ 

						ui.position.left = Math.min(boardWidth, ui.position.left);
						ui.position.left = Math.max(self.configuration.axisYLeft - 25,  ui.position.left);
						
						ui.position.top = Math.min(self.configuration.headerHeight + 20 + boardHeight - configuration.stickerHeight - 10, ui.position.top);
						ui.position.top = Math.max(self.configuration.headerHeight + 20, ui.position.top);

				    }
				});	
			}
			
			$('#' + controlOriginalPlaceholderId).hide();
		}
	};
    
});