
export type TParams = { channel: string, slug: string }
export interface ICategory {
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
		}
	}
	stop: {
		gross: {
			amount: number;
			currency: string;
		}
	}
}

export interface IVariants {
	id: string,
	name: string,
	quantityAvailable: number,
	pricing: { price: { gross: { currency: string, amount: number } } }
}

export interface IProduct {
	id: number;
	name: string;
	slug: string;
	description: string;
  	seoTitle: string,
  	seoDescription: string,
	pricing: { priceRange: IPriceRange };
	category: ICategory;
	thumbnail: IThumbnail;
	variants: IVariants[];
}

export interface IProductStore {
	products: IProduct[] | null;
	product: IProduct | null;
	loading: boolean;
	error: string | null;
	fetchData: () => Promise<void>;
	fetchProduct: (params: TParams) => Promise<void>;
}