"use client";

import { useTableData } from "@/app/hooks/useTableEditor";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { Datatype } from "@/utils/filter/type";
import { ColumnDef, RowData } from "@tanstack/react-table";
import FilterPopover from "./Table/FilterPopover";
import Pagination from "./Table/Pagination";
import { RowBody, RowHeader } from "./Table/Row";

export type Schema<TData extends RowData> = ColumnDef<TData> & {
	type: Datatype;
};

export type TableData<TData extends RowData> = {
	data: TData[];
	schema: Schema<TData>[];
};

interface TableEditorProps<TData extends RowData> {
	tableData: TableData<TData>;
}

export default function TableEditor<TData extends RowData>({
	tableData,
}: Readonly<TableEditorProps<TData>>) {
	const table = useTableData(tableData.schema, tableData.data);

	return (
		<div className="w-full">
			<div className="flex mb-4 w-min">
				<FilterPopover />
			</div>
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						<RowHeader table={table} />
					</TableHeader>
					<TableBody>
						<RowBody table={table} />
					</TableBody>
				</Table>
			</div>
			<Pagination table={table} />
		</div>
	);
}
