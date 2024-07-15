/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
// import { type ComponentProps } from 'react';

export const LinkWithChannel = ({ href, ...props }: any) => {
	const { channel }: any = useParams<{ channel?: string }>();

	if (!href.startsWith('/')) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		return <Link {...props} href={href} />;
	}

	const encodedChannel = encodeURIComponent(channel ?? '');
	const hrefWithChannel = `/${encodedChannel}${href}`;
	return <Link {...props} href={hrefWithChannel} />;
};
