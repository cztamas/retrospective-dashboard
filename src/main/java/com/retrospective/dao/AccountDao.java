package com.retrospective.dao;

import com.retrospective.exception.AccountAlreadyExistsException;
import com.retrospective.exception.DaoException;
import com.retrospective.model.AccountDetails;

public interface AccountDao {

	public AccountDetails getAccount(String email, String password) throws DaoException;
	
	public AccountDetails getAccount(String email) throws DaoException;
	
	public AccountDetails getAccountByResetPasswordToken(String resetToken) throws DaoException;
	
	public AccountDetails verifyAccount(String token) throws DaoException;
	
	public AccountDetails register(String email, String password, String ipAddress) throws AccountAlreadyExistsException, DaoException;
	
	public String generatePasswordResetToken(int userId) throws DaoException;
	
	public void resetPassword(int userId, String newPassword) throws DaoException;
}
