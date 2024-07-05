import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/toaster';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { MainNav } from './_components/main-nav';
import { Search } from './_components/search';
import { UserNav } from './_components/user-nav';
import Logo from '@/assets/images/hotrlogo.png';
import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/lucia/validate-request';

export const metadata: Metadata = {
	title: 'HOTRC Admin',
};

export default async function RootLayout(props: { children: React.ReactNode }) {
	const { session, user } = await validateRequest();
	if (!session?.userId) redirect('/login');
	return (
		<main className="min-h-screen w-full">
			<header className="px-4">
				<div className="border-b">
					<div className="flex h-16 items-center px-4">
						<div className="w-[200px] justify-between">
							<Avatar className="mr-2 h-12 w-12 bg-black">
								<AvatarImage
									src={Logo.src}
									alt={'HOTRC'}
									className="grayscale object-cover"
								/>
							</Avatar>
						</div>
						<MainNav className="mx-6" />
						<div className="ml-auto flex items-center space-x-4">
							<Search />
							<UserNav />
						</div>
					</div>
				</div>
			</header>
			<section className=" w-full">{props.children}</section>
			<Toaster />
		</main>
	);
}
