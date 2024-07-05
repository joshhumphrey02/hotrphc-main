'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { LoaderIcon } from 'lucide-react';
import Logo from '@/assets/images/hotr white logo  edited.png';
import Image from 'next/image';
import { login } from '@/lib/lucia/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface Form {
	email: string;
	password: string;
}

const Login = () => {
	const [state, dispatch] = useFormState(login, undefined);
	const { pending } = useFormStatus();
	const [form, setForm] = useState<Form>({
		email: '',
		password: '',
	});

	return (
		<form
			action={dispatch}
			className="absolute z-20 left-0 bottom-0 bg-black/60 w-screen h-screen flex justify-center items-center">
			<div className="  w-[80%] md:w-[40%]">
				<div className=" w-[80px] h-[80px] p-2 mx-auto border-4 border-white overflow-hidden rounded-full flex items-center justify-center">
					<Image src={Logo} alt="logo" width={77} height={77} className="" />
				</div>
				<div className=" flex items-center flex-col">
					<h1 className=" mt-3 mb-1 text-white text-2xl">Welcome</h1>
					<span className="mb-6 text-white text-xs">
						Grow your faith | Enjoy Fellowship | Find a friend
					</span>
					<div className="flex flex-col gap-4 w-full ">
						<div>
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

						<div>
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
						<div
							className="flex min-h-8 items-end space-x-1"
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
							<div className="mb-2 mt-1">
								<span className="text-white hover:text-gray-300">
									Not Joined Yet?
									<Link href={'/signup'} className=" text-blue-500 ml-2">
										Signup
									</Link>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default Login;
