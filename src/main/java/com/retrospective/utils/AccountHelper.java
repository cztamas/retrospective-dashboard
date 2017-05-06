package com.retrospective.utils;

import javax.servlet.http.HttpServletRequest;

import com.retrospective.exception.AuthenticationException;
import com.retrospective.exception.PasswordValidationException;
import com.retrospective.model.AccountDetails;

public class AccountHelper {
	
	public final static String SESSION_KEY_ACCOUNT = "AccountDetails";

	public static void validatePassword(String password) throws PasswordValidationException {
		if (password == null || password.length() < 6) {
			throw new PasswordValidationException("Password is too short - it should be at least 6 characters", Constants.ErrorCodes.PasswordTooShort.getCode());
		}
	}
	
	public static void logUserIn(AccountDetails accountDetails, HttpServletRequest request) {
		request.getSession().setAttribute(SESSION_KEY_ACCOUNT, accountDetails);	
	}
	
	public static void logUserOut(HttpServletRequest request) {
		request.getSession().removeAttribute(SESSION_KEY_ACCOUNT);
	}
	
	public static boolean isLoggedIn(HttpServletRequest request) {
		return getLoggedInAccountDetails(request) != null;
	}
	
	public static AccountDetails getLoggedInAccountDetails(HttpServletRequest request) {
		if (request.getSession().getAttribute(SESSION_KEY_ACCOUNT) == null) {
			return null;
		}
		
		return (AccountDetails) request.getSession().getAttribute(SESSION_KEY_ACCOUNT);
	}
	
	public static int getUserId(HttpServletRequest request) throws AuthenticationException {
		if (!isLoggedIn(request)) {
			throw new AuthenticationException("User is not authenticated, session may be expired.");
		}
		
		return getLoggedInAccountDetails(request).getId();
	}
}
