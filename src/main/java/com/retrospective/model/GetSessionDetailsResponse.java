package com.retrospective.model;

import java.util.List;

import com.retrospective.utils.Constants;

public class GetSessionDetailsResponse extends ServerResponse {

	private List<Sticker> stickers;

	public List<Sticker> getStickers() {
		return stickers;
	}

	public void setStickers(List<Sticker> stickers) {
		this.stickers = stickers;
	}
	
	public static GetSessionDetailsResponse error() {
		
		GetSessionDetailsResponse response = new GetSessionDetailsResponse();
		response.setErrorCode(Constants.ErrorCodes.GetSessionDetailsFailed.getCode());
		
		return response;
	}
}
