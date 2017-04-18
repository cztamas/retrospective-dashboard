<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Retrospective Dashboard</title>
    
    <%@ include file="parts/dependencies.jsp" %>
    <%@ include file="parts/google-analytics.jsp" %>
    
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
  	    	
  	    	var pageController = app.getController('participant-page as participantPage');
 	    	pageController.initialize(${code}, '${token}', false);
 	    	
 	    	Context.code = ${code};
 	    	Context.token = '${token}';
 	    	
 	    	var sliderFormatter = function(value) {
				return Math.ceil((value / 1000)*100) + '%';
			};
			
			// slider selector
			// ----------------------------------------------------------------------------
 	    	$('#slider-fill-control').bootstrapSlider({formatter: sliderFormatter});
 	    	$('#slider-fill-glad').bootstrapSlider({formatter: sliderFormatter});
 	    	
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
			  
			  $('#slider-fill-glad').bootstrapSlider('setValue', glad);
			  $('#slider-fill-control').bootstrapSlider('setValue', noControl);
			});
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
	        <span class="footer-text">keep it short, it will be displayed on a small virtual post-it</span><br/>
	        <textarea type="text" id="comment" style="width: 100%;"></textarea><br/><br/>
	        
	        <!-- Slider Selector is disabled -->
	        <div class="hidden">
		        Glad: <br/>
		        <span class="footer-text">indicates how glad you are with this this</span><br/>
		        <input id="slider-fill-glad" style="width: 100%;" data-slider-id='ex1Slider' type="text" data-slider-min="0" data-slider-max="1000" data-slider-step="1" data-slider-value="500"/><br/><br/>
		        No Control: <br/>
		        <span class="footer-text">indicates how much control you feel about this item. eg.: 0% means you (or your team) have full control on this feedback item.</span><br/>
		        <input id="slider-fill-control" style="width: 100%;" data-slider-id='ex2Slider' type="text" data-slider-min="0" data-slider-max="1000" data-slider-step="1" data-slider-value="500"/>
	        </div>
	        <div>
	        	Indicate your feelings about this item<br/>
	        	<span class="footer-text">place this feedback item to the correct area below, indicating how glad you are with it and how much control you feel over this item</span><br/><br/>
	        	<span>Glad</span><br/>
	        	<img 
	        		data-glad="500"
	        		data-no-control="500" 
	        		src="../../resources/images/plot.png" 
	        		id="plot-area" 
	        		style="cursor: crosshair;" /><br/>
	        	<span style="position: float; float: right;">No Control</span><br/>
	        	<img src="../../resources/images/ball.png" id="marker-ball" class="hidden" />
	        	<br/>
	        </div>
	        
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