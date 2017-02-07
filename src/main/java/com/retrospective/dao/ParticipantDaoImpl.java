package com.retrospective.dao;

import org.springframework.jdbc.core.JdbcTemplate;

import com.retrospective.exception.DaoException;
import com.retrospective.model.Sticker;

public class ParticipantDaoImpl implements ParticipantDao {

private JdbcTemplate jdbcTemplate;
	
	public ParticipantDaoImpl(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	@Override
	public void storeSticker(Sticker sticker) throws DaoException {
		
		try {
			this.jdbcTemplate.update("INSERT INTO note (id, username, user_id, glad, no_control, comment, session_code, session_token) VALUES(default, ?, ?, ?, ?, ?, ?, ?)", 
					new Object[] { 
							sticker.getUsername(), 
							sticker.getUserId(), 
							sticker.getGlad(), 
							sticker.getNoControl(), 
							sticker.getComment(), 
							sticker.getSessionCode(), 
							sticker.getSessionToken() 
					});
		}
		catch (Exception error) {
			throw new DaoException("Could not store sticker", error);
		}
	}

}
