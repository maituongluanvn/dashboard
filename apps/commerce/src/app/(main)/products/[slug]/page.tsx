'use client';
import { notFound } from 'next/navigation';
import xss from 'xss';
import { type WithContext, type Product } from 'schema-dts';
import { AddButton } from './AddButton';
import { VariantSelector } from '@/ui/components/VariantSelector';
import ProductImageWrapper from '@/ui/atoms/ProductImageWrapper';
import { formatMoney, formatMoneyRange } from '@/lib/utils';
import { AvailabilityMessage } from '@/ui/components/AvailabilityMessage';
import { type IProduct } from '@cores/definition';
import useFetch from '@/hooks/useFetch';

export default function Page({
	params,
	searchParams,
}: {
	params: { slug: string; channel: string };
	searchParams: { variant?: string };
}) {
	const {
		data: product,
		loading,
		error,
	} = useFetch<IProduct>(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/product/${params.slug}`);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;
	if (!product) {
		notFound();
	}

	const firstImage = product?.thumbnail;
	const description = product?.description;
	const variants = product?.variants;
	const selectedVariantID = searchParams.variant;
	const selectedVariant = variants?.find(({ id }: any) => id === selectedVariantID);

	const isAvailable =
		variants?.some((variant: { quantityAvailable: any }) => variant.quantityAvailable) ?? false;

	const price = selectedVariant?.pricing?.price?.gross
		? formatMoney(selectedVariant.pricing.price.gross.amount, selectedVariant.pricing.price.gross.currency)
		: isAvailable
			? formatMoneyRange({
					start: product?.pricing?.priceRange?.start?.gross,
					stop: product?.pricing?.priceRange?.stop?.gross,
				})
			: '';

	const productJsonLd: WithContext<Product> = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		image: product.thumbnail?.url,
		...(selectedVariant
			? {
					name: `${product.name} - ${selectedVariant.name}`,
					description: product.seoDescription || `${product.name} - ${selectedVariant.name}`,
					offers: {
						'@type': 'Offer',
						availability: selectedVariant.quantityAvailable
							? 'https://schema.org/InStock'
							: 'https://schema.org/OutOfStock',
						priceCurrency: selectedVariant.pricing?.price?.gross.currency,
						price: selectedVariant.pricing?.price?.gross.amount,
					},
				}
			: {
					name: product.name,
					description: product.seoDescription || product.name,
					offers: {
						'@type': 'AggregateOffer',
						availability: product.variants?.some(
							(variant: { quantityAvailable: any }) => variant.quantityAvailable,
						)
							? 'https://schema.org/InStock'
							: 'https://schema.org/OutOfStock',
						priceCurrency: product.pricing?.priceRange?.start?.gross.currency,
						lowPrice: product.pricing?.priceRange?.start?.gross.amount,
						highPrice: product.pricing?.priceRange?.stop?.gross.amount,
					},
				}),
	};

	return (
		<section className="mx-auto grid max-w-7xl p-8">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(productJsonLd),
				}}
			/>
			<form className="grid gap-2 sm:grid-cols-2 lg:grid-cols-8">
				<div className="md:col-span-1 lg:col-span-5">
					{firstImage && (
						<ProductImageWrapper
							loadingType="lazy"
							priority={true}
							alt={firstImage.alt ?? ''}
							width={1024}
							height={1024}
							src={firstImage.url}
						/>
					)}
				</div>
				<div className="flex flex-col pt-6 sm:col-span-1 sm:px-6 sm:pt-0 lg:col-span-3 lg:pt-16">
					<div>
						<h1 className="mb-4 flex-auto text-3xl font-medium tracking-tight text-neutral-900">
							{product?.name}
						</h1>
						<p className="mb-8 text-sm " data-testid="ProductElement_Price">
							{price}
						</p>

						{variants && (
							<VariantSelector
								selectedVariant={selectedVariant}
								variants={variants}
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
								product={product as any}
								channel={params.channel}
							/>
						)}
						<AvailabilityMessage isAvailable={isAvailable} />
						<div className="mt-8">
							<AddButton disabled={!selectedVariantID || !selectedVariant?.quantityAvailable} />
						</div>
						{description && (
							<div className="mt-8 space-y-6 text-sm text-neutral-500">
								<div key={description} dangerouslySetInnerHTML={{ __html: xss(description) }} />
							</div>
						)}
					</div>
				</div>
			</form>
		</section>
	);
}
