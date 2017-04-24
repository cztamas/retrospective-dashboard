<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Change your retrospective meeting habits: stop using whiteboard, start using online dashboard instead. You don't even have to take a picture of the whiteboard at the end of the meeting, just save the permalink." />
    <meta property="og:title" content="Online interactive whiteboard for retrospective meetings" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="http://www.retrospective-dashboard.org/" />
	<meta property="og:image" content="http://www.retrospective-dashboard.org/resources/images/retro.png" />
	<meta property="og:description" content="Change your retrospective meeting habits: stop using whiteboard, start using online dashboard instead. You don't even have to take a picture of the whiteboard at the end of the meeting, just save the permalink." />

    <title>Retrospective Dashboard</title>

	<%@ include file="parts/dependencies.jsp" %>
	<%@ include file="parts/google-analytics.jsp" %>
	
	<link rel="stylesheet" href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/css/init-page.css">
  </head>
  
  <body style="margin-left: 120px; background: #eeeeee;">
  
	<div ng-app="retrospective" ng-controller="init-page" class="centered banner">
   
   			
   		<div style="margin-left: 250px;">
   		
   		<table width="80%">
   			<tr>
   				<td width="1" valign="top">
   					<img src="resources/images/retrospective.png" />
   				</td>
   				<td>
   					<h2>Interactive whiteboard for retrospective meetings</h2>
   					This is a <b>FREE</b> tool for Scum Masters to facilitate retrospective meetings. The goal of this project is to make retro meetings more fun for participants, and allow 
   					scum masters to manage retro meeting results more effectively.
   					<br/><br/>
   					<table width="700">
			          	<tr>
			          		<td valign="top" width="10%" style="padding-right: 20px;"><img style="margin-top: 10px;" src="resources/images/retro-layout-1.png" width="120" /></td>
			          		<td valign="top">
			          			<h4>Glad, Sad, Mad</h4>
			          			Traditional "glad, sad, mad" type of retrospective meeting. <br/>
			          			<span class="footer-text">Optimal for large teams (more than 5 members)</span>
			          			<br/><br/>
			          			<button class="btn btn-primary btn-sm" ng-click="createSession(2)">Start Session</button>
			          			<button class="btn btn-default btn-sm" onClick="document.location.href='<% out.print(com.retrospective.utils.Constants.DemoGsmUrl); %>'">Demo</button>
			          		</td>
			          	</tr>
			          	<tr>
			          		<td colspan="2" width="100%">
			          			<div width="100%" id="or">or</div>
			          		</td>
			          	</tr>
			          	<tr style="border-bottom: solid 1px #cccccc;">
			          		<td valign="top" width="10%" style="padding-right: 20px;"><img style="margin-top: 10px;" src="resources/images/retro-layout-2.png" width="120" /></td>
			          		<td valign="top">
			          			<h4>Virtual Whiteboard</h4>
			          			Participants are allowed to place their feedbacks anywhere on the board, as if you were using a real whiteboard during the meeting (factors: glad, control).<br/>
			          			<span class="footer-text">Optimal for small teams</span>
			          			<br/><br/>
			          			<button class="btn btn-primary btn-sm" ng-click="createSession(1)">Start Session</button>
			          			<button class="btn btn-default btn-sm">Demo</button>
			          			<br/><br/>
			          		</td>
			          	</tr>
		            </table>
			   		
			   		<br>
			   		<span class="footer-text">
			   		Inspired by <a href="http://scrumwith.me/" target="out">scrumwith.me</a> | 
	    		
		    		Source Code on <a href="https://github.com/akos-sereg/retrospective-dashboard" target="out">GitHub</a> |
		    		Copyright © 2017 Akos Sereg
		    		</span>
		    		<br/><br/>
   				</td>
   			</tr>
   		</table>
   		
    	</div>
	</div>
	
	<a href="https://github.com/akos-sereg/retrospective-dashboard"><img style="position: absolute; top: 0; left: 0; border: 0;" src="https://camo.githubusercontent.com/c6625ac1f3ee0a12250227cf83ce904423abf351/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f677261795f3664366436642e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_gray_6d6d6d.png"></a>
	
  </body>
</html>