export type TParams = { channel: string; slug: string };

export interface IProductCategory {
	id: string;
	name: string;
}

export interface IThumbnail {
	url: string;
	alt: string;
}

export interface IPriceRange {
	start: {
		gross: {
			amount: number;
			currency: string;
		};
	};
	stop: {
		gross: {
			amount: number;
			currency: string;
		};
	};
}

export interface IVariants {
	id: string;
	name: string;
	quantityAvailable: number;
	pricing: { price: { gross: { currency: string; amount: number } } };
}

export interface IProductWithoutID extends Omit<IProduct, '_id'> {}

export interface IObjectId {
	toHexString(): string;
	// You can add more methods as needed, but this is the most commonly used one
}

export interface IProduct {
	_id: IObjectId | string;
	name: string;
	slug: string;
	description: string;
	seoTitle: string;
	seoDescription: string;
	pricing: { priceRange: IPriceRange };
	category: IProductCategory;
	thumbnail: IThumbnail;
	variants: IVariants[];
	belongTo: string;
}

export interface IProductStore {
	products: IProduct[] | null;
	product: IProduct | null;
	loading: boolean;
	error: string | null;
	fetchData: () => Promise<void>;
	fetchProduct: (params: TParams) => Promise<void>;
}
