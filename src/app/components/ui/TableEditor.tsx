"use client";

import {
	TableContext,
	TableData,
	useTableData,
} from "@/app/hooks/useTableEditor";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { BinaryOperation, Datatype } from "@/utils/filter/type";
import { ColumnDef, RowData } from "@tanstack/react-table";
import FilterPopover from "./Table/FilterComponent/FilterComponent";
import Pagination from "./Table/Pagination";
import { RowBody } from "./Table/row/RowBody";
import { RowHeader } from "./Table/row/RowHeader";

export type Schema<TData extends RowData> = ColumnDef<TData> &
	Pick<BinaryOperation, "id"> & {
		label: string;
		type: Datatype;
	};

interface TableEditorProps<TData extends RowData> {
	schema: Schema<TData>[];
	data: TData[];
}

// const context = createContext();

export default function TableEditor<TData extends RowData>({
	schema,
	data,
}: Readonly<TableEditorProps<TData>>) {
	const table = useTableData(schema, data);

	return (
		<TableContext.Provider value={table as TableData<RowData>}>
			<div className="w-full">
				<div className="flex mb-4 w-min">
					<FilterPopover
					// filter={table.filterOperations.filter}
					// table={table}
					/>
				</div>
				<div className="border rounded-md overflow-hidden">
					<Table>
						<TableHeader>
							<RowHeader />
						</TableHeader>
						<TableBody>
							<RowBody />
						</TableBody>
					</Table>
				</div>
				<Pagination />
			</div>
		</TableContext.Provider>
	);
}
