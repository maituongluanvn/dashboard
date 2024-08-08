import * as Yup from 'yup';
// Define validation schema
export const validationSchema = Yup.object({
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
