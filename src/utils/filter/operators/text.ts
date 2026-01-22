export class TextType {
	type = "text" as const;
	storedDatatype: string = "";
	possibleValues: string = "";

	constructor(possibleValues: string = "") {
		this.possibleValues = possibleValues;
	}
}

export enum TextOperators {
	"is" = "is",
	"contains" = "contains",
	"startsWith" = "starts with",
	"endsWith" = "ends with",
}

export interface TextOperation {
	type: TextType["type"];
	operator: TextOperators;
	filterValue: TextType["storedDatatype"];
	caseSensitive?: boolean;
}

export function evalString(
	fieldValue: TextType["storedDatatype"],
	operator: TextOperators,
	filterValue: TextType["storedDatatype"],
	caseSensitive?: boolean
) {
	if (!caseSensitive) {
		fieldValue = fieldValue.toLowerCase();
		filterValue = filterValue.toLowerCase();
	}
	switch (operator) {
		case TextOperators.is:
			return fieldValue === filterValue;
		case TextOperators.contains:
			return fieldValue.includes(filterValue);
		case TextOperators.startsWith:
			return fieldValue.startsWith(filterValue);
		case TextOperators.endsWith:
			return fieldValue.endsWith(filterValue);
	}
}
