'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { CalendarDays, House, Menu, UserRound } from 'lucide-react';
import LinkItem from '@/components/shared/link-item';
import { usePathname } from 'next/navigation';
import { UserData } from '@/app/(users)/_components/query';
import { useAppDispatch } from '@/redux/hook';
import { updateMember } from '@/reducers/Member';

interface TabsViewProps {
	user: UserData;
	className?: string;
}

const TabsView = ({ user, className }: TabsViewProps) => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	user && dispatch(updateMember({ ...user }));
	return (
		<div
			className={cn(
				' w-full flex left-0 justify-center fixed bottom-0',
				className
			)}>
			<div className="max-w-md w-full px-6 bg-white rounded-t-xl shadow border-t border-gray-200 pt-2 flex justify-between items-center">
				<div>
					<LinkItem
						href="/"
						className={cn(
							' flex flex-col gap-2 h-fit py-2 bg-transparent text-gray-500',
							pathname === '/' ? 'text-green-500' : ''
						)}>
						<House size={24} />
						<p className="text-sm font-medium">Home</p>
					</LinkItem>
				</div>
				<div>
					<LinkItem
						href="events"
						className={cn(
							' flex flex-col gap-2 h-fit py-2 bg-transparent text-gray-500',
							pathname === '/events' ? 'text-green-500' : ''
						)}>
						<CalendarDays size={24} />
						<p className="text-sm font-medium">Events</p>
					</LinkItem>
				</div>
				<div>
					<LinkItem
						href="/profile"
						className={cn(
							' flex flex-col gap-2 h-fit py-2 bg-transparent text-gray-500',
							pathname === '/profile' ? 'text-green-500' : ''
						)}>
						<UserRound size={24} />
						<p className="text-sm font-medium">Profile</p>
					</LinkItem>
				</div>
				<div>
					<LinkItem
						href="/settings"
						className={cn(
							' flex flex-col gap-2 h-fit py-2 bg-transparent text-gray-500',
							pathname === '/settings' ? 'text-green-500' : ''
						)}>
						<Menu size={24} />
						<p className="text-sm font-medium">More</p>
					</LinkItem>
				</div>
			</div>
		</div>
	);
};

export default TabsView;
