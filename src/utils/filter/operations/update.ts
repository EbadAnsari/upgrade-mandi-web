import { Schema } from "@/app/components/ui/TableEditor";
import { RowData } from "@tanstack/react-table";
import { DateEqualityOperators } from "../operators/date";
import { NumberOperators } from "../operators/number";
import { SelectOperators } from "../operators/select";
import { TextOperators } from "../operators/text";
import {
	columnTypes,
	ColumnTypes,
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

function resetFilterValues(columnName: keyof ColumnTypes): FilterValueType {
	return {
		text: "",
		number: 0,
		date: 0,
		select: [],
	}[columnTypes[columnName]] as FilterValueType;
}

function resetOperator(columnName: keyof ColumnTypes): Operators {
	return {
		text: TextOperators.contains,
		number: NumberOperators.eq,
		date: DateEqualityOperators.eq,
		select: SelectOperators.contains,
	}[columnTypes[columnName]] as Operators;
}

function resetDataType<TData extends RowData>(
	columns: Schema<TData>[],
	columnName: keyof ColumnTypes
): ColumnTypes[keyof ColumnTypes] {
	return columns.reduce(
		(acc, curr) => {
			acc[curr.id] = curr.type.type as ColumnTypes[keyof ColumnTypes];
			return acc;
		},
		{} as Record<string, ColumnTypes[keyof ColumnTypes]>
	)[columnName];
}

/**
 * @returns a tuple of type filter (filter tree) and updated filter (after change).
 */
export function updateFilterFieldIdById<TData extends RowData>(
	filterTree: Filter | null,
	filterIdTree: FilterId,
	fieldId: Schema<TData>["id"],
	columns: Schema<TData>[]
): [Filter | null, Filter] {
	if (!checkFilterTree(filterTree)) throwFilterTreeIsNull(filterIdTree);

	const toUpdateFilter = getFilterById(filterTree, filterIdTree);

	const toReturn: Filter = {
		...toUpdateFilter,
	};

	if (!toUpdateFilter.logicalOperator) {
		toUpdateFilter.operations.id = fieldId;
		// toUpdateFilter.operations.columnName = fieldId.columnName;
		toUpdateFilter.operations.operator = resetOperator(
			toUpdateFilter.operations.id
		);
		toUpdateFilter.operations.filterValue = resetFilterValues(
			toUpdateFilter.operations.id
		);
		toUpdateFilter.operations.type = resetDataType(
			columns,
			toUpdateFilter.operations.id
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
		// toUpdateFilter.operations.filterValue = resetFilterValues(
		// 	toUpdateFilter.operations.id
		// );
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

	// TODO: Handle logical operator case
	if (!toUpdateFilter.logicalOperator)
		toUpdateFilter.operations.filterValue = filterValue;

	return [filterTree, toReturn];
}
