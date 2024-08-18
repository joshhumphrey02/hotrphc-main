import { Briefcase, PieChart, Users, UsersRound } from 'lucide-react';

export default function DashboardStatsGrid(data: {
	totalCount?: number;
	uniqueMen?: number;
	uniqueWomen?: number;
	admins?: number;
}) {
	const { totalCount, uniqueMen, uniqueWomen, admins } = data;
	return (
		<div className=" xl:grid-cols-4 md:grid-cols-2 grid-cols-1 grid gap-4 w-full">
			<BoxWrapper>
				<div className="h-12 rounded-full w-12 flex items-center justify-center bg-sky-500">
					<UsersRound />
				</div>
				<div className="pl-4">
					<span className="text-md font-[RobotoRegular] xl:text-lg text-foreground">
						Total Members
					</span>
					<div className="flex items-center">
						<strong className="text-base text-muted-foreground font-[RobotoRegular]">
							{totalCount || 0}
						</strong>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="h-12 rounded-full w-12 flex items-center justify-center bg-orange-600">
					<PieChart />
				</div>
				<div className="pl-4">
					<span className="text-md font-[RobotoRegular] xl:text-lg text-foreground">
						Total Men
					</span>
					<div className="flex items-center">
						<strong className="text-base text-muted-foreground font-[RobotoRegular]">
							+{uniqueMen || 0}
						</strong>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="h-12 rounded-full w-12 flex items-center justify-center bg-yellow-400">
					<Users />
				</div>
				<div className="pl-4">
					<span className="text-md font-[RobotoRegular] xl:text-lg text-foreground">
						Total Women
					</span>
					<div className="flex items-center">
						<strong className="text-base text-muted-foreground font-[RobotoRegular]">
							+{uniqueWomen || 0}
						</strong>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="h-12 rounded-full w-12 flex items-center justify-center bg-green-600">
					<Briefcase />
				</div>
				<div className="pl-4">
					<span className="text-md font-[RobotoRegular] xl:text-lg text-foreground">
						Total Workers
					</span>
					<div className="flex items-center">
						<strong className="text-base text-muted-foreground font-[RobotoRegular]">
							+{admins || 0}
						</strong>
					</div>
				</div>
			</BoxWrapper>
		</div>
	);
}

interface BoxWrapper {
	children: Array<JSX.Element>;
}

function BoxWrapper({ children }: BoxWrapper) {
	return (
		<div className="bg-card rounded-lg p-4 flex-1 border flex items-center">
			{children}
		</div>
	);
}
