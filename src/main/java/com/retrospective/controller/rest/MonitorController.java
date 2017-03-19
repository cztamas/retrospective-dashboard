package com.retrospective.controller.rest;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.retrospective.model.ActiveSessionList;
import com.retrospective.model.ServerResponse;
import com.retrospective.utils.Constants;

@Controller
@RequestMapping("/rest/monitor")
public class MonitorController {
	
	@Autowired
	private ActiveSessionList activeSessionList;

	@ResponseBody
	@RequestMapping(value = "", consumes = "application/json", method = RequestMethod.GET)
	public ServerResponse monitor(HttpServletRequest request) {
		
		ServerResponse response = new ServerResponse();
		
		if (!Constants.MonitorToken.equals(request.getHeader("Authorization"))) {
			response.setContent("Not Authorized");
			return response;
		}
		
		activeSessionList.purgeAll();
		response.setContent(activeSessionList);
		return response;
	}
}
