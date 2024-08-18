import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div>
			<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
				<h1 className="text-9xl font-extrabold text-gray-900 tracking-widest">
					404
				</h1>
				<div className="bg-blue-500 px-2 text-sm rounded rotate-12 absolute">
					Page Not Found
				</div>
				<Link href="/" className="mt-5">
					<Button size={'lg'} variant={'secondary'}>
						Go Home
					</Button>
				</Link>
			</div>
		</div>
	);
}
