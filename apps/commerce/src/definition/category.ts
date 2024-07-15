import type { IProduct } from './product';

export interface IEdges {
	node: IProduct;
}

export interface ICategory {
	id: string;
	name: string;
	slug: string;
	description?: string;
	seoDescription?: string;
	seoTitle: string;
	products: {
		edges: IEdges[];
	};
}
