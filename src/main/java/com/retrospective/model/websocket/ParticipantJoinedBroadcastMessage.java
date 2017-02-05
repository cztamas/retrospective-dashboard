package com.retrospective.model.websocket;

public class ParticipantJoinedBroadcastMessage {

	private boolean isKeepalive;
	
	private boolean isConnect;
	
	private String username;

	private long lastSeen;
	
	private long serverTime;
	
	public boolean isKeepalive() {
		return isKeepalive;
	}

	public void setKeepalive(boolean isKeepalive) {
		this.isKeepalive = isKeepalive;
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

	public long getLastSeen() {
		return lastSeen;
	}

	public void setLastSeen(long lastSeen) {
		this.lastSeen = lastSeen;
	}

	public long getServerTime() {
		return serverTime;
	}

	public void setServerTime(long serverTime) {
		this.serverTime = serverTime;
	}
	
	
}
