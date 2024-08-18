import React from 'react';
import bgSmallImage from '@/assets/images/image.png';

export interface Form {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	gender: string;
	password: string;
	comfirmPassword: string;
}
interface Props {
	children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
	const divStyle = {
		backgroundImage: `url(${bgSmallImage.src})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		borderImage:
			'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)) fill 1',
	};
	return (
		<main
			className="flex min-h-screen items-center relative h-fit bg-center justify-between p-4"
			style={divStyle}>
			<div className="w-full">{children}</div>
		</main>
	);
};

export default Layout;
