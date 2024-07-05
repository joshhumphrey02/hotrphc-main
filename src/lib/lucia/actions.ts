'use server';
import { lucia } from '@/lib/lucia';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import memberModel from '@/models/member';
import dbConnect from '@/lib/mongodb/db';
import {
	loginSchema,
	signupSchema,
	type LoginInput,
	type SignupInput,
	resetPasswordSchema,
} from './validators';
import { formatPhoneNumber } from '../utils';
import { SendOtp, VerifyOtp } from '../kudi-sms/twilo';
import { IMember } from '@/types';
import { Scrypt } from 'lucia';
import { validateRequest } from './validate-request';

export interface ActionResponse<T> {
	fieldError?: Partial<Record<keyof T, string | undefined>>;
	formError?: string;
}

export async function signup(
	_: any,
	formData: FormData
): Promise<ActionResponse<SignupInput>> {
	const obj = Object.fromEntries(formData.entries());

	const parsed = signupSchema.safeParse(obj);
	if (!parsed.success) {
		const err = parsed.error.flatten();
		return {
			fieldError: {
				email: err.fieldErrors.email?.[0],
				password: err.fieldErrors.password?.[0],
			},
		};
	}
	const {
		email,
		password,
		phoneNumber,
		comfirmPassword,
		firstName,
		lastName,
		gender,
	} = parsed.data;
	if (comfirmPassword !== password) {
		return {
			fieldError: {
				comfirmPassword: 'Passwords do not match',
			},
		};
	}
	await dbConnect();
	const existingMember = await memberModel.findOne({ email: email });
	if (existingMember) {
		return {
			formError: 'Cannot create account with that email',
		};
	}
	const hashedPassword = await new Scrypt().hash(password);

	const user = await memberModel.create({
		password: hashedPassword,
		email,
		firstName,
		lastName,
		phoneNumber: formatPhoneNumber(phoneNumber),
		gender,
	});
	// await SendOtp(formatPhoneNumber(phoneNumber));

	const session = await lucia.createSession(user._id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return redirect('/');
}

export async function login(
	_: any,
	formData: FormData
): Promise<ActionResponse<LoginInput>> {
	const obj = Object.fromEntries(formData.entries());

	const parsed = loginSchema.safeParse(obj);
	if (!parsed.success) {
		const err = parsed.error.flatten();
		return {
			fieldError: {
				email: err.fieldErrors.email?.[0],
				password: err.fieldErrors.password?.[0],
			},
		};
	}
	const { email, password } = parsed.data;

	await dbConnect();
	const existingUser = await memberModel.findOne({ email: email });
	if (!existingUser) {
		return {
			formError: 'Incorrect email or password',
		};
	}
	if (!existingUser.password) {
		return {
			formError: 'No password has been attached to this account',
		};
	}
	const validPassword = await new Scrypt().verify(
		existingUser.password,
		password
	);
	if (!validPassword) {
		return {
			formError: 'Incorrect email or password',
		};
	}
	const session = await lucia.createSession(existingUser._id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return redirect('/');
}

export async function logout() {
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: 'Unauthorized',
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return redirect('/login');
}

export async function verifyEmail(
	_: any,
	formData: FormData
): Promise<{ error: string } | void> {
	const code = formData.get('code');
	if (typeof code !== 'string' || code.length !== 6) {
		return { error: 'Invalid code' };
	}
	const { session: userSession, user } = await validateRequest();
	if (!userSession) {
		return redirect('/login');
	}
	const result = await memberModel.findById(user.id);
	const member: IMember = await JSON.parse(JSON.stringify(result));
	const verify = await VerifyOtp(formatPhoneNumber(member.phoneNumber), code);
	if (!verify.sent) return { error: verify.message };

	await lucia.invalidateUserSessions(user.id);
	await memberModel.findOneAndUpdate(
		{ phoneNumber: member.phoneNumber },
		{ verified: true }
	);
	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	redirect('/');
}

export async function resendVerificationEmail(): Promise<{
	error?: string;
	success?: boolean;
}> {
	const { user } = await validateRequest();
	if (!user) {
		return redirect('/login');
	}

	const result = await memberModel.findById(user.id);
	const member: IMember = await JSON.parse(JSON.stringify(result));
	const res = await SendOtp(formatPhoneNumber(member.phoneNumber));
	if (!res.sent) {
		return {
			error: res.message,
		};
	}

	return { success: true };
}
export async function getProfile(): Promise<{
	error?: string;
	success?: IMember;
}> {
	const { session } = await validateRequest();
	if (!session?.userId) {
		return redirect('/login');
	}

	const result = await memberModel.findById(session.userId);
	const member: IMember = await JSON.parse(JSON.stringify(result));

	if (!member) {
		return {
			error: "Can't find details",
		};
	}

	return { success: member };
}
export async function updateProfile(
	_: any,
	formData: FormData
): Promise<{ success: boolean }> {
	try {
		const { session } = await validateRequest();
		if (!session?.userId) {
			return redirect('/login');
		}
		const email = formData.get('email') as string;
		const phoneNumber = formData.get('phoneNumber') as string;
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const gender = formData.get('gender') as string;
		const data = [email, phoneNumber, firstName, lastName, gender];
		if (!email || !firstName || !lastName || !gender) {
			throw new Error('Missing required fields');
		}

		await dbConnect();

		await memberModel.findOneAndUpdate(
			{ id: session.userId },
			{ $set: { email, firstName, lastName, gender } },
			{ new: true, runValidators: true }
		);
		return { success: true };
	} catch (error) {
		console.log(error);
		return { success: false };
	}
}
