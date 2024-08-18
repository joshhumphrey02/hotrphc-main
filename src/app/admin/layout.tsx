import type { Metadata } from 'next';
import { MainNav } from './_components/main-nav';
import Navbar from './_components/Navbar';

export const metadata: Metadata = {
	title: 'HOTRC Admin',
};

export default async function RootLayout(props: { children: React.ReactNode }) {
	return (
		<main className=" main">
			<Navbar />
			<div className="sub_main">
				<MainNav />
				<section className="sub pb-10">{props.children}</section>
			</div>
		</main>
	);
}
