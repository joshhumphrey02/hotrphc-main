'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useFormState } from 'react-dom';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderIcon } from 'lucide-react';
import { resetPassword } from '@/lib/auth/actions';

export function ResetPassword({ token }: { token: string }) {
	const [state, formAction] = useFormState(resetPassword, null);
	const [pending, setPending] = useState(false);

	useEffect(() => {
		if (state?.error) {
			toast(state.error, {
				icon: <ExclamationTriangleIcon className="h-5 w-5 text-destructive" />,
			});
		}
	}, [state?.error]);

	return (
		<form
			action={(formData) => {
				setPending(true);
				formAction(formData);
			}}
			className="space-y-4">
			<input type="hidden" name="token" value={token} />
			<div className="space-y-2">
				<Label>New Password</Label>
				<Input
					name="password"
					required
					autoComplete="new-password"
					placeholder="********"
				/>
			</div>
			<Button className="w-full">
				{pending && <LoaderIcon className="mr-2 h-4 w-4 animate-spin " />}Reset
				Password
			</Button>
		</form>
	);
}
