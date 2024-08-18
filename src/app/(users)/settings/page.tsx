'use client';
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BadgeHelp, Bell, Pencil, SettingsIcon, User } from 'lucide-react';
import Logout from '@/components/shared/logout';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hook';
import { useRouter } from 'next/navigation';
import { pushmembers } from '@/lib/auth/actions';

const Settings = () => {
	const router = useRouter();
	const member = useAppSelector((state) => state.Member);

	return (
		<div className="  max-w-m">
			<div className="flex gap-3 pt-4 shadow px-6 border-b pb-8">
				<Avatar className="h-20 w-20">
					<AvatarFallback className=" capitalize text-2xl">
						{member?.firstName?.charAt(0) || ''}
						{member?.lastName?.charAt(0) || ''}
					</AvatarFallback>
				</Avatar>
				<div className="">
					<p className="text-lg font-medium space-x-2">
						<span>{member?.firstName}</span>
						<span>{member?.lastName}</span>
					</p>
					<p className="text-sm text-gray-400 text-normal mb-2">
						{member?.email}
					</p>
					<Button
						size="sm"
						variant={'link'}
						type="submit"
						onClick={() => {
							router.push('/profile');
						}}
						// onClick={async () => {
						// 	await pushmembers();
						// }}
						className="px-3 py-0 rounded-xl hover:no-underline bg-yellow-400 text-white hover:bg-yellow-500">
						<Pencil className="w-4 h-4 mr-2" />
						Edit Profile
					</Button>
				</div>
			</div>
			<div className="py-1 px-6 shadow">
				<nav className="flex flex-col flex-1">
					<div className=" flex flex-col flex-1">
						<div className="flex flex-col gap-3 py-5 flex-1">
							<Link
								href={'/profile'}
								className="flex py-2 items-center hover:bg-gray-200 rounded">
								<User className="w-6 h-6 mr-2" /> My Profile
							</Link>
							<Link
								href={'#'}
								className="flex py-2 items-center hover:bg-gray-200 rounded">
								<Bell className="w-6 h-6 mr-2" /> Notifications
							</Link>
							<Link
								href={'#'}
								className="flex py-2 items-center hover:bg-gray-200 rounded">
								<BadgeHelp className="w-6 h-6 mr-2" /> Help and Support
							</Link>
							<Link
								href={'#'}
								className="flex py-2 items-center hover:bg-gray-200 rounded">
								<SettingsIcon className="w-6 h-6 mr-2" /> Settings
							</Link>
						</div>

						<Separator className="mt-4" />
						<div className="flex py-6">
							<Logout className="bg-transparent px-0 hover:bg-gray-200 w-full justify-start rounded hover:no-underline text-black font-normal text-base" />
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Settings;
