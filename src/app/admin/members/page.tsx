import { columns } from '@/app/admin/members/components/columns';
import { DataTable } from '@/components/shared/data-table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DownloadIcon } from 'lucide-react';
import { getMembersData } from './components/query';

type Props = {
	searchParams: {
		tab?: string;
		orderBy?: string;
		take?: string;
		skip?: string;
		memberId?: string;
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
	});
	return (
		<div className="w-full h-full py-16 px-8 space-y-8">
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
						<Button variant="outline">
							<DownloadIcon className="h-5 w-5 mr-2" />
							Download
						</Button>
					</div>
				</div>
				<DataTable columns={columns} data={data} />
			</Card>
		</div>
	);
}
