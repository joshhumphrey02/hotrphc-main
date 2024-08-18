'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import OTPInput from 'react-otp-input';
import { useFormState } from 'react-dom';
import { toast } from '@/components/ui/use-toast';
import {
	verifyEmail,
	resendVerificationEmail as resendEmail,
	logout,
} from '@/lib/auth/actions';

const OtpForm = () => {
	const [otp, setOtp] = useState('');
	const [verifyEmailState, verifyEmailAction] = useFormState(verifyEmail, null);
	const [resendState, resendAction] = useFormState(resendEmail, null);
	const codeFormRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (resendState?.success) {
			toast({
				title: 'Email Verification',
				description: 'Email sent!.',
				variant: 'default',
			});
		}
		if (resendState?.error) {
			toast({
				title: 'Email Verification',
				description: 'An error occuried!.',
				variant: 'destructive',
			});
		}
	}, [resendState?.error, resendState?.success]);

	useEffect(() => {
		if (verifyEmailState?.error) {
			toast({
				title: 'Email Verification',
				description: 'An error occuried!.',
				variant: 'destructive',
			});
		}
	}, [verifyEmailState?.error]);
	return (
		<div>
			<form id="otp-form" ref={codeFormRef} action={verifyEmailAction}>
				<div className="flex items-center justify-center flex-col">
					<OTPInput
						value={otp}
						onChange={setOtp}
						numInputs={8}
						renderSeparator={<span>{''}</span>}
						shouldAutoFocus={true}
						renderInput={(props) => <input {...props} />}
						inputStyle={{
							width: '2.2rem',
							height: '2.2rem',
							borderRadius: '.4rem',
							backgroundColor: '#eaeaef',
						}}
						containerStyle={{
							display: 'flex',
							gap: '.2rem',
							justifyContent: 'center',
						}}
					/>
					<input type="text" name="code" value={otp} hidden />
				</div>
				{verifyEmailState?.error && (
					<p className="my-2 text-center text-red-500">
						{verifyEmailState?.error}
					</p>
				)}
				<div className="max-w-[260px] placeholder:text-blue-500 mx-auto mt-4">
					<Button
						type="submit"
						disabled={otp.length < 6 ? true : false}
						className="w-full inline-flex justify-center mb-2 whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">
						Verify Account
					</Button>
				</div>
			</form>

			<div>
				<form action={resendAction}>
					<Button variant="link">Resend Code</Button>
				</form>
				<form action={logout}>
					<Button variant="link" className="p-0 font-normal ">
						want to use another email?{' '}
						<span className="text-blue-500">Log out now</span>.
					</Button>
				</form>
			</div>
		</div>
	);
};

export default OtpForm;
