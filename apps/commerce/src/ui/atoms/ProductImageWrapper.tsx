import React from 'react';
import NextImage from 'next/image';

const ProductImageWrapper = () => {
	const imageName = 'bf4fb9cabecae802cb8684005'; // Tên hình ảnh trong bucket
	const imageUrl = `https://storage.googleapis.com/hoangphuc/uploads/${imageName}`;

	return (
		<div>
			<NextImage
				src={imageUrl}
				alt="Product Image"
				layout="responsive"
				width={600}
				height={400}
				loading="lazy"
			/>
		</div>
	);
};

export default ProductImageWrapper;
