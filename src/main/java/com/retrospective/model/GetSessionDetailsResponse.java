package com.retrospective.model;

import java.util.List;

import com.retrospective.utils.Constants;

public class GetSessionDetailsResponse extends ServerResponse {

	private List<Sticker> stickers;
	
	private String offsetSettings;
	
	private SessionParameters sessionParameters;
	
	private boolean isLocked;

	public List<Sticker> getStickers() {
		return stickers;
	}

	public void setStickers(List<Sticker> stickers) {
		this.stickers = stickers;
	}
	
	public String getOffsetSettings() {
		return offsetSettings;
	}

	public void setOffsetSettings(String offsetSettings) {
		this.offsetSettings = offsetSettings;
	}

	public SessionParameters getSessionParameters() {
		return sessionParameters;
	}

	public void setSessionParameters(SessionParameters sessionParameters) {
		this.sessionParameters = sessionParameters;
	}

	public boolean isLocked() {
		return isLocked;
	}

	public void setLocked(boolean isLocked) {
		this.isLocked = isLocked;
	}

	public static GetSessionDetailsResponse error() {
		
		GetSessionDetailsResponse response = new GetSessionDetailsResponse();
		response.setErrorCode(Constants.ErrorCodes.GetSessionDetailsFailed.getCode());
		
		return response;
	}
}
