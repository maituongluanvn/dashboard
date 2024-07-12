import { create } from 'zustand';

export const useProductStore = create(set => ({
  product: [{
    id: 'UHJvZHVjdDoxNTA=',
    name: 'Saleor Mighty Mug',
    slug: 'mighty-mug',
    pricing: { priceRange: [Object] },
    category: { id: 'Q2F0ZWdvcnk6NDE=', name: 'Homewares' },
    thumbnail: {
      url: 'https://drive.google.com/file/d/15Y37eVmloRpCo_lkI9DvguMyzSMhXJxm/view?usp=sharing',
      alt: '',
    },
  }],
  increasePopulation: () => set((state: { bears: number; }) => ({ bears: state.bears + 1 })),
}));
