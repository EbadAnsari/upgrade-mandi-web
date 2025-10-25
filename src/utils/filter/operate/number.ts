export enum NumberOperators {
	"eq" = "=",
	"neq" = "!=",
	"gt" = ">",
	"lt" = "<",
	"gte" = ">=",
	"lte" = "<=",
}

export function evalNumber(
	fieldValue: number,
	operator: NumberOperators,
	filterValue: number
): boolean {
	if (typeof fieldValue !== "number")
		throw new Error(
			`"fieldValue" should be numbers not (${typeof fieldValue}) ${fieldValue}`
		);
	else if (typeof filterValue !== "number")
		throw new Error(
			`"filterValue" should be numbers not (${typeof filterValue}) ${filterValue}`
		);

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
