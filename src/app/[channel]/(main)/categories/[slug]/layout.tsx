import { type ResolvingMetadata, type Metadata } from 'next';
import { type ReactNode } from 'react';
import { type ICategory } from '@/definition';

interface LayoutProps {
	children: ReactNode;
}

export const generateMetadata = async (
	{ params }: { params: { slug: string; channel: string } },
	parent: ResolvingMetadata,
): Promise<Metadata> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/${params.slug}`);
	const category: ICategory = (await response.json()) as ICategory;

	return {
		title: `${category?.name || 'Categroy'} | ${category?.seoTitle || (await parent).title?.absolute}`,
		description: category?.seoDescription || category?.description || category?.seoTitle || category?.name,
	};
};

export default function Layout({ children }: LayoutProps) {
	return (
		<div>
			<p>This is a layout</p>
			{children}
		</div>
	);
}
