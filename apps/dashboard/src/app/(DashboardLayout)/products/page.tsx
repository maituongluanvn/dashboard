'use client';
import React, { useState, useEffect } from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import DataGridWrapper from '@/components/DataGridWrapper';
import useFetch from '@/hooks/useFetch';
import type { IProduct } from '@cores/definition';

const Products: React.FC = () => {
	const {
		data: products = [],
		loading,
		error,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	} = useFetch<IProduct[]>(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/product`);

	const [data, setData] = useState<IProduct[]>(products || []);

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
	];

	const addNew = (newRow: IProduct) => {
		setData(prevData => [...prevData, newRow]);
	};

	const getRowId = (row: IProduct) => row._id;

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div>
			<h1>Products</h1>
			<PageContainer title="Products Page" description="This is the Products page">
				<DashboardCard title="Product List">
					<DataGridWrapper<IProduct>
						addNewButtonTo="/products/new"
						data={data}
						setData={setData}
						addNew={addNew}
						columnsConfig={columnsConfig}
						getRowId={getRowId}
						loading={loading}
					/>
				</DashboardCard>
			</PageContainer>
		</div>
	);
};

export default Products;
