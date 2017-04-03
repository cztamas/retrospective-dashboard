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

  </head>
  
  <body style="margin-left: 120px; background: #eeeeee;">
  
	<div ng-app="retrospective" ng-controller="init-page" class="centered banner">
   
   			
   		<div style="margin-left: 250px;">
   		
   		<table width="100%">
   			<tr>
   				<td width="1" valign="top"><img src="resources/images/retrospective.png" /></td>
   				<td>
   					<h2>Online interactive whiteboard for retrospective meetings</h2>
   					because:
   					<ul>
			   			<li>virtual post-it would never fall down from the whiteboard</li>
			   			<li>participants can prepare their feedbacks before the meeting if you share the join url with them in advance</li>
			   			<li>you can save permalink of the board instead of taking a picture of the whiteboard at the end of the session</li>
			   		</ul>
			   		
			   		<br/>
			   		<button class="btn btn-primary btn-lg" ng-click="createSession()">Start Retrospective Session</button>
			   		<br/><br/>
			   		
			   		<span class="footer-text">
			   		Inspired by <a href="http://scrumwith.me/" target="out">scrumwith.me</a> | 
	    		
		    		Source Code on <a href="https://github.com/akos-sereg/retrospective-dashboard" target="out">GitHub</a> |
		    		See <a href="#" onClick="$('#how-it-works').toggle();">how it works</a> |  
		    		Copyright © 2017 Akos Sereg
		    		</span>
		    		<br/><br/>
   				</td>
   			</tr>
   		</table>
   		
    	</div>
    	
    	<table id="how-it-works" style="display: none; width: 100%; background-color: #ffffff;" align="center">
    		<tr>
   				<td width="10%">&nbsp;</td>
   				<td width="25%"><img src="resources/images/tripod.jpg" /></td>
   				<td width="25%">
   					<img src="resources/images/laptop.png" width="180" /> or 
   					<img src="resources/images/smartphone.png" width="80" />
   				</td>
   				<td width="5%">&nbsp;</td>
   				<td width="25%"><img src="resources/images/tripod-filled.png" /></td>
   				<td width="10%">&nbsp;</td>
   			</tr>
   			<tr>
   				<td width="10%">&nbsp;</td>
   				<td valign="top" width="25%">
   					<h4>1. Start</h4>
   					Use a beamer in a meeting room and make <br/>the board full screen by pressing F11. 
   				</td>
   				<td valign="top" width="25%">
   					<h4>2. Join</h4>
   					Team members can join the session on smart phone (by reading QR code) or laptop (by following the join url). If you have sent the join url to them before the meeting, 
   					they might have prepared their feedbacks in advance.<br/><br/>
   				
   				</td>
   				<td width="5%">&nbsp;</td>
   				<td valign="top" width="25%">
   					<h4>3. Evaluate</h4>
   					Once team members have published their comments, you can make it visible by clicking on "Reveal" button. After that, all newly published post-its are displayed immediately.<br/>
   					You can drag all elements on the board to adjust positions.
   				</td>
   				<td width="10%">&nbsp;</td>
   			</tr>
   		</table> 
	</div>
	
	<a href="https://github.com/akos-sereg/retrospective-dashboard"><img style="position: absolute; top: 0; left: 0; border: 0;" src="https://camo.githubusercontent.com/c6625ac1f3ee0a12250227cf83ce904423abf351/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f677261795f3664366436642e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_gray_6d6d6d.png"></a>
	
  </body>
</html>