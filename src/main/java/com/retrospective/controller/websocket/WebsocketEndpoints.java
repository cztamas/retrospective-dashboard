package com.retrospective.controller.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.retrospective.dao.HostDao;
import com.retrospective.exception.AuthorizationException;
import com.retrospective.exception.DaoException;
import com.retrospective.model.ActiveSessionList;
import com.retrospective.model.websocket.ParticipantJoinedBroadcastMessage;
import com.retrospective.model.websocket.ParticipantJoinedMessage;
import com.retrospective.model.websocket.PublishStickerMessage;
import com.retrospective.utils.ErrorLogger;

@Controller
public class WebsocketEndpoints {

	@Autowired 
	private SimpMessagingTemplate simpMessagingTemplate;
	
	@Autowired
	private ActiveSessionList activeSessionList;
	
	@Autowired
	private HostDao hostDao;
	
	private Object activeSessionLock = new Object();
	
	public WebsocketEndpoints() {
	}
	
	/**
	 * Called when a participant sends keepalive message. Dashboard is subscribed to this event, to maintain user list widget.
	 */
	@MessageMapping("/board/join/{code}/{token}")
    public void websocketJoin(@Payload ParticipantJoinedMessage message, @DestinationVariable("code") int code, @DestinationVariable("token") String token) throws Exception {
		
		try {
			this.assertLockedSession(code, token);	
		}
		catch (AuthorizationException error) {
			// do not panic, someone just tried to join the demo dashboard
			return;
		}
		
		ParticipantJoinedBroadcastMessage result = new ParticipantJoinedBroadcastMessage();
		result.setUsername(message.getUsername());
		
		try {
			synchronized(activeSessionLock) {
				activeSessionList.add(token);	
			}
		}
		catch (Exception error) {
			ErrorLogger.LogError(error);
		}
		
		simpMessagingTemplate.convertAndSend(
				String.format("/topic/join/%s/%s", code, token), 
				result);
    }
	
	/**
	 * Called when a participant is publishing a sticker on a session. Dashboard is responsible to reload the board once new sticker is published.
	 */
	@MessageMapping("/board/sticker/{code}/{token}")
    public void websocketPublishSticker(@Payload PublishStickerMessage message, @DestinationVariable("code") int code, @DestinationVariable("token") String token) throws Exception {
		
		try {
			this.assertLockedSession(code, token);	
		}
		catch (AuthorizationException error) {
			// do not panic, someone just tried to join the demo dashboard
			return;
		}
		
		simpMessagingTemplate.convertAndSend(
				String.format("/topic/sticker/%s/%s", code, token), 
				message);
    }
	
	private void assertLockedSession(int code, String token) throws AuthorizationException, DaoException {
		if (this.hostDao.getSessionDetails(code, token).isLocked()) {
			throw new AuthorizationException("Session has been locked.");
		}
	}
}
