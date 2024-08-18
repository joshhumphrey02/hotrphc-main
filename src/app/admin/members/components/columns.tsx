'use client';

import { DataTableColumnHeader } from '@/components/shared/data-table-column-header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { IMember } from '@/types';
import { ColumnDef, Row } from '@tanstack/react-table';
import { format } from 'date-fns/format';
import Link from 'next/link';
import MemberDropdown from './member-dropdown';
import { Badge } from '@/components/ui/badge';
import { UserData } from '@/app/(users)/_components/query';

export const columns: ColumnDef<UserData>[] = [
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
		id: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Member's Name" />
		),
		enableSorting: false,
		enableHiding: false,
		cell({ row }) {
			const member = row.original;
			const name = `${member?.firstName || ''} ${member?.lastName || ''} `;
			return (
				<div className="flex space-x-2">
					<Avatar className="h-8 w-8">
						<AvatarFallback className=" capitalize">
							{member?.firstName?.charAt(0) || ''}
							{member?.lastName?.charAt(0) || ''}
						</AvatarFallback>
					</Avatar>
					<Link href={`#`} className=" hover:underline">
						<div className="text-sm font-medium capitalize text-gray-900">
							{name}
						</div>
						<div className="text-sm text-gray-500">
							<span className="truncate">{member?.phoneNumber || ''}</span>
						</div>
					</Link>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			const member = row.original;

			const firstName = member?.firstName || '';
			const lastName = member?.lastName || '';
			const phoneNumber = member?.phoneNumber || '';
			const newRegex = new RegExp(value, 'ig');
			return (
				newRegex.test(firstName) ||
				newRegex.test(lastName) ||
				newRegex.test(phoneNumber)
			);
		},
	},
	{
		accessorKey: 'created',
		header: 'Created',
		cell({ row }) {
			const createdAt = row.original?.createdAt;
			return (
				<time className="text-sm text-gray-500 ml-auto">
					{createdAt
						? format(new Date(createdAt), 'MMM d, yyyy,  hh:mm a')
						: 'N/A'}
				</time>
			);
		},
	},
	{
		id: 'verified',
		header: 'Verified',
		cell({ row }) {
			const verified = row.original?.status;
			return (
				<Badge
					className={cn(
						'text-sm ml-auto text-white',
						verified === 'VERIFIED' ? 'bg-green-500' : 'bg-yellow-500'
					)}>
					{verified || 'Pending'}
				</Badge>
			);
		},
	},
	{
		accessorKey: 'category',
		header: 'Category',
		cell({ row }) {
			const category = row.original?.role;
			return (
				<span className="text-sm text-blue-500 mx-auto capitalize">
					{category || 'N/A'}
				</span>
			);
		},
	},
	{
		accessorKey: 'gender',
		header: 'Gender',
		cell({ row }) {
			const gender = row.original?.gender;
			return (
				<span
					className={cn(
						'text-sm text-center',
						gender === 'M' ? 'text-green-500' : 'text-yellow-500'
					)}>
					{gender || ''}
				</span>
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
	const user: IMember = row.original as any;
	return <MemberDropdown id={user.id as string} />;
}
