import { useTable } from "@/app/hooks/useTableEditor";
import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { FilterDisplayTree } from "./FilterDisplayTree";

// String.prototype.toTitleCase = function () {
// 	return this.replace(/\w\S*/g, function (txt) {
// 		return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
// 	});
// };

export interface FilterPopoverProps {
	// filter: Nullable<Filter>;
}

export default function FilterComponent({}: // filter,
// table,
Readonly<FilterPopoverProps>) {
	const table = useTable();

	if (!table.filterOperations.filter) return null;

	return (
		<Collapsible open>
			<CollapsibleTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="bg-red-50 mb-2"
				>
					Filters
					<ChevronsUpDown className="w-4 h-4" />
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent className="bg-secondary p-2 rounded-lg">
				<FilterDisplayTree filter={table.filterOperations.filter} />
			</CollapsibleContent>
		</Collapsible>
	);
}
