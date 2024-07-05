'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import successIcon from '@/assets/images/successIcon-removebg-preview.png';
import DarkLogo from '@/assets/images/logo-mobi.png';
import { QRCode } from 'react-qrcode-logo';
import html2canvas from 'html2canvas';
import { IMember } from '@/types';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/lib/lucia/actions';
import { useToast } from '@/components/ui/use-toast';

const QrCode = () => {
	const router = useRouter();
	const { toast } = useToast();
	const [member, setMember] = useState<IMember>();
	const qrRef = useRef<HTMLDivElement | null>(null);

	const downloadQRCode = () => {
		if (qrRef.current) {
			html2canvas(qrRef.current).then((canvas) => {
				const link = document.createElement('a');
				link.href = canvas.toDataURL('image/png');
				link.download = `${member?.firstName}${member?.lastName}.png`;
				link.click();
			});
		} else {
			console.error('No canvas element found in qrRef.');
		}
	};
	useEffect(() => {
		getProfile().then((member) => {
			if (member?.success) {
				setMember({ ...member.success });
				toast({
					title: 'Profile Updated',
					description: '',
					variant: 'default',
				});
			}
		});
	}, [toast]);
	const user = member ? member.email : '';
	return (
		<div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0">
			<div className="  w-full md:w-[40%] grid grid-rows-[35%,auto]">
				<div className=" bg-[#2FAD64] w-full h-full flex flex-col items-center justify-center">
					<div className=" w-[160px] h-[160px] rounded-full overflow-hidden mb-3 flex justify-center items-center">
						<Image
							src={successIcon}
							alt="success icon"
							className="w-full  bg-[#f6ff00] object-cover"
						/>
					</div>
				</div>
				<div className="w-full h-full flex flex-col justify-center items-center bg-white">
					<div ref={qrRef} id="qrcode" className="mb-4 py-2">
						<QRCode
							value={user}
							size={220}
							logoImage={DarkLogo.src}
							logoWidth={60}
							logoHeight={28}
							removeQrCodeBehindLogo={true}
							logoPadding={0}
						/>
						<p className="text-black text-center uppercase text-xs p-0 mb-3 space-x-3">
							<span>{member?.firstName || ''}</span>
							<span>{member?.lastName || ''}</span>
						</p>
					</div>
					<Button
						size="lg"
						type="button"
						onClick={downloadQRCode}
						className=" bg-transparent rounded-3xl mb-3 text-black border w-[60%] hover:bg-[#2FAD64] hover:text-white">
						Download
					</Button>
					<Button
						size="lg"
						className="rounded-3xl mt-2 w-[15rem] h-10 "
						onClick={() => {
							router.push('/');
						}}>
						Profile
					</Button>
				</div>
			</div>
		</div>
	);
};

export default QrCode;
