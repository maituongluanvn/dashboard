import React from 'react';
import NextImage from 'next/image';
import useFetch from '@/hooks/useFetch';

interface IProductImageWrapperProps {
	loadingType: 'eager' | 'lazy';
	src: string;
	alt: string;
	width: number;
	height: number;
	sizes?: string;
	priority: boolean;
}

const ProductImageWrapper: React.FC<IProductImageWrapperProps> = ({
	loadingType,
	src,
	alt,
	width,
	height,
	sizes,
	priority,
}) => {
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
				priority={priority}
				loading={loadingType}
			/>
		</div>
	);
};

export default ProductImageWrapper;

// import React from 'react';
// import NextImage from 'next/image';
// import useFetch from '@/hooks/useFetch'; // Điều chỉnh đường dẫn nếu cần

// const ProductImageWrapper = ({ loadingType }) => {
// 	const imageName = 'bf4fb9cabecae802cb8684005'; // Tên hình ảnh trong bucket
// 	const {
// 		data: imageBlob,
// 		loading,
// 		error,
// 	} = useFetch<Blob>(`${process.env.NEXT_PUBLIC_API_URL}/api/images/${imageName}`, 'GET');

// 	if (loading) return <p>Loading...</p>;
// 	if (error) return <p>Error: {error}</p>;
// 	if (!imageBlob) return <p>No image found</p>;

// 	const imageUrl = URL.createObjectURL(imageBlob);

// 	return (
// 		<div>
// 			<NextImage
// 				src={imageUrl}
// 				alt="Product Image"
// 				layout="responsive"
// 				width={600}
// 				height={400}
// 				loading={loadingType}
// 			/>
// 		</div>
// 	);
// };

// export default ProductImageWrapper;
