'use client';

import Logo from '@/assets/images/hotr white logo  edited.png';
import { useAppSelector } from '@/redux/hook';
import Image from 'next/image';
import Personal from './components/personal';
import Professional from './components/professional';

const Profile = () => {
	const member = useAppSelector((state) => state.Member);
	const divStyle = {
		background: 'linear-gradient(rgba(10, 221, 10, 0.9), rgba(0, 14, 0, 0.8))',
	};
	return (
		<div className="">
			<div
				className="h-40 pb-9 px-6 items-end flex rounded-b justify-between"
				style={divStyle}>
				<div>
					<h3 className="text-2xl font-[RobotoRegular] text-white">
						{member.firstName} {member.lastName}
					</h3>
					<p className="text-sm text-gray-300 capitalize">
						{member.role || 'Member'}
					</p>
				</div>
				<div>
					<Image src={Logo} alt="Logo" className="w-24 h-16 rounded-full" />
				</div>
			</div>
			<div className="font-[RobotoRegular] px-3 antialiased space-y-4 my-4 ">
				<Personal member={member} />
				<Professional member={member} />
			</div>
		</div>
	);
};

export default Profile;
