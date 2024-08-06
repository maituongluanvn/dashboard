'use client';
import { ProductList } from '@/ui/components/ProductList';
import useFetch from '@/hooks/useFetch';
import { type IProduct } from '@cores/definition';
// export const metadata = {
// 	title: 'Hoàng Phúc, powered by Hoang Phuc',
// 	description:
// 		'Storefront Next.js Example for building performant e-commerce experiences with Saleor - the composable, headless commerce platform for global brands.',
// };

// const Page({ params }: { params: { channel: string } }) {
const Page: React.FC = () => {
	const {
		data: products = [],
		loading,
		error,
	} = useFetch<IProduct[]>(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/product`);

	if (loading) return <p>Loading...</p>;
	if (error as any) return <p>Error: {error as any}</p>;
	if (!products) return null;

	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			<h2 className="sr-only">Product list</h2>
			<ProductList products={products} />
		</section>
	);
};

export default Page;
