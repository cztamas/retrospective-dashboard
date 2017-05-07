package com.retrospective.controller.rest;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.retrospective.dao.ScrumTeamDao;
import com.retrospective.dao.SessionDao;
import com.retrospective.exception.AuthenticationException;
import com.retrospective.exception.DaoException;
import com.retrospective.model.ServerResponse;
import com.retrospective.model.scrummaster.ScrumTeam;
import com.retrospective.model.scrummaster.SessionInfoHead;
import com.retrospective.utils.AccountHelper;
import com.retrospective.utils.Constants;

@Controller
@RequestMapping("/rest/scrum-master")
public class ScrumMasterController {

	private SessionDao sessionDao;
	
	private ScrumTeamDao scrumTeamDao;
	
	@Autowired
	public void setSessionDao(SessionDao sessionDao) {
		this.sessionDao = sessionDao;
	}
	
	@Autowired
	public void setScrumTeamDao(ScrumTeamDao scrumTeamDao) {
		this.scrumTeamDao = scrumTeamDao;
	}
	
	@ResponseBody
	@RequestMapping(value = "/session", method = RequestMethod.GET)
	public ServerResponse getSessionInfoHeadList(HttpServletRequest request) {
		
		ServerResponse response = new ServerResponse();
		
		List<SessionInfoHead> sessionInfoList;
		try {
			sessionInfoList = this.sessionDao.getSessionHeads(AccountHelper.getUserId(request));
			response.setContent(sessionInfoList);
		} 
		catch (DaoException e) {
			e.printStackTrace();
			response.setErrorCode(Constants.ErrorCodes.DatabaseError.getCode());
			return response;
		}
		catch (AuthenticationException error) {
			response.setErrorCode(Constants.ErrorCodes.AuthenticationFailure.getCode());
			return response;
		}
	
		return response;
	}
	
	@ResponseBody
	@RequestMapping(value = "/scrum-team-list", method = RequestMethod.GET)
	public ServerResponse getScrumTeamList(HttpServletRequest request) {
		
		ServerResponse response = new ServerResponse();
		
		try {
			response.setContent(this.scrumTeamDao.getScrumTeams(AccountHelper.getUserId(request)));
		} 
		catch (DaoException e) {
			e.printStackTrace();
			response.setErrorCode(Constants.ErrorCodes.DatabaseError.getCode());
			return response;
		}
		catch (AuthenticationException error) {
			response.setErrorCode(Constants.ErrorCodes.AuthenticationFailure.getCode());
			return response;
		}
	
		return response;
	}
	
	@ResponseBody
	@RequestMapping(value = "/scrum-team/{scrumTeamId}", method = RequestMethod.DELETE)
	public ServerResponse deleteScrumTeam( @PathVariable(value="scrumTeamId") int scrumTeamId, HttpServletRequest request) {
		
		ServerResponse response = new ServerResponse();
		
		try {
			this.scrumTeamDao.delete(AccountHelper.getUserId(request), scrumTeamId);
		}
		catch (DaoException e) {
			e.printStackTrace();
			response.setErrorCode(Constants.ErrorCodes.DatabaseError.getCode());
			return response;
		}
		catch (AuthenticationException error) {
			response.setErrorCode(Constants.ErrorCodes.AuthenticationFailure.getCode());
			return response;
		}
		
		return response;
	}
	
	@ResponseBody
	@RequestMapping(value = "/scrum-team", method = RequestMethod.PUT)
	public ServerResponse storeScrumTeam(@RequestBody String scrumTeamName, HttpServletRequest request) {
		
		ServerResponse response = new ServerResponse();
		
		if (scrumTeamName == null || scrumTeamName.equals("")) {
			response.setErrorCode(Constants.ErrorCodes.ScrumTeamNameMissing.getCode());
			return response;
		}
		
		try {
			int userId = AccountHelper.getUserId(request);
			
			ScrumTeam scrumTeam = new ScrumTeam();
			scrumTeam.setName(scrumTeamName);
			scrumTeam.setUserId(userId);
			
			List<ScrumTeam> scrumTeams = this.scrumTeamDao.getScrumTeams(userId);
			int count = scrumTeams.stream()
					.filter(x -> x.getName().toUpperCase().equals(scrumTeamName.toUpperCase()))
					.collect(Collectors.toList())
					.size();
			
			if (count > 0) {
				response.setErrorCode(Constants.ErrorCodes.ScrumTeamAlreadyExist.getCode());
				return response;
			}
			
			this.scrumTeamDao.store(scrumTeam);
		} 
		catch (DaoException e) {
			e.printStackTrace();
			response.setErrorCode(Constants.ErrorCodes.DatabaseError.getCode());
			return response;
		}
		catch (AuthenticationException error) {
			response.setErrorCode(Constants.ErrorCodes.AuthenticationFailure.getCode());
			return response;
		}
	
		return response;
	}
}
