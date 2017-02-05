package com.retrospective.dao;

import java.util.List;

import com.retrospective.exception.AuthorizationException;
import com.retrospective.exception.DaoException;
import com.retrospective.model.SessionDetails;
import com.retrospective.model.Sticker;

public interface HostDao {

	public SessionDetails createSession() throws DaoException;
	
	public List<Sticker> getSessionStickers(int sessionCode, String sessionToken) throws DaoException, AuthorizationException;
}
