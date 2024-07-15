import { Suspense } from 'react';
import { Checkout, CheckoutSkeleton } from '@/checkout/views/Checkout';
import { OrderConfirmation, OrderConfirmationSkeleton } from '@/checkout/views/OrderConfirmation';
import { getQueryParams } from '@/checkout/lib/utils/url';
import { PaymentProcessingScreen } from '@/checkout/sections/PaymentSection/PaymentProcessingScreen';

export const RootViews = () => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
	const orderId = getQueryParams().orderId;

	if (orderId) {
		return (
			<Suspense fallback={<OrderConfirmationSkeleton />}>
				<OrderConfirmation />
			</Suspense>
		);
	}

	return (
		<PaymentProcessingScreen>
			<Suspense fallback={<CheckoutSkeleton />}>
				<Checkout />
			</Suspense>
		</PaymentProcessingScreen>
	);
};
