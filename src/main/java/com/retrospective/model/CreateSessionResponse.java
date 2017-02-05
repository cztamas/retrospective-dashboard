package com.retrospective.model;

import com.retrospective.utils.Constants;

public class CreateSessionResponse extends ServerResponse {

	private SessionDetails sessionDetails;
	
	public SessionDetails getSessionDetails() {
		return sessionDetails;
	}

	public void setSessionDetails(SessionDetails sessionDetails) {
		this.sessionDetails = sessionDetails;
	}

	public static CreateSessionResponse error() {
		
		CreateSessionResponse response = new CreateSessionResponse();
		response.setErrorCode(Constants.ErrorCodes.CreateSessionFailed.getCode());
		
		return response;
	}
}
