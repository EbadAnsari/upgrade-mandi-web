"use client";

import { evaluateFilter } from "@/utils/filter/functions";
import { NumberOperators } from "@/utils/filter/operate/number";
import { StringOperators } from "@/utils/filter/operate/string";
import { Filter } from "@/utils/filter/type";
import {
	ColumnDef,
	ColumnSort,
	FilterMeta,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	Row,
	RowData,
	useReactTable,
} from "@tanstack/react-table";
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
import { _columns, _data, Payment } from "../components/ui/TableEditor";

export interface DatabaseProvidersProps<TData extends RowData>
	extends PropsWithChildren {
	// columns: ColumnDef<TData>[];
	// data: TData[];
}

interface GetterSetter<TData> {
	getOperatedData: () => TData[];
	getWithoutOperation: () => TData[];
	getById: (id: string) => TData;
	set: (value: TData) => void;
}

export interface Operation {
	sort: GetterSetter<ColumnSort>;
	// filter: GetterSetter<ColumnFilter>;
	visibility: {
		getAll: () => Record<string, boolean>;
		getById: (columnId: string) => boolean;
		set: (
			previousValue: Record<string, boolean>,
			columnId: string,
			visibilityValue: boolean
		) => void;
	};
}

export interface TableContextValue {
	column: GetterSetter<ColumnDef<Payment>>;
	data: GetterSetter<Payment>;
	operation: Operation;
}

const TableDataContext = createContext<TableContextValue | null>(null);

export function useTableData() {
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
	// const [sorting, setSorting] = useState<SortingState>([]);
	const [filter, setFilter] = useState<Filter>({
		filterId: "root",
		logicalOperator: "AND",
		operations: [
			{
				filterId: "1",
				operations: {
					type: "number",
					fieldId: "amount",
					operator: NumberOperators.gt,
					filterValue: 700,
				},
			},
			{
				filterId: "2",
				operations: {
					type: "string",
					fieldId: "email",
					operator: StringOperators.startsWith,
					filterValue: "Si",
					caseSensitive: true,
				},
			},
		],
	});
	// const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
	// 	{}
	// );
	// const [rowSelection, setRowSelection] = useState({});

	const [columns, setColumns] = useState<ColumnDef<Payment>[]>([]);
	const [data, setData] = useState<Payment[]>([]);

	function globalFilterFn(
		rows: Row<Payment>,
		columnId: string,
		filterValue: any,
		addMeta: (meta: FilterMeta) => void
	) {}

	const table = useReactTable({
		data,
		columns,
		// onSortingChange: setSorting,
		// onRowSelectionChange: setRowSelection,
		onGlobalFilterChange: setFilter,
		// onColumnVisibilityChange: setColumnVisibility,

		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),

		globalFilterFn(rows, columnId, filterValue, addMeta) {
			// debugger;
			// return true;
			return evaluateFilter<Payment>(filter, rows, columnId, filterValue);
		},
		state: {
			// sorting,
			// columnVisibility,
			// rowSelection,
			globalFilter: filter,
		},
	});

	console.log(table.getFilteredRowModel().rows.map((row) => row.original));

	useEffect(() => {
		setColumns(_columns);
	}, [_columns]);

	useEffect(() => {
		setData(_data);
	}, [_data]);

	// const filterOperation: Filter = {
	// 	filterId: "root",
	// 	logicalOperator: "AND",
	// 	operations: [
	// 		{
	// 			filterId: "1",
	// 			operations: {
	// 				type: "string",
	// 				field: "email",
	// 				operator: StringOperators.notContains,
	// 				filterValue: "m",
	// 			},
	// 		},
	// 	],
	// };

	// const filterOperation: GetterSetter<Payment> = {
	// 	getById(id) {},
	// 	getOperatedData() {},
	// 	getWithoutOperation() {},
	// 	set(value) {},
	// };

	return (
		// <TableDataContext.Provider value={{}}>
		children
		// </TableDataContext.Provider>
	);
	// <DatabaseContext.Provider value={{}}>children</DatabaseContext.Provider>
}
