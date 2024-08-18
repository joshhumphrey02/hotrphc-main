'use client';
import { format } from 'date-fns';
import TestimonyStatusBadge from '@/components/shared/testimony-status';

export default function RecentTestimonials() {
	return (
		<div className="bg-card recent col-span-2 pt-3 pb-4 rounded-sm border flex-1">
			<strong className=" text-lg lg:text-xl px-4 font-[RobotoBold]">
				Recent Testimonials
			</strong>
			<div className=" rounded-sm mt-3 px-3">
				<table className="w-full text-muted-foreground">
					<thead>
						<tr>
							<th className=" hidden sm:table-cell">ID</th>
							<th className=" hidden sm:table-cell">Member-ID</th>
							<th className="">Full Name</th>
							<th>Posted</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className=" hidden sm:table-cell">
								<span>#1234</span>
							</td>
							<td className="hidden sm:table-cell">
								<a href={`/admin/members/`}>#{345678}</a>
							</td>
							<td>
								<a href={`/admin/members/`}>Humphrey Joshua</a>
							</td>
							<td>12-07-2024</td>
							<td>
								<TestimonyStatusBadge status="PENDING" />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
