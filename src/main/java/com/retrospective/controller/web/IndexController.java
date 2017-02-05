package com.retrospective.controller.web;

import java.io.IOException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.retrospective.utils.Constants;
import com.retrospective.utils.CookieHelper;

@Controller 
public class IndexController {
	
	@RequestMapping(value = "/")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response) throws IOException {

		ModelAndView modelView = new ModelAndView("index");
		
		return modelView;
	}
	
	@RequestMapping(value = "/start/{code}/{token}")
	public void start(@PathVariable(value="code") String code, @PathVariable(value="token") String token, HttpServletRequest request, HttpServletResponse response) throws IOException {

		Cookie tokenCookie = new Cookie(Constants.Cookies.Token.getName(), token);
		tokenCookie.setPath(Constants.WebRoot);
		tokenCookie.setMaxAge(Constants.OneYearInSeconds);
		response.addCookie(tokenCookie);
		
		response.sendRedirect(String.format("%s/start/%s", Constants.WebRoot, code));
	}
	
	@RequestMapping(value = "/start/{code}")
	public ModelAndView startWithCode(@PathVariable(value="code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException {

		String token = CookieHelper.getCookie(request.getCookies(), Constants.Cookies.Token.getName());
		
		if (token == null) {
			return new ModelAndView("session-timeout");
		}
		
		ModelAndView page = new ModelAndView("start");
		page.addObject("code", code);
		page.addObject("token", token);
		
		return page;
	}
	
	@RequestMapping(value = "/join/{code}/{token}")
	public void join(@PathVariable(value="code") String code, @PathVariable(value="token") String token, HttpServletRequest request, HttpServletResponse response) throws IOException {

		Cookie tokenCookie = new Cookie(Constants.Cookies.Token.getName(), token);
		tokenCookie.setPath(Constants.WebRoot);
		tokenCookie.setMaxAge(Constants.OneYearInSeconds);
		response.addCookie(tokenCookie);
		
		response.sendRedirect(String.format("%s/join/%s", Constants.WebRoot, code));
	}
	
	@RequestMapping(value = "/join/{code}")
	public ModelAndView joinWithCode(@PathVariable(value="code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException {

		String token = CookieHelper.getCookie(request.getCookies(), Constants.Cookies.Token.getName());
		
		if (token == null) {
			return new ModelAndView("session-timeout");
		}
		
		ModelAndView page = new ModelAndView("join");
		page.addObject("code", code);
		page.addObject("token", token);
		
		return page;
	}
}
