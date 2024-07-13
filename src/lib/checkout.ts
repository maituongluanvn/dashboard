/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { cookies } from "next/headers";
import { CheckoutCreateDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export function getIdFromCookies(channel: string) {
	const cookieName = `checkoutId-${channel}`;
	const checkoutId = cookies().get(cookieName)?.value || "";
	return checkoutId;
}

export function saveIdToCookie(_channel: string) {
	// cookies().set(cookieName, checkoutId, {
	// 	sameSite: "lax",
	// 	secure: shouldUseHttps,
	// });
}

export async function find(_checkoutId: string) {
	try {
		// const { checkout } = checkoutId
		// 	? await executeGraphQL(CheckoutFindDocument, {
		// 			variables: {
		// 				id: checkoutId,
		// 			},
		// 			cache: "no-cache",
		// 	  })
		// 	: { checkout: null };
		
		// return checkout;
		return 'checkout';
	} catch {
		// we ignore invalid ID or checkout not found
	}
}

export async function findOrCreate({ channel, checkoutId }: { checkoutId?: string; channel: string }) {
	if (!checkoutId) {
		return (await create({ channel }) as any).checkoutCreate?.checkout;
	}
	const checkout = await find(checkoutId);
	return checkout || (await create({ channel }) as any).checkoutCreate?.checkout;
}

export const create = ({ channel }: { channel: string }) =>
	executeGraphQL(CheckoutCreateDocument, { cache: "no-cache", variables: { channel } });
