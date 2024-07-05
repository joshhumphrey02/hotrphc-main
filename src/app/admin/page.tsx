'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
	const router = useRouter();
	router.push('/dashboard');
	return <div>You are not allow to view this page</div>;
};

export default Page;
