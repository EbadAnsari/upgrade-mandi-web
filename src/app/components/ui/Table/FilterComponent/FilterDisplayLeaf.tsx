"use client";

import { useTable } from "@/app/hooks/useTableEditor";
import { BinaryOperation, FilterId } from "@/utils/filter/type";
import { RowData } from "@tanstack/react-table";
import { Schema } from "../../TableEditor";
import FilterColumnSelector from "./FilterColumnSelector";
import FilterInput from "./FilterInput";
import { FilterOperatorSelector } from "./FilterOperatorSelector";

interface FilterDisplayLeafProps<TData extends RowData> {
	filter: BinaryOperation;
	filterId: FilterId;
	filterIdMap: FilterId;
}

export function FilterDisplayLeaf<TData extends RowData>({
	filter,
	filterId,
	filterIdMap,
}: FilterDisplayLeafProps<TData>) {
	const table = useTable();

	const error = !table.getAllColumns().find((col) => col.id === filter.id);

	return (
		<div className="flex gap-2">
			<FilterColumnSelector
				error={error}
				type={filter.type.name}
				selected={filter.id}
				onChange={(fieldId) => {
					const up = table.filterOperations.updateFilterFieldId(
						filterIdMap,
						{
							id: fieldId,
							type: (
								table.getColumn(fieldId)
									?.columnDef as Schema<TData>
							).type,
						}
					);
				}}
			/>

			<FilterOperatorSelector
				col={filter.id}
				type={filter.type}
				error={error}
				selected={filter.operator}
				onChange={(operator) => {
					table.filterOperations.updateFilterOperator(
						filterIdMap,
						operator
					);
				}}
			/>

			<FilterInput
				filter={filter}
				onChange={(value) => {
					// table.filterOperations.updateFilterFieldValue(
					// 	filterIdMap,
					// 	value
					// );
				}}
			/>
		</div>
	);
}
