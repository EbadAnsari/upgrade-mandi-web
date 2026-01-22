export class NumberType {
	type = "number" as const;
	storedDatatype: number = 0;
	possibleValues: number = 0;

	constructor(possibleValues: number = 0) {
		this.possibleValues = possibleValues;
	}

	static converter(value: string) {
		return parseFloat(value);
	}
}

export enum NumberOperators {
	"eq" = "=",
	"neq" = "!=",
	"gt" = ">",
	"lt" = "<",
	"gte" = ">=",
	"lte" = "<=",
}

export interface NumberOperation {
	type: NumberType["type"];
	operator: NumberOperators;
	filterValue: NumberType["storedDatatype"];
}

export function evalNumber(
	fieldValue: NumberType["storedDatatype"],
	operator: NumberOperators,
	filterValue: NumberType["storedDatatype"]
): boolean {
	if (typeof fieldValue !== "number")
		throw new Error(
			`"fieldValue" should be numbers not (${typeof fieldValue}) ${fieldValue}`
		);
	else if (typeof filterValue !== "number")
		throw new Error(
			`"filterValue" should be numbers not (${typeof filterValue}) ${filterValue}`
		);

	console.log(fieldValue, operator, filterValue);

	switch (operator) {
		case NumberOperators.eq:
			return fieldValue === filterValue;
		case NumberOperators.neq:
			return fieldValue !== filterValue;
		case NumberOperators.gt:
			return fieldValue > filterValue;
		case NumberOperators.lt:
			return fieldValue < filterValue;
		case NumberOperators.gte:
			return fieldValue >= filterValue;
		case NumberOperators.lte:
			return fieldValue <= filterValue;
	}
}
