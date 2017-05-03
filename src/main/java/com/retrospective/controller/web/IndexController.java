package com.retrospective.controller.web;

import java.io.IOException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

import com.retrospective.controller.rest.AccountController;
import com.retrospective.dao.HostDao;
import com.retrospective.exception.DaoException;
import com.retrospective.model.AccountDetails;
import com.retrospective.model.SessionDetails;
import com.retrospective.utils.Constants;
import com.retrospective.utils.CookieHelper;

@Controller 
public class IndexController {
	
	private HostDao hostDao;
	
	@Autowired
	public void setHostDao(HostDao hostDao) {
		this.hostDao = hostDao;
	}
	
	@RequestMapping(value = "/")
	public ModelAndView index(HttpServletRequest request, HttpServletResponse response) throws IOException {

		ModelAndView modelView = new ModelAndView("init-page");
		modelView.addObject("isInitPage", true);
		modelView.addObject("isLoggedIn", this.getLoggedInAccountDetails(request) != null);
		modelView.addObject("accountDetails", this.getLoggedInAccountDetails(request));
		
		return modelView;
	}
	
	@RequestMapping(value = "/dashboard/{code}/{token}")
	public ModelAndView dashboard(@PathVariable(value="code") String code, @PathVariable(value="token") String token, HttpServletRequest request, HttpServletResponse response) throws IOException, NumberFormatException, DaoException {

		Cookie tokenCookie = new Cookie(Constants.Cookies.Token.getName(), token);
		tokenCookie.setPath(Constants.CookieWebRoot);
		tokenCookie.setMaxAge(Constants.OneYearInSeconds);
		response.addCookie(tokenCookie);
		
		SessionDetails details = this.hostDao.getSessionDetails(Integer.parseInt(code), token);
		
		ModelAndView page = new ModelAndView("board-page");
		page.addObject("code", code);
		page.addObject("token", token);
		page.addObject("isDashboard", true);
		page.addObject("boardType", details.getDashboardType());
		
		return page;
	}
		
	@RequestMapping(value = "/start/{code}/{token}")
	public ModelAndView start(@PathVariable(value="code") String code, @PathVariable(value="token") String token, HttpServletRequest request, HttpServletResponse response) throws IOException, NumberFormatException, DaoException {

		Cookie tokenCookie = new Cookie(Constants.Cookies.Token.getName(), token);
		tokenCookie.setPath(Constants.CookieWebRoot);
		tokenCookie.setMaxAge(Constants.OneYearInSeconds);
		response.addCookie(tokenCookie);
		
		SessionDetails details = this.hostDao.getSessionDetails(Integer.parseInt(code), token);
		
		ModelAndView page = new ModelAndView("board-page");
		page.addObject("code", code);
		page.addObject("token", token);
		page.addObject("isDashboard", false);
		page.addObject("boardType", details.getDashboardType());
		
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
	public ModelAndView joinWithCode(@PathVariable(value="code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException, NumberFormatException, DaoException {

		String token = CookieHelper.getCookie(request.getCookies(), Constants.Cookies.Token.getName());
		
		if (token == null) {
			return new ModelAndView("session-timeout");
		}
		
		SessionDetails details = this.hostDao.getSessionDetails(Integer.parseInt(code), token);
		
		ModelAndView page = new ModelAndView("participant-mobile-page");
		page.addObject("code", code);
		page.addObject("token", token);
		page.addObject("isParticipant", true);
		page.addObject("isMobile", true);
		page.addObject("boardType", details.getDashboardType());
		
		return page;
	}
	
	@RequestMapping(value = "/join-web/{code}/{token}")
	public ModelAndView joinWebApp(@PathVariable(value="code") String code, @PathVariable(value="token") String token, HttpServletRequest request, HttpServletResponse response) throws IOException, NumberFormatException, DaoException {

		Cookie tokenCookie = new Cookie(Constants.Cookies.Token.getName(), token);
		tokenCookie.setPath(Constants.CookieWebRoot);
		tokenCookie.setMaxAge(Constants.OneYearInSeconds);
		response.addCookie(tokenCookie);
		
		SessionDetails details = this.hostDao.getSessionDetails(Integer.parseInt(code), token);
		
		ModelAndView page = new ModelAndView("participant-web-page");
		page.addObject("code", code);
		page.addObject("token", token);
		page.addObject("isParticipant", true);
		page.addObject("isMobile", false);
		page.addObject("boardType", details.getDashboardType());
		
		return page;
	}
	
	@ExceptionHandler(NumberFormatException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public String handleNumberFormatException(NumberFormatException ex) {
		return ex.getMessage();
	}
	
	@ExceptionHandler(DaoException.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public String handleDaoException(DaoException ex) {
		return ex.getMessage();
	}
	
	private AccountDetails getLoggedInAccountDetails(HttpServletRequest request) {
		if (request.getSession() == null) {
			return null;
		}
		
		if (request.getSession().getAttribute(AccountController.SESSION_KEY_ACCOUNT) != null) {
			return (AccountDetails) request.getSession().getAttribute(AccountController.SESSION_KEY_ACCOUNT);
		}
		
		return null;
	}
}
