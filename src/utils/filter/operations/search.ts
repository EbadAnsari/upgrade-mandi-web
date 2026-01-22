import { Filter, FilterId, FilterIdSeprator } from "../type";

function throwFilterIdNotFound(filterId: FilterId): never {
	throw new Error(`Filter id not found ${filterId}`);
}

export function getFilterById(filter: Filter, id: FilterId): Filter {
	const __filter = __getFilterById(filter, id);
	if (__filter === null) throwFilterIdNotFound(id);
	return __filter;
}

export function __getFilterById(filter: Filter, id: FilterId): Filter | null {
	const filterIds = id.split(FilterIdSeprator);
	const currentFilterId = filterIds[0];

	if (filter.filterId !== currentFilterId) return null;
	else if (filterIds.length === 1) return filter;
	else if (!filter.logicalOperator) return null;

	const filterId = filterIds[1];
	for (const operation of filter.operations) {
		if (operation.filterId === filterId) {
			filterIds.shift();
			return getFilterById(
				operation,
				filterIds.join(FilterIdSeprator) as FilterId,
			);
		}
	}

	return null;
}

export function forEach(filterTree: Filter, cb: (filter: Filter) => void) {
	if (!filterTree.logicalOperator) {
		cb(filterTree);
		return;
	}
	for (const operation of filterTree.operations) forEach(operation, cb);
}

export function isValidKey(
	filterTree: Filter,
	key: string,
	map: Set<string> = new Set(),
): boolean {
	map.add(filterTree.filterId);
	if (map.has(key)) return false;
	if (filterTree.logicalOperator)
		for (const operation of filterTree.operations)
			if (!isValidKey(operation, key, map)) return false;
	return true;
}

export function isLeafFilter(filter: Filter): boolean {
	return !filter.logicalOperator;
}

export function isRootFilter(filter: Filter): boolean {
	return filter.filterId === "root";
}
