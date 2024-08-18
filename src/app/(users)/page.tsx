'use client';
import Logo from '@/assets/images/hotr white logo  edited.png';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import Alarm from '@/assets/images/alarm.jpg';
import Smile from '@/assets/images/smile.avif';
import Link from 'next/link';
import { Settings } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns/format';
import QRCodeViewer from '@/components/shared/qr-code';
import { useAppSelector } from '@/redux/hook';

const Home = () => {
	const member = useAppSelector((state) => state.Member);
	return (
		<div className="w-full">
			<div className=" w-full px-6 py-2 h-[300px] max-h-[350px] bg-green-700 rounded-b-[4rem]">
				<div className="flex justify-between text-white items-center h-24">
					<Image src={Logo} alt="Logo" className="w-16 h-12 rounded-full" />
					<div className=" space-y-1">
						<h3 className="text-lg font-medium">
							House On The Rock <span className="text-sm">PHC</span>
						</h3>
						<h6 className="text-sm font-normal text-center">
							The Heritage House
						</h6>
					</div>
					<Link href={'/settings'}>
						<Settings size={24} />
					</Link>
				</div>
				<div className=" w-full mt-12 relative">
					<div className=" w-full justify-center flex absolute top-0 z-10 left-0">
						<Card className=" py-6  w-[90%] space-y-4">
							<div className="flex px-3 items-center border-b border-gray-300 flex-col justify-between gap-4">
								<Avatar className="h-14 w-14">
									<AvatarFallback className=" capitalize">
										{member?.firstName?.charAt(0) || ''}
										{member?.lastName?.charAt(0) || ''}
									</AvatarFallback>
								</Avatar>
								<div className=" space-y-1 pb-3 text-center">
									<h2 className="text-xl font-bold text-center">
										Welcome <br /> {member?.firstName} {member?.lastName}
									</h2>
									{member.createdAt && (
										<p className="text-gray-400 text-sm font-medium">
											Joined,{' '}
											<time>
												{format(
													new Date(member.createdAt),
													'MMM d, yyyy, hh:mm a'
												)}
											</time>
										</p>
									)}
								</div>
							</div>
							<div className="flex items-center gap-4 px-4 justify-between">
								<div>
									<h5 className="text-sm font-medium text-nowrap">
										Your QR-code
									</h5>
									<p className="text-gray-400 text-xs">
										Generate your QR Code.
									</p>
								</div>
								<QRCodeViewer {...member} />
							</div>
						</Card>
					</div>
				</div>
			</div>
			<div className="mt-[160px] space-y-4 px-6">
				<Card className="bg-green-100 py-4 px-4 space-y-3">
					<div className="flex px-3 items-center flex-col justify-between gap-4">
						<div className="w-24 h-24 rouded-full overflow-hidden">
							<Image
								src={Smile}
								alt="smile"
								className=" object-cover rounded-full"
							/>
						</div>
						<div className=" space-y-1 pb-3 text-center">
							<h2 className="text-xl font-bold">You have almost reached</h2>
							<p className="text-gray-400 text-sm font-medium">
								Your profile is almost complete, update your profile to enjoy
								the amazing features that will be rolled out soon.
							</p>
						</div>
					</div>
				</Card>
				<Card className=" grid grid-cols-[auto,40%] gap-2 my-2 py-4 border-0">
					<div className="w-full">
						<h3 className="text-lg font-semibold mb-2">Events Timeline</h3>
						<p className="text-sm font-normal text-gray-500">
							Your upcoming church events will be rolled out here in a short
							while
						</p>
					</div>
					<div className="w-full flex justify-center items-center">
						<Image src={Alarm} alt="Alarm Clock" className=" w-20 h-20" />
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Home;
