'use server';

/* eslint @typescript-eslint/no-explicit-any:0, @typescript-eslint/prefer-optional-chain:0 */

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { generateId, Scrypt } from 'lucia';
import { isWithinExpirationDate, TimeSpan, createDate } from 'oslo';
import { generateRandomString, alphabet } from 'oslo/crypto';
import mongodb from '../mongodb';

import { lucia } from '@/lib/auth';

import {
	loginSchema,
	signupSchema,
	type LoginInput,
	type SignupInput,
	resetPasswordSchema,
} from '@/lib/validators/auth';

import { sendMail, EmailTemplate } from '@/lib/email';
import { validateRequest } from '@/lib/auth/validate-request';
import { Paths } from '../constants';
import { env } from '@/env';
import prisma from '@/lib/prisma';
import { UserData } from '@/app/(users)/_components/query';
import { IMember } from '@/types';

export interface ActionResponse<T> {
	fieldError?: Partial<Record<keyof T, string | undefined>>;
	formError?: string;
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

	const existingUser = await prisma.user.findFirst({
		where: {
			email: {
				equals: email,
				mode: 'insensitive',
			},
		},
	});
	if (!existingUser) {
		return {
			formError: 'Incorrect email or password',
		};
	}

	if (!existingUser || !existingUser?.hashedPassword) {
		return {
			formError: 'Incorrect email or password',
		};
	}
	const validPassword = await new Scrypt().verify(
		existingUser.hashedPassword,
		password
	);
	if (!validPassword) {
		return {
			formError: 'Incorrect email or password',
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return redirect(Paths.Home);
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
				phoneNumber: err.fieldErrors.phoneNumber?.[0],
				firstName: err.fieldErrors.firstName?.[0],
				lastName: err.fieldErrors.lastName?.[0],
			},
		};
	}

	const { email, password, firstName, lastName, phoneNumber, gender } =
		parsed.data;

	const existingUser = await prisma.user.findFirst({
		where: {
			email: {
				equals: email,
				mode: 'insensitive',
			},
		},
	});

	if (existingUser) {
		return {
			formError: 'Cannot create account with that email',
		};
	}

	const userId = generateId(21);
	const hashedPassword = await new Scrypt().hash(password);

	await prisma.user.create({
		data: {
			id: userId,
			email,
			hashedPassword,
			firstName,
			lastName,
			phoneNumber,
			gender,
		},
	});

	// const verificationCode = await generateEmailVerificationCode(userId, email);
	// await sendMail(email, EmailTemplate.EmailVerification, {
	// 	code: verificationCode,
	// });

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value);
	sessionCookie.attributes;
	return redirect(Paths.Home);
}

async function processMember(member: IMember) {
	return {
		id: generateId(21),
		firstName: member.firstName,
		lastName: member.lastName,
		email: member.email,
		phoneNumber: member.phoneNumber,
		gender: member.gender == 'M' ? 'Male' : 'Female',
		hashedPassword: await new Scrypt().hash('password'),
	};
}

export async function pushmembers() {
	try {
		const collection = mongodb.collection('members');
		let skip = 0;
		const batchSize = 50;

		while (skip < 1390) {
			console.log(skip);
			const batch = await collection
				.find()
				.skip(skip)
				.limit(batchSize)
				.toArray();
			const result: IMember[] = await JSON.parse(JSON.stringify(batch));
			const members = await Promise.all(result.map(processMember));

			// await prisma.user.createMany({
			// 	data: members,
			// 	skipDuplicates: true,
			// });

			skip += batchSize;
		}
		return { success: true };
	} catch (error) {
		console.log('error');
		return { error: "can't push" };
	}
}

export async function logout(): Promise<{ error: string } | void> {
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: 'No session found',
		};
	}
	await lucia.invalidateSession(session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return redirect('/');
}

export async function resendVerificationEmail(): Promise<{
	error?: string;
	success?: boolean;
}> {
	const { user } = await validateRequest();
	if (!user) {
		return redirect(Paths.Login);
	}

	const lastSent = await prisma.verificationToken.findFirst({
		where: {
			userId: user.id,
		},
		select: {
			expiresAt: true,
		},
	});

	if (lastSent && isWithinExpirationDate(lastSent.expiresAt)) {
		return {
			error: `Please wait ${timeFromNow(lastSent.expiresAt)} before resending`,
		};
	}
	const verificationCode = await generateEmailVerificationCode(
		user.id,
		user.email
	);
	await sendMail(user.email, EmailTemplate.EmailVerification, {
		code: verificationCode,
	});

	return { success: true };
}

