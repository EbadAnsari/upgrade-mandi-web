export interface StatusType {
	type: "select";
	storedDatatype: string[];
}

export enum StatusOperators {
	"selected" = "selected",
	"notSelected" = "notSelected",
}

export interface StatusOperation {
	type: StatusType["type"];
	statusOperator: StatusOperators;
	filterValue: StatusType["storedDatatype"];
}

export function evalStatus(
	fieldValue: string,
	operator: StatusOperators,
	filterValue: StatusType["storedDatatype"]
): boolean {
	switch (operator) {
		case StatusOperators.selected:
			return filterValue.includes(fieldValue);
		case StatusOperators.notSelected:
			return !filterValue.includes(fieldValue);
	}
}
