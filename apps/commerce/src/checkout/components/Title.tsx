import clsx from 'clsx';
import React, { type PropsWithChildren } from 'react';
import { type IClasses } from '@/checkout/lib/globalTypes';

export const Title: React.FC<PropsWithChildren<IClasses>> = ({ className, children }) => (
	<p className={clsx('mb-2 font-bold', className)}>{children}</p>
);
