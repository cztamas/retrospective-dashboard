package com.retrospective.model.websocket;

import java.util.List;

import com.retrospective.model.Sticker;

public class PublishStickerMessage {

	private List<Sticker> stickers;

	public List<Sticker> getStickers() {
		return stickers;
	}

	public void setStickers(List<Sticker> stickers) {
		this.stickers = stickers;
	}
	
	
}
