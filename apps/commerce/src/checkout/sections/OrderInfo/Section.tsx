import { type FC, type ReactNode } from 'react';

interface ISectionProps {
	children: ReactNode;
	title: string;
}

export const Section: FC<ISectionProps> = ({ children, title }) => (
	<div className="mb-6">
		<p color="secondary" className="mb-2 font-bold">
			{title}
		</p>
		{children}
	</div>
);
