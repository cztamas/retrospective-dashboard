<div id="qrCodeContainer" ng-controller="qr-code-widget" class="centered">
	
	<table width="100%" style="margin-bottom: 10px; min-width: 400px;">
		<tr>
			<td colspan="2">
				<b>Waiting for participants to join ...</b>
				<img style="position: float; float: right; margin-bottom: 8px; cursor: pointer;" ng-click="hide()" src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/images/close.png" />
			</td>
		</tr>
		<tr>
			<td><img src="../../resources/images/laptop.png" height="64"></td>
			<td>
				<div class="input-group input-group-sm">
				  <span class="input-group-addon">Join URL</span>
				  <input 
				  	id="join-url" 
				  	type="text" 
				  	class="form-control"
				  	style="width: 60%;"
				  	placeholder="share url">
				  <button style="margin-left: 5px;" class="btn btn-primary btn-sm" onClick="Utils.copyToClipboard($('#join-url').val())">copy</button>
				  <button style="margin-left: 5px;" class="btn btn-primary btn-sm" onClick="Utils.openInNewTab($('#join-url').val())">open</button>
			    </div>
			    <i style="font-size: 9pt;">Share this url with your team, so that they can participate in session</i>
			</td>
		</tr>
		<tr style="padding-top: 10px;">
			<td></td>
			<td>
				<span>Participants may also join with below <a href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/join-mobile/<c:out value="${code}"/>/<c:out value="${token}"/>" target="enter_room">QR code</a> via <b>smart phone</b></span>
			</td>
		</tr>
	</table>
	
   	<div id="qrcode"></div>
</div>