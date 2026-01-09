import { Button } from "@/components/ui/button";
import {
	Filter,
	FilterId,
	FilterIdSeprator,
	LogicalOperatorArray,
} from "@/utils/filter/type";
import { Group, Plus } from "lucide-react";
import SelectBox from "../../SelectBox";
import { FilterDisplayLeaf } from "./FilterDisplayLeaf";

interface FilterDisplayTreeProps {
	filter: Filter;
	parentId?: FilterId;
}

export function FilterDisplayTree({
	filter,
	parentId,
}: FilterDisplayTreeProps) {
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
		<div className="flex">
			<div className="mr-2">
				<SelectBox
					items={(() => {
						const a = LogicalOperatorArray;
						// debugger;
						return LogicalOperatorArray.map((item) => ({
							label: item,
							value: item,
						}));
					})()}
					selected={filter.logicalOperator}
					// defaultValue={filter.logicalOperator}
				/>
				{/* IBM Business Analyst */}
				{/* IBM Generative Engineering */}
			</div>
			<div className="space-y-2 bg-zinc-200/50 p-2 border border-zinc-300 rounded-lg">
				{filter.operations.map((subFilter, index) => (
					<FilterDisplayTree
						key={index}
						// table={table}
						parentId={currentParentId}
						filter={subFilter}
					/>
				))}
				<div className="flex gap-3">
					<Button
						// role="combobox"
						variant="secondary"
						size="sm"
						onClick={(event) => {
							event.preventDefault();
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
						<Group />
						{/* Add Group */}
					</Button>
				</div>
			</div>
		</div>
	);
}
