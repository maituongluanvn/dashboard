
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

export interface IProduct {
	id: number;
	name: string;
	slug: string;
	pricing: { priceRange: IPriceRange };
	category: ICategory;
	thumbnail: IThumbnail;
}

export interface IProductStore {
	products: IProduct[] | null;
	loading: boolean;
	error: string | null;
	fetchData: () => Promise<void>;
}