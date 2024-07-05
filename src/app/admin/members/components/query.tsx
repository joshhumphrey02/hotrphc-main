'use server';
import dbConnect from '@/lib/mongodb/db';
import memberModel from '@/models/member';
import { IMember } from '@/types';

export async function getMembersData({
	take = 10,
	skip = 0,
	orderBy = { createdAt: 'desc' },
}) {
	try {
		await dbConnect();
		const sortOrder = orderBy.createdAt === 'desc' ? -1 : 1;
		const result = await memberModel
			.find()
			.sort({ createdAt: sortOrder })
			.skip(skip);
		// .limit(take);
		const members: IMember[] = JSON.parse(JSON.stringify(result));
		return members;
	} catch (error) {
		console.error('Error fetching members:', error);
		return [];
	}
}
