import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { flexRender, Table } from "@tanstack/react-table";

export type RowProps<TData> = {
	table: Table<TData>;
	rowType: "header" | "body";
};

export function RowHeader<TData>({
	table,
}: Readonly<Pick<RowProps<TData>, "table">>) {
	return table.getHeaderGroups().map((data) => (
		<TableRow key={data.id}>
			{data.headers.map((header) => {
				return (
					<TableHead key={header.id}>
						{header.isPlaceholder
							? null
							: flexRender(
									header.column.columnDef.header,
									header.getContext()
							  )}
					</TableHead>
				);
			})}
		</TableRow>
	));
}

export function RowBody<TData>({
	table,
}: Readonly<Pick<RowProps<TData>, "table">>) {
	if (table.getRowModel().rows.length === 0) {
		return (
			<TableRow>
				<TableCell
					colSpan={table.getAllColumns().length}
					className="h-24 text-center"
				>
					No results.
				</TableCell>
			</TableRow>
		);
	}

	return table.getRowModel().rows.map((row) => (
		<TableRow
			key={row.id}
			data-state={row.getIsSelected() && "selected"}
		>
			{row.getVisibleCells().map((cell) => (
				<TableCell key={cell.id}>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>
	));
}
