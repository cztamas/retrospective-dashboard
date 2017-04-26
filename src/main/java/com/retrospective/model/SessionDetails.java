package com.retrospective.model;

/**
 * Represents all session properties that the user can not modify.
 */
public class SessionDetails {

	private String token;
	
	private int code;
	
	private int dashboardType;
	
	private boolean isLocked;
	
	public SessionDetails() {
		
	}
	
	public SessionDetails(int code, String token) {
		this.code = code;
		this.token = token;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public int getDashboardType() {
		return dashboardType;
	}

	public void setDashboardType(int dashboardType) {
		this.dashboardType = dashboardType;
	}

	public boolean isLocked() {
		return isLocked;
	}

	public void setLocked(boolean isLocked) {
		this.isLocked = isLocked;
	}
	
}
