import React from 'react';
import Image from 'next/image';
import bgImage from '@/assets/images/mel.jpeg';
import bgSmallImage from '@/assets/images/image.png';

export interface Form {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	gender: 'M' | 'F';
	password: string;
	comfirmPassword: string;
}
interface Props {
	children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
	return (
		<main className="flex min-h-screen items-center relative justify-between p-24">
			<>
				<Image
					src={bgImage}
					alt="Background"
					className=" absolute top-0 object-cover sm:inline-block hidden left-0 opacity-70 w-screen h-screen"
					style={{ zIndex: '-10px' }}
					width={100}
					height={100}
				/>
				<Image
					src={bgSmallImage}
					alt="Background"
					className=" absolute top-0 sm:hidden object-cover inline-block left-0 opacity-70 w-screen h-screen"
					style={{ zIndex: '-10px' }}
					width={100}
					height={100}
				/>
			</>

			<div>{children}</div>
		</main>
	);
};

export default Layout;
