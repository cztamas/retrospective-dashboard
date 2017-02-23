<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
   
    <title>Retrospective Dashboard</title>

	<%@include file="dependencies.jsp" %>

	<script>
		Context.code = <c:out value="${code}"/>;
		Context.token = '<c:out value="${token}"/>';
	</script>

  </head>
  
  <body ng-app="retrospective" style="margin-left: 120px;">
	<div ng-controller="board-page">
		<!-- Fixed navbar -->
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
	            <li><a href="#" onClick="app.getController('qr-code-widget').show();">code: <b><c:out value="${code}"/></b></a></li>
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
	            	<div ng-controller="user-list-widget" style="margin-left: 20px; top: 16px; position: relative;">
	            		<span ng-repeat="user in state.users" class="board-participant">{{user.username}}</span>
	            	</div>
	            </li>
	          </ul>
	          <ul class="nav navbar-nav navbar-right">
	            <li>
	            	<img 
	            		src="../resources/images/share.png" 
	            		height="32"
	            		onClick="$('#dialog').dialog({width: 600});" 
	            		style="padding-right: 30px; padding-top: 14px; cursor: pointer;" 
	            		title="Click here to save the URL of this board" onClick="shareUrl();" />
	            </li>
	            <c:if test="${dashboard == null}">
	            	<li><img src="../resources/images/icon-qrcode.png" style="padding-top: 8px; cursor: pointer;" title="Display join QR code of this board" onClick="app.getController('qr-code-widget').show();" /></li>
	            </c:if>
	          </ul>
	        </div><!--/.nav-collapse -->
	      </div>
	    </nav>
	    
	    <div id="mainBoard">
		    <div id="board">
				<div id="axisX" class="axisX"></div>
				<div id="axisY" class="axisY"></div>
				
				<span id="glad" class="floating-label"><img width="100" src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/images/glad.png" /></span>
				<span id="sad" class="floating-label"><img width="100" src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/images/sad.png" /></span>
				<span id="mad" class="floating-label"><img width="100" src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/images/mad.png" /></span>
				
				<span id="in-control" class="floating-label">CONTROL</span>
				<span id="no-control" class="floating-label">NO CONTROL</span>
			
				<div id="boardContent" class="board"></div>
				
			</div>
		</div>
	</div>
	
	<div id="qrCodeContainer" ng-controller="qr-code-widget" class="centered">
		<img style="float: right; margin-bottom: 8px; cursor: pointer;" ng-click="hide()" src="../resources/images/close.png" />
		<a href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/join/<c:out value="${code}"/>/<c:out value="${token}"/>" target="enter_room">enter room</a> by reading QR code on phone<br/>
    	<div id="qrcode"></div>
    </div>
    
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
	
	<div id="dialog" title="Dashboard">
  		<p>You can re-open this dashboard any time in the future with the following link:</p>
  		<input id='shareUrl' type="text" style="width: 95%" disabled  />
	</div>
	
	<div id="errorDialog" title="Error">
  		<p style="color: #ff0000;" id="errorMessage"></p>
	</div>

  </body>
</html>