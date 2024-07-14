'use server';
import { type NextApiRequest, type NextApiResponse } from 'next';
import data from '../../../public/products.json';
import type { IProduct, ICategory, IEdges } from '@definition/index';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { slug } = req.query;
	const { products }: { products: IProduct[] } = data as unknown as { products: IProduct[] };
	const filteredProducts: IEdges[] | undefined = products.map((product: IProduct) => {
	    return {
			node: product
		};
	});
	console.log("🚀 ~ constfilteredProducts:IEdges[]|undefined=products.map ~ filteredProducts:", filteredProducts)

	if (!filteredProducts) {
		res.status(400).json({ message: `Not found product with slug: ${slug as string}` });
	}

	const result: ICategory = {
		name: slug as string,
		description: 'description',
		seoDescription: 'seoDescription',
		seoTitle: 'seoTitle',
		products: {
			edges: [...filteredProducts]
		}
	}

	res.status(200).json(result);
}
