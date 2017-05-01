<div ng-controller="user-list-widget" style="margin-left: 20px; top: 16px; position: relative;">
     <span 
     	ng-mouseover="onMouseOver(user.username)"
     	ng-mouseout="onMouseOut(user.username)"
     	ng-repeat="user in state.users | filter: activeUserFilter"
     	ng-class="[ 'board-participant', 'sticker-base', getUserClassname(user.username) ]">
		{{user.username}}
	</span>
	<span
		ng-mouseover="onMouseOver(username)"
     	ng-mouseout="onMouseOut(username)"
		ng-repeat="username in state.disconnectedStickerOwners"
     	ng-class="[ 'board-participant-inactive', 'sticker-base', getUserClassname(username) ]">
		{{username}}
	</span>
</div>