'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { LoaderIcon } from 'lucide-react';
import Logo from '@/assets/images/hotr white logo  edited.png';
import Image from 'next/image';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useFormState, useFormStatus } from 'react-dom';
import { signup } from '@/lib/lucia/actions';
import Link from 'next/link';
import { Form } from '../../layout';

const Signup = () => {
	const [state, dispatch] = useFormState(signup, undefined);
	const { pending } = useFormStatus();
	const [form, setForm] = useState<Form>({
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		gender: 'M',
		password: '',
		comfirmPassword: '',
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
								type="text"
								name="firstName"
								placeholder="First Name"
								autoCapitalize="none"
								disabled={pending}
								value={form.firstName}
								required
								onChange={(e) => {
									setForm((v) => ({ ...v, firstName: e.target.value }));
								}}
							/>
						</div>
						<div>
							<Input
								className=" bg-transparent rounded-3xl text-center focus-visible:border-[#2FAD64] placeholder:text-white text-white"
								type="text"
								name="lastName"
								placeholder="Last Name"
								autoCapitalize="none"
								disabled={pending}
								required
								onChange={(e) => {
									setForm((v) => ({ ...v, lastName: e.target.value }));
								}}
							/>
						</div>
						<div>
							<Input
								className=" bg-transparent rounded-3xl text-center focus-visible:border-[#2FAD64] placeholder:text-white text-white"
								type="text"
								name="phoneNumber"
								placeholder="Phone Number"
								autoCapitalize="none"
								disabled={pending}
								onChange={(e) => {
									setForm((v) => ({ ...v, phoneNumber: e.target.value }));
								}}
							/>
						</div>
						<div>
							<Input
								className=" bg-transparent rounded-3xl text-center focus-visible:border-[#2FAD64] placeholder:text-white text-white"
								type="email"
								name="email"
								placeholder="Email"
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
								disabled={pending}
								onChange={(e) => {
									setForm((v) => ({ ...v, password: e.target.value }));
								}}
							/>
						</div>
						<div>
							<Input
								className=" bg-transparent rounded-3xl text-center focus-visible:border-[#2FAD64] placeholder:text-white text-white"
								type="password"
								name="comfirmPassword"
								placeholder="Comfirm Password"
								disabled={pending}
								onChange={(e) => {
									setForm((v) => ({ ...v, comfirmPassword: e.target.value }));
								}}
							/>
						</div>
						<div className="flex gap-2 justify-center items-center mb-2">
							<input type="text" name="gender" value={form.gender} hidden />
							<span className=" text-white text-xl">Gender</span>
							<span
								onClick={() => setForm((v) => ({ ...v, gender: 'M' }))}
								className={cn(
									' border-2 rounded-full w-10 h-10 flex items-center justify-center text-white text-xl  border-white',
									form.gender === 'M' ? 'border-[#2FAD64]' : 'border-white'
								)}>
								M
							</span>
							<span
								onClick={() => setForm((v) => ({ ...v, gender: 'F' }))}
								className={cn(
									' border-2 rounded-full w-10 h-10 flex items-center justify-center text-white text-xl border-white',
									form.gender === 'F' ? 'border-[#2FAD64]' : 'border-white'
								)}>
								F
							</span>
						</div>
						<div
							className="flex min-h-4 items-end space-x-1"
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
								Submit
							</Button>
							<div className="mb-2 mt-1">
								<span className="text-white hover:text-gray-300">
									Already have an account?
									<Link href={'/login'} className=" text-blue-500 ml-2">
										Login
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

export default Signup;
