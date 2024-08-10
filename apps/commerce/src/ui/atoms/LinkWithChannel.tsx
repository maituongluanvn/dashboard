'use client';

import Link from 'next/link';
import { type ComponentProps } from 'react';

export const LinkWithChannel = ({ href, ...props }: ComponentProps<typeof Link>) => {
	const isInternalLink = typeof href === 'string' ? href.startsWith('/') : href.pathname?.startsWith('/');

	if (!isInternalLink) {
		return <Link {...props} href={href} />;
	}

	return <Link {...props} href={href} />;
};
