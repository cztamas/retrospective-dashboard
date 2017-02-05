package com.retrospective.controller.rest;

import java.util.Hashtable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.retrospective.model.SessionDetails;
import com.retrospective.model.websocket.Participant;
import com.retrospective.model.websocket.ParticipantJoinedBroadcastMessage;
import com.retrospective.model.websocket.ParticipantJoinedMessage;

@Controller
public class ParticipantController {

	/**
	 * TODO: purge all participants periodically where lastSeen is long enough
	 */
	private Hashtable<String, Participant> participants;
	
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

	private String getParticipantKey(int code, String token, String userId) {
		return String.format("%d_%s_%s", code, token, userId);
	}
}
