import React from 'react';
import NextImage from 'next/image';
import useFetch from '@/hooks/useFetch';

interface IProductImageWrapperProps {
	src: string;
	alt: string;
	width: number;
	height: number;
	sizes?: string;
}

const ProductImageWrapper: React.FC<IProductImageWrapperProps> = ({ src, alt, width, height, sizes }) => {
	const {
		data: imageBlob,
		loading,
		error,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	} = useFetch<Blob>(`${process.env.NEXT_PUBLIC_API_URL}/api/images/${src.split('/').pop() || ''}`, 'GET');

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error as any}</p>;
	if (!imageBlob) return <p>No image found</p>;

	const imageUrl = URL.createObjectURL(imageBlob);

	return (
		<div>
			<NextImage
				src={imageUrl}
				alt={alt}
				layout="responsive"
				width={width}
				height={height}
				sizes={sizes}
				loading="lazy"
			/>
		</div>
	);
};

export default ProductImageWrapper;
