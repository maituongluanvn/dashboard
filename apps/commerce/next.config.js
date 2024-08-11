/** @type {import('next').NextConfig} */
const config = {
	images: {
		formats: ['image/avif', 'image/webp'],
		remotePatterns: [
			{
				hostname: "*",
			},
		],
	},
};

export default config;