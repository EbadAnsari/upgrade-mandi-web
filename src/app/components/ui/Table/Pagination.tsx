import { useTable } from "@/app/hooks/useTableEditor";
import { Button } from "@/components/ui/button";
import { RowData } from "@tanstack/react-table";

export interface PaginationProps<TData extends RowData> {}

export default function Pagination<TData extends RowData>({}: Readonly<
	PaginationProps<TData>
>) {
	const table = useTable();
	return (
		<div className="flex justify-end items-center space-x-2 py-4">
			<div className="flex-1 text-muted-foreground text-sm">
				{table.getFilteredSelectedRowModel().rows.length} of{" "}
				{table.getFilteredRowModel().rows.length} row(s) selected.
			</div>
			<div className="space-x-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
