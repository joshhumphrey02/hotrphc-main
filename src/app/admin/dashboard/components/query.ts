import prisma from '@/lib/prisma';

export interface MembersWithinSixMonths {
	name: string;
	Male: number;
	Female: number;
}

export interface IResult {
	totalCount: number;
	uniqueMen: number;
	uniqueWomen: number;
	workers: number;
	recentMembers: any;
	totalMembersThisMonth: number;
	membersWithinSixMonths: MembersWithinSixMonths[];
}

export const GetMembersFullData = async (): Promise<IResult | null> => {
	try {
		const monthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];
		const currentDate = new Date();
		const sixMonthsAgo = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth() - 5,
			1
		);

		const totalCount = await prisma.user.count();

		const uniqueMen = await prisma.user.count({
			where: { gender: 'Male' },
		});

		const uniqueWomen = await prisma.user.count({
			where: { gender: 'Female' },
		});

		const workers = await prisma.user.count({
			where: { role: 'ADMIN' },
		});

		const recentMembers = await prisma.user.findMany({
			orderBy: { createdAt: 'desc' },
			select: {
				firstName: true,
				lastName: true,
				email: true,
				role: true,
				createdAt: true,
				image: true,
				dob: true,
				addresses: true,
			},
			take: 5,
		});

		const totalMembersThisMonth = await prisma.user.count({
			where: {
				createdAt: {
					gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
				},
			},
		});

		const membersByMonth: MembersWithinSixMonths[] = await prisma.$queryRaw`
			SELECT
				EXTRACT(YEAR FROM "createdAt") AS "year",
				EXTRACT(MONTH FROM "createdAt") AS "month",
				COUNT(*) AS "totalMembers",
				SUM(CASE WHEN "gender" = 'Male' THEN 1 ELSE 0 END) AS "Male",
				SUM(CASE WHEN "gender" = 'Female' THEN 1 ELSE 0 END) AS "Female"
			FROM "User"
			WHERE "createdAt" >= ${sixMonthsAgo}
			GROUP BY "year", "month"
			ORDER BY "year", "month"
		`;

		const membersWithinSixMonths = membersByMonth.map((month: any) => ({
			name: `${monthNames[month.month - 1]}`, // You can format month name as required
			Male: parseInt(month.Male),
			Female: parseInt(month.Female),
		}));
		const result: IResult = {
			totalCount,
			uniqueMen,
			uniqueWomen,
			workers,
			recentMembers,
			totalMembersThisMonth,
			membersWithinSixMonths,
		};

		return result;
	} catch (error) {
		console.error('Error:', error);
		return null;
	} finally {
		await prisma.$disconnect();
	}
};
