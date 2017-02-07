package com.retrospective.controller.rest;

import java.util.Hashtable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.retrospective.dao.ParticipantDao;
import com.retrospective.model.ServerResponse;
import com.retrospective.model.SessionDetails;
import com.retrospective.model.Sticker;
import com.retrospective.model.websocket.Participant;
import com.retrospective.model.websocket.ParticipantJoinedBroadcastMessage;
import com.retrospective.model.websocket.ParticipantJoinedMessage;
import com.retrospective.model.websocket.PublishStickerMessage;
import com.retrospective.utils.Constants;

@Controller
@RequestMapping("/rest/participant")
public class ParticipantController {

	/**
	 * TODO: purge all participants periodically where lastSeen is long enough
	 */
	private Hashtable<String, Participant> participants;
	
	private ParticipantDao participantDao;
	
	@Autowired
	public void setParticipantDao(ParticipantDao participantDao) {
		this.participantDao = participantDao;
	}
	
	@Autowired 
	private SimpMessagingTemplate simpMessagingTemplate;

	public ParticipantController() {
		participants = new Hashtable<String, Participant>();
	}

	@MessageMapping("/board/join/{code}/{token}")
    public void websocketJoin(@Payload ParticipantJoinedMessage message, @DestinationVariable("code") int code, @DestinationVariable("token") String token) throws Exception {
		
		ParticipantJoinedBroadcastMessage result = new ParticipantJoinedBroadcastMessage();
		result.setUsername(message.getUsername());

		synchronized (this.participants) {
			String participantKey = this.getParticipantKey(code, token, message.getId());
			if (participants.containsKey(participantKey)) {
				long lastSeen = System.currentTimeMillis() / 1000L;
				result.setKeepalive(true);
				result.setLastSeen(lastSeen);
				this.participants.get(participantKey).setLastSeen(lastSeen);
				simpMessagingTemplate.convertAndSend("/topic/join/" + code + "/" + token, result);
				return;
			}

			Participant participant = new Participant();
			participant.setParticipantDetails(message);
			participant.setSession(new SessionDetails(code, token));
			this.participants.put(participantKey, participant);

			result.setConnect(true);
			simpMessagingTemplate.convertAndSend("/topic/join/" + code + "/" + token, result);
			return;
		}
    }
	
	@MessageMapping("/board/sticker/{code}/{token}")
    public void websocketPublishSticker(@Payload PublishStickerMessage message, @DestinationVariable("code") int code, @DestinationVariable("token") String token) throws Exception {
		
    }
	
	@ResponseBody
	@RequestMapping(value = "/sticker/{code}/{token}", method = RequestMethod.POST)
	public ServerResponse serverMessage(@RequestBody Sticker sticker, @PathVariable(value="code") int code, @PathVariable(value="token") String token) {
		ServerResponse response = new ServerResponse();
		
		try {
			this.participantDao.storeSticker(sticker);
		}
		catch (Exception error) {
			error.printStackTrace();
			response.setErrorCode(Constants.ErrorCodes.UnableToStoreSticker.getCode());
		}
		
		return response;
	}

	private String getParticipantKey(int code, String token, String userId) {
		return String.format("%d_%s_%s", code, token, userId);
	}
}
