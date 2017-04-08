<div id="dialog" title="Dashboard">
 	<p>You can re-open this dashboard any time in the future with the following link:</p>
 	<textarea id='shareUrl' style="width: 95%" disabled></textarea>
</div>

<div id="errorDialog" title="Error">
 	<p style="color: #ff0000;" id="errorMessage"></p>
</div>

<div id="settings-dialog" title="Board Settings">

	<table width="100%">
	<tr>
		<td width="200">
			<b>Post-it size</b><br/>
			<span style="font-size: 8pt;">
				You can scale the post-it sizes with this option
			</span>
		</td>
		<td>&nbsp;&nbsp;</td>
		<td align="center" valign="top" style="padding-top: 20px;">
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
	</table>
</div>