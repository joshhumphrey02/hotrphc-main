import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React from 'react';
import { UserData } from '../../_components/query';

interface InputProps {
	type?: string;
	name: string;
	placeholder: string;
	value: any;
	className?: string;
	disabled?: boolean;
	dispatch: (action: any) => void;
}

export const CustomInput = (props: InputProps) => {
	const {
		type = 'text',
		name,
		placeholder,
		value,
		dispatch,
		className,
		disabled,
	} = props;
	return (
		<div>
			<Label htmlFor={name} className=" font-[RobotoBold] pl-2">
				{placeholder}
			</Label>
			<Input
				type={type}
				name={name}
				placeholder={placeholder}
				value={value || ''}
				disabled={disabled ? false : true}
				className={cn(
					'border-0 text-black disabled:text-black disabled:font-[RobotoBold] cursor-text bg-transparent px-2 h-fit py-1 focus-visible:ring-offset-0 focus-visible:ring-0',
					disabled
						? 'focus-visible:ring-1 focus-visible:ring-gray-300 border-b focus-visible:border-0'
						: '',
					className
				)}
				onChange={(e) =>
					dispatch((prev: Partial<UserData>) => ({
						...prev,
						[name]: e.target.value,
					}))
				}
			/>
		</div>
	);
};
