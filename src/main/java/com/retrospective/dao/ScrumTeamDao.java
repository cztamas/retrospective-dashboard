package com.retrospective.dao;

import java.util.List;

import com.retrospective.exception.DaoException;
import com.retrospective.model.scrummaster.ScrumTeam;

public interface ScrumTeamDao {

	public void store(ScrumTeam scrumTeam) throws DaoException;
	
	public void delete(int userId, int scrumTeamId) throws DaoException;
	
	public List<ScrumTeam> getScrumTeams(int userId) throws DaoException;
}
