package com.retrospective.controller.rest;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.retrospective.dao.HostDao;
import com.retrospective.exception.AuthorizationException;
import com.retrospective.exception.CreateSessionException;
import com.retrospective.exception.DaoException;
import com.retrospective.exception.SetOffsetException;
import com.retrospective.model.CreateSessionResponse;
import com.retrospective.model.GetSessionDetailsResponse;
import com.retrospective.model.ServerResponse;
import com.retrospective.model.SessionDetails;
import com.retrospective.model.SessionParameters;
import com.retrospective.utils.Constants;
import com.retrospective.utils.CookieHelper;
import com.retrospective.utils.ErrorLogger;

@Controller
@RequestMapping("/rest/host")
public class HostController {
	
	private HostDao hostDao;
	
	@Autowired
	public void setHostDao(HostDao hostDao) {
		this.hostDao = hostDao;
	}
	
	@ResponseBody
	@RequestMapping(value = "/session/{code}/params", consumes = "application/json", method = RequestMethod.POST)
	public ServerResponse setSessionParameters(@RequestBody SessionParameters parameters, @PathVariable(value="code") int code, HttpServletRequest request) {
		
		ServerResponse response = new ServerResponse();
		try {
			String token = CookieHelper.getCookie(request.getCookies(), Constants.Cookies.Token.getName());
			this.assertLockedSession(code, token);
			this.hostDao.setSessionParameters(code, token, parameters);
		}
		catch (AuthorizationException error) {
			response.setErrorCode(Constants.ErrorCodes.AccessingToLockedSession.getCode());
		}
		catch (DaoException error) {
			
			ErrorLogger.LogError(new SetOffsetException("Unable to store session parameters", error));
			response.setErrorCode(Constants.ErrorCodes.SessionParametersRegistrationError.getCode());
		}
		
		return response;
	}
	
	@ResponseBody
	@RequestMapping(value = "/session/{code}/offset", consumes = "application/json", method = RequestMethod.POST)
	public ServerResponse setOffsets(@RequestBody String offsets, @PathVariable(value="code") int code, HttpServletRequest request) {
		
		ServerResponse response = new ServerResponse();
		try {
			String token = CookieHelper.getCookie(request.getCookies(), Constants.Cookies.Token.getName());
			this.assertLockedSession(code, token);
			this.hostDao.setOffsets(code, token, offsets);
		}
		catch (AuthorizationException error) {
			response.setErrorCode(Constants.ErrorCodes.AccessingToLockedSession.getCode());
		}
		catch (DaoException error) {
			
			ErrorLogger.LogError(new SetOffsetException("Unable to store offsets", error));
			response.setErrorCode(Constants.ErrorCodes.OffsetRegistrationError.getCode());
		}
		
		return response;
	}

	@ResponseBody
	@RequestMapping(value = "/session", consumes = "application/json", method = RequestMethod.POST)
	public CreateSessionResponse createSession(@RequestBody int boardType) {
		
		try {
			SessionDetails sessionDetails = this.hostDao.createSession(boardType);
			
			CreateSessionResponse result = new CreateSessionResponse();
			result.setSessionDetails(sessionDetails);
			
			return result;
		}
		catch (DaoException error) {
			
			ErrorLogger.LogError(new CreateSessionException("Unable to create session", error));
			return CreateSessionResponse.error();	
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "/session/{code}", method = RequestMethod.GET)
	public GetSessionDetailsResponse getSessionDetails(@PathVariable(value="code") int code, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		try {
			GetSessionDetailsResponse result = new GetSessionDetailsResponse();
			String token = CookieHelper.getCookie(request.getCookies(), Constants.Cookies.Token.getName());
			
			result.setStickers(this.hostDao.getSessionStickers(code, token));
			result.setOffsetSettings(this.hostDao.getOffsetSettings(code, token));
			result.setSessionParameters(this.hostDao.getSessionParameters(code, token));
			result.setLocked(this.hostDao.getSessionDetails(code, token).isLocked());
			
			return result;
		}
		catch (AuthorizationException error) {
			response.sendError(403, "Invalid token");
			return null;
		}
		catch (DaoException error) {
			
			ErrorLogger.LogError(new CreateSessionException("Unable to fetch session details (notes and offsets)", error));
			return GetSessionDetailsResponse.error();	
		}
	}
	
	private void assertLockedSession(int code, String token) throws AuthorizationException, DaoException {
		if (this.hostDao.getSessionDetails(code, token).isLocked()) {
			throw new AuthorizationException("Session has been locked.");
		}
	}
}
