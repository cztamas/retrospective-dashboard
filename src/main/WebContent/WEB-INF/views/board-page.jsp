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
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/bootstrap-contextmenu/bootstrap-contextmenu.js" ></script>
    <link rel="stylesheet" href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css">
    <link rel="stylesheet" href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/css/board-page.css">

	<script>
		Context.code = <c:out value="${code}"/>;
		Context.token = '<c:out value="${token}"/>';
	</script>

  </head>
  
  <c:choose>
    <c:when test="${boardType == 1}">
        <body ng-app="retrospective" style="margin-left: 120px;"> 
    </c:when>    
    <c:otherwise>
        <body ng-app="retrospective">
    </c:otherwise>
  </c:choose>
  
	<div ng-controller="board-page">
	    <nav class="navbar navbar-default navbar-fixed-top">
	      <div class="container-fullwidth">
	        <div class="navbar-header">
	          <a class="navbar-brand" href="#" ng-bind="state.sessionParameters.name"></a>
	        </div>
	        <div id="navbar" class="navbar-collapse collapse">
	          <ul class="nav navbar-nav">
	            <c:if test="${isDashboard == false}">
		            <li>
		            	
						<div class="btn-group" style="margin-top: 16px; margin-left: 20px;" >
						  <button type="button" class="btn btn-xs btn-primary" ng-click="revealAll()">Reveal All <span class="badge">{{state.stickers.length}}</span></button>
						  <button type="button" class="btn btn-xs btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						    <span class="caret"></span>
						    <span class="sr-only">Toggle Dropdown</span>
						  </button>
						  <ul class="dropdown-menu">
						    <li 
						    	ng-repeat="user in state.usersWithPublishedStickers">
						    	<a 
						    		href="#"
						    		style="font-size: 8pt;"
						    		ng-click="revealUser(user.username)">
						    		<input 
						    			type="checkbox"
						    			ng-checked="user.isRevealed || (state.isRevealed && !state.isPartialReveal)" 
						    			disabled 
						    			readonly /> Reveal feedbacks from <b>{{user.username}}</b>
						    	</a>
						    </li>
						    <li role="separator" class="divider"></li>
						    <li><a ng-click="revealPartial([])" href="#" style="font-size: 8pt;">Uncheck All</a></li>
						  </ul>
						</div>
		            	
		            </li>
	            </c:if>
	            <li>
	            	<%@include file="parts/widgets/user-list.jsp" %>
	            </li>
	          </ul>
	          <ul class="nav navbar-nav navbar-right">
	          	<li>
	          		<img 
	          		    style="margin-top: 8px; " 
	          			src="../../resources/images/loading.gif" 
	          			id="loading-gif" />
	          	</li>
	          	<c:if test="${isDashboard == true}">
	            	<li>
	            		<button
		            		title="Action Items" 
		            		style="margin-top: 8px; margin-left: 10px; margin-right: 10px;" 
		            		onClick="$('#sessionCommentDialog').dialog({width: 600});"
		            		class="btn btn-default btn"><img src="../../resources/images/comment.png" /></button>
	            	</li>
	            </c:if>
	          	<c:if test="${isDashboard == false}">
		          	<li>
					    <button
		            		title="Full Screen"
		            		style="margin-top: 8px; margin-left: 20px; margin-right: 10px;" 
		            		onClick="Utils.requestFullScreen();"  
		            		class="btn btn-default btn"><img src="../../resources/images/fullscreen.png" /></button>
		          	</li>
	          	</c:if>
	          	<c:if test="${isDashboard == false}">
		          	<li>
					    <button
		            		title="Board Settings"
		            		style="margin-top: 8px; margin-right: 10px;" 
		            		onClick="$('#settings-dialog').dialog({width: 600});"  
		            		class="btn btn-default btn"><img src="../../resources/images/settings.png" /></button>
		          	</li>
	          	</c:if>
	          	<c:if test="${isDashboard == false}">
		            <li>
		            	<button
		            		title="Permalink: save this url when finished"
		            		style="margin-top: 8px; margin-right: 10px;" 
		            		onClick="$('#dialog').dialog({width: 600});"  
		            		class="btn btn-default btn"><img src="../../resources/images/share.png" /></button>
		            </li>
		        </c:if>
	            <c:if test="${isDashboard == false}">
	            	<li>
	            		<button
		            		title="QR Code and Join URL" 
		            		style="margin-top: 8px; margin-right: 10px;" 
		            		onClick="app.getController('qr-code-widget').show();"
		            		class="btn btn-default btn"><img src="../../resources/images/qr.png" /></button>
	            	</li>
	            </c:if>
	            
	            <li>
	            	<img src="../../resources/images/spacer.gif" height="1" width="20" />
	            </li>
	          </ul>
	          
	        </div>
	      </div>
	    </nav>
	    
	    <c:if test="${boardType == 1}"><%@include file="parts/main-board.jsp" %></c:if>
	    <c:if test="${boardType == 2}"><%@include file="parts/main-board-v2.jsp" %></c:if>
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
			
		userListWidget.initialize(${code}, '${token}', ${isDashboard});
   		
   		qrCodeWidget.show();
   		
   		var dashboardUrl = app.domain + '<% out.print(com.retrospective.utils.Constants.WebRoot); %>' + '/dashboard/${code}/${token}';
		
		<c:if test="${isDashboard == false}">
   			qrCodeWidget.show();
   			boardPageScope.state.mode = boardPageScope.enum.mode.session;
   			userListWidget.startRefreshingParticipants();
		</c:if>
		<c:if test="${isDashboard == true}">
			qrCodeWidget.hide();
			boardPageScope.state.mode = boardPageScope.enum.mode.dashboard;
			boardPageScope.revealAll();
		</c:if>
		
		boardPageScope.initialize(dashboardUrl, ${code}, '${token}', ${boardType});
	});

	$(window).resize(function() {
  		app.getController('board-page').resize();
	});
	
	</script>
	
	<%@include file="parts/dialogs.jsp" %>
	<%@include file="parts/context-menu/sticker-context-menu.jsp" %>
	
  </body>
</html>