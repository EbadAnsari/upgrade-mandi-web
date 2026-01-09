import { Schema } from "@/app/components/ui/TableEditor";
import { RowData } from "@tanstack/react-table";
import { DateEqualityOperators } from "../operators/date";
import { NumberOperators } from "../operators/number";
import { SelectOperators } from "../operators/select";
import { TextOperators } from "../operators/text";
import {
	Datatype,
	Filter,
	FilterId,
	FilterValueType,
	LogicalNegation,
	LogicalOperator,
	Operators,
} from "../type";
import { getFilterById } from "./search";

function throwFilterTreeIsNull(filterId: FilterId): never {
	throw new Error(`Filter tree is null for filter id: ${filterId}`);
}

function checkFilterTree(filterTree: Filter | null): filterTree is Filter {
	return filterTree !== null;
}

function resetFilterValues(type: Datatype["name"]): FilterValueType {
	return {
		text: "",
		number: 0,
		date: 0,
		select: [],
	}[type];
}

function resetOperator(type: Datatype["name"]): Operators {
	return {
		text: TextOperators.contains,
		number: NumberOperators.eq,
		date: DateEqualityOperators.eq,
		select: SelectOperators.is,
	}[type] as Operators;
}

/**
 * @returns a tuple of type filter (filter tree) and updated filter (after change).
 */
export function updateFilterFieldIdById<TData extends RowData>(
	filterTree: Filter | null,
	filterIdTree: FilterId,
	fieldId: Pick<Schema<TData>, "id" | "type">
): [Filter | null, Filter] {
	if (!checkFilterTree(filterTree)) throwFilterTreeIsNull(filterIdTree);

	const toUpdateFilter = getFilterById(filterTree, filterIdTree);

	const toReturn: Filter = {
		...toUpdateFilter,
	};

	if (!toUpdateFilter.logicalOperator) {
		toUpdateFilter.operations.id = fieldId.id;
		toUpdateFilter.operations.type = fieldId.type;
		toUpdateFilter.operations.operator = resetOperator(
			toUpdateFilter.operations.type.name
		);
		toUpdateFilter.operations.filterValue = resetFilterValues(
			toUpdateFilter.operations.type.name
		);
	}

	return [filterTree, toReturn];
}

export function updateFilterOperatorById(
	filterTree: Filter | null,
	filterIdTree: FilterId,
	operator: Operators
): [Filter | null, Filter] {
	if (!filterTree) throw new Error(`Filter tree is null`);

	const toUpdateFilter = getFilterById(filterTree, filterIdTree);

	const toReturn: Filter = {
		...toUpdateFilter,
	};

	if (toUpdateFilter.operations && !toUpdateFilter.logicalOperator) {
		toUpdateFilter.operations.operator = operator;
		toUpdateFilter.operations.filterValue = resetFilterValues(
			toUpdateFilter.operations.type.name
		);
	}

	return [filterTree, toReturn];
}

export function updateFilterLogicalOperatorById(
	filterTree: Filter | null,
	filterIdTree: FilterId,
	logicalOperator: LogicalOperator
): [Filter | null, Filter] {
	if (!filterTree) throw new Error(`Filter tree is null`);

	const toUpdateFilter = getFilterById(filterTree, filterIdTree);

	const toReturn: Filter = {
		...toUpdateFilter,
	};

	toUpdateFilter.logicalOperator = logicalOperator;

	return [filterTree, toReturn];
}

export function updateFilterLogicalNegationById(
	filterTree: Filter | null,
	filterIdTree: FilterId,
	negation: LogicalNegation
): [Filter | null, Filter] {
	if (!filterTree) throw new Error(`Filter tree is null`);

	const toUpdateFilter = getFilterById(filterTree, filterIdTree);

	const toReturn: Filter = {
		...toUpdateFilter,
	};

	toUpdateFilter.negation = negation;

	return [filterTree, toReturn];
}

export function updateFilterFieldValueById(
	filterTree: Filter | null,
	filterIdTree: FilterId,
	filterValue: FilterValueType
): [Filter | null, Filter] {
	if (!filterTree) throw new Error(`Filter tree is null`);

	const toUpdateFilter = getFilterById(filterTree, filterIdTree);

	const toReturn: Filter = {
		...toUpdateFilter,
	};

	if (!toUpdateFilter.logicalOperator)
		toUpdateFilter.operations.filterValue = filterValue;

	return [filterTree, toReturn];
}
