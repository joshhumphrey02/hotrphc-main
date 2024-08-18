'use client';

import {
	DrawerComponent,
	DrawerComponentContent,
	DrawerComponentHeader,
} from '@/components/shared/drawer-component';
import { Card } from '@/components/ui/card';
import { DrawerTitle } from '@/components/ui/drawer';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn, formatPhoneNumber } from '@/lib/utils';
import { Tabs } from '@radix-ui/react-tabs';
import { format } from 'date-fns/format';
import { useFormStatus } from 'react-dom';
import { useCallback, useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import MemberDropdown from './member-dropdown';
import { Badge } from '@/components/ui/badge';
import { UserData } from '@/app/(users)/_components/query';
import { updateMemberData } from './query';

type Props = {
	open: boolean;
	user: UserData | null;
	editUser?: boolean;
};
export default function MemberDetailsDrawer(props: Props) {
	const { open, user, editUser = false } = props;
	const router = useRouter();
	const pathname = usePathname();
	const { pending } = useFormStatus();
	const [form, setForm] = useState({
		firstName: user?.firstName || '',
		lastName: user?.lastName || '',
		email: user?.email || '',
	});
	const handleClose = useCallback(() => {
		router.push(pathname);
	}, [router]);

	useEffect(() => {
		setForm({
			firstName: user?.firstName || '',
			lastName: user?.lastName || '',
			email: user?.email || '',
		});
	}, [user]);
	return (
		<DrawerComponent open={open}>
			<DrawerComponentContent className="w-[450px]">
				<DrawerComponentHeader>
					<DrawerTitle>{"Member's details"}</DrawerTitle>
				</DrawerComponentHeader>
				{user && !editUser && (
					<div className="space-y-2  ">
						<Card className="flex justify-between items-center px-4">
							<div className="flex space-x-2 items-center py-2">
								<Avatar className="h-8 w-8">
									<AvatarFallback className=" capitalize">
										{user?.firstName?.charAt(0) || ''}
										{user?.lastName?.charAt(0) || ''}
									</AvatarFallback>
								</Avatar>
								<div className="text-sm font-medium text-gray-900">
									{user.firstName} {user.lastName}
								</div>
							</div>
							<MemberDropdown id={user.id as string} edit={true} />
						</Card>
						<Tabs defaultValue="Personal details" className="w-full  space-y-4">
							<TabsList className="bg-white shadow-custom-2 border border-slate-200 grid w-full grid-cols-2 h-12 ">
								<TabsTrigger
									className="data-[state=active]:bg-slate-200"
									value="Personal details">
									Personal details
								</TabsTrigger>
								<TabsTrigger
									className="data-[state=active]:bg-slate-200"
									value="Professional details">
									Professional details
								</TabsTrigger>
							</TabsList>
							<TabsContent
								value="Personal details"
								className="w-full space-y-2">
								<Card className="w-full p-4 space-y-4">
									<div className="flex justify-between items-center w-full text-sm">
										<span className="text-gray-500">Full Name:</span>
										<span>
											{user?.firstName} {user.lastName}
										</span>
									</div>
									<div className="flex justify-between items-center w-full text-sm">
										<span className="text-gray-500">Phone number:</span>
										<span>{formatPhoneNumber(user?.phoneNumber || '')}</span>
									</div>
									<div className="flex justify-between items-center w-full text-sm">
										<span className="text-gray-500">Email address:</span>
										<span>{user.email}</span>
									</div>
									<div className="flex justify-between items-center w-full text-sm">
										<span className="text-gray-500">Gender:</span>
										<span>{user.gender || 'n/a'}</span>
									</div>
									<div className="flex justify-between items-center w-full text-sm">
										<span className="text-gray-500">Category:</span>
										<span>{user.role || 'n/a'}</span>
									</div>
									<div className="flex justify-between items-center w-full text-sm">
										<span className="text-gray-500">Date of birth:</span>
										<span>
											{user.dob ? format(user.dob, 'dd MMM yyyy') : 'n/a'}
										</span>
									</div>
									<div className="flex justify-between items-center w-full text-sm">
										<span className="text-gray-500">Date Joined:</span>
										<span>
											{user.createdAt
												? format(
														new Date(user.createdAt),
														'MMM d, yyyy,  hh:mm a'
												  )
												: 'n/a'}
										</span>
									</div>
									<div className="flex justify-between items-center w-full text-sm">
										<span className="text-gray-500">Status:</span>
										<Badge
											className={cn(
												'text-sm ml-auto text-white',
												user.isEmailVerified ? 'bg-green-500' : 'bg-yellow-500'
											)}>
											{user.isEmailVerified || 'Pending'}
										</Badge>
									</div>
								</Card>
							</TabsContent>

							<TabsContent
								value="Professional details"
								className="w-full space-y-2">
								<Card className="w-full p-4 space-y-4">
									<div className="flex justify-between items-center w-full text-sm">
										<span className="text-gray-500">Occupation:</span>
										<span>{user?.occupation || 'n/a'}</span>
									</div>
									<div className="flex justify-between items-center w-full text-sm">
										<span className="text-gray-500">Employement Status:</span>
										<span>{user?.employmentStatus || 'n/a'}</span>
									</div>
									<div className="flex justify-between items-center w-full text-sm">
										<span className="text-gray-500">Marital Status:</span>
										<span>{user?.maritalStatus || 'n/a'}</span>
									</div>
									<div className="flex justify-between items-center w-full text-sm">
										<span className="text-gray-500">Marital Status:</span>
										<span>{user?.bornAgain || 'n/a'}</span>
									</div>
								</Card>
							</TabsContent>
						</Tabs>
					</div>
				)}
				{editUser && (
					<form className="space-y-4">
						<input type="hidden" name="id" value={user?.id} />
						<div className="pt-4">
							<Label
								className="text-sm font-medium text-gray-900"
								htmlFor="email">
								Email Address
							</Label>
							<Input
								type="email"
								placeholder="Email Address"
								name="email"
								value={form?.email || ''}
								onChange={(e) =>
									setForm((v) => ({ ...v, email: e.target.value }))
								}
							/>
						</div>
						<div className="pt-4">
							<Label
								className="text-sm font-medium text-gray-900"
								htmlFor="firstName">
								First Name
							</Label>
							<Input
								type="text"
								placeholder="First Name"
								name="firstName"
								value={form?.firstName || ''}
								onChange={(e) =>
									setForm((v) => ({ ...v, firstName: e.target.value }))
								}
							/>
						</div>
						<div className="pt-4">
							<Label
								className="text-sm font-medium text-gray-900"
								htmlFor="lastName">
								Last Name
							</Label>
							<Input
								type="text"
								placeholder="Last Name"
								name="lastName"
								value={form?.lastName || ''}
								onChange={(e) =>
									setForm((v) => ({ ...v, lastName: e.target.value }))
								}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4 pt-8">
							<Button
								variant="outline"
								size="lg"
								type="button"
								onClick={handleClose}>
								Cancel
							</Button>
							<Button
								size="lg"
								onClick={async () => {
									if (!user || !user.id) return;
									await updateMemberData({ userId: user?.id, userdata: form });
									router.refresh();
								}}
								disabled={pending}
								type="button">
								Update
								<Loader2Icon
									className={`h-5 w-5 ml-2 ${
										pending ? 'animate-spin' : 'hidden'
									}`}
								/>
							</Button>
						</div>
					</form>
				)}
			</DrawerComponentContent>
		</DrawerComponent>
	);
}
