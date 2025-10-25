"use client";

import { useTableEditor } from "@/app/providers/TableDataProviders";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import FilterPopover from "./Table/FilterPopover";
import Pagination from "./Table/Pagination";
import { RowBody, RowHeader } from "./Table/Row";

export default function TableEditor() {
	const table = useTableEditor();

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
