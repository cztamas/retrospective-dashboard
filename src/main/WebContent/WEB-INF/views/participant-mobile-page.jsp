<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Retrospective Dashboard</title>
    
    <%@ include file="parts/dependencies.jsp" %>
    <%@ include file="parts/google-analytics.jsp" %>
    
    <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css" />
	<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
  </head>
  
  <body id="existance" ng-app="retrospective" ng-controller="participant-page as participantPage">
  
  <script>
  
  	    angular.element(document).ready(function() {
  	    	
  	    	var pageController = app.getController('participant-page as participantPage');
 	    	pageController.initialize(${code}, '${token}', true, ${boardType});
 	    	
 	    	Context.code = ${code};
 	    	Context.token = '${token}';
 	    	
 	    	<c:if test="${boardType == 1}">
	 	    	// coordinate selector
	 	    	// ----------------------------------------------------------------------------
	 	    	$("#plot-area").click(function(e) {
	 	    	
					  var offset = $(this).offset();
					  var relativeX = (e.pageX - offset.left);
					  var relativeY = (e.pageY - offset.top);
					  var plotSize = { 
							width: $("#plot-area").width(), 
							height: $("#plot-area").height() 
					  };
						
					  var glad = Math.ceil(1000 - ((relativeY / plotSize.height) * 1000));
					  var noControl = Math.ceil((relativeX / plotSize.width) * 1000);
					  
					  pageController.setCrosshair(glad, noControl, 'plot-area', 0);
					  
					  $('#slider-fill-glad').val(glad);
					  $('#slider-fill-control').val(noControl);
				 });
			  </c:if>
			  <c:if test="${boardType == 2}">
			  	  $('#slider-fill-control').val(0.0);
			  	  $('#slider-fill-glad').val(1000);
			  </c:if>
			
  	    });
 	    
   </script>
  
  <!-- LOGIN PAGE ===================================================  -->
  <div data-role="page" id="loginPage">

	<div data-role="header">
		<h1>Enter your name</h1>
	</div>

	<div role="main" class="ui-content">
		
		<label for="username">Username</label>
		<input type="text" name="text-basic" id="username" value="" />
 		<a ng-click="enterRoom()" class="ui-shadow ui-btn ui-corner-all">Enter</a>
		
		<span id="loginErrorLabel" class="error"></span>
	</div>

  </div>
  
  <!-- FEEDBACK PAGE ===================================================  -->
  <div data-role="page" id="feedbackPage">
  
    <div data-role="header">
		<h1>&nbsp;</h1>
		<button onClick="$.mobile.changePage('#commentsPage');" class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right ui-icon-bullets">Comments</button>
	</div>
	
    <div role="main" class="ui-content">
    	
    	<div class="hidden">
	  		<label for="slider-fill">Glad</label>
	  		<span class="footer-text">indicates how glad you are with this this</span><br/>
	  		<input type="range" class="ui-hidden-accessible" name="slider-fill-glad" id="slider-fill-glad" value="1000" min="0" max="1000" step="50" data-highlight="true" />
	  
	  		<label for="slider-fill">No Control</label>
	  		<span class="footer-text">indicates how much control you feel about this item. eg.: 0% means you (or your team) have full control on this feedback item.</span><br/>
	  		<input type="range" class="ui-hidden-accessible" name="slider-fill-control" id="slider-fill-control" value="0" min="0" max="1000" step="50" data-highlight="true" />
        </div>
        
  		<label for="comment">Your Comment</label>
  		<span class="footer-text">keep it short, 256 characters max.</span>
  		<textarea maxlength="256" cols="40" rows="8" name="comment" id="comment"></textarea>
  		
  		<c:if test="${boardType == 1}">
  			<div>
	        	Indicate your feelings about this item<br/>
	        	<span class="footer-text">tap on below area - put the marker to the correct place indicating how glad you are, and how much control you feel</span><br/><br/>
	        	<span>Glad</span><br/>
	        	<img 
	        		data-glad="500"
	        		data-no-control="500" 
	        		src="../resources/images/plot.png" 
	        		id="plot-area" 
	        		width="100%"
	        		style="cursor: crosshair;" /><br/>
	        	<span style="position: float; float: right;">No Control</span><br/>
	        	<img src="../resources/images/ball.png" id="marker-ball" class="hidden" />
	        	<br/>
	        </div>
  		</c:if>
  		
  		<c:if test="${boardType == 2}">
	  		<fieldset data-role="controlgroup" data-type="horizontal" >
		     	<input type="radio" name="glad-sad-mad-radio" onChange="$('#slider-fill-glad').val(1000);" id="radio-choice-1" value="glad" checked="checked" />
		     	<label name="label-gsm" id="label-glad" for="radio-choice-1">Glad</label>
		
		     	<input type="radio" name="glad-sad-mad-radio" onChange="$('#slider-fill-glad').val(500);" id="radio-choice-2" value="sad"  />
		     	<label name="label-gsm" id="label-sad" for="radio-choice-2">Sad</label>
		
		     	<input type="radio" name="glad-sad-mad-radio" onChange="$('#slider-fill-glad').val(0);" id="radio-choice-3" value="mad"  />
		     	<label name="label-gsm" id="label-mad" for="radio-choice-3">Mad</label>
			</fieldset>
        </c:if>
  
  		<button 
  			id="commentAddOrEdit"
  			data-mode="add"
  			data-commentid=""
  			class="ui-btn" 
  			ng-click="addSticker()">Add</button>
  		
  		<span id="errorLabel" class="error"></span>
  	 </div>
  </div>
  
  <!-- COMMENTS PAGE ===================================================  -->
  <div data-role="page" id="commentsPage">
  		<div data-role="header">
  			<h1>&nbsp;</h1>
			<button ng-click="navigateToCreateComment(true)" class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right ui-icon-plus">Add comment</button>
		</div>
		
		<button 
			id="publish-all-btn"
  			class="ui-btn" 
  			ng-click="publishAll()">Publish All</button>
  			
  		<ul id="stickersContainer" data-role="listview" data-inset="true"></ul>
  		
  </div>
  
  <!-- DIALOGS ===================================================  -->
  <div data-role="dialog" id="sure" data-title="Are you sure?">
  <div data-role="content">
    <h3 class="sure-1">???</h3>
    <p class="sure-2">???</p>
    <a href="#" class="sure-do" data-role="button" data-theme="b" data-rel="back">Yes</a>
    <a href="#" data-role="button" data-theme="c" data-rel="back">No</a>
  </div>
</div>
  
  </body>
</html>