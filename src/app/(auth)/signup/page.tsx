import React from 'react';
import { redirect } from 'next/navigation';
import { validateRequest } from '@/lib/lucia/validate-request';
import Signup from './components/signup-form';

const Page = async () => {
	const { session } = await validateRequest();
	if (session?.userId) {
		redirect('/');
	}
	return <Signup />;
};

export default Page;
