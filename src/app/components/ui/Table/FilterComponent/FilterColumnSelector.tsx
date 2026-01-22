"use client";

import { useTable } from "@/app/hooks/useTableEditor";
import { ColumnTypes, Datatype } from "@/utils/filter/type";
import { RowData } from "@tanstack/react-table";
import { Calendar, List } from "lucide-react";
import { Combobox } from "../../select/ComboBox";
import { Item, SelectProps } from "../../select/SelectBox";
import { Schema } from "../../TableEditor";

export type FilterSelectProps<T extends string> = Readonly<
	Omit<SelectProps<T>, "items" | "label" | "icon">
>;

export type FilterColumnSelectorProps = FilterSelectProps<keyof ColumnTypes> & {
	type: Datatype["type"];
};

function Icon({ type }: { type: Datatype["type"] }) {
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
}: Readonly<FilterColumnSelectorProps>) {
	const table = useTable();
	return (
		<Combobox
			error={error}
			items={
				table.getAllColumns().map(({ columnDef }) => ({
					value: columnDef.id!,
					label: (columnDef as Schema<TData>).label,
				})) as Item<keyof ColumnTypes>[]
			}
			onChange={onChange}
			icon={<Icon type={type} />}
			selected={selected}
			label="Select Column"
			// selectLabel="Select column"
		/>
	);
}
