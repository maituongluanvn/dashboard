import type { ICategory } from './category';
import type { IProduct } from './product/product';

export interface IItems {
	id: string;
	name: string;
	level: number;
	category: ICategory;
	collection: { slug: any; name: string };
	page: any;
	url: string;
	children?: IProduct[];
}

export interface IMenu {
	menu: {
		items: IItems[];
	};
}
