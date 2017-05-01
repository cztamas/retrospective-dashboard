	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
	
	<!-- ********** Common dependencies ********************************************************************* -->
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/angular/angular.js"></script>
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/sockjs/sockjs.min.js"></script>
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/stomp-websocket/lib/stomp.min.js"></script>
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/jquery/dist/jquery.min.js"></script>
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/jquery-ui/jquery-ui.min.js" ></script>
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/app.js?ts=<% out.print(Math.random()); %>"></script>
	<script>
		app.rootUrl = '<% out.print(com.retrospective.utils.Constants.WebRoot); %>';
	</script>
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/common/configuration.js?ts=<% out.print(Math.random()); %>"></script>
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/common/participant-service.js?ts=<% out.print(Math.random()); %>"></script>
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/context.js?ts=<% out.print(Math.random()); %>"></script>
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/utils.js?ts=<% out.print(Math.random()); %>"></script>
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/extensions.js?ts=<% out.print(Math.random()); %>"></script>
	
	<!-- ********** Init page dependencies **************************************************** -->
	<c:if test="${isInitPage == true}">
		<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/dashboard/init-page.js?ts=<% out.print(Math.random()); %>"></script>
	</c:if>
	
	<!-- ********** Dashboard and Session view dependencies **************************************************** -->
	<c:if test="${isDashboard != null}">
		<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/qrcodejs/qrcode.min.js"></script>
		<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/dashboard/services/board-service.js?ts=<% out.print(Math.random()); %>"></script>
		<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/dashboard/services/sticker-color-theme-service.js?ts=<% out.print(Math.random()); %>"></script>
		<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/dashboard/services/sticker-builder-common.js?ts=<% out.print(Math.random()); %>"></script>
		<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/dashboard/services/sticker-builder.js?ts=<% out.print(Math.random()); %>"></script>
		<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/dashboard/services/sticker-builder-v2.js?ts=<% out.print(Math.random()); %>"></script>
		<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/dashboard/services/label-builder.js?ts=<% out.print(Math.random()); %>"></script>
		<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/dashboard/services/loading-service.js?ts=<% out.print(Math.random()); %>"></script>
		<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/dashboard/services/reveal-dropdown-provider-service.js?ts=<% out.print(Math.random()); %>"></script>
		<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/dashboard/widgets/qr-code-widget.js?ts=<% out.print(Math.random()); %>"></script>
		<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/dashboard/widgets/user-list-widget.js?ts=<% out.print(Math.random()); %>"></script>
		<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/dashboard/widgets/session-settings-widget.js?ts=<% out.print(Math.random()); %>"></script>
		<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/dashboard/board-page.js?ts=<% out.print(Math.random()); %>"></script>
	</c:if>
	
	<!-- ********** Participant view dependencies ***************************************************************** -->
	<c:if test="${isParticipant != null}">
		<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/participant/participant-page.js?ts=<% out.print(Math.random()); %>"></script>
		<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/participant/services/keepalive-service.js?ts=<% out.print(Math.random()); %>"></script>
		<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/participant/services/gsm-editor-plot.js?ts=<% out.print(Math.random()); %>"></script>
		<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/participant/services/gsm-editor-discrete.js?ts=<% out.print(Math.random()); %>"></script>
	</c:if>
	
	<!-- ********** CSS *************************************************************************************** -->
	<link rel="stylesheet" href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/css/style.css?ts=<% out.print(Math.random()); %>">
	<link rel="stylesheet" href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/bootstrap/dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/bootstrap/dist/css/bootstrap-theme.min.css">
	<link rel="stylesheet" href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/jquery-ui/themes/base/jquery-ui.css">
