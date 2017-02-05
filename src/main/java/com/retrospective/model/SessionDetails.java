package com.retrospective.model;

public class SessionDetails {

	private String token;
	
	private int code;
	
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
	
	
}
