export class TextType {
	name = "text" as const;
	storedDatatype = "";
}

export enum TextOperators {
	"is" = "is",
	"isNot" = "is not",
	"contains" = "contains",
	"startsWith" = "starts with",
	"endsWith" = "ends with",
}

export interface TextOperation {
	type: TextType;
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
		case TextOperators.isNot:
			return fieldValue !== filterValue;
		case TextOperators.contains:
			return fieldValue.includes(filterValue);
		case TextOperators.startsWith:
			return fieldValue.startsWith(filterValue);
		case TextOperators.endsWith:
			return fieldValue.endsWith(filterValue);
	}
}
