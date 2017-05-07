<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
  <head>
     <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Scrum Master</title>

	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/angular/angular.js"></script>
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/app.js?ts=<% out.print(Math.random()); %>"></script>
	<script>
		app.rootUrl = '<% out.print(com.retrospective.utils.Constants.WebRoot); %>';
	</script>
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/scrum-master/scrum-master-page.js?ts=<% out.print(Math.random()); %>"></script>
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/scrum-master/widgets/navigation-widget.js?ts=<% out.print(Math.random()); %>"></script>
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/scrum-master/services/scrum-master-service.js?ts=<% out.print(Math.random()); %>"></script>
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/scrum-master/services/error-handler-service.js?ts=<% out.print(Math.random()); %>"></script>
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/scrum-master/pages/retrospective-history-page.js?ts=<% out.print(Math.random()); %>"></script>
	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/js/angular/scrum-master/pages/scrum-teams-page.js?ts=<% out.print(Math.random()); %>"></script>
	
	<link rel="stylesheet" href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/bootstrap3-dialog/dist/css/bootstrap-dialog.min.css">
	<link href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" >
	<link href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/css/scrum-master.css" rel="stylesheet">
	 
	<%@ include file="../parts/google-analytics.jsp" %>
	
  </head>
  
  <body ng-app="retrospective">
  
	  <nav class="navbar navbar-inverse navbar-fixed-top">
	      <div class="container-fluid">
	        <div class="navbar-header">
	          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
	            <span class="sr-only">Toggle navigation</span>
	            <span class="icon-bar"></span>
	            <span class="icon-bar"></span>
	            <span class="icon-bar"></span>
	          </button>
	          <a class="navbar-brand" href="#">Scrum Master's Dashboard</a>
	        </div>
	        <div id="navbar" class="navbar-collapse collapse">
	          <!-- <ul class="nav navbar-nav navbar-right">
	            <li><a href="#">Dashboard</a></li>
	            <li><a href="#">Settings</a></li>
	            <li><a href="#">Profile</a></li>
	            <li><a href="#">Help</a></li>
	          </ul>
	          <form class="navbar-form navbar-right">
	            <input type="text" class="form-control" placeholder="Search...">
	          </form> -->
	        </div>
	      </div>
	    </nav>
	
	    <div class="container-fluid">
	      <div class="row">
	        <div ng-controller="navigation-widget" class="col-sm-3 col-md-2 sidebar">
	          <ul class="nav nav-sidebar">
	          	<li class="nav-sidebar-menuitem"><a href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>">Home</a></li>
	            <li class="nav-sidebar-menuitem active" id="menuitem-retrospective-history"><a ng-click="navigateTo('retrospective-history')" href="#">Retrospective History</a></li>
	            <li class="nav-sidebar-menuitem" id="menuitem-scrum-teams"><a ng-click="navigateTo('scrum-teams')" href="#">Scrum Teams</a></li>
	            <li class="nav-sidebar-menuitem" id="menuitem-settings"><a ng-click="navigateTo('settings')" href="#">Settings</a></li>
	          </ul>
	        </div>
	        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
	          
	          <div class="page-content" id="content-retrospective-history">
	          	<%@include file="pages/retrospective-history.jsp" %>
	          </div>
	          
	          <div class="page-content" id="content-scrum-teams">
	          	<%@include file="pages/scrum-teams.jsp" %>
	          </div>
	          
	          <div class="page-content" id="content-settings">
	            <%@include file="pages/settings.jsp" %>
	          </div>
	         
	        </div>
	      </div>
	    </div>
  
  	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/jquery/dist/jquery.min.js"></script>
  	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
  	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/bootstrap3-dialog/dist/js/bootstrap-dialog.min.js" ></script>
  	
  	<script>
	  	angular.element(document).ready(function() {
	
			var navigationWidget = app.getController('navigation-widget');
			navigationWidget.initialize();
		});
	</script>
  	
  </body>
</html>