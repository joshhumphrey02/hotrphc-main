'use client';

// import type { ReportsData } from '@/app/(admin)/reports/components/query';
// import ReportStatusBadge from '@/app/(admin)/reports/components/report-status-badge';
import { DataTableColumnHeader } from '@/components/shared/data-table-column-header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatPhoneNumber } from '@/lib/utils';
import { IReport } from '@/types';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef, Row } from '@tanstack/react-table';
import { format } from 'date-fns/format';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const columns: ColumnDef<IReport>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: 'reason',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Report description" />
		),
		cell({ row }) {
			const report = row.original;
			return (
				<Link
					href={`reports?reportId=${report.id}`}
					className=" hover:underline">
					<div className="text-sm font-medium text-gray-900 text-pretty">
						{report.reason}
					</div>
					<div className="text-sm text-gray-500">
						<span className="truncate">
							{String(report.id).padStart(10, '0')}
						</span>
					</div>
				</Link>
			);
		},
	},
	{
		id: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Member's Name" />
		),
		enableSorting: false,
		enableHiding: false,
		cell({ row }) {
			const user = row.original;
			const name = `${user?.first_name || ''} ${user?.last_name || ''}`;
			return (
				<div className="flex space-x-2">
					<Avatar className="mr-2 h-8 w-8">
						<AvatarFallback>
							{user?.first_name.charAt(0) || ''}
							{user?.last_name.charAt(0) || ''}`
						</AvatarFallback>
					</Avatar>
					<Link href={`/users?userId=${user.id}`} className=" hover:underline">
						<div className="text-sm font-medium text-gray-900">{name}</div>
						<div className="text-sm text-gray-500">
							<span className="truncate">
								{formatPhoneNumber(user.phone_number)}
							</span>
						</div>
					</Link>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			const user = row.original;

			const firstName = user.first_name || '';
			const lastName = user.last_name || '';
			const phoneNumber = formatPhoneNumber(user.phone_number);
			const newRegex = new RegExp(value, 'ig');
			return (
				newRegex.test(firstName) ||
				newRegex.test(lastName) ||
				newRegex.test(phoneNumber)
			);
		},
	},

	{
		accessorKey: 'createdAt',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Date logged" />
		),
		cell({ row }) {
			const createdAt = row.getValue('createdAt') as string;
			return (
				<time className="text-sm text-gray-500 ml-auto">
					{format(new Date(createdAt), 'MMM d, yyyy,  hh:mm a')}
				</time>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const navigate = useRouter();
	const report: IReport = row.original as any;
	return (
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
				<DropdownMenuItem
					onClick={() => navigate.push(`?reportId=${report.id}`)}>
					View Report
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
