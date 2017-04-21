app.service('revealDropdownProviderService', function RevealDropdownProviderService() {
	
	self = this;
	
	self.extractUsers = function(stickers, revealedUsers) {
		var usersWithPublishedStickers = [];
		
		if (!stickers) {
			return usersWithPublishedStickers;
		}
		
		for (var i=0; i!=stickers.length; i++) {
			
			var entry = self.getEntry(usersWithPublishedStickers, stickers[i].username);
			if (entry == null) {
				usersWithPublishedStickers.push({ 
					username: stickers[i].username, 
					isRevealed: revealedUsers[stickers[i].username] != undefined 
				});
			}
			else {
				
			}
		}
		
		return usersWithPublishedStickers;
	};
	
	self.getUsersWithPublishedStickers = function(stickers) {
		var usersWithPublishedStickers = [];
		
		if (!stickers) {
			return usersWithPublishedStickers;
		}
		
		for (var i=0; i!=stickers.length; i++) {
			
			if (!usersWithPublishedStickers.contains(stickers[i].username)) {
				usersWithPublishedStickers[stickers[i].username] = true;
			}
		}
		
		return usersWithPublishedStickers;
	};
	
	self.getEntry = function(usersWithPublishedStickers, username) {
		
		for (var i=0; i!=usersWithPublishedStickers.length; i++) {
			if (usersWithPublishedStickers[i].username == username) {
				return usersWithPublishedStickers[i];
			}
		}
		
		return null;
	};
	
});