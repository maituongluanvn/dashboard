'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useFetch from '@/hooks/useFetch';
import { IProduct, IProductCategory } from '@cores/definition';
import {
	TextField,
	Button,
	Typography,
	Grid,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
} from '@mui/material';
import { notFound } from 'next/navigation';

const ProductDetail: React.FC = () => {
	const { slug } = useParams();
	const router = useRouter();
	const {
		data: product,
		loading,
		error,
	} = useFetch<IProduct>(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/product/${slug}`);
	const [editMode, setEditMode] = useState<boolean>(false);
	const [productData, setProductData] = useState<IProduct | null>(null);
	const [categories, setCategories] = useState<IProductCategory[]>([]);

	// Fetch categories (replace with your API endpoint)
	const {
		data: categoryData,
		loading: categoryLoading,
		error: categoryError,
	} = useFetch<IProductCategory[]>(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/product/categories`);

	useEffect(() => {
		if (product) {
			setProductData(product);
		}
	}, [product]);

	useEffect(() => {
		if (categoryData) {
			setCategories(categoryData);
		}
	}, [categoryData]);

	const handleEditToggle = () => setEditMode(!editMode);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
		const { name, value } = event.target as HTMLInputElement;
		setProductData(prevData =>
			prevData
				? {
						...prevData,
						[name]: value,
					}
				: null,
		);
	};

	const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setProductData(prevData =>
			prevData
				? {
						...prevData,
						category: categories.find(cat => cat.id === event.target.value) || prevData.category,
					}
				: null,
		);
	};

	const handleSave = async () => {
		if (!productData) return;

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/product/${slug}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(productData),
			});

			if (!response.ok) {
				throw new Error('Failed to update product');
			}

			const updatedProduct = await response.json();
			setProductData(updatedProduct);
			setEditMode(false);
			router.refresh(); // Refresh the page to reflect the updated data
		} catch (error) {
			console.error('Error updating product:', error);
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;
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
					<FormControl fullWidth>
						<InputLabel id="category-label">Category</InputLabel>
						<Select
							labelId="category-label"
							value={productData?.category?.id || ''}
							onChange={handleCategoryChange}
							disabled={!editMode}
						>
							{categories.map(category => (
								<MenuItem key={category.id} value={category.id}>
									{category.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" color="primary" onClick={handleEditToggle}>
						{editMode ? 'Cancel' : 'Edit'}
					</Button>
					{editMode && (
						<Button variant="contained" color="secondary" onClick={handleSave} sx={{ ml: 2 }}>
							Save
						</Button>
					)}
				</Grid>
			</Grid>
		</section>
	);
};

export default ProductDetail;
