// import { LinkWithChannel } from '../atoms/LinkWithChannel';
import Link from 'next/link';
import ProductImageWrapper from '@/ui/atoms/ProductImageWrapper';

import { formatMoneyRange } from '@/lib/utils';
import { type IProduct } from '@cores/definition';

export function ProductElement({
	product,
	loading,
}: { product: IProduct } & { loading: 'eager' | 'lazy'; priority?: boolean }) {
	return (
		<li data-testid="ProductElement">
			<Link href={`/products/${product.slug}`}>
				<div>
					{product?.thumbnail?.url && (
						<ProductImageWrapper
							loadingType={loading}
							src={product.thumbnail.url}
							alt={product.thumbnail.alt ?? ''}
							width={512}
							height={512}
							sizes={'512px'}
						/>
					)}
					<div className="mt-2 flex justify-between">
						<div>
							<h3 className="mt-1 text-sm font-semibold text-neutral-900">{product.name}</h3>
							<p className="mt-1 text-sm text-neutral-500" data-testid="ProductElement_Category">
								{product.category?.name}
							</p>
						</div>
						<p className="mt-1 text-sm font-medium text-neutral-900" data-testid="ProductElement_PriceRange">
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
