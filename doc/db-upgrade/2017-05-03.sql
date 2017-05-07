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

CREATE TABLE scrum_team (
	id int(11) primary key AUTO_INCREMENT,
	user_id int(11),
	name varchar(64)
);

ALTER TABLE session ADD COLUMN user_id INT(11);

DELIMITER $$

DROP FUNCTION IF EXISTS `retrospective`.`sf_get_feedback_count` $$
CREATE FUNCTION `retrospective`.`sf_get_feedback_count` (code INT(11), token VARCHAR(128)) RETURNS INT
BEGIN
  DECLARE feedbackCount INT(11);

  SELECT COUNT(*) INTO feedbackCount FROM note WHERE session_code = code AND session_token = token;

  RETURN feedbackCount;
END $$

DELIMITER ;


DELIMITER $$

DROP FUNCTION IF EXISTS `retrospective`.`sf_get_participant_count` $$
CREATE FUNCTION `retrospective`.`sf_get_participant_count` (code INT(11), token VARCHAR(128)) RETURNS INT
BEGIN

  DECLARE participantCount INT(11);

  SELECT COUNT(*) INTO participantCount FROM (
    SELECT DISTINCT username
    FROM note
    WHERE session_code = code
      AND session_token = token
  ) as tbl1;

  RETURN participantCount;

END $$

DELIMITER ;
