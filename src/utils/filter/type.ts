import { DateOperation, DateType } from "./operators/date";
import { NumberOperation, NumberType } from "./operators/number";
import { SelectOperation, SelectType } from "./operators/select";
import { TextOperation, TextType } from "./operators/text";

export const LogicalOperatorArray = ["AND", "OR"] as const;
export type LogicalOperator = (typeof LogicalOperatorArray)[number];
export type LogicalNegation = boolean | null | undefined;

export type Datatype = NumberType | TextType | DateType | SelectType;
// | BooleanType

// const a: Datatype = {
// 	name: "select",
// 	storedDatatype: "",
// 	possibleValues: [],
// };

// export type ColumnTypes = {
// 	[id: string]: Datatype["type"];
// };

export const columnTypes = {
	id: "text",
	check: "number",
	amount: "number",
	status: "select",
	email: "text",
	// actions: "more",
} as const;
export type ColumnTypes = typeof columnTypes;

// export type ColumnTypes = Datatype["type"];

export type FilterValueType = BinaryOperation["filterValue"];

type OperationForField<Field extends keyof ColumnTypes> =
	ColumnTypes[Field] extends "text"
		? TextOperation
		: ColumnTypes[Field] extends "number"
			? NumberOperation
			: ColumnTypes[Field] extends "select"
				? SelectOperation
				: ColumnTypes[Field] extends "date"
					? DateOperation
					: never;

export type BinaryOperation = {
	[Field in keyof ColumnTypes]: {
		id: Field;
	} & OperationForField<Field>;
}[keyof ColumnTypes];

export type Operators = BinaryOperation["operator"];

export type RootId = "root";
export type CurrentFilterId = string;
export const FilterIdSeprator = "." as const;
export type FilterId = `${CurrentFilterId}-${string}` | RootId;

export interface BasicFilter {
	filterId: FilterId;
	negation?: LogicalNegation;
}

export interface LeafFilter extends BasicFilter {
	logicalOperator?: null;
	operations: BinaryOperation;
}

export interface GroupFilter extends BasicFilter {
	logicalOperator: LogicalOperator;
	operations: (LeafFilter | GroupFilter)[];
}

export type Filter = LeafFilter | GroupFilter;
