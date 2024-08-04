'use client';
import React from 'react';
import type { GridColDef, GridRowModel } from '@mui/x-data-grid';
import { DataGrid, GridValidRowModel } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

interface IDataGridWrapperProps<T extends GridRowModel> {
	data: T[];
	setData: (data: T[]) => void;
	addNew: (newRow: T) => void;
	columnsConfig: GridColDef[];
	getRowId: (row: T) => string;
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

	return (
		<div style={{ height: 400, width: '100%' }}>
			<Button onClick={() => router.push(addNewButtonTo)} variant="contained">
				Add new product
			</Button>
			<DataGrid
				rows={data}
				columns={columnsConfig}
				getRowId={getRowId}
				processRowUpdate={processRowUpdate}
				onProcessRowUpdateError={handleProcessRowUpdateError}
				checkboxSelection={false}
			/>
		</div>
	);
};

export default DataGridWrapper;
