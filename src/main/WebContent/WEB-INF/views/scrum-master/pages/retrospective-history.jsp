<h1>Retrospective History</h1>

<div ng-controller="retrospective-history-page">

	<div class="table-responsive">
	<table class="table table-striped">
	    <thead>
	      <tr>
	        <th>Name</th>
	        <th>Date</th>
	        <th>Team</th>
	        <th>Participants</th>
	        <th>Feedbacks</th>
	        <th>Lock Status</th>
	        <th>Actions</th>
	      </tr>
	    </thead>
	    <tbody ng-repeat="session in state.sessions">
	      <tr>
	        <td><a href="<% out.print(com.retrospective.utils.Constants.WebRoot); %>/dashboard/{{session.code}}/{{session.token}}" target="retro-dashboard">{{session.name}}</a></td>
	        <td>{{session.startedAt}}</td>
	        <td>{{session.team}}</td>
	        <td>{{session.participantCount}}</td>
	        <td>{{session.feedbackCount}}</td>
	        <td>{{session.locked}}</td>
	        <td></td>
	      </tr>
	    </tbody>
	</table>
	</div>
</div>