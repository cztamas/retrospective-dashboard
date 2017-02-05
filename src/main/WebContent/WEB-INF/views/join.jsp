<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Retrospective Dashboard</title>
    
    <%@include file="dependencies.jsp" %>

  </head>
  
  <body style="margin-left: 120px;">

<div id="existance"></div>
<script>

ParticipantService.initialize(${code}, '${token}');

window.onbeforeunload = function(){
	alert('e');
}

</script>

<input type="text" id="username" />
<button onClick="ParticipantService.join($('#username').val());">asd</button>
	
  </body>
</html>