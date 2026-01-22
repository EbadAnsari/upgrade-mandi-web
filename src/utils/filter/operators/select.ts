export class SelectType {
	type = "select" as const;
	storedDatatype: Map<string, boolean> = new Map();

	constructor(storedDatatype: string[] = []) {
		this.storedDatatype = SelectType.listToMap(storedDatatype);
	}

	static listToMap(selectedValues: string[] = []) {
		return selectedValues.reduce((acc, curr) => {
			acc.set(curr, false);
			return acc;
		}, new Map<string, boolean>());
	}
}

export enum SelectOperators {
	"contains" = "contains",
}

export interface SelectOperation {
	type: SelectType["type"];
	operator: SelectOperators;
	filterValue: SelectType["storedDatatype"];
}

export function evalStatus(
	fieldValue: string,
	operator: SelectOperators,
	filterValue: SelectType["storedDatatype"]
): boolean {
	switch (operator) {
		case SelectOperators.contains:
			return !!filterValue.get(fieldValue);
		// case SelectOperators.isNot:
		// 	return !filterValue.has(fieldValue);
	}
}
