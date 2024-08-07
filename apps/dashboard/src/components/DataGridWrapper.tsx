'use client';
import React from 'react';
import type { GridColDef, GridRowModel } from '@mui/x-data-grid';
import { DataGrid, GridValidRowModel } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

interface IDataGridWrapperProps<T extends GridRowModel> {
	data: T[];
	setData: (data: T[]) => void;
	addNew: (newRow: T) => void;
	columnsConfig: GridColDef[];
	getRowId: (row: T) => string | any;
	handleEdit: () => void;
	addNewButtonTo: string;
}

const DataGridWrapper = <T extends GridRowModel>({
	data,
	setData,
	addNew,
	columnsConfig,
	getRowId,
	addNewButtonTo,
}: IDataGridWrapperProps<T>) => {
	const router = useRouter();

	const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
		const updatedRow = { ...(newRow as T) };
		const updatedRows = data.map(row => (getRowId(row) === newRow.id ? updatedRow : row));
		setData(updatedRows as T[]);
		return updatedRow;
	};

	const handleProcessRowUpdateError = (error: Error) => {
		console.error('Row update failed:', error);
	};

	const handleEdit = (id: string) => {
		router.push(`/products/${id}`);
	};

	const handleDelete = async (id: string) => {
		if (confirm('Are you sure you want to delete this item?')) {
			try {
				// Example API call, adjust URL and method as needed
				await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/product/${id}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
					},
				});
				setData(prevData => prevData.filter(row => getRowId(row) !== id));
			} catch (err) {
				console.error('Error deleting item:', err);
			}
		}
	};

	const actionColumn: GridColDef = {
		field: 'actions',
		headerName: 'Actions',
		width: 150,
		renderCell: params => (
			<div className="flex space-x-2">
				<IconButton onClick={() => handleEdit(params.id as string)}>
					<EditIcon color="primary" />
				</IconButton>
				<IconButton onClick={() => handleDelete(params.id as string)}>
					<DeleteIcon color="error" />
				</IconButton>
			</div>
		),
	};

	return (
		<div style={{ height: 400, width: '100%' }}>
			<Button onClick={() => router.push(addNewButtonTo)} variant="contained">
				Add new product
			</Button>
			<DataGrid
				rows={data}
				columns={[...columnsConfig, actionColumn]}
				getRowId={getRowId}
				processRowUpdate={processRowUpdate}
				onProcessRowUpdateError={handleProcessRowUpdateError}
				checkboxSelection={false}
			/>
		</div>
	);
};

export default DataGridWrapper;
