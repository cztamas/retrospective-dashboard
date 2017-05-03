package com.retrospective.external;

public interface EmailSender {

	void sendAccountVerification(String email, String token);
}
