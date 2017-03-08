<div ng-controller="user-list-widget" style="margin-left: 20px; top: 16px; position: relative;">
     <span ng-repeat="user in state.users | filter: activeUserFilter" class="board-participant">
		<img width="18" height="18" src="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/resources/images/user.png" /> {{user.username}}
	</span>
</div>