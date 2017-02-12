<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
   
    <title>Retrospective Dashboard</title>

	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/jquery/dist/jquery.min.js"></script>
	<%@include file="dependencies.jsp" %>

	<script>
		Context.code = <c:out value="${code}"/>;
		Context.token = '<c:out value="${token}"/>';
	</script>

  </head>
  
  <body style="margin-left: 120px;" ng-app="retrospective" ng-controller="host">

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
            <li><a href="#" onClick="showQrCode();">code: <b><c:out value="${code}"/></b></a></li>
            <li><button style="margin-top: 16px; margin-left: 20px;" class="btn btn-default btn-xs" onClick="location.href = '<% out.print(com.retrospective.utils.Constants.WebRoot); %>/';">Start New</button></li>
            <c:if test="${dashboard == null}">
            <li>
            	<button 
            		title="Show notes on the board. Once you reveal the team's notes, new ones will be automatically displayed" 
            		style="margin-top: 16px; margin-left: 20px;" 
            		class="btn btn-primary btn-xs" 
            		onClick="Board.Current.reveal(<c:out value="${code}"/>);">Reveal <span id="stickerCount" class="badge">+0</span>
            	</button>
            </li>
            </c:if>
            <li><span id="boardParticipants" style="margin-left: 20px; top: 16px; position: relative;"></span></li>
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
            	<li><img src="../resources/images/icon-qrcode.png" style="padding-top: 8px; cursor: pointer;" title="Display join QR code of this board" onClick="showQrCode();" /></li>
            </c:if>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
	
	<div id="qrCodeContainer" class="centered">
		<img style="float: right; margin-bottom: 8px; cursor: pointer;" onClick="hideQrCode();" src="../resources/images/close.png" />
		<a href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/join/<c:out value="${code}"/>/<c:out value="${token}"/>" target="enter_room">enter room</a><br/>
    	<div id="qrcode"></div>
    </div>
    
    
    <%@include file="board/glad-sad-mad.jsp" %>

	<script>
	
	function showQrCode() {
		$('#qrCodeContainer').show();
		$('#board').hide();
	}
	
	function hideQrCode() {
		$('#qrCodeContainer').hide();
		$('#board').show();
	}
	
	$(document).ready(function() {
		$(document).tooltip();
		$('#dialog').hide();
		$('#shareUrl').val(app.domain + '<% out.print(com.retrospective.utils.Constants.WebRoot); %>' + '/dashboard/${code}/${token}');	
	
   		new QRCode(document.getElementById("qrcode"), {
		    text: app.domain + app.rootUrl + "/join/${code}/${token}",
		    width: window.innerHeight * 0.70,
		    height: window.innerHeight * 0.70,
		    colorDark : "#000000",
		    colorLight : "#ffffff",
		    correctLevel : QRCode.CorrectLevel.H
		});
		
		<c:if test="${dashboard == null}">
   			Board.Current.mode = 'session';		
		</c:if>
		<c:if test="${dashboard == true}">
			Board.Current.mode = 'dashboard';
		</c:if>
		
		BoardService.initialize();
		Board.Current.initialize();
		
		ParticipantService.initialize(${code}, '${token}');
		ParticipantService.onJoin = function(participantDetails) {
			BoardService.addParticipant(participantDetails);
			Board.Current.refreshParticipants();
		}
		
		<c:if test="${dashboard == null}">
   			showQrCode();
   			Board.Current.startRefreshingParticipants();
		</c:if>
		<c:if test="${dashboard == true}">
			hideQrCode();
			Board.Current.reveal(<c:out value="${code}"/>);
		</c:if>
	});
	
	$(window).resize(function() {
  		Board.Current.resize();
	});
	
	
	</script>
	
	<div id="dialog" title="Basic dialog">
  		<p>You can re-open this dashboard any time in the future with the following link:</p>
  		<input id='shareUrl' type="text" style="width: 95%" disabled  />
  		<!--<p>
  			<br/>
  			<button class="btn btn-primary btn-xs" onClick="window.prompt('Copy to clipboard: Ctrl+C, Enter', $('#shareUrl').val());">copy to clipboard</button>
  		</p>-->
	</div>

  </body>
</html>