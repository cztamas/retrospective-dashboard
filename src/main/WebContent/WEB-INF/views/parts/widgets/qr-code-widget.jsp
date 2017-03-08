<div id="qrCodeContainer" ng-controller="qr-code-widget" class="centered">
	<img style="float: right; margin-bottom: 8px; cursor: pointer;" ng-click="hide()" src="../../resources/images/close.png" />
	<a href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/join/<c:out value="${code}"/>/<c:out value="${token}"/>" target="enter_room">enter room</a> by reading QR code on phone<br/>
   	<div id="qrcode"></div>
</div>