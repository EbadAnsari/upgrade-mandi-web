"use client";

import { useTable } from "@/app/hooks/useTableEditor";
import { BinaryOperation, FilterId } from "@/utils/filter/type";
import { RowData } from "@tanstack/react-table";
import FilterColumnSelector from "./FilterColumnSelector";
import FilterInput from "./FilterInput";
import { FilterOperatorSelector } from "./FilterOperatorSelector";
import NotToggle from "./NotToggle";

interface FilterDisplayLeafProps {
	filter: BinaryOperation;
	filterId: FilterId;
	filterIdMap: FilterId;
}

export function FilterDisplayLeaf<TData extends RowData>({
	filter,
	filterId,
	filterIdMap,
}: FilterDisplayLeafProps) {
	const table = useTable();

	const error = !table.getAllColumns().find((col) => col.id === filter.id);

	// if (filter.id === "check") console.log(filter.filterValue);

	return (
		<div className="flex gap-2 bg-zinc-200/50 p-2 border border-zinc-300 rounded-lg">
			<NotToggle />
			<FilterColumnSelector
				error={error}
				type={filter.type}
				selected={filter.id}
				onChange={(fieldId) => {
					table.filterOperations.updateFilterFieldId(
						filterIdMap,
						fieldId,
					);
				}}
			/>

			<FilterOperatorSelector
				type={filter.type}
				error={error}
				selected={filter.operator}
				onChange={(operator) => {
					table.filterOperations.updateFilterOperator(
						filterIdMap,
						operator,
					);
				}}
			/>

			<FilterInput
				filter={filter}
				value={filter.filterValue}
				onChange={(value) => {
					// console.log(
					table.filterOperations.updateFilterFieldValue(
						filterIdMap,
						value,
					);
					// );
				}}
			/>
		</div>
	);
}
