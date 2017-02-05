package com.retrospective.model.websocket;

import com.retrospective.model.SessionDetails;

public class Participant {

	private SessionDetails session;
	
	private ParticipantJoinedMessage participantDetails;

	public SessionDetails getSession() {
		return session;
	}

	public void setSession(SessionDetails session) {
		this.session = session;
	}

	public ParticipantJoinedMessage getParticipantDetails() {
		return participantDetails;
	}

	public void setParticipantDetails(ParticipantJoinedMessage participantDetails) {
		this.participantDetails = participantDetails;
	}
	
	
	
}
