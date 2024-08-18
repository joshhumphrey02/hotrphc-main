'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { LoaderIcon } from 'lucide-react';
import Logo from '@/assets/images/hotr white logo  edited.png';
import Image from 'next/image';
import { useFormState } from 'react-dom';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { login } from '@/lib/auth/actions';

interface Form {
	email: string;
	password: string;
}

const Login = () => {
	const [state, dispatch] = useFormState(login, undefined);
	const [pending, setPending] = useState(false);
	const [form, setForm] = useState<Form>({
		email: '',
		password: '',
	});
	useEffect(() => {
		setPending(false);
	}, [state?.fieldError, state?.formError]);
	return (
		<form
			action={(formData) => {
				setPending(() => true);
				dispatch(formData);
			}}
			className=" flex justify-center items-center">
			<div className="  w-full max-w-md">
				<div className=" w-[80px] h-[80px] p-2 mx-auto border-4 border-white overflow-hidden rounded-full flex items-center justify-center">
					<Image src={Logo} alt="logo" width={77} height={77} className="" />
				</div>
				<div className=" flex items-center flex-col">
					<h1 className=" mt-3 mb-1 text-white text-2xl">Welcome</h1>
					<span className="mb-6 text-white text-xs">
						Grow your faith | Enjoy Fellowship | Find a friend
					</span>
					<div className="flex flex-col gap-1 w-full ">
						<div className="mb-2">
							<Input
								className=" bg-transparent rounded-3xl text-center focus-visible:border-[#2FAD64] placeholder:text-white text-white"
								type="email"
								name="email"
								placeholder="Email"
								value={form.email}
								autoCapitalize="none"
								autoComplete="email"
								disabled={pending}
								onChange={(e) => {
									setForm((v) => ({ ...v, email: e.target.value }));
								}}
							/>
						</div>

						<div className="mb-2">
							<Input
								className=" bg-transparent rounded-3xl text-center focus-visible:border-[#2FAD64] placeholder:text-white text-white"
								type="password"
								name="password"
								placeholder="Password"
								value={form.password}
								disabled={pending}
								maxLength={11}
								onChange={(e) => {
									setForm((v) => ({ ...v, password: e.target.value }));
								}}
							/>
						</div>
						<>
							<div
								className="flex items-end space-x-1"
								aria-live="polite"
								aria-atomic="true">
								{state?.fieldError ? (
									<ul className="list-disc space-y-1 rounded-lg border bg-red-500/10 p-2 text-[0.8rem] font-medium text-red-500">
										{Object.values(state.fieldError).map((err) => (
											<li className="ml-4" key={err}>
												{err}
											</li>
										))}
									</ul>
								) : state?.formError ? (
									<>
										<ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
										<p className="text-sm text-red-500">{state?.formError}</p>
									</>
								) : null}
							</div>
							<div className="flex justify-between px-2">
								<Button variant={'link'} size={'sm'} className="p-0" asChild>
									<Link
										href={'/signup'}
										className=" text-sm text-white flex items-center">
										Not signed up? Sign up.
									</Link>
								</Button>
								<Button
									variant={'link'}
									size={'sm'}
									className="p-0 text-white text-sm "
									asChild>
									<Link className=" text-blue-500" href={'/reset-password'}>
										Forgot password?
									</Link>
								</Button>
							</div>
						</>
						<div>
							<Button
								disabled={pending}
								size="lg"
								type="submit"
								className="bg-[#2FAD64] rounded-3xl mb-3 w-full">
								{pending && (
									<LoaderIcon className="mr-2 h-4 w-4 animate-spin " />
								)}
								Login
							</Button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default Login;
