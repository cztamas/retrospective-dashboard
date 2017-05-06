package com.retrospective.external;

public interface EmailSender {

	void sendAccountVerification(String email, String verificationToken);
	
	void sendPasswordResetEmail(String email, String resetToken);
}
