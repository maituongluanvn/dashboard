'use client';
import Link from 'next/link';
import ProductImageWrapper from '@/ui/atoms/ProductImageWrapper';
import { formatMoneyRange } from '@/lib/utils';
import { type IProduct } from '@cores/definition';

export function ProductElement({
	product,
	loading,
}: {
	product: IProduct;
	loading: 'eager' | 'lazy';
	priority?: boolean;
}) {
	return (
		<li data-testid="ProductElement" className="border rounded-lg shadow-sm overflow-hidden">
			<Link href={`/products/${product.slug}`} passHref>
				<div className="flex flex-col h-full">
					{product?.thumbnail?.url && (
						<div className="relative w-full h-48">
							{' '}
							{/* Fixed height container for images */}
							<ProductImageWrapper
								src={product.thumbnail.url}
								alt={product.thumbnail.alt ?? ''}
								width={512}
								height={512}
								sizes={'100vw'} // Ensure proper sizing in responsive layouts
								loading={loading}
							/>
						</div>
					)}
					<div className="p-4 flex flex-col flex-grow">
						<h3 className="text-sm font-semibold text-neutral-900">{product.name}</h3>
						<p className="text-sm text-neutral-500 mt-1" data-testid="ProductElement_Category">
							{product.category?.name}
						</p>
						<p className="text-sm font-medium text-neutral-900 mt-2" data-testid="ProductElement_PriceRange">
							{/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
							{formatMoneyRange({
								start: product?.pricing?.priceRange?.start?.gross,
								stop: product?.pricing?.priceRange?.stop?.gross,
							})}
						</p>
					</div>
				</div>
			</Link>
		</li>
	);
}
