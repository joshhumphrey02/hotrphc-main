import { columns } from '@/app/admin/reports/components/columns';
// import { getReportsData } from '@/app/admin/reports/components/query';
import ReportDetailsDrawer from '@/app/admin/reports/components/report-details-drawer';
import { DataTable } from '@/components/shared/data-table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IReport } from '@/types';
import { DownloadIcon } from 'lucide-react';

type Props = {
	searchParams: {
		tab?: string;
		orderBy?: string;
		take?: string;
		skip?: string;
		reportId?: string;
	};
};
export default async function page(props: Props) {
	const { searchParams } = props;
	// const data = await getReportsData({
	// 	take: 10,
	// 	skip: 0,
	// 	orderBy: {
	// 		createdAt: 'desc',
	// 	},
	// });
	let data: IReport[] = [];
	const reportData = data.find((report) => report.id === searchParams.reportId);
	return (
		<div className="w-full h-full py-16 px-8 space-y-8">
			<div>
				<h1 className=" text-3xl font-medium">Members Report</h1>
				<p className="text-gray-500">View all reports from members.</p>
			</div>
			<Card className="w-full divide-y">
				<div className="p-6 flex">
					<div className="flex-1">
						<h2 className="font-medium text-lg">All reports</h2>
						<p className="text-gray-500 text-xs">
							View all reported cases/incidents.
						</p>
					</div>
				</div>
				<DataTable columns={columns} data={data} />
			</Card>
			<ReportDetailsDrawer
				open={!!searchParams.reportId}
				report={reportData as any}
			/>
		</div>
	);
}
