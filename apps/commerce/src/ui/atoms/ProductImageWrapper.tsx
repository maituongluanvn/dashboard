'use client';
import React from 'react';
import NextImage from 'next/image';

interface IProductImageWrapperProps {
	src: string;
	alt: string;
	width: number;
	height: number;
	sizes?: string;
	loading: 'eager' | 'lazy';
}

function imageLoader({ src }: { src: string }): string {
	const imageName = src.split('/').pop();
	return imageName ? `${process.env.NEXT_PUBLIC_API_URL}/api/images/${imageName}` : '';
}

const ProductImageWrapper: React.FC<IProductImageWrapperProps> = ({
	src,
	alt,
	width,
	height,
	sizes,
	loading,
}) => {
	return (
		<NextImage
			loader={imageLoader}
			src={src}
			alt={alt}
			width={width}
			height={height}
			sizes={sizes}
			loading={loading}
			layout="responsive" // Ensure layout is specified
		/>
	);
};

export default ProductImageWrapper;
