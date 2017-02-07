package com.retrospective.dao;

import com.retrospective.exception.DaoException;
import com.retrospective.model.Sticker;

public interface ParticipantDao {

	public void storeSticker(Sticker sticker) throws DaoException;
	
}
