package com.retrospective.controller.rest;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.retrospective.dao.HostDao;
import com.retrospective.exception.AuthorizationException;
import com.retrospective.exception.CreateSessionException;
import com.retrospective.exception.DaoException;
import com.retrospective.model.CreateSessionResponse;
import com.retrospective.model.GetSessionDetailsResponse;
import com.retrospective.model.SessionDetails;
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
	@RequestMapping(value = "/session", consumes = "application/json", method = RequestMethod.POST)
	public CreateSessionResponse createSession() {
		
		try {
			SessionDetails sessionDetails = this.hostDao.createSession();
			
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
			result.setStickers(this.hostDao.getSessionStickers(
					code, 
					CookieHelper.getCookie(request.getCookies(), Constants.Cookies.Token.getName())));
			
			return result;
		}
		catch (AuthorizationException error) {
			response.sendError(403, "Invalid token");
			return null;
		}
		catch (DaoException error) {
			
			ErrorLogger.LogError(new CreateSessionException("Unable to create session", error));
			return GetSessionDetailsResponse.error();	
		}
	}
}
