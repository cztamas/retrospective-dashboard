<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
   
    <title>Retrospective Dashboard</title>

	<%@ include file="dependencies.jsp" %>

  </head>
  
  <body style="margin-left: 120px;">

	<div ng-app="retrospective" ng-controller="init-page" class="centered">
   
    	<button class="btn btn-primary btn-lg" ng-click="createSession()">Create Session</button>
    	<br/><br/>
    	<p>
    		<i>Inspired by <a href="http://scrumwith.me/" target="out">scrumwith.me</a></i>
    	</p>    
	</div>
	
  </body>
</html>