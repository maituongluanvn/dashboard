import React from 'react';
import type { GridColDef, GridRowModel } from '@mui/x-data-grid';
import { DataGrid, GridValidRowModel } from '@mui/x-data-grid';

interface IDataGridWrapperProps<T extends GridRowModel> {
	data: T[]; // Generic data array
	setData: (data: T[]) => void; // Function to update data
	addNew: (newRow: T) => void; // Function to add a new row
	columnsConfig: GridColDef[];
	getRowId: (row: T) => string; // Function to get row id
}

const DataGridWrapper = <T extends GridRowModel>({
	data,
	setData,
	addNew,
	columnsConfig,
	getRowId,
}: IDataGridWrapperProps<T>) => {
	const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
		// Type assertion to align with generic type T
		const updatedRow = { ...(newRow as T) };
		const updatedRows = data.map(row => (getRowId(row) === newRow.id ? updatedRow : row));
		setData(updatedRows as T[]);
		return updatedRow;
	};

	const handleProcessRowUpdateError = (error: Error) => {
		console.error('Row update failed:', error);
	};

	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={data}
				columns={columnsConfig}
				getRowId={getRowId} // Use getRowId to define row id
				processRowUpdate={processRowUpdate}
				onProcessRowUpdateError={handleProcessRowUpdateError}
				checkboxSelection={false}
			/>
			{/* <button
				onClick={() =>
					addNew({
						_id: Date.now().toString(), // Replace with actual default values
						name: '',
						slug: '',
						description: '',
						seoTitle: '',
						seoDescription: '',
						pricing: {
							priceRange: {
								start: { gross: { amount: 0, currency: '' } },
								stop: { gross: { amount: 0, currency: '' } },
							},
						},
						category: { id: '', name: '' },
						thumbnail: { url: '', alt: '' },
						variants: [],
						belongTo: '',
						createdAt: '',
						updatedAt: '',
					} as T)
				}
			>
				Add New Product
			</button> */}
		</div>
	);
};

export default DataGridWrapper;
