package com.retrospective.exception;

public class PasswordValidationException extends Exception {

	private static final long serialVersionUID = 1L;
	
	public PasswordValidationException(String message, int code) {
		super(message);
		this.errorCode = code;
	}
	
	public int errorCode;

	public int getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}
	
	
	
}
