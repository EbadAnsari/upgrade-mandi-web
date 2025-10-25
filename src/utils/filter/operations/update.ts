import { getFilterById } from "../search";
import { Filter, FilterId } from "../type";

export function updateFilterById(
	filterTree: Filter | null,
	updateToFilterId: FilterId,
	filterToUpdate: Filter
): [Filter | null, Filter] {
	if (!filterTree) throw new Error(`Filter tree is null`);

	const toUpdateFilter = getFilterById(filterTree, updateToFilterId);
	if (!toUpdateFilter)
		throw new Error(`Filter id not found "${updateToFilterId}"`);
	const toReturn: Filter = {
		...toUpdateFilter,
	};

	toUpdateFilter.filterId = filterToUpdate.filterId;
	toUpdateFilter.operations = filterToUpdate.operations;
	toUpdateFilter.logicalOperator = filterToUpdate.logicalOperator;
	toUpdateFilter.negation = filterToUpdate.negation;

	return [filterTree, toReturn];
}
