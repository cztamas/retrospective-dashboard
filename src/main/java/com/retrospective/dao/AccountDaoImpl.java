package com.retrospective.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.retrospective.exception.AccountAlreadyExistsException;
import com.retrospective.exception.DaoException;
import com.retrospective.model.AccountDetails;

public class AccountDaoImpl implements AccountDao {

	private JdbcTemplate jdbcTemplate;
	
	private RowMapper<AccountDetails> accountRowMapper = new RowMapper<AccountDetails>() {

		@Override
		public AccountDetails mapRow(ResultSet rs, int rowNum) throws SQLException {
			AccountDetails accountDetails = new AccountDetails();
			
			accountDetails.setEmail(rs.getString("email"));
			accountDetails.setRegistrationDate(rs.getString("registration_date"));
			accountDetails.setIpAddress(rs.getString("ip_address"));
			accountDetails.setVerificationToken(rs.getString("verification_token"));
			accountDetails.setEmailVerified(rs.getInt("is_email_verified") == 1);
			
		    return accountDetails;
		}
	};
	
	public AccountDaoImpl(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	@Override
	public AccountDetails getAccount(String email, String password) throws DaoException {
		
		try {
			List<AccountDetails> result = this.jdbcTemplate.query(
					"SELECT id, email, password, registration_date, ip_address, verification_token, is_email_verified FROM user WHERE email = ? AND UPPER(password) = UPPER(MD5(MD5(?)))", 
					new Object [] { email, password }, 
					accountRowMapper);
			
			return result.size() == 0 ? null : result.get(0);
		}
		catch (Exception error) {
			error.printStackTrace();
			throw new DaoException("Database error occurred while checking login credentials", error);
		}
	}
	
	@Override
	public AccountDetails verifyAccount(String token) throws DaoException {
		
		try {
			List<AccountDetails> result = this.jdbcTemplate.query(
					"SELECT id FROM user WHERE verification_token = ?", 
					new Object [] { token }, 
					accountRowMapper);
			
			AccountDetails accountDetails = result.size() == 1 ? result.get(0) : null;
			
			this.jdbcTemplate.update("UPDATE user SET is_email_verified = 1 WHERE verification_token = ?", new Object[] { token });
			
			return accountDetails;
		}
		catch (Exception error) {
			error.printStackTrace();
			throw new DaoException("Database error occurred while checking login credentials", error);
		}
		
	}

	@Override
	public AccountDetails register(String email, String password, String ipAddress) throws AccountAlreadyExistsException, DaoException {
		
		// check if email exists already
		int existingAccount = this.jdbcTemplate.queryForObject("SELECT COUNT(*) FROM user WHERE UPPER(email) = UPPER(?)", 
				new Object [] { email }, 
				Integer.class);
		
		if (existingAccount > 0) {
			throw new AccountAlreadyExistsException("Account already exists");
		}
		
		// register
		try {
			this.jdbcTemplate.update("INSERT INTO user (id, email, password, registration_date, ip_address, verification_token, is_email_verified) VALUES (default, ?, MD5(MD5(?)), NOW(), ?, ?, 0)", 
					new Object[] { email, password, ipAddress, UUID.randomUUID().toString() });
		}
		catch (Exception error) {
			throw new DaoException("Database error occurred while registering user", error);
		}
		
		return this.getAccount(email, password);
	}
}
