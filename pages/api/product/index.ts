'use server';
import { type NextApiRequest, type NextApiResponse } from 'next';
import data from '../../../public/products.json';
import type { IProduct } from '@/definition';
// type ResponseData = {
// 	message?: string;
// 	products?: IProduct[];
// };

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    // const result = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products.json`);
	// const result = await fetch(process.env.PRODUCT_JSON_URL as string, {
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		'API-Key': process.env.DATA_API_KEY as string,
	// 	},
	// });

	const { products }: { products: IProduct[] } = data as unknown  as { products: IProduct[] } ;
	if (!products) {
		res.status(400).json({ message: `Not found products` });
	}

	res.status(200).json(products );
}
