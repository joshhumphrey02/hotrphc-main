'use client';

import React, { useState } from 'react';
import { CustomInput } from './custom-Input';
import { Card } from '@/components/ui/card';
import { CustomButton } from './custom-button';
import { CustomSelect } from './custom-select';
import { UserData } from '../../_components/query';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ImageDrawer } from './image-drawer';
import { format } from 'date-fns';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

interface Props {
	member: Partial<UserData>;
}

const Personal = ({ member: data }: Props) => {
	const [member, setMember] = useState<Partial<UserData>>({
		id: data?.id,
		firstName: data?.firstName || '',
		lastName: data?.lastName || '',
		email: data?.email || '',
		phoneNumber: data?.phoneNumber || '',
		addresses: data?.addresses || '',
		dob: data?.dob || null,
		gender: data?.gender || '',
		maritalStatus: data?.maritalStatus || '',
	});
	const [personal, setPersonal] = useState(false);
	return (
		<div className=" w-full ">
			<h2 className="text-base px-3 mb-2 font-medium">Personal Information</h2>
			<Card className=" p-3 bg-gray-100">
				<div className="flex justify-between items-center">
					<div className="flex gap-2 items-center">
						<div className=" relative">
							<Avatar className="h-12 w-12 border">
								{/* <AvatarImage
											src={member?.profile_image?.arrayBuffer.toString()}
											alt="Profile Image"
											className="h-full w-full object-cover rounded-full"
										/> */}
								<AvatarFallback className=" capitalize text-xl">
									{data?.firstName?.charAt(0) || ''}
									{data?.lastName?.charAt(0) || ''}
								</AvatarFallback>
							</Avatar>
							<ImageDrawer member={data} />
						</div>
						<div>
							<h3 className="text-base font-[RobotoMedium]">
								{data?.firstName || ''} {data?.lastName || ''}
							</h3>
							<p className="text-sm font-[RobotoLight] text-gray-500">
								{data?.createdAt
									? format(new Date(data?.createdAt), 'MMM d, yyyy,  hh:mm a')
									: format(Date.now(), 'MMM d, yyyy,  hh:mm a')}
							</p>
						</div>
					</div>

					<CustomButton
						section={personal}
						setSections={setPersonal}
						member={member}
					/>
				</div>
				<div className="mb-2 mt-4 border-0 shadow-sm space-y-3">
					<CustomInput
						value={member?.firstName}
						disabled={personal}
						name="firstName"
						placeholder="First Name"
						dispatch={setMember}
					/>
					<CustomInput
						value={member?.lastName}
						disabled={personal}
						name="lastName"
						placeholder="Last Name"
						dispatch={setMember}
					/>
					<div>
						<Popover>
							<PopoverTrigger asChild>
								<div className="flex flex-col space-y-2">
									<Label className=" font-[RobotoBold] pl-2">DOB</Label>
									<Button
										variant={'outline'}
										className={cn(
											'border-0 text-black disabled:text-black w-full justify-between disabled:font-[RobotoBold] cursor-text bg-transparent px-2 h-fit py-1 focus-visible:ring-offset-0 focus-visible:ring-0',
											personal
												? 'focus-visible:ring-1 focus-visible:ring-gray-300 border-b focus-visible:border-0'
												: ''
										)}>
										{member?.dob ? (
											format(member?.dob, 'PPP')
										) : (
											<span>Add your birth date</span>
										)}
										<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
									</Button>
								</div>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									// selected={member?.dob || Date.now()}
									onSelect={(value) =>
										personal && setMember((prev) => ({ ...prev, dob: value }))
									}
									disabled={(date: Date) =>
										date > new Date() || date < new Date('1900-01-01')
									}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>
					<CustomSelect
						value={member?.gender}
						disabled={personal}
						name="gender"
						placeholder="Gender"
						dispatch={setMember}
						options={['Male', 'Female']}
					/>
					<CustomInput
						value={member?.phoneNumber}
						disabled={personal}
						name="phoneNumber"
						placeholder="Phone Number"
						dispatch={setMember}
					/>
					<CustomInput
						value={member?.email}
						disabled={personal}
						name="email"
						placeholder="Email"
						dispatch={setMember}
						type="email"
					/>
					<CustomSelect
						value={member?.maritalStatus}
						disabled={personal}
						name="maritalStatus"
						placeholder="Marital Status"
						dispatch={setMember}
						options={['married', 'single', 'dating', 'others']}
					/>
					<CustomInput
						value={member?.addresses}
						disabled={personal}
						name="address"
						placeholder="Address"
						dispatch={setMember}
					/>
				</div>
			</Card>
		</div>
	);
};

export default Personal;
