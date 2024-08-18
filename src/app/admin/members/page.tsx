import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { getMemberData, getMembersData } from './components/query';
import TabsView from './components/tabs-view';
import Link from 'next/link';
import MemberDetailsDrawer from './components/member-details-drawer';

type Props = {
	searchParams: {
		tab?: string;
		orderBy?: string;
		take?: string;
		skip?: string;
		memberId?: string;
		editMember?: boolean;
	};
};
export default async function page(props: Props) {
	const { searchParams } = props;
	const data = await getMembersData({
		take: 10,
		skip: 0,
		orderBy: {
			createdAt: 'desc',
		},
		tab: searchParams.tab,
	});
	const memberData = await getMemberData({ memberId: searchParams.memberId });
	return (
		<div className="w-full h-full py-8 pt-4 px-2 pl-0 space-y-6">
			<div>
				<h1 className=" text-3xl font-medium mb-1">Members list</h1>
				<p className="text-gray-500">View all registered membersr’s.</p>
			</div>
			<Card className="w-full divide-y">
				<div className="p-6 flex">
					<div className="flex-1">
						<h2 className="font-medium text-lg">All hotrc members</h2>
						<p className="text-gray-500 text-xs">
							Find all new and existing members.
						</p>
					</div>
					<div className="ml-auto">
						<Link
							href="#"
							className=" px-3 lg:flex hidden py-2 items-center gap-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white">
							<Plus /> Add Member
						</Link>
					</div>
				</div>
				<TabsView data={data} tab={searchParams.tab || 'All'} />
			</Card>
			<MemberDetailsDrawer
				open={!!searchParams.memberId}
				user={memberData}
				editUser={!!searchParams.editMember}
			/>
		</div>
	);
}
