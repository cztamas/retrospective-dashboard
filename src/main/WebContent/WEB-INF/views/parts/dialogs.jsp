<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="dialog" title="Dashboard" style="display: none;">
 	<p>You can re-open this dashboard any time in the future with the following link:</p>
 	<textarea id='shareUrl' style="width: 95%" disabled></textarea><br/>
 	<button class="btn btn-primary btn-sm" onClick="Utils.copyToClipboard($('#shareUrl').val())">copy</button>
</div>

<div id="errorDialog" title="Error">
 	<p style="color: #ff0000;" id="errorMessage"></p>
</div>

<div id="sessionCommentDialog" title="Action Items" style="display: none;">
 	<span id="sessionCommentText"></span>
</div>

<%@ include file="widgets/session-settings.jsp" %>