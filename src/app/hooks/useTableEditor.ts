"use client";

import { evaluateFilter } from "@/utils/filter/evaluateFilter";
import { addFilterById, SameDiff } from "@/utils/filter/operations/add";
import { removeFilterById } from "@/utils/filter/operations/remove";
import {
	updateFilterFieldIdById,
	updateFilterFieldValueById,
	updateFilterLogicalNegationById,
	updateFilterLogicalOperatorById,
	updateFilterOperatorById,
} from "@/utils/filter/operations/update";
import { NumberOperators, NumberType } from "@/utils/filter/operators/number";
import {
	Filter,
	FilterId,
	FilterValueType,
	LogicalNegation,
	LogicalOperator,
	Operators,
} from "@/utils/filter/type";
import {
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	RowData,
	useReactTable,
} from "@tanstack/react-table";
import { nanoid } from "nanoid";
import { createContext, useContext, useState } from "react";
import { Schema } from "../components/ui/TableEditor";

export interface TableData<TData extends RowData>
	extends ReturnType<typeof useTableData<TData>> {}

export const TableContext = createContext<TableData<RowData> | null>(null);

export function useTable() {
	const context = useContext<TableData<RowData> | null>(TableContext);
	if (!context)
		throw new Error("useTableData must be used within a TableDataProvider");
	return context;
}

const filter: Filter = {
	filterId: "root",
	negation: true,
	logicalOperator: "AND",
	operations: [
		{
			filterId: nanoid(6) as FilterId,
			logicalOperator: "OR",
			operations: [
				{
					filterId: nanoid(6) as FilterId,
					operations: {
						type: new NumberType(),
						operator: NumberOperators.eq,
						filterValue: 100,
						id: "amount",
					},
				},
				{
					filterId: nanoid(6) as FilterId,
					operations: {
						type: new NumberType(),
						operator: NumberOperators.gte,
						filterValue: 100,
						id: "check",
					},
				},
			],
		},
		// {
		// 	filterId: nanoid(6) as FilterId,
		// 	logicalOperator: "OR",
		// 	operations: [
		// 		{
		// 			filterId: nanoid(6) as FilterId,
		// 			operations: {
		// 				type: "string",
		// 				operator: StringOperators.contains,
		// 				filterValue: "asdfa",
		// 				id: "email",
		// 			},
		// 		},
		// 		{
		// 			filterId: nanoid(6) as FilterId,
		// 			operations: {
		// 				type: "number",
		// 				operator: NumberOperators.gte,
		// 				filterValue: 100,
		// 				id: "amount",
		// 			},
		// 		},
		// 	],
		// },
		// {
		// 	filterId: nanoid(6) as FilterId,
		// 	operations: {
		// 		type: "number",
		// 		operator: NumberOperators.gte,
		// 		filterValue: 100,
		// 		id: "amount",
		// 	},
		// },
		// {
		// 	filterId: nanoid(6) as FilterId,
		// 	operations: {
		// 		type: "number",
		// 		operator: NumberOperators.gte,
		// 		filterValue: 100,
		// 		id: "amount",
		// 	},
		// },
	],
};

export function useTableData<TData extends RowData>(
	columns: Schema<TData>[],
	data: TData[]
) {
	const [globalFilter, setGlobalFilter] = useState<Filter | null>(filter);

	const [columnVisibility, setColumnVisibility] = useState<
		Record<string, boolean>
	>({});

	function setFilter(filter: Filter | null) {
		if (!filter) setGlobalFilter(null);
		else setGlobalFilter({ ...filter });
	}

	const table = useReactTable({
		data,
		columns,

		onGlobalFilterChange: setFilter,

		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),

		globalFilterFn(rows, columnId, filterValue, addMeta) {
			return evaluateFilter<TData>(
				globalFilter,
				rows,
				columnId,
				filterValue
			);
		},
		state: {
			globalFilter,
		},
	});

	function addFilter(
		filterToAdd: Filter,
		logicalOperator: LogicalOperator,
		isLogicalOperatorSame: SameDiff
	) {
		const filterId: FilterId =
			globalFilter === null ? "root" : (nanoid(6) as FilterId);
		setFilter(
			addFilterById(
				globalFilter,
				filterId,
				filterToAdd,
				logicalOperator,
				isLogicalOperatorSame
			)
		);
	}

	function removeFilter(removeToFilterId: FilterId) {
		const removedFilter = removeFilterById(globalFilter, removeToFilterId);
		setFilter(removedFilter[0]);
		return removedFilter[1];
	}

	function updateFilterFieldId(
		updateToFilterId: FilterId,
		fieldId: Pick<Schema<TData>, "id" | "type">
	) {
		// console.log(globalFilter, updateToFilterId, fieldId, "before update");
		const updatedFilter = updateFilterFieldIdById(
			globalFilter,
			updateToFilterId,
			fieldId
		);
		// console.log(globalFilter, updateToFilterId, fieldId, "after update");
		setFilter(updatedFilter[0]);
		return updatedFilter[1];
	}

	function updateFilterOperator(
		updateToFilterId: FilterId,
		filterOperator: Operators
	) {
		const updatedFilter = updateFilterOperatorById(
			globalFilter,
			updateToFilterId,
			filterOperator
		);
		setFilter(updatedFilter[0]);
		return updatedFilter[1];
	}

	function updateFilterLogicalOperator(
		updateToFilterId: FilterId,
		logicalOperator: LogicalOperator
	) {
		const updatedFilter = updateFilterLogicalOperatorById(
			globalFilter,
			updateToFilterId,
			logicalOperator
		);
		setFilter(updatedFilter[0]);
		return updatedFilter[1];
	}

	function updateFilterLogicalNegation(
		updateToFilterId: FilterId,
		negation: LogicalNegation
	) {
		const updatedFilter = updateFilterLogicalNegationById(
			globalFilter,
			updateToFilterId,
			negation
		);
		setFilter(updatedFilter[0]);
		return updatedFilter[1];
	}

	function updateFilterFieldValue(
		updateToFilterId: FilterId,
		value: FilterValueType
	) {
		const updatedFilter = updateFilterFieldValueById(
			globalFilter,
			updateToFilterId,
			value
		);
	}

	const filterOperations = {
		filter: globalFilter,

		updateFilterFieldId,
		updateFilterOperator,
		updateFilterFieldValue,
		updateFilterLogicalOperator,
		updateFilterLogicalNegation,

		addFilter,
		removeFilter,
	};

	function toggleVisibility(columnId: string) {
		setColumnVisibility({
			...columnVisibility,
			[columnId]: !columnVisibility[columnId],
		});
	}

	const visibility = {
		toggleVisibility,
	};

	return { ...table, filterOperations, visibility };
}
