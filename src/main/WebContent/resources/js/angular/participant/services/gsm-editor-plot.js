app.service('gsmEditorPlot', function() {
	
	var self = this;
	
	self.editSticker = function(sticker) {
		
	};
	
	self.clearForm = function() {
		$('#marker-ball').addClass('hidden');
	};
	
	self.renderStickerForMobile = function(sticker, stickersCount) {
		var gladPercentage = parseInt(sticker.glad / 10);
		var gladHtml = '<div class="progress">'
			    + '<div class="progress-bar" role="progressbar" aria-valuenow="'+gladPercentage+'" aria-valuemin="0" aria-valuemax="1000" style="width: '+gladPercentage+'%;"> ' 
			    + gladPercentage 
			    + '% glad</div>'
			    +'</div>';
		
		var controlPercentage = parseInt((sticker.noControl) / 10);
		var controlHtml = '<div class="progress">'
			    + '<div class="progress-bar" role="progressbar" aria-valuenow="'+controlPercentage+'" aria-valuemin="0" aria-valuemax="1000" style="width: '+controlPercentage+'%;"> ' 
			    + controlPercentage
			    + '% no control</div>'
			    +'</div>';
		
		$('#stickersContainer').append('<li class="ui-li-static ui-body-inherit'
				+ (i == stickersCount-1 ? ' ui-body-inheritui-last-child ui-last-child' : '')
				+ (i == 0 ? ' ui-body-inheritui-first-child ui-first-child' : '')+'">'
				+ '<strong style="font-size: 16pt;">'+sticker.comment+'</strong>'
				+ '<p>'
				+gladHtml + controlHtml
				+ '</p><p>'
				+ '<a href="#" onClick="app.getController(\'participant-page as participantPage\').startDeleteComment(\''+sticker.id+'\')" class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-left">Delete</a>'
				+ '<a href="#" onClick="app.getController(\'participant-page as participantPage\').editSticker(\''+sticker.id+'\')" class="ui-btn ui-btn-inline ui-icon-edit ui-btn-icon-left">Edit</a>'
				+ '<a href="#" onClick="app.getController(\'participant-page as participantPage\').publishSticker(\''+sticker.id+'\')" class="ui-btn ui-btn-inline ui-icon-action ui-btn-icon-left">Publish</a>'
				+'</p></li>');	
	};
	
	self.renderStickerForWeb = function(sticker) {
		
		var template = 
			    '<div class="panel panel-default">'
			  + '  <div class="panel-heading">{comment}</div>'
			  + '  <div class="panel-body">'
			  + '    <div class="progress">'
	  		  + '       <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: {gladPercentage}%;">Glad</div>'
			  + '    </div>'
			  + '    <div class="progress">'
	  		  + '       <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: {controlPercentage}%;">No Control</div>'
			  + '    </div>'
				
			  + '    <div class="btn-group" role="group" aria-label="...">'
			  + '      <button type="button" class="btn btn-default" onClick="app.getController(\'participant-page as participantPage\').startDeleteComment(\'{stickerId}\')">Delete</button>'
			  + '      <button type="button" class="btn btn-default" onClick="app.getController(\'participant-page as participantPage\').editSticker(\'{stickerId}\')">Edit</button>'
			  + '      <button type="button" class="btn btn-default" onClick="app.getController(\'participant-page as participantPage\').publishSticker(\'{stickerId}\')">Publish</button>'
			  + '    </div>' 
			  + '  </div>'
			  + '</div>';
		
		var gladPercentage = parseInt(sticker.glad / 10);
		var controlPercentage = parseInt((sticker.noControl) / 10);
		
		$('#stickersContainer').append(template
				.replaceAll('{gladPercentage}', gladPercentage)
				.replaceAll('{controlPercentage}', controlPercentage)
				.replaceAll('{comment}', sticker.comment)
				.replaceAll('{stickerId}', sticker.id));
	};
	
});