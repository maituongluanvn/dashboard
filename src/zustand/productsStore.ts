import { create } from 'zustand';

export const useProductStore = create(set => ({
	product: [
		{
			id: 'UHJvZHVjdDoxNTA=',
			name: 'Nước muối',
			slug: 'nuoc-muoi',
			pricing: {
				priceRange: {
					start: {
						gross: {
							amount: 54,
							currency: 'VND',
						},
					},
					stop: {
						gross: {
							amount: 90,
							currency: 'VND',
						},
					},
				},
			},
			category: {
				id: 'Q2F0ZWdvcnk6NDE=',
				name: 'Homewares',
			},
			thumbnail: {
				url: 'https://3ymzvofxaogcuowg.public.blob.vercel-storage.com/444470698_1124776635298415_5589469441042249899_n-y4eron1o0LUCjyioNNDqi4p1dXkw0k.webp',
				alt: '',
			},
		},
	],
	increasePopulation: () => set((state: { bears: number }) => ({ bears: state.bears + 1 })),
}));
