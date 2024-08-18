'use client';

import React, { useState } from 'react';
import { CustomInput } from './custom-Input';
import { Card } from '@/components/ui/card';
import { CustomButton } from './custom-button';
import { CustomSelect } from './custom-select';
import { UserData } from '../../_components/query';

interface Props {
	member: Partial<UserData>;
}

const Professional = ({ member: data }: Props) => {
	const [member, setMember] = useState<Partial<UserData>>({
		id: data?.id,
		bornAgain: data?.bornAgain || '',
		occupation: data?.occupation || '',
		role: data?.role || 'MEMBER',
		employmentStatus: data?.employmentStatus || '',
	});
	const [personal, setPersonal] = useState(false);
	return (
		<div className="w-full">
			<h2 className="text-base px-3 mb-2 font-medium">
				Professional Information
			</h2>
			<Card className=" mb-6 p-3 bg-gray-100">
				<div className="flex justify-between items-start">
					<CustomInput
						value={member?.employmentStatus}
						disabled={personal}
						name="employmentStatus"
						placeholder="Employment Status"
						dispatch={setMember}
					/>
					<CustomButton
						section={personal}
						setSections={setPersonal}
						member={member}
					/>
				</div>
				<div className="mb-2 mt-4 border-0 shadow-sm space-y-3">
					<CustomSelect
						value={member?.role}
						disabled={personal}
						name="role"
						placeholder="Church Role"
						dispatch={setMember}
						options={['MEMBER', 'WORKER', 'PASTOR', 'SECURITY', 'OTHERS']}
					/>
					<CustomInput
						value={member?.occupation}
						disabled={personal}
						name="occupation"
						placeholder="Occupation"
						dispatch={setMember}
					/>
					<CustomSelect
						value={member?.bornAgain}
						disabled={personal}
						name="bornAgain"
						placeholder="Are you born again"
						dispatch={setMember}
						options={['Yes', 'No']}
					/>
				</div>
			</Card>
		</div>
	);
};

export default Professional;
