"use client";

import {
	DateEqualityOperators,
	DateRangeOperators,
	DateRelativeOperators,
} from "@/utils/filter/operators/date";
import { NumberOperators } from "@/utils/filter/operators/number";
import { SelectOperators } from "@/utils/filter/operators/select";
import { TextOperators } from "@/utils/filter/operators/text";
import { Datatype } from "@/utils/filter/type";
import { extractValuesFromEnum } from "@/utils/utils";
import { Combobox } from "../../select/ComboBox";
import { Item } from "../../select/SelectBox";
import { FilterSelectProps } from "./FilterColumnSelector";

interface FilterOperatorSelectorProps<T extends string>
	extends FilterSelectProps<T> {
	type: Datatype["type"];
}

export function FilterOperatorSelector<T extends string>({
	type,
	selected,
	error,
	onChange,
}: FilterOperatorSelectorProps<T>) {
	const getOperators: {
		[key in FilterOperatorSelectorProps<T>["type"]]: string[];
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
	return (
		<Combobox
			error={error}
			onChange={onChange}
			items={
				getOperators[type].map((operator) => ({
					value: operator,
					label: operator,
				})) as Item<T>[]
			}
			selected={selected}
			label="Select Operator"
		/>
	);
}
