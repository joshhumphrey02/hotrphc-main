import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { useRouter } from 'next/navigation';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserData } from '../../_components/query';

interface ImageProps {
	member: Partial<UserData>;
	className?: string;
}
// import ImageUploader from 'react-image-upload';
// import 'react-image-upload/dist/index.css';
// import { useAppDispatch } from '../store';

export function ImageDrawer(props: ImageProps) {
	const router = useRouter();
	const { member, className } = props;
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<span className=" absolute right-1 bottom-0">
					<Edit size={15} />
				</span>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle className="text-center">Add Image</DrawerTitle>
					</DrawerHeader>
					<div className="p-4 pb-0 flex justify-center">
						{/*<ImageUploader
							style={{ height: 200, width: 200, background: 'lightgray' }} // style image to your preference
							deleteIcon={<Delete />}
							uploadIcon={<Camera />}
							imgExtension={['.jpg', '.jpeg', '.png']}
							maxFileSize={5242880}
							onFileAdded={(img: File) =>
								dispatch(
									updateMember({
										profile_image: img,
									})
								)
							}
						/> */}
					</div>
					<DrawerFooter className="flex gap-2 justify-center mt-3 flex-row-reverse">
						<Button
							// onClick={async () => {
							// 	const res = await updateProfile(member.id, member);
							// 	if (res.success) {
							// 		toast.success('Profile updated successfully');
							// 	} else {
							// 		toast.error('Failed to update profile');
							// 	}
							// 	router.refresh();
							// }}
							size={'lg'}>
							Submit
						</Button>
						<DrawerClose asChild>
							<Button size={'lg'} variant="outline">
								Cancel
							</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
