import { useTable } from "@/app/hooks/useTableEditor";
import { Input } from "@/components/ui/input";
import { BinaryOperation } from "@/utils/filter/type";
import { Combobox } from "../../select/ComboBox";
import { Item } from "../../select/SelectBox";

export interface FilterInputProps<T extends string, U extends number> {
	filter: BinaryOperation;
	onChange?: (value: T | U | Map<T, boolean>) => void;
	value: T | U | Map<T, boolean>;
}

export default function FilterInput<T extends string>({
	value,
	filter,
	onChange,
}: Readonly<FilterInputProps<T, number>>) {
	const { schema } = useTable();
	if (filter.type === "select") {
		const possibleValues = schema.getColumnById(filter.id)?.type
			.storedDatatype as Map<string, unknown>;
		return (
			<Combobox
				items={
					Array.from(possibleValues.keys()).map((value) => ({
						value: value,
						label: value,
					})) as Item<T>[]
				}
				multiSelect
				selected={value as Map<T, boolean>}
				// selected={{}}
				onChange={onChange}
				label="Select Value"
			/>
		);
	} else {
		return (
			<Input
				placeholder="Filter value"
				className="bg-white w-max h-9"
				value={filter.filterValue as T}
				// value={input as string}
				onChange={({ target: { value } }) => {
					onChange?.(value as T);
				}}
			/>
		);
	}
}
