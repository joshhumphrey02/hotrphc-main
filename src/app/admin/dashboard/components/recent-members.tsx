import { UserData } from '@/app/(users)/_components/query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function RecentMembers(data: {
	recentMembers: UserData[];
	totalMembersThisMonth?: number;
}) {
	const { recentMembers: members, totalMembersThisMonth } = data;
	return (
		<div className="w-full xl:col-span-1 col-span-2 bg-card p-4 rounded-sm border border_color">
			<div>
				<strong className=" text-lg lg:text-xl font-[RobotoBold]">
					Recent Members
				</strong>
				<p className="text-sm font-[RotoboLight]">
					{totalMembersThisMonth || 0} total registerations this month.
				</p>
			</div>
			<div className="mt-4 flex flex-col gap-3">
				{members &&
					members.map((member) => (
						<a
							key={member?.id}
							href={`/admin/members/${member?.id}`}
							className="flex items-start hover:no-underline">
							<Avatar className="h-9 w-9">
								<AvatarFallback className=" capitalize">
									{member?.firstName?.charAt(0) || ''}
									{member?.lastName?.charAt(0) || ''}
								</AvatarFallback>
							</Avatar>
							<div className="ml-4 flex-1">
								<p className="text-sm lg:text-md font-[robotoRegular] text-black">
									{member?.firstName}
									{''}
									{member?.lastName}
								</p>
								<span className="text-xs font-[RotoboLight] text-gray-500">
									{member?.email}
								</span>
							</div>
							<div
								className={cn(
									'text-sm font-[robotoRegular] text-black pl-1.5',
									member?.gender === 'Male'
										? 'text-green-500'
										: 'text-yellow-500'
								)}>
								{member?.gender}
							</div>
						</a>
					))}
			</div>
		</div>
	);
}
