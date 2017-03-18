<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Retrospective Dashboard</title>
    
    <%@include file="parts/dependencies.jsp" %>
    
    <script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/bootstrap/dist/js/bootstrap.min.js" ></script>
    <script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js" ></script>
    <script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/bootstrap3-dialog/dist/js/bootstrap-dialog.min.js" ></script>
    <link rel="stylesheet" href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css">
    <link rel="stylesheet" href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/bootstrap3-dialog/dist/css/bootstrap-dialog.min.css">
    
	<!-- <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script> -->
  </head>
  
  <body id="existance" ng-app="retrospective" ng-controller="participant-page as participantPage">
  <style>
    #ex1Slider .slider-selection {
		background: #BABABA;
	}
	
	#ex2Slider .slider-selection {
		background: #BABABA;
	}
  </style>
  <script>
  
  	    angular.element(document).ready(function() {
  	    	
 	    	app.getController('participant-page as participantPage').initialize(${code}, '${token}', false);
 	    	
 	    	Context.code = ${code};
 	    	Context.token = '${token}';
 	    	
 	    	var sliderFormatter = function(value) {
				return Math.ceil((value / 1000)*100) + '%';
			};
			
 	    	$('#slider-fill-control').bootstrapSlider({formatter: sliderFormatter});
 	    	$('#slider-fill-glad').bootstrapSlider({formatter: sliderFormatter});
  	    });
 	    
   </script>
   
   <div style="margin-left: 30%; margin-right: 30%; width: 60% text-align: left; ">
   
	   <h3>Retrospective Dashboard</h3>
	   <span>Prepare your comments for retrospective meeting.</span>
	   
	   <br/><br/>
	   <div class="input-group input-group-sm">
		  <span class="input-group-addon">Username</span>
		  <input 
		  	id="username" 
		  	type="text" 
		  	class="form-control"
		  	style="width: 220px;" 
		  	placeholder="your name">
		  <button id="set-button" ng-click="join()" style="margin-left: 10px;" class="btn btn-primary btn-sm">Set</button>
	   </div>
	   
	   
	   <br/><br/>
	   <div class="btn-group" role="group" aria-label="..."  style="position: float; float: right;">
	      <button type="button" class="btn btn-success btn-sm" ng-click="navigateToCreateComment(false)">Create</button>
		  <!-- <button type="button" class="btn btn-primary btn-sm">Publish All</button> -->
	   </div>
	   
	   <h4>Your comments for retrospective</h4>
	   
	   <div id="stickersContainer"></div>
	   
   </div>
   
   <div id="create-comment-dialog" class="modal fade" role="dialog">
	   <div class="modal-dialog">
	
	    <!-- Modal content-->
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal">&times;</button>
	        <h4 class="modal-title">Add Comment</h4>
	        <i style="font-size: 9pt;">Your comment will be stored in your browser only. Once a comment is added, you can Publish it so that it would be shared with others on the board.</i>
	      </div>
	      <div class="modal-body">
	        Comment:<br/>
	        <textarea type="text" id="comment" style="width: 100%;"></textarea><br/><br/>
	        Glad: <br/>
	        <input id="slider-fill-glad" style="width: 100%;" data-slider-id='ex1Slider' type="text" data-slider-min="0" data-slider-max="1000" data-slider-step="1" data-slider-value="500"/><br/><br/>
	        Control: <br/>
	        <input id="slider-fill-control" style="width: 100%;" data-slider-id='ex2Slider' type="text" data-slider-min="0" data-slider-max="1000" data-slider-step="1" data-slider-value="500"/>
	        
	        <span id="errorLabel" class="error"></span>
	      </div>
	      <div class="modal-footer">
	        <button type="button" id="commentAddOrEdit" class="btn btn-success" data-mode="add" ng-Click="addSticker()">Add</button>
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	      </div>
	    </div>
	
	  </div>
   
	</div>
	
	
	<div class="modal fade">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	        <h4 class="modal-title">Modal title</h4>
	      </div>
	      <div class="modal-body">
	        <p>One fine body</p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	        <button type="button" class="btn btn-primary">Save changes</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	
  
  </body>
</html>