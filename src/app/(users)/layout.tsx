import React from 'react';
import TabsView from '@/components/shared/tabs-view';
import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/auth/validate-request';
import { getUserData } from './_components/query';

interface Props {
	children: React.ReactNode;
}

const RootLayout = async ({ children }: Props) => {
	const { session } = await validateRequest();
	if (!session?.userId) {
		return redirect('/login');
	}
	const user = await getUserData(session.userId);
	return (
		<div className="w-full max-w-md bg-gray-50 min-h-screen mx-auto mb-20">
			<div>{children}</div>
			<TabsView user={user} />
		</div>
	);
};

export default RootLayout;
