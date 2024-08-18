'use client';

import { UserData } from '@/app/(users)/_components/query';
import { columns } from '@/app/admin/members/components/columns';
import { DataTable } from '@/components/shared/data-table';
import { DataTableToolbar } from '@/components/shared/data-table-toolbar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
	data: UserData[];
	tab: string;
};
const tabs = ['All', 'Verified', 'Men', 'Women'];
export default function TabsView(props: Props) {
	const { data, tab } = props;
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	function handleTabChange(tab: string) {
		const params = new URLSearchParams(searchParams);
		params.set('tab', tab);
		replace(`${pathname}?${params.toString()}`);
	}
	return (
		<Tabs defaultValue={tab} onValueChange={handleTabChange}>
			<DataTable
				columns={columns}
				data={data}
				HeaderComponent={({ table }) => (
					<div className="py-4 px-6 border-b flex justify-between space-x-4">
						<TabsList className=" bg-white shadow-custom-2 border border-slate-200">
							{tabs.map((tab, index) => {
								return (
									<TabsTrigger
										key={index}
										className="data-[state=active]:bg-slate-200"
										value={tab}>
										{tab}
									</TabsTrigger>
								);
							})}
						</TabsList>
						<DataTableToolbar table={table as any} />
					</div>
				)}
			/>
		</Tabs>
	);
}
