package com.retrospective.controller.web;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.retrospective.dao.AccountDao;
import com.retrospective.exception.AccountNotFoundException;
import com.retrospective.exception.DaoException;
import com.retrospective.exception.PasswordMismatchException;
import com.retrospective.exception.PasswordValidationException;
import com.retrospective.model.AccountDetails;
import com.retrospective.utils.AccountHelper;
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

		AccountHelper.logUserOut(request);
		
		response.sendRedirect(Constants.WebRoot);
	}
	
	@RequestMapping(value = "/account")
	public ModelAndView loggedInPage(HttpServletRequest request, HttpServletResponse response) throws IOException {

		ModelAndView modelView = new ModelAndView("logged-in-page");
		
		return modelView;
	}
	
	@RequestMapping(value = "/account/email-verification/{token}")
	public void verifyEmailAddress(@PathVariable(value="token") String verificationToken, HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			AccountDetails verifiedAccountDetails = accountDao.verifyAccount(verificationToken);
			
			AccountHelper.logUserIn(verifiedAccountDetails, request);
			response.sendRedirect(Constants.WebRoot);
		}
		catch (Exception error) {
			error.printStackTrace();
		}
	}
	
	@RequestMapping(value = "/account/forgot-password/{token}", method = RequestMethod.GET)
	public ModelAndView forgotPassword(@PathVariable(value="token") String resetToken, HttpServletRequest request, HttpServletResponse response) throws IOException {

		ModelAndView modelView = new ModelAndView("account/reset-forgot-password");
		modelView.addObject("resetToken", resetToken);
		
		try {
			AccountDetails accountDetails = this.accountDao.getAccountByResetPasswordToken(resetToken);
			if (accountDetails == null) {
				throw new AccountNotFoundException(String.format("Account not found with reset token is %s", resetToken));
			}
			
			modelView.addObject("email", accountDetails.getEmail());
		}
		catch (DaoException error) {
			modelView.addObject("error", "Database Error");
		}
		catch (AccountNotFoundException error) {
			modelView.addObject("error", error.getMessage());
		}
		
		return modelView;
	}
	
	@RequestMapping(value = "/account/forgot-password/{token}", method = RequestMethod.POST)
	public ModelAndView resetForgotPassword(@PathVariable(value="token") String resetToken, HttpServletRequest request, HttpServletResponse response) throws IOException {

		ModelAndView modelView = new ModelAndView("account/reset-forgot-password");
		modelView.addObject("resetToken", resetToken);
		
		try {
			AccountDetails accountDetails = this.accountDao.getAccountByResetPasswordToken(resetToken);
			if (accountDetails == null) {
				throw new AccountNotFoundException(String.format("Account not found with reset token is %s", resetToken));
			}
			
			if (request.getParameter("newPassword1") == null || !request.getParameter("newPassword1").equals(request.getParameter("newPassword2"))) {
				throw new PasswordMismatchException("Password mismatch on reset password operation");
			}
			
			String password = request.getParameter("newPassword1");
			AccountHelper.validatePassword(password);
			
			this.accountDao.resetPassword(accountDetails.getId(), password);	
			response.sendRedirect(Constants.WebRoot);
		}
		catch (DaoException error) {
			modelView.addObject("error", "Database error");
		}
		catch (PasswordValidationException | AccountNotFoundException | PasswordMismatchException error) {
			modelView.addObject("error", error.getMessage());
		}
		
		return modelView;
	}
}
