// app/products/page.tsx

import { ProductList } from '@/ui/components/ProductList';
import type { IProduct } from '@cores/definition';
import type { GetServerSideProps } from 'next';

// Metadata for the page
export const metadata = {
	title: 'Products · Saleor Storefront example',
	description: 'All products in Saleor Storefront example',
};

const Page: React.FC<{ products: IProduct[] }> = ({ products }) => {
	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			<h1 className="text-2xl font-bold">Product List</h1>
			<ProductList products={products} />
		</section>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
		if (!response.ok) {
			throw new Error('Failed to fetch products');
		}
		const products: IProduct[] = await response.json();
		return {
			props: { products },
		};
	} catch (error) {
		return {
			props: { products: [] },
		};
	}
};

export default Page;
