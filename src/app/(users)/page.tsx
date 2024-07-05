'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CircleX, Edit } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { IMember } from '@/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { getProfile, logout, updateProfile } from '@/lib/lucia/actions';
import { useFormState } from 'react-dom';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
	const router = useRouter();
	const { toast } = useToast();
	const [resendState, resendAction] = useFormState(updateProfile, null);
	const [member, setMember] = useState<IMember>();
	const [editing, setEditing] = useState(false);
	const [form, setForm] = useState<Partial<IMember>>({
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		gender: 'M',
	});
	const profile = useCallback(() => {
		getProfile().then((member) => {
			if (member?.success) {
				setMember({ ...member.success });
				setForm({ ...member.success });
				setEditing(false);
				toast({
					title: 'Profile Updated',
					description: '',
					variant: 'default',
				});
			}
		});
	}, [toast]);

	const toggleEdit = () => {
		setEditing((prev) => !prev);
	};

	useEffect(() => {
		profile();
	}, [profile]);
	useEffect(() => {
		if (resendState?.success) {
			profile();
			setEditing(false);
		}
	}, [profile, resendState?.success]);
	return (
		<div className="font-inter antialiased min-h-screen flex items-center justify-center px-3 bg-gray-100">
			<div className="max-w-md mx-auto bg-white px-2 py-6 w-full rounded-lg shadow-lg">
				<div className="flex items-center justify-between mb-6 relative">
					<div className="flex items-center">
						<Avatar className="h-14 w-14">
							<AvatarFallback className=" capitalize">
								{member?.firstName?.charAt(0) || ''}
								{member?.lastName?.charAt(0) || ''}
							</AvatarFallback>
						</Avatar>
						<div className="ml-4">
							<h2 className="text-xl font-bold">{`${member?.firstName || ''} ${
								member?.lastName || ''
							}`}</h2>
							<p className="text-gray-600">{member?.email || ''}</p>
						</div>
					</div>
					<div className=" absolute top-0 right-0">
						<Button
							variant={'ghost'}
							onClick={toggleEdit}
							className={cn(
								' py-1 px-3 bg-blue-500 hover:text-white text-white rounded-xl hover:bg-blue-600',
								editing ? 'text-red-500' : ''
							)}>
							{editing ? <CircleX size={20} /> : <Edit size={18} />}
						</Button>
					</div>
				</div>
				<form action={resendAction}>
					<div className="mb-4">
						<Input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={(e) => {
								setForm((v) => ({ ...v, firstName: e.target.value }));
							}}
							value={form.firstName}
							disabled={!editing}
						/>
					</div>
					<div className="mb-4">
						<Input
							type="text"
							name="lastName"
							placeholder="Last Name"
							onChange={(e) => {
								setForm((v) => ({ ...v, lastName: e.target.value }));
							}}
							value={form.lastName}
							disabled={!editing}
						/>
					</div>
					<div className="mb-4">
						<Input
							type="email"
							name="email"
							placeholder="Email"
							onChange={(e) => {
								setForm((v) => ({ ...v, email: e.target.value }));
							}}
							value={form.email}
							disabled={!editing}
						/>
					</div>
					<div className="mb-4">
						<Input
							type="text"
							name="phoneNumber"
							placeholder="Phone Number"
							onChange={(e) => {
								setForm((v) => ({ ...v, phoneNumber: e.target.value }));
							}}
							value={form.phoneNumber}
							disabled={true}
						/>
					</div>
					<div className="flex gap-2 justify-start px-2 items-center mb-2">
						<span className=" text-black text-base">Gender</span>
						<span
							onClick={() => {
								editing && setForm((v) => ({ ...v, gender: 'M' }));
							}}
							className={cn(
								' border-2 rounded-full w-8 h-8 flex items-center justify-center text-black text-sm  border-black',
								form.gender === 'M' ? 'border-[#2FAD64]' : 'border-black'
							)}>
							M
						</span>
						<span
							onClick={() => {
								editing && setForm((v) => ({ ...v, gender: 'F' }));
							}}
							className={cn(
								' border-2 rounded-full w-8 h-8 flex items-center justify-center text-black text-sm border-black',
								form.gender === 'F' ? 'border-[#2FAD64]' : 'border-white'
							)}>
							F
						</span>
						<input type="text" name="gender" value={form.gender} hidden />
					</div>
					<div className="w-full flex justify-end">
						<>
							{editing && (
								<Button
									type="submit"
									className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
									Update
								</Button>
							)}
							{!editing && (
								<Button
									variant={'link'}
									size={'sm'}
									onClick={() => router.push('/qr-code')}
									className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
									Get QR code
								</Button>
							)}
						</>
					</div>
				</form>
				<form action={logout}>
					<Button
						variant={'link'}
						type="submit"
						size={'sm'}
						className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
						Logout
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Profile;
