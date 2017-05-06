<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    
    <title>Retrospective Dashboard - Forgot Password</title>

  </head>
  
  <body>
		 
	
		<br/>
		<form action="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/account/forgot-password/${resetToken}" method="POST">
			<table width="100%">
			<tr>
				<td width="20%">&nbsp;</td>
				<td colspan="2">
					<h2>Reset password for account <b>${email}</b></h2>	
				</td>
				<td width="20%">&nbsp;</td>
			</tr>
			<tr>
				<td width="20%">&nbsp;</td>
				<td width="180">New password: </td>
				<td><input type="password" name="newPassword1" style="width: 200px;" /></td>
				<td width="20%">&nbsp;</td>
			</tr>
			<tr>
				<td width="20%">&nbsp;</td>
				<td width="180">New password again: </td>
				<td><input type="password" name="newPassword2"  style="width: 200px;" /></td>
				<td width="20%">&nbsp;</td>
			</tr>
			<tr>
				<td width="20%">&nbsp;</td>
				<td width="180"></td>
				<td><input type="submit" value="Reset password"/></td>
				<td width="20%">&nbsp;</td>
			</tr>
			<tr>
				<td width="20%">&nbsp;</td>
				<td colspan="2">
					<c:if test="${error != null}">
						<span style="color: #ff0000;">${error}</span>
					</c:if>		
				</td>
				<td width="20%">&nbsp;</td>
			</tr>
			</table>
		</form>
		
  </body>
</html>