import React from 'react';
import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/lucia/validate-request';

interface Props {
	children: React.ReactNode;
}

const RootLayout = async ({ children }: Props) => {
	const { session, user } = await validateRequest();
	if (!session?.userId) redirect('/login');
	return <div className="w-full min-h-screen">{children}</div>;
};

export default RootLayout;
