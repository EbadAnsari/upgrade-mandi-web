"use client";

import { useTableData } from "@/app/hooks/useTableEditor";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { Datatype } from "@/utils/filter/type";
import { ColumnDef, RowData } from "@tanstack/react-table";
import FilterPopover from "./Table/FilterPopover";
import Pagination from "./Table/Pagination";
import { RowBody, RowHeader } from "./Table/Row";

export type Schema<TData extends RowData> = ColumnDef<TData> & {
	type: Datatype["type"];
};

interface TableEditorProps<TData extends RowData> {
	schema: Schema<TData>[];
	data: TData[];
}

export default function TableEditor<TData extends RowData>({
	schema,
	data,
}: Readonly<TableEditorProps<TData>>) {
	const table = useTableData(schema, data);

	return (
		<div className="w-full">
			<div className="flex mb-4 w-min">
				<FilterPopover filter={table.filterOperations.filter} />
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
