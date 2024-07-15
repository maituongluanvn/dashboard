import { type OrderLineFragment } from '@/checkout/graphql';
import { SummaryItemMoneyInfo } from '@/checkout/sections/Summary/SummaryItemMoneyInfo';

interface ILineItemQuantitySelectorProps {
	line: OrderLineFragment;
}

export const SummaryItemMoneySection: React.FC<ILineItemQuantitySelectorProps> = ({ line }) => {
	return (
		<div className="flex flex-col items-end">
			<p>Qty: {line.quantity}</p>
			<SummaryItemMoneyInfo {...line} undiscountedUnitPrice={line.undiscountedUnitPrice.gross} />
		</div>
	);
};
