package com.retrospective.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.retrospective.exception.DaoException;
import com.retrospective.model.scrummaster.SessionInfoHead;

public class SessionDaoImpl implements SessionDao {
	
	private JdbcTemplate jdbcTemplate;
	
	private RowMapper<SessionInfoHead> sessionInfoHeadRowMapper = new RowMapper<SessionInfoHead>() {

		@Override
		public SessionInfoHead mapRow(ResultSet rs, int rowNum) throws SQLException {
			SessionInfoHead sessionInfo = new SessionInfoHead();
			
			sessionInfo.setCode(rs.getInt("code"));
			sessionInfo.setToken(rs.getString("token"));
			sessionInfo.setName(rs.getString("name"));
			sessionInfo.setStartedAt(rs.getString("created_at"));
			sessionInfo.setParticipantCount(rs.getInt("participant_count"));
			sessionInfo.setFeedbackCount(rs.getInt("feedback_count"));
			sessionInfo.setLocked(rs.getInt("is_locked") == 1);
			
		    return sessionInfo;
		}
	};

	public SessionDaoImpl(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	@Override
	public List<SessionInfoHead> getSessionHeads(int userId) throws DaoException {
		try {
			
			List<SessionInfoHead> result = this.jdbcTemplate.query(
					"SELECT name, code, token, created_at, sf_get_participant_count(code, token) as participant_count, sf_get_feedback_count(code, token) as feedback_count, is_locked " 
					+ " FROM session " 
					+ " WHERE user_id = ?", 
					new Object [] { userId }, 
					sessionInfoHeadRowMapper);
			
			return result;
		}
		catch (Exception error) {
			error.printStackTrace();
			throw new DaoException("Database error occurred while fetching session heads", error);
		}
	}

}
