'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useFetch from '@/hooks/useFetch';
import { IProduct, IProductCategory } from '@cores/definition';
import { TextField, Button, Typography, Grid, MenuItem, CircularProgress } from '@mui/material';
import { notFound } from 'next/navigation';
import NextImage from 'next/image';

const ProductDetail: React.FC = () => {
	const { slug } = useParams();
	const router = useRouter();
	const {
		data: product,
		loading: productLoading,
		error: productError,
	} = useFetch<IProduct>(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/product/${slug}`);
	const [editMode, setEditMode] = useState<boolean>(true);
	const [productData, setProductData] = useState<IProduct | null>(null);
	const [categories, setCategories] = useState<IProductCategory[]>([]);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState<boolean>(false);
	const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

	const {
		data: imageBlob,
		loading: imageLoading,
		error: imageError,
	} = useFetch<Blob>(
		productData?.thumbnail?.url
			? `${process.env.NEXT_PUBLIC_API_URL}/images/${productData.thumbnail.url.split('/').pop()}`
			: '',
		'GET',
	);

	useEffect(() => {
		if (product) {
			setProductData(product);
		}
	}, [product]);

	useEffect(() => {
		if (imageBlob) {
			const imageUrl = URL.createObjectURL(imageBlob);
			setImagePreview(imageUrl);
		}
	}, [imageBlob]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/product/categories`);
				const data = await response.json();
				setCategories(data);
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		};
		fetchCategories();
	}, []);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setImageFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setProductData(prevData =>
			prevData
				? {
						...prevData,
						[name]: value,
					}
				: null,
		);
	};

	const uploadImage = async (file: File, oldImageUrl?: string) => {
		const formData = new FormData();
		formData.append('file', file);

		try {
			// Nếu có URL của ảnh cũ, xóa ảnh cũ trước khi tải ảnh mới
			if (oldImageUrl) {
				const oldImageName = oldImageUrl.split('/').pop();
				if (oldImageName) {
					await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/${oldImageName}`, {
						method: 'DELETE',
					});
				}
			}

			// Tải ảnh mới lên
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/upload`, {
				method: 'POST',
				body: formData,
			});
			const result = await response.json();
			if (response.ok) {
				return result.url;
			} else {
				console.error('Upload failed:', result.error);
				throw new Error(result.error || 'Upload failed');
			}
		} catch (error) {
			console.error('An unexpected error occurred:', error);
			throw error;
		}
	};

	const handleSave = async () => {
		if (!productData) return;

		setUploading(true);
		try {
			let imageUrl = productData.thumbnail?.url || '';
			if (imageFile) {
				imageUrl = await uploadImage(imageFile, imageUrl);
				setImagePreview(imageUrl);
				setImageFile(null);
			}

			const updatedProductData = {
				...productData,
				thumbnail: {
					...productData.thumbnail,
					url: imageUrl,
				},
			};

			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/product/${slug}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedProductData),
			});
			const data = await response.json();
			if (response.ok) {
				setProductData(data);
				setEditMode(false);
				router.refresh();
			} else {
				console.error('Error updating product:', data.message);
			}
		} catch (error) {
			console.error('Error saving product:', error);
		} finally {
			setUploading(false);
		}
	};

	if (productLoading) return <CircularProgress />;
	if (productError) return <p>Error: {productError.message}</p>;
	if (!product) {
		notFound();
	}

	return (
		<section className="product-detail">
			<Typography variant="h4">Product Details</Typography>
			<Grid container spacing={2} mt={2}>
				<Grid item xs={12} md={6}>
					<TextField
						label="Name"
						name="name"
						value={productData?.name || ''}
						onChange={handleChange}
						fullWidth
						disabled={!editMode}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Slug"
						name="slug"
						value={productData?.slug || ''}
						onChange={handleChange}
						fullWidth
						disabled={!editMode}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Description"
						name="description"
						value={productData?.description || ''}
						onChange={handleChange}
						fullWidth
						multiline
						rows={4}
						disabled={!editMode}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="SEO Title"
						name="seoTitle"
						value={productData?.seoTitle || ''}
						onChange={handleChange}
						fullWidth
						disabled={!editMode}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="SEO Description"
						name="seoDescription"
						value={productData?.seoDescription || ''}
						onChange={handleChange}
						fullWidth
						multiline
						rows={4}
						disabled={!editMode}
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="h6">Category:</Typography>
					<TextField
						select
						label="Category"
						name="category"
						value={productData?.category?.id || ''}
						onChange={handleChange}
						fullWidth
						disabled={!editMode}
					>
						{categories.map(category => (
							<MenuItem key={category.id} value={category.id}>
								{category.name}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" component="label">
						Select Thumbnail
						<input type="file" hidden accept="image/*" onChange={handleImageChange} />
					</Button>
					{imagePreview && (
						<NextImage
							src={imagePreview as string}
							alt="Thumbnail preview"
							layout="responsive"
							width={400} // Adjust width as needed
							height={300} // Adjust height as needed
							sizes="(max-width: 600px) 480px, 800px"
							priority={false}
						/>
					)}
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" color="primary" onClick={handleSave} disabled={!editMode || uploading}>
						{uploading ? <CircularProgress size={24} /> : 'Save'}
					</Button>
				</Grid>
			</Grid>
		</section>
	);
};

export default ProductDetail;
