import { validateRequest } from '@/lib/auth/validate-request';
import OtpForm from './otp-form';
import { redirect } from 'next/navigation';

export const metadata = {
	title: 'Verify Email',
	description: 'HOTR Email Verification Page',
};

const Verify = async () => {
	const { session, user } = await validateRequest();
	if (!session?.userId) redirect('/login');
	if (user.verified) return '/';
	return (
		<div className="w-screen h-screen top-0 left-0 absolute flex justify-center items-center">
			<div className="mx-auto w-full max-w-sm">
				<div className="relative font-inter antialiased">
					<main className="relative flex flex-col justify-center items-center overflow-hidden">
						<div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-6 rounded-xl shadow">
							<header className="mb-6">
								<h1 className="text-2xl font-bold mb-1">Email Verification</h1>
								<p className="text-[15px] text-slate-500">
									Enter the 6-digit verification code that was sent to your
									email.
								</p>
							</header>
							<OtpForm />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default Verify;
