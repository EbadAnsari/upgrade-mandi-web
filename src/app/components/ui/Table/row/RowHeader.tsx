import { useTable } from "@/app/hooks/useTableEditor";
import { TableHead, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";

export function RowHeader() {
	const table = useTable();

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
