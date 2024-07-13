'use server';
import { type NextApiRequest, type NextApiResponse } from 'next';
import type { IProduct } from '@definition/index';

// type ResponseData = {
// 	message?: string;
// 	products?: IProduct[];
// };

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
	const result = await fetch(process.env.PRODUCT_JSON_URL as string, {
		headers: {
			'Content-Type': 'application/json',
			'API-Key': process.env.DATA_API_KEY as string,
		},
	});

	const { products }: { products: IProduct[] } = await result.json() as { products: IProduct[] };
	if (!products) {
		res.status(400).json({ message: `Not found products` });
	}

	res.status(200).json(products );
}
