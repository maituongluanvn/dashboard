'use client';
import { Suspense, useEffect } from 'react';
import { ProductList } from '@/ui/components/ProductList';
import { useProductStore } from '@/zustand/useProductsStore';
// export const metadata = {
// 	title: 'Hoàng Phúc, powered by Hoang Phuc',
// 	description:
// 		'Storefront Next.js Example for building performant e-commerce experiences with Saleor - the composable, headless commerce platform for global brands.',
// };

// const Page({ params }: { params: { channel: string } }) {
const Page: React.FC = () => {
	const { products, loading, error, fetchData } = useProductStore();

	useEffect(() => {
		void fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
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
