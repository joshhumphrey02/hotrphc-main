'use client';

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
import { IMember } from '@/types';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { ColumnDef, Row } from '@tanstack/react-table';
import { format } from 'date-fns/format';
import { UserRound } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<IMember>[] = [
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
							<span className="truncate">{member.phoneNumber}</span>
						</div>
					</Link>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			const member = row.original;

			const firstName = member.firstName || '';
			const lastName = member.lastName || '';
			const phoneNumber = member.phoneNumber || '';
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
		id: 'phoneNumber',
		header: 'Phone Number',
		cell({ row }) {
			const phoneNumber = row.original?.phoneNumber;
			return (
				<span className="text-sm text-gray-500 ml-auto">
					{phoneNumber || 'N/A'}
				</span>
			);
		},
	},
	{
		accessorKey: 'category',
		header: 'Category',
		cell({ row }) {
			const category = row.original.category;
			return (
				<span className="text-sm text-blue-500 mx-auto">
					{category || 'N/A'}
				</span>
			);
		},
	},
	{
		accessorKey: 'gender',
		header: 'Gender',
		cell({ row }) {
			const gender = row.original.gender;
			return <span className="text-sm text-center">{gender || ''}</span>;
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
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="flex h-10 w-10 p-0 data-[state=open]:bg-muted border-gray-30">
					<DotsVerticalIcon className="h-4 w-4" />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				<DropdownMenuLabel>Member menu</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="flex gap-2 items-center">
					<UserRound size={16} />
					Edit member
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
