"use client";

import { useTable } from "@/app/hooks/useTableEditor";
import { CommandInput } from "@/components/ui/command";
import { ColumnTypes, Datatype } from "@/utils/filter/type";
import { RowData } from "@tanstack/react-table";
import { Calendar, List } from "lucide-react";
import { BaseSelectorProps, Combobox } from "../../ComboBox";
import { Schema } from "../../TableEditor";

export interface FilterColumnSelectorProps<TData extends RowData>
	extends Readonly<BaseSelectorProps<keyof ColumnTypes>> {
	type: Datatype["name"];
	// column: Schema<TData>[];
	// selectedColumn?: Schema<TData>["id"];
	// onSelect?: (value: string) => void;
}

function Icon({ type }: { type: Datatype["name"] }) {
	switch (type) {
		case "text":
			return "T";
		case "number":
			return "#";
		case "select":
			return <List className="size-3" />;
		case "date":
			return <Calendar className="size-4" />;
	}
}

export default function FilterColumnSelector<TData extends RowData>({
	type,
	error,
	selected,
	onChange,
}: Readonly<FilterColumnSelectorProps<TData>>) {
	const table = useTable();
	const items = table.getAllColumns().map(({ columnDef }) => ({
		value: columnDef.id!,
		label: (columnDef as Schema<TData>).label,
	}));

	return (
		<Combobox
			onChange={onChange}
			error={error}
			items={items}
			ComboInput={
				<CommandInput
					placeholder="Select Operator"
					className="h-9"
				/>
			}
			icon={<Icon type={type} />}
			selected={selected}
			label="Select Column"
			// selectLabel="Select column"
		/>
	);
}
