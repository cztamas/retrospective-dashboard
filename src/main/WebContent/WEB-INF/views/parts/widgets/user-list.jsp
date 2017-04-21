<div ng-controller="user-list-widget" style="margin-left: 20px; top: 16px; position: relative;">
     <span 
     	ng-repeat="user in state.users | filter: activeUserFilter"
     	class="board-participant">
		{{user.username}}
	</span>
</div>