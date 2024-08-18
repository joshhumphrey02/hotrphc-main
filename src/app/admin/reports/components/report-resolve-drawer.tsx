import React, { useRef, useState } from 'react';
import { DrawerComponentHeader } from '@/components/shared/drawer-component';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CheckCheck, CircleCheckBig } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const ReportResolveDrawer = ({ id }: { id: string }) => {
	const navigate = useRouter();
	const [comment, setComment] = useState('');
	return (
		<Drawer direction="right">
			<DrawerTrigger asChild>
				<span className="relative flex gap-2 cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900  dark:focus:bg-gray-800 dark:focus:text-gray-50">
					<CheckCheck size={16} />
					mark as resolved
				</span>
			</DrawerTrigger>
			<DrawerContent
				showBar={false}
				className="h-screen  top-0 right-0 left-auto mt-0 px-3 w-[460px] overflow-y-scroll rounded-none">
				<DrawerComponentHeader />
				<DrawerDescription className="w-full h-full ">
					<Card className={cn('grid w-full gap-2 p-4')}>
						<span className="mb-3 bg-green-200 w-fit rounded-full p-2">
							<CircleCheckBig size={26} color="green" />
						</span>
						<div className="my-2">
							<h2 className=" text-lg font-medium text-black mb-2">
								Report resolved?
							</h2>
							<p className="text-[#667085] text-sm font-normal">
								Please add a detailed comment before you confirm it’s resolved
								and the report will be closed.
							</p>
						</div>
						<div>
							<h4 className=" text-sm font-medium mb-2">Comment</h4>
							<Textarea
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								placeholder="Type your comment here."
								className="mb-4"
							/>
							<div className=" w-full flex gap-3 items-center justify-center py-2">
								<DrawerClose>
									<Button size="lg" type="reset">
										Cancel
									</Button>
								</DrawerClose>

								<Button
									onClick={async () => {
										if (comment.length < 5) return;
										// await updateReport(id, comment)
										toast({
											title: 'Report resolved',
											description: 'Report reslved successfully.',
											variant: 'default',
										});
										navigate.refresh();
									}}
									className={cn(
										'',
										comment.length > 5
											? 'cursor-pointer bg-[#7B61FF]'
											: 'cursor-not-allowed bg-[#7B61FF]/60'
									)}
									size="lg"
									type="button">
									Comfirm
								</Button>
							</div>
						</div>
					</Card>
				</DrawerDescription>
			</DrawerContent>
		</Drawer>
	);
};

export default ReportResolveDrawer;
