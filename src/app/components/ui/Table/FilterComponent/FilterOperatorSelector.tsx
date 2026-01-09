"use client";

import {
	DateEqualityOperators,
	DateRangeOperators,
	DateRelativeOperators,
} from "@/utils/filter/operators/date";
import { NumberOperators } from "@/utils/filter/operators/number";
import { SelectOperators } from "@/utils/filter/operators/select";
import { TextOperators } from "@/utils/filter/operators/text";
import { Datatype, Operators } from "@/utils/filter/type";
import { extractValuesFromEnum } from "@/utils/utils";
import { BaseSelectorProps, Combobox } from "../../ComboBox";

interface FilterOperatorSelectorProps<T> extends BaseSelectorProps<T> {
	type: Datatype;
	col: string;
}

export function FilterOperatorSelector({
	type,
	selected,
	error,
	col,
	onChange,
}: FilterOperatorSelectorProps<Operators>) {
	const getOperators: {
		[key in FilterOperatorSelectorProps<Operators>["type"]["name"]]: string[];
	} = {
		text: extractValuesFromEnum(TextOperators),
		number: extractValuesFromEnum(NumberOperators),
		select: extractValuesFromEnum(SelectOperators),
		date: [
			...extractValuesFromEnum(DateEqualityOperators),
			...extractValuesFromEnum(DateRangeOperators),
			...extractValuesFromEnum(DateRelativeOperators),
		],
		// boolean: [],
	};

	console.log(getOperators[type.name], type.name);

	return (
		<Combobox
			error={error}
			onChange={onChange}
			items={getOperators[type.name].map((operator) => ({
				value: operator,
				label: operator,
			}))}
			selected={selected}
			label="Select Operator"
		/>
	);
}
