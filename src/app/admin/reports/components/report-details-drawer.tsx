'use client';

import {
	DrawerComponent,
	DrawerComponentContent,
	DrawerComponentHeader,
} from '@/components/shared/drawer-component';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DrawerTitle } from '@/components/ui/drawer';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns/format';
import ReportResolveDrawer from './report-resolve-drawer';
import { IReport } from '@/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type Props = {
	open: boolean;
	report: IReport;
};
export default function UserDetailsDrawer(props: Props) {
	const { open, report } = props;
	return (
		<DrawerComponent open={open}>
			<DrawerComponentContent className="w-[460px]">
				<DrawerComponentHeader>
					<DrawerTitle>
						Case ID: {String(report?.id).padStart(10, '0')}
					</DrawerTitle>
				</DrawerComponentHeader>

				{report && (
					<div className="space-y-4  ">
						<Card className="flex justify-between items-center px-4">
							<div className="flex space-x-2 items-center py-2">
								<Avatar className="mr-2 h-8 w-8">
									<AvatarFallback>
										{report.first_name.charAt(0) || ''}
										{report.last_name.charAt(0) || ''}`
									</AvatarFallback>
								</Avatar>

								<div className="text-sm font-medium text-gray-900">
									{report.first_name} {report.last_name}
								</div>
							</div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
										<DotsHorizontalIcon className="h-4 w-4" />
										<span className="sr-only">Open menu</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-[180px]">
									<DropdownMenuLabel>Report menu</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<ReportResolveDrawer id={report.id} />
								</DropdownMenuContent>
							</DropdownMenu>
						</Card>

						<Card className="w-full p-4 space-y-4">
							<div className="flex justify-between items-center w-full text-sm">
								<span className="text-gray-500">Logged by:</span>
								<span className="text-primary underline">
									{report.first_name} {report.last_name}
								</span>
							</div>
							<div className="flex justify-between items-center w-full text-sm">
								<span className="text-gray-500">Date & time logged:</span>
								<span>
									{format(new Date(report.created_at), 'MMM d, yyyy | hh:mm a')}
								</span>
							</div>

							<div className="flex justify-between items-center w-full text-sm">
								<span className="text-gray-500">Report Case ID:</span>
								<span>{String(report.id).padStart(10, '0')}</span>
							</div>
							<div className="flex justify-between items-center w-full text-sm">
								<span className="text-gray-500">Reported from a group:</span>
								<span>N/A</span>
							</div>
						</Card>
						<Card className="w-full p-4 space-y-4">
							<h4 className="text-gray-600">Report description</h4>
							<p className="text-sm">{report.reason}</p>
						</Card>
					</div>
				)}
			</DrawerComponentContent>
		</DrawerComponent>
	);
}
