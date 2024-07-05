import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IMember } from '@/types';

export function RecentMembers({ members }: { members: IMember[] }) {
	return (
		<div className="space-y-8">
			{members.map((member) => (
				<div key={member._id} className="flex items-center">
					<Avatar className="h-9 w-9">
						<AvatarFallback className=" capitalize">
							{member?.firstName?.charAt(0) || ''}
							{member?.lastName?.charAt(0) || ''}
						</AvatarFallback>
					</Avatar>
					<div className="ml-4 space-y-1">
						<p className="text-sm font-medium leading-none">
							{member.firstName}
							{''}
							{member.lastName}
						</p>
						<p className="text-sm text-muted-foreground">{member.email}</p>
					</div>
					<div className="ml-auto font-medium">{member.gender}</div>
				</div>
			))}
		</div>
	);
}
