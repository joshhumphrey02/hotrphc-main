import { Metadata } from 'next';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Overview from '@/app/admin/dashboard/components/overview';
import { RecentMembers } from '@/app/admin/dashboard/components/recent-members';
import { UserRound, Users } from 'lucide-react';
import { GetMembersFullData } from './components/query';

export const metadata: Metadata = {
	title: 'HOTRC Dashboard',
	description: 'Dashboard of HOTRC',
};

export default async function Dashboard() {
	const data = await GetMembersFullData();
	return (
		<>
			<div className="hidden flex-col md:flex">
				<div className="flex-1 space-y-4 p-8 pt-6">
					<div className="flex mb-12">
						<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
					</div>
					<div className="space-y-4 my-2">
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Total Members
									</CardTitle>
									<Users />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{data?.totalCount || 0}
									</div>
									<p className="text-xs text-muted-foreground">
										+0% from last month
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">Men</CardTitle>
									<UserRound />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										+{data?.uniqueMen || 0}
									</div>
									<p className="text-xs text-muted-foreground">
										+0% from last month
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">Women</CardTitle>
									<UserRound />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										+{data?.uniqueWomen || 0}
									</div>
									<p className="text-xs text-muted-foreground">
										+0% from last month
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">Admins</CardTitle>
									<UserRound />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">+{data?.admins || 0}</div>
									<p className="text-xs text-muted-foreground">
										+1 since created
									</p>
								</CardContent>
							</Card>
						</div>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
							<Card className="col-span-4">
								<CardHeader>
									<CardTitle>Overview</CardTitle>
								</CardHeader>
								<CardContent className="pl-2">
									<Overview data={data?.membersWithinSixMonths || []} />
								</CardContent>
							</Card>
							<Card className="col-span-3">
								<CardHeader>
									<CardTitle>Recent Members</CardTitle>
									<CardDescription>
										{data?.totalMembersThisMonth || 0} total registerations this
										month.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<RecentMembers members={data?.recentMembers || []} />
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
