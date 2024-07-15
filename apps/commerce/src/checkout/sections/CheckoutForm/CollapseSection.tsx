import { type Children } from '@/checkout/lib/globalTypes';

interface ICollapseSectionProps extends Children {
	collapse: boolean;
}

export const CollapseSection = ({ collapse, children }: ICollapseSectionProps) => {
	if (collapse) {
		return null;
	}

	return <>{children}</>;
};
