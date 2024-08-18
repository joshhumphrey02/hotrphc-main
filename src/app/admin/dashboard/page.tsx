import { Metadata } from 'next';
import { RecentMembers } from '@/app/admin/dashboard/components/recent-members';
import { Plus } from 'lucide-react';
import { GetMembersFullData } from './components/query';
import DashboardStatsGrid from './components/DashboardStatsGrid';
import MembersChart from './components/members-chart';
import HotrphcPieChart from './components/hotrphc-pie-chart';
import RecentTestimonials from './components/recent-testimonials';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'HOTRC Dashboard',
	description: 'Dashboard of HOTRC',
};

export default async function Dashboard() {
	const data = await GetMembersFullData();
	return (
		<>
			<div className="flex-col md:flex w-full">
				<div className="flex-1 space-y-4 p-8 pl-0 pt-6">
					<div className=" mt-1 mb-3 px-1 pt-2 flex flex-row justify-between items-center">
						<div>
							<h1 className=" font-[RobotoBold] md:text-2xl capitalize text-xl">
								HOTRPHC Dashboard
							</h1>
							<h4 className=" font-[RobotoLight] mt-2 lg:text-lg text-[12px]">
								Create, manage and track your members and activities.
							</h4>
						</div>
						<Link
							href="#"
							className=" px-3 lg:flex hidden py-2 items-center gap-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white">
							<Plus /> Add Member
						</Link>
					</div>
					<div className="w-full flex flex-col gap-4">
						<DashboardStatsGrid {...data} />
						<div className="grid xl:grid-cols-3 grid-cols-2 gap-4 w-full">
							<MembersChart data={data?.membersWithinSixMonths} />
							<HotrphcPieChart {...data} />
						</div>
						<div className=" grid xl:grid-cols-3 grid-cols-2 gap-4 w-full">
							<RecentTestimonials />
							<RecentMembers
								totalMembersThisMonth={data?.totalMembersThisMonth}
								recentMembers={data?.recentMembers}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
