app.service('configuration', function ConfigurationService() {
	
	/* sticker widths when scaling until text fits into sticker box */
	this.stickerWidth = 150;
	this.stickerLargerWidth = 300;
	this.stickerEvenLargerWidth = 450;
	
	/* sticker height */
	this.stickerHeight = 150;
	
	/* opacity of stickers (of other users) when hovering over one */
	this.stickerOpacity = 0.35;
	
});