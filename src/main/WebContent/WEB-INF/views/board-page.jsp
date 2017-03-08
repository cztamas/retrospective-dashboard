<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
   
    <title>Retrospective Dashboard</title>

	<%@include file="parts/dependencies.jsp" %>

	<script>
		Context.code = <c:out value="${code}"/>;
		Context.token = '<c:out value="${token}"/>';
	</script>

  </head>
  
  <body ng-app="retrospective" style="margin-left: 120px;">
	<div ng-controller="board-page">
	    <nav class="navbar navbar-default navbar-fixed-top">
	      <div class="container">
	        <div class="navbar-header">
	          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
	            <span class="sr-only">Toggle navigation</span>
	            <span class="icon-bar"></span>
	            <span class="icon-bar"></span>
	            <span class="icon-bar"></span>
	          </button>
	          <a class="navbar-brand" href="#">Retrospective</a>
	        </div>
	        <div id="navbar" class="navbar-collapse collapse">
	          <ul class="nav navbar-nav">
	            <li><button style="margin-top: 16px; margin-left: 20px;" class="btn btn-default btn-xs" onClick="location.href = '<% out.print(com.retrospective.utils.Constants.WebRoot); %>/';">Start New</button></li>
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
	            	<img 
	            		src="../../resources/images/share.png" 
	            		height="32"
	            		onClick="$('#dialog').dialog({width: 600});" 
	            		style="padding-right: 30px; padding-top: 14px; cursor: pointer;" 
	            		title="Click here to save the URL of this board" onClick="shareUrl();" />
	            </li>
	            <c:if test="${dashboard == null}">
	            	<li><img src="../../resources/images/icon-qrcode.png" style="padding-top: 8px; cursor: pointer;" title="Display join QR code of this board" onClick="app.getController('qr-code-widget').show();" /></li>
	            </c:if>
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
			app.domain + app.rootUrl + "/join/${code}/${token}", 
			{ 
				qrCodeContainer: 'qrCodeContainer',
				qrCodeImageContainer: 'qrcode',
				boardContainer: 'board',	 
			});
			
		userListWidget.initialize(${code}, '${token}');
   		
   		qrCodeWidget.show();
   		
   		var dashboardUrl = app.domain + '<% out.print(com.retrospective.utils.Constants.WebRoot); %>' + '/dashboard/${code}/${token}';
		boardPageScope.initialize(dashboardUrl, ${code}, '${token}');
		
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
	
	});

	$(window).resize(function() {
  		app.getController('board-page').resize();
	});
	
	</script>
	
	
	<%@include file="parts/dialogs.jsp" %>
  </body>
</html>