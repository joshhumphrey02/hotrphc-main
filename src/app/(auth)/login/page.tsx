import React from 'react';
import Login from './component/login-form';
import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/auth/validate-request';

const Page = async () => {
	const { session } = await validateRequest();
	if (session?.userId) redirect('/');
	return <Login />;
};

export default Page;
