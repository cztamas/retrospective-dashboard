<div id="dialog" title="Dashboard" style="display: none;">
 	<p>You can re-open this dashboard any time in the future with the following link:</p>
 	<textarea id='shareUrl' style="width: 95%" disabled></textarea><br/>
 	<button class="btn btn-primary btn-sm" onClick="Utils.copyToClipboard($('#shareUrl').val())">copy</button>
</div>

<div id="errorDialog" title="Error">
 	<p style="color: #ff0000;" id="errorMessage"></p>
</div>

<div id="sessionCommentDialog" title="Action Items" style="display: none;">
 	<span id="sessionCommentText"></span>
</div>

<div id="settings-dialog" title="Board Settings">

	<table width="100%">
	<tr>
		<td width="200">
			<b>Name</b><br/>
			<span style="font-size: 8pt;">
				Name of the retrospective session 
			</span>
		</td>
		<td>&nbsp;&nbsp;</td>
		<td style="padding-left: 60px; font-family: Tahoma; font-size: 9pt;">
			<table>
			<tr>
				<td width="90%"><input id="sessionName" class="form-control" type="text" onChange=""/></td>
				<td style="padding-left: 10px;"><button onClick="app.getController('board-page').setSessionName($('#sessionName').val());" class="btn btn-default btn">set</button></td>
			</tr>
			</table>

		</td>
	</tr>
	<tr>
		<td colspan="3">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="3" style="border-top: solid 1px #dddddd;">&nbsp;</td>
	</tr>
	<tr>
		<td width="200" valign="top">
			<b>Action Items</b><br/>
			<span style="font-size: 8pt;">
				Your notes about the outcome of the retrospective session.
			</span>
		</td>
		<td>&nbsp;&nbsp;</td>
		<td style="padding-left: 60px; font-family: Tahoma; font-size: 9pt;">
			<textarea id="sessionComment" style="width: 100%; height: 150px;"></textarea><br/>
			<button style="float: right;" onClick="app.getController('board-page').setSessionComment($('#sessionComment').val());" class="btn btn-default btn">set</button>
		</td>
	</tr>
	<tr>
		<td colspan="3">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="3" style="border-top: solid 1px #dddddd;">&nbsp;</td>
	</tr>
	<tr>
		<td width="200">
			<b>Post-it size</b><br/>
			<span style="font-size: 8pt;">
				You can scale the post-it sizes with this option. It might be helpful if you have low screen resolution.
			</span>
		</td>
		<td>&nbsp;&nbsp;</td>
		<td valign="top" style="padding-top: 20px; padding-left: 60px;">
			<input id="postit-size-slider" type="text"
	            data-provide="slider"
	            data-slider-ticks="[0, 1, 2]"
	            data-slider-ticks-labels='["", "", ""]'
	            data-slider-min="0"
	            data-slider-max="2"
	            data-slider-step="1"
	            data-slider-value="2"
	            data-slider-tooltip="hide" />
		</td>
	</tr>
	<tr>
		<td colspan="3">&nbsp;</td>
	</tr>
	<tr>
		<td colspan="3" style="border-top: solid 1px #dddddd;">&nbsp;</td>
	</tr>
	<tr>
		<td width="200">
			<b>Anonymous Mode</b><br/>
			<span style="font-size: 8pt;">
				If anonymous mode is unchecked, usernames are displayed when hovering over a post-it. 
			</span>
		</td>
		<td>&nbsp;&nbsp;</td>
		<td style="padding-left: 60px; font-family: Tahoma; font-size: 9pt;">
			<input type="checkbox" id="anonymousCheckBox" onChange="Context.displayUsernames = !this.checked; app.getController('board-page').setSessionIsAnonymous(this.checked); app.getController('board-page').showStickers();" name="isAnonymous" CHECKED /> <label for="anonymousCheckBox">Anonymous</label>
		</td>
	</tr>
	</table>
</div>