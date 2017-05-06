package com.retrospective.dao;

import java.util.List;

import com.retrospective.exception.DaoException;
import com.retrospective.model.scrummaster.SessionInfoHead;

public interface SessionDao {

	public List<SessionInfoHead> getSessionHeads(int userId) throws DaoException;
	
}
