import clsx from 'clsx';
import React from 'react';
import { type IClasses } from '@/checkout/lib/globalTypes';

export const Divider: React.FC<IClasses> = ({ className }) => {
	const classes = clsx('border-neutral-200 h-px w-full border-t', className);

	return <div className={classes} />;
};
