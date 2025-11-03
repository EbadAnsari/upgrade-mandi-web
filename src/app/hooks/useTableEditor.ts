import { evaluateFilter } from "@/utils/filter/evaluateFilter";
import { addFilterById, SameDiff } from "@/utils/filter/operations/add";
import { removeFilterById } from "@/utils/filter/operations/remove";
import { updateFilterById } from "@/utils/filter/operations/update";
import { StringOperators } from "@/utils/filter/operators/string";
import { Filter, FilterId, LogicalOperqator } from "@/utils/filter/type";
import {
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	RowData,
	useReactTable,
} from "@tanstack/react-table";
import { nanoid } from "nanoid";
import { useState } from "react";
import { Schema } from "../components/ui/TableEditor";

export function useTableData<TData extends RowData>(
	columns: Schema<TData>[],
	data: TData[]
) {
	const [globalFilter, setGlobalFilter] = useState<Filter | null>({
		filterId: "root",
		negation: true,
		operations: {
			type: "string",
			stringOperator: StringOperators.eq,
			filterValue: "ebad",
			fieldId: "name",
		},
	});

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
		logicalOperator: LogicalOperqator,
		isLogicalOperatorSame: SameDiff
	) {
		const filterId: FilterId = globalFilter === null ? "root" : nanoid(6);
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

	function updateFilter(updateToFilterId: FilterId, filterToUpdate: Filter) {
		const updatedFilter = updateFilterById(
			globalFilter,
			updateToFilterId,
			filterToUpdate
		);
		setFilter(updatedFilter[0]);
		return updatedFilter[1];
	}

	const filterOperations = {
		filter: globalFilter,
		updateFilter,
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
