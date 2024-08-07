/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { notFound } from 'next/navigation';
import { type ResolvingMetadata, type Metadata } from 'next';
import { ProductList } from '@/ui/components/ProductList';

export const generateMetadata = async (
	{ params }: { params: { slug: string; channel: string } },
	parent: ResolvingMetadata,
): Promise<void> => {
	// const { collection }: any = await executeGraphQL(ProductListByCollectionDocument, {
	// 	variables: { slug: params.slug, channel: params.channel },
	// 	revalidate: 60,
	// });
	// return {
	// 	title: `${collection?.name || 'Collection'} | ${collection?.seoTitle || (await parent).title?.absolute}`,
	// 	description:
	// 		collection?.seoDescription || collection?.description || collection?.seoTitle || collection?.name,
	// };
};

export default async function Page({ params }: { params: { slug: string; channel: string } }) {
	// const { collection }: any = await executeGraphQL(ProductListByCollectionDocument, {
	// 	variables: { slug: params.slug, channel: params.channel },
	// 	revalidate: 60,
	// });
	let collection: any;

	if (!collection?.products) {
		notFound();
	}

	const { name, products } = collection;

	return (
		<div className="mx-auto max-w-7xl p-8 pb-16">
			<h1 className="pb-8 text-xl font-semibold">{name}</h1>
			<ProductList products={products.edges.map((e: any) => e.node)} />
		</div>
	);
}
