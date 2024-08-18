import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/redux/hook';
import { Edit, Save } from 'lucide-react';
import { useCallback } from 'react';
import { UserData, updateUserData } from '../../_components/query';
import { toast } from 'sonner';
import { updateMember } from '@/reducers/Member';

interface ButtonProps {
	className?: string;
	section: boolean;
	setSections: (prev: any) => void;
	member: Partial<UserData>;
}
export const CustomButton = (props: ButtonProps) => {
	const { section, setSections, className, member } = props;
	const dispatch = useAppDispatch();
	const handleSave = useCallback(async () => {
		console.log(member);
		if (!member || !member.id) return;
		const res = await updateUserData({ userId: member.id, userdata: member });
		console.log(res);
		if (!res) {
			toast.error('Try again, something went wrong', {
				duration: 4000,
			});
		} else {
			toast.success('Profile updated successfully', {
				duration: 4000,
			});
			dispatch(updateMember({ ...res }));
		}
	}, [member, dispatch]);
	const handleClick = () => {
		console.log(section);
		if (section) {
			handleSave();
		}
		setSections((prev: boolean) => !prev);
	};
	return (
		<Button
			size={'sm'}
			onClick={handleClick}
			variant={'outline'}
			className={cn(
				' text-green-500 px-3 py-0 bg-transparent text-sm border-green-500 flex gap-3 ',
				className
			)}>
			{!section ? <Edit size={15} /> : <Save size={15} />}{' '}
			{section ? 'Save' : 'Edit'}
		</Button>
	);
};
