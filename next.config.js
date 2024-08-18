/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.mynebor.com',
				pathname: '**',
			},
		],
	},
};

module.exports = nextConfig;
