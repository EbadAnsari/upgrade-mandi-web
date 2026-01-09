import { CurrentFilterId, Filter, FilterId } from "../type";
import { getFilterById } from "./search";

export function removeFilterById(
	filterTree: Filter | null,
	filterIdToRemove: FilterId
): [Filter | null, Filter | null] {
	if (!filterTree) throw new Error(`Filter tree is null`);

	if (filterIdToRemove === "root") return [null, filterTree];

	const parentId = filterIdToRemove.split("-");
	const filterId = parentId.pop() as CurrentFilterId;

	const parentFilter = getFilterById(
		filterTree,
		parentId.join("-") as FilterId
	);

	if (!parentFilter) throw new Error(`Filter id not found "${parentId}"`);

	const filterIndexToRemove = (parentFilter.operations as Filter[]).findIndex(
		(operation) => operation.filterId === filterId
	);

	return [
		filterTree,
		(parentFilter.operations as Filter[]).splice(filterIndexToRemove, 1)[0],
	];
}
