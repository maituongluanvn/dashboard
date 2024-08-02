// DataGridWrapper.tsx
import React from 'react';
import type { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';

interface IDataGridWrapperProps {
	data: GridRowsProp;
	setData: (data: GridRowsProp) => void;
	addNew: (newRow: any) => void;
	columnsConfig: GridColDef[];
}

const DataGridWrapper: React.FC<IDataGridWrapperProps> = ({ data, setData, addNew, columnsConfig }) => {
	const processRowUpdate = (newRow: any, oldRow: any) => {
		const updatedRows = data.map(row => (row.id === newRow.id ? { ...row, ...newRow } : row));
		setData(updatedRows);
		return newRow;
	};

	const handleProcessRowUpdateError = (error: Error) => {
		console.error('Row update failed:', error);
	};

	const handleAddNew = () => {
		const newRow = { id: Date.now().toString(), name: '', description: '' };
		addNew(newRow);
	};

	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={data}
				columns={columnsConfig}
				getRowId={row => row._id}
				processRowUpdate={processRowUpdate}
				onProcessRowUpdateError={handleProcessRowUpdateError}
				checkboxSelection
			/>
			<button onClick={handleAddNew}>Add New</button>
		</div>
	);
};

export default DataGridWrapper;
