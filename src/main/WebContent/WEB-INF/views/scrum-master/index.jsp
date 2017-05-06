<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
  <head>
     <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Scrum Master</title>

	<link rel="stylesheet" href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/bootstrap/dist/css/bootstrap.min.css">
	
	<link href="resources/css/scrum-master.css" rel="stylesheet">
	 
	<%@ include file="../parts/google-analytics.jsp" %>
	
  </head>
  
  <body>
  
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
	        <div class="col-sm-3 col-md-2 sidebar">
	          <ul class="nav nav-sidebar">
	            <li class="active"><a href="#">Retrospective History <span class="sr-only">(current)</span></a></li>
	            <li><a href="#">Scrum Teams</a></li>
	            <li><a href="#">Settings</a></li>
	          </ul>
	        </div>
	        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
	          
	          <h2 class="sub-header">Section title</h2>
	          <div class="table-responsive">
	            <table class="table table-striped">
	              <thead>
	                <tr>
	                  <th>#</th>
	                  <th>Header</th>
	                  <th>Header</th>
	                  <th>Header</th>
	                  <th>Header</th>
	                </tr>
	              </thead>
	              <tbody>
	                <tr>
	                  <td>1,001</td>
	                  <td>Lorem</td>
	                  <td>ipsum</td>
	                  <td>dolor</td>
	                  <td>sit</td>
	                </tr>
	                <tr>
	                  <td>1,002</td>
	                  <td>amet</td>
	                  <td>consectetur</td>
	                  <td>adipiscing</td>
	                  <td>elit</td>
	                </tr>
	                <tr>
	                  <td>1,003</td>
	                  <td>Integer</td>
	                  <td>nec</td>
	                  <td>odio</td>
	                  <td>Praesent</td>
	                </tr>
	                <tr>
	                  <td>1,003</td>
	                  <td>libero</td>
	                  <td>Sed</td>
	                  <td>cursus</td>
	                  <td>ante</td>
	                </tr>
	                <tr>
	                  <td>1,004</td>
	                  <td>dapibus</td>
	                  <td>diam</td>
	                  <td>Sed</td>
	                  <td>nisi</td>
	                </tr>
	                <tr>
	                  <td>1,005</td>
	                  <td>Nulla</td>
	                  <td>quis</td>
	                  <td>sem</td>
	                  <td>at</td>
	                </tr>
	                <tr>
	                  <td>1,006</td>
	                  <td>nibh</td>
	                  <td>elementum</td>
	                  <td>imperdiet</td>
	                  <td>Duis</td>
	                </tr>
	                <tr>
	                  <td>1,007</td>
	                  <td>sagittis</td>
	                  <td>ipsum</td>
	                  <td>Praesent</td>
	                  <td>mauris</td>
	                </tr>
	                <tr>
	                  <td>1,008</td>
	                  <td>Fusce</td>
	                  <td>nec</td>
	                  <td>tellus</td>
	                  <td>sed</td>
	                </tr>
	                <tr>
	                  <td>1,009</td>
	                  <td>augue</td>
	                  <td>semper</td>
	                  <td>porta</td>
	                  <td>Mauris</td>
	                </tr>
	                <tr>
	                  <td>1,010</td>
	                  <td>massa</td>
	                  <td>Vestibulum</td>
	                  <td>lacinia</td>
	                  <td>arcu</td>
	                </tr>
	                <tr>
	                  <td>1,011</td>
	                  <td>eget</td>
	                  <td>nulla</td>
	                  <td>Class</td>
	                  <td>aptent</td>
	                </tr>
	                <tr>
	                  <td>1,012</td>
	                  <td>taciti</td>
	                  <td>sociosqu</td>
	                  <td>ad</td>
	                  <td>litora</td>
	                </tr>
	                <tr>
	                  <td>1,013</td>
	                  <td>torquent</td>
	                  <td>per</td>
	                  <td>conubia</td>
	                  <td>nostra</td>
	                </tr>
	                <tr>
	                  <td>1,014</td>
	                  <td>per</td>
	                  <td>inceptos</td>
	                  <td>himenaeos</td>
	                  <td>Curabitur</td>
	                </tr>
	                <tr>
	                  <td>1,015</td>
	                  <td>sodales</td>
	                  <td>ligula</td>
	                  <td>in</td>
	                  <td>libero</td>
	                </tr>
	              </tbody>
	            </table>
	          </div>
	        </div>
	      </div>
	    </div>
  
  	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/jquery/dist/jquery.min.js"></script>
  	<script src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
  	
  	
  </body>
</html>