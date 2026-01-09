"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";
import { createContext, PropsWithChildren, useContext } from "react";
import { useTable } from "../hooks/useTableEditor";

export interface TableDataProvidersProps<TData extends RowData>
	extends PropsWithChildren {
	data: TData[];
	columns: ColumnDef<TData>[];
}

export type TableDataContextValue<TData extends RowData> = ReturnType<
	typeof useTable<TData>
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
	const table = useTable(columns, data);

	return (
		<TableDataContext.Provider value={table}>
			{children}
		</TableDataContext.Provider>
	);
}
