<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div ng-controller="account-widget" id="exTab2" class="container" style="width: 350px;">	
	<ul class="nav nav-tabs">
		<li class="active"><a  href="#1" data-toggle="tab">Login</a></li>
		<li><a href="#2" data-toggle="tab">Sign Up</a></li>
		<li><a href="#3" data-toggle="tab">Forgot Password</a></li>
	</ul>
	
	<div class="tab-content ">
		<div class="tab-pane active" id="1">
        	
        	<c:if test="${isLoggedIn == true}">
        		<br/>
        		You are already logged in as <b>${accountDetails.email}</b><br/><br/>
        		
        		<a href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/account">Account Page</a> | <a href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/account/logout">Logout</a> 
        		
        	</c:if>
        	
        	<c:if test="${isLoggedIn == false}">
	        	<table width="100%">
					<tr>
						<td colspan="2">
							<br/>
								<span style="font-size: 9pt; color: #888888;">Registered users have more features: retrospective session <b>listing</b> grouped by 
								<b>scrum teams</b>, session <b>locking</b>, and more ...</span> 
							<br/>
							<br/>
						</td>
					</tr>
					<tr style="height: 40px;">
						<td align="right" width="10%" style="padding-right: 30px;">Email:</td>
						<td valign="top" width="80%" style="padding-right: 10px;">
							<input id="login-email" type="text" class="input-group-sm form-control" placeholder="Email Address" aria-describedby="sizing-addon3">
						</td>
					</tr>
					<tr style="height: 40px;">
						<td align="right" width="10%" style="padding-right: 30px;">Password:</td>
						<td valign="top" width="80%" style="padding-right: 10px;">
							<input id="login-password" type="password" class="input-group-sm form-control" placeholder="Password" aria-describedby="sizing-addon3">
						</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td valign="top" width="10%" align="right" style="padding-right: 10px;">
							<button ng-click="login()" class="btn btn-default">Login</button>
						</td>
					</tr>
				</table>
        	</c:if>
        	
		</div>
		<div class="tab-pane" id="2">
	    	<table width="100%">
				<tr>
					<td colspan="2">
						<br/>
							<span style="font-size: 9pt; color: #888888;">Registered users have more features: retrospective session <b>listing</b> grouped by 
							<b>scrum teams</b>, session <b>locking</b>, and more ...</span> 
						<br/>
						<br/>
					</td>
				</tr>
				<tr style="height: 40px;">
					<td align="right" width="10%" style="padding-right: 30px;">Email:</td>
					<td valign="top" width="80%" style="padding-right: 10px;">
						<input id="register-email" type="text" class="input-group-sm form-control" placeholder="Email Address" aria-describedby="sizing-addon3">
					</td>
				</tr>
				<tr style="height: 40px;">
					<td align="right" width="10%" style="padding-right: 30px;">Password:</td>
					<td valign="top" width="80%" style="padding-right: 10px;">
						<input id="register-password1" type="password" class="input-group-sm form-control" placeholder="Password" aria-describedby="sizing-addon3">
					</td>
				</tr>
				<tr style="height: 40px;">
					<td align="right" width="10%" style="padding-right: 30px;">Password Again:</td>
					<td valign="top" width="80%" style="padding-right: 10px;">
						<input id="register-password2" type="password" class="input-group-sm form-control" placeholder="Password Again" aria-describedby="sizing-addon3">
					</td>
				</tr>
				<tr>
					<td>&nbsp;</td>
					<td valign="top" width="10%" align="right" style="padding-right: 10px;">
						<button ng-click="register()" class="btn btn-default">Register</button>
					</td>
				</tr>
			</table>
		</div>
	    <div class="tab-pane" id="3">
	    	
		</div>
	</div>
  </div>