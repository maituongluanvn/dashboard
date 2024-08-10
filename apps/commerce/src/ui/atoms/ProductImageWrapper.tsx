import React from 'react';
import NextImage from 'next/image';

async function getImageUrl(src: string): Promise<any> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/images/${src.split('/').pop() || ''}`, {
		next: { revalidate: 60 }, // Revalidate every 60 seconds
	});
	return res.ok ? res.url : '/default-image.png';
}

interface IProductImageWrapperProps {
	loadingType: 'eager' | 'lazy';
	src: string; // Đây là tên file hình ảnh
	alt: string;
	width: number;
	height: number;
	sizes?: string;
}

// Server Component
const ProductImageWrapper: React.FC<IProductImageWrapperProps> = async ({
	loadingType,
	src,
	alt,
	width,
	height,
	sizes,
}) => {
	const imageUrl = await getImageUrl(src);

	return (
		<div>
			<NextImage
				src={imageUrl}
				alt={alt}
				layout="responsive"
				width={width}
				height={height}
				sizes={sizes}
				loading={loadingType}
			/>
		</div>
	);
};

export default ProductImageWrapper;
