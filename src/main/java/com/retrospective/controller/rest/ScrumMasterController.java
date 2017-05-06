package com.retrospective.controller.rest;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.retrospective.dao.SessionDao;
import com.retrospective.exception.AuthenticationException;
import com.retrospective.exception.DaoException;
import com.retrospective.model.ServerResponse;
import com.retrospective.model.scrummaster.SessionInfoHead;
import com.retrospective.utils.AccountHelper;
import com.retrospective.utils.Constants;

@Controller
@RequestMapping("/rest/scrum-master")
public class ScrumMasterController {

	private SessionDao sessionDao;
	
	@Autowired
	public void setSessionDao(SessionDao sessionDao) {
		this.sessionDao = sessionDao;
	}
	
	@ResponseBody
	@RequestMapping(value = "/session", method = RequestMethod.GET)
	public ResponseEntity<ServerResponse> serverMessage(HttpServletRequest request) {
		
		ServerResponse response = new ServerResponse();
		
		List<SessionInfoHead> sessionInfoList;
		try {
			sessionInfoList = this.sessionDao.getSessionHeads(AccountHelper.getUserId(request));
			response.setContent(sessionInfoList);
		} 
		catch (DaoException e) {
			e.printStackTrace();
			response.setErrorCode(Constants.ErrorCodes.DatabaseError.getCode());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
		catch (AuthenticationException error) {
			response.setErrorCode(Constants.ErrorCodes.AuthenticationFailure.getCode());
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
		}
	
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}
}
