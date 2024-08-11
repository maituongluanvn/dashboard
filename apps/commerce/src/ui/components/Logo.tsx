import Image from 'next/legacy/image';
import { LinkWithChannel } from '../atoms/LinkWithChannel';
import LogoSVG from '@/app/hoangphuc-logo.png';

export const Logo = () => {
	// const pathname = usePathname();

	return (
		<div className="flex items-center font-bold">
			<LinkWithChannel aria-label="homepage" href="/">
				<Image priority src={LogoSVG} height={32} width={32} alt="Follow us on Twitter" />
			</LinkWithChannel>
		</div>
	);
};

export default Logo;
