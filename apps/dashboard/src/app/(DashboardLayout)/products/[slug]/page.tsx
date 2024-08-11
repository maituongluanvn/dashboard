'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, CircularProgress, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter, useParams } from 'next/navigation';
import type { IProduct, IProductCategory } from '@cores/definition';
import NextImage from "next/legacy/image";
import useFetch from '@/hooks/useFetch';

// Define validation schema
const validationSchema = Yup.object({
	name: Yup.string().required('Name is required'),
	slug: Yup.string()
		.required('Slug is required')
		.matches(
			/^[a-z0-9]+(-[a-z0-9]+)*$/,
			'Slug must be lowercase and can only contain letters, numbers, and hyphens',
		),
	description: Yup.string().required('Description is required'),
	seoTitle: Yup.string().required('SEO Title is required'),
	seoDescription: Yup.string().required('SEO Description is required'),
	pricingStartAmount: Yup.number()
		.required('Start price is required')
		.min(0, 'Price must be greater than or equal to 0'),
	pricingStopAmount: Yup.number()
		.required('Stop price is required')
		.min(0, 'Price must be greater than or equal to 0'),
	categoryName: Yup.string().required('Category is required'),
	thumbnailUrl: Yup.string(),
	belongTo: Yup.string(),
});

const ProductDetail: React.FC = () => {
	const [categories, setCategories] = useState<IProductCategory[]>([]);
	const [loading, setLoading] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<string | null>(null);
	const [product, setProduct] = useState<IProduct | null>(null);
	const [uploading, setUploading] = useState<boolean>(false);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [imageUrlChanged, setImageUrlChanged] = useState<boolean>(false);

	const [imageFile, setImageFile] = useState<File | null>(null);
	const router = useRouter();
	const { slug } = useParams();

	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	const { data: imageBlob } = useFetch<Blob>(
		product?.thumbnail?.url
			? `${process.env.NEXT_PUBLIC_API_URL}/api/images/${product.thumbnail.url.split('/').pop()}`
			: '',
		'GET',
	);

	useEffect(() => {
		if (imageBlob) {
			const imageUrl = URL.createObjectURL(imageBlob);
			setImagePreview(imageUrl);
		}
	}, [imageBlob]);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/product/${slug}`);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json(); // Lấy phản hồi dưới dạng JSON
				setProduct(data);
				if (data.thumbnailUrl) {
					setImagePreview(data.thumbnailUrl);
				}
			} catch (error) {
				console.error('Error fetching product:', error);
			}
		};

		const fetchCategories = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/product/categories`);
				const data = await response.json();
				setCategories(data);
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		};

		void fetchProduct();
		void fetchCategories();
	}, [slug]);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setImageFile(file);
			setImageUrlChanged(true);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const uploadImage = async (file: File, oldImageUrl?: string) => {
		const formData = new FormData();
		formData.append('file', file);

		try {
			// If you have the URL of the old image, delete the old image before uploading the new one.
			if (oldImageUrl) {
				const oldImageName = oldImageUrl.split('/').pop();
				if (oldImageName) {
					try {
						// eslint-disable-next-line react-hooks/rules-of-hooks, @typescript-eslint/no-unsafe-call
						useFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/images/${oldImageName}`, 'DELETE');
					} catch (error) {
						console.error('Can not delete image URL:', oldImageName);
					}
				}
			}

			// Upload new image
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/images/upload`, {
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
		if (!product) return;

		setUploading(true);
		try {
			let imageUrl = product.thumbnail?.url || '';

			if (imageUrlChanged && imageFile) {
				imageUrl = await uploadImage(imageFile, imageUrl);
				setImageFile(null);
				setImageUrlChanged(false);
			}

			const updatedproduct = {
				...product,
				thumbnail: {
					...product.thumbnail,
					url: imageUrl,
				},
			};

			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/product/${slug}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedproduct),
			});
			const data = await response.json();
			if (response.ok) {
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

	const useUpdateProduct = async (product: IProduct) => {
		setUploading(true);
		const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/product/${product._id}`;
		const requestOptions: RequestInit = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(product),
		};

		try {
			const response = await fetch(url, requestOptions);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const result = (await response.json()) as IProduct;
			return { data: result, error: null };
		} catch (error) {
			if (error instanceof Error) {
				return { data: null, error };
			} else {
				return { data: null, error: new Error('An unexpected error occurred') };
			}
		} finally {
			setUploading(false);
		}
	};

	// Initialize Formik only after product data is fetched
	const formik = useFormik({
		initialValues: {
			name: product?.name || '',
			slug: product?.slug || '',
			description: product?.description || '',
			seoTitle: product?.seoTitle || '',
			seoDescription: product?.seoDescription || '',
			pricingStartAmount: product?.pricing?.priceRange?.start?.gross?.amount || 0,
			pricingStopAmount: product?.pricing?.priceRange?.stop?.gross?.amount || 0,
			categoryName: product?.category?.name || '',
			thumbnailUrl: product?.thumbnail?.url || '',
			belongTo: product?.belongTo || 'hoangphuc',
		},
		validationSchema,
		enableReinitialize: true, // Reinitialize form values when product changes
		onSubmit: async values => {
			try {
				setLoading(true);
				let thumbnailUrl = product?.thumbnail?.url || '';

				if (imageFile) {
					thumbnailUrl = await uploadImage(imageFile, product?.thumbnail?.url);
				}

				const updatedProduct: IProduct = {
					...product!,
					name: values.name,
					slug: values.slug,
					description: values.description,
					seoTitle: values.seoTitle,
					seoDescription: values.seoDescription,
					pricing: {
						priceRange: {
							start: { gross: { amount: values.pricingStartAmount, currency: 'VND' } },
							stop: { gross: { amount: values.pricingStopAmount, currency: 'VND' } },
						},
					},
					category: { name: values.categoryName }, // Adjust category id if needed
					thumbnail: { url: thumbnailUrl, alt: '' }, // Handle thumbnail alt text if needed
					belongTo: values.belongTo, // Use formik value for belongTo
				};

				setSubmitStatus('Updating...');
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const { data, error } = await useUpdateProduct(updatedProduct);

				if (error) {
					setSubmitStatus(`Error: ${error.message}`);
				} else if (data) {
					setSubmitStatus('Update successful!');
					router.push('/products');
				}
			} catch (error) {
				setSubmitStatus('An error occurred during update');
			} finally {
				setLoading(false);
			}
		},
	});

	return (
		<Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: '700px', margin: 'auto' }}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						fullWidth
						id="name"
						name="name"
						label="Product Name"
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.name && Boolean(formik.errors.name)}
						helperText={formik.touched.name && formik.errors.name}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						id="slug"
						name="slug"
						label="Slug"
						value={formik.values.slug}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.slug && Boolean(formik.errors.slug)}
						helperText={formik.touched.slug && formik.errors.slug}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						id="description"
						name="description"
						label="Description"
						multiline
						rows={4}
						value={formik.values.description}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.description && Boolean(formik.errors.description)}
						helperText={formik.touched.description && formik.errors.description}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						id="seoTitle"
						name="seoTitle"
						label="SEO Title"
						value={formik.values.seoTitle}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.seoTitle && Boolean(formik.errors.seoTitle)}
						helperText={formik.touched.seoTitle && formik.errors.seoTitle}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						id="seoDescription"
						name="seoDescription"
						label="SEO Description"
						multiline
						rows={2}
						value={formik.values.seoDescription}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.seoDescription && Boolean(formik.errors.seoDescription)}
						helperText={formik.touched.seoDescription && formik.errors.seoDescription}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						fullWidth
						id="pricingStartAmount"
						name="pricingStartAmount"
						label="Start Price"
						type="number"
						value={formik.values.pricingStartAmount}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.pricingStartAmount && Boolean(formik.errors.pricingStartAmount)}
						helperText={formik.touched.pricingStartAmount && formik.errors.pricingStartAmount}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						fullWidth
						id="pricingStopAmount"
						name="pricingStopAmount"
						label="Stop Price"
						type="number"
						value={formik.values.pricingStopAmount}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.pricingStopAmount && Boolean(formik.errors.pricingStopAmount)}
						helperText={formik.touched.pricingStopAmount && formik.errors.pricingStopAmount}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						id="categoryName"
						name="categoryName"
						label="Category"
						select
						value={formik.values.categoryName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
						helperText={formik.touched.categoryName && formik.errors.categoryName}
					>
						<MenuItem value="" disabled>
							Select category
						</MenuItem>
						{categories.map(category => (
							<MenuItem key={category.name} value={category.name}>
								{category.name}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" component="label">
						Upload Thumbnail
						<input type="file" hidden accept="image/*" onChange={handleImageChange} />
					</Button>
					{uploading ? (
						<CircularProgress />
					) : (
						imageFile && (
							// eslint-disable-next-line @typescript-eslint/no-misused-promises
							<Button variant="contained" color="secondary" onClick={handleSave}>
								Save image
							</Button>
						)
					)}
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
					<Button color="primary" variant="contained" fullWidth type="submit" disabled={loading}>
						{loading ? <CircularProgress size={24} /> : 'Submit'}
					</Button>
					{submitStatus && <p>{submitStatus}</p>}
				</Grid>
			</Grid>
		</Box>
	);
};

export default ProductDetail;
