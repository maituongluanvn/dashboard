'use client';
import React from 'react';
import NextImage from 'next/image';

interface IProductImageWrapperProps {
	src: string;
	alt: string;
	width: number;
	height: number;
	sizes?: string;
	loading?: 'eager' | 'lazy';
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
	loading = 'lazy',
}) => {
	return (
		<div className="relative w-full" style={{ paddingTop: `${(height / width) * 100}%` }}>
			<NextImage
				loader={imageLoader}
				src={src}
				alt={alt}
				layout="fill" // Make the image fill the container
				objectFit="cover" // Ensure the image covers the container while maintaining its aspect ratio
				sizes={sizes}
				loading={loading}
				className="absolute inset-0"
			/>
		</div>
	);
};

export default ProductImageWrapper;
