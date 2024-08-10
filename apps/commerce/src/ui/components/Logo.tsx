'use client';

import Image from 'next/image';
import { LinkWithChannel } from '../atoms/LinkWithChannel';
import LogoSVG from '@/app/hoangphuc-logo.png';

export const Logo = () => {
	// const pathname = usePathname();

	return (
		<div className="flex items-center font-bold">
			<LinkWithChannel aria-label="homepage" href="/">
				<Image priority src={LogoSVG} height={32} width={32} alt="Follow us on Twitter" />
				{/* <LogoSVG className="w-24 h-auto" /> */}
			</LinkWithChannel>
		</div>
	);
};

export default Logo;
