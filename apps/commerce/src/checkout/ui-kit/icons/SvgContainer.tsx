import { type SVGAttributes, type ReactNode } from 'react';

export type SvgProps = SVGAttributes<{}>;

export interface ISvgContainerProps extends SvgProps {
	size?: number;
	children: ReactNode;
}

export const SvgContainer = ({ size, ...rest }: ISvgContainerProps) => (
	<svg
		width={size}
		height={size}
		viewBox={size ? `0 0 ${size} ${size}` : undefined}
		xmlns="http://www.w3.org/2000/svg"
		{...rest}
	/>
);
