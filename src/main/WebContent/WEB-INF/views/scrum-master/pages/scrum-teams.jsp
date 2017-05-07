<h1>Scrum Teams</h1>

<div ng-controller="scrum-teams-page">

	<div class="table-responsive">
	<table class="table table-striped">
	    <thead>
	      <tr>
	        <th>Name</th>
	        <th></th>
	      </tr>
	    </thead>
	    <tbody>
	      <tr ng-repeat="scrumTeam in state.scrumTeams">
	        <td><h4>{{scrumTeam.name}}</h4></td>
	        <td>
	        	
			  <button ng-click="removeScrumTeam(scrumTeam.id)" type="button" class="btn btn-sm btn-danger">Remove</button>
			
	        </td>
	      </tr>
	      
	      <tr>
	        <td><input type="text" class="form-control" id="new-scrum-team-name" style="width: 100%" /></td>
	        <td>
	        	<button ng-click="createScrumTeam()" type="button" class="btn btn-sm btn-success">Create</button>
	        </td>
	      </tr>
	    </tbody>
	</table>
	</div>
</div>