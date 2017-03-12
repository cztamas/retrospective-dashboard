<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Retrospective tool for Scrum Masters" />
    <meta property="og:title" content="Retrospective tool for Scrum Masters" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="http://www.retrospective-dashboard.org/" />
	<meta property="og:image" content="http://www.retrospective-dashboard.org/resources/images/retro.png" />
	<meta property="og:description" content="Change your retrospective meeting habits: stop using whiteboard, start using online dashboard instead. You don't even have to take a picture of the whiteboard at the end of the meeting, just save the permalink." />

    <title>Retrospective Dashboard</title>

	<%@ include file="parts/dependencies.jsp" %>

  </head>
  
  <body style="margin-left: 120px;">

	<div ng-app="retrospective" ng-controller="init-page" class="centered">
   
   		<h3>Change your retrospective meeting habits: <br/>stop using whiteboard, use retrospective-dashboard.org instead.</h3>
   		You don't even have to take a picture of the whiteboard at the end of the meeting, just save the permalink.<br/><br/>
   		
    	<button class="btn btn-primary btn-lg" ng-click="createSession()">Create Session</button>
    	<br/><br/>
    	<p>
    		<i>Inspired by <a href="http://scrumwith.me/" target="out">scrumwith.me</a></i> | 
    		
    		Source Code on <a href="https://github.com/akos-sereg/retrospective-dashboard" target="out">GitHub</a> | 
    		Copyright © 2017 Akos Sereg
    	</p>    
	</div>
	
  </body>
</html>