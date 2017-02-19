<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Retrospective Dashboard</title>
    
    <%@include file="dependencies.jsp" %>
    
    <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css" />
	<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
  </head>
  
  <body id="existance" ng-app="retrospective" ng-controller="participant-page">
  
  <script>
  
  	    angular.element(document).ready(function() {
  	    	
 	    	app.getController('participant-page').initialize(${code}, '${token}');
 	    	
 	    	Context.code = ${code};
 	    	Context.token = '${token}';
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
 		<a onClick="JoinController.enterRoom();" class="ui-shadow ui-btn ui-corner-all">Enter</a>
		
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
    	
  		<label for="slider-fill">Glad</label>
  		<input type="range" name="slider-fill-glad" id="slider-fill-glad" value="60" min="0" max="1000" step="50" data-highlight="true" />
  
  		<label for="slider-fill">Control</label>
  		<input type="range" name="slider-fill-control" id="slider-fill-control" value="60" min="0" max="1000" step="50" data-highlight="true" />
  
  		<label for="comment">Your Comment</label>
  		<textarea cols="40" rows="8" name="comment" id="comment"></textarea>
  
  		<button 
  			id="commentAddOrEdit"
  			data-mode="add"
  			data-commentid=""
  			class="ui-btn" 
  			onClick="JoinController.addSticker($('#slider-fill-glad').val(), $('#slider-fill-control').val(), $('#comment').val());">Add</button>
  		
  		<span id="errorLabel" class="error"></span>
  	 </div>
  </div>
  
  <!-- COMMENTS PAGE ===================================================  -->
  <div data-role="page" id="commentsPage">
  		<div data-role="header">
  			<h1>&nbsp;</h1>
			<button onClick="$.mobile.changePage('#feedbackPage'); $('#commentAddOrEdit').data('mode', 'add'); JoinController.clearForm();" class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right ui-icon-plus">Add comment</button>
		</div>
		
  		<ul id="stickersContainer" data-role="listview" data-inset="true"></ul>
  		<!-- <button class="ui-btn ui-icon-action ui-btn-icon-left">Publish All</button> -->
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