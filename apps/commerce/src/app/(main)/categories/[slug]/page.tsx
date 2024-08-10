'use client';
import { notFound } from 'next/navigation';
import { ProductList } from '@/ui/components/ProductList';
import type { IProduct } from '@cores/definition';
import useFetch from '@/hooks/useFetch';

export default function Page({ params }: { params: { slug: string; channel: string } }) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	const {
		data: products = [],
		loading,
		error,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	} = useFetch<IProduct>(
		`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/product/categories/${params.slug}`,
	);

	if (loading) return <p>Loading...</p>;
	if (!Array.isArray(products) || error) return notFound();

	return (
		<div className="mx-auto max-w-7xl p-8 pb-16">
			<h1 className="pb-8 text-xl font-semibold">{params.slug}</h1>
			{/* eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */}
			<ProductList products={products} />
		</div>
	);
}
