"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";
import { createContext, PropsWithChildren, useContext } from "react";
import { useTableData } from "../hooks/useTableEditor";

export interface TableDataProvidersProps<TData extends RowData>
	extends PropsWithChildren {
	data: TData[];
	columns: ColumnDef<TData>[];
}

export type TableDataContextValue<TData extends RowData> = ReturnType<
	typeof useTableData<TData>
>;

const TableDataContext = createContext<TableDataContextValue<any> | null>(null);

export function useTableEditor() {
	const context = useContext(TableDataContext);
	if (context === null)
		throw new Error(
			"'useTableData' must be used within a 'TableDataProvider'"
		);
	return context;
}

export default function TableDataProviders<TData extends RowData>({
	children,
	data,
	columns,
}: Readonly<TableDataProvidersProps<TData>>) {
	const table = useTableData(columns, data);

	return (
		<TableDataContext.Provider value={table}>
			{children}
		</TableDataContext.Provider>
	);
}
