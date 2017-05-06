CREATE TABLE user (
	id int(11) AUTO_INCREMENT PRIMARY KEY, 
	email VARCHAR(64), 
	password VARCHAR(32), 
	registration_date DATETIME, 
	ip_address VARCHAR(32), 
	verification_token VARCHAR(64),
	is_email_verified INT(11),
	reset_password_token VARCHAR(64)
);