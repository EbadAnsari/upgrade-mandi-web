"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
import { useTableData } from "../hooks/useTableEditor";
import { _columns, _data, Payment } from "./data";

export interface DatabaseProvidersProps<TData extends RowData>
	extends PropsWithChildren {}

export type TableDataContextValue = ReturnType<typeof useTableData<Payment>>;

const TableDataContext = createContext<TableDataContextValue | null>(null);

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
}: Readonly<DatabaseProvidersProps<TData>>) {
	const [data, setData] = useState<Payment[]>([]);
	const [columns, setColumns] = useState<ColumnDef<Payment>[]>([]);

	const table = useTableData(data, columns);

	useEffect(() => {
		setColumns(_columns);
	}, [_columns]);

	useEffect(() => {
		setData(_data);
	}, [_data]);

	return (
		<TableDataContext.Provider value={table}>
			{children}
		</TableDataContext.Provider>
	);
	// <DatabaseContext.Provider value={{}}>children</DatabaseContext.Provider>
}
