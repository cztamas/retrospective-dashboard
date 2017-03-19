package com.retrospective.utils;

public class Constants {
	
	public static String WebRoot = "";
	public static String MonitorToken = "";
	public final static String CookieWebRoot = "/";
	
	public final static int OneYearInSeconds = 31556926;
	
	public Constants(String webRoot, String monitorToken) {
		WebRoot = webRoot;
		MonitorToken = monitorToken;
	}
	
	public enum Cookies {
		
		Token ("token"),
		Username ("username");
		
		private String name;
		
		Cookies(String name) {
			this.name = name;
		}
		
		public String getName() {
			return this.name;
		}
	}

	public enum ErrorCodes {
		
		CreateSessionFailed (1),
		GetSessionDetailsFailed (2),
		UnableToStoreSticker (3),
		OffsetRegistrationError (4);
		
		private int code;
		
		ErrorCodes(int code) {
			this.code = code;
		}
		
		public int getCode() {
			return this.code;
		}
	}
	
}
