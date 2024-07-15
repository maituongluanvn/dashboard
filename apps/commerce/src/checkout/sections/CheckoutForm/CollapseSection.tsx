import { type IChildren } from '@/checkout/lib/globalTypes';

interface ICollapseSectionProps extends IChildren {
	collapse: boolean;
}

export const CollapseSection = ({ collapse, children }: ICollapseSectionProps) => {
	if (collapse) {
		return null;
	}

	return <>{children}</>;
};
