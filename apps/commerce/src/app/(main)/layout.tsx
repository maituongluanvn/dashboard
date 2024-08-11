import { type ReactNode } from 'react';
import { Footer } from '@/ui/components/Footer';
import { Header } from '@/ui/components/Header';

export const metadata = {
	metadataBase: new URL('https://www.dichtruyenhoangphuc.com'),
	alternates: {
		canonical: '/',
		languages: {
			'en-US': '/en-US',
			'vn-VN': '/vn-VN',
		},
	},
	openGraph: {
		images: '/default-image.png',
	},
};

export default function RootLayout(props: { children: ReactNode; params: { channel: string } }) {
	return (
		<>
			<Header channel={props.params.channel} />
			<div className="flex min-h-[calc(100dvh-64px)] flex-col">
				<main className="flex-1">{props.children}</main>
				<Footer channel={props.params.channel} />
			</div>
		</>
	);
}
