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
import com.retrospective.model.SessionParameters;
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
			this.jdbcTemplate.update("INSERT INTO session (id, code, token, created_at, name, size) VALUES (default, ?, ?, NOW(), 'Retro', 1)", 
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
	
	@Override
	public void setOffsets(int sessionCode, String sessionToken, String offsets) throws DaoException {
		
		try {
			this.jdbcTemplate.update("UPDATE session SET offset_settings = ? WHERE code = ? AND token = ?", 
					new Object [] {
						offsets, 
						sessionCode,
						sessionToken
					});
		}
		catch (Exception error) {
			throw new DaoException("Database error occurred while registering offsets", error);
		}
	}
	
	@Override
	public void setSessionParameters(int sessionCode, String sessionToken, SessionParameters parameters) throws DaoException {
		try {
			this.jdbcTemplate.update("UPDATE session SET size = ?, name = ?, comment = ? WHERE code = ? AND token = ?", 
					new Object [] {
						parameters.getSize(), 
						parameters.getName(),
						parameters.getComment(),
						sessionCode,
						sessionToken
					});
		}
		catch (Exception error) {
			throw new DaoException("Database error occurred while storing session parameters", error);
		}
	}
	
	@Override
	public String getOffsetSettings(int sessionCode, String sessionToken) throws DaoException {
		try {
			return this.jdbcTemplate.queryForObject(
					"SELECT offset_settings FROM session WHERE code = ? AND token = ?", 
					new Object [] { sessionCode, sessionToken }, 
					String.class);
		}
		catch (Exception error) {
			error.printStackTrace();
			throw new DaoException("Database error occurred while fetching stickers", error);
		}
	}
	
	@Override
	public SessionParameters getSessionParameters(int sessionCode, String sessionToken) throws DaoException {
		try {
			return this.jdbcTemplate.queryForObject("SELECT size, name, comment FROM session WHERE code = ? AND token = ?", 
					new Object[] { sessionCode, sessionToken },
					new RowMapper<SessionParameters>() {

						@Override
						public SessionParameters mapRow(ResultSet rs, int rowNum) throws SQLException {
							SessionParameters sessionParameters = new SessionParameters();
							sessionParameters.setSize(rs.getInt("size"));
							if (rs.wasNull()) {
								// if size was not set, using default (3) which is normal size
								sessionParameters.setSize(3); 
						    }
							
							sessionParameters.setName(rs.getString("name"));
							sessionParameters.setComment(rs.getString("comment"));
							
						    return sessionParameters;
						}
				
					});
		}
		catch (Exception error) {
			error.printStackTrace();
			throw new DaoException("Database error occurred while fetching session parameters", error);
		}
	}
	
	private int generate6digitCode() {
		Random r = new Random();
		int code = (100000 + r.nextInt(900000));
		
		return code;
	}
}
