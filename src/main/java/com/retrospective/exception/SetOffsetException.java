package com.retrospective.exception;

public class SetOffsetException extends Exception {
	
	private static final long serialVersionUID = 1L;

	public SetOffsetException(String message, Exception inner) {
		super(message, inner);
	}
}
