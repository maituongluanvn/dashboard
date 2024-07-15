import clsx from 'clsx';
import { type PropsWithChildren } from 'react';
import { type IClasses } from '../lib/globalTypes';

interface ISelectBoxGroupProps extends IClasses {
	label: string;
}

export const SelectBoxGroup: React.FC<PropsWithChildren<ISelectBoxGroupProps>> = ({
	label,
	children,
	className,
}) => {
	return (
		<div role="radiogroup" aria-label={label} className={clsx(className, 'grid gap-x-2 md:grid-cols-2')}>
			{children}
		</div>
	);
};
