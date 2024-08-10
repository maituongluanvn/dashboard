import { ProductList } from '@/ui/components/ProductList';
import type { IProduct } from '@cores/definition';

async function getProducts(): Promise<IProduct[]> {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/product`);
	if (!response.ok) {
		throw new Error('Failed to fetch products');
	}
	return response.json();
}

// Server Component
const Page = async () => {
	const products = await getProducts();

	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			<h2 className="sr-only">Product list</h2>
			<ProductList products={products} />
		</section>
	);
};

export default Page;
