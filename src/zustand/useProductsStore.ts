import { create } from 'zustand';
import axios from 'axios';
import type { IProductStore, IProduct} from '@/definition'

export const useProductStore = create<IProductStore>(set => ({
	products: null,
	loading: false,
	error: null,
	fetchData: async () => {
		set({ loading: true });
		try {
			const { data }: { data: { products: IProduct[] } } = await axios.get(
				'https://3ymzvofxaogcuowg.public.blob.vercel-storage.com/products-kA6Mco82dRglLysw8pr2GlcpUTMj5x.json',
			);
			set({ products: data.products, loading: false });
		} catch (error: any) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
			set({ error: error.message, loading: false });
		}
	},
}));

// .setState({ paw: false })

// export const useProductStore = create(() => ({
// 	getProducts: () => set(async () => {
// 		const {data} = await axios.get('https://3ymzvofxaogcuowg.public.blob.vercel-storage.com/products-0J6pqclbXOopDeh5oEr5ycxjv0DOu6.json')
// 		console.log("🚀 ~ products: ~ products:", data)
// 		return data.products;
// 	}),
// 	increasePopulation: () => set((state: { bears: number }) => ({ bears: state.bears + 1 })),
// }));
