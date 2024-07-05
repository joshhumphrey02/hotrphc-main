'use server';

import dbConnect from '@/lib/mongodb/db';
import { IMember } from '@/types';
import mongoose from 'mongoose';
import memberModel from '@/models/member';

export interface MembersWithinSixMonths {
	month: {
		totalMembers: number;
		male: number;
		female: number;
	};
}

export interface IResult {
	totalCount: number;
	uniqueMen: number;
	uniqueWomen: number;
	admins: number;
	recentMembers: IMember[];
	totalMembersThisMonth: number;
	membersWithinSixMonths: MembersWithinSixMonths[];
}

export const GetMembersFullData = async (): Promise<IResult | null> => {
	try {
		await dbConnect();

		const currentDate = new Date();
		const sixMonthsAgo = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth() - 5,
			1
		);
		const result = await memberModel.aggregate([
			{
				$facet: {
					totalCount: [{ $count: 'totalCount' }],
					uniqueMen: [{ $match: { gender: 'M' } }, { $count: 'uniqueMen' }],
					uniqueWomen: [{ $match: { gender: 'F' } }, { $count: 'uniqueWomen' }],
					admins: [{ $match: { category: 'admin' } }, { $count: 'admins' }],
					recentMembers: [{ $sort: { createdAt: -1 } }, { $limit: 5 }],
					totalMembersThisMonth: [
						{
							$match: {
								createdAt: {
									$gte: new Date(
										currentDate.getFullYear(),
										currentDate.getMonth(),
										1
									),
								},
							},
						},
						{ $count: 'totalMembersThisMonth' },
					],
					membersByMonth: [
						{
							$match: {
								createdAt: {
									$gte: sixMonthsAgo,
								},
							},
						},
						{
							$group: {
								_id: {
									year: { $year: '$createdAt' },
									month: { $month: '$createdAt' },
								},
								totalMembers: { $sum: 1 },
								male: { $sum: { $cond: [{ $eq: ['$gender', 'M'] }, 1, 0] } },
								female: { $sum: { $cond: [{ $eq: ['$gender', 'F'] }, 1, 0] } },
							},
						},
						{ $sort: { '_id.year': 1, '_id.month': 1 } },
						{
							$project: {
								_id: 0,
								year: '$_id.year',
								month: '$_id.month',
								totalMembers: 1,
								male: 1,
								female: 1,
							},
						},
					],
				},
			},
			{
				$project: {
					totalCount: { $arrayElemAt: ['$totalCount.totalCount', 0] },
					uniqueMen: { $arrayElemAt: ['$uniqueMen.uniqueMen', 0] },
					uniqueWomen: { $arrayElemAt: ['$uniqueWomen.uniqueWomen', 0] },
					admins: { $arrayElemAt: ['$admins.admins', 0] },
					recentMembers: 1,
					totalMembersThisMonth: {
						$arrayElemAt: ['$totalMembersThisMonth.totalMembersThisMonth', 0],
					},
					membersWithinSixMonths: '$membersByMonth',
				},
			},
		]);

		if (result.length === 0) {
			console.log('No data found.');
			return null;
		}

		const processedResult: IResult = {
			totalCount: result[0].totalCount || 0,
			uniqueMen: result[0].uniqueMen || 0,
			uniqueWomen: result[0].uniqueWomen || 0,
			admins: result[0].admins || 0,
			recentMembers: result[0].recentMembers || [],
			totalMembersThisMonth: result[0].totalMembersThisMonth || 0,
			membersWithinSixMonths: result[0].membersWithinSixMonths || [],
		};

		return processedResult;
	} catch (error) {
		console.error('Error:', error);
		return null;
	} finally {
		mongoose.disconnect();
	}
};
