import { DateOperation } from "./operators/date";
import { NumberOperation } from "./operators/number";
import { SelectOperation } from "./operators/status";
import { StringOperation } from "./operators/string";

export type LogicalOperqator = "AND" | "OR";
export type LogicalNegation = boolean | null | undefined;

export type Datatype = "number" | "string" | "date" | "select";

export type BinaryOperation = { fieldId: string } & (
	| NumberOperation
	| StringOperation
	| DateOperation
	| SelectOperation
);

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
