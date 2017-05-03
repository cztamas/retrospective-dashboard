package com.retrospective.utils;

public class Constants {
	
	public static String Domain = "";
	public static String WebRoot = "";
	public static String MonitorToken = "";
	public static String DemoGsmUrl = "";
	public static String DemoBoardUrl = "";
	
	public final static String CookieWebRoot = "/";
	public final static int OneYearInSeconds = 31556926;
	
	public Constants(String domain, String webRoot, String monitorToken, String demoGsmUrl, String demoBoardUrl) {
		Domain = domain;
		WebRoot = webRoot;
		MonitorToken = monitorToken;
		DemoGsmUrl = String.format("%s%s", webRoot, demoGsmUrl);
		DemoBoardUrl = String.format("%s%s", webRoot, demoBoardUrl);
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
		AccessingToLockedSession (6),
		DatabaseError (7),
		AuthenticationFailure (8),
		AccountAlreadyExist (9),
		PasswordTooShort (10),
		InvalidEmailAddress (11),
		EmailNotVerified (12);
		
		private int code;
		
		ErrorCodes(int code) {
			this.code = code;
		}
		
		public int getCode() {
			return this.code;
		}
	}
	
}
