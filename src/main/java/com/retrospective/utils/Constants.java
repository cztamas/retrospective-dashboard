package com.retrospective.utils;

public class Constants {
	
	public static String WebRoot = "";
	public static String MonitorToken = "";
	public static String DemoGsmUrl = "";
	
	public final static String CookieWebRoot = "/";
	public final static int OneYearInSeconds = 31556926;
	
	public Constants(String webRoot, String monitorToken, String gsmCode, String gsmToken) {
		WebRoot = webRoot;
		MonitorToken = monitorToken;
		DemoGsmUrl = String.format("%s/dashboard/%s/%s", webRoot, gsmCode, gsmToken);
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
		OffsetRegistrationError (4),
		SessionParametersRegistrationError (5),
		AccessingToLockedSession(6);
		
		private int code;
		
		ErrorCodes(int code) {
			this.code = code;
		}
		
		public int getCode() {
			return this.code;
		}
	}
	
}
