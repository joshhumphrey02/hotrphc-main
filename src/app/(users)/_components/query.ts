'use server';

import prisma from '@/lib/prisma';

export async function getUserData(userId?: string) {
	if (!userId) return null;
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				status: true,
				email: true,
				gender: true,
				phoneNumber: true,
				countryCode: true,
				createdAt: true,
				image: true,
				dob: true,
				addresses: true,
				occupation: true,
				role: true,
				isEmailVerified: true,
				maritalStatus: true,
				employmentStatus: true,
				bornAgain: true,
			},
		});
		return user;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export type UserData = Awaited<ReturnType<typeof getUserData>>;

export async function updateUserData(payload: {
	userId: string;
	userdata: Partial<UserData>;
}) {
	const { userId, userdata } = payload;
	if (!userId || !userdata) return null;
	try {
		const existingUser = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});
		if (!existingUser) return null;
		const user = await prisma.user.update({
			where: {
				id: userId,
			},
			data: { ...existingUser, ...userdata },
		});
		return user;
	} catch (error) {
		console.log(error);
		return null;
	}
}
