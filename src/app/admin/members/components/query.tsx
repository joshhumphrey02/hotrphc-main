'use server';
import { PrismaClient } from '@prisma/client';
import { UserData } from '@/app/(users)/_components/query';

const prisma = new PrismaClient();

export async function getMembersData(args: {
	cursor?: string;
	take: number;
	skip: number;
	orderBy: {
		createdAt: 'asc' | 'desc';
	};
	tab?: string;
}): Promise<UserData[]> {
	try {
		const { take, skip, orderBy, tab } = args;

		const tabsFilter = {
			All: {},
			Men: { gender: 'Male' },
			Women: { gender: 'Female' },
			Verified: { isEmailVerified: true },
		};

		const filter = tabsFilter[tab as keyof typeof tabsFilter] || {};

		const members = await prisma.user.findMany({
			where: filter,
			orderBy: {
				createdAt: orderBy.createdAt,
			},
			// skip: skip,
			// take: take,
		});

		return members;
	} catch (error) {
		console.error('Error fetching members:', error);
		return [];
	}
}

export async function getMemberData(args: {
	memberId?: string;
}): Promise<UserData | null> {
	try {
		const { memberId } = args;
		if (!memberId) return null;

		const member = await prisma.user.findUnique({
			where: { id: memberId },
		});

		return member;
	} catch (error) {
		console.error('Error fetching member:', error);
		return null;
	}
}
export async function updateMemberStatus(args: {
	memberId?: string;
	status: 'VERIFIED' | 'PENDING';
}): Promise<UserData | null> {
	try {
		const { memberId, status } = args;
		if (!memberId) return null;

		const member = await prisma.user.update({
			where: { id: memberId },
			data: {
				status: status === 'VERIFIED' ? 'VERIFIED' : 'DEACTIVATED',
			},
		});

		return member;
	} catch (error) {
		console.error('Error fetching member:', error);
		return null;
	}
}

export async function updateMemberData(payload: {
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
