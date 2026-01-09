import { Row } from "@tanstack/react-table";
import { evalDate } from "./operators/date";
import { evalNumber } from "./operators/number";
import { evalStatus } from "./operators/select";
import { evalString } from "./operators/text";
import { BinaryOperation, Filter } from "./type";

function evaluate(
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
			return evalDate(operation, new Date(`${fieldValue}`));
		case "select":
			return evalStatus(
				`${fieldValue}`,
				operation.operator,
				operation.filterValue
			);
	}
}

// 0 0 = 0
// 0 1 = 1
// 1 0 = 1
// 1 1 = 0

export function evaluateFilter<TData>(
	filter: Filter | null,
	row: Row<TData>,
	columnId: string,
	filterValue: Record<string, any>
): boolean {
	const negation = Number(Boolean(filter?.negation));
	if (!filter) return true;
	if (!filter.logicalOperator)
		return Boolean(
			negation ^
				Number(
					evaluate(
						filter.operations,
						row.getValue(filter.operations.id)
					)
				)
		);

	const result = filter.operations.map((operation) =>
		evaluateFilter(operation, row, columnId, filterValue)
	);

	return Boolean(
		negation ^
			Number(
				filter.logicalOperator === "AND"
					? result.every(Boolean)
					: result.some(Boolean)
			)
	);
}
