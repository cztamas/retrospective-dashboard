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

		ModelAndView modelView = new ModelAndView("init-page");
		
		return modelView;
	}
	
	@RequestMapping(value = "/dashboard/{code}/{token}")
	public ModelAndView dashboard(@PathVariable(value="code") String code, @PathVariable(value="token") String token, HttpServletRequest request, HttpServletResponse response) throws IOException {

		Cookie tokenCookie = new Cookie(Constants.Cookies.Token.getName(), token);
		tokenCookie.setPath(Constants.CookieWebRoot);
		tokenCookie.setMaxAge(Constants.OneYearInSeconds);
		response.addCookie(tokenCookie);
		
		ModelAndView page = new ModelAndView("board-page");
		page.addObject("code", code);
		page.addObject("token", token);
		page.addObject("isDashboard", true);
		
		return page;
	}
		
	@RequestMapping(value = "/start/{code}/{token}")
	public ModelAndView start(@PathVariable(value="code") String code, @PathVariable(value="token") String token, HttpServletRequest request, HttpServletResponse response) throws IOException {

		Cookie tokenCookie = new Cookie(Constants.Cookies.Token.getName(), token);
		tokenCookie.setPath(Constants.CookieWebRoot);
		tokenCookie.setMaxAge(Constants.OneYearInSeconds);
		response.addCookie(tokenCookie);
		
		ModelAndView page = new ModelAndView("board-page");
		page.addObject("code", code);
		page.addObject("token", token);
		page.addObject("isDashboard", false);
		
		return page;
	}
	
	@RequestMapping(value = "/join-mobile/{code}/{token}")
	public void join(@PathVariable(value="code") String code, @PathVariable(value="token") String token, HttpServletRequest request, HttpServletResponse response) throws IOException {

		Cookie tokenCookie = new Cookie(Constants.Cookies.Token.getName(), token);
		tokenCookie.setPath(Constants.CookieWebRoot);
		tokenCookie.setMaxAge(Constants.OneYearInSeconds);
		response.addCookie(tokenCookie);
		
		response.sendRedirect(String.format("%s/join-mobile/%s", Constants.WebRoot, code));
	}
	
	@RequestMapping(value = "/join-mobile/{code}")
	public ModelAndView joinWithCode(@PathVariable(value="code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException {

		String token = CookieHelper.getCookie(request.getCookies(), Constants.Cookies.Token.getName());
		
		if (token == null) {
			return new ModelAndView("session-timeout");
		}
		
		ModelAndView page = new ModelAndView("participant-mobile-page");
		page.addObject("code", code);
		page.addObject("token", token);
		
		return page;
	}
	
	@RequestMapping(value = "/join-web/{code}/{token}")
	public ModelAndView joinWebApp(@PathVariable(value="code") String code, @PathVariable(value="token") String token, HttpServletRequest request, HttpServletResponse response) throws IOException {

		Cookie tokenCookie = new Cookie(Constants.Cookies.Token.getName(), token);
		tokenCookie.setPath(Constants.CookieWebRoot);
		tokenCookie.setMaxAge(Constants.OneYearInSeconds);
		response.addCookie(tokenCookie);
		
		ModelAndView page = new ModelAndView("participant-web-page");
		page.addObject("code", code);
		page.addObject("token", token);
		
		return page;
	}
}
