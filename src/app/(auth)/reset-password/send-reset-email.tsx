'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { LoaderIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useFormState } from 'react-dom';
import { sendPasswordResetLink } from '@/lib/auth/actions';

export function SendResetEmail() {
	const [state, formAction] = useFormState(sendPasswordResetLink, null);
	const router = useRouter();
	const [pending, setPending] = useState(false);

	useEffect(() => {
		if (state?.success) {
			toast.success('A password reset link has been sent to your email.');
			router.push('/login');
		}
		if (state?.error) {
			setPending(false);
			toast.error(state.error || 'An error occurred while resetting');
		}
	}, [state?.error, state?.success, router]);

	return (
		<form
			className="space-y-4"
			action={(formData) => {
				setPending(true);
				formAction(formData);
			}}>
			<div className="space-y-2">
				<Label>Your Email</Label>
				<Input
					required
					placeholder="email@example.com"
					autoComplete="email"
					name="email"
					type="email"
					className="bg-transparent rounded-3xl text-center focus-visible:border-[#2FAD64] placeholder:text-white text-white"
				/>
			</div>

			<div className="flex flex-wrap justify-between">
				<Link href={'/signup'}>
					<Button variant={'link'} size={'sm'} className="p-0 text-white">
						Not signed up? Sign up now
					</Button>
				</Link>
			</div>

			<div className="flex gap-2 flex-row-reverse">
				<Button className="w-full bg-green-500 hover:bg-green-600 rounded-2xl">
					{pending && <LoaderIcon className="mr-2 h-4 w-4 animate-spin " />}
					Reset Password
				</Button>
				<Button
					variant="secondary"
					className="w-full text-black rounded-2xl"
					asChild>
					<Link href="/login">Cancel</Link>
				</Button>
			</div>
		</form>
	);
}
