/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ProductListByCollectionDocument } from '@/gql/graphql';
import { executeGraphQL } from '@/lib/graphql';
import { ProductList } from '@/ui/components/ProductList';
import { useProductStore } from '@/zustand/productsStore';
export const metadata = {
	title: 'Hoàng Phúc, powered by Hoang Phuc',
	description:
		'Storefront Next.js Example for building performant e-commerce experiences with Saleor - the composable, headless commerce platform for global brands.',
};

export default async function Page({ params }: { params: { channel: string } }) {
	const data: any = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: 'featured-products',
			channel: params.channel,
		},
		revalidate: 60,
	});
	const aaa: any = useProductStore.getState();
	console.log('🚀 ~ Page ~ aaa:', aaa);
	if (!data.collection?.products) {
		return null;
	}

	let products: any = data.collection?.products.edges.map(({ node: product }: any) => product);
	products = [...aaa.product, ...products];
	//   console.log('🚀 ~ Page ~ products:', products);

	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			<h2 className="sr-only">Product list</h2>
			<ProductList products={products} />
		</section>
	);
}
