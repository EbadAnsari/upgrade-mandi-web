import { Row } from "@tanstack/react-table";
import { evalDate } from "./operators/date";
import { evalNumber } from "./operators/number";
import { evalSelect } from "./operators/status";
import { evalString } from "./operators/string";
import { BinaryOperation, Filter } from "./type";

function evaluate(
	operation: BinaryOperation,
	fieldValue: number | string | Date | boolean
) {
	switch (operation.type) {
		case "number":
			return evalNumber(
				parseFloat(`${fieldValue}`),
				operation.numberOperator,
				operation.filterValue
			);
		case "string":
			return evalString(
				`${fieldValue}`,
				operation.stringOperator,
				operation.filterValue,
				operation.caseSensitive
			);
		case "date":
			return evalDate(operation, new Date(`${fieldValue}`));
		case "select":
			return evalSelect(
				`${fieldValue}`,
				operation.selectOperator,
				operation.filterValue
			);
	}
}

export function evaluateFilter<TData>(
	filter: Filter | null,
	row: Row<TData>,
	columnId: string,
	filterValue: Record<string, any>
): boolean {
	if (!filter) return true;
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
