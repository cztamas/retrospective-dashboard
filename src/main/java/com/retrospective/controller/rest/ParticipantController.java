package com.retrospective.controller.rest;

import java.util.HashSet;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.retrospective.dao.HostDao;
import com.retrospective.dao.ParticipantDao;
import com.retrospective.exception.AuthorizationException;
import com.retrospective.exception.DaoException;
import com.retrospective.model.ServerResponse;
import com.retrospective.model.SessionDetails;
import com.retrospective.model.Sticker;
import com.retrospective.utils.Constants;

@Controller
@RequestMapping("/rest/participant")
public class ParticipantController {
	
	private HostDao hostDao;
	
	private ParticipantDao participantDao;
	
	@Autowired
	public void setHostDao(HostDao hostDao) {
		this.hostDao = hostDao;
	}
	
	@Autowired
	public void setParticipantDao(ParticipantDao participantDao) {
		this.participantDao = participantDao;
	}

	@ResponseBody
	@RequestMapping(value = "/sticker/{code}/{token}", method = RequestMethod.POST)
	public ServerResponse serverMessage(@RequestBody List<Sticker> stickers, @PathVariable(value="code") int code, @PathVariable(value="token") String token) {
		ServerResponse response = new ServerResponse();
		
		Random r = new Random();
		
		HashSet<String> validatedSessions = new HashSet<String>();
		stickers.forEach((sticker) -> {
			
			sticker.setTransform(r.nextInt(30) - 15);
			
			try {
				
				// validate session only once
				String key = String.format("%s-%s", sticker.getSessionCode(), sticker.getSessionToken());
				if (!validatedSessions.contains(key)) {
					SessionDetails sessionDetails = hostDao.getSessionDetails(sticker.getSessionCode(), sticker.getSessionToken());
					if (sessionDetails.isLocked()) {
						throw new AuthorizationException("Attempted to insert sticker, but session is locked.");
					}	
				}
				
				validatedSessions.add(key);
				participantDao.storeSticker(sticker);
				
			} catch (DaoException error) {
				error.printStackTrace();
				response.setErrorCode(Constants.ErrorCodes.UnableToStoreSticker.getCode());
			} catch (AuthorizationException e) {
				e.printStackTrace();
				response.setErrorCode(Constants.ErrorCodes.AccessingToLockedSession.getCode());
			}	
		});
	
		return response;
	}
}
