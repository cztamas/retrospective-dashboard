package com.retrospective.exception;

public class DaoException extends Exception {

	private static final long serialVersionUID = 1L;
	
	public DaoException(String message, Exception inner) {
		super(message, inner);
	}

}
