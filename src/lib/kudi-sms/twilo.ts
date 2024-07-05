'use server';

const accountSid = 'ACa37405d64d1ddf5cba6e54168b0ed6f9';
const authToken = '8aafce8cf9c599a755186529ca343393';
const verifySid = 'VA63496fc7a08b508a1e58fbfa181e0652';
import twilio from 'twilio';

const client = twilio(accountSid, authToken);
export async function SendOtp(phone: string) {
	try {
		const verification = await client.verify.v2
			.services(verifySid)
			.verifications.create({ to: phone, channel: 'sms' });
		if (
			verification.status === 'pending' &&
			verification.sendCodeAttempts.length < 3
		) {
			return { sent: true, message: 'Verification code sent successfully' };
		} else if (
			verification.status === 'pending' &&
			verification.sendCodeAttempts.length > 2
		) {
			return {
				sent: false,
				message: 'Too many attempt. Please try again later.',
			};
		} else {
			return {
				sent: false,
				message: 'Verification code sending failed. Please try again later.',
			};
		}
	} catch (error) {
		console.log(error);
		return {
			sent: false,
			message: 'Verification code sending failed. Please try again later.',
		};
	}
}

export async function VerifyOtp(phone: string, otpCode: string) {
	try {
		const verificationStatus = await client.verify.v2
			.services(verifySid)
			.verificationChecks.create({ to: phone, code: otpCode });
		if (verificationStatus.status === 'approved') {
			return { sent: true, message: 'Verification code matched successfully' };
		} else {
			return { sent: false, message: 'Invalid verification code!' };
		}
	} catch (error) {
		console.log(error);
		return { sent: false, message: 'Verification failed!' };
	}
}