export async function verifyEmail(
	_: any,
	formData: FormData
): Promise<{ error: string } | void> {
	const code = formData.get('code');
	if (typeof code !== 'string' || code.length !== 8) {
		return { error: 'Invalid code' };
	}
	const { session: userSession, user } = await validateRequest();
	if (!userSession) {
		return redirect(Paths.Login);
	}

	const dbCode = await prisma.$transaction(async (tx) => {
		const item = await tx.verificationToken.findFirst({
			where: {
				userId: userSession.userId,
			},
		});
		if (item) {
			await tx.verificationToken.delete({
				where: {
					id: item.id,
				},
			});
		}
		return item;
	});

	if (!dbCode || dbCode.token !== code)
		return { error: 'Invalid verification code' };

	if (!isWithinExpirationDate(dbCode.expiresAt))
		return { error: 'Verification code expired' };

	if (dbCode.email !== user.email) return { error: 'Email does not match' };

	await lucia.invalidateUserSessions(user.id);
	await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			isEmailVerified: true,
		},
	});
	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	redirect(Paths.Home);
}

export async function sendPasswordResetLink(
	_: any,
	formData: FormData
): Promise<{ error?: string; success?: boolean }> {
	const email = formData.get('email');
	const parsed = z.string().trim().email().safeParse(email);
	if (!parsed.success) {
		return { error: 'Provided email is invalid.' };
	}
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: parsed.data,
			},
		});
		if (!user) return { error: 'Provided email is invalid or not found.' };

		const verificationToken = await generatePasswordResetToken(user.id);

		const verificationLink = `${env.NEXT_PUBLIC_APP_URL}/reset-password/${verificationToken}`;

		await sendMail(user.email, EmailTemplate.PasswordReset, {
			link: verificationLink,
		});

		return { success: true };
	} catch (error) {
		return { error: 'Failed to send verification email.' };
	}
}

export async function resetPassword(
	_: any,
	formData: FormData
): Promise<{ error?: string; success?: boolean }> {
	const obj = Object.fromEntries(formData.entries());

	const parsed = resetPasswordSchema.safeParse(obj);

	if (!parsed.success) {
		const err = parsed.error.flatten();
		return {
			error: err.fieldErrors.password?.[0] ?? err.fieldErrors.token?.[0],
		};
	}
	const { token, password } = parsed.data;

	const dbToken = await prisma.$transaction(async (tx) => {
		const item = await tx.passwordResetTokens.findFirst({
			where: {
				token,
			},
		});

		if (item) {
			await tx.passwordResetTokens.delete({
				where: {
					id: item.id,
				},
			});
		}
		return item;
	});

	if (!dbToken) return { error: 'Invalid password reset link' };

	if (!isWithinExpirationDate(dbToken.expiresAt))
		return { error: 'Password reset link expired.' };

	await lucia.invalidateUserSessions(dbToken.userId);
	const hashedPassword = await new Scrypt().hash(password);
	await prisma.user.update({
		where: {
			id: dbToken.userId,
		},
		data: {
			hashedPassword,
		},
	});
	const session = await lucia.createSession(dbToken.userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	redirect(Paths.Home);
}

const timeFromNow = (time: Date) => {
	const now = new Date();
	const diff = time.getTime() - now.getTime();
	const minutes = Math.floor(diff / 1000 / 60);
	const seconds = Math.floor(diff / 1000) % 60;
	return `${minutes}m ${seconds}s`;
};

async function generateEmailVerificationCode(
	userId: string,
	email: string
): Promise<string> {
	await prisma.verificationToken.deleteMany({
		where: {
			userId,
		},
	});
	const code = generateRandomString(8, alphabet('0-9')); // 8 digit code
	await prisma.verificationToken.create({
		data: {
			userId,
			email,
			token: code,
			expiresAt: createDate(new TimeSpan(10, 'm')), // 10 minutes
		},
	});
	return code;
}

async function generatePasswordResetToken(userId: string): Promise<string> {
	await prisma.passwordResetTokens.deleteMany({
		where: {
			userId,
		},
	});
	const tokenId = generateId(40);
	await prisma.passwordResetTokens.create({
		data: {
			token: tokenId,
			userId,
			expiresAt: createDate(new TimeSpan(2, 'h')),
		},
	});

	return tokenId;
}
