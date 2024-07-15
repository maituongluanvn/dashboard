'use client';
import { Suspense } from 'react';
import { ProductList } from '@/ui/components/ProductList';
import useFetch from '@/hooks/useFetch';
import { type IProduct } from '@/definition';
// export const metadata = {
// 	title: 'Hoàng Phúc, powered by Hoang Phuc',
// 	description:
// 		'Storefront Next.js Example for building performant e-commerce experiences with Saleor - the composable, headless commerce platform for global brands.',
// };

// const Page({ params }: { params: { channel: string } }) {
const Page: React.FC = () => {
	const { data: products, loading, error } = useFetch<IProduct[]>('/api/product');

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error }</p>;
	if (!products) return null;

	return (
		<Suspense fallback={<p>Loading...</p>}>
			<section className="mx-auto max-w-7xl p-8 pb-16">
				<h2 className="sr-only">Product list</h2>
				<ProductList products={products} />
			</section>
		</Suspense>
	);
};

export default Page;
