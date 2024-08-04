'use client';
import React, { useState } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import type { IProduct, IProductWithoutID } from '@cores/definition';

// Define flattened form values type
interface IFormikValues {
	name: string;
	slug: string;
	description: string;
	seoTitle: string;
	seoDescription: string;
	pricingStartAmount: number;
	pricingStopAmount: number;
	categoryName: string;
	thumbnailUrl: string;
	imagePreview: string | null;
	belongTo: string;
}

// Define validation schema
const validationSchema = Yup.object({
	name: Yup.string().required('Name is required'),
	slug: Yup.string().required('Slug is required'),
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

const NewProductForm: React.FC = () => {
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [submitStatus, setSubmitStatus] = useState<string | null>(null);

	const useSubmitProduct = async (product: IProductWithoutID) => {
		const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/product`;
		const requestOptions: RequestInit = {
			method: 'POST',
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
		}
	};

	const formik = useFormik<IFormikValues>({
		initialValues: {
			name: '',
			slug: '',
			description: '',
			seoTitle: '',
			seoDescription: '',
			pricingStartAmount: 0,
			pricingStopAmount: 0,
			categoryName: '',
			thumbnailUrl: '',
			imagePreview: null,
			belongTo: 'hoangphuc',
		},
		validationSchema,
		onSubmit: async values => {
			const product: IProductWithoutID = {
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
				category: { id: '', name: values.categoryName }, // Adjust category id if needed
				thumbnail: { url: values.thumbnailUrl, alt: '' }, // Handle thumbnail alt text if needed
				variants: [], // Adjust if you have variants
				belongTo: 'hoangphuc', // Adjust if needed
			};

			setSubmitStatus('Submitting...');
			const { data, error } = await useSubmitProduct(product);

			if (error) {
				setSubmitStatus(`Error: ${error.message}`);
			} else if (data) {
				setSubmitStatus('Submission successful!');
			}
		},
	});

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
				void formik.setFieldValue('thumbnailUrl', reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

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
						value={formik.values.categoryName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
						helperText={formik.touched.categoryName && formik.errors.categoryName}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" component="label">
						Upload Thumbnail
						<input type="file" hidden accept="image/*" onChange={handleImageChange} />
					</Button>
					{imagePreview && (
						<img src={imagePreview} alt="Thumbnail preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
					)}
				</Grid>
				<Grid item xs={12}>
					<Button color="primary" variant="contained" fullWidth type="submit">
						Submit
					</Button>
					{submitStatus && <p>{submitStatus}</p>}
				</Grid>
			</Grid>
		</Box>
	);
};

export default NewProductForm;
