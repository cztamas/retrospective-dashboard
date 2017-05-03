package com.retrospective.controller.rest;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.retrospective.dao.AccountDao;
import com.retrospective.exception.AccountAlreadyExistsException;
import com.retrospective.exception.DaoException;
import com.retrospective.external.EmailSender;
import com.retrospective.model.AccountDetails;
import com.retrospective.model.LoginRequest;
import com.retrospective.model.RegistrationRequest;
import com.retrospective.model.ServerResponse;
import com.retrospective.utils.Constants;

@Controller
@RequestMapping("/rest/account")
public class AccountController {

	public final static String SESSION_KEY_ACCOUNT = "AccountDetails";
	
	private AccountDao accountDao;
	
	private EmailSender emailSender;
	
	@Autowired
	public void setHostDao(AccountDao accountDao) {
		this.accountDao = accountDao;
	}
	
	@Autowired
	public void setEmailSender(EmailSender emailSender) {
		this.emailSender = emailSender;
	}
	
	@ResponseBody
	@RequestMapping(value = "/login", consumes = "application/json", method = RequestMethod.POST)
	public ServerResponse login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
		
		ServerResponse response = new ServerResponse();
		
		try {
			AccountDetails accountDetails = this.accountDao.getAccount(loginRequest.getEmail(), loginRequest.getPassword());
			
			if (accountDetails == null) {
				response.setErrorCode(Constants.ErrorCodes.AuthenticationFailure.getCode());
				return response;
			}
			
			if (!accountDetails.isEmailVerified()) {
				response.setErrorCode(Constants.ErrorCodes.EmailNotVerified.getCode());
				return response;
			}
			
			request.getSession().setAttribute(SESSION_KEY_ACCOUNT, accountDetails);
		}
		catch (DaoException error) {
			response.setErrorCode(Constants.ErrorCodes.DatabaseError.getCode());
		}
		
		return response;
	}
	
	@ResponseBody
	@RequestMapping(value = "/registration", consumes = "application/json", method = RequestMethod.POST)
	public ServerResponse register(@RequestBody RegistrationRequest registrationRequest, HttpServletRequest request) {
		
		ServerResponse response = new ServerResponse();
		
		if (registrationRequest.getPassword() == null || registrationRequest.getPassword().length() < 6) {
			response.setErrorCode(Constants.ErrorCodes.PasswordTooShort.getCode());
			return response;
		}
		
		if (registrationRequest.getEmail() == null || registrationRequest.getEmail().length() == 0 || !registrationRequest.getEmail().contains("@")) {
			response.setErrorCode(Constants.ErrorCodes.InvalidEmailAddress.getCode());
			return response;
		}
		
		try {
			
			AccountDetails accountDetails = this.accountDao.register(
					registrationRequest.getEmail(), 
					registrationRequest.getPassword(),
					request.getRemoteAddr());
			
			this.emailSender.sendAccountVerification(accountDetails.getEmail(), accountDetails.getVerificationToken());
		}
		catch (DaoException error) {
			response.setErrorCode(Constants.ErrorCodes.DatabaseError.getCode());
		} catch (AccountAlreadyExistsException e) {
			response.setErrorCode(Constants.ErrorCodes.AccountAlreadyExist.getCode());
		}
		
		return response;
	}
	
	
}
