export interface StringType {
	type: "string";
	storedDatatype: string;
}

export enum StringOperators {
	"eq" = "=",
	"neq" = "!=",
	"contains" = "contains",
	"startsWith" = "startsWith",
	"endsWith" = "endsWith",
	"notContains" = "notContains",
	"notStartsWith" = "notStartsWith",
	"notEndsWith" = "notEndsWith",
}

export interface StringOperation {
	type: StringType["type"];
	stringOperator: StringOperators;
	filterValue: StringType["storedDatatype"];
	caseSensitive: boolean;
}

export function evalString(
	fieldValue: StringType["storedDatatype"],
	operator: StringOperators,
	filterValue: StringType["storedDatatype"],
	caseSensitive: boolean
) {
	if (!caseSensitive) {
		fieldValue = fieldValue.toLowerCase();
		filterValue = filterValue.toLowerCase();
	}
	switch (operator) {
		case StringOperators.eq:
			return fieldValue === filterValue;
		case StringOperators.neq:
			return fieldValue !== filterValue;
		case StringOperators.contains:
			return fieldValue.includes(filterValue);
		case StringOperators.startsWith:
			return fieldValue.startsWith(filterValue);
		case StringOperators.endsWith:
			return fieldValue.endsWith(filterValue);
		case StringOperators.notContains:
			return !fieldValue.includes(filterValue);
		case StringOperators.notStartsWith:
			return !fieldValue.startsWith(filterValue);
		case StringOperators.notEndsWith:
			return !fieldValue.endsWith(filterValue);
	}
}
