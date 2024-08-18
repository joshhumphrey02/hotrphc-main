'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LinkItem(props: {
	href: string;
	children: React.ReactNode;
}) {
	const { href, children } = props;
	const pathname = usePathname();
	const isActive = pathname === href;
	return (
		<Link
			href={href}
			className={cn(
				'px-2 h-10 items-center flex hover:bg-gray-100',
				isActive ? 'text-primary bg-primary/10 rounded ' : ''
			)}>
			{children}
		</Link>
	);
}
