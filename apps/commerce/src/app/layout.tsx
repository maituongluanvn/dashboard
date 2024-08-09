import { Inter } from 'next/font/google';
import './globals.css';
import { type ReactNode } from 'react';
import { DraftModeNotification } from '@/ui/components/DraftModeNotification';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;

	return (
		<html lang="en" className="min-h-dvh">
			<body className={`${inter.className} min-h-dvh`}>
				{children}
				<DraftModeNotification />
			</body>
		</html>
	);
}
