import { redirect } from 'next/navigation';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { SendResetEmail } from './send-reset-email';
import { validateRequest } from '@/lib/auth/validate-request';
export const metadata = {
	title: 'Forgot Password',
	description: 'HOTR Password Page',
};

export default async function ForgotPasswordPage() {
	const { session } = await validateRequest();
	if (session?.userId) redirect('/');
	return (
		<div className=" flex justify-center items-center">
			<Card className="w-full max-w-md text-white bg-transparent shadow-none border-0">
				<CardHeader className="px-0">
					<CardTitle>Forgot password?</CardTitle>
					<CardDescription className=" text-gray-300">
						Password reset link will be sent to your email.
					</CardDescription>
				</CardHeader>
				<CardContent className="px-0">
					<SendResetEmail />
				</CardContent>
			</Card>
		</div>
	);
}
