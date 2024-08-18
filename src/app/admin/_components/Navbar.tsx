import { Input } from '@/components/ui/input';
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserNav } from './user-nav';
import Logo from '@/assets/images/hotrlogo.png';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default function Navbar() {
	return (
		<div className=" flex bg-card justify-between shadow-md sticky z-20 top-0 h-fit rounded-lg items-center">
			<div>
				<div className="px-6 py-3 w-[17rem] flex justify-start items-center">
					<Avatar className="mr-2 h-12 w-12 bg-black">
						<AvatarImage
							src={Logo.src}
							alt={'HOTRC'}
							className="grayscale object-cover"
						/>
					</Avatar>
					<div className="">
						<h2 className="text-xl font-[RobotoRegular] ">HOTRPHC</h2>
						<p className="text-sm font-[RobotoLight]">Heritage House</p>
					</div>
				</div>
			</div>
			<form className=" flex-1 items-center hidden md:flex gap-2 ">
				<Input
					type="search"
					placeholder="Search for a product..."
					className=" flex-1 h-11 font-[RobotoLight]"
				/>
				<Button
					type="submit"
					variant={'secondary'}
					className="h-11 bg-black text-white hover:bg-black/90 font-[RobotoRegular]">
					Search
				</Button>
			</form>

			<div className="w-[27rem] col-span-4 lg:flex-row full flex justify-end items-center lg:gap-6 sm:gap-10 gap-4 mx-2">
				<UserNav />
			</div>
		</div>
	);
}
