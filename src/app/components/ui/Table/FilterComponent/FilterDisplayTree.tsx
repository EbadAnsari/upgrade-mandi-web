import { useTable } from "@/app/hooks/useTableEditor";
import { Button } from "@/components/ui/button";
import {
	Filter,
	FilterId,
	FilterIdSeprator,
	LogicalOperator,
	LogicalOperatorArray,
} from "@/utils/filter/type";
import { CornerDownRight, Plus } from "lucide-react";
import { Combobox } from "../../select/ComboBox";
import { Item } from "../../select/SelectBox";
import { FilterDisplayLeaf } from "./FilterDisplayLeaf";
import NotToggle from "./NotToggle";

interface FilterDisplayTreeProps {
	filter: Filter;
	parentId?: FilterId;
}

export function FilterDisplayTree({
	filter,
	parentId,
}: FilterDisplayTreeProps) {
	const table = useTable();
	const currentParentId = parentId
		? ((parentId + FilterIdSeprator + filter.filterId) as FilterId)
		: filter.filterId;

	if (!filter.logicalOperator)
		return (
			<FilterDisplayLeaf
				filterId={filter.filterId}
				filterIdMap={currentParentId}
				filter={filter.operations}
			/>
		);

	return (
		<div className="flex bg-zinc-200/50 p-2 border border-zinc-300 rounded-lg">
			<div className="space-y-1 mr-2">
				<Combobox
					items={
						LogicalOperatorArray.map((item) => ({
							label: item,
							value: item,
						})) as Item<LogicalOperator>[]
					}
					label="Logical Operator"
					selected={filter.logicalOperator}
				/>
				<NotToggle className="shadow-sm" />
			</div>
			<div className="flex flex-col gap-2">
				{filter.operations.map((subFilter, index) => (
					<FilterDisplayTree
						key={index}
						// table={table}
						parentId={currentParentId}
						filter={subFilter}
					/>
				))}
				<div className="flex gap-3 add-button">
					<Button
						// role="combobox"
						variant="secondary"
						size="sm"
						onClick={(event) => {
							event.preventDefault();
							table.filterOperations.addFilter({}, "AND", "diff");
						}}
					>
						<Plus />
						{/* Add */}
					</Button>
					<Button
						// role="combobox"
						variant="secondary"
						size="sm"
						onClick={(event) => {
							event.preventDefault();
						}}
					>
						<CornerDownRight />
					</Button>
				</div>
			</div>
		</div>
	);
}
