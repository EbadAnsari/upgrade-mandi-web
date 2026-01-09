import { Input } from "@/components/ui/input";
import { BinaryOperation, FilterValueType } from "@/utils/filter/type";

export interface FilterInputProps {
	filter: BinaryOperation;
	onChange?: (value: FilterValueType) => void;
}

export default function FilterInput({
	filter,
	onChange,
}: Readonly<FilterInputProps>) {
	// console.log(filter.filterValue);
	// filter

	// console.log(filter.type);

	// return null;
	if (filter.type.name === "select") {
		console.log(filter.type);
		return "Hello";
		// return (
		// 	<SelectBox
		// 		items={filter.type.possibleValues.map((value) => ({
		// 			value: value,
		// 			label: value,
		// 		}))}
		// 		label="Select Value"
		// 	/>
		// );
	} else {
		return (
			<Input
				placeholder="Filter value"
				className="bg-white w-max h-9"
				value={filter.filterValue}
				// value={input as string}
				onChange={({ target: { value } }) => {
					onChange?.(value);
				}}
			/>
		);
	}
}
