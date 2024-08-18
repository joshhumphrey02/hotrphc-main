'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div>
			<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
				<h1 className="text-lg text-center font-extrabold text-gray-900 tracking-widest">
					{error.message}
				</h1>
				<div className="bg-red-500 px-2 text-sm rounded ">{error.message}</div>
				<div className="flex gap-2 items-center mt-5">
					<Link href="/">
						<Button size={'lg'} variant={'default'} className="">
							Go Home
						</Button>
					</Link>

					<Button size={'lg'} variant={'destructive'} onClick={() => reset()}>
						Try again
					</Button>
				</div>
			</div>
		</div>
	);
}
