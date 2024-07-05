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
import type { MembersWithinSixMonths } from './query';

export default function Overview({ data }: { data: MembersWithinSixMonths[] }) {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<BarChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 20,
					right: 30,
					left: 20,
					bottom: 5,
				}}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="female" stackId="a" fill="#8884d8" />
				<Bar dataKey="male" stackId="a" fill="#82ca9d" />
			</BarChart>
		</ResponsiveContainer>
	);
}
