package com.retrospective.dao;

import com.retrospective.exception.AccountAlreadyExistsException;
import com.retrospective.exception.AuthenticationException;
import com.retrospective.exception.DaoException;
import com.retrospective.model.AccountDetails;

public interface AccountDao {

	public AccountDetails getAccount(String email, String password) throws DaoException;
	
	public AccountDetails register(String email, String password, String ipAddress) throws AccountAlreadyExistsException, DaoException;
}
