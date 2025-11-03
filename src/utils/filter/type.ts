import { BooleanType } from "./operators/boolean";
import {
	DateEquality,
	DateOperation,
	DateRange,
	DateRelative,
	DateType,
} from "./operators/date";
import {
	NumberOperation,
	NumberOperators,
	NumberType,
} from "./operators/number";
import {
	StatusOperation,
	StatusOperators,
	StatusType,
} from "./operators/status";
import {
	StringOperation,
	StringOperators,
	StringType,
} from "./operators/string";

export type LogicalOperqator = "AND" | "OR";
export type LogicalNegation = boolean | null | undefined;

export type Datatype =
	| NumberType
	| StringType
	| DateType
	| BooleanType
	| StatusType;

export type BinaryOperation = { fieldId: string } & (
	| NumberOperation
	| StringOperation
	| DateOperation
	| StatusOperation
);

export type Operators =
	| NumberOperators
	| StringOperators
	| DateEquality
	| DateRelative
	| DateRange
	| StatusOperators;

export type CurrentFilterId = string;
export type FilterId = `${CurrentFilterId}-${string}` | "root";

export type Filter = { negation?: LogicalNegation; filterId: string } & (
	| {
			logicalOperator: LogicalOperqator;
			operations: Filter[];
	  }
	| {
			logicalOperator?: null;
			operations: BinaryOperation;
	  }
);
