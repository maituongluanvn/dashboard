import { create } from 'zustand';
import axios from 'axios';
import type { IProductStore, IProduct, TParams } from '@/definition';

const productUrl = "https://3ymzvofxaogcuowg.public.blob.vercel-storage.com/products-gz4RZcuWm9OCCZYBW09LokvB1rVd94.json"

export const useProductStore = create<IProductStore>(set => ({
	products: null,
	product: null,
	loading: false,
	error: null,
	fetchData: async () => {
		set({ loading: true });
		try {
			const { data }: { data: { products: IProduct[] } } = await axios.get(productUrl);
			set({ products: data.products, loading: false });
		} catch (error: any) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			set({ error: error.message, loading: false });
		}
	},
	fetchProduct: async (params: TParams) => {
		set({ loading: true });
		try {
			const { data }: { data: { products: IProduct[] } } = await axios.get(productUrl);
			console.log("🚀 ~ fetchProduct: ~ data:", data)
			const product: IProduct | undefined = data.products.find(product => product.slug === params?.slug);
			console.log("🚀 ~ fetchProduct: ~ product:", product)
			set({ product: product, loading: false });
		} catch (error: any) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			set({ error: error.message, loading: false });
		}
	},
}));
