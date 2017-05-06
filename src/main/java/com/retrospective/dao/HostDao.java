package com.retrospective.dao;

import java.util.List;

import com.retrospective.exception.AuthorizationException;
import com.retrospective.exception.DaoException;
import com.retrospective.model.AccountDetails;
import com.retrospective.model.SessionDetails;
import com.retrospective.model.SessionParameters;
import com.retrospective.model.Sticker;

public interface HostDao {

	public SessionDetails createSession(int boardType, AccountDetails accountDetails) throws DaoException;
	
	public List<Sticker> getSessionStickers(int sessionCode, String sessionToken) throws DaoException, AuthorizationException;
	
	public void setOffsets(int sessionCode, String sessionToken, String offsets) throws DaoException;
	
	public void setSessionParameters(int sessionCode, String sessionToken, SessionParameters parameters) throws DaoException;
	
	public String getOffsetSettings(int sessionCode, String sessionToken) throws DaoException;
	
	public SessionParameters getSessionParameters(int sessionCode, String sessionToken) throws DaoException;
	
	public SessionDetails getSessionDetails(int sessionCode, String sessionToken) throws DaoException;
}
