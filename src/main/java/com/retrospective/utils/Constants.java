package com.retrospective.utils;

public class Constants {
	
	public final static String WebRoot = "/retrospective-dashboard";
	
	public final static int OneYearInSeconds = 31556926;
	
	public enum Cookies {
		
		Token ("token"),
		Username ("username");
		
		private String name;
		
		Cookies(String name) {
			this.name = name;
		}
		
		public String getName() {
			return this.name();
		}
	}

	public enum ErrorCodes {
		
		CreateSessionFailed (1),
		GetSessionDetailsFailed (2),
		UnableToStoreSticker (3);
		
		private int code;
		
		ErrorCodes(int code) {
			this.code = code;
		}
		
		public int getCode() {
			return this.code;
		}
	}
	
}
