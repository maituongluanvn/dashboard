'use client';
import { notFound } from 'next/navigation';

import { ProductList } from '@/ui/components/ProductList';
import { type ICategory } from '@/definition';
import useFetch from '@/hooks/useFetch';

export default function Page({ params }: { params: { slug: string; channel: string } }) {
	console.log('🚀 ~ Page ~ params:', params);
	const {
		data: category,
		loading,
		error,
	} = useFetch<ICategory>({ endpoint: `/api/category/${params.slug}` });
	console.log('🚀 ~ category 111:', category);

	if (!category || !category.products) {
		notFound();
	}

	const { name, products } = category;

	return (
		<div className="mx-auto max-w-7xl p-8 pb-16">
			<h1 className="pb-8 text-xl font-semibold">{name}</h1>
			<ProductList products={products.edges.map((e: any) => e.node)} />
		</div>
	);
}
