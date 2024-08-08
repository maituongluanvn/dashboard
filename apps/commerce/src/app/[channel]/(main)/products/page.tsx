/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { notFound } from 'next/navigation';
import { Pagination } from '@/ui/components/Pagination';
import { ProductList } from '@/ui/components/ProductList';
// import { ProductsPerPage } from '@/app/config';

export const metadata = {
	title: 'Products · Saleor Storefront example',
	description: 'All products in Saleor Storefront example',
};

export default async function Page() {
	// const cursor = typeof searchParams.cursor === 'string' ? searchParams.cursor : null;

	let products: any;

	if (!products) {
		notFound();
	}

	const newSearchParams = new URLSearchParams({
		...(products.pageInfo.endCursor && { cursor: products.pageInfo.endCursor }),
	});

	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			<h2 className="sr-only">Product list</h2>
			<ProductList products={products.edges.map((e: any) => e.node)} />
			<Pagination
				pageInfo={{
					...products.pageInfo,
					basePathname: `/products`,
					urlSearchParams: newSearchParams,
				}}
			/>
		</section>
	);
}
