app.service('stickerBuilderV2Service', function StickerBuilderV2Service(configuration, stickerColorThemeService) {
	
	var self = this;
	
	self.configuration = {
		placeholders: {
			glad: '#gladList',
			sad: '#sadList',
			mad: '#madList',
		},
		boxSizeRatio: 1.0,
		stickerFontSize: '14pt'
	};
	
	self.build = function(stickers, offset, boardHeight, boardWidth, isSession, revealedUsers) {
		
		$(self.configuration.placeholders.glad).html('');
		$(self.configuration.placeholders.sad).html('');
		$(self.configuration.placeholders.mad).html('');
		
		for (var i=0; i!=stickers.length; i++) {
			
			// sticker got removed
			if (offset[stickers[i].id] && offset[stickers[i].id].removed === true) {
				continue;
			}
			
			// showing stickers for revealed users only
			if (revealedUsers && !revealedUsers[stickers[i].username]) {
				continue;
			}
			
			if (stickers[i].glad > 0.66 && stickers[i].glad <= 1.0) stickerPlace = self.configuration.placeholders.glad;
			if (stickers[i].glad > 0.33 && stickers[i].glad <= 0.66) stickerPlace = self.configuration.placeholders.sad;
			if (stickers[i].glad > -0.10 && stickers[i].glad <= 0.33) stickerPlace = self.configuration.placeholders.mad;
			
			var controlId = 'sticker_' + stickers[i].id;
			var usernameClass = Context.displayUsernames ? 'user-' + Math.abs(stickers[i].username.hashCode()) : '';
			$(stickerPlace).append('<div '
					+ (isSession ? 'data-toggle="context" ' : '')
					+ 'oncontextmenu="Context.lastRightClickOnSticker = '+stickers[i].id+'; Context.lastRightClickOnStickerControlId = '+controlId+';"'
					+ 'data-target="#context-menu" '
					+ 'data-sticker-id="'+stickers[i].id+'" '
					+ 'onMouseOver="$(\'.sticker-v2\').not(\'.'+(usernameClass)+'\').css(\'opacity\', \''+configuration.stickerOpacity+'\');" '
					+ 'onMouseOut="$(\'.sticker-v2\').not(\'.'+(usernameClass)+'\').css(\'opacity\', \'\');" ' // change color in style.css/.sticker-v2/border
					+ 'id='+controlId+' ' 
					+ 'class="sticker-v2 ui-widget-content '+(usernameClass)+'" '
					+ (Context.displayUsernames ? 'title="'+stickers[i].username+'" ' : '')
					+ ' style="'
					+ 'font-size: ' + self.configuration.stickerFontSize + '; '
					+ 'height: '+(configuration.stickerHeight * self.configuration.boxSizeRatio)+'px; '
					+ 'width: '+configuration.stickerWidth+'px; '
					+ self.getStickerBackgroundCss(offset[stickers[i].id] ? offset[stickers[i].id].colorTheme : undefined)
					+ 'position: float; float: left;'
					+ 'margin: 4px; '
					+'">'+Utils.htmlEncode(stickers[i].message) + '</div>');
			
			if (Utils.isOverflowing($('#' + controlId).get(0))) {
				stickerWidth = configuration.stickerLargerWidth * self.configuration.boxSizeRatio;
				$('#' + controlId).css('width', stickerWidth + 'px');
			}
			
			if (Utils.isOverflowing($('#' + controlId).get(0))) {
				stickerWidth = configuration.stickerEvenLargerWidth * self.configuration.boxSizeRatio;
				$('#' + controlId).css('width', stickerWidth + 'px');
			}
			
			$('#' + controlId).css('overflow', 'hidden');
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
});