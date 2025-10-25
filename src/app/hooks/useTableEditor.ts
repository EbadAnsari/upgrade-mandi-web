import { evaluateFilter } from "@/utils/filter/evaluateFilter";
import { addFilterById, SameDiff } from "@/utils/filter/operations/add";
import { removeFilterById } from "@/utils/filter/operations/remove";
import { updateFilterById } from "@/utils/filter/operations/update";
import { Filter, FilterId, LogicalOperqator } from "@/utils/filter/type";
import {
	ColumnDef,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	RowData,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

export function useTableData<TData extends RowData>(
	data: TData[],
	columns: ColumnDef<TData>[]
) {
	const [globalFilter, setGlobalFilter] = useState<Filter | null>(null);

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
		addToFilterId: FilterId,
		filterToAdd: Filter,
		logicalOperator: LogicalOperqator,
		isLogicalOperatorSame: SameDiff
	) {
		setFilter(
			addFilterById(
				globalFilter,
				addToFilterId,
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

	return { ...table, filterOperations };
}
