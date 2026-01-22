import { generateFilterId } from "../helper";
import { Filter, FilterId, LogicalOperator } from "../type";
import { getFilterById, isValidKey } from "./search";

export type SameDiff = "same" | "diff";

// export function addFilter(filter: Filter | null, filterToAdd: Filter) {
// 	if (!filter) {
// 		filterToAdd.filterId = "root";
// 		return filterToAdd;
// 	}
// 	if (filter.filterId === "root") {
// 		// return addFilterToFormGroup(filter, filterToAdd);
// 	}
// 	// filter.operations.push(filterToAdd);
// 	return filter;
// }

// export function addFilterToFormGroup(
// 	parent: LeafFilter,
// 	filterToAdd: Filter,
// ): GroupFilter {
// 	return {
// 		filterId: parent.filterId,
// 		logicalOperator: "AND",
// 		negation: parent.negation,
// 		operations: [
// 			{
// 				filterId: generateFilterId(),
// 				operations: parent.operations,
// 			},
// 			filterToAdd,
// 		],
// 	};
// }

// export function addFilterByI(
// 	parent: Filter[],
// 	// addToFilterId: FilterId,
// 	filterToAdd: Filter,
// 	// logicalOperator: LogicalOperator,
// ) {
// 	// if (!filterTree) {
// 	// 	return filterToAdd;
// 	// }

// 	// if (!isValidKey(filterTree, filterToAdd.filterId))
// 	// 	throw new Error(`Duplicate key "${filterToAdd.filterId}"`);

// 	// let filter = getFilterById(filterTree, addToFilterId);
// 	// if (!filter) throw new Error(`Filter id not found "${addToFilterId}"`);

// 	return [...parent, filterToAdd];
// }

// export function addFilter() {}

export function addFilterById(
	filterTree: Filter | null,
	addToFilterId: FilterId,
	filterToAdd: Filter,
	logicalOperator: LogicalOperator,
	isLogicalOperatorSame: SameDiff,
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

	// if logical operator is same, keep the existing one otherwise update
	const newLogicalOperator =
		!filter.logicalOperator || isLogicalOperatorSame === "diff"
			? logicalOperator
			: filter.logicalOperator;

	// if the addToFilterId is root, we need to update the root filterTree
	const newFilterId = addToFilterId === "root" ? "root" : generateFilterId();
	const newNegation = filter.negation;

	filter.filterId = newFilterId;
	filter.logicalOperator = newLogicalOperator;
	filter.operations = newOperations;
	filter.negation = newNegation;

	return filterTree;
}
