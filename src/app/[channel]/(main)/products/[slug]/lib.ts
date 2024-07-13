export async function addItem() {
    'use server';
 
    const checkout = await Checkout.findOrCreate({
        checkoutId: Checkout.getIdFromCookies(params.channel),
        channel: params.channel,
    });
    invariant(checkout, 'This should never happen');

    Checkout.saveIdToCookie(params.channel, checkout.id);

    if (!selectedVariantID) {
        return;
    }

    // TODO: error handling
    await executeGraphQL(CheckoutAddLineDocument, {
        variables: {
            id: checkout.id,
            productVariantId: decodeURIComponent(selectedVariantID),
        },
        cache: 'no-cache',
    });

    revalidatePath('/cart');
}