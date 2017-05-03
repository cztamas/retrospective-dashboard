package com.retrospective.controller.web;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.retrospective.controller.rest.AccountController;
import com.retrospective.dao.AccountDao;
import com.retrospective.model.AccountDetails;
import com.retrospective.utils.Constants;

@Controller 
public class AccountPageController {
	
	private AccountDao accountDao;
	
	@Autowired
	public void setHostDao(AccountDao accountDao) {
		this.accountDao = accountDao;
	}
	
	@RequestMapping(value = "/account/logout")
	public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {

		request.getSession().removeAttribute(AccountController.SESSION_KEY_ACCOUNT);
		
		response.sendRedirect(Constants.WebRoot);
	}
	
	@RequestMapping(value = "/account")
	public ModelAndView loggedInPage(HttpServletRequest request, HttpServletResponse response) throws IOException {

		ModelAndView modelView = new ModelAndView("logged-in-page");
		
		return modelView;
	}
	
	@RequestMapping(value = "/account/email-verification/{token}")
	public void verifyEmailAddress(@PathVariable(value="token") String token, HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			AccountDetails verifiedAccountDetails = accountDao.verifyAccount(token);
			
			request.getSession().setAttribute(AccountController.SESSION_KEY_ACCOUNT, verifiedAccountDetails);
			response.sendRedirect(Constants.WebRoot);
		}
		catch (Exception error) {
			error.printStackTrace();
		}
	}
	
	@RequestMapping(value = "/forgot-password")
	public ModelAndView forgotPasswordPage(HttpServletRequest request, HttpServletResponse response) throws IOException {

		ModelAndView modelView = new ModelAndView("forgot-password");
		
		return modelView;
	}
}
