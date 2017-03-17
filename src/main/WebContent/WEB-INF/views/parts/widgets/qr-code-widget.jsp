<div id="qrCodeContainer" ng-controller="qr-code-widget" class="centered">
	<img style="float: right; margin-bottom: 8px; cursor: pointer;" ng-click="hide()" src="../../resources/images/close.png" />
	Participants can join on phone by reading below <a href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/join-mobile/<c:out value="${code}"/>/<c:out value="${token}"/>" target="enter_room">QR code</a>
	or you can share this <a href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/join-web/<c:out value="${code}"/>/<c:out value="${token}"/>" target="enter_room">URL</a><br/>
	
   	<div id="qrcode"></div>
</div>