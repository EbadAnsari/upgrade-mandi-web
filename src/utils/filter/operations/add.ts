import { generateFilterId } from "../helper";
import { Filter, FilterId, LogicalOperator } from "../type";
import { getFilterById, isValidKey } from "./search";

export type SameDiff = "same" | "diff";

export function addFilterById(
	filterTree: Filter | null,
	addToFilterId: FilterId,
	filterToAdd: Filter,
	logicalOperator: LogicalOperator,
	isLogicalOperatorSame: SameDiff
): Filter {
	if (!filterTree) {
		return filterToAdd;
	}

	if (!isValidKey(filterTree, filterToAdd.filterId))
		throw new Error(`Duplicate key "${filterToAdd.filterId}"`);

	let filter = getFilterById(filterTree, addToFilterId);
	if (!filter) throw new Error(`Filter id not found "${addToFilterId}"`);

	const newOperations: Filter[] = !filter.logicalOperator
		? [
				{
					...filter,
					filterId:
						addToFilterId === "root"
							? generateFilterId()
							: filter.filterId,
				},
				filterToAdd,
		  ]
		: [...filter.operations, filterToAdd];

	const newLogicalOperator =
		!filter.logicalOperator || isLogicalOperatorSame === "diff"
			? logicalOperator
			: filter.logicalOperator;

	const newFilterId = addToFilterId === "root" ? "root" : generateFilterId();
	const newNegation = filter.negation;

	filter.filterId = newFilterId;
	filter.logicalOperator = newLogicalOperator;
	filter.operations = newOperations;
	filter.negation = newNegation;

	return filterTree;
}
