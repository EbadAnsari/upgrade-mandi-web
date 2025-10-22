"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";
import { createContext, PropsWithChildren, useContext } from "react";

export interface DatabaseProvidersProps<TData extends RowData>
	extends PropsWithChildren {
	columns: ColumnDef<TData>[];
	data: TData[];
}

interface DatabaseContextValue {
	getAllUsers: () => Promise<any>;
	getAllOrders: () => Promise<any>;
}

const TableDataContext = createContext<DatabaseContextValue | null>(null);

export function useTableData() {
	const context = useContext(TableDataContext);
	if (context === null)
		throw new Error("useTableData must be used within a TableDataProvider");
	return context;
}

export default function TableDataProviders<TData extends RowData>({
	children,
	data,
	columns,
}: Readonly<DatabaseProvidersProps<TData>>) {
	// const [, set] = useState();

	// const table = useReactTable({
	// 	data,
	// 	columns,
	// 	onSortingChange: setSorting,
	// 	onColumnFiltersChange: setColumnFilters,
	// 	getCoreRowModel: getCoreRowModel(),
	// 	getPaginationRowModel: getPaginationRowModel(),
	// 	getSortedRowModel: getSortedRowModel(),
	// 	getFilteredRowModel: getFilteredRowModel(),
	// 	onColumnVisibilityChange: setColumnVisibility,
	// 	onRowSelectionChange: setRowSelection,
	// 	state: {
	// 		sorting,
	// 		columnFilters,
	// 		columnVisibility,
	// 		rowSelection,
	// 	},
	// });

	return (
		// <TableDataContext.Provider value={{}}>
		children
		// </TableDataContext.Provider>
	);
	// <DatabaseContext.Provider value={{}}>children</DatabaseContext.Provider>
}
