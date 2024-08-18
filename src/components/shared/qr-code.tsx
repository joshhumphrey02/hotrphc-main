import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { QrCode } from 'lucide-react';
import { QRCode } from 'react-qrcode-logo';
import DarkLogo from '@/assets/images/logo-mobi.png';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
interface Props {
	className?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
}

export default function QRCodeViewer({
	className,
	email,
	firstName,
	lastName,
}: Props) {
	const qrRef = useRef<HTMLDivElement | null>(null);
	const downloadQRCode = () => {
		if (qrRef.current) {
			html2canvas(qrRef.current).then((canvas) => {
				const link = document.createElement('a');
				link.href = canvas.toDataURL('image/png');
				link.download = `${firstName}${lastName}.png`;
				link.click();
			});
		} else {
			console.error('No canvas element found in qrRef.');
		}
	};
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button
					className={cn(
						' bg-yellow-400 hover:bg-yellow-500 py-2 px-3',
						className
					)}
					size="sm">
					<QrCode className="w-4 h-4 mr-2" /> QR Code
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle>Your Unique QR-Code</DrawerTitle>
						<DrawerDescription>
							Download and use it as your pass
						</DrawerDescription>
					</DrawerHeader>
					<div className="p-4 pb-0">
						<div
							ref={qrRef}
							id="qrcode"
							className="mb-2 py-2 justify-center flex flex-col items-center">
							<QRCode
								value={email}
								size={220}
								logoImage={DarkLogo.src}
								logoWidth={60}
								logoHeight={28}
								removeQrCodeBehindLogo={true}
								logoPadding={0}
							/>
							<p className="text-black text-center uppercase text-xs p-0 mb-3 space-x-3">
								<span>{firstName || ''}</span>
								<span>{lastName || ''}</span>
							</p>
						</div>
					</div>
					<DrawerFooter className="flex flex-row gap-2">
						<DrawerClose asChild>
							<Button variant="outline" size={'lg'} className="w-full">
								Cancel
							</Button>
						</DrawerClose>
						<Button
							size={'lg'}
							onClick={downloadQRCode}
							className="w-full bg-yellow-500 hover:bg-yellow-600 text-white m-0">
							Download
						</Button>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
