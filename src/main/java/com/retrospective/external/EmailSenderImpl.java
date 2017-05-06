package com.retrospective.external;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.retrospective.utils.Constants;
import com.sun.xml.internal.bind.CycleRecoverable.Context;

public class EmailSenderImpl implements EmailSender {

	private String smtpHost;

	private String username;

	private String password;

	private String fromEmailAddress;

	public EmailSenderImpl(String smtpHost, String username, String password, String fromEmailAddress) {
		this.smtpHost = smtpHost;
		this.username = username;
		this.password = password;
		this.fromEmailAddress = fromEmailAddress;
	}

	public void sendForgotPassword(String email) {

	}

	public void sendAccountVerification(String email, String verificationToken) {

		Properties props = new Properties();
		//props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.host", this.smtpHost);
		props.put("mail.smtp.port", "587");

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});

		try {

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(this.fromEmailAddress));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
			message.setSubject("Retrospective Dashboard - Account Verification");
			
			StringBuilder text = new StringBuilder();
			text.append("Dear User,\n\n");
			text.append("Please follow below link to finalize your registration:\n");
			text.append(String.format("%s%s/account/email-verification/%s", Constants.Domain, Constants.WebRoot, verificationToken));
			text.append("\n\n");
			text.append("Thanks!\n\n");
			
			message.setText(text.toString());

			Transport.send(message);

			System.out.println("Done");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void sendPasswordResetEmail(String email, String resetToken) {
		Properties props = new Properties();
		//props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.host", this.smtpHost);
		props.put("mail.smtp.port", "587");

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});

		try {

			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(this.fromEmailAddress));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email));
			message.setSubject("Retrospective Dashboard - Account Verification");
			
			StringBuilder text = new StringBuilder();
			text.append("Dear User,\n\n");
			text.append("Please follow below link to reset your password:\n");
			text.append(String.format("%s%s/account/forgot-password/%s", Constants.Domain, Constants.WebRoot, resetToken));
			text.append("\n\n");
			text.append("Thanks!\n\n");
			
			message.setText(text.toString());

			Transport.send(message);

			System.out.println("Done");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
