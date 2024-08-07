'use server';

import { revalidatePath } from 'next/cache';

type deleteLineFromCheckoutArgs = {
	lineId: string;
	checkoutId: string;
};

export const deleteLineFromCheckout = async ({
	lineId,
	checkoutId,
}: deleteLineFromCheckoutArgs): Promise<any> => {
	// await executeGraphQL(CheckoutDeleteLinesDocument, {
	// 	variables: {
	// 		checkoutId,
	// 		lineIds: [lineId],
	// 	},
	// 	cache: 'no-cache',
	// });

	revalidatePath('/cart');
};
