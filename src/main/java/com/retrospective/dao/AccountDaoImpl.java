package com.retrospective.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.retrospective.exception.AccountAlreadyExistsException;
import com.retrospective.exception.AuthenticationException;
import com.retrospective.exception.DaoException;
import com.retrospective.model.AccountDetails;

public class AccountDaoImpl implements AccountDao {

	private JdbcTemplate jdbcTemplate;
	
	public AccountDaoImpl(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	@Override
	public AccountDetails getAccount(String email, String password) throws DaoException {
		
		try {
			List<AccountDetails> result = this.jdbcTemplate.query(
					"SELECT id, email, password, registration_date, ip_address FROM user WHERE email = ? AND UPPER(password) = UPPER(MD5(MD5(?)))", 
					new Object [] { email, password }, 
					new RowMapper<AccountDetails>() {

						@Override
						public AccountDetails mapRow(ResultSet rs, int rowNum) throws SQLException {
							AccountDetails accountDetails = new AccountDetails();
							
							accountDetails.setEmail(email);
							accountDetails.setRegistrationDate(rs.getString("registration_date"));
							accountDetails.setIpAddress(rs.getString("ip_address"));
							
						    return accountDetails;
						}
					});
			
			return result.size() == 0 ? null : result.get(0);
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
			this.jdbcTemplate.update("INSERT INTO user (id, email, password, registration_date, ip_address) VALUES (default, ?, MD5(MD5(?)), NOW(), ?)", 
					new Object[] { email, password, ipAddress });
		}
		catch (Exception error) {
			throw new DaoException("Database error occurred while registering user", error);
		}
		
		return this.getAccount(email, password);
	}
}
