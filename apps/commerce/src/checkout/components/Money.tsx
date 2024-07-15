import { type Money as MoneyType, getFormattedMoney } from '@/checkout/lib/utils/money';

import { type IAriaLabel, type IClasses } from '@/checkout/lib/globalTypes';

export interface IMoneyProps<TMoney extends MoneyType = MoneyType> extends IClasses, IAriaLabel {
	money?: TMoney;
	negative?: boolean;
}

export const Money = <TMoney extends MoneyType>({
	money,
	className,
	ariaLabel,
	negative,
	...textProps
}: IMoneyProps<TMoney>) => {
	const formattedMoney = getFormattedMoney(money, negative);

	if (!money) {
		return null;
	}

	return (
		<p {...textProps} aria-label={ariaLabel} className={className}>
			{formattedMoney}
		</p>
	);
};
