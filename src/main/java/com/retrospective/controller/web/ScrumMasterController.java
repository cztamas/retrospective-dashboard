package com.retrospective.controller.web;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.retrospective.utils.AccountHelper;
import com.retrospective.utils.Constants;

@Controller 
public class ScrumMasterController {

	@RequestMapping(value = "/scrum-master")
	public ModelAndView loggedInPage(HttpServletRequest request, HttpServletResponse response) throws IOException {

		if (!AccountHelper.isLoggedIn(request)) {
			response.sendRedirect(Constants.WebRoot);
		}
		
		ModelAndView modelView = new ModelAndView("scrum-master/index");
		
		return modelView;
	}
	
}
