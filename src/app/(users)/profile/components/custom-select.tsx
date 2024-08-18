import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { UserData } from '../../_components/query';

interface SelectProps {
	name: string;
	options: string[];
	value: any;
	placeholder: string;
	dispatch: (action: any) => void;
	className?: string;
	disabled?: boolean;
}

export const CustomSelect = (props: SelectProps) => {
	const { name, options, value, dispatch, placeholder, className, disabled } =
		props;
	return (
		<div>
			<Label htmlFor={name} className=" font-[RobotoBold] pl-2">
				{placeholder}
			</Label>
			<Select
				value={value}
				onValueChange={(e) =>
					disabled &&
					dispatch((prev: Partial<UserData>) => ({ ...prev, [name]: e }))
				}>
				<SelectTrigger
					className={cn(
						'border-0 text-black disabled:text-black disabled:font-[RobotoBold] cursor-text bg-transparent px-2 h-fit py-1 focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-opacity-0 focus:rring-offset-0  focus:ring-0',
						disabled
							? 'focus-visible:ring-1 focus-visible:ring-gray-300 border-b focus-visible:border-0'
							: '',
						className
					)}>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>{placeholder}</SelectLabel>
						{options.map((option) => (
							<SelectItem className=" capitalize" key={option} value={option}>
								{option}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};
