package com.retrospective.utils;

import javax.servlet.http.Cookie;

public class CookieHelper {

	public static String getCookie(Cookie[] cookies, String name) {
		
		if (cookies == null) {
			return null;
		}
		
		for (Cookie cookie : cookies) {
			if (cookie.getName().equals(name)) {
				return cookie.getValue();
			}
		}
		
		return null;
	}
	
}
