import { Subset } from "@/utils/types";

export class SelectType<U extends string> {
	name = "select" as const;
	storedDatatype: Subset<U>[] = [];
	possibleValues: U[];
	constructor(possibleValues: U[]) {
		this.possibleValues = possibleValues;
	}
}

export enum SelectOperators {
	"is" = "is",
	"isNot" = "is not",
}

export interface SelectOperation<U extends string> {
	type: SelectType<U>;
	operator: SelectOperators;
	filterValue: SelectType<U>["storedDatatype"];
}

export function evalStatus<U extends string>(
	fieldValue: Subset<U>,
	operator: SelectOperators,
	filterValue: SelectType<U>["storedDatatype"]
): boolean {
	switch (operator) {
		case SelectOperators.is:
			return filterValue.includes(fieldValue);
		case SelectOperators.isNot:
			return !filterValue.includes(fieldValue);
	}
}
