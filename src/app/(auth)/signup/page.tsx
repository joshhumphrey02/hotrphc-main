import React from 'react';
import Signup from './components/signup-form';
import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/auth/validate-request';

const Page = async () => {
	const { session } = await validateRequest();
	if (session?.userId) redirect('/');
	return <Signup />;
};

export default Page;
