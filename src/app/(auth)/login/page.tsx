import React from 'react';
import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/lucia/validate-request';
import Login from './component/login-form';

const Page = async () => {
	const { session } = await validateRequest();
	if (session?.userId) {
		redirect('/');
	}
	return <Login />;
};

export default Page;
