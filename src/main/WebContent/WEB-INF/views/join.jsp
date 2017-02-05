<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Retrospective Dashboard</title>
    
    <%@include file="dependencies.jsp" %>
    <script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/join.js"></script>
    
    <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css" />
	<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>

    <script>
  	    
  	    $(document).ready(function() {
  	    	ParticipantService.initialize(${code}, '${token}');
  	    	JoinController.initialize();
  	    });
  	    
  	    function setCookie(cname, cvalue, exdays) {
    		var d = new Date();
    		d.setTime(d.getTime() + (exdays*24*60*60*1000));
    		var expires = "expires="+ d.toUTCString();
    		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		}
		
		function getCookie(cname) {
    		var name = cname + "=";
    		var decodedCookie = decodeURIComponent(document.cookie);
    		var ca = decodedCookie.split(';');
    		for(var i = 0; i <ca.length; i++) {
        		var c = ca[i];
        		while (c.charAt(0) == ' ') {
            		c = c.substring(1);
        		}
        		if (c.indexOf(name) == 0) {
            		return c.substring(name.length, c.length);
        		}
    		}
    		return null;
		}
		
		
    </script>

  </head>
  
  <body id="existance">
  
  <div data-role="page" id="loginPage">

	<div data-role="header">
		<h1>Single page</h1>
	</div><!-- /header -->

	<div role="main" class="ui-content">
		
		<label for="username">Username</label>
		<input type="text" name="text-basic" id="username" value="" />
 		<a onClick="JoinController.enter();" class="ui-shadow ui-btn ui-corner-all">Enter</a>
		
	</div><!-- /content -->

	<div data-role="footer">
		<h4>Footer content</h4>
	</div><!-- /footer -->

  </div>
  
  <!-- FEEDBACK PAGE ===================================================  -->
  
  <div data-role="page" id="feedbackPage">
  
  		<label for="slider-fill">Glad</label>
  		<input type="range" name="slider-fill-glad" id="slider-fill-glad" value="60" min="0" max="1000" step="50" data-highlight="true" />
  
  		<label for="slider-fill">No Control</label>
  		<input type="range" name="slider-fill-nocontrol" id="slider-fill-nocontrol" value="60" min="0" max="1000" step="50" data-highlight="true" />
  
  		<label for="comment">Your Comment</label>
  		<textarea cols="40" rows="8" name="comment" id="comment"></textarea>
  
  		<button class="ui-btn">Add</button>
  </div>
  
  
  
  </body>
</html>