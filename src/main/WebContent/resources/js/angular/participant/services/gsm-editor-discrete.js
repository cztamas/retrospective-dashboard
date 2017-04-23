app.service('gsmEditorDiscrete', function() {
	
	var self = this;
	
	self.editSticker = function(sticker) {
		var happinessIndex = null;
		if (sticker.glad == 1.0) happinessIndex = 'glad';
		if (sticker.glad == 0.5) happinessIndex = 'sad';
		if (sticker.glad == 0.0) happinessIndex = 'mad';
		
		$('input:radio[name="glad-sad-mad-radio"]').attr('checked', false);
		$('label[name="label-gsm"]').removeClass('ui-btn-active');
		$('input:radio[name="glad-sad-mad-radio"]').filter('[value="'+happinessIndex+'"]').attr('checked', true);
		$('label[id="label-'+happinessIndex+'"]').addClass('ui-btn-active');
	};
	
	self.clearForm = function() {
		$('#slider-fill-glad').val(1.0);
		$('input:radio[name="glad-sad-mad-radio"]').attr('checked', false);
		$('label[name="label-gsm"]').removeClass('ui-btn-active');
		$('input:radio[name="glad-sad-mad-radio"]').filter('[value="glad"]').attr('checked', true);
		$('label[id="label-glad"]').addClass('ui-btn-active');	
	};
	
	self.renderStickerForMobile = function(sticker, stickersCount) {
		var happinessIndex = self.getHappinessIndex(sticker);
		
		$('#stickersContainer').append('<li class="ui-li-static ui-body-inherit'
				+ (i == stickersCount-1 ? ' ui-body-inheritui-last-child ui-last-child' : '')
				+ (i == 0 ? ' ui-body-inheritui-first-child ui-first-child' : '')+'">'
				+ '<strong style="font-size: 16pt;">'+sticker.comment+'</strong>'
				+ '<p>'
				+ happinessIndex
				+ '</p><p>'
				+ '<a href="#" onClick="app.getController(\'participant-page as participantPage\').startDeleteComment(\''+sticker.id+'\')" class="ui-btn ui-btn-inline ui-icon-delete ui-btn-icon-left">Delete</a>'
				+ '<a href="#" onClick="app.getController(\'participant-page as participantPage\').editSticker(\''+sticker.id+'\')" class="ui-btn ui-btn-inline ui-icon-edit ui-btn-icon-left">Edit</a>'
				+ '<a href="#" onClick="app.getController(\'participant-page as participantPage\').publishSticker(\''+sticker.id+'\')" class="ui-btn ui-btn-inline ui-icon-action ui-btn-icon-left">Publish</a>'
				+'</p></li>');	
	};
	
	self.renderStickerForWeb = function(sticker) {
		
		var template = '<div class="panel panel-default">'
			  + '<div class="panel-body">'
			  + '  <table width="100%">'
			  + '  <tr>'
			  + '    <td width="90"><img src="../../resources/images/{happinessIndex}.png" width="60"></td>'
			  + '    <td valign="top">'
			  + '       <h3>{comment}</h3><br/>'
			  + '<div class="btn-group" role="group" aria-label="...">'
			  + '  <button type="button" class="btn btn-default" onClick="app.getController(\'participant-page as participantPage\').startDeleteComment(\'{stickerId}\')">Delete</button>'
			  + '  <button type="button" class="btn btn-default" onClick="app.getController(\'participant-page as participantPage\').editSticker(\'{stickerId}\')">Edit</button>'
			  + '  <button type="button" class="btn btn-default" onClick="app.getController(\'participant-page as participantPage\').publishSticker(\'{stickerId}\')">Publish</button>'
			  + '</div>'
			  + '    </td>'
			  + '  </tr>'
			  + '  </table>'
			  +'</div></div>';
		
		$('#stickersContainer').append(template
				.replaceAll('{happinessIndex}', self.getHappinessIndexFrom1To1000(sticker))
				.replaceAll('{comment}', sticker.comment)
				.replaceAll('{stickerId}', sticker.id));
	};
	
	self.getHappinessIndex = function(sticker) {
		var happinessIndex = null;
		if (sticker.glad == 1.0) happinessIndex = 'Glad';
		if (sticker.glad == 0.5) happinessIndex = 'Sad';
		if (sticker.glad == 0.0) happinessIndex = 'Mad';
		
		return happinessIndex;
	};
	
	self.getHappinessIndexFrom1To1000 = function(sticker) {
		var happinessIndex = null;
		if (sticker.glad > 666) happinessIndex = 'glad';
		if (sticker.glad > 333 && sticker.glad <= 666) happinessIndex = 'sad';
		if (sticker.glad > 0 && sticker.glad <= 333) happinessIndex = 'mad';
		
		return happinessIndex;
	}
	
});