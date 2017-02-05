package com.retrospective.model.websocket;

public class ParticipantJoinedBroadcastMessage {

	private boolean isReconnect;
	
	private boolean isConnect;
	
	private String username;

	public boolean isReconnect() {
		return isReconnect;
	}

	public void setReconnect(boolean isReconnect) {
		this.isReconnect = isReconnect;
	}

	public boolean isConnect() {
		return isConnect;
	}

	public void setConnect(boolean isConnect) {
		this.isConnect = isConnect;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	
}
