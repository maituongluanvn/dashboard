import type { ICategory } from './category';
import type { IProduct } from './product';

export interface IItems {
	id: string;
	name: string;
	level: number;
	category: ICategory;
	collection: { slug: any; name: string | JSX.Element };
	page: any;
	url: string;
	children?: IProduct[];
}

export interface IMenu {
	menu: {
		items: IItems[];
	};
}
