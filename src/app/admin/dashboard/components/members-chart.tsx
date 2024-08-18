'use client';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { MembersWithinSixMonths } from './query';

export default function MembersChart(props: {
	data?: MembersWithinSixMonths[];
}) {
	return (
		<div className=" h-[22rem] bg-card col-span-2 p-4 rounded-sm border flex flex-col">
			<strong className=" text-lg lg:text-xl font-[RobotoBold]">Members</strong>
			<div className="mt-3 w-full flex-1 text-xs">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={props?.data}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0,
						}}>
						<CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="Male" fill="#00C49F" />
						<Bar dataKey="Female" fill="#FFBB28" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
