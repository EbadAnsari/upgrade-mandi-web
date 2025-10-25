import { Row } from "@tanstack/react-table";
import {
	evalDateEquality,
	evalDateRange,
	evalDateRelative,
} from "./operate/date";
import { evalNumber, NumberOperators } from "./operate/number";
import { evalString } from "./operate/string";
import { BinaryOperation, Filter, FilterId } from "./type";

("root-1");
const a: Filter = {
	filterId: "root",
	logicalOperator: "AND",
	operations: [
		{
			filterId: "1",
			operations: {
				type: "number",
				fieldId: "id",
				operator: NumberOperators.eq,
				filterValue: 100,
			},
		},
	],
};

export function getFilterById(filter: Filter, id: FilterId): Filter | null {
	const filterIds = id.split("-");
	const currentFilterId = filterIds[0];

	if (filter.filterId !== currentFilterId) return null;
	else if (filterIds.length === 1) return filter;
	else if (!filter.logicalOperator) return null;

	const filterId = filterIds[1];
	for (const operation of filter.operations) {
		if (operation.filterId === filterId) {
			filterIds.shift();
			return getFilterById(operation, filterIds.join("-") as FilterId);
		}
	}

	return null;
}

export function evaluate(
	operation: BinaryOperation,
	fieldValue: number | string | Date | boolean
) {
	switch (operation.type) {
		case "number":
			return evalNumber(
				parseFloat(`${fieldValue}`),
				operation.operator,
				operation.filterValue
			);
		case "string":
			return evalString(
				`${fieldValue}`,
				operation.operator,
				operation.filterValue,
				operation.caseSensitive
			);
		case "date":
			switch (operation.dateOperationType) {
				case "equality":
					return evalDateEquality(
						new Date(fieldValue as string),
						operation.operator,
						operation.filterValue
					);
				case "range":
					return evalDateRange(
						new Date(fieldValue as string),
						operation.operator,
						operation.dateRangeStart,
						operation.dateRangeEnd
					);
				case "relative":
					return evalDateRelative(
						new Date(fieldValue as string),
						operation.operator,
						operation.filterValue
					);
			}
		case "boolean":
			return true;
		// case "boolean":
		// 	return BooleanOperators[operation.operator](operation.operand);
	}
}

export function evaluateFilter<TData>(
	filter: Filter,
	row: Row<TData>,
	columnId: string,
	filterValue: Record<string, any>
): boolean {
	if (!filter.logicalOperator)
		return evaluate(
			filter.operations,
			row.getValue(filter.operations.fieldId)
		);

	const result = filter.operations.map((operation) =>
		evaluateFilter(operation, row, columnId, filterValue)
	);

	return filter.logicalOperator === "AND"
		? result.every(Boolean)
		: result.some(Boolean);
}
