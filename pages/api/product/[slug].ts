'use server'
// import { IProduct } from '@definition/index';
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
	message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	const { slug } = req.query;
	const result = await fetch(process.env.PRODUCT_JSON_URL as string, {
		headers: {
			'Content-Type': 'application/json',
			'API-Key': process.env.DATA_API_KEY as string,
		},
	});
	const data: any = await result.json();
	const product = data.products.find((product: { slug: any }) => product.slug === slug);
	if (!product) {
		res.status(400).json({ message: `Not found product with slug: ${slug}` });
	}

	res.status(200).json(product);
}
