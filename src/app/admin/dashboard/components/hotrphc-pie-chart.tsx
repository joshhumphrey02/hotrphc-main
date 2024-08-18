'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { FC } from 'react';

interface CRender {
	cx: number;
	cy: number;
	midAngle: number;
	innerRadius: number;
	outerRadius: number;
	percent: number;
}

export default function HotrphcPieChart(info: {
	uniqueMen?: number;
	uniqueWomen?: number;
	workers?: number;
}) {
	const { uniqueMen, uniqueWomen, workers } = info;
	const data = [
		{ name: 'Men', value: uniqueMen },
		{ name: 'Women', value: uniqueWomen },
		{ name: 'Worker', value: workers },
	];

	const RADIAN = Math.PI / 180;
	const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

	const renderCustomizedLabel: FC<CRender> = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill="white"
				textAnchor={x > cx ? 'start' : 'end'}
				dominantBaseline="central">
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};
	return (
		<div className=" w-full hidden xl:flex h-[22rem] bg-card p-2 rounded-sm border flex-col">
			<strong className=" text-md lg:text-lg font-[RobotoBold]">
				HOTRPHC Chart
			</strong>
			<div className="mt-3 w-full flex-1 text-xs">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart width={400} height={300}>
						<Pie
							data={data}
							cx="50%"
							cy="45%"
							labelLine={false}
							label={renderCustomizedLabel}
							outerRadius={105}
							fill="#8884d8"
							dataKey="value">
							{data.map((_, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
