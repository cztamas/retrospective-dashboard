app.service('stickerBuilderCommonService', function StickerBuilderCommonService(configuration, stickerColorThemeService) {
	
	var self = this;
	
	self.getSticker = function(stickerData, offset, controlId, stickerClass, isSession, stickerConfig) {
		
		var usernameClass = Context.displayUsernames ? 'user-' + Math.abs(stickerData.username.hashCode()) : '';
		var sticker = $('<div>'+Utils.htmlEncode(stickerData.message)+'</div>');
		
		if (isSession) {
			sticker.attr('data-toggle', 'context');
			sticker.attr('data-target', '#context-menu');
		}
		else {
			sticker.css('cursor', 'pointer');
		}
		
		if (Context.displayUsernames) {
			sticker.attr('title', stickerData.username);
			sticker.attr('onMouseOver', '$(\'.sticker-base\').not(\'.'+(usernameClass)+'\').css(\'opacity\', \''+configuration.stickerOpacity+'\');');
			sticker.attr('onMouseOut', '$(\'.sticker-base\').not(\'.'+(usernameClass)+'\').css(\'opacity\', \'\');');
		}
		
		stickerColorThemeService.addCss(sticker, (offset && offset.colorTheme) ? offset.colorTheme : stickerColorThemeService.DEFAULT_COLOR_THEME_ID);
		
		sticker.attr('class', stickerClass + ' sticker-base ui-widget-content ' + (usernameClass));
		sticker.attr('oncontextmenu', 'Context.lastRightClickOnSticker = '+stickerData.id+'; Context.lastRightClickOnStickerControlId = '+controlId+';');
		sticker.attr('data-sticker-id', stickerData.id);
		sticker.attr('id', controlId);
		sticker.css('font-size', stickerConfig.stickerFontSize);
		sticker.css('height', (configuration.stickerHeight * stickerConfig.boxSizeRatio)+'px');
		sticker.css('width', configuration.stickerWidth+'px');
		
		return sticker;
	};
	
});