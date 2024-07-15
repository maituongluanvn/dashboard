'use client';
import { notFound } from 'next/navigation';
import { ProductList } from '@/ui/components/ProductList';
import { type ICategory } from '@/definition';
import useFetch from '@/hooks/useFetch';

export default function Page({ params }: { params: { slug: string; channel: string } }) {
	const { data: category, loading, error } = useFetch<ICategory>(`/api/categories/${params.slug}`);

	if (loading) return <p>Loading...</p>;
	if (error as any) return <p>Error: {error as any}</p>;
	if (!category) return notFound();

	const { name, products } = category;

	return (
		<div className="mx-auto max-w-7xl p-8 pb-16">
			<h1 className="pb-8 text-xl font-semibold">{name}</h1>
			{/* eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access */}
			<ProductList products={products.edges.map((e: any) => e.node)} />
		</div>
	);
}
