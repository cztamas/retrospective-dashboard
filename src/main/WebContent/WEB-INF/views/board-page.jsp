<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
   
    <title>Retrospective Dashboard</title>

	<%@ include file="parts/dependencies.jsp" %>
	<%@ include file="parts/google-analytics.jsp" %>
	
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js" ></script>
    <link rel="stylesheet" href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css">

	<script>
		Context.code = <c:out value="${code}"/>;
		Context.token = '<c:out value="${token}"/>';
	</script>

  </head>
  
  <body ng-app="retrospective" style="margin-left: 120px;">
	<div ng-controller="board-page">
	    <nav class="navbar navbar-default navbar-fixed-top">
	      <div class="container-fullwidth">
	        <div class="navbar-header">
	          <a class="navbar-brand" href="#">Retrospective</a>
	        </div>
	        <div id="navbar" class="navbar-collapse collapse">
	          <ul class="nav navbar-nav">
	            <li>
	            	<button 
	            		style="margin-top: 16px; margin-left: 20px;" 
	            		class="btn btn-default btn-xs" 
	            		onClick="location.href = '<% out.print(com.retrospective.utils.Constants.WebRoot); %>/';">Start New</button>
	            </li>
	            <c:if test="${dashboard == null}">
	            <li>
	            	<button 
	            		title="Show notes on the board. Once you reveal the team's notes, new ones will be automatically displayed" 
	            		style="margin-top: 16px; margin-left: 20px;" 
	            		class="btn btn-primary btn-xs"
	            		ng-click="reveal(<c:out value="${code}"/>)">Reveal <span class="badge">{{state.stickers.length}}</span>
	            	</button>
	            </li>
	            </c:if>
	            <li>
	            	<%@include file="parts/widgets/user-list.jsp" %>
	            </li>
	          </ul>
	          <ul class="nav navbar-nav navbar-right">
	          	<li>
				              
				    <button
	            		title="Configuration"
	            		style="margin-top: 16px; margin-left: 20px; margin-right: 10px;" 
	            		onClick="$('#settings-dialog').dialog({width: 600});"  
	            		class="btn btn-default btn-xs">Settings</button>
	          	</li>
	            <li>
	            	<button
	            		title="Click here to save the URL of this board"
	            		style="margin-top: 16px; margin-right: 10px;" 
	            		onClick="$('#dialog').dialog({width: 600}); shareUrl();"  
	            		class="btn btn-default btn-xs">Save permalink</button>
	            </li>
	            <c:if test="${dashboard == null}">
	            	<li>
	            		<img src="../../resources/images/icon-qrcode.png" 
	            			style="padding-top: 8px; cursor: pointer;" 
	            			title="Display join QR code of this board" 
	            			onClick="app.getController('qr-code-widget').show();" />
	            	</li>
	            </c:if>
	            
	            <li>
	            	<img src="../../resources/images/spacer.gif" height="1" width="60" />
	            </li>
	          </ul>
	          
	        </div>
	      </div>
	    </nav>
	    
	    <%@include file="parts/main-board.jsp" %>
	</div>
	
	<%@include file="parts/widgets/qr-code-widget.jsp" %>
    
	<script>
	
	angular.element(document).ready(function() {

		var boardPageScope = app.getController('board-page');
	    var qrCodeWidget = app.getController('qr-code-widget');
	    var userListWidget = app.getController('user-list-widget');
	
		qrCodeWidget.initialize(
			app.domain + app.rootUrl + "/join-mobile/${code}/${token}", 
			{ 
				qrCodeContainer: 'qrCodeContainer',
				qrCodeImageContainer: 'qrcode',
				boardContainer: 'board',	 
			});
			
		userListWidget.initialize(${code}, '${token}');
   		
   		qrCodeWidget.show();
   		
   		var dashboardUrl = app.domain + '<% out.print(com.retrospective.utils.Constants.WebRoot); %>' + '/dashboard/${code}/${token}';
		
		<c:if test="${dashboard == null}">
   			qrCodeWidget.show();
   			boardPageScope.state.mode = boardPageScope.enum.mode.session;
   			userListWidget.startRefreshingParticipants();
		</c:if>
		<c:if test="${dashboard == true}">
			qrCodeWidget.hide();
			boardPageScope.state.mode = boardPageScope.enum.mode.dashboard;
			boardPageScope.reveal(<c:out value="${code}"/>);
		</c:if>
		
		boardPageScope.initialize(dashboardUrl, ${code}, '${token}');
		
		// box size slider
		$('#settings-dialog').hide();
		$('#postit-size-slider').slider().on('change', function(event) {
		    boardPageScope.resizePostIts(event.value.newValue);
		});
		
		var postitSize = Utils.getCookie('postit-size-${token}');
		if (postitSize != null) {
			boardPageScope.resizePostIts(postitSize);
			$("#postit-size-slider").attr('data-slider-value', postitSize);
			$("#postit-size-slider").slider('refresh');
		}
	
	});

	$(window).resize(function() {
  		app.getController('board-page').resize();
	});
	
	</script>
	
	
	<%@include file="parts/dialogs.jsp" %>
  </body>
</html>