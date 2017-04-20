<div ng-controller="user-list-widget" style="margin-left: 20px; top: 16px; position: relative;">
     <span 
     	ng-repeat="user in state.users | filter: activeUserFilter"
     	ng-click="revealUser(user.username)"
     	title="Reveal feedbacks from {{user.username}}"
     	ng-class="{'board-participant-revealed': state.revealedUsers[user.username], 'board-participant': !state.revealedUsers[user.username]}" >
		{{user.username}}
	</span>
</div>