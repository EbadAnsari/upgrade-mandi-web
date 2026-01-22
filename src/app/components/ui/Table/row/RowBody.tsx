import { useTable } from "@/app/hooks/useTableEditor";
import { TableCell, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";

export function RowBody() {
	const table = useTable();

	if (table.getRowModel().rows.length === 0)
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

	return table.getFilteredRowModel().rows.map((row) => (
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
