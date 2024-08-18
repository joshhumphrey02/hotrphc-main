import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	ArrowUpRight,
	Bell,
	BookOpen,
	Church,
	Flame,
	LayoutDashboard,
	MapPin,
	Music,
	Search,
	Settings2,
} from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import React from 'react';
import worship from '@/assets/images/worship.jpg';
import Link from 'next/link';

const Events = () => {
	const divStyle = {
		background: 'linear-gradient(to bottom, #ffc830, #9e8643)',
	};
	return (
		<div className="bg-gray-50 pb-5">
			<div className=" space-y-3">
				<div
					className="h-48 pb-3 flex flex-col justify-end pt-10 px-5 rounded-b-[2.5rem]"
					style={divStyle}>
					<div className="w-full">
						<div className="flex justify-between items-center w-full mb-6">
							<div className="space-y-1">
								<h2 className=" text-xl font-[RobotoBold] flex items-start text-white">
									House On The Rock <span className="text-sm">PHC</span>
								</h2>
								<p className="text-base text-white font-[RobotoRegular] ">
									Heritage House
								</p>
							</div>
							<span className="text-black bg-white p-3 border-4 relative border-gray-200 rounded-full">
								<Bell size={18} />
								<span className=" rounded-full w-2 h-2 bg-red-500 absolute top-3 right-3"></span>
							</span>
						</div>
						<div className="w-full flex gap-2 bg-white items-center py-2 rounded-3xl  px-3">
							<Search size={18} />
							<Input
								type="search"
								placeholder="Search event"
								className="border-0 h-fit focus-visible:ring-0 focus-within:ring-offset-0 py-1"
							/>
							<span className="p-2 bg-gray-200 rounded-full">
								<Settings2 size={18} />
							</span>
						</div>
					</div>
				</div>
				<div className="px-3 py-2">
					<div className=" my-2">
						<h2 className=" text-lg ">Upcoming Events</h2>
					</div>
					<div className=" w-full mx-auto my-0 h-[7.9rem] flex gap-3 overflow-x-scroll ">
						<EventImage
							image={worship}
							title="INTENSE"
							date="13th, July 2024 @8:00AM "
						/>
						<EventImage
							image={worship}
							title="HERITAGE FUN"
							date="13th, July 2024 @12:00AM "
						/>
					</div>
				</div>
				<div className="px-3 space-y-4 my-3">
					<div className="flex justify-between items-center">
						<h2 className="text-lg flex space-x-2">
							Top Picks <Flame size={24} className=" text-red-500" />
						</h2>
						<Link href={'#'} className=" underline">
							View All
						</Link>
					</div>
					<div className="w-full h-[4rem] overflow-x-scroll mx-auto flex gap-3 ">
						<div className=" inline-block">
							<div className="flex gap-3 bg-white w-fit cursor-pointer rounded-3xl px-5 py-2 items-center">
								<span className="bg-gray-200 p-3 rounded-full">
									<LayoutDashboard size={15} className=" text-yellow-500" />
								</span>
								<span>All</span>
							</div>
						</div>
						<div className=" inline-block">
							<div className="flex gap-3 bg-white w-fit cursor-pointer rounded-3xl px-5 py-2 items-center">
								<span className="bg-gray-200 p-3 rounded-full">
									<Music size={15} className=" text-yellow-500" />
								</span>
								<span>Concert</span>
							</div>
						</div>
						<div className=" inline-block">
							<div className="flex gap-3 bg-white w-fit cursor-pointer rounded-3xl px-5 py-2 items-center">
								<span className="bg-gray-200 p-3 rounded-full">
									<Church size={15} className=" text-yellow-500" />
								</span>
								<span>Services</span>
							</div>
						</div>
						<div className=" inline-block">
							<div className="flex gap-3 bg-white w-fit cursor-pointer rounded-3xl px-5 py-2 items-center">
								<span className="bg-gray-200 p-3 rounded-full">
									<BookOpen size={15} className=" text-yellow-500" />
								</span>
								<span>Messages</span>
							</div>
						</div>
					</div>
					<div className="">
						<div
							className="w-full h-[10rem] rounded-xl flex items-end"
							style={{
								backgroundImage: `url(${worship.src})`,
								backgroundPosition: 'center',
							}}>
							<div className="flex justify-between items-center bg-black/20 px-3 py-1 mx-2 my-3 rounded-[3rem] text-white w-full">
								<div>
									<span>13th July, 2024</span>
									<h1>Sunday Worship Service 💯</h1>
								</div>
								<div>
									<Button
										className="p-3 px-2 rounded-full hover:bg-black/20 hover:text-green-500 bg-black/30"
										variant="ghost">
										<ArrowUpRight size={24} />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Events;

interface EventProps {
	title: string;
	date: string;
	location?: string;
	image: StaticImageData | string;
}

const EventImage = (props: EventProps) => {
	const { title, date, location, image } = props;
	return (
		<div className=" inline-block">
			<div className="grid grid-cols-[35%,auto] px-3 py-1 gap-3 w-[20rem] items-center min-h-[7.5rem] bg-white rounded-[2rem] shadow">
				<div className=" rounded-[2rem] w-full h-[6rem] overflow-hidden ">
					<Image
						src={image}
						alt="Event image"
						width={150}
						height={100}
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="flex flex-col w-full">
					<span className=" text-xs text-gray-500 font-light">{date}</span>
					<span className="flex-1 text-black leading-5 font-[RobotoBold] text-base my-2">
						{title}
					</span>
					<div className="flex space-x-1 text-[11px] text-gray-500 font-light">
						<MapPin size={20} />
						<span>
							Plot F/23 Sani Abacha Road, GRA Phase III, Port Harcourt
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
