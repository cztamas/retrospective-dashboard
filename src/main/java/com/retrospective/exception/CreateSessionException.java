package com.retrospective.exception;

public class CreateSessionException extends Exception {

	private static final long serialVersionUID = 1L;

	public CreateSessionException(String message, Exception inner) {
		super(message, inner);
	}
	
}
