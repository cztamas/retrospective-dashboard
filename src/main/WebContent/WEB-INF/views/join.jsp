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


<script>

ParticipantService.initialize(${code}, '${token}');

</script>

<button onClick="ParticipantService.join();">asd</button>
	
  </body>
</html>