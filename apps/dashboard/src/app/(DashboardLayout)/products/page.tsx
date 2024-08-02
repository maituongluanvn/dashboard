'use client';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import DataGridWrapper from '@/components/DataGridWrapper';
import useFetch from '@/hooks/useFetch';
import type { IProduct } from '@cores/definition';
import React, { useState, useEffect } from 'react';

const Products: React.FC = () => {
	const {
		data: products = [], // Đảm bảo products không phải là null
		loading,
		error,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	} = useFetch<IProduct[]>(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/product`);

	const [data, setData] = useState<IProduct[] | null>(products);

	useEffect(() => {
		if (products) {
			setData(products);
		}
	}, [products]);

	const columnsConfig = [
		{ field: '_id', headerName: 'ID', width: 90 },
		{ field: 'name', headerName: 'Name', width: 150 },
		{ field: 'slug', headerName: 'Slug', width: 150 },
		{ field: 'description', headerName: 'Description', width: 150 },
		{ field: 'seoTitle', headerName: 'SEO Title', width: 150 },
		{ field: 'seoDescription', headerName: 'SEO Description', width: 150 },
		// Thêm các cột khác tùy ý
	];

	const addNew = (newRow: IProduct) => {
		setData(prevData => [...prevData, newRow]);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div>
			<h1>Products</h1>
			<PageContainer title="Sample Page" description="this is Sample page">
				<DashboardCard title="Sample Page">
					{/* <Typography>This is a sample page</Typography> */}
					<DataGridWrapper data={data} setData={setData} addNew={addNew} columnsConfig={columnsConfig} />
				</DashboardCard>
			</PageContainer>
		</div>
	);
};

export default Products;
