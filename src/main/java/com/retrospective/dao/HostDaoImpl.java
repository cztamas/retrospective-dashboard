package com.retrospective.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.retrospective.exception.AuthorizationException;
import com.retrospective.exception.DaoException;
import com.retrospective.model.SessionDetails;
import com.retrospective.model.Sticker;

public class HostDaoImpl implements HostDao {

	private JdbcTemplate jdbcTemplate;
	
	public HostDaoImpl(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	@Override
	public SessionDetails createSession() throws DaoException {
		
		SessionDetails sessionDetails = new SessionDetails();
		sessionDetails.setToken(UUID.randomUUID().toString());
		sessionDetails.setCode(this.generate6digitCode());
		
		try {
			this.jdbcTemplate.update("INSERT INTO session (id, code, token, created_at) VALUES (default, ?, ?, NOW())", 
					new Object[] { 
							sessionDetails.getCode(),
							sessionDetails.getToken() });
			
			return sessionDetails;
		}
		catch (Exception error) {
			throw new DaoException("Database error occurred while creating session", error);
		}
	}
	
	@Override
	public List<Sticker> getSessionStickers(int sessionCode, String sessionToken) throws DaoException, AuthorizationException {
		
		if (sessionToken == null || sessionToken.equals("")) {
			throw new AuthorizationException("Invalid token");
		}
		
		try {
			return this.jdbcTemplate.query("SELECT id, username, user_id, comment, glad, no_control, transform FROM note WHERE session_code = ? AND session_token = ?", 
					new Object[] { sessionCode, sessionToken },
					new RowMapper<Sticker>() {

						@Override
						public Sticker mapRow(ResultSet rs, int rowNum) throws SQLException {
							Sticker sticker = new Sticker();
						    sticker.setId(rs.getInt("ID"));
						    sticker.setUsername(rs.getString("USERNAME"));
						    sticker.setComment(rs.getString("COMMENT"));
						    sticker.setUserId(rs.getString("USER_ID"));
						    sticker.setGlad(rs.getDouble("GLAD"));
						    sticker.setNoControl(rs.getDouble("NO_CONTROL"));
						    sticker.setTransform(rs.getInt("TRANSFORM"));
						    return sticker;
						}
				
					}
					/*(rs, rowNum) -> {
					    Sticker sticker = new Sticker();
					    sticker.setId(rs.getInt("ID"));
					    sticker.setUsername(rs.getString("USERNAME"));
					    sticker.setComment(rs.getString("COMMENT"));
					    sticker.setUserId(rs.getString("USER_ID"));
					    sticker.setGlad(rs.getDouble("GLAD"));
					    sticker.setNoControl(rs.getDouble("NO_CONTROL"));
					    return sticker;
					}*/);
		}
		catch (Exception error) {
			throw new DaoException("Database error occurred while fetching stickers", error);
		}
	}
	
	private int generate6digitCode() {
		Random r = new Random();
		int code = (100000 + r.nextInt(900000));
		
		return code;
	}
}
