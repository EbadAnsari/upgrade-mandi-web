import { DateOperation, DateType } from "./operators/date";
import { NumberOperation, NumberType } from "./operators/number";
import { SelectOperation, SelectType } from "./operators/select";
import { TextOperation, TextType } from "./operators/text";

export const LogicalOperatorArray = ["AND", "OR"] as const;
export type LogicalOperator = (typeof LogicalOperatorArray)[number];
export type LogicalNegation = boolean | null | undefined;

export type Datatype =
	| NumberType
	| TextType
	| DateType
	// | BooleanType
	| SelectType<string>;

// const a: Datatype = {
// 	name: "select",
// 	storedDatatype: "",
// 	possibleValues: [],
// };

export const columnTypes = {
	id: new TextType(),
	check: new NumberType(),
	amount: new NumberType(),
	status: new SelectType(["pending", "processing", "success", "failed"]),
	email: new TextType(),
	// actions: "more",
} as const;

export type ColumnTypes = typeof columnTypes;

export type FilterValueType = BinaryOperation["filterValue"];

type OperationForField<Field extends keyof ColumnTypes> =
	ColumnTypes[Field] extends TextType
		? TextOperation
		: ColumnTypes[Field] extends NumberType
		? NumberOperation
		: ColumnTypes[Field] extends SelectType<string>
		? SelectOperation<string>
		: ColumnTypes[Field] extends DateType
		? DateOperation
		: never;

export type BinaryOperation = {
	[Field in keyof ColumnTypes]: {
		id: Field;
		type: ColumnTypes[Field];
	} & OperationForField<Field>;
}[keyof ColumnTypes];

export type Operators = BinaryOperation["operator"];
// | NumberOperators
// | StringOperators
// | DateOperation["operator"]
// | SelectOperators;

export type RootId = "root";
export type CurrentFilterId = string;
export const FilterIdSeprator = "." as const;
export type FilterId = `${CurrentFilterId}-${string}` | RootId;

export type Filter = { negation?: LogicalNegation; filterId: FilterId } & (
	| {
			logicalOperator: LogicalOperator;
			operations: Filter[];
	  }
	| {
			logicalOperator?: null;
			operations: BinaryOperation;
	  }
);
