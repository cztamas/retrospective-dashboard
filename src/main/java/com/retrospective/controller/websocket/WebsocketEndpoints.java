package com.retrospective.controller.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.retrospective.model.websocket.ParticipantJoinedBroadcastMessage;
import com.retrospective.model.websocket.ParticipantJoinedMessage;
import com.retrospective.model.websocket.PublishStickerMessage;

@Controller
public class WebsocketEndpoints {

	@Autowired 
	private SimpMessagingTemplate simpMessagingTemplate;
	
	public WebsocketEndpoints() {
	}
	
	@MessageMapping("/board/join/{code}/{token}")
    public void websocketJoin(@Payload ParticipantJoinedMessage message, @DestinationVariable("code") int code, @DestinationVariable("token") String token) throws Exception {
		
		ParticipantJoinedBroadcastMessage result = new ParticipantJoinedBroadcastMessage();
		result.setUsername(message.getUsername());
		
		simpMessagingTemplate.convertAndSend(
				String.format("/topic/join/%s/%s", code, token), 
				result);
    }
	
	@MessageMapping("/board/sticker/{code}/{token}")
    public void websocketPublishSticker(@Payload PublishStickerMessage message, @DestinationVariable("code") int code, @DestinationVariable("token") String token) throws Exception {
		simpMessagingTemplate.convertAndSend(
				String.format("/topic/sticker/%s/%s", code, token), 
				message);
    }
}
