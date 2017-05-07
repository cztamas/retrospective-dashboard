package com.retrospective.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.retrospective.exception.DaoException;
import com.retrospective.model.Sticker;
import com.retrospective.model.scrummaster.ScrumTeam;

public class ScrumTeamDaoImpl implements ScrumTeamDao {
	
	private JdbcTemplate jdbcTemplate;
	
	public ScrumTeamDaoImpl(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	@Override
	public void store(ScrumTeam scrumTeam) throws DaoException {
		
		try {
			this.jdbcTemplate.update("INSERT INTO scrum_team (id, user_id, name) VALUES(default, ?, ?)", 
					new Object[] { 
						scrumTeam.getUserId(),
						scrumTeam.getName()
					});
		}
		catch (Exception error) {
			throw new DaoException("Could not store scrum team", error);
		}
	}

	@Override
	public List<ScrumTeam> getScrumTeams(int userId) throws DaoException {
		
		try {
			return this.jdbcTemplate.query("SELECT id, user_id, name FROM scrum_team WHERE user_id = ?", 
					new Object[] { userId },
					new RowMapper<ScrumTeam>() {

						@Override
						public ScrumTeam mapRow(ResultSet rs, int rowNum) throws SQLException {
							ScrumTeam team = new ScrumTeam();
							team.setId(rs.getInt("id"));
							team.setUserId(rs.getInt("user_id"));
							team.setName(rs.getString("name"));
						    return team;
						}
					});	
		}
		catch (Exception error) {
			throw new DaoException("Could not fetch scrum team list", error);
		}
	}

	@Override
	public void delete(int userId, int scrumTeamId) throws DaoException {
		try {
			this.jdbcTemplate.update("DELETE FROM scrum_team WHERE id = ? AND user_id = ?", new Object[] { scrumTeamId, userId });
		}
		catch (Exception error) {
			throw new DaoException("Could not store scrum team", error);
		}
	}
}
