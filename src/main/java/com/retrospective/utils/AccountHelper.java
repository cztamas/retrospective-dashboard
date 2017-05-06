package com.retrospective.utils;

import com.retrospective.exception.PasswordValidationException;

public class AccountHelper {

	public static void validatePassword(String password) throws PasswordValidationException {
		if (password == null || password.length() < 6) {
			throw new PasswordValidationException("Password is too short - it should be at least 6 characters", Constants.ErrorCodes.PasswordTooShort.getCode());
		}
	}
	
}
