export interface SelectType {
	values: string[];
}

export enum SelectOperators {
	"selected" = "selected",
	"notSelected" = "notSelected",
}

export interface SelectOperation {
	type: "select";
	selectOperator: SelectOperators;
	filterValue: SelectType;
}

export function evalSelect(
	fieldValue: string,
	operator: SelectOperators,
	filterValue: SelectType
): boolean {
	switch (operator) {
		case SelectOperators.selected:
			return filterValue.values.includes(fieldValue);
		case SelectOperators.notSelected:
			return !filterValue.values.includes(fieldValue);
	}
}
